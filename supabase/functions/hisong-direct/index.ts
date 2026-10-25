// =============================================================================
// Edge Function : hisong-direct
// Vente EN DIRECT, au showroom, du micro Hisong AirStudio S1 (stock consigné).
// Formulaire `HisongDirectForm.astro` sur /micro-hisong (FR/EN/ES).
//
// Pourquoi une fonction dédiée et pas `muling-order` : tout, dans muling-order,
// est propre à Muling (IBAN Muling, email au fabricant à chaque commande,
// référence RESONANCE, écran de preuve de virement). Hisong n'a rien de cela —
// l'achat en ligne se fait sur hisong.io avec le code, et la vente directe AUSSI :
// 24/10/2026, David : « C'est Muling et Hisong qui encaissent le paiement
// toujours ». Le client paie Hisong (hisong.io + lien), David remet le micro. `site-lead` est réservé (chantier achat Neotone).
//
// Écrit dans public.affiliate_sales — la table que lit déjà l'app pour les
// ventes — avec partner='hisong', source='hisong-direct' et
// purchase_channel='showroom' : MÊME colonne et MÊME valeur que la vente directe
// Muling (`muling-order` v5). L'app crée le mouvement d'inventaire `sale_direct`
// à partir de ce champ : cette fonction ne touche JAMAIS à stock_movements.
//
// Appelée par /api/hisong-direct.js (Vercel), serveur à serveur, protégée par
// SITE_LEAD_TOKEN. verify_jwt = false. v1 (25/10/2026), non déployée.
// v2 (24/10/2026, non déployée) : David — « que les preuves de paiement soient
//      récupérées directement via un formulaire dédié "vente présentiel" ».
//      Le client paie via le lien Stripe offline (340 €) puis dépose sa
//      capture DANS LE MÊME envoi : upload dans le bucket privé `hisong-proofs`
//      (chemin `<affiliate_sales.id>/<ts>.<ext>`, même règles que muling-proofs)
//      + payment_proof_path / payment_claimed_at / fulfillment_status
//      ='payment_claimed'. Sans fichier : comportement v1 inchangé.
//      Mail à Cathy (Hisong) préparé derrière HISONG_PARTNER_EMAIL_ENABLED
//      (désactivé par défaut ; adresse dans HISONG_PARTNER_EMAIL).
// =============================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';
import { htmlPart, mailSubject } from '../_shared/mail.ts';

const ADMIN_EMAIL = 'contact@lesagedavid.fr';
const JSON_HEADERS = { 'Content-Type': 'application/json' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// ⚠️ Dupliqué depuis src/i18n/hisong.ts (`hisongPrices`) — les DEUX changent
// ensemble. Prix que le client paie chez Hisong : S1 + RX Plus AVEC le code
// (340 €) ; S1 seul = prix public (aucun prix avec code relevé).
const PACKS: Record<string, { label: string; price: number }> = {
    s1: { label: 'AirStudio S1 (Standard Pack)', price: 270.95 },
    s1RxPlus: { label: 'AirStudio S1 + RX Plus (Universal Pack)', price: 340 },
};
// ⚠️ Doit rester égale à TERMS_VERSION de site-lead et muling-order.
const TERMS_VERSION = '2026-08-19';

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
const esc = (s: string) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
const row = (k: string, v: string) =>
    `<tr><td style="padding:4px 0;color:#6b7280;font-size:13px;width:130px;vertical-align:top;">${k}</td><td style="padding:4px 0;color:#111827;font-size:14px;">${v}</td></tr>`;
const shell = (inner: string) => `<!doctype html><html><head><meta charset="utf-8" /></head>
<body style="margin:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 0;"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;border:1px solid #e5e7eb;">
<tr><td style="padding:26px 28px;">${inner}</td></tr></table></td></tr></table></body></html>`;

// Lien de paiement Stripe « vente présentiel » (340 €) — doit rester égal à
// `hisongShowroomPayUrl` dans src/i18n/hisong.ts.
const PAY_URL = 'https://buy.stripe.com/8x2eVe6AieJB8nmeTteZ203';
const PROOF_BUCKET = 'hisong-proofs';
const MAX_BYTES = 6 * 1024 * 1024;
const ALLOWED_TYPES: Record<string, string> = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'application/pdf': 'pdf' };
const COPY: Record<string, { subject: string; title: string; p1: string; pay: string; sign: string; amount: string }> = {
    fr: { subject: 'David Lesage — ton micro Hisong', title: 'Merci pour ton achat ✨', p1: 'Ton achat au showroom est bien enregistré. Je te remets le micro en main propre. Voici le récapitulatif, à garder.', pay: 'Lien de paiement (si ce n’est pas déjà fait) — sur la page de paiement, saisis toi-même le montant : <strong>{amount}</strong>', sign: 'Merci,<br />David Lesage', amount: 'Montant' },
    en: { subject: 'David Lesage — your Hisong mic', title: 'Thanks for your purchase ✨', p1: 'Your showroom purchase is recorded. I’m handing you the mic in person. Here is the summary, for your records.', pay: 'Payment link (if not done yet) — on the payment page, enter the amount yourself: <strong>{amount}</strong>', sign: 'Thank you,<br />David Lesage', amount: 'Amount' },
    es: { subject: 'David Lesage — tu micrófono Hisong', title: 'Gracias por tu compra ✨', p1: 'Tu compra en el showroom está registrada. Te entrego el micrófono en mano. Aquí tienes el resumen, para guardarlo.', pay: 'Enlace de pago (si aún no lo has hecho) — en la página de pago, introduce tú mismo el importe: <strong>{amount}</strong>', sign: 'Gracias,<br />David Lesage', amount: 'Importe' },
};

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: JSON_HEADERS });
    if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
    try {
        const expected = Deno.env.get('SITE_LEAD_TOKEN') ?? '';
        if (expected && req.headers.get('x-site-token') !== expected) return json({ error: 'Forbidden' }, 403);

        const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
        const email = String(body.email ?? '').trim().toLowerCase();
        const firstName = String(body.firstName ?? '').trim().slice(0, 80);
        const lastName = String(body.lastName ?? '').trim().slice(0, 80);
        const phone = String(body.phone ?? '').trim().slice(0, 40) || null;
        const message = String(body.message ?? '').trim().slice(0, 4000) || null;
        const lang = ['fr', 'en', 'es'].includes(String(body.lang)) ? String(body.lang) : 'fr';
        const packKey = String(body.pack ?? 's1') in PACKS ? String(body.pack ?? 's1') : 's1';
        const pack = PACKS[packKey];
        const rawQty = Number(body.quantity);
        // 24/10/2026 : lien Stripe à montant fixe (340 €) → toujours 1 micro par vente.
        void rawQty;
        const quantity = 1;
        const termsAccepted = body.termsAccepted === true;
        const newsOptIn = body.newsOptIn === true;
        const now = new Date().toISOString();
        const fileBase64 = String(body.fileBase64 ?? '');
        const fileType = String(body.fileType ?? '');
        const ext = ALLOWED_TYPES[fileType];
        if (fileBase64 && !ext) return json({ error: 'invalid_file_type' }, 400);
        if (fileBase64.length > MAX_BYTES * 1.4) return json({ error: 'file_too_large' }, 400);
        const bytes = fileBase64 ? Uint8Array.from(atob(fileBase64), (ch) => ch.charCodeAt(0)) : null;
        if (bytes && bytes.byteLength > MAX_BYTES) return json({ error: 'file_too_large' }, 400);

        if (!EMAIL_RE.test(email)) return json({ error: 'invalid_email' }, 400);
        if (!firstName && !lastName) return json({ error: 'missing_name' }, 400);

        // David 25/10/2026 : montant variable au showroom (remise décidée par David),
        // base = plafond = pack.price (340 €). Refus au-delà ou ≤ 0.
        const basePrice = Math.round(pack.price * quantity * 100) / 100;
        const amountIn = body.amount === undefined || body.amount === null || body.amount === '' ? basePrice : Math.round(Number(body.amount) * 100) / 100;
        if (!Number.isFinite(amountIn) || amountIn <= 0 || amountIn > basePrice) return json({ error: 'invalid_amount' }, 400);
        const total = amountIn;
        const admin = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
            { auth: { persistSession: false, autoRefreshToken: false } });

        const { data: ins, error } = await admin.from('affiliate_sales').insert({
            partner: 'hisong',
            source: 'hisong-direct',
            purchase_channel: 'showroom',
            customer_name: `${firstName} ${lastName}`.trim() || null,
            email, phone,
            quantity,
            price_original_eur: basePrice,
            price_discounted_eur: total,
            currency: 'EUR',
            lang,
            status: 'lead',
            fulfillment_status: 'new',
            terms_accepted_at: termsAccepted ? now : null,
            terms_version: termsAccepted ? TERMS_VERSION : null,
            news_opt_in: newsOptIn,
            news_opt_in_at: newsOptIn ? now : null,
            admin_note: [`Pack : ${pack.label}`, message].filter(Boolean).join('\n'),
        }).select('id').single();
        if (error) throw error;
        const saleId = ins!.id as string;

        // Preuve de paiement : une panne d'upload ne perd pas la vente (déjà
        // écrite) — on le signale (proofSaved=false) et David voit la ligne 'new'.
        let proofPath: string | null = null;
        if (bytes && ext) {
            const path = `${saleId}/${Date.now()}.${ext}`;
            const { error: upErr } = await admin.storage.from(PROOF_BUCKET).upload(path, bytes, { contentType: fileType, upsert: false });
            if (upErr) console.error('hisong-direct upload error:', upErr);
            else {
                const { error: updErr } = await admin.from('affiliate_sales').update({
                    payment_proof_path: path, payment_claimed_at: new Date().toISOString(), fulfillment_status: 'payment_claimed',
                }).eq('id', saleId);
                if (updErr) console.error('hisong-direct update error:', updErr); else proofPath = path;
            }
        }

        let emailSent = false;
        const host = Deno.env.get('SMTP_HOST') ?? '';
        const user = Deno.env.get('SMTP_USER') ?? '';
        const pass = Deno.env.get('SMTP_PASS') ?? '';
        const from = Deno.env.get('SMTP_FROM') ?? user;
        const port = Number(Deno.env.get('SMTP_PORT') ?? '465');
        if (host && user && pass && from) {
            const t = COPY[lang];
            const recap = `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin-top:14px;">
              ${row('Micro', esc(pack.label))}${row(lang === 'fr' ? 'Quantité' : lang === 'es' ? 'Cantidad' : 'Quantity', String(quantity))}${row(t.amount, `${total.toFixed(2)} EUR`)}</table>`;
            const c = new SMTPClient({ connection: { hostname: host, port, tls: port === 465, auth: { username: user, password: pass } } });
            try {
                // Un seul envoi : client en destinataire, David en copie.
                await c.send({ from, to: email, cc: ADMIN_EMAIL, replyTo: ADMIN_EMAIL, subject: mailSubject(t.subject), mimeContent: [htmlPart(shell(
                    `<div style="font-size:21px;font-weight:700;color:#111827;">${t.title}</div>
                     <p style="margin:12px 0 0;color:#374151;font-size:15px;line-height:1.6;">${t.p1}</p>${recap}
                     <p style="margin:14px 0 0;color:#374151;font-size:15px;line-height:1.6;">${t.pay.replace('{amount}', lang === 'en' ? `€${total % 1 ? total.toFixed(2) : total}` : `${total % 1 ? total.toFixed(2).replace('.', ',') : total} €`)}<br /><a href="${PAY_URL}" style="color:#b45309;font-weight:700;">${PAY_URL}</a></p>
                     <p style="margin:16px 0 0;color:#9ca3af;font-size:12px;">${t.sign}</p>`))] });
                emailSent = true;
            } catch (e) { console.error('hisong-direct mail error:', e); }
            finally { try { await c.close(); } catch { /* ignore */ } }
        }
        // Notification à Cathy (Hisong) — DÉSACTIVÉE par défaut. Ne part que si
        // HISONG_PARTNER_EMAIL_ENABLED === 'true' ET HISONG_PARTNER_EMAIL posée.
        let partnerEmailSent = false;
        const partnerTo = Deno.env.get('HISONG_PARTNER_EMAIL') ?? '';
        if (Deno.env.get('HISONG_PARTNER_EMAIL_ENABLED') === 'true' && partnerTo && host && user && pass && from) {
            const c2 = new SMTPClient({ connection: { hostname: host, port, tls: port === 465, auth: { username: user, password: pass } } });
            try {
                await c2.send({ from, to: partnerTo, cc: ADMIN_EMAIL, replyTo: ADMIN_EMAIL,
                    subject: mailSubject(`Showroom sale — AirStudio S1 + RX Plus x${quantity}`),
                    mimeContent: [htmlPart(shell(`<div style="font-size:19px;font-weight:700;color:#111827;">New showroom sale (David Lesage)</div>
                      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin-top:14px;">
                      ${row('Product', esc(pack.label))}${row('Quantity', String(quantity))}${row('Amount', `${total.toFixed(2)} EUR`)}
                      ${row('Customer', esc(`${firstName} ${lastName}`.trim()))}${row('Email', esc(email))}
                      ${row('Proof of payment', proofPath ? 'received (stored, available on request)' : 'not provided')}${row('Ref', esc(saleId))}</table>`))] });
                partnerEmailSent = true;
            } catch (e) { console.error('hisong-direct partner mail error:', e); }
            finally { try { await c2.close(); } catch { /* ignore */ } }
        }
        return json({ ok: true, saleId, emailSent, partnerEmailSent, proofSaved: !!proofPath, saleMode: 'showroom', amount: total, currency: 'EUR' });
    } catch (err) {
        console.error('hisong-direct error:', err);
        return json({ error: err instanceof Error ? err.message : 'server_error' }, 500);
    }
});
