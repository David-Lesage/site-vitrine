// ============================================================
// Catalogue boutique NEUTRE. Noms/descriptions/catégories traduits
// dans src/i18n/dict.ts (shop.products / shop.categories), indexés
// par `id` / `category`.
// ============================================================

import { modelCarousels } from './neotone'
// 🎟️ Le code de réduction Atlas est piloté par UN SEUL interrupteur, dans
// src/data/atlas.ts (`ATLAS_PROMO_ACTIVE`, actif depuis le 11/09/2026 : code
// DAVID-ATLAS, −10 % confirmé par Atlas). S'il repasse à `false`, la carte Atlas
// perd sa pastille « −10 % » ET son code d'un coup. Les prix publics viennent
// de `atlasPrices` : un seul relevé, la page et la carte ne peuvent pas diverger.
import { ATLAS_PROMO_ACTIVE, ATLAS_DISCOUNT_CODE, atlasPrices } from './atlas'

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
  tagKey?: 'helloasso' | 'streaming' | 'hisong' | 'yishama' | 'nowgroove' | 'ondemand' | 'maisongoni' | 'tambour' | 'spotify' | 'limited' | 'app' | 'muling' | 'onesec' | 'oko' | 'structured' | 'atlas' | 'atlasCode' | 'coeurdeson' | 'forbrain'
  // prix indicatif affiché tel quel (produits externes), ex. "299 €"
  priceLabel?: string
  // version traduite de `priceLabel` (ex. « dès 260 € » → « from €260 »). Sans
  // elle, l'anglais et l'espagnol affichent le libellé français tel quel.
  priceLabelI18n?: { en?: string; es?: string }
  // crédit photo affiché en petit sur l'image (« Photo : Cœur de Son ») quand
  // la photo vient du fabricant et pas de David.
  photoCredit?: string
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
  // Application Handpan Constellation Studio — produit phare digital
  { id: 'handpan-studio', price: 0, image: '/images/app-logique.webp', imgW: 1100, imgH: 1327, url: '/handpan-app', category: 'app', active: true, mode: 'link', linkLabel: 'discover', tagKey: 'app', priceLabel: 'Version gratuite ou Essentiel à 3,49 € TTC/mois (1 mois d’essai)', images: ['/images/app-logique.webp', '/images/app-atlas.webp', '/images/app-creation.webp', '/images/app-midi-mapping-2026.webp', '/images/constel-polygone.webp'] },
  { id: 'neotone-one', price: 1990, image: '/images/neotone1-1.jpg', imgW: 670, imgH: 653, url: '/neotone', category: 'handpans', sub: 'electronique', active: true, mode: 'quote', images: modelCarousels.one.map((s) => s.src) },
  { id: 'neotone-mutant', price: 3150, image: '/images/mutant-0.jpg', imgW: 670, imgH: 614, url: '/neotone', category: 'handpans', sub: 'electronique', active: true, mode: 'quote', images: modelCarousels.mutant.map((s) => s.src) },
  // ⚖️ Yishama vit dans la catégorie « handpans », sous-catégorie ACOUSTIQUE, à
  // égalité avec les Neotone (13/08/2026, demande de David : « faites remonter
  // Yishama, côte à côte aux Neotone »). Photos = visuels marketing Yishama,
  // PAS les instruments personnels de David.
  { id: 'yishama', price: 0, image: '/images/prod-yishama-5.jpg', imgW: 667, imgH: 1000, url: 'https://www.yishama.com/?wpam_id=40', category: 'handpans', sub: 'acoustique', active: true, mode: 'link', linkLabel: 'discover', tagKey: 'yishama', videoUrls: ['https://www.youtube.com/watch?v=Zp_zaqsRBCg'], images: ['/images/prod-yishama-5.jpg', '/images/prod-yishama.png', '/images/prod-yishama-2.jpg', '/images/prod-yishama-3.jpg', '/images/prod-yishama-4.jpg'] },
  { id: 'gonilele', price: 0, image: '/images/prod-gonilele-4.jpg', imgW: 1000, imgH: 1100, url: '/gonilele', category: 'instruments', active: true, mode: 'link', linkLabel: 'discover', tagKey: 'maisongoni', priceLabel: 'dès 440 €', images: ['/images/prod-gonilele-4.jpg', '/images/prod-gonilele-2.jpg', '/images/prod-gonilele-5.jpg', '/images/prod-gonilele.jpeg', '/images/prod-gonilele-3.jpg'] },
  // 🥁 Cœur de Son (Florel Viardot, Thaon-les-Vosges) — AUTRE artisan que L'Âme
  // du Tambour : toile imperméable + accordage à l'air, contre la peau chez
  // Julien. Les deux fiches cohabitent, sans comparaison qui dénigre l'une.
  // Prix publics relevés sur coeurdeson.com le 20/10/2026 (variantes Wix de la
  // page « tambour en toile à main ») : 40 cm 260 €, 45 cm 280 €, 50 cm 320 €,
  // 55 cm 330 €, 65 cm 380 € (+90 € avec l'anneau de cuivre) ; sur pied 65 cm 520 €.
  // 🎟️ Code DAVID-COEUR-DE-SON (−10 %) : forme donnée par David. Florel avait
  // écrit « David Coeur de son » dans son mail du 01/10 → forme exacte à confirmer.
  // 📸 Photo du site de Florel (accord écrit à obtenir), créditée sur la carte.
  //    Dès qu'il existe une photo du « Géode de feu » de David, la mettre en premier.
  // 🚫 Rien sur la commission, et les bienfaits annoncés par la marque
  //    (chakras, ancrage) ne sont pas repris comme des promesses.
  { id: 'coeur-de-son', price: 0, image: '/images/prod-coeur-de-son-1.webp', imgW: 900, imgH: 1200, url: 'https://www.coeurdeson.com/product-page/tambour-en-toile-%C3%A0-main', category: 'instruments', active: true, mode: 'link', linkLabel: 'discover', tagKey: 'coeurdeson', priceLabel: 'dès 260 €', priceLabelI18n: { en: 'from €260', es: 'desde 260 €' }, discountCode: 'DAVID-COEUR-DE-SON', photoCredit: 'Cœur de Son' },
  { id: 'tambour', price: 0, image: '/images/prod-tambour.jpg', imgW: 480, imgH: 360, url: 'https://www.facebook.com/profile.php?id=100075977844059', category: 'instruments', active: true, mode: 'link', linkLabel: 'discover', tagKey: 'tambour' },
  // ── Mes créations Now Groove (David Lesage) : méthode + calebasse signature + housse ──
  { id: 'now-groove', price: 0, image: '/images/prod-nowgroove.webp', imgW: 1000, imgH: 1442, url: 'https://www.helloasso.com/associations/resonances-productions/boutiques/formation-de-rythme-now-groove-david-lesage', category: 'creations', active: true, mode: 'link', linkLabel: 'buy', tagKey: 'helloasso' },
  { id: 'calebasse', price: 0, image: '/images/prod-calebasse.jpeg', imgW: 1000, imgH: 1000, url: 'https://www.helloasso.com/associations/resonances-productions/boutiques/formation-de-rythme-now-groove-david-lesage', category: 'creations', active: true, mode: 'link', linkLabel: 'buy', tagKey: 'nowgroove', priceLabel: '149 €', images: ['/images/prod-calebasse.jpeg', '/images/prod-calebasse-3.jpg', '/images/prod-calebasse-4.jpg'] },
  // Housse de calebasse Now Groove — vendue sur HelloAsso (stock affiché), faite main en petite série (David 24/10 : « rare et unique »)
  { id: 'housse', price: 0, image: '/images/prod-housse-1.jpg', imgW: 1000, imgH: 1000, url: '/housse-calebasse', category: 'creations', active: true, mode: 'link', linkLabel: 'discover', tagKey: 'limited', priceLabel: '99 €', images: ['/images/prod-housse-1.jpg', '/images/prod-housse-2.jpg', '/images/prod-housse-3.jpg', '/images/prod-housse-4.jpg'] },
  // Micros
  // 🎟️ Hisong : `discountCode` reprend EXACTEMENT le code contenu dans l'URL
  // d'affiliation (hisong.io/DAVID-LESAGE-SAVE-5). Il devrait s'appliquer seul
  // en passant par ce lien — le bouton « Copier le code » est là pour le cas où
  // il ne s'affiche pas au paiement (demande de David, 29/08/2026). Si l'URL
  // change un jour, changer les deux ensemble — elle vit désormais dans
  // src/i18n/hisong.ts (`hisongAffiliateUrl` / `hisongDiscountCode`).
  // 📄 20/10/2026 : la carte renvoie vers la page dédiée /micro-hisong (comme
  // Muling → /micro-muling). C'est la page qui porte le lien d'achat hisong.io.
  { id: 'micro-hisong', price: 0, image: '/images/prod-micro-hisong.webp', imgW: 1400, imgH: 1400, url: '/micro-hisong', category: 'micros', active: true, mode: 'link', linkLabel: 'discover', tagKey: 'hisong', priceLabel: '270,95 € · 360,95 € avec RX Plus', priceNoteKey: 'hisong', discountCode: 'DAVID-LESAGE-SAVE-5', images: ['/images/prod-micro-hisong.webp', '/images/prod-hisong-7.jpg', '/images/prod-hisong-3.jpg', '/images/prod-hisong-2.jpg', '/images/prod-hisong-4.jpg', '/images/prod-hisong-5.jpg', '/images/prod-hisong-6.jpg'], videoUrls: ['https://www.youtube.com/watch?v=B_7ZvlpHUsE', 'https://youtu.be/rx8ZZcL7Nog'] },
  { id: 'micro-muling', price: 0, image: '/images/prod-muling-2.jpg', imgW: 1200, imgH: 1200, url: '/micro-muling', category: 'micros', active: true, mode: 'link', linkLabel: 'discover', tagKey: 'muling', priceLabel: '245 € au lieu de 258 €', videoUrls: ['https://youtu.be/ENArz99dyTQ'], images: ['/images/prod-muling-2.jpg', '/images/prod-muling-1.jpg', '/images/prod-muling-3.jpg', '/images/prod-muling-4.jpg', '/images/prod-muling-5.jpg', '/images/prod-muling-6.jpg', '/images/prod-muling-7.jpg', '/images/prod-muling-8.jpg', '/images/prod-muling-9.jpg', '/images/prod-muling-10.jpg'] },
  // 🎧 Casque Forbrain (Sound For Life) — casque à conduction osseuse AVEC micro.
  // 21/10/2026 : passé de « outils » à « micros », à côté de Muling et Hisong —
  // demande de David : « intègre le casque Forbrain dans la rubrique micro de ma
  // boutique ». Prix, lien et code inchangés.
  // Prix relevé sur shop.soundforlife.com/fr le 20/10/2026 : 299 € (prix initial),
  // 269 € avec l'offre en cours (−10 %). Si l'offre se termine, repasser à « 299 € ».
  // 🎟️ Lien d'affiliation fourni par David ; le code 3A9907007 (−10 %) s'applique
  // seul via le lien, sinon il se saisit dans le panier. Rien sur la commission.
  // 🚫 Aucune promesse médicale ni thérapeutique (la marque en fait, pas nous).
  { id: 'forbrain', price: 0, image: '/images/prod-forbrain-1.webp', imgW: 1000, imgH: 1000, url: 'https://shop.soundforlife.com/?affiliate=3A9907007', category: 'micros', active: true, mode: 'link', linkLabel: 'discover', tagKey: 'forbrain', priceLabel: '269 € au lieu de 299 € (offre du moment)', priceLabelI18n: { en: '€269 instead of €299 (current offer)', es: '269 € en lugar de 299 € (oferta actual)' }, discountCode: '3A9907007' },
  // ── Accessoires — les pieds de handpan Atlas (fabricant italien).
  // 🤝 Partenariat d'affiliation validé le 20/08/2026 : avant cette date, la
  // marque était volontairement absente du site. Atlas envoie deux pieds de
  // démonstration pour les showcases.
  // 🚧 `url` pointe sur la fiche du site (et pas sur atlashandpan.com) : c'est la
  // page dédiée qui porte les boutons « Acheter chez Atlas », dans la langue de
  // lecture, via `atlasBuyUrl()` de src/data/atlas.ts. Ne pas remplacer `url`
  // par un lien externe : la fiche dédiée explique la différence entre les deux
  // modèles ET copie le code avant d'ouvrir Atlas.
  // 🎟️ 20/10/2026 : pastille « −10 % avec mon code » (`atlasCode`) + code à
  // copier, tant que `ATLAS_PROMO_ACTIVE` est vrai. PRIX PUBLICS seulement, pas
  // de prix barré : aucun prix remisé n'est confirmé (voir src/data/atlas.ts).
  // 📸 ORDRE DU CARROUSEL (29/08/2026, demande de David) : les DEUX photos les plus
  // informatives d'abord — le Pro déployé/replié, puis le All à 96 cm.
  // ⚠️ CE SONT LEURS VERSIONS CARRÉES, ET C'EST VOLONTAIRE. `.carousel` est en
  //    `aspect-ratio: 1/1` + `object-fit: cover` (src/styles/global.css) : posé tel
  //    quel, `prod-atlas-pro-8-fond-blanc.webp` (720×1170) perdrait 38 % de sa
  //    hauteur et `prod-atlas-all-9.webp` (916×1400) 34,6 % — c'est-à-dire, dans les
  //    deux cas, LE HAUT ET LE BAS DU PIED, donc exactement ce que la photo
  //    démontre. `prod-atlas-pro-8-carre.webp` existait déjà pour cette raison
  //    (voir le long commentaire de src/data/atlas.ts) ;
  //    `prod-atlas-all-9-carre.webp` a été fabriqué de la même façon le 29/08 :
  //    marges BLANCHES à gauche/droite sur un carré 1400×1400, coins vérifiés à
  //    255,255,255. AUCUN pixel du sujet n'est perdu, aucun recadrage.
  //    Si l'un des deux originaux change, REGÉNÉRER son carré.
  // ℹ️ `image` / `imgW` / `imgH` NE suivent PAS : dès que `images.length > 1`,
  //    ShopCard rend le carrousel et n'utilise plus `image` — celle-ci ne sert
  //    plus qu'au JSON-LD ItemList de la page. La grille n'est donc pas touchée.
  { id: 'atlas', price: 0, image: '/images/prod-atlas-pro-1.webp', imgW: 1120, imgH: 1400, url: '/pieds-atlas', category: 'accessoires', active: true, mode: 'link', linkLabel: 'discover', tagKey: ATLAS_PROMO_ACTIVE ? 'atlasCode' : 'atlas', priceLabel: `Atlas Pro ${atlasPrices.pro} € · Atlas All ${atlasPrices.all} €`, ...(ATLAS_PROMO_ACTIVE ? { discountCode: ATLAS_DISCOUNT_CODE } : {}), images: ['/images/prod-atlas-pro-8-carre.webp', '/images/prod-atlas-all-9-carre.webp', '/images/prod-atlas-pro-1.webp', '/images/prod-atlas-all-1.webp', '/images/prod-atlas-pro-6.webp', '/images/prod-atlas-all-2.webp', '/images/prod-atlas-pro-3.webp'] },
  // Musique — albums & écoute en streaming (Spotify / plateformes)
  { id: 'phoenix-opus1', price: 0, image: '/images/prod-phoenix-opus1.jpg', imgW: 640, imgH: 640, url: 'https://open.spotify.com/album/3sxUqtH3uKf7pceIJ0j5l5', category: 'musique', active: true, mode: 'link', linkLabel: 'listen', tagKey: 'spotify' },
  { id: 'phoenix-opus2', price: 0, image: '/images/prod-phoenix-opus2.jpg', imgW: 640, imgH: 640, url: 'https://open.spotify.com/album/19JuVzKWNd5xUMquLvLSm1', category: 'musique', active: true, mode: 'link', linkLabel: 'listen', tagKey: 'spotify' },
  // Album de reprises. Visuel temporaire (pochette Spotify) → remplacer par
  // l'artwork officiel « COVER » (public/images/prod-cover.jpg) fourni par David.
  { id: 'cover', price: 0, image: '/images/prod-cover.jpg', imgW: 640, imgH: 640, url: 'https://open.spotify.com/artist/7zEAQJbalBFj8XNHrcqdbK', category: 'musique', active: true, mode: 'link', linkLabel: 'listen', tagKey: 'spotify' },
  // Cours & stages — 💶 prix libre à partir d'un minimum (20/10/2026) : les
  // jetons `{lesson60}` `{lesson90}` sont remplis avec les tarifs HelloAsso
  // (src/lib/sessions.ts → fillCoursePrices), repli sur site.ts.
  { id: 'cours-prives', price: 0, image: '/images/prod-cours-stages.jpg', imgW: 371, imgH: 371, url: 'https://www.helloasso.com/associations/resonances-productions/boutiques/cours-prive-et-stages-avec-david-lesage', category: 'formations', active: true, mode: 'link', linkLabel: 'buy', tagKey: 'helloasso', priceLabel: 'dès {lesson60} €/h · dès {lesson90} €/1h30', priceLabelI18n: { en: 'from €{lesson60}/h · from €{lesson90}/1h30', es: 'desde {lesson60} €/h · desde {lesson90} €/1h30' } },
  // Mes outils du quotidien — recommandation perso (lien d'affiliation)
  { id: 'onesec', price: 0, image: '/images/prod-onesec-1.webp', imgW: 1464, imgH: 1731, url: 'https://web.one-sec.app/store?deal=david30', category: 'outils', active: true, mode: 'link', linkLabel: 'buy', tagKey: 'onesec', priceLabel: 'Gratuit · −30 % sur Premium avec mon lien', images: ['/images/prod-onesec-1.webp', '/images/prod-onesec-2.webp', '/images/prod-onesec-3.webp'] },
  // Gourde filtrante ÖKO — recommandation perso (lien d'affiliation), musicien en déplacement
  { id: 'oko', price: 0, image: '/images/prod-oko-1.png', imgW: 768, imgH: 768, url: 'https://okoeurope.com/products/gourde-filtrante?ref=DAVIDOKO', category: 'outils', active: true, mode: 'link', linkLabel: 'buy', tagKey: 'oko', priceLabel: 'dès 63 €', discountCode: 'DAVIDOKO', videoUrls: ['https://www.youtube.com/watch?v=yHKnJPz9TkQ'], images: ['/images/prod-oko-1.png', '/images/prod-oko-2.webp', '/images/prod-oko-3.webp', '/images/prod-oko-4.webp', '/images/prod-oko-5.webp', '/images/prod-oko-6.webp'] },
  // Structured — recommandation perso, pas encore de programme d'affiliation (David, 09/08/2026)
  { id: 'structured', price: 0, image: '/images/prod-structured-1.png', imgW: 1200, imgH: 630, url: 'https://structured.app/', category: 'outils', active: true, mode: 'link', linkLabel: 'discover', tagKey: 'structured' },
]
