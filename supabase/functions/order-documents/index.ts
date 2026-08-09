// =============================================================================
// Edge Function : order-documents
// Échange de documents (factures) par commande, dans les 2 sens : admin ↔
// partenaire. Bucket privé `order-documents`, table `public.order_documents`.
//
// Actions (POST body.action) :
//   'list'           { saleId }                              -> { ok, docs: [...] }
//   'upload'         { saleId, fileBase64, fileType, label? } -> { ok, doc }
//   'notifyShipment' { saleId, docId?, lang? }                -> { ok, sentTo, cc }
//
// L'appartenance de la commande à l'appelant est VÉRIFIÉE CÔTÉ SERVEUR : admin
// via is_site_admin(), partenaire via partner_orders (RLS my_partner_scope()).
// v3 (08/08/2026) : action `notifyShipment` — confirmation d'expédition au CLIENT.
// v4 (09/08/2026) : objet via `mailSubject()` + corps en base64 via `htmlPart()`
//      — deux bugs distincts de denomailer 1.6.0 (en-tête coupé, `=` échappé en
//      `=3d` minuscule). ENJEU RÉEL ICI : le lien de facture signé contient
//      `?token=…` ; un `=` mal décodé cassait le téléchargement. Cf. _shared/mail.ts.
// =============================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';
import { corsHeadersFor, jsonResponse } from '../_shared/cors.ts';
import { htmlPart, mailSubject } from '../_shared/mail.ts';

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES: Record<string, string> = {
    'image/png': 'png', 'image/jpeg': 'jpg', 'application/pdf': 'pdf',
};

const ADMIN_EMAIL = 'contact@lesagedavid.fr';
/** Durée de validité du lien de téléchargement de la facture envoyé par email.
 *  7 jours : un lien de 5 min (celui de l'UI) serait mort à l'ouverture du mail. */
const INVOICE_URL_TTL_S = 7 * 24 * 3600;

function esc(s: string): string {
    return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
}

function shell(inner: string): string {
    return `<!doctype html><html><head><meta charset="utf-8" /></head>
<body style="margin:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
${inner}
      </table>
    </td></tr>
  </table>
</body></html>`;
}

const row = (k: string, v: string) =>
    `<tr><td style="padding:4px 0;color:#6b7280;font-size:13px;width:150px;vertical-align:top;">${k}</td><td style="padding:4px 0;color:#111827;font-size:14px;">${v}</td></tr>`;

/**
 * UN bloc de message par langue. `lang` vaut 'fr', 'en' ou 'auto'.
 *
 * 'auto' = la langue RÉELLE de la commande (`affiliate_sales.lang`, choisie par
 * resolveLang ci-dessous) si elle est connue, sinon français PUIS anglais dans
 * le MÊME email. Les commandes passées avant l'ajout de la colonne `lang`
 * (08/08/2026) n'ont pas cette info → bilingue, qui ne se trompe jamais de
 * destinataire. Le partenaire garde la main : choisir 'fr' ou 'en' dans le
 * formulaire d'envoi force explicitement cette langue, quoi que dise la commande.
 */
function block(lang: 'fr' | 'en', firstName: string, ref: string, tracking: string, invoiceUrl: string): string {
    const t = lang === 'fr'
        ? {
            title: 'Votre commande est expédiée ✨',
            hi: firstName ? `Bonjour ${esc(firstName)},` : 'Bonjour,',
            p1: 'Bonne nouvelle : votre commande vient de partir. Voici votre numéro de suivi et votre facture.',
            kRef: 'Référence', kTrack: 'Numéro de suivi',
            invoice: 'Télécharger ma facture',
            note: 'Ce lien de téléchargement reste valable 7 jours. Passé ce délai, répondez simplement à cet email et je vous le renvoie.',
            sign: 'Merci pour votre confiance,<br />David Lesage',
        }
        : {
            title: 'Your order has shipped ✨',
            hi: firstName ? `Hi ${esc(firstName)},` : 'Hi,',
            p1: 'Good news — your order is on its way. Here is your tracking number and your invoice.',
            kRef: 'Reference', kTrack: 'Tracking number',
            invoice: 'Download my invoice',
            note: 'This download link stays valid for 7 days. After that, just reply to this email and I will send it again.',
            sign: 'Thank you,<br />David Lesage',
        };
    return `
        <tr><td style="padding:28px 28px 4px;">
          <div style="font-size:21px;font-weight:700;color:#111827;">${t.title}</div>
          <p style="margin:14px 0 0;color:#374151;font-size:15px;line-height:1.6;">${t.hi}</p>
          <p style="margin:12px 0 0;color:#374151;font-size:15px;line-height:1.6;">${t.p1}</p>
        </td></tr>
        <tr><td style="padding:18px 28px 4px;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
            ${row(t.kRef, esc(ref))}
            ${row(t.kTrack, `<strong>${esc(tracking)}</strong>`)}
          </table>
        </td></tr>
        <tr><td style="padding:18px 28px 4px;">
          <a href="${esc(invoiceUrl)}" style="display:inline-block;background:#b4462a;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:11px 24px;border-radius:999px;">${t.invoice}</a>
          <p style="margin:10px 0 0;color:#6b7280;font-size:12px;">${t.note}</p>
        </td></tr>
        <tr><td style="padding:18px 28px 26px;border-top:1px solid #f0f1f3;">
          <p style="margin:0;color:#9ca3af;font-size:12px;">${t.sign}</p>
        </td></tr>`;
}

function shipmentHtml(lang: string, firstName: string, ref: string, tracking: string, invoiceUrl: string): string {
    if (lang === 'fr') return shell(block('fr', firstName, ref, tracking, invoiceUrl));
    if (lang === 'en') return shell(block('en', firstName, ref, tracking, invoiceUrl));
    return shell(
        block('fr', firstName, ref, tracking, invoiceUrl) +
        `<tr><td style="padding:0 28px;"><div style="border-top:2px solid #e5e7eb;"></div></td></tr>` +
        block('en', firstName, ref, tracking, invoiceUrl)
    );
}

function shipmentSubject(lang: string, ref: string): string {
    if (lang === 'fr') return `Votre commande ${ref} est expédiée`;
    if (lang === 'en') return `Your order ${ref} has shipped`;
    return `Votre commande est expédiée / Your order has shipped — ${ref}`;
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeadersFor(req) });
    if (req.method !== 'POST') return jsonResponse(req, { error: 'Method not allowed' }, 405);

    try {
        const authHeader = req.headers.get('Authorization') ?? '';
        if (!authHeader) return jsonResponse(req, { error: 'Unauthorized' }, 401);

        const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
        const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
        const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

        const asUser = createClient(SUPABASE_URL, ANON_KEY, {
            global: { headers: { Authorization: authHeader } },
            auth: { persistSession: false, autoRefreshToken: false },
        });
        const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
            auth: { persistSession: false, autoRefreshToken: false },
        });

        const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
        const saleId = String(body.saleId ?? '').trim();
        if (!saleId) return jsonResponse(req, { error: 'missing_sale_id' }, 400);

        const { data: isAdmin } = await asUser.rpc('is_site_admin');
        let role: 'admin' | 'partner';
        if (isAdmin === true) {
            role = 'admin';
        } else {
            const { data: order } = await asUser.from('partner_orders').select('id').eq('id', saleId).maybeSingle();
            if (!order) return jsonResponse(req, { error: 'not_found' }, 404);
            role = 'partner';
        }

        const action = String(body.action ?? '');

        if (action === 'list') {
            const { data: docs, error } = await admin
                .from('order_documents')
                .select('id, uploaded_by, label, file_path, content_type, created_at')
                .eq('sale_id', saleId)
                .order('created_at', { ascending: false });
            if (error) throw error;
            const withUrls = await Promise.all((docs ?? []).map(async (d) => {
                const { data: signed } = await admin.storage.from('order-documents').createSignedUrl(d.file_path, 300);
                return { ...d, url: signed?.signedUrl ?? null };
            }));
            return jsonResponse(req, { ok: true, docs: withUrls });
        }

        if (action === 'upload') {
            const fileBase64 = String(body.fileBase64 ?? '');
            const fileType = String(body.fileType ?? '');
            const label = body.label ? String(body.label).slice(0, 200) : null;
            const ext = ALLOWED_TYPES[fileType];
            if (!fileBase64 || !ext) return jsonResponse(req, { error: 'invalid_file_type' }, 400);
            if (fileBase64.length > MAX_BYTES * 1.4) return jsonResponse(req, { error: 'file_too_large' }, 400);
            const bytes = Uint8Array.from(atob(fileBase64), (c) => c.charCodeAt(0));
            if (bytes.byteLength > MAX_BYTES) return jsonResponse(req, { error: 'file_too_large' }, 400);

            const path = `${saleId}/${role}-${Date.now()}.${ext}`;
            const { error: upErr } = await admin.storage.from('order-documents').upload(path, bytes, {
                contentType: fileType, upsert: false,
            });
            if (upErr) throw upErr;

            const { data: doc, error: insErr } = await admin.from('order_documents').insert({
                sale_id: saleId, uploaded_by: role, label, file_path: path, content_type: fileType,
            }).select('id, uploaded_by, label, file_path, content_type, created_at').single();
            if (insErr) throw insErr;

            const { data: signed } = await admin.storage.from('order-documents').createSignedUrl(path, 300);
            return jsonResponse(req, { ok: true, doc: { ...doc, url: signed?.signedUrl ?? null } });
        }

        // ------------------------------------------------------------------
        // CONFIRMATION D'EXPÉDITION AU CLIENT (demande David, 08/08/2026)
        // ------------------------------------------------------------------
        // Le partenaire a saisi le n° de suivi et déposé la facture → UN email
        // part chez le client (suivi + lien signé vers sa facture), avec COPIE
        // au partenaire et à David. Un seul `send`, donc le partenaire reçoit
        // littéralement le même message que son client.
        //
        // Le contrôle d'accès est celui, inchangé, du haut de la fonction : un
        // partenaire ne peut déclencher l'envoi que pour une commande visible
        // dans `partner_orders` (RLS my_partner_scope()). L'adresse du client
        // est lue EN BASE ici, jamais reçue du navigateur.
        if (action === 'notifyShipment') {
            const rawLang = String(body.lang ?? 'auto');
            // Choix explicite du partenaire (fr/en) → prioritaire, quoi que dise
            // la commande. 'auto' → résolu plus bas via sale.lang si connu.
            const requestedLang = rawLang === 'fr' || rawLang === 'en' ? rawLang : 'auto';

            const { data: sale, error: saleErr } = await admin
                .from('affiliate_sales')
                .select('id, partner, customer_name, email, tracking_number, order_ref, lang')
                .eq('id', saleId)
                .maybeSingle();
            if (saleErr) throw saleErr;
            if (!sale) return jsonResponse(req, { error: 'not_found' }, 404);

            // 'auto' + langue de commande connue (fr/en) → cette langue précise.
            // 'auto' + inconnue (commande antérieure au 08/08/2026, ou valeur
            // inattendue) → bilingue, comme avant.
            const orderLang = String(sale.lang ?? '');
            const lang = requestedLang !== 'auto'
                ? requestedLang
                : (orderLang === 'fr' || orderLang === 'en' ? orderLang : 'auto');

            const customerEmail = String(sale.email ?? '').trim();
            const tracking = String(sale.tracking_number ?? '').trim();
            if (!customerEmail) return jsonResponse(req, { error: 'missing_email' }, 400);
            if (!tracking) return jsonResponse(req, { error: 'missing_tracking' }, 400);

            // Facture : celle demandée (vérifiée appartenir À CETTE commande),
            // sinon le document le plus récent de la commande.
            const docId = String(body.docId ?? '').trim();
            let q = admin
                .from('order_documents')
                .select('id, file_path, label')
                .eq('sale_id', saleId)
                .order('created_at', { ascending: false })
                .limit(1);
            if (docId) q = q.eq('id', docId);
            const { data: docs, error: docErr } = await q;
            if (docErr) throw docErr;
            const doc = (docs ?? [])[0];
            if (!doc?.file_path) return jsonResponse(req, { error: 'missing_invoice' }, 400);

            const { data: signed, error: signErr } = await admin.storage
                .from('order-documents')
                .createSignedUrl(doc.file_path, INVOICE_URL_TTL_S);
            if (signErr || !signed?.signedUrl) return jsonResponse(req, { error: 'invoice_link_failed' }, 500);

            // Copie au partenaire de CETTE commande (table partner_contacts —
            // générique, pas d'email codé en dur) + David.
            const { data: contacts } = await admin
                .from('partner_contacts')
                .select('email')
                .eq('partner', sale.partner);
            const cc = Array.from(new Set(
                [...(contacts ?? []).map((c: { email: string | null }) => String(c.email ?? '').trim()), ADMIN_EMAIL]
                    .filter((e) => e && e.toLowerCase() !== customerEmail.toLowerCase())
            ));

            const host = Deno.env.get('SMTP_HOST') ?? '';
            const user = Deno.env.get('SMTP_USER') ?? '';
            const pass = Deno.env.get('SMTP_PASS') ?? '';
            const from = Deno.env.get('SMTP_FROM') ?? user;
            const port = Number(Deno.env.get('SMTP_PORT') ?? '465');
            if (!host || !user || !pass || !from) {
                return jsonResponse(req, { error: 'email_not_configured' }, 500);
            }

            const ref = String(sale.order_ref ?? '').trim() || saleId.slice(0, 8).toUpperCase();
            const firstName = String(sale.customer_name ?? '').trim().split(/\s+/)[0] ?? '';

            const client = new SMTPClient({
                connection: { hostname: host, port, tls: port === 465, auth: { username: user, password: pass } },
            });
            try {
                await client.send({
                    from,
                    to: customerEmail,
                    cc,
                    replyTo: ADMIN_EMAIL,
                    subject: mailSubject(shipmentSubject(lang, ref)),
                    mimeContent: [htmlPart(shipmentHtml(lang, firstName, ref, tracking, signed.signedUrl))],
                });
            } catch (e) {
                console.error('order-documents notifyShipment mail error:', e);
                return jsonResponse(req, { error: 'email_failed' }, 502);
            } finally {
                try { await client.close(); } catch { /* ignore */ }
            }

            return jsonResponse(req, { ok: true, sentTo: customerEmail, cc });
        }

        return jsonResponse(req, { error: 'invalid_action' }, 400);
    } catch (err) {
        console.error('order-documents error:', err);
        return jsonResponse(req, { error: err instanceof Error ? err.message : 'server_error' }, 500);
    }
});
