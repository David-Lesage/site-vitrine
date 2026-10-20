// Tests de la chaîne « achat Neotone » (10/10/2026). Aucun appel réseau, aucun
// appel Google : seulement les fonctions pures.
// Lancer :  node scripts/test-achat-neotone.mjs   (ou bun)
//
// Couvre :
//  1. le cœur du doPost de l'Apps Script (`planCustomerWrite_`) : colonnes par
//     en-tête, ligne unique par n° de série, jamais d'écrasement, bloc
//     d'adresse multi-lignes, texte forcé, réponse sans donnée du Sheet ;
//  2. `buildSaleIntakePayload` (src/lib/saleIntakeCore.js) : liste blanche,
//     champs interdits, prix recalculé selon le mode, interrupteur à false.
// Données de test écrites ICI uniquement.

import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import { fileURLToPath } from 'node:url'
import {
  SALE_INTAKE_ENABLED,
  buildSaleIntakePayload,
  defaultDiscountedPrice,
  summarizeSaleIntakeResponse,
  isValidPhone,
  FORBIDDEN_FIELDS,
} from '../src/lib/saleIntakeCore.js'

let passed = 0
const test = (name, fn) => {
  try {
    fn()
    passed++
    console.log(`  ok  ${name}`)
  } catch (err) {
    console.error(`  ÉCHEC  ${name}`)
    throw err
  }
}

// ── 1. Apps Script : doPost (cœur pur) ──────────────────────────────────────
const gsPath = fileURLToPath(new URL('./google-apps-script/stock-public.gs', import.meta.url))
const gs = vm.createContext({})
vm.runInContext(readFileSync(gsPath, 'utf8'), gs)
const plan = gs.planCustomerWrite_
const publicPlan = gs.publicPlan_
const block = gs.billingBlock_

// En-têtes dans le désordre, avec des colonnes qu'on ne doit jamais toucher.
const HEAD = ['Sale', 'Product', 'Serial Nr.', 'Type', 'Wood', 'K Price', 'Price to customer', 'Customer discount', 'Name of the Customer', 'Valid EU VAT Number', 'Billing adress of the customer', 'Email of the Customer', 'Sale status']
const row = (o) => HEAD.map((h) => o[h] ?? '')
const SHEET = [
  HEAD,
  row({ Product: 'Neotone', 'Serial Nr.': '799', 'Customer discount': '7%', 'Name of the Customer': 'Ancien Client', 'Billing adress of the customer': 'Vieux bloc', 'Sale status': 'Sold' }),
  row({ Product: 'Neotone', 'Serial Nr.': '843', 'Sale status': 'Available' }),
  row({ Product: 'Neotone', 'Serial Nr.': '972', 'Sale status': 'Available', 'Email of the Customer': 'deja@example.test' }),
  row({ Product: 'Neotone', 'Serial Nr.': '500', 'Sale status': 'Available' }),
  row({ Product: 'Neotone', 'Serial Nr.': '500', 'Sale status': 'Available' }),
]
const REQ = {
  serial: '843',
  customerDiscount: 0.07,
  name: 'Jeanne Testeuse',
  vat: '',
  billingAddress: '1 rue du Test\n75020 Paris\nFrance',
  email: 'jeanne@example.test',
  phone: '+33 6 00 00 00 00',
}

console.log('Apps Script (planCustomerWrite_)')
test('trouve la ligne par « Serial Nr. » et écrit les 4 colonnes (pas de TVA vide)', () => {
  const p = plan(SHEET, REQ)
  assert.equal(p.ok, true)
  assert.equal(p.rowIndex, 2)
  assert.deepEqual([...p.writes.map((w) => w.header)], ['Customer discount', 'Name of the Customer', 'Billing adress of the customer', 'Email of the Customer'])
  assert.equal(p.writes[0].col, HEAD.indexOf('Customer discount'))
})
test('bloc d’adresse multi-lignes : nom / adresse / Tel', () => {
  const p = plan(SHEET, REQ)
  assert.equal(p.preview['Billing adress of the customer'], 'Jeanne Testeuse\n1 rue du Test\n75020 Paris\nFrance\nTel: +33 6 00 00 00 00')
})
test('société + TVA : « Raison sociale — nom », ligne VAT avant Tel, colonne TVA écrite', () => {
  const p = plan(SHEET, { ...REQ, company: 'Test SARL', vat: 'FR12345678901' })
  assert.equal(p.ok, true)
  assert.equal(p.preview['Billing adress of the customer'], 'Test SARL — Jeanne Testeuse\n1 rue du Test\n75020 Paris\nFrance\nVAT: FR12345678901\nTel: +33 6 00 00 00 00')
  assert.equal(p.preview['Valid EU VAT Number'], 'FR12345678901')
})
test('texte FORCÉ à l’écriture (apostrophe), remise en NOMBRE', () => {
  const p = plan(SHEET, REQ)
  const byHeader = Object.fromEntries(p.writes.map((w) => [w.header, w.value]))
  assert.equal(byHeader['Customer discount'], 0.07)
  assert.equal(byHeader['Email of the Customer'], "'jeanne@example.test")
  assert.ok(String(byHeader['Billing adress of the customer']).startsWith("'"))
})
test('n’écrase JAMAIS : une case remplie → rien écrit, liste des cases remplies', () => {
  const p = plan(SHEET, { ...REQ, serial: '972' })
  assert.equal(p.ok, false)
  assert.equal(p.error, 'already_filled')
  assert.deepEqual([...p.alreadyFilled], ['Email of the Customer'])
  assert.equal(p.writes, undefined)
  const p2 = plan(SHEET, { ...REQ, serial: '799' })
  assert.deepEqual([...p2.alreadyFilled], ['Customer discount', 'Name of the Customer', 'Billing adress of the customer'])
})
test('n° de série introuvable / en double → erreur', () => {
  assert.equal(plan(SHEET, { ...REQ, serial: '123' }).error, 'serial_not_found')
  assert.equal(plan(SHEET, { ...REQ, serial: '500' }).error, 'serial_ambiguous')
  assert.equal(plan(SHEET, { ...REQ, serial: '84' }).error, 'serial_not_found') // correspondance EXACTE
})
test('colonne introuvable → erreur avec son nom, rien d’autre', () => {
  const noEmail = SHEET.map((r) => r.filter((_, i) => i !== HEAD.indexOf('Email of the Customer')))
  const p = plan(noEmail, REQ)
  assert.equal(p.error, 'missing_header')
  assert.deepEqual([...p.missing], ['Email of the Customer'])
})
test('en-tête corrigé un jour (« address ») toujours trouvé ; aucune colonne Phone requise', () => {
  const fixed = [HEAD.map((h) => (h === 'Billing adress of the customer' ? 'Billing  Address of the customer ' : h)), ...SHEET.slice(1)]
  assert.equal(plan(fixed, REQ).ok, true)
})
test('remise hors bornes, e-mail invalide, champs manquants → refusés', () => {
  assert.equal(plan(SHEET, { ...REQ, customerDiscount: 7 }).error, 'invalid_discount')
  assert.equal(plan(SHEET, { ...REQ, email: 'pas-un-email' }).error, 'invalid_email')
  assert.equal(plan(SHEET, { ...REQ, name: '' }).error, 'missing_field: name')
  assert.equal(plan(SHEET, { serial: '' }).error, 'missing_field: serial')
})
test('réponse publique : noms de colonnes + valeurs ENVOYÉES, jamais le Sheet ni la ligne', () => {
  const ok = JSON.stringify(publicPlan(plan(SHEET, REQ)))
  assert.ok(!ok.includes('rowIndex') && !ok.includes('Ancien Client') && !ok.includes('"col"'))
  const ko = JSON.stringify(publicPlan(plan(SHEET, { ...REQ, serial: '799' })))
  assert.ok(!ko.includes('Ancien Client') && !ko.includes('Vieux bloc') && !ko.includes('7%'))
})
test('caractères de contrôle retirés, retours à la ligne gardés', () => {
  assert.equal(block({ name: 'A\u0007B', billingAddress: 'l1\n\nl2', vat: '', phone: '' }), 'A\u0007B\nl1\nl2')
  assert.equal(plan(SHEET, { ...REQ, name: 'A\u0007B' }).preview['Name of the Customer'], 'A B')
})

// ── 2. Dépôt serveur vers sale-intake ────────────────────────────────────────
console.log('Dépôt de la vente (saleIntakeCore.js)')
const SALE = {
  customer_name: 'Jeanne Testeuse',
  email: 'Jeanne@Example.test',
  billing_kind: 'particulier',
  billing_name: 'Jeanne Testeuse',
  billing_address: '1 rue du Test',
  billing_postal_code: '75020',
  billing_city: 'Paris',
  billing_country: 'fr',
  terms_accepted: true,
  phone: '+33 6 00 00 00 00',
  model: 'mutant',
  wood: 'frene',
  purchase_mode: 'showroom',
  price_original_eur: 3150,
  price_discounted_eur: 1, // ← menteur : doit être recalculé
  client_request_id: '11111111-2222-4333-8444-555555555555',
  // Injections : ne doivent JAMAIS partir.
  status: 'paid', commission_eur: 999, serial_number: '843', discount_buyer_pct: 50,
  purchase_channel: 'showroom', partner_comment: 'x', reserved_piece_id: '11111111-2222-4333-8444-555555555555',
}
test('interrupteur à false (premier appel réel avec la session APP + feu vert David)', () => {
  assert.equal(SALE_INTAKE_ENABLED, false)
})
test('prix remisé recalculé : −7 % showroom, −5 % en ligne, NOMBRES', () => {
  assert.equal(defaultDiscountedPrice(3150, 'showroom'), 2929.5)
  assert.equal(defaultDiscountedPrice(3150, 'online'), 2992.5)
  assert.equal(defaultDiscountedPrice(3150, ''), undefined)
  const r = buildSaleIntakePayload(SALE, { siteLeadId: 'AAAAAAAA-BBBB-4CCC-8DDD-EEEEEEEEEEEE' })
  assert.equal(r.ok, true)
  assert.equal(r.payload.price_original_eur, 3150)
  assert.equal(r.payload.price_discounted_eur, 2929.5)
  assert.equal(r.payload.purchase_mode, 'showroom')
  assert.equal(r.payload.site_lead_id, 'aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee')
})
test('aucun champ interdit ne sort, quoi que le navigateur envoie', () => {
  const { payload } = buildSaleIntakePayload(SALE)
  for (const k of Object.keys(payload)) {
    assert.ok(!FORBIDDEN_FIELDS.includes(k), `champ interdit ${k}`)
    assert.ok(!/^(deleted_|delete_|payment_|partner_)/.test(k), `préfixe interdit ${k}`)
  }
  assert.equal(payload.partner, 'neotone')
  assert.equal(payload.terms_version, '2026-08-19')
  assert.equal(payload.billing_country, 'FR')
  assert.equal(payload.email, 'jeanne@example.test')
})
test('obligatoires du contrat : refus avec le même motif que l’EF', () => {
  assert.equal(buildSaleIntakePayload({ ...SALE, billing_city: '' }).erreur, 'billing_city')
  assert.equal(buildSaleIntakePayload({ ...SALE, terms_accepted: false }).erreur, 'terms_accepted')
  assert.equal(buildSaleIntakePayload({ ...SALE, billing_kind: 'societe' }).erreur, 'billing_company')
  assert.equal(buildSaleIntakePayload(null).erreur, 'corps_invalide')
})
test('société : TVA/SIRET seulement pour une société ; particulier : jamais', () => {
  const soc = buildSaleIntakePayload({ ...SALE, billing_kind: 'societe', billing_company: 'Test SARL', billing_vat_number: 'FR1', billing_siret: '123' }).payload
  assert.equal(soc.billing_company, 'Test SARL')
  assert.equal(soc.billing_vat_number, 'FR1')
  const part = buildSaleIntakePayload({ ...SALE, billing_vat_number: 'FR1' }).payload
  assert.equal(part.billing_vat_number, undefined)
})
test('prix absent ou invalide → rien envoyé (jamais inventé)', () => {
  const p = buildSaleIntakePayload({ ...SALE, price_original_eur: 'abc' }).payload
  assert.equal(p.price_original_eur, undefined)
  assert.equal(p.price_discounted_eur, undefined)
})
test('réponse de l’EF résumée sans sale_id', () => {
  assert.deepEqual(summarizeSaleIntakeResponse(200, { ok: true, sale_id: 'x', order_ref: 'NEO-1', reused: true }), { ok: true, order_ref: 'NEO-1', reused: true })
  assert.deepEqual(summarizeSaleIntakeResponse(400, { ok: false, erreur: 'piece_indisponible' }), { ok: false, erreur: 'piece_indisponible' })
  assert.deepEqual(summarizeSaleIntakeResponse(429, {}), { ok: false, erreur: 'trop_de_demandes' })
})
test('téléphone : 8 à 15 chiffres', () => {
  assert.equal(isValidPhone('+33 6 10 73 31 52'), true)
  assert.equal(isValidPhone('0610'), false)
  assert.equal(isValidPhone('06 10 73 31 52 abc'), false)
})

console.log(`\n${passed} tests OK`)
