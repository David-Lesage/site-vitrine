// ============================================================
// Données centrales du site David Lesage
// David Lesage est la MARQUE-MÈRE ; Neotone, Handpan Studio,
// les Cours et les micros sont ses univers.
// ============================================================

export const site = {
  name: 'David Lesage',
  tagline: 'Rendre la musique visible et accessible — par les couleurs, la géométrie et les émotions.',
  positioning:
    'David Lesage — le musicien-inventeur qui rend la musique visible et accessible à tous, par les couleurs, la géométrie et les émotions.',
  url: 'https://www.lesagedavid.fr',
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

// Menu principal (8 entrées max — cf. document directeur)
export const nav = [
  { label: 'Accueil', href: '/' },
  { label: 'Le Neotone', href: '/le-neotone' },
  { label: 'Boutique', href: '/boutique' },
  { label: 'Cours', href: '/cours' },
  { label: 'Handpan Studio', href: '/handpan-studio' },
  { label: 'Showroom', href: '/showroom' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
]

export const footerNav = [
  { label: 'Newsletter', href: '/handpan-studio#liste-attente' },
  { label: 'FAQ', href: '/le-neotone#faq' },
  { label: 'Mentions légales', href: '/mentions-legales' },
]

// Les 7 degrés ChromaKeys (couleur + émotion)
export const chromaKeys = [
  { degree: 'I', emotion: 'Équilibre', color: 'var(--color-chroma-1)' },
  { degree: 'II', emotion: 'Élan', color: 'var(--color-chroma-2)' },
  { degree: 'III', emotion: 'Aventure', color: 'var(--color-chroma-3)' },
  { degree: 'IV', emotion: 'Détente', color: 'var(--color-chroma-4)' },
  { degree: 'V', emotion: 'Tension', color: 'var(--color-chroma-5)' },
  { degree: 'VI', emotion: 'Nostalgie', color: 'var(--color-chroma-6)' },
  { degree: 'VII', emotion: 'Mystère', color: 'var(--color-chroma-7)' },
]

// Bandeau crédibilité
export const credentials = [
  'Conservatoire national',
  'Prix de batterie',
  'Ambassadeur certifié Neotone',
  'Showroom Paris 20ᵉ',
]
