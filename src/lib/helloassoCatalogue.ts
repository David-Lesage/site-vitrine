// ============================================================
// Catalogue HelloAsso lu AU BUILD — les tarifs des cours et de la démo.
//
// HelloAsso fait foi (David, 20/10/2026) : le site relit ses tarifs à chaque
// build plutôt que de recopier les montants à la main.
//
// Point d'accès PUBLIC, en lecture seule, sans clé (Edge Function Supabase,
// cache 15 min côté serveur, 30 requêtes / 10 min) :
//   GET …/functions/v1/helloasso-notifications?action=catalogue
//   → { organisation, misAJourLe, perime, formulaires: [{ slug, type, titre,
//       url, tarifs: [{ libelle, montantEuros, prixLibre, minimumEuros? }] }] }
//
// 🛟 RÈGLES DE SÛRETÉ — le build ne doit JAMAIS échouer à cause d'HelloAsso :
//   · UN SEUL appel par build : la promesse est gardée sur `globalThis`, donc
//     partagée par toutes les pages (et par les copies du module si Vite en
//     produit plusieurs) ;
//   · délai de 8 s, puis abandon ;
//   · réponse non-200 (dont 503), JSON illisible, formulaire ou libellé
//     introuvable → REPLI sur les montants de src/data/site.ts, avec un
//     avertissement dans la console du build. Repli tarif par tarif : un seul
//     libellé renommé sur HelloAsso ne fait pas perdre les autres.
//
// Côté affichage, rien d'autre à faire : `getCoursePrices()` rend un objet
// `CoursePrices` que les helpers de src/lib/sessions.ts savent formater.
// ============================================================
import { siteCoursePrices, type CoursePrices } from '@/lib/sessions'

export const HELLOASSO_CATALOGUE_URL =
  'https://zqcuhnjjrgmybftppkcl.supabase.co/functions/v1/helloasso-notifications?action=catalogue'
const TIMEOUT_MS = 8000

export interface HelloAssoTarif {
  libelle: string
  montantEuros: number
  prixLibre: boolean
  minimumEuros?: number
}
export interface HelloAssoFormulaire {
  slug: string
  type: string
  titre: string
  url: string
  tarifs: HelloAssoTarif[]
}
export interface HelloAssoCatalogue {
  organisation?: { slug: string; nom: string }
  misAJourLe?: string
  perime?: boolean
  formulaires: HelloAssoFormulaire[]
}

const warn = (msg: string) => console.warn(`[helloasso] ${msg}`)

async function fetchCatalogue(): Promise<HelloAssoCatalogue | null> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    // `HELLOASSO_CATALOGUE_URL` (variable d'environnement) : seulement pour
    // tester le repli au build (URL injoignable, 503…). Jamais nécessaire sinon.
    const url = (typeof process !== 'undefined' && process.env.HELLOASSO_CATALOGUE_URL) || HELLOASSO_CATALOGUE_URL
    const res = await fetch(url, { signal: ctrl.signal, headers: { accept: 'application/json' } })
    if (!res.ok) {
      warn(`catalogue indisponible (HTTP ${res.status}) — repli sur les tarifs de src/data/site.ts`)
      return null
    }
    const data = (await res.json()) as HelloAssoCatalogue
    if (!data || !Array.isArray(data.formulaires)) {
      warn('réponse inattendue (pas de `formulaires`) — repli sur les tarifs de src/data/site.ts')
      return null
    }
    if (data.perime) warn(`catalogue servi depuis un cache périmé (mis à jour le ${data.misAJourLe ?? '?'})`)
    return data
  } catch (e) {
    const why = (e as Error)?.name === 'AbortError' ? `délai de ${TIMEOUT_MS / 1000} s dépassé` : String((e as Error)?.message ?? e)
    warn(`catalogue injoignable (${why}) — repli sur les tarifs de src/data/site.ts`)
    return null
  } finally {
    clearTimeout(timer)
  }
}

const CACHE_KEY = Symbol.for('lesagedavid.helloassoCatalogue')
type GlobalWithCache = typeof globalThis & { [CACHE_KEY]?: Promise<HelloAssoCatalogue | null> }

/** Le catalogue HelloAsso, lu UNE fois par build (null si indisponible). */
export function getHelloAssoCatalogue(): Promise<HelloAssoCatalogue | null> {
  const g = globalThis as GlobalWithCache
  if (!g[CACHE_KEY]) g[CACHE_KEY] = fetchCatalogue()
  return g[CACHE_KEY]!
}

/** Montant affiché d'un tarif : le MINIMUM s'il est en prix libre. */
export const tarifAmount = (t: HelloAssoTarif): number =>
  t.prixLibre && typeof t.minimumEuros === 'number' ? t.minimumEuros : t.montantEuros

// Formulaires et libellés repérés sur HelloAsso (relevés le 20/10/2026).
// Le repérage par libellé tolère casse, accents et espaces ; le « 1H » ne
// doit pas attraper « 1H30 », d'où le `(?!30)`.
const LESSONS_SLUG = 'cours-prive-et-stages-avec-david-lesage'
const DEMO_SLUG = 'demonstration-prive-avec-david-lesage'
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim()
const MATCHERS = {
  lesson60: { slug: LESSONS_SLUG, re: /^cours 1h(?!30)/, label: '« Cours 1H »' },
  lesson90: { slug: LESSONS_SLUG, re: /^cours 1h30/, label: '« Cours 1H30 »' },
  package60: { slug: LESSONS_SLUG, re: /^forfait 4 cours de 1h(?!30)/, label: '« Forfait 4 cours de 1H »' },
  package90: { slug: LESSONS_SLUG, re: /^forfait 4 cours de 1h30/, label: '« Forfait 4 cours de 1H30 »' },
  demo60: { slug: DEMO_SLUG, re: /^session demonstration privee - 1h(?!30)/, label: '« Session démonstration privée - 1H »' },
  demo90: { slug: DEMO_SLUG, re: /^session demonstration privee - 1h30/, label: '« Session démonstration privée - 1H30 »' },
} as const

function findAmount(cat: HelloAssoCatalogue, key: keyof typeof MATCHERS): number | null {
  const m = MATCHERS[key]
  const form = cat.formulaires.find((f) => f.slug === m.slug)
  if (!form) return null
  const tarif = form.tarifs.find((t) => m.re.test(norm(t.libelle)))
  const amount = tarif ? tarifAmount(tarif) : null
  return typeof amount === 'number' && Number.isFinite(amount) && amount > 0 ? amount : null
}

/**
 * Les tarifs des cours (minimums du prix libre) et de la démo (prix fixes) :
 * HelloAsso si possible, sinon site.ts — tarif par tarif. Mis en cache avec
 * le catalogue : appeler cette fonction depuis N pages ne fait qu'UN appel.
 */
export async function getCoursePrices(): Promise<CoursePrices> {
  const fallback = siteCoursePrices()
  const cat = await getHelloAssoCatalogue()
  if (!cat) return fallback
  const missing: string[] = []
  const pick = (key: keyof typeof MATCHERS, repli: number) => {
    const v = findAmount(cat, key)
    if (v === null) {
      missing.push(MATCHERS[key].label)
      return repli
    }
    return v
  }
  const prices: CoursePrices = {
    lesson: { 60: pick('lesson60', fallback.lesson[60]), 90: pick('lesson90', fallback.lesson[90]) },
    package: { 60: pick('package60', fallback.package[60]), 90: pick('package90', fallback.package[90]) },
    demo: { 60: pick('demo60', fallback.demo[60]), 90: pick('demo90', fallback.demo[90]) },
    source: 'helloasso',
  }
  const g = globalThis as typeof globalThis & { [k: symbol]: boolean }
  const once = Symbol.for('lesagedavid.helloassoCatalogue.reported')
  if (!g[once]) {
    g[once] = true
    if (missing.length) warn(`tarif(s) introuvable(s) sur HelloAsso : ${missing.join(', ')} — repli sur site.ts pour ceux-là`)
    const diffs = (['lesson', 'package', 'demo'] as const).flatMap((k) =>
      ([60, 90] as const).filter((m) => prices[k][m] !== fallback[k][m]).map((m) => `${k} ${m} min : HelloAsso ${prices[k][m]} € ≠ site.ts ${fallback[k][m]} €`),
    )
    if (diffs.length) warn(`HelloAsso fait foi, mais site.ts est à mettre à jour (repli) : ${diffs.join(' ; ')}`)
  }
  return prices
}
