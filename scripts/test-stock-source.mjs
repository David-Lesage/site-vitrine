// Tests de la chaîne « stock Neotone » (Google Sheet → Apps Script → site).
// Lancer :  bun scripts/test-stock-source.mjs
// (bun : il lit directement le TypeScript et l'alias `@/` de tsconfig.json.)
// Sans bun (Mac de David) : via jiti, avec l'alias `@/` → src/ :
//   node -e "import('jiti').then(({createJiti})=>createJiti(process.cwd()+'/',{alias:{'@/':process.cwd()+'/src/'}}).import('./scripts/test-stock-source.mjs'))"
//
// Couvre :
//  1. le cœur de l'Apps Script (`extractPieces_`) : colonnes repérées par nom,
//     filtrage, et AUCUNE donnée client dans la sortie ;
//  2. la transformation `sheetToStockRows` (src/lib/stockSource.js) : données
//     réelles du 09/10/2026 + cas tordus ;
//  3. le résumé par modèle utilisé par les cartes (src/lib/stock.ts).
// Données de test écrites ICI uniquement, jamais dans le code livré.

import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import { fileURLToPath } from 'node:url'
import { sheetToStockRows, parseSheetDate, resolveStockScriptUrl, STOCK_SCRIPT_URL, parseSaleStatus, parseArrivalText, arrivalEndIso, formatArrivalLabel } from '../src/lib/stockSource.js'
import { normalizeStock, modelStockSummary, renderModelStock, renderStockHtml } from '../src/lib/stock.ts'

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

const NOW = new Date('2026-10-09T10:00:00Z')
const LABELS_FOR_PERIOD = { badge: 'In stock', inStock: 'In stock: {woods}', inStockLink: 'showroom', out: 'Not in stock', outLink: 'online', soon: 'Coming soon: {woods}', soonDate: 'expected {date}', soonPeriod: 'expected: {period}' }

// ── 1. Apps Script ──────────────────────────────────────────────────────────
const gsPath = fileURLToPath(new URL('./google-apps-script/stock-public.gs', import.meta.url))
const gs = vm.createContext({})
vm.runInContext(readFileSync(gsPath, 'utf8'), gs)
const extract = gs.extractPieces_

// Colonnes volontairement dans le désordre, avec des données personnelles fictives.
const HEAD = ['Order #', 'Customer name', 'Email', 'Sale status', 'Phone', 'Wood', 'Serial number', 'Product', 'Address', 'Type', 'Price', 'Actual Shipping date', 'Plan Shipping date']
const row = (o) => HEAD.map((h) => o[h] ?? '')
const PII = { 'Customer name': 'Jeanne Testeuse', Email: 'jeanne@example.test', Phone: '+33 6 00 00 00 00', 'Serial number': 'SN-TEST-0001', Address: '1 rue du Test', Price: '3150', 'Order #': 'ORD-42' }
const SHEET = [
  HEAD,
  row({ ...PII, Product: 'Neotone', Type: 'MUTANT', Wood: 'MAHOGANY', 'Sale status': 'Sold' }),
  row({ ...PII, Product: 'Neotone', Type: 'MUTANT', Wood: 'WALNUT', 'Sale status': 'Sold' }),
  row({ ...PII, Product: 'Neotone', Type: 'MUTANT', Wood: 'MAHOGANY', 'Sale status': 'Available' }),
  row({ ...PII, Product: 'Neotone', Type: 'MUTANT', Wood: 'ASH', 'Sale status': 'Available' }),
  row({ ...PII, Product: 'Neotone', Type: 'ONE', Wood: 'ASH', 'Sale status': 'In transit', 'Plan Shipping date': '9/30/2026', 'Actual Shipping date': '10/5/2026' }),
  row({ ...PII, Product: 'Yishama', Type: 'X', Wood: 'ASH', 'Sale status': 'Available' }),
  row({ ...PII, Product: 'Neotone', Type: 'ONE', Wood: 'OAK', 'Sale status': '' }),
  // Valeurs RÉELLES de la colonne L relevées le 25/10/2026.
  row({ ...PII, Product: 'Neotone', Type: 'MUTANT', Wood: 'WALNUT', 'Sale status': 'confirmed' }),
  row({ ...PII, Product: 'Neotone', Type: 'MUTANT', Wood: 'OAK', 'Sale status': 'In transit \n9 - 13 november' }),
  row({ ...PII, Product: 'Neotone', Type: 'ONE', Wood: 'CHERRY', 'Sale status': 'In transit \n2 - 6 October' }),
  // Texte libre qui n'est PAS une date : la ligne est publiée, la « date » non.
  row({ ...PII, Product: 'Neotone', Type: 'ONE', Wood: 'WALNUT', 'Sale status': 'In transit - Jeanne Testeuse' }),
]

console.log('Apps Script (extractPieces_)')
const gsOut = extract(SHEET)
test('ne garde que Neotone + Available / In transit (avec ou sans date), jamais confirmed ni Sold', () => {
  assert.equal(gsOut.error, undefined)
  assert.equal(gsOut.pieces.length, 6)
  assert.ok(!gsOut.pieces.some((p) => /confirmed|sold/i.test(p.status)))
})
test('chaque pièce n’a QUE les 6 champs publics', () => {
  for (const p of gsOut.pieces) assert.deepEqual(Object.keys(p).sort(), ['actualShipping', 'arrivalText', 'model', 'plannedShipping', 'status', 'wood'])
})
test('« In transit \\n9 - 13 november » : statut nettoyé + date dans arrivalText', () => {
  const p = gsOut.pieces.find((x) => x.wood === 'OAK')
  assert.equal(p.status, 'In transit')
  assert.equal(p.arrivalText, '9 - 13 november')
})
test('texte libre non-date après « In transit » : jamais publié', () => {
  const p = gsOut.pieces.find((x) => x.model === 'ONE' && x.wood === 'WALNUT')
  assert.equal(p.status, 'In transit')
  assert.equal(p.arrivalText, '')
})
test('aucune donnée client ni prix dans le JSON publié', () => {
  const json = JSON.stringify(gsOut)
  for (const v of Object.values(PII)) assert.ok(!json.includes(v), `fuite : ${v}`)
})
test('colonnes trouvées par nom même déplacées', () => {
  assert.deepEqual(JSON.parse(JSON.stringify(gsOut.pieces[2])), { model: 'ONE', wood: 'ASH', status: 'In transit', plannedShipping: '9/30/2026', actualShipping: '10/5/2026', arrivalText: '' })
})
test('en-tête manquant → pieces vide + error', () => {
  const noWood = SHEET.map((r) => r.filter((_, i) => i !== HEAD.indexOf('Wood')))
  const out = extract(noWood)
  assert.equal(out.pieces.length, 0)
  assert.match(out.error, /missing_header: Wood/)
})
test('feuille vide → error', () => {
  assert.equal(extract([]).pieces.length, 0)
})

// ── 2. Transformation ───────────────────────────────────────────────────────
console.log('Transformation (sheetToStockRows)')
test('données actuelles du Sheet (09/10/2026)', () => {
  const rows = sheetToStockRows({ updatedAt: 'x', pieces: JSON.parse(JSON.stringify(gsOut.pieces.slice(0, 3))) }, NOW)
  assert.deepEqual(rows, [
    { partner: 'neotone', model: 'mutant', wood: 'acajou', status: 'disponible', expected_arrival_on: null, arrival_label: null },
    { partner: 'neotone', model: 'mutant', wood: 'frene', status: 'disponible', expected_arrival_on: null, arrival_label: null },
    // Plan 30/09 et réelle 05/10 : toutes deux passées → pas de date (« Bientôt », sans date).
    { partner: 'neotone', model: 'one', wood: 'frene', status: 'en_transit', expected_arrival_on: null, arrival_label: null },
  ])
})
test('date future : la plus tardive des deux', () => {
  const rows = sheetToStockRows({ pieces: [{ model: 'ONE', wood: 'OAK', status: 'In transit', plannedShipping: '10/20/2026', actualShipping: '10/25/2026' }] }, NOW)
  assert.equal(rows[0].expected_arrival_on, '2026-10-25')
  const rows2 = sheetToStockRows({ pieces: [{ model: 'ONE', wood: 'OAK', status: 'In transit', plannedShipping: '11/2/2026', actualShipping: '' }] }, NOW)
  assert.equal(rows2[0].expected_arrival_on, '2026-11-02')
})
test('date du jour ou passée → null', () => {
  const r = sheetToStockRows({ pieces: [
    { model: 'ONE', wood: 'OAK', status: 'In transit', plannedShipping: '10/9/2026', actualShipping: '' },
    { model: 'ONE', wood: 'OAK', status: 'In transit', plannedShipping: '1/2/2025', actualShipping: '' },
  ] }, NOW)
  assert.deepEqual(r.map((x) => x.expected_arrival_on), [null, null])
})
test('pièce disponible : jamais de date', () => {
  const r = sheetToStockRows({ pieces: [{ model: 'MUTANT', wood: 'ASH', status: 'Available', plannedShipping: '12/1/2026' }] }, NOW)
  assert.equal(r[0].expected_arrival_on, null)
})
test('bois inconnu, modèle inconnu, statut inconnu, champ manquant → ignorés', () => {
  const r = sheetToStockRows({ pieces: [
    { model: 'MUTANT', wood: 'EBONY', status: 'Available' },
    { model: 'MINI', wood: 'ASH', status: 'Available' },
    { model: 'MUTANT', wood: 'ASH', status: 'Reserved' },
    { model: 'MUTANT', wood: 'ASH', status: 'Sold' },
    { model: 'MUTANT', status: 'Available' },
    { wood: 'ASH', status: 'Available' },
    { model: 'MUTANT', wood: 'ASH' },
    null,
    'texte',
    { model: 42, wood: 'ASH', status: 'Available' },
  ] }, NOW)
  assert.deepEqual(r, [])
})
test('casse et espaces tolérés', () => {
  const r = sheetToStockRows({ pieces: [{ model: ' mutant ', wood: 'walnut', status: 'in  transit', plannedShipping: ' 12/24/2026 ' }] }, NOW)
  assert.deepEqual(r, [{ partner: 'neotone', model: 'mutant', wood: 'noyer', status: 'en_transit', expected_arrival_on: '2026-12-24', arrival_label: null }])
})
// ── Colonne L : statut + période d'arrivée (25/10/2026) ─────────────────────
const NOW_25 = new Date('2026-10-25T10:00:00Z')
test('parseSaleStatus : valeurs réelles de la colonne L', () => {
  assert.deepEqual(parseSaleStatus('Available'), { status: 'disponible', rest: '' })
  assert.deepEqual(parseSaleStatus('In transit \n2 - 6 October'), { status: 'en_transit', rest: '2 - 6 October' })
  assert.deepEqual(parseSaleStatus('In transit \n9 - 13 november'), { status: 'en_transit', rest: '9 - 13 november' })
  assert.deepEqual(parseSaleStatus('In transit'), { status: 'en_transit', rest: '' })
  assert.equal(parseSaleStatus('confirmed').status, null)
  assert.equal(parseSaleStatus('Sold').status, null)
  assert.equal(parseSaleStatus('').status, null)
  assert.equal(parseSaleStatus(undefined).status, null)
})
test('parseArrivalText : formes reconnues, le reste → null', () => {
  assert.equal(parseArrivalText('9 - 13 november'), '9-13 november')
  assert.equal(parseArrivalText('2 - 6 October'), '2-6 october')
  assert.equal(parseArrivalText('28 oct - 3 nov'), '28 october-3 november')
  assert.equal(parseArrivalText('13 novembre'), '13 november')
  assert.equal(parseArrivalText('nov.'), 'november')
  for (const x of ['', 'mid november', 'Jeanne Testeuse', '13 - 9 november', '40 november', 'soon', null, 42]) assert.equal(parseArrivalText(x), null, String(x))
})
test('formatArrivalLabel : traduit selon la langue', () => {
  assert.equal(formatArrivalLabel('9-13 november', 'fr'), '9-13 novembre')
  assert.equal(formatArrivalLabel('9-13 november', 'en'), '9-13 November')
  assert.equal(formatArrivalLabel('9-13 november', 'es'), '9-13 noviembre')
  assert.equal(formatArrivalLabel('28 october-3 november', 'fr'), '28 octobre – 3 novembre')
  assert.equal(formatArrivalLabel('november', 'en'), 'November')
  assert.equal(formatArrivalLabel(null, 'fr'), null)
  assert.equal(formatArrivalLabel('n’importe quoi', 'fr'), null)
})
test('arrivalEndIso : année déduite (janvier lu en novembre = l’an prochain)', () => {
  assert.equal(arrivalEndIso('9-13 november', '2026-10-25'), '2026-11-13')
  assert.equal(arrivalEndIso('2-6 october', '2026-10-25'), '2026-10-06')
  assert.equal(arrivalEndIso('9-13 january', '2026-11-20'), '2027-01-13')
  assert.equal(arrivalEndIso('november', '2026-10-25'), '2026-11-30')
})
test('Sheet réel du 25/10 → arrival_label (futur gardé, passé → null « bientôt »), confirmed ignoré', () => {
  const rows = sheetToStockRows({ pieces: JSON.parse(JSON.stringify(gsOut.pieces)) }, NOW_25)
  const oak = rows.find((r) => r.model === 'mutant' && r.wood === 'chene')
  assert.deepEqual(oak, { partner: 'neotone', model: 'mutant', wood: 'chene', status: 'en_transit', expected_arrival_on: null, arrival_label: '9-13 november' })
  const cherry = rows.find((r) => r.wood === 'cerisier')
  assert.equal(cherry.status, 'en_transit')
  assert.equal(cherry.arrival_label, null) // 2-6 octobre : déjà passé le 25/10
  assert.ok(!rows.some((r) => r.model === 'mutant' && r.wood === 'noyer'), 'confirmed et Sold ne sont jamais disponibles')
  assert.equal(rows.find((r) => r.model === 'one' && r.wood === 'noyer').arrival_label, null)
})
test('ancien Apps Script (statut complet, sans arrivalText) : date lue dans le statut', () => {
  const rows = sheetToStockRows({ pieces: [{ model: 'MUTANT', wood: 'OAK', status: 'In transit \n9 - 13 november', plannedShipping: '', actualShipping: '' }] }, NOW_25)
  assert.equal(rows[0].arrival_label, '9-13 november')
})
test('bloc « disponible » + cartes : la période traduite remplace la date', () => {
  const lines = normalizeStock(sheetToStockRows({ pieces: [{ model: 'MUTANT', wood: 'OAK', status: 'In transit', arrivalText: '9 - 13 november' }] }, NOW_25))
  assert.equal(lines[0].arrivalLabel, '9-13 november')
  const html = renderStockHtml(lines, { title: 'T', availTitle: 'A', soonTitle: 'S', arrivalPrefix: 'prévu le', arrivalPeriod: 'arrivée prévue au showroom : {period}', note: 'n', noteLink: 'l', showroomHref: '/showroom', lang: 'fr', locale: 'fr-FR' })
  assert.match(html, /arrivée prévue au showroom : 9-13 novembre/)
  const card = renderModelStock(lines, 'mutant', { ...LABELS_FOR_PERIOD, lang: 'en', locale: 'en-GB' })
  assert.match(card.detail, /Oak \(expected: 9-13 November\)/)
})
test('réponse illisible → []', () => {
  for (const p of [null, undefined, 'x', 42, {}, { pieces: 'x' }, { error: 'missing_header: Wood', pieces: [] }]) assert.deepEqual(sheetToStockRows(p, NOW), [])
})
test('parseSheetDate', () => {
  assert.equal(parseSheetDate('9/30/2026'), '2026-09-30')
  assert.equal(parseSheetDate('2026-09-30'), '2026-09-30')
  assert.equal(parseSheetDate('13/45/2026'), null)
  assert.equal(parseSheetDate('2/30/2026'), null)
  assert.equal(parseSheetDate('30/09/2026'), null)
  assert.equal(parseSheetDate(''), null)
  assert.equal(parseSheetDate(undefined), null)
})
test('URL : constante = Application Web Apps Script, surcharge par env', () => {
  assert.match(STOCK_SCRIPT_URL, /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/)
  assert.equal(resolveStockScriptUrl({}), STOCK_SCRIPT_URL)
  assert.equal(resolveStockScriptUrl({ STOCK_SCRIPT_URL: ' http://127.0.0.1:1/x ' }), 'http://127.0.0.1:1/x')
})

// ── 3. Cartes des modèles ───────────────────────────────────────────────────
console.log('Cartes des modèles (src/lib/stock.ts)')
const LABELS = { badge: 'En stock', inStock: 'En stock : {woods}', inStockLink: 'showroom', out: 'Pas en stock actuellement', outLink: 'en ligne', soon: 'Bientôt en stock : {woods}', soonDate: 'arrivée prévue le {date}', lang: 'fr', locale: 'fr-FR' }
const lines = normalizeStock(sheetToStockRows({ pieces: JSON.parse(JSON.stringify(gsOut.pieces.slice(0, 3))) }, NOW))
test('Mutant : en stock, Frêne puis Acajou (ordre du nuancier)', () => {
  assert.deepEqual(modelStockSummary(lines, 'mutant'), { state: 'in', available: ['frene', 'acajou'], soon: [] })
  const r = renderModelStock(lines, 'mutant', LABELS)
  assert.match(r.badge, /En stock/)
  assert.match(r.detail, /En stock : Frêne, Acajou/)
  assert.match(r.detail, /data-goto-calc-mode="showroom"/)
})
test('Neotone¹ : pas en stock, bientôt Frêne sans date', () => {
  assert.deepEqual(modelStockSummary(lines, 'one'), { state: 'out', available: [], soon: [{ wood: 'frene', arrival: null, arrivalLabel: null }] })
  const r = renderModelStock(lines, 'one', LABELS)
  assert.equal(r.badge, '')
  assert.match(r.detail, /Pas en stock actuellement/)
  assert.match(r.detail, /data-goto-calc-mode="online" data-goto-calc-model="one"/)
  assert.match(r.detail, /Bientôt en stock : Frêne<\/p>/)
  assert.ok(!r.detail.includes('arrivée prévue'))
})
test('date future affichée en toutes lettres', () => {
  const l2 = normalizeStock(sheetToStockRows({ pieces: [{ model: 'ONE', wood: 'ASH', status: 'In transit', plannedShipping: '10/30/2026' }] }, NOW))
  assert.match(renderModelStock(l2, 'one', LABELS).detail, /Frêne \(arrivée prévue le 30 octobre 2026\)/)
})
test('source vide → rien, ni badge ni grisé', () => {
  for (const m of ['one', 'mutant']) assert.deepEqual(renderModelStock([], m, LABELS), { state: '', badge: '', detail: '' })
})

console.log(`\n${passed} tests réussis.`)
