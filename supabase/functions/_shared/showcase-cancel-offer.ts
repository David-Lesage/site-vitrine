// =============================================================================
// E-MAIL D'ANNULATION D'UN SHOWCASE + AGENDA PARTAGÉ — source unique (14/11/2026)
//
// ⚠️ FICHIER EN DEUX EXEMPLAIRES IDENTIQUES — MODIFIER AUX DEUX ENDROITS :
//   • site-vitrine : supabase/functions/_shared/showcase-cancel-offer.ts
//     (SOURCE DE VÉRITÉ — EF `showcase-attendance` : la personne annule elle-même)
//   • app          : supabase/functions/_shared/showcase-cancel-offer.ts
//     (EF `confirm-showcase`, action `cancel_offer` : David l'envoie depuis la console)
// Même raison que `showcase-email.ts` : deux dépôts, deux `_shared/`, Deno ne peut
// pas importer de l'un à l'autre. Copier depuis le site, jamais l'inverse.
//
// Demande de David (14/11/2026) : « Quand une personne annule sa venue à un
// showcase, il faudrait qu'elle puisse reporter sa venue à une autre date, ou au
// moins qu'elle reçoive un mail avec la confirmation de son annulation et une
// proposition de report de date pour l'inciter à revenir, ou à prendre un rdv
// privé si la personne souhaite un rdv payant sur mesure. » — Variante B choisie :
// chaque bouton « Je viens le … » ouvre la page « Ma venue » avec la date déjà
// choisie ; la personne confirme d'un clic (pas de report fantôme par un robot).
//
// 🚫 TEXTES :
//   • confirmation d'annulation, « tu seras toujours le·la bienvenu·e », signature :
//     ceux de l'accusé du 21/09 (`A` dans showcase-attendance.ts), repris tels quels ;
//   • bloc « rendez-vous individuel » (FR/EN) : MOT POUR MOT celui de l'e-mail de
//     confirmation (`up*` dans showcase-email.ts, mots de David du 16/08 + 13/11).
//     Seule entorse : `upDistinct` est coupé après sa 1re phrase (la 2e parle de
//     « la rencontre que tu viens de réserver », faux ici). ES/DE = traductions
//     À RELIRE. Si David change un mot dans showcase-email.ts → le changer ici.
//   • « Je viens le … », l'aide sous les dates et la phrase « pas de date » : NOUVEAUX
//     (14/11), à relire par David. DE entier : à relire.
// 💶 Tarif : `FALLBACK_PRICE_GRID` de showcase-email.ts (aucun tarif inventé ici).
//
// 📅 AGENDA : les dates viennent de `public.app_public_config`, clé
// 'showcase_agenda' (tableau `{date,start,end}`, lisible par tous), avec repli sur
// `EVENT_HOURS` (showcase-email.ts) si la lecture échoue ou si la forme est
// inattendue. L'heure de FIN affichée = début + 2h (`officialEnd`, décision de David
// du 13/11) : le champ `end` de la config est ignoré, comme partout ailleurs.
// =============================================================================
import { EVENT_HOURS, FALLBACK_PRICE_GRID, officialEnd } from './showcase-email.ts';

const SITE = 'https://www.lesagedavid.fr';
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// ---- Agenda partagé -----------------------------------------------------------
export type ShowcaseAgenda = Record<string, { start: string; end: string }>;
export interface UpcomingShowcase { date: string; start: string; end: string }

/**
 * jsonb de la config → agenda, ou null si la forme est inattendue (on préfère
 * alors le repli à des dates fausses). Accepte `[{date,start,end}]` ou `{events:[…]}`
 * (même tolérance que `parseAgenda` du panneau admin de l'app).
 */
export function parseShowcaseAgenda(value: unknown): ShowcaseAgenda | null {
    const raw = Array.isArray(value)
        ? value
        : value && typeof value === 'object' && Array.isArray((value as { events?: unknown }).events)
            ? (value as { events: unknown[] }).events
            : null;
    if (!raw) return null;
    const out: ShowcaseAgenda = {};
    for (const item of raw) {
        if (!item || typeof item !== 'object') return null;
        const e = item as Record<string, unknown>;
        const date = String(e.date ?? '').trim();
        if (!ISO_DATE.test(date)) return null;
        const time = (v: unknown) => {
            const s = String(v ?? '').trim();
            return /^\d{1,2}:\d{2}$/.test(s) ? s : '';
        };
        out[date] = { start: time(e.start), end: time(e.end) };
    }
    return out;
}

/** Ce qu'il faut d'un client supabase-js pour lire la config (lecture seule). */
// deno-lint-ignore no-explicit-any
export interface ConfigReader { from(table: string): any }

/**
 * Lit l'agenda partagé. Jamais de throw : en cas d'échec → `EVENT_HOURS`.
 * Un tableau VIDE en config est respecté (= « aucune date ouverte »).
 */
export async function loadShowcaseAgenda(client: ConfigReader): Promise<{ agenda: ShowcaseAgenda; fromConfig: boolean }> {
    try {
        const { data, error } = await client.from('app_public_config').select('value')
            .eq('key', 'showcase_agenda').maybeSingle();
        if (error) throw error;
        const parsed = parseShowcaseAgenda(data?.value);
        if (parsed) return { agenda: parsed, fromConfig: true };
        console.warn('showcase_agenda absente ou illisible : repli sur EVENT_HOURS');
    } catch (e) {
        console.warn('Lecture de showcase_agenda impossible : repli sur EVENT_HOURS', e);
    }
    return { agenda: EVENT_HOURS, fromConfig: false };
}

/** Date du jour à Paris (AAAA-MM-JJ). */
export function parisToday(d = new Date()): string {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit',
    }).format(d);
}

/** Horaires d'une date : début de l'agenda (repli EVENT_HOURS, puis 16:00), fin = début + 2h. */
export function agendaHours(agenda: ShowcaseAgenda, date: string | null): { start: string; end: string } {
    const start = (date && (agenda[date]?.start || EVENT_HOURS[date]?.start)) || '16:00';
    return { start, end: officialEnd(start) };
}

/** Showcases STRICTEMENT après aujourd'hui (Paris), triés. */
export function futureDatesIn(agenda: ShowcaseAgenda, today = parisToday()): string[] {
    return Object.keys(agenda).filter((d) => ISO_DATE.test(d) && d > today).sort();
}

/** Les mêmes, avec leurs horaires. */
export function upcomingIn(agenda: ShowcaseAgenda, today = parisToday()): UpcomingShowcase[] {
    return futureDatesIn(agenda, today).map((date) => ({ date, ...agendaHours(agenda, date) }));
}

// ---- Langues & liens --------------------------------------------------------------
export type CancelLang = 'fr' | 'en' | 'es' | 'de';
export function cancelLangOf(raw: unknown): CancelLang {
    const s = String(raw ?? 'fr').toLowerCase();
    return s.startsWith('en') ? 'en' : s.startsWith('es') ? 'es' : s.startsWith('de') ? 'de' : 'fr';
}
const prefixOf = (lang: CancelLang) => (lang === 'fr' ? '' : `/${lang}`);

/**
 * Page « Ma venue » de la personne (même forme que `venuePageUrl` du rappel J-1),
 * avec la date présélectionnée si `date` est fournie (variante B).
 */
export function venueDateUrl(token: string, lang: CancelLang, date?: string): string {
    const base = `${SITE}${prefixOf(lang)}/showcase/ma-venue?t=${encodeURIComponent(token)}`;
    return date && ISO_DATE.test(date) ? `${base}&date=${date}` : base;
}

function esc(s: unknown): string {
    return String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
}
/** Majuscule initiale seulement (« Samedi 5 décembre », pas « Samedi 5 Décembre »). */
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const LOCALE: Record<CancelLang, string> = { fr: 'fr-FR', en: 'en-GB', es: 'es-ES', de: 'de-DE' };
function fmtDate(iso: string, lang: CancelLang, withYear: boolean): string {
    try {
        return new Intl.DateTimeFormat(LOCALE[lang], {
            weekday: 'long', day: 'numeric', month: 'long', ...(withYear ? { year: 'numeric' } : {}),
        }).format(new Date(iso + 'T12:00:00'));
    } catch { return iso; }
}

// ---- Textes -----------------------------------------------------------------------
const T = {
    fr: {
        subject: 'C’est noté : ta venue est annulée',
        hi: (n: string) => (n ? `Bonjour ${esc(n)},` : 'Bonjour,'),
        cancel: (d: string) => `C’est bien noté : tu ne viendras pas à la rencontre du <strong>${esc(d)}</strong>. Merci de m’avoir prévenu, ça permet de libérer ta place.`,
        after: 'Si tu veux venir à une autre date, tu seras toujours le·la bienvenu·e :',
        hours: (a: string, b: string) => `de ${esc(a)} à ${esc(b)}, au Nid`,
        come: (d: string) => `Je viens le ${esc(d)}`,
        comeHint: 'Un clic t’amène sur ta page « Ma venue » : tu confirmes, et ta place est réservée.',
        noDates: 'Les prochaines dates sont en cours de calage. Je te préviens dès la prochaine date :',
        waitCta: 'Me prévenir de la prochaine date',
        upTitle: 'Tu ne peux pas venir — ou tu préfères un moment rien que pour toi ?',
        up1: 'Réserve un rendez-vous individuel avec moi, à un autre moment qui te convient.',
        up2: 'Tu choisis ce qu’on en fait : découvrir et essayer n’importe quel instrument de la boutique (Neotone, handpans acoustiques, Gonilélé, calebasse…), tester un micro pour handpan (Hisong, set Muling), ou simplement être accompagné·e en tête-à-tête — que tu débutes complètement, que tu cherches encore ce qui te correspond, ou que tu veuilles creuser un point précis. Que tu prennes 1h ou 1h30, dis-moi juste ce qui t’amène : je prépare tout pour toi.',
        upPriceLabel: 'Tarif',
        upDemoLabel: 'Démo privée · essai d’instruments',
        upPriceNote: '<strong>Cours de musique</strong> : dès 60 € (1h) · dès 75 € (1h30), forfait 4 cours sur 2 mois possible.',
        upCancel: 'Annulation à moins de 24 h : le règlement reste acquis — ce créneau t’était réservé — mais le rendez-vous est reportable dans les 3 mois.',
        upCta: 'Réserver un rendez-vous individuel',
        upDistinct: 'C’est un rendez-vous <strong>séparé et payant</strong>.',
        sign: 'À bientôt,<br />David Lesage',
    },
    en: {
        subject: 'Noted: your visit is cancelled',
        hi: (n: string) => (n ? `Hi ${esc(n)},` : 'Hi,'),
        cancel: (d: string) => `Noted: you won’t be coming to the gathering on <strong>${esc(d)}</strong>. Thank you for letting me know — it frees up your spot.`,
        after: 'If you’d like to come another time, you’re always welcome:',
        hours: (a: string, b: string) => `from ${esc(a)} to ${esc(b)}, at Le Nid`,
        come: (d: string) => `I’ll come on ${esc(d)}`,
        comeHint: 'One click takes you to your “My visit” page: confirm, and your spot is booked.',
        noDates: 'The next dates are being finalised. I’ll let you know as soon as the next one is set:',
        waitCta: 'Notify me of the next date',
        upTitle: 'Can’t make it — or would you rather have a moment just for you?',
        up1: 'Book an individual appointment with me, at another time that suits you.',
        up2: 'You choose what we do with it: discover and try any instrument from the shop (Neotone, acoustic handpans, Gonilélé, calabash…), test a handpan microphone (Hisong, Muling set), or simply be guided one-to-one — whether you are a complete beginner, still looking for what suits you, or want to dig into one specific point. Whether you take 1h or 1h30, just tell me what brings you: I prepare everything for you.',
        upPriceLabel: 'Price',
        upDemoLabel: 'Private demo · instrument trial',
        upPriceNote: '<strong>Music lessons</strong>: from €60 (1h) · from €75 (1h30), 4-lesson package over 2 months available.',
        upCancel: 'Cancellation less than 24 h beforehand: the payment stays with me — that slot was reserved for you — but the appointment can be rescheduled within 3 months.',
        upCta: 'Book an individual appointment',
        upDistinct: 'This is a <strong>separate, paid</strong> appointment.',
        sign: 'See you soon,<br />David Lesage',
    },
    es: {
        subject: 'Anotado: tu visita queda cancelada',
        hi: (n: string) => (n ? `Hola ${esc(n)}:` : 'Hola:'),
        cancel: (d: string) => `Anotado: no vendrás al encuentro del <strong>${esc(d)}</strong>. Gracias por avisarme, así tu plaza queda libre.`,
        after: 'Si quieres venir otro día, siempre serás bienvenido·a:',
        hours: (a: string, b: string) => `de ${esc(a)} a ${esc(b)}, en Le Nid`,
        come: (d: string) => `Voy el ${esc(d)}`,
        comeHint: 'Un clic te lleva a tu página «Mi visita»: confirmas y tu plaza queda reservada.',
        noDates: 'Las próximas fechas se están definiendo. Te aviso en cuanto haya una nueva:',
        waitCta: 'Avisarme de la próxima fecha',
        upTitle: '¿No puedes venir… o prefieres un momento solo para ti?',
        up1: 'Reserva una cita individual conmigo, en otro momento que te venga bien.',
        up2: 'Tú eliges qué hacemos: descubrir y probar cualquier instrumento de la tienda (Neotone, handpans acústicos, Gonilélé, calabaza…), probar un micrófono para handpan (Hisong, set Muling) o simplemente que te acompañe cara a cara, tanto si empiezas de cero como si aún buscas lo que te conviene o quieres profundizar en algo concreto. Elijas 1h o 1h30, dime solo qué te trae: lo preparo todo para ti.',
        upPriceLabel: 'Tarifa',
        upDemoLabel: 'Demo privada · prueba de instrumentos',
        upPriceNote: '<strong>Clases de música</strong>: desde 60 € (1h) · desde 75 € (1h30), bono de 4 clases en 2 meses disponible.',
        upCancel: 'Cancelación con menos de 24 h de antelación: el pago se mantiene (ese horario estaba reservado para ti), pero la cita se puede aplazar dentro de los 3 meses.',
        upCta: 'Reservar una cita individual',
        upDistinct: 'Es una cita <strong>aparte y de pago</strong>.',
        sign: 'Hasta pronto,<br />David Lesage',
    },
    de: {
        subject: 'Notiert: Dein Besuch ist abgesagt',
        hi: (n: string) => (n ? `Hallo ${esc(n)},` : 'Hallo,'),
        cancel: (d: string) => `Notiert: Du kommst nicht zum Treffen am <strong>${esc(d)}</strong>. Danke, dass du mir Bescheid gesagt hast, so wird dein Platz frei.`,
        after: 'Wenn du an einem anderen Tag kommen möchtest, bist du jederzeit willkommen:',
        hours: (a: string, b: string) => `von ${esc(a)} bis ${esc(b)} Uhr, im Le Nid`,
        come: (d: string) => `Ich komme am ${esc(d)}`,
        comeHint: 'Ein Klick führt dich zu deiner Seite „Mein Besuch“: bestätigen, und dein Platz ist reserviert.',
        noDates: 'Die nächsten Termine werden gerade festgelegt. Ich sage dir Bescheid, sobald der nächste feststeht:',
        waitCta: 'Über den nächsten Termin informieren',
        upTitle: 'Du kannst nicht kommen – oder hättest du lieber einen Moment nur für dich?',
        up1: 'Buch einen Einzeltermin bei mir, zu einem anderen Zeitpunkt, der dir passt.',
        up2: 'Du entscheidest, was wir daraus machen: jedes Instrument aus dem Shop entdecken und ausprobieren (Neotone, akustische Handpans, Gonilélé, Kalebasse …), ein Handpan-Mikrofon testen (Hisong, Muling-Set) oder dich einfach persönlich begleiten lassen – ob du ganz am Anfang stehst, noch suchst, was zu dir passt, oder einen bestimmten Punkt vertiefen möchtest. Ob 1 Std. oder 1 Std. 30: Sag mir einfach, was dich herführt, ich bereite alles für dich vor.',
        upPriceLabel: 'Preis',
        upDemoLabel: 'Private Demo · Instrumente ausprobieren',
        upPriceNote: '<strong>Musikunterricht</strong>: ab 60 € (1 Std.) · ab 75 € (1 Std. 30), Paket mit 4 Stunden über 2 Monate möglich.',
        upCancel: 'Absage weniger als 24 Std. vorher: Die Zahlung bleibt bestehen – dieser Termin war für dich reserviert –, aber er kann innerhalb von 3 Monaten verschoben werden.',
        upCta: 'Einzeltermin buchen',
        upDistinct: 'Das ist ein <strong>separater, kostenpflichtiger</strong> Termin.',
        sign: 'Bis bald,<br />David Lesage',
    },
};

// ---- Gabarit ----------------------------------------------------------------------
const P = 'margin:12px 0 0;color:#374151;font-size:15px;line-height:1.6;';
const btn = (href: string, label: string, primary = true) =>
    `<a href="${esc(href)}" style="display:inline-block;background:${primary ? '#b4462a' : '#ffffff'};color:${primary ? '#ffffff' : '#b4462a'};border:1px solid #b4462a;text-decoration:none;font-weight:600;font-size:15px;padding:12px 22px;border-radius:999px;">${label}</a>`;

function shell(lang: CancelLang, inner: string): string {
    return `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
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

export interface CancelOfferOptions {
    lang: CancelLang;
    firstName: string;
    /** Date annulée (AAAA-MM-JJ). */
    oldDate: string;
    /** `site_leads.attendance_token` — sans jeton valide, pas de bouton « Je viens le … ». */
    token: string | null | undefined;
    /** Prochaines dates (déjà filtrées : futures, ≠ oldDate). Seules les 3 premières sont montrées. */
    upcoming: UpcomingShowcase[];
    /** Grille du rendez-vous individuel ; repli `FALLBACK_PRICE_GRID`. */
    priceGrid?: string | null;
}

/** Nombre maximum de dates proposées dans l'e-mail. */
export const CANCEL_OFFER_MAX_DATES = 3;

export function cancelOfferMail(o: CancelOfferOptions): { subject: string; html: string; dates: string[] } {
    const t = T[o.lang] ?? T.fr;
    const lang: CancelLang = T[o.lang] ? o.lang : 'fr';
    const token = String(o.token ?? '').trim();
    const hasToken = UUID.test(token);
    const dates = o.upcoming.filter((u) => u.date !== o.oldDate).slice(0, CANCEL_OFFER_MAX_DATES);
    const grid = esc(o.priceGrid || FALLBACK_PRICE_GRID);
    const agendaHref = `${SITE}${prefixOf(lang)}/showroom#agenda`;
    const privateHref = `${SITE}${prefixOf(lang)}/showroom?rdv=prive#agenda`;
    // Liste d'attente : lien profond `?alerte=dates` → ouvre le formulaire
    // « showcase-waitlist » déjà présent sur /showroom (BookingForm.astro).
    const waitHref = `${SITE}${prefixOf(lang)}/showroom?alerte=dates#agenda`;

    const dateCards = dates.map((u) => {
        const href = hasToken ? venueDateUrl(token, lang, u.date) : agendaHref;
        return `
          <tr><td style="padding:6px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf5ef;border:1px solid #e7d9c6;border-radius:12px;">
              <tr><td style="padding:14px 16px;">
                <div style="color:#111827;font-size:16px;font-weight:700;">${esc(cap(fmtDate(u.date, lang, true)))}</div>
                <div style="margin-top:2px;color:#6b7280;font-size:14px;">${t.hours(u.start, u.end)}</div>
                <div style="margin-top:12px;">${btn(href, t.come(fmtDate(u.date, lang, false)))}</div>
              </td></tr>
            </table>
          </td></tr>`;
    }).join('');

    const datesBlock = dates.length
        ? `<p style="${P}">${t.after}</p>
           <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;">${dateCards}</table>
           ${hasToken ? `<p style="margin:8px 0 0;color:#6b7280;font-size:13px;line-height:1.6;">${t.comeHint}</p>` : ''}`
        : `<p style="${P}">${t.noDates}</p>
           <div style="margin-top:14px;">${btn(waitHref, t.waitCta)}</div>`;

    const html = shell(lang, `
        <tr><td style="padding:28px 28px 8px;">
          <p style="${P}margin-top:0;">${t.hi(o.firstName)}</p>
          <p style="${P}">${t.cancel(fmtDate(o.oldDate, lang, true))}</p>
          ${datesBlock}
        </td></tr>

        <tr><td style="padding:22px 28px 8px;border-top:1px solid #f0f1f3;">
          <div style="padding:16px 18px;background:#faf5ef;border:1px solid #e7d9c6;border-radius:12px;">
            <div style="font-size:16px;font-weight:700;color:#111827;">${t.upTitle}</div>
            <p style="margin:8px 0 0;color:#374151;font-size:14px;line-height:1.7;">${t.up1}</p>
            <p style="margin:10px 0 0;color:#374151;font-size:14px;line-height:1.7;">${t.up2}</p>
            <div style="margin-top:14px;padding:12px 14px;background:#ffffff;border:1px solid #e7d9c6;border-radius:10px;">
              <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6b7280;">${t.upPriceLabel}</div>
              <div style="margin-top:6px;color:#111827;font-size:14px;font-weight:700;">${t.upDemoLabel}</div>
              <div style="margin-top:2px;color:#b4462a;font-size:18px;font-weight:700;">${grid}</div>
              <div style="margin-top:10px;padding-top:10px;border-top:1px solid #f0e6d8;color:#374151;font-size:14px;line-height:1.6;">${t.upPriceNote}</div>
              <div style="margin-top:8px;color:#6b7280;font-size:13px;line-height:1.6;">${t.upCancel}</div>
            </div>
            <div style="margin-top:16px;">${btn(privateHref, t.upCta, false)}</div>
            <p style="margin:12px 0 0;color:#6b7280;font-size:12px;line-height:1.6;">${t.upDistinct}</p>
          </div>
        </td></tr>

        <tr><td style="padding:20px 28px 28px;border-top:1px solid #f0f1f3;">
          <p style="margin:0;color:#6b7280;font-size:14px;line-height:1.6;">${t.sign}</p>
        </td></tr>`);

    return { subject: t.subject, html, dates: dates.map((d) => d.date) };
}
