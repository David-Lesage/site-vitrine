// =============================================================================
// Edge Function : muling-claim-payment
// Étape 2 de la commande Muling : la personne dépose une preuve de virement
// (image ou PDF) et clique « J'ai effectué le virement ». Écrit dans le
// bucket Storage privé `muling-proofs` + fait passer la ligne en
// fulfillment_status = 'payment_claimed' (déclaratif — David/Muling
// confirment ensuite réellement, cf. affiliate_sales.status).
//
// Appelée par /api/muling-claim.js (Vercel) — protégée par SITE_LEAD_TOKEN.
// verify_jwt = false. L'email de la commande DOIT correspondre à celui
// fourni ici : seul David/Muling peuvent la retrouver sans le connaître,
// donc c'est une vérification suffisante pour ce volume de commandes.
//
// v1 (08/08/2026).
// =============================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';

const ADMIN_EMAIL = 'contact@lesagedavid.fr';
const MULING_EMAIL = '85846599@qq.com';
const JSON_HEADERS = { 'Content-Type': 'application/json' };
const MAX_BYTES = 6 * 1024 * 1024; // ~5 Mo de fichier réel une fois décodé
const ALLOWED_TYPES: Record<string, string> = {
    'image/png': 'png', 'image/jpeg': 'jpg', 'application/pdf': 'pdf',
};

function json(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: JSON_HEADERS });
    if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

    try {
        const expected = Deno.env.get('SITE_LEAD_TOKEN') ?? '';
        if (expected && req.headers.get('x-site-token') !== expected) return json({ error: 'Forbidden' }, 403);

        const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
        const saleId = String(body.saleId ?? '').trim();
        const email = String(body.email ?? '').trim().toLowerCase();
        const fileBase64 = String(body.fileBase64 ?? '');
        const fileType = String(body.fileType ?? '');
        const lang = String(body.lang ?? 'fr').trim().slice(0, 5);

        if (!saleId || !email) return json({ error: 'missing_fields' }, 400);
        const ext = ALLOWED_TYPES[fileType];
        if (!fileBase64 || !ext) return json({ error: 'invalid_file_type' }, 400);
        // Base64 gonfle la taille d'environ 4/3 : on borne AVANT décodage.
        if (fileBase64.length > MAX_BYTES * 1.4) return json({ error: 'file_too_large' }, 400);

        const admin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
            { auth: { persistSession: false, autoRefreshToken: false } },
        );

        const { data: sale, error: fetchErr } = await admin
            .from('affiliate_sales').select('id, email, customer_name, quantity, price_discounted_eur')
            .eq('id', saleId).eq('partner', 'muling').maybeSingle();
        if (fetchErr) throw fetchErr;
        // L'email doit correspondre à celui de la commande : preuve suffisante
        // à ce volume, sans exiger de compte utilisateur pour le client.
        if (!sale || String(sale.email ?? '').toLowerCase() !== email) {
            return json({ error: 'not_found' }, 404);
        }

        const bytes = Uint8Array.from(atob(fileBase64), (c) => c.charCodeAt(0));
        if (bytes.byteLength > MAX_BYTES) return json({ error: 'file_too_large' }, 400);

        const path = `${saleId}/${Date.now()}.${ext}`;
        const { error: upErr } = await admin.storage.from('muling-proofs').upload(path, bytes, {
            contentType: fileType, upsert: false,
        });
        if (upErr) throw upErr;

        const { error: updErr } = await admin.from('affiliate_sales').update({
            payment_proof_path: path,
            payment_claimed_at: new Date().toISOString(),
            fulfillment_status: 'payment_claimed',
        }).eq('id', saleId);
        if (updErr) throw updErr;

        // Notification — pas de pièce jointe (le fichier reste dans le bucket
        // privé, consultable depuis le dashboard) : juste prévenir vite.
        const host = Deno.env.get('SMTP_HOST') ?? '';
        const user = Deno.env.get('SMTP_USER') ?? '';
        const pass = Deno.env.get('SMTP_PASS') ?? '';
        const from = Deno.env.get('SMTP_FROM') ?? user;
        const port = Number(Deno.env.get('SMTP_PORT') ?? '465');
        if (host && user && pass && from) {
            const send = async (to: string, subject: string, text: string) => {
                const c = new SMTPClient({ connection: { hostname: host, port, tls: port === 465, auth: { username: user, password: pass } } });
                try { await c.send({ from, to, subject, content: text }); }
                catch (e) { console.error('muling-claim mail error:', e); }
                finally { try { await c.close(); } catch { /* ignore */ } }
            };
            const name = sale.customer_name ?? email;
            await send(ADMIN_EMAIL, `[Muling] Preuve de virement déposée — ${name}`,
                `${name} (${email}) déclare avoir payé sa commande (${sale.quantity}x, ${sale.price_discounted_eur} USD). Preuve dans le dashboard.`);
            await send(MULING_EMAIL, `Payment proof submitted — ${name}`,
                `${name} (${email}) has submitted proof of payment for their order (${sale.quantity}x HMP-2, ${sale.price_discounted_eur} USD). Available in the shared dashboard.`);
        }

        return json({ ok: true });
    } catch (err) {
        console.error('muling-claim-payment error:', err);
        return json({ error: err instanceof Error ? err.message : 'server_error' }, 500);
    }
});
