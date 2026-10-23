// =============================================================================
// Jeton signé des liens « en un clic » du processus d'achat Neotone (25/10/2026)
// =============================================================================
// MÊME PATRON que `_shared/lesson-token.ts` (charge utile en clair + HMAC-SHA256
// base64url + comparaison à temps constant + expiration), avec son PROPRE
// préfixe de domaine : un jeton de créneau ne vaut rien ici, et réciproquement.
//
// Charge utile : `<leadId>.<action>.<rev>.<expMs>`
//   · leadId : la ligne `site_leads` — un lien ne marche QUE pour SA demande ;
//   · action : ce que le lien a le droit de faire (voir PURCHASE_ACTIONS) ;
//   · rev    : numéro de la proposition de date (`neotone_proposed_rev`). Le
//              lien « Oui, je confirme » d'une ancienne proposition devient
//              caduc dès que David en propose une autre : USAGE UNIQUE de fait.
//              Les actions de David portent rev = 0 (non vérifié) ;
//   · expMs  : expiration.
// L'usage unique des autres actions est assuré par la MACHINE À ÉTATS
// (neotone-purchase-action) : chaque action n'est permise que depuis certains
// états, et l'écriture est conditionnée à l'état lu (pas de double envoi).
//
// Clé : `NEOTONE_PURCHASE_SECRET`, sinon repli sur les secrets déjà présents
// (comme lesson-token). Poser le secret plus tard = rotation de tous les liens.
// =============================================================================

const DOMAIN = 'neotone-purchase.v1';

export const PURCHASE_ACTIONS = ['reply', 'confirm', 'invoice', 'paid', 'delivered', 'cancel'] as const;
export type PurchaseAction = typeof PURCHASE_ACTIONS[number];

/** Actions réservées à David (les liens partent dans SES mails uniquement). */
export const DAVID_ACTIONS: PurchaseAction[] = ['reply', 'invoice', 'paid', 'delivered', 'cancel'];

const DAY = 24 * 3600 * 1000;
/** Durées de vie : 60 jours pour David (une pièce « en route » peut mettre un mois), 30 jours pour le client. */
export const TOKEN_TTL: Record<PurchaseAction, number> = {
    reply: 60 * DAY, invoice: 60 * DAY, paid: 90 * DAY, delivered: 90 * DAY, cancel: 90 * DAY,
    confirm: 30 * DAY,
};

function signingKey(): string {
    return (
        Deno.env.get('NEOTONE_PURCHASE_SECRET') ||
        Deno.env.get('LESSON_CONFIRM_SECRET') ||
        Deno.env.get('UNSUB_SECRET') ||
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ||
        ''
    );
}

export function canSignPurchaseTokens(): boolean {
    return signingKey().length >= 16;
}

function b64url(bytes: Uint8Array): string {
    let bin = '';
    for (const b of bytes) bin += String.fromCharCode(b);
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmac(payload: string): Promise<string> {
    const key = await crypto.subtle.importKey(
        'raw', new TextEncoder().encode(signingKey()), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
    );
    const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${DOMAIN}.${payload}`));
    return b64url(new Uint8Array(sig));
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function signPurchaseToken(leadId: string, action: PurchaseAction, rev = 0, now = Date.now()): Promise<string | null> {
    if (!canSignPurchaseTokens() || !UUID_RE.test(leadId) || !PURCHASE_ACTIONS.includes(action)) return null;
    const exp = now + TOKEN_TTL[action];
    const payload = `${leadId}.${action}.${Math.max(0, Math.floor(rev))}.${exp}`;
    return `${payload}.${await hmac(payload)}`;
}

export interface PurchaseToken { leadId: string; action: PurchaseAction; rev: number; exp: number }

/** Charge utile si le jeton est authentique ET non expiré, sinon `null`. */
export async function verifyPurchaseToken(token: string, now = Date.now()): Promise<PurchaseToken | null> {
    if (!canSignPurchaseTokens()) return null;
    const parts = String(token || '').split('.');
    if (parts.length !== 5) return null;
    const [leadId, action, revRaw, expRaw, sig] = parts;
    if (!UUID_RE.test(leadId)) return null;
    if (!PURCHASE_ACTIONS.includes(action as PurchaseAction)) return null;
    if (!/^\d{1,6}$/.test(revRaw) || !/^\d{1,16}$/.test(expRaw)) return null;
    const expected = await hmac(`${leadId}.${action}.${revRaw}.${expRaw}`);
    if (sig.length !== expected.length) return null;
    let diff = 0;
    for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
    if (diff !== 0) return null;
    const exp = Number(expRaw);
    if (exp < now) return null;
    return { leadId, action: action as PurchaseAction, rev: Number(revRaw), exp };
}

/** Lien vers la page de suivi du site (la passerelle Supabase ne sert pas de HTML). */
export function purchaseActionUrl(site: string, token: string, lang: string): string {
    return `${site}/neotone-suivi/?l=${lang === 'en' ? 'en' : 'fr'}&t=${encodeURIComponent(token)}`;
}
