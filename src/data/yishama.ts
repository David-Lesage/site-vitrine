// ============================================================
// Données Yishama NEUTRES (langue-agnostiques) : notes des deux
// instruments sur mesure de David, identifiants vidéo, liens,
// clés des métaux. Toute la prose vit dans src/i18n/dict.ts
// (clés yishama.* et data.yishama*).
//
// ⚠️ SOURCES — tout ici est vérifié, rien n'est inventé :
//  · Notes des 2 pans : relevé de David (« The missing part of the
//    handpan player ») recoupé note à note avec les données de
//    l'app Handpan Constellation Studio (`acoustic/yishama-data.ts`).
//  · 432 Hz : demandé par David, confirmé par Yhonatan avant
//    l'accordage (échanges d'octobre 2022).
//  · Vidéos : chaîne YouTube @DavidLesageArtiste (titres vérifiés
//    via l'API oEmbed le 11/08/2026).
//  · Métaux : article « Nitrided handpan vs stainless handpan » du
//    site Yishama + produit « Ember Steel » de leur catalogue.
// ============================================================

export type MetalKey = 'nitrure' | 'inox' | 'ember'

/** Lien d'affiliation officiel de David (ambassadeur Yishama). */
export const yishamaUrl = 'https://www.yishama.com/?wpam_id=40'
export const yishamaSiteUrl = 'https://www.yishama.com'

/** Playlist YouTube « Yishama Handpan David Lesage ». */
export const yishamaPlaylist = 'PLns6mQWNwwnQ_KWoyklbfqtlFzIQi9iQf'
export const yishamaPlaylistUrl = `https://www.youtube.com/playlist?list=${yishamaPlaylist}`
export const youtubeChannel = 'https://www.youtube.com/@DavidLesageArtiste'

/** Vidéo mise en avant — la reprise que Yhonatan a voulu partager. */
export const featuredVideo = 'Zp_zaqsRBCg'

/** Autres vidéos de la playlist (ids YouTube). Titres → dict.data.yishamaVideos. */
export const videos = ['KI3-L5tvOso', 'wms1TpzaTYA', 'WYVtBfoz7T8', '2kVSLdpzt_M', 'pkHFaaZplik', '81yKSB3dIK0'] as const

/**
 * Les deux instruments sur mesure, reçus en mai 2023.
 * `top` inclut le ding en [0]. `bottom` = notes du dessous.
 * Les noms sont les libellés de travail de David (ce ne sont pas
 * des modèles du catalogue Yishama).
 *
 * 🖋️ PATERNITÉ (27/08/2026, corrigée le même jour) — LA VÉRITÉ EST EN TROIS
 * TEMPS, ne jamais la rabattre sur un seul nom :
 *  ① le POURQUOI est de David : « mon cahier des charges est celui d'un
 *     chanteur qui souhaite s'accompagner au handpan comme un guitariste ou un
 *     pianiste le ferait. Tout est parti de là. » ;
 *  ② la CONTRAINTE est de David aussi : tous les accords, toutes les tonalités,
 *     la fondamentale de chaque accord en note basse, et un ding ;
 *  ③ la SOLUTION est de Yhonatan Ale-Yahav (Yishama) : « je ne savais pas
 *     comment cela allait être possible, c'est l'intelligence de Yonathan qui a
 *     permis cela. » David a conçu en partie, il n'a PAS réalisé.
 * Le crédit « Made by Yishama — conçues par Yhonatan Ale-Yahav » doit
 * accompagner les gammes partout où elles apparaissent (site + application).
 * Le texte affiché vit dans src/i18n/dict.ts + en.ts, clés `yishama.insCredit`,
 * `yishama.insCreditBrief` et `yishama.bridgeSignature`.
 * ⚠️ Ne JAMAIS étendre ce crédit aux créations Now Groove (kit de calebasse
 * « David Lesage Signature ») : elles sont finies à la main par Kamou
 * (Djoliba Percussion). Même mot « Signature », facteur différent.
 *
 * ⚠️ ORTHOGRAPHE — LA COEXISTENCE DES DEUX GRAPHIES EST VOULUE :
 *  · « Yonathan » = forme familière, employée dans tout le récit de David
 *    (~22 occurrences FR / ~20 EN). Ne pas la « corriger ».
 *  · « Yhonatan Ale-Yahav » = nom officiel complet du fondateur/CEO de
 *    Yishama, réservé au crédit de paternité.
 */
export const instruments: { id: string; name: string; ding: string; top: string[]; bottom: string[] }[] = [
  {
    id: 'dkurd',
    name: 'D Kurd 18',
    ding: 'D3',
    top: ['D3', 'A3', 'B♭3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'C5', 'D5', 'B♭5'],
    bottom: ['B♭2', 'C3', 'F3', 'G3', 'F5', 'G5'],
  },
  {
    id: 'e18',
    name: 'E 18',
    ding: 'E3',
    top: ['E3', 'G♯3', 'B3', 'C♯4', 'D♯4', 'E4', 'F♯4', 'G♯4', 'A4', 'B4', 'C♯5', 'D♯5', 'E5'],
    bottom: ['A2', 'B2', 'C♯3', 'D♯3', 'F♯3'],
  },
]

/** Chiffres clés de la paire (calculés à partir des notes ci-dessus). */
export const pairFacts = [
  { value: '36', key: 'notes' },
  { value: '12', key: 'keys' },
  { value: '24', key: 'chords' },
  { value: '432 Hz', key: 'tuning' },
]

/**
 * Les trois métaux proposés par Yishama.
 *
 * Chaque acier est illustré par la photo d'un instrument Yishama réel
 * (catalogue Yishama, fond noir, pan vu de dessus).
 *
 * Pairing photo↔acier = lecture visuelle de David/Claude 09/09,
 * validation demandée à Altin (Yishama) par mail ; corriger ici si
 * Altin infirme.
 *
 * `grad` reste comme repli CSS si une image venait à manquer.
 * `photo` = fichier dans /public/images. `product` = fiche produit Yishama.
 */
export const metals: {
  key: MetalKey
  grad: string
  photo: string
  model: string
  product: string
}[] = [
  {
    key: 'nitrure',
    grad: 'linear-gradient(150deg,#4a4038 0%,#221c18 45%,#6b5a49 78%,#2b231d 100%)',
    photo: '/images/yishama-a-minor-17.webp',
    model: 'A Minor 17',
    product: 'https://www.yishama.com/product/a-yukis-scale-a-minor/',
  },
  {
    key: 'inox',
    grad: 'linear-gradient(150deg,#d9dde0 0%,#8f989e 40%,#f2f4f5 62%,#6f797f 100%)',
    photo: '/images/yishama-g2-hijaz-18.webp',
    model: 'G2 Hijaz 18',
    product: 'https://www.yishama.com/product/g2-hijaz-18/',
  },
  {
    key: 'ember',
    grad: 'linear-gradient(150deg,#e8c9a0 0%,#a9713d 42%,#f0dcc0 65%,#7d4a24 100%)',
    photo: '/images/yishama-f2-astronaut.webp',
    model: 'F2 Astronaut',
    product: 'https://www.yishama.com/product/f2-astronaut/',
  },
]
