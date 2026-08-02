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

/** « 1h30 · 50 € » — ce qui suit le nom du rendez-vous. */
export function sessionDetails(id: SessionTypeId): string {
  const s = sessionTypes.find((x) => x.id === id)!
  return `${durationLabel(s.minutes)} · ${priceLabel(s.price)}`
}

/**
 * Options du menu déroulant du formulaire : « Démonstration privée — 1h30 · 50 € ».
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
