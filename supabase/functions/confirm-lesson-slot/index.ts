// =============================================================================
// Edge Function : confirm-lesson-slot
// -----------------------------------------------------------------------------
// « Confirmer ce créneau » DEPUIS L'EMAIL, en un clic, sans ouvrir l'application.
//
// Quand une demande de cours arrive du site, `site-lead` crée une ligne
// `public.lessons` en statut `proposed` (migration 0037 de l'app) ET met dans la
// notification envoyée à David un bouton PAR CRÉNEAU proposé. Chaque bouton
// pointe ici avec un jeton signé, propre à CE cours et à CE créneau.
//
// Un clic ⇒ le créneau est retenu (`starts_at` figé, `status = 'confirmed'`),
// l'élève reçoit un email de confirmation, et David voit une page de retour.
//
// ── POURQUOI PAS DE « VRAIE » RÉPONSE PAR EMAIL ──────────────────────────────
// Analyser une réponse écrite (« ok pour jeudi ») supposerait de RECEVOIR des
// emails : ce projet n'envoie que du sortant (SMTP/denomailer). Il faudrait un
// relevé IMAP ou un fournisseur d'entrant, plus une extraction d'intention en
// texte libre — beaucoup de pièces fragiles pour le même résultat. Un lien signé
// donne le même geste (« je réponds depuis ma boîte mail »), en fiable.
//
// ── SÉCURITÉ ─────────────────────────────────────────────────────────────────
//   • verify_jwt = false : le lien est cliqué depuis une boîte mail, sans session.
//     La preuve d'autorisation EST le jeton signé HMAC (voir _shared/lesson-token.ts),
//     lié à un cours + un créneau + une date d'expiration.
//   • Aucune donnée n'est acceptée depuis l'URL en dehors du jeton : ni identifiant
//     de cours en clair, ni date modifiable.
//   • Écriture ATOMIQUE conditionnée à `status = 'proposed'` : deux clics (deux
//     onglets, deux liens) ne peuvent pas confirmer deux fois ni envoyer deux emails.
//   • Les robots d'analyse de liens de certaines messageries suivent les URL d'un
//     email : les requêtes HEAD et celles qui s'annoncent comme pré-chargement
//     sont servies SANS RIEN ÉCRIRE.
// =============================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';
import { htmlPart, mailSubject } from '../_shared/mail.ts';
import { verifySlotToken } from '../_shared/lesson-token.ts';

const ADMIN_EMAIL = 'contact@lesagedavid.fr';

function esc(s: unknown): string {
    return String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
}

// -----------------------------------------------------------------------------
// Pages de retour (ce que David voit après son clic)
// -----------------------------------------------------------------------------

type PageTone = 'ok' | 'info' | 'error';

function page(tone: PageTone, title: string, message: string, extra = '', status = 200): Response {
    const icon = tone === 'ok' ? '✅' : tone === 'info' ? 'ℹ️' : '⚠️';
    const accent = tone === 'ok' ? '#15803d' : tone === 'info' ? '#b45309' : '#b91c1c';
    return new Response(
        `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)}</title></head>
<body style="margin:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:56px auto;padding:0 16px;">
    <div style="background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:30px;text-align:center;">
      <div style="font-size:44px;line-height:1;">${icon}</div>
      <h1 style="font-size:21px;margin:14px 0 10px;color:${accent};">${esc(title)}</h1>
      <p style="color:#374151;font-size:15px;line-height:1.65;margin:0;">${message}</p>
      ${extra}
      <p style="color:#9ca3af;font-size:12px;margin:24px 0 0;line-height:1.5;">
        Tu peux fermer cette page. Le cours reste modifiable dans l'application,
        onglet <strong>🎓 Enseignement → 📅 Agenda</strong>.
      </p>
    </div>
  </div>
</body></html>`,
        { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } },
    );
}

/** « jeudi 13 août 2026 à 14:30 » (heure de Paris — celle du cours). */
function frDateTime(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return new Intl.DateTimeFormat('fr-FR', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris',
    }).format(d);
}

function enDateTime(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return new Intl.DateTimeFormat('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris',
    }).format(d);
}

// -----------------------------------------------------------------------------
// Email de confirmation envoyé à l'élève
// -----------------------------------------------------------------------------

function studentHtml(
    firstName: string,
    lang: string,
    whenIso: string,
    durationMin: number,
    mode: string,
    location: string | null,
    title: string | null,
): string {
    const en = lang === 'en';
    const hi = firstName ? `${en ? 'Hi' : 'Bonjour'} ${esc(firstName)},` : (en ? 'Hi,' : 'Bonjour,');
    const when = en ? enDateTime(whenIso) : frDateTime(whenIso);
    const isRemote = mode === 'video';

    const t = en ? {
        title: 'Your appointment is confirmed ✨',
        p1: 'Good news — I have kept one of the slots you suggested. Here are the details:',
        lWhen: 'Date',
        lHow: 'Format',
        lWhere: 'Address',
        lWhat: 'Appointment',
        how: isRemote ? 'online (video call)' : 'in person',
        remote: 'I will send you the video-call link before we meet.',
        p2: 'If anything comes up, just reply to this email — up to 24 h beforehand we move the appointment, no problem at all.',
        sign: 'See you very soon,<br />David Lesage',
        foot: 'You are receiving this email because you requested an appointment on lesagedavid.fr.',
    } : {
        title: 'Ton rendez-vous est confirmé ✨',
        p1: 'Bonne nouvelle — j’ai retenu l’un des créneaux que tu proposais. Voici les détails :',
        lWhen: 'Date',
        lHow: 'Format',
        lWhere: 'Adresse',
        lWhat: 'Rendez-vous',
        how: isRemote ? 'en visio' : 'en présentiel',
        remote: 'Je t’enverrai le lien de visio avant notre rendez-vous.',
        p2: 'Si tu as un empêchement, réponds simplement à cet email — jusqu’à 24 h avant, on décale sans aucun souci.',
        sign: 'À très vite,<br />David Lesage',
        foot: 'Tu reçois cet email parce que tu as demandé un rendez-vous sur lesagedavid.fr.',
    };

    const row = (k: string, v: string) =>
        `<tr><td style="padding:5px 0;color:#6b7280;font-size:13px;width:110px;vertical-align:top;">${k}</td><td style="padding:5px 0;color:#111827;font-size:14px;">${v}</td></tr>`;

    return `<!doctype html>
<html lang="${en ? 'en' : 'fr'}"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
        <tr><td style="padding:28px 28px 4px;">
          <div style="font-size:21px;font-weight:700;color:#111827;">${t.title}</div>
          <p style="margin:14px 0 0;color:#374151;font-size:15px;line-height:1.6;">${hi}</p>
          <p style="margin:12px 0 0;color:#374151;font-size:15px;line-height:1.6;">${t.p1}</p>
        </td></tr>
        <tr><td style="padding:18px 28px 6px;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;background:#faf5ef;border:1px solid #e7d9c6;border-radius:10px;padding:12px 14px;">
            ${title ? row(t.lWhat, esc(title)) : ''}
            ${row(t.lWhen, `<strong style="text-transform:capitalize;">${esc(when)}</strong> · ${durationMin} min`)}
            ${row(t.lHow, esc(t.how))}
            ${!isRemote && location ? row(t.lWhere, esc(location)) : ''}
          </table>
          ${isRemote ? `<p style="margin:12px 0 0;color:#6b7280;font-size:13px;line-height:1.6;">${t.remote}</p>` : ''}
        </td></tr>
        <tr><td style="padding:16px 28px 4px;">
          <p style="margin:0;color:#374151;font-size:15px;line-height:1.6;">${t.p2}</p>
        </td></tr>
        <tr><td style="padding:20px 28px 28px;border-top:1px solid #f0f1f3;">
          <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.5;">${t.sign}</p>
          <p style="margin:12px 0 0;color:#b6bcc4;font-size:11px;line-height:1.5;">${t.foot}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

interface LessonRow {
    id: string;
    status: string;
    starts_at: string | null;
    duration_min: number;
    mode: string;
    location: string | null;
    title: string | null;
    student_name: string | null;
    student_email: string | null;
    source_ref: string | null;
}

Deno.serve(async (req) => {
    const url = new URL(req.url);

    // Robots d'analyse de liens / pré-chargement : on ne modifie RIEN.
    const prefetch =
        req.method === 'HEAD' ||
        (req.headers.get('purpose') ?? '').toLowerCase() === 'prefetch' ||
        (req.headers.get('x-purpose') ?? '').toLowerCase() === 'preview' ||
        (req.headers.get('sec-purpose') ?? '').toLowerCase().includes('prefetch');

    if (req.method !== 'GET' && req.method !== 'HEAD') {
        return page('error', 'Méthode non autorisée', 'Ce lien s’ouvre depuis un email.', '', 405);
    }

    try {
        const token = url.searchParams.get('t') ?? '';
        const payload = await verifySlotToken(token);
        if (!payload) {
            return page(
                'error',
                'Lien invalide ou expiré',
                'Ce lien de confirmation n’est plus valable. Ouvre l’application (<strong>🎓 Enseignement → 📅 Agenda</strong>) pour retenir un créneau.',
                '', 400,
            );
        }

        if (prefetch) {
            // Réponse neutre, sans écriture : un robot ne doit jamais confirmer.
            return page('info', 'Prêt à confirmer', 'Ouvre ce lien pour confirmer le créneau.');
        }

        const admin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
            { auth: { persistSession: false, autoRefreshToken: false } },
        );

        const COLS = 'id, status, starts_at, duration_min, mode, location, title, student_name, student_email, source_ref';

        // 1) Écriture ATOMIQUE : ne bascule QUE depuis `proposed`. Deux clics
        //    concurrents ⇒ un seul gagne, donc un seul email à l'élève.
        const { data: updated, error: updErr } = await admin
            .from('lessons')
            .update({ starts_at: payload.slotIso, status: 'confirmed' })
            .eq('id', payload.lessonId)
            .eq('status', 'proposed')
            .select(COLS)
            .maybeSingle();

        if (updErr) {
            console.error('confirm-lesson-slot update error:', updErr);
            return page('error', 'Confirmation impossible', 'Une erreur technique est survenue. Réessaie dans un instant, ou passe par l’application.', '', 500);
        }

        // 2) Rien mis à jour : soit le cours n'existe plus, soit il n'est plus
        //    « à traiter » (déjà confirmé / annulé / terminé). On relit pour le dire.
        if (!updated) {
            const { data: current } = await admin.from('lessons').select(COLS).eq('id', payload.lessonId).maybeSingle();
            const lesson = current as LessonRow | null;
            if (!lesson) {
                return page('error', 'Demande introuvable', 'Cette demande de cours n’existe plus.', '', 404);
            }
            if (lesson.status === 'confirmed') {
                const same = lesson.starts_at && Math.abs(new Date(lesson.starts_at).getTime() - new Date(payload.slotIso).getTime()) < 60_000;
                return page(
                    'info',
                    same ? 'Créneau déjà confirmé' : 'Un autre créneau est déjà confirmé',
                    same
                        ? `Ce cours est déjà confirmé pour le <strong style="text-transform:capitalize;">${esc(frDateTime(lesson.starts_at as string))}</strong>. ${lesson.student_name ? esc(lesson.student_name) + ' a' : 'La personne a'} déjà été prévenu·e — rien n’a été renvoyé.`
                        : `Ce cours a déjà été confirmé pour le <strong style="text-transform:capitalize;">${esc(frDateTime(lesson.starts_at as string))}</strong>. Pour changer de date, passe par l’application : la personne serait sinon prévenue deux fois.`,
                );
            }
            if (lesson.status === 'cancelled') {
                return page('info', 'Cours annulé', 'Cette demande a été annulée. Rien n’a été modifié.');
            }
            return page('info', 'Cours déjà terminé', 'Ce cours est marqué comme terminé. Rien n’a été modifié.');
        }

        const lesson = updated as LessonRow;

        // 3) Langue de la personne : reprise du lead d'origine si on l'a.
        let lang = 'fr';
        let firstName = (lesson.student_name ?? '').trim().split(' ')[0] ?? '';
        if (lesson.source_ref) {
            const { data: lead } = await admin
                .from('site_leads').select('lang, first_name').eq('id', lesson.source_ref).maybeSingle();
            const l = lead as { lang?: string; first_name?: string } | null;
            if (l?.lang) lang = l.lang === 'en' ? 'en' : 'fr';
            if (l?.first_name) firstName = l.first_name;
        }

        // 4) Email de confirmation à l'élève (silencieux si SMTP non configuré).
        let mailed = false;
        const host = Deno.env.get('SMTP_HOST') ?? '';
        const user = Deno.env.get('SMTP_USER') ?? '';
        const pass = Deno.env.get('SMTP_PASS') ?? '';
        const from = Deno.env.get('SMTP_FROM') ?? user;
        const port = Number(Deno.env.get('SMTP_PORT') ?? '465');

        if (lesson.student_email && host && user && pass && from) {
            const client = new SMTPClient({
                connection: { hostname: host, port, tls: port === 465, auth: { username: user, password: pass } },
            });
            try {
                await client.send({
                    from,
                    to: lesson.student_email,
                    replyTo: ADMIN_EMAIL,
                    subject: mailSubject(lang === 'en'
                        ? 'David Lesage — your appointment is confirmed ✨'
                        : 'David Lesage — ton rendez-vous est confirmé ✨'),
                    mimeContent: [htmlPart(studentHtml(
                        firstName, lang, payload.slotIso, lesson.duration_min,
                        lesson.mode, lesson.location, lesson.title,
                    ))],
                });
                mailed = true;
            } catch (mailErr) {
                console.error('confirm-lesson-slot mail error:', mailErr);
            } finally {
                try { await client.close(); } catch { /* ignore */ }
            }
        }

        const who = lesson.student_name || lesson.student_email || 'la personne';
        const extra = `<p style="margin:18px 0 0;padding:12px 14px;background:#faf5ef;border:1px solid #e7d9c6;border-radius:10px;color:#374151;font-size:15px;line-height:1.6;text-transform:capitalize;">${esc(frDateTime(payload.slotIso))}</p>`;
        return page(
            'ok',
            'Créneau confirmé',
            mailed
                ? `<strong>${esc(who)}</strong> vient d’être prévenu·e par email du créneau retenu.`
                : `Le créneau est enregistré. ⚠️ L’email de confirmation n’a pas pu partir : préviens <strong>${esc(who)}</strong> toi-même.`,
            extra,
        );
    } catch (err) {
        console.error('confirm-lesson-slot error:', err);
        return page('error', 'Erreur', 'Une erreur inattendue est survenue.', '', 500);
    }
});
