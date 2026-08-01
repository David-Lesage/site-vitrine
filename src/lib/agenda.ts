// ============================================================
// Agenda des showcases — source unique pour toutes les pages.
//
// Les dates vivent dans `src/data/site.ts` (agendaEvents), recopiées à la main
// depuis l'agenda Google « Le Nid ». Ce module les met en forme UNE fois, pour
// que la page d'accueil et la page showroom ne puissent pas diverger.
//
// ⚠️ Le site est statique : le filtrage « dates à venir » se fait au BUILD.
// Une page servie depuis un cache pourrait donc afficher une date dépassée —
// d'où le filet côté client (`data-event-iso`, voir les <script> des pages).
// ============================================================
import { agendaEvents } from '@/data/site'
import type { Lang } from '@/i18n/config'

export interface ShowcaseDate {
  /** Date ISO (AAAA-MM-JJ) — sert au filet client `data-event-iso`. */
  iso: string
  /** « dimanche 23 août 2026 » */
  long: string
  /** « 23 » — pour la pastille de date */
  day: string
  /** « août » — pour la pastille de date */
  month: string
  /** « dim. 23 août » — format compact (accueil) */
  short: string
  start: string
  end: string
}

/** Showcases À VENIR uniquement, du plus proche au plus lointain. */
export function upcomingShowcases(lang: Lang): ShowcaseDate[] {
  const locale = lang === 'en' ? 'en-GB' : 'fr-FR'
  const todayIso = new Date().toISOString().slice(0, 10)
  const fmt = (d: Date, opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, opts).format(d)

  return agendaEvents
    .filter((e) => e.date >= todayIso)
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((e) => {
      const d = new Date(e.date + 'T12:00:00')
      return {
        iso: e.date,
        long: fmt(d, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
        day: fmt(d, { day: 'numeric' }),
        month: fmt(d, { month: 'short' }).replace('.', ''),
        short: fmt(d, { weekday: 'short', day: 'numeric', month: 'long' }).replace('.', ''),
        start: e.start,
        end: e.end,
      }
    })
}
