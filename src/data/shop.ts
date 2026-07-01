// ============================================================
// Catalogue boutique NEUTRE. Noms/descriptions/catégories traduits
// dans src/i18n/dict.ts (shop.products / shop.categories), indexés
// par `id` / `category`.
// ============================================================

import { modelCarousels } from './neotone'

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
  linkLabel?: 'buy' | 'listen' | 'discover' | 'order' | 'interested'
  // pastille (plateforme / statut) pour les produits 'link' → dict.shop.linkTags
  tagKey?: 'helloasso' | 'streaming' | 'hisong' | 'yishama' | 'nowgroove' | 'ondemand' | 'maisongoni' | 'tambour' | 'spotify' | 'limited' | 'app' | 'muling'
  // prix indicatif affiché tel quel (produits externes), ex. "299 €"
  priceLabel?: string
  // plusieurs photos → carrousel + plein écran sur la fiche (sinon `image` seule)
  images?: string[]
  // liens vidéo de démo (YouTube) → bouton(s) « Voir la démo » sur la fiche
  videoUrls?: string[]
}

export const categoryIds = ['handpans', 'app', 'creations', 'instruments', 'micros', 'musique', 'formations'] as const

export const products: Product[] = [
  // Application Handpan Studio — produit phare digital
  { id: 'handpan-studio', price: 0, image: '/images/app-logique.webp', imgW: 1100, imgH: 1327, url: '/handpan-studio', category: 'app', active: true, mode: 'link', linkLabel: 'discover', tagKey: 'app', priceLabel: 'Gratuit · Studio dès 9,90 €/mois', images: ['/images/app-logique.webp', '/images/app-atlas.webp', '/images/app-creation.webp', '/images/app-midi.webp', '/images/constel-polygone.webp'] },
  { id: 'neotone-one', price: 1990, image: '/images/neotone1-1.jpg', imgW: 670, imgH: 653, url: '/le-neotone', category: 'handpans', active: true, mode: 'quote', images: modelCarousels.one.map((s) => s.src) },
  { id: 'neotone-mutant', price: 3150, image: '/images/mutant-0.jpg', imgW: 670, imgH: 614, url: '/le-neotone', category: 'handpans', active: true, mode: 'quote', images: modelCarousels.mutant.map((s) => s.src) },
  // Instruments d'exception — joués / créés / recommandés par David (Linktree)
  { id: 'yishama', price: 0, image: '/images/prod-yishama.png', imgW: 766, imgH: 766, url: 'https://www.yishama.com/?wpam_id=40', category: 'instruments', active: true, mode: 'link', linkLabel: 'discover', tagKey: 'yishama', images: ['/images/prod-yishama.png', '/images/prod-yishama-2.jpg', '/images/prod-yishama-3.jpg', '/images/prod-yishama-4.jpg'] },
  { id: 'gonilele', price: 0, image: '/images/prod-gonilele-4.jpg', imgW: 1000, imgH: 1100, url: '/gonilele', category: 'instruments', active: true, mode: 'link', linkLabel: 'discover', tagKey: 'maisongoni', priceLabel: 'dès 440 €', images: ['/images/prod-gonilele-4.jpg', '/images/prod-gonilele-2.jpg', '/images/prod-gonilele-5.jpg', '/images/prod-gonilele.jpeg', '/images/prod-gonilele-3.jpg'] },
  { id: 'tambour', price: 0, image: '/images/prod-tambour.jpg', imgW: 480, imgH: 360, url: 'https://www.facebook.com/profile.php?id=100075977844059', category: 'instruments', active: true, mode: 'link', linkLabel: 'discover', tagKey: 'tambour' },
  // ── Mes créations Now Groove (David Lesage) : méthode + calebasse signature + housse ──
  { id: 'now-groove', price: 0, image: '/images/prod-nowgroove.webp', imgW: 1000, imgH: 1442, url: 'https://www.helloasso.com/associations/resonances-productions/boutiques/formation-de-rythme-now-groove-david-lesage', category: 'creations', active: true, mode: 'link', linkLabel: 'buy', tagKey: 'helloasso' },
  { id: 'calebasse', price: 0, image: '/images/prod-calebasse.jpeg', imgW: 1000, imgH: 1000, url: 'https://www.helloasso.com/associations/resonances-productions/boutiques/formation-de-rythme-now-groove-david-lesage', category: 'creations', active: true, mode: 'link', linkLabel: 'buy', tagKey: 'nowgroove', priceLabel: '149 €', images: ['/images/prod-calebasse.jpeg', '/images/prod-calebasse-3.jpg', '/images/prod-calebasse-4.jpg'] },
  // Housse de calebasse Now Groove — pré-vente HelloAsso, édition limitée faite main
  { id: 'housse', price: 0, image: '/images/prod-housse-1.jpg', imgW: 1000, imgH: 1000, url: 'https://www.helloasso.com/associations/resonances-productions/boutiques/pres-vente-housse-calebasse-now-groove-by-david-lesage', category: 'creations', active: true, mode: 'link', linkLabel: 'buy', tagKey: 'limited', priceLabel: '99 €', images: ['/images/prod-housse-1.jpg', '/images/prod-housse-2.jpg', '/images/prod-housse-3.jpg', '/images/prod-housse-4.jpg'] },
  // Micros
  { id: 'micro-hisong', price: 0, image: '/images/prod-micro-hisong.webp', imgW: 1400, imgH: 1400, url: 'https://hisong.io/DAVID-LESAGE-SAVE-5', category: 'micros', active: true, mode: 'link', linkLabel: 'buy', tagKey: 'hisong', priceLabel: '299 €', images: ['/images/prod-micro-hisong.webp', '/images/prod-hisong-7.jpg', '/images/prod-hisong-3.jpg', '/images/prod-hisong-2.jpg', '/images/prod-hisong-4.jpg', '/images/prod-hisong-5.jpg', '/images/prod-hisong-6.jpg'], videoUrls: ['https://www.youtube.com/watch?v=B_7ZvlpHUsE', 'https://youtu.be/rx8ZZcL7Nog'] },
  { id: 'micro-muling', price: 0, image: '/images/prod-muling-2.jpg', imgW: 1200, imgH: 1200, url: 'mailto:contact@lesagedavid.fr?subject=Micro%20Muling%20MP1%20%E2%80%94%20je%20suis%20int%C3%A9ress%C3%A9%28e%29&body=Bonjour%20David%2C%0A%0AJe%20suis%20int%C3%A9ress%C3%A9%28e%29%20par%20le%20micro%20Muling%20MP1%20%2B%20pr%C3%A9ampli%20HMP-2.%20Peux-tu%20me%20tenir%20au%20courant%20d%C3%A8s%20qu%27il%20sera%20disponible%20%C3%A0%20la%20vente%20%3F%0A%0AMerci%20%21', category: 'micros', active: true, mode: 'link', linkLabel: 'interested', tagKey: 'muling', images: ['/images/prod-muling-2.jpg', '/images/prod-muling-1.jpg', '/images/prod-muling-3.jpg', '/images/prod-muling-4.jpg', '/images/prod-muling-5.jpg', '/images/prod-muling-6.jpg', '/images/prod-muling-7.jpg', '/images/prod-muling-8.jpg', '/images/prod-muling-9.jpg', '/images/prod-muling-10.jpg'] },
  // Musique — albums & écoute en streaming (Spotify / plateformes)
  { id: 'phoenix-opus1', price: 0, image: '/images/prod-phoenix-opus1.jpg', imgW: 640, imgH: 640, url: 'https://open.spotify.com/album/3sxUqtH3uKf7pceIJ0j5l5', category: 'musique', active: true, mode: 'link', linkLabel: 'listen', tagKey: 'spotify' },
  { id: 'phoenix-opus2', price: 0, image: '/images/prod-phoenix-opus2.jpg', imgW: 640, imgH: 640, url: 'https://open.spotify.com/album/19JuVzKWNd5xUMquLvLSm1', category: 'musique', active: true, mode: 'link', linkLabel: 'listen', tagKey: 'spotify' },
  // Album de reprises. Visuel temporaire (pochette Spotify) → remplacer par
  // l'artwork officiel « COVER » (public/images/prod-cover.jpg) fourni par David.
  { id: 'cover', price: 0, image: '/images/prod-cover.jpg', imgW: 640, imgH: 640, url: 'https://open.spotify.com/artist/7zEAQJbalBFj8XNHrcqdbK', category: 'musique', active: true, mode: 'link', linkLabel: 'listen', tagKey: 'spotify' },
  // Cours & stages
  { id: 'cours-prives', price: 0, image: '/images/prod-cours-stages.jpg', imgW: 371, imgH: 371, url: 'https://www.helloasso.com/associations/resonances-productions/boutiques/cours-prive-et-stages-avec-david-lesage', category: 'formations', active: true, mode: 'link', linkLabel: 'buy', tagKey: 'helloasso', priceLabel: '50 €/h · 70 €/1h30' },
]
