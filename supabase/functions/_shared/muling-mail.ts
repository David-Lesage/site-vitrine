// =============================================================================
// Mail « commande Muling » — UNE seule composition pour deux Edge Functions :
//   • muling-claim-payment : à chaque preuve de virement déposée par le client ;
//   • muling-resend-order  : bouton « 📧 Envoyer à Muling » du panneau Ventes.
//
// 16/10/2026 — incident RASMUS DAHLVIK : Muling a répondu « please provide the
// customer's phone number » parce que (1) le champ téléphone du formulaire était
// facultatif, donc la ligne `Phone:` du mail disparaissait en silence, et (2) la
// preuve de virement n'était PAS jointe au mail (« available in the shared
// dashboard »). Désormais : le téléphone est toujours une ligne du mail (avec une
// mention explicite s'il manque), la preuve de virement est en PIÈCE JOINTE, et
// l'adresse de livraison + les infos livreur y sont toujours.
// =============================================================================

import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';
import { mailSubject, textPart } from './mail.ts';

export const ADMIN_EMAIL = 'contact@lesagedavid.fr';
export const MULING_EMAIL = '85846599@qq.com';
export const DASHBOARD_URL = 'https://play.handpanstudio.app/';

/** Colonnes à lire dans `affiliate_sales` pour composer le mail. */
export const MULING_SALE_COLS =
    'id, email, phone, customer_name, quantity, price_discounted_eur, order_ref, '
    + 'shipping_address, shipping_city, shipping_postal_code, shipping_country, delivery_note, '
    + 'payment_proof_path, payment_claimed_at';

export interface MulingSale {
    id: string;
    email: string | null;
    phone: string | null;
    customer_name: string | null;
    quantity: number | null;
    price_discounted_eur: number | string | null;
    order_ref: string | null;
    shipping_address: string | null;
    shipping_city: string | null;
    shipping_postal_code: string | null;
    shipping_country: string | null;
    delivery_note: string | null;
    payment_proof_path: string | null;
    payment_claimed_at: string | null;
}

export interface ProofFile {
    bytes: Uint8Array;
    /** Extension du fichier dans le bucket : png | jpg | pdf. */
    ext: string;
}

const MIME_BY_EXT: Record<string, string> = {
    png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', pdf: 'application/pdf',
};

export interface SmtpEnv {
    host: string; user: string; pass: string; from: string; port: number;
    /** Tests locaux uniquement (faux serveur SMTP sans TLS) — jamais posé en production. */
    allowInsecure?: boolean;
}

export function smtpEnv(): SmtpEnv | null {
    const host = Deno.env.get('SMTP_HOST') ?? '';
    const user = Deno.env.get('SMTP_USER') ?? '';
    const pass = Deno.env.get('SMTP_PASS') ?? '';
    const from = Deno.env.get('SMTP_FROM') ?? user;
    const port = Number(Deno.env.get('SMTP_PORT') ?? '465');
    return host && user && pass && from ? { host, user, pass, from, port } : null;
}

/** base64 d'octets, par blocs (pas de `...spread` sur un gros fichier). */
function toBase64(bytes: Uint8Array): string {
    let bin = '';
    const CHUNK = 0x8000;
    for (let i = 0; i < bytes.length; i += CHUNK) bin += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
    return btoa(bin);
}

/** Relit la preuve de virement dans le bucket privé (service_role). `null` si absente. */
// deno-lint-ignore no-explicit-any
export async function downloadProof(admin: any, path: string | null): Promise<ProofFile | null> {
    if (!path) return null;
    const { data, error } = await admin.storage.from('muling-proofs').download(path);
    if (error || !data) {
        console.error('muling proof download error:', error);
        return null;
    }
    const ext = (path.split('.').pop() ?? '').toLowerCase();
    return { bytes: new Uint8Array(await data.arrayBuffer()), ext };
}

export interface MulingMail { subject: string; text: string; attachmentName: string | null }

/** Compose le texte du mail à Muling (anglais — Muling ne lit pas le français). */
export function composeMulingMail(sale: MulingSale, proof: ProofFile | null, resend: boolean): MulingMail {
    const name = sale.customer_name || sale.email || 'Customer';
    const ref = sale.order_ref ?? sale.id;
    const addr = [sale.shipping_address, sale.shipping_postal_code, sale.shipping_city, sale.shipping_country]
        .filter(Boolean).join(', ');
    const phone = String(sale.phone ?? '').trim();
    const attachmentName = proof ? `proof-of-payment-${ref}.${proof.ext}` : null;

    const text = [
        resend
            ? `Here are the full details of the order from ${name}${proof ? ', with their proof of payment attached' : ''}.`
            : `${name} has submitted proof of payment for their order.`,
        '',
        `Name: ${name}`,
        `Email: ${sale.email ?? '—'}`,
        phone
            ? `Phone: ${phone}`
            : 'Phone: NOT PROVIDED by the customer — we are asking them for it and will send it to you as soon as we have it.',
        `Quantity: ${sale.quantity ?? 1}x HMP-2`,
        `Amount: ${sale.price_discounted_eur} EUR`,
        `Reference: ${ref}`,
        addr ? `Shipping address: ${addr}` : 'Shipping address: —',
        sale.delivery_note ? `Delivery notes: ${sale.delivery_note}` : null,
        '',
        attachmentName
            ? `Proof of payment: attached to this email (${attachmentName}). It is also available in the shared dashboard.`
            : 'Proof of payment is available in the shared dashboard.',
        `Dashboard: ${DASHBOARD_URL}`,
    ].filter((l) => l !== null).join('\n');

    return {
        subject: `${resend ? 'Order details' : 'Payment proof submitted'} — ${name} (${ref})`,
        text,
        attachmentName,
    };
}

/**
 * Envoie un mail via le SMTP du projet. Retourne `true` si parti, `false` sinon
 * (l'erreur est journalisée : une panne de mail ne doit pas défaire une commande).
 */
export async function sendMail(
    env: SmtpEnv,
    msg: {
        to: string; cc?: string; subject: string; text: string;
        attachment?: { filename: string; bytes: Uint8Array; contentType: string } | null;
    },
): Promise<boolean> {
    const c = new SMTPClient({
        connection: { hostname: env.host, port: env.port, tls: env.port === 465, auth: { username: env.user, password: env.pass } },
        ...(env.allowInsecure ? { debug: { allowUnsecure: true } } : {}),
    });
    try {
        await c.send({
            from: env.from,
            to: msg.to,
            cc: msg.cc,
            subject: mailSubject(msg.subject),
            // ⚠️ Corps via `textPart()` (base64) — parade denomailer 1.6.0, cf. mail.ts.
            mimeContent: [textPart(msg.text)],
            ...(msg.attachment
                ? {
                    attachments: [{
                        filename: msg.attachment.filename,
                        content: toBase64(msg.attachment.bytes),
                        encoding: 'base64',
                        contentType: msg.attachment.contentType,
                    }],
                }
                : {}),
        });
        return true;
    } catch (e) {
        console.error('muling mail error:', e);
        return false;
    } finally {
        try { await c.close(); } catch { /* ignore */ }
    }
}

/** Compose + envoie le mail à Muling (David en copie), preuve de virement jointe. */
export async function sendMulingOrderMail(
    env: SmtpEnv, sale: MulingSale, proof: ProofFile | null, resend: boolean,
): Promise<boolean> {
    const mail = composeMulingMail(sale, proof, resend);
    return await sendMail(env, {
        to: MULING_EMAIL,
        cc: ADMIN_EMAIL,
        subject: mail.subject,
        text: mail.text,
        attachment: proof && mail.attachmentName
            ? { filename: mail.attachmentName, bytes: proof.bytes, contentType: MIME_BY_EXT[proof.ext] ?? 'application/octet-stream' }
            : null,
    });
}
