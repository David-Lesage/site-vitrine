// =============================================================================
// Edge Function : muling-order
// Commande du micro Muling (formulaire dédié /micro-muling, PAS BookingForm
// générique) — écrit dans public.affiliate_sales (partner='muling'), PAS
// dans site_leads : ce n'est pas un lead, c'est une commande avec adresse
// de livraison, quantité et prix fixe en euros.
//
// Distincte de site-lead pour ne pas alourdir une fonction déjà volumineuse
// avec un modèle de données et des destinataires d'email différents (Muling
// reçoit un email à CHAQUE commande, ce qu'aucune autre source ne fait).
//
// Appelée par /api/muling-order.js (Vercel) — SERVEUR À SERVEUR, protégée
// par SITE_LEAD_TOKEN (même secret que site-lead).
// verify_jwt = false (visiteur non connecté).
//
// v1 (08/08/2026).
// =============================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';

const ADMIN_EMAIL = 'contact@lesagedavid.fr';
const MULING_EMAIL = '85846599@qq.com';
const JSON_HEADERS = { 'Content-Type': 'application/json' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// ⚠️ Dupliqué depuis src/data/muling.ts — les DEUX doivent changer ensemble.
// Prix en euros (David, 08/08/2026) : cohérent avec le compte bancaire de
// Muling, qui n'accepte que des virements SEPA en euros.
const PRICE_EUR = 258;
const DISCOUNT_PCT = 5;
const DISCOUNT_CODE = 'David-Lesage-5';
// Valeur LITTÉRALE donnée par David (258 × 0,95 = 245,10 €, pas 246,50 € —
// écart assumé, voir le commentaire dans src/data/muling.ts).
const DISCOUNTED_PRICE_EUR = 246.50;
const COMMISSION_PER_UNIT_EUR = 100; // accord de principe du 22/07/2026 avec Muling (en USD à l'origine, non re-négocié en EUR)
const BANK = {
    beneficiary: 'HuiZhou Muling Musical Instruments Co Ltd',
    iban: 'DE17 2022 0800 0047 4167 62',
    bic: 'SXPYDEHH',
    bank: 'Banking Circle S.A. — succursale allemande',
};

function json(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}
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
    `<tr><td style="padding:4px 0;color:#6b7280;font-size:13px;width:130px;vertical-align:top;">${k}</td><td style="padding:4px 0;color:#111827;font-size:14px;">${v}</td></tr>`;

function clientEmailHtml(lang: string, firstName: string, ref: string, total: number, quantity: number): string {
    const en = lang !== 'fr';
    const hi = firstName ? `${en ? 'Hi' : 'Bonjour'} ${esc(firstName)},` : (en ? 'Hi,' : 'Bonjour,');
    const t = en ? {
        title: 'Your order is on its way ✨',
        p1: 'Thanks for your order — I’ve passed it on to Muling. Here are your payment details, for your records (you’ll also find them on the confirmation screen).',
        pay: 'Payment details',
        p2: 'Payment in euros, SEPA transfer only — this account does not accept international/SWIFT wires.',
        p3: 'Once you’ve paid, come back to the confirmation screen and let me know — I’ll follow up with Muling for shipping.',
        sign: 'Thank you,<br />David Lesage',
    } : {
        title: 'Ta commande est en route ✨',
        p1: 'Merci pour ta commande — je l’ai transmise à Muling. Voici tes informations de paiement, pour archive (tu les retrouves aussi sur l’écran de confirmation).',
        pay: 'Coordonnées de paiement',
        p2: 'Paiement en euros, par virement SEPA uniquement — ce compte n’accepte pas les virements internationaux/SWIFT.',
        p3: 'Une fois le virement fait, reviens sur l’écran de confirmation pour me le signaler — je fais le lien avec Muling pour l’expédition.',
        sign: 'Merci,<br />David Lesage',
    };
    return shell(`
        <tr><td style="padding:28px 28px 4px;">
          <div style="font-size:21px;font-weight:700;color:#111827;">${t.title}</div>
          <p style="margin:14px 0 0;color:#374151;font-size:15px;line-height:1.6;">${hi}</p>
          <p style="margin:12px 0 0;color:#374151;font-size:15px;line-height:1.6;">${t.p1}</p>
        </td></tr>
        <tr><td style="padding:22px 28px 4px;border-top:1px solid #f0f1f3;">
          <h2 style="margin:0 0 10px;font-size:17px;color:#111827;">${t.pay}</h2>
          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
            ${row('Beneficiary', esc(BANK.beneficiary))}
            ${row('IBAN', esc(BANK.iban))}
            ${row('BIC', esc(BANK.bic))}
            ${row(en ? 'Amount' : 'Montant', `${total} EUR`)}
            ${row(en ? 'Reference' : 'Référence', esc(ref))}
          </table>
          <p style="margin:12px 0 0;color:#6b7280;font-size:12px;">${t.p2}</p>
        </td></tr>
        <tr><td style="padding:20px 28px 28px;border-top:1px solid #f0f1f3;">
          <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">${t.p3}</p>
          <p style="margin:16px 0 0;color:#9ca3af;font-size:12px;">${t.sign}</p>
        </td></tr>
`);
}

function adminHtml(f: Record<string, string | number | null>): string {
    return shell(`
        <tr><td style="padding:26px 28px 6px;"><div style="font-size:20px;font-weight:700;color:#111827;">Nouvelle commande Muling</div></td></tr>
        <tr><td style="padding:8px 28px 26px;"><table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
          ${Object.entries(f).map(([k, v]) => (v === null || v === '' ? '' : row(k, esc(String(v))))).join('')}
        </table></td></tr>
`);
}

function mulingHtml(f: Record<string, string | number | null>): string {
    return shell(`
        <tr><td style="padding:26px 28px 6px;"><div style="font-size:20px;font-weight:700;color:#111827;">New order via David Lesage</div></td></tr>
        <tr><td style="padding:8px 28px 20px;"><table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
          ${Object.entries(f).map(([k, v]) => (v === null || v === '' ? '' : row(k, esc(String(v))))).join('')}
        </table></td></tr>
        <tr><td style="padding:0 28px 26px;"><p style="margin:0;color:#6b7280;font-size:13px;">Discount code ${esc(DISCOUNT_CODE)} applied (${DISCOUNT_PCT}% off) — as agreed. I will confirm once the customer sends proof of payment.</p></td></tr>
`);
}

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
        const country = String(body.country ?? '').trim().slice(0, 80) || null;
        const address = String(body.address ?? '').trim().slice(0, 300) || null;
        const city = String(body.city ?? '').trim().slice(0, 120) || null;
        const postalCode = String(body.postalCode ?? '').trim().slice(0, 20) || null;
        const message = String(body.message ?? '').trim().slice(0, 4000) || null;
        const lang = String(body.lang ?? 'fr').trim().slice(0, 5);
        const page = String(body.page ?? '').trim().slice(0, 200);
        const consent = body.consent === true;

        const rawQty = Number(body.quantity);
        const quantity = Number.isFinite(rawQty) && rawQty > 0 ? Math.min(Math.round(rawQty), 20) : 1;

        if (!EMAIL_RE.test(email)) return json({ error: 'invalid_email' }, 400);
        if (!consent) return json({ error: 'missing_consent' }, 400);
        if (!country || !address || !city || !postalCode) return json({ error: 'missing_address' }, 400);

        const admin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
            { auth: { persistSession: false, autoRefreshToken: false } },
        );

        const priceOriginal = PRICE_EUR * quantity;
        const priceDiscounted = DISCOUNTED_PRICE_EUR * quantity;
        const commission = COMMISSION_PER_UNIT_EUR * quantity;

        const { data: ins, error } = await admin.from('affiliate_sales').insert({
            partner: 'muling',
            source: 'muling-order',
            customer_name: `${firstName} ${lastName}`.trim() || null,
            email, phone,
            shipping_country: country, shipping_address: address,
            shipping_city: city, shipping_postal_code: postalCode,
            quantity,
            price_original_eur: priceOriginal,
            price_discounted_eur: priceDiscounted,
            commission_eur: commission,
            currency: 'EUR',
            status: 'lead',
            fulfillment_status: 'new',
            consent_at: new Date().toISOString(),
            admin_note: message,
        }).select('id').single();
        if (error) throw error;
        const saleId = ins!.id as string;
        // « RESONANCE » (Résonances Productions), pas le nom du client : le
        // libellé de virement doit rester générique et reconnaissable côté
        // Muling, quel que soit le client (David, 08/08/2026).
        const ref = `RESONANCE-${saleId.slice(0, 8).toUpperCase()}`;
        await admin.from('affiliate_sales').update({ order_ref: ref }).eq('id', saleId);

        let emailSent = false;
        const host = Deno.env.get('SMTP_HOST') ?? '';
        const user = Deno.env.get('SMTP_USER') ?? '';
        const pass = Deno.env.get('SMTP_PASS') ?? '';
        const from = Deno.env.get('SMTP_FROM') ?? user;
        const port = Number(Deno.env.get('SMTP_PORT') ?? '465');

        if (host && user && pass && from) {
            const send = async (to: string, replyTo: string | undefined, subject: string, html: string) => {
                const c = new SMTPClient({ connection: { hostname: host, port, tls: port === 465, auth: { username: user, password: pass } } });
                try { await c.send({ from, to, replyTo, subject, html }); return true; }
                catch (e) { console.error('muling-order mail error:', e); return false; }
                finally { try { await c.close(); } catch { /* ignore */ } }
            };

            emailSent = await send(email, ADMIN_EMAIL,
                lang === 'fr' ? 'David Lesage — ta commande Muling' : 'David Lesage — your Muling order',
                clientEmailHtml(lang, firstName, ref, priceDiscounted, quantity));

            await send(ADMIN_EMAIL, email, `[Muling] Nouvelle commande — ${firstName} ${lastName}`.trim(), adminHtml({
                Nom: `${firstName} ${lastName}`.trim() || null, Email: email, Téléphone: phone,
                Quantité: quantity, Pays: country, Adresse: `${address}, ${postalCode} ${city}`,
                'Montant (EUR)': priceDiscounted, Référence: ref, Message: message, Page: page || null, Langue: lang,
            }));

            await send(MULING_EMAIL, ADMIN_EMAIL, `New order — ${firstName} ${lastName} (${quantity}x HMP-2)`.trim(), mulingHtml({
                Name: `${firstName} ${lastName}`.trim() || null, Email: email, Phone: phone,
                Quantity: quantity, Country: country, Address: `${address}, ${postalCode} ${city}`,
                'Amount (EUR)': priceDiscounted, Reference: ref,
            }));
        }

        return json({ ok: true, saleId, ref, emailSent, amount: priceDiscounted, currency: 'EUR' });
    } catch (err) {
        console.error('muling-order error:', err);
        return json({ error: err instanceof Error ? err.message : 'server_error' }, 500);
    }
});
