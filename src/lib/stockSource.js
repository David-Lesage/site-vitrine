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
export const STOCK_SCRIPT_URL = ''

/** Délai maximal d'attente de l'Apps Script (ms). Il répond en général en 1 à 3 s. */
export const STOCK_FETCH_TIMEOUT_MS = 8000

/** Type « ONE » / « MUTANT » du Sheet → identifiant de modèle du site. */
const MODEL_MAP = { ONE: 'one', MUTANT: 'mutant' }

/** Essence du Sheet (anglais) → clé de bois du site (voir src/data/neotone.ts). */
const WOOD_MAP = { ASH: 'frene', OAK: 'chene', MAHOGANY: 'acajou', CHERRY: 'cerisier', WALNUT: 'noyer' }

/** « Sale status » du Sheet → statut du site. Tout autre statut (Sold, vide…) est ignoré. */
const STATUS_MAP = { AVAILABLE: 'disponible', 'IN TRANSIT': 'en_transit' }

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
 * @typedef {{ partner: 'neotone', model: 'one' | 'mutant', wood: string, status: 'disponible' | 'en_transit', expected_arrival_on: string | null }} StockRow
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
 *
 * @param {unknown} payload  `{ updatedAt, pieces: [{ model, wood, status, plannedShipping, actualShipping }] }`
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
    const status = STATUS_MAP[key(p.status)]
    if (!model || !wood || !status) continue

    let expected = null
    if (status === 'en_transit') {
      const dates = [parseSheetDate(p.plannedShipping), parseSheetDate(p.actualShipping)].filter(Boolean)
      const latest = dates.sort().at(-1) ?? null
      expected = latest && latest > today ? latest : null
    }
    out.push({ partner: 'neotone', model, wood, status, expected_arrival_on: expected })
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
