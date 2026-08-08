// =============================================================================
// Edge Function : partner-proof-url
// Renvoie une URL signée (courte durée) vers la preuve de virement d'une
// commande, UNIQUEMENT si l'appelant est le partenaire propriétaire de cette
// commande (via partner_orders / my_partner_scope()). Le bucket muling-proofs
// est privé et n'a aucune policy publique : ceci est le seul chemin d'accès.
//
// Appel : supabase.functions.invoke('partner-proof-url', { body: { saleId } })
// v1 (08/08/2026).
// =============================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { corsHeadersFor, jsonResponse } from '../_shared/cors.ts';

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeadersFor(req) });
    if (req.method !== 'POST') return jsonResponse(req, { error: 'Method not allowed' }, 405);

    try {
        const authHeader = req.headers.get('Authorization') ?? '';
        if (!authHeader) return jsonResponse(req, { error: 'Unauthorized' }, 401);

        const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
        const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
        const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

        // Client « as user » : la RLS de partner_orders garantit que cette
        // requête ne peut renvoyer qu'une commande appartenant à l'appelant.
        const asUser = createClient(SUPABASE_URL, ANON_KEY, {
            global: { headers: { Authorization: authHeader } },
            auth: { persistSession: false, autoRefreshToken: false },
        });

        const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
        const saleId = String(body.saleId ?? '').trim();
        if (!saleId) return jsonResponse(req, { error: 'missing_sale_id' }, 400);

        const { data: order, error: orderErr } = await asUser
            .from('partner_orders')
            .select('id')
            .eq('id', saleId)
            .maybeSingle();
        if (orderErr) throw orderErr;
        if (!order) return jsonResponse(req, { error: 'not_found' }, 404);

        const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
            auth: { persistSession: false, autoRefreshToken: false },
        });
        const { data: sale, error: fetchErr } = await admin
            .from('affiliate_sales')
            .select('payment_proof_path')
            .eq('id', saleId)
            .maybeSingle();
        if (fetchErr) throw fetchErr;
        if (!sale?.payment_proof_path) return jsonResponse(req, { error: 'no_proof' }, 404);

        const { data: signed, error: signErr } = await admin.storage
            .from('muling-proofs')
            .createSignedUrl(sale.payment_proof_path, 300); // 5 min
        if (signErr) throw signErr;

        return jsonResponse(req, { ok: true, url: signed.signedUrl });
    } catch (err) {
        console.error('partner-proof-url error:', err);
        return jsonResponse(req, { error: err instanceof Error ? err.message : 'server_error' }, 500);
    }
});
