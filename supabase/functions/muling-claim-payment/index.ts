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
// v2 (09/08/2026) : objets d'email passés par `mailSubject()` — denomailer 1.6.0
//      coupait l'en-tête `Subject:` avec un `=\r\n` dès qu'il dépassait 74
//      caractères encodés, ce qui faisait basculer tous les en-têtes suivants
//      dans le corps (email affiché en source MIME brute). Cf. _shared/mail.ts.
// v4 (16/10/2026) : le mail à Muling passe par `_shared/muling-mail.ts` — la
//      PREUVE DE VIREMENT est jointe au mail (au lieu de « dans le dashboard »),
//      la ligne `Phone:` est toujours présente (mention explicite si absente),
//      les infos livreur suivent. Incident RASMUS DAHLVIK : Muling a dû redemander
//      le téléphone.
// v3 (09/08/2026) : corps envoyé en base64 via `textPart()` — même lib, SECOND
//      bug indépendant : `quotedPrintableEncode()` échappe `=` en `=3d`
//      MINUSCULE, interdit par la RFC 2045 §6.7. Cf. _shared/mail.ts.
// =============================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import {
    MULING_SALE_COLS, sendMail, sendMulingOrderMail, smtpEnv, type MulingSale,
} from '../_shared/muling-mail.ts';

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

        const { data: saleRow, error: fetchErr } = await admin
            .from('affiliate_sales')
            .select(MULING_SALE_COLS)
            .eq('id', saleId).eq('partner', 'muling').maybeSingle();
        if (fetchErr) throw fetchErr;
        const sale = saleRow as unknown as MulingSale | null;
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

        // Notifications. Le mail à Muling porte la preuve en PIÈCE JOINTE (les
        // octets sont déjà là : on ne relit pas le bucket). Une panne de mail ne
        // défait pas le dépôt — la preuve est enregistrée et reste dans le dashboard.
        const env = smtpEnv();
        if (env) {
            const name = sale.customer_name ?? email;
            const ref = sale.order_ref ?? saleId;

            // Un seul email à Muling, David en copie.
            await sendMulingOrderMail(
                env,
                { ...sale, payment_proof_path: path },
                { bytes, ext },
                false,
            );

            // Confirmation au CLIENT — preuve écrite pour lui que son dépôt a
            // bien été reçu et transmis (David, 08/08/2026 : « qu'elle ait
            // aussi une preuve »). Pas de cc ici, c'est un email personnel.
            const fr = lang === 'fr';
            await sendMail(env, {
                to: email,
                subject: fr ? `Ta preuve de virement est bien reçue — réf. ${ref}` : `Your proof of payment was received — ref. ${ref}`,
                text: (fr ? [
                    `Bonjour ${name},`,
                    '',
                    'C’est confirmé : ta preuve de virement a bien été reçue et transmise à Muling, avec toutes les infos de ta commande.',
                    '',
                    `Quantité : ${sale.quantity}x HMP-2`,
                    `Montant : ${sale.price_discounted_eur} EUR`,
                    `Référence : ${ref}`,
                    '',
                    'Muling va vérifier la réception du virement et te recontacter directement pour la suite (expédition et suivi de commande).',
                    'Garde cet email comme preuve de ta démarche.',
                    '',
                    'Merci,',
                    'David Lesage',
                ] : [
                    `Hi ${name},`,
                    '',
                    'Confirmed: your proof of payment has been received and sent to Muling, along with your full order details.',
                    '',
                    `Quantity: ${sale.quantity}x HMP-2`,
                    `Amount: ${sale.price_discounted_eur} EUR`,
                    `Reference: ${ref}`,
                    '',
                    'Muling will check the transfer and get in touch with you directly for the next steps (shipping and tracking).',
                    'Keep this email as proof of your submission.',
                    '',
                    'Thank you,',
                    'David Lesage',
                ]).join('\n'),
            });
        }

        return json({ ok: true });
    } catch (err) {
        console.error('muling-claim-payment error:', err);
        return json({ error: err instanceof Error ? err.message : 'server_error' }, 500);
    }
});
