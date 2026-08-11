import type { Lang } from '@/i18n/config'

/**
 * Taxonomie du blog — « type de sujet » calqué sur les vraies zones de l'app
 * Handpan Compagnon (+ le matériel Neotone, qui n'est pas une zone de l'app mais
 * un vrai sujet du blog).
 *
 * Les slugs sont NEUTRES en langue (ils servent d'identifiant technique et de
 * paramètre d'URL `?c=`), les libellés sont traduits ici. Un article = UNE
 * catégorie (champ `category` du frontmatter, obligatoire — cf.
 * `src/content.config.ts`). Les `tags` restent libres, ils ne servent pas au
 * filtre.
 *
 * Pour ajouter une catégorie : l'ajouter ici ET dans l'enum du schéma.
 */
export const BLOG_CATEGORIES = [
  'methode',
  'logique',
  'acoustique',
  'gammes',
  'partitions',
  'chant',
  'neotone',
  'communaute',
] as const

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]

const LABELS: Record<BlogCategory, Record<Lang, string>> = {
  methode: { fr: 'Méthode & couleurs', en: 'Method & colours' },
  logique: { fr: 'Mode Logique', en: 'Logic Mode' },
  acoustique: { fr: 'Mode Acoustique', en: 'Acoustic Mode' },
  gammes: { fr: 'Gammes & création', en: 'Scales & creation' },
  partitions: { fr: 'Partitions & composition', en: 'Scores & composing' },
  chant: { fr: 'Chanter & accompagner', en: 'Singing & accompaniment' },
  neotone: { fr: 'Neotone & matériel', en: 'Neotone & gear' },
  communaute: { fr: 'Communauté & bibliothèque', en: 'Community & library' },
}

/** Libellé affiché d'une catégorie dans la langue courante. */
export function categoryLabel(cat: BlogCategory, lang: Lang): string {
  return LABELS[cat][lang]
}

/** Libellé du filtre « tout afficher ». */
export function allLabel(lang: Lang): string {
  return lang === 'en' ? 'All' : 'Tout'
}

/** Intitulé de la barre de filtres (aria-label). */
export function filterLabel(lang: Lang): string {
  return lang === 'en' ? 'Filter articles by topic' : 'Filtrer les articles par sujet'
}
