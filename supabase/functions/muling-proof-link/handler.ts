// =============================================================================
// Edge Function : muling-proof-link (logique, testée par handler.test.ts).
//
// Opérations publiques, via /api/muling-proof-link.js, protégées par SITE_LEAD_TOKEN :
//   recognize {email}            → {open}. Rien d'autre : ni nom, ni montant, ni référence.
//   resume    {email, lang}      → {ok}. Envoie le lien par e-mail s'il y a lieu ; même réponse sinon.
//   view      {t}                → référence et montant, le strict nécessaire à la page.
//   deposit   {t, fileBase64, lang}
//   cancel    {t, confirm:true}  → l'ouverture du lien ne fait rien, seule cette requête annule.
// Opérations admin, avec le JWT de l'appelant (`is_site_admin()`) :
//   admin_preview {saleId}       → sujet + HTML avec de faux liens : aucun jeton créé.
//   admin_send    {saleId}       → crée le lien (révoque le précédent) et envoie.
//
// Le jeton n'est jamais journalisé ni stocké en clair (voir migration 0307).
// =============================================================================

import { deposerPreuve } from '../_shared/muling-depot.ts';
import { lireBanque } from '../_shared/muling-banque.ts';
import {
    composerConfirmationAnnulation, composerMailClient, type LangueMail, urlPage, type VarianteMail,
} from '../_shared/muling-email-modele.ts';
import {
    ADMIN_EMAIL, composeMulingMail, MULING_EMAIL, MULING_SALE_COLS, type MulingSale, sendMail,
    sendMulingOrderMail, type SmtpEnv,
} from '../_shared/muling-mail.ts';
import {
    genererJeton, hacher, JETON_RE, langueMail, LIEN_DUREE_JOURS, lirePreuve,
    ouverteSansPreuve,
} from '../_shared/muling-preuve.ts';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const HEURE = 3600;
const OPS_PUBLIQUES = ['recognize', 'resume', 'view', 'deposit', 'cancel'];

export interface Deps {
    // deno-lint-ignore no-explicit-any
    admin: any;
    env: SmtpEnv | null;
    siteToken: string;
    estAdmin: (req: Request) => Promise<boolean>;
    reponse: (req: Request, corps: unknown, statut?: number) => Response;
    envoyerMail?: typeof sendMail;
    envoyerMuling?: typeof sendMulingOrderMail;
}

const prenomDe = (s: MulingSale) => String(s.customer_name ?? '').trim().split(/\s+/)[0] ?? '';
const montantDe = (s: MulingSale) => s.price_discounted_eur ?? '';

/** Crée un lien neuf (le précédent est révoqué) et renvoie les données du mail. */
async function nouveauLien(deps: Deps, s: MulingSale, langue: LangueMail): Promise<{ urlDepot: string; urlAnnuler: string }> {
    const jeton = genererJeton();
    const { error } = await deps.admin.rpc('muling_lien_renouveler', {
        p_sale_id: s.id, p_hash: await hacher(jeton), p_jours: LIEN_DUREE_JOURS,
    });
    if (error) throw error;
    return { urlDepot: urlPage(jeton, langue), urlAnnuler: urlPage(jeton, langue, true) };
}

async function envoyerLien(deps: Deps, s: MulingSale, langue: LangueMail, variante: VarianteMail): Promise<boolean> {
    if (!deps.env || !s.email) return false;
    const urls = await nouveauLien(deps, s, langue);
    const mail = composerMailClient({
        langue, variante, prenom: prenomDe(s), reference: String(s.order_ref), quantite: s.quantity ?? 1,
        montant: montantDe(s), showroom: s.purchase_channel === 'showroom',
        banque: await lireBanque(deps.admin), ...urls,
    });
    return await (deps.envoyerMail ?? sendMail)(deps.env, {
        to: s.email, replyTo: ADMIN_EMAIL, subject: mail.subject, text: mail.text, html: mail.html,
    });
}

/** Commandes ouvertes sans preuve de cet e-mail, la plus récente d'abord. */
async function commandesOuvertes(deps: Deps, email: string): Promise<MulingSale[]> {
    // ilike sans joker : `_` et `%` sont échappés, la comparaison finale reste exacte.
    const motif = email.replace(/[\\%_]/g, (c) => `\\${c}`);
    const { data, error } = await deps.admin.from('affiliate_sales').select(MULING_SALE_COLS)
        .eq('partner', 'muling').ilike('email', motif).is('deleted_at', null)
        .order('created_at', { ascending: false }).limit(20);
    if (error) throw error;
    return ((data ?? []) as MulingSale[]).filter((s) =>
        String(s.email ?? '').trim().toLowerCase() === email && ouverteSansPreuve(s));
}

async function lireCommande(deps: Deps, id: string): Promise<MulingSale | null> {
    const { data, error } = await deps.admin.from('affiliate_sales').select(MULING_SALE_COLS)
        .eq('id', id).eq('partner', 'muling').maybeSingle();
    if (error) throw error;
    return data as MulingSale | null;
}

/** La tentative est-elle permise pour TOUTES ces clés ? */
async function permis(deps: Deps, regles: [string, number][]): Promise<boolean> {
    for (const [cle, max] of regles) {
        const { data, error } = await deps.admin.rpc('muling_lien_tentative', {
            p_cle: await hacher(`muling:${cle}`), p_fenetre_secondes: HEURE, p_max: max,
        });
        if (error) throw error;
        if (data !== true) return false;
    }
    return true;
}

export async function traiter(req: Request, deps: Deps): Promise<Response> {
    const rep = (corps: unknown, statut = 200) => deps.reponse(req, corps, statut);
    if (req.method !== 'POST') return rep({ error: 'Method not allowed' }, 405);
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const op = String(body.op ?? '');

    // ── Admin ───────────────────────────────────────────────────────────────
    if (op === 'admin_preview' || op === 'admin_send') {
        if (!(await deps.estAdmin(req))) return rep({ error: 'forbidden' }, 403);
        const saleId = String(body.saleId ?? '');
        if (!UUID.test(saleId)) return rep({ error: 'commande_introuvable' }, 400);
        const s = await lireCommande(deps, saleId);
        if (!s) return rep({ error: 'commande_introuvable' }, 404);
        if (!ouverteSansPreuve(s)) return rep({ error: 'commande_indisponible' }, 409);
        if (!s.email) return rep({ error: 'commande_sans_email' }, 409);
        const banque = await lireBanque(deps.admin);
        if (!banque) return rep({ error: 'banque_vide' }, 409);
        const langue = langueMail(s.lang);
        if (op === 'admin_preview') {
            const mail = composerMailClient({
                langue, variante: 'admin', prenom: prenomDe(s), reference: String(s.order_ref),
                quantite: s.quantity ?? 1, montant: montantDe(s), showroom: s.purchase_channel === 'showroom',
                banque, urlDepot: '#apercu', urlAnnuler: '#apercu',
            });
            return rep({ to: s.email, subject: mail.subject, html: mail.html });
        }
        if (!deps.env) return rep({ error: 'mail_non_configure' }, 500);
        const envoye = await envoyerLien(deps, s, langue, 'admin');
        return envoye ? rep({ ok: true }) : rep({ error: 'mail_echoue' }, 502);
    }

    // ── Public : fermé si le secret manque, contrairement à un contrôle facultatif. ──
    if (!OPS_PUBLIQUES.includes(op)) return rep({ error: 'unknown_op' }, 400);
    if (!deps.siteToken || req.headers.get('x-site-token') !== deps.siteToken) return rep({ error: 'Forbidden' }, 403);
    const ip = (req.headers.get('x-client-ip') ?? '').trim() || 'inconnue';

    if (op === 'recognize' || op === 'resume') {
        const email = String(body.email ?? '').trim().toLowerCase();
        if (!EMAIL_RE.test(email)) return rep({ error: 'invalid_email' }, 400);
        const regles: [string, number][] = op === 'recognize'
            ? [[`reco-ip:${ip}`, 20], [`reco-mail:${email}`, 8]]
            : [[`resume-ip:${ip}`, 10], [`resume-mail:${email}`, 3]];
        if (!(await permis(deps, regles))) return rep({ error: 'too_many_attempts' }, 429);
        const ouvertes = await commandesOuvertes(deps, email);
        if (op === 'recognize') return rep({ open: ouvertes.length > 0 });
        if (ouvertes[0]) {
            const langue = body.lang ? langueMail(body.lang) : langueMail(ouvertes[0].lang);
            await envoyerLien(deps, ouvertes[0], langue, 'lien');
        }
        return rep({ ok: true });
    }

    // ── Par jeton ───────────────────────────────────────────────────────────
    const jeton = String(body.t ?? '');
    const regles: [string, number][] = op === 'view' ? [[`vue-ip:${ip}`, 60]] : [[`action-ip:${ip}`, 20]];
    if (!(await permis(deps, regles))) return rep({ error: 'too_many_attempts' }, 429);
    if (!JETON_RE.test(jeton)) return rep({ error: 'invalid_link' }, 404);
    const hash = await hacher(jeton);

    if (op === 'cancel') {
        if (body.confirm !== true) return rep({ error: 'confirmation_required' }, 400);
        const { data, error } = await deps.admin.rpc('muling_annuler_par_lien', {
            p_hash: hash, p_motif: 'Annulée par le client depuis son lien',
        });
        if (error) throw error;
        if (data?.resultat === 'lien_invalide') return rep({ error: 'invalid_link' }, 404);
        if (data?.resultat !== 'ok') return rep({ error: 'order_locked' }, 409);
        const s = await lireCommande(deps, data.sale_id);
        await notifierAnnulation(deps, s, data.preuve_transmise === true);
        return rep({ ok: true });
    }

    const { data: saleId, error: resoErr } = await deps.admin.rpc('muling_lien_resoudre', { p_hash: hash });
    if (resoErr) throw resoErr;
    const s = saleId ? await lireCommande(deps, saleId as string) : null;
    if (!s || !ouverteSansPreuve(s)) return rep({ error: 'invalid_link' }, 404);

    if (op === 'view') {
        return rep({
            ok: true, ref: s.order_ref, amount: s.price_discounted_eur, currency: 'EUR',
            showroom: s.purchase_channel === 'showroom', lang: langueMail(s.lang),
        });
    }

    // deposit
    if (!(await permis(deps, [[`depot:${hash}`, 10]]))) return rep({ error: 'too_many_attempts' }, 429);
    const lu = lirePreuve(body.fileBase64);
    if (!lu.ok) return rep({ error: lu.error }, lu.error === 'file_too_large' ? 413 : 400);
    const depot = await deposerPreuve(
        { admin: deps.admin, env: deps.env, envoyerMail: deps.envoyerMail, envoyerMuling: deps.envoyerMuling },
        s, lu.fichier,
        { langue: body.lang, exigerSansPreuve: true },
    );
    if (!depot.ok) return rep({ error: depot.error }, depot.error === 'not_found' ? 404 : 409);
    return rep({ ok: true });
}

async function notifierAnnulation(deps: Deps, s: MulingSale | null, preuveTransmise: boolean): Promise<void> {
    if (!deps.env || !s) return;
    const envoyer = deps.envoyerMail ?? sendMail;
    const ref = s.order_ref ?? s.id;
    await envoyer(deps.env, {
        to: ADMIN_EMAIL,
        subject: `Muling : commande annulée par le client — ${ref}`,
        text: `${s.customer_name ?? s.email ?? ''} a annulé la commande ${ref} depuis son lien.`
            + (preuveTransmise ? '\nUne preuve avait été transmise : Muling est prévenu. Vérifier un éventuel remboursement.' : '\nAucune preuve transmise : Muling n’a rien reçu et n’est pas prévenu.'),
    });
    if (preuveTransmise) {
        const base = composeMulingMail(s, null, true);
        await envoyer(deps.env, {
            to: MULING_EMAIL, cc: ADMIN_EMAIL,
            subject: `ORDER CANCELLED by the customer — ${ref}. DO NOT SHIP`,
            text: `The customer cancelled this order after sending a proof of payment. DO NOT SHIP. We will get back to you about any refund.\n\n${base.text}`,
        });
    }
    if (s.email) {
        const c = composerConfirmationAnnulation(langueMail(s.lang), String(ref));
        await envoyer(deps.env, { to: s.email, replyTo: ADMIN_EMAIL, subject: c.subject, text: c.text });
    }
}
