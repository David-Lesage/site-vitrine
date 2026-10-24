// ============================================================
// Page dédiée au micro Hisong AirStudio S1 (/micro-hisong) — 20/10/2026.
// Mots de David : « créer une page dédiée au micro hisong comme c'est le cas
// du micro muling car je voudrais la développer avec plusieurs vidéos et la
// lier à des articles de blog […] notamment sur les utilisations dans
// différents contextes ».
//
// Ce fichier contient TOUT ce qui est propre à la page : les données neutres
// (vidéos, contextes, prix) ET les textes FR / EN / ES. Il est volontairement
// séparé de dict.ts / en.ts / es.ts.
//
// ⚠️ FAITS PRODUIT : uniquement ceux déjà présents dans le dépôt
//    (src/data/shop.ts, shop.priceNotes.hisong, shop.products['micro-hisong'],
//    l'article setup-nomade-neotone-bose-s1) et dans l'écran « Matériel
//    recommandé » de l'app (partenaires/index.ts + translations.ts, clés
//    ptn.page.*). Ne rien ajouter sans source.
// ============================================================

import type { Lang } from './config'

// ─────────────────────────── Données neutres ───────────────────────────

// 🎟️ Le code est EXACTEMENT celui contenu dans l'URL d'affiliation, comme sur
// la fiche boutique (src/data/shop.ts, `micro-hisong`). Changer les deux ensemble.
export const hisongAffiliateUrl = 'https://hisong.io/DAVID-LESAGE-SAVE-5'
export const hisongDiscountCode = 'DAVID-LESAGE-SAVE-5'
export const hisongDiscountPct = 5

// Prix TTC, livraison en France — repris de shop.priceNotes.hisong (dict.ts).
export const hisongPrices = {
  s1: 270.95, // AirStudio S1 seul (Standard Pack)
  s1RxPlus: 360.95, // avec le RX Plus (Universal Pack, +90 €)
  s1RxPlusWithCode: 342.91, // S1 + RX Plus avec le code −5 %, livraison offerte
}

// Galerie du héros — mêmes photos que la fiche boutique, d'abord le produit,
// puis David en situation avec son handpan.
export const hisongPhotos = [
  '/images/prod-micro-hisong.webp',
  '/images/prod-hisong-7.jpg',
  '/images/showroom-yishama-micros-hisong.webp',
  '/images/showroom-gonilele-micro-hisong.webp',
  '/images/prod-hisong-3.jpg',
  '/images/prod-hisong-4.jpg',
  '/images/prod-hisong-2.jpg',
]

// 🎬 VIDÉOS — pour en ajouter une, il suffit d'ajouter une ligne ici :
//    { id: '<identifiant YouTube>', title: { fr: '…', en: '…', es: '…' } }
//    La grille, les données structurées (VideoObject) et le bouton « Voir les
//    vidéos » suivent tout seuls. Titres repris des titres YouTube de David.
export const hisongVideos: { id: string; title: Record<Lang, string> }[] = [
  {
    id: 'B_7ZvlpHUsE',
    title: {
      fr: 'J’ai un studio dans un champ de colza',
      en: 'I’ve got a studio in a rapeseed field',
      es: 'Tengo un estudio en un campo de colza',
    },
  },
  {
    id: 'rx8ZZcL7Nog',
    title: {
      fr: 'Un studio dans ma poche pour ma voix et mon handpan',
      en: 'A studio in my pocket for my voice and my handpan',
      es: 'Un estudio en el bolsillo para mi voz y mi handpan',
    },
  },
]

// 🗺️ CONTEXTES D'UTILISATION — chaque carte annonce un FUTUR article de blog.
//    `blogSlug` = le `permalink` que l'article devra porter. Tant qu'aucun
//    article publié (draft: false) ne porte ce permalink dans la langue de la
//    page, la carte s'affiche SANS lien (« Article à venir ») : jamais de lien
//    cassé. Le jour où David publie l'article avec ce permalink, le lien
//    apparaît tout seul au build suivant. Slugs = PROPOSITIONS, modifiables.
export type HisongContextKey = 'scene' | 'recording' | 'lessons' | 'voice'
export const hisongContexts: { key: HisongContextKey; icon: string; blogSlug: string }[] = [
  { key: 'scene', icon: 'lucide:speaker', blogSlug: 'hisong-handpan-sur-scene' },
  { key: 'recording', icon: 'lucide:audio-lines', blogSlug: 'enregistrer-son-handpan-hisong' },
  { key: 'lessons', icon: 'lucide:graduation-cap', blogSlug: 'hisong-cours-de-handpan' },
  { key: 'voice', icon: 'lucide:mic-vocal', blogSlug: 'chanter-et-jouer-handpan-hisong' },
]

// Articles DÉJÀ publiés qui parlent du Hisong (affichés sous les contextes, si
// l'article existe dans la langue — sinon repli sur l'anglais puis le français).
export const hisongRelatedPosts = ['setup-nomade-neotone-bose-s1']

// ─────────────────────────────── Textes ───────────────────────────────

const fr = {
  title: 'Micro Hisong AirStudio S1 pour handpan et voix | David Lesage',
  description:
    'Le Hisong AirStudio S1, studio mobile sans fil (micro, retours, interface audio) pour la voix et le handpan, présenté par David Lesage. Vidéos, prix et code −5 %.',
  back: '← Retour à la boutique',
  eyebrow: 'Studio mobile pour la voix et le handpan',
  heroTitle: 'Le micro Hisong AirStudio S1',
  heroLead:
    'Un studio mobile tout-en-un, sans fil : micro, retours, interface audio. Ta voix et ton handpan acoustique, chez toi comme en live. Je l’utilise moi-même — voici tout ce qu’il faut savoir avant de l’acheter.',
  heroBadge: '−{pct} % avec mon code',
  ctaBuy: 'Acheter sur hisong.io',
  ctaVideos: 'Voir les vidéos',
  carouselAlt: 'Micro Hisong AirStudio S1',

  videoEyebrow: 'En vidéo',
  videoTitle: 'Le Hisong en situation',
  videoIntro: 'Mes vidéos avec le AirStudio S1, en pleine nature comme à la maison. D’autres arrivent.',

  boxTitle: 'Ce qu’il y a dans le studio',
  boxIntro: 'Tout ce qu’il faut pour chanter, jouer et enregistrer, dans un seul étui.',
  boxItems: [
    'Un micro double mode',
    'Des retours sans fil (écouteurs)',
    'Une interface audio',
    'Un récepteur sans fil pour téléphone (RX Mini)',
    'Un support magnétique',
    'Un étui de transport',
  ],
  boxNote:
    'Pour jouer en live, il te faut le RX Plus (Universal Pack) : c’est lui qui sort le son vers la sono, la table de mixage ou une caméra.',

  contextsEyebrow: 'Dans quels contextes',
  contextsTitle: 'Un même micro, plusieurs usages',
  contextsIntro:
    'Chaque usage aura bientôt son article détaillé, avec mes réglages et mes conseils. Les liens apparaissent ici au fur et à mesure de leur publication.',
  contexts: {
    scene: {
      t: 'Sur scène',
      d: 'Avec le RX Plus (Universal Pack), le son part vers la sono ou la table de mixage : ta voix et ton handpan acoustique, sans fil, en live.',
    },
    recording: {
      t: 'En enregistrement',
      d: 'Micro, retours et interface audio réunis : un studio portatif pour capter ton handpan et ta voix, chez toi ou en extérieur.',
    },
    lessons: {
      t: 'En cours',
      d: 'Se faire entendre clairement de ses élèves, voix et instrument, sans câble qui traîne entre le handpan et l’enceinte.',
    },
    voice: {
      t: 'Voix + handpan',
      d: 'Chanter en jouant : la voix et le handpan acoustique captés ensemble, avec le retour dans les écouteurs sans fil.',
    },
  } as Record<HisongContextKey, { t: string; d: string }>,
  contextSoon: 'Article à venir',
  contextRead: 'Lire l’article',
  relatedPostsTitle: 'Déjà publié sur le blog',
  relatedPostLangNote: { en: '(article en anglais)', fr: '(article en français)' } as Partial<Record<Lang, string>>,

  compareTitle: 'Quel micro pour mon handpan ?',
  compareIntro:
    'Le micro de ton téléphone ou de ton ordinateur suffit pour commencer. Ce matériel, je l’utilise moi-même : il sert quand la pièce est bruyante, pour la scène, ou pour jouer debout.',
  compareSource: 'Le même comparatif que dans l’écran « Matériel recommandé » de l’app Handpan Constellation Studio.',
  compareCols: { integre: 'Micro intégré (téléphone, ordinateur)', muling: 'Muling MP1', hisong: 'Hisong AirStudio S1' },
  compareRows: [
    { h: 'Ce qu’il capte', integre: 'Toute la pièce', muling: 'La coque (contact)', hisong: 'L’air autour, sans fil' },
    { h: 'Pour', integre: 'Commencer, pièce calme', muling: 'Handpan acoustique, scène, pièce bruyante', hisong: 'Voix + handpan, live (avec le RX Plus)' },
    { h: 'Mesuré avec l’app', integre: 'Test en cours', muling: 'Test en cours', hisong: 'Test en cours' },
  ],
  compareNote:
    'Ce qu’il ne change pas : deux frappes à moins de 0,4 s d’écart, l’app ne voit pas la 2ᵉ, quel que soit le micro. C’est une limite de l’app, pas de ton matériel.',
  compareMulingLink: 'Voir la page du micro Muling',

  priceTitle: 'Prix et achat',
  priceS1Label: 'Micro AirStudio S1 (Standard Pack)',
  priceRxLabel: 'Avec le RX Plus (Universal Pack, +90 €)',
  priceCodeLabel: 'S1 + RX Plus avec mon code (−{pct} %)',
  priceCodeExtra: 'livraison offerte',
  priceNote: 'Prix TTC, livraison en France : aucune TVA ne s’ajoute au paiement.',
  codeTitle: 'Mon code de réduction',
  codeText:
    'En passant par mon lien, il devrait s’appliquer tout seul. Si tu ne le vois pas au moment du paiement, saisis-le à la main — le bouton le copie.',
  copyCode: 'Copier le code',
  codeCopied: 'Copié !',
  adviceTitle: 'Mon conseil',
  adviceText:
    'Si tu veux utiliser le micro pour jouer en live, prends le RX Plus (Universal Pack) : c’est lui qui sort le son vers la sono, la table de mixage ou une caméra.',
  buyNote: 'L’achat se fait directement sur hisong.io. Démonstrations et achat en direct à mes rencontres à Paris.',
  ctaShowroom: 'L’essayer au showroom',

  relatedTitle: 'Et si tu joues sur un Neotone ?',
  relatedText:
    'Le Neotone se branche directement en jack, sans micro. Le Hisong garde tout son intérêt pour la voix : dans mon setup nomade, il se branche sur la Bose S1 Pro+ et transforme l’ensemble en mini-studio mobile.',
  relatedCta: 'Découvrir le Neotone',
}

type HisongCopy = typeof fr

const en: HisongCopy = {
  title: 'Hisong AirStudio S1 microphone for handpan and voice | David Lesage',
  description:
    'The Hisong AirStudio S1, a wireless mobile studio (mic, monitoring, audio interface) for voice and handpan, presented by David Lesage. Videos, prices and a −5% code.',
  back: '← Back to the shop',
  eyebrow: 'Mobile studio for voice and handpan',
  heroTitle: 'The Hisong AirStudio S1 microphone',
  heroLead:
    'An all-in-one wireless mobile studio: mic, monitoring, audio interface. Your voice and your acoustic handpan, at home or live. I use it myself — here is everything you need to know before buying it.',
  heroBadge: '−{pct}% with my code',
  ctaBuy: 'Buy on hisong.io',
  ctaVideos: 'Watch the videos',
  carouselAlt: 'Hisong AirStudio S1 microphone',

  videoEyebrow: 'On video',
  videoTitle: 'The Hisong in action',
  videoIntro: 'My videos with the AirStudio S1, out in nature and at home. More are on the way.',

  boxTitle: 'What’s in the studio',
  boxIntro: 'Everything you need to sing, play and record, in a single case.',
  boxItems: [
    'A dual-mode microphone',
    'Wireless in-ear monitoring',
    'An audio interface',
    'A wireless receiver for your phone (RX Mini)',
    'A magnetic stand',
    'A carrying case',
  ],
  boxNote:
    'To play live, you need the RX Plus (Universal Pack): it sends the sound to the PA, the mixing desk or a camera.',

  contextsEyebrow: 'Where to use it',
  contextsTitle: 'One mic, several uses',
  contextsIntro:
    'Each use will soon get its own detailed article, with my settings and tips. The links will appear here as they are published.',
  contexts: {
    scene: {
      t: 'On stage',
      d: 'With the RX Plus (Universal Pack), the sound goes to the PA or the mixing desk: your voice and your acoustic handpan, wireless, live.',
    },
    recording: {
      t: 'Recording',
      d: 'Mic, monitoring and audio interface in one: a portable studio to capture your handpan and your voice, at home or outdoors.',
    },
    lessons: {
      t: 'Teaching',
      d: 'Be heard clearly by your students, voice and instrument, with no cable running between the handpan and the speaker.',
    },
    voice: {
      t: 'Voice + handpan',
      d: 'Sing while you play: voice and acoustic handpan captured together, with monitoring in the wireless earbuds.',
    },
  },
  contextSoon: 'Article coming soon',
  contextRead: 'Read the article',
  relatedPostsTitle: 'Already on the blog',
  relatedPostLangNote: { fr: '(article in French)', en: '(article in English)' },

  compareTitle: 'Which mic for my handpan?',
  compareIntro:
    'Your phone’s or computer’s mic is enough to get started. I use this gear myself: it helps when the room is noisy, on stage, or to play standing.',
  compareSource: 'The same comparison as in the “Recommended gear” screen of the Handpan Constellation Studio app.',
  compareCols: { integre: 'Built-in mic (phone, computer)', muling: 'Muling MP1', hisong: 'Hisong AirStudio S1' },
  compareRows: [
    { h: 'What it picks up', integre: 'The whole room', muling: 'The shell (contact)', hisong: 'The air around, wireless' },
    { h: 'For', integre: 'Getting started, quiet room', muling: 'Acoustic handpan, stage, noisy room', hisong: 'Voice + handpan, live (with the RX Plus)' },
    { h: 'Measured with the app', integre: 'Test in progress', muling: 'Test in progress', hisong: 'Test in progress' },
  ],
  compareNote:
    'What it doesn’t change: two strikes less than 0.4 s apart, the app misses the 2nd, whatever the mic. That’s a limit of the app, not of your gear.',
  compareMulingLink: 'See the Muling microphone page',

  priceTitle: 'Prices and purchase',
  priceS1Label: 'AirStudio S1 mic (Standard Pack)',
  priceRxLabel: 'With the RX Plus (Universal Pack, +€90)',
  priceCodeLabel: 'S1 + RX Plus with my code (−{pct}%)',
  priceCodeExtra: 'free shipping',
  priceNote: 'VAT included, shipping to France: nothing is added at checkout.',
  codeTitle: 'My discount code',
  codeText:
    'If you go through my link it should apply on its own. If you don’t see it at checkout, enter it by hand — the button copies it.',
  copyCode: 'Copy the code',
  codeCopied: 'Copied!',
  adviceTitle: 'My advice',
  adviceText:
    'If you want to use the mic to play live, get the RX Plus (Universal Pack): it sends the sound to the PA, the mixing desk or a camera.',
  buyNote: 'You buy directly on hisong.io. Live demos and on-the-spot purchase at my Paris gatherings.',
  ctaShowroom: 'Try it at the showroom',

  relatedTitle: 'What if you play a Neotone?',
  relatedText:
    'The Neotone plugs straight in with a jack, no mic needed. The Hisong is still worth it for your voice: in my nomad setup, it plugs into the Bose S1 Pro+ and turns the whole thing into a mobile mini-studio.',
  relatedCta: 'Discover the Neotone',
}

const es: HisongCopy = {
  title: 'Micrófono Hisong AirStudio S1 para handpan y voz | David Lesage',
  description:
    'El Hisong AirStudio S1, estudio móvil inalámbrico (micrófono, monitores, interfaz de audio) para voz y handpan, presentado por David Lesage. Vídeos, precios y código −5%.',
  back: '← Volver a la tienda',
  eyebrow: 'Estudio móvil para la voz y el handpan',
  heroTitle: 'El micrófono Hisong AirStudio S1',
  heroLead:
    'Un estudio móvil inalámbrico todo en uno: micrófono, monitores, interfaz de audio. Tu voz y tu handpan acústico, en casa o en directo. Lo uso yo mismo: aquí tienes todo lo que debes saber antes de comprarlo.',
  heroBadge: '−{pct}% con mi código',
  ctaBuy: 'Comprar en hisong.io',
  ctaVideos: 'Ver los vídeos',
  carouselAlt: 'Micrófono Hisong AirStudio S1',

  videoEyebrow: 'En vídeo',
  videoTitle: 'El Hisong en situación',
  videoIntro: 'Mis vídeos con el AirStudio S1, en plena naturaleza y en casa. Llegarán más.',

  boxTitle: 'Qué incluye el estudio',
  boxIntro: 'Todo lo necesario para cantar, tocar y grabar, en un solo estuche.',
  boxItems: [
    'Un micrófono de doble modo',
    'Monitoreo inalámbrico (auriculares)',
    'Una interfaz de audio',
    'Un receptor inalámbrico para el teléfono (RX Mini)',
    'Un soporte magnético',
    'Un estuche de transporte',
  ],
  boxNote:
    'Para tocar en directo necesitas el RX Plus (Universal Pack): es el que envía el sonido al equipo de sonido, a la mesa de mezclas o a una cámara.',

  contextsEyebrow: 'En qué contextos',
  contextsTitle: 'Un mismo micrófono, varios usos',
  contextsIntro:
    'Cada uso tendrá pronto su artículo detallado, con mis ajustes y consejos. Los enlaces aparecerán aquí a medida que se publiquen.',
  contexts: {
    scene: {
      t: 'En el escenario',
      d: 'Con el RX Plus (Universal Pack), el sonido va al equipo de sonido o a la mesa de mezclas: tu voz y tu handpan acústico, sin cables, en directo.',
    },
    recording: {
      t: 'Para grabar',
      d: 'Micrófono, monitores e interfaz de audio reunidos: un estudio portátil para captar tu handpan y tu voz, en casa o al aire libre.',
    },
    lessons: {
      t: 'En clase',
      d: 'Que tus alumnos te oigan con claridad, voz e instrumento, sin cables entre el handpan y el altavoz.',
    },
    voice: {
      t: 'Voz + handpan',
      d: 'Cantar mientras tocas: la voz y el handpan acústico captados juntos, con el retorno en los auriculares inalámbricos.',
    },
  },
  contextSoon: 'Artículo próximamente',
  contextRead: 'Leer el artículo',
  relatedPostsTitle: 'Ya publicado en el blog',
  relatedPostLangNote: { en: '(artículo en inglés)', fr: '(artículo en francés)' },

  compareTitle: '¿Qué micrófono para mi handpan?',
  compareIntro:
    'Para empezar, basta con el micrófono de tu teléfono o tu ordenador. Este equipo lo uso yo mismo: sirve cuando la sala es ruidosa, en el escenario o para tocar de pie.',
  compareSource: 'La misma comparación que en la pantalla «Equipo recomendado» de la aplicación Handpan Constellation Studio.',
  compareCols: { integre: 'Micrófono incorporado (teléfono, ordenador)', muling: 'Muling MP1', hisong: 'Hisong AirStudio S1' },
  compareRows: [
    { h: 'Lo que capta', integre: 'Toda la habitación', muling: 'El cuerpo (contacto)', hisong: 'El aire de alrededor, inalámbrico' },
    { h: 'Para', integre: 'Para empezar, sala tranquila', muling: 'Handpan acústico, escenario, sala ruidosa', hisong: 'Voz + handpan, en directo (con el RX Plus)' },
    { h: 'Medido con la aplicación', integre: 'Prueba en curso', muling: 'Prueba en curso', hisong: 'Prueba en curso' },
  ],
  compareNote:
    'Lo que no cambia: si dos golpes están separados por menos de 0,4 s, la aplicación no detecta el 2.º, sea cual sea el micrófono. Es un límite de la aplicación, no de tu equipo.',
  compareMulingLink: 'Ver la página del micrófono Muling',

  priceTitle: 'Precios y compra',
  priceS1Label: 'Micrófono AirStudio S1 (Standard Pack)',
  priceRxLabel: 'Con el RX Plus (Universal Pack, +90 €)',
  priceCodeLabel: 'S1 + RX Plus con mi código (−{pct}%)',
  priceCodeExtra: 'envío gratuito',
  priceNote: 'IVA incluido, envío a Francia: no se añade nada al pagar.',
  codeTitle: 'Mi código de descuento',
  codeText:
    'Si usas mi enlace, debería aplicarse solo. Si no lo ves al finalizar la compra, introdúcelo manualmente: el botón lo copia.',
  copyCode: 'Copiar el código',
  codeCopied: '¡Copiado!',
  adviceTitle: 'Mi consejo',
  adviceText:
    'Si quieres usar el micrófono para tocar en directo, elige el RX Plus (Universal Pack): es el que envía el sonido al equipo de sonido, a la mesa de mezclas o a una cámara.',
  buyNote: 'La compra se hace directamente en hisong.io. Demostraciones y venta directa en mis encuentros en París.',
  ctaShowroom: 'Probarlo en el showroom',

  relatedTitle: '¿Y si tocas un Neotone?',
  relatedText:
    'El Neotone se conecta directamente por jack, sin micrófono. El Hisong sigue siendo útil para la voz: en mi setup nómada, se conecta a la Bose S1 Pro+ y convierte el conjunto en un mini estudio móvil.',
  relatedCta: 'Descubrir el Neotone',
}

export const hisongText: Record<Lang, HisongCopy> = { fr, en, es }
