// =============================================================================
// Edge Function : site-lead
// Enregistre un contact laissé sur le SITE VITRINE (lesagedavid.fr) dans
// public.site_leads, puis lui envoie un email de confirmation.
//
// Deux familles de demandes, distinguées par `source` :
//   • liste d'attente        → 'beta-waitlist', 'showcase', 'app-login'
//     (email « tu es sur la liste »)
//   • demande de réservation → 'showroom-visit', 'private-session',
//                              'showcase-booking', 'showcase-waitlist'
//     (email d'accusé de réception + NOTIFICATION à David)
//
// Deux appelants : /api/subscribe.js du site (Vercel) et l'Edge Function
// `app-lead` (écran de connexion de l'app). Appels SERVEUR À SERVEUR : pas de
// contrainte CORS, et on ne touche pas au secret partagé ALLOWED_ORIGIN.
// verify_jwt = false (visiteur non connecté) — protégée par SITE_LEAD_TOKEN.
//
// v7 (22/07/2026) : accepte les champs du formulaire enrichi
// (handpanType / personalGoal / wantsBeta, et usage_type = 'maker').
// v8 (22/07/2026) : notifie David pour une candidature bêta-testeur, avec le
// profil complet dans l'email. Une simple inscription ne notifie rien.
// =============================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';

const SITE = 'https://lesagedavid.fr';
const ADMIN_EMAIL = 'contact@lesagedavid.fr';
const JSON_HEADERS = { 'Content-Type': 'application/json' };

// Sources qui correspondent à une DEMANDE DE RÉSERVATION (David doit répondre).
const BOOKING_SOURCES = ['showroom-visit', 'private-session', 'showcase-booking', 'showcase-waitlist'];

function json(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

function esc(s: string): string {
    return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Allowlists du formulaire de liste d'attente. ⚠ Doivent rester IDENTIQUES à
// celles de l'Edge Function `app-lead` (écran de connexion de l'app), qui
// alimente la même table. 'maker' = fabricant de handpan, ajouté le 22/07/2026.
const ALLOWED_HAS_HANDPAN = ['yes', 'no', 'planning'];
const ALLOWED_USAGE = ['personal', 'teacher', 'both', 'maker'];
const ALLOWED_HANDPAN_TYPE = ['acoustic', 'electronic', 'both'];
const ALLOWED_PERSONAL_GOAL = ['learn', 'compose'];

const SOURCE_LABELS: Record<string, { fr: string; en: string }> = {
    'showroom-visit': { fr: 'Venue au showroom (Paris 20ᵉ)', en: 'Showroom visit (Paris 20th)' },
    'private-session': { fr: 'Rendez-vous individuel (cours / démonstration privée)', en: 'Individual appointment (lesson / private demo)' },
    'showcase-booking': { fr: 'Place à un showcase public gratuit', en: 'Spot at a free public showcase' },
    'showcase-waitlist': { fr: 'Alerte prochaines dates de showcase', en: 'Alert for upcoming showcase dates' },
    'beta-waitlist': { fr: 'Liste d’attente application', en: 'App waiting list' },
    'app-login': { fr: 'Liste d’attente (écran de connexion)', en: 'Waiting list (login screen)' },
    showcase: { fr: 'Groupe showcases', en: 'Showcase group' },
};

/** Libellés lisibles des réponses du formulaire, pour la notification à David. */
const PROFILE_LABELS: Record<string, string> = {
    yes: 'oui', no: 'non', planning: 'bientôt',
    acoustic: 'acoustique', electronic: 'électronique', both: 'les deux',
    personal: 'à titre personnel', teacher: 'prof (outil pédagogique)', maker: 'fabricant de handpan',
    learn: 'apprendre à jouer', compose: 'composer / créer des gammes',
};

function sourceLabel(src: string, lang: string): string {
    const l = SOURCE_LABELS[src];
    return l ? (lang === 'en' ? l.en : l.fr) : src;
}

const btn = (href: string, label: string, primary = true) =>
    `<a href="${href}" style="display:inline-block;background:${primary ? '#b4462a' : '#ffffff'};color:${primary ? '#ffffff' : '#b4462a'};border:1px solid #b4462a;text-decoration:none;font-weight:600;font-size:14px;padding:12px 24px;border-radius:999px;">${label}</a>`;

function shell(lang: string, inner: string): string {
    return `<!doctype html>
<html lang="${lang === 'en' ? 'en' : 'fr'}"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
${inner}
      </table>
    </td></tr>
  </table>
</body></html>`;
}

/**
 * Email de confirmation (liste d'attente). Ordre voulu par David : d'abord
 * l'application, puis le blog, puis les showcases, puis le RDV privé.
 * Aucun prix en dur : on renvoie vers la page du site, qui fait foi.
 */
function confirmationHtml(firstName: string, lang: string, wantsShowcase: boolean): string {
    const en = lang === 'en';
    const base = en ? `${SITE}/en` : SITE;
    const hi = firstName ? `${en ? 'Hi' : 'Bonjour'} ${esc(firstName)},` : (en ? 'Hi,' : 'Bonjour,');

    const t = en ? {
        title: 'You are on the list ✨',
        p1: 'Thanks for your interest in Handpan Studio! Your details are saved: you will be among the first to hear from me the day the app opens.',
        h2app: 'What the app lets you do',
        p2: 'Handpan Studio makes music <strong>visible</strong>: every note has its colour, every chord becomes a recognisable shape, and every degree carries an emotion. You learn by looking — no music theory required. It works on an acoustic handpan just as on an electronic Neotone.',
        ctaBlog: 'Discover the features on the blog',
        h2show: 'Come and try everything in Paris — for free',
        p3: 'Once a month I host a <strong>free showcase in Paris</strong> (booking required). I present the electronic <strong>Neotone</strong> handpan, <strong>Yishama</strong> acoustic handpans, <strong>handpan microphones</strong>, the <strong>Gonilélé</strong> African harp, the <strong>calabash</strong> — and of course the app. You play, you listen, you ask anything.',
        ctaShow: 'See the next showcases',
        h2priv: 'Rather have me all to yourself?',
        p4: 'If the dates don’t suit you, I also offer a <strong>private, tailor-made session</strong>: we take the time, I guide you personally according to your level and your project. Details and booking on the same page.',
        sign: 'See you soon,<br />David Lesage',
        foot: 'You are receiving this email because you signed up on lesagedavid.fr.',
        showNote: 'You asked to be kept posted about the showcases — you will receive the dates.',
    } : {
        title: 'Tu es sur la liste ✨',
        p1: 'Merci pour ton intérêt pour Handpan Studio ! Tes informations sont bien enregistrées : je te recontacte le moment venu, dès l’ouverture de l’application.',
        h2app: 'Ce que l’application permet de faire',
        p2: 'Handpan Studio rend la musique <strong>visible</strong> : chaque note a sa couleur, chaque accord devient une forme reconnaissable, et chaque degré porte une émotion. Tu apprends en regardant — sans solfège. Ça fonctionne sur un handpan acoustique comme sur un Neotone électronique.',
        ctaBlog: 'Découvrir les fonctionnalités sur le blog',
        h2show: 'Viens tout essayer à Paris — gratuitement',
        p3: 'Une fois par mois, j’anime un <strong>showcase gratuit à Paris</strong> (sur réservation). J’y présente le handpan électronique <strong>Neotone</strong>, les handpans acoustiques <strong>Yishama</strong>, les <strong>micros pour handpan</strong>, la harpe africaine <strong>Gonilélé</strong>, la <strong>calebasse</strong> — et bien sûr l’application. Tu joues, tu écoutes, tu poses toutes tes questions.',
        ctaShow: 'Voir les prochains showcases',
        h2priv: 'Tu préfères m’avoir rien que pour toi ?',
        p4: 'Si les dates ne te conviennent pas, je propose aussi un <strong>rendez-vous privé, sur mesure</strong> : on prend le temps, je t’accompagne personnellement selon ton niveau et ton projet. Tarif et réservation sur la même page.',
        sign: 'À très vite,<br />David Lesage',
        foot: 'Tu reçois cet email parce que tu t’es inscrit·e sur lesagedavid.fr.',
        showNote: 'Tu as demandé à être tenu·e au courant des showcases — tu recevras les dates.',
    };

    return shell(lang, `
        <tr><td style="padding:28px 28px 4px;">
          <div style="font-size:21px;font-weight:700;color:#111827;">${t.title}</div>
          <p style="margin:14px 0 0;color:#374151;font-size:15px;line-height:1.6;">${hi}</p>
          <p style="margin:12px 0 0;color:#374151;font-size:15px;line-height:1.6;">${t.p1}</p>
        </td></tr>

        <tr><td style="padding:22px 28px 4px;border-top:1px solid #f0f1f3;">
          <h2 style="margin:0 0 8px;font-size:17px;color:#111827;">${t.h2app}</h2>
          <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.6;">${t.p2}</p>
          ${btn(`${base}/blog`, t.ctaBlog)}
        </td></tr>

        <tr><td style="padding:24px 28px 4px;border-top:1px solid #f0f1f3;">
          <h2 style="margin:0 0 8px;font-size:17px;color:#111827;">${t.h2show}</h2>
          <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.6;">${t.p3}</p>
          ${btn(`${base}/showroom`, t.ctaShow, false)}
          ${wantsShowcase ? `<p style="margin:14px 0 0;color:#6b7280;font-size:13px;">✓ ${t.showNote}</p>` : ''}
        </td></tr>

        <tr><td style="padding:24px 28px 8px;border-top:1px solid #f0f1f3;">
          <h2 style="margin:0 0 8px;font-size:17px;color:#111827;">${t.h2priv}</h2>
          <p style="margin:0;color:#374151;font-size:15px;line-height:1.6;">${t.p4}</p>
        </td></tr>

        <tr><td style="padding:20px 28px 28px;border-top:1px solid #f0f1f3;">
          <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.5;">${t.sign}</p>
          <p style="margin:12px 0 0;color:#b6bcc4;font-size:11px;line-height:1.5;">${t.foot}</p>
        </td></tr>
`);
}

/** Accusé de réception d'une DEMANDE DE RÉSERVATION. David répond personnellement. */
function bookingHtml(
    firstName: string,
    lang: string,
    src: string,
    eventDate: string | null,
    message: string | null,
): string {
    const en = lang === 'en';
    const base = en ? `${SITE}/en` : SITE;
    const hi = firstName ? `${en ? 'Hi' : 'Bonjour'} ${esc(firstName)},` : (en ? 'Hi,' : 'Bonjour,');
    const dateLabel = eventDate
        ? new Intl.DateTimeFormat(en ? 'en-GB' : 'fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
            .format(new Date(eventDate + 'T12:00:00'))
        : null;

    const t = en ? {
        title: 'Request received ✨',
        p1: 'Thanks for your message — your request is saved and I read every one of them personally. I’ll get back to you shortly to confirm the details.',
        recap: 'Your request',
        kind: 'Reason',
        when: 'Date',
        yourMsg: 'Your message',
        h2: 'While you wait',
        p2: 'The showroom is at <strong>29 rue des Orteaux, Paris 20th</strong>. You’ll be able to try the electronic <strong>Neotone</strong> handpan, <strong>Yishama</strong> acoustic handpans, the microphones, the <strong>Gonilélé</strong> African harp and the <strong>Handpan Studio</strong> app.',
        cta: 'See the showroom page',
        sign: 'See you soon,<br />David Lesage',
        foot: 'You are receiving this email because you sent a request on lesagedavid.fr.',
    } : {
        title: 'Demande bien reçue ✨',
        p1: 'Merci pour ton message — ta demande est enregistrée et je les lis toutes personnellement. Je te réponds très vite pour caler les détails.',
        recap: 'Ta demande',
        kind: 'Motif',
        when: 'Date',
        yourMsg: 'Ton message',
        h2: 'En attendant',
        p2: 'Le showroom se trouve au <strong>29 rue des Orteaux, Paris 20ᵉ</strong>. Tu pourras y essayer le handpan électronique <strong>Neotone</strong>, les handpans acoustiques <strong>Yishama</strong>, les micros, la harpe africaine <strong>Gonilélé</strong> et l’application <strong>Handpan Studio</strong>.',
        cta: 'Voir la page du showroom',
        sign: 'À très vite,<br />David Lesage',
        foot: 'Tu reçois cet email parce que tu as envoyé une demande sur lesagedavid.fr.',
    };

    const row = (k: string, v: string) =>
        `<tr><td style="padding:4px 0;color:#6b7280;font-size:13px;width:110px;vertical-align:top;">${k}</td><td style="padding:4px 0;color:#111827;font-size:14px;">${v}</td></tr>`;

    return shell(lang, `
        <tr><td style="padding:28px 28px 4px;">
          <div style="font-size:21px;font-weight:700;color:#111827;">${t.title}</div>
          <p style="margin:14px 0 0;color:#374151;font-size:15px;line-height:1.6;">${hi}</p>
          <p style="margin:12px 0 0;color:#374151;font-size:15px;line-height:1.6;">${t.p1}</p>
        </td></tr>

        <tr><td style="padding:22px 28px 4px;border-top:1px solid #f0f1f3;">
          <h2 style="margin:0 0 10px;font-size:17px;color:#111827;">${t.recap}</h2>
          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
            ${row(t.kind, esc(sourceLabel(src, lang)))}
            ${dateLabel ? row(t.when, `<span style="text-transform:capitalize;">${esc(dateLabel)}</span>`) : ''}
            ${message ? row(t.yourMsg, esc(message).replace(/\n/g, '<br />')) : ''}
          </table>
        </td></tr>

        <tr><td style="padding:24px 28px 4px;border-top:1px solid #f0f1f3;">
          <h2 style="margin:0 0 8px;font-size:17px;color:#111827;">${t.h2}</h2>
          <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.6;">${t.p2}</p>
          ${btn(`${base}/showroom`, t.cta)}
        </td></tr>

        <tr><td style="padding:20px 28px 28px;border-top:1px solid #f0f1f3;">
          <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.5;">${t.sign}</p>
          <p style="margin:12px 0 0;color:#b6bcc4;font-size:11px;line-height:1.5;">${t.foot}</p>
        </td></tr>
`);
}

/** Notification interne à David : tout ce qu'il faut pour rappeler la personne. */
function adminNotifyHtml(f: Record<string, string | number | null>): string {
    const row = (k: string, v: string | number | null) =>
        v === null || v === '' ? '' :
        `<tr><td style="padding:5px 0;color:#6b7280;font-size:13px;width:130px;vertical-align:top;">${k}</td><td style="padding:5px 0;color:#111827;font-size:14px;">${esc(String(v))}</td></tr>`;

    return shell('fr', `
        <tr><td style="padding:26px 28px 6px;">
          <div style="font-size:20px;font-weight:700;color:#111827;">Nouvelle demande — ${esc(String(f.Motif ?? ''))}</div>
        </td></tr>
        <tr><td style="padding:8px 28px 26px;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
            ${Object.entries(f).map(([k, v]) => row(k, v)).join('')}
          </table>
        </td></tr>
`);
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: JSON_HEADERS });
    if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

    try {
        const expected = Deno.env.get('SITE_LEAD_TOKEN') ?? '';
        if (expected && req.headers.get('x-site-token') !== expected) {
            return json({ error: 'Forbidden' }, 403);
        }

        const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
        const email = String(body.email ?? '').trim().toLowerCase();
        const firstName = String(body.firstName ?? '').trim().slice(0, 80);
        const lastName = String(body.lastName ?? '').trim().slice(0, 80);
        const source = String(body.source ?? 'beta-waitlist').trim().slice(0, 60) || 'beta-waitlist';
        const lang = String(body.lang ?? 'fr').trim().slice(0, 5);
        const page = String(body.page ?? '').trim().slice(0, 200);

        const hasHandpan = ALLOWED_HAS_HANDPAN.includes(String(body.hasHandpan ?? '')) ? String(body.hasHandpan) : null;
        const usageType = ALLOWED_USAGE.includes(String(body.usageType ?? '')) ? String(body.usageType) : null;
        const motivation = String(body.motivation ?? '').trim().slice(0, 2000) || null;
        const wantsShowcase = body.wantsShowcase === true;

        // Sous-questions du formulaire enrichi (22/07/2026). Mêmes allowlists que
        // `app-lead`. Différence assumée : ici on NE REJETTE PAS une réponse
        // incohérente, on la met à null. `site-lead` est la porte d'entrée
        // publique du site — perdre un contact sur un 400 coûterait plus cher
        // qu'une sous-réponse manquante. `app-lead` valide déjà strictement en amont.
        const rawHandpanType = String(body.handpanType ?? '').trim();
        const handpanType =
            hasHandpan === 'yes' && ALLOWED_HANDPAN_TYPE.includes(rawHandpanType) ? rawHandpanType : null;
        const rawPersonalGoal = String(body.personalGoal ?? '').trim();
        const personalGoal =
            usageType === 'personal' && ALLOWED_PERSONAL_GOAL.includes(rawPersonalGoal) ? rawPersonalGoal : null;
        const wantsBeta = body.wantsBeta === true;

        // Champs « demande de réservation »
        const phone = String(body.phone ?? '').trim().slice(0, 40) || null;
        const message = String(body.message ?? '').trim().slice(0, 4000) || null;
        const rawPeople = Number(body.peopleCount);
        const peopleCount = Number.isFinite(rawPeople) && rawPeople > 0 ? Math.min(Math.round(rawPeople), 50) : null;
        const rawDate = String(body.eventDate ?? '').trim();
        const eventDate = /^\d{4}-\d{2}-\d{2}$/.test(rawDate) ? rawDate : null;

        if (!EMAIL_RE.test(email)) return json({ error: 'invalid_email' }, 400);

        const isBooking = BOOKING_SOURCES.includes(source);

        const admin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
            { auth: { persistSession: false, autoRefreshToken: false } },
        );

        const profile: Record<string, unknown> = {
            first_name: firstName || null,
            last_name: lastName || null,
            lang,
            page,
            has_handpan: hasHandpan,
            handpan_type: handpanType,
            usage_type: usageType,
            personal_goal: personalGoal,
            wants_beta: wantsBeta,
            motivation,
            phone,
            message,
            people_count: peopleCount,
            event_date: eventDate,
        };

        // Upsert d'une ligne pour UNE source donnée (index unique lower(email)+source).
        // ⚠ Bien utiliser le paramètre `src` — et non la variable `source` — sans quoi
        // l'appel pour le groupe 'showcase' réécrirait la source d'origine.
        // ⚠ On n'écrase jamais un champ existant avec null (une 2ᵉ demande sans
        // téléphone ne doit pas effacer le téléphone déjà connu).
        async function upsert(src: string): Promise<string | undefined> {
            const { data: existing } = await admin
                .from('site_leads').select('id').eq('email', email).eq('source', src).maybeSingle();
            if (existing?.id) {
                const patch: Record<string, unknown> = {};
                for (const [k, v] of Object.entries(profile)) if (v !== null && v !== '') patch[k] = v;
                if (Object.keys(patch).length) await admin.from('site_leads').update(patch).eq('id', existing.id);
                return existing.id as string;
            }
            const { data: ins, error } = await admin
                .from('site_leads').insert({ email, source: src, ...profile }).select('id').single();
            if (error) throw error;
            return ins?.id as string;
        }

        const leadId = await upsert(source);
        // Case cochée -> groupe showcase ciblable séparément.
        if (wantsShowcase) await upsert('showcase');

        // --- Emails (silencieux si SMTP non configuré) ---
        let emailSent = false;
        const host = Deno.env.get('SMTP_HOST') ?? '';
        const user = Deno.env.get('SMTP_USER') ?? '';
        const pass = Deno.env.get('SMTP_PASS') ?? '';
        const from = Deno.env.get('SMTP_FROM') ?? user;
        const port = Number(Deno.env.get('SMTP_PORT') ?? '465');

        if (host && user && pass && from) {
            const client = new SMTPClient({
                connection: { hostname: host, port, tls: port === 465, auth: { username: user, password: pass } },
            });
            try {
                await client.send({
                    from,
                    to: email,
                    subject: isBooking
                        ? (lang === 'en' ? 'David Lesage — your request is received ✨' : 'David Lesage — ta demande est bien reçue ✨')
                        : (lang === 'en' ? 'Handpan Studio — you are on the list ✨' : 'Handpan Studio — tu es sur la liste ✨'),
                    html: isBooking
                        ? bookingHtml(firstName, lang, source, eventDate, message)
                        : confirmationHtml(firstName, lang, wantsShowcase),
                });
                emailSent = true;
                await admin.from('site_leads').update({ confirm_sent_at: new Date().toISOString() }).eq('id', leadId);
            } catch (mailErr) {
                console.error('site-lead mail error:', mailErr);
            } finally {
                try { await client.close(); } catch { /* ignore */ }
            }

            // Notification à David — UNIQUEMENT pour ce qui attend une réponse de sa part :
            // une demande de réservation, ou une candidature bêta-testeur. Une simple
            // inscription à la liste d'attente ne déclenche RIEN (sinon la boîte déborde).
            if (isBooking || wantsBeta) {
                const notifier = new SMTPClient({
                    connection: { hostname: host, port, tls: port === 465, auth: { username: user, password: pass } },
                });
                try {
                    await notifier.send({
                        from,
                        to: ADMIN_EMAIL,
                        replyTo: email,
                        subject: (wantsBeta && !isBooking
                            ? `[Bêta] Candidature — ${firstName} ${lastName}`
                            : `[Site] ${sourceLabel(source, 'fr')} — ${firstName} ${lastName}`).trim(),
                        html: adminNotifyHtml({
                            Motif: wantsBeta && !isBooking
                                ? 'Candidature bêta-testeur'
                                : sourceLabel(source, 'fr'),
                            Nom: `${firstName} ${lastName}`.trim() || null,
                            Email: email,
                            Téléphone: phone,
                            'Joue déjà': hasHandpan ? PROFILE_LABELS[hasHandpan] ?? hasHandpan : null,
                            'Type de handpan': handpanType ? PROFILE_LABELS[handpanType] ?? handpanType : null,
                            Usage: usageType ? PROFILE_LABELS[usageType] ?? usageType : null,
                            Objectif: personalGoal ? PROFILE_LABELS[personalGoal] ?? personalGoal : null,
                            Motivation: motivation,
                            'Date visée': eventDate,
                            Personnes: peopleCount,
                            Message: message,
                            Page: page || null,
                            Langue: lang,
                        }),
                    });
                } catch (notifyErr) {
                    console.error('site-lead notify error:', notifyErr);
                } finally {
                    try { await notifier.close(); } catch { /* ignore */ }
                }
            }
        }

        return json({ ok: true, emailSent, booking: isBooking, showcase: wantsShowcase });
    } catch (err) {
        console.error('site-lead error:', err);
        return json({ error: err instanceof Error ? err.message : 'server_error' }, 500);
    }
});
