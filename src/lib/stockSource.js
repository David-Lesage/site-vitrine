// ============================================================
// 📦 SOURCE DU STOCK NEOTONE : le Google Sheet de David, via un
// Google Apps Script publié en « Application Web ».
//
// Module en JavaScript PUR (pas de TypeScript, aucune dépendance) parce
// qu'il est importé à DEUX endroits qui n'ont pas la même chaîne d'outils :
//   · `api/stock.js`   → fonction serverless Vercel (Node, sans Vite) ;
//   · `src/lib/stock.ts` → build Astro (Vite) et script client de la page.
// Ainsi l'URL et la transformation n'existent qu'à UN seul endroit.
// Testé par `scripts/test-stock-source.mjs` (`node scripts/test-stock-source.mjs`).
//
// Chaîne complète :
//   Google Sheet « Orders Total »
//     → Apps Script `scripts/google-apps-script/stock-public.gs`
//       (ne publie QUE modèle / bois / statut / dates d'expédition, jamais
//        de nom, e-mail, adresse, téléphone, n° de série ni prix)
//     → `sheetToStockRows()` ci-dessous (traduit vers le format du site)
//     → `normalizeStock()` de src/lib/stock.ts (regroupe et trie pour l'affichage).
//
// ⚠️ RÈGLE ABSOLUE : lecture seule, rien d'inventé. Une valeur inconnue
// (modèle, bois, statut) ⇒ la ligne est ignorée, jamais devinée.
// ============================================================

/**
 * URL de l'Application Web Apps Script (se termine par `/exec`).
 * 👉 DAVID : après le déploiement de `scripts/google-apps-script/stock-public.gs`,
 *    colle l'URL ici, entre les apostrophes, puis redéploie le site.
 * VIDE ⇒ aucune source ⇒ la page n'affiche rien et ne grise rien.
 * Peut être surchargée par la variable d'environnement `STOCK_SCRIPT_URL`
 * (Vercel → Settings → Environment Variables, ou en local pour les tests).
 */
export const STOCK_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyTg-PJqlFx9qW3RzP-vziucOH2xYuDl3ntnpLods3LX5zIdzGHuz8E6m5uS0P1j6E7/exec'

/** Délai maximal d'attente de l'Apps Script (ms). Il répond en général en 1 à 3 s. */
export const STOCK_FETCH_TIMEOUT_MS = 8000

/** Type « ONE » / « MUTANT » du Sheet → identifiant de modèle du site. */
const MODEL_MAP = { ONE: 'one', MUTANT: 'mutant' }

/** Essence du Sheet (anglais) → clé de bois du site (voir src/data/neotone.ts). */
const WOOD_MAP = { ASH: 'frene', OAK: 'chene', MAHOGANY: 'acajou', CHERRY: 'cerisier', WALNUT: 'noyer' }

/**
 * « Sale status » (colonne L) du Sheet → statut du site.
 * Valeurs réelles relevées le 25/10/2026 :
 *   « Available »                      → disponible
 *   « In transit \n9 - 13 november »   → en_transit + période d'arrivée (texte libre)
 *   « confirmed »                      → vente en cours = RÉSERVÉ → ignoré (pas disponible)
 *   « Sold »                           → ignoré
 * Tout autre statut (vide, inconnu…) est ignoré. Voir `parseSaleStatus()`.
 */
const STATUS_MAP = { AVAILABLE: 'disponible', 'IN TRANSIT': 'en_transit' }

/**
 * Mois reconnus dans le texte libre de la colonne L (anglais, français,
 * espagnol, abréviations). Clé en MAJUSCULES sans accent → numéro du mois.
 */
const MONTHS = (() => {
  const names = [
    ['JANUARY', 'JAN', 'JANVIER', 'JANV', 'ENERO', 'ENE'],
    ['FEBRUARY', 'FEB', 'FEVRIER', 'FEV', 'FEVR', 'FEBRERO'],
    ['MARCH', 'MAR', 'MARS', 'MARZO'],
    ['APRIL', 'APR', 'AVRIL', 'AVR', 'ABRIL', 'ABR'],
    ['MAY', 'MAI', 'MAYO'],
    ['JUNE', 'JUN', 'JUIN', 'JUNIO'],
    ['JULY', 'JUL', 'JUILLET', 'JUIL', 'JULIO'],
    ['AUGUST', 'AUG', 'AOUT', 'AGOSTO', 'AGO'],
    ['SEPTEMBER', 'SEP', 'SEPT', 'SEPTEMBRE', 'SEPTIEMBRE'],
    ['OCTOBER', 'OCT', 'OCTOBRE', 'OCTUBRE'],
    ['NOVEMBER', 'NOV', 'NOVEMBRE', 'NOVIEMBRE'],
    ['DECEMBER', 'DEC', 'DECEMBRE', 'DICIEMBRE', 'DIC'],
  ]
  /** @type {Record<string, number>} */
  const out = {}
  names.forEach((list, i) => list.forEach((n) => { out[n] = i + 1 }))
  return out
})()

/** Noms de mois pour l'AFFICHAGE, par langue du site. */
const MONTH_NAMES = {
  fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
}
const MONTH_KEYS_EN = MONTH_NAMES.en.map((m) => m.toLowerCase())

/**
 * URL effectivement utilisée : variable d'environnement d'abord, sinon la constante.
 * @param {Record<string, string | undefined> | undefined} [env]
 * @returns {string}
 */
export function resolveStockScriptUrl(env) {
  const fromEnv = env && typeof env.STOCK_SCRIPT_URL === 'string' ? env.STOCK_SCRIPT_URL.trim() : ''
  return fromEnv || STOCK_SCRIPT_URL.trim()
}

const key = (v) => (typeof v === 'string' ? v.trim().replace(/\s+/g, ' ').toUpperCase() : '')

/**
 * Date du Sheet → « AAAA-MM-JJ », ou null si absente / illisible.
 * Formats acceptés : M/D/YYYY (affichage du Sheet, ex. « 9/30/2026 ») et AAAA-MM-JJ.
 * @param {unknown} v
 * @returns {string | null}
 */
export function parseSheetDate(v) {
  if (typeof v !== 'string') return null
  const s = v.trim()
  let y, m, d
  let match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(s)
  if (match) {
    m = Number(match[1])
    d = Number(match[2])
    y = Number(match[3])
  } else if ((match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s))) {
    y = Number(match[1])
    m = Number(match[2])
    d = Number(match[3])
  } else {
    return null
  }
  // Rejette les dates impossibles (13/45/2026, 2/30/2026…).
  const probe = new Date(Date.UTC(y, m - 1, d))
  if (probe.getUTCFullYear() !== y || probe.getUTCMonth() !== m - 1 || probe.getUTCDate() !== d) return null
  return `${String(y).padStart(4, '0')}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

/**
 * Date du jour à Paris, « AAAA-MM-JJ » (le showroom est à Paris).
 * @param {Date} now
 */
export function todayInParis(now) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)
}

/**
 * Lit la colonne L « Sale status ». Le statut « In transit » peut être suivi,
 * dans la MÊME case, d'une date précise ou approximative (souvent sur une
 * deuxième ligne) : « In transit \n9 - 13 november ». On sépare les deux.
 * @param {unknown} raw
 * @returns {{ status: 'disponible' | 'en_transit' | null, rest: string }}
 */
export function parseSaleStatus(raw) {
  if (typeof raw !== 'string') return { status: null, rest: '' }
  const flat = raw.replace(/\s+/g, ' ').trim()
  const k = flat.toUpperCase()
  if (STATUS_MAP[k]) return { status: STATUS_MAP[k], rest: '' }
  const m = /^IN TRANSIT\b[\s:,;.\-–—()]*(.*)$/i.exec(flat)
  if (m) return { status: 'en_transit', rest: m[1].replace(/[()]/g, '').trim() }
  return { status: null, rest: '' }
}

const fold = (s) => s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toUpperCase()

/**
 * Période d'arrivée écrite à la main dans la colonne L → forme CANONIQUE
 * neutre (jour(s) + mois anglais en minuscules), ou null si le texte n'est pas
 * reconnu. Seule cette forme reconstruite est publiée : jamais le texte brut
 * (une case libre pourrait contenir autre chose qu'une date).
 *   « 9 - 13 november »        → « 9-13 november »
 *   « 2 - 6 October »          → « 2-6 october »
 *   « 28 oct - 3 nov »         → « 28 october-3 november »
 *   « 13 novembre »            → « 13 november »
 *   « november » / « nov. »    → « november »
 * @param {unknown} text
 * @returns {string | null}
 */
export function parseArrivalText(text) {
  if (typeof text !== 'string') return null
  const s = fold(text).replace(/\s+/g, ' ').replace(/[.,]/g, ' ').replace(/\s*[-–—]\s*|\s+(?:TO|AU|AL|A)\s+/g, '-').replace(/\s+/g, ' ').trim()
  if (!s || s.length > 40) return null
  const mon = (w) => MONTHS[w] ?? null
  const day = (d) => { const n = Number(d); return n >= 1 && n <= 31 ? n : null }
  const M = '([A-Z]+)'
  let m
  // « 9-13 NOVEMBER »
  if ((m = new RegExp(`^(\\d{1,2})-(\\d{1,2}) ${M}$`).exec(s))) {
    const d1 = day(m[1]), d2 = day(m[2]), mo = mon(m[3])
    if (d1 && d2 && mo && d1 < d2) return `${d1}-${d2} ${MONTH_KEYS_EN[mo - 1]}`
    return null
  }
  // « 28 OCTOBER-3 NOVEMBER »
  if ((m = new RegExp(`^(\\d{1,2}) ${M}-(\\d{1,2}) ${M}$`).exec(s))) {
    const d1 = day(m[1]), m1 = mon(m[2]), d2 = day(m[3]), m2 = mon(m[4])
    if (d1 && m1 && d2 && m2 && m1 !== m2) return `${d1} ${MONTH_KEYS_EN[m1 - 1]}-${d2} ${MONTH_KEYS_EN[m2 - 1]}`
    return null
  }
  // « 13 NOVEMBER »
  if ((m = new RegExp(`^(\\d{1,2}) ${M}$`).exec(s))) {
    const d = day(m[1]), mo = mon(m[2])
    return d && mo ? `${d} ${MONTH_KEYS_EN[mo - 1]}` : null
  }
  // « NOVEMBER »
  if ((m = new RegExp(`^${M}$`).exec(s))) {
    const mo = mon(m[1])
    return mo ? MONTH_KEYS_EN[mo - 1] : null
  }
  return null
}

/** Décompose une forme canonique (voir parseArrivalText) en morceaux. */
function splitCanonical(label) {
  if (typeof label !== 'string') return null
  const parts = label.split('-').map((p) => p.trim())
  /** @type {{ d: number | null, m: number }[]} */
  const out = []
  let pendingDay = null
  for (const p of parts) {
    const mm = /^(?:(\d{1,2}) )?([a-z]+)$/.exec(p)
    if (mm) {
      const mo = MONTH_KEYS_EN.indexOf(mm[2]) + 1
      if (!mo) return null
      if (pendingDay !== null) out.push({ d: pendingDay, m: mo })
      out.push({ d: mm[1] ? Number(mm[1]) : null, m: mo })
      pendingDay = null
    } else if (/^\d{1,2}$/.test(p)) {
      pendingDay = Number(p)
    } else return null
  }
  if (pendingDay !== null || !out.length || out.length > 2) return null
  return out
}

/**
 * Dernier jour de la période (« AAAA-MM-JJ »), année déduite : l'année en
 * cours, ou la suivante si la date tombe plus de 60 jours dans le passé
 * (« 9-13 january » lu en novembre = janvier prochain).
 * @param {string} label  forme canonique
 * @param {string} today  « AAAA-MM-JJ » (Paris)
 * @returns {string | null}
 */
export function arrivalEndIso(label, today) {
  const parts = splitCanonical(label)
  if (!parts) return null
  const end = parts[parts.length - 1]
  const y = Number(today.slice(0, 4))
  const iso = (yy) => {
    const last = new Date(Date.UTC(yy, end.m, 0)).getUTCDate()
    const d = end.d ?? last
    if (d > last) return null
    return `${yy}-${String(end.m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  }
  const cur = iso(y)
  if (!cur) return null
  const limit = new Date(`${today}T12:00:00Z`)
  limit.setUTCDate(limit.getUTCDate() - 60)
  return cur < limit.toISOString().slice(0, 10) ? iso(y + 1) : cur
}

/**
 * Forme canonique → texte affiché dans la langue de la page.
 *   « 9-13 november » → fr « 9-13 novembre » · en « 9-13 November » · es « 9-13 noviembre »
 * null si absente ou illisible : l'appelant affiche alors « bientôt ».
 * @param {string | null | undefined} label
 * @param {string} lang  'fr' | 'en' | 'es'
 * @returns {string | null}
 */
export function formatArrivalLabel(label, lang) {
  const parts = splitCanonical(label ?? '')
  if (!parts) return null
  const names = MONTH_NAMES[lang] ?? MONTH_NAMES.fr
  const one = (p) => (p.d ? `${p.d} ${names[p.m - 1]}` : names[p.m - 1])
  if (parts.length === 1) return one(parts[0])
  const [a, b] = parts
  if (a.m === b.m && a.d && b.d) return `${a.d}-${b.d} ${names[b.m - 1]}`
  return `${one(a)} – ${one(b)}`
}

/**
 * @typedef {{ partner: 'neotone', model: 'one' | 'mutant', wood: string, status: 'disponible' | 'en_transit', expected_arrival_on: string | null, arrival_label: string | null }} StockRow
 */

/**
 * Transformation PURE : réponse de l'Apps Script → lignes au format attendu par
 * `normalizeStock()` (src/lib/stock.ts). Seule et unique implémentation : la
 * fonction Vercel ET le build l'utilisent.
 *
 * Règles :
 *  · modèle, bois ou statut inconnu / absent ⇒ ligne ignorée ;
 *  · `expected_arrival_on` : la plus tardive des deux dates d'expédition
 *    (prévue / réelle), et SEULEMENT si elle est postérieure à aujourd'hui.
 *    Date passée ou absente ⇒ null (« Bientôt disponible », sans date).
 *    Une pièce « disponible » n'a jamais de date.
 *  · `arrival_label` (25/10/2026) : période d'arrivée au showroom écrite dans
 *    la colonne L (« In transit \n9 - 13 november »), sous forme canonique
 *    (« 9-13 november »), ou null si absente, illisible ou déjà passée.
 *    Traduite à l'affichage par `formatArrivalLabel()`.
 *
 * @param {unknown} payload  `{ updatedAt, pieces: [{ model, wood, status, plannedShipping, actualShipping, arrivalText? }] }`
 * @param {Date} [now]
 * @returns {StockRow[]}
 */
export function sheetToStockRows(payload, now = new Date()) {
  if (!payload || typeof payload !== 'object') return []
  const pieces = /** @type {{ pieces?: unknown }} */ (payload).pieces
  if (!Array.isArray(pieces)) return []
  const today = todayInParis(now)
  /** @type {StockRow[]} */
  const out = []

  for (const raw of pieces) {
    if (!raw || typeof raw !== 'object') continue
    const p = /** @type {Record<string, unknown>} */ (raw)
    const model = MODEL_MAP[key(p.model)]
    const wood = WOOD_MAP[key(p.wood)]
    const { status, rest } = parseSaleStatus(p.status)
    if (!model || !wood || !status) continue

    let expected = null
    /** @type {string | null} */
    let arrivalLabel = null
    if (status === 'en_transit') {
      const dates = [parseSheetDate(p.plannedShipping), parseSheetDate(p.actualShipping)].filter(Boolean)
      const latest = dates.sort().at(-1) ?? null
      expected = latest && latest > today ? latest : null
      // Période d'arrivée au showroom (colonne L, texte libre) : champ dédié
      // `arrivalText` (Apps Script ≥ 25/10/2026), sinon la suite du statut.
      // Période déjà passée (« 2 - 6 October » lu le 23/10) ⇒ null ⇒ « bientôt ».
      const canon = parseArrivalText(typeof p.arrivalText === 'string' && p.arrivalText.trim() ? p.arrivalText : rest)
      const end = canon ? arrivalEndIso(canon, today) : null
      arrivalLabel = canon && end && end >= today ? canon : null
    }
    out.push({ partner: 'neotone', model, wood, status, expected_arrival_on: expected, arrival_label: arrivalLabel })
  }
  return out
}

/**
 * Lit l'Apps Script et renvoie les lignes transformées.
 * LÈVE une erreur si l'URL est absente, si la réponse n'est pas 200, si elle
 * dépasse le délai, ou si le script signale une erreur (`error`, ex. en-tête
 * de colonne renommé dans le Sheet) : à l'appelant de décider quoi en faire
 * (le build → rien affiché ; l'API → 502).
 *
 * @param {string} url
 * @param {{ timeoutMs?: number, now?: Date }} [opts]
 * @returns {Promise<StockRow[]>}
 */
export async function fetchSheetStock(url, opts = {}) {
  if (!url) throw new Error('no_url')
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    redirect: 'follow', // l'Application Web répond par une redirection vers googleusercontent.com
    signal: AbortSignal.timeout(opts.timeoutMs ?? STOCK_FETCH_TIMEOUT_MS),
  })
  if (!res.ok) throw new Error(`upstream_${res.status}`)
  const payload = await res.json()
  if (!payload || typeof payload !== 'object' || !Array.isArray(payload.pieces)) throw new Error('bad_payload')
  if (payload.error) throw new Error(`script_${String(payload.error).slice(0, 80)}`)
  return sheetToStockRows(payload, opts.now)
}
