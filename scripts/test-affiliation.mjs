// Tests de la logique pure du lien d'affiliation (21/10/2026).
// Lancer : node scripts/test-affiliation.mjs
// Couvre src/scripts/affiliation-core.mjs (spec : src/data/affiliation.ts).
import assert from 'node:assert/strict'
import {
  STORAGE_KEY,
  TTL_MS,
  captureRef,
  decorateHref,
  isAppUrl,
  normalizeRef,
  parseStored,
  readRef,
  serializeEntry,
  stripRefParam,
} from '../src/scripts/affiliation-core.mjs'

let passed = 0
let failed = 0
function test(name, fn) {
  try {
    fn()
    passed++
    console.log('  ok  ' + name)
  } catch (e) {
    failed++
    console.log('  ÉCHEC  ' + name + '\n        ' + (e && e.message ? e.message.split('\n').join('\n        ') : e))
  }
}

class MemoryStorage {
  constructor(init = {}) {
    this.map = new Map(Object.entries(init))
    this.writes = 0
  }
  getItem(k) {
    return this.map.has(k) ? this.map.get(k) : null
  }
  setItem(k, v) {
    this.writes++
    this.map.set(k, String(v))
  }
  removeItem(k) {
    this.map.delete(k)
  }
}
class BrokenStorage {
  getItem() {
    throw new Error('SecurityError')
  }
  setItem() {
    throw new Error('QuotaExceededError')
  }
  removeItem() {
    throw new Error('SecurityError')
  }
}

const NOW = Date.parse('2026-10-21T10:00:00.000Z')
const DAY = 24 * 60 * 60 * 1000

console.log('Normalisation et format')
test('code valide', () => assert.equal(normalizeRef('K7M3QX'), 'K7M3QX'))
test('minuscules → majuscules', () => assert.equal(normalizeRef('k7m3qx'), 'K7M3QX'))
test('espaces autour retirés', () => assert.equal(normalizeRef('  k7M3qx \n'), 'K7M3QX'))
test('espace au milieu refusé', () => assert.equal(normalizeRef('K7M 3QX'), null))
for (const bad of ['K7M3Q0', 'K7M3QO', 'K7M3Q1', 'K7M3QI', 'k7m3qi', 'k7m3qo']) {
  test('caractère interdit refusé : ' + bad, () => assert.equal(normalizeRef(bad), null))
}
// ⚠️ La lettre L : la regex FIGÉE de la spec (^[A-HJ-NP-Z2-9]{6}$) l'ACCEPTE
// (la plage J-N contient J K L M N). Seuls 0 O 1 I sont exclus. Le site suit la
// regex à la lettre, pour accepter tout code produit par le moteur de l'app.
// Si la session Affiliation exclut L, changer REF_RE ET ce test ensemble.
test('lettre L : acceptée par la regex figée', () => assert.equal(normalizeRef('k7m3ql'), 'K7M3QL'))
test('trop court / trop long refusé', () => {
  assert.equal(normalizeRef('K7M3Q'), null)
  assert.equal(normalizeRef('K7M3QXA'), null)
})
test('symboles et accents refusés', () => {
  assert.equal(normalizeRef('K7M-QX'), null)
  assert.equal(normalizeRef('K7M3QÉ'), null)
})
test('valeurs non textuelles refusées', () => {
  assert.equal(normalizeRef(null), null)
  assert.equal(normalizeRef(undefined), null)
  assert.equal(normalizeRef(123456), null)
  assert.equal(normalizeRef(''), null)
})

console.log('Capture, conservation, priorité')
test('premier code valide écrit au bon format', () => {
  const s = new MemoryStorage()
  assert.equal(captureRef(s, 'k7m3qx', NOW), 'K7M3QX')
  assert.deepEqual(JSON.parse(s.getItem(STORAGE_KEY)), { code: 'K7M3QX', vu_le: '2026-10-21T10:00:00.000Z' })
})
test('code invalide ignoré en silence : rien écrit', () => {
  const s = new MemoryStorage()
  assert.equal(captureRef(s, 'K7M3Q0', NOW), null)
  assert.equal(s.writes, 0)
  assert.equal(s.getItem(STORAGE_KEY), null)
})
test('code invalide n’écrase pas un code valide gardé', () => {
  const s = new MemoryStorage({ [STORAGE_KEY]: serializeEntry('K7M3QX', NOW - 5 * DAY) })
  assert.equal(captureRef(s, 'zzzz', NOW), 'K7M3QX')
  assert.equal(s.writes, 0)
})
test('code non expiré conservé face à un second code valide', () => {
  const stored = serializeEntry('K7M3QX', NOW - 89 * DAY)
  const s = new MemoryStorage({ [STORAGE_KEY]: stored })
  assert.equal(captureRef(s, 'ABCDEF', NOW), 'K7M3QX')
  assert.equal(s.getItem(STORAGE_KEY), stored)
  assert.equal(s.writes, 0)
})
test('exactement 90 jours : encore valide', () => {
  const s = new MemoryStorage({ [STORAGE_KEY]: serializeEntry('K7M3QX', NOW - TTL_MS) })
  assert.equal(readRef(s, NOW).code, 'K7M3QX')
})
test('code expiré remplacé par le nouveau', () => {
  const s = new MemoryStorage({ [STORAGE_KEY]: serializeEntry('K7M3QX', NOW - 91 * DAY) })
  assert.equal(captureRef(s, 'abcdef', NOW), 'ABCDEF')
  assert.equal(JSON.parse(s.getItem(STORAGE_KEY)).code, 'ABCDEF')
})
test('code expiré effacé à la lecture', () => {
  const s = new MemoryStorage({ [STORAGE_KEY]: serializeEntry('K7M3QX', NOW - TTL_MS - 1) })
  assert.equal(readRef(s, NOW), null)
  assert.equal(s.getItem(STORAGE_KEY), null)
})
test('code expiré + nouveau code invalide : effacé, rien écrit', () => {
  const s = new MemoryStorage({ [STORAGE_KEY]: serializeEntry('K7M3QX', NOW - 100 * DAY) })
  assert.equal(captureRef(s, 'O0O0O0', NOW), null)
  assert.equal(s.getItem(STORAGE_KEY), null)
  assert.equal(s.writes, 0)
})
test('valeur illisible effacée puis remplacée', () => {
  for (const junk of ['pas du json', '{"code":"K7M3Q0","vu_le":"2026-10-01T00:00:00Z"}', '{"code":"k7m3qx","vu_le":"2026-10-01T00:00:00Z"}', '{"code":"K7M3QX"}', '{"code":"K7M3QX","vu_le":"hier"}', 'null']) {
    const s = new MemoryStorage({ [STORAGE_KEY]: junk })
    assert.equal(parseStored(junk, NOW).entry, null, junk)
    assert.equal(captureRef(s, 'ABCDEF', NOW), 'ABCDEF', junk)
    assert.equal(JSON.parse(s.getItem(STORAGE_KEY)).code, 'ABCDEF', junk)
  }
})
test('stockage indisponible : aucune exception, lecture nulle', () => {
  const s = new BrokenStorage()
  assert.doesNotThrow(() => readRef(s, NOW))
  assert.equal(readRef(s, NOW), null)
  assert.doesNotThrow(() => captureRef(s, 'K7M3QX', NOW))
  assert.equal(captureRef(s, 'K7M3QX', NOW), 'K7M3QX') // utilisable pour la page en cours
  assert.equal(captureRef(s, 'K7M3Q0', NOW), null)
})

console.log('Décoration des liens vers l’application')
test('les 4 hôtes de l’app reconnus, pas les autres', () => {
  for (const h of ['play.handpanstudio.app', 'play.handpan-studio.app', 'play.neotone-studio.app', 'play.neotonestudio.app']) {
    assert.ok(isAppUrl('https://' + h + '/'), h)
  }
  assert.ok(isAppUrl('https://PLAY.HANDPANSTUDIO.APP/x'))
  for (const h of ['https://handpanstudio.app/', 'https://www.lesagedavid.fr/handpan-app/', 'https://evil.play.handpanstudio.app.example.com/', 'mailto:x@play.handpanstudio.app', '/handpan-app/']) {
    assert.ok(!isAppUrl(h), h)
  }
})
test('lien nu → ?ref=CODE', () =>
  assert.equal(decorateHref('https://play.handpanstudio.app', 'K7M3QX'), 'https://play.handpanstudio.app/?ref=K7M3QX'))
test('paramètres existants gardés tels quels', () =>
  assert.equal(
    decorateHref('https://play.handpanstudio.app/?lang=fr&q=a%20b+c', 'K7M3QX'),
    'https://play.handpanstudio.app/?lang=fr&q=a%20b+c&ref=K7M3QX',
  ))
test('ancre gardée', () =>
  assert.equal(decorateHref('https://play.handpanstudio.app/app?x=1#studio', 'K7M3QX'), 'https://play.handpanstudio.app/app?x=1&ref=K7M3QX#studio'))
test('ancre sans paramètre', () =>
  assert.equal(decorateHref('https://play.neotonestudio.app/#a', 'K7M3QX'), 'https://play.neotonestudio.app/?ref=K7M3QX#a'))
test('ref déjà présent : pas de doublon, lien inchangé', () => {
  assert.equal(decorateHref('https://play.handpanstudio.app/?ref=ABCDEF', 'K7M3QX'), null)
  assert.equal(decorateHref('https://play.handpanstudio.app/?a=1&ref=', 'K7M3QX'), null)
})
test('lien interne au site inchangé', () => assert.equal(decorateHref('https://www.lesagedavid.fr/handpan-app/', 'K7M3QX'), null))
test('code invalide : lien inchangé', () => assert.equal(decorateHref('https://play.handpanstudio.app/', 'K7M3Q0'), null))

console.log('Nettoyage de l’URL de la page')
test('seul ref est retiré, le reste et le hash restent', () => {
  const r = stripRefParam('https://www.lesagedavid.fr/handpan-app/?utm=x&ref=k7m3qx&b=a%20b#prix')
  assert.equal(r.ref, 'k7m3qx')
  assert.equal(r.href, 'https://www.lesagedavid.fr/handpan-app/?utm=x&b=a%20b#prix')
})
test('ref seul → URL sans « ? »', () => {
  const r = stripRefParam('https://www.lesagedavid.fr/handpan-app/?ref=K7M3QX')
  assert.equal(r.href, 'https://www.lesagedavid.fr/handpan-app/')
})
test('ref multiples : premier lu, tous retirés', () => {
  const r = stripRefParam('https://www.lesagedavid.fr/?ref=AAAAAA&x=1&ref=BBBBBB')
  assert.equal(r.ref, 'AAAAAA')
  assert.equal(r.href, 'https://www.lesagedavid.fr/?x=1')
})
test('pas de ref : rien à faire', () => {
  const r = stripRefParam('https://www.lesagedavid.fr/handpan-app/?referer=1#x')
  assert.deepEqual(r, { ref: null, href: null })
})

console.log(`\n${passed} réussi(s), ${failed} échec(s)`)
process.exit(failed ? 1 : 0)
