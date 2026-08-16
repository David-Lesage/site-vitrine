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
// Révision du 16/08/2026 (soir), demandée par David lui-même :
//   • « viens quand tu veux » voulait dire « à la DATE que tu veux » — sur
//     l'HORAIRE il est ferme, et ça doit être clair. D'où le bloc en tête de la
//     ponctualité : la date se choisit, l'heure de début non.
//   • « 2h de showcase mais avec les discussions ça dure plutôt 3h » : la durée
//     annoncée dit maintenant les deux, pour que les gens calent leur soirée.
//   • invitation à apporter un jus de fruit / un gâteau à partager —
//     FACULTATIF, jamais une condition d'entrée, « dans un esprit de partage ».
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
        durationNote: 'The programme runs about <strong>2h</strong> — in practice it usually stretches closer to <strong>3h</strong>, because the conversations keep going. Plan your evening accordingly.',
        punctualTitle: 'The date is yours to choose — the start time is not',
        punctual0: 'You picked the date that suited you. The <strong>start time, though, is firm</strong>: we begin at {start} sharp.',
        punctual1: 'The session <strong>starts with a presentation</strong>. Someone arriving late is disruptive: they are missing information, and the whole group has to be brought back up to speed.',
        punctual2: 'If you arrive early, you can <strong>wait downstairs in the courtyard</strong> — no problem at all.',
        shareTitle: 'Bring something to share, if you feel like it',
        share: 'A fruit juice, a cake, anything to pass around — <strong>entirely optional</strong>, and never a condition for coming. It is simply in a spirit of sharing: it makes the moment warmer for everyone.',
        programTitle: 'What happens during a session',
        programIntro: 'The programme runs about <strong>2h</strong> — and in practice we usually stay closer to <strong>3h</strong>, carried along by the conversations: a time for listening, for demonstration and for exchange — then the moment when it’s your turn to play.',
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
        durationNote: 'Le programme dure environ <strong>2h</strong> — dans les faits, ça tourne plutôt autour de <strong>3h</strong>, parce que les discussions continuent. Prévois ta soirée en conséquence.',
        punctualTitle: 'La date, tu la choisis — l’heure de début, non',
        punctual0: 'Tu as choisi la date qui t’arrangeait. En revanche, <strong>l’horaire est ferme</strong> : on commence à {start}, à l’heure.',
        punctual1: 'La session <strong>commence par une présentation</strong>. Une personne qui arrive en retard perturbe : il leur manque des infos, il faut réajuster tout le groupe.',
        punctual2: 'Si tu arrives en avance, tu peux <strong>attendre en bas dans la cour</strong> — aucun souci.',
        shareTitle: 'Apporte quelque chose à partager, si le cœur t’en dit',
        share: 'Un jus de fruit, un gâteau, quelque chose à faire passer — <strong>totalement facultatif</strong>, et jamais une condition pour venir. C’est simplement dans un esprit de partage : ça rend le moment plus convivial pour tout le monde.',
        programTitle: 'Au programme d’une session',
        programIntro: 'Le programme dure environ <strong>2h</strong> — et en pratique on reste plutôt <strong>3h</strong>, portés par les échanges : un temps d’écoute, de démonstration et d’échange — puis le moment où c’est toi qui joues.',
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
          <p style="margin:0 0 8px;padding:10px 12px;background:#fef3c7;border:1px solid #fcd34d;border-radius:10px;color:#78350f;font-size:14px;line-height:1.7;">${t.punctual0.replace('{start}', `<strong>${esc(o.startTime)}</strong>`)}</p>
          <p style="margin:0;color:#374151;font-size:14px;line-height:1.7;">${t.punctual1}</p>
          <p style="margin:8px 0 0;color:#374151;font-size:14px;line-height:1.7;">${t.punctual2}</p>
        </td></tr>

        <tr><td style="padding:22px 28px 4px;border-top:1px solid #f0f1f3;">
          <h2 style="margin:0 0 10px;font-size:17px;color:#111827;">🧁 ${t.shareTitle}</h2>
          <p style="margin:0;color:#374151;font-size:14px;line-height:1.7;">${t.share}</p>
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

// =============================================================================
// LISTE D'ATTENTE SHOWCASE — L'EMAIL QUI DONNE DIRECTEMENT LES DATES (16/08/2026)
// =============================================================================
// Demande de David : « il se passe quoi maintenant si une "Sandra" arrive sur la
// page d'accueil ? Je voudrais déjà qu'elle reçoive automatiquement un email avec
// toutes les dates de showcase à venir, avec un lien d'inscription sur la ou les
// dates de son choix. »
//
// Avant : `showcase-waitlist` recevait l'accusé de réception générique (« je te
// réponds très vite ») — donc David devait répondre À LA MAIN pour donner des
// dates qui sont pourtant publiques et déjà affichées sur /showroom. Maintenant
// la personne a les dates ET un lien qui ouvre le formulaire de réservation
// pré-rempli sur la date qu'elle choisit.
//
// ⚠ LES DATES NE SONT PAS ÉCRITES ICI. Elles arrivent dans la requête
// (`upcomingEvents`), calculées par le site depuis `agendaEvents`
// (src/data/site.ts) — la MÊME source que l'agenda affiché sur /showroom. Cet
// email ne peut donc pas annoncer une date que la page ne montre pas. Repli sur
// `EVENT_HOURS` ci-dessus uniquement si la page servie est un cache antérieur.
//
// LIEN D'INSCRIPTION : `/showroom?showcase=AAAA-MM-JJ#agenda`. Le script de
// BookingForm.astro ouvre la modale déjà réglée sur cette date — même mécanisme
// que `?rdv=prive`, en réutilisant le bouton DÉJÀ présent dans l'agenda (aucun
// chemin de code parallèle à maintenir).
// =============================================================================

export interface UpcomingEvent {
    /** « AAAA-MM-JJ ». */
    date: string;
    start: string;
    end: string;
}

/** Repli : les dates connues de ce module, à venir, si la requête n'en porte pas. */
export function fallbackUpcoming(todayIso: string): UpcomingEvent[] {
    return Object.entries(EVENT_HOURS)
        .filter(([d]) => d >= todayIso)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([date, h]) => ({ date, start: h.start, end: h.end }));
}

export function showcaseDatesSubject(count: number, lang: string): string {
    if (lang === 'en') {
        return count > 0 ? 'The next showcase dates in Paris ✨' : 'You are on the showcase list ✨';
    }
    return count > 0 ? 'Les prochaines dates de showcase à Paris ✨' : 'Tu es sur la liste des showcases ✨';
}

export interface ShowcaseDatesOptions {
    firstName: string;
    lang: string;
    events: UpcomingEvent[];
}

export function showcaseDatesHtml(o: ShowcaseDatesOptions): string {
    const en = o.lang === 'en';
    const base = en ? `${SITE}/en` : SITE;
    const hi = o.firstName ? `${en ? 'Hi' : 'Bonjour'} ${esc(o.firstName)},` : (en ? 'Hi,' : 'Bonjour,');
    const events = o.events;

    const t = en ? {
        title: events.length ? 'Here are the next dates ✨' : 'You are on the list ✨',
        p1: events.length
            ? 'Thanks for your interest in the showcases! Here are <strong>all the dates already scheduled</strong>. Pick the one that suits you and book your spot in one click — it is <strong>free</strong>, booking is simply required so I know how many of us we will be.'
            : 'Thanks for your interest in the showcases! <strong>No date is scheduled at the moment</strong> — that is exactly what this list is for: I will write to you as soon as the next one is set, before it is announced anywhere else. You have nothing else to do.',
        datesTitle: 'The next showcases',
        bookCta: 'Book this date',
        where: 'Where',
        practicalTitle: 'Good to know before you come',
        timeRule: '<strong>You choose the date — the start time is firm.</strong> Each session opens with a presentation: arriving late means missing information, and the whole group has to be brought back up to speed. If you arrive early, you can wait downstairs in the courtyard.',
        durationRule: 'The programme runs about <strong>2h</strong> — in practice it usually stretches closer to <strong>3h</strong>, because the conversations keep going. Plan your evening accordingly.',
        shareRule: 'If you feel like it, bring <strong>a fruit juice, a cake, something to pass around</strong>. Entirely optional, never a condition for coming — simply in a spirit of sharing.',
        whatTitle: 'What you will find there',
        what: 'The electronic <strong>Neotone</strong> handpan, <strong>Yishama</strong> acoustic handpans, the <strong>handpan microphones</strong>, the <strong>Gonilélé</strong> African harp, the <strong>calabash</strong> — and the <strong>Handpan Compagnon</strong> app, which makes music visible. You play, you listen, you ask anything.',
        allCta: 'See the full agenda',
        sign: 'See you very soon,<br />David Lesage',
        foot: 'You are receiving this email because you asked to be kept posted about the showcases on lesagedavid.fr.',
    } : {
        title: events.length ? 'Voici les prochaines dates ✨' : 'Tu es sur la liste ✨',
        p1: events.length
            ? 'Merci pour ton intérêt pour les showcases ! Voici <strong>toutes les dates déjà prévues</strong>. Choisis celle qui t’arrange et réserve ta place en un clic — c’est <strong>gratuit</strong>, la réservation sert juste à savoir combien on sera.'
            : 'Merci pour ton intérêt pour les showcases ! <strong>Aucune date n’est fixée pour le moment</strong> — c’est exactement à ça que sert cette liste : je t’écris dès que la prochaine est calée, avant même qu’elle soit annoncée ailleurs. Tu n’as rien d’autre à faire.',
        datesTitle: 'Les prochains showcases',
        bookCta: 'Réserver cette date',
        where: 'Où',
        practicalTitle: 'À savoir avant de venir',
        timeRule: '<strong>La date, tu la choisis — l’heure de début, non.</strong> Chaque session commence par une présentation : arriver en retard, c’est rater des infos et obliger tout le groupe à repartir en arrière. Si tu arrives en avance, tu peux attendre en bas dans la cour.',
        durationRule: 'Le programme dure environ <strong>2h</strong> — dans les faits, ça tourne plutôt autour de <strong>3h</strong>, parce que les discussions continuent. Prévois ta soirée en conséquence.',
        shareRule: 'Si le cœur t’en dit, apporte <strong>un jus de fruit, un gâteau, quelque chose à partager</strong>. Totalement facultatif, jamais une condition pour venir — simplement dans un esprit de partage.',
        whatTitle: 'Ce que tu y trouveras',
        what: 'Le handpan électronique <strong>Neotone</strong>, les handpans acoustiques <strong>Yishama</strong>, les <strong>micros pour handpan</strong>, la harpe africaine <strong>Gonilélé</strong>, la <strong>calebasse</strong> — et l’application <strong>Handpan Compagnon</strong>, qui rend la musique visible. Tu joues, tu écoutes, tu poses toutes tes questions.',
        allCta: 'Voir l’agenda complet',
        sign: 'À très vite,<br />David Lesage',
        foot: 'Tu reçois cet email parce que tu as demandé à être tenu·e au courant des showcases sur lesagedavid.fr.',
    };

    // Une ligne par date : le libellé long, l'horaire, et le bouton qui ouvre le
    // formulaire déjà réglé sur CETTE date.
    const dateRows = events.map((e) => {
        const label = longDate(e.date, o.lang) ?? e.date;
        const href = `${base}/showroom?showcase=${encodeURIComponent(e.date)}#agenda`;
        return `
            <tr><td style="padding:6px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border:1px solid #e7d9c6;border-radius:12px;background:#faf5ef;">
                <tr>
                  <td style="padding:14px 16px;">
                    <div style="color:#111827;font-size:16px;font-weight:700;text-transform:capitalize;">${esc(label)}</div>
                    <div style="margin-top:2px;color:#6b7280;font-size:14px;">${en ? 'from' : 'de'} ${esc(e.start)} ${en ? 'to' : 'à'} ${esc(e.end)}</div>
                    <div style="margin-top:12px;">${btn(href, t.bookCta)}</div>
                  </td>
                </tr>
              </table>
            </td></tr>`;
    }).join('');

    return shell(o.lang, `
        <tr><td style="padding:28px 28px 4px;">
          <div style="font-size:21px;font-weight:700;color:#111827;">${t.title}</div>
          <p style="margin:14px 0 0;color:#374151;font-size:15px;line-height:1.6;">${hi}</p>
          <p style="margin:12px 0 0;color:#374151;font-size:15px;line-height:1.6;">${t.p1}</p>
        </td></tr>

        ${events.length ? `
        <tr><td style="padding:22px 28px 4px;border-top:1px solid #f0f1f3;">
          <h2 style="margin:0 0 6px;font-size:17px;color:#111827;">${t.datesTitle}</h2>
          <p style="margin:0 0 6px;color:#6b7280;font-size:13px;line-height:1.6;">${t.where} : <strong>${esc(VENUE.name)}</strong> — ${esc(VENUE.address)}</p>
          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">${dateRows}</table>
        </td></tr>

        <tr><td style="padding:22px 28px 4px;border-top:1px solid #f0f1f3;">
          <h2 style="margin:0 0 10px;font-size:17px;color:#111827;">${t.practicalTitle}</h2>
          <p style="margin:0 0 8px;padding:10px 12px;background:#fef3c7;border:1px solid #fcd34d;border-radius:10px;color:#78350f;font-size:14px;line-height:1.7;">⏱ ${t.timeRule}</p>
          <p style="margin:0 0 8px;color:#374151;font-size:14px;line-height:1.7;">${t.durationRule}</p>
          <p style="margin:0;color:#374151;font-size:14px;line-height:1.7;">🧁 ${t.shareRule}</p>
        </td></tr>` : ''}

        <tr><td style="padding:22px 28px 8px;border-top:1px solid #f0f1f3;">
          <h2 style="margin:0 0 8px;font-size:17px;color:#111827;">${t.whatTitle}</h2>
          <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.6;">${t.what}</p>
          ${btn(`${base}/showroom#agenda`, t.allCta, false)}
        </td></tr>

        <tr><td style="padding:20px 28px 28px;border-top:1px solid #f0f1f3;">
          <p style="margin:0;color:#6b7280;font-size:14px;line-height:1.6;">${t.sign}</p>
          <p style="margin:12px 0 0;color:#b6bcc4;font-size:11px;line-height:1.5;">${t.foot}</p>
        </td></tr>
`);
}
