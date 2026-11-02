// Logique de la fonction sur une fausse base en mémoire : aucun réseau, aucun e-mail réel.
import { assert, assertEquals, assertFalse } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { type Deps, traiter } from './handler.ts';
import { deposerPreuve } from '../_shared/muling-depot.ts';
import { hacher } from '../_shared/muling-preuve.ts';

type Ligne = Record<string, unknown>;

function fausseBase(lignes: Ligne[], banque: Ligne | null) {
    const liens = new Map<string, string>();
    const fichiers: string[] = [];
    const tentatives = new Map<string, number>();
    const appelsRpc: string[] = [];
    const db = {
        fichiers, liens, appelsRpc, tentatives,
        storage: { from: () => ({
            upload: (p: string) => { fichiers.push(p); return Promise.resolve({ error: null }); },
            remove: (ps: string[]) => { ps.forEach((p) => fichiers.splice(fichiers.indexOf(p), 1)); return Promise.resolve({}); },
        }) },
        from: (table: string) => {
            let rows = table === 'muling_bank_settings' ? (banque ? [banque] : []) : [...lignes];
            const q = {
                select: () => q,
                eq: (k: string, v: unknown) => { rows = rows.filter((r) => r[k] === v); return q; },
                is: (k: string, v: unknown) => { rows = rows.filter((r) => (r[k] ?? null) === v); return q; },
                ilike: (k: string, v: string) => { rows = rows.filter((r) => String(r[k]).toLowerCase() === v.replace(/\\/g, '').toLowerCase()); return q; },
                order: () => q,
                limit: () => Promise.resolve({ data: rows, error: null }),
                maybeSingle: () => Promise.resolve({ data: rows[0] ?? null, error: null }),
            };
            return q;
        },
        rpc: (nom: string, a: Record<string, unknown>) => {
            appelsRpc.push(nom);
            let data: unknown = null;
            if (nom === 'muling_lien_tentative') {
                const n = (tentatives.get(a.p_cle as string) ?? 0) + 1;
                tentatives.set(a.p_cle as string, n);
                data = n <= (a.p_max as number);
            } else if (nom === 'muling_lien_creer') {
                liens.set(a.p_hash as string, a.p_sale_id as string);
            } else if (nom === 'muling_lien_resoudre') {
                data = liens.get(a.p_hash as string) ?? null;
            } else if (nom === 'muling_preuve_enregistrer') {
                const l = lignes.find((r) => r.id === a.p_sale_id)!;
                const cible = l.merged_into_id ? lignes.find((r) => r.id === l.merged_into_id)! : l;
                if (cible.cancelled_at) data = 'annulee';
                else if (a.p_exiger_sans_preuve && cible.payment_proof_path) data = 'deja_deposee';
                else {
                    l.payment_proof_path = a.p_path;
                    cible.payment_proof_path ??= a.p_path;
                    for (const [h, id] of liens) if (id === l.id) liens.delete(h);
                    data = 'ok';
                }
            } else if (nom === 'muling_annuler_par_lien') {
                const id = liens.get(a.p_hash as string);
                if (!id) data = { resultat: 'lien_invalide' };
                else {
                    const l = lignes.find((r) => r.id === id)!;
                    data = { resultat: 'ok', sale_id: id, preuve_transmise: !!l.payment_proof_path };
                    l.cancelled_at = 'now';
                    liens.delete(a.p_hash as string);
                }
            }
            return Promise.resolve({ data, error: null });
        },
    };
    return db;
}

const commande = (extra: Ligne = {}): Ligne => ({
    id: '11111111-1111-4111-8111-111111111111', partner: 'muling', email: 'client@test.invalid', customer_name: 'Zoé Test',
    order_ref: 'R-1', quantity: 1, price_discounted_eur: 245, fulfillment_status: 'new', status: 'lead', lang: 'fr', ...extra,
});
const BANQUE = { beneficiary: 'Fictif', iban: 'XX00', bic: 'B', bank: null };
const ENV = { host: 'h', user: 'u', pass: 'p', from: 'f', port: 465 };
const PDF64 = btoa('%PDF-1.4 fictif');

function monter(lignes: Ligne[], opts: { admin?: boolean; banque?: Ligne | null; siteToken?: string } = {}) {
    const db = fausseBase(lignes, opts.banque === undefined ? BANQUE : opts.banque);
    const mails: { to: string; subject: string; html?: string; text: string }[] = [];
    const muling: { ref: unknown; path: unknown }[] = [];
    const deps: Deps = {
        admin: db, env: ENV, siteToken: opts.siteToken ?? 'secret',
        estAdmin: () => Promise.resolve(opts.admin === true),
        reponse: (_r, c, s = 200) => new Response(JSON.stringify(c), { status: s }),
        envoyerMail: (_e, m) => { mails.push(m); return Promise.resolve(true); },
        envoyerMuling: (_e, s) => { muling.push({ ref: s.order_ref, path: s.payment_proof_path }); return Promise.resolve(true); },
    };
    const appel = async (corps: Ligne, tok = 'secret') => {
        const r = await traiter(new Request('http://x/', { method: 'POST', headers: { 'x-site-token': tok, 'x-client-ip': '1.1.1.1' }, body: JSON.stringify(corps) }), deps);
        return { status: r.status, data: await r.json() };
    };
    return { db, mails, muling, appel, deps };
}
const jetonDe = (html: string) => decodeURIComponent(html.match(/[?&;]t=([A-Za-z0-9_-]{43})/)![1]);

Deno.test('sans le secret du site : refusé, y compris si le secret n’est pas configuré', async () => {
    const m = monter([commande()]);
    assertEquals((await m.appel({ op: 'view', t: 'x' }, 'faux')).status, 403);
    const sans = monter([commande()], { siteToken: '' });
    assertEquals((await sans.appel({ op: 'view', t: 'x' }, '')).status, 403);
});

Deno.test('reconnaissance : oui ou non, sans aucun détail', async () => {
    const m = monter([commande()]);
    const r = await m.appel({ op: 'recognize', email: ' CLIENT@test.invalid ' });
    assertEquals(r.data, { open: true });
    assertEquals((await m.appel({ op: 'recognize', email: 'autre@test.invalid' })).data, { open: false });
    for (const x of [{ payment_proof_path: 'p' }, { cancelled_at: 'x' }, { deleted_at: 'x' }, { merged_into_id: 'y' }]) {
        assertEquals((await monter([commande(x)]).appel({ op: 'recognize', email: 'client@test.invalid' })).data, { open: false });
    }
});

Deno.test('reprendre : même réponse dans tous les cas, e-mail uniquement si commande ouverte', async () => {
    const m = monter([commande()]);
    assertEquals((await m.appel({ op: 'resume', email: 'autre@test.invalid' })).data, { ok: true });
    assertEquals(m.mails.length, 0);
    assertEquals((await m.appel({ op: 'resume', email: 'client@test.invalid', lang: 'es' })).data, { ok: true });
    assertEquals(m.mails.length, 1);
    assert(m.mails[0].html!.includes('Subir mi comprobante'));
    assertEquals(m.muling.length, 0);
});

Deno.test('limite : 3 renvois de lien par heure pour une adresse', async () => {
    const m = monter([commande()]);
    for (let i = 0; i < 3; i++) assertEquals((await m.appel({ op: 'resume', email: 'client@test.invalid' })).status, 200);
    assertEquals((await m.appel({ op: 'resume', email: 'client@test.invalid' })).status, 429);
    assertEquals(m.mails.length, 3);
});

async function avecLien(extra: Ligne = {}) {
    const m = monter([commande(extra)]);
    await m.appel({ op: 'resume', email: 'client@test.invalid' });
    const jeton = jetonDe(m.mails[0].html!);
    m.mails.length = 0;
    return { ...m, jeton };
}

Deno.test('le jeton n’est stocké que haché', async () => {
    const m = await avecLien();
    assertFalse(m.db.liens.has(m.jeton));
    assert(m.db.liens.has(await hacher(m.jeton)));
});

Deno.test('consulter : référence et montant seulement ; l’ouverture n’écrit rien', async () => {
    const m = await avecLien();
    const r = await m.appel({ op: 'view', t: m.jeton });
    assertEquals(Object.keys(r.data).sort(), ['amount', 'currency', 'lang', 'ok', 'ref', 'showroom']);
    assertEquals(m.mails.length, 0);
    assertFalse(m.db.appelsRpc.includes('muling_annuler_par_lien'));
    assertEquals((await m.appel({ op: 'view', t: 'A'.repeat(43) })).status, 404);
    assertEquals((await m.appel({ op: 'view', t: 'court' })).status, 404);
});

Deno.test('annuler : confirmation obligatoire, puis David seul prévenu, pas Muling', async () => {
    const m = await avecLien();
    assertEquals((await m.appel({ op: 'cancel', t: m.jeton })).status, 400);
    assertFalse(m.db.appelsRpc.includes('muling_annuler_par_lien'));
    assertEquals((await m.appel({ op: 'cancel', t: m.jeton, confirm: true })).status, 200);
    const dest = m.mails.map((x) => x.to);
    assert(dest.includes('contact@lesagedavid.fr') && dest.includes('client@test.invalid'));
    assertFalse(dest.includes('85846599@qq.com'));
    assertEquals((await m.appel({ op: 'cancel', t: m.jeton, confirm: true })).status, 404);
});

Deno.test('annuler après preuve transmise : Muling est prévenu', async () => {
    const m = await avecLien();
    const ligne = commande({ payment_proof_path: 'p' });
    m.db.from = fausseBase([ligne], BANQUE).from;
    m.db.rpc = (n: string) => Promise.resolve({ data: n === 'muling_lien_tentative' ? true : { resultat: 'ok', sale_id: ligne.id, preuve_transmise: true }, error: null });
    assertEquals((await m.appel({ op: 'cancel', t: m.jeton, confirm: true })).status, 200);
    assert(m.mails.some((x) => x.to === '85846599@qq.com' && x.subject.includes('DO NOT SHIP')));
});

Deno.test('déposer : Muling reçoit la preuve, le client sa confirmation, le lien meurt', async () => {
    const m = await avecLien();
    assertEquals((await m.appel({ op: 'deposit', t: m.jeton, fileBase64: btoa('<html>') })).status, 400);
    assertEquals(m.muling.length, 0);
    assertEquals((await m.appel({ op: 'deposit', t: m.jeton, fileBase64: PDF64 })).status, 200);
    assertEquals(m.muling[0].ref, 'R-1');
    assert(m.mails.some((x) => x.to === 'client@test.invalid'));
    assertEquals((await m.appel({ op: 'view', t: m.jeton })).status, 404);
});

const fichier = { bytes: new TextEncoder().encode('%PDF-1'), ext: 'pdf', mime: 'application/pdf' };
const COLS = { id: '', email: null, phone: null, customer_name: null, quantity: 1, price_discounted_eur: 1, order_ref: '', shipping_address: null, shipping_city: null, shipping_postal_code: null, shipping_country: null, delivery_note: null, payment_proof_path: null, payment_claimed_at: null };

Deno.test('ancien chemin, commande annulée : refus et pas de fichier orphelin', async () => {
    const l = commande({ cancelled_at: 'x' });
    const m = monter([l]);
    const r = await deposerPreuve(m.deps, { ...COLS, ...l } as never, fichier, { exigerSansPreuve: false });
    assertEquals(r, { ok: false, error: 'order_cancelled' });
    assertEquals(m.db.fichiers.length, 0);
    assertEquals(m.muling.length, 0);
});

Deno.test('commande fusionnée : Muling reçoit la référence conservée, jamais l’archive', async () => {
    const gardee = commande({ id: '22222222-2222-4222-8222-222222222222', order_ref: 'R-GARDEE' });
    const arch = commande({ order_ref: 'R-ARCH', merged_into_id: gardee.id, deleted_at: 'x' });
    const m = monter([gardee, arch]);
    const r = await deposerPreuve(m.deps, { ...COLS, ...arch } as never, fichier, { exigerSansPreuve: false });
    assert(r.ok);
    assertEquals(m.muling[0].ref, 'R-GARDEE');
    assert(m.mails.every((x) => !x.subject.includes('R-ARCH')));
});

Deno.test('commande fusionnée dont la conservée a déjà sa preuve : rien pour Muling, David prévenu', async () => {
    const gardee = commande({ id: '22222222-2222-4222-8222-222222222222', order_ref: 'R-GARDEE', payment_proof_path: 'deja' });
    const arch = commande({ order_ref: 'R-ARCH', merged_into_id: gardee.id, deleted_at: 'x' });
    const m = monter([gardee, arch]);
    const r = await deposerPreuve(m.deps, { ...COLS, ...arch } as never, fichier, { exigerSansPreuve: false });
    assert(r.ok && !r.transmis);
    assertEquals(m.muling.length, 0);
    assert(m.mails.some((x) => x.to === 'contact@lesagedavid.fr' && x.subject.includes('R-GARDEE')));
});

Deno.test('admin : JWT obligatoire, aperçu sans jeton, envoi avec jeton, banque vide refusée', async () => {
    const m = monter([commande()], { admin: true });
    const id = commande().id;
    assertEquals((await monter([commande()]).appel({ op: 'admin_send', saleId: id })).status, 403);
    const ap = await m.appel({ op: 'admin_preview', saleId: id });
    assert(ap.data.html.includes('XX00') && ap.data.html.includes('#apercu'));
    assertEquals(m.db.liens.size, 0);
    assertEquals(m.mails.length, 0);
    assertEquals((await m.appel({ op: 'admin_send', saleId: id })).data, { ok: true });
    assertEquals(m.db.liens.size, 1);
    assert(m.mails[0].html!.includes('Déposer ma preuve'));
    const vide = monter([commande()], { admin: true, banque: null });
    assertEquals((await vide.appel({ op: 'admin_send', saleId: id })).data, { error: 'banque_vide' });
    assertEquals((await monter([commande({ payment_proof_path: 'p' })], { admin: true }).appel({ op: 'admin_preview', saleId: id })).data, { error: 'commande_indisponible' });
});

Deno.test('lien stable : un renvoi laisse le premier lien valable, le dépôt les révoque tous', async () => {
    const m = monter([commande()]);
    await m.appel({ op: 'resume', email: 'client@test.invalid' });
    await m.appel({ op: 'resume', email: 'client@test.invalid' });
    const premier = jetonDe(m.mails[0].html!);
    const second = jetonDe(m.mails[1].html!);
    assert(premier !== second);
    assertEquals((await m.appel({ op: 'view', t: premier })).status, 200);
    assertEquals((await m.appel({ op: 'view', t: second })).status, 200);
    assertEquals((await m.appel({ op: 'deposit', t: premier, fileBase64: PDF64 })).status, 200);
    assertEquals((await m.appel({ op: 'view', t: second })).status, 404);
});

Deno.test('mode essai : annulation après preuve, rien pour Muling, David seul avec [TEST]', async () => {
    const m = monter([commande({ email: 'Contact@LesageDavid.fr', payment_proof_path: 'p' })], { admin: true });
    m.db.liens.set(await hacher('j'.repeat(43)), '11111111-1111-4111-8111-111111111111');
    assertEquals((await m.appel({ op: 'cancel', t: 'j'.repeat(43), confirm: true })).status, 200);
    assertEquals(m.mails.filter((x) => x.to === '85846599@qq.com').length, 0);
    assert(m.mails.some((x) => x.to === 'contact@lesagedavid.fr' && x.subject.startsWith('[TEST] ORDER CANCELLED')));
});
