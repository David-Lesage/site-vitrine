// ============================================================
// Catalogue boutique — architecture par catégories (extensible)
// Les produits "active: true" sont vendables (checkout Snipcart).
// Le Neotone reste en "devis" (acompte + code remise nominatif),
// donc dirigé vers la page Le Neotone plutôt qu'un panier direct.
// ============================================================

export interface Product {
  id: string
  name: string
  price: number // EUR TTC
  description: string
  image: string
  imgW: number
  imgH: number
  url: string
  category: string
  active: boolean
  mode: 'cart' | 'quote' | 'soon'
}

export const categories = [
  { id: 'handpans', label: 'Handpans numériques', blurb: 'Les Neotone, sélectionnés et accompagnés par David.' },
  { id: 'micros', label: 'Micros', blurb: 'Captation pour handpan acoustique, voix et gong.' },
]

export const products: Product[] = [
  {
    id: 'neotone-one',
    name: 'Neotone¹',
    price: 1990,
    description: 'Handpan numérique 10 notes, toutes les gammes, qualité studio. Achat accompagné : code de remise nominatif + garantie 6 ans.',
    image: '/images/neotone-1-edition.webp',
    imgW: 670,
    imgH: 653,
    url: '/le-neotone',
    category: 'handpans',
    active: true,
    mode: 'quote',
  },
  {
    id: 'neotone-mutant',
    name: 'Neotone¹ Mutant',
    price: 3150,
    description: 'Handpan numérique 19 notes avec écran LCD, l’expression maximale. Achat accompagné : code de remise + garantie 6 ans.',
    image: '/images/neotone-mutant-edition.webp',
    imgW: 670,
    imgH: 614,
    url: '/le-neotone',
    category: 'handpans',
    active: true,
    mode: 'quote',
  },
  {
    id: 'micro-hisong',
    name: 'Micro Hisong',
    price: 149,
    description: 'Micro de captation pour handpan acoustique, voix et gong. Choisi et testé par David — déjà adopté par la communauté.',
    image: '/images/favicon.png',
    imgW: 128,
    imgH: 128,
    url: '/boutique#micro-hisong',
    category: 'micros',
    active: true,
    mode: 'cart',
  },
  {
    id: 'micro-muling',
    name: 'Micro Muling',
    price: 0,
    description: 'Bientôt disponible.',
    image: '/images/favicon.png',
    imgW: 128,
    imgH: 128,
    url: '/boutique',
    category: 'micros',
    active: false,
    mode: 'soon',
  },
]
