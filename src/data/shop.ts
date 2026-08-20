// ============================================================
// Catalogue boutique NEUTRE. Noms/descriptions/catégories traduits
// dans src/i18n/dict.ts (shop.products / shop.categories), indexés
// par `id` / `category`.
// ============================================================

import { modelCarousels } from './neotone'
// 🎟️ Le code de réduction Atlas est piloté par UN SEUL interrupteur, dans
// src/data/atlas.ts. Tant que `ATLAS_PROMO_ACTIVE` est `false`, la carte Atlas
// de la boutique n'affiche AUCUN code — parce que le code n'existe pas encore
// chez Atlas et qu'un code refusé au paiement coûterait la confiance du client.
import { ATLAS_PROMO_ACTIVE, ATLAS_DISCOUNT_CODE } from './atlas'

export interface Product {
  id: string
  price: number // EUR TTC
  image: string
  imgW: number
  imgH: number
  url: string
  category: string
  // sous-catégorie optionnelle (un seul niveau d'imbrication), traduite dans
  // dict.shop.subcategories. Utilisée par la catégorie « handpans » :
  // 'acoustique' (Yishama) ET 'electronique' (Neotone).
  sub?: string
  active: boolean
  // 'link' = produit acheté/écouté sur une plateforme externe (HelloAsso, streaming…)
  mode: 'cart' | 'quote' | 'soon' | 'link'
  // libellé du bouton pour les produits 'link'
  linkLabel?: 'buy' | 'listen' | 'discover' | 'order' | 'interested'
  // pastille (plateforme / statut) pour les produits 'link' → dict.shop.linkTags
  tagKey?: 'helloasso' | 'streaming' | 'hisong' | 'yishama' | 'nowgroove' | 'ondemand' | 'maisongoni' | 'tambour' | 'spotify' | 'limited' | 'app' | 'muling' | 'onesec' | 'oko' | 'structured' | 'atlas'
  // prix indicatif affiché tel quel (produits externes), ex. "299 €"
  priceLabel?: string
  // code de réduction affiché avec un bouton « copier » (produits externes, lien d'affiliation)
  discountCode?: string
  // encart d'explication du prix (TVA, remises cumulables, port) → dict.shop.priceNotes
  priceNoteKey?: 'hisong'
  // plusieurs photos → carrousel + plein écran sur la fiche (sinon `image` seule)
  images?: string[]
  // liens vidéo de démo (YouTube) → bouton(s) « Voir la démo » sur la fiche
  videoUrls?: string[]
}

export const categoryIds = ['handpans', 'app', 'creations', 'instruments', 'micros', 'accessoires', 'musique', 'formations', 'outils'] as const

// Sous-catégories : UN seul niveau, uniquement pour les catégories listées ici.
// ⚖️ Ordre volontaire — acoustique EN PREMIER, comme sur l'accueil (#instruments)
// et le showroom (#deux-univers) : « pas de compétition, de la complétion ».
// Ne jamais donner plus de place à un univers qu'à l'autre.
export const categorySubs: Record<string, readonly string[]> = {
  handpans: ['acoustique', 'electronique'],
}

export const products: Product[] = [
  // Application Handpan Compagnon — produit phare digital
  { id: 'handpan-studio', price: 0, image: '/images/app-logique.webp', imgW: 1100, imgH: 1327, url: '/handpan-app', category: 'app', active: true, mode: 'link', linkLabel: 'discover', tagKey: 'app', priceLabel: 'Version gratuite ou Studio dès 9,90 €/mois', images: ['/images/app-logique.webp', '/images/app-atlas.webp', '/images/app-creation.webp', '/images/app-midi.webp', '/images/constel-polygone.webp'] },
  { id: 'neotone-one', price: 1990, image: '/images/neotone1-1.jpg', imgW: 670, imgH: 653, url: '/le-neotone', category: 'handpans', sub: 'electronique', active: true, mode: 'quote', images: modelCarousels.one.map((s) => s.src) },
  { id: 'neotone-mutant', price: 3150, image: '/images/mutant-0.jpg', imgW: 670, imgH: 614, url: '/le-neotone', category: 'handpans', sub: 'electronique', active: true, mode: 'quote', images: modelCarousels.mutant.map((s) => s.src) },
  // ⚖️ Yishama vit dans la catégorie « handpans », sous-catégorie ACOUSTIQUE, à
  // égalité avec les Neotone (13/08/2026, demande de David : « faites remonter
  // Yishama, côte à côte aux Neotone »). Photos = visuels marketing Yishama,
  // PAS les instruments personnels de David.
  { id: 'yishama', price: 0, image: '/images/prod-yishama-5.jpg', imgW: 667, imgH: 1000, url: 'https://www.yishama.com/?wpam_id=40', category: 'handpans', sub: 'acoustique', active: true, mode: 'link', linkLabel: 'discover', tagKey: 'yishama', videoUrls: ['https://www.youtube.com/watch?v=Zp_zaqsRBCg'], images: ['/images/prod-yishama-5.jpg', '/images/prod-yishama.png', '/images/prod-yishama-2.jpg', '/images/prod-yishama-3.jpg', '/images/prod-yishama-4.jpg'] },
  { id: 'gonilele', price: 0, image: '/images/prod-gonilele-4.jpg', imgW: 1000, imgH: 1100, url: '/gonilele', category: 'instruments', active: true, mode: 'link', linkLabel: 'discover', tagKey: 'maisongoni', priceLabel: 'dès 440 €', images: ['/images/prod-gonilele-4.jpg', '/images/prod-gonilele-2.jpg', '/images/prod-gonilele-5.jpg', '/images/prod-gonilele.jpeg', '/images/prod-gonilele-3.jpg'] },
  { id: 'tambour', price: 0, image: '/images/prod-tambour.jpg', imgW: 480, imgH: 360, url: 'https://www.facebook.com/profile.php?id=100075977844059', category: 'instruments', active: true, mode: 'link', linkLabel: 'discover', tagKey: 'tambour' },
  // ── Mes créations Now Groove (David Lesage) : méthode + calebasse signature + housse ──
  { id: 'now-groove', price: 0, image: '/images/prod-nowgroove.webp', imgW: 1000, imgH: 1442, url: 'https://www.helloasso.com/associations/resonances-productions/boutiques/formation-de-rythme-now-groove-david-lesage', category: 'creations', active: true, mode: 'link', linkLabel: 'buy', tagKey: 'helloasso' },
  { id: 'calebasse', price: 0, image: '/images/prod-calebasse.jpeg', imgW: 1000, imgH: 1000, url: 'https://www.helloasso.com/associations/resonances-productions/boutiques/formation-de-rythme-now-groove-david-lesage', category: 'creations', active: true, mode: 'link', linkLabel: 'buy', tagKey: 'nowgroove', priceLabel: '149 €', images: ['/images/prod-calebasse.jpeg', '/images/prod-calebasse-3.jpg', '/images/prod-calebasse-4.jpg'] },
  // Housse de calebasse Now Groove — pré-vente HelloAsso, édition limitée faite main
  { id: 'housse', price: 0, image: '/images/prod-housse-1.jpg', imgW: 1000, imgH: 1000, url: 'https://www.helloasso.com/associations/resonances-productions/boutiques/pres-vente-housse-calebasse-now-groove-by-david-lesage', category: 'creations', active: true, mode: 'link', linkLabel: 'buy', tagKey: 'limited', priceLabel: '99 €', images: ['/images/prod-housse-1.jpg', '/images/prod-housse-2.jpg', '/images/prod-housse-3.jpg', '/images/prod-housse-4.jpg'] },
  // Micros
  { id: 'micro-hisong', price: 0, image: '/images/prod-micro-hisong.webp', imgW: 1400, imgH: 1400, url: 'https://hisong.io/DAVID-LESAGE-SAVE-5', category: 'micros', active: true, mode: 'link', linkLabel: 'buy', tagKey: 'hisong', priceLabel: '319 € – 426 € TTC', priceNoteKey: 'hisong', images: ['/images/prod-micro-hisong.webp', '/images/prod-hisong-7.jpg', '/images/prod-hisong-3.jpg', '/images/prod-hisong-2.jpg', '/images/prod-hisong-4.jpg', '/images/prod-hisong-5.jpg', '/images/prod-hisong-6.jpg'], videoUrls: ['https://www.youtube.com/watch?v=B_7ZvlpHUsE', 'https://youtu.be/rx8ZZcL7Nog'] },
  { id: 'micro-muling', price: 0, image: '/images/prod-muling-2.jpg', imgW: 1200, imgH: 1200, url: '/micro-muling', category: 'micros', active: true, mode: 'link', linkLabel: 'discover', tagKey: 'muling', priceLabel: '246,50 € au lieu de 258 €', videoUrls: ['https://youtu.be/ENArz99dyTQ'], images: ['/images/prod-muling-2.jpg', '/images/prod-muling-1.jpg', '/images/prod-muling-3.jpg', '/images/prod-muling-4.jpg', '/images/prod-muling-5.jpg', '/images/prod-muling-6.jpg', '/images/prod-muling-7.jpg', '/images/prod-muling-8.jpg', '/images/prod-muling-9.jpg', '/images/prod-muling-10.jpg'] },
  // ── Accessoires — les pieds de handpan Atlas (fabricant italien).
  // 🤝 Partenariat d'affiliation validé le 20/08/2026 : avant cette date, la
  // marque était volontairement absente du site. Atlas envoie deux pieds de
  // démonstration pour les showcases.
  // 🚧 `url` pointe sur la fiche du site (et pas sur atlashandpan.com) parce
  // que le lien d'affiliation n'existe pas encore : c'est la page dédiée qui
  // porte les liens d'achat, via `atlasLink()` de src/data/atlas.ts. Quand le
  // code arrivera, il suffit de passer `ATLAS_PROMO_ACTIVE` à `true` dans
  // src/data/atlas.ts : la pastille « copier le code » apparaît ici toute seule
  // — et rien d'autre : ne pas remplacer `url` par un lien externe, la fiche
  // dédiée est ce qui explique la différence entre les deux modèles.
  { id: 'atlas', price: 0, image: '/images/prod-atlas-pro-1.webp', imgW: 1120, imgH: 1400, url: '/pieds-atlas', category: 'accessoires', active: true, mode: 'link', linkLabel: 'discover', tagKey: 'atlas', priceLabel: 'Atlas Pro 215 € · Atlas All 230 €', ...(ATLAS_PROMO_ACTIVE ? { discountCode: ATLAS_DISCOUNT_CODE } : {}), images: ['/images/prod-atlas-pro-1.webp', '/images/prod-atlas-all-1.webp', '/images/prod-atlas-pro-6.webp', '/images/prod-atlas-all-2.webp', '/images/prod-atlas-pro-3.webp'] },
  // Musique — albums & écoute en streaming (Spotify / plateformes)
  { id: 'phoenix-opus1', price: 0, image: '/images/prod-phoenix-opus1.jpg', imgW: 640, imgH: 640, url: 'https://open.spotify.com/album/3sxUqtH3uKf7pceIJ0j5l5', category: 'musique', active: true, mode: 'link', linkLabel: 'listen', tagKey: 'spotify' },
  { id: 'phoenix-opus2', price: 0, image: '/images/prod-phoenix-opus2.jpg', imgW: 640, imgH: 640, url: 'https://open.spotify.com/album/19JuVzKWNd5xUMquLvLSm1', category: 'musique', active: true, mode: 'link', linkLabel: 'listen', tagKey: 'spotify' },
  // Album de reprises. Visuel temporaire (pochette Spotify) → remplacer par
  // l'artwork officiel « COVER » (public/images/prod-cover.jpg) fourni par David.
  { id: 'cover', price: 0, image: '/images/prod-cover.jpg', imgW: 640, imgH: 640, url: 'https://open.spotify.com/artist/7zEAQJbalBFj8XNHrcqdbK', category: 'musique', active: true, mode: 'link', linkLabel: 'listen', tagKey: 'spotify' },
  // Cours & stages
  { id: 'cours-prives', price: 0, image: '/images/prod-cours-stages.jpg', imgW: 371, imgH: 371, url: 'https://www.helloasso.com/associations/resonances-productions/boutiques/cours-prive-et-stages-avec-david-lesage', category: 'formations', active: true, mode: 'link', linkLabel: 'buy', tagKey: 'helloasso', priceLabel: '50 €/h · 70 €/1h30' },
  // Mes outils du quotidien — recommandation perso (lien d'affiliation)
  { id: 'onesec', price: 0, image: '/images/prod-onesec-1.webp', imgW: 1464, imgH: 1731, url: 'https://web.one-sec.app/store?deal=david30', category: 'outils', active: true, mode: 'link', linkLabel: 'buy', tagKey: 'onesec', priceLabel: 'Gratuit · −30 % sur Premium avec mon lien', images: ['/images/prod-onesec-1.webp', '/images/prod-onesec-2.webp', '/images/prod-onesec-3.webp'] },
  // Gourde filtrante ÖKO — recommandation perso (lien d'affiliation), musicien en déplacement
  { id: 'oko', price: 0, image: '/images/prod-oko-1.png', imgW: 768, imgH: 768, url: 'https://okoeurope.com/products/gourde-filtrante?ref=DAVIDOKO', category: 'outils', active: true, mode: 'link', linkLabel: 'buy', tagKey: 'oko', priceLabel: 'dès 63 €', discountCode: 'DAVIDOKO', videoUrls: ['https://www.youtube.com/watch?v=yHKnJPz9TkQ'], images: ['/images/prod-oko-1.png', '/images/prod-oko-2.webp', '/images/prod-oko-3.webp', '/images/prod-oko-4.webp', '/images/prod-oko-5.webp', '/images/prod-oko-6.webp'] },
  // Structured — recommandation perso, pas encore de programme d'affiliation (David, 09/08/2026)
  { id: 'structured', price: 0, image: '/images/prod-structured-1.png', imgW: 1200, imgH: 630, url: 'https://structured.app/', category: 'outils', active: true, mode: 'link', linkLabel: 'discover', tagKey: 'structured' },
]
