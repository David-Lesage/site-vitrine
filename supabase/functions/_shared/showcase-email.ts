// =============================================================================
// EMAIL DE CONFIRMATION D'UN SHOWCASE — SOURCE UNIQUE DU TEXTE
//
// ⚠️ CE FICHIER EST LA SOURCE DE VÉRITÉ. Il est LU par deux Edge Functions :
//   • `site-lead` (dépôt site-vitrine) — envoi AUTOMATIQUE au moment où la
//     personne réserve sa place depuis /showroom#agenda ;
//   • `confirm-showcase` (dépôt de l'app) — RENVOI MANUEL depuis le panneau
//     admin « 🎤 Showcase ». Une copie de ce fichier vit là-bas dans
//     `supabase/functions/_shared/showcase-email.ts` : les deux doivent rester
//     IDENTIQUES (copier depuis ici, jamais l'inverse).
//
// Pourquoi une copie et pas un import : deux dépôts git distincts, chacun
// déployant ses propres fonctions avec son propre `_shared/`. Deno ne peut pas
// importer à travers les deux.
//
// 🚫 TEXTES DE DAVID — NE PAS REFORMULER. Le déroulé (« Au programme d'une
// session »), les consignes d'accès, la note « enfants », la ponctualité et le
// bloc « rendez-vous individuel » sont ses mots, validés tels quels (16/08/2026).
// Toute réécriture doit venir de lui.
//
// 💶 TARIFS : jamais écrits en dur ici. La grille (« 1h · 50 € — 1h30 · 70 € »)
// est CALCULÉE côté site par `priceGrid()` (src/lib/sessions.ts, alimenté par
// `sessionTypes` de src/data/site.ts) et transmise dans la requête. Une Edge
// Function ne peut pas importer le code du site : `FALLBACK_PRICE_GRID` n'est
// qu'un filet si la valeur n'arrive pas (page en cache d'avant ce changement).
// =============================================================================

/** Repli si le site n'envoie pas sa grille. ⚠ Doit refléter `sessionTypes`. */
export const FALLBACK_PRICE_GRID = '1h · 50 € — 1h30 · 70 €';

const SITE = 'https://lesagedavid.fr';

/** Le lieu — le code du portail n'apparaît QUE dans cet email, jamais sur le site. */
export const VENUE = {
    name: 'Le Nid',
    address: '29 rue des Orteaux, 75020 Paris',
    gateCode: 'AB0569',
    phone: '06 10 73 31 52',
    metro: 'Alexandre Dumas / Buzenval / Maraîchers',
};

/**
 * HORAIRES PAR DATE — recopiés de `src/data/site.ts` (`agendaEvents`) du site
 * vitrine. Sert de repli : l'horaire réel est envoyé par le formulaire
 * (`eventStart` / `eventEnd`), lui-même issu de cette même source côté site.
 * Compléter quand de nouvelles dates sont ouvertes.
 */
export const EVENT_HOURS: Record<string, { start: string; end: string }> = {
    '2026-08-23': { start: '16:00', end: '19:00' },
    '2026-09-19': { start: '16:00', end: '19:00' },
    '2026-10-18': { start: '16:00', end: '19:00' },
    '2026-11-14': { start: '16:00', end: '19:00' },
    '2026-12-05': { start: '15:00', end: '18:00' },
};
const FALLBACK_HOURS = { start: '16:00', end: '19:00' };

export function hoursFor(eventDate: string | null): { start: string; end: string } {
    return (eventDate && EVENT_HOURS[eventDate]) || FALLBACK_HOURS;
}

function esc(s: string): string {
    return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
}

function longDate(iso: string | null, lang: string): string | null {
    if (!iso) return null;
    try {
        return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'fr-FR', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        }).format(new Date(iso + 'T12:00:00'));
    } catch {
        return iso;
    }
}

export interface ShowcaseEmailOptions {
    firstName: string;
    lang: string;
    /** « AAAA-MM-JJ » de la séance réservée. */
    eventDate: string | null;
    startTime: string;
    endTime: string;
    peopleCount: number | null;
    /** Grille tarifaire du rendez-vous individuel, calculée par le site. */
    priceGrid: string;
}

const btn = (href: string, label: string, primary = true) =>
    `<a href="${href}" style="display:inline-block;background:${primary ? '#b4462a' : '#ffffff'};color:${primary ? '#ffffff' : '#b4462a'};border:1px solid #b4462a;text-decoration:none;font-weight:600;font-size:15px;padding:13px 26px;border-radius:999px;">${label}</a>`;

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

/** Objet de l'email. À passer OBLIGATOIREMENT par `mailSubject()` avant envoi. */
export function showcaseConfirmationSubject(eventDate: string | null, lang: string): string {
    const d = longDate(eventDate, lang);
    if (lang === 'en') {
        return d ? `Your showcase spot is confirmed — ${d} ✨` : 'Your showcase spot is confirmed ✨';
    }
    return d ? `Ta place au showcase est confirmée — ${d} ✨` : 'Ta place au showcase est confirmée ✨';
}

export function showcaseConfirmationHtml(o: ShowcaseEmailOptions): string {
    const en = o.lang === 'en';
    const base = en ? `${SITE}/en` : SITE;
    const hi = o.firstName ? `${en ? 'Hi' : 'Bonjour'} ${esc(o.firstName)},` : (en ? 'Hi,' : 'Bonjour,');
    const dateLabel = longDate(o.eventDate, o.lang);
    const grid = esc(o.priceGrid || FALLBACK_PRICE_GRID);
    // Lien PROFOND vers le formulaire de rendez-vous individuel : `?rdv=prive`
    // ouvre directement la modale (voir BookingForm.astro), `#agenda` garantit
    // qu'on atterrit au bon endroit même si le script n'a pas encore chargé.
    const privateHref = `${base}/showroom?rdv=prive#agenda`;

    const t = en ? {
        title: 'It’s confirmed — your spot is booked ✨',
        p1: 'Your spot at the showcase is <strong>confirmed</strong>. Nothing else to do: come as you are, I’m looking forward to having you play.',
        freeBadge: 'Free showcase, booking required — <strong>you owe nothing</strong>, there is nothing to pay.',
        whenTitle: 'When',
        dateRow: 'Date',
        hoursRow: 'Times',
        peopleRow: 'People',
        durationNote: 'Plan for about <strong>2h</strong> for the session itself.',
        punctualTitle: 'Please be on time',
        punctual1: 'The session <strong>starts with a presentation</strong>. Someone arriving late is disruptive: they are missing information, and the whole group has to be brought back up to speed.',
        punctual2: 'If you arrive early, you can <strong>wait downstairs in the courtyard</strong> — no problem at all.',
        programTitle: 'What happens during a session',
        programIntro: 'Each session lasts about <strong>2h</strong>: a time for listening, for demonstration and for exchange — then the moment when it’s your turn to play.',
        program: [
            ['The Neotone live', 'I play in front of you: the raw sound, then with effects (octaver, reverb, looper) and with singing — the interface projected on the screen.'],
            ['Handpan Compagnon, the app that makes music visible', 'Live demonstration: the colours, the chord constellations, and how you learn by seeing music rather than deciphering sheet music.'],
            ['The acoustic sound &amp; the microphones', 'My two Yishama acoustic handpans, amplified by the Hisong and Muling microphones — to compare and hear the difference.'],
            ['Your questions', 'An open time for exchange: I answer everyone, from the curious beginner to the seasoned musician.'],
            ['Your turn to play', 'Try both Neotone — one on a speaker, one on headphones — and my two Yishama acoustic handpans. Take the time to feel each instrument.'],
        ],
        accessTitle: 'Getting in',
        access: [
            'The gate code is <strong>AB0569</strong>',
            'At the back of the courtyard, green door, then <strong>3rd floor</strong>',
            'Le Nid is a “Temple” — <strong>shoes off before coming in</strong>',
            'Phone on <strong>silent / airplane mode</strong>',
        ],
        accessFoot: `Metro ${VENUE.metro}. Trouble getting in? Call me on ${VENUE.phone}.`,
        codeLabel: 'Gate code',
        codeNote: 'Please keep this code to yourself: it is a shared living space.',
        kidsTitle: 'If you come with children',
        kids: 'Children are welcome, under their parents’ responsibility. The demonstration, talk and question-and-answer part can be a little long for the youngest: if needed, plan a quiet activity, or another adult to take over.',
        upTitle: 'Can’t make it — or would you rather have a moment just for you?',
        up1: 'Book an individual appointment with me, at another time that suits you.',
        up2: 'You choose what we do with it: discover and try any instrument from the shop (Neotone, acoustic handpans, Gonilélé, calabash…), test a handpan microphone (Hisong, Muling set), or simply be guided one-to-one — whether you are a complete beginner, still looking for what suits you, or want to dig into one specific point. Whether you take 1h or 1h30, just tell me what brings you: I prepare everything for you.',
        upPriceLabel: 'Price',
        upPriceNote: 'One single price, whatever you are coming for.',
        upCancel: 'Cancellation less than 24 h beforehand: the payment stays with me — that slot was reserved for you — but the appointment can be rescheduled within 3 months.',
        upCta: 'Book an individual appointment',
        upDistinct: 'This is a <strong>separate, paid</strong> appointment. It changes nothing about the showcase you have just booked, which stays <strong>free</strong>.',
        sign: 'See you very soon,<br />David Lesage',
        foot: 'You are receiving this email because you booked a spot at a free showcase at Le Nid.',
    } : {
        title: 'C’est confirmé — ta place est réservée ✨',
        p1: 'Ta place au showcase est <strong>confirmée</strong>. Rien d’autre à faire : viens comme tu es, j’ai hâte de t’entendre jouer.',
        freeBadge: 'Showcase gratuit, sur réservation — <strong>tu ne dois rien</strong>, il n’y a rien à régler.',
        whenTitle: 'Quand',
        dateRow: 'Date',
        hoursRow: 'Horaires',
        peopleRow: 'Personnes',
        durationNote: 'Compte environ <strong>2h</strong> pour la session elle-même.',
        punctualTitle: 'Merci d’arriver à l’heure',
        punctual1: 'La session <strong>commence par une présentation</strong>. Une personne qui arrive en retard perturbe : il leur manque des infos, il faut réajuster tout le groupe.',
        punctual2: 'Si tu arrives en avance, tu peux <strong>attendre en bas dans la cour</strong> — aucun souci.',
        programTitle: 'Au programme d’une session',
        programIntro: 'Chaque session dure environ <strong>2h</strong> : un temps d’écoute, de démonstration et d’échange — puis le moment où c’est toi qui joues.',
        program: [
            ['Le Neotone en live', 'Je joue devant vous : le son brut, puis avec effets (octaver, réverbe, looper) et au chant — l’interface projetée à l’écran.'],
            ['Handpan Compagnon, l’app qui rend la musique visible', 'Démonstration en direct : les couleurs, les constellations d’accords, et comment on apprend en voyant la musique plutôt qu’en déchiffrant des partitions.'],
            ['Le son acoustique &amp; les micros', 'Mes deux handpans acoustiques Yishama, sonorisés par les micros Hisong et Muling — pour comparer et entendre la différence.'],
            ['Vos questions', 'Un temps d’échange ouvert : je réponds à tout le monde, du curieux débutant au musicien confirmé.'],
            ['À votre tour de jouer', 'Essayez les deux Neotone — l’un sur enceinte, l’autre au casque — et mes deux handpans acoustiques Yishama. Prenez le temps de ressentir chaque instrument.'],
        ],
        accessTitle: 'Pour entrer',
        access: [
            'Le code du portail = <strong>AB0569</strong>',
            'Au fond de la cour, porte verte, puis <strong>3e étage</strong>',
            'Le Nid est un « Temple » — <strong>on se déchausse avant d’entrer</strong>',
            'Portable en mode <strong>silencieux / avion</strong>',
        ],
        accessFoot: `Métro ${VENUE.metro}. Un souci pour entrer ? Appelle-moi au ${VENUE.phone}.`,
        codeLabel: 'Code du portail',
        codeNote: 'Merci de garder ce code pour toi : c’est un lieu de vie partagé.',
        kidsTitle: 'Si tu viens avec des enfants',
        kids: 'Enfants bienvenus, sous la responsabilité de leurs parents. L’aspect démonstration, conférence et questions-réponses peut être un peu long pour les plus jeunes : prévoyez si besoin une activité calme, ou le relais d’un autre adulte.',
        upTitle: 'Tu ne peux pas venir — ou tu préfères un moment rien que pour toi ?',
        up1: 'Réserve un rendez-vous individuel avec moi, à un autre moment qui te convient.',
        up2: 'Tu choisis ce qu’on en fait : découvrir et essayer n’importe quel instrument de la boutique (Neotone, handpans acoustiques, Gonilélé, calebasse…), tester un micro pour handpan (Hisong, set Muling), ou simplement être accompagné·e en tête-à-tête — que tu débutes complètement, que tu cherches encore ce qui te correspond, ou que tu veuilles creuser un point précis. Que tu prennes 1h ou 1h30, dis-moi juste ce qui t’amène : je prépare tout pour toi.',
        upPriceLabel: 'Tarif',
        upPriceNote: 'Un seul tarif, quel que soit ce pour quoi tu viens.',
        upCancel: 'Annulation à moins de 24 h : le règlement reste acquis — ce créneau t’était réservé — mais le rendez-vous est reportable dans les 3 mois.',
        upCta: 'Réserver un rendez-vous individuel',
        upDistinct: 'C’est un rendez-vous <strong>séparé et payant</strong>. Ça ne change rien au showcase que tu viens de réserver, qui reste <strong>gratuit</strong>.',
        sign: 'À très vite,<br />David Lesage',
        foot: 'Tu reçois cet email parce que tu as réservé une place à un showcase gratuit au Nid.',
    };

    const row = (k: string, v: string) =>
        `<tr><td style="padding:5px 0;color:#6b7280;font-size:13px;width:110px;vertical-align:top;">${k}</td><td style="padding:5px 0;color:#111827;font-size:15px;font-weight:600;">${v}</td></tr>`;

    const programList = t.program
        .map(([title, text], i) => `
            <tr>
              <td width="34" valign="top" style="padding:7px 10px 7px 0;">
                <div style="width:26px;height:26px;border-radius:999px;background:#b4462a;color:#ffffff;font-size:13px;font-weight:700;line-height:26px;text-align:center;">${i + 1}</div>
              </td>
              <td style="padding:7px 0;color:#374151;font-size:14px;line-height:1.6;">
                <strong style="color:#111827;">${title}</strong> — ${text}
              </td>
            </tr>`)
        .join('');

    return shell(o.lang, `
        <tr><td style="padding:28px 28px 4px;">
          <div style="font-size:21px;font-weight:700;color:#111827;">${t.title}</div>
          <p style="margin:14px 0 0;color:#374151;font-size:15px;line-height:1.6;">${hi}</p>
          <p style="margin:12px 0 0;color:#374151;font-size:15px;line-height:1.6;">${t.p1}</p>
          <p style="margin:14px 0 0;padding:10px 12px;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:10px;color:#065f46;font-size:14px;line-height:1.6;">✅ ${t.freeBadge}</p>
        </td></tr>

        <tr><td style="padding:22px 28px 4px;border-top:1px solid #f0f1f3;">
          <h2 style="margin:0 0 10px;font-size:17px;color:#111827;">${t.whenTitle}</h2>
          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
            ${dateLabel ? row(t.dateRow, `<span style="text-transform:capitalize;">${esc(dateLabel)}</span>`) : ''}
            ${row(t.hoursRow, `${en ? 'from' : 'de'} ${esc(o.startTime)} ${en ? 'to' : 'à'} ${esc(o.endTime)}`)}
            ${o.peopleCount && o.peopleCount > 1 ? row(t.peopleRow, String(o.peopleCount)) : ''}
          </table>
          <p style="margin:10px 0 0;color:#6b7280;font-size:13px;line-height:1.6;">${t.durationNote}</p>
        </td></tr>

        <tr><td style="padding:22px 28px 4px;border-top:1px solid #f0f1f3;">
          <h2 style="margin:0 0 10px;font-size:17px;color:#111827;">⏱ ${t.punctualTitle}</h2>
          <p style="margin:0;color:#374151;font-size:14px;line-height:1.7;">${t.punctual1}</p>
          <p style="margin:8px 0 0;color:#374151;font-size:14px;line-height:1.7;">${t.punctual2}</p>
        </td></tr>

        <tr><td style="padding:22px 28px 4px;border-top:1px solid #f0f1f3;">
          <h2 style="margin:0 0 6px;font-size:17px;color:#111827;">${t.programTitle}</h2>
          <p style="margin:0 0 10px;color:#374151;font-size:14px;line-height:1.7;">${t.programIntro}</p>
          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">${programList}</table>
        </td></tr>

        <tr><td style="padding:22px 28px 4px;border-top:1px solid #f0f1f3;">
          <h2 style="margin:0 0 10px;font-size:17px;color:#111827;">${t.accessTitle}</h2>
          <p style="margin:0 0 10px;color:#374151;font-size:15px;line-height:1.6;">
            <strong>${esc(VENUE.name)}</strong> — ${esc(VENUE.address)}
          </p>
          <ol style="margin:0;padding-left:20px;color:#374151;font-size:14px;line-height:1.8;">
            ${t.access.map((a) => `<li>${a}</li>`).join('')}
          </ol>
          <div style="margin-top:12px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:12px 14px;">
            <div style="color:#6b7280;font-size:13px;">${t.codeLabel}</div>
            <div style="color:#111827;font-size:22px;font-weight:700;letter-spacing:2px;">${esc(VENUE.gateCode)}</div>
            <div style="color:#9ca3af;font-size:12px;margin-top:6px;">${t.codeNote}</div>
          </div>
          <p style="margin:12px 0 0;color:#6b7280;font-size:13px;line-height:1.6;">${esc(t.accessFoot)}</p>
        </td></tr>

        <tr><td style="padding:22px 28px 4px;border-top:1px solid #f0f1f3;">
          <h2 style="margin:0 0 10px;font-size:17px;color:#111827;">${t.kidsTitle}</h2>
          <p style="margin:0;color:#374151;font-size:14px;line-height:1.7;">${t.kids}</p>
        </td></tr>

        <tr><td style="padding:22px 28px 8px;border-top:1px solid #f0f1f3;">
          <div style="padding:16px 18px;background:#faf5ef;border:1px solid #e7d9c6;border-radius:12px;">
            <div style="font-size:16px;font-weight:700;color:#111827;">${t.upTitle}</div>
            <p style="margin:8px 0 0;color:#374151;font-size:14px;line-height:1.7;">${t.up1}</p>
            <p style="margin:10px 0 0;color:#374151;font-size:14px;line-height:1.7;">${t.up2}</p>
            <div style="margin-top:14px;padding:12px 14px;background:#ffffff;border:1px solid #e7d9c6;border-radius:10px;">
              <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6b7280;">${t.upPriceLabel}</div>
              <div style="margin-top:4px;color:#b4462a;font-size:18px;font-weight:700;">${grid}</div>
              <div style="margin-top:4px;color:#374151;font-size:13px;line-height:1.6;">${t.upPriceNote}</div>
              <div style="margin-top:8px;color:#6b7280;font-size:13px;line-height:1.6;">${t.upCancel}</div>
            </div>
            <div style="margin-top:16px;">${btn(privateHref, t.upCta)}</div>
            <p style="margin:12px 0 0;color:#6b7280;font-size:12px;line-height:1.6;">${t.upDistinct}</p>
          </div>
        </td></tr>

        <tr><td style="padding:20px 28px 28px;border-top:1px solid #f0f1f3;">
          <p style="margin:0;color:#6b7280;font-size:14px;line-height:1.6;">${t.sign}</p>
          <p style="margin:12px 0 0;color:#b6bcc4;font-size:11px;line-height:1.5;">${t.foot}</p>
        </td></tr>
`);
}
