// ============================================================
// Données Yishama NEUTRES (langue-agnostiques) : notes des deux
// instruments sur mesure de David, identifiants vidéo, liens,
// clés des métaux. Toute la prose vit dans src/i18n/dict.ts
// (clés yishama.* et data.yishama*).
//
// ⚠️ SOURCES — tout ici est vérifié, rien n'est inventé :
//  · Notes des 2 pans : relevé de David (« The missing part of the
//    handpan player ») recoupé note à note avec les données de
//    l'app Handpan Studio (`acoustic/yishama-data.ts`).
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
 * Pas de photo par métal (je n'en ai pas de fiable) : le disque est
 * rendu en CSS, ce qui évite d'illustrer un acier avec la photo d'un
 * autre. `grad` = dégradé du disque.
 */
export const metals: { key: MetalKey; grad: string }[] = [
  { key: 'nitrure', grad: 'linear-gradient(150deg,#4a4038 0%,#221c18 45%,#6b5a49 78%,#2b231d 100%)' },
  { key: 'inox', grad: 'linear-gradient(150deg,#d9dde0 0%,#8f989e 40%,#f2f4f5 62%,#6f797f 100%)' },
  { key: 'ember', grad: 'linear-gradient(150deg,#e8c9a0 0%,#a9713d 42%,#f0dcc0 65%,#7d4a24 100%)' },
]
