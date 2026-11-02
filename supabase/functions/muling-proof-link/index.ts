// Edge Function : muling-proof-link. Voir handler.ts. Déploiement avec verify_jwt = false,
// comme muling-order : le visiteur n'est pas connecté, les opérations admin vérifient le JWT.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { corsHeadersFor, jsonResponse } from '../_shared/cors.ts';
import { smtpEnv } from '../_shared/muling-mail.ts';
import { traiter } from './handler.ts';

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeadersFor(req) });
    const url = Deno.env.get('SUPABASE_URL') ?? '';
    try {
        return await traiter(req, {
            admin: createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', {
                auth: { persistSession: false, autoRefreshToken: false },
            }),
            env: smtpEnv(),
            siteToken: Deno.env.get('SITE_LEAD_TOKEN') ?? '',
            estAdmin: async (r) => {
                const auth = r.headers.get('Authorization') ?? '';
                if (!auth) return false;
                const asUser = createClient(url, Deno.env.get('SUPABASE_ANON_KEY') ?? '', {
                    global: { headers: { Authorization: auth } },
                    auth: { persistSession: false, autoRefreshToken: false },
                });
                const { data } = await asUser.rpc('is_site_admin');
                return data === true;
            },
            reponse: jsonResponse,
        });
    } catch (err) {
        // Le message d'erreur reste côté serveur : il pourrait citer une donnée de la commande.
        console.error('muling-proof-link error:', err instanceof Error ? err.message : err);
        return jsonResponse(req, { error: 'server_error' }, 500);
    }
});
