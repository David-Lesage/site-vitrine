// =============================================================================
// Dépôt d'une preuve de virement, un seul chemin : `muling-claim-payment` (ancien lien) et
// `muling-proof-link` (lien personnel). Écrit le fichier, enregistre atomiquement (RPC 0307),
// puis prévient Muling (preuve jointe, David en copie) et confirme au client.
//
// Commande fusionnée : le mail à Muling porte la référence de la commande CONSERVÉE, jamais celle
// de l'archive. Si la conservée avait déjà sa preuve, elle est déjà chez Muling : seul David est
// prévenu, pièce jointe à l'appui.
// Une panne de mail ne défait pas le dépôt : la preuve reste dans le tableau de bord.
// =============================================================================

import {
    ADMIN_EMAIL, MULING_SALE_COLS, type MulingSale, sendMail, sendMulingOrderMail, type SmtpEnv,
} from './muling-mail.ts';
import { composerConfirmationDepot } from './muling-email-modele.ts';
import { type FichierPreuve, langueMail } from './muling-preuve.ts';

export const BUCKET_PREUVES = 'muling-proofs';

export type ResultatDepot =
    | { ok: true; transmis: boolean }
    | { ok: false; error: 'order_cancelled' | 'not_found' | 'already_deposited' };

export interface DepotDeps {
    // deno-lint-ignore no-explicit-any
    admin: any;
    env: SmtpEnv | null;
    envoyerMail?: typeof sendMail;
    envoyerMuling?: typeof sendMulingOrderMail;
}

export async function deposerPreuve(
    deps: DepotDeps, sale: MulingSale, fichier: FichierPreuve,
    opts: { langue?: unknown; exigerSansPreuve: boolean },
): Promise<ResultatDepot> {
    const { admin, env } = deps;
    const envoyerMail = deps.envoyerMail ?? sendMail;
    const envoyerMuling = deps.envoyerMuling ?? sendMulingOrderMail;

    const path = `${sale.id}/${Date.now()}.${fichier.ext}`;
    const { error: upErr } = await admin.storage.from(BUCKET_PREUVES).upload(path, fichier.bytes, {
        contentType: fichier.mime, upsert: false,
    });
    if (upErr) throw upErr;

    const { data: resultat, error: rpcErr } = await admin.rpc('muling_preuve_enregistrer', {
        p_sale_id: sale.id, p_path: path, p_exiger_sans_preuve: opts.exigerSansPreuve,
    });
    if (rpcErr || resultat !== 'ok') {
        // Rien n'a été enregistré : pas de fichier orphelin.
        await admin.storage.from(BUCKET_PREUVES).remove([path]).catch?.(() => {});
        if (rpcErr) throw rpcErr;
        return {
            ok: false,
            error: resultat === 'annulee' ? 'order_cancelled' : resultat === 'deja_deposee' ? 'already_deposited' : 'not_found',
        };
    }

    // Relecture : la commande à annoncer et, si fusion, l'état après le déclencheur de 0306.
    const cibleId = sale.merged_into_id ?? sale.id;
    const { data: ligne, error: luErr } = await admin.from('affiliate_sales').select(MULING_SALE_COLS).eq('id', cibleId).maybeSingle();
    if (luErr) console.error('muling depot relecture:', luErr);
    const cible = (ligne ?? sale) as MulingSale;
    const preuveRemontee = !sale.merged_into_id || cible.payment_proof_path === path;

    if (!env) return { ok: true, transmis: false };
    const preuve = { bytes: fichier.bytes, ext: fichier.ext };
    const ref = cible.order_ref ?? cible.id;
    let transmis = false;
    if (preuveRemontee) {
        transmis = await envoyerMuling(env, { ...cible, payment_proof_path: path }, preuve, false);
    } else {
        await envoyerMail(env, {
            to: ADMIN_EMAIL,
            subject: `Muling : seconde preuve sur une commande fusionnée — ${ref}`,
            text: `Une preuve a été déposée via un ancien lien (${sale.order_ref ?? sale.id}, archivée). La commande conservée ${ref} avait déjà une preuve : celle-ci n'a PAS été envoyée à Muling. Elle est jointe pour contrôle.`,
            attachment: { filename: `preuve-${ref}.${fichier.ext}`, bytes: fichier.bytes, contentType: fichier.mime },
        });
    }

    const conf = composerConfirmationDepot(
        langueMail(opts.langue ?? cible.lang), cible.customer_name ?? cible.email ?? '', ref,
        cible.quantity ?? 1, cible.price_discounted_eur ?? '',
    );
    const destinataire = cible.email ?? sale.email;
    if (destinataire) await envoyerMail(env, { to: destinataire, replyTo: ADMIN_EMAIL, subject: conf.subject, text: conf.text });
    return { ok: true, transmis };
}
