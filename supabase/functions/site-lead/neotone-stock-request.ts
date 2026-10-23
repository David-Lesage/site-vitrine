// =============================================================================
// DEMANDE POUR UN NEOTONE PAS AU SHOWROOM — source `neotone-stock-request`
// (demande de David, 25/10/2026, ses mots) :
//   « si il n'est pas dispo, il faut que le client puisse "faire la demande" et
//   il faudrait que ça écrive un email automatique à Neotone de ma part, leur
//   disant que j'ai un client qui est intéressé par l'achat d'un Neotone avec le
//   modèle et le bois concernés, que je n'ai pas en stock, et leur demander
//   leurs délais de fabrication et de livraison pour ce modèle, pour que je
//   puisse informer mon client ».
//
// Trois emails partent de `site-lead` (index.ts) :
//   1. la notification interne à David (comme toute demande) ;
//   2. la confirmation au client (`stockRequestClientHtml`) ;
//   3. le mail à Neotone, DE LA PART DE DAVID (`neotoneStockMail`), en anglais.
//
// ⛔ GARDE-FOUS du mail à Neotone :
//   · interrupteur `NEOTONE_STOCK_REQUEST_EMAIL_ENABLED`, LIVRÉ À `false` : rien
//     ne part chez Neotone tant que David n'a pas validé le texte
//     (audits/MAIL-NEOTONE-DEMANDE-STOCK-2026-10-25.md). Les mails 1 et 2
//     partent quand même ;
//   · au plus UN mail par couple modèle + bois toutes les 48 h (lu dans
//     `site_leads`, colonne `neotone_partner_mail_at` — migration
//     specs/migration-site-leads-neotone-partner-mail-at.sql, À APPLIQUER avant
//     d'allumer l'interrupteur). Colonne absente ⇒ on n'envoie PAS (on ne sait
//     pas compter, donc on ne prend pas le risque de spammer Neotone) ;
//   · AUCUNE donnée personnelle du client dans ce mail : ni nom, ni e-mail, ni
//     téléphone, ni message. Les fonctions ci-dessous ne les reçoivent même pas.
//
// MISE À JOUR 25/10/2026 (processus d'achat en 3 cas, specs/ACHAT-NEOTONE-3-CAS-2026-10-25.md) :
//   · le mail à Neotone ne part que pour le CAS 3 (à fabriquer) ; cas 2 (en
//     route) : Neotone ne reçoit rien ;
//   · il contient la date souhaitée de retrait à Paris (et toujours rien d'autre du client) ;
//   · limite : un mail déjà parti dans les 48 h pour ce couple ne couvre la
//     nouvelle demande que s'il visait une date aussi proche ou plus proche.
// =============================================================================

/** ⛔ Interrupteur du mail à Neotone. Passer à `true` SEULEMENT après validation du texte par David. */
export const NEOTONE_STOCK_REQUEST_EMAIL_ENABLED = false;

export const NEOTONE_STOCK_SOURCE = 'neotone-stock-request';
export const NEOTONE_ORDERS_EMAIL = 'neotone@digitalhandpan.com';
export const PARTNER_MAIL_WINDOW_HOURS = 48;

const MODEL_EN: Record<string, string> = {
    one: 'Neotone¹ (10 notes)',
    mutant: 'Neotone¹ Mutant (19 notes)',
};
const MODEL_FR: Record<string, string> = MODEL_EN;
const WOOD_EN: Record<string, string> = { frene: 'ash', chene: 'oak', acajou: 'mahogany', cerisier: 'cherry', noyer: 'walnut' };
const WOOD_FR: Record<string, string> = { frene: 'frêne', chene: 'chêne', acajou: 'acajou', cerisier: 'cerisier', noyer: 'noyer' };

function esc(s: string): string {
    return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
}

/** Vrai si le couple est assez précis pour écrire à Neotone (pas « ne sait pas encore »). */
export function canWriteToNeotone(model: string | null, wood: string | null): boolean {
    return !!model && !!wood && model in MODEL_EN && wood in WOOD_EN;
}

/**
 * Le mail à Neotone, de la part de David. Ne reçoit QUE le modèle et le bois :
 * aucune donnée du client ne peut s'y glisser.
 */
export function neotoneStockMail(model: string, wood: string, pickupDate: string | null = null): { subject: string; text: string; html: string } {
    const m = MODEL_EN[model];
    const w = WOOD_EN[wood];
    const subject = `Paris Hub — lead time for a ${m} in ${w}`;
    // 25/10/2026 (processus validé) : la date souhaitée à Paris, et RIEN d'autre du client.
    const wished = pickupDate && /^\d{4}-\d{2}-\d{2}$/.test(pickupDate)
        ? new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${pickupDate}T12:00:00Z`))
        : null;
    const paragraphs = [
        'Hello Neotone team,',
        `A customer at the Paris Hub is interested in buying a ${m} in ${w}. I don’t have this model in this wood in stock at the showroom at the moment.`,
        ...(wished ? [`The customer would like to pick it up in Paris around ${wished}.`] : []),
        'Could you tell me your current build time for this model and wood, and the delivery time to Paris, so that I can inform my customer?',
        'Thank you very much!',
    ];
    const signature = ['Best regards,', 'David Lesage', 'Paris Hub — Neotone showroom', 'contact@lesagedavid.fr · lesagedavid.fr'];
    const text = `${paragraphs.join('\n\n')}\n\n${signature.join('\n')}\n`;
    const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /></head>
<body style="margin:0;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;font-size:15px;line-height:1.6;">
${paragraphs.map((p) => `<p style="margin:0 0 14px;">${esc(p)}</p>`).join('\n')}
<p style="margin:18px 0 0;">${signature.map(esc).join('<br />')}</p>
</body></html>`;
    return { subject, text, html };
}

/** Libellés lisibles (français) du couple, pour la notification à David. */
export function stockPairLabelFr(model: string | null, wood: string | null): string {
    const m = model && MODEL_FR[model] ? MODEL_FR[model] : (model ?? '?');
    const w = wood && WOOD_FR[wood] ? WOOD_FR[wood] : (wood ?? '?');
    return `${m} en ${w}`;
}

export type PartnerMailOutcome =
    | { sent: true; at: string }
    | { sent: false; reason: 'disabled' | 'imprecise' | 'recent' | 'unknown_window' | 'smtp' | 'error' | 'transit'; detail?: string };

/** Ligne affichée dans la notification à David : ce qui s'est passé côté Neotone. */
export function partnerOutcomeFr(o: PartnerMailOutcome): string {
    if (o.sent) return `✅ envoyé à ${NEOTONE_ORDERS_EMAIL} (toi en copie)`;
    switch (o.reason) {
        case 'disabled': return 'non envoyé — interrupteur NEOTONE_STOCK_REQUEST_EMAIL_ENABLED à false (texte à valider)';
        case 'transit': return 'non envoyé — pièce en route (cas 2) : Neotone ne reçoit rien';
        case 'imprecise': return 'non envoyé — modèle ou bois non précisé';
        case 'recent': return `non envoyé — déjà demandé pour ce modèle et ce bois il y a moins de ${PARTNER_MAIL_WINDOW_HOURS} h, pour une date aussi proche ou plus proche${o.detail ? ` (le ${o.detail})` : ''}`;
        case 'unknown_window': return 'non envoyé — impossible de vérifier la limite de 48 h (migration neotone_partner_mail_at appliquée ?)';
        case 'smtp': return 'non envoyé — SMTP non configuré';
        default: return `non envoyé — erreur${o.detail ? ` : ${o.detail}` : ''}`;
    }
}

/** Client Supabase minimal utilisé ici (facilite le harnais de test). */
// deno-lint-ignore no-explicit-any
type Db = { from: (t: string) => any };

/**
 * Dernier mail envoyé à Neotone pour ce couple dans la fenêtre de 48 h.
 * `{ ok: false }` si la lecture échoue (colonne absente…) : l'appelant
 * n'envoie alors RIEN.
 */
export async function recentPartnerMail(db: Db, model: string, wood: string, now: Date, pickupDate: string | null = null): Promise<{ ok: true; lastAt: string | null } | { ok: false; error: string }> {
    const since = new Date(now.getTime() - PARTNER_MAIL_WINDOW_HOURS * 3600_000).toISOString();
    try {
        const { data, error } = await db
            .from('site_leads')
            .select('neotone_partner_mail_at,neotone_pickup_date')
            .eq('source', NEOTONE_STOCK_SOURCE)
            .eq('neotone_model', model)
            .eq('neotone_wood', wood)
            .gte('neotone_partner_mail_at', since)
            .order('neotone_partner_mail_at', { ascending: false })
            .limit(20);
        if (error) return { ok: false, error: String(error.message ?? error) };
        // RÈGLE (25/10/2026, chaque client a sa date) : un mail déjà parti dans les
        // 48 h pour ce couple ne « couvre » la nouvelle demande que s'il demandait
        // une date AUSSI PROCHE OU PLUS PROCHE (ou aucune date). Un client plus
        // pressé que les précédents déclenche donc un nouveau mail ; un client
        // moins pressé, non (la réponse de Neotone vaut aussi pour lui).
        const rows = Array.isArray(data) ? data : [];
        const covering = rows.find((r: { neotone_pickup_date?: string | null }) =>
            !pickupDate || !r.neotone_pickup_date || String(r.neotone_pickup_date) <= pickupDate);
        const lastAt = covering?.neotone_partner_mail_at ? String(covering.neotone_partner_mail_at) : null;
        return { ok: true, lastAt };
    } catch (e) {
        return { ok: false, error: e instanceof Error ? e.message : String(e) };
    }
}

/** Email de confirmation au client (FR / EN ; ES → FR, comme le reste de site-lead). */
export function stockRequestClientSubject(lang: string): string {
    return lang === 'en'
        ? 'David Lesage — your Neotone request has been passed on ✨'
        : 'David Lesage — ta demande pour un Neotone est transmise ✨';
}

export function stockRequestClientHtml(opts: {
    firstName: string;
    lang: string;
    model: string | null;
    wood: string | null;
    message: string | null;
    site: string;
    /** 25/10/2026 : 'transit' (cas 2) ou 'out' (cas 3). */
    stockState?: string | null;
    pickupDate?: string | null;
    /** Lignes de facturation déjà mises en forme par index.ts. */
    billingRows?: [string, string][];
    /** Étapes « paiement avant la venue » (HTML de confiance). */
    paySteps?: string[];
}): string {
    const en = opts.lang === 'en';
    const base = en ? `${opts.site}/en` : opts.site;
    const hi = opts.firstName ? `${en ? 'Hi' : 'Bonjour'} ${esc(opts.firstName)},` : (en ? 'Hi,' : 'Bonjour,');
    const model = opts.model && MODEL_EN[opts.model] ? MODEL_EN[opts.model] : null;
    const wood = opts.wood ? (en ? WOOD_EN : WOOD_FR)[opts.wood] ?? null : null;
    const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    const t = en ? {
        title: 'Your request has been passed on ✨',
        p1: opts.stockState === 'transit'
            ? 'Thanks! The instrument you chose is on its way to the showroom. I’ll come back to you with the date it will be in Paris: one click will be enough to confirm it.'
            : 'Thanks! The instrument you chose isn’t at the showroom right now, so I’m asking Neotone for their build and delivery times to Paris for this model and wood.',
        p2: opts.stockState === 'transit'
            ? 'Once you confirm the date, Neotone sends you the invoice and the payment link.'
            : 'I’ll get back to you with their answer and a date — usually within a few working days (Neotone works Monday to Friday). One click will be enough to confirm it.',
        pickup: 'Pickup in Paris', billing: 'Your billing details', pay: 'How payment works',
        billingCheck: 'Please check them: the invoice is issued from these details. Something wrong? Just reply to this email.',
        recap: 'Your request', model: 'Model', wood: 'Wood', msg: 'Your message',
        cta: 'See the Neotone page',
        sign: 'See you soon,<br />David Lesage',
        foot: 'You are receiving this email because you sent a request on lesagedavid.fr.',
    } : {
        title: 'Ta demande est transmise ✨',
        p1: opts.stockState === 'transit'
            ? 'Merci ! L’instrument que tu as choisi est en route vers le showroom. Je reviens vers toi avec la date à laquelle il sera à Paris : un clic suffira pour la confirmer.'
            : 'Merci ! L’instrument que tu as choisi n’est pas au showroom en ce moment : je demande à Neotone leurs délais de fabrication et de livraison jusqu’à Paris pour ce modèle et ce bois.',
        p2: opts.stockState === 'transit'
            ? 'Dès que tu confirmes la date, Neotone t’envoie la facture et le lien de paiement.'
            : 'Je reviens vers toi avec leur réponse et une date — en général sous quelques jours ouvrés (Neotone travaille du lundi au vendredi). Un clic suffira pour la confirmer.',
        pickup: 'Retrait à Paris', billing: 'Tes informations de facturation', pay: 'Comment se passe le paiement',
        billingCheck: 'Vérifie-les : c’est avec ces informations que la facture est établie. Une erreur ? Réponds simplement à cet email.',
        recap: 'Ta demande', model: 'Modèle', wood: 'Bois', msg: 'Ton message',
        cta: 'Voir la page Neotone',
        sign: 'À très vite,<br />David Lesage',
        foot: 'Tu reçois cet email parce que tu as envoyé une demande sur lesagedavid.fr.',
    };
    const row = (k: string, v: string) =>
        `<tr><td style="padding:4px 0;color:#6b7280;font-size:13px;width:110px;vertical-align:top;">${k}</td><td style="padding:4px 0;color:#111827;font-size:14px;">${v}</td></tr>`;
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
          <p style="margin:12px 0 0;color:#374151;font-size:15px;line-height:1.6;">${t.p2}</p>
        </td></tr>
        <tr><td style="padding:22px 28px 4px;border-top:1px solid #f0f1f3;">
          <h2 style="margin:0 0 10px;font-size:17px;color:#111827;">${t.recap}</h2>
          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
            ${model ? row(t.model, esc(model)) : ''}
            ${wood ? row(t.wood, esc(cap(wood))) : ''}
            ${opts.pickupDate ? row(t.pickup, esc(new Intl.DateTimeFormat(en ? 'en-GB' : 'fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${opts.pickupDate}T12:00:00Z`)))) : ''}
            ${opts.message ? row(t.msg, esc(opts.message).replace(/\n/g, '<br />')) : ''}
          </table>
        </td></tr>
        ${opts.paySteps?.length ? `<tr><td style="padding:22px 28px 4px;border-top:1px solid #f0f1f3;">
          <h2 style="margin:0 0 10px;font-size:17px;color:#111827;">${t.pay}</h2>
          <ol style="margin:0;padding-left:20px;color:#374151;font-size:14px;line-height:1.7;">${opts.paySteps.map((s) => `<li>${s}</li>`).join('')}</ol>
        </td></tr>` : ''}
        ${opts.billingRows?.length ? `<tr><td style="padding:22px 28px 4px;border-top:1px solid #f0f1f3;">
          <h2 style="margin:0 0 10px;font-size:17px;color:#111827;">${t.billing}</h2>
          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">${opts.billingRows.map(([k, v]) => row(esc(k), esc(v))).join('')}</table>
          <p style="margin:10px 0 0;color:#6b7280;font-size:13px;line-height:1.5;">${t.billingCheck}</p>
        </td></tr>` : ''}
        <tr><td style="padding:22px 28px 4px;border-top:1px solid #f0f1f3;">
          <a href="${base}/neotone" style="display:inline-block;background:#b4462a;color:#ffffff;border:1px solid #b4462a;text-decoration:none;font-weight:600;font-size:14px;padding:12px 24px;border-radius:999px;">${t.cta}</a>
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
