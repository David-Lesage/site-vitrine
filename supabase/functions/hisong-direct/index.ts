// =============================================================================
// Edge Function : hisong-direct
// Vente EN DIRECT, au showroom, du micro Hisong AirStudio S1 (stock consigné).
// Formulaire `HisongDirectForm.astro` sur /micro-hisong (FR/EN/ES).
//
// Pourquoi une fonction dédiée et pas `muling-order` : tout, dans muling-order,
// est propre à Muling (IBAN Muling, email au fabricant à chaque commande,
// référence RESONANCE, écran de preuve de virement). Hisong n'a rien de cela —
// l'achat en ligne se fait sur hisong.io avec le code, et la vente directe est
// réglée à David sur place. `site-lead` est réservé (chantier achat Neotone).
//
// Écrit dans public.affiliate_sales — la table que lit déjà l'app pour les
// ventes — avec partner='hisong', source='hisong-direct' et
// purchase_channel='showroom' : MÊME colonne et MÊME valeur que la vente directe
// Muling (`muling-order` v5). L'app crée le mouvement d'inventaire `sale_direct`
// à partir de ce champ : cette fonction ne touche JAMAIS à stock_movements.
//
// Appelée par /api/hisong-direct.js (Vercel), serveur à serveur, protégée par
// SITE_LEAD_TOKEN. verify_jwt = false. v1 (25/10/2026), non déployée.
// =============================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';
import { htmlPart, mailSubject } from '../_shared/mail.ts';

const ADMIN_EMAIL = 'contact@lesagedavid.fr';
const JSON_HEADERS = { 'Content-Type': 'application/json' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// ⚠️ Dupliqué depuis src/i18n/hisong.ts (`hisongPrices`) — les DEUX changent
// ensemble. Prix TTC affichés sur la fiche, SANS le code (le code −5 % ne vaut
// que sur hisong.io).
const PACKS: Record<string, { label: string; price: number }> = {
    s1: { label: 'AirStudio S1 (Standard Pack)', price: 270.95 },
    s1RxPlus: { label: 'AirStudio S1 + RX Plus (Universal Pack)', price: 360.95 },
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

const COPY: Record<string, { subject: string; title: string; p1: string; sign: string; amount: string }> = {
    fr: { subject: 'David Lesage — ton micro Hisong', title: 'Merci pour ton achat ✨', p1: 'Ton achat au showroom est bien enregistré. Je te remets le micro en main propre. Voici le récapitulatif, à garder.', sign: 'Merci,<br />David Lesage', amount: 'Montant' },
    en: { subject: 'David Lesage — your Hisong mic', title: 'Thanks for your purchase ✨', p1: 'Your showroom purchase is recorded. I’m handing you the mic in person. Here is the summary, for your records.', sign: 'Thank you,<br />David Lesage', amount: 'Amount' },
    es: { subject: 'David Lesage — tu micrófono Hisong', title: 'Gracias por tu compra ✨', p1: 'Tu compra en el showroom está registrada. Te entrego el micrófono en mano. Aquí tienes el resumen, para guardarlo.', sign: 'Gracias,<br />David Lesage', amount: 'Importe' },
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
        const quantity = Number.isFinite(rawQty) && rawQty > 0 ? Math.min(Math.round(rawQty), 10) : 1;
        const termsAccepted = body.termsAccepted === true;
        const newsOptIn = body.newsOptIn === true;
        const now = new Date().toISOString();

        if (!EMAIL_RE.test(email)) return json({ error: 'invalid_email' }, 400);
        if (!firstName && !lastName) return json({ error: 'missing_name' }, 400);

        const total = Math.round(pack.price * quantity * 100) / 100;
        const admin = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
            { auth: { persistSession: false, autoRefreshToken: false } });

        const { data: ins, error } = await admin.from('affiliate_sales').insert({
            partner: 'hisong',
            source: 'hisong-direct',
            purchase_channel: 'showroom',
            customer_name: `${firstName} ${lastName}`.trim() || null,
            email, phone,
            quantity,
            price_original_eur: total,
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
                     <p style="margin:16px 0 0;color:#9ca3af;font-size:12px;">${t.sign}</p>`))] });
                emailSent = true;
            } catch (e) { console.error('hisong-direct mail error:', e); }
            finally { try { await c.close(); } catch { /* ignore */ } }
        }
        return json({ ok: true, saleId, emailSent, saleMode: 'showroom', amount: total, currency: 'EUR' });
    } catch (err) {
        console.error('hisong-direct error:', err);
        return json({ error: err instanceof Error ? err.message : 'server_error' }, 500);
    }
});
