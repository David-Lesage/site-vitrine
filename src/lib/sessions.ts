// ============================================================
// Rendez-vous individuels — mise en forme des durées et des tarifs.
//
// Les montants vivent dans `src/data/site.ts` (sessionTypes) : ce module ne fait
// que les formater. But : que les cartes de la page showroom et les options du
// formulaire de réservation ne puissent PAS afficher deux prix différents.
// ============================================================
import { sessionTypes, type SessionTypeId } from '@/data/site'

/** 60 → « 1h » · 90 → « 1h30 ». Identique en FR et en EN. */
export function durationLabel(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, '0')}`
}

export function priceLabel(price: number): string {
  return `${price} €`
}

/** « 1h30 · 70 € » — ce qui suit le nom du rendez-vous. */
export function sessionDetails(id: SessionTypeId): string {
  const s = sessionTypes.find((x) => x.id === id)!
  return `${durationLabel(s.minutes)} · ${priceLabel(s.price)}`
}

/**
 * Options du menu déroulant du formulaire : « Démonstration privée — 1h30 · 70 € ».
 * `names` vient de dict.booking.sessionTypeNames (clé = `kind`).
 */
export function sessionOptions(
  names: Record<string, string>,
  recommendedSuffix = '',
): { id: SessionTypeId; label: string; recommended: boolean }[] {
  return sessionTypes.map((s) => ({
    id: s.id,
    label: `${names[s.kind] ?? s.kind} — ${sessionDetails(s.id)}${s.recommended && recommendedSuffix ? ` ${recommendedSuffix}` : ''}`,
    recommended: s.recommended,
  }))
}

/** Prix affiché sur une carte de la page showroom, pour un `kind` donné. */
export function priceForKind(kind: string): string {
  return sessionTypes
    .filter((s) => s.kind === kind)
    .map((s) => sessionDetails(s.id))
    .join(' · ')
}

/** Motif d'un rendez-vous : `onboarding` · `demo` · `lesson`. */
export type SessionKind = (typeof sessionTypes)[number]['kind']

/**
 * La GRILLE d'un motif : « 1h · 50 € — 1h30 · 70 € ». Depuis le 09/10/2026 il
 * y a DEUX grilles — prise en main et démo à 50/70 (le « rendez-vous
 * individuel » du showroom), cours à 60/75 — d'où le `kind` obligatoire : une
 * grille « tous motifs confondus » afficherait le prix du dernier motif lu.
 * Utilisée par la modale de réservation, la page showroom et l'email (via
 * `data-price-grid`). Déduite de `sessionTypes` : impossible d'annoncer un
 * prix que le formulaire ne pratique pas.
 */
export function priceGrid(kind: SessionKind): string {
  return sessionTypes
    .filter((s) => s.kind === kind)
    .sort((a, b) => a.minutes - b.minutes)
    .map((s) => `${durationLabel(s.minutes)} · ${priceLabel(s.price)}`)
    .join(' — ')
}
