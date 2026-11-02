// Logique sur une fausse base en mémoire : aucun réseau, aucun e-mail réel.
import { assert, assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { composerMailClient } from '../_shared/muling-email-modele.ts';
import {
    type CommandeRelance, type LigneJournal, PALIER_ALERTE, palierEchu, planifier,
} from '../_shared/muling-relances.ts';
import { type Deps, traiter } from './handler.ts';

const J0 = Date.parse('2026-11-01T10:00:00Z');
const jour = (n: number) => new Date(J0 + n * 86400000);
const iso = (n: number) => jour(n).toISOString();
const ligne = (palier: number, statut: LigneJournal['statut'] = 'envoye', n = 0, tentatives = 1): LigneJournal =>
    ({ palier, statut, tentatives, created_at: iso(n) });
const cmd = (id: string, extra: Partial<CommandeRelance> = {}): CommandeRelance => ({
    id, email: 'client@test.invalid', customer_name: 'Camille Test', order_ref: 'R-' + id, quantity: 1,
    price_discounted_eur: 245, lang: 'fr', purchase_channel: 'online', relance_entree_at: iso(0), journal: [], ...extra,
});

Deno.test('paliers : 1, 3, 7, 14 et rien avant le premier', () => {
    assertEquals([0, 1, 2, 3, 6, 7, 13, 14, 40].map(palierEchu), [null, 1, 1, 3, 3, 7, 7, 14, 14]);
});

Deno.test('calendrier : chaque palier une fois, puis alerte, puis plus rien', () => {
    const journal: LigneJournal[] = [];
    const vus: (number | string)[] = [];
    for (let n = 0; n <= 40; n++) {
        const p = planifier([cmd('a', { journal })], jour(n));
        for (const g of p.relances) { vus.push(g.palier); journal.push(ligne(g.palier, 'envoye', n)); }
        for (const a of p.alertes) { vus.push(a.motif); journal.push(ligne(PALIER_ALERTE, 'envoye', n)); }
    }
    assertEquals(vus, [1, 3, 7, 14, 'sans_reponse']);
});

Deno.test('panne : seul le dernier palier échu part, et 24 h entre deux e-mails', () => {
    assertEquals(planifier([cmd('a')], jour(9)).relances.map((g) => g.palier), [7]);
    const veille = cmd('a', { journal: [ligne(3, 'envoye', 6.9)] });
    assertEquals(planifier([veille], jour(7.1)).relances, []);
    assertEquals(planifier([veille], jour(8)).relances.map((g) => g.palier), [7]);
});

Deno.test('plantage après réservation : le palier est consommé, le suivant reste prévu', () => {
    const c = cmd('a', { journal: [ligne(1, 'reserve', 1)] });
    assertEquals(planifier([c], jour(2.5)).relances, []);
    assertEquals(planifier([c], jour(3)).relances.map((g) => g.palier), [3]);
});

Deno.test('échec constaté : retenté, puis abandon et alerte au troisième', () => {
    assertEquals(planifier([cmd('a', { journal: [ligne(1, 'echec', 1, 2)] })], jour(1.1)).relances.map((g) => g.palier), [1]);
    const p = planifier([cmd('a', { journal: [ligne(1, 'echec', 1, 3)] })], jour(5));
    assertEquals([p.relances.length, p.alertes[0].motif], [0, 'envoi_echoue']);
    const fini = cmd('a', { journal: [ligne(1, 'echec', 1, 3), ligne(PALIER_ALERTE, 'envoye', 5)] });
    assertEquals(planifier([fini], jour(20)), { relances: [], alertes: [] });
});

Deno.test('regroupement : un seul e-mail par client, casse ignorée, calendrier de la plus ancienne', () => {
    const p = planifier([
        cmd('vieille'), cmd('neuve', { email: ' CLIENT@test.invalid ', relance_entree_at: iso(2.5) }),
        cmd('autre', { email: 'autre@test.invalid', relance_entree_at: iso(2.5) }),
    ], jour(3));
    assertEquals(p.relances.length, 1);
    assertEquals(p.relances[0].palier, 3);
    assertEquals(p.relances[0].commandes.map((c) => c.id), ['neuve', 'vieille']);
});

Deno.test('modèle : les autres commandes sont dans le même e-mail, chacune avec ses liens', () => {
    const m = composerMailClient({
        langue: 'fr', variante: 'relance', prenom: 'C', reference: 'R-1', quantite: 1, montant: 245, showroom: false,
        banque: null, urlDepot: 'https://x/1', urlAnnuler: 'https://x/1a',
        autres: [{ reference: 'R-2', quantite: 2, montant: 490, urlDepot: 'https://x/2', urlAnnuler: 'https://x/2a' }],
    });
    for (const attendu of ['R-2', 'https://x/2', 'https://x/2a']) assert(m.html.includes(attendu) && m.text.includes(attendu), attendu);
});

// ── Handler, avec une fausse base qui applique les mêmes règles que les fonctions SQL ──
type Ligne = { sale_id: string; palier: number; lot: string; statut: string; tentatives: number; created_at: string };

function monter(commandes: CommandeRelance[], o: { actif?: boolean; mailOk?: boolean; lienKo?: boolean; banque?: boolean; maintenant?: Date } = {}) {
    const journal: Ligne[] = [];
    const mails: { to: string; subject: string; text: string }[] = [];
    const liens: string[] = [];
    const rpcs: string[] = [];
    const fermees = new Set<string>();
    const etat = { actif: o.actif ?? true, mailOk: o.mailOk ?? true, lienKo: o.lienKo ?? false };
    const admin = {
        from: (table: string) => ({
            select: () => ({
                maybeSingle: () => Promise.resolve({
                    data: table === 'muling_relances_reglages' ? { actif: etat.actif }
                        : (o.banque ?? true) ? { iban: 'XX00 FICTIF', beneficiary: 'Fictif', bic: null, bank: null } : null,
                    error: null,
                }),
            }),
        }),
        rpc: (nom: string, a: Record<string, unknown>) => {
            rpcs.push(nom);
            let data: unknown = null;
            if (nom === 'muling_relances_etat') {
                data = commandes.filter((c) => !fermees.has(c.id)).map((c) => ({
                    ...c, journal: journal.filter((l) => l.sale_id === c.id),
                }));
            } else if (nom === 'muling_relance_reserver') {
                const gardes: string[] = [];
                for (const id of a.p_sale_ids as string[]) {
                    if (!etat.actif || fermees.has(id)) continue;
                    const ex = journal.find((l) => l.sale_id === id && l.palier === a.p_palier);
                    if (journal.some((l) => l.sale_id === id && l.palier >= (a.p_palier as number) && l.statut !== 'echec')) continue;
                    if (ex) {
                        if (ex.tentatives >= (a.p_tentatives_max as number)) continue;
                        Object.assign(ex, { statut: 'reserve', lot: a.p_lot, tentatives: ex.tentatives + 1 });
                    } else {
                        journal.push({
                            sale_id: id, palier: a.p_palier as number, lot: a.p_lot as string, statut: 'reserve', tentatives: 1,
                            created_at: (o.maintenant ?? jour(1)).toISOString(),
                        });
                    }
                    gardes.push(id);
                }
                data = gardes;
            } else if (nom === 'muling_relance_marquer') {
                for (const l of journal) if (l.lot === a.p_lot && l.statut === 'reserve') l.statut = a.p_envoye ? 'envoye' : 'echec';
            } else if (nom === 'muling_lien_creer') {
                if (etat.lienKo) return Promise.resolve({ data: null, error: { message: 'x' } });
                liens.push(a.p_sale_id as string);
            }
            return Promise.resolve({ data, error: null });
        },
    };
    const deps: Deps = {
        admin, env: { host: 'h', user: 'u', pass: 'p', from: 'f', port: 465 }, secret: 'S3CRET',
        estAdmin: (r) => Promise.resolve(r.headers.get('Authorization') === 'admin'),
        reponse: (_r, corps, statut = 200) => new Response(JSON.stringify(corps), { status: statut }),
        maintenant: () => o.maintenant ?? jour(1),
        envoyerMail: (_e, m) => { mails.push(m); return Promise.resolve(etat.mailOk); },
    };
    const appel = async (body: unknown = {}, entetes: Record<string, string> = { 'x-reminders-secret': 'S3CRET' }) => {
        const r = await traiter(new Request('http://x', { method: 'POST', headers: entetes, body: JSON.stringify(body) }), deps);
        return { status: r.status, corps: await r.json() };
    };
    return { appel, journal, mails, liens, rpcs, fermees, etat };
}

Deno.test('porte : sans secret ni admin, refus', async () => {
    const m = monter([cmd('a')]);
    assertEquals((await m.appel({}, {})).status, 403);
    assertEquals((await m.appel({}, { 'x-reminders-secret': 'faux' })).status, 403);
    assertEquals(m.rpcs, []);
});

Deno.test('interrupteur éteint : le cron passe, rien n’est lu ni envoyé', async () => {
    const m = monter([cmd('a')], { actif: false });
    assertEquals((await m.appel()).corps, { actif: false, relances: 0, alertes: 0 });
    assertEquals([m.mails.length, m.journal.length, m.rpcs.length], [0, 0, 0]);
});

Deno.test('dry_run : le plan sans écriture, sans lien, sans e-mail ; un admin n’a que ça', async () => {
    for (const [corps, entetes] of [
        [{ dry_run: true }, { 'x-reminders-secret': 'S3CRET' }],
        [{}, { Authorization: 'admin' }],
    ] as [unknown, Record<string, string>][]) {
        const m = monter([cmd('a')], { actif: false });
        const r = await m.appel(corps, entetes);
        assertEquals(r.corps.relances, [{ palier: 1, references: ['R-a'] }]);
        assert(!JSON.stringify(r.corps).includes('@'), 'aucune adresse dans la réponse');
        assertEquals([m.mails.length, m.journal.length, m.liens.length], [0, 0, 0]);
    }
});

Deno.test('idempotence : le cron rejoue, le client ne reçoit qu’un e-mail', async () => {
    const m = monter([cmd('a')]);
    assertEquals((await m.appel()).corps.relances, 1);
    await m.appel();
    await m.appel();
    assertEquals(m.mails.length, 1);
    assertEquals([m.journal.length, m.journal[0].statut, m.journal[0].palier], [1, 'envoye', 1]);
    assertEquals(m.mails[0].subject.includes('Rappel'), true);
});

Deno.test('deux commandes, un e-mail : deux lignes de journal, deux liens', async () => {
    const m = monter([cmd('a'), cmd('b', { relance_entree_at: iso(0.5) })]);
    await m.appel();
    assertEquals(m.mails.length, 1);
    assert(m.mails[0].text.includes('R-a') && m.mails[0].text.includes('R-b'));
    assertEquals([m.journal.length, m.liens.length], [2, 2]);
});

Deno.test('arrêt : commande fermée entre la lecture et l’envoi, rien ne part', async () => {
    const m = monter([cmd('a')]);
    m.fermees.add('a');
    await m.appel();
    assertEquals([m.mails.length, m.journal.length], [0, 0]);
});

Deno.test('arrêt : une commande fermée du groupe n’est plus citée, l’autre reste relancée', async () => {
    const m = monter([cmd('a'), cmd('b')]);
    m.fermees.add('b');
    await m.appel();
    assert(!m.mails[0].text.includes('R-b'));
    assertEquals(m.journal.map((l) => l.sale_id), ['a']);
});

Deno.test('échec SMTP : noté et retenté sans dépasser 3, puis alerte à David une seule fois', async () => {
    const m = monter([cmd('a')], { mailOk: false });
    for (let i = 0; i < 3; i++) await m.appel();
    assertEquals([m.journal[0].statut, m.journal[0].tentatives], ['echec', 3]);
    m.etat.mailOk = true;
    await m.appel();
    await m.appel();
    const pourDavid = m.mails.filter((x) => x.to === 'contact@lesagedavid.fr');
    assertEquals(pourDavid.length, 1);
    assertEquals(m.mails.filter((x) => x.to !== 'contact@lesagedavid.fr').length, 3);
});

Deno.test('plantage au renouvellement du lien : échec noté, pas d’e-mail, pas d’arrêt des suivants', async () => {
    const m = monter([cmd('a')], { lienKo: true });
    assertEquals((await m.appel()).status, 200);
    assertEquals([m.mails.length, m.journal[0].statut], [0, 'echec']);
});

Deno.test('alerte à David : J+15, cite la commande, jamais deux fois', async () => {
    const m = monter([cmd('a', { journal: [] })], { maintenant: jour(15) });
    m.journal.push({ sale_id: 'a', palier: 14, lot: 'l', statut: 'envoye', tentatives: 1, created_at: iso(14) });
    await m.appel();
    await m.appel();
    assertEquals(m.mails.length, 1);
    assertEquals(m.mails[0].to, 'contact@lesagedavid.fr');
    assert(m.mails[0].text.includes('R-a') && m.mails[0].text.includes('restent ouvertes'));
});

Deno.test('banque vide : rien ne part et aucun palier n’est consommé', async () => {
    const m = monter([cmd('a')], { banque: false });
    assertEquals((await m.appel()).status, 409);
    assertEquals([m.mails.length, m.journal.length], [0, 0]);
});
