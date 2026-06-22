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
  // 'link' = produit acheté/écouté sur une plateforme externe (HelloAsso, streaming…)
  mode: 'cart' | 'quote' | 'soon' | 'link'
  // libellé du bouton pour les produits 'link'
  linkLabel?: 'buy' | 'listen'
}

export const categoryIds = ['handpans', 'micros', 'musique'] as const

export const products: Product[] = [
  { id: 'neotone-one', price: 1990, image: '/images/neotone-1-edition.webp', imgW: 670, imgH: 653, url: '/le-neotone', category: 'handpans', active: true, mode: 'quote' },
  { id: 'neotone-mutant', price: 3150, image: '/images/neotone-mutant-edition.webp', imgW: 670, imgH: 614, url: '/le-neotone', category: 'handpans', active: true, mode: 'quote' },
  { id: 'micro-hisong', price: 149, image: '/images/favicon.png', imgW: 128, imgH: 128, url: '/boutique#micro-hisong', category: 'micros', active: true, mode: 'cart' },
  { id: 'micro-muling', price: 0, image: '/images/favicon.png', imgW: 128, imgH: 128, url: '/boutique', category: 'micros', active: false, mode: 'soon' },
  // Musique & formations — vente / écoute sur plateformes externes (Linktree)
  { id: 'album-phoenix', price: 0, image: '/images/prod-album-phoenix.png', imgW: 900, imgH: 900, url: 'https://www.helloasso.com/associations/resonances-productions/boutiques/acheter-album-l-alliance-du-phoenix-david-lesage', category: 'musique', active: true, mode: 'link', linkLabel: 'buy' },
  { id: 'now-groove', price: 0, image: '/images/prod-now-groove.jpg', imgW: 299, imgH: 299, url: 'https://www.helloasso.com/associations/resonances-productions/boutiques/formation-de-rythme-now-groove-david-lesage', category: 'musique', active: true, mode: 'link', linkLabel: 'buy' },
  { id: 'cours-prives', price: 0, image: '/images/prod-cours-stages.jpg', imgW: 371, imgH: 371, url: 'https://www.helloasso.com/associations/resonances-productions/boutiques/cours-prive-et-stages-avec-david-lesage', category: 'musique', active: true, mode: 'link', linkLabel: 'buy' },
  { id: 'streaming', price: 0, image: '/images/prod-streaming.jpg', imgW: 675, imgH: 900, url: 'https://music.imusician.pro/artist/GtChl4dcIh/releases', category: 'musique', active: true, mode: 'link', linkLabel: 'listen' },
]
