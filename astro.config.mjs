import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'
import tailwindcss from '@tailwindcss/vite'

// Domaine de production (à ajuster lors du déploiement réel)
const SITE = process.env.SITE_URL || 'https://www.lesagedavid.fr'

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
  vite: {
    plugins: [tailwindcss()],
  },
})
