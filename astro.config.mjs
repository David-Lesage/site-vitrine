import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'
import tailwindcss from '@tailwindcss/vite'

// Domaine de production (à ajuster lors du déploiement réel)
const SITE = process.env.SITE_URL || 'https://www.lesagedavid.fr'

/* 💬 COMMENTAIRES HTML DES ARTICLES — retirés du HTML produit (27/08/2026)
   Un article peut contenir des <!-- notes de chantier --> : elles servent à
   RÉSERVER la place exacte d'une image encore manquante, dans le `.md`, là où
   elle ira. C'est le bon endroit pour elles… mais ce sont des notes internes,
   pas du contenu public : sans ça elles partaient telles quelles dans le HTML
   servi aux lecteurs (chemins de fichiers, commandes shell comprises).
   Plugin local, ZÉRO dépendance npm. Il ne retire QUE des commentaires :
   les deux formes possibles selon l'endroit du pipeline (nœud `comment` après
   rehype-raw, ou nœud `raw` qui n'est QUE `<!-- … -->`). Aucun autre nœud n'est
   touché — vérifié sur les 60 articles au build du 27/08/2026. */
function rehypeStripHtmlComments() {
  const isComment = (n) =>
    n.type === 'comment' ||
    (n.type === 'raw' && typeof n.value === 'string' && /^\s*<!--[\s\S]*-->\s*$/.test(n.value))
  const walk = (node) => {
    if (!node || !Array.isArray(node.children)) return
    node.children = node.children.filter((c) => !isComment(c))
    node.children.forEach(walk)
  }
  return (tree) => walk(tree)
}

export default defineConfig({
  site: SITE,
  output: 'static',
  i18n: {
    defaultLocale: 'fr',
    // Langues actives (routées). DE/ES/IT/PT s'ajoutent ici dès que leur dictionnaire est prêt.
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false, // FR à la racine, /en pour l'anglais
    },
  },
  integrations: [
    icon(),
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr-FR', en: 'en-US' },
      },
    }),
  ],
  markdown: {
    rehypePlugins: [rehypeStripHtmlComments],
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
