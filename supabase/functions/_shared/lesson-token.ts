// =============================================================================
// Jeton signé d'un lien « un clic » de confirmation de créneau
// =============================================================================
// Sert deux fonctions :
//   • `site-lead`            SIGNE un jeton par créneau proposé, et met le lien
//                            dans l'email de notification envoyé à David ;
//   • `confirm-lesson-slot`  VÉRIFIE ce jeton quand David clique.
//
// MÊME PATRON que le `state` OAuth de l'Edge Function `google-calendar` de l'app
// (charge utile en clair + HMAC-SHA256 en base64url + comparaison à temps
// constant + expiration) — volontairement, pour n'avoir qu'un seul mécanisme de
// lien signé à comprendre et à auditer dans tout le projet.
//
// ── CLÉ DE SIGNATURE ─────────────────────────────────────────────────────────
// `LESSON_CONFIRM_SECRET` si le secret existe, sinon repli sur des secrets déjà
// présents dans le projet. Le repli n'est PAS un raccourci de confort : il rend
// la fonction opérationnelle sans aucune manipulation, et poser plus tard
// `LESSON_CONFIRM_SECRET` fait office de ROTATION (tous les liens en circulation
// deviennent invalides d'un coup).
//
// La clé ne sort jamais de la fonction : elle ne sert qu'à calculer un HMAC, et
// un HMAC ne permet pas de remonter à sa clé. Le préfixe de domaine ci-dessous
// empêche par ailleurs qu'un jeton signé pour un autre usage (désabonnement…)
// puisse être rejoué ici, et réciproquement.
// =============================================================================

/** Préfixe de séparation de domaine : un jeton d'ici ne vaut QUE pour ici. */
const DOMAIN = 'lesson-slot.v1';

function signingKey(): string {
    return (
        Deno.env.get('LESSON_CONFIRM_SECRET') ||
        Deno.env.get('UNSUB_SECRET') ||
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ||
        ''
    );
}

/** `true` si une clé est disponible (sinon : ne pas produire de lien). */
export function canSignSlotTokens(): boolean {
    return signingKey().length >= 16;
}

function b64url(bytes: Uint8Array): string {
    let bin = '';
    for (const b of bytes) bin += String.fromCharCode(b);
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmac(payload: string): Promise<string> {
    const key = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(signingKey()),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign'],
    );
    const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${DOMAIN}.${payload}`));
    return b64url(new Uint8Array(sig));
}

export interface SlotToken {
    lessonId: string;
    /** Créneau retenu, en ISO UTC. */
    slotIso: string;
}

/**
 * Durée de vie d'un lien. Deux contraintes se cumulent :
 *   • au moins 30 jours (David peut répondre à un email une semaine plus tard) ;
 *   • et au moins jusqu'au lendemain du créneau lui-même (un créneau proposé à
 *     45 jours ne doit pas avoir un lien déjà périmé quand il arrive).
 */
export function slotTokenExpiry(slotIso: string): number {
    const THIRTY_DAYS = 30 * 24 * 3600 * 1000;
    const slotMs = new Date(slotIso).getTime();
    const floor = Date.now() + THIRTY_DAYS;
    const afterSlot = Number.isFinite(slotMs) ? slotMs + 24 * 3600 * 1000 : 0;
    return Math.max(floor, afterSlot);
}

/** Jeton opaque : `<lessonId>.<slotMs>.<expMs>.<signature>`. */
export async function signSlotToken(lessonId: string, slotIso: string): Promise<string | null> {
    if (!canSignSlotTokens()) return null;
    const slotMs = new Date(slotIso).getTime();
    if (!Number.isFinite(slotMs)) return null;
    const expMs = slotTokenExpiry(slotIso);
    const payload = `${lessonId}.${slotMs}.${expMs}`;
    return `${payload}.${await hmac(payload)}`;
}

/** Rend la charge utile si le jeton est authentique ET non expiré, sinon `null`. */
export async function verifySlotToken(token: string): Promise<SlotToken | null> {
    if (!canSignSlotTokens()) return null;
    const parts = String(token || '').split('.');
    if (parts.length !== 4) return null;
    const [lessonId, slotRaw, expRaw, sig] = parts;

    // UUID attendu : on rejette tout de suite ce qui n'en est pas un.
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(lessonId)) return null;
    const slotMs = Number(slotRaw);
    const expMs = Number(expRaw);
    if (!Number.isFinite(slotMs) || !Number.isFinite(expMs)) return null;

    const expected = await hmac(`${lessonId}.${slotRaw}.${expRaw}`);
    if (sig.length !== expected.length) return null;
    let diff = 0;
    for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
    if (diff !== 0) return null;

    if (expMs < Date.now()) return null;
    return { lessonId, slotIso: new Date(slotMs).toISOString() };
}
