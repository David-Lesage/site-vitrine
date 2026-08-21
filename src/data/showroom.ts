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

// ════════════════════════════════════════════════════════════════════════════
// 🇫🇷 REVENDICATION « LE SEUL LIEU EN FRANCE » — ÉCRITE, PLACÉE, ÉTEINTE
//    (21/08/2026 — même dispositif que `ATLAS_PROMO_ACTIVE`, src/data/atlas.ts)
//
// D'OÙ ÇA VIENT. La phrase « le seul lieu en France où ces instruments
// s'essaient et s'achètent en direct » a été RETIRÉE du site de l'association
// Résonances Productions, au motif qu'elle serait reprise ici. Vérification
// faite : elle n'existe nulle part dans ce dépôt. Elle est donc tombée entre
// les deux sites. David l'aurait validée mot pour mot le 16/08/2026.
//
// 🚨 POURQUOI ELLE N'EST PAS PUBLIÉE AUJOURD'HUI. C'est une revendication
//    d'EXCLUSIVITÉ (« le seul en France »). Si elle est inexacte, ce n'est pas
//    une maladresse de rédaction : c'est de la publicité trompeuse. Et elle
//    est INVÉRIFIABLE depuis ce dépôt — aucune source du site ne l'établit.
//    Elle attend donc une confirmation explicite de David.
//
// ⚠️ À LIRE AVANT D'ACTIVER — LA PAGE PORTE DÉJÀ UNE REVENDICATION PLUS FORTE.
//    `showroom.exclBadge` dit « ★ Première mondiale » et `showroom.exclText`
//    dit « Le Nid est le PREMIER LIEU AU MONDE où ces instruments sont en
//    vente en direct, sur place ». Publier les deux, c'est dire deux fois la
//    même chose à deux échelles différentes — et la plus petite (France)
//    affaiblit mécaniquement la plus grande (monde) : un lecteur qui lit les
//    deux se demande laquelle est vraie.
//    👉 RECOMMANDATION : n'en garder qu'UNE. Soit la mondiale (déjà en ligne),
//       soit celle-ci — auquel cas c'est `exclText` qu'il faut corriger, pas
//       seulement cet interrupteur qu'il faut allumer.
//    👉 Ce que celle-ci apporte de neuf, et que la mondiale ne dit pas :
//       « s'ESSAIENT » — l'essai, qui est le sujet même de cette page.
//
// ✅ POUR L'ACTIVER, LE JOUR OÙ DAVID CONFIRME :
//      1. passer `FRANCE_EXCLUSIVITY_ACTIVE` à `true` ;
//      2. relire `showroom.exclText` (dict.ts + en.ts) pour choisir entre
//         « premier au monde » et « seul en France » — ne pas laisser les deux ;
//      3. rebuild + redéploiement (rien d'autre à toucher).
//    La phrase elle-même vit dans les deux dictionnaires, clé
//    `showroom.franceClaim` — traduite, prête, jamais rendue tant que
//    l'interrupteur est à `false`.
// ════════════════════════════════════════════════════════════════════════════
export const FRANCE_EXCLUSIVITY_ACTIVE = false

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
//
// ➕ 20/08/2026 — DEUX PHOTOS AJOUTÉES depuis `~/Desktop/photos-showroom`.
//    Le dossier contenait 19 fichiers ; la comparaison a été faite PAR CONTENU
//    (empreinte perceptuelle), pas par nom — les noms changent à l'intégration.
//    · 9 y étaient déjà sous un nom `showroom-*` ;
//    · 3 y étaient déjà sous un nom `prod-*` (prod-muling-3, prod-muling-2 /
//      muling-capsules-handpan, prod-hisong-7) — les deux dernières sont même
//      DÉJÀ affichées sur cette page, dans le carrousel `showroomAlsoGallery` ;
//    · 5 étaient réellement nouvelles, 2 seulement ont été retenues ici
//      (le détail de ce qui a été écarté est dans le rapport à David).
export const showroomGallery: ShowroomPhoto[] = [
  { id: 'demoNeotone2', src: '/images/showroom-demo-neotone-2.webp', w: 1800, h: 830 },
  // Le coin salon : c'est la photo qui dit « on s'assoit, l'instrument est à
  // portée de main » — elle vaut tous les paragraphes sur l'ambiance.
  { id: 'salonInstruments', src: '/images/showroom-salon-instruments.webp', w: 1800, h: 1012 },
  { id: 'gonileleMicro', src: '/images/showroom-gonilele-micro-hisong.webp', w: 1000, h: 1778 },
  { id: 'yishamaMicros', src: '/images/showroom-yishama-micros-hisong.webp', w: 1000, h: 1778 },
  // La sono : elle illustre littéralement « sono Bose professionnelle en
  // condition concert » de `programBonus` — jusqu'ici la phrase n'avait
  // aucune image pour la soutenir.
  { id: 'sonoBose', src: '/images/showroom-sono-bose.webp', w: 1800, h: 1012 },
  { id: 'tabletteAccords', src: '/images/showroom-tablette-accords.webp', w: 960, h: 1706 },
  { id: 'handpanTablette', src: '/images/showroom-handpan-tablette.webp', w: 1100, h: 1955 },
]

// ── Photos placées EN DUR dans la page (hors carrousel), les plus fortes.
// Leur texte alternatif vit dans `showroom.photoAlt` (dict.ts + en.ts).
export const showroomPhotos = {
  /** 🚧 IMAGE DE REPLI — 21/08/2026. C'est une VIGNETTE VIDÉO YouTube :
   *  le titre « David Lesage Showroom » est incrusté en dur dans le pixel.
   *  Impossible à retirer sans détruire l'image ; sur cette page il se lit
   *  comme une bannière, David l'accepte en attendant mieux.
   *  ✂️ CE QUI A ÉTÉ FAIT : l'original fait 1280×712 et portait en plus une
   *  INCRUSTATION DE VISAGE (facecam) dans le coin inférieur droit — elle
   *  trahissait la capture vidéo. Les 64 px de droite ont été rognés
   *  (1280 → 1216) : la facecam disparaît, David et la pièce sont intacts.
   *  Original conservé hors dépôt dans `_medias-originaux-avec-titre/`.
   *  👉 QUAND DAVID FOURNIRA UNE VRAIE PHOTO : écraser le fichier
   *     `public/images/showroom-accueil-bras-ouverts.webp`, corriger `w`/`h`
   *     ci-dessous, et retirer la mention du titre incrusté dans
   *     `showroom.photoAlt.accueil` (dict.ts + en.ts). Rien d'autre à toucher. */
  accueil: { src: '/images/showroom-accueil-bras-ouverts.webp', w: 1216, h: 712 },
  /** Vue d'ensemble d'un showcase — cadrage LARGE (celui en ligne).
   *  Variante resserrée disponible : `/images/showroom-vue-ensemble-resserre.webp`
   *  (2000×826) — le haut de la scène seulement. À échanger ici si David
   *  la préfère. Les visages du public sont floutés à la source sur les deux. */
  vueEnsemble: { src: '/images/showroom-vue-ensemble.webp', w: 2000, h: 903 },
  /** 20/08/2026 — la MÊME pièce, vide et en plein jour. Volontairement affichée
   *  à côté de `vueEnsemble` : l'une prouve que l'événement existe, l'autre
   *  répond à « je débarque où, exactement ? ». Source :
   *  `~/Desktop/photos-showroom/plan large sur la grande piece du showroom.jpg`. */
  grandePiece: { src: '/images/showroom-grande-piece.webp', w: 1800, h: 1012 },
  instruments: { src: '/images/showroom-instruments.webp', w: 1800, h: 1012 },
  presentation: { src: '/images/showroom-david-presentation.webp', w: 1800, h: 1012 },
  gonilele: { src: '/images/showroom-david-gonilele.webp', w: 1100, h: 1956 },
} as const

// ============================================================
// 🎠 CARROUSEL D'OUVERTURE — TOUT EN HAUT DE /showroom (21/08/2026)
//
// David : « il faudrait simplement intégrer un gros carrousel tout en haut qui
// fait défiler les photos du lieu. »
//
// 🚨 CE N'EST PAS UNE GALERIE DÉCORATIVE, C'EST UNE SÉQUENCE. Chaque photo
//    répond à UNE question muette, dans l'ordre où elle se pose :
//      1. `accueil`      → « qui est-ce, et où est-ce que je vais ? »
//                          David bras ouverts, debout au milieu de la pièce.
//      2. `vueEnsemble`  → « est-ce que je vais m'y retrouver tout seul ? »
//                          le cercle, du monde assis par terre, David au centre.
//      3. `presentation` → « qu'est-ce que je vais y faire ? »
//                          le temps de présentation, tous les instruments derrière.
//      4. `grandePiece`  → « c'est grand comment ? »
//                          la même pièce, vide et en plein jour.
//
// ⛔ NE PAS Y AJOUTER DE PHOTO SANS RAISON NARRATIVE. Une 5ᵉ image « parce
//    qu'elle est belle » casse la séquence et repousse l'agenda (voir plus bas).
//    Le reste des photos a déjà sa place : carrousel « En images » (section 6).
//
// 📏 CONTRAINTE DE HAUTEUR — la plus importante de la page. L'agenda a été
//    remonté à ~2 500 px du haut sur mobile le 20/08/2026 ; ce carrousel ne
//    doit pas défaire ce gain. D'où un cadre 16/10 sur mobile (≈ 234 px de
//    haut à 375 px de large) et 16/9 au bureau, et non une bannière plein
//    écran. Les réglages sont dans `global.css`, classe `.hero-carousel`.
//
// 🖼️ Les textes alternatifs sont ceux, DÉJÀ ÉCRITS, de `showroom.photoAlt`
//    (dict.ts + en.ts) : la clé `id` ci-dessous EST la clé du dictionnaire.
//    Aucun alt n'est réécrit ici, pour qu'ils ne divergent pas d'une section
//    à l'autre de la même page.
// ============================================================
export const showroomHeroGallery: ShowroomPhoto[] = [
  { id: 'accueil', src: showroomPhotos.accueil.src, w: showroomPhotos.accueil.w, h: showroomPhotos.accueil.h },
  { id: 'vueEnsemble', src: showroomPhotos.vueEnsemble.src, w: showroomPhotos.vueEnsemble.w, h: showroomPhotos.vueEnsemble.h },
  { id: 'presentation', src: showroomPhotos.presentation.src, w: showroomPhotos.presentation.w, h: showroomPhotos.presentation.h },
  { id: 'grandePiece', src: showroomPhotos.grandePiece.src, w: showroomPhotos.grandePiece.w, h: showroomPhotos.grandePiece.h },
]

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
