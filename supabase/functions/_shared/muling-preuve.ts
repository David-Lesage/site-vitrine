// =============================================================================
// Briques pures des liens de dépôt Muling : jetons, contrôle réel des fichiers,
// état d'une commande. Aucun accès réseau ni base : testées par muling-preuve.test.ts.
// =============================================================================

/** 3 Mo partout : le relais Vercel plafonne le corps à 4,5 Mo, base64 compris. */
export const MAX_PROOF_BYTES = 3 * 1024 * 1024;
export const LIEN_DUREE_JOURS = 30;

export const JETON_RE = /^[A-Za-z0-9_-]{43}$/;

function versBase64Url(octets: Uint8Array): string {
    let bin = '';
    for (const o of octets) bin += String.fromCharCode(o);
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** 256 bits aléatoires, en base64url (43 caractères). */
export function genererJeton(): string {
    return versBase64Url(crypto.getRandomValues(new Uint8Array(32)));
}

/** Empreinte SHA-256 en hexadécimal : la seule forme stockée. */
export async function hacher(texte: string): Promise<string> {
    const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texte));
    return [...new Uint8Array(d)].map((o) => o.toString(16).padStart(2, '0')).join('');
}

export interface FichierPreuve { bytes: Uint8Array; ext: string; mime: string }

/** Type réel d'après les premiers octets. Le type annoncé par le navigateur n'est pas une preuve. */
export function typeReel(o: Uint8Array): { ext: string; mime: string } | null {
    const debut = (sig: number[]) => o.length >= sig.length && sig.every((v, i) => o[i] === v);
    if (debut([0x25, 0x50, 0x44, 0x46, 0x2d])) return { ext: 'pdf', mime: 'application/pdf' };
    if (debut([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return { ext: 'png', mime: 'image/png' };
    if (debut([0xff, 0xd8, 0xff])) return { ext: 'jpg', mime: 'image/jpeg' };
    return null;
}

export type ResultatFichier =
    | { ok: true; fichier: FichierPreuve }
    | { ok: false; error: 'missing_file' | 'file_too_large' | 'invalid_file_type' };

export function lirePreuve(base64: unknown): ResultatFichier {
    const b64 = typeof base64 === 'string' ? base64 : '';
    if (!b64) return { ok: false, error: 'missing_file' };
    // Bornée AVANT décodage : base64 gonfle la taille de 4/3.
    if (b64.length > Math.ceil(MAX_PROOF_BYTES * 4 / 3) + 4) return { ok: false, error: 'file_too_large' };
    let bytes: Uint8Array;
    try {
        bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    } catch {
        return { ok: false, error: 'invalid_file_type' };
    }
    if (bytes.byteLength > MAX_PROOF_BYTES) return { ok: false, error: 'file_too_large' };
    const t = typeReel(bytes);
    if (!t) return { ok: false, error: 'invalid_file_type' };
    return { ok: true, fichier: { bytes, ...t } };
}

export interface EtatCommande {
    partner?: string | null;
    order_ref?: string | null;
    email?: string | null;
    status?: string | null;
    fulfillment_status?: string | null;
    deleted_at?: string | null;
    merged_into_id?: string | null;
    cancelled_at?: string | null;
    payment_proof_path?: string | null;
    payment_claimed_at?: string | null;
    shipped_at?: string | null;
    partner_shipping_started_at?: string | null;
    invoiced_at?: string | null;
    invoice_ref?: string | null;
    facture_partenaire_id?: string | null;
    commission_paid_on?: string | null;
}

export function estAnnulee(s: EtatCommande): boolean {
    return !!s.cancelled_at || s.fulfillment_status === 'cancelled' || s.status === 'no_sale';
}

/** Commande ouverte sans preuve : la seule qui reçoit un lien ou se reconnaît sur le formulaire. Même règle que `commande_muling_blocage` (0307). */
export function ouverteSansPreuve(s: EtatCommande): boolean {
    return s.partner === 'muling'
        && !!String(s.order_ref ?? '').trim()
        && !s.deleted_at && !s.merged_into_id
        && !estAnnulee(s)
        && !s.payment_proof_path && !s.payment_claimed_at
        && !['shipped', 'delivered'].includes(String(s.fulfillment_status ?? 'new'))
        && !s.shipped_at && !s.partner_shipping_started_at
        && !['invoiced', 'paid'].includes(String(s.status ?? ''))
        && !s.invoiced_at && !s.invoice_ref && !s.facture_partenaire_id && !s.commission_paid_on;
}

export function langueMail(l: unknown): 'fr' | 'en' | 'es' {
    const c = String(l ?? '').trim().slice(0, 2).toLowerCase();
    return c === 'fr' || c === 'es' ? c : 'en';
}
