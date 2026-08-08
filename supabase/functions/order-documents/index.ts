// =============================================================================
// Edge Function : order-documents
// Échange de documents (factures) par commande, dans les 2 sens : admin ↔
// partenaire. Bucket privé `order-documents`, table `public.order_documents`.
//
// Actions (POST body.action) :
//   'list'   { saleId }                                  -> { ok, docs: [...] }
//   'upload' { saleId, fileBase64, fileType, label? }     -> { ok, doc }
//
// L'appartenance de la commande à l'appelant est VÉRIFIÉE CÔTÉ SERVEUR : admin
// via is_site_admin(), partenaire via partner_orders (RLS my_partner_scope()).
// v1 (08/08/2026).
// =============================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const JSON_HEADERS = { 'Content-Type': 'application/json' };
const MAX_BYTES = 8 * 1024 * 1024;
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
        const authHeader = req.headers.get('Authorization') ?? '';
        if (!authHeader) return json({ error: 'Unauthorized' }, 401);

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
        if (!saleId) return json({ error: 'missing_sale_id' }, 400);

        const { data: isAdmin } = await asUser.rpc('is_site_admin');
        let role: 'admin' | 'partner';
        if (isAdmin === true) {
            role = 'admin';
        } else {
            const { data: order } = await asUser.from('partner_orders').select('id').eq('id', saleId).maybeSingle();
            if (!order) return json({ error: 'not_found' }, 404);
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
            return json({ ok: true, docs: withUrls });
        }

        if (action === 'upload') {
            const fileBase64 = String(body.fileBase64 ?? '');
            const fileType = String(body.fileType ?? '');
            const label = body.label ? String(body.label).slice(0, 200) : null;
            const ext = ALLOWED_TYPES[fileType];
            if (!fileBase64 || !ext) return json({ error: 'invalid_file_type' }, 400);
            if (fileBase64.length > MAX_BYTES * 1.4) return json({ error: 'file_too_large' }, 400);
            const bytes = Uint8Array.from(atob(fileBase64), (c) => c.charCodeAt(0));
            if (bytes.byteLength > MAX_BYTES) return json({ error: 'file_too_large' }, 400);

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
            return json({ ok: true, doc: { ...doc, url: signed?.signedUrl ?? null } });
        }

        return json({ error: 'invalid_action' }, 400);
    } catch (err) {
        console.error('order-documents error:', err);
        return json({ error: err instanceof Error ? err.message : 'server_error' }, 500);
    }
});
