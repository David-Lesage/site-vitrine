import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'
import tailwindcss from '@tailwindcss/vite'

// Domaine de production (à ajuster lors du déploiement réel)
const SITE = process.env.SITE_URL || 'https://www.lesagedavid.fr'

export default defineConfig({
  site: SITE,
  output: 'static',
  integrations: [
    icon(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
