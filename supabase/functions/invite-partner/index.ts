// =============================================================================
// Edge Function : invite-partner
// Crée (ou retrouve) un compte Supabase Auth pour un partenaire (ex. Muling),
// l'associe à sa marque dans `partner_accounts`, et lui envoie un email
// d'invitation avec un lien pour DÉFINIR SON PROPRE MOT DE PASSE — David ne
// choisit ni ne connaît jamais ce mot de passe, conformément aux règles de
// sécurité (jamais de mot de passe géré à la place d'un tiers).
//
// ⚠️ Action SENSIBLE — protégée par une vraie authentification, PAS par le
// jeton partagé SITE_LEAD_TOKEN des autres fonctions : l'appelant doit être
// connecté ET admin (`public.is_site_admin()`), vérifié ICI, côté serveur,
// avant toute création de compte.
//
// Appelée depuis le dashboard admin de l'app (bouton « Inviter un
// partenaire ») avec le JWT de l'admin connecté :
//   supabase.functions.invoke('invite-partner', { body: { email, partner, locale } })
//
// v1 (08/08/2026).
// =============================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';

const JSON_HEADERS = { 'Content-Type': 'application/json' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ALLOWED_LOCALES = ['fr', 'en', 'zh'];
// Où atterrit la personne après avoir cliqué le lien d'invitation. L'app doit
// détecter `type=invite` dans l'URL et proposer un écran « choisis ton mot de
// passe » (supabase.auth.updateUser({ password })) — voir le brief associé.
const APP_URL = 'https://play.handpanstudio.app/';

function json(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
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
    if (req.method === 'OPTIONS') return new Response('ok', { headers: JSON_HEADERS });
    if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

    try {
        const authHeader = req.headers.get('Authorization') ?? '';
        if (!authHeader) return json({ error: 'Unauthorized' }, 401);

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
        if (adminErr || isAdmin !== true) return json({ error: 'Forbidden' }, 403);

        const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
        const email = String(body.email ?? '').trim().toLowerCase();
        const partner = String(body.partner ?? '').trim();
        const locale = String(body.locale ?? 'en').trim();

        if (!EMAIL_RE.test(email)) return json({ error: 'invalid_email' }, 400);
        if (!ALLOWED_LOCALES.includes(locale)) return json({ error: 'invalid_locale' }, 400);

        const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
            auth: { persistSession: false, autoRefreshToken: false },
        });

        // Marque validée EN BASE (partner_profiles), plus par une liste figée
        // dans le code : ajouter un partenaire ne demande plus de redéployer
        // cette fonction (David, 08/08/2026).
        const { data: profile, error: profileErr } = await admin
            .from('partner_profiles').select('display_name').eq('partner', partner).maybeSingle();
        if (profileErr) throw profileErr;
        if (!profile) return json({ error: 'invalid_partner' }, 400);

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
                    subject: locale === 'fr' ? `Invitation — dashboard ${profile.display_name}` : `Invitation — ${profile.display_name} dashboard`,
                    html: inviteEmailHtml(profile.display_name, linkData.properties.action_link, locale),
                });
                emailSent = true;
            } catch (e) {
                console.error('invite-partner mail error:', e);
            } finally {
                try { await c.close(); } catch { /* ignore */ }
            }
        }

        return json({ ok: true, userId, emailSent, actionLink: linkData.properties.action_link });
    } catch (err) {
        console.error('invite-partner error:', err);
        return json({ error: err instanceof Error ? err.message : 'server_error' }, 500);
    }
});
