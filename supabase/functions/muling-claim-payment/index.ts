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
// v5 (02/11/2026) : dépôt factorisé dans `_shared/muling-depot.ts`, partagé avec le lien
//      personnel `muling-proof-link`. Contenu du fichier vérifié (signature PDF, PNG, JPEG),
//      3 Mo maximum. Commande annulée : 409 `order_cancelled`. Corbeille : 404. Commande
//      fusionnée : le déclencheur de 0307 remonte la preuve et Muling reçoit la référence de la
//      commande conservée. L'ancien lien `?commande=<id>` continue de fonctionner.
// v3 (09/08/2026) : corps envoyé en base64 via `textPart()` — même lib, SECOND
//      bug indépendant : `quotedPrintableEncode()` échappe `=` en `=3d`
//      MINUSCULE, interdit par la RFC 2045 §6.7. Cf. _shared/mail.ts.
// =============================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { deposerPreuve } from '../_shared/muling-depot.ts';
import { MULING_SALE_COLS, smtpEnv, type MulingSale } from '../_shared/muling-mail.ts';
import { lirePreuve } from '../_shared/muling-preuve.ts';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

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
        if (!saleId || !email) return json({ error: 'missing_fields' }, 400);
        const lu = lirePreuve(body.fileBase64);
        if (!lu.ok) return json({ error: lu.error === 'missing_file' ? 'invalid_file_type' : lu.error }, 400);

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

        const depot = await deposerPreuve({ admin, env: smtpEnv() }, sale, lu.fichier, {
            langue: body.lang, exigerSansPreuve: false,
        });
        if (!depot.ok) return json({ error: depot.error }, depot.error === 'not_found' ? 404 : 409);
        return json({ ok: true });
    } catch (err) {
        console.error('muling-claim-payment error:', err);
        return json({ error: err instanceof Error ? err.message : 'server_error' }, 500);
    }
});
