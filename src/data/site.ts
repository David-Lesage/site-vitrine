// ============================================================
// Données centrales NEUTRES du site David Lesage.
// Libellés de navigation / footer / crédibilité → src/i18n/dict.ts.
// David Lesage est la MARQUE-MÈRE ; Neotone, Handpan Compagnon, les
// Cours et les micros sont ses univers.
// ============================================================

export const site = {
  name: 'David Lesage',
  tagline: 'Rendre la musique visible et accessible — par les couleurs, la géométrie et les émotions.',
  positioning:
    'David Lesage — le musicien-inventeur qui rend la musique visible et accessible à tous, par les couleurs, la géométrie et les émotions.',
  url: 'https://www.lesagedavid.fr',
  // Lien direct vers l'application Handpan Compagnon. La connexion, le choix de
  // l'abonnement et le paiement (Stripe) se font directement dans l'app.
  appUrl: 'https://play.handpanstudio.app',
  // ⚙️ INTERRUPTEUR — accès public à l'application. C'est désormais le REPLI.
  // La source de vérité est la table Supabase `public.app_public_config`
  // (clé `app_public_access`), pilotée par le back-office de l'app : le site la
  // lit côté client au chargement (voir `src/lib/appAccess.ts` +
  // `src/components/AppAccessSync.astro`) — un seul interrupteur pour les deux.
  // Cette valeur sert quand la lecture échoue (réseau / CORS). La garder à
  // `false` : ainsi une panne ne peut jamais « ouvrir » le site par accident.
  // false = bêta fermée : les boutons qui menaient à l'app renvoient vers
  // l'encadré d'explication + liste d'attente (#acces, en bas de page).
  appPublicAccess: false,
  email: 'contact@lesagedavid.fr',
  phone: '+33 6 10 73 31 52',
  phoneHref: '+33610733152',
  address: '29 rue des Orteaux, 75020 Paris',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=29+rue+des+Orteaux+75020+Paris',
  social: {
    instagram: 'https://www.instagram.com/neotone.digitalhandpan/',
    facebook: 'https://www.facebook.com/people/Neotone-Digital-Handpan/',
    linktree: 'https://linktr.ee/David.Lesage.Artiste',
    // ⚠️ Vérifié le 13/08/2026 : @DavidLesageMusique renvoyait un 404
    // (lien mort dans le footer, les réseaux ET le JSON-LD `sameAs`).
    // La vraie chaîne est @DavidLesageArtiste (HTTP 200).
    youtube: 'https://www.youtube.com/@DavidLesageArtiste',
  },
}

// Clé de libellé (→ dict.common.nav) + chemin neutre (sera localisé via localizePath)
export const nav = [
  { key: 'home', href: '/' },
  { key: 'neotone', href: '/le-neotone' },
  // Mes deux handpans acoustiques Yishama + l'histoire avec Yonathan.
  { key: 'yishama', href: '/yishama' },
  { key: 'shop', href: '/boutique' },
  { key: 'lessons', href: '/cours' },
  { key: 'studio', href: '/handpan-compagnon' },
  { key: 'blog', href: '/blog' },
  { key: 'showroom', href: '/showroom' },
  { key: 'about', href: '/a-propos' },
  { key: 'contact', href: '/contact' },
] as const

export const footerNav = [
  { key: 'learnHandpan', href: '/apprendre-le-handpan' },
  { key: 'electricVsAcoustic', href: '/handpan-electronique-vs-acoustique' },
  { key: 'chooseHandpan', href: '/quel-handpan-choisir' },
  { key: 'newsletter', href: '/#communaute' },
  { key: 'faq', href: '/le-neotone#faq' },
  { key: 'legal', href: '/mentions-legales' },
] as const

// Prochains showcases publics gratuits (dates neutres, ISO).
// Le libellé / lieu traduit vient de dict.showroom.agenda*.
//
// ⚠️ SOURCE DE VÉRITÉ = l'agenda Google « Le Nid » (partagé avec Iris).
// Seuls les événements intitulés « Showcase » y sont repris ici : les workshops,
// concerts, résidences et rendez-vous mensuels ne vont PAS sur le site.
// La copie est MANUELLE : une date ajoutée ou déplacée dans l'agenda n'apparaît
// qu'après édition de ce fichier + redéploiement. Dernière synchro : 01/08/2026.
// Les dates passées disparaissent toutes seules (filtre dans ShowroomPage.astro).
export const agendaEvents = [
  { date: '2026-08-23', start: '16:00', end: '19:00' },
  { date: '2026-09-19', start: '16:00', end: '19:00' },
  { date: '2026-10-18', start: '16:00', end: '19:00' },
  { date: '2026-11-14', start: '16:00', end: '19:00' },
  { date: '2026-12-05', start: '15:00', end: '18:00' },
] as const

// Rendez-vous individuels au showroom — SOURCE DE VÉRITÉ DES TARIFS.
// Alimente à la fois les cartes « Testez, rencontrez, repartez avec » et le
// formulaire de réservation : changer un prix ICI le change partout.
// (Rien à voir avec les prix de l'app, qui viennent de Stripe.)
// `kind` → libellé traduit (dict.booking.sessionTypeNames) · `price` en euros TTC.
// `remote` : la visio n'a de sens que pour un COURS. Une démonstration privée
// suppose de toucher les instruments — elle est forcément au showroom.
// `recommended` : mis en avant dans le formulaire. La prise en main répond au
// moment où l'on décroche — juste après l'achat, face à une interface inconnue.
//
// ⚠ GRILLE UNIQUE, annoncée partout (site + email) : 1h = 50 €, 1h30 = 70 €,
// quel que soit le motif du rendez-vous. Ne pas introduire de durée/tarif qui
// sorte de cette grille sans mettre à jour la copie (dict.booking.vip*,
// showroom.agendaMore*, email `site-lead`).
export const sessionTypes = [
  { id: 'onboarding-60', kind: 'onboarding', minutes: 60, price: 50, remote: true, recommended: true },
  // `recommended` uniquement sur la 1ʳᵉ : c'est la porte d'entrée, et répéter
  // l'étoile sur les deux lignes la rendrait invisible.
  { id: 'onboarding-90', kind: 'onboarding', minutes: 90, price: 70, remote: true, recommended: false },
  { id: 'demo-60', kind: 'demo', minutes: 60, price: 50, remote: false, recommended: false },
  { id: 'demo-90', kind: 'demo', minutes: 90, price: 70, remote: false, recommended: false },
  { id: 'lesson-60', kind: 'lesson', minutes: 60, price: 50, remote: true, recommended: false },
  { id: 'lesson-90', kind: 'lesson', minutes: 90, price: 70, remote: true, recommended: false },
] as const

export type SessionTypeId = (typeof sessionTypes)[number]['id']

// Instruments qu'on peut venir découvrir en démonstration privée. Savoir lesquels
// à l'avance permet à David de les préparer avant la venue.
export const demoInstruments = ['neotone', 'calebasse', 'gonilele', 'mic-hisong', 'mic-muling'] as const

// Playlist YouTube « Neotone » (toutes les vidéos liées à l'instrument).
export const neotonePlaylist = 'https://www.youtube.com/playlist?list=PLns6mQWNwwnS43kRc2dps9asOshpfQ2Ka'

// Vidéos mises en avant sur l'accueil (ids YouTube). Titres → dict.home.proofVideos (même ordre).
// 1) performance au Neotone (électronique) · 2) Shape of My Heart sur les deux
// Yishama (acoustique — même id que `featuredVideo` de data/yishama.ts) ·
// 3) tuto créer une gamme. ⚖️ Équilibre acoustique/électronique voulu ici :
// ne pas remettre trois vidéos Neotone.
export const homeVideos = ['KNQc6jCs0VE', 'Zp_zaqsRBCg', 'zWqXGlHb2wI'] as const

// Démos vidéo de l'app Handpan Compagnon (src + poster). Ordre = dict.studio.videos
export const studioVideos: { src: string; poster: string }[] = [
  { src: '/images/sa-1-tonalite.mp4', poster: '/images/sa-1-tonalite-poster.webp' },
  { src: '/images/sa-ecouter.mp4', poster: '/images/sa-ecouter-poster.webp' },
  { src: '/images/sa-oeil1.mp4', poster: '/images/sa-oeil1-poster.webp' },
  { src: '/images/sa-bonus.mp4', poster: '/images/sa-bonus-poster.webp' },
  { src: '/images/sa-styles.mp4', poster: '/images/sa-styles-poster.webp' },
  { src: '/images/sa-transposer.mp4', poster: '/images/sa-transposer-poster.webp' },
  { src: '/images/sa-couleur.mp4', poster: '/images/sa-couleur-poster.webp' },
  { src: '/images/sa-doigte.mp4', poster: '/images/sa-doigte-poster.webp' },
  { src: '/images/sa-play.mp4', poster: '/images/sa-play-poster.webp' },
  { src: '/images/sa-learn.mp4', poster: '/images/sa-learn-poster.webp' },
  { src: '/images/sa-atlas.mp4', poster: '/images/sa-atlas-poster.webp' },
  { src: '/images/sa-creation.mp4', poster: '/images/sa-creation-poster.webp' },
]

// Les 7 degrés ChromaKeys — couleurs neutres (émotions via dict.common.emotions)
export const chromaKeys = [
  { degree: 'I', color: 'var(--color-chroma-1)' },
  { degree: 'II', color: 'var(--color-chroma-2)' },
  { degree: 'III', color: 'var(--color-chroma-3)' },
  { degree: 'IV', color: 'var(--color-chroma-4)' },
  { degree: 'V', color: 'var(--color-chroma-5)' },
  { degree: 'VI', color: 'var(--color-chroma-6)' },
  { degree: 'VII', color: 'var(--color-chroma-7)' },
]
