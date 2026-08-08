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
// v9 (22/07/2026) : déclaration d'intention — casquettes multiples (`roles`),
//      fiche prof et fiche fabricant, engagement d'honnêteté.
// v10 (22/07/2026) : un FABRICANT qui se déclare notifie David.
// v11 (01/08/2026) : rendez-vous individuels — type de séance (tarif annoncé
//      côté site) et CRÉNEAUX PROPOSÉS par la personne. Elle propose, David valide.
// v12 (02/08/2026) : format (présentiel / visio, COURS uniquement) et instruments
//      à préparer pour une démonstration privée.
// v13 (02/08/2026) : demande de CODE DE REMISE Neotone — modèle visé et pays de
//      livraison, soit exactement ce que Neotone réclame à David pour sa commission.
// v14 (05/08/2026) : canal de découverte + deux réponses facultatives, et message
//      libre porté à 20 000 caractères (« sans limite » côté visiteur).
// v15 (08/08/2026) : RDV VIP — l'email « tu es sur la liste » annonce le tarif
//      en clair (1h = 50 €, 1h30 = 70 €) et porte un bouton vers
//      /showroom#agenda ; le rendez-vous n'est plus limité au Neotone (tout
//      instrument de la boutique, micros, ou simple accompagnement) ; cadre
//      d'annulation explicite (24 h, report possible dans les 3 mois) ;
//      la découverte privée existe désormais en 1h et en 1h30 (`demo-60` /
//      `demo-90`, l'ancien `demo` restant accepté).
// =============================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';

const SITE = 'https://lesagedavid.fr';
const ADMIN_EMAIL = 'contact@lesagedavid.fr';
const JSON_HEADERS = { 'Content-Type': 'application/json' };

// Sources qui correspondent à une DEMANDE DE RÉSERVATION (David doit répondre).
const BOOKING_SOURCES = ['showroom-visit', 'private-session', 'showcase-booking', 'showcase-waitlist', 'neotone-discount'];

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

// Déclaration d'intention (22/07/2026) — casquettes MULTIPLES.
const ALLOWED_ROLES = ['personal', 'teacher', 'maker', 'other'];
const ALLOWED_STUDENT_COUNT = ['none', '1-5', '6-20', '20+'];
const ALLOWED_MAKER_MAX_NOTES = ['9-', '10-13', '14-17', '18+', 'varies'];
const ALLOWED_MAKER_METALS = ['nitrided', 'stainless', 'ember', 'other'];

// Rendez-vous individuels. ⚠ Doit rester aligné sur `sessionTypes` de
// src/data/site.ts (site vitrine) — c'est LÀ que vivent les tarifs.
// 'demo' (sans durée) est l'ANCIEN identifiant : conservé pour ne pas rejeter
// une page encore en cache qui l'enverrait, et pour les lignes déjà en base.
const ALLOWED_SESSION_TYPE = ['onboarding-60', 'onboarding-90', 'demo-60', 'demo-90', 'demo', 'lesson-60', 'lesson-90'];
const ALLOWED_NEOTONE_MODEL = ['one', 'mutant', 'undecided'];
const ALLOWED_DISCOVERY = ['youtube', 'instagram', 'facebook', 'showcase', 'word-of-mouth', 'search', 'neotone-site', 'other'];
const ALLOWED_PLAYING_SINCE = ['none', 'under-1', '1-3', 'over-3'];
const SLOT_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
// La visio ne concerne QUE les cours : une démonstration se fait au showroom,
// on vient y toucher les instruments.
const REMOTE_SESSION_TYPES = ['onboarding-60', 'onboarding-90', 'lesson-60', 'lesson-90'];
const ALLOWED_SESSION_FORMAT = ['in-person', 'remote'];
const ALLOWED_INSTRUMENTS = ['neotone', 'calebasse', 'gonilele', 'mic-hisong', 'mic-muling'];

/**
 * Résume les casquettes en UNE valeur `usage_type`, la colonne historique.
 * On la garde renseignée pour ne rien casser (lignes existantes, dashboard) :
 * `roles` porte la vérité complète, `usage_type` en est le raccourci.
 * Ordre de priorité = du plus engageant au moins engageant.
 */
function deriveUsageType(roles: string[]): string | null {
    const has = (r: string) => roles.includes(r);
    if (has('teacher') && has('personal')) return 'both'; // sens historique de 'both'
    if (has('teacher')) return 'teacher';
    if (has('maker')) return 'maker';
    if (has('personal')) return 'personal';
    return null;
}

const SOURCE_LABELS: Record<string, { fr: string; en: string }> = {
    'showroom-visit': { fr: 'Venue au showroom (Paris 20ᵉ)', en: 'Showroom visit (Paris 20th)' },
    'private-session': { fr: 'Rendez-vous individuel (cours / démonstration privée)', en: 'Individual appointment (lesson / private demo)' },
    'showcase-booking': { fr: 'Place à un showcase public gratuit', en: 'Spot at a free public showcase' },
    'showcase-waitlist': { fr: 'Alerte prochaines dates de showcase', en: 'Alert for upcoming showcase dates' },
    'beta-waitlist': { fr: 'Liste d’attente application', en: 'App waiting list' },
    'app-login': { fr: 'Liste d’attente (écran de connexion)', en: 'Waiting list (login screen)' },
    'neotone-discount': { fr: 'Demande de code de remise Neotone (−5 %)', en: 'Neotone discount code request (−5%)' },
    showcase: { fr: 'Groupe showcases', en: 'Showcase group' },
};

/** Libellés lisibles des réponses du formulaire, pour la notification à David. */
const PROFILE_LABELS: Record<string, string> = {
    yes: 'oui', no: 'non', planning: 'bientôt',
    acoustic: 'acoustique', electronic: 'électronique', both: 'les deux',
    personal: 'à titre personnel', teacher: 'prof (outil pédagogique)', maker: 'fabricant de handpan',
    other: 'autre / ne sait pas encore',
    learn: 'apprendre à jouer', compose: 'composer / créer des gammes',
    none: 'aucun élève pour l’instant', '1-5': '1 à 5 élèves', '6-20': '6 à 20 élèves', '20+': 'plus de 20 élèves',
    'onboarding-60': 'Prise en main de l’instrument (1h)', 'onboarding-90': 'Prise en main de l’instrument (1h30)',
    one: 'Neotone¹ (10 notes)', mutant: 'Neotone¹ Mutant (19 notes)', undecided: 'ne sait pas encore',
    youtube: 'YouTube', instagram: 'Instagram', facebook: 'Facebook', showcase: 'un showcase / un événement',
    'word-of-mouth': 'bouche-à-oreille', search: 'recherche internet', 'neotone-site': 'le site de Neotone',
    'under-1': 'moins d’un an', '1-3': 'entre 1 et 3 ans', 'over-3': 'plus de 3 ans',
    // 'demo' seul = ancien identifiant (1h30), gardé pour les lignes déjà en base.
    demo: 'Découverte des instruments (1h30)',
    'demo-60': 'Découverte des instruments (1h)', 'demo-90': 'Découverte des instruments (1h30)',
    'lesson-60': 'Cours / accompagnement (1h)', 'lesson-90': 'Cours / accompagnement (1h30)',
    'in-person': 'en présentiel (showroom)', remote: 'en visio',
    neotone: 'Neotone', calebasse: 'Calebasse', gonilele: 'Gonilélé',
    'mic-hisong': 'Micro Hisong', 'mic-muling': 'Micro Muling',
    '9-': '9 notes ou moins', '10-13': '10 à 13 notes', '14-17': '14 à 17 notes',
    '18+': '18 notes et plus', varies: 'variable selon les gammes',
};

/** Métaux — table séparée : la clé `other` entre en collision avec la casquette « autre ». */
const METAL_LABELS: Record<string, string> = {
    nitrided: 'acier nitruré', stainless: 'inox', ember: 'ember steel', other: 'autre',
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
 * l'application, puis le blog, puis les showcases, puis le RDV VIP.
 *
 * ⚠ TARIFS EN DUR (`privPrice`) : une Edge Function ne peut pas importer
 * src/data/site.ts. La grille annoncée ici doit rester IDENTIQUE à
 * `sessionTypes` du site (1h = 50 €, 1h30 = 70 €) — si un prix bouge là-bas,
 * le changer ici aussi.
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
        h2priv: 'Rather have a moment just for you?',
        p4: 'I also offer <strong>individual appointments</strong>, at the Paris 20th showroom or online — and you decide what we do with it: discover and try any instrument from the shop (Neotone, acoustic handpans, Gonilélé, calabash…), test a handpan microphone (Hisong, Muling set), or simply get one-to-one guidance — whether you’re a complete beginner, still working out what suits you, or want to dig into one specific thing. Just tell me what you’re coming for.',
        privPrice: '<strong>1h — €50</strong> · <strong>1h30 — €70</strong> — one single price, whatever you’re coming for.',
        ctaPriv: 'Book a VIP appointment with David',
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
        h2priv: 'Envie d’un moment rien que pour toi ?',
        p4: 'Je propose aussi des <strong>rendez-vous individuels</strong>, au showroom de Paris 20ᵉ ou en visio — et c’est toi qui choisis ce qu’on en fait : découvrir et essayer n’importe quel instrument de la boutique (Neotone, handpans acoustiques, Gonilélé, calebasse…), tester un micro pour handpan (Hisong, set Muling), ou simplement être accompagné·e en tête-à-tête — que tu débutes complètement, que tu cherches encore ce qui te correspond, ou que tu veuilles creuser un point précis. Dis-moi juste ce qui t’amène.',
        privPrice: '<strong>1h — 50 €</strong> · <strong>1h30 — 70 €</strong> — un seul tarif, quel que soit ce pour quoi tu viens.',
        ctaPriv: 'Réserver un RDV VIP avec David',
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
          <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">${t.p4}</p>
          <p style="margin:0 0 16px;padding:12px 14px;background:#faf5ef;border:1px solid #e7d9c6;border-radius:10px;color:#374151;font-size:15px;line-height:1.6;">${t.privPrice}</p>
          ${btn(`${base}/showroom#agenda`, t.ctaPriv)}
        </td></tr>

        <tr><td style="padding:20px 28px 28px;border-top:1px solid #f0f1f3;">
          <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.5;">${t.sign}</p>
          <p style="margin:12px 0 0;color:#b6bcc4;font-size:11px;line-height:1.5;">${t.foot}</p>
        </td></tr>
`);
}

/** « dimanche 23 août 2026 à 14:30 » — un créneau proposé, en clair. */
function slotLabel(slot: string, lang: string): string {
    const [d, t] = slot.split('T');
    const date = new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'fr-FR',
        { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
        .format(new Date(d + 'T12:00:00'));
    return `${date} ${lang === 'en' ? 'at' : 'à'} ${t}`;
}

/** Accusé de réception d'une DEMANDE DE RÉSERVATION. David répond personnellement. */
function bookingHtml(
    firstName: string,
    lang: string,
    src: string,
    eventDate: string | null,
    message: string | null,
    sessionType: string | null,
    preferredSlots: string[] | null,
    sessionFormat: string | null,
    instruments: string[] | null,
    neotoneModel: string | null,
): string {
    const en = lang === 'en';
    const base = en ? `${SITE}/en` : SITE;
    const hi = firstName ? `${en ? 'Hi' : 'Bonjour'} ${esc(firstName)},` : (en ? 'Hi,' : 'Bonjour,');
    const isDiscount = src === 'neotone-discount';
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
        kindOf: 'Appointment',
        model: 'Model',
        format: 'Format',
        instruments: 'Instruments',
        slots: 'Slots you suggested',
        termsTitle: 'How it works',
        priceNote: 'Price: <strong>1h — €50</strong> · <strong>1h30 — €70</strong> — one single price, whatever you’re coming for.',
        terms1: 'I reply personally to confirm the slot I keep.',
        terms2: 'The appointment is firm once paid: payment is what reserves your slot and commits us both.',
        terms3: 'Something came up? Up to 24 h beforehand, we move your appointment — no problem at all.',
        terms4: 'Less than 24 h beforehand, the payment stays with me: that slot had been set aside just for you. But you don’t lose your appointment — we reschedule it within 3 months. We all have things come up, that’s life: it’s simply about the value of the commitment we make to each other.',
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
        kindOf: 'Rendez-vous',
        model: 'Modèle',
        format: 'Format',
        instruments: 'Instruments',
        slots: 'Créneaux que tu proposes',
        termsTitle: 'Comment ça se passe',
        priceNote: 'Tarif : <strong>1h — 50 €</strong> · <strong>1h30 — 70 €</strong> — un seul tarif, quel que soit ce pour quoi tu viens.',
        terms1: 'Je te réponds personnellement pour confirmer le créneau que je retiens.',
        terms2: 'Le rendez-vous devient ferme au règlement : c’est lui qui réserve ton créneau et nous engage tous les deux.',
        terms3: 'Un empêchement ? Jusqu’à 24 h avant, on décale ton rendez-vous sans aucun souci.',
        terms4: 'À moins de 24 h, le règlement reste acquis : ce créneau avait été bloqué rien que pour toi. Mais tu ne perds pas ton rendez-vous — on le reporte à une autre date, dans les 3 mois. On a tous des imprévus, ça fait partie de la vie : c’est simplement la valeur de l’engagement qu’on prend l’un envers l’autre.',
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
            ${neotoneModel ? row(t.model, esc(PROFILE_LABELS[neotoneModel] ?? neotoneModel)) : ''}
            ${sessionType ? row(t.kindOf, esc(PROFILE_LABELS[sessionType] ?? sessionType)) : ''}
            ${sessionFormat ? row(t.format, esc(PROFILE_LABELS[sessionFormat] ?? sessionFormat)) : ''}
            ${instruments?.length ? row(t.instruments, esc(instruments.map((i) => PROFILE_LABELS[i] ?? i).join(', '))) : ''}
            ${dateLabel ? row(t.when, `<span style="text-transform:capitalize;">${esc(dateLabel)}</span>`) : ''}
            ${preferredSlots?.length
                ? row(t.slots, preferredSlots.map((s) => `<span style="text-transform:capitalize;">${esc(slotLabel(s, lang))}</span>`).join('<br />'))
                : ''}
            ${message ? row(t.yourMsg, esc(message).replace(/\n/g, '<br />')) : ''}
          </table>
        </td></tr>

        ${preferredSlots?.length ? `
        <tr><td style="padding:20px 28px 4px;border-top:1px solid #f0f1f3;">
          <h2 style="margin:0 0 10px;font-size:17px;color:#111827;">${t.termsTitle}</h2>
          <p style="margin:0 0 12px;padding:10px 12px;background:#faf5ef;border:1px solid #e7d9c6;border-radius:10px;color:#374151;font-size:14px;line-height:1.6;">${t.priceNote}</p>
          <ol style="margin:0;padding-left:18px;color:#374151;font-size:14px;line-height:1.7;">
            <li>${t.terms1}</li><li>${t.terms2}</li><li>${t.terms3}</li><li>${t.terms4}</li>
          </ol>
        </td></tr>` : ''}

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
        const motivation = String(body.motivation ?? '').trim().slice(0, 2000) || null;
        const wantsShowcase = body.wantsShowcase === true;

        // --- Déclaration d'intention (casquettes multiples) ---
        const rawRoles = Array.isArray(body.roles) ? body.roles.map(String) : [];
        const roles = [...new Set(rawRoles.filter((r) => ALLOWED_ROLES.includes(r)))];
        // `usage_type` reste renseignée : soit dérivée des casquettes (nouveau
        // formulaire), soit reprise telle quelle (anciens appelants pas encore migrés).
        const usageType = roles.length
            ? deriveUsageType(roles)
            : (ALLOWED_USAGE.includes(String(body.usageType ?? '')) ? String(body.usageType) : null);

        const isTeacher = roles.includes('teacher') || usageType === 'teacher' || usageType === 'both';
        const isMaker = roles.includes('maker') || usageType === 'maker';
        const isPersonal = roles.includes('personal') || usageType === 'personal' || usageType === 'both';

        const rawStudentCount = String(body.studentCount ?? '').trim();
        const studentCount =
            isTeacher && ALLOWED_STUDENT_COUNT.includes(rawStudentCount) ? rawStudentCount : null;

        // Fiche fabricant — alimente le catalogue de l'app (mise en relation).
        const makerCountry = isMaker ? String(body.makerCountry ?? '').trim().slice(0, 80) || null : null;
        const rawMaxNotes = String(body.makerMaxNotes ?? '').trim();
        const makerMaxNotes =
            isMaker && ALLOWED_MAKER_MAX_NOTES.includes(rawMaxNotes) ? rawMaxNotes : null;
        const rawMetals = Array.isArray(body.makerMetals) ? body.makerMetals.map(String) : [];
        const metals = isMaker
            ? [...new Set(rawMetals.filter((m) => ALLOWED_MAKER_METALS.includes(m)))]
            : [];
        const makerMetals = metals.length ? metals : null;
        const makerPricing = isMaker ? String(body.makerPricing ?? '').trim().slice(0, 1000) || null : null;

        const pledgeHonest = body.pledgeHonest === true;

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
            isPersonal && ALLOWED_PERSONAL_GOAL.includes(rawPersonalGoal) ? rawPersonalGoal : null;
        const wantsBeta = body.wantsBeta === true;

        // Champs « demande de réservation »
        const phone = String(body.phone ?? '').trim().slice(0, 40) || null;
        // 20 000 caractères : côté visiteur c'est « sans limite », côté serveur ça
        // reste borné pour ne pas laisser passer n'importe quoi.
        const message = String(body.message ?? '').trim().slice(0, 20000) || null;
        const rawPeople = Number(body.peopleCount);
        const peopleCount = Number.isFinite(rawPeople) && rawPeople > 0 ? Math.min(Math.round(rawPeople), 50) : null;
        const rawDate = String(body.eventDate ?? '').trim();
        const eventDate = /^\d{4}-\d{2}-\d{2}$/.test(rawDate) ? rawDate : null;

        // Rendez-vous individuel : type de séance + créneaux proposés (3 max).
        const rawSession = String(body.sessionType ?? '').trim();
        const sessionType = ALLOWED_SESSION_TYPE.includes(rawSession) ? rawSession : null;
        const rawSlots = Array.isArray(body.preferredSlots) ? body.preferredSlots.map(String) : [];
        const slots = [...new Set(rawSlots.filter((s) => SLOT_RE.test(s)))].slice(0, 3).sort();
        const preferredSlots = slots.length ? slots : null;

        // Format : pertinent seulement pour un COURS. Pour une démonstration on
        // force `in-person` — elle ne peut pas se tenir en visio.
        const rawFormat = String(body.sessionFormat ?? '').trim();
        const sessionFormat = sessionType
            ? (REMOTE_SESSION_TYPES.includes(sessionType)
                ? (ALLOWED_SESSION_FORMAT.includes(rawFormat) ? rawFormat : null)
                : 'in-person')
            : null;

        // Instruments à préparer : uniquement pour une démonstration privée.
        const rawInstruments = Array.isArray(body.instruments) ? body.instruments.map(String) : [];
        const picked = sessionType && !REMOTE_SESSION_TYPES.includes(sessionType)
            ? [...new Set(rawInstruments.filter((i) => ALLOWED_INSTRUMENTS.includes(i)))]
            : [];
        const instruments = picked.length ? picked : null;

        // Demande de code de remise Neotone.
        const rawModel = String(body.neotoneModel ?? '').trim();
        const neotoneModel = ALLOWED_NEOTONE_MODEL.includes(rawModel) ? rawModel : null;
        const country = String(body.country ?? '').trim().slice(0, 80) || null;
        const rawDiscovery = String(body.discoveryChannel ?? '').trim();
        const discoveryChannel = ALLOWED_DISCOVERY.includes(rawDiscovery) ? rawDiscovery : null;
        const rawPlaying = String(body.playingSince ?? '').trim();
        const playingSince = ALLOWED_PLAYING_SINCE.includes(rawPlaying) ? rawPlaying : null;
        const dream = String(body.dream ?? '').trim().slice(0, 300) || null;
        const socialAccount = String(body.socialAccount ?? '').trim().slice(0, 200) || null;

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
            roles: roles.length ? roles : null,
            personal_goal: personalGoal,
            student_count: studentCount,
            maker_country: makerCountry,
            maker_max_notes: makerMaxNotes,
            maker_metals: makerMetals,
            maker_pricing: makerPricing,
            pledge_honest: pledgeHonest,
            wants_beta: wantsBeta,
            motivation,
            phone,
            message,
            people_count: peopleCount,
            event_date: eventDate,
            neotone_model: neotoneModel,
            country,
            social_account: socialAccount,
            discovery_channel: discoveryChannel,
            playing_since: playingSince,
            dream,
            session_type: sessionType,
            session_format: sessionFormat,
            instruments,
            preferred_slots: preferredSlots,
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
                        ? bookingHtml(firstName, lang, source, eventDate, message, sessionType, preferredSlots, sessionFormat, instruments, neotoneModel)
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
            // une demande de réservation, une candidature bêta-testeur, ou un FABRICANT
            // qui se déclare (c'est un partenaire potentiel : il ne doit jamais dormir
            // dans le dashboard). Une simple inscription ne déclenche RIEN.
            if (isBooking || wantsBeta || isMaker) {
                const notifier = new SMTPClient({
                    connection: { hostname: host, port, tls: port === 465, auth: { username: user, password: pass } },
                });
                try {
                    await notifier.send({
                        from,
                        to: ADMIN_EMAIL,
                        replyTo: email,
                        // Un fabricant passe devant : c'est la demande la plus rare et la
                        // plus stratégique. Son pays figure dans l'objet pour situer d'un
                        // coup d'œil (le catalogue se choisit d'abord sur la localisation).
                        subject: (
                            isBooking ? `[Site] ${sourceLabel(source, 'fr')} — ${firstName} ${lastName}`
                            : isMaker ? `[Fabricant] ${firstName} ${lastName}${makerCountry ? ` — ${makerCountry}` : ''}`
                            : `[Bêta] Candidature — ${firstName} ${lastName}`
                        ).trim(),
                        html: adminNotifyHtml({
                            Motif: isBooking
                                ? sourceLabel(source, 'fr')
                                : [
                                    isMaker ? 'Fabricant de handpan — fiche catalogue' : null,
                                    wantsBeta ? 'Candidature bêta-testeur' : null,
                                  ].filter(Boolean).join(' · ') || sourceLabel(source, 'fr'),
                            Nom: `${firstName} ${lastName}`.trim() || null,
                            Email: email,
                            Téléphone: phone,
                            'Joue déjà': hasHandpan ? PROFILE_LABELS[hasHandpan] ?? hasHandpan : null,
                            'Type de handpan': handpanType ? PROFILE_LABELS[handpanType] ?? handpanType : null,
                            'Déclare être': roles.length
                                ? roles.map((r) => PROFILE_LABELS[r] ?? r).join(' + ')
                                : (usageType ? PROFILE_LABELS[usageType] ?? usageType : null),
                            Objectif: personalGoal ? PROFILE_LABELS[personalGoal] ?? personalGoal : null,
                            Élèves: studentCount ? PROFILE_LABELS[studentCount] ?? studentCount : null,
                            'Fabrique à': makerCountry,
                            'Notes max': makerMaxNotes ? PROFILE_LABELS[makerMaxNotes] ?? makerMaxNotes : null,
                            // `other` existe aussi comme casquette : on n'utilise donc PAS
                            // PROFILE_LABELS ici, sinon un métal « autre » afficherait
                            // « autre / ne sait pas encore ».
                            Métaux: makerMetals ? makerMetals.map((m) => METAL_LABELS[m] ?? m).join(', ') : null,
                            'Gammes / tarifs': makerPricing,
                            Motivation: motivation,
                            'Modèle visé': neotoneModel ? PROFILE_LABELS[neotoneModel] ?? neotoneModel : null,
                            'Pays de livraison': country,
                            'Réseaux sociaux': socialAccount,
                            'M’a découvert par': discoveryChannel ? PROFILE_LABELS[discoveryChannel] ?? discoveryChannel : null,
                            'Joue depuis': playingSince ? PROFILE_LABELS[playingSince] ?? playingSince : null,
                            'Rêve de jouer': dream,
                            'Rendez-vous': sessionType ? PROFILE_LABELS[sessionType] ?? sessionType : null,
                            Format: sessionFormat ? PROFILE_LABELS[sessionFormat] ?? sessionFormat : null,
                            'Instruments à préparer': instruments
                                ? instruments.map((i) => PROFILE_LABELS[i] ?? i).join(', ')
                                : null,
                            'Créneaux proposés': preferredSlots?.length
                                ? preferredSlots.map((s) => slotLabel(s, 'fr')).join(' · ')
                                : null,
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
