// ============================================================
// Données centrales NEUTRES du site David Lesage.
// Libellés de navigation / footer / crédibilité → src/i18n/dict.ts.
// David Lesage est la MARQUE-MÈRE ; Neotone, Handpan Constellation Studio, les
// Cours et les micros sont ses univers.
// ============================================================

/**
 * ⚠️ INTERRUPTEUR À BASCULER APRÈS UN DÉPLOIEMENT — puis à supprimer.
 *
 * Deux nouvelles raisons de contact ont été ajoutées le 16/08/2026 pour arrêter
 * de perdre des prospects : `contact` (formulaire /contact + CTA « Collaboration »
 * de /a-propos) et `gonilele-order` (commande d'une harpe Gonilélé). Elles
 * remplacent des liens `mailto:` qui n'enregistraient RIEN.
 *
 * L'Edge Function `site-lead` doit les connaître pour envoyer le bon email
 * (« ta demande est bien reçue » + notification à David). Tant qu'elle n'est pas
 * redéployée, elle les traiterait comme une inscription à la liste d'attente et
 * répondrait « tu es sur la liste » à quelqu'un qui pose une question de presse —
 * et David ne serait pas prévenu. On ne prend pas ce risque : tant que
 * l'interrupteur est à `false`, ces trois boutons gardent leur `mailto:` d'avant,
 * exactement comme aujourd'hui.
 *
 * 👉 QUOI FAIRE : déployer `supabase/functions/site-lead` (le code est déjà à
 * jour sur le disque, les deux sources y sont déclarées), puis passer cette
 * constante à `true` et redéployer le site. Les inscriptions aux showcases
 * (page d'accueil) et les réservations de cours, elles, sont DÉJÀ enregistrées :
 * leurs sources sont connues de la version en ligne, elles ne dépendent pas d'ici.
 */
export const SITE_LEAD_KNOWS_CONTACT_SOURCES = true

export const site = {
  name: 'David Lesage',
  tagline: 'Rendre la musique visible et accessible — par les couleurs, la géométrie et les émotions.',
  positioning:
    'David Lesage — le musicien-inventeur qui rend la musique visible et accessible à tous, par les couleurs, la géométrie et les émotions.',
  url: 'https://www.lesagedavid.fr',
  // Lien direct vers l'application Handpan Constellation Studio. La connexion, le choix de
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
  { key: 'studio', href: '/handpan-app' },
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
  // Conditions générales (17/08/2026) — c'est le texte que la case obligatoire
  // des 4 formulaires fait accepter : il doit être atteignable depuis TOUTES
  // les pages, pas seulement depuis un formulaire. Le slug n'est pas traduit :
  // la version EN vit sur /en/conditions-generales (convention du site).
  { key: 'terms', href: '/conditions-generales' },
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
//
// ── 🏷️ CHAMP `note` — FACULTATIF, VIDE AUJOURD'HUI (21/08/2026) ─────────────
//
// LE PROBLÈME CONSTATÉ : les cinq lignes de l'agenda portaient EXACTEMENT le
// même titre (« Showcase Neotone — et tous les instruments à essayer »), le même
// tag « Public · Gratuit » et la même adresse. Cinq fois de suite. Rien ne
// distinguait une ligne d'une autre : le visiteur ne lisait qu'une répétition,
// et la seule information réellement différente — LA DATE — était en petit,
// sous le titre. La page a été corrigée : la DATE est maintenant le titre de
// chaque ligne, et le titre commun + l'adresse ne sont écrits qu'UNE fois,
// au-dessus de la liste.
//
// 🚧 CE QUI MANQUE, ET QUE SEUL DAVID PEUT ÉCRIRE : de quoi distinguer les
//    dates PAR LEUR CONTENU (une invitée, un instrument mis en avant ce jour-là,
//    une séance « spécial débutants »…). Aucune de ces informations n'existe
//    dans ce dépôt ni dans l'agenda Google recopié ici — on ne l'invente pas.
//
// ✅ QUAND DAVID VOUDRA DIFFÉRENCIER UNE DATE : ajouter `note: '…'` sur la
//    ligne concernée, et c'est tout. Le libellé s'affiche sous la date, en
//    pastille dorée, UNIQUEMENT sur les dates qui en portent un — les autres
//    ne changent pas d'aspect.
//      { date: '2026-10-18', start: '16:00', end: '19:00', note: 'Spécial débutants' },
//    ⚠️ Le texte est écrit TEL QUEL, dans les deux langues (ce champ n'est pas
//       traduit) : n'y mettre qu'un mot ou deux, compréhensibles des deux côtés,
//       ou prévoir `noteEn:` le jour où une date mérite deux formulations.
export const agendaEvents: readonly {
  date: string
  start: string
  end: string
  note?: string
}[] = [
  { date: '2026-08-23', start: '16:00', end: '19:00' },
  { date: '2026-09-19', start: '16:00', end: '19:00' },
  { date: '2026-10-18', start: '16:00', end: '19:00' },
  { date: '2026-11-14', start: '16:00', end: '19:00' },
  { date: '2026-12-05', start: '15:00', end: '18:00' },
]

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

// ── SHOWCASE : « pour quel(s) instrument(s) viens-tu ? » (17/08/2026) ─────────
// Question posée UNIQUEMENT sur la réservation d'un showcase public
// (`source === 'showcase-booking'`). Choix MULTIPLES, tous facultatifs.
//
// ⚠️ Volontairement DISTINCT de `demoInstruments` ci-dessus (colonne
// `site_leads.instruments`) : côté serveur, `instruments` est ignorée dès que
// `sessionType` est vide — ce qui est TOUJOURS le cas pour un showcase. Les deux
// listes ne se mélangent donc jamais : showcase → `showcase_instruments`,
// démonstration privée → `instruments`.
//
// AJOUTER UNE OPTION = 3 gestes, rien de plus :
//   1. l'id ici ;
//   2. son libellé dans `booking.showcaseInterestNames` (dict.ts ET en.ts — le
//      build échoue si l'un des deux manque) ;
//   3. le même id dans `ALLOWED_SHOWCASE_INTERESTS` de
//      supabase/functions/site-lead/index.ts (allowlist serveur).
// Le relais api/subscribe.js et la colonne en base n'ont rien à changer.
//
// 🚧 « Pieds Atlas » (`atlas`) : PAS ajouté pour l'instant — partenariat en
// cours, non signé. L'afficher publierait un partenariat qui n'existe pas
// encore. À insérer ici le jour où David le confirme.
export const showcaseInterests = ['all', 'handpan', 'mic', 'calebasse', 'gonilele', 'meet'] as const

// Playlist YouTube « Neotone » (toutes les vidéos liées à l'instrument).
export const neotonePlaylist = 'https://www.youtube.com/playlist?list=PLns6mQWNwwnS43kRc2dps9asOshpfQ2Ka'

// Vidéos mises en avant sur l'accueil (ids YouTube). Titres → dict.home.proofVideos (même ordre).
// 1) performance au Neotone (électronique) · 2) Shape of My Heart sur les deux
// Yishama (acoustique — même id que `featuredVideo` de data/yishama.ts) ·
// 3) tuto créer une gamme. ⚖️ Équilibre acoustique/électronique voulu ici :
// ne pas remettre trois vidéos Neotone.
export const homeVideos = ['KNQc6jCs0VE', 'Zp_zaqsRBCg', 'zWqXGlHb2wI'] as const

// Démos vidéo de l'app Handpan Constellation Studio (src + poster). Ordre = dict.studio.videos
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

// ── 🎬 DÉMONSTRATION SUR HANDPAN ACOUSTIQUE — EMPLACEMENT RÉSERVÉ ──────────
//
// Même dispositif que `atlasDemoVideoId` (src/data/atlas.ts) : David filmera
// sa démonstration sur son propre handpan acoustique. Tant que la constante
// vaut `null`, /handpan-app affiche un cadre 16/9 en pointillés
// « Démonstration sur handpan acoustique — par David Lesage · À venir »
// (rien de cassé, rien de vide, aucune image chargée).
//
// POUR METTRE LA VRAIE VIDÉO EN LIGNE : une seule ligne à changer ici →
//   export const studioAcousticDemoVideoId: string | null = 'ABCdef123'
// (l'identifiant est ce qui suit `watch?v=` ou `youtu.be/` dans l'URL).
// Le composant <YouTube /> prend alors automatiquement la place du cadre.
export const studioAcousticDemoVideoId: string | null = null

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
