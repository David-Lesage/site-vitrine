// =============================================================================
// RAPPEL J-1 + ANNULATION / REPORT D'UN SHOWCASE — briques partagées (21/09/2026)
//
// Utilisé par `showcase-reminder` (cron 10 h Paris la veille) et
// `showcase-attendance` (page /showcase/ma-venue). Les infos du lieu et les
// horaires viennent de `showcase-email.ts` (VENUE, EVENT_HOURS, hoursFor) : on
// ne recopie pas l'adresse. Les consignes d'accès sont celles de l'email de
// confirmation (mots de David, validés 16-18/08) — recopiées à l'identique car
// l'objet `t` de ce module n'est pas exporté. Les modifier aux DEUX endroits.
//
// Règle ferme de David : on ne supprime JAMAIS une inscription, on change son
// statut ('cancelled' | 'rescheduled').
// =============================================================================
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';
import { htmlPart, mailSubject } from './mail.ts';
import { EVENT_HOURS, VENUE, hoursFor } from './showcase-email.ts';

export { EVENT_HOURS, hoursFor, VENUE };

/** Même adresse que `confirm-showcase` (SUPER_ADMIN_EMAIL) et `site-lead` (ADMIN_EMAIL). */
export const ADMIN_EMAIL = 'contact@lesagedavid.fr';
export const SITE = 'https://www.lesagedavid.fr';
export const SHOWCASE_SOURCES = ['showcase-booking', 'showcase-waitlist', 'showcase'];

export type L = 'fr' | 'en' | 'es';
export function langOf(raw: unknown): L {
    const s = String(raw ?? 'fr').toLowerCase();
    return s.startsWith('en') ? 'en' : s.startsWith('es') ? 'es' : 'fr';
}

/** Date du jour (AAAA-MM-JJ) et heure, à Paris. */
export function parisNow(d = new Date()): { date: string; hour: number } {
    const p = Object.fromEntries(
        new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23',
        }).formatToParts(d).map((x) => [x.type, x.value]),
    );
    return { date: `${p.year}-${p.month}-${p.day}`, hour: Number(p.hour) };
}
export function addDays(iso: string, n: number): string {
    const d = new Date(iso + 'T12:00:00Z');
    d.setUTCDate(d.getUTCDate() + n);
    return d.toISOString().slice(0, 10);
}

/** Showcases FUTURS connus (strictement après aujourd'hui, Paris). */
export function futureShowcaseDates(): string[] {
    const today = parisNow().date;
    return Object.keys(EVENT_HOURS).filter((d) => d > today).sort();
}

export function esc(s: unknown): string {
    return String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
}
export function longDate(iso: string | null, lang: L): string {
    if (!iso) return '';
    const loc = lang === 'en' ? 'en-GB' : lang === 'es' ? 'es-ES' : 'fr-FR';
    try {
        return new Intl.DateTimeFormat(loc, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
            .format(new Date(iso + 'T12:00:00'));
    } catch { return iso; }
}
export function venuePageUrl(token: string, lang: L): string {
    const prefix = lang === 'fr' ? '' : `/${lang}`;
    return `${SITE}${prefix}/showcase/ma-venue?t=${encodeURIComponent(token)}`;
}

function shell(lang: L, inner: string): string {
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
const P = 'margin:12px 0 0;color:#374151;font-size:15px;line-height:1.6;';
const block = (html: string, top = true) =>
    `<tr><td style="padding:22px 28px 4px;${top ? 'border-top:1px solid #f0f1f3;' : ''}">${html}</td></tr>`;
function btn(href: string, label: string): string {
    return `<a href="${esc(href)}" style="display:inline-block;background:#b4462a;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:12px 20px;border-radius:10px;">${esc(label)}</a>`;
}

// ---- Rappel J-1 -------------------------------------------------------------
const R = {
    fr: {
        subject: (d: string) => `C'est demain ! Rencontre au Nid — ${d}`,
        title: 'C’est demain ✨',
        hi: (n: string) => (n ? `Bonjour ${esc(n)},` : 'Bonjour,'),
        p1: 'Petit rappel : tu es inscrit·e à la rencontre de <strong>demain</strong> au Nid. J’ai hâte de t’accueillir.',
        date: 'Date', hours: 'Horaires', from: 'de', to: 'à',
        punctual: 'On commence à l’heure : la session s’ouvre par une présentation.',
        accessTitle: 'Pour entrer',
        access: [
            'Tape le code du portail (indiqué juste en dessous)',
            'Au fond de la cour, porte verte, puis <strong>3e étage</strong>',
            'Le Nid est un « Temple » — <strong>on se déchausse avant d’entrer</strong>',
            'Portable en mode <strong>silencieux / avion</strong>',
        ],
        accessFoot: `Métro ${VENUE.metro}. Un souci pour entrer ? Appelle-moi au ${VENUE.phone}.`,
        codeLabel: 'Code du portail',
        codeNote: 'Merci de garder ce code pour toi : c’est un lieu de vie partagé.',
        changeTitle: 'Un empêchement ?',
        change: 'Dis-le-moi, même au dernier moment : ta place peut profiter à quelqu’un d’autre. En un clic, tu peux annuler ou choisir une autre date.',
        cta: 'Je ne peux plus venir / changer de date',
        sign: 'À demain,<br />David Lesage',
        foot: 'Tu reçois cet email parce que tu as réservé une place à une rencontre gratuite au Nid.',
    },
    en: {
        subject: (d: string) => `It's tomorrow! Gathering at Le Nid — ${d}`,
        title: 'It’s tomorrow ✨',
        hi: (n: string) => (n ? `Hi ${esc(n)},` : 'Hi,'),
        p1: 'A quick reminder: you are booked for <strong>tomorrow’s</strong> gathering at Le Nid. I’m looking forward to welcoming you.',
        date: 'Date', hours: 'Times', from: 'from', to: 'to',
        punctual: 'We start on time: the session opens with a presentation.',
        accessTitle: 'Getting in',
        access: [
            'Enter the gate code (shown just below)',
            'At the back of the courtyard, green door, then <strong>3rd floor</strong>',
            'Le Nid is a “Temple” — <strong>shoes off before coming in</strong>',
            'Phone on <strong>silent / airplane mode</strong>',
        ],
        accessFoot: `Metro ${VENUE.metro}. Trouble getting in? Call me on ${VENUE.phone}.`,
        codeLabel: 'Gate code',
        codeNote: 'Please keep this code to yourself: it is a shared living space.',
        changeTitle: 'Something came up?',
        change: 'Let me know, even at the last minute: your spot can go to someone else. In one click you can cancel or pick another date.',
        cta: 'I can’t come anymore / change date',
        sign: 'See you tomorrow,<br />David Lesage',
        foot: 'You are receiving this email because you booked a spot at a free gathering at Le Nid.',
    },
    es: {
        subject: (d: string) => `¡Es mañana! Encuentro en Le Nid — ${d}`,
        title: 'Es mañana ✨',
        hi: (n: string) => (n ? `Hola ${esc(n)}:` : 'Hola:'),
        p1: 'Un pequeño recordatorio: estás inscrito·a en el encuentro de <strong>mañana</strong> en Le Nid. Tengo muchas ganas de recibirte.',
        date: 'Fecha', hours: 'Horario', from: 'de', to: 'a',
        punctual: 'Empezamos puntuales: la sesión se abre con una presentación.',
        accessTitle: 'Para entrar',
        access: [
            'Marca el código del portal (indicado justo debajo)',
            'Al fondo del patio, puerta verde, luego <strong>3.er piso</strong>',
            'Le Nid es un «Templo»: <strong>nos descalzamos antes de entrar</strong>',
            'Móvil en modo <strong>silencio / avión</strong>',
        ],
        accessFoot: `Metro ${VENUE.metro}. ¿Algún problema para entrar? Llámame al ${VENUE.phone}.`,
        codeLabel: 'Código del portal',
        codeNote: 'Por favor, guarda este código para ti: es un lugar de vida compartido.',
        changeTitle: '¿Un imprevisto?',
        change: 'Avísame, aunque sea a última hora: tu plaza puede servirle a otra persona. En un clic puedes cancelar o elegir otra fecha.',
        cta: 'Ya no puedo ir / cambiar de fecha',
        sign: 'Hasta mañana,<br />David Lesage',
        foot: 'Recibes este correo porque reservaste una plaza en un encuentro gratuito en Le Nid.',
    },
};

export function reminderSubject(eventDate: string, lang: L): string {
    return R[lang].subject(longDate(eventDate, lang));
}
export function reminderHtml(o: { firstName: string; lang: L; eventDate: string; token: string }): string {
    const t = R[o.lang];
    const h = hoursFor(o.eventDate);
    const row = (k: string, v: string) =>
        `<tr><td style="padding:5px 0;color:#6b7280;font-size:13px;width:110px;">${k}</td><td style="padding:5px 0;color:#111827;font-size:15px;font-weight:600;">${v}</td></tr>`;
    return shell(o.lang, `
        <tr><td style="padding:28px 28px 4px;">
          <div style="font-size:21px;font-weight:700;color:#111827;">${t.title}</div>
          <p style="${P}margin-top:14px;">${t.hi(o.firstName)}</p>
          <p style="${P}">${t.p1}</p>
          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin-top:12px;">
            ${row(t.date, `<span style="text-transform:capitalize;">${esc(longDate(o.eventDate, o.lang))}</span>`)}
            ${row(t.hours, `${t.from} ${esc(h.start)} ${t.to} ${esc(h.end)}`)}
          </table>
          <p style="margin:10px 0 0;padding:10px 12px;background:#fef3c7;border:1px solid #fcd34d;border-radius:10px;color:#78350f;font-size:14px;line-height:1.6;">⏱ ${t.punctual}</p>
        </td></tr>
        ${block(`
          <h2 style="margin:0 0 10px;font-size:17px;color:#111827;">${t.accessTitle}</h2>
          <p style="margin:0 0 10px;color:#374151;font-size:15px;line-height:1.6;"><strong>${esc(VENUE.name)}</strong> — ${esc(VENUE.address)}</p>
          <ol style="margin:0;padding-left:20px;color:#374151;font-size:14px;line-height:1.8;">${t.access.map((a) => `<li>${a}</li>`).join('')}</ol>
          <div style="margin-top:12px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:12px 14px;">
            <div style="color:#6b7280;font-size:13px;">${t.codeLabel}</div>
            <div style="color:#111827;font-size:22px;font-weight:700;letter-spacing:2px;">${esc(VENUE.gateCode)}</div>
            <div style="color:#9ca3af;font-size:12px;margin-top:6px;">${t.codeNote}</div>
          </div>
          <p style="margin:12px 0 0;color:#6b7280;font-size:13px;line-height:1.6;">${esc(t.accessFoot)}</p>`)}
        ${block(`
          <h2 style="margin:0 0 10px;font-size:17px;color:#111827;">${t.changeTitle}</h2>
          <p style="margin:0;color:#374151;font-size:14px;line-height:1.7;">${t.change}</p>
          <div style="margin-top:14px;">${btn(venuePageUrl(o.token, o.lang), t.cta)}</div>`)}
        <tr><td style="padding:20px 28px 28px;border-top:1px solid #f0f1f3;">
          <p style="margin:0;color:#6b7280;font-size:14px;line-height:1.6;">${t.sign}</p>
          <p style="margin:12px 0 0;color:#b6bcc4;font-size:11px;line-height:1.5;">${t.foot}</p>
        </td></tr>`);
}

// ---- Accusés (annulation / report) -------------------------------------------
const A = {
    fr: {
        cancelSubject: 'C’est noté : ta venue est annulée',
        cancel: (d: string) => `C’est bien noté : tu ne viendras pas à la rencontre du <strong>${esc(d)}</strong>. Merci de m’avoir prévenu, ça permet de libérer ta place.`,
        cancelAfter: 'Si tu veux venir à une autre date, tu seras toujours le·la bienvenu·e :',
        cancelCta: 'Voir les prochaines dates',
        reSubject: (d: string) => `C’est noté : rendez-vous le ${d}`,
        re: (from: string, to: string) => `C’est noté : ta venue passe du <strong>${esc(from)}</strong> au <strong>${esc(to)}</strong>. Tu recevras un petit rappel la veille, avec les infos d’accès.`,
        hi: (n: string) => (n ? `Bonjour ${esc(n)},` : 'Bonjour,'),
        sign: 'À bientôt,<br />David Lesage',
    },
    en: {
        cancelSubject: 'Noted: your visit is cancelled',
        cancel: (d: string) => `Noted: you won’t be coming to the gathering on <strong>${esc(d)}</strong>. Thank you for letting me know — it frees up your spot.`,
        cancelAfter: 'If you’d like to come another time, you’re always welcome:',
        cancelCta: 'See upcoming dates',
        reSubject: (d: string) => `Noted: see you on ${d}`,
        re: (from: string, to: string) => `Noted: your visit moves from <strong>${esc(from)}</strong> to <strong>${esc(to)}</strong>. You’ll get a short reminder the day before, with the access details.`,
        hi: (n: string) => (n ? `Hi ${esc(n)},` : 'Hi,'),
        sign: 'See you soon,<br />David Lesage',
    },
    es: {
        cancelSubject: 'Anotado: tu visita queda cancelada',
        cancel: (d: string) => `Anotado: no vendrás al encuentro del <strong>${esc(d)}</strong>. Gracias por avisarme, así tu plaza queda libre.`,
        cancelAfter: 'Si quieres venir otro día, siempre serás bienvenido·a:',
        cancelCta: 'Ver las próximas fechas',
        reSubject: (d: string) => `Anotado: nos vemos el ${d}`,
        re: (from: string, to: string) => `Anotado: tu visita pasa del <strong>${esc(from)}</strong> al <strong>${esc(to)}</strong>. Recibirás un pequeño recordatorio la víspera, con la información de acceso.`,
        hi: (n: string) => (n ? `Hola ${esc(n)}:` : 'Hola:'),
        sign: 'Hasta pronto,<br />David Lesage',
    },
};

export function ackMail(o: { kind: 'cancel' | 'reschedule'; lang: L; firstName: string; oldDate: string; newDate?: string }):
    { subject: string; html: string } {
    const t = A[o.lang];
    const prefix = o.lang === 'fr' ? '' : `/${o.lang}`;
    const oldL = longDate(o.oldDate, o.lang);
    const body = o.kind === 'cancel'
        ? `<p style="${P}">${t.cancel(oldL)}</p><p style="${P}">${t.cancelAfter}</p><div style="margin-top:14px;">${btn(`${SITE}${prefix}/showroom#agenda`, t.cancelCta)}</div>`
        : `<p style="${P}">${t.re(oldL, longDate(o.newDate ?? '', o.lang))}</p>`;
    return {
        subject: o.kind === 'cancel' ? t.cancelSubject : t.reSubject(longDate(o.newDate ?? '', o.lang)),
        html: shell(o.lang, `<tr><td style="padding:28px;">
          <p style="${P}margin-top:0;">${t.hi(o.firstName)}</p>${body}
          <p style="margin:20px 0 0;color:#6b7280;font-size:14px;line-height:1.6;">${t.sign}</p></td></tr>`),
    };
}

/** Mail à David (toujours en français). */
export function adminMail(o: {
    kind: 'cancel' | 'reschedule'; firstName: string; lastName: string; email: string; oldDate: string; newDate?: string; peopleCount?: number | null;
}): { subject: string; html: string } {
    const who = `${o.firstName} ${o.lastName}`.trim() || o.email;
    const oldL = longDate(o.oldDate, 'fr');
    const newL = longDate(o.newDate ?? '', 'fr');
    const subject = o.kind === 'cancel'
        ? `🎤 Annulation showcase — ${who} (${oldL})`
        : `🎤 Report showcase — ${who} : ${oldL} → ${newL}`;
    const line = o.kind === 'cancel'
        ? `<strong>${esc(who)}</strong> a annulé sa venue au showcase du <strong>${esc(oldL)}</strong>.`
        : `<strong>${esc(who)}</strong> a reporté sa venue du <strong>${esc(oldL)}</strong> au <strong>${esc(newL)}</strong>.`;
    return {
        subject,
        html: shell('fr', `<tr><td style="padding:28px;">
          <p style="${P}margin-top:0;">${line}</p>
          <p style="${P}">Email : ${esc(o.email)}${o.peopleCount && o.peopleCount > 1 ? ` · ${o.peopleCount} personnes` : ''}</p>
          <p style="margin:14px 0 0;color:#6b7280;font-size:13px;line-height:1.6;">Fait par la personne elle-même depuis la page « Ma venue ». L’inscription n’est pas supprimée : son statut est passé à « ${o.kind === 'cancel' ? 'cancelled' : 'rescheduled'} » et l’historique est dans la note interne.</p>
          </td></tr>`),
    };
}

// ---- SMTP (mêmes secrets et mêmes précautions d'encodage que confirm-showcase) ----
export interface OutMail { to: string; subject: string; html: string; replyTo?: string }
export async function sendMails(mails: OutMail[]): Promise<void> {
    const host = Deno.env.get('SMTP_HOST') ?? '';
    const port = Number(Deno.env.get('SMTP_PORT') ?? '465');
    const user = Deno.env.get('SMTP_USER') ?? '';
    const pass = Deno.env.get('SMTP_PASS') ?? '';
    const from = Deno.env.get('SMTP_FROM') ?? user;
    if (!host || !user || !pass || !from) throw new Error('Configuration SMTP incomplète (SMTP_HOST/USER/PASS/FROM).');
    const client = new SMTPClient({
        connection: { hostname: host, port, tls: port === 465, auth: { username: user, password: pass } },
    });
    try {
        for (const m of mails) {
            // ⚠️ JAMAIS `subject:` brut ni `html:` (encodeurs cassés de denomailer 1.6.0).
            await client.send({
                from, to: m.to, ...(m.replyTo ? { replyTo: m.replyTo } : {}),
                subject: mailSubject(m.subject), mimeContent: [htmlPart(m.html)],
            });
        }
    } finally {
        try { await client.close(); } catch { /* ignore */ }
    }
}
