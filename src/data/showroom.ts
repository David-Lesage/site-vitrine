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

export const showroomGallery: ShowroomPhoto[] = [
  { id: 'demoNeotone1', src: '/images/showroom-demo-neotone-1.webp', w: 1800, h: 831 },
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
