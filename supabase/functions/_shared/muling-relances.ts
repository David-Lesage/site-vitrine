// =============================================================================
// Calcul pur des relances Muling : qui relancer, à quel palier. Aucun réseau ni base.
//
// Un client a un seul calendrier, quel que soit son nombre de commandes ouvertes : il part de
// la commande entrée la première dans le circuit. Une commande arrivée en cours de route rejoint
// le prochain e-mail au palier du groupe. Après une panne, seul le dernier palier échu part :
// jamais de rattrapage en rafale, et 24 h au moins entre deux e-mails.
// =============================================================================

export const PALIERS = [1, 3, 7, 14] as const;
export const PALIER_ALERTE = 99;
/** L'alerte à David part le lendemain de la dernière relance : le client a pu réagir entre-temps. */
export const JOUR_ALERTE = 15;
export const TENTATIVES_MAX = 3;
const JOUR_MS = 24 * 3600 * 1000;

export interface LigneJournal {
    palier: number;
    statut: 'reserve' | 'envoye' | 'echec';
    tentatives: number;
    created_at: string;
}

export interface CommandeRelance {
    id: string;
    email: string;
    customer_name: string | null;
    order_ref: string;
    quantity: number | null;
    price_discounted_eur: number | string | null;
    lang: string | null;
    purchase_channel: string | null;
    relance_entree_at: string;
    journal: LigneJournal[];
}

export interface GroupeRelance { palier: number; commandes: CommandeRelance[] }
export interface GroupeAlerte { motif: 'sans_reponse' | 'envoi_echoue'; jours: number; commandes: CommandeRelance[] }
export interface Plan { relances: GroupeRelance[]; alertes: GroupeAlerte[] }

export const cleClient = (email: unknown) => String(email ?? '').trim().toLowerCase();

/** Le dernier palier échu, ou null avant le premier. */
export function palierEchu(jours: number): number | null {
    let p: number | null = null;
    for (const v of PALIERS) if (jours >= v) p = v;
    return p;
}

export function planifier(commandes: CommandeRelance[], maintenant: Date): Plan {
    const groupes = new Map<string, CommandeRelance[]>();
    for (const c of commandes) {
        const cle = cleClient(c.email);
        if (cle) groupes.set(cle, [...(groupes.get(cle) ?? []), c]);
    }
    const plan: Plan = { relances: [], alertes: [] };
    for (const groupe of groupes.values()) {
        // La plus récente d'abord : c'est elle que l'e-mail présente en tête.
        const tries = [...groupe].sort((a, b) => b.relance_entree_at.localeCompare(a.relance_entree_at));
        const base = Math.min(...tries.map((c) => Date.parse(c.relance_entree_at)));
        const jours = Math.floor((maintenant.getTime() - base) / JOUR_MS);
        const lignes = tries.flatMap((c) => c.journal);
        const alerte = lignes.filter((l) => l.palier === PALIER_ALERTE);
        const alerteAFaire = !alerte.some((l) => l.statut !== 'echec' || l.tentatives >= TENTATIVES_MAX);

        // Trois échecs d'envoi constatés sur une relance : l'adresse est abandonnée, David prévenu.
        const relances = lignes.filter((l) => l.palier !== PALIER_ALERTE);
        if (relances.some((l) => l.statut === 'echec' && l.tentatives >= TENTATIVES_MAX)) {
            if (alerteAFaire) plan.alertes.push({ motif: 'envoi_echoue', jours, commandes: tries });
            continue;
        }

        // Une réservation sans suite compte comme envoyée : mieux vaut perdre une relance qu'en doubler une.
        const engagees = relances.filter((l) => l.statut !== 'echec');
        const dernier = engagees.reduce((m, l) => Math.max(m, l.palier), 0);
        const recente = engagees.some((l) => maintenant.getTime() - Date.parse(l.created_at) < JOUR_MS);
        if (recente) continue;

        const cible = palierEchu(jours);
        if (cible !== null && cible > dernier) plan.relances.push({ palier: cible, commandes: tries });
        else if (dernier === 14 && jours >= JOUR_ALERTE && alerteAFaire) {
            plan.alertes.push({ motif: 'sans_reponse', jours, commandes: tries });
        }
    }
    return plan;
}
