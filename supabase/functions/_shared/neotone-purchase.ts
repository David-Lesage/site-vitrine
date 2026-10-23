// =============================================================================
// PROCESSUS D'ACHAT NEOTONE — les 3 cas (validé par David le 25/10/2026)
// =============================================================================
// Partagé par `site-lead` (dépôt de la demande) et `neotone-purchase-action`
// (les liens « en un clic »). Spec : specs/ACHAT-NEOTONE-3-CAS-2026-10-25.md.
//
//   Cas 1 — en stock au showroom : formulaire d'achat (−7 %) → David clique
//           « Lancer la facturation chez Neotone » (n° de série dans une liste).
//   Cas 2 — en route : « Faire la demande » → Neotone ne reçoit RIEN → David
//           « Répondre au client » (date pré-remplie depuis la colonne L) →
//           le client confirme → « Lancer la facturation ».
//   Cas 3 — à fabriquer : « Faire la demande » → demande de délais AUTOMATIQUE
//           chez Neotone (aucune donnée du client) → David « Répondre au
//           client » → confirmation → plus tard « Lancer la facturation ».
//
// ⛔ INTERRUPTEURS, LIVRÉS À OFF (voir plus bas) : rien ne part chez Neotone et
//    rien n'est écrit dans le Sheet tant que David ne les a pas allumés.
// =============================================================================

/** ⛔ Mail de FACTURATION à neotone@ (cas 1, 2, 3). OFF ⇒ aperçu envoyé à David SEUL, état inchangé. */
export const NEOTONE_INVOICE_EMAIL_ENABLED = false;
/** ⛔ Écriture des cases violettes du Sheet via l'Apps Script privé. OFF ⇒ rien n'est écrit. */
export const SHEET_WRITE_ENABLED = false;

export const NEOTONE_ORDERS_EMAIL = 'neotone@digitalhandpan.com';
export const ADMIN_EMAIL = 'contact@lesagedavid.fr';
export const SITE = 'https://lesagedavid.fr';

/** États d'une demande (colonne `site_leads.purchase_state`). */
export const PURCHASE_STATES = ['new', 'date_proposed', 'client_confirmed', 'invoicing', 'paid', 'delivered', 'cancelled'] as const;
export type PurchaseState = typeof PURCHASE_STATES[number];
export const STATE_LABEL_FR: Record<PurchaseState, string> = {
    new: 'nouvelle', date_proposed: 'date proposée', client_confirmed: 'confirmée par le client',
    invoicing: 'facturation lancée', paid: 'payée', delivered: 'remise', cancelled: 'annulée',
};

/** D'où chaque action a le droit de partir (la machine à états garantit l'usage unique). */
export const ALLOWED_FROM: Record<string, PurchaseState[]> = {
    reply: ['new', 'date_proposed'],                 // re-proposer une date = nouvelle révision
    confirm: ['date_proposed'],
    invoice: ['new', 'client_confirmed'],            // 'new' : cas 1 seulement (contrôlé à part)
    paid: ['invoicing'],
    delivered: ['paid', 'invoicing'],                // remise sur preuve de paiement
    cancel: ['new', 'date_proposed', 'client_confirmed', 'invoicing'],
};

export type StockState = 'in' | 'transit' | 'out';
export const STOCK_STATES: StockState[] = ['in', 'transit', 'out'];

export const MODEL_EN: Record<string, string> = { one: 'Neotone¹ (10 notes)', mutant: 'Neotone¹ Mutant (19 notes)' };
export const WOOD_EN: Record<string, string> = { frene: 'ash', chene: 'oak', acajou: 'mahogany', cerisier: 'cherry', noyer: 'walnut' };
export const WOOD_FR: Record<string, string> = { frene: 'frêne', chene: 'chêne', acajou: 'acajou', cerisier: 'cerisier', noyer: 'noyer' };
const SHEET_MODEL: Record<string, string> = { ONE: 'one', MUTANT: 'mutant' };
const SHEET_WOOD: Record<string, string> = { ASH: 'frene', OAK: 'chene', MAHOGANY: 'acajou', CHERRY: 'cerisier', WALNUT: 'noyer' };

export function esc(s: unknown): string {
    return String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
}

// ── La demande telle que lue en base ─────────────────────────────────────────
export interface LeadBilling {
    kind?: string | null; company?: string; vatNumber?: string; noVat?: boolean; siret?: string;
    name?: string; address?: string; postalCode?: string; city?: string; country?: string;
}
export interface LeadPrice {
    basePrice: number; discountPct: number; discount: number; subtotalHT: number;
    vatRate: number; vatAmount: number; totalTTC: number; eu: boolean; countryCode: string;
}
export interface PurchaseLead {
    id: string; email: string; source: string; lang: string | null;
    first_name: string | null; last_name: string | null; phone: string | null;
    neotone_model: string | null; neotone_wood: string | null; neotone_purchase_mode: string | null;
    billing: LeadBilling | null; neotone_price: LeadPrice | null;
    neotone_pickup_date: string | null; neotone_stock_state: StockState | null; neotone_arrival_label: string | null;
    purchase_state: PurchaseState | null; neotone_proposed_date: string | null; neotone_proposed_rev: number | null;
    neotone_serial: string | null;
}
export const LEAD_COLUMNS = 'id,email,source,lang,first_name,last_name,phone,neotone_model,neotone_wood,neotone_purchase_mode,billing,neotone_price,neotone_pickup_date,neotone_stock_state,neotone_arrival_label,purchase_state,neotone_proposed_date,neotone_proposed_rev,neotone_serial';

export const clientLang = (l: string | null | undefined) => (l === 'en' ? 'en' : 'fr');
export const fullName = (l: Pick<PurchaseLead, 'first_name' | 'last_name'>) => `${l.first_name ?? ''} ${l.last_name ?? ''}`.trim();

export function pairLabel(model: string | null, wood: string | null, lang: string): string {
    const m = model && MODEL_EN[model] ? MODEL_EN[model] : (model ?? '?');
    const w = wood ? ((lang === 'en' ? WOOD_EN : WOOD_FR)[wood] ?? wood) : '?';
    return lang === 'en' ? `${m} in ${w}` : `${m} en ${w}`;
}

/** « 2026-11-14 » → « samedi 14 novembre 2026 » / « Saturday 14 November 2026 ». */
export function fmtDay(iso: string | null, lang: string): string {
    if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso ?? '';
    const d = new Date(`${iso}T12:00:00Z`);
    return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
}

export function fmtEur(n: number, lang = 'fr'): string {
    return new Intl.NumberFormat(lang === 'en' ? 'en-GB' : 'fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) + ' €';
}

function countryName(code: string | undefined, lang: string): string {
    if (!code) return '';
    try { return new Intl.DisplayNames([lang === 'en' ? 'en' : 'fr'], { type: 'region' }).of(code) ?? code; } catch { return code; }
}

/** Adresse de facturation sur une ligne. */
export function billingAddressLine(b: LeadBilling | null, lang: string): string {
    if (!b) return '';
    return [b.address, [b.postalCode, b.city].filter(Boolean).join(' '), countryName(b.country, lang)].filter(Boolean).join(', ');
}

/** Facture HT (autoliquidation) seulement : société + n° de TVA saisi + pays UE. */
export function isReverseCharge(lead: PurchaseLead): boolean {
    return !!lead.billing?.vatNumber && lead.billing?.kind === 'societe' && (lead.neotone_price?.eu ?? true);
}

// ── Stock PRIVÉ (n° de série) — Apps Script, jamais exposé au navigateur ─────
export interface PrivatePiece { serial: string; model: string; wood: string; status: 'Available' | 'In transit'; arrivalText: string }

function privateScript(): { url: string; key: string } | null {
    const url = Deno.env.get('STOCK_PRIVATE_URL') ?? '';
    const key = Deno.env.get('STOCK_PRIVATE_KEY') ?? '';
    return url && key.length >= 16 ? { url, key } : null;
}

/** Pièces disponibles OU en route pour ce modèle + bois, avec leur n° de série. */
export async function fetchPrivatePieces(model: string | null, wood: string | null): Promise<{ ok: true; pieces: PrivatePiece[] } | { ok: false; error: string }> {
    const cfg = privateScript();
    if (!cfg) return { ok: false, error: 'not_configured' };
    try {
        const u = `${cfg.url}?mode=private&key=${encodeURIComponent(cfg.key)}`;
        const r = await fetch(u, { signal: AbortSignal.timeout(10000) });
        const body = await r.json().catch(() => null) as { pieces?: Record<string, string>[]; error?: string } | null;
        if (!r.ok || !body || body.error || !Array.isArray(body.pieces)) return { ok: false, error: body?.error ?? `http_${r.status}` };
        const pieces = body.pieces
            .map((p) => ({
                serial: String(p.serial ?? '').trim().replace(/^#/, ''),
                model: SHEET_MODEL[String(p.model ?? '').trim().toUpperCase()] ?? '',
                wood: SHEET_WOOD[String(p.wood ?? '').trim().toUpperCase()] ?? '',
                status: (p.status === 'In transit' ? 'In transit' : 'Available') as PrivatePiece['status'],
                arrivalText: String(p.arrivalText ?? '').trim(),
            }))
            .filter((p) => p.serial && (!model || p.model === model) && (!wood || p.wood === wood));
        return { ok: true, pieces };
    } catch (e) {
        return { ok: false, error: e instanceof Error ? e.message.slice(0, 120) : 'fetch_failed' };
    }
}

/** Les cases violettes à écrire, repérées PAR LEUR EN-TÊTE dans le Sheet (procédure du 09-10/10). */
export function sheetFields(lead: PurchaseLead): Record<string, string> {
    const b = lead.billing ?? {};
    const name = [fullName(lead), b.company].filter(Boolean).join(' – ');
    // Décision du 10/10 : téléphone + TVA DANS la case adresse (pas de colonne téléphone).
    const address = [
        b.name && b.name !== fullName(lead) ? b.name : null,
        b.company || null,
        billingAddressLine(b, 'en'),
        lead.phone ? `Phone: ${lead.phone}` : null,
        b.vatNumber ? `VAT: ${b.vatNumber}` : null,
    ].filter(Boolean).join('\n');
    return {
        'Customer discount': `${lead.neotone_price?.discountPct ?? 7}%`,
        'Name of the Customer': name,
        'Valid EU VAT Number': b.vatNumber || 'none',
        'Billing adress of the customer': address,
        'Email of the Customer': lead.email,
    };
}

export type SheetOutcome = { written: true } | { written: false; reason: 'disabled' | 'not_configured' | 'conflict' | 'not_found' | 'error'; detail?: string };

export async function writeSaleToSheet(serial: string, fields: Record<string, string>): Promise<SheetOutcome> {
    if (!SHEET_WRITE_ENABLED) return { written: false, reason: 'disabled' };
    const cfg = privateScript();
    if (!cfg) return { written: false, reason: 'not_configured' };
    try {
        const r = await fetch(cfg.url, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // Apps Script : pas de pré-vol CORS
            body: JSON.stringify({ key: cfg.key, action: 'write_sale', serial, fields }),
            signal: AbortSignal.timeout(15000),
        });
        const body = await r.json().catch(() => null) as { ok?: boolean; error?: string; conflicts?: string[] } | null;
        if (body?.ok) return { written: true };
        if (body?.error === 'conflict') return { written: false, reason: 'conflict', detail: (body.conflicts ?? []).join(', ') };
        if (body?.error === 'serial_not_found') return { written: false, reason: 'not_found' };
        return { written: false, reason: 'error', detail: body?.error ?? `http_${r.status}` };
    } catch (e) {
        return { written: false, reason: 'error', detail: e instanceof Error ? e.message.slice(0, 120) : 'fetch_failed' };
    }
}

export function sheetOutcomeFr(o: SheetOutcome): string {
    if (o.written) return '✅ cases violettes écrites dans le Sheet';
    switch (o.reason) {
        case 'disabled': return 'non écrit — interrupteur SHEET_WRITE_ENABLED à false';
        case 'not_configured': return 'non écrit — STOCK_PRIVATE_URL / STOCK_PRIVATE_KEY absents';
        case 'conflict': return `non écrit — cases déjà remplies (${o.detail ?? '?'}) : rien n’a été écrasé, à vérifier à la main`;
        case 'not_found': return 'non écrit — n° de série introuvable dans le Sheet';
        default: return `non écrit — erreur${o.detail ? ` : ${o.detail}` : ''}`;
    }
}

// ── Gabarits HTML ────────────────────────────────────────────────────────────
export const button = (href: string, label: string, primary = true) =>
    `<a href="${esc(href)}" style="display:inline-block;margin:4px 8px 4px 0;background:${primary ? '#b4462a' : '#ffffff'};color:${primary ? '#ffffff' : '#b4462a'};border:1px solid #b4462a;text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:999px;">${esc(label)}</a>`;

export const rowsTable = (rows: [string, string][]) => `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:4px 0;color:#6b7280;font-size:13px;width:150px;vertical-align:top;">${esc(k)}</td><td style="padding:4px 0;color:#111827;font-size:14px;white-space:pre-line;">${esc(v)}</td></tr>`)
    .join('')}</table>`;

/** Carte d'email : titre, paragraphes (HTML de confiance), sections, boutons, pied. */
export function card(lang: string, opts: { title: string; paras: string[]; sections?: { title: string; html: string }[]; buttons?: string; foot?: string }): string {
    const sec = (opts.sections ?? []).map((s) => `<tr><td style="padding:18px 28px 4px;border-top:1px solid #f0f1f3;"><h2 style="margin:0 0 10px;font-size:16px;color:#111827;">${esc(s.title)}</h2>${s.html}</td></tr>`).join('');
    return `<!doctype html>
<html lang="${lang === 'en' ? 'en' : 'fr'}"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 0;"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
<tr><td style="padding:28px 28px 8px;"><div style="font-size:20px;font-weight:700;color:#111827;">${esc(opts.title)}</div>
${opts.paras.map((p) => `<p style="margin:12px 0 0;color:#374151;font-size:15px;line-height:1.6;">${p}</p>`).join('')}</td></tr>
${opts.buttons ? `<tr><td style="padding:14px 28px 8px;">${opts.buttons}</td></tr>` : ''}
${sec}
<tr><td style="padding:18px 28px 26px;border-top:1px solid #f0f1f3;"><p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.5;">${opts.foot ?? (lang === 'en' ? 'See you soon,<br />David Lesage — Paris Hub, Neotone showroom' : 'À très vite,<br />David Lesage — showroom Neotone, Paris 20ᵉ')}</p></td></tr>
</table></td></tr></table></body></html>`;
}

// ── Textes communs au client (FR / EN) ──────────────────────────────────────
/** Étapes « paiement avant la venue » — reprises dans tous les mails au client. */
export function payFirstSteps(lang: string): string[] {
    return lang === 'en' ? [
        'You pay <strong>before</strong> coming, never on the day: no payment is possible at the showroom.',
        'Neotone (Soundventure, Budapest) issues the invoice and sends you a card payment link, <strong>on weekdays only</strong> (Monday to Friday, except Hungarian public holidays). Please send your request several working days before your visit.',
        'The payment link comes from <strong>szamlazz.hu</strong>: check your spam folder.',
        'On the day, I hand you a Neotone that is already paid. You can ask me for the proof of payment at any time.',
    ] : [
        'Tu paies <strong>avant</strong> ta venue, jamais le jour même : aucun paiement n’est possible au showroom.',
        'Neotone (Soundventure, Budapest) établit la facture et t’envoie un lien de paiement par carte, <strong>en semaine seulement</strong> (du lundi au vendredi, hors jours fériés hongrois). Fais ta demande plusieurs jours ouvrés avant ta venue.',
        'Le lien de paiement vient de <strong>szamlazz.hu</strong> : pense à vérifier tes spams.',
        'Le jour J, je te remets un Neotone déjà payé. Tu peux me demander la preuve de paiement à tout moment.',
    ];
}
export const stepsHtml = (steps: string[]) =>
    `<ol style="margin:0;padding-left:20px;color:#374151;font-size:14px;line-height:1.7;">${steps.map((s) => `<li>${s}</li>`).join('')}</ol>`;

/** Récapitulatif client : choix, date souhaitée, facturation. */
export function leadRecapRows(lead: PurchaseLead, lang: string): [string, string][] {
    const en = lang === 'en';
    const b = lead.billing ?? {};
    return [
        [en ? 'Instrument' : 'Instrument', pairLabel(lead.neotone_model, lead.neotone_wood, lang)],
        [en ? 'Pickup in Paris' : 'Retrait à Paris', lead.neotone_pickup_date ? (en ? `wished for ${fmtDay(lead.neotone_pickup_date, lang)}` : `souhaité le ${fmtDay(lead.neotone_pickup_date, lang)}`) : ''],
        [en ? 'Price' : 'Prix', lead.neotone_price ? `${fmtEur(isReverseCharge(lead) ? lead.neotone_price.subtotalHT : lead.neotone_price.totalTTC, lang)} ${isReverseCharge(lead) ? (en ? 'excl. VAT' : 'HT') : (en ? 'incl. VAT' : 'TTC')} (−${lead.neotone_price.discountPct} % showroom)` : ''],
        [en ? 'Billing name' : 'Facturation', [b.name || fullName(lead), b.company].filter(Boolean).join(' – ')],
        [en ? 'Address' : 'Adresse', billingAddressLine(b, lang)],
        [en ? 'Intra-EU VAT no.' : 'N° TVA intracom.', b.vatNumber || (b.kind === 'societe' ? (en ? 'none' : 'aucun') : '')],
    ];
}

// ── Mail : proposition de date au client (cas 2 et 3) ───────────────────────
export function dateProposalMail(lead: PurchaseLead, date: string, confirmUrl: string) {
    const lang = clientLang(lead.lang);
    const en = lang === 'en';
    const hi = lead.first_name ? `${en ? 'Hi' : 'Bonjour'} ${esc(lead.first_name)},` : (en ? 'Hi,' : 'Bonjour,');
    const pair = esc(pairLabel(lead.neotone_model, lead.neotone_wood, lang));
    const subject = en ? `Your Neotone: at the showroom around ${date}?` : `Ton Neotone : au showroom vers le ${date} ?`;
    const html = card(lang, {
        title: en ? 'A date for your Neotone' : 'Une date pour ton Neotone',
        paras: [
            hi,
            en ? `Your Neotone (${pair}) will be at the showroom around <strong>${esc(date)}</strong>. Does that work for you?`
                : `Ton Neotone (${pair}) sera au showroom vers le <strong>${esc(date)}</strong>. Ça te convient ?`,
            en ? 'One click is enough. Once you confirm, I ask Neotone to invoice you.'
                : 'Un clic suffit. Dès que tu confirmes, je demande à Neotone de te facturer.',
        ],
        buttons: button(confirmUrl, en ? 'Yes, I confirm' : 'Oui, je confirme')
            + `<p style="margin:10px 0 0;color:#6b7280;font-size:13px;line-height:1.5;">${en ? 'Another date would suit you better? Just reply to this email.' : 'Une autre date t’arrangerait ? Réponds simplement à cet email.'}</p>`,
        sections: [
            { title: en ? 'How payment works' : 'Comment se passe le paiement', html: stepsHtml(payFirstSteps(lang)) },
            { title: en ? 'Your request' : 'Ta demande', html: rowsTable(leadRecapRows(lead, lang)) },
        ],
    });
    return { subject, html };
}

// ── Mail : David est prévenu de la confirmation du client ───────────────────
export function davidConfirmedMail(lead: PurchaseLead, date: string, invoiceUrl: string, cancelUrl: string) {
    const subject = `[Neotone] ${fullName(lead)} confirme la date (${date}) — à facturer`;
    const html = card('fr', {
        title: `${fullName(lead)} confirme : ${date}`,
        paras: [
            `${esc(fullName(lead))} a confirmé la date proposée pour ${esc(pairLabel(lead.neotone_model, lead.neotone_wood, 'fr'))}.`,
            'Quand l’instrument lui est attribué, lance la facturation : tu choisis le n° de série dans la liste, le mail part chez Neotone (toi et le client en copie) et le Sheet est rempli.',
        ],
        buttons: button(invoiceUrl, 'Lancer la facturation chez Neotone') + button(cancelUrl, 'Annuler la demande', false),
        sections: [{ title: 'La demande', html: rowsTable([...leadRecapRows(lead, 'fr'), ['E-mail', lead.email], ['Téléphone', lead.phone ?? '']]) }],
        foot: 'Liens personnels, valables 60 jours — ne les transfère pas.',
    });
    return { subject, html };
}

// ── Mail de FACTURATION à Neotone (anglais) ──────────────────────────────────
// Format de la vente réelle du 21/10 (spec §3) : vente directe, retrait au Hub,
// −7 %, statut TVA, coordonnées complètes, n° de série en tête.
export function neotoneInvoiceMail(lead: PurchaseLead, serial: string) {
    const b = lead.billing ?? {};
    const p = lead.neotone_price;
    const rc = isReverseCharge(lead);
    const model = lead.neotone_model ? MODEL_EN[lead.neotone_model] ?? lead.neotone_model : '?';
    const wood = lead.neotone_wood ? WOOD_EN[lead.neotone_wood] ?? lead.neotone_wood : '?';
    const name = [fullName(lead), b.company].filter(Boolean).join(' – ');
    const subject = `Paris Hub — invoice request — Neotone #${serial} (${model}, ${wood}) — ${name}`;
    const lines: [string, string][] = [
        ['Serial number', `#${serial}`],
        ['Model', model],
        ['Wood', wood],
        ['Sale type', `Direct sale — pickup at the Paris Hub — customer discount ${p?.discountPct ?? 7}% (showroom)`],
        ['Catalogue price (excl. VAT)', p ? fmtEur(p.basePrice, 'en') : ''],
        ['Discount', p ? `− ${fmtEur(p.discount, 'en')}` : ''],
        ['Price to customer (excl. VAT)', p ? fmtEur(p.subtotalHT, 'en') : ''],
        ['VAT', rc ? `Valid intra-EU VAT number → invoice excl. VAT (reverse charge)` : p ? `${p.vatRate}% (${p.countryCode}) — ${fmtEur(p.vatAmount, 'en')}` : 'to be charged'],
        ['Total to invoice', p ? fmtEur(rc ? p.subtotalHT : p.totalTTC, 'en') : ''],
        ['Customer', name],
        ['Billing name', b.name ?? ''],
        ['Billing address', billingAddressLine(b, 'en')],
        ['EU VAT number', b.vatNumber || 'none'],
        ['SIRET', b.siret ?? ''],
        ['Email', lead.email],
        ['Phone', lead.phone ?? ''],
    ];
    const intro = [
        'Hello Neotone team,',
        `The sale of Neotone #${serial} is confirmed. Could you please issue the invoice and send the payment link to the customer (in copy)? The details are below and in the shared Sheet (row of #${serial}).`,
        'The customer will pick up the instrument at the Paris Hub once it is paid.',
    ];
    const forCustomer = lead.lang === 'en'
        ? 'For the customer (in copy): the invoice and the card payment link come from szamlazz.hu, on weekdays — please check your spam folder. You can ask David for the proof of payment at any time.'
        : 'Pour le client (en copie) : la facture et le lien de paiement par carte viennent de szamlazz.hu, en semaine — pense à vérifier tes spams. Tu peux demander la preuve de paiement à David à tout moment.';
    const sign = ['Thank you!', 'Best regards,', 'David Lesage', 'Paris Hub — Neotone showroom', 'contact@lesagedavid.fr · lesagedavid.fr'];
    const text = `${intro.join('\n\n')}\n\n${lines.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${sign.join('\n')}\n\n—\n${forCustomer}\n`;
    const html = `<!doctype html><html lang="en"><head><meta charset="utf-8" /></head>
<body style="margin:0;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;font-size:15px;line-height:1.6;">
${intro.map((p) => `<p style="margin:0 0 14px;">${esc(p)}</p>`).join('')}
${rowsTable(lines)}
<p style="margin:18px 0 0;">${sign.map(esc).join('<br />')}</p>
<p style="margin:22px 0 0;padding-top:12px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:13px;">${esc(forCustomer)}</p>
</body></html>`;
    return { subject, text, html };
}

// ── Mail à David : facturation lancée (+ boutons payée / remise / annuler) ──
export function davidInvoiceLaunchedMail(lead: PurchaseLead, serial: string, opts: { neotoneSent: boolean; sheet: string; paidUrl: string; deliveredUrl: string; cancelUrl: string }) {
    const subject = `[Neotone] Facturation lancée — #${serial} — ${fullName(lead)}`;
    const html = card('fr', {
        title: `Facturation lancée : #${serial}`,
        paras: [
            `${esc(fullName(lead))} — ${esc(pairLabel(lead.neotone_model, lead.neotone_wood, 'fr'))}.`,
            `Mail à Neotone : ${opts.neotoneSent ? `✅ envoyé à ${NEOTONE_ORDERS_EMAIL} (toi et le client en copie)` : '⛔ NON envoyé — interrupteur NEOTONE_INVOICE_EMAIL_ENABLED à false (tu as reçu un aperçu)'}.`,
            `Sheet : ${esc(opts.sheet)}.`,
            'Tu es en copie des mails szamlazz : la facture définitive arrive après le paiement. Quand tu la vois, marque la demande « payée » ; le jour J, « remise ».',
        ],
        buttons: button(opts.paidUrl, 'Marquer payée') + button(opts.deliveredUrl, 'Marquer remise', false) + button(opts.cancelUrl, 'Annuler', false),
        foot: 'Liens personnels, valables 90 jours — ne les transfère pas.',
    });
    return { subject, html };
}

/** Bloc « actions » inséré dans la notification de site-lead à David. */
export function davidActionBlockHtml(opts: { caseNo: 1 | 2 | 3; primaryUrl: string; cancelUrl: string; partnerLine?: string }): string {
    const what = opts.caseNo === 1
        ? { title: 'Cas 1 — en stock au showroom', text: 'Choisis le n° de série dans la liste : le mail de facturation part chez Neotone (toi et le client en copie) et le Sheet est rempli.', label: 'Lancer la facturation chez Neotone' }
        : opts.caseNo === 2
        ? { title: 'Cas 2 — en route', text: 'Neotone ne reçoit rien. Ouvre la page : la date d’arrivée (colonne L) est pré-remplie, modifiable, et part au client avec un bouton « Oui, je confirme ».', label: 'Répondre au client' }
        : { title: 'Cas 3 — à fabriquer', text: 'Quand Neotone t’a répondu, ouvre la page, écris la date et envoie-la au client avec un bouton « Oui, je confirme ».', label: 'Répondre au client' };
    return `
        <tr><td style="padding:6px 28px 22px;">
          <div style="padding:14px 16px;background:#faf5ef;border:1px solid #e7d9c6;border-radius:12px;">
            <div style="font-size:16px;font-weight:700;color:#111827;margin-bottom:6px;">${esc(what.title)}</div>
            <p style="margin:0 0 10px;color:#374151;font-size:14px;line-height:1.6;">${esc(what.text)}</p>
            ${opts.partnerLine ? `<p style="margin:0 0 10px;color:#374151;font-size:13px;line-height:1.6;">Demande de délais à Neotone : ${esc(opts.partnerLine)}</p>` : ''}
            ${button(opts.primaryUrl, what.label)}${button(opts.cancelUrl, 'Annuler la demande', false)}
            <p style="margin:10px 0 0;color:#9ca3af;font-size:12px;">Liens personnels, valables 60 jours — ne les transfère pas.</p>
          </div>
        </td></tr>`;
}
