/**
 * ============================================================
 * 📦 STOCK PUBLIC DES NEOTONE — Google Apps Script AUTONOME
 * ============================================================
 *
 * Rôle : lire le Google Sheet de commandes (onglet « Orders Total ») et ne
 * publier QUE ce dont le site lesagedavid.fr a besoin pour dire quels Neotone
 * sont en stock : modèle, bois, statut, dates d'expédition. RIEN d'autre —
 * ni nom, ni e-mail, ni adresse, ni téléphone, ni n° de série, ni prix.
 * Sortie publique en lecture seule. Depuis le 25/10/2026, deux entrées PRIVÉES
 * protégées par une clé secrète (voir « PARTIE PRIVÉE » en bas du fichier) :
 * la liste des n° de série, et l'écriture des cases violettes d'une vente.
 *
 * Pourquoi un script AUTONOME (créé depuis script.google.com, pas depuis le
 * menu Extensions du Sheet) : le Sheet est partagé avec Neotone, un script lié
 * serait visible et modifiable par eux. Celui-ci t'appartient seul et ouvre le
 * Sheet par son identifiant.
 *
 * ── DÉPLOIEMENT (une seule fois, ~5 minutes) ──────────────────────────────
 *  1. Va sur https://script.google.com → « Nouveau projet ».
 *     Nomme-le par exemple « Stock public Neotone ».
 *  2. Remplace tout le contenu de « Code.gs » par ce fichier, enregistre.
 *  3. (Facultatif) Sélectionne la fonction `testerLocalement` puis « Exécuter » :
 *     Google demande d'autoriser l'accès au Sheet (accepte avec ton compte),
 *     et le journal affiche le JSON qui sera publié. Vérifie qu'il n'y a
 *     aucune donnée personnelle dedans.
 *  4. « Déployer » → « Nouveau déploiement » → type « Application Web » :
 *       · Description   : Stock public Neotone
 *       · Exécuter en tant que : Moi
 *       · Qui peut accéder : Tout le monde
 *     → « Déployer », puis copie l'« URL de l'application Web »
 *       (elle se termine par `/exec`).
 *  5. Colle cette URL dans le dépôt du site, fichier `src/lib/stockSource.js`,
 *     constante `STOCK_SCRIPT_URL` (ou dans la variable d'environnement
 *     Vercel `STOCK_SCRIPT_URL`), puis redéploie le site.
 *
 *  ⚠️ Si tu modifies ce script plus tard : « Déployer » → « Gérer les
 *     déploiements » → crayon → Version : « Nouvelle version ». Ainsi l'URL
 *     reste la même (un « Nouveau déploiement » créerait une autre URL).
 *
 * ── CE QUE LE SCRIPT RENVOIE ──────────────────────────────────────────────
 *  { "updatedAt": "2026-10-09T10:00:00.000Z",
 *    "pieces": [ { "model": "MUTANT", "wood": "ASH", "status": "Available",
 *                  "plannedShipping": "", "actualShipping": "", "arrivalText": "" }, … ] }
 *  Seules les lignes Product = « Neotone » dont « Sale status » vaut
 *  « Available » ou COMMENCE par « In transit » sont publiées ; pour ces
 *  dernières, la date d'arrivée écrite après « In transit » part dans
 *  `arrivalText` (vide si ce n'est pas une date pure, voir `safeDate_`). Les valeurs sont recopiées
 *  telles qu'affichées dans le Sheet ; c'est le site qui les traduit
 *  (voir `sheetToStockRows` dans src/lib/stockSource.js).
 *  Colonne introuvable (en-tête renommé) → `pieces` vide + champ `error` :
 *  le site n'affiche alors rien (jamais de stock inventé).
 * ============================================================
 */

var SHEET_ID = '15fWK_CFnfQWvgrTJHao4rTHKdzmbieaUd5hPqhv6Oi4'
var TAB_NAME = 'Orders Total'

// Colonnes repérées PAR LEUR NOM D'EN-TÊTE (ligne 1), jamais par leur lettre :
// si une colonne est ajoutée ou déplacée dans le Sheet, le script suit.
var COLUMNS = {
  product: 'Product',
  model: 'Type',
  wood: 'Wood',
  plannedShipping: 'Plan Shipping date',
  actualShipping: 'Actual Shipping date',
  status: 'Sale status',
}

// Statuts publiés (comparaison insensible à la casse et aux espaces).
// « In transit » peut être suivi, DANS LA MÊME CASE, d'une date d'arrivée
// précise ou approximative, souvent sur une 2ᵉ ligne : « In transit \n9 - 13 november »
// (relevé du 25/10/2026). Avant cette version, ces lignes étaient PERDUES
// (comparaison exacte). « confirmed » (vente en cours) et « Sold » ne sont
// jamais publiés.
var PUBLISHED_STATUSES = ['available', 'in transit']

// Mots autorisés dans la date d'arrivée publiée : nombres, mois (anglais,
// français, espagnol, abrégés ou non) et liaisons. Si UN SEUL autre mot est
// présent (un nom, une remarque…), la date n'est PAS publiée du tout : la case
// est libre, elle ne doit jamais faire fuiter autre chose qu'une date.
var DATE_WORDS = ('january jan janvier janv enero ene february feb fevrier fev fevr febrero march mar mars marzo ' +
  'april apr avril avr abril abr may mai mayo june jun juin junio july jul juillet juil julio august aug aout agosto ago ' +
  'september sep sept septembre septiembre october oct octobre octubre november nov novembre noviembre ' +
  'december dec decembre diciembre dic to au al a').split(' ')

function doGet(e) {
  // Sortie PRIVÉE (25/10/2026) : n° de série, réservée à l'Edge Function
  // neotone-purchase-action (clé secrète). Sans la clé : sortie publique inchangée.
  if (e && e.parameter && e.parameter.mode === 'private') return privateGet_(e.parameter.key)
  var body
  try {
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(TAB_NAME)
    if (!sheet) {
      body = { updatedAt: new Date().toISOString(), pieces: [], error: 'missing_tab' }
    } else {
      body = extractPieces_(sheet.getDataRange().getDisplayValues())
      body.updatedAt = new Date().toISOString()
    }
  } catch (err) {
    // Pas de détail d'erreur publié (il pourrait citer le contenu du Sheet).
    body = { updatedAt: new Date().toISOString(), pieces: [], error: 'read_failed' }
  }
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON)
}

/**
 * Cœur du script, sans aucun appel Google : reçoit le tableau de valeurs
 * affichées (ligne 0 = en-têtes) et renvoie { pieces } — ou { pieces: [], error }.
 * Chaque pièce est construite champ par champ : aucune autre colonne ne peut
 * fuiter, quelles que soient les colonnes présentes dans le Sheet.
 */
function extractPieces_(values) {
  if (!values || !values.length) return { pieces: [], error: 'empty_sheet' }
  var norm = function (v) {
    return String(v == null ? '' : v).trim().replace(/\s+/g, ' ').toLowerCase()
  }
  var headers = values[0].map(norm)
  var idx = {}
  var missing = []
  for (var k in COLUMNS) {
    var i = headers.indexOf(norm(COLUMNS[k]))
    if (i === -1) missing.push(COLUMNS[k])
    idx[k] = i
  }
  if (missing.length) return { pieces: [], error: 'missing_header: ' + missing.join(', ') }

  var pieces = []
  for (var r = 1; r < values.length; r++) {
    var row = values[r]
    if (norm(row[idx.product]) !== 'neotone') continue
    var st = splitStatus_(row[idx.status])
    if (!st) continue
    pieces.push({
      model: String(row[idx.model]).trim(),
      wood: String(row[idx.wood]).trim(),
      status: st.status,
      plannedShipping: String(row[idx.plannedShipping]).trim(),
      actualShipping: String(row[idx.actualShipping]).trim(),
      arrivalText: st.arrivalText,
    })
  }
  return { pieces: pieces }
}

/**
 * Colonne L → { status, arrivalText } ou null (statut non publié).
 *   « Available »                    → { status: 'Available',  arrivalText: '' }
 *   « In transit \n9 - 13 november » → { status: 'In transit', arrivalText: '9 - 13 november' }
 *   « confirmed », « Sold », vide…   → null
 */
function splitStatus_(value) {
  var flat = String(value == null ? '' : value).replace(/\s+/g, ' ').trim()
  var low = flat.toLowerCase()
  if (low === 'available') return { status: 'Available', arrivalText: '' }
  if (low.indexOf('in transit') !== 0) return null
  var rest = flat.slice('in transit'.length).replace(/^[\s:,;.\-–—()]+/, '').replace(/[()]/g, '').trim()
  return { status: 'In transit', arrivalText: safeDate_(rest) }
}

/** Ne garde le texte que s'il n'est fait QUE de nombres, de mois et de liaisons (40 caractères max). */
function safeDate_(text) {
  if (!text || text.length > 40) return ''
  var plain = text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  var words = plain.split(/[\s.,\/\-–—]+/).filter(function (w) { return w !== '' })
  if (!words.length) return ''
  for (var i = 0; i < words.length; i++) {
    if (/^\d{1,2}$/.test(words[i])) continue
    if (DATE_WORDS.indexOf(words[i]) !== -1) continue
    return ''
  }
  return text
}

/** À lancer depuis l'éditeur (bouton « Exécuter ») pour voir le JSON publié. */
function testerLocalement() {
  var out = doGet().getContent()
  Logger.log(out)
}


// =============================================================================
// PARTIE PRIVÉE (25/10/2026) — processus d'achat en 3 cas
// =============================================================================
// Utilisée UNIQUEMENT par l'Edge Function Supabase `neotone-purchase-action`
// (jamais par le navigateur). Protégée par une clé secrète :
//   Éditeur Apps Script → ⚙️ Paramètres du projet → Propriétés du script →
//   ajouter `PRIVATE_KEY` = une longue chaîne aléatoire (32 caractères ou plus).
//   La même valeur va dans le secret Supabase `STOCK_PRIVATE_KEY`, et l'URL
//   /exec de ce script dans `STOCK_PRIVATE_URL`.
// Sans `PRIVATE_KEY` posée, les deux entrées privées refusent tout.
//
//  GET  ?mode=private&key=…  → { pieces: [{ serial, model, wood, status, arrivalText }] }
//       (lignes Neotone « Available » ou « In transit … » seulement)
//  POST { key, action: 'write_sale', serial, fields: { '<en-tête>': '<valeur>' } }
//       → écrit les cases de la ligne de ce n° de série, PAR NOM D'EN-TÊTE.
//       Ne remplace JAMAIS une case déjà remplie : si une seule des cases visées
//       est non vide, RIEN n'est écrit et la réponse liste les conflits.
//       En-têtes autorisés (cases violettes, procédure du 09-10/10) : WRITABLE_HEADERS.

// ⚠️ À VÉRIFIER dans le Sheet : l'en-tête EXACT de la colonne des n° de série.
// Le script prend le premier de cette liste qu'il trouve en ligne 1.
var SERIAL_HEADERS = ['Serial number', 'Serial No', 'Serial', 'SN', 'S/N', 'Number', 'No', '#']

var WRITABLE_HEADERS = [
  'Customer discount',
  'Name of the Customer',
  'Valid EU VAT Number',
  'Billing adress of the customer',
  'Email of the Customer',
]

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}

function keyOk_(key) {
  var expected = PropertiesService.getScriptProperties().getProperty('PRIVATE_KEY') || ''
  if (expected.length < 16 || !key || String(key).length !== expected.length) return false
  var diff = 0
  for (var i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ String(key).charCodeAt(i)
  return diff === 0
}

function normH_(v) { return String(v == null ? '' : v).trim().replace(/\s+/g, ' ').toLowerCase() }

function serialIndex_(headers) {
  for (var i = 0; i < SERIAL_HEADERS.length; i++) {
    var j = headers.indexOf(normH_(SERIAL_HEADERS[i]))
    if (j !== -1) return j
  }
  return -1
}

function privateGet_(key) {
  if (!keyOk_(key)) return json_({ pieces: [], error: 'forbidden' })
  try {
    var values = SpreadsheetApp.openById(SHEET_ID).getSheetByName(TAB_NAME).getDataRange().getDisplayValues()
    return json_(extractPrivatePieces_(values))
  } catch (err) {
    return json_({ pieces: [], error: 'read_failed' })
  }
}

/** Comme extractPieces_, plus le n° de série. Sans appel Google (testable). */
function extractPrivatePieces_(values) {
  var pub = extractPieces_(values)
  if (pub.error) return pub
  var headers = values[0].map(normH_)
  var si = serialIndex_(headers)
  if (si === -1) return { pieces: [], error: 'missing_header: serial' }
  var idx = {}
  for (var k in COLUMNS) idx[k] = headers.indexOf(normH_(COLUMNS[k]))
  var pieces = []
  for (var r = 1; r < values.length; r++) {
    var row = values[r]
    if (normH_(row[idx.product]) !== 'neotone') continue
    var st = splitStatus_(row[idx.status])
    if (!st) continue
    var serial = String(row[si]).trim().replace(/^#/, '')
    if (!serial) continue
    pieces.push({ serial: serial, model: String(row[idx.model]).trim(), wood: String(row[idx.wood]).trim(), status: st.status, arrivalText: st.arrivalText })
  }
  return { pieces: pieces }
}

function doPost(e) {
  var req
  try { req = JSON.parse(e.postData.contents) } catch (err) { return json_({ ok: false, error: 'bad_json' }) }
  if (!keyOk_(req.key)) return json_({ ok: false, error: 'forbidden' })
  if (req.action !== 'write_sale') return json_({ ok: false, error: 'unknown_action' })
  var lock = LockService.getScriptLock()
  if (!lock.tryLock(10000)) return json_({ ok: false, error: 'busy' })
  try {
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(TAB_NAME)
    var range = sheet.getDataRange()
    var plan = planSaleWrite_(range.getDisplayValues(), String(req.serial || ''), req.fields || {})
    if (!plan.ok) return json_(plan)
    for (var i = 0; i < plan.cells.length; i++) {
      sheet.getRange(plan.cells[i].row, plan.cells[i].col).setValue(plan.cells[i].value)
    }
    return json_({ ok: true, row: plan.row })
  } catch (err) {
    return json_({ ok: false, error: 'write_failed' })
  } finally {
    lock.releaseLock()
  }
}

/**
 * Cœur de l'écriture, sans appel Google (testable) : où écrire quoi, ou pourquoi pas.
 * Lignes/colonnes rendues en numérotation Sheets (1 = première).
 */
function planSaleWrite_(values, serial, fields) {
  var headers = values[0].map(normH_)
  var si = serialIndex_(headers)
  if (si === -1) return { ok: false, error: 'missing_header: serial' }
  var want = String(serial).trim().replace(/^#/, '')
  if (!want) return { ok: false, error: 'serial_not_found' }
  var rowIdx = -1
  for (var r = 1; r < values.length; r++) {
    if (String(values[r][si]).trim().replace(/^#/, '') === want) { rowIdx = r; break }
  }
  if (rowIdx === -1) return { ok: false, error: 'serial_not_found' }
  var cells = [], conflicts = [], missing = []
  for (var h in fields) {
    if (WRITABLE_HEADERS.indexOf(h) === -1) continue
    var c = headers.indexOf(normH_(h))
    if (c === -1) { missing.push(h); continue }
    if (String(values[rowIdx][c]).trim() !== '') { conflicts.push(h); continue }
    cells.push({ row: rowIdx + 1, col: c + 1, value: String(fields[h]) })
  }
  if (missing.length) return { ok: false, error: 'missing_header: ' + missing.join(', ') }
  if (conflicts.length) return { ok: false, error: 'conflict', conflicts: conflicts }
  return { ok: true, row: rowIdx + 1, cells: cells }
}
