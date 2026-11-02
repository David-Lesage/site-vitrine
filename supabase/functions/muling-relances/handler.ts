// =============================================================================
// Edge Function : muling-relances (logique, testée par handler.test.ts). Règles : migration 0308
// du dépôt de l'app, calcul : _shared/muling-relances.ts.
//
// Portes : le planificateur (`x-reminders-secret`), envoi réel seulement interrupteur allumé et
// sans `dry_run` ; un admin connecté, toujours en `dry_run`. Le `dry_run` n'écrit rien, ne crée
// aucun lien, n'envoie rien, et sa réponse ne cite que des références.
// Chaque relance crée un lien neuf, ce qui invalide celui de l'e-mail précédent (règle de 0307 :
// un seul lien valide par commande). La page propose alors de redemander le lien.
// =============================================================================

import { lireBanque } from '../_shared/muling-banque.ts';
import { type AutreCommande, composerMailClient, urlPage } from '../_shared/muling-email-modele.ts';
import { ADMIN_EMAIL, sendMail, type SmtpEnv } from '../_shared/muling-mail.ts';
import { genererJeton, hacher, langueMail, LIEN_DUREE_JOURS } from '../_shared/muling-preuve.ts';
import {
    type CommandeRelance, type GroupeAlerte, type GroupeRelance, PALIER_ALERTE, planifier, TENTATIVES_MAX,
} from '../_shared/muling-relances.ts';

export interface Deps {
    // deno-lint-ignore no-explicit-any
    admin: any;
    env: SmtpEnv | null;
    secret: string;
    estAdmin: (req: Request) => Promise<boolean>;
    reponse: (req: Request, corps: unknown, statut?: number) => Response;
    maintenant?: () => Date;
    envoyerMail?: typeof sendMail;
}

const egal = (a: string, b: string) => {
    const x = new TextEncoder().encode(a);
    const y = new TextEncoder().encode(b);
    let d = x.length ^ y.length;
    for (let i = 0; i < Math.max(x.length, y.length); i++) d |= (x[i] ?? 0) ^ (y[i] ?? 0);
    return d === 0;
};

const prenomDe = (c: CommandeRelance) => String(c.customer_name ?? '').trim().split(/\s+/)[0] ?? '';

async function lienNeuf(deps: Deps, c: CommandeRelance, langue: 'fr' | 'en' | 'es') {
    const jeton = genererJeton();
    const { error } = await deps.admin.rpc('muling_lien_renouveler', {
        p_sale_id: c.id, p_hash: await hacher(jeton), p_jours: LIEN_DUREE_JOURS,
    });
    if (error) throw new Error('lien_impossible');
    return { urlDepot: urlPage(jeton, langue), urlAnnuler: urlPage(jeton, langue, true) };
}

/** Réserve, puis ne garde que les commandes réellement réservées. Rien de réservé : rien à faire. */
async function reserver(deps: Deps, commandes: CommandeRelance[], palier: number) {
    const lot = crypto.randomUUID();
    const { data, error } = await deps.admin.rpc('muling_relance_reserver', {
        p_sale_ids: commandes.map((c) => c.id), p_palier: palier, p_lot: lot, p_tentatives_max: TENTATIVES_MAX,
    });
    if (error) throw error;
    const ids = new Set((data ?? []) as string[]);
    return { lot, gardees: commandes.filter((c) => ids.has(c.id)) };
}

async function marquer(deps: Deps, lot: string, envoye: boolean, erreur: string | null = null) {
    const { error } = await deps.admin.rpc('muling_relance_marquer', { p_lot: lot, p_envoye: envoye, p_erreur: erreur });
    if (error) console.error('muling-relances marquer:', error.message);
}

async function relancer(deps: Deps, env: SmtpEnv, g: GroupeRelance, banque: Awaited<ReturnType<typeof lireBanque>>): Promise<boolean> {
    const { lot, gardees } = await reserver(deps, g.commandes, g.palier);
    if (!gardees.length) return false;
    try {
        const [tete, ...reste] = gardees;
        const langue = langueMail(tete.lang);
        const urls = await lienNeuf(deps, tete, langue);
        const autres: AutreCommande[] = [];
        for (const c of reste) {
            autres.push({
                reference: c.order_ref, quantite: c.quantity ?? 1, montant: c.price_discounted_eur ?? '',
                ...(await lienNeuf(deps, c, langue)),
            });
        }
        const mail = composerMailClient({
            langue, variante: 'relance', prenom: prenomDe(tete), reference: tete.order_ref,
            quantite: tete.quantity ?? 1, montant: tete.price_discounted_eur ?? '',
            showroom: tete.purchase_channel === 'showroom', banque, ...urls, autres,
        });
        const ok = await (deps.envoyerMail ?? sendMail)(env, {
            to: tete.email, replyTo: ADMIN_EMAIL, subject: mail.subject, text: mail.text, html: mail.html,
        });
        await marquer(deps, lot, ok, ok ? null : 'smtp');
        return ok;
    } catch (e) {
        await marquer(deps, lot, false, e instanceof Error ? e.message : 'erreur');
        return false;
    }
}

async function alerter(deps: Deps, env: SmtpEnv, groupes: GroupeAlerte[]): Promise<number> {
    const lots: string[] = [];
    const lignes: string[] = [];
    for (const g of groupes) {
        const { lot, gardees } = await reserver(deps, g.commandes, PALIER_ALERTE);
        if (!gardees.length) continue;
        lots.push(lot);
        const refs = gardees.map((c) => `${c.order_ref} (${c.price_discounted_eur ?? '?'} EUR)`).join(', ');
        const motif = g.motif === 'envoi_echoue' ? 'relance impossible à envoyer, 3 essais' : 'toutes les relances sont parties, sans preuve';
        lignes.push(`- ${gardees[0].customer_name ?? ''} <${gardees[0].email}> : ${refs}. J+${g.jours}, ${motif}.`);
    }
    if (!lots.length) return 0;
    const ok = await (deps.envoyerMail ?? sendMail)(env, {
        to: ADMIN_EMAIL,
        subject: `Muling : ${lots.length} client(s) sans preuve après les relances`,
        text: [
            'Ces commandes restent ouvertes : aucune annulation automatique, et plus aucune relance ne partira.',
            '', ...lignes, '', 'À toi de voir : tableau de bord, Ventes, bloc « En attente de paiement ».',
        ].join('\n'),
    });
    for (const lot of lots) await marquer(deps, lot, ok, ok ? null : 'smtp');
    return ok ? lots.length : 0;
}

export async function traiter(req: Request, deps: Deps): Promise<Response> {
    const rep = (corps: unknown, statut = 200) => deps.reponse(req, corps, statut);
    if (req.method !== 'POST') return rep({ error: 'Method not allowed' }, 405);
    const fourni = req.headers.get('x-reminders-secret') ?? '';
    const parSecret = !!deps.secret && !!fourni && egal(fourni, deps.secret);
    if (!parSecret && !(await deps.estAdmin(req))) return rep({ error: 'forbidden' }, 403);
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const dryRun = !parSecret || body.dry_run === true;

    const { data: reglages, error: regErr } = await deps.admin.from('muling_relances_reglages').select('actif').maybeSingle();
    if (regErr) throw regErr;
    const actif = reglages?.actif === true;
    if (!actif && !dryRun) return rep({ actif: false, relances: 0, alertes: 0 });

    const { data: etat, error: etatErr } = await deps.admin.rpc('muling_relances_etat');
    if (etatErr) throw etatErr;
    const plan = planifier((etat ?? []) as CommandeRelance[], (deps.maintenant ?? (() => new Date()))());

    if (dryRun) {
        return rep({
            dry_run: true, actif,
            relances: plan.relances.map((g) => ({ palier: g.palier, references: g.commandes.map((c) => c.order_ref) })),
            alertes: plan.alertes.map((g) => ({ motif: g.motif, references: g.commandes.map((c) => c.order_ref) })),
        });
    }
    if (!deps.env) return rep({ error: 'mail_non_configure' }, 500);
    // Une relance sans IBAN n'aide personne : rien ne part, et rien n'est consommé.
    const banque = await lireBanque(deps.admin);
    if (!banque) return rep({ error: 'banque_vide' }, 409);

    let relances = 0;
    for (const g of plan.relances) if (await relancer(deps, deps.env, g, banque)) relances += 1;
    const alertes = await alerter(deps, deps.env, plan.alertes);
    return rep({ actif: true, relances, alertes });
}
