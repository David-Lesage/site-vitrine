// =============================================================================
// Edge Function : invite-partner
// Gestion des ACCÈS au dashboard partenaire (Muling & co).
//
// Trois actions, toutes réservées aux admins :
//   • `invite` (défaut)  crée/retrouve un compte Supabase Auth, l'associe à sa
//                        marque dans `partner_accounts`, et envoie l'email
//                        d'invitation avec un lien pour DÉFINIR SON PROPRE mot
//                        de passe — David ne choisit ni ne connaît jamais ce
//                        mot de passe (règle de sécurité : jamais de mot de
//                        passe géré à la place d'un tiers).
//   • `list`             renvoie tous les accès partenaires existants, avec
//                        l'email résolu via l'Admin API (partner_accounts n'a
//                        PAS de colonne email), la date de création du compte
//                        et sa dernière connexion.
//   • `revoke`           RETIRE l'accès : supprime UNIQUEMENT la ligne
//                        `partner_accounts`. Le compte auth, lui, n'est JAMAIS
//                        supprimé (principe du dépôt, cf. admin-users :
//                        « AUCUNE suppression de compte (jamais) »). Sans ligne
//                        partner_accounts, `fetchPartnerAccount()` renvoie null
//                        dans auth/gate.ts → la personne n'est plus routée vers
//                        le dashboard partenaire, et `my_partner_scope()` ne
//                        renvoie plus rien → la vue `partner_orders` est vide.
//
// ⚠️ Actions SENSIBLES — protégées par une vraie authentification, PAS par le
// jeton partagé SITE_LEAD_TOKEN des autres fonctions : l'appelant doit être
// connecté ET admin (`public.is_site_admin()`), vérifié ICI, côté serveur.
//
// Appelée depuis le dashboard admin de l'app avec le JWT de l'admin connecté :
//   supabase.functions.invoke('invite-partner', { body: { action, … } })
//
// v3 (08/08/2026) : en-têtes CORS via _shared/cors.ts (l'appel depuis le
// navigateur échouait sans ça : « Failed to send a request to the Edge Function »).
// v4 (08/08/2026) : ajout de `list` et `revoke` (David : « je veux pouvoir en
// tant qu'admin révoquer un accès au dashboard »). `action` absent = `invite`,
// donc les appels existants continuent de marcher à l'identique.
// v5 (09/08/2026) : objet via `mailSubject()` + corps en base64 via `htmlPart()`
//      — deux bugs distincts de denomailer 1.6.0 (en-tête `Subject:` coupé par un
//      `=\r\n`, et `=` échappé en `=3d` MINUSCULE, interdit RFC 2045 §6.7).
//      Le lien d'invitation est une URL à `?token=…` : un `=` mal décodé la
//      cassait. Cf. _shared/mail.ts.
// =============================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';
import { corsHeadersFor, jsonResponse } from '../_shared/cors.ts';
import { htmlPart, mailSubject } from '../_shared/mail.ts';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ALLOWED_LOCALES = ['fr', 'en', 'zh'];
// Où atterrit la personne après avoir cliqué le lien d'invitation. L'app doit
// détecter `type=invite` dans l'URL et proposer un écran « choisis ton mot de
// passe » (supabase.auth.updateUser({ password })) — voir le brief associé.
const APP_URL = 'https://play.handpanstudio.app/';

type AuthUser = {
    id: string;
    email?: string;
    created_at?: string;
    last_sign_in_at?: string;
};

/**
 * Tous les comptes auth (l'Admin API ne filtre pas côté serveur → pagination).
 * Même motif que `resolveUserId` dans supabase/functions/admin-users/index.ts.
 */
async function listAuthUsers(admin: ReturnType<typeof createClient>): Promise<AuthUser[]> {
    const users: AuthUser[] = [];
    let page = 1;
    const perPage = 1000;
    while (true) {
        const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
        if (error) throw error;
        const batch = (data?.users ?? []) as AuthUser[];
        users.push(...batch);
        if (batch.length < perPage) break;
        page += 1;
        if (page > 50) break; // garde-fou
    }
    return users;
}

/** Résout l'id auth d'un email (insensible à la casse), ou null. */
async function resolveUserId(
    admin: ReturnType<typeof createClient>,
    email: string
): Promise<string | null> {
    const target = email.toLowerCase();
    const users = await listAuthUsers(admin);
    return users.find((u) => (u.email ?? '').toLowerCase() === target)?.id ?? null;
}

function inviteEmailHtml(partnerName: string, actionLink: string, locale: string): string {
    const name = partnerName;
    const zh = locale === 'zh';
    const en = locale === 'en' || zh; // le chinois n'a pas de gabarit dédié : anglais + note
    const t = en ? {
        title: `You're invited to the ${name} × David Lesage dashboard ✨`,
        p1: `David Lesage has given you access to a shared dashboard to track orders and commissions for ${name}.`,
        cta: 'Set my password',
        p2: 'This link is personal and expires after a few days. Once your password is set, you can log back in anytime at the address above.',
        zhNote: zh ? '（本邮件为英文，如需帮助请直接回复此邮件。）' : '',
    } : {
        title: `Tu es invité·e sur le dashboard ${name} × David Lesage ✨`,
        p1: `David Lesage t'a donné accès à un dashboard partagé pour suivre les commandes et commissions ${name}.`,
        cta: 'Choisir mon mot de passe',
        p2: 'Ce lien est personnel et expire après quelques jours. Une fois ton mot de passe défini, tu pourras te reconnecter à tout moment à l’adresse ci-dessus.',
        zhNote: '',
    };
    return `<!doctype html><html><head><meta charset="utf-8" /></head>
<body style="margin:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
        <tr><td style="padding:28px 28px 4px;">
          <div style="font-size:20px;font-weight:700;color:#111827;">${t.title}</div>
          <p style="margin:14px 0 0;color:#374151;font-size:15px;line-height:1.6;">${t.p1}</p>
        </td></tr>
        <tr><td style="padding:20px 28px;">
          <a href="${actionLink}" style="display:inline-block;background:#b4462a;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 28px;border-radius:999px;">${t.cta}</a>
        </td></tr>
        <tr><td style="padding:0 28px 28px;">
          <p style="margin:0;color:#6b7280;font-size:12px;line-height:1.6;">${t.p2}</p>
          ${t.zhNote ? `<p style="margin:8px 0 0;color:#6b7280;font-size:12px;">${t.zhNote}</p>` : ''}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') return new Response("ok", { headers: corsHeadersFor(req) });
    if (req.method !== 'POST') return jsonResponse(req, { error: 'Method not allowed' }, 405);

    try {
        const authHeader = req.headers.get('Authorization') ?? '';
        if (!authHeader) return jsonResponse(req, { error: 'Unauthorized' }, 401);

        const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
        const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
        const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

        // Client « as user » : respecte la RLS, donc is_site_admin() s'évalue
        // avec l'identité réelle de l'appelant — impossible à falsifier depuis
        // le client, contrairement à un simple jeton partagé.
        const asUser = createClient(SUPABASE_URL, ANON_KEY, {
            global: { headers: { Authorization: authHeader } },
            auth: { persistSession: false, autoRefreshToken: false },
        });
        const { data: isAdmin, error: adminErr } = await asUser.rpc('is_site_admin');
        if (adminErr || isAdmin !== true) return jsonResponse(req, { error: 'Forbidden' }, 403);

        const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
        // `action` absent = `invite` : les appels historiques (email/partner/locale
        // sans action) gardent EXACTEMENT le même comportement.
        const action = String(body.action ?? 'invite').trim() || 'invite';

        const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
            auth: { persistSession: false, autoRefreshToken: false },
        });

        // === LIST — tous les accès partenaires en place ========================
        // `partner_accounts` n'a pas d'email : on le résout via l'Admin API, et
        // on en profite pour remonter création + dernière connexion (utile pour
        // repérer un compte jamais utilisé, ex. une adresse mal tapée).
        if (action === 'list') {
            const { data: accRows, error: accErr } = await admin
                .from('partner_accounts')
                .select('user_id, partner, locale, created_at');
            if (accErr) throw accErr;

            const users = await listAuthUsers(admin);
            const byId = new Map<string, AuthUser>();
            for (const u of users) byId.set(u.id, u);

            const accounts = ((accRows ?? []) as Array<{
                user_id: string; partner: string; locale: string; created_at: string | null;
            }>).map((a) => {
                const u = byId.get(a.user_id);
                return {
                    user_id: a.user_id,
                    partner: a.partner,
                    locale: a.locale,
                    // Date d'octroi de l'accès (ligne partner_accounts), pas du compte auth.
                    granted_at: a.created_at,
                    email: u?.email ?? '',
                    // `orphan` : ligne partner_accounts sans compte auth correspondant.
                    orphan: !u,
                    accountCreatedAt: u?.created_at ?? null,
                    lastSignIn: u?.last_sign_in_at ?? null,
                };
            });

            accounts.sort(
                (a, b) => a.partner.localeCompare(b.partner) || a.email.localeCompare(b.email)
            );
            return jsonResponse(req, { accounts });
        }

        // === REVOKE — retirer l'accès au dashboard partenaire ==================
        // Supprime UNIQUEMENT la ligne `partner_accounts`. Le compte auth reste
        // intact : on ne supprime JAMAIS de compte dans ce dépôt.
        if (action === 'revoke') {
            const rawEmail = String(body.email ?? '').trim().toLowerCase();
            let userId = String(body.user_id ?? '').trim();

            if (!userId && !rawEmail) {
                return jsonResponse(req, { error: 'user_id ou email requis.' }, 400);
            }
            if (!userId) {
                const found = await resolveUserId(admin, rawEmail);
                if (!found) return jsonResponse(req, { error: 'Aucun compte avec cet email.' }, 404);
                userId = found;
            }

            // On relit la ligne AVANT de la supprimer : ça permet de renvoyer la
            // marque exacte à afficher dans le message de confirmation, et de
            // distinguer « déjà révoqué » d'une vraie suppression.
            const { data: existing, error: exErr } = await admin
                .from('partner_accounts')
                .select('user_id, partner, locale')
                .eq('user_id', userId)
                .maybeSingle();
            if (exErr) throw exErr;
            if (!existing) {
                return jsonResponse(req, { error: 'Ce compte n’a aucun accès partenaire.' }, 404);
            }

            const { error: delErr } = await admin
                .from('partner_accounts')
                .delete()
                .eq('user_id', userId);
            if (delErr) throw delErr;

            // Email renvoyé pour l'affichage — résolu seulement si on ne l'avait pas.
            let email = rawEmail;
            if (!email) {
                const users = await listAuthUsers(admin);
                email = users.find((u) => u.id === userId)?.email ?? '';
            }

            return jsonResponse(req, {
                ok: true,
                revoked: true,
                user_id: userId,
                email,
                partner: (existing as { partner: string }).partner,
                // Rappel explicite : le compte auth n'a PAS été touché.
                authAccountKept: true,
            });
        }

        // === INVITE (défaut) — comportement historique inchangé ================
        if (action !== 'invite') {
            return jsonResponse(req, { error: `Action inconnue : ${action}` }, 400);
        }

        const email = String(body.email ?? '').trim().toLowerCase();
        const partner = String(body.partner ?? '').trim();
        const locale = String(body.locale ?? 'en').trim();

        if (!EMAIL_RE.test(email)) return jsonResponse(req, { error: 'invalid_email' }, 400);
        if (!ALLOWED_LOCALES.includes(locale)) return jsonResponse(req, { error: 'invalid_locale' }, 400);

        // Marque validée EN BASE (partner_profiles), plus par une liste figée
        // dans le code : ajouter un partenaire ne demande plus de redéployer
        // cette fonction (David, 08/08/2026).
        const { data: profile, error: profileErr } = await admin
            .from('partner_profiles').select('display_name').eq('partner', partner).maybeSingle();
        if (profileErr) throw profileErr;
        if (!profile) return jsonResponse(req, { error: 'invalid_partner' }, 400);

        // generateLink (et non inviteUserByEmail) : on garde la main sur
        // l'email envoyé — même infra SMTP que le reste du site, pas de
        // dépendance à la config email de Supabase Auth (non vérifiée ici).
        const { data: linkData, error: linkErr } = await admin.auth.admin.generateLink({
            type: 'invite',
            email,
            options: { redirectTo: APP_URL },
        });
        if (linkErr) throw linkErr;
        const userId = linkData.user?.id;
        if (!userId) throw new Error('no_user_id_returned');

        // Associe le compte à SA marque — c'est cette ligne que la RLS de
        // affiliate_sales utilise pour filtrer ce que le partenaire voit.
        const { error: paErr } = await admin.from('partner_accounts')
            .upsert({ user_id: userId, partner, locale }, { onConflict: 'user_id' });
        if (paErr) throw paErr;

        let emailSent = false;
        const host = Deno.env.get('SMTP_HOST') ?? '';
        const user = Deno.env.get('SMTP_USER') ?? '';
        const pass = Deno.env.get('SMTP_PASS') ?? '';
        const from = Deno.env.get('SMTP_FROM') ?? user;
        const port = Number(Deno.env.get('SMTP_PORT') ?? '465');

        if (host && user && pass && from) {
            const c = new SMTPClient({ connection: { hostname: host, port, tls: port === 465, auth: { username: user, password: pass } } });
            try {
                await c.send({
                    from, to: email,
                    subject: mailSubject(locale === 'fr' ? `Invitation — dashboard ${profile.display_name}` : `Invitation — ${profile.display_name} dashboard`),
                    mimeContent: [htmlPart(inviteEmailHtml(profile.display_name, linkData.properties.action_link, locale))],
                });
                emailSent = true;
            } catch (e) {
                console.error('invite-partner mail error:', e);
            } finally {
                try { await c.close(); } catch { /* ignore */ }
            }
        }

        return jsonResponse(req, { ok: true, userId, emailSent, actionLink: linkData.properties.action_link });
    } catch (err) {
        console.error('invite-partner error:', err);
        return jsonResponse(req, { error: err instanceof Error ? err.message : 'server_error' }, 500);
    }
});
