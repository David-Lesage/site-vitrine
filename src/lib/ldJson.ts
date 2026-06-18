import { site } from '@/data/site'

// Données structurées Schema.org — David Lesage = entité Person + Organization
export function personLdJson() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'David Lesage',
    jobTitle: 'Musicien, pédagogue et inventeur',
    description: site.positioning,
    url: site.url,
    email: `mailto:${site.email}`,
    telephone: site.phone,
    sameAs: [site.social.instagram, site.social.facebook, site.social.youtube, site.social.linktree],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '29 rue des Orteaux',
      postalCode: '75020',
      addressLocality: 'Paris',
      addressCountry: 'FR',
    },
  }
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
