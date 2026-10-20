// ============================================================
// UNE SEULE FORME D'ADRESSE : « / » FINAL (20/10/2026, audit SEO P1-1)
// ------------------------------------------------------------
// Chaque page existait à deux adresses (`/neotone` et `/neotone/`). La
// canonique et le sitemap utilisaient la forme avec « / », mais les hreflang,
// les données structurées et ~6 300 liens internes visaient la forme sans.
// Google demande que hreflang vise la canonique : on aligne TOUT sur « / ».
//
// Règle (la même que la redirection 301 de vercel.json) :
//   • seuls les chemins internes (« /… ») sont touchés, jamais « //cdn… » ;
//   • un FICHIER (dernier segment avec un point : .txt, .xml, .webp…) reste
//     tel quel → /llms.txt reste /llms.txt ;
//   • les fonctions /api/* restent telles quelles (POST des formulaires) ;
//   • ?query et #ancre sont conservés après le « / ».
// Fichier .mjs sans dépendance : importé à la fois par astro.config.mjs
// (plugin rehype des articles) et par le code TypeScript du site.
// ============================================================

/** Adresses absolues du site dont on normalise aussi le chemin. */
const SITE_ORIGINS = ['https://www.lesagedavid.fr', 'https://lesagedavid.fr']

/**
 * Ajoute le « / » final à un chemin de PAGE interne.
 * @param {string} href
 * @returns {string}
 */
export function withTrailingSlash(href) {
  if (typeof href !== 'string') return href
  for (const origin of SITE_ORIGINS) {
    if (href === origin) return 'https://www.lesagedavid.fr/'
    if (href.startsWith(origin + '/')) return 'https://www.lesagedavid.fr' + withTrailingSlash(href.slice(origin.length))
  }
  if (!href.startsWith('/') || href.startsWith('//')) return href
  const cut = href.search(/[?#]/)
  const base = cut === -1 ? href : href.slice(0, cut)
  const suffix = cut === -1 ? '' : href.slice(cut)
  if (base.endsWith('/')) return href
  if (base === '/api' || base.startsWith('/api/')) return href
  const last = base.slice(base.lastIndexOf('/') + 1)
  if (last.includes('.')) return href
  return base + '/' + suffix
}

/**
 * Plugin rehype : applique `withTrailingSlash` aux liens des articles
 * (Markdown + HTML brut). Ne touche QUE l'attribut href des <a>.
 */
export function rehypeTrailingSlash() {
  const walk = (node) => {
    if (!node) return
    if (node.type === 'element' && node.tagName === 'a' && node.properties && typeof node.properties.href === 'string') {
      node.properties.href = withTrailingSlash(node.properties.href)
    }
    if (Array.isArray(node.children)) node.children.forEach(walk)
  }
  return (tree) => walk(tree)
}
