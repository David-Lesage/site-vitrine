// =============================================================================
// Edge Function : showroom-reservation  (v1, 24/10/2026 — session site vitrine)
//
// Deux usages, pour les micros vendus au showroom (Muling HMP-2, Hisong S1) :
//
//  GET  ?action=stock
//       → { muling: <n>, hisong: <n>, at: ISO }  — nombre de micros au showroom,
//       lu dans la vue `stock_levels` (qty_on_hand) pour les item_key
//       'muling-handpan' et 'hisong-micro'. LECTURE SEULE, aucune autre donnée.
//       Public (le site l'appelle via /api/showroom-stock, cache 60 s).
//       Pourquoi une EF et pas une vue publique : `stock_items`/`stock_movements`
//       sont réservées aux admins (RLS) ; ne rien changer au schéma côté site.
//
//  POST { action:'pickup', saleId, email, pickup:{ kind:'showcase'|'custom', date, time, note } }
//       → enregistre la date + l'horaire de retrait PROPOSÉS par le client, après
//       le dépôt de sa preuve de paiement. Écrit dans la colonne EXISTANTE
//       `affiliate_sales.admin_note` (ajout d'une ligne « Retrait proposé : … »,
//       jamais d'écrasement). Garde-fous : jeton SITE_LEAD_TOKEN (serveur à
//       serveur), l'email doit être celui de la vente, purchase_channel =
//       'showroom', partner muling|hisong. Aucun mail envoyé (David voit la ligne
//       dans l'admin des ventes).
//
// verify_jwt = false (déployé avec --no-verify-jwt).
// =============================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-site-token',
};
const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
    new Response(JSON.stringify(body), { status, headers: { ...HEADERS, ...extra } });
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;
const ITEMS: Record<string, string> = { 'muling-handpan': 'muling', 'hisong-micro': 'hisong' };

const admin = () => createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    { auth: { persistSession: false, autoRefreshToken: false } });

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: HEADERS });
    try {
        if (req.method === 'GET') {
            const { data, error } = await admin().from('stock_levels').select('item_key, qty_on_hand, status').in('item_key', Object.keys(ITEMS));
            if (error) throw error;
            const out: Record<string, number | string> = { muling: 0, hisong: 0, at: new Date().toISOString() };
            for (const r of data ?? []) out[ITEMS[r.item_key as string]] = r.status === 'active' ? Math.max(0, Number(r.qty_on_hand) || 0) : 0;
            return json(out, 200, { 'Cache-Control': 'public, max-age=60' });
        }
        if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

        const expected = Deno.env.get('SITE_LEAD_TOKEN') ?? '';
        if (expected && req.headers.get('x-site-token') !== expected) return json({ error: 'Forbidden' }, 403);
        const body = (await req.json().catch(() => ({}))) as Record<string, any>;
        if (body.action !== 'pickup') return json({ error: 'unknown_action' }, 400);
        const saleId = String(body.saleId ?? '').trim();
        const email = String(body.email ?? '').trim().toLowerCase();
        const p = (body.pickup ?? {}) as Record<string, unknown>;
        const kind = p.kind === 'showcase' ? 'showcase' : 'custom';
        const date = String(p.date ?? '').trim();
        const time = String(p.time ?? '').trim();
        const note = String(p.note ?? '').trim().slice(0, 500);
        if (!UUID_RE.test(saleId) || !email) return json({ error: 'missing_fields' }, 400);
        if (!DATE_RE.test(date)) return json({ error: 'invalid_date' }, 400);
        if (time && !TIME_RE.test(time)) return json({ error: 'invalid_time' }, 400);

        const db = admin();
        const { data: sale, error } = await db.from('affiliate_sales')
            .select('id, email, partner, purchase_channel, admin_note').eq('id', saleId).is('deleted_at', null).maybeSingle();
        if (error) throw error;
        if (!sale || String(sale.email ?? '').toLowerCase() !== email) return json({ error: 'not_found' }, 404);
        if (sale.purchase_channel !== 'showroom' || !['muling', 'hisong'].includes(String(sale.partner))) return json({ error: 'not_showroom' }, 400);

        const line = `Retrait proposé (${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC) : ${kind === 'showcase' ? 'showcase du' : 'date choisie'} ${date}${time ? ' à ' + time : ''}${note ? ' — ' + note : ''}`;
        const admin_note = [sale.admin_note, line].filter(Boolean).join('\n');
        const { error: updErr } = await db.from('affiliate_sales').update({ admin_note }).eq('id', saleId);
        if (updErr) throw updErr;
        return json({ ok: true });
    } catch (err) {
        console.error('showroom-reservation error:', err);
        return json({ error: 'server_error' }, 500);
    }
});
