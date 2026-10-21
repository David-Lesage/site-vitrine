// Logique PURE de la capture du lien d'affiliation (21/10/2026).
// Aucune dépendance, aucun accès direct au DOM : le stockage est passé en
// paramètre, ce qui permet de tout tester avec node (scripts/test-affiliation.mjs).
// Spec : voir src/data/affiliation.ts.

/** Clé localStorage. */
export const STORAGE_KEY = 'hcs_ref'

/** 6 caractères, alphabet sans 0 O 1 I L (lisible à l'oral et à l'écrit). */
export const REF_RE = /^[A-HJ-NP-Z2-9]{6}$/

/** Durée de conservation : 90 jours depuis `vu_le`. */
export const TTL_MS = 90 * 24 * 60 * 60 * 1000

/** Hôtes de l'application dont les liens reçoivent le code. */
export const APP_HOSTS = [
  'play.handpanstudio.app',
  'play.handpan-studio.app',
  'play.neotone-studio.app',
  'play.neotonestudio.app',
]

/** trim → majuscules → regex. Renvoie le code, ou null s'il est invalide. */
export function normalizeRef(raw) {
  if (typeof raw !== 'string') return null
  const code = raw.trim().toUpperCase()
  return REF_RE.test(code) ? code : null
}

/**
 * Lit la valeur brute stockée. Renvoie { entry, purge } :
 *  - entry : { code, vu_le } valide et non expiré, sinon null ;
 *  - purge : true si une valeur existe mais doit être effacée (expirée ou illisible).
 */
export function parseStored(raw, now) {
  if (raw == null) return { entry: null, purge: false }
  let obj
  try {
    obj = JSON.parse(raw)
  } catch {
    return { entry: null, purge: true }
  }
  const code = obj && normalizeRef(obj.code)
  const seen = obj && typeof obj.vu_le === 'string' ? Date.parse(obj.vu_le) : NaN
  if (!code || code !== obj.code || Number.isNaN(seen)) return { entry: null, purge: true }
  if (now - seen > TTL_MS) return { entry: null, purge: true }
  return { entry: { code, vu_le: obj.vu_le }, purge: false }
}

/** Valeur JSON à écrire pour un nouveau code. */
export function serializeEntry(code, now) {
  return JSON.stringify({ code, vu_le: new Date(now).toISOString() })
}

/**
 * Lit le code gardé (efface au passage une valeur expirée ou illisible).
 * Tout accès au stockage est protégé : stockage indisponible → null.
 */
export function readRef(storage, now) {
  let raw
  try {
    raw = storage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
  const { entry, purge } = parseStored(raw, now)
  if (purge) {
    try {
      storage.removeItem(STORAGE_KEY)
    } catch {}
  }
  return entry
}

/**
 * Capture un code vu dans l'URL. Le PREMIER code valide gagne : un nouveau code
 * ne remplace l'ancien que si celui-ci a expiré. Un code invalide est ignoré en
 * silence (rien n'est écrit). Renvoie le code désormais en vigueur (ou null).
 */
export function captureRef(storage, rawParam, now) {
  const existing = readRef(storage, now)
  if (existing) return existing.code
  const code = normalizeRef(rawParam)
  if (!code) return null
  try {
    storage.setItem(STORAGE_KEY, serializeEntry(code, now))
  } catch {
    // Stockage bloqué : rien n'est gardé. Le code reste utilisable par
    // l'appelant pour la page en cours uniquement.
  }
  return code
}

/** Vrai si l'URL (absolue) pointe vers l'application. */
export function isAppUrl(href) {
  try {
    const u = new URL(href)
    return (u.protocol === 'https:' || u.protocol === 'http:') && APP_HOSTS.includes(u.hostname.toLowerCase())
  } catch {
    return false
  }
}

/**
 * Ajoute `ref=CODE` à un lien vers l'application, en gardant les paramètres
 * existants (tels quels, sans ré-encodage) et l'ancre. Renvoie null si le lien
 * ne doit pas changer : hôte hors liste, code invalide, ou `ref` déjà présent.
 */
export function decorateHref(href, code) {
  if (!normalizeRef(code) || !isAppUrl(href)) return null
  const u = new URL(href)
  if (u.searchParams.has('ref')) return null
  u.search = u.search ? u.search + '&ref=' + code : '?ref=' + code
  return u.href
}

/**
 * Retire `ref` (et seulement lui) d'une URL de page, en gardant le reste de la
 * requête et le hash. Renvoie { ref, href } : `ref` = première valeur trouvée
 * (null si absente) ; `href` = nouvelle URL, ou null s'il n'y avait rien à retirer.
 */
export function stripRefParam(href) {
  const u = new URL(href)
  if (!u.searchParams.has('ref')) return { ref: null, href: null }
  const ref = u.searchParams.get('ref')
  const keep = u.search
    .slice(1)
    .split('&')
    .filter((part) => {
      if (!part) return false
      const key = part.split('=')[0]
      let name
      try {
        name = decodeURIComponent(key.replace(/\+/g, ' '))
      } catch {
        name = key
      }
      return name !== 'ref'
    })
  u.search = keep.length ? '?' + keep.join('&') : ''
  return { ref, href: u.href }
}
