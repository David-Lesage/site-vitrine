import { defaultLang, activeLangs, type Lang } from './config'

// Détecte la langue depuis l'URL (/en/... → 'en', sinon 'fr')
export function getLang(url: URL): Lang {
  const seg = url.pathname.split('/').filter(Boolean)[0]
  if (seg && (activeLangs as string[]).includes(seg)) return seg as Lang
  return defaultLang
}

// Préfixe une route interne pour la langue courante.
// localizePath('/showroom', 'en') → '/en/showroom' ; ('/showroom', 'fr') → '/showroom'
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (lang === defaultLang) return clean
  return `/${lang}${clean === '/' ? '' : clean}`
}

// Retire le préfixe de langue d'un chemin → chemin « neutre » ('/en/showroom' → '/showroom')
export function unlocalizePath(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean)
  if (parts[0] && (activeLangs as string[]).includes(parts[0])) parts.shift()
  return '/' + parts.join('/')
}
