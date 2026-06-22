// ============================================================
// Données centrales NEUTRES du site David Lesage.
// Libellés de navigation / footer / crédibilité → src/i18n/dict.ts.
// David Lesage est la MARQUE-MÈRE ; Neotone, Handpan Studio, les
// Cours et les micros sont ses univers.
// ============================================================

export const site = {
  name: 'David Lesage',
  tagline: 'Rendre la musique visible et accessible — par les couleurs, la géométrie et les émotions.',
  positioning:
    'David Lesage — le musicien-inventeur qui rend la musique visible et accessible à tous, par les couleurs, la géométrie et les émotions.',
  url: 'https://www.lesagedavid.fr',
  // Lien direct vers l'application Handpan Studio. La connexion, le choix de
  // l'abonnement et le paiement (Stripe) se font directement dans l'app.
  appUrl: 'https://neotone-studio-delta.vercel.app',
  email: 'contact@lesagedavid.fr',
  emailNeotone: 'neotone@lesagedavid.fr',
  phone: '+33 6 10 73 31 52',
  phoneHref: '+33610733152',
  address: '29 rue des Orteaux, 75020 Paris',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=29+rue+des+Orteaux+75020+Paris',
  social: {
    instagram: 'https://www.instagram.com/neotone.digitalhandpan/',
    facebook: 'https://www.facebook.com/people/Neotone-Digital-Handpan/',
    linktree: 'https://linktr.ee/David.Lesage.Artiste',
    youtube: 'https://www.youtube.com/@DavidLesageMusique',
  },
}

// Clé de libellé (→ dict.common.nav) + chemin neutre (sera localisé via localizePath)
export const nav = [
  { key: 'home', href: '/' },
  { key: 'neotone', href: '/le-neotone' },
  { key: 'shop', href: '/boutique' },
  { key: 'lessons', href: '/cours' },
  { key: 'studio', href: '/handpan-studio' },
  { key: 'showroom', href: '/showroom' },
  { key: 'about', href: '/a-propos' },
  { key: 'contact', href: '/contact' },
] as const

export const footerNav = [
  { key: 'newsletter', href: '/#communaute' },
  { key: 'faq', href: '/le-neotone#faq' },
  { key: 'legal', href: '/mentions-legales' },
] as const

// Les 7 degrés ChromaKeys — couleurs neutres (émotions via dict.common.emotions)
export const chromaKeys = [
  { degree: 'I', color: 'var(--color-chroma-1)' },
  { degree: 'II', color: 'var(--color-chroma-2)' },
  { degree: 'III', color: 'var(--color-chroma-3)' },
  { degree: 'IV', color: 'var(--color-chroma-4)' },
  { degree: 'V', color: 'var(--color-chroma-5)' },
  { degree: 'VI', color: 'var(--color-chroma-6)' },
  { degree: 'VII', color: 'var(--color-chroma-7)' },
]
