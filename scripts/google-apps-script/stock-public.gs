/**
 * ============================================================
 * 📦 STOCK PUBLIC DES NEOTONE — Google Apps Script AUTONOME
 * ============================================================
 *
 * Rôle : lire le Google Sheet de commandes (onglet « Orders Total ») et ne
 * publier QUE ce dont le site lesagedavid.fr a besoin pour dire quels Neotone
 * sont en stock : modèle, bois, statut, dates d'expédition. RIEN d'autre —
 * ni nom, ni e-mail, ni adresse, ni téléphone, ni n° de série, ni prix.
 * `doGet` est en lecture seule et n'écrit jamais dans le Sheet.
 *
 * ✍️ 10/10/2026 — `doPost` (plus bas) écrit les cases VIOLETTES d'UNE vente
 * (remise, nom, TVA, bloc d'adresse de facturation, e-mail), protégé par un
 * secret partagé (Script Property `WRITE_SECRET`), sans jamais écraser une
 * case déjà remplie. Voir README.md, « Écriture des cases violettes ».
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
 *                  "plannedShipping": "", "actualShipping": "" }, … ] }
 *  Seules les lignes Product = « Neotone » dont « Sale status » vaut
 *  « Available » ou « In transit » sont publiées. Les valeurs sont recopiées
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
var PUBLISHED_STATUSES = ['available', 'in transit']

function doGet() {
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
    if (PUBLISHED_STATUSES.indexOf(norm(row[idx.status])) === -1) continue
    pieces.push({
      model: String(row[idx.model]).trim(),
      wood: String(row[idx.wood]).trim(),
      status: String(row[idx.status]).trim(),
      plannedShipping: String(row[idx.plannedShipping]).trim(),
      actualShipping: String(row[idx.actualShipping]).trim(),
    })
  }
  return { pieces: pieces }
}

/** À lancer depuis l'éditeur (bouton « Exécuter ») pour voir le JSON publié. */
function testerLocalement() {
  var out = doGet().getContent()
  Logger.log(out)
}


// ============================================================
// ✍️ ÉCRITURE DES CASES VIOLETTES — doPost (10/10/2026)
// ============================================================
// Appelé par l'app (EF `send-sale-to-partner`, après le clic de David
// « Envoyer à Neotone »), JAMAIS par un navigateur. Contrat complet dans
// README.md. Règles :
//  · secret partagé obligatoire : Script Property `WRITE_SECRET` (jamais dans
//    le code), comparé au champ `secret` du corps JSON ;
//  · ligne trouvée par « Serial Nr. » = serial (exactement UNE ligne) ;
//  · colonnes repérées PAR LEUR EN-TÊTE, jamais par leur lettre ;
//  · une case déjà remplie n'est JAMAIS écrasée : si une seule des cases à
//    écrire est non vide, RIEN n'est écrit sur la ligne ;
//  · `dryRun: true` → renvoie ce qui serait écrit, sans écrire ;
//  · aucune donnée du Sheet dans la réponse, seulement des noms de colonnes.
//
// Décision de David (10/10/2026) : PAS de colonne « Phone ». Ses mots : « il
// faudra mettre le numéro dans la colonne W "Billing adress of the customer",
// il y a déjà des infos d'anciens clients. Tout dans la même case : nom,
// prénom, adresse, numéro de TVA si applicable ». Cette case reçoit donc UN
// bloc multi-lignes (voir `billingBlock_`).

var WRITE_HEADER_ROW = 1
var SERIAL_HEADER = 'Serial Nr.'
var WRITE_COLUMNS = {
  customerDiscount: 'Customer discount',
  name: 'Name of the Customer',
  vat: 'Valid EU VAT Number',
  billingBlock: 'Billing adress of the customer',
  email: 'Email of the Customer',
}
// Tolérance si l'en-tête est un jour corrigé (« adress » → « address »).
var HEADER_ALIASES = {
  'Billing adress of the customer': ['Billing address of the customer'],
}

function doPost(e) {
  var out
  try {
    var req
    try {
      req = JSON.parse((e && e.postData && e.postData.contents) || '{}')
    } catch (parseErr) {
      return jsonOut_({ ok: false, error: 'invalid_json' })
    }
    var expected = PropertiesService.getScriptProperties().getProperty('WRITE_SECRET') || ''
    if (!expected) return jsonOut_({ ok: false, error: 'not_configured' })
    if (!req || typeof req.secret !== 'string' || !safeEqual_(req.secret, expected)) {
      return jsonOut_({ ok: false, error: 'forbidden' })
    }

    var lock = LockService.getScriptLock()
    if (!lock.tryLock(15000)) return jsonOut_({ ok: false, error: 'busy' })
    try {
      var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(TAB_NAME)
      if (!sheet) return jsonOut_({ ok: false, error: 'missing_tab' })
      // Relu SOUS le verrou : l'état vérifié est celui qu'on écrit.
      var plan = planCustomerWrite_(sheet.getDataRange().getDisplayValues(), req)
      if (!plan.ok) return jsonOut_(publicPlan_(plan))
      if (!req.dryRun) {
        for (var i = 0; i < plan.writes.length; i++) {
          var w = plan.writes[i]
          sheet.getRange(plan.rowIndex + 1, w.col + 1).setValue(w.value)
        }
        SpreadsheetApp.flush()
      }
      out = publicPlan_(plan)
      out.dryRun = !!req.dryRun
      out.written = req.dryRun ? [] : out.columns
      return jsonOut_(out)
    } finally {
      lock.releaseLock()
    }
  } catch (err) {
    // Pas de détail (il pourrait citer le contenu du Sheet).
    return jsonOut_({ ok: false, error: 'write_failed' })
  }
}

/**
 * Cœur de doPost, SANS aucun appel Google (testé par
 * scripts/test-achat-neotone.mjs). Reçoit les valeurs affichées du Sheet
 * (ligne 0 = en-têtes) et la requête ; renvoie
 *   { ok:true, rowIndex, writes:[{col, header, value}], preview:{header:value}, ignored:[] }
 * ou { ok:false, error, alreadyFilled?:[headers], missing?:[headers] }.
 */
function planCustomerWrite_(values, req) {
  if (!values || !values.length) return { ok: false, error: 'empty_sheet' }
  req = req || {}
  var norm = function (v) {
    return String(v == null ? '' : v).trim().replace(/\s+/g, ' ').toLowerCase()
  }
  var clean = function (v, max) {
    if (v === null || v === undefined || typeof v === 'object') return ''
    // Caractères de contrôle retirés, sauf les retours à la ligne.
    return String(v).replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, ' ').replace(/\r\n?/g, '\n').trim().slice(0, max)
  }

  var serial = clean(req.serial, 40)
  if (!serial) return { ok: false, error: 'missing_field: serial' }
  var name = clean(req.name, 160)
  var email = clean(req.email, 200)
  var billingAddress = clean(req.billingAddress, 400)
  var company = clean(req.company, 160)
  var vat = clean(req.vat, 40)
  var phone = clean(req.phone, 40)
  var missingFields = []
  if (!name) missingFields.push('name')
  if (!email) missingFields.push('email')
  if (!billingAddress) missingFields.push('billingAddress')
  if (missingFields.length) return { ok: false, error: 'missing_field: ' + missingFields.join(', ') }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { ok: false, error: 'invalid_email' }

  var discount
  if (req.customerDiscount !== undefined && req.customerDiscount !== null && req.customerDiscount !== '') {
    discount = Number(req.customerDiscount)
    // FRACTION (0.07 = 7 %), comme la formule M ≈ K × (1 − O) du Sheet.
    if (!isFinite(discount) || discount < 0 || discount > 0.5) return { ok: false, error: 'invalid_discount' }
  }

  // ── Colonnes, par en-tête ──
  var headers = values[WRITE_HEADER_ROW - 1].map(norm)
  var findCol = function (label) {
    var i = headers.indexOf(norm(label))
    var alts = HEADER_ALIASES[label] || []
    for (var a = 0; i === -1 && a < alts.length; a++) i = headers.indexOf(norm(alts[a]))
    return i
  }
  var serialCol = findCol(SERIAL_HEADER)
  var missing = []
  if (serialCol === -1) missing.push(SERIAL_HEADER)
  var cols = {}
  for (var k in WRITE_COLUMNS) {
    cols[k] = findCol(WRITE_COLUMNS[k])
    if (cols[k] === -1) missing.push(WRITE_COLUMNS[k])
  }
  if (missing.length) return { ok: false, error: 'missing_header', missing: missing }

  // ── Ligne : exactement UNE ──
  var matches = []
  for (var r = WRITE_HEADER_ROW; r < values.length; r++) {
    if (String(values[r][serialCol]).trim() === serial) matches.push(r)
  }
  if (matches.length === 0) return { ok: false, error: 'serial_not_found' }
  if (matches.length > 1) return { ok: false, error: 'serial_ambiguous' }
  var rowIndex = matches[0]

  // ── Ce qui serait écrit (champs vides = rien à écrire) ──
  var wanted = []
  if (discount !== undefined) wanted.push(['customerDiscount', discount])
  wanted.push(['name', name])
  if (vat) wanted.push(['vat', vat])
  wanted.push(['billingBlock', billingBlock_({ name: name, company: company, billingAddress: billingAddress, vat: vat, phone: phone })])
  wanted.push(['email', email])

  var writes = []
  var already = []
  var preview = {}
  for (var j = 0; j < wanted.length; j++) {
    var key = wanted[j][0]
    var col = cols[key]
    var header = WRITE_COLUMNS[key]
    if (String(values[rowIndex][col] == null ? '' : values[rowIndex][col]).trim() !== '') already.push(header)
    // Remise = nombre (la formule du Sheet calcule avec) ; le reste = texte forcé.
    writes.push({ col: col, header: header, value: key === 'customerDiscount' ? wanted[j][1] : asText_(wanted[j][1]) })
    preview[header] = wanted[j][1]
  }
  // Une seule case déjà remplie → RIEN n'est écrit sur la ligne.
  if (already.length) return { ok: false, error: 'already_filled', alreadyFilled: already }
  return { ok: true, rowIndex: rowIndex, writes: writes, preview: preview }
}

/**
 * Bloc multi-lignes de la case « Billing adress of the customer », dans
 * l'ordre demandé : nom (ou raison sociale — nom) / adresse / VAT / Tel.
 */
function billingBlock_(o) {
  var lines = []
  lines.push(o.company ? o.company + ' — ' + o.name : o.name)
  String(o.billingAddress).split('\n').forEach(function (l) {
    l = l.trim()
    if (l) lines.push(l)
  })
  if (o.vat) lines.push('VAT: ' + o.vat)
  if (o.phone) lines.push('Tel: ' + o.phone)
  return lines.join('\n')
}

/**
 * Force une valeur TEXTE dans la cellule : l'apostrophe initiale (invisible
 * dans le Sheet) empêche « +33… » ou « =… » d'être lu comme un nombre ou une
 * formule (injection de formule).
 */
function asText_(v) {
  return "'" + String(v)
}

/** Ce qui sort vers l'appelant : noms de colonnes et motifs, jamais le Sheet. */
function publicPlan_(plan) {
  if (!plan.ok) {
    var o = { ok: false, error: plan.error }
    if (plan.alreadyFilled) o.alreadyFilled = plan.alreadyFilled
    if (plan.missing) o.missing = plan.missing
    return o
  }
  // `preview` ne contient QUE des valeurs envoyées par l'appelant.
  return { ok: true, columns: plan.writes.map(function (w) { return w.header }), preview: plan.preview }
}

/** Comparaison en temps constant (longueurs différentes → faux). */
function safeEqual_(a, b) {
  if (a.length !== b.length) return false
  var diff = 0
  for (var i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

function jsonOut_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON)
}
