import { site } from '@/data/site'

// Données structurées Schema.org — David Lesage = entité Person (E-E-A-T)
export function personLdJson() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site.url}/#david-lesage`,
    name: 'David Lesage',
    jobTitle: 'Musicien, pédagogue et inventeur',
    description: site.positioning,
    url: site.url,
    image: new URL('/images/hero-david.jpg', site.url).toString(),
    email: `mailto:${site.email}`,
    telephone: site.phone,
    sameAs: [site.social.instagram, site.social.facebook, site.social.youtube, site.social.linktree],
    knowsAbout: [
      'Handpan',
      'Handpan électronique',
      'Neotone',
      'Handpan Studio',
      'Apprentissage du handpan par les couleurs et les formes',
      'Pédagogie musicale visuelle',
      'ChromaKeys',
      'Constellations d’accords',
      'Rythme',
      'Calebasse',
    ],
    knowsLanguage: ['fr', 'en'],
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Conservatoire national de région' },
    award: ['Prix de batterie du Conservatoire (mention très bien)', 'The Voice — Saison 11 (France)'],
    hasOccupation: [
      { '@type': 'Occupation', name: 'Musicien' },
      { '@type': 'Occupation', name: 'Professeur de handpan' },
      { '@type': 'Occupation', name: 'Inventeur (pédagogie musicale visuelle)' },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '29 rue des Orteaux',
      postalCode: '75020',
      addressLocality: 'Paris',
      addressCountry: 'FR',
    },
  }
}

// Entité site (utile pour Google + moteurs IA)
export function websiteLdJson() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: 'David Lesage — Musique visible',
    alternateName: ['David Lesage', 'Handpan Studio', 'Neotone'],
    url: site.url,
    description: site.positioning,
    inLanguage: ['fr', 'en'],
    publisher: { '@id': `${site.url}/#david-lesage` },
  }
}

// L'application Handpan Studio (crucial pour les recherches « app handpan » / IA)
export function softwareAppLdJson() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Handpan Studio',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Music education',
    operatingSystem: 'Web (navigateur)',
    url: 'https://play.handpanstudio.app',
    description:
      'Application web d’apprentissage du handpan qui rend la musique visible : chaque note a une couleur (ChromaKeys) et chaque accord dessine une forme (Constellation). Fonctionne sur handpan électronique Neotone comme sur handpan acoustique.',
    inLanguage: ['fr', 'en'],
    author: { '@id': `${site.url}/#david-lesage` },
    creator: { '@id': `${site.url}/#david-lesage` },
    featureList: [
      'Notes en couleurs (ChromaKeys)',
      'Constellations d’accords (tablature visuelle)',
      'Atlas de gammes du monde',
      'Création de gammes',
      'Mode acoustique',
      'Connexion MIDI au Neotone',
    ],
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: '0',
      highPrice: '249',
      offerCount: '4',
      description: 'Version Découverte gratuite, ou Studio dès 9,90 €/mois (89 €/an · 249 € à vie).',
    },
  }
}

// Les cours / méthode (page Cours = Now Music Academy)
export function courseLdJson(p: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: p.name,
    description: p.description,
    url: new URL(p.url, site.url).toString(),
    inLanguage: 'fr',
    provider: {
      '@type': 'Person',
      '@id': `${site.url}/#david-lesage`,
      name: 'David Lesage',
      url: site.url,
    },
    about: ['Handpan', 'Handpan électronique Neotone', 'Rythme', 'Pédagogie musicale visuelle'],
  }
}

// Vidéos YouTube mises en avant (VideoObject → Google + IA)
export function videoLdJson(videos: { id: string; name: string; description?: string }[]) {
  return videos.map((v) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.name,
    description: v.description || v.name,
    thumbnailUrl: [`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`],
    contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
    embedUrl: `https://www.youtube.com/embed/${v.id}`,
    publisher: { '@id': `${site.url}/#david-lesage` },
  }))
}

// Vidéos self-hostées (.mp4 + poster) → VideoObject (schema.org)
export function videoObjectsLocal(videos: { name: string; description: string; thumbnail: string; contentUrl: string }[]) {
  return videos.map((v) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.name,
    description: v.description || v.name,
    thumbnailUrl: [new URL(v.thumbnail, site.url).toString()],
    contentUrl: new URL(v.contentUrl, site.url).toString(),
    publisher: { '@id': `${site.url}/#david-lesage` },
  }))
}

export function faqLdJson(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  }
}

export function localBusinessLdJson() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicStore',
    name: 'Showroom David Lesage',
    description: "Le seul endroit au monde pour tester et repartir avec un Neotone le jour même. Showcases, démonstrations privées et cours à Paris 20ᵉ.",
    image: new URL('/images/localisation-showroom-poster.webp', site.url).toString(),
    url: new URL('/showroom', site.url).toString(),
    telephone: site.phone,
    email: site.emailNeotone,
    priceRange: '€€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '29 rue des Orteaux',
      postalCode: '75020',
      addressLocality: 'Paris',
      addressCountry: 'FR',
    },
    sameAs: [site.social.instagram, site.social.facebook, site.social.youtube],
  }
}

export function itemListLdJson(items: { name: string; url: string; image: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: new URL(it.url, site.url).toString(),
      image: new URL(it.image, site.url).toString(),
    })),
  }
}

// Article de blog (schema.org Article) — auteur/éditeur = entité David Lesage
export function articleLdJson(p: {
  title: string
  description: string
  url: string
  image: string
  datePublished: string
  dateModified?: string
}) {
  const url = new URL(p.url, site.url).toString()
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    description: p.description,
    image: [new URL(p.image, site.url).toString()],
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: p.datePublished,
    dateModified: p.dateModified || p.datePublished,
    author: { '@id': `${site.url}/#david-lesage`, '@type': 'Person', name: 'David Lesage', url: site.url },
    publisher: { '@id': `${site.url}/#david-lesage`, '@type': 'Person', name: 'David Lesage', url: site.url },
  }
}

export function breadcrumbLdJson(trail: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: new URL(t.url, site.url).toString(),
    })),
  }
}

export function productLdJson(p: { name: string; description: string; price: number; image: string; sku?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    image: new URL(p.image, site.url).toString(),
    brand: { '@type': 'Brand', name: 'Neotone' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: p.price,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Person', name: 'David Lesage' },
    },
  }
}
