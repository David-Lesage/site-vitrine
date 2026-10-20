// ============================================================
// Rendez-vous individuels — mise en forme des durées et des tarifs.
//
// Les montants de REPLI vivent dans `src/data/site.ts` (sessionTypes,
// lessonPackage) ; les montants qui font foi viennent d'HelloAsso au build
// (src/lib/helloassoCatalogue.ts → `getCoursePrices()`), passés ici en
// paramètre `prices`. Ce module ne fait que les formater. But : que les cartes
// de la page showroom, la page /cours, la boutique et les options du formulaire
// de réservation ne puissent PAS afficher deux prix différents.
//
// 💶 Depuis le 20/10/2026, les COURS sont à prix libre à partir d'un minimum :
//    leur prix s'affiche « dès 60 € » / « from €60 » / « desde 60 € ». Prise
//    en main et démonstration restent à prix fixe (« 50 € »).
// ============================================================
import { sessionTypes, lessonPackage, type SessionTypeId } from '@/data/site'
import type { Lang } from '@/i18n/config'

/** Motif d'un rendez-vous : `onboarding` · `demo` · `lesson`. */
export type SessionKind = (typeof sessionTypes)[number]['kind']
type Minutes = 60 | 90

/**
 * Les tarifs des cours et de la démo, tels qu'ils s'affichent sur le site.
 * `lesson` et `package` sont des MINIMUMS (prix libre), `demo` des prix fixes.
 * `source` dit d'où ils viennent : HelloAsso (au build) ou le repli de site.ts.
 */
export interface CoursePrices {
  lesson: Record<Minutes, number>
  package: Record<Minutes, number>
  demo: Record<Minutes, number>
  source: 'helloasso' | 'site.ts'
}

/** Les tarifs écrits dans site.ts — le REPLI quand HelloAsso ne répond pas. */
export function siteCoursePrices(): CoursePrices {
  const pick = (kind: SessionKind, minutes: Minutes) => sessionTypes.find((s) => s.kind === kind && s.minutes === minutes)!.price
  return {
    lesson: { 60: pick('lesson', 60), 90: pick('lesson', 90) },
    package: { 60: lessonPackage.packagePrice[60], 90: lessonPackage.packagePrice[90] },
    demo: { 60: pick('demo', 60), 90: pick('demo', 90) },
    source: 'site.ts',
  }
}

/** 60 → « 1h » · 90 → « 1h30 ». Identique en FR et en EN. */
export function durationLabel(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, '0')}`
}

/**
 * « 50 € » (prix fixe) ou, si `from`, « dès 60 € » / « from €60 » /
 * « desde 60 € » (prix libre à partir d'un minimum).
 */
export function priceLabel(price: number, lang: Lang = 'fr', from = false): string {
  if (!from) return `${price} €`
  if (lang === 'en') return `from €${price}`
  if (lang === 'es') return `desde ${price} €`
  return `dès ${price} €`
}

type Session = (typeof sessionTypes)[number]

/** Prix d'une séance : HelloAsso (si fourni) pour cours et démo, sinon site.ts. */
function sessionPrice(s: Session, prices?: CoursePrices): number {
  if (prices && (s.kind === 'lesson' || s.kind === 'demo')) return prices[s.kind][s.minutes as Minutes] ?? s.price
  return s.price
}

const isFree = (s: Session) => 'freePrice' in s && s.freePrice === true

/** Libellé de prix d'une séance (« 50 € » ou « dès 60 € »). */
export function sessionPriceLabel(s: Session, lang: Lang = 'fr', prices?: CoursePrices): string {
  return priceLabel(sessionPrice(s, prices), lang, isFree(s))
}

/** « 1h30 · 70 € » — ce qui suit le nom du rendez-vous. */
export function sessionDetails(id: SessionTypeId, lang: Lang = 'fr', prices?: CoursePrices): string {
  const s = sessionTypes.find((x) => x.id === id)!
  return `${durationLabel(s.minutes)} · ${sessionPriceLabel(s, lang, prices)}`
}

/**
 * Options du menu déroulant du formulaire : « Démonstration privée — 1h30 · 70 € ».
 * `names` vient de dict.booking.sessionTypeNames (clé = `kind`).
 */
export function sessionOptions(
  names: Record<string, string>,
  recommendedSuffix = '',
  lang: Lang = 'fr',
  prices?: CoursePrices,
): { id: SessionTypeId; label: string; recommended: boolean }[] {
  return sessionTypes.map((s) => ({
    id: s.id,
    label: `${names[s.kind] ?? s.kind} — ${sessionDetails(s.id, lang, prices)}${s.recommended && recommendedSuffix ? ` ${recommendedSuffix}` : ''}`,
    recommended: s.recommended,
  }))
}

/** Prix affiché sur une carte de la page showroom, pour un `kind` donné. */
export function priceForKind(kind: string, lang: Lang = 'fr', prices?: CoursePrices): string {
  return sessionTypes
    .filter((s) => s.kind === kind)
    .map((s) => sessionDetails(s.id, lang, prices))
    .join(' · ')
}

/**
 * La GRILLE d'un motif : « 1h · 50 € — 1h30 · 70 € ». Depuis le 09/10/2026 il
 * y a DEUX grilles — prise en main et démo à 50/70 (le « rendez-vous
 * individuel » du showroom), cours dès 60/75 (prix libre depuis le 20/10) —
 * d'où le `kind` obligatoire : une grille « tous motifs confondus » afficherait
 * le prix du dernier motif lu. Utilisée par la modale de réservation, la page
 * showroom et l'email (via `data-price-grid`). Déduite de `sessionTypes` (et
 * des prix HelloAsso passés en `prices`) : impossible d'annoncer un prix que le
 * formulaire ne pratique pas.
 */
export function priceGrid(kind: SessionKind, lang: Lang = 'fr', prices?: CoursePrices): string {
  return sessionTypes
    .filter((s) => s.kind === kind)
    .sort((a, b) => a.minutes - b.minutes)
    .map((s) => `${durationLabel(s.minutes)} · ${sessionPriceLabel(s, lang, prices)}`)
    .join(' — ')
}

/**
 * Remplit les jetons de prix des cours dans un texte du dictionnaire :
 * `{lesson60}` `{lesson90}` (cours à l'unité, minimum), `{pack60}` `{pack90}`
 * (forfait 4 cours, minimum), `{packLesson60}` `{packLesson90}` (forfait ÷ 4).
 * Les jetons sont des NOMBRES nus : le « dès … € » / « from €… » est écrit
 * autour, dans chaque langue. Sans `prices`, repli sur site.ts.
 */
export function fillCoursePrices(text: string, prices: CoursePrices = siteCoursePrices()): string {
  const per = (n: number) => {
    const v = n / lessonPackage.lessons
    return Number.isInteger(v) ? String(v) : v.toFixed(2).replace('.', ',')
  }
  return text
    .replaceAll('{lesson60}', String(prices.lesson[60]))
    .replaceAll('{lesson90}', String(prices.lesson[90]))
    .replaceAll('{packLesson60}', per(prices.package[60]))
    .replaceAll('{packLesson90}', per(prices.package[90]))
    .replaceAll('{pack60}', String(prices.package[60]))
    .replaceAll('{pack90}', String(prices.package[90]))
}

/** Applique `fillCoursePrices` à toutes les chaînes d'un objet (copie profonde). */
export function fillCoursePricesDeep<T>(value: T, prices?: CoursePrices): T {
  if (typeof value === 'string') return fillCoursePrices(value, prices) as T
  if (Array.isArray(value)) return value.map((v) => fillCoursePricesDeep(v, prices)) as T
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, fillCoursePricesDeep(v, prices)])) as T
  }
  return value
}
