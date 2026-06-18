// ============================================================
// Catalogue boutique NEUTRE. Noms/descriptions/catégories traduits
// dans src/i18n/dict.ts (shop.products / shop.categories), indexés
// par `id` / `category`.
// ============================================================

export interface Product {
  id: string
  price: number // EUR TTC
  image: string
  imgW: number
  imgH: number
  url: string
  category: string
  active: boolean
  mode: 'cart' | 'quote' | 'soon'
}

export const categoryIds = ['handpans', 'micros'] as const

export const products: Product[] = [
  { id: 'neotone-one', price: 1990, image: '/images/neotone-1-edition.webp', imgW: 670, imgH: 653, url: '/le-neotone', category: 'handpans', active: true, mode: 'quote' },
  { id: 'neotone-mutant', price: 3150, image: '/images/neotone-mutant-edition.webp', imgW: 670, imgH: 614, url: '/le-neotone', category: 'handpans', active: true, mode: 'quote' },
  { id: 'micro-hisong', price: 149, image: '/images/favicon.png', imgW: 128, imgH: 128, url: '/boutique#micro-hisong', category: 'micros', active: true, mode: 'cart' },
  { id: 'micro-muling', price: 0, image: '/images/favicon.png', imgW: 128, imgH: 128, url: '/boutique', category: 'micros', active: false, mode: 'soon' },
]
