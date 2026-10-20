/**
 * ============================================================
 * 📦 STOCK PUBLIC DES NEOTONE — Google Apps Script AUTONOME
 * ============================================================
 *
 * Rôle : lire le Google Sheet de commandes (onglet « Orders Total ») et ne
 * publier QUE ce dont le site lesagedavid.fr a besoin pour dire quels Neotone
 * sont en stock : modèle, bois, statut, dates d'expédition. RIEN d'autre —
 * ni nom, ni e-mail, ni adresse, ni téléphone, ni n° de série, ni prix.
 * Lecture seule : ce script n'écrit jamais dans le Sheet.
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
