// ============================================================
// Données NEUTRES des pieds (trépieds) de handpan ATLAS.
// Toute la prose est traduite dans src/i18n (clé `atlas`).
//
// 🤝 PARTENARIAT : affiliation validée avec Atlas (fabricant italien) le
// 20/08/2026. Atlas envoie DEUX pieds de démonstration à David pour ses
// rencontres. Avant cette date, la marque était volontairement absente du
// site (partenariat non signé) — elle peut désormais apparaître.
//
// ✅ 26/08/2026 — LES PIEDS SONT ARRIVÉS (colis ATLAS SRLS livré à 10h37).
// ✅ 01/09/2026 — RÈGLE ÉDITORIALE LEVÉE. De sa rédaction au 31/08/2026, toute
//    la page /pieds-atlas a été écrite sous une règle ferme : ne JAMAIS laisser
//    entendre que David avait utilisé les pieds Atlas, parce qu'il ne les avait
//    pas. C'est ce qui explique la prudence du texte (« Atlas annonce »,
//    futurs, conditionnels) — on garde la trace, ça éclaire chaque tournure.
//    Ses mots le 01/09/2026 : « J'ai essayé les pieds Atlas oui, et j'ai fait
//    une vidéo de démo aujourd'hui. » (vidéo `atlasDemoVideoId`, en tête de page).
//
// 🚨 CE QUE LA LEVÉE N'AUTORISE PAS — et c'est tout le sujet : David a dit
//    qu'il les avait ESSAYÉS et FILMÉS, il n'a PAS raconté ce qu'il a ressenti.
//    N'écrire à sa place ni « ils sont stables », ni « le montage prend deux
//    minutes », ni « le bois vieillit bien », ni aucun détail sensoriel, ni un
//    verdict entre les deux modèles. Retirer une fausse limite n'autorise pas à
//    ajouter une promesse. Les emplacements qui attendent SES mots sont marqués
//    « 🅓 TÉMOIGNAGE DE DAVID — EN ATTENTE DE SES MOTS » dans AtlasPage.astro.
//
// 🚨 SOURCE DE VÉRITÉ = les fiches officielles Atlas, relevées le 20/08/2026 :
//    · https://atlashandpan.com/en/products/atlas-pro
//    · https://atlashandpan.com/en/products/atlas-all
//    · https://atlashandpan.com/en/pages/about-atlas  (« Made in Italy »)
//    N'ÉCRIRE ICI QUE CE QUI EST ÉCRIT LÀ-BAS. Rien n'est déduit, rien n'est
//    arrondi. Ce qui manque est listé plus bas sous « 🚧 NON RENSEIGNÉ ».
// ============================================================

// ── 🔗 LIENS D'ACHAT — UN SEUL ENDROIT, SELON LA LANGUE DE LECTURE ─────────
//
// 🗑️ 21/10/2026 — L'ANCIEN INTERRUPTEUR `ATLAS_AFFILIATE_URL` A ÉTÉ SUPPRIMÉ.
//    Il attendait un « lien de suivi » qui n'existe pas : chez Atlas, le suivi
//    passe par le CODE `DAVID-ATLAS` (actif depuis le 11/09/2026, vérifié par
//    David dans le panier le 21/10/2026). Il ne servait plus qu'à afficher la
//    note « Mon lien de suivi n'est pas encore en place… », que David a fait
//    retirer : « c'est faux, le code fonctionne ». N'INVENTER AUCUN lien
//    d'affiliation : il n'y en a pas.
//
// 🌍 LANGUE (David, 21/10/2026) : fr → /fr ; en → /en ; de → /de ; it → racine
//    (le site d'Atlas est en italien à la racine) ; es → /en, car David n'a pas
//    donné de version espagnole (et `/es` répond 404 chez Atlas, vérifié par curl
//    le 21/10/2026). Seuls fr/en/es sont routés sur notre site aujourd'hui ;
//    de/it sont prêts pour le jour où ils le seront.
// 🛒 PAR MODÈLE : les fiches produit existent dans chaque langue
//    (`/fr/products/atlas-pro`, `/fr/products/atlas-all`, `/fr/products/atlas-body`
//    → 200, `lang="fr"`, vérifié par curl le 21/10/2026). Les boutons d'un modèle
//    mènent donc à SA fiche dans la bonne langue ; les autres à l'accueil.
const ATLAS_ROOT_BY_LANG: Record<string, string> = {
  fr: 'https://atlashandpan.com/fr',
  en: 'https://atlashandpan.com/en',
  de: 'https://atlashandpan.com/de',
  it: 'https://atlashandpan.com/',
  es: 'https://atlashandpan.com/en',
}
export type AtlasProduct = 'atlas-pro' | 'atlas-all' | 'atlas-body'

/** Lien « Acheter chez Atlas » pour une langue de lecture (et un modèle, si précisé). */
export const atlasBuyUrl = (lang: string, product?: AtlasProduct): string => {
  const root = ATLAS_ROOT_BY_LANG[lang] ?? ATLAS_ROOT_BY_LANG.en
  return product ? `${root.replace(/\/$/, '')}/products/${product}` : root
}

// ── 🎟️ CODE DE RÉDUCTION — ACTIF CHEZ ATLAS DEPUIS LE 11/09/2026 ───────────
//
// ✅ SOURCE : mail d'Atlas (info@atlashandpan.com) à David, 11/09/2026 :
//    « We've set up your discount code DAVID-ATLAS and it is already active
//      […] It offers a 10% discount to your customers on all Atlas products,
//      including the Atlas Body. »
//    → code `DAVID-ATLAS`, −10 %, TOUS les produits Atlas, Atlas Body compris.
//    Le pourcentage est donc écrit noir sur blanc par Atlas : la page et la
//    boutique peuvent l'annoncer (`ATLAS_DISCOUNT_PCT`).
//
// 📣 20/10/2026 — DEMANDE DE DAVID : « mon code promo […] n'est pas assez
//    visible ; il faut que la personne entre mon coupon au moment du paiement
//    sur le site du fabricant ». Le code est donc affiché en haut de
//    /pieds-atlas (bloc près des prix), à côté de CHAQUE lien d'achat, en bas
//    de page, et sur la carte Atlas de la boutique.
//
// ✅ PRIX AVEC LE CODE — TRANCHÉ LE 21/10/2026. David a vérifié dans le panier
//    Atlas, code appliqué : « le coupon de réduction effectue une économie de
//    25 € sur le pied Pro, −27 € sur le pied All ». C'est exactement
//    prix public × (1 − 10 %) : 250 → 225 €, 270 → 243 €, 165 → 148,50 €.
//    (Les « 215/230 € » cités le 20/10 étaient les prix PROMOTIONNELS du
//    20/08/2026, aujourd'hui terminés.) Les montants sont CALCULÉS par
//    `atlasWithCode()` depuis `atlasPrices` : ils suivent les prix tout seuls.
//    🚫 Les données structurées Offer gardent le PRIX PUBLIC, rien d'autre.
//
// 🔙 HISTORIQUE (gardé pour comprendre les tournures) : au 20/08/2026 le code
//    n'existait pas encore ; l'interrupteur `ATLAS_PROMO_ACTIVE` le masquait
//    pour ne pas faire saisir un code refusé au paiement. Le nom `DAVID-ATLAS`
//    (plutôt que `LESAGE-10`) avait été choisi par David parce qu'il « ne fait
//    aucune promesse ». L'interrupteur reste : le repasser à `false` masque le
//    code PARTOUT (page, boutique, llms.txt) si Atlas le désactive un jour.
//
// ⚠️ La commission d'affiliation n'est jamais chiffrée sur le site : seule la
//    mention générique « je touche une commission » (`promoDisclosure`) existe.
export const ATLAS_PROMO_ACTIVE = true
export const ATLAS_DISCOUNT_CODE = 'DAVID-ATLAS'
/** −10 % — chiffre écrit par Atlas dans le mail du 11/09/2026. */
export const ATLAS_DISCOUNT_PCT = 10

/**
 * Prix avec le code et économie, au centime près, depuis un prix public.
 * Vérifié le 21/10/2026 contre le panier Atlas : Pro 250 → 225 (−25),
 * All 270 → 243 (−27), Body 165 → 148,50 (−16,50).
 */
export const atlasWithCode = (publicPrice: number): { now: number; save: number } => {
  const now = Math.round(publicPrice * (100 - ATLAS_DISCOUNT_PCT)) / 100
  return { now, save: Math.round((publicPrice - now) * 100) / 100 }
}

/** Site d'Atlas « neutre » (vendeur des données structurées Offer). */
export const atlasSite = 'https://atlashandpan.com/en'

// ── 🎬 VIDÉO DE DÉMONSTRATION PAR DAVID — EN LIGNE DEPUIS LE 01/09/2026 ────
//
// ✅ RENSEIGNÉE. Le cadre « À venir » qui tenait la place n'existe plus : il a
//    été retiré de la page le 01/09/2026 en même temps que la vidéo arrivait.
//
// SOURCE VÉRIFIÉE (oEmbed YouTube, 01/09/2026) :
//   · titre officiel : « Pourquoi jouer du #handpan Debout ? Je prend mon pied
//     avec #Atlas & @yishama_official »
//   · chaîne : « David Lesage » — c'est SA vidéo, aucune question de droits
//     (contrairement à `atlasTheVoiceVideoId` juste en dessous, publiée par TF1).
//   · format 16/9 classique, ce n'est pas un Short vertical.
//
// 📍 OÙ ELLE S'AFFICHE : dans une bande à elle, JUSTE APRÈS LE HERO, avant la
//    section `#debout` — demande de David (« mettre la vidéo en début de page »).
//    Le titre de la vidéo pose exactement la question que `#debout` développe.
//    Voir le bloc `<Section id="demo">` dans AtlasPage.astro.
//
// ⚠️ SI ON REPASSE CETTE CONSTANTE À `null` : la bande `#demo` disparaît en
//    entier (le rendu est conditionné par `atlasDemoVideoId`). Il n'y a plus de
//    cadre de remplacement — c'était voulu, un cadre « À venir » n'a de sens
//    qu'avant la publication. Les clés i18n `videoSoon` (FR/EN/ES) sont
//    conservées dans les dictionnaires au cas où.
export const atlasDemoVideoId: string | null = 's1lFN3PDEnA'

// ── 🎤 LA VIDÉO « THE VOICE » — TROUVÉE ET RENSEIGNÉE LE 20/08/2026 ────────
//
// David cite son audition à l'aveugle de The Voice comme la preuve visuelle de
// ce qu'il raconte (2 handpans + kick au pied + N'Goni + calebasse + chant).
// Cherchée en vain sur le site plus tôt dans la journée (elle n'est ni dans
// `homeVideos`, ni dans les playlists, et /a-propos ne la cite qu'en texte),
// elle a été retrouvée par David : elle est publique sur YouTube.
//
// ✅ SOURCE VÉRIFIÉE (oEmbed YouTube interrogé le 20/08/2026) :
//    · titre officiel : « Ayub Ogada - Kothbiro - David Lesage | The Voice 2022
//      | Blind Audition »
//    · chaîne éditrice : « The Voice : la plus belle voix » (@thevoicetf1),
//      c'est-à-dire TF1 — ce n'est PAS une chaîne de David.
//
// ⚠️ CONSÉQUENCE, À NE PAS PERDRE : la vidéo est publiée par TF1 sur sa propre
//    chaîne. L'INTÉGRER via le lecteur YouTube (ce que fait <YouTube />) est
//    l'usage normal et prévu par l'éditeur. En revanche, RÉ-AFFICHER DES IMAGES
//    FIXES EXTRAITES DE CETTE DIFFUSION (captures d'écran avec les logos TF1 /
//    The Voice incrustés) est un autre sujet : David est l'artiste filmé, pas le
//    titulaire des droits sur l'émission, et cette page est rémunérée à la
//    commission. C'est la raison pour laquelle la section #debout utilise la
//    vidéo officielle et PAS les captures d'écran de l'émission.
//
// ⚠️ L'identifiant COMMENCE PAR UN UNDERSCORE (`_v60Ow5_axY`) : ne jamais le
//    « nettoyer », le trimer ni le passer dans une regex qui mange les `_`.
//
// 🚫 PAS DE DONNÉES STRUCTURÉES POUR CETTE VIDÉO : `videoObjectsLocal()`
//    (src/lib/ldJson.ts) résout `contentUrl` contre notre propre domaine et
//    déclare David comme `publisher` — deux affirmations fausses ici, puisque
//    l'éditeur est TF1 et que le fichier n'est pas hébergé chez nous. Et ni la
//    durée ni la date de mise en ligne n'ont pu être établies. On n'invente pas :
//    aucun VideoObject n'est émis pour elle.
export const atlasTheVoiceVideoId: string | null = '_v60Ow5_axY'

// ── PRIX PUBLICS (relevés le 20/10/2026, en euros TTC) ─────────────────────
// SOURCE : catalogue Shopify d'Atlas, https://www.atlashandpan.com/products.json
//   (devise du panier : EUR) — Atlas Pro 250 €, Atlas All 270 €, Atlas Body
//   165 €, Atlas Short 230 €, Kit pieds + rallonges 105 €, aucun prix barré
//   (`compare_at_price` vide) : la promotion du 20/08/2026 est TERMINÉE.
// Les fiches disent « Taxes incluses » → prix TTC. Port en plus (`atlasShipping`).
//
// 🔙 Au 20/08/2026 une promotion était en cours (Pro 215 €, All 230 €, Body
//    140 €, prix barrés 250/270/165 €) : c'est d'où viennent les « 215/230 € »
//    encore cités par David le 20/10/2026 — voir le bloc du code plus haut.
// ⚠️ SI ATLAS RELANCE UNE PROMOTION : mettre le prix promo dans `atlasPrices`,
//    le prix habituel dans `atlasRegularPrices`, passer `ATLAS_SALE_ON` à true
//    et mettre à jour `ATLAS_PRICES_READ_AT` — le prix barré réapparaît seul.
//    La page affiche toujours « le prix qui fait foi est celui d'Atlas ».
export const ATLAS_PRICES_READ_AT = '2026-10-20'
export const ATLAS_SALE_ON = false

export const atlasPrices = {
  pro: 250,
  all: 270,
  /** Vendu SÉPARÉMENT — voir `ATLAS_BODY_STATUS` plus bas. */
  body: 165,
} as const

/** Prix barrés (« prix habituel ») — utilisés seulement si `ATLAS_SALE_ON`. */
export const atlasRegularPrices = {
  pro: 250,
  all: 270,
  body: 165,
} as const

/** Frais de port annoncés par Atlas, en euros (« about € 12.00 » pour l'Europe). */
export const atlasShipping = { europe: 12, usa: 25, asiaPacific: 30 } as const

// ── CHIFFRES TECHNIQUES (repris mot pour mot des fiches officielles) ───────
// Les libellés sont traduits dans i18n (`atlas.pro.specs` / `atlas.all.specs`) ;
// ici, uniquement les nombres, pour qu'ils ne puissent pas diverger entre FR et EN.
export const atlasSpecs = {
  pro: {
    heightMinCm: 51,
    heightMaxCm: 109,
    weightKg: 1.8,
    magnets: 8,
  },
  all: {
    heightMinCm: 50,
    heightMaxCm: 96,
    magnets: 8,
    /** Rallonges ET pieds en bois : 41 cm chacun. */
    woodPartCm: 41,
    /** Les pieds se rallongent de 10 cm pour ajuster la hauteur. */
    legExtraCm: 10,
  },
} as const

// ── PHOTOS ────────────────────────────────────────────────────────────────
// ⚠️ VISUELS PROVISOIRES : repris des fiches produit officielles Atlas
// (cdn.shopify.com) et réencodés en WebP. David doit demander à Atlas leur
// KIT MÉDIA officiel et remplacer ces fichiers. La correspondance
// fichier → URL d'origine est consignée dans REPRENDRE-SITE-VITRINE.md.
// Toutes les photos sont au format portrait 1120 × 1400 (sauf mention).
export interface AtlasPhoto {
  /** Clé du texte alternatif dans `atlas.alt` (dict.ts + en.ts). */
  id: string
  src: string
  w: number
  h: number
}

export const atlasProPhotos: AtlasPhoto[] = [
  { id: 'proOpen', src: '/images/prod-atlas-pro-1.webp', w: 1120, h: 1400 },
  { id: 'proHigh', src: '/images/prod-atlas-pro-2.webp', w: 1120, h: 1400 },
  { id: 'proDisc', src: '/images/prod-atlas-pro-3.webp', w: 1120, h: 1400 },
  { id: 'proLock', src: '/images/prod-atlas-pro-4.webp', w: 1120, h: 1400 },
  { id: 'proClosed', src: '/images/prod-atlas-pro-5.webp', w: 1120, h: 1400 },
  { id: 'proBag', src: '/images/prod-atlas-pro-6.webp', w: 1120, h: 1400 },
  { id: 'proParts', src: '/images/prod-atlas-pro-7.webp', w: 958, h: 1400 },
]

export const atlasAllPhotos: AtlasPhoto[] = [
  { id: 'allPlaying', src: '/images/prod-atlas-all-1.webp', w: 1120, h: 1400 },
  { id: 'allHigh', src: '/images/prod-atlas-all-2.webp', w: 1120, h: 1400 },
  { id: 'allLow', src: '/images/prod-atlas-all-3.webp', w: 1120, h: 1400 },
  { id: 'allBody', src: '/images/prod-atlas-all-4.webp', w: 1120, h: 1400 },
  { id: 'allDisc', src: '/images/prod-atlas-all-5.webp', w: 1120, h: 1400 },
  { id: 'allScrew', src: '/images/prod-atlas-all-6.webp', w: 1120, h: 1400 },
  { id: 'allWood', src: '/images/prod-atlas-all-7.webp', w: 1119, h: 1400 },
]

// 📏 LA PHOTO DES DEUX HAUTEURS (repérée par David lui-même sur le site d'Atlas).
// Elle montre DEUX Atlas Pro côte à côte — l'un déployé au maximum avec un handpan
// dessus, l'autre replié au minimum — donc la plage 51 → 109 cm sur une seule image.
// Elle a sa propre légende sur la page (pas juste un `alt`) : c'est ce qu'elle
// DÉMONTRE qui compte, pas juste ce qu'elle montre. Ne pas la noyer dans le carrousel.
//
// 🎨 FOND DÉTOURÉ (20/08/2026, demande de David : « deux fonds blancs différents,
//    celui de la photo et celui du site »). La photo d'origine
//    `prod-atlas-pro-8.webp` a un fond de studio GRIS DÉGRADÉ (211 en haut →
//    229 en bas) + une ombre portée : posée sur la carte blanche du hero, elle
//    dessinait un rectangle gris bien visible, alors que les deux photos de
//    l'Atlas All sont, elles, déjà sur blanc pur (255) et sans ombre.
//    → `prod-atlas-pro-8-fond-blanc.webp` : fond ET ombre portée ramenés au
//      blanc pur, par sélection contiguë type « baguette magique » (on suit le
//      dégradé lisse du fond, tolérance 5, on s'arrête net sur les arêtes du
//      produit), sans érosion, avec un adoucissement de frange sur 1 px.
//    ⚠️ L'ORIGINAL EST CONSERVÉ, ne pas l'écraser : c'est le fichier de
//       référence repris du site d'Atlas.
//    ⚠️ Vérifié au zoom ×3 sur les pieds, les embouts caoutchouc et le pourtour
//       du handpan : jambes fines, colliers de serrage et rebord du handpan
//       intacts, aucune frange sombre. Une tolérance plus large (10) mangeait le
//       reflet du rebord ; une érosion de 1 px laissait un liseré sombre. Si
//       cette image est un jour remplacée, REFAIRE la vérification au zoom.
//    → Le fichier est aussi RECADRÉ sur son sujet (781×1400 → 720×1170) : une
//      fois le fond blanchi, il restait ~19 % de marge blanche en hauteur, si
//      bien que le Pro s'affichait plus petit que l'Atlas All à cadre égal.
//      ⚠️ NE PAS faire la même chose aux photos de l'Atlas All : leurs
//         `subjectFrac` (0,933 / 0,956) mesurent la part du sujet dans l'image
//         et servent au calcul du rapport 50/96 — les recadrer les fausserait.
//    ℹ️ RESTE CONNU, à ne pas prendre pour un bug : les deux cartes ne sont PAS
//       à la même échelle. Le cliché du Pro contient un handpan AU-DESSUS du
//       pied, donc à cadre égal le pied de 109 cm rend ≈ 1,9 px/cm contre
//       ≈ 2,4 px/cm pour le 96 cm de l'Atlas All. Les mettre à la même échelle
//       obligerait à couper le handpan, c'est-à-dire à détruire ce que la photo
//       démontre. Ce sont les étiquettes en cm et les légendes qui portent la
//       mesure, jamais la taille apparente.
export const atlasProHeightPhoto: AtlasPhoto = {
  id: 'proTwoHeights', src: '/images/prod-atlas-pro-8-fond-blanc.webp', w: 720, h: 1170,
}

// 🔲 LA MÊME PHOTO, MISE AU CARRÉ POUR LE CARROUSEL (20/08/2026).
//
// David : « au lieu d'ajouter une deuxième image en dessous du carrousel,
// intègre cette photo dans le carrousel, optimise l'espace ». Elle ne vit donc
// plus en figure sous le bloc Atlas Pro : elle est devenue une DIAPOSITIVE.
//
// ⚠️ POURQUOI UN FICHIER SÉPARÉ, ET PAS LE 720×1170 DIRECTEMENT :
//    `.carousel` est en `aspect-ratio: 1/1` et `.carousel-slide img` est en
//    `object-fit: cover` (src/styles/global.css). Une image de 720×1170 y serait
//    rognée de 38 % en hauteur — donc handpan coupé en haut ET embouts coupés en
//    bas : exactement les deux extrémités qui font la démonstration des deux
//    hauteurs. L'option `wide: true` (contain à 88 %) laisserait, elle, le fond
//    blanc de la photo dessiner un rectangle sur le fond cream-deep du carrousel
//    — le défaut que David avait déjà signalé sur le hero.
//    ➡️ Repli retenu : la même image RECENTRÉE sur un carré blanc pur de
//       1170 × 1170 (marges blanches à gauche et à droite). En `cover`, elle
//       remplit exactement la case sans perdre un pixel du sujet.
//    Générée depuis `prod-atlas-pro-8-fond-blanc.webp` — si celle-ci change,
//    REGÉNÉRER celle-ci (coins vérifiés à 255,255,255 après génération).
export const atlasProHeightSquare: AtlasPhoto = {
  id: 'proTwoHeights', src: '/images/prod-atlas-pro-8-carre.webp', w: 1170, h: 1170,
}

// 🪑 L'ATLAS BODY — la tête seule, celle qui se coince entre les jambes.
// Voir `ATLAS_BODY_STATUS` en bas de fichier AVANT d'écrire quoi que ce soit
// sur son inclusion : c'est le point sur lequel on peut faire le plus de dégâts.
export const atlasBodyPhotos: AtlasPhoto[] = [
  { id: 'bodySeated', src: '/images/prod-atlas-body-1.webp', w: 1120, h: 1400 },
  { id: 'bodySide', src: '/images/prod-atlas-body-2.webp', w: 1400, h: 935 },
  { id: 'bodyAlone', src: '/images/prod-atlas-body-3.webp', w: 1120, h: 1400 },
]

// 🏔️ HERO — LES DEUX MODÈLES, CHACUN À SES DEUX HAUTEURS (demande de David).
//
// 🚨 POURQUOI LE PRO A UNE PHOTO ET LE ALL EN A DEUX — NE PAS « HARMONISER ».
//    Le Pro a une VRAIE photo des deux hauteurs dans un même cliché
//    (`prod-atlas-pro-8`) : deux pieds réels, photographiés ensemble, donc
//    comparables. Pour le All, cette photo N'EXISTE PAS chez Atlas — vérifié le
//    20/08/2026 sur les fiches All, Short, Kit et Rallonges (toutes les images
//    Shopify listées).
//
// 🚨 ET ELLE N'A PAS ÉTÉ FABRIQUÉE, POUR UNE RAISON MESURÉE.
//    Composer les deux photos du All aurait affiché un rapport de hauteurs
//    FAUX. Vérification faite en mesurant, dans chaque photo, la hauteur du
//    pied rapportée à la largeur de la couronne (objet physique identique,
//    donc étalon) :
//        · position haute : 3862 px / 536 px = 7,21
//        · position basse : 1671 px / 362 px = 4,62
//    → rapport photographique 7,21 / 4,62 = **1,56**
//    → rapport RÉEL 96 cm / 50 cm = **1,92**
//    L'écart (23 %) prouve que les deux clichés n'ont pas été pris dans les
//    mêmes conditions. Un montage aurait donc montré un All « moins haut »
//    qu'il ne l'est — exactement le genre d'écart qu'un client constate à la
//    réception. Repli retenu : les DEUX photos côte à côte, chacune portant sa
//    hauteur réelle ÉCRITE. C'est le texte qui porte la comparaison, pas
//    l'image. Si Atlas fournit un jour la vraie photo, la remplacer ici.
//
// 📐 `subjectFrac` = part de la HAUTEUR DU FICHIER réellement occupée par le
//    pied (le reste est la marge blanche laissée au recadrage). Sans lui, deux
//    images affichées « à la même hauteur CSS » montrent deux pieds de la même
//    taille — alors que l'un fait 50 cm et l'autre 96. C'est le piège exact :
//    les étiquettes disent une chose et l'image en montre une autre.
//    La page s'en sert pour afficher les deux pieds au VRAI rapport 50/96,
//    alignés sur la même ligne de sol. Recalculer si on rerecadre les fichiers.
export const atlasAllHeightPhotos: { photo: AtlasPhoto; cm: number; subjectFrac: number }[] = [
  { photo: { id: 'allHeightLow', src: '/images/prod-atlas-all-8.webp', w: 910, h: 1400 }, cm: 50, subjectFrac: 0.933 },
  { photo: { id: 'allHeightHigh', src: '/images/prod-atlas-all-9.webp', w: 916, h: 1400 }, cm: 96, subjectFrac: 0.956 },
]

/**
 * Hauteur d'affichage (en % de la boîte) de chaque photo, pour que le rapport
 * des pieds VISIBLES soit le rapport RÉEL de leurs hauteurs. À vérifier en
 * mesurant le rendu : hauteur_visible_96 / hauteur_visible_50 doit valoir 1,92.
 */
export const atlasAllHeightPct = (() => {
  const raw = atlasAllHeightPhotos.map((it) => it.cm / it.subjectFrac)
  const max = Math.max(...raw)
  return raw.map((r) => (r / max) * 100)
})()

// Photo unique utilisée hors de la page dédiée (carte boutique, showroom).
export const atlasCover = atlasProPhotos[0]
export const atlasAllCover = atlasAllPhotos[0]

// ── 🚨 STATUT DE L'« ATLAS BODY » — LE POINT À NE JAMAIS APPROXIMER ────────
//
// L'Atlas Body est la TÊTE seule : corps imprimé en 3D + base en bois + disque
// flottant à 8 aimants. C'est elle qu'on coince entre les jambes pour jouer
// assis, sans poser l'instrument sur les cuisses.
//
// RÉPONSE ÉTABLIE (sources ci-dessous), et elle n'est pas la même selon le modèle :
//
//   · ATLAS ALL   → le Body est **INCLUS**. La gamme bois est modulaire :
//                   Body (seul) → + pieds = Atlas Short → + rallonges = Atlas All.
//   · ATLAS SHORT → le Body est **INCLUS** (modèle intermédiaire, 195 € au
//                   20/08/2026 en promotion ; 230 € au 20/10/2026).
//   · ATLAS BODY  → **vendu SEUL à part**, 165 € au 20/10/2026 (140 € pendant
//                   la promotion du 20/08/2026), pour qui
//                   ne veut que le jeu sur les genoux, ou veut compléter plus tard.
//   · ATLAS PRO   → ❌ **NON INCLUSE — CONFIRMÉ PAR LE FABRICANT.**
//                   Marco Agri, créateur d'Atlas, à David le 20/08/2026 :
//                   « but atlas pro doesn't come with the wood part. »
//                   L'acheteur d'un Pro qui veut jouer assis doit commander
//                   l'Atlas Body EN PLUS (165 € au 20/10/2026). C'est LE point qui fait la
//                   différence entre un client satisfait et un client qui
//                   découvre une pièce manquante à la réception.
//                   ✅ MAIS CE N'EST PAS UN CUL-DE-SAC : « all parts are fully
//                   compatible with the others » (même message). Le Body
//                   s'ajoute à un Pro, et celui qui possède déjà un All ou un
//                   Short peut remonter sa partie bois sur le Pro.
//                   ⚠️ NE RIEN EXTRAPOLER : Marco ne dit rien du montage, du
//                   temps de bascule ni de la stabilité de la combinaison.
//
// SOURCES (relevées le 20/08/2026) :
//   · FAQ officielle, https://atlashandpan.com/en/pages/discover-all-features —
//     « Atlas All includes all other versions? » → « Yes, Atlas is a modular
//     system made up of three parts: the Body, the Legs, and the Extensions. »
//   · Même page — « Atlas lets you play the handpan in total comfort in three
//     positions: on your lap, seated, or standing. »
//   · Fiche « Kit Pieds + Rallonges » (90 €) — « vous pouvez transformer votre
//     Atlas Body en Atlas Short, voire même en Atlas All. »
//   · Arithmétique cohérente : Body 140 € + Kit 90 € = 230 € = prix de l'Atlas All
//     (promotion du 20/08/2026) ; au 20/10/2026 : Body 165 € + Kit 105 € = 270 €.
export const ATLAS_BODY_STATUS = {
  includedInAll: true,
  includedInShort: true,
  /** ❌ Confirmé NON inclus par Marco Agri (créateur d'Atlas), 20/08/2026. */
  includedInPro: false,
  soldSeparately: true,
  /** ✅ « all parts are fully compatible with the others » — Marco Agri. */
  partsInterchangeable: true,
} as const

// ── ✅ CE QU'ATLAS CONFIRME (FAQ /pages/discover-all-features, 20/08/2026) ──
// Deux questions que je croyais sans réponse le sont en fait, et elles répondent
// à des objections réelles d'acheteurs — elles sont donc écrites sur la page :
//   · « The magnets scratch? » → « No, the 8 magnets are safely covered and
//     placed under the spots where the handpan touches the Atlas body. »
//   · « Is compatible with my handpan? » → conçu pour TOUS les handpans, testé
//     avec de nombreux fabricants ; aimants compatibles acier nitruré, inox et
//     Ember Steel.
// Autres caractéristiques annoncées : goupille de sécurité anti-basculement,
// collier de centrage en caoutchouc amovible, pieds réglables par vissage.

// ── 🚧 TOUJOURS NON RENSEIGNÉ PAR ATLAS AU 20/08/2026 — NE PAS COMBLER ─────
// Ces informations ne figurent NI sur les fiches produit, NI sur la page
// « about », NI dans la FAQ. Elles ne doivent apparaître nulle part sur le site
// tant qu'Atlas ne les a pas confirmées à David :
//   · le poids de l'Atlas All et de l'Atlas Body (celui du Pro, 1,8 kg, est écrit) ;
//   · l'essence du bois ;
//   · le poids maximum de handpan supporté (la COMPATIBILITÉ, elle, est confirmée) ;
//   · la durée de garantie ;
//   · le délai de livraison (« varie selon la localisation du destinataire ») ;
//   · les dimensions une fois plié / la taille du sac Atlas Bag ;
//   · l'existence d'un sac pour l'Atlas All (le sac Atlas est vendu 10 € à part,
//     et n'est explicitement inclus qu'avec l'Atlas Pro) ;
//   · (la promotion du 20/08/2026 est terminée au 20/10/2026 — plus d'objet).
