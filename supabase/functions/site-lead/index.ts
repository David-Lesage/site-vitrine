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
// v16 (09/08/2026) : CORRECTIF EMAIL BRUT. Les notifications de lead arrivaient
//      chez David en source MIME non décodée (`<!doctype html>`, `=3d`,
//      frontières visibles). Cause : denomailer 1.6.0 insère un saut de ligne
//      souple `=\r\n` tous les 74 caractères DANS l'en-tête `Subject:` dès que
//      celui-ci contient un caractère non-ASCII — ce CRLF termine le bloc
//      d'en-têtes et fait basculer `Content-Type` et le HTML dans le corps.
//      Tout `subject:` passe désormais par `mailSubject()` (_shared/mail.ts).
// v17 (09/08/2026) : CORRECTIF CORPS. SECOND bug, indépendant, de la même lib :
//      `quotedPrintableEncode()` échappe `=` en `=3d` MINUSCULE, alors que la
//      RFC 2045 §6.7 impose des hexadécimaux MAJUSCULES. Symptôme observé : la
//      balise `<meta name="viewport">` arrivait mutilée. Les corps partent
//      désormais en base64 via `htmlPart()` — plus de quoted-printable du tout.
// v18 (10/08/2026) : AGENDA DU MODE ENSEIGNANT. Une demande de rendez-vous
//      individuel crée AUSSI une ligne `public.lessons` en statut `proposed`
//      (migration 0037 de l'app), pour que la demande atterrisse directement
//      dans l'espace enseignant de Handpan Studio — l'email de notification
//      reste envoyé exactement comme avant, RIEN n'est retiré. Le prof
//      destinataire est résolu par `resolve_booking_teacher(slug)` : aucun UUID
//      en dur, un 2ᵉ prof n'aura qu'à envoyer son `teacherSlug`.
// v19 (10/08/2026) : CONFIRMER UN CRÉNEAU DEPUIS L'EMAIL. La notification à
//      David porte désormais un BOUTON PAR CRÉNEAU proposé. Un clic confirme le
//      cours ET envoie l'email de confirmation à la personne, sans ouvrir l'app
//      (Edge Function `confirm-lesson-slot` + jeton signé _shared/lesson-token.ts).
// v20 (16/08/2026) : SHOWCASE — LA PLACE EST CONFIRMÉE TOUT DE SUITE.
//      Une réservation de showcase (`showcase-booking`, seule source émise par
//      le formulaire de /showroom#agenda) ne reçoit plus l'accusé de réception
//      « je te réponds très vite » : elle reçoit un VRAI email de confirmation
//      (_shared/showcase-email.ts) — place confirmée, date et horaires de la
//      séance, ponctualité, déroulé complet, consignes d'accès au Nid, note
//      « enfants », et un bloc « rendez-vous individuel » (payant, distinct du
//      showcase qui reste gratuit). La ligne passe en `status = 'confirmed'`,
//      donc le panneau admin « 🎤 Showcase » la voit confirmée sans rien faire.
//      ⚠ Le parcours `private-session` (RDV payant, v18/v19) est INCHANGÉ, tout
//      comme `showcase-waitlist` (simple alerte de dates, pas une place).
// v21 (16/08/2026) : `contact` et `gonilele-order` rejoignent BOOKING_SOURCES —
//      les derniers boutons `mailto:` du site (formulaire /contact, CTA
//      « Collaboration » de /a-propos, commande d'une harpe Gonilélé) passent
//      enfin par la base au lieu d'ouvrir le logiciel de mail du visiteur.
// v22 (16/08/2026) : LISTE D'ATTENTE SHOWCASE — L'EMAIL DONNE LES DATES.
//      Demande de David : quelqu'un qui laisse son email sur la page d'accueil
//      doit recevoir AUTOMATIQUEMENT toutes les dates de showcase à venir, avec
//      un lien d'inscription par date. `showcase-waitlist` ne reçoit donc plus
//      l'accusé de réception générique mais `showcaseDatesHtml()`, alimenté par
//      `upcomingEvents` (envoyé par le site depuis `agendaEvents`, la même
//      source que l'agenda de /showroom). Cas vide traité honnêtement : « aucune
//      date pour l'instant, je t'écris dès qu'il y en a une ». David reste
//      notifié. L'email de confirmation dit par ailleurs désormais que l'HEURE
//      DE DÉBUT est ferme (la date, elle, se choisit), annonce la durée réelle
//      (~2h de programme, plutôt 3h avec les échanges) et invite — facultatif —
//      à apporter quelque chose à partager.
// v23 (16/08/2026) : CORRECTIF du repli de v22. Un champ `upcomingEvents` ABSENT
//      et un tableau VIDE donnaient tous les deux `[]` : le repli sur EVENT_HOURS
//      se déclenchait donc AUSSI quand le site disait « il n'y a aucune date »,
//      rendant le cas vide inatteignable et pouvant annoncer une date que
//      /showroom n'affiche plus. On teste désormais la PRÉSENCE du champ.
// v24 (17/08/2026) : CONDITIONS GÉNÉRALES + INSTRUMENTS DU SHOWCASE.
//      · `termsAccepted` → `terms_accepted_at` (date SERVEUR) + `terms_version`.
//        La case est obligatoire côté navigateur ; ici on enregistre, on ne
//        rejette pas (même arbitrage que les sous-questions : ne jamais perdre
//        un contact sur un 400). Une ligne sans `terms_accepted_at` = un
//        consentement non prouvé, pas une erreur.
//      · `showcaseInterests` → `showcase_instruments`, accepté UNIQUEMENT pour
//        `showcase-booking`. Colonne DISTINCTE d'`instruments`, qui est ignorée
//        dès que `sessionType` est vide — toujours le cas pour un showcase.
//      ⚠ Nécessite les colonnes `terms_accepted_at`, `terms_version` et
//      `showcase_instruments` sur `public.site_leads` (ADD COLUMN nullable
//      appliqué le 17/08/2026). Sans elles, l'insert lève une erreur → 500 →
//      le visiteur voit un échec et le lead est perdu. Colonnes AVANT déploiement.
// v25 (17/08/2026) : CONSENTEMENT AUX NOUVEAUTÉS, SÉPARÉ ET FACULTATIF.
//      Une case « J'accepte les conditions générales » ne vaut PAS accord pour
//      recevoir de la prospection : les 4 formulaires portent désormais une
//      SECONDE case, facultative et jamais pré-cochée (NewsCheckbox.astro), qui
//      écrit `news_opt_in` (état courant, false compris) et `news_opt_in_at`
//      (date de l'accord). Sans elle, la base de contacts n'est pas utilisable
//      pour annoncer une nouveauté. La notification à David affiche la réponse.
//      ⚠ Nécessite `news_opt_in` (boolean) et `news_opt_in_at` (timestamptz) sur
//      `public.site_leads` — ADD COLUMN nullable appliqué le 17/08/2026. Mêmes
//      conséquences qu'en v24 si les colonnes manquent : 500 et lead perdu.
// =============================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';
import { htmlPart, mailSubject } from '../_shared/mail.ts';
import { canSignSlotTokens, signSlotToken } from '../_shared/lesson-token.ts';
import {
    FALLBACK_PRICE_GRID,
    fallbackUpcoming,
    hoursFor as showcaseHoursFor,
    showcaseConfirmationHtml,
    showcaseConfirmationSubject,
    showcaseDatesHtml,
    showcaseDatesSubject,
    type UpcomingEvent,
} from '../_shared/showcase-email.ts';

const SITE = 'https://lesagedavid.fr';
const ADMIN_EMAIL = 'contact@lesagedavid.fr';
const JSON_HEADERS = { 'Content-Type': 'application/json' };

// Sources qui correspondent à une DEMANDE DE RÉSERVATION (David doit répondre).
// `contact` et `gonilele-order` (16/08/2026) : anciens liens `mailto:` du site
// (page /contact, CTA « Collaboration », commande d'une harpe Gonilélé). Ils
// attendent une réponse de David → même traitement qu'une réservation : accusé
// de réception à la personne + notification à David. Sans ça, ils tomberaient
// dans la branche « liste d'attente » et enverraient un « tu es sur la liste »
// à quelqu'un qui vient simplement de poser une question.
const BOOKING_SOURCES = ['showroom-visit', 'private-session', 'showcase-booking', 'showcase-waitlist', 'neotone-discount', 'contact', 'gonilele-order'];

// RÉSERVATION D'UNE PLACE À UN SHOWCASE — la seule source émise par le bouton
// « Réserver ma place » de /showroom#agenda (ShowroomPage.astro). C'est la SEULE
// à recevoir la confirmation immédiate : `showcase-waitlist` ne réserve rien
// (elle demande juste à être prévenue des prochaines dates).
const SHOWCASE_BOOKING_SOURCE = 'showcase-booking';

// LISTE D'ATTENTE SHOWCASE (v22) — la personne ne réserve pas une place, elle
// demande à connaître les dates. Elle reçoit donc l'email qui LISTE les dates à
// venir avec un lien de réservation par date (_shared/showcase-email.ts), et
// non l'accusé de réception « je te réponds très vite » : les dates sont
// publiques et déjà affichées sur /showroom, David n'a pas à les recopier à la
// main. Il reste notifié (la source est dans BOOKING_SOURCES).
const SHOWCASE_WAITLIST_SOURCE = 'showcase-waitlist';

/** « 16:00 » — refuse tout ce qui n'est pas une heure, l'email l'affiche en clair. */
const TIME_RE = /^\d{1,2}:\d{2}$/;

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

// SHOWCASE (17/08/2026) — « pour quel(s) instrument(s) viens-tu ? ».
// ⚠ Liste et colonne DISTINCTES d'ALLOWED_INSTRUMENTS ci-dessus : `instruments`
// est ignorée dès que `sessionType` est vide, ce qui est TOUJOURS le cas pour un
// showcase (il n'a pas de type de séance). Les deux questions ne peuvent donc
// pas partager une colonne.
// Doit rester alignée sur `showcaseInterests` de src/data/site.ts.
// 🚧 'atlas' (pieds Atlas) volontairement absent : partenariat non signé.
const ALLOWED_SHOWCASE_INTERESTS = ['all', 'handpan', 'mic', 'calebasse', 'gonilele', 'meet'];

// CONDITIONS GÉNÉRALES (17/08/2026) — case obligatoire sur tous les formulaires.
// La coche seule ne prouve rien : ce qui est opposable, c'est l'horodatage
// serveur + la VERSION du texte accepté. Changer cette valeur le jour où les
// conditions générales sont modifiées (et ne jamais la changer rétroactivement :
// les lignes déjà en base portent la version qu'elles ont réellement acceptée).
const TERMS_VERSION = '2026-08-17';

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
    contact: { fr: 'Message via le formulaire de contact', en: 'Message via the contact form' },
    'gonilele-order': { fr: 'Commande d’une harpe Gonilélé', en: 'Gonilélé harp order' },
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

/**
 * Instruments d'un SHOWCASE — table séparée de PROFILE_LABELS à dessein : les
 * clés y sont courtes et génériques (`all`, `mic`, `meet`, `handpan`) et
 * entreraient tôt ou tard en collision avec une autre question (c'est exactement
 * ce qui est arrivé à `other` entre les métaux et les casquettes).
 */
const SHOWCASE_INTEREST_LABELS: Record<string, string> = {
    all: 'tous les instruments',
    handpan: 'handpan',
    mic: 'micro (Muling / Hisong)',
    calebasse: 'calebasse',
    gonilele: 'Gonilélé (harpe africaine)',
    meet: 'me rencontrer',
};

/** Métaux — table séparée : la clé `other` entre en collision avec la casquette « autre ». */
const METAL_LABELS: Record<string, string> = {
    nitrided: 'acier nitruré', stainless: 'inox', ember: 'ember steel', other: 'autre',
};

// =============================================================================
// AGENDA DU MODE ENSEIGNANT (v18) — une demande de RDV devient un cours proposé
// =============================================================================
// Sources qui correspondent à une demande de COURS / SÉANCE individuelle, donc à
// une ligne `public.lessons`. Volontairement étroit : une venue au showroom ou
// une place de showcase n'est pas un cours et n'a rien à faire dans l'agenda
// pédagogique. Pour en ajouter une plus tard : une entrée ici suffit.
const LESSON_SOURCES = ['private-session'];

/** Fuseau de référence des créneaux saisis sur le site (heure de Paris). */
const SITE_TIME_ZONE = 'Europe/Paris';

/** Décalage (minutes) d'un fuseau à un instant donné. */
function tzOffsetMinutes(date: Date, timeZone: string): number {
    const dtf = new Intl.DateTimeFormat('en-US', {
        timeZone, hourCycle: 'h23',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
    const parts = dtf.formatToParts(date);
    const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? '0');
    const asUTC = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'));
    return (asUTC - date.getTime()) / 60000;
}

/**
 * « 2026-08-23T14:30 » (heure de Paris, tel que saisi sur le site) → ISO UTC.
 * Sans cette conversion, Deno interpréterait la chaîne dans le fuseau du serveur
 * (UTC) et le rendez-vous se retrouverait décalé d'une à deux heures.
 */
function siteSlotToIso(slot: string): string | null {
    const naive = new Date(slot + ':00Z');
    if (Number.isNaN(naive.getTime())) return null;
    const off1 = tzOffsetMinutes(naive, SITE_TIME_ZONE);
    let real = new Date(naive.getTime() - off1 * 60000);
    // Un créneau posé juste au changement d'heure peut changer de décalage :
    // seconde passe avec l'instant corrigé.
    const off2 = tzOffsetMinutes(real, SITE_TIME_ZONE);
    if (off2 !== off1) real = new Date(naive.getTime() - off2 * 60000);
    return real.toISOString();
}

/** Durée d'une séance déduite de son identifiant (`lesson-90` → 90 min). */
function sessionDuration(sessionType: string | null): number {
    if (!sessionType) return 60;
    if (sessionType.endsWith('-90')) return 90;
    if (sessionType.endsWith('-60')) return 60;
    if (sessionType === 'demo') return 90; // ancien identifiant, 1h30
    return 60;
}

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
        p2: 'The showroom is at <strong>29 rue des Orteaux, Paris 20th</strong>. You’ll be able to try the electronic <strong>Neotone</strong> handpan, <strong>Yishama</strong> acoustic handpans, the microphones, the <strong>Gonilélé</strong> African harp and the <strong>Handpan Compagnon</strong> app.',
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
        p2: 'Le showroom se trouve au <strong>29 rue des Orteaux, Paris 20ᵉ</strong>. Tu pourras y essayer le handpan électronique <strong>Neotone</strong>, les handpans acoustiques <strong>Yishama</strong>, les micros, la harpe africaine <strong>Gonilélé</strong> et l’application <strong>Handpan Compagnon</strong>.',
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

/**
 * Notification interne à David : tout ce qu'il faut pour rappeler la personne.
 * `extraHtml` = bloc optionnel ajouté APRÈS le tableau (v19 : les boutons
 * « Confirmer ce créneau »).
 */
function adminNotifyHtml(f: Record<string, string | number | null>, extraHtml = ''): string {
    const row = (k: string, v: string | number | null) =>
        v === null || v === '' ? '' :
        `<tr><td style="padding:5px 0;color:#6b7280;font-size:13px;width:130px;vertical-align:top;">${k}</td><td style="padding:5px 0;color:#111827;font-size:14px;">${esc(String(v))}</td></tr>`;

    return shell('fr', `
        <tr><td style="padding:26px 28px 6px;">
          <div style="font-size:20px;font-weight:700;color:#111827;">Nouvelle demande — ${esc(String(f.Motif ?? ''))}</div>
        </td></tr>
        <tr><td style="padding:8px 28px ${extraHtml ? '10px' : '26px'};">
          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
            ${Object.entries(f).map(([k, v]) => row(k, v)).join('')}
          </table>
        </td></tr>
        ${extraHtml}
`);
}

/**
 * v19 — CONFIRMER UN CRÉNEAU DEPUIS L'EMAIL, EN UN CLIC.
 *
 * David voulait « répondre au mail pour valider une des disponibilités ». Lire
 * une vraie réponse écrite supposerait de RECEVOIR des emails (IMAP ou entrant
 * webhook) puis d'en extraire l'intention en texte libre : beaucoup de pièces
 * fragiles. Un bouton par créneau donne le même geste, en fiable.
 *
 * Chaque bouton porte un jeton signé HMAC lié à CE cours et à CE créneau
 * (_shared/lesson-token.ts) et pointe vers l'Edge Function `confirm-lesson-slot`,
 * qui confirme le cours et prévient la personne par email.
 *
 * Rend '' si on n'a pas de quoi signer : l'email part alors comme avant.
 */
async function slotConfirmBlockHtml(lessonId: string | null, slots: string[]): Promise<string> {
    if (!lessonId || !slots.length || !canSignSlotTokens()) return '';
    const base = (Deno.env.get('SUPABASE_URL') ?? '').replace(/\/$/, '');
    if (!base) return '';

    const buttons: string[] = [];
    for (const slot of slots) {
        const token = await signSlotToken(lessonId, slot);
        if (!token) continue;
        const href = `${base}/functions/v1/confirm-lesson-slot?t=${encodeURIComponent(token)}`;
        buttons.push(
            `<tr><td style="padding:4px 0;">
               <a href="${esc(href)}" style="display:block;background:#b4462a;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:13px 18px;border-radius:10px;text-align:center;text-transform:capitalize;">✅ ${esc(slotLabel(slot, 'fr'))}</a>
             </td></tr>`,
        );
    }
    if (!buttons.length) return '';

    return `
        <tr><td style="padding:6px 28px 26px;">
          <div style="padding:14px 16px;background:#faf5ef;border:1px solid #e7d9c6;border-radius:12px;">
            <div style="font-size:16px;font-weight:700;color:#111827;margin-bottom:6px;">Confirmer un créneau en un clic</div>
            <p style="margin:0 0 12px;color:#374151;font-size:14px;line-height:1.6;">
              Choisis l'un des créneaux proposés : le cours passe en « confirmé » dans ton agenda,
              et la personne reçoit aussitôt un email de confirmation. Pas besoin d'ouvrir l'application.
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
              ${buttons.join('')}
            </table>
            <p style="margin:12px 0 0;color:#9ca3af;font-size:12px;line-height:1.5;">
              Un seul créneau peut être confirmé : le premier clic gagne. Pour changer ensuite,
              passe par 🎓 Enseignement → 📅 Agenda.
            </p>
          </div>
        </td></tr>`;
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
        // Agenda enseignant (v18) : à quel PROF adresser la demande ? Le formulaire
        // du site n'envoie rien aujourd'hui → prof par défaut de la plateforme.
        // Le jour où un autre prof a son propre formulaire, il envoie son slug.
        const teacherSlug = String(body.teacherSlug ?? '').trim().toLowerCase().slice(0, 40) || null;

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

        // Horaires de la séance de showcase réservée. Envoyés par le site (ils
        // viennent de `agendaEvents` dans src/data/site.ts), avec repli sur la
        // table de _shared/showcase-email.ts si la page servie est un cache
        // antérieur à ce changement. NON persistés : `site_leads` ne porte que
        // `event_date`, et l'horaire appartient à l'événement, pas à la personne.
        const rawStart = String(body.eventStart ?? '').trim();
        const rawEnd = String(body.eventEnd ?? '').trim();
        const eventStart = TIME_RE.test(rawStart) ? rawStart : null;
        const eventEnd = TIME_RE.test(rawEnd) ? rawEnd : null;

        // DATES DE SHOWCASE À VENIR (v22) — pour l'email de la liste d'attente.
        // Envoyées par le site, calculées depuis `agendaEvents` (src/data/site.ts),
        // soit la MÊME source que l'agenda affiché sur /showroom : l'email ne peut
        // donc pas annoncer une date que la page ne montre pas. On revalide tout
        // ici quand même — une date mal formée ou déjà passée produirait un lien
        // d'inscription mort, ce qui est pire que pas de lien du tout.
        const todayIso = new Date().toISOString().slice(0, 10);
        // ⚠ `hasUpcomingField` et NON `rawUpcoming.length` : un champ ABSENT et un
        // tableau VIDE donnent tous les deux `[]`, alors qu'ils veulent dire deux
        // choses opposées — « je ne sais pas » (vieille page en cache, il faut le
        // repli) contre « il n'y a rien de prévu » (information vraie, à annoncer
        // telle quelle). Les confondre rendait le cas « aucune date » INATTEIGNABLE
        // et pouvait annoncer une date d'EVENT_HOURS que le site n'affiche plus.
        const hasUpcomingField = Array.isArray(body.upcomingEvents);
        const rawUpcoming = hasUpcomingField ? body.upcomingEvents as unknown[] : [];
        let upcomingEvents: UpcomingEvent[] = rawUpcoming
            .map((e) => (e && typeof e === 'object' ? e as Record<string, unknown> : {}))
            .map((e) => ({
                date: String(e.date ?? '').trim(),
                start: String(e.start ?? '').trim(),
                end: String(e.end ?? '').trim(),
            }))
            .filter((e) => /^\d{4}-\d{2}-\d{2}$/.test(e.date) && TIME_RE.test(e.start) && TIME_RE.test(e.end))
            .filter((e) => e.date >= todayIso)
            .sort((a, b) => a.date.localeCompare(b.date))
            .slice(0, 12);
        // Page servie depuis un cache ANTÉRIEUR à ce changement (elle n'envoie pas
        // encore le champ) : plutôt que d'annoncer « aucune date » à quelqu'un
        // alors que l'agenda du site en affiche, on retombe sur la table de
        // _shared/showcase-email.ts. Si le site a envoyé une liste VIDE, en
        // revanche, c'est une vraie information : il n'y a rien de prévu, et
        // l'email le dit honnêtement au lieu d'inventer une date.
        if (!hasUpcomingField) upcomingEvents = fallbackUpcoming(todayIso);

        // Grille tarifaire du rendez-vous individuel, CALCULÉE par le site
        // (priceGrid(), alimenté par `sessionTypes` de src/data/site.ts). Une
        // Edge Function ne peut pas importer ce code : le site la transmet pour
        // que l'email ne puisse jamais annoncer un prix que le formulaire ne
        // pratique pas. Bornée et échappée à l'affichage.
        const rawGrid = String(body.priceGrid ?? '').trim().slice(0, 120);
        const priceGrid = rawGrid || FALLBACK_PRICE_GRID;

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

        // SHOWCASE — instruments pour lesquels la personne vient (17/08/2026).
        // Accepté UNIQUEMENT pour `showcase-booking` : ailleurs, la question
        // n'est pas posée, donc une valeur qui arriverait quand même vient d'un
        // appel forgé ou d'une page en cache — on la jette.
        const rawShowcaseInterests = Array.isArray(body.showcaseInterests) ? body.showcaseInterests.map(String) : [];
        const pickedShowcase = source === SHOWCASE_BOOKING_SOURCE
            ? [...new Set(rawShowcaseInterests.filter((i) => ALLOWED_SHOWCASE_INTERESTS.includes(i)))]
            : [];
        const showcaseInterests = pickedShowcase.length ? pickedShowcase : null;

        // CONDITIONS GÉNÉRALES — la case est obligatoire côté navigateur ; ici
        // on ENREGISTRE le consentement (date serveur + version du texte), ce
        // qui est la seule chose opposable. On ne rejette PAS une demande sans
        // consentement : `site-lead` est la porte d'entrée publique du site et
        // perdre un contact coûte plus cher qu'une case manquante (même
        // arbitrage que les sous-questions plus haut). Une ligne sans
        // `terms_accepted_at` est simplement une ligne sans consentement prouvé.
        const termsAccepted = body.termsAccepted === true;
        const termsAcceptedAt = termsAccepted ? new Date().toISOString() : null;

        // NOUVEAUTÉS (v25) — consentement FACULTATIF, case séparée et jamais
        // pré-cochée. Accepter les conditions générales ne vaut PAS accord pour
        // recevoir de la prospection : c'est cette valeur-là, et elle seule, qui
        // autorise à écrire à quelqu'un pour autre chose que sa demande.
        // `news_opt_in` porte l'ÉTAT COURANT (false compris : un refus est une
        // information), `news_opt_in_at` la date à laquelle l'accord a été donné.
        // ⚠ `false` est bien écrit lors d'une seconde soumission (le patch de
        // `upsert()` ne saute que null / '') : un consentement peut donc se
        // retirer en renvoyant le formulaire sans cocher — jamais l'inverse.
        const newsOptIn = body.newsOptIn === true;
        const newsOptInAt = newsOptIn ? new Date().toISOString() : null;

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
        // Réservation d'une place à un showcase → confirmation IMMÉDIATE.
        const isShowcaseBooking = source === SHOWCASE_BOOKING_SOURCE;
        // Liste d'attente showcase → email listant les dates à venir (v22).
        const isShowcaseWaitlist = source === SHOWCASE_WAITLIST_SOURCE;

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
            showcase_instruments: showcaseInterests,
            terms_accepted_at: termsAcceptedAt,
            terms_version: termsAccepted ? TERMS_VERSION : null,
            news_opt_in: newsOptIn,
            news_opt_in_at: newsOptInAt,
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

        // --- AGENDA DU MODE ENSEIGNANT (v18) ----------------------------------
        // Une demande de rendez-vous individuel devient AUSSI un cours `proposed`
        // dans l'espace enseignant de l'app (public.lessons, migration 0037).
        // UNE SEULE LIGNE par demande : tous les créneaux candidats vivent dans
        // `proposed_slots`, et `starts_at` est pré-rempli avec le plus tôt d'entre
        // eux pour que la demande apparaisse déjà dans le calendrier. Le prof
        // retient ensuite LE créneau d'un clic (l'UI écrit starts_at + confirmed).
        // JAMAIS BLOQUANT : si quoi que ce soit échoue ici, le lead est déjà
        // enregistré et les emails partent quand même — on ne perd pas un contact.
        // Repris plus bas par la notification à David (boutons « Confirmer ce créneau »).
        let confirmLessonId: string | null = null;
        let confirmSlots: string[] = [];

        if (LESSON_SOURCES.includes(source)) {
            try {
                const { data: teacherId } = await admin.rpc('resolve_booking_teacher', { p_slug: teacherSlug });
                if (teacherId) {
                    const slotIso = (preferredSlots ?? [])
                        .map(siteSlotToIso)
                        .filter((s): s is string => Boolean(s));
                    const noteLines = [
                        sessionType ? `Séance demandée : ${PROFILE_LABELS[sessionType] ?? sessionType}` : null,
                        sessionFormat ? `Format : ${PROFILE_LABELS[sessionFormat] ?? sessionFormat}` : null,
                        playingSince ? `Joue depuis : ${PROFILE_LABELS[playingSince] ?? playingSince}` : null,
                        dream ? `Rêve de jouer : ${dream}` : null,
                        discoveryChannel ? `M'a découvert par : ${PROFILE_LABELS[discoveryChannel] ?? discoveryChannel}` : null,
                        message ? `\nMessage :\n${message}` : null,
                        `\n(Demande reçue via le site — ${sourceLabel(source, 'fr')})`,
                    ].filter(Boolean);

                    const lessonRow = {
                        teacher_id: teacherId,
                        student_name: `${firstName} ${lastName}`.trim() || null,
                        student_email: email,
                        student_phone: phone,
                        title: sessionType ? (PROFILE_LABELS[sessionType] ?? sessionType) : 'Demande de cours',
                        lesson_type: (peopleCount ?? 1) > 1 ? 'group' : 'private',
                        mode: sessionFormat === 'remote' ? 'video' : 'in_person',
                        status: 'proposed',
                        starts_at: slotIso[0] ?? null,
                        duration_min: sessionDuration(sessionType),
                        proposed_slots: slotIso.length ? slotIso : null,
                        participants: Math.max(1, Math.min(200, peopleCount ?? 1)),
                        note: noteLines.join('\n'),
                        source: 'site-form',
                        source_ref: leadId ?? null,
                    };

                    // Une 2ᵉ soumission pour la MÊME demande met à jour la
                    // proposition existante au lieu d'en créer un doublon.
                    const { data: already } = await admin
                        .from('lessons')
                        .select('id')
                        .eq('source_ref', leadId ?? '')
                        .eq('status', 'proposed')
                        .limit(1)
                        .maybeSingle();
                    if (already?.id) {
                        await admin.from('lessons').update(lessonRow).eq('id', already.id);
                        confirmLessonId = already.id as string;
                    } else {
                        const { data: created } = await admin
                            .from('lessons').insert(lessonRow).select('id').single();
                        confirmLessonId = (created?.id as string) ?? null;
                    }
                    confirmSlots = slotIso;
                }
            } catch (lessonErr) {
                console.error('site-lead lesson error:', lessonErr);
            }
        }

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
                // Quatre emails possibles, dans cet ordre de priorité :
                //  1. showcase-booking  → la place est CONFIRMÉE (v20) ;
                //  2. showcase-waitlist → les DATES à venir + un lien par date (v22) ;
                //  3. autre réservation → accusé de réception (David répond) ;
                //  4. inscription simple → « tu es sur la liste ».
                const showcaseHours = showcaseHoursFor(eventDate);
                const subject = isShowcaseBooking
                    ? showcaseConfirmationSubject(eventDate, lang)
                    : isShowcaseWaitlist
                        ? showcaseDatesSubject(upcomingEvents.length, lang)
                        : isBooking
                            ? (lang === 'en' ? 'David Lesage — your request is received ✨' : 'David Lesage — ta demande est bien reçue ✨')
                            : (lang === 'en' ? 'Handpan Studio — you are on the list ✨' : 'Handpan Studio — tu es sur la liste ✨');
                const html = isShowcaseBooking
                    ? showcaseConfirmationHtml({
                        firstName,
                        lang,
                        eventDate,
                        startTime: eventStart ?? showcaseHours.start,
                        endTime: eventEnd ?? showcaseHours.end,
                        peopleCount,
                        priceGrid,
                    })
                    : isShowcaseWaitlist
                        ? showcaseDatesHtml({ firstName, lang, events: upcomingEvents })
                        : isBooking
                            ? bookingHtml(firstName, lang, source, eventDate, message, sessionType, preferredSlots, sessionFormat, instruments, neotoneModel)
                            : confirmationHtml(firstName, lang, wantsShowcase);

                await client.send({
                    from,
                    to: email,
                    subject: mailSubject(subject),
                    mimeContent: [htmlPart(html)],
                });
                emailSent = true;
                // La place étant confirmée par cet email même, la ligne passe en
                // `confirmed` : le panneau admin « 🎤 Showcase » n'a plus rien à
                // renvoyer, il ne fait que constater. (`status` n'est touché que
                // pour un showcase — on ne change rien aux autres parcours.)
                await admin
                    .from('site_leads')
                    .update({
                        confirm_sent_at: new Date().toISOString(),
                        ...(isShowcaseBooking ? { status: 'confirmed' } : {}),
                    })
                    .eq('id', leadId);
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
                        subject: mailSubject((
                            isBooking ? `[Site] ${sourceLabel(source, 'fr')} — ${firstName} ${lastName}`
                            : isMaker ? `[Fabricant] ${firstName} ${lastName}${makerCountry ? ` — ${makerCountry}` : ''}`
                            : `[Bêta] Candidature — ${firstName} ${lastName}`
                        ).trim()),
                        mimeContent: [htmlPart(adminNotifyHtml({
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
                            // Showcase : ce pour quoi la personne vient (17/08/2026).
                            'Vient pour': showcaseInterests
                                ? showcaseInterests.map((i) => SHOWCASE_INTEREST_LABELS[i] ?? i).join(', ')
                                : null,
                            'Créneaux proposés': preferredSlots?.length
                                ? preferredSlots.map((s) => slotLabel(s, 'fr')).join(' · ')
                                : null,
                            'Date visée': eventDate,
                            // Horaires de la séance de showcase : ils ne sont pas en base
                            // (ils appartiennent à l'événement), d'où le rappel ici.
                            Horaires: isShowcaseBooking && eventStart && eventEnd ? `${eventStart} → ${eventEnd}` : null,
                            Personnes: peopleCount,
                            Message: message,
                            Page: page || null,
                            Langue: lang,
                            // Trace du consentement, visible sans ouvrir la base.
                            'Conditions générales': termsAcceptedAt
                                ? `acceptées le ${termsAcceptedAt.slice(0, 10)} (version ${TERMS_VERSION})`
                                : '⚠️ non acceptées',
                            // Savoir tout de suite si on a le droit de réécrire
                            // à cette personne pour autre chose que sa demande.
                            'Recevoir les nouveautés': newsOptInAt
                                ? `oui — accord donné le ${newsOptInAt.slice(0, 10)}`
                                : 'non (case facultative laissée décochée)',
                        }, await slotConfirmBlockHtml(confirmLessonId, confirmSlots)))],
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
