// ============================================================
// Stock physique des Neotone présents chez David, lu DYNAMIQUEMENT
// depuis son Google Sheet de commandes (onglet « Orders Total »), via un
// Google Apps Script publié — voir src/lib/stockSource.js (URL +
// traduction des valeurs du Sheet) et scripts/google-apps-script/.
//
// Remplace (09/10/2026) l'ancienne lecture de la vue Supabase
// `stock_pieces_public`, restée vide : la vérité est dans le Sheet, que
// David tient à jour en temps réel.
//
// Même mécanique que src/lib/prices.ts :
// - À la compilation (SSG) : on lit l'Apps Script et on fige l'état dans
//   le HTML → correct à chaque déploiement, sans JS.
// - Côté client : la page relit `/api/stock` (api/stock.js, cache CDN
//   60 s) au chargement — le stock bouge entre deux déploiements.
//
// L'Apps Script ne publie JAMAIS de nom, e-mail, adresse, téléphone,
// n° de série ni prix : seulement modèle / bois / statut / dates.
//
// ⚠️ RÈGLE ABSOLUE : lecture seule, et aucun affichage inventé. Si la
// source est vide ou injoignable, on renvoie un tableau vide et la page
// n'affiche RIEN (pas de « stock inconnu », pas de cadre vide) — et ne
// grise AUCUN modèle : on ne grise pas par défaut ce qu'on ne sait pas.
// ============================================================

import { woodNames, woods, type WoodKey, type ModelId } from '@/data/neotone'
import type { Lang } from '@/i18n/config'
import { fetchSheetStock, resolveStockScriptUrl } from '@/lib/stockSource.js'

/** Relais same-origin lu par le navigateur (fonction Vercel api/stock.js). */
export const STOCK_API_PATH = '/api/stock'

export type StockStatus = 'disponible' | 'en_transit'

export interface StockPiece {
  partner: string
  model: string
  wood: string
  status: StockStatus
  expected_arrival_on: string | null
}

/** Une ligne d'affichage : un couple modèle + bois, et combien d'exemplaires. */
export interface StockLine {
  model: string
  wood: string
  status: StockStatus
  /** Date d'arrivée la plus proche du groupe (statut en_transit uniquement). */
  arrival: string | null
  count: number
}

const MODEL_LABELS: Record<ModelId, string> = { one: 'Neotone¹', mutant: 'Neotone¹ Mutant' }

/** Libellé modèle. Aucun nom inventé : si le modèle est inconnu, on affiche la valeur brute. */
export function modelLabel(model: string): string {
  return MODEL_LABELS[model as ModelId] ?? model
}

/** Libellé bois traduit. Si l'essence est inconnue, on affiche la valeur brute. */
export function woodLabel(wood: string, lang: Lang): string {
  return woodNames[wood as WoodKey]?.[lang] ?? wood
}

/** « 30 septembre 2026 » / « 30 September 2026 ». Renvoie null si la date est absente ou invalide. */
export function formatArrival(iso: string | null, locale: string): string | null {
  if (!iso) return null
  const d = new Date(`${iso}T12:00:00Z`)
  if (Number.isNaN(d.getTime())) return null
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d)
}

function isStatus(v: unknown): v is StockStatus {
  return v === 'disponible' || v === 'en_transit'
}

/**
 * Ne garde que les lignes Neotone exploitables (partenaire, modèle, bois et
 * statut présents), regroupe les couples modèle+bois identiques, et trie :
 * disponible d'abord, puis en transit par date d'arrivée la plus proche.
 */
export function normalizeStock(rows: unknown): StockLine[] {
  if (!Array.isArray(rows)) return []
  const groups = new Map<string, StockLine>()

  for (const raw of rows) {
    if (!raw || typeof raw !== 'object') continue
    const r = raw as Record<string, unknown>
    if (r.partner !== 'neotone') continue
    if (!isStatus(r.status)) continue
    const model = typeof r.model === 'string' ? r.model.trim() : ''
    const wood = typeof r.wood === 'string' ? r.wood.trim() : ''
    if (!model || !wood) continue
    const arrival =
      r.status === 'en_transit' && typeof r.expected_arrival_on === 'string' && r.expected_arrival_on
        ? r.expected_arrival_on
        : null

    const key = `${r.status}|${model}|${wood}|${arrival ?? ''}`
    const seen = groups.get(key)
    if (seen) seen.count += 1
    else groups.set(key, { model, wood, status: r.status, arrival, count: 1 })
  }

  const order: Record<StockStatus, number> = { disponible: 0, en_transit: 1 }
  return [...groups.values()].sort((a, b) => {
    if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status]
    // En transit : les arrivées les plus proches d'abord, les dates inconnues à la fin.
    if (a.status === 'en_transit') {
      if (a.arrival !== b.arrival) {
        if (!a.arrival) return 1
        if (!b.arrival) return -1
        return a.arrival < b.arrival ? -1 : 1
      }
    }
    return modelLabel(a.model).localeCompare(modelLabel(b.model)) || a.wood.localeCompare(b.wood)
  })
}

// ── Rendu ────────────────────────────────────────────────────────────────────
// Un SEUL générateur de HTML, utilisé à la fois au build (SSG) et par le script
// client qui rafraîchit le bloc. Pas de deuxième gabarit à maintenir en double.

export interface StockLabels {
  title: string
  availTitle: string
  soonTitle: string
  arrivalPrefix: string
  note: string
  noteLink: string
  showroomHref: string
  lang: Lang
  locale: string
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function renderLines(lines: StockLine[], labels: StockLabels): string {
  return lines
    .map((l) => {
      const name = `${esc(modelLabel(l.model))} — ${esc(woodLabel(l.wood, labels.lang))}`
      const count = l.count > 1 ? ` <span class="text-ink-soft/70">× ${l.count}</span>` : ''
      const when =
        l.status === 'en_transit'
          ? (() => {
              const d = formatArrival(l.arrival, labels.locale)
              return d ? ` <span class="text-sm text-ink-soft/75">— ${esc(labels.arrivalPrefix)} ${esc(d)}</span>` : ''
            })()
          : ''
      return `<li class="flex flex-wrap items-baseline gap-x-2"><span class="font-700">${name}</span>${count}${when}</li>`
    })
    .join('')
}

/** Renvoie '' si aucune pièce : le bloc ne doit alors RIEN afficher. */
export function renderStockHtml(lines: StockLine[], labels: StockLabels): string {
  if (!lines.length) return ''
  const avail = lines.filter((l) => l.status === 'disponible')
  const soon = lines.filter((l) => l.status === 'en_transit')
  let out = `<h3 class="font-display text-xl font-700">${esc(labels.title)}</h3>`
  if (avail.length) {
    out += `<p class="mt-5 text-xs font-700 uppercase tracking-[0.2em] text-rust">${esc(labels.availTitle)}</p>`
    out += `<ul class="mt-2 space-y-1 text-ink-soft/90">${renderLines(avail, labels)}</ul>`
  }
  if (soon.length) {
    out += `<p class="mt-5 text-xs font-700 uppercase tracking-[0.2em] text-copper">${esc(labels.soonTitle)}</p>`
    out += `<ul class="mt-2 space-y-1 text-ink-soft/90">${renderLines(soon, labels)}</ul>`
  }
  out +=
    `<p class="mt-5 text-sm text-ink-soft/85">${esc(labels.note)} ` +
    `<a href="${esc(labels.showroomHref)}" class="font-700 text-rust underline underline-offset-4 hover:text-copper">${esc(labels.noteLink)}</a></p>`
  return out
}

// ── Cartes « Deux modèles » (section #modeles) ──────────────────────────────
// Demande de David (09/10/2026) : « les modèles qui ne sont pas en stock
// doivent être grisés avec une indication "pas en stock actuellement", mais
// qu'ils restent disponibles à l'achat en ligne à −5 % ».
// Même principe que le bloc ci-dessus : UN générateur, utilisé au build et
// par le script client. Source vide ⇒ état '' ⇒ rien d'affiché, rien de grisé.

export interface ModelStockLabels {
  /** Badge court : « En stock ». */
  badge: string
  /** « En stock : {woods} » */
  inStock: string
  /** Lien vers le calculateur en mode showroom : « à essayer au showroom (−7 %) ». */
  inStockLink: string
  /** « Pas en stock actuellement » */
  out: string
  /** Lien vers le calculateur en mode livraison : « disponible à l'achat en ligne (−5 %, livraison) ». */
  outLink: string
  /** « Bientôt en stock : {woods} » */
  soon: string
  /** « arrivée prévue le {date} » (ajouté seulement si la date est connue et future). */
  soonDate: string
  lang: Lang
  locale: string
}

/** '' = source vide (aucun affichage) · 'in' = au moins une pièce disponible · 'out' = aucune. */
export type ModelStockState = '' | 'in' | 'out'

export interface ModelStockSummary {
  state: ModelStockState
  /** Bois disponibles tout de suite, dans l'ordre du nuancier. */
  available: string[]
  /** Bois en transit (un par essence, date la plus proche). */
  soon: { wood: string; arrival: string | null }[]
}

const WOOD_ORDER: string[] = woods.map((w) => w.key)
const byWoodOrder = (a: string, b: string) => {
  const ia = WOOD_ORDER.indexOf(a)
  const ib = WOOD_ORDER.indexOf(b)
  return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b)
}

/** Résume le stock d'UN modèle. Aucune ligne au total ⇒ état '' (on ne sait rien, on ne dit rien). */
export function modelStockSummary(lines: StockLine[], model: string): ModelStockSummary {
  if (!lines.length) return { state: '', available: [], soon: [] }
  const mine = lines.filter((l) => l.model === model)
  const available = [...new Set(mine.filter((l) => l.status === 'disponible').map((l) => l.wood))].sort(byWoodOrder)
  const soonMap = new Map<string, string | null>()
  for (const l of mine) {
    if (l.status !== 'en_transit') continue
    if (!soonMap.has(l.wood)) soonMap.set(l.wood, l.arrival)
    else {
      const cur = soonMap.get(l.wood) ?? null
      // Garde la date connue la plus proche ; une date connue l'emporte sur « sans date ».
      if (l.arrival && (!cur || l.arrival < cur)) soonMap.set(l.wood, l.arrival)
    }
  }
  const soon = [...soonMap.entries()].map(([wood, arrival]) => ({ wood, arrival })).sort((a, b) => byWoodOrder(a.wood, b.wood))
  return { state: available.length ? 'in' : 'out', available, soon }
}

const LINK_CLS =
  'inline-flex min-h-11 items-center font-700 text-rust underline underline-offset-4 hover:text-copper'

/**
 * HTML de la carte d'un modèle : `badge` (à côté du titre) et `detail` (sous
 * l'accroche). Les liens portent `data-goto-calc-mode` / `data-goto-calc-model` :
 * le calculateur les intercepte pour se placer dans le bon mode avec ce modèle.
 */
export function renderModelStock(
  lines: StockLine[],
  model: string,
  labels: ModelStockLabels,
): { state: ModelStockState; badge: string; detail: string } {
  const s = modelStockSummary(lines, model)
  if (!s.state) return { state: '', badge: '', detail: '' }
  const woodsText = (keys: string[]) => keys.map((w) => esc(woodLabel(w, labels.lang))).join(', ')
  const link = (mode: 'online' | 'showroom', text: string) =>
    `<a href="#calculateur" data-goto-calc-mode="${mode}" data-goto-calc-model="${esc(model)}" class="${LINK_CLS}">${esc(text)}</a>`

  let badge = ''
  let detail = ''
  if (s.state === 'in') {
    badge = `<span class="rounded-full border border-copper/40 bg-copper/15 px-3 py-1 text-xs font-700 text-rust">${esc(labels.badge)}</span>`
    detail +=
      `<p class="text-sm text-ink-soft/90"><span class="font-700 text-ink">${esc(labels.inStock).replace('{woods}', woodsText(s.available))}</span>` +
      ` — ${link('showroom', labels.inStockLink)}</p>`
  } else {
    detail +=
      `<p class="text-sm text-ink-soft/90"><span class="font-700 text-ink">${esc(labels.out)}</span>` +
      ` — ${link('online', labels.outLink)}</p>`
  }
  if (s.soon.length) {
    const items = s.soon
      .map((x) => {
        const d = formatArrival(x.arrival, labels.locale)
        const name = esc(woodLabel(x.wood, labels.lang))
        return d ? `${name} (${esc(labels.soonDate.replace('{date}', d))})` : name
      })
      .join(', ')
    detail += `<p class="mt-1 text-sm text-ink-soft/90">${esc(labels.soon).replace('{woods}', items)}</p>`
  }
  return { state: s.state, badge, detail }
}

/**
 * Lecture au build (Node, sans contrainte CORS) : appel DIRECT de l'Apps
 * Script, avec la même transformation que api/stock.js. Échec silencieux :
 * URL non configurée, erreur réseau, délai dépassé, réponse non-200 ou
 * source vide → [] (rien d'affiché, rien de grisé).
 */
export async function fetchStockAtBuild(): Promise<StockLine[]> {
  const env = typeof process !== 'undefined' ? process.env : undefined
  const url = resolveStockScriptUrl(env)
  if (!url) return []
  try {
    return normalizeStock(await fetchSheetStock(url))
  } catch {
    return []
  }
}
