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
import { fetchSheetStock, resolveStockScriptUrl, formatArrivalLabel } from '@/lib/stockSource.js'

/** Relais same-origin lu par le navigateur (fonction Vercel api/stock.js). */
export const STOCK_API_PATH = '/api/stock'

export type StockStatus = 'disponible' | 'en_transit'

export interface StockPiece {
  partner: string
  model: string
  wood: string
  status: StockStatus
  expected_arrival_on: string | null
  /** Période d'arrivée au showroom, forme canonique (« 9-13 november »), colonne L du Sheet. */
  arrival_label?: string | null
}

/** Une ligne d'affichage : un couple modèle + bois, et combien d'exemplaires. */
export interface StockLine {
  model: string
  wood: string
  status: StockStatus
  /** Date d'arrivée la plus proche du groupe (statut en_transit uniquement). */
  arrival: string | null
  /** Période d'arrivée au showroom (forme canonique, voir stockSource.js), ou null. */
  arrivalLabel: string | null
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
    const arrivalLabel =
      r.status === 'en_transit' && typeof r.arrival_label === 'string' && r.arrival_label ? r.arrival_label : null

    const key = `${r.status}|${model}|${wood}|${arrival ?? ''}|${arrivalLabel ?? ''}`
    const seen = groups.get(key)
    if (seen) seen.count += 1
    else groups.set(key, { model, wood, status: r.status, arrival, arrivalLabel, count: 1 })
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
      // Même date (ou aucune) : une période connue (colonne L) passe avant « bientôt ».
      if (!!a.arrivalLabel !== !!b.arrivalLabel) return a.arrivalLabel ? -1 : 1
    }
    return modelLabel(a.model).localeCompare(modelLabel(b.model)) || a.wood.localeCompare(b.wood)
  })
}

// ── Pastilles d'état (David, 25/10/2026) ────────────────────────────────────
// « visuellement je veux que les handpans qui sont en stock soient beaucoup plus
// visibles pour que ce soit très clair même sans cliquer dessus ».
// UN code visuel partagé par le calculateur, le bloc « Ce qui est disponible »
// et les cartes des modèles :
//  · en stock      → pastille PLEINE rouille, texte crème, ✓ (contraste ≈ 8:1)
//  · arrive        → pastille CONTOUR dorée, texte encre, horloge, date si connue
//  · sur commande  → texte discret, sans pastille (ce n'est pas un interdit)
// Jamais la couleur seule : chaque pastille porte un texte (lu par les lecteurs
// d'écran) ET un symbole (décoratif, aria-hidden).

export type PillKind = 'in' | 'transit' | 'out'

export interface StockPillLabels {
  /** « En stock à Paris » */
  in: string
  /** « Arrive bientôt » (aucune date connue) */
  soon: string
  /** « Arrive le {period} » (période avec jour : « 9-13 nov. ») */
  soonDate: string
  /** « Arrive en {period} » (mois seul : « novembre ») */
  soonMonth: string
  /** « Sur commande » */
  order: string
}

const ICON_CHECK =
  '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" class="shrink-0" aria-hidden="true"><path d="M3 8.6l3.2 3.1L13 4.6"/></svg>'
const ICON_CLOCK =
  '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" class="shrink-0" aria-hidden="true"><circle cx="8" cy="8" r="6.1"/><path d="M8 4.7V8l2.3 1.5"/></svg>'

export const PILL_CLS: Record<PillKind, string> = {
  in: 'stock-pill stock-pill-in inline-flex max-w-full items-center gap-1 rounded-full bg-rust px-2.5 py-1 text-xs font-700 leading-tight text-cream shadow-[0_2px_6px_-1px_rgba(138,58,31,0.55)]',
  transit:
    'stock-pill stock-pill-transit inline-flex max-w-full items-center gap-1 rounded-full border-2 border-gold bg-gold/15 px-2 py-0.5 text-xs font-700 leading-tight text-ink',
  out: 'stock-pill stock-pill-out inline-block text-xs font-600 leading-tight text-ink-soft/80',
}

/** HTML d'une pastille. `text` est échappé ici. */
export function stockPillHtml(kind: PillKind, text: string): string {
  const icon = kind === 'in' ? ICON_CHECK : kind === 'transit' ? ICON_CLOCK : ''
  return `<span class="${PILL_CLS[kind]}">${icon}<span class="stock-pill-text">${esc(text)}</span></span>`
}

/** Texte de la pastille « arrive » : période du Sheet (abrégée), sinon date, sinon « bientôt ». */
export function transitPillText(
  labels: StockPillLabels,
  arrivalLabel: string | null | undefined,
  arrivalIso: string | null | undefined,
  lang: string,
  locale: string,
): string {
  const period = formatArrivalLabel(arrivalLabel ?? null, lang, { short: true })
  // Mois seul : en toutes lettres (« Arrive en novembre ») ; avec jour : abrégé (« Arrive le 9-13 nov. »).
  if (period && !/\d/.test(period)) return labels.soonMonth.replace('{period}', formatArrivalLabel(arrivalLabel ?? null, lang) ?? period)
  if (period) return labels.soonDate.replace('{period}', period)
  if (arrivalIso) {
    const d = new Date(`${arrivalIso}T12:00:00Z`)
    if (!Number.isNaN(d.getTime()))
      return labels.soonDate.replace('{period}', new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(d))
  }
  return labels.soon
}

/** Vignette d'un bois (null si l'essence est inconnue). */
export function woodImage(wood: string): string | null {
  return woods.find((w) => w.key === wood)?.img ?? null
}

// ── Rendu ────────────────────────────────────────────────────────────────────
// Un SEUL générateur de HTML, utilisé à la fois au build (SSG) et par le script
// client qui rafraîchit le bloc. Pas de deuxième gabarit à maintenir en double.

export interface StockLabels {
  title: string
  availTitle: string
  soonTitle: string
  arrivalPrefix: string
  /** « arrivée prévue : {period} » — période écrite dans le Sheet (colonne L). */
  arrivalPeriod?: string
  note: string
  noteLink: string
  showroomHref: string
  /** Pastilles (25/10/2026). Absentes ⇒ ancien rendu texte. */
  pills?: StockPillLabels
  lang: Lang
  locale: string
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function renderLines(lines: StockLine[], labels: StockLabels): string {
  const pills = labels.pills
  return lines
    .map((l) => {
      const name = `${esc(modelLabel(l.model))} — ${esc(woodLabel(l.wood, labels.lang))}`
      const count = l.count > 1 ? ` <span class="text-ink-soft/70">× ${l.count}</span>` : ''
      if (pills) {
        // Une ligne par pièce : vignette du bois · nom · pastille d'état.
        const inStock = l.status === 'disponible'
        const img = woodImage(l.wood)
        const thumb = img
          ? `<img src="${esc(img)}" alt="" width="44" height="44" loading="lazy" class="h-11 w-11 shrink-0 rounded-full object-cover ${
              inStock ? 'ring-[3px] ring-rust ring-offset-2 ring-offset-cream' : 'ring-2 ring-gold/70 ring-offset-1 ring-offset-cream'
            }" />`
          : ''
        const pill = inStock
          ? stockPillHtml('in', pills.in)
          : stockPillHtml('transit', transitPillText(pills, l.arrivalLabel, l.arrival, labels.lang, labels.locale))
        return (
          `<li class="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border p-2.5 ${
            inStock ? 'border-rust/35 bg-rust/[0.06] shadow-sm' : 'border-ink/10 bg-cream-deep/40'
          }">${thumb}<span class="min-w-[9rem] flex-1 font-700 text-ink">${name}${count}</span>${pill}</li>`
        )
      }
      const when =
        l.status === 'en_transit'
          ? (() => {
              const period = formatArrivalLabel(l.arrivalLabel, labels.lang)
              if (period && labels.arrivalPeriod)
                return ` <span class="text-sm text-ink-soft/75">— ${esc(labels.arrivalPeriod.replace('{period}', period))}</span>`
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
    out += `<ul class="mt-2 ${labels.pills ? 'space-y-2' : 'space-y-1'} text-ink-soft/90">${renderLines(avail, labels)}</ul>`
  }
  if (soon.length) {
    out += `<p class="mt-5 text-xs font-700 uppercase tracking-[0.2em] text-copper">${esc(labels.soonTitle)}</p>`
    out += `<ul class="mt-2 ${labels.pills ? 'space-y-2' : 'space-y-1'} text-ink-soft/90">${renderLines(soon, labels)}</ul>`
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
  /** « arrivée prévue : {period} » — période de la colonne L, prioritaire sur la date. */
  soonPeriod?: string
  /** Texte de la pastille pleine (« En stock à Paris »), 25/10/2026. Sinon `badge`. */
  pillIn?: string
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
  soon: { wood: string; arrival: string | null; arrivalLabel: string | null }[]
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
  const soonMap = new Map<string, { arrival: string | null; arrivalLabel: string | null }>()
  for (const l of mine) {
    if (l.status !== 'en_transit') continue
    const cur = soonMap.get(l.wood)
    if (!cur) soonMap.set(l.wood, { arrival: l.arrival, arrivalLabel: l.arrivalLabel })
    else {
      // Garde la date connue la plus proche ; une date connue l'emporte sur « sans date ».
      if (l.arrival && (!cur.arrival || l.arrival < cur.arrival)) cur.arrival = l.arrival
      // Période du Sheet : la première connue l'emporte sur « sans période ».
      if (!cur.arrivalLabel && l.arrivalLabel) cur.arrivalLabel = l.arrivalLabel
    }
  }
  const soon = [...soonMap.entries()].map(([wood, v]) => ({ wood, ...v })).sort((a, b) => byWoodOrder(a.wood, b.wood))
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
    badge = stockPillHtml('in', labels.pillIn || labels.badge)
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
        const name = esc(woodLabel(x.wood, labels.lang))
        const period = formatArrivalLabel(x.arrivalLabel, labels.lang)
        if (period && labels.soonPeriod) return `${name} (${esc(labels.soonPeriod.replace('{period}', period))})`
        const d = formatArrival(x.arrival, labels.locale)
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
