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
  linkLabel?: 'buy' | 'listen' | 'discover' | 'order'
  // pastille (plateforme / statut) pour les produits 'link' → dict.shop.linkTags
  tagKey?: 'helloasso' | 'streaming' | 'hisong' | 'yishama' | 'nowgroove' | 'ondemand' | 'maisongoni' | 'tambour'
  // prix indicatif affiché tel quel (produits externes), ex. "299 €"
  priceLabel?: string
  // plusieurs photos → carrousel + plein écran sur la fiche (sinon `image` seule)
  images?: string[]
}

export const categoryIds = ['handpans', 'instruments', 'micros', 'musique'] as const

export const products: Product[] = [
  { id: 'neotone-one', price: 1990, image: '/images/neotone-1-edition.webp', imgW: 670, imgH: 653, url: '/le-neotone', category: 'handpans', active: true, mode: 'quote' },
  { id: 'neotone-mutant', price: 3150, image: '/images/neotone-mutant-edition.webp', imgW: 670, imgH: 614, url: '/le-neotone', category: 'handpans', active: true, mode: 'quote' },
  // Instruments d'exception — joués / créés / recommandés par David (Linktree)
  { id: 'yishama', price: 0, image: '/images/prod-yishama.png', imgW: 766, imgH: 766, url: 'https://www.yishama.com/?wpam_id=40', category: 'instruments', active: true, mode: 'link', linkLabel: 'discover', tagKey: 'yishama' },
  { id: 'gonilele', price: 0, image: '/images/prod-gonilele-2.jpg', imgW: 562, imgH: 1000, url: 'mailto:contact@lesagedavid.fr?subject=NGoni%20l%C3%A9l%C3%A9%20%E2%80%94%20harpe%20Gonil%C3%A9l%C3%A9%20(commande)', category: 'instruments', active: true, mode: 'link', linkLabel: 'order', tagKey: 'maisongoni', priceLabel: 'dès 440 €', images: ['/images/prod-gonilele-2.jpg', '/images/prod-gonilele.jpeg', '/images/prod-gonilele-3.jpg'] },
  { id: 'calebasse', price: 0, image: '/images/prod-calebasse.jpeg', imgW: 1000, imgH: 1000, url: 'https://www.helloasso.com/associations/resonances-productions/boutiques/formation-de-rythme-now-groove-david-lesage', category: 'instruments', active: true, mode: 'link', linkLabel: 'buy', tagKey: 'nowgroove', priceLabel: '149 €', images: ['/images/prod-calebasse.jpeg', '/images/prod-calebasse-2.jpg', '/images/prod-calebasse-3.jpg', '/images/prod-calebasse-4.jpg'] },
  // Housse de calebasse haut de gamme (pré-vente HelloAsso). Photos à fournir
  // par David (HelloAsso bloque la récupération auto) → active dès qu'elles sont là.
  { id: 'housse', price: 0, image: '/images/prod-housse-1.jpg', imgW: 1000, imgH: 1000, url: 'https://www.helloasso.com/associations/resonances-productions/boutiques/pres-vente-housse-calebasse-now-groove-by-david-lesage', category: 'instruments', active: false, mode: 'link', linkLabel: 'buy', tagKey: 'nowgroove', images: ['/images/prod-housse-1.jpg', '/images/prod-housse-2.jpg', '/images/prod-housse-3.jpg'] },
  { id: 'tambour', price: 0, image: '/images/prod-tambour.jpg', imgW: 480, imgH: 360, url: 'https://www.facebook.com/profile.php?id=100075977844059', category: 'instruments', active: true, mode: 'link', linkLabel: 'discover', tagKey: 'tambour' },
  // Micros
  { id: 'micro-hisong', price: 0, image: '/images/prod-micro-hisong.webp', imgW: 1400, imgH: 1400, url: 'https://hisong.io/DAVID-LESAGE-SAVE-5', category: 'micros', active: true, mode: 'link', linkLabel: 'buy', tagKey: 'hisong', priceLabel: '299 €' },
  { id: 'micro-muling', price: 0, image: '/images/favicon.png', imgW: 128, imgH: 128, url: '/boutique', category: 'micros', active: false, mode: 'soon' },
  // Musique & formations — vente / écoute sur plateformes externes (Linktree)
  { id: 'album-phoenix', price: 0, image: '/images/prod-album-phoenix.png', imgW: 900, imgH: 900, url: 'https://www.helloasso.com/associations/resonances-productions/boutiques/acheter-album-l-alliance-du-phoenix-david-lesage', category: 'musique', active: true, mode: 'link', linkLabel: 'buy', tagKey: 'helloasso', priceLabel: '39 €' },
  { id: 'now-groove', price: 0, image: '/images/prod-now-groove.jpg', imgW: 299, imgH: 299, url: 'https://www.helloasso.com/associations/resonances-productions/boutiques/formation-de-rythme-now-groove-david-lesage', category: 'musique', active: true, mode: 'link', linkLabel: 'buy', tagKey: 'helloasso' },
  { id: 'cours-prives', price: 0, image: '/images/prod-cours-stages.jpg', imgW: 371, imgH: 371, url: 'https://www.helloasso.com/associations/resonances-productions/boutiques/cours-prive-et-stages-avec-david-lesage', category: 'musique', active: true, mode: 'link', linkLabel: 'buy', tagKey: 'helloasso', priceLabel: '99 €' },
  { id: 'streaming', price: 0, image: '/images/prod-streaming.jpg', imgW: 675, imgH: 900, url: 'https://music.imusician.pro/artist/GtChl4dcIh/releases', category: 'musique', active: true, mode: 'link', linkLabel: 'listen', tagKey: 'streaming' },
]
