// ============================================================
// PHOTOS DE LA PAGE SHOWROOM (/showroom et /en/showroom)
//
// 👉 POUR AJOUTER UNE PHOTO AU CARROUSEL « En images » :
//    1. Prépare le fichier en **WebP**, largeur max ~1200 px (portrait) ou
//       ~1800 px (paysage), et pose-le dans `public/images/`.
//       Convention de nom : minuscules, tirets, préfixe `showroom-`
//       (ex. `showroom-atelier-groupe.webp`).
//    2. Ajoute une ligne dans `showroomGallery` ci-dessous : `id`, `src`,
//       et les dimensions RÉELLES du fichier (`w` / `h` — indispensables,
//       elles réservent la place et évitent que la page saute au chargement).
//    3. Écris le texte alternatif dans les DEUX dictionnaires, sous la même
//       clé que `id` : `showroom.galleryAlt` de `src/i18n/dict.ts` (FR) et
//       de `src/i18n/en.ts` (EN). Décris ce qu'on VOIT sur la photo.
//       ⓘ Si tu oublies cette 3ᵉ étape, la page ne casse pas : elle retombe
//       sur un texte alternatif générique (`galleryAltFallback`). Mais c'est
//       moins bon pour l'accessibilité et le référencement.
//
// 🚨 AVANT DE PUBLIER UNE PHOTO, DEUX CONTRÔLES (leçons du 19/08/2026) :
//    · aucun écran / objet ne doit laisser lire le nom de l'app
//      (« Handpan Studio », « Neotone Studio ») — zoome pour vérifier ;
//    · les visages du public doivent être floutés, comme sur les photos
//      déjà en ligne. David floute à la source : une photo nette serait
//      un oubli, pas un choix.
//
// ⓘ Les VIDÉOS ne passent pas par ce carrousel (il n'affiche que des <img>).
//    Pour une vidéo, utiliser le composant `VideoGrid` / `VideoModal`,
//    comme sur la page Gonilélé.
// ============================================================

export interface ShowroomPhoto {
  /** Clé du texte alternatif dans `showroom.galleryAlt` (dict.ts + en.ts). */
  id: string
  src: string
  /** Dimensions réelles du fichier, en pixels. */
  w: number
  h: number
}

// 🗑️ DIAPOSITIVE RETIRÉE le 20/08/2026 (David) — `showroom-demo-neotone-1.webp`.
//    C'était le MÊME instant que `showroom-demo-neotone-2.webp` (même démo,
//    même geste, cadrage un peu plus serré), en plus terne. « Dans le carrousel
//    il y a deux fois la même photo, enlève la 1/6, elle est plus terne. »
//    ⚠️ Le FICHIER reste dans public/images/ et son texte alternatif reste dans
//    les deux dictionnaires (`galleryAlt.demoNeotone1`) : remettre la ligne
//    ci-dessous suffit à la réafficher. Le compteur du carrousel se recalcule
//    tout seul (« 1 / 5 »), il n'y a rien d'autre à toucher.
//    { id: 'demoNeotone1', src: '/images/showroom-demo-neotone-1.webp', w: 1800, h: 831 },
export const showroomGallery: ShowroomPhoto[] = [
  { id: 'demoNeotone2', src: '/images/showroom-demo-neotone-2.webp', w: 1800, h: 830 },
  { id: 'gonileleMicro', src: '/images/showroom-gonilele-micro-hisong.webp', w: 1000, h: 1778 },
  { id: 'yishamaMicros', src: '/images/showroom-yishama-micros-hisong.webp', w: 1000, h: 1778 },
  { id: 'tabletteAccords', src: '/images/showroom-tablette-accords.webp', w: 960, h: 1706 },
  { id: 'handpanTablette', src: '/images/showroom-handpan-tablette.webp', w: 1100, h: 1955 },
]

// ── Photos placées EN DUR dans la page (hors carrousel), les plus fortes.
// Leur texte alternatif vit dans `showroom.photoAlt` (dict.ts + en.ts).
export const showroomPhotos = {
  /** Vue d'ensemble d'un showcase — cadrage LARGE (celui en ligne).
   *  Variante resserrée disponible : `/images/showroom-vue-ensemble-resserre.webp`
   *  (2000×826) — le haut de la scène seulement. À échanger ici si David
   *  la préfère. Les visages du public sont floutés à la source sur les deux. */
  vueEnsemble: { src: '/images/showroom-vue-ensemble.webp', w: 2000, h: 903 },
  instruments: { src: '/images/showroom-instruments.webp', w: 1800, h: 1012 },
  presentation: { src: '/images/showroom-david-presentation.webp', w: 1800, h: 1012 },
  gonilele: { src: '/images/showroom-david-gonilele.webp', w: 1100, h: 1956 },
} as const

// ============================================================
// 🎠 CARROUSEL « LE RESTE DE CE QUE JE JOUE EST LÀ AUSSI »
//    (/showroom · section `also`) — ajouté le 20/08/2026.
//
// David : « il faudrait créer un carrousel où on voit des images de calebasse /
// micro Hisong / micro Muling / Gonilélé, tu peux aller chercher des images
// spécifiques sur les pages du site qui leur sont dédiées. »
//
// ♻️ TOUS CES FICHIERS SONT RÉUTILISÉS TELS QUELS — aucun nouveau fichier,
//    aucun ré-encodage. Ils servent déjà sur /gonilele, /micro-muling et la
//    boutique (src/data/gonilele.ts, src/data/muling.ts, src/data/shop.ts).
//
// 🎯 POURQUOI CES CINQ-LÀ, ET PAS LES VINGT AUTRES (une ou deux par instrument) :
//    · `showroom-david-gonilele` — la SEULE prise au showroom : David tient le
//      Gonilélé et montre le micro. Elle était une figure isolée au-dessus des
//      cartes ; elle ouvre maintenant le carrousel, en plus grand.
//    · `prod-gonilele-4`   — l'instrument ENTIER, lisible d'un coup d'œil
//      (c'est déjà la couverture boutique). Les autres sont des détails.
//    · `prod-calebasse`    — le kit complet : calebasse, tapis de peau, shakers.
//      (`prod-calebasse-2` en est un doublon exact — ne pas ajouter les deux.)
//    · `prod-hisong-7`     — photo de David : handpan + micro sur socle +
//      tablette de réglage. Les autres visuels Hisong sont des visuels
//      publicitaires de la marque, avec du texte anglais incrusté : inutilisables
//      sur une page bilingue.
//    · `prod-muling-2`     — on voit CE QU'EST le set : les capsules sur la
//      caisse et le préampli au bout du câble. C'est le seul qui l'explique.
//
// 👉 POUR EN AJOUTER UNE : une ligne ici (dimensions RÉELLES obligatoires) +
//    la clé de même `id` dans `showroom.alsoAlt` de dict.ts ET de en.ts.
// ============================================================
export const showroomAlsoGallery: ShowroomPhoto[] = [
  { id: 'gonileleShowroom', src: '/images/showroom-david-gonilele.webp', w: 1100, h: 1956 },
  { id: 'gonileleProduit', src: '/images/prod-gonilele-4.jpg', w: 820, h: 1100 },
  { id: 'calebasse', src: '/images/prod-calebasse.jpeg', w: 1000, h: 1000 },
  { id: 'hisong', src: '/images/prod-hisong-7.jpg', w: 731, h: 1300 },
  { id: 'muling', src: '/images/prod-muling-2.jpg', w: 1200, h: 675 },
]
