import { assert, assertEquals, assertFalse, assertMatch } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import {
    estAnnulee, genererJeton, hacher, JETON_RE, langueMail, lirePreuve, MAX_PROOF_BYTES,
    ouverteSansPreuve, typeReel,
} from './muling-preuve.ts';
import { composerMailClient } from './muling-email-modele.ts';
import { composeMulingMail } from './muling-mail.ts';

const b64 = (o: number[] | Uint8Array) => btoa(String.fromCharCode(...o));
const PDF = [0x25, 0x50, 0x44, 0x46, 0x2d, 0x31];
const PNG = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0];
const JPG = [0xff, 0xd8, 0xff, 0xe0];

Deno.test('jeton : 256 bits, base64url, jamais deux fois le même', () => {
    const a = genererJeton(), b = genererJeton();
    assertMatch(a, JETON_RE);
    assert(a !== b);
    const octets = atob(a.replace(/-/g, '+').replace(/_/g, '/') + '=');
    assertEquals(octets.length, 32);
});

Deno.test('empreinte SHA-256 stable et distincte du jeton', async () => {
    assertEquals(await hacher('abc'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
});

Deno.test('fichier : le contenu décide, pas le nom ni le type annoncé', () => {
    assertEquals(typeReel(new Uint8Array(PDF))?.ext, 'pdf');
    assertEquals(typeReel(new Uint8Array(PNG))?.ext, 'png');
    assertEquals(typeReel(new Uint8Array(JPG))?.ext, 'jpg');
    const html = new TextEncoder().encode('<html><script>alert(1)</script>');
    assertEquals(lirePreuve(b64(html)), { ok: false, error: 'invalid_file_type' });
    const webp = new TextEncoder().encode('RIFF0000WEBP');
    assertEquals(lirePreuve(b64(webp)), { ok: false, error: 'invalid_file_type' });
});

Deno.test('fichier : vide, base64 invalide, trop lourd', () => {
    assertEquals(lirePreuve(''), { ok: false, error: 'missing_file' });
    assertEquals(lirePreuve(undefined), { ok: false, error: 'missing_file' });
    assertEquals(lirePreuve('!!!!'), { ok: false, error: 'invalid_file_type' });
    assertEquals(lirePreuve('A'.repeat(MAX_PROOF_BYTES * 2)), { ok: false, error: 'file_too_large' });
    const r = lirePreuve(b64(PDF));
    assert(r.ok && r.fichier.mime === 'application/pdf');
});

const ouverte = { partner: 'muling', order_ref: 'R1', email: 'a@b.fr', fulfillment_status: 'new', status: 'lead' };

Deno.test('commande ouverte sans preuve', () => {
    assert(ouverteSansPreuve(ouverte));
    for (const x of [
        { payment_proof_path: 'p' }, { payment_claimed_at: 'x' }, { deleted_at: 'x' }, { merged_into_id: 'x' },
        { cancelled_at: 'x' }, { fulfillment_status: 'cancelled' }, { status: 'no_sale' },
        { fulfillment_status: 'shipped' }, { status: 'paid' }, { partner: 'neotone' }, { order_ref: null }, { invoice_ref: 'F' },
    ]) assertFalse(ouverteSansPreuve({ ...ouverte, ...x }), JSON.stringify(x));
    assert(estAnnulee({ status: 'no_sale' }));
});

Deno.test('langue et montant déclaratif', () => {
    assertEquals([langueMail('fr-FR'), langueMail('es'), langueMail('zh'), langueMail(null)], ['fr', 'es', 'en', 'en']);
});

const donnees = {
    variante: 'commande' as const, prenom: '<b>Zoé</b>', reference: 'R-1', quantite: 2, montant: 490, showroom: false,
    banque: { beneficiary: 'Fictif', iban: 'XX00 1111', bic: 'BIC0', bank: null },
    urlDepot: 'https://exemple.test/p?t=JETON&l=fr', urlAnnuler: 'https://exemple.test/p?t=JETON&l=fr&action=annuler',
};

Deno.test('e-mail : vrais boutons, pas de lien visible, contenu échappé, 3 langues', () => {
    for (const [langue, depot, annuler] of [
        ['fr', 'Déposer ma preuve de virement', 'Annuler ma commande'],
        ['en', 'Upload my proof of transfer', 'Cancel my order'],
        ['es', 'Subir mi comprobante de transferencia', 'Cancelar mi pedido'],
    ] as const) {
        const m = composerMailClient({ langue, ...donnees });
        assert(m.html.includes(`>${depot}</a>`) && m.html.includes(`>${annuler}</a>`), langue);
        assert(m.html.includes('XX00 1111') && m.html.includes('R-1') && m.subject.includes('R-1'));
        assertFalse(m.html.includes('<b>Zoé'));
        // Le jeton n'apparaît que dans les href ; le texte brut porte les liens en repli.
        assertEquals(m.html.replace(/href="[^"]*"/g, '').includes('JETON'), false);
        assert(m.text.includes(donnees.urlDepot));
    }
});

Deno.test('e-mail : réglage bancaire vide, aucun IBAN inventé', () => {
    const m = composerMailClient({ langue: 'fr', ...donnees, banque: null, urlAnnuler: null });
    assertFalse(m.html.includes('IBAN'));
    assertFalse(m.html.includes('Annuler ma commande'));
});

Deno.test('mail à Muling : mention showroom désormais portée par le mail de preuve', () => {
    const s = { id: 'i', email: 'a@b.fr', phone: '0', customer_name: 'A', quantity: 1, price_discounted_eur: 245, order_ref: 'R', shipping_address: null, shipping_city: null, shipping_postal_code: null, shipping_country: null, delivery_note: null, payment_proof_path: 'p', payment_claimed_at: 'x' };
    assert(composeMulingMail({ ...s, purchase_channel: 'showroom' }, null, false).text.includes('DO NOT SHIP'));
    assertFalse(composeMulingMail({ ...s, purchase_channel: 'online' }, null, false).text.includes('DO NOT SHIP'));
});
