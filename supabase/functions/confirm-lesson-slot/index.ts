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
// ── POURQUOI DU TEXTE BRUT ET PAS DU HTML (correctif 10/08/2026) ─────────────
// La passerelle des Edge Functions RÉÉCRIT toute réponse `text/html` en
// `content-type: text/plain` (+ `X-Content-Type-Options: nosniff` et une CSP
// `default-src 'none'; sandbox`) sur le domaine partagé *.supabase.co — mesure
// anti-hameçonnage : personne ne doit pouvoir servir une page depuis ce domaine.
// Vérifié sur TROIS fonctions indépendantes (celle-ci, `google-calendar`, et
// `unsubscribe-updates` qui est en production depuis juillet).
//
// Conséquence observée en vrai : le `charset=utf-8` de notre en-tête disparaît
// avec le type, le navigateur retombe sur du Latin-1, et David a lu
// « CrÃ©neau dÃ©jÃ  confirmÃ© ». Le HTML lui-même n'était de toute façon plus
// interprété (affiché en texte).
//
// On ne se bat donc pas contre la passerelle : on renvoie du TEXTE BRUT propre,
// avec DEUX ceintures pour l'encodage —
//   1. `Content-Type: text/plain; charset=utf-8` (type déjà « plain » : la
//      passerelle n'a plus de raison de le réécrire, le charset survit) ;
//   2. un BOM UTF-8 en tête de corps, qui force le navigateur en UTF-8 même si
//      un intermédiaire venait à retirer le charset (priorité n°1 de l'algorithme
//      de détection d'encodage HTML5).
//
// ── SÉCURITÉ ─────────────────────────────────────────────────────────────────
//   • verify_jwt = false : le lien est cliqué depuis une boîte mail, sans session.
//     La preuve d'autorisation EST le jeton signé HMAC (voir _shared/lesson-token.ts),
//     lié à un cours + un créneau + une date d'expiration.
//   • Aucune donnée n'est acceptée depuis l'URL en dehors du jeton.
//   • Écriture ATOMIQUE conditionnée à `status = 'proposed'` : deux requêtes
//     concurrentes ne peuvent ni confirmer deux fois ni envoyer deux emails.
//   • Requêtes HEAD et pré-chargements annoncés : servis SANS AUCUNE écriture.
//   • IDEMPOTENCE (correctif 10/08/2026) : recliquer LE MÊME lien réaffiche la
//     page de succès (sans rien réécrire ni renvoyer d'email) au lieu d'un
//     inquiétant « déjà confirmé ». Un lien d'email est cliqué deux fois plus
//     souvent qu'on ne le croit — relance, aperçu de la messagerie, ou
//     simplement quelqu'un qui recharge la page.
// =============================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';
import { htmlPart, mailSubject } from '../_shared/mail.ts';
import { verifySlotToken } from '../_shared/lesson-token.ts';

const ADMIN_EMAIL = 'contact@lesagedavid.fr';

/**
 * BOM UTF-8 : seconde ceinture d'encodage (cf. en-tête de fichier).
 * Écrit en ESCAPE et non en caractère littéral : un BOM nu dans une source est
 * invisible dans un éditeur et ne survit pas à tous les copier-coller.
 */
const BOM = '\uFEFF';

const RULE = '─'.repeat(46);

function esc(s: unknown): string {
    return String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
}

// -----------------------------------------------------------------------------
// Page de retour (ce que David voit après son clic) — TEXTE BRUT, UTF-8
// -----------------------------------------------------------------------------

function page(icon: string, title: string, lines: string[], status = 200): Response {
    const body =
        BOM +
        `${icon}  ${title.toUpperCase()}\n` +
        `${RULE}\n\n` +
        lines.filter(Boolean).join('\n\n') +
        `\n\n${RULE}\n` +
        `Tu peux fermer cette page.\n` +
        `Le cours reste modifiable dans l'application :\n` +
        `🎓 Enseignement → 📅 Agenda\n`;

    return new Response(body, {
        status,
        headers: {
            // Type DÉJÀ « plain » : la passerelle Supabase ne le réécrit pas, donc
            // le charset survit. Le BOM couvre le cas où il sauterait quand même.
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-store',
        },
    });
}

/** « samedi 22 août 2026 à 18:00 » (heure de Paris — celle du cours). */
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
// Email de confirmation envoyé à l'élève (HTML : là, pas de passerelle qui
// réécrit quoi que ce soit — c'est du MIME, encodé par _shared/mail.ts)
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

const COLS = 'id, status, starts_at, duration_min, mode, location, title, student_name, student_email, source_ref';

/** Deux instants à la minute près = le même créneau. */
function sameSlot(a: string | null, b: string): boolean {
    return Boolean(a) && Math.abs(new Date(a as string).getTime() - new Date(b).getTime()) < 60_000;
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
        return page('⚠️', 'Méthode non autorisée', ['Ce lien s’ouvre depuis un email.'], 405);
    }

    try {
        const token = url.searchParams.get('t') ?? '';
        const payload = await verifySlotToken(token);
        if (!payload) {
            return page('⚠️', 'Lien invalide ou expiré', [
                'Ce lien de confirmation n’est plus valable.',
                'Ouvre l’application pour retenir un créneau à la main.',
            ], 400);
        }

        if (prefetch) {
            // Réponse neutre, sans écriture : un robot ne doit jamais confirmer.
            return page('🔗', 'Prêt à confirmer', ['Ouvre ce lien dans ton navigateur pour confirmer le créneau.']);
        }

        const admin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
            { auth: { persistSession: false, autoRefreshToken: false } },
        );

        // 1) Écriture ATOMIQUE : ne bascule QUE depuis `proposed`. Deux requêtes
        //    concurrentes ⇒ une seule gagne, donc un seul email à l'élève.
        const { data: updated, error: updErr } = await admin
            .from('lessons')
            .update({ starts_at: payload.slotIso, status: 'confirmed' })
            .eq('id', payload.lessonId)
            .eq('status', 'proposed')
            .select(COLS)
            .maybeSingle();

        if (updErr) {
            console.error('confirm-lesson-slot update error:', updErr);
            return page('⚠️', 'Confirmation impossible', [
                'Une erreur technique est survenue.',
                'Réessaie dans un instant, ou passe par l’application.',
            ], 500);
        }

        // 2) Rien mis à jour : soit le cours n'existe plus, soit il n'est plus
        //    « à traiter ». On relit pour dire précisément où on en est.
        if (!updated) {
            const { data: current } = await admin.from('lessons').select(COLS).eq('id', payload.lessonId).maybeSingle();
            const lesson = current as LessonRow | null;
            if (!lesson) {
                return page('⚠️', 'Demande introuvable', ['Cette demande de cours n’existe plus.'], 404);
            }
            if (lesson.status === 'confirmed') {
                const who = lesson.student_name || lesson.student_email || 'La personne';
                // MÊME créneau que ce lien : le lien a DÉJÀ fait son travail.
                // On réaffiche donc un succès, pas une alerte (idempotence).
                if (sameSlot(lesson.starts_at, payload.slotIso)) {
                    return page('✅', 'Créneau confirmé', [
                        frDateTime(lesson.starts_at as string),
                        `${who} a bien été prévenu·e par email.`,
                        '(Ce lien avait déjà été utilisé — rien n’a été renvoyé.)',
                    ]);
                }
                return page('ℹ️', 'Un autre créneau est déjà confirmé', [
                    `Ce cours est confirmé pour le ${frDateTime(lesson.starts_at as string)}.`,
                    'Pour changer de date, passe par l’application : sinon la personne serait prévenue deux fois.',
                ]);
            }
            if (lesson.status === 'cancelled') {
                return page('ℹ️', 'Cours annulé', ['Cette demande a été annulée. Rien n’a été modifié.']);
            }
            return page('ℹ️', 'Cours déjà terminé', ['Ce cours est marqué comme terminé. Rien n’a été modifié.']);
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

        const who = lesson.student_name || lesson.student_email || 'La personne';
        return page('✅', 'Créneau confirmé', [
            frDateTime(payload.slotIso),
            mailed
                ? `${who} vient d’être prévenu·e par email.`
                : `⚠️ L’email de confirmation n’a pas pu partir : préviens ${who} toi-même.`,
        ]);
    } catch (err) {
        console.error('confirm-lesson-slot error:', err);
        return page('⚠️', 'Erreur', ['Une erreur inattendue est survenue.'], 500);
    }
});
