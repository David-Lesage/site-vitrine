// ============================================================
// Stock physique des Neotone présents chez David, lu DYNAMIQUEMENT
// depuis la vue publique `public.stock_pieces_public` du projet
// Supabase de Handpan Constellation Studio.
//
// Même mécanique que src/lib/prices.ts :
// - À la compilation (SSG) : on lit la vue et on fige les lignes dans
//   le HTML → correct à chaque déploiement, sans JS.
// - Côté client : un petit script relit la vue pour une mise à jour en
//   direct (le stock bouge entre deux déploiements).
//
// La clé « anon/publishable » est publique (sécurité par RLS), comme
// dans l'app elle-même. La vue ne contient JAMAIS de numéro de série
// ni d'identité d'acheteur : seulement partenaire / modèle / bois /
// statut / date d'arrivée prévue.
//
// ⚠️ RÈGLE ABSOLUE : lecture seule, et aucun affichage inventé. Si la
// vue est vide ou injoignable, on renvoie un tableau vide et la page
// n'affiche RIEN (pas de « stock inconnu », pas de cadre vide).
// ============================================================

import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/prices'
import { woodNames, type WoodKey, type ModelId } from '@/data/neotone'
import type { Lang } from '@/i18n/config'

export const STOCK_SELECT = 'partner,model,wood,status,expected_arrival_on'
export const STOCK_URL =
  `${SUPABASE_URL}/rest/v1/stock_pieces_public` +
  `?select=${STOCK_SELECT}&partner=eq.neotone`

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

/**
 * Lecture au build (Node, sans contrainte CORS). Échec silencieux :
 * en cas d'erreur réseau, de réponse non-200 ou de vue vide → [].
 */
export async function fetchStockAtBuild(): Promise<StockLine[]> {
  try {
    const res = await fetch(STOCK_URL, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Accept: 'application/json',
      },
    })
    if (!res.ok) return []
    return normalizeStock(await res.json())
  } catch {
    return []
  }
}
