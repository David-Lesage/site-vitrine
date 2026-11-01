import { site } from '@/data/site'
import { withTrailingSlash } from '@/lib/trailing-slash.mjs'

// Adresse absolue d'une PAGE du site, toujours sous sa forme canonique
// (« / » final, 20/10/2026) — la même que <link rel="canonical"> et le sitemap.
const pageUrl = (path: string) => new URL(withTrailingSlash(path), site.url).toString()
const home = `${site.url}/`
// Référence complète à David : un `@id` seul ne dit rien sur les pages qui ne
// contiennent pas l'entité Person (seul l'accueil la décrit).
const davidRef = { '@type': 'Person', '@id': `${site.url}/#david-lesage`, name: 'David Lesage', url: home }

// `uploadDate` est obligatoire pour que Google accepte un VideoObject.
// YouTube : date de mise en ligne lue sur la page de la vidéo (01/11/2026).
const YOUTUBE_UPLOAD_DATES: Record<string, string> = {
  B_7ZvlpHUsE: '2026-04-23T01:23:17-07:00',
  ENArz99dyTQ: '2026-08-13T01:00:25-07:00',
  KNQc6jCs0VE: '2025-03-15T06:55:51-07:00',
  Zp_zaqsRBCg: '2023-07-14T11:23:02-07:00',
  rx8ZZcL7Nog: '2026-05-09T00:00:46-07:00',
  v87I0csinRY: '2025-12-08T09:59:11-08:00',
  zWqXGlHb2wI: '2025-02-19T04:08:38-08:00',
}
// Vidéos de l'app (public/images/sa-*.mp4) : date d'ajout au dépôt (git log).
const localUploadDate = (src: string) => (/\/images\/sa-[^/]+\.mp4$/.test(src) ? '2026-06-18' : undefined)

// Données structurées Schema.org — David Lesage = entité Person (E-E-A-T)
export function personLdJson() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site.url}/#david-lesage`,
    name: 'David Lesage',
    jobTitle: 'Musicien, pédagogue et inventeur',
    description: site.positioning,
    url: home,
    image: new URL('/images/hero-david.jpg', site.url).toString(),
    email: `mailto:${site.email}`,
    telephone: site.phone,
    sameAs: [site.social.instagram, site.social.facebook, site.social.youtube, site.social.linktree],
    knowsAbout: [
      'Handpan',
      'Handpan électronique',
      'Neotone',
      'Handpan Constellation Studio',
      'Apprentissage du handpan par les couleurs et les formes',
      'Pédagogie musicale visuelle',
      'ChromaKeys',
      'Constellations d’accords',
      'Rythme',
      'Calebasse',
    ],
    knowsLanguage: ['fr', 'en'],
    // ⚠️ Personne réelle : ne lister ici que des faits sourcés.
    // « The Voice » n'est PAS une récompense — David a passé les auditions à
    // l'aveugle de la saison 11 (TF1, 2022). Le déclarer en `award` était faux :
    // c'est désormais une `performerIn`, et le prix du Conservatoire reste seul.
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Conservatoire de Toulouse' },
    award: ['Prix de batterie du Conservatoire de Toulouse (mention très bien)'],
    performerIn: { '@type': 'TVEpisode', name: 'The Voice — saison 11, auditions à l’aveugle (TF1, 2022)' },
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
    alternateName: ['David Lesage', 'Handpan Constellation Studio'],
    url: home,
    description: site.positioning,
    inLanguage: ['fr', 'en'],
    publisher: davidRef,
  }
}

// L'application Handpan Constellation Studio (crucial pour les recherches « app handpan » / IA)
export function softwareAppLdJson() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Handpan Constellation Studio',
    // 🔎 24/08/2026 : continuité SEO. Les noms précédents ont été indexés par
    // Google ; `alternateName` les rattache à la même app sans rien afficher
    // au visiteur. Ne jamais les remettre dans du texte visible.
    alternateName: [
      'Handpan Compagnon',
      'Handpan Companion',
      'Handpan Studio',
      'Neotone Studio',
    ],
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Music education',
    operatingSystem: 'Web (navigateur)',
    url: 'https://play.handpanstudio.app',
    description:
      // ⚖️ 22/08/2026 : l'ordre est inversé (acoustique d'abord). Un prof de
      // handpan acoustique s'était cru exclu par le discours du site.
      'Application web d’apprentissage du handpan qui rend la musique visible : chaque note a une couleur (ChromaKeys) et chaque accord dessine une forme (Constellation). Fonctionne sur n’importe quel handpan acoustique comme sur le handpan électronique Neotone.',
    inLanguage: ['fr', 'en'],
    author: davidRef,
    creator: davidRef,
    featureList: [
      'Notes en couleurs (ChromaKeys)',
      'Constellations d’accords (tablature visuelle)',
      'Atlas de gammes du monde',
      'Création de gammes',
      'Mode acoustique',
      'Connexion MIDI au Neotone',
    ],
    // Ces données ne servent qu'à /en/ et /es/handpan-app/ : seules les offres affichées
    // sur ces pages figurent ici. Studio y est encore en liste d'attente, alors qu'il est
    // vendu sur la page française (9,99 €). À compléter quand ces pages seront alignées.
    offers: [
      { '@type': 'Offer', name: 'Free', price: 0, priceCurrency: 'EUR' },
      { '@type': 'Offer', name: 'Essential', price: 3.49, priceCurrency: 'EUR' },
    ],
  }
}

// Les cours / méthode (page Cours = Now Music Academy)
// `offers` : formules à PRIX LIBRE À PARTIR D'UN MINIMUM (cours, 20/10/2026) →
// Offer + PriceSpecification `minPrice` (schema.org), sans prix maximum.
export function courseLdJson(p: { name: string; description: string; url: string; offers?: { name: string; minPrice: number; url: string }[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: p.name,
    description: p.description,
    url: pageUrl(p.url),
    inLanguage: 'fr',
    provider: {
      '@type': 'Person',
      '@id': `${site.url}/#david-lesage`,
      name: 'David Lesage',
      url: home,
    },
    about: ['Handpan', 'Handpan électronique Neotone', 'Rythme', 'Pédagogie musicale visuelle'],
    // En visio ou à Paris, comme l'annonce la page Cours.
    hasCourseInstance: [
      { '@type': 'CourseInstance', courseMode: 'online' },
      {
        '@type': 'CourseInstance',
        courseMode: 'onsite',
        location: {
          '@type': 'Place',
          name: 'Showroom David Lesage',
          address: { '@type': 'PostalAddress', streetAddress: '29 rue des Orteaux', postalCode: '75020', addressLocality: 'Paris', addressCountry: 'FR' },
        },
      },
    ],
    ...(p.offers?.length
      ? {
          offers: p.offers.map((o) => ({
            '@type': 'Offer',
            name: o.name,
            category: 'Paid',
            url: o.url,
            price: o.minPrice,
            priceCurrency: 'EUR',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: o.minPrice, priceCurrency: 'EUR' },
          })),
        }
      : {}),
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
    ...(YOUTUBE_UPLOAD_DATES[v.id] ? { uploadDate: YOUTUBE_UPLOAD_DATES[v.id] } : {}),
    publisher: davidRef,
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
    ...(localUploadDate(v.contentUrl) ? { uploadDate: localUploadDate(v.contentUrl) } : {}),
    publisher: davidRef,
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

// Identifiant stable du showroom : la même entité est décrite sur /showroom/
// et sur /neotone/ (20/10/2026). Pas d'horaires ni de coordonnées GPS : le
// showroom reçoit sur rendez-vous et ces données n'existent pas dans le site.
export const showroomId = `${site.url}/showroom/#showroom`

export function localBusinessLdJson() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicStore',
    '@id': showroomId,
    name: 'Showroom David Lesage',
    description: "Le seul endroit au monde pour tester et repartir avec un Neotone le jour même. Rencontres, démonstrations privées et cours à Paris 20ᵉ.",
    image: new URL('/images/localisation-showroom-poster.webp', site.url).toString(),
    url: pageUrl('/showroom'),
    telephone: site.phone,
    email: site.email,
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
      url: pageUrl(it.url),
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
  const url = pageUrl(p.url)
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
    author: { '@id': `${site.url}/#david-lesage`, '@type': 'Person', name: 'David Lesage', url: home },
    publisher: { '@id': `${site.url}/#david-lesage`, '@type': 'Person', name: 'David Lesage', url: home },
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
      item: pageUrl(t.url),
    })),
  }
}

// Fiche produit d'un modèle Neotone (20/10/2026, objectif « Neotone » dans Google).
// Une offre par essence de bois, aux prix EXACTS du site (src/data/neotone.ts),
// qui sont des prix HORS TAXES (« à partir de … € HT » sur la page ; la TVA
// dépend du pays, cf. Calculator.astro) → `valueAddedTaxIncluded: false`.
// `availability` n'est écrite QUE si le stock lu au build dit ce bois « disponible » :
// sans information, on ne déclare rien. Aucun avis, aucune note : il n'y en a
// pas de réels (pas d'aggregateRating / review).
//
// 🧩 Options ajoutées le 20/10/2026 pour les pieds Atlas (vendus PAR Atlas,
// prix TTC) : `brand`, `vatIncluded`, `seller`, et `url` par offre. Sans elles,
// la sortie Neotone est strictement inchangée (mêmes valeurs par défaut).
export function productLdJson(p: {
  id: string
  name: string
  description: string
  pageUrl: string
  images: string[]
  offers: { name: string; price: number; inStock?: boolean; url?: string }[]
  brand?: string
  vatIncluded?: boolean
  seller?: { name: string; url?: string }
}) {
  const url = pageUrl(p.pageUrl)
  const seller = p.seller
    ? { '@type': 'Organization', name: p.seller.name, ...(p.seller.url ? { url: p.seller.url } : {}) }
    : { '@type': 'Person', '@id': `${site.url}/#david-lesage`, name: 'David Lesage' }
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#${p.id}`,
    name: p.name,
    description: p.description,
    url,
    image: p.images.map((img) => new URL(img, site.url).toString()),
    brand: { '@type': 'Brand', name: p.brand ?? 'Neotone' },
    offers: p.offers.map((o) => ({
      '@type': 'Offer',
      name: o.name,
      url: o.url ?? url,
      price: o.price,
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: o.price,
        priceCurrency: 'EUR',
        valueAddedTaxIncluded: p.vatIncluded ?? false,
      },
      ...(o.inStock ? { availability: 'https://schema.org/InStock' } : {}),
      seller,
    })),
  }
}
