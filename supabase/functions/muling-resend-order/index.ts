// =============================================================================
// Edge Function : muling-resend-order — ADMIN SEUL
// Bouton « 📧 Envoyer à Muling » du panneau Ventes & affiliations de l'app.
// Envoie (ou renvoie) à Muling TOUTES les infos d'une commande : nom, e-mail,
// téléphone, adresse de livraison, infos livreur, et la PREUVE DE VIREMENT en
// pièce jointe ; David en copie. Même composition que le mail automatique du
// dépôt de preuve (`_shared/muling-mail.ts`).
//
// Cas d'usage (16/10/2026, RASMUS DAHLVIK) : le téléphone manquait ; une fois
// récupéré auprès du client et saisi dans le panneau, David renvoie le dossier
// complet à Muling en un clic.
//
// Appel : supabase.functions.invoke('muling-resend-order', { body: { saleId } })
// SÉCURITÉ : JWT de l'appelant → `is_site_admin()` évalué côté base.
// =============================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { corsHeadersFor, jsonResponse } from '../_shared/cors.ts';
import {
    downloadProof, MULING_SALE_COLS, sendMulingOrderMail, smtpEnv, type MulingSale,
} from '../_shared/muling-mail.ts';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeadersFor(req) });
    if (req.method !== 'POST') return jsonResponse(req, { error: 'Method not allowed' }, 405);

    try {
        const authHeader = req.headers.get('Authorization') ?? '';
        if (!authHeader) return jsonResponse(req, { error: 'Unauthorized' }, 401);

        const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
        const asUser = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_ANON_KEY') ?? '', {
            global: { headers: { Authorization: authHeader } },
            auth: { persistSession: false, autoRefreshToken: false },
        });
        const { data: isAdmin } = await asUser.rpc('is_site_admin');
        if (isAdmin !== true) return jsonResponse(req, { error: 'forbidden' }, 403);

        const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
        const saleId = String(body.saleId ?? '').trim();
        if (!UUID.test(saleId)) return jsonResponse(req, { error: 'missing_sale_id' }, 400);

        const admin = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', {
            auth: { persistSession: false, autoRefreshToken: false },
        });
        const { data: saleRow, error } = await admin
            .from('affiliate_sales').select(MULING_SALE_COLS)
            .eq('id', saleId).eq('partner', 'muling').is('deleted_at', null).maybeSingle();
        if (error) throw error;
        const sale = saleRow as unknown as MulingSale | null;
        if (!sale) return jsonResponse(req, { error: 'not_found' }, 404);

        const env = smtpEnv();
        if (!env) return jsonResponse(req, { error: 'smtp_not_configured' }, 500);

        const proof = await downloadProof(admin, sale.payment_proof_path);
        const sent = await sendMulingOrderMail(env, sale, proof, true);
        if (!sent) return jsonResponse(req, { error: 'mail_failed' }, 502);

        return jsonResponse(req, { ok: true, withProof: !!proof, withPhone: !!String(sale.phone ?? '').trim() });
    } catch (err) {
        console.error('muling-resend-order error:', err);
        return jsonResponse(req, { error: err instanceof Error ? err.message : 'server_error' }, 500);
    }
});
