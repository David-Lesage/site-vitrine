import { defaultLang, activeLangs, type Lang } from './config'

// Détecte la langue depuis l'URL (/en/... → 'en', sinon 'fr')
export function getLang(url: URL): Lang {
  const seg = url.pathname.split('/').filter(Boolean)[0]
  if (seg && (activeLangs as string[]).includes(seg)) return seg as Lang
  return defaultLang
}

// ============================================================
// SLUGS TRADUITS (20/08/2026)
// Par défaut une page garde son slug FRANÇAIS dans toutes les langues
// (/en/le-neotone, /en/cours…). Décision de David : on ne traduit QUE les
// slugs dont le bénéfice SEO anglophone est démontré, une page à la fois.
//
// Clé   = chemin NEUTRE (= le slug français, celui écrit partout dans le code)
// Valeur = slug réellement servi pour la langue donnée.
//
// ⚠️ Ajouter une entrée ici ne suffit pas : il faut AUSSI
//    1. renommer le fichier de route dans src/pages/<lang>/
//    2. ajouter la redirection 301 de l'ancienne adresse dans vercel.json
// En échange, TOUT le reste suit automatiquement : liens internes (localizePath),
// sélecteur de langue et hreflang (unlocalizePath), canonical, og:url, sitemap.
// ============================================================
export const translatedSlugs: Record<string, Partial<Record<string, string>>> = {
  // ⚠️ L'app n'est PLUS une exception (20/08/2026) : son slug français est
  // devenu `/handpan-app` lui aussi. Les deux langues partagent donc la même
  // adresse — « handpan-app » est ce qu'un anglophone cherche, et surtout cette
  // adresse ne contient PAS le nom de l'app (encore provisoire) : elle survivra
  // au futur changement de nom. Rien à déclarer ici, `localizePath` renvoie
  // `/handpan-app` en FR et `/en/handpan-app` en EN sans mapping.
  // Les pieds : « pied » ne veut rien dire en anglais, le mot est « stand ».
  '/pieds-atlas': { en: '/handpan-stands' },
}

// Index inverse : 'en:/handpan-stands' → '/pieds-atlas'
const neutralSlugs: Record<string, string> = Object.entries(translatedSlugs).reduce(
  (acc, [neutral, byLang]) => {
    for (const [lang, slug] of Object.entries(byLang)) acc[`${lang}:${slug}`] = neutral
    return acc
  },
  {} as Record<string, string>,
)

// Préfixe une route interne pour la langue courante, en appliquant le slug
// traduit s'il y en a un. Les suffixes (#ancre, ?query) sont préservés.
// localizePath('/showroom', 'en') → '/en/showroom' ; ('/showroom', 'fr') → '/showroom'
// localizePath('/pieds-atlas#modeles', 'en') → '/en/handpan-stands#modeles'
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  const cut = clean.search(/[?#]/)
  const base = cut === -1 ? clean : clean.slice(0, cut)
  const suffix = cut === -1 ? '' : clean.slice(cut)
  const slug = translatedSlugs[base]?.[lang] ?? base
  if (lang === defaultLang) return slug + suffix
  return `/${lang}${slug === '/' ? '' : slug}` + suffix
}

// Langues partiellement traduites : pas de dictionnaire complet, mais quelques
// pages dédiées (ex. /zh/micro-muling). Leur préfixe doit tout de même être
// reconnu pour que le sélecteur de langue génère des liens corrects.
export const partialLangs = ['zh'] as const

// Retire le préfixe de langue d'un chemin → chemin « neutre » ('/en/showroom' → '/showroom').
// Rétablit aussi le slug français d'une page au slug traduit
// ('/en/handpan-stands' → '/pieds-atlas'), pour que le sélecteur de langue
// et les balises hreflang retrouvent bien la page équivalente.
export function unlocalizePath(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean)
  const known = [...(activeLangs as string[]), ...(partialLangs as readonly string[])]
  let prefix = ''
  if (parts[0] && known.includes(parts[0])) prefix = parts.shift() as string
  const rest = '/' + parts.join('/')
  if (prefix && neutralSlugs[`${prefix}:${rest}`]) return neutralSlugs[`${prefix}:${rest}`]
  return rest
}
