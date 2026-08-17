import type { Lang } from './config'

// ============================================================
// Dictionnaire de contenu FR / EN.
// Même forme exacte pour les deux langues (typée via `typeof fr`).
// Les données neutres (prix, TVA, chemins d'images, icônes) restent
// dans src/data/*. Ici : tout ce qui est texte.
// ============================================================

const fr = {
  common: {
    nav: {
      home: 'Accueil',
      neotone: 'Le Neotone',
      yishama: 'Yishama',
      shop: 'Boutique',
      lessons: 'Cours',
      studio: 'Handpan Compagnon',
      blog: 'Blog',
      showroom: 'Showroom',
      about: 'À propos',
      contact: 'Contact',
    },
    brandSub: 'Musique visible',
    tagline: 'Rendre la musique visible et accessible — par les couleurs, la géométrie et les émotions.',
    headerCta: "Venir l'essayer à Paris",
    footer: {
      resources: 'Ressources',
      navigation: 'Navigation',
      contact: 'Contact',
      learnHandpan: 'Apprendre le handpan',
      electricVsAcoustic: 'Électronique vs acoustique',
      chooseHandpan: 'Quel handpan choisir',
      newsletter: 'Newsletter',
      faq: 'FAQ',
      legal: 'Mentions légales',
      terms: 'Conditions générales',
      rights: 'Ambassadeur indépendant Neotone · Tous les prix sont indicatifs et peuvent évoluer sans préavis.',
    },
    skip: 'Aller au contenu',
    // ── CONDITIONS GÉNÉRALES — case obligatoire de TOUS les formulaires ───────
    // (17/08/2026) Un seul texte, un seul lien, partout : réservation, contact,
    // liste d'attente, commande Muling. Rendu par src/components/TermsCheckbox.astro.
    // `check` contient `{link}` : le composant y insère le lien vers
    // /conditions-generales (localisé). Ne pas retirer le marqueur.
    terms: {
      check: 'J’accepte les {link}',
      link: 'conditions générales',
      hint: 'Elles disent comment j’utilise tes coordonnées, ce à quoi tu t’engages en réservant, et comment te désinscrire quand tu veux.',
      required: 'Pour continuer, tu dois accepter les conditions générales.',
    },
    // ── ÊTRE INFORMÉ DES NOUVEAUTÉS — case FACULTATIVE de tous les formulaires ─
    // (17/08/2026) SÉPARÉE de `terms` juste au-dessus, et elle doit le rester :
    // accepter les conditions générales n'est PAS un accord pour recevoir de la
    // prospection. Facultative, jamais pré-cochée, jamais bloquante.
    // Rendue par src/components/NewsCheckbox.astro.
    news: {
      check: 'Je veux être informé·e des prochaines dates et des nouveautés',
      optional: 'facultatif',
      hint: 'Nouvelles dates de showcase, ouverture de l’application, nouveaux instruments. J’écris peu, et tu te désinscris en un clic. Si tu ne coches pas, je ne t’écris que pour ta demande.',
    },
    credentials: ['Prix du Conservatoire', 'The Voice · Saison 11', 'Ambassadeur Neotone · Yishama · Maison du Ngoni', 'Showroom Paris 20ᵉ'],
    beta: {
      badge: 'Accès limité',
      title: 'L’application n’est pas encore ouverte au grand public',
      text: 'Handpan Compagnon est actuellement utilisé par un petit groupe de bêta-testeurs, le temps de peaufiner l’expérience. Ils y ont accès gratuitement, en échange de leurs retours.',
      wish: 'Tu souhaites devenir bêta-testeur ? Coche la case dans le formulaire et dis-moi en quelques mots pourquoi l’application t’intéresse et comment tu comptes l’utiliser — je lis et je réponds personnellement.',
      more: 'Accès à l’application',
      // Libellés des boutons pendant la bêta fermée (les prix restent affichés,
      // mais on ne promet pas un accès immédiat).
      ctaWaitlist: 'Rejoindre la liste d’attente',
      priceClosedNote:
        'Ces tarifs sont donnés à titre indicatif : ce seront ceux de l’ouverture publique. L’application entière — formule Découverte gratuite comprise — n’est pas encore ouverte : aucune formule n’est accessible aujourd’hui. Elle est utilisée par un petit groupe de bêta-testeurs, qui y ont accès gratuitement en échange de leurs retours. La liste d’attente est la seule porte d’entrée pour l’instant, quelle que soit la formule qui t’intéressera à l’ouverture. Envie de faire partie des bêta-testeurs ? Dis-moi ci-dessous pourquoi l’application t’intéresse — je lis et je réponds personnellement.',
      formTitle: 'Être prévenu·e de l’ouverture',
      formFirst: 'Prénom',
      formLast: 'Nom',
      formEmail: 'Email',
      formHandpan: 'Tu as déjà un handpan ?',
      formHandpanYes: 'Oui',
      formHandpanNo: 'Non',
      formHandpanPlanning: 'Je compte en acheter un',
      formHandpanType: 'Quel type ?',
      formHandpanTypeAcoustic: 'Acoustique',
      formHandpanTypeElectronic: 'Électronique',
      formHandpanTypeBoth: 'Les deux',
      formUsage: 'Pour quoi vas-tu utiliser Handpan Compagnon ?',
      formUsageHint: 'Coche tout ce qui te correspond. Ce que tu déclares détermine ton accès — si plusieurs cases s’appliquent, c’est la plus engageante qui compte.',
      formUsagePersonal: 'Pour moi — apprendre, jouer, composer',
      formUsagePersonalDeal: 'Gratuit. Tes créations restent à toi ; les exports portent un filigrane.',
      formUsageTeacher: 'Pour enseigner — je m’en sers comme outil dans des cours que je fais payer',
      formUsageTeacherDeal: 'Licence Enseignant : espace élèves, exercices, partitions, exports sans filigrane. En construction — les premiers profs la conçoivent avec moi.',
      formUsageMaker: 'Pour fabriquer — je conçois et j’accorde des handpans',
      formUsageMakerDeal: 'Tu es un créateur. Dis-moi ce que tu sais produire et tu entres dans le catalogue des fabricants de l’app : les gens te choisissent au moment où ils conçoivent le handpan de leurs rêves, selon ta localisation et tes capacités. Je t’apporte des clients, je prends un pourcentage, et tu leur fais un prix de mise en relation. Je ne travaille qu’avec des fabricants alignés, qui font un travail de qualité.',
      formUsageOther: 'Autre / je ne sais pas encore',
      formUsageBoth: 'Les deux',
      formStudentCount: 'Combien d’élèves suis-tu en ce moment ?',
      formStudentCountNone: 'Aucun pour l’instant',
      formStudentCount1: '1 à 5',
      formStudentCount6: '6 à 20',
      formStudentCount20: 'Plus de 20',
      formMakerLegend: 'Ta fiche fabricant',
      formMakerHint: 'C’est ce qui te fera apparaître dans le catalogue, avec les bonnes personnes en face.',
      formMakerCountry: 'Où fabriques-tu ?',
      formMakerCountryPlaceholder: 'Pays, ville',
      formMakerNotes: 'Jusqu’à combien de notes par instrument ?',
      formMakerNotes9: '9 ou moins',
      formMakerNotes10: '10 à 13',
      formMakerNotes14: '14 à 17',
      formMakerNotes18: '18 et plus',
      formMakerNotesVaries: 'Ça dépend des gammes',
      formMakerMetals: 'Quels métaux travailles-tu ?',
      formMakerMetalNitrided: 'Acier nitruré',
      formMakerMetalStainless: 'Inox',
      formMakerMetalEmber: 'Ember steel',
      formMakerMetalOther: 'Autre',
      formMakerPricing: 'Tes gammes de prédilection, tes tarifs, tes délais',
      formMakerPricingPlaceholder: 'Ex. : D Kurd 9 notes, 1 400 € — délai 3 mois.',
      formPledgeTitle: 'On est clairs ?',
      formPledgeText: 'Je construis cet outil seul. Ce que tu déclares ici détermine ton accès — ce n’est pas un contrôle, c’est un accord. Si ton usage change (tu te mets à enseigner avec, par exemple), dis-le moi : on ajuste, simplement.',
      formPledgeCheck: 'Je m’engage sur l’honnêteté de ce que j’ai déclaré.',
      formRolesRequired: 'Coche au moins une case : c’est le cœur de la demande.',
      formPersonalGoal: 'Pour quoi faire ?',
      formPersonalGoalLearn: 'Apprendre à jouer',
      formPersonalGoalCompose: 'Composer, créer mes gammes',
      formShowcase: 'Je souhaite être informé·e des prochains showcases gratuits à Paris',
      formBeta: 'Je souhaite devenir bêta-testeur — accès anticipé et gratuit à l’application, en échange de mes retours réguliers.',
      formMotivation: 'Pourquoi l’application t’intéresse ? (facultatif)',
      formMotivationBeta: 'Pourquoi souhaites-tu devenir bêta-testeur ?',
      formMotivationHint: 'Dis-moi en quelques mots pourquoi elle t’intéresse et comment tu comptes l’utiliser : ta réponse vaut candidature pour rejoindre les bêta-testeurs. Je lis tout, personnellement.',
      formMotivationPlaceholder: 'Ce que je cherche, comment je joue, ce que j’aimerais faire avec…',
      formSubmit: 'Je souhaite avoir accès à l’app dès sa sortie publique',
      formSending: 'Enregistrement…',
      formError: 'Impossible d’enregistrer ton inscription. Réessaie, ou écris-moi directement.',
      formPrivacy: 'Ton email ne sert qu’à te prévenir de l’ouverture. Pas de spam, désinscription à tout moment.',
    },
    emotions: ['Équilibre', 'Élan', 'Aventure', 'Détente', 'Tension', 'Nostalgie', 'Mystère'],
  },
  home: {
    title: 'Apprendre le handpan autrement — David Lesage',
    description:
      'Le handpan acoustique Yishama, le handpan électronique Neotone et ma méthode par les couleurs : apprends le handpan autrement, avec Handpan Compagnon. Viens les essayer à Paris.',
    heroEyebrow: 'Musicien · Pédagogue · Inventeur',
    heroTitleA: 'Je rends la musique',
    heroTitleHighlight: 'visible',
    heroTitleB: 'et accessible à tous',
    heroLead: 'Par les couleurs, la géométrie et les émotions. De l’enfant curieux au musicien confirmé — je t’accompagne personnellement.',
    ctaShowroom: "Venir l'essayer à Paris",
    ctaMethod: 'Découvrir mon application pédagogique',
    universHeading: 'Le matériel, les cours et l’application',
    universEyebrow: 'Une seule vision, plusieurs chemins',
    universIntro: 'Tout part d’une même idée : rendre la musique compréhensible, mémorisable et jouable par tous.',
    univers: [
      { sub: 'Acoustique & électronique', title: 'Les instruments & micros', text: 'Un handpan acoustique Yishama, un handpan électronique Neotone, des micros — deux univers que j’accompagne à égalité.', cta: 'Voir les deux univers' },
      { sub: 'Visio & présentiel', title: 'Les cours', text: 'Apprends le handpan autrement : par les couleurs, les formes et les émotions. Partout dans le monde, ou à Paris.', cta: 'Voir les cours' },
      { sub: 'L’application', title: 'Handpan Compagnon', text: 'L’app qui rend la musique visible — couleurs, géométrie et émotions transforment ta façon d’apprendre et de jouer.', cta: 'Découvrir l’app' },
    ],

    // ============================================================
    // « Le monde du ET » — acoustique ET électronique, à poids égal.
    // Principe éditorial voulu par David : pas de compétition, de la
    // COMPLÉTION. Deux univers qui coexistent. Rien ici n'est inventé :
    // Yishama = ambassadeur et affilié (rien de signé) · Neotone =
    // handpan électronique fabriqué par Soundventure, David bêta-testeur
    // depuis 2023 · « 🎯 Compléter » et le mode Hybride sont des
    // fonctions réellement livrées dans l'app.
    // ⚖️ Les deux cartes doivent rester STRICTEMENT symétriques :
    // même image (même séance photo), même nombre de puces, même CTA.
    // ============================================================
    duoEyebrow: 'Le monde du ET',
    duoTitleA: 'Acoustique',
    duoTitleAnd: 'et',
    duoTitleB: 'électronique',
    duoIntro: 'Pas de compétition : de la complétion. Deux univers qui coexistent — je joue les deux, et aucun ne remplace l’autre.',
    duo: [
      {
        sub: 'Handpan acoustique · Yishama',
        title: 'Le métal qui respire',
        text: 'Deux instruments de 18 notes accordés en 432 Hz, dessinés avec Yonathan pour que je puisse chanter en m’accompagnant. Le son sort du métal — rien entre lui et toi.',
        points: ['Le timbre et les harmoniques du métal martelé', 'Ni câble ni batterie : il joue partout, tout de suite', 'Je suis ambassadeur et affilié Yishama'],
        cta: 'Mon histoire avec Yishama',
        alt: 'David Lesage tenant l’un de ses handpans acoustiques Yishama',
      },
      {
        sub: 'Handpan électronique · Neotone',
        title: 'Le clavier des gammes',
        text: 'Le handpan électronique fabriqué par Soundventure, dont je suis bêta-testeur depuis 2023. Toutes les gammes dans un seul instrument, au casque comme sur scène.',
        points: ['Toutes les gammes dans un seul instrument', 'Volume réglable, jeu au casque, enregistreur intégré', 'Je suis ambassadeur officiel Neotone'],
        cta: 'Découvrir le Neotone',
        alt: 'David Lesage avec deux handpans électroniques Neotone',
      },
    ],
    duoBridgeEyebrow: 'Le trait d’union',
    duoBridgeTitle: 'Mon application parle les deux langues',
    duoBridgeText: 'Handpan Compagnon a un mode acoustique et un mode électronique. Quand ta gamme acoustique ne suffit plus, la fonction « 🎯 Compléter » te dit exactement quelles notes te manquent — et ce qu’apporterait un second handpan acoustique, ou un Neotone. Le mode Hybride trace ensuite tes accords à cheval sur les deux coques. Complétion, pas compétition.',
    duoBridgeCta: 'Découvrir Handpan Compagnon',

    whyEyebrow: 'Pourquoi moi',
    whyTitle: 'L’outil que j’aurais rêvé qu’on m’enseigne, enfant',
    whyP1: 'J’ai commencé la batterie à 4 ans. Dès le premier cours, on m’a imposé le solfège — un langage déconnecté de mon envie de jouer. J’ai tout arrêté pour apprendre à l’oreille, en autodidacte.',
    whyP2: 'Au Conservatoire, j’en suis ressorti avec un prix de batterie mention très bien… mais découragé par une pédagogie de l’harmonie qui ne me parlait pas. Alors j’ai créé l’outil qui m’a manqué : une approche visuelle de la musique.',
    whyCta: 'Lire mon histoire',
    showroomBadge: '★ Première mondiale',
    showroomTitle: 'Le seul endroit au monde pour tester et repartir avec ton Neotone',
    showroomText: 'À Paris 20ᵉ, viens essayer les instruments, rencontrer la communauté, et repars le jour même avec ton handpan — sans aucun délai de fabrication, au meilleur prix du marché (−7 %).',
    showroomArgs: ['7 % de remise — le meilleur prix (contre 5 % en ligne)', 'Aucun délai de fabrication ni d’attente', 'Stock ultra limité — quelques instruments disponibles'],
    showroomCta1: 'Réserver ma venue au showroom',
    showroomCta2: 'Voir le prochain showcase',
    showroomDatesTitle: 'Prochains showcases gratuits',
    showroomDatesNote: 'Entrée libre · réservation conseillée',
    showroomDatesEmpty: 'Prochaines dates en préparation — écris-moi pour être prévenu·e en premier.',
    showroomDatesAll: 'Voir tout l’agenda',
    communityEyebrow: 'La communauté',
    communityTitle: 'Rejoins le mouvement de la musique visible',
    communityIntro: 'Sois prévenu·e des prochains showcases à Paris et de la sortie de Handpan Compagnon. Pas de spam — juste l’essentiel.',
    communityPlaceholder: 'ton@email.fr',
    communityButton: 'Préviens-moi des prochains showcases',
    communityNote: 'Ton logiciel de mail s’ouvre avec un message déjà rédigé — tu n’as plus qu’à l’envoyer.',
    proofEyebrow: 'Le son d’abord',
    proofTitle: 'Voir et entendre les instruments vivre',
    proofIntro: 'Je joue, je démontre, je transmets — l’acoustique et l’électronique en vidéo. Mes deux playlists complètes juste en dessous.',
    proofVideos: ['Performance musicale au Neotone', 'Shape of My Heart — sur mes deux Yishama', 'Créer sa gamme — tutoriel'],
    proofCta: 'Voir toute la playlist Neotone',
    proofCtaYishama: 'Voir toute la playlist Yishama',
  },
  neotone: {
    title: 'Neotone — handpan électronique & numérique | David Lesage',
    description:
      'Le Neotone, accompagné par David Lesage : −5 % en ligne (−7 % au showroom), garantie 6 ans, calculateur de prix par pays et accompagnement humain de l’essai au déballage.',
    heroEyebrow: 'Le matériel · Handpan numérique',
    heroTitle: 'Le Neotone, le meilleur handpan électronique au monde',
    heroLead:
      'En passant par moi, ambassadeur officiel Neotone, tu obtiens <strong class="text-cream">−5 % en ligne</strong> (ou <strong class="text-cream">−7 % au showroom</strong>), la <strong class="text-cream">garantie 6 ans</strong> et un accompagnement personnel — de l’essai jusqu’au déballage.',
    ctaCalc: 'Calculer mon prix',
    ctaShowroom: 'Réserver ma venue au showroom',
    modelsEyebrow: 'Les deux modèles',
    modelsTitle: 'Choisis l’instrument qui te ressemble',
    modelsIntro: 'Toutes les gammes. Un seul instrument.',
    fromPrice: 'À partir de',
    woodsEyebrow: 'Les bois premium',
    woodsTitle: 'Cinq essences, cinq caractères',
    woodsIntro: 'Le frêne et le chêne sont inclus dans le prix de base. Trois autres essences nobles sont disponibles en option — chacune avec sa teinte et son caractère.',
    woodCardCta: 'Voir le détail',
    woodModalEyebrow: 'Essence de bois',
    woodModalViewTop: 'Vue du dessus',
    woodModalViewBottom: 'Vue du dessous',
    techEyebrow: 'Sous la coque',
    techTitle: 'Une technologie de précision, assemblée à la main',
    techText:
      'Chaque Neotone¹ est conçu et assemblé artisanalement à Budapest. Sous le bois noble, des capteurs millimétriques détectent simultanément frappe, pression et position pour reproduire fidèlement la dynamique d’un handpan acoustique. Une électronique audio professionnelle — DAC 24 bits / 384 kHz, latence 5 ms, rapport signal/bruit 112 dB — en fait un instrument numérique sans compromis.',
    specsTitle: 'Spécifications techniques officielles',
    stageEyebrow: 'Scène & Studio',
    stageTitle: 'Le handpan numérique de référence',
    stageIntro: 'Un seul handpan, une infinité de possibilités : le Neotone lève les contraintes de l’acoustique et ouvre un terrain de jeu inédit.',
    stage: [
      { t: 'Fini les galères de sonorisation', d: 'Plus de Larsen ni de difficulté à s’entendre. Un seul câble jack, une balance réglée en quelques secondes — et tu peux boucler ton jeu et brancher tes pédales.' },
      { t: 'Un studio dans l’instrument', d: 'Enregistreur intégré : maintiens le ding pour lancer une captation. Le son est pris à la source, en qualité studio, même en environnement bruyant.' },
      { t: 'Ta bulle, au casque', d: 'Branche un casque et joue sans déranger personne — la nuit, en appartement, en tournée. Une pureté sonore exceptionnelle.' },
    ],
    compEyebrow: 'Acoustique vs Neotone',
    compTitle: 'Le handpan acoustique a ses limites —<br><span class="text-copper">le Neotone les lève</span>',
    compIntro: 'Ce que l’électronique change, concrètement.',
    compLegendAco: 'Handpan acoustique',
    compLegendNeo: 'Neotone électronique',
    calcEyebrow: 'Calculateur de prix',
    calcTitle: 'Combien va vraiment me coûter mon Neotone ?',
    calcIntro: 'Choisis ton mode d’achat, ton modèle, ton bois et ton pays — le calculateur applique la bonne remise et la TVA 2026.',
    calcDisclaimer:
      'Les prix publics affichés incluent déjà l’envoi mondial. Taux de TVA standards 2026. Hors UE : aucune TVA UE appliquée, mais des frais de douane locaux peuvent s’ajouter à la livraison, à ta charge.',
    procEyebrow: 'Procédure d’achat',
    procTitle: 'De ta première question à la réception',
    procIntro: 'Un parcours simple et transparent, accompagné de bout en bout. Deux façons de repartir avec ton Neotone :',
    procHighlight: 'En venant au showroom à Paris, tu repars avec ton instrument le jour même — sans aucun délai de fabrication.',
    procOnlineTitle: 'En ligne — livraison mondiale',
    procShowroomTitle: 'En présentiel — Paris 20ᵉ',
    inclEyebrow: 'Tout inclus dans le prix',
    inclTitle: 'Ce que tu reçois',
    extrasEyebrow: 'À prévoir en plus',
    extrasTitle: 'Ce qu’il faudra acheter en plus',
    extrasIntro: 'Le Neotone est complet, mais pour l’entendre et l’exploiter à fond, prévois ce petit matériel selon ton usage.',
    extrasSpeakerCta: 'Lire : bien se placer dans le son',
    extrasHeadphonesCta: 'Lire : quel casque choisir',
    bridgeEyebrow: 'Ton Neotone + la méthode visuelle',
    bridgeTitle: 'Apprends par les couleurs et les formes',
    bridgeText: 'Avec Handpan Compagnon, tu apprends par les couleurs et les formes — sur ton Neotone comme sur un handpan acoustique.',
    bridgeCta: 'Découvrir la méthode',
    trustEyebrow: 'Gage de confiance',
    trustTitle: 'Je connais personnellement ceux qui fabriquent ton Neotone',
    trustP1: 'Je me suis rendu plusieurs fois dans les ateliers, en Hongrie. Je connais personnellement Csaba et Norbert — les deux amis à l’origine du Neotone — ainsi que toute l’équipe : Gergely, Dániel et les artisans de MAG Instruments, et Yonathan de Yishama.',
    trustP2: 'Je suis beta-testeur officiel de la marque depuis 2023. Depuis le tout premier Neotone¹, j’ai remonté et fait corriger des milliers de bugs et proposé d’innombrables améliorations. En passant par moi, tu n’as pas un simple revendeur : tu as quelqu’un qui vit l’instrument de l’intérieur et le fait évoluer.',
    trustYishamaLink: 'Mon histoire avec Yonathan et mes deux handpans Yishama',
    trustCaption1: 'Session de test et de debug avec l’équipe, à l’atelier.',
    trustCaption2: 'Avec l’équipe Neotone lors d’une de mes visites en Hongrie.',
    faqEyebrow: 'FAQ',
    faqTitle: 'Toutes les réponses avant de te lancer',
    faqOutro: 'As-tu d’autres questions ? Écris-moi à',
  },
  // ============================================================
  // Page /yishama — mes deux handpans acoustiques et l'histoire
  // avec Yonathan. ⚠️ Tout ce qui est écrit ici est SOURCÉ (récit
  // de David, lettre d'intention du 22/11/2022, échanges WhatsApp,
  // ancien site Wix, site yishama.com). Ne rien ajouter qui ne le
  // soit pas : chiffres d'argent, termes contractuels et vie privée
  // sont volontairement absents.
  // ============================================================
  yishama: {
    title: 'Mes handpans Yishama — deux instruments pour une voix | David Lesage',
    description:
      'L’histoire de ma rencontre avec Yonathan et Yishama : deux handpans acoustiques de 18 notes accordés en 432 Hz, conçus sur mesure pour accompagner ma voix — et ce qu’ils ont fini par produire.',
    heroEyebrow: 'Mes instruments acoustiques',
    heroTitle: 'Yishama — deux handpans nés d’une rencontre',
    heroLead:
      'Deux instruments de 18 notes, accordés en <strong class="text-cream">432 Hz</strong>, dessinés avec <strong class="text-cream">Yonathan</strong> pour une seule raison : que je puisse chanter en m’accompagnant. Voici leur histoire — et ce qu’ils m’ont appris.',
    heroCtaVideo: 'Écouter Shape of My Heart',
    heroCtaStory: 'Lire l’histoire',
    heroImgAlt: 'David Lesage tenant l’un de ses deux handpans Yishama, notes du dessous visibles',

    metEyebrow: 'Naxos, Grèce · 2022',
    metTitle: 'Un homme croisé par hasard, le lendemain d’un concert',
    metP1:
      'J’avais donné un concert handpan et voix la veille au soir. Le lendemain, je croise un homme au bar extérieur du festival. Je ne sais pas qui il est. On m’explique que c’est l’un des meilleurs fabricants de handpan au monde.',
    metP2:
      'Je lui raconte mon rêve, celui que je porte depuis des années : « un piano de handpan ». Pouvoir chanter, jouer des reprises, accompagner ma voix — sans tourner en rond dans un seul mode.',
    metP3:
      'Il m’a longuement écouté, calmement. Il n’a pas essayé de me vendre ses instruments. Il m’a même dit qu’avec mon jeu très percussif, il n’était pas sûr que les siens me conviennent.',
    metP4:
      'Ce jour-là, sur cette petite île, j’ai découvert le monde international du handpan : des instruments avec des notes au-dessus et en dessous, des graves profonds, une qualité que je ne soupçonnais même pas.',
    metQuote:
      'Quand j’ai rencontré Yonathan, le CEO de Yishama, et Andréa sa femme, j’ai senti tout de suite la finesse et la profondeur de l’être que j’avais en face de moi.',
    metQuoteSource: 'Ce que j’écrivais à l’époque, sur mon ancien site',
    metPhotoAlt: 'David Lesage avec Yonathan et Andréa de Yishama',
    metPhotoCaption: 'Avec Yonathan et Andréa — le début d’une longue histoire.',

    roomEyebrow: 'Festival HUG, Hongrie',
    roomTitle: 'Il est monté dans ma chambre avec un crayon',
    roomP1:
      'Quelques mois plus tard, au festival HUG en Hongrie, Yonathan est monté dans ma chambre avec Andréa. Il a commencé à me poser des questions. Et à dessiner.',
    roomP2:
      'Je n’y comprenais pas grand-chose : je n’ai aucune compétence d’ingénierie. Je savais seulement ce que je voulais <em>entendre</em>. Lui traduisait ça en creux, en épaisseurs, en octaves. Une seule chose technique m’importait : un maximum de notes bombées en dessous, comme des dings — elles sonnent bien plus facilement que les notes en creux.',
    roomP3:
      'Pour tout le reste, je lui ai remis ma totale confiance. C’est là qu’il a décidé de faire de moi un ambassadeur de sa marque. Mais avant ça, il s’était intéressé à moi — vraiment, sincèrement. Puis il m’a accueilli chez lui à Budapest avant que je reprenne l’avion.',
    roomAside:
      'Il m’avait déjà envoyé, quelques mois plus tôt, le lien de leur <em>Virtual Pantam</em> : « construis l’instrument dont tu rêves dans l’app, puis envoie-moi le lien de ce que tu as dessiné ». On s’est échangé ces liens dans les deux sens pendant des semaines.',

    whyEyebrow: 'La raison d’être',
    whyTitle: 'Pourquoi deux handpans — et pourquoi ceux-là',
    whyIntro: 'Ce ne sont pas deux instruments côte à côte. C’est un seul système en deux morceaux, pensé pour une voix.',
    whyP1:
      'Le handpan est un instrument magnifique et têtu. Une gamme, c’est un choix — donc une renonciation. Neuf ou dix notes, et il manquera toujours <strong>celle</strong> qui rendrait jouable l’accord dont tu rêves.',
    whyP2:
      'Pour un chanteur, c’est pire. Accompagner une voix demande des <strong>basses fondamentales</strong> : sans elles, on joue des renversements, et la voix n’a plus de sol sous les pieds. Je voulais poser mon chant sur la note la plus grave de chaque accord, puis monter l’arpège — D3-F♯3-A3 posé sur un D2, B♭2-D3-F3-B♭3.',
    whyP3:
      'Ma demande tenait en une phrase : deux instruments qui, ensemble, me donnent tous les dièses et tous les bémols. Pour chanter dans n’importe quelle tonalité, avec la fondamentale de chaque accord dans le grave.',
    whyQuote:
      'Mon rêve est de pouvoir chanter et m’accompagner facilement au handpan dans toutes les tonalités, avec l’ambitus le plus grand possible, sans être limité par le manque de notes.',
    whyQuoteSource: 'Lettre d’intention — 22 novembre 2022',
    why432Title: 'Et pourquoi 432 Hz',
    why432Text:
      'Je suis passionné par l’impact de la vibration sur l’eau et sur le corps — la cymatique. C’est pour ça que j’ai demandé à Yonathan un accordage basé sur le la 432 Hz. Il m’a répondu que c’était possible, mais qu’il devait en être certain <em>avant</em> de commencer à accorder : sur un handpan, ce choix-là ne se refait pas.',

    insEyebrow: 'Les deux instruments',
    insTitle: 'Dix-huit notes chacun, reçus en mai 2023',
    insIntro:
      'Ils sont arrivés en caisses de bois sécurisées, coques de transport comprises — presque le jour de mon anniversaire.',
    insDing: 'Ding',
    insTop: 'Dessus',
    insBottom: 'Dessous',
    insNotes: 'notes',
    insTuning: 'Accordés en 432 Hz',
    insFootnote:
      'Ce sont des pièces uniques : leurs noms sont mes libellés de travail, pas des modèles du catalogue Yishama. Chaque instrument, seul, donne les sept degrés de sa gamme avec la fondamentale disponible dans le grave.',

    pairEyebrow: 'Ensemble',
    pairTitle: 'Un handpan chromatique, en deux pièces',
    pairIntro:
      'Séparément, chacun couvre sa gamme. Réunis, leurs 36 notes couvrent les douze demi-tons — sans exception.',
    pairP1:
      'Les 24 accords majeurs et mineurs deviennent jouables, et <strong>chacun dispose de sa fondamentale dans le grave</strong>. C’est-à-dire exactement ce que j’avais demandé : ne plus jamais être obligé de jouer un renversement faute de basse.',
    pairP2:
      'Yonathan a construit, sans qu’on le nomme jamais comme ça, un handpan chromatique en deux pièces. Il les a d’ailleurs pensés comme un système : il a retiré une note du premier parce que je l’avais déjà sur le second — pour libérer la place d’une autre.',
    pairHonest:
      'Une nuance honnête : ceci décrit la <em>disponibilité des notes</em>, pas encore la fluidité du geste. Passer d’un pan à l’autre en cours d’accord reste une gymnastique. C’est précisément ce problème-là qui a fini par produire mon application.',
    pairFactLabels: { notes: 'notes au total', keys: 'tonalités', chords: 'accords majeurs & mineurs', tuning: 'diapason' },
    pairPhotoAlt: 'David Lesage jouant ses deux handpans Yishama côte à côte',
    pairPhotoCaption: 'Les deux instruments côte à côte — image de la reprise de Shape of My Heart.',

    metalEyebrow: 'Le métal',
    metalTitle: 'Trois aciers, trois voix',
    metalIntro:
      'Chez Yishama, le métal n’est pas un détail de finition : c’est le premier choix, celui qui décide du timbre, du sustain et de l’entretien. Trois familles sont proposées — clique pour le détail.',
    metalCardCta: 'Voir le détail',
    metalModalEyebrow: 'Acier de fabrication',
    metalModalClose: 'Fermer',
    metalLabelSound: 'Le son',
    metalLabelCare: 'L’entretien',
    metalLabelBest: 'Idéal pour',
    metalSource:
      'Source : article « Nitrided handpan vs stainless handpan » publié par Yishama, et leur catalogue. Le prix d’un Yishama varie selon la gamme, le nombre de notes, les notes du dessous et le type de matériau.',
    metalNote:
      'Depuis 2021, chaque Yishama porte une gravure laser à l’intérieur : numéro de série, nom de la gamme, et type de matériau avec son épaisseur.',

    makerEyebrow: 'Le fabricant',
    makerTitle: 'Qui est Yishama',
    makerIntro:
      'Une maison israélienne, présente aussi en Hongrie, qui fait partie des meilleurs fabricants de handpan au monde.',
    makerP1:
      '« Yishama » vient de l’hébreu (יִשָּׁמַע) et signifie <em>être entendu</em>. Leur intention, telle qu’ils la formulent : créer une sculpture sonore qui offre à chacun une expérience unique d’exploration de soi, par le son, le rythme et l’harmonie. Leur devise tient en une ligne : « At Yishama, we strive for quality and passion. »',
    makerP2:
      'Yonathan et son équipe fabriquent des instruments avec des basses très profondes et des aigus étincelants. Quand j’ai entendu Kabeção, Nadishana, David Kuckhermann, Alexandre Lora ou Flavio Salvaje jouer sur ces instruments, j’ai compris que c’était avec ceux-là que je voulais œuvrer.',
    makerFactsTitle: 'Ce qu’ils disent eux-mêmes',
    makerFacts: [
      { t: 'Chaque instrument est signé', d: 'Depuis 2021, une gravure laser à l’intérieur donne le numéro de série, le nom de la gamme et le matériau avec son épaisseur.' },
      { t: 'Le format', d: 'Environ 55 cm de diamètre au bord extérieur, 28 cm de hauteur du fond au sommet du ding, et 4,4 kg sur la plupart des modèles.' },
      { t: 'Le premier réaccordage est offert', d: 'Avec une technique de jeu correcte, un Yishama reste juste pendant des années. Le premier réaccordage est gratuit — seuls les frais de port restent à ta charge.' },
      { t: 'Chaque pièce est unique', d: 'Pas de délai annoncé à l’avance : la fabrication est artisanale et sur mesure. Ils gardent parfois quelques instruments disponibles immédiatement.' },
    ],
    makerCta: 'Découvrir les handpans Yishama',
    makerDisclosure:
      'Transparence : je suis ambassadeur et affilié Yishama. Si tu passes par mon lien, je touche une commission — ça ne change rien à ton prix. Je ne représente que des fabricants dont j’aime vraiment le travail.',

    videosEyebrow: 'En musique',
    videosTitle: 'Ce que j’ai enregistré avec eux',
    videosIntro:
      'Une reprise de Sting, une prière, une chanson populaire hongroise, du rap français. Tout est joué sur les deux Yishama, en 432 Hz.',
    videosFeaturedLabel: 'La vidéo qui a touché Yonathan',
    videosFeaturedTitle: 'Shape of My Heart — Sting',
    videosFeaturedText:
      'Quand je la lui ai envoyée, il m’a répondu : « wow wow wow very very beautiful! […] your voice is incredible, touch my heart very much! I would love to share this with our Yishama audience. »',
    videosPlaylistCta: 'Voir toute la playlist Yishama',
    videosWatch: 'Regarder',

    // ⚠️ Passage sensible (11/08/2026). L'ancienne formulation — « on m'a donné
    // les instruments, pas la méthode » — pouvait se lire comme un reproche aux
    // fabricants alors qu'elle décrit un vécu. Réécrite pour attribuer la cause
    // à la NATURE de l'instrument (jeune, en évolution, modal, aussi varié qu'il
    // y a de gammes), pas à l'oubli de quiconque. Le vécu n'est pas retiré ; il
    // devient le déclencheur logique de l'app. Argumentaire fourni par David
    // lui-même — ne rien extrapoler au-delà.
    bridgeEyebrow: 'Ce que ces deux pans ont produit',
    bridgeTitle: 'La méthode, personne ne pouvait me la donner — elle n’existait pas',
    bridgeP1:
      'J’étais heureux et complètement perdu. Deux instruments magnifiques, très complexes, arrivés sans mode d’emploi. C’est comme si on m’avait confié deux vaisseaux spatiaux — sauf que le manuel de pilotage n’était écrit nulle part, pour personne.',
    bridgeP1b:
      'Le handpan est un instrument du <strong>XXIᵉ siècle</strong>, encore en pleine évolution : il n’a derrière lui ni les siècles de pédagogie du piano, ni ceux de la guitare. Et il ne peut même pas avoir <em>une</em> méthode — il y a autant de handpans que de gammes, de dispositions de notes et de nombres de notes. Ce qui est vrai sur un instrument ne l’est déjà plus sur celui d’à côté. Ce n’est l’oubli de personne : c’est la jeunesse d’un instrument vivant.',
    bridgeP1c:
      'S’y ajoute ce qui fait sa magie : le handpan est le plus souvent un instrument <strong>modal</strong>. C’est une force, et une porte d’entrée merveilleuse — surtout quand on n’a jamais fait de musique, on obtient un résultat beau presque tout de suite, sans théorie. Mais on tourne aussi en rond très vite. Et dès qu’on est musicien professionnel, qu’on attend du chromatique, ou qu’on veut chanter de vraies chansons par-dessus — mon cas — ça devient très complexe, très vite. Moi, je venais de la batterie, un instrument purement rythmique : je n’avais aucune base d’harmonie sur laquelle m’appuyer.',
    bridgeP2:
      'En août 2023, j’ai commencé un document pour voir, enfin, comment composer mes accords sur mes deux pans. Des cartes colorées, une note par couleur. <strong>Ce document est devenu Handpan Compagnon.</strong>',
    bridgeP3:
      'Le plus troublant, c’est que la question de départ venait de lui. Dès août 2022, Yonathan m’écrivait à propos de l’instrument « chromatique, chanteur-compositeur » : « essaie de jouer des morceaux dans l’app sur cette gamme, pour qu’on comprenne quelles notes te manquent — et qu’on trouve un moyen de les ajouter. » Trois ans plus tard, l’application répond à cette question, pour tout le monde.',
    bridgeAppTitle: 'Ce que l’app fait aujourd’hui pour un handpan acoustique',
    bridgeAppIntro: 'Tout ce qui suit est gratuit, et ne demande aucun instrument électronique.',
    bridgeApp: [
      { t: 'Ta gamme, en couleurs', d: 'Tu choisis ton instrument : l’app dessine ta coque avec tes notes réelles, chacune habillée de sa couleur. L’écran devient le miroir de ton pan.' },
      { t: 'Le diapason 440 / 432 Hz', d: 'Un réglage accorde l’app sur ton handpan — pour que ce que tu entends à l’écran sonne juste avec ce que tu as dans les mains.' },
      { t: '🎯 Compléter ta gamme', d: 'L’app compare tes notes réelles avec ce que demandent les accords, et te dit exactement lesquelles te manquent — puis quel second handpan les apporterait, et combien de morceaux ça débloquerait.' },
      { t: 'Le mode Hybride', d: 'Dès qu’un second pan est là, les deux coques s’affichent côte à côte et chaque accord se trace à cheval sur les deux, avec l’ordre de jeu et les mains. Exactement mon problème de gymnastique — résolu à l’écran.' },
    ],
    bridgeSignature:
      'Mes deux gammes sur mesure sont dans l’application, badgées « ✨ Signature David Lesage ». Tu peux les charger, les écouter et voir ce qu’elles permettent, même sans les avoir sous les mains.',
    bridgeHonest:
      'À dire honnêtement : l’app ne t’écoute pas. Elle ne devine pas ta gamme au micro — tu la choisis, ou tu construis ta coque note par note. À partir de là, elle raisonne sur tes notes réelles.',
    bridgeCta: 'Découvrir Handpan Compagnon',
    bridgeCtaBlog: 'Lire : utiliser l’app sur ton handpan acoustique',

    endEyebrow: 'Et maintenant',
    endTitle: 'Faire du handpan un vrai instrument d’accompagnement',
    endText:
      'Mon rêve n’a pas changé : hisser le handpan au rang de la guitare ou du piano pour accompagner une voix. Ces deux instruments m’ont montré que c’était possible — et m’ont obligé à inventer la méthode qui manquait. C’est le chemin que je continue, sans opposer l’acoustique et l’électronique.',
    endCtaShowroom: 'Venir les entendre au showroom',
    endCtaYishama: 'Découvrir Yishama',
  },
  shop: {
    title: 'Boutique handpan — Neotone, micros & accessoires',
    description:
      'Une sélection d’instruments et d’accessoires d’exception, testés et choisis par David Lesage : handpans numériques Neotone et micros Hisong.',
    eyebrow: 'Boutique',
    title2: 'Ambassadeur d’instruments et de micros d’exception',
    intro: 'La qualité et le raffinement comptent énormément pour moi.',
    ambassadorText: 'Je collabore avec des fabricants d’instruments et de micros d’exception, dont je suis fier de mettre en valeur et de représenter la qualité. À travers moi, tu peux bénéficier de coupons de réduction, ainsi que de démonstrations et d’essais lors de mes showcases à Paris 20e.',
    keyNotice: 'Paiement en ligne désactivé : renseigne PUBLIC_SNIPCART_KEY dans .env pour activer le panier.',
    from: 'dès ',
    soon: 'Bientôt',
    soonLong: 'Bientôt disponible',
    addCart: 'Ajouter au panier',
    orderEmail: 'Commander par email',
    creationsBadge: 'Signature David Lesage',
    calcOrder: 'Calculer mon prix & commander',
    linkTags: { helloasso: 'Sur HelloAsso', streaming: 'En streaming', hisong: '−5 % Hisong', yishama: 'Ambassadeur Yishama', nowgroove: 'Now Groove', ondemand: 'Sur demande', maisongoni: 'La Maison du Ngoni', tambour: 'Code David-Tambour', spotify: 'Sur Spotify', limited: 'Édition limitée', app: 'Application', muling: '−5 % via moi', onesec: 'J’utilise vraiment', oko: '−10 % avec mon code', structured: 'J’utilise vraiment' },
    linkCtas: { buy: 'Voir l’offre →', listen: 'Écouter →', discover: 'Découvrir →', order: 'Commander →', interested: 'Ce micro m’intéresse →' },
    copyCode: 'Copier le code',
    codeCopied: 'Copié !',
    priceNotes: {
      hisong:
        '<strong>⚠️ Mise en garde :</strong> sur le site Hisong, les prix sont affichés <strong>hors taxes</strong> (265,95 € à 354,95 € HT). La <strong>TVA de 20 %</strong> s’ajoute au moment du paiement. Les prix ci-dessus sont donc les <strong>vrais prix TTC</strong> — pour t’éviter toute mauvaise surprise.<br><br><strong>Bonne nouvelle, les remises se cumulent :</strong><br>— mon code <strong>−5 %</strong><br>— le code <strong>VIP10</strong> : −10 % sur la 1ʳᵉ commande (appliqué automatiquement)<br>— parfois des promotions exceptionnelles de 15 à 20 %<br><br><strong>Frais de port :</strong> à partir de <strong>11,95 €</strong> en France — c’est toi qui choisis le transporteur au moment du paiement.<br><br><strong>Exemple concret :</strong><br>— kit Musicien : ≈ <strong>273 € TTC</strong> après les deux remises, soit ≈ <strong>285 € port compris</strong><br>— kit Master : ≈ <strong>364 € TTC</strong>, soit ≈ <strong>376 € port compris</strong>',
    },
    watchDemo: 'Voir ma démo vidéo',
    adviceTitle: 'Besoin d’un conseil avant d’acheter ?',
    adviceText: 'Je réponds personnellement. Dis-moi ton projet, je t’aide à choisir le bon instrument.',
    adviceCta: 'Me faire conseiller',
    categories: {
      handpans: { label: 'Handpan', blurb: 'Deux univers qui se complètent.' },
      app: { label: 'Application', blurb: 'Handpan Compagnon — l’app pédagogique qui rend la musique visible.' },
      creations: { label: 'Mes créations · Now Groove', blurb: 'Créées par moi : ma méthode de rythme Now Groove, la calebasse signature et sa housse faite main.' },
      instruments: { label: 'Instruments d’exception', blurb: 'Je collabore avec des fabricants d’exception dont je représente fièrement la qualité. À travers moi, profite de coupons de réduction et de démonstrations lors de mes showcases.' },
      micros: { label: 'Micros', blurb: 'Captation pour handpan acoustique, voix et gong.' },
      musique: { label: 'Musique', blurb: 'Mes albums et mes reprises, à écouter en streaming sur toutes les plateformes.' },
      formations: { label: 'Cours & stages', blurb: 'Apprends avec moi en cours particuliers et en stages, en présentiel ou à distance.' },
      outils: { label: 'Mes outils du quotidien', blurb: 'Au-delà de la musique : les outils que j’utilise vraiment pour rester concentré, présent et créatif.' },
    },
    // Sous-catégories (un seul niveau) — voir data/shop.ts → categorySubs.
    subcategories: {
      acoustique: { label: 'Acoustique', blurb: 'Le métal, la main, le souffle de la pièce.', more: 'Tout savoir sur les handpans Yishama →' },
      electronique: { label: 'Électronique', blurb: 'Toutes les gammes, le casque, la scène.', more: 'Tout savoir sur le Neotone →' },
    },
    subNavLabel: 'Deux univers :',
    // Asymétrie réelle assumée : je ne vends pas les deux de la même façon.
    handpanNote: 'La seule différence réelle : le <strong>Neotone</strong> (fabriqué par Soundventure) se commande via mon calculateur, avec code de remise nominatif et garantie 6 ans. Pour <strong>Yishama</strong>, je suis ambassadeur et affilié — la commande se fait sur leur site, mon lien te suit. Deux façons d’acheter, une seule exigence de qualité.',
    handpanBridge: 'Le trait d’union entre les deux : Handpan Compagnon →',
    products: {
      'handpan-studio': { name: 'Handpan Compagnon · l’application', description: 'Mon application pédagogique : couleurs, géométrie et émotions rendent la musique visible. Découverte gratuite, puis Studio à partir de 9,90 €/mois — débloque la création, la sauvegarde et l’export PDF/PNG de tes partitions.' },
      'neotone-one': { name: 'Neotone¹', description: 'Handpan numérique 10 notes, toutes les gammes, qualité studio. Achat accompagné : code de remise nominatif + garantie 6 ans.' },
      'neotone-mutant': { name: 'Neotone¹ Mutant', description: 'Handpan numérique 19 notes avec écran LCD, l’expression maximale. Achat accompagné : code de remise + garantie 6 ans.' },
      'yishama': { name: 'Handpan Yishama d’exception', description: 'L’un des meilleurs fabricants de handpan au monde (Israël / Hongrie). Facture artisanale, instruments jusqu’à 19 notes aux basses profondes et aigus brillants. Je le représente avec fierté en tant qu’ambassadeur.' },
      'gonilele': { name: 'Harpe Gonilélé · La Maison du Ngoni', description: 'Harpe-luth de voyage créée par Joris Feuillâtre. Je suis ambassadeur de La Maison du Ngoni. 10 cordes (440 €) ou 12 cordes avec micro intégré (520 €). Photos, vidéos, déballage et commande sur la fiche dédiée.' },
      'calebasse': { name: 'Kit de Calebasse David Lesage Signature', description: 'Kit complet : calebasse de 45 à 50 cm (rare en Europe), finie à la main par Kamou (Djoliba Percussion) et gravée au laser du logo Now Groove, avec son tapis et ses shakers. Une batterie organique au son naturel.' },
      'housse': { name: 'Housse de calebasse Now Groove by David Lesage', description: 'Housse-sac à dos haut de gamme pensée et designée par David Lesage : fonction tapis intégrée, sangles détachables, poche de rangement (œufs, accessoires & méthode), intérieur velours. ✋ Édition spéciale fabriquée à la main, en série ultra limitée.' },
      'tambour': { name: 'Tambour chamanique · L’Âme du Tambour', description: 'Tambour-cadre artisanal de Julien (L’Âme du Tambour) — un fabricant aligné, passionné et intègre. Profite de −5 % avec le code David-Tambour.' },
      'micro-hisong': { name: 'Micro Hisong AirStudio S1', description: 'Le premier studio mobile tout-en-un (micro, retours intra sans fil, interface audio, boîtier de charge). Idéal pour la voix, le handpan acoustique et le gonilélé — un véritable studio portatif.<br><br><strong>Trois kits au choix</strong> (prix TTC, TVA 20 % incluse) :<br>1 — Musicien 4-en-1 · <strong>319 € TTC</strong> <span class="text-ink-soft/60">(265,95 € HT)</span><br>2 — Créateur 5-en-1 · <strong>372 € TTC</strong> <span class="text-ink-soft/60">(309,95 € HT)</span><br>3 — Master 6-en-1 · <strong>426 € TTC</strong> <span class="text-ink-soft/60">(354,95 € HT)</span><br><br><strong>Mon conseil :</strong> si tu veux utiliser le micro pour <strong>jouer en live</strong>, il te faut le <strong>kit 6-en-1 (Master)</strong>.<br><br>Démonstrations et achat en direct à mes showcases à Paris.' },
      'micro-muling': { name: 'Micro Muling MP1 + préampli HMP-2', description: 'Le MP1 est un micro contact-condensateur conçu pour le handpan acoustique. Fourni avec le préampli HMP-2, qui accueille jusqu’à deux micros MP1 — pour une captation stéréo, claire et précise, sans Larsen. Idéal pour la scène et l’enregistrement. (Contractualisation en cours avec le fabricant : écris-moi pour être tenu au courant.)' },
      'phoenix-opus1': { name: 'L’Alliance du Phoenix — Opus I', description: 'Mon album original, premier opus — un voyage entre handpan, voix et textures organiques. À écouter sur Spotify et toutes les plateformes.' },
      'phoenix-opus2': { name: 'L’Alliance du Phoenix — Opus II', description: 'Le second opus — la suite du voyage musical. À écouter sur Spotify et toutes les plateformes.' },
      'cover': { name: 'Reprises — David Lesage', description: 'Mes reprises revisitées au handpan et à la voix (Shape of My Heart, Imagine, Ave Maria…). À écouter sur Spotify.' },
      'now-groove': { name: 'Now Groove — méthode de rythme', description: 'Ma formation pour apprendre le rythme autrement, par des émoticônes visuelles. Accessible à tous, du débutant au musicien confirmé.' },
      'cours-prives': { name: 'Cours privés & stages', description: 'Cours particuliers et stages avec moi — handpan, rythme et voix. En présentiel à Paris ou à distance.' },
      'streaming': { name: 'Ma musique en streaming', description: 'Retrouve mes compositions et reprises sur Spotify, Apple Music, Deezer et toutes les plateformes.' },
      'onesec': { name: 'one sec — reprendre le contrôle de son temps d’écran', description: 'L’app qui m’aide vraiment à ne pas me perdre dans le scroll. Avant d’ouvrir une appli happante (réseaux sociaux…), one sec impose une courte pause — le temps d’une respiration — et l’envie compulsive retombe. C’est simple, et pour moi c’est l’une des rares choses qui a réellement fonctionné. Approche validée par la science (études avec l’Institut Max Planck). Gratuite pour l’essentiel ; profite de −30 % sur Premium via mon lien.' },
      'oko': { name: 'Gourde filtrante ÖKO', description: 'La gourde que j’emmène partout, tout le temps, en tant que musicien en déplacement — l’eau est la chose la plus importante qui soit. Filtration instantanée sans attente ni électricité, testée en laboratoire indépendant accrédité COFRAC sur plus de 200 contaminants. Je suis heureux de représenter un produit idéal pour tous les voyageurs. Profite de −10 % avec mon code.' },
      'structured': { name: 'Structured — planning quotidien', description: 'L’app que j’utilise pour organiser mes journées de musicien-entrepreneur, entre concerts, ateliers et développement de projets. Une timeline visuelle claire au lieu d’une liste de tâches qui s’accumule. Pas encore de programme d’affiliation avec eux, je le partage simplement parce que je m’en sers vraiment.' },
    },
  },
  booking: {
    defaultTitle: 'Réserver ta venue',
    defaultIntro: 'Laisse-moi tes coordonnées, je te réponds personnellement pour caler les détails.',
    first: 'Prénom',
    last: 'Nom',
    email: 'Email',
    phone: 'Téléphone (facultatif)',
    people: 'Combien serez-vous ?',
    message: 'Ton message (facultatif)',
    messagePlaceholder: 'Ce qui t’intéresse, tes disponibilités, ton niveau…',
    submit: 'Envoyer ma demande',
    sending: 'Envoi…',
    error: 'Impossible d’envoyer ta demande. Réessaie, ou écris-moi directement à contact@lesagedavid.fr.',
    privacy: 'Tes coordonnées me servent uniquement à te répondre et à te tenir informé·e. Pas de spam.',
    successTitle: 'C’est envoyé ✨',
    successText: 'Tu vas recevoir un email de confirmation. Je te réponds personnellement, très vite.',
    successClose: 'Fermer',
    close: 'Fermer',
    visitTitle: 'Réserver mon créneau au showroom (payant)',
    visitIntro: 'Paris 20ᵉ, sur rendez-vous. C’est un créneau individuel payant — un seul tarif, quel que soit ce pour quoi tu viens. Dis-moi tes disponibilités, je te propose un créneau.',
    privateTitle: 'Réserver un rendez-vous individuel',
    privateIntro: 'Un moment en tête-à-tête, au showroom de Paris 20ᵉ ou en visio : découvrir un instrument, prendre en main celui que tu viens d’acheter, ou avancer sur ta pratique — quel que soit ton niveau.',
    // ── Motifs branchés sur CE MÊME formulaire depuis d'autres pages (16/08/2026).
    // Ils remplacent d'anciens liens `mailto:` (rustine du 19/07/2026) qui
    // ouvraient le logiciel de mail du visiteur : la demande n'existait alors que
    // dans la boîte de David et ne laissait AUCUNE trace en base. Des prospects
    // réels ont été perdus comme ça — voir REPRENDRE-SITE-VITRINE.md.
    newsTitle: 'Être prévenu·e des prochains showcases',
    newsIntro: 'Laisse-moi ton email : je te préviens dès que les dates des prochains showcases gratuits à Paris sont fixées. Pas de spam — tu te désinscris quand tu veux.',
    contactTitle: 'M’écrire',
    contactIntro: 'Dis-moi ce qui t’amène — je lis et je réponds personnellement à chaque message.',
    goniTitle: 'Commander une harpe Gonilélé',
    goniIntro: 'Dis-moi la version qui t’intéresse et tes options : je te réponds personnellement avec le récapitulatif et les modalités.',
    goniPrefill: 'Version (10 cordes / 12 cordes + micro) :\nHousse (+40 €) / Accordeur (+10 €) :\nRetrait à Paris ou envoi (+25 €) :',
    collabPrefill: 'Mon projet en quelques lignes :',
    // Rendez-vous individuel (« RDV VIP ») — bloc affiché AVANT le formulaire :
    // ce qu'on peut y faire, le tarif, et le cadre en cas d'annulation. Le tarif
    // n'est PAS écrit ici : il est calculé depuis site.ts (voir `priceGrid`).
    vipTitle: 'Un rendez-vous rien que pour toi',
    vipScope: 'Tu choisis ce qu’on en fait : découvrir et essayer n’importe quel instrument de la boutique (Neotone, handpans acoustiques, Gonilélé, calebasse…), tester un micro pour handpan (Hisong, set Muling), ou simplement être accompagné·e en tête-à-tête — que tu débutes complètement, que tu cherches encore ce qui te correspond, ou que tu veuilles creuser un point précis. Que tu prennes 1h ou 1h30, dis-moi juste ce qui t’amène : je prépare tout pour toi.',
    vipPriceLabel: 'Tarif',
    vipPriceNote: 'Un seul tarif, quel que soit ce pour quoi tu viens.',
    vipPolicyShort: 'Annulation à moins de 24 h : le règlement reste acquis — ce créneau t’était réservé — mais le rendez-vous est reportable dans les 3 mois.',
    sessionType: 'Quel rendez-vous souhaites-tu ?',
    sessionTypeChoose: 'Choisis…',
    sessionTypeNames: { onboarding: 'Prise en main de mon instrument', demo: 'Découverte des instruments (démonstration privée)', lesson: 'Cours ou accompagnement individuel' },
    // Demande de code de remise Neotone. Ces informations sont exactement celles
    // que Neotone réclame à David pour enregistrer la vente et sa commission.
    discountTitle: 'Obtenir mon code de remise Neotone',
    discountIntro: 'Un code nominatif de −5 % en ligne, que je demande pour toi auprès de Neotone. Réponse personnelle sous 24 à 48 h.',
    discountModel: 'Quel modèle t’intéresse ?',
    discountModelChoose: 'Choisis…',
    discountModelNames: {
      one: 'Neotone¹ — 10 notes',
      mutant: 'Neotone¹ Mutant — 19 notes',
      undecided: 'Je ne sais pas encore — aide-moi à choisir',
    },
    discountCountry: 'Pays de livraison',
    discountCountryPlaceholder: 'France, Belgique, Suisse…',
    discountNote: 'Ces informations me servent uniquement à demander ton code auprès de Neotone.',
    // Pour une demande de code : Neotone a besoin du téléphone → pas de « facultatif ».
    phonePlain: 'Téléphone',
    socialLabel: 'Ton compte réseaux sociaux',
    socialHint: 'Instagram de préférence — sinon Facebook, YouTube ou ton site perso.',
    socialPlaceholder: '@toncompte ou un lien',
    // Ce qui se passe APRÈS l'envoi : annoncé avant, et rappelé dans l'email.
    discountNextTitle: 'Ce qui se passe ensuite',
    discountNext1: 'Je lis ton message personnellement — je réponds à tout le monde.',
    discountNext2: 'Dans les 24 h qui suivent ma lecture, <strong>Neotone te contacte directement</strong> et te transmet ton code de réduction.',
    discountNext3: 'C’est ensuite Neotone qui prend la suite des opérations : commande, paiement, livraison. Je reste disponible si tu as besoin de moi.',
    // Questions « pour créer du lien » — aucune n'est obligatoire.
    discoveryLabel: 'Comment m’as-tu découvert comme ambassadeur Neotone ?',
    discoveryChoose: 'Choisis…',
    discoveryNames: {
      youtube: 'YouTube',
      instagram: 'Instagram',
      facebook: 'Facebook',
      showcase: 'Un showcase ou un événement',
      'word-of-mouth': 'Bouche-à-oreille',
      search: 'Une recherche sur internet',
      'neotone-site': 'Le site de Neotone',
      other: 'Autrement',
    },
    curiousTitle: 'Deux questions, juste par curiosité',
    curiousHint: 'Aucune obligation de répondre — c’est pour faire connaissance.',
    playingSinceLabel: 'Le handpan et toi, ça dure depuis combien de temps ?',
    playingSinceChoose: 'Choisis…',
    playingSinceNames: {
      none: 'Je n’en joue pas encore',
      'under-1': 'Moins d’un an',
      '1-3': 'Entre 1 et 3 ans',
      'over-3': 'Plus de 3 ans',
    },
    dreamLabel: 'Ce que tu rêves de jouer',
    dreamPlaceholder: 'Un morceau, une ambiance, un projet…',
    freeMessageLabel: 'Ton message',
    freeMessageHint: 'Prends la place que tu veux — je lis tout.',
    sessionTypeRecommended: '★ conseillé au démarrage',
    sessionTypeHint: 'Tu viens de recevoir ton instrument — Neotone, handpan acoustique, micro — et tu te sens un peu perdu·e ? La prise en main est faite pour ça : on démarre ensemble, on règle tout et on prend les commandes en main — sans t’engager dans des cours de musique.',
    slotsTitle: 'Tes disponibilités',
    slotsHint: 'Propose-moi jusqu’à 3 créneaux qui t’arrangent — je te confirme celui que je retiens.',
    slotLabel: 'Créneau {n}',
    slotDate: 'Date',
    slotTime: 'Heure',
    slotsRequired: 'Indique-moi au moins un créneau (date et heure) qui te conviendrait.',
    termsTitle: 'Comment ça se passe',
    terms1: 'Tu me proposes tes créneaux. Je te réponds personnellement pour confirmer celui que je retiens.',
    terms2: 'Je t’envoie le lien de paiement dans ma réponse : c’est le règlement qui réserve ton créneau et nous engage tous les deux.',
    terms3: 'Un empêchement ? Jusqu’à 24 h avant, on décale ton rendez-vous sans aucun souci — tu m’écris, et c’est tout.',
    terms4: 'À moins de 24 h, le règlement reste acquis : j’avais bloqué ce créneau rien que pour toi, et je ne peux plus le proposer à quelqu’un d’autre. Mais tu ne perds pas ton rendez-vous pour autant — on le reporte à une autre date, dans les 3 mois. On a tous des imprévus, ça fait partie de la vie : c’est simplement la valeur de l’engagement qu’on prend l’un envers l’autre.',
    // Démonstration privée : au showroom uniquement (on vient toucher les instruments).
    instrumentsLabel: 'Quels instruments veux-tu découvrir ?',
    instrumentsHint: 'Coche ce qui t’intéresse — je les prépare pour ta venue.',
    instrumentNames: {
      neotone: 'Neotone (handpan électronique)',
      calebasse: 'Calebasse',
      gonilele: 'Gonilélé (harpe africaine)',
      'mic-hisong': 'Micro Hisong',
      'mic-muling': 'Micro Muling',
    },
    // Cours seulement : la visio n'a pas de sens pour une démonstration.
    formatLabel: 'En présentiel ou en visio ?',
    formatInPerson: 'En présentiel — showroom Paris 20ᵉ',
    formatRemote: 'En visio',
    showcaseTitle: 'Réserver ma place au showcase',
    showcaseIntro: 'Showcase public gratuit au showroom de Paris 20ᵉ. Réservation conseillée, les places sont limitées.',
    // ── SHOWCASE : « pour quel(s) instrument(s) viens-tu ? » (17/08/2026) ─────
    // Posée UNIQUEMENT sur une réservation de showcase. Facultative : elle sert
    // à préparer la séance et à cibler les emails ensuite, pas à filtrer.
    // Ajouter une option : voir `showcaseInterests` dans src/data/site.ts.
    // 🚧 Pas d'entrée « Autre » ni de champ libre (David, 17/08/2026) : le champ
    // « Ton message » du formulaire couvre déjà ce besoin.
    showcaseInterestsLabel: 'Pour quel(s) instrument(s) viens-tu ?',
    showcaseInterestsHint: 'Coche tout ce qui t’intéresse — je les prépare pour la séance. Un détail à préciser ? Dis-le-moi dans ton message plus bas.',
    showcaseInterestNames: {
      all: 'Tous',
      handpan: 'Handpan',
      mic: 'Micro (Muling et/ou Hisong)',
      calebasse: 'Calebasse',
      gonilele: 'Gonilélé (harpe africaine)',
      meet: 'Te rencontrer',
    },
  },
  muling: {
    title: 'Micro Muling pour handpan acoustique | David Lesage',
    description:
      'Le micro Muling pour handpan acoustique, testé et présenté par David Lesage : captation claire et précise, sans Larsen. Vidéo de test complet, photos et commande.',
    back: '← Retour à la boutique',
    eyebrow: 'Micro pour handpan acoustique',
    heroTitle: 'Le micro Muling',
    heroLead:
      'Un micro conçu spécifiquement pour le handpan acoustique : une captation claire, précise et fidèle, sans Larsen — sur scène comme en enregistrement. Je l’ai testé en profondeur, voici mon retour complet.',
    ctaInterested: 'Ce micro m’intéresse',
    ctaVideo: 'Voir mon test complet',
    videoTitle: 'Mon test complet en vidéo',
    videoIntro: 'Je te présente le micro en détail : installation, son obtenu, comparaisons et cas d’usage.',
    photosTitle: 'Le micro en images',
    photosIntro: 'Mes photos personnelles du micro et de son installation sur l’instrument.',
    whyTitle: 'Pourquoi je le recommande',
    whyText:
      'Sonoriser un handpan acoustique est un vrai défi : les micros généralistes captent mal les harmoniques, et le Larsen guette dès qu’on monte le volume. Le Muling est pensé pour cet instrument précis — il capte le son à la source, garde la richesse des harmoniques et te laisse pousser le niveau sans accrochage. C’est ce qui m’a convaincu de le représenter.',
    whyPoints: [
      { t: 'Conçu pour le handpan', d: 'Un micro de contact pensé pour la caisse et les harmoniques du handpan, pas un micro généraliste détourné.' },
      { t: 'Sans Larsen', d: 'La captation se fait au contact de l’instrument : tu montes le volume sur scène sans redouter l’accrochage.' },
      { t: 'Scène et studio', d: 'Assez fidèle pour l’enregistrement, assez robuste et pratique pour le live.' },
    ],
    priceTitle: 'Prix et commande',
    priceLabel: 'Prix fabricant',
    priceNote:
      'Frais de port et éventuels frais de douane en supplément.',
    priceDiscountLabel: 'En passant par moi',
    priceDiscountNote: 'Code {code} — {pct} % de réduction sur le prix fabricant, réservé aux commandes passées via ce formulaire.',
    orderTitle: 'Commander mon micro',
    orderText:
      'Le fabricant n’a pas encore de paiement en ligne pour la France : je te mets en relation directement. Remplis le formulaire, tu obtiens aussitôt les coordonnées pour régler Muling, qui prend ensuite le relais jusqu’à la réception de ton micro.',
    ctaContact: 'Commander mon micro',
    // Formulaire de commande (source `muling-order` du BookingForm)
    mulingOrderTitle: 'Commander le micro Muling',
    mulingOrderIntro: 'Code {code} appliqué — {pct} % de réduction sur le prix fabricant. Voici les coordonnées de paiement ; Muling prend ensuite le relais directement avec toi pour la suite.',
    mulingOrderPriceLine: 'Prix fabricant {base} € − {pct} % = {final} €',
    mulingQuantity: 'Combien de micros ?',
    mulingDeliveryNote: 'Infos spéciales pour le livreur',
    mulingDeliveryNoteHint: 'Code d’accès immeuble, étage, consignes de dépôt… (facultatif)',
    mulingDeliveryNotePlaceholder: 'Ex. : code portail 1234B, 3e étage sans ascenseur…',
    mulingCountry: 'Pays de livraison',
    mulingAddress: 'Adresse',
    mulingCity: 'Ville',
    mulingPostalCode: 'Code postal',
    mulingConsent: 'J’accepte que mes informations soient transmises à Muling Musical Instruments Co., Ltd. (Chine) et à Résonances Productions pour le traitement de ma commande.',
    mulingConsentRequired: 'La transmission de tes coordonnées à Muling est nécessaire pour traiter la commande — coche la case pour continuer.',
    // Écran de confirmation : coordonnées bancaires affichées UNE FOIS, ici seulement.
    mulingBankTitle: 'Pour régler ta commande',
    mulingBankIntro: 'Vire le montant exact à Muling, avec ta référence en libellé. Le paiement se fait en euros, par virement SEPA uniquement.',
    mulingBankBeneficiary: 'Bénéficiaire',
    mulingBankIban: 'IBAN',
    mulingBankBic: 'BIC',
    mulingBankBank: 'Banque',
    mulingBankRef: 'Libellé du virement',
    mulingBankAmountLabel: 'Montant à virer',
    mulingBankAdvantagePrefix: 'Ton avantage : ',
    mulingCopyLine: 'Copier',
    mulingCopiedLine: 'Copié !',
    mulingDownloadPdf: '⬇️ Télécharger ces informations en PDF',
    mulingBankSepaOnly: '⚠️ Ce compte n’accepte que les virements SEPA en euros — pas de virement SWIFT / international.',
    mulingBankNotified: 'Muling a été prévenu de ta commande à son adresse officielle ({email}), avec toutes les informations — c’est eux qui assurent l’envoi et le suivi.',
    mulingBankNext: 'Une fois le virement fait, garde une preuve de paiement (capture d’écran ou PDF) et dépose-la ici. Muling va te recontacter pour confirmer sa réception et te transmettre les informations concernant le suivi d’envoi.',
    // Dépôt de preuve + étape finale
    mulingProofLabel: 'Dépose ta preuve de virement',
    mulingProofHint: 'Capture d’écran ou PDF de ton virement (5 Mo maximum).',
    mulingProofButton: 'J’ai effectué le virement',
    mulingProofSending: 'Envoi…',
    mulingProofError: 'Le dépôt a échoué — réessaie, ou écris-moi directement à contact@lesagedavid.fr.',
    mulingProofMissing: 'Dépose une preuve de virement (image ou PDF) avant de continuer.',
    mulingProofInvalidType: 'Format non accepté — dépose une image (JPG, PNG) ou un PDF.',
    mulingProofTooLarge: 'Le fichier dépasse 5 Mo — réduis-le et réessaie.',
    // RETOUR PAR LIEN (17/08/2026) — l'écran de confirmation n'existait qu'une
    // fois, juste après l'envoi du formulaire : qui fermait l'onglet n'avait
    // plus AUCUN moyen de signaler son virement. Ces textes servent quand la
    // page est ouverte avec ?commande=<id> (lien envoyé dans l'email).
    // ⚠️ Rien de personnel ne s'affiche ici : ni nom, ni adresse, ni téléphone,
    // ni montant — seulement la référence, qui se déduit de l'identifiant déjà
    // présent dans l'URL. C'est l'email saisi ci-dessous que le serveur vérifie.
    mulingResumeIntro: 'Tu reviens signaler le virement de ta commande {ref}. Confirme l’adresse email utilisée lors de la commande, puis dépose ta preuve de virement.',
    mulingResumeEmailLabel: 'Email utilisé lors de la commande',
    mulingResumeEmailHint: 'C’est lui qui identifie ta commande — aucune information personnelle n’est affichée sur cette page tant qu’il n’a pas été vérifié.',
    mulingResumeEmailMissing: 'Indique l’adresse email utilisée lors de la commande.',
    mulingResumeAmountNote: 'Le montant exact de ta commande figure dans ton email de confirmation ({unit} € par micro).',
    mulingResumeMismatch: 'Cette adresse email ne correspond pas à cette commande. Utilise exactement celle indiquée lors de la commande, ou écris-moi à contact@lesagedavid.fr.',
    mulingThankYouTitle: 'Merci, c’est noté ✨',
    mulingThankYouText: 'Ta preuve de virement est bien reçue et transmise à Muling avec toutes les infos de ta commande. Tu vas recevoir un email de confirmation à cette adresse, à garder comme preuve — Muling va te recontacter directement pour l’expédition et le suivi.',
    mulingOrderSending: 'Envoi…',
    mulingOrderSubmit: 'Envoyer ma commande',
    mulingOrderError: 'L’envoi a échoué — réessaie, ou écris-moi directement à contact@lesagedavid.fr.',
    specsTitle: 'La capsule MP-1 en détail',
    specsIntro: 'Les caractéristiques techniques de la capsule de contact MP-1, telles que constatées en test réel.',
    specs: [
      { t: 'Micro à condensateur de surface', d: 'Ce n’est pas un micro d’ambiance : la capsule capte les vibrations au contact direct de la coque. C’est ce qui donne un son fidèle même dans un lieu bruyant.' },
      { t: 'Fixation aimantée', d: 'La capsule se pose et se retire par aimant : installation immédiate, tenue parfaitement sûre sur l’instrument.' },
      { t: 'Minuscule', d: 'La taille d’un bout de doigt — elle se fait totalement oublier, visuellement comme au jeu.' },
      { t: 'Boîtier ABS et pièces métalliques', d: 'Un corps en ABS renforcé de pièces métalliques : léger sur l’instrument, tout en restant robuste au transport.' },
      { t: 'Impédance de sortie : 600 Ω', d: 'Une impédance standard, parfaitement adaptée au préampli HMP-2 et aux entrées ligne classiques.' },
      { t: 'Isolation très élevée', d: 'La captation se fait par contact : les bruits extérieurs et les autres instruments ne passent quasiment pas — précieux en jam et sur scène.' },
    ],
    specsCaution: '⚠️ À savoir avant d’acheter : les capsules sont conçues exclusivement pour fonctionner avec le préampli Muling. Elles ne sont pas compatibles avec du matériel d’une autre marque — c’est un système complet, pas une capsule à intégrer à un montage existant.',
    specsSource: 'Caractéristiques techniques communiquées par le fabricant, recoupées avec ma propre utilisation.',
    boxTitle: 'Ce que contient le set',
    boxIntro: 'Le set HMP-2 est complet : deux capsules et le préampli, prêts à jouer sur un ou deux handpans.',
    boxItems: [
      '2 capsules de contact aimantées (micros actifs)',
      '1 préampli HMP-2 deux canaux',
      '2 câbles jack 6,35 mm plaqués or',
      '1 étui rigide de transport',
      '2 pochettes de rangement en tissu',
      '1 tournevis pour ouvrir le préampli (accès à la pile)',
      '4 pastilles adhésives de fixation',
      'Des attaches de câble (wire clips)',
      'Le manuel du constructeur',
    ],
    boxNote: 'Un set suffit pour deux handpans : une capsule par instrument, les deux mixées dans le préampli. Sur un seul handpan, tu peux poser les deux capsules pour une captation plus équilibrée.',
    preampTitle: 'Le préampli HMP-2 en détail',
    preampIntro: 'Le cœur du système : un préampli deux canaux conçu spécifiquement pour le handpan, avec correction de timbre intégrée.',
    preampFeatures: [
      { t: 'Deux canaux indépendants', d: 'CH1 et CH2 ont chacun leur volume : tu équilibres précisément tes deux capsules (ou tes deux handpans) avant la sortie.' },
      { t: 'Réglage SHAPE', d: 'Le grand bouton sculpte le son : sur 0 tu gardes le timbre d’origine ; en tournant dans le sens horaire tu accentues les graves et les aigus en réduisant les médiums — parfait pour ressortir dans un mix chargé.' },
      { t: 'Sortie mixée jack 6,35 mm', d: 'Un seul câble part vers ton enceinte, ta table de mixage ou ton interface audio.' },
      { t: 'Commutateur CH2', d: 'Le canal 2 accepte une capsule active (interrupteur sur ON) ou un capteur passif type H1 (sur OFF). Le canal 1 est réservé aux capsules actives.' },
      { t: 'Témoin lumineux', d: 'Une LED confirme d’un coup d’œil que le préampli est sous tension.' },
      { t: 'Châssis métal', d: 'Un boîtier compact et robuste, au format d’une pédale d’effet — il encaisse la scène et la route.' },
      { t: 'Environ 20 h d’autonomie', d: 'Avec une simple pile 9 V, tu tiens une vingtaine d’heures de jeu : de quoi enchaîner plusieurs concerts sans y penser.' },
      { t: 'Impédances : 1 MΩ en entrée, 600 Ω en sortie', d: 'Une entrée à haute impédance qui préserve toute la richesse du signal des capsules, et une sortie standard qui se branche partout — enceinte, table de mixage ou interface audio.' },
    ],
    preampWarnTitle: 'Deux précautions importantes',
    preampWarns: [
      'Ne branche jamais un capteur passif sur le canal 1 : ce canal délivre en permanence l’alimentation et cela endommagerait le matériel.',
      'Sur le canal 2, coupe l’alimentation (interrupteur sur OFF) si tu y branches un capteur passif H1.',
    ],
    preampDiagramTitle: 'Toutes les commandes expliquées',
    preampDiagramAlt: 'Schéma annoté du préampli HMP-2 : entrées, volumes, réglage SHAPE, alimentation et sortie',
    // § 3.3 du brief : avertissements CONSTRUCTEUR. Ce ne sont pas des conseils
    // de confort — une inversion de polarité détruit l'appareil. D'où le
    // traitement visuel distinct dans MulingPage.astro.
    dangerTitle: 'À lire avant le premier branchement',
    dangers: [
      'Ne branche <strong>jamais</strong> un capteur passif sur l’entrée CH1.',
      'Pour utiliser un capteur passif type H1, le canal CH2 doit impérativement être sur <strong>OFF</strong>.',
      'L’alimentation secteur doit être à <strong>polarité centrale négative</strong>. Une inversion de polarité détruit l’appareil de façon irréversible.',
    ],
    // Section « Le fabricant » (§ 5.1). Les revendications du fabricant sont
    // ATTRIBUÉES explicitement — ne jamais les reformuler en affirmation directe.
    makerEyebrow: 'Le fabricant',
    makerTitle: 'Muling Musical Instruments',
    makerIntro:
      '<strong>Muling Musical Instruments Co., Ltd.</strong> (惠州市沐铃乐器有限公司) est un fabricant chinois de micros pour instruments acoustiques, installé à Huizhou, dans la province du Guangdong. L’entreprise a été fondée en 2016 par <strong>Mò Cè</strong> (莫测), qui en signe la conception des produits.',
    makerBlocks: [
      {
        t: 'Mò Cè (莫测), le concepteur',
        d: 'Guitariste depuis les années 1980, professeur de guitare dans les années 1990, Mò Cè bascule en 1999 vers la conception de micros. Il travaille d’abord comme designer pour un fabricant coréen, puis pour LSM, avant de fonder sa propre marque. Le fabricant revendique trois premières à son actif : le premier micro à écran intégré, le premier micro combinant piézo et microphone, et la série OPUS, produite selon lui à plus de 80 000 ensembles par an entre 2001 et 2010.',
      },
      {
        t: 'Le logo',
        d: 'Le logo Muling est construit sur trois symboles de la pensée chinoise classique : le <strong>yin-yang</strong>, le <strong>ciel rond et la terre carrée</strong> (天圆地方), et les <strong>cinq éléments</strong> (五行). Une manière de dire que l’instrument, le capteur et le musicien forment un même ensemble.',
      },
      {
        t: 'La gamme',
        d: 'Muling développe trois familles de produits pour instruments à cordes, auxquelles s’ajoutent une gamme dédiée au handpan — dont le set HMP-2 présenté sur cette page — et des micros signature réalisés sur mesure.',
      },
    ],
    // ⚠️ Volontairement PAS de lien vers le site marchand du fabricant (David,
    // 08/08/2026) : éviter que le client commande en direct plutôt que via lui.
    makerLinksTitle: 'Suivre Muling',
    makerZhNote: 'site en chinois',
    powerTitle: 'L’alimentation : pile ou secteur',
    powerIntro: 'Le préampli fonctionne de deux façons, à toi de choisir selon le contexte.',
    powerBattery: {
      t: 'Sur pile 9 V — l’autonomie totale',
      d: 'Une pile 9 V (type 6F22) se loge à l’intérieur du boîtier. Il suffit d’ouvrir le fond avec le tournevis fourni. C’est la solution nomade par excellence : aucun câble d’alimentation, tu joues n’importe où. J’utilise personnellement une pile rechargeable, plus économique et plus écologique. Pense à la retirer si tu n’utilises pas le préampli pendant longtemps.',
    },
    powerMains: {
      t: 'Sur secteur — pour les longues sessions',
      d: 'Le préampli accepte aussi un adaptateur secteur en 9 V 300 mA, sur prise DC 5,5 × 2,1 mm à polarité centrale négative. Idéal en studio, en répétition ou pour un long concert où tu ne veux pas dépendre d’une pile.',
    },
    powerWarning: '⚠️ Important : l’adaptateur secteur n’est pas fourni avec le set. Il faut l’acheter séparément — vérifie bien les caractéristiques (9 V, 300 mA minimum, polarité centrale négative) pour ne pas endommager le préampli.',
    manualTitle: 'Le manuel du constructeur',
    manualIntro: 'Les deux pages du manuel fourni, avec les positions de pose recommandées des capsules et les caractéristiques techniques.',
    relatedTitle: 'Et si tu joues sur un handpan électronique ?',
    relatedText:
      'Le Neotone n’a pas besoin de micro : il se branche directement en jack. Si tu hésites entre acoustique et électronique, mon comparatif t’aidera à choisir.',
    relatedCta: 'Découvrir le Neotone',
  },
  gonilele: {
    title: 'Harpe Gonilélé — La Maison du Ngoni | David Lesage',
    description:
      'La harpe Gonilélé (NGoni lélé), harpe-luth de voyage de La Maison du Ngoni, présentée par David Lesage, ambassadeur. Photos, vidéos, déballage, tarifs et commande.',
    back: '← Retour à la boutique',
    eyebrow: 'Ambassadeur · La Maison du Ngoni',
    heroTitle: 'La Harpe Gonilélé',
    heroLead:
      'Une harpe-luth de voyage à l’âme envoûtante, façonnée à la main par Joris Feuillâtre. Je suis fier d’en être l’ambassadeur — découvre l’instrument, écoute-le, et repars avec le tien.',
    ctaOrder: 'Commander mon Gonilélé',
    ctaVideos: 'Voir les vidéos',
    ctaLesson: 'Prendre un cours',
    whatTitle: 'Qu’est-ce que le Gonilélé ?',
    whatText:
      'Le Gonilélé (ou NGoni lélé) est une harpe-luth ouest-africaine revisitée en version voyage par Joris Feuillâtre, de La Maison du Ngoni. Caisse en calebasse, manche en bois noble, cordes accordées en gamme pentatonique : il incarne l’alliance du masculin et du féminin, connectée au divin. Un instrument intuitif, méditatif et profond, accessible aux débutants comme aux musiciens confirmés.',
    ambassadorTitle: 'Ambassadeur de La Maison du Ngoni',
    ambassadorText:
      'Je collabore avec Joris Feuillâtre depuis 2023. Le Gonilélé m’a accompagné dans les moments forts de ma vie : c’est tout naturellement que je représente aujourd’hui La Maison du Ngoni et que je transmets cet instrument autour de moi.',
    photosTitle: 'L’instrument en images',
    unboxingTitle: 'Découverte & déballage',
    unboxingText: 'Je te fais découvrir le Gonilélé en détail, du déballage à la prise en main.',
    videosTitle: 'Le Gonilélé joué & présenté',
    videosIntro: 'Une sélection de vidéos où je joue et présente l’instrument — clique pour ouvrir sur YouTube.',
    videoTitles: {
      extrait: 'Extrait — le Gonilélé présenté',
      uneAme: '« Une âme » — apprendre le Gonilélé',
      rappelle: '« Rappelle-moi la beauté » — au Gonilélé',
      kothbiro: '« Kothbiro » — au Gonilélé (432 Hz)',
      sonoriser: 'Sonoriser ton Gonilélé facilement',
      amplifier: 'Amplifier ton Gonilélé',
    },
    tuningTitle: 'Une grille d’accordage fournie',
    tuningText:
      'Chaque instrument est accompagné d’une grille d’accordage (gamme pentatonique, diapason 432 Hz) qui t’aide à accorder tes 10 ou 12 cordes facilement. Le fichier complet est transmis uniquement aux personnes qui achètent l’instrument.',
    pricesTitle: 'Tarifs',
    priceRows: {
      cordes10: '10 cordes — sans micro',
      cordes12: '12 cordes — micro intégré',
      housse: 'Housse (obligatoire si envoi)',
      accordeur: 'Accordeur',
      envoi: 'Envoi (France)',
    },
    priceOption: 'option',
    orderTitle: 'Commander & retrait',
    orderText:
      'Pour commander, écris-moi ou appelle-moi. Retrait sur place à Paris 20ᵉ, ou envoi en France (25 €, housse obligatoire pour l’envoi).',
    contactPhone: 'Téléphone',
    contactEmail: 'Email',
    contactPickup: 'Retrait',
    contactShipping: 'Envoi possible — France · 25 €',
    paymentTitle: 'Paiement',
    paymentText:
      'Le paiement se fait sur le compte de l’association Résonances Productions.',
    paymentIban: 'IBAN',
    paymentBic: 'BIC',
    coursesTitle: 'Envie d’apprendre avec moi ?',
    coursesText:
      'Je donne des cours particuliers de Gonilélé (et plus) en visio ou en présentiel à Paris : 50 €/h ou 70 €/1h30.',
    coursesCta: 'Réserver un cours',
  },
  lessons: {
    title: 'Cours de handpan à Paris & en ligne | David Lesage',
    description:
      'Now Music Academy : apprends le handpan, le rythme à la calebasse (Now Groove) et la harpe gonilélé — par les couleurs, les formes et les émotions. Visio dans le monde entier ou présentiel à Paris, et ateliers de groupe.',
    heroEyebrow: 'Now Music Academy',
    heroTitle: 'Apprendre par une approche holistique de la musique',
    heroLead: 'Handpan, rythme à la calebasse et harpe gonilélé — par les couleurs, les formes et les émotions. En visio partout dans le monde, ou en présentiel à Paris.',
    ctaBook: 'Réserver un cours',
    ctaWorkshop: 'Voir les ateliers',
    universesEyebrow: 'Trois univers',
    universesTitle: 'Ce que tu peux apprendre avec moi',
    universes: [
      { t: 'Handpan', d: 'La méthode visuelle : couleurs, constellations et émotions rendent l’harmonie claire et mémorisable — sur handpan acoustique comme sur Neotone.', cta: 'Découvrir l’app' },
      { t: 'Rythme & Calebasse', d: 'Ma méthode Now Groove : apprends le rythme par des émoticônes visuelles, à la calebasse. Ludique, accessible à tous et profond.', cta: 'La méthode Now Groove' },
      { t: 'Harpe Gonilélé', d: 'Découvre la harpe-luth de voyage : accordage, jeu intuitif et méditatif. Transmise par moi, ambassadeur de La Maison du Ngoni.', cta: 'Découvrir le Gonilélé' },
    ],
    workshopsEyebrow: 'Ateliers de groupe',
    workshopsTitle: 'Calendrier des ateliers de rythme · calebasse',
    workshopsIntro: 'Des ateliers de rythme Now Groove en présentiel, à la calebasse, dans une ambiance conviviale et joyeuse.',
    workshopsEmpty: 'Prochaines dates en préparation — écris-moi pour être prévenu·e en priorité.',
    workshopsCta: 'Voir toutes les dates',
    workshopsContact: 'Questions & inscriptions :',
    promiseEyebrow: 'Ma promesse pédagogique',
    promiseTitle: 'La méthode visuelle, en cours',
    promiseIntro: 'J’utilise Handpan Compagnon en cours : couleurs, constellations et émotions rendent l’harmonie claire et mémorisable — quel que soit ton niveau, de l’enfant curieux au musicien confirmé.',
    pillars: [
      { t: 'Comprendre', d: 'Vois la structure de la musique au lieu de la subir : chaque accord devient une forme et une couleur.' },
      { t: 'Mémoriser', d: 'Tu retiens par la forme et l’émotion, pas par cœur. Les repères restent stables d’une gamme à l’autre.' },
      { t: 'Jouer & s’accompagner', d: 'Le handpan devient un vrai instrument d’accompagnement — chante sur les morceaux que tu aimes.' },
    ],
    formulasEyebrow: 'Formules & tarifs',
    formulasTitle: 'Choisis ton format',
    formulas: [
      { title: 'Cours particulier · 1h', price: '50 €', text: 'Visio ou présentiel à Paris. Handpan, rythme à la calebasse ou gonilélé : on travaille ce qui te fait vibrer.' },
      { title: 'Cours particulier · 1h30', price: '70 €', text: 'Le format idéal pour aller plus loin : harmonie, rythme, accompagnement, conseils de scène et de studio.' },
      { title: 'Atelier de groupe', price: 'Sur demande', text: 'Sessions collectives en petit comité (rythme calebasse, handpan…), dans une ambiance conviviale. Format et lieu sur demande.' },
    ],
    footnote: 'Prise de rendez-vous par email. Le présentiel à Paris est un pont naturel vers le showroom et les showcases.',
    faqEyebrow: 'FAQ',
    faqTitle: 'Les questions fréquentes sur les cours',
    faq: [
      { q: 'Peut-on apprendre le handpan sans solfège ?', a: 'Oui, c’est tout le principe de la méthode. L’approche visuelle — les couleurs des notes et les formes des accords — remplace le solfège pour te faire progresser vite.' },
      { q: 'Combien coûte un cours de handpan ?', a: 'Un cours particulier coûte 50 €/h ou 70 €/1h30, en visio ou en présentiel à Paris. Les ateliers de groupe se font sur demande.' },
      { q: 'Les cours en ligne, ça marche pour le handpan ?', a: 'Oui, les cours se donnent en visio partout dans le monde, avec la même méthode visuelle qu’en présentiel. Il te suffit de ton instrument et d’une connexion.' },
    ],
  },
  studio: {
    title: 'Handpan Compagnon — l’app pour apprendre le handpan',
    description:
      'Apprendre le handpan par les couleurs (ChromaKeys) : tablature visuelle, Constellations d’accords et émotions, sur handpan acoustique ou Neotone.',
    heroEyebrow: 'L’application — un projet original de David Lesage',
    heroTitleA: 'Handpan Compagnon',
    heroTitleB: 'La musique devient visible',
    heroLead: 'Une approche visuelle de la musique — par les couleurs, les émotions et la géométrie — pour comprendre, mémoriser et jouer le handpan. Sur handpan acoustique comme sur Neotone.',
    ctaWait: 'Rejoindre la liste d’attente',
    ctaOpen: 'Ouvrir l’application',
    problemEyebrow: 'Le constat',
    problemTitle: 'Le handpan n’a pas de notation visuelle',
    problem1Title: 'Aucune notation ne montre l’instrument',
    problem1Text: 'C’est un instrument magnifique — mais comment l’écrire ? On apprend d’oreille, par imitation, et passé les premières mélodies on rejoue les mêmes schémas : l’instrument devient une zone de confort dont on ne sort plus.',
    problem2Title: 'Sur un handpan électronique, les repères s’effacent',
    problem2Text: 'Le Neotone change de gamme à l’infini — une force, mais un piège : les notes sous tes doigts ne sont jamais les mêmes deux fois. Aucun point fixe — le cerveau sature, comme s’il fallait réapprendre l’instrument à chaque gamme.',
    chromaEyebrow: 'Couleurs & géométrie',
    chromaTitle: 'Et si on rendait l’invisible visible ?',
    chromaIntro:
      'Plutôt que les noms de notes — qui changent en permanence — l’application montre la <strong>structure</strong> de la musique. Les 7 degrés reçoivent chacun une couleur fixe, du rouge au violet : c’est le système ChromaKeys. Et chaque accord dessine une forme géométrique lumineuse.',
    chromaPunch: 'Ce qui était invisible devient visible.',
    constelEyebrow: 'Le langage des Constellations',
    constelTitle: 'La nouvelle tablature visuelle du handpan',
    constelIntro: 'Au-delà des couleurs ChromaKeys, Handpan Compagnon relie les notes d’un accord : il dessine une figure lumineuse — une constellation. Trois façons de la tracer.',
    constellations: [
      { t: 'Polygone', d: 'La forme fermée d’un accord : toutes ses notes reliées. Tu reconnais l’accord d’un coup d’œil, à sa forme.' },
      { t: 'Ouvert', d: 'Un tracé ouvert qui suit le chemin des notes — idéal pour visualiser un déplacement de main.' },
      { t: 'Mains', d: 'Le tracé pensé pour le geste : quelle main, quelle note. Tu lis directement ton jeu.' },
    ],
    degEyebrow: 'Degrés & émotions',
    degTitle: 'Chaque degré devient une émotion',
    degIntro: 'Jouer un enchaînement, c’est raconter une histoire : quitter la maison, partir à l’aventure, traverser une tension, puis revenir. On ne mémorise plus des règles abstraites — on ressent, et on voit.',
    modesEyebrow: 'L’app, en quatre modes',
    modesTitle: 'Le compagnon idéal de ton instrument',
    modesIntro: 'Toute la méthode tient dans une seule application web.',
    modes: [
      { t: 'Logique', d: 'Le cœur de l’app. Joue les 7 accords de n’importe quelle gamme, construis tes enchaînements, suis les accords des morceaux que tu aimes.' },
      { t: 'Atlas Sonore', d: 'Explore les gammes du monde entier — Japon, Orient, Afrique, musiques celtiques… Écoute-les, apprends-les, voyage.' },
      { t: 'Création', d: 'Compose tes propres gammes sur mesure, note par note et couleur par couleur, puis garde-les dans ta bibliothèque.' },
      { t: 'MIDI Connect', d: 'Le pont entre ton Neotone et l’app : ton jeu réel s’affiche en temps réel sur le handpan virtuel, et l’app te guide dans tes accords et tes gammes.' },
    ],
    versionAcoEyebrow: 'Mode acoustique',
    versionAcoTitle: 'Pas de Neotone ? Ton handpan acoustique suffit',
    versionAcoText: 'Handpan Compagnon n’est pas réservé au Neotone. Active le mode acoustique et retrouve toute l’approche visuelle — couleurs, constellations et émotions — posée directement sur ton propre instrument. Tu vois enfin la musique que tu joues.',
    versionAcoBullets: [
      'Ta gamme s’affiche en couleurs sur la photo de ton handpan.',
      'Apprends de nouveaux accords et progressions, guidé pas à pas.',
      'Explore un atlas de gammes par émotion — et imagine la tienne, sur mesure.',
    ],
    versionAcoCaption: 'Le mode acoustique : l’approche visuelle de Handpan Compagnon, sur ton propre handpan.',
    versionAcoCta: 'Ouvrir l’application',
    versionAcoYishamaLink: 'D’où vient cette approche : mes deux handpans Yishama',
    versionNeoTitle: 'Version Neotone',
    versionNeoText: 'Relie ton Neotone à l’app via MIDI : ton jeu s’affiche en temps réel sur le handpan virtuel, et l’app te guide dans tes accords et tes gammes. Intégration MIDI temps réel.',
    versionNeoCta: 'Découvrir le Neotone',
    storyEyebrow: 'L’histoire — par David Lesage',
    storyTitle: 'L’outil que j’aurais rêvé qu’on m’enseigne, enfant',
    storyP1: 'En découvrant le handpan, j’ai retrouvé le mur de mon enfance : aucune méthode, et la difficulté d’organiser visuellement les chemins de notes. Puis, avec le Neotone, une nouvelle difficulté : les notes changent de place à chaque gamme.',
    storyP2: 'Alors j’ai créé l’outil que j’aurais rêvé qu’on me donne : une approche visuelle de l’harmonie, par les couleurs, les formes et les émotions — pour comprendre, mémoriser, et enfin chanter en m’accompagnant au handpan.',
    storyP3: 'C’est la suite logique de <strong>Now Groove</strong>, ma méthode de rythme (2021) qui rend le rythme accessible par des émoticônes visuelles. Handpan Compagnon fait pareil pour l’harmonie : un outil pensé par un musicien, pour hisser le handpan au rang d’instrument d’accompagnement — comme la guitare ou le piano.',
    waitTitle: 'L’application est disponible',
    waitText: 'Crée ton compte gratuit (nom, prénom, email) pour commencer, directement dans ton navigateur. En continuant, tu acceptes les CGU et la politique de confidentialité. Le choix de la formule et le paiement sécurisé se font dans l’application.',
    waitButton: 'Ouvrir l’application',
    contribEyebrow: 'Une communauté vivante',
    contribTitle: 'Tu ne télécharges pas une app — tu rejoins un projet vivant',
    contribIntro:
      'Handpan Compagnon évolue en permanence, nourri par celles et ceux qui l’utilisent. Ton retour, envoyé en un clic depuis l’application, est lu et oriente directement la suite.',
    contribCards: [
      { t: 'En évolution permanente', d: 'De nouvelles fonctionnalités, gammes et modes arrivent régulièrement, et sont inclus. L’app que tu utilises aujourd’hui sera encore plus riche demain.' },
      { t: 'Ton feedback façonne l’app', d: 'Directement depuis l’application, tu envoies tes idées et tes retours en un clic. Chaque message est lu et oriente les prochaines évolutions.' },
      { t: 'Une communauté, pas un catalogue', d: 'Tu rejoins un mouvement : rendre la musique visible et accessible. Ensemble, on construit l’outil que nous aurions tous rêvé d’avoir, enfant.' },
    ],
    priceEyebrow: 'Tarifs',
    priceTitle: 'Découverte, ou Studio',
    priceIntro:
      'Commence gratuitement avec la Découverte. Passe au Studio pour débloquer le mode électronique Neotone (MIDI), la création avancée, la sauvegarde et l’export PDF/PNG de tes partitions.',
    priceCta: 'Je passe au Studio',
    priceFreeCta: 'Commencer gratuitement',
    pricePopular: 'Le plus choisi',
    priceMax: 'Offre fondateur limitée',
    priceOnce: 'paiement unique',
    pricePerMonth: '/ mois',
    pricePerYear: '/ an',
    priceFree: {
      name: 'Découverte',
      price: 'Gratuit',
      blurb: 'Un compte gratuit pour découvrir l’approche visuelle : visualise, joue et exporte tes partitions en mode acoustique, sans rien payer.',
    },
    priceTiers: {
      monthly: { name: 'Studio mensuel', blurb: 'Débloque le mode électronique (Neotone/MIDI), la création avancée, la sauvegarde et l’export — mois par mois, sans engagement.' },
      annual: { name: 'Studio annuel', blurb: 'Un an d’accès complet : mode électronique (Neotone/MIDI), création avancée, sauvegarde et export. Environ trois mois offerts par rapport au mensuel.' },
      lifetime: { name: 'Studio à vie', blurb: 'Un seul paiement, accès à vie : mode électronique (Neotone/MIDI), création avancée, sauvegarde et export. Offre fondateur, en quantité limitée.' },
    },
    priceNote: 'Montants synchronisés en direct avec Stripe. Le Studio débloque tout l’atelier de création.',
    videosEyebrow: 'L’app en mouvement',
    videosTitle: 'Vois Handpan Compagnon en action',
    videosIntro: 'Douze démonstrations vidéo de l’application — clique sur une vignette pour la lire en plein écran.',
    videos: [
      { t: 'Choisir la tonalité', d: 'Pose une note d’ancrage (ici C) et les 7 degrés colorés apparaissent.' },
      { t: 'Écouter la gamme', d: 'L’app égrène la gamme note après note sur le handpan.' },
      { t: 'L’œil du degré', d: 'Clique sur l’œil d’un degré (ici le I) pour isoler son accord.' },
      { t: 'Notes bonus', d: 'Au-delà des 7 degrés, les notes supplémentaires s’affichent avec une étoile.' },
      { t: 'Styles de tracé', d: 'Une même Constellation, trois façons de la lire : Polygone, Ouvert ou Mains.' },
      { t: 'Transposer', d: 'Déplace la note d’ancrage (C → F) : la forme de l’accord reste à la même place.' },
      { t: 'Couleur ↔ chakra', d: 'Chaque degré porte la couleur de son chakra.' },
      { t: 'Doigtés', d: 'L’app propose un doigté suggéré main gauche / main droite.' },
      { t: 'Jouer les accords', d: 'Lance la lecture : chaque degré s’illumine à son tour et son accord s’épanouit.' },
      { t: 'Apprentissage interactif', d: 'Le handpan devient une surface guidée : touche une note colorée.' },
      { t: 'Atlas Sonore', d: 'Feuillette une bibliothèque de gammes du monde.' },
      { t: 'Création', d: 'Compose ta propre gamme sur la roue chromatique.' },
    ],
    faqEyebrow: 'FAQ',
    faqTitle: 'Les questions qu’on me pose sur Handpan Compagnon',
    faq: [
      { q: 'Faut-il un Neotone pour utiliser Handpan Compagnon ?', a: 'Non. Handpan Compagnon marche sur n’importe quel handpan acoustique, en mode acoustique gratuit, comme sur le handpan électronique Neotone. L’instrument électronique n’est pas nécessaire pour commencer.' },
      { q: 'Handpan Compagnon marche-t-il sur un handpan acoustique ?', a: 'Oui, le mode acoustique est gratuit. Tu visualises ta gamme en couleurs et tu apprends tes accords directement sur ton propre instrument acoustique.' },
      { q: 'Qu’est-ce que les ChromaKeys ?', a: 'C’est le système de couleurs de la méthode : chaque note reçoit une couleur fixe. Tu vois ainsi la structure de la musique d’un seul coup d’œil, sans solfège.' },
      { q: 'Qu’est-ce qu’une Constellation d’accords ?', a: 'C’est la tablature visuelle de la méthode : chaque accord dessine une forme géométrique qui relie ses notes. Tu reconnais et mémorises tes accords par leur forme.' },
      { q: 'Handpan Compagnon est-il gratuit ?', a: 'Handpan Compagnon regroupe beaucoup de fonctionnalités, et c’est ton usage qui décide de ce qui est gratuit ou non. Apprendre le handpan en autonomie, sur ton propre instrument acoustique, est gratuit : visualiser ta gamme en couleurs, reconnaître tes accords, jouer, créer et exporter tes partitions. Devient payant ce qui va au-delà de ta pratique personnelle : le mode électronique Neotone/MIDI, la création avancée, la sauvegarde cloud. Et si tu t’en sers comme outil de travail dans des cours que tu fais payer, c’est une Licence Enseignant — avec l’espace élèves, les exercices et les partitions sans filigrane qui vont avec. Les tarifs à jour sont juste en dessous.' },
    ],
  },
  showroom: {
    title: 'Essayer un handpan à Paris — Showroom | David Lesage',
    description:
      'Essaie les deux univers du handpan à Paris : mes handpans acoustiques Yishama et le handpan électronique Neotone. Showroom David Lesage, 29 rue des Orteaux, Paris 20ᵉ : showcases gratuits, démonstrations privées et cours.',
    heroEyebrow: 'Le Nid · Paris 20ᵉ',
    heroTitle: 'Showroom David Lesage',
    heroLead: 'Un lieu où l’acoustique et l’électronique se jouent côte à côte : mes handpans Yishama et les Neotone, sous tes mains le même après-midi — et une communauté à rencontrer.',
    // ⚠️ Hero du showroom (16/08/2026) : ce CTA est l'OPTION, pas l'entrée.
    // Il est affiché SOUS la date du prochain showcase gratuit, en bouton
    // secondaire. Le libellé dit « individuel privé » pour qu'on comprenne
    // immédiatement que ce n'est pas le showcase public gratuit.
    ctaBook: 'Réserver un créneau individuel privé (payant)',
    // « sur simple inscription » minimisait la réservation : elle est obligatoire.
    ctaBookNote: 'Créneau individuel payant : {grid}. Les showcases publics, eux, sont gratuits — nombre de places limitées · réservation nécessaire.',
    // ⓘ Plus affichée depuis le 17/08/2026 : quand il n'y a plus de date, le hero
    // montre le bloc « prochaines dates en préparation » (agendaEmpty*) au lieu de
    // ce simple bouton. Clé conservée si David veut le remettre.
    ctaNext: 'Voir le prochain showcase',
    exclBadge: '★ Première mondiale',
    exclTitle: 'Repars avec ton Neotone¹, le jour même',
    exclText: 'Je l’assume : Le Nid est le premier lieu au monde où ces instruments sont en vente en direct, sur place. Concrètement, ça veut dire que tu peux acheter ton Neotone¹ ici même et l’emporter immédiatement — sans aucun délai de fabrication. Mes handpans Yishama, eux, ne sont pas à vendre : ce sont mes instruments personnels, ils sont là pour être entendus et joués.',
    exclArgs: ['7 % de remise — le meilleur prix du marché (contre 5 % en ligne)', 'Aucun délai de fabrication ni d’attente', 'Stock ultra limité — quelques instruments disponibles'],

    // ── « Le monde du ET » version showroom : ici, ce n'est pas un choix
    // d'achat mais une EXPÉRIENCE — les deux univers se jouent sur place.
    // ⚖️ Parité stricte dans les deux sens : mettre Yishama en avant, mais
    // JAMAIS plus que Neotone (consigne explicite de David, 11/08).
    // Faits sourcés : les 2 Yishama sont les instruments personnels de David
    // et sont sonorisés par les micros Hisong/Muling (voir `program`) ; les
    // 2 Neotone sont essayables, l'un sur enceinte, l'autre au casque.
    // Seul le Neotone est en stock : c'est dit franchement dans `duoNote`.
    duoEyebrow: 'Sur place · les deux univers',
    duoTitle: 'Acoustique et électronique, le même après-midi',
    duoIntro: 'Le showroom n’est pas là pour te faire choisir un camp. Les deux univers y vivent côte à côte : tu les entends, tu les joues, tu sens la différence dans tes mains. Pas de compétition — de la complétion.',
    duo: [
      {
        sub: 'Acoustique · Yishama',
        title: 'Mes deux handpans Yishama',
        text: 'Mes instruments personnels sont là. Tu les joues, tu les compares, et tu entends ce que le métal martelé fait dans une pièce — sans amplification, puis sonorisés.',
        points: ['Deux instruments de 18 notes, accordés en 432 Hz', 'Sonorisés par les micros Hisong et Muling'],
        cta: 'Mon histoire avec Yishama',
      },
      {
        sub: 'Électronique · Neotone',
        title: 'Les deux Neotone',
        text: 'L’un sur enceinte, l’autre au casque. Tu passes d’une gamme à l’autre, tu essaies les effets et l’enregistreur — le temps qu’il te faut.',
        points: ['Toutes les gammes dans un seul instrument', 'Un sur enceinte, un au casque, effets compris'],
        cta: 'Découvrir le Neotone',
      },
    ],
    duoNote: 'Pour être clair : seul le Neotone est en stock ici — c’est le seul que tu peux emporter le jour même. Les Yishama sont mes instruments personnels : ils sont là pour être entendus et joués, et si tu veux le tien, je t’oriente vers l’atelier (je suis ambassadeur et affilié).',

    eventsEyebrow: 'Ce qu’on y vit',
    eventsTitle: 'Tester, rencontrer, repartir avec',
    eventsHighlight: 'Le plus demandé au démarrage',
    events: [
      { t: 'Showcase de présentation', d: 'Événements de présentation des Neotone par David Lesage, avec test des instruments sur place.', price: 'Public · Gratuit' },
      { t: 'Prise en main de ton instrument', d: 'Tu viens de recevoir ton Neotone, ton handpan ou ton micro ? On règle tout ensemble et on prend les commandes en main, pas à pas. En présentiel ou en visio.', price: '' },
      { t: 'Découverte des instruments', d: 'Une session privée au showroom pour essayer en profondeur tout ce qui t’intéresse : handpans acoustiques Yishama, Neotone, calebasse, Gonilélé, micros Hisong et Muling.', price: '' },
      { t: 'Cours ou accompagnement individuel', d: 'Avec David Lesage, quel que soit ton niveau : créer tes gammes, jouer morceaux et techniques, ou simplement y voir clair sur ce que tu cherches. En présentiel ou en visio.', price: '' },
    ],
    programEyebrow: 'Le déroulé',
    programTitle: 'Au programme d’une session',
    programIntro: 'Chaque session dure environ 2h : un temps d’écoute, de démonstration et d’échange — puis le moment où c’est toi qui joues.',
    program: [
      { t: 'Le Neotone en live', d: 'Je joue devant vous : le son brut, puis avec effets (octaver, réverbe, looper) et au chant — l’interface projetée à l’écran.' },
      { t: 'Handpan Compagnon, l’app qui rend la musique visible', d: 'Démonstration en direct : les couleurs, les constellations d’accords, et comment on apprend en voyant la musique plutôt qu’en déchiffrant des partitions.' },
      { t: 'Le son acoustique & les micros', d: 'Mes deux handpans acoustiques Yishama, sonorisés par les micros Hisong et Muling — pour comparer et entendre la différence.' },
      { t: 'Vos questions', d: 'Un temps d’échange ouvert : je réponds à tout le monde, du curieux débutant au musicien confirmé.' },
      { t: 'À votre tour de jouer', d: 'Essayez les deux Neotone — l’un sur enceinte, l’autre au casque — et mes deux handpans acoustiques Yishama. Prenez le temps de ressentir chaque instrument.' },
    ],
    programNote: 'Enfants bienvenus, sous la responsabilité de leurs parents. L’aspect démonstration, conférence et questions-réponses peut être un peu long pour les plus jeunes : prévoyez si besoin une activité calme, ou le relais d’un autre adulte.',
    booking: 'Prise de rendez-vous sur réservation par email :',
    bookVisitCta: 'Réserver mon créneau au showroom (payant)',
    bookPrivateCta: 'Réserver un rendez-vous individuel',
    agendaEyebrow: 'Agenda',
    agendaTitle: 'Calendrier des showcases publics gratuits',
    // 🚨 RÉSERVATION OBLIGATOIRE (tranché par David le 17/08/2026) : « la
    // réservation est obligatoire, je veux savoir qui vient et récupérer les
    // infos des gens ». La page disait encore « Entrée libre — réservation
    // conseillée », ce qui laissait croire qu'on pouvait passer sans prévenir.
    // ⚠️ Le showcase reste GRATUIT : c'est la RÉSERVATION qui devient
    // nécessaire, jamais l'entrée qui devient payante. Ne pas réintroduire
    // « entrée libre », « réservation conseillée » ni « sans inscription ».
    agendaIntro: 'Présentation des Neotone par David Lesage, avec test des instruments sur place. Gratuit — nombre de places limitées · réservation nécessaire.',
    agendaEmpty: 'Prochaines dates en préparation',
    agendaEmptyText: 'Les prochaines dates sont en cours de calage. Laisse-moi ton email : tu seras prévenu·e en premier, avant l’annonce publique.',
    agendaEmptyCta: 'Me prévenir de la prochaine date',
    agendaNextLabel: 'Prochain showcase gratuit',
    agendaCount: '{n} date à venir',
    agendaCountPlural: '{n} dates à venir',
    // Mots de David (16/08/2026), affichés sous la date dans le hero.
    agendaSeats: 'Gratuit sur réservation · places limitées',
    agendaCta: 'Être prévenu·e des prochains showcases',
    agendaEventTitle: 'Showcase Neotone — découverte & essai',
    agendaEventTag: 'Public · Gratuit',
    agendaEventTime: 'de {start} à {end}',
    // ── « À savoir avant de venir » (16/08/2026).
    // Ces trois règles ne vivaient que dans l'email de confirmation : quelqu'un
    // qui hésite encore, lui, ne les voyait NULLE PART. Elles sont maintenant
    // sur la page, avant même de réserver. Mots de David : l'horaire est ferme
    // (« "viens quand tu veux" c'est pour dire "à la DATE que tu veux" »), la
    // durée réelle tourne autour de 3h avec les discussions, et l'invitation à
    // apporter quelque chose reste FACULTATIVE — un esprit de partage, pas une
    // condition d'entrée.
    agendaRulesTitle: 'À savoir avant de venir',
    agendaRuleTimeTitle: 'La date, tu la choisis — l’heure de début, non',
    agendaRuleTime: 'La session commence à l’heure, par une présentation. Arriver en retard, c’est rater des infos et obliger tout le groupe à repartir en arrière. Si tu arrives en avance, tu peux attendre en bas dans la cour — aucun souci.',
    agendaRuleDurationTitle: 'Compte large sur ta soirée',
    agendaRuleDuration: 'Le programme dure environ 2h — dans les faits, ça tourne plutôt autour de 3h, parce que les discussions continuent bien après.',
    agendaRuleShareTitle: 'Apporte quelque chose à partager, si le cœur t’en dit',
    agendaRuleShare: 'Un jus de fruit, un gâteau, quelque chose à faire passer. Totalement facultatif, jamais une condition pour venir — c’est simplement dans un esprit de partage, pour que le moment soit convivial.',
    agendaBookCta: 'Réserver ma place',
    agendaMoreTitle: 'Tu ne peux pas venir — ou tu préfères un moment rien que pour toi ?',
    agendaMoreText: 'Réserve un rendez-vous individuel avec moi, à un autre moment qui te convient.',
    accessEyebrow: 'Comment venir',
    accessTitle: 'Accès au showroom',
    accessMaps: 'Voir sur Google Maps →',
    access: [
      { icon: '🚌', t: 'Bus', d: 'Lignes 26 et 64 — arrêt Orteaux, à 3 min à pied (≈ 250 m). Ligne 76 — arrêt Bagnolet-Orteaux.' },
      { icon: '🚇', t: 'Métro', d: 'Ligne 9 — Maraîchers (5-7 min) ou Buzenval (10 min). Ligne 2 — Alexandre Dumas (10 min).' },
      { icon: '🚊', t: 'Tramway', d: 'Ligne T3b — station Marie de Miribel (12 min à pied).' },
    ],
  },
  // ============================================================
  // Page /a-propos — biographie de David Lesage.
  // ⚠️ PERSONNE RÉELLE. Chaque fait écrit ici est SOURCÉ :
  // parcours Conservatoire / Bac TMD / Marciac (ancien site Wix,
  // page « parcours »), The Voice saison 11 (auditions à l'aveugle
  // diffusées le 12/02/2022, TF1 — source tierce), Naxos / HONA
  // festival juin 2022 et HUG Hongrie juillet 2022 (récits d'entretien
  // Marketing/Recit-Mag + Recit-Yishama), les 2 Yishama reçus en
  // mai 2023 et le document d'août 2023 devenu l'app (mêmes récits),
  // Now Groove 2021, album L'Alliance du Phoenix (HelloAsso),
  // Le Nid 29 rue des Orteaux (site.ts).
  // 🚫 NE JAMAIS AJOUTER ICI : santé, psychothérapie, diagnostics,
  // famille, finances personnelles, vie privée, profils de personnalité.
  // 🚫 Ne pas dater le début du bêta-test Neotone tant que David n'a
  // pas tranché (l'ancien Wix dit 2021, /le-neotone dit 2023).
  //
  // ⚠️ RÈGLE ABSOLUE (rappel de David, 14/08/2026) : n'écrire ICI que
  // des faits sourcés ou des formulations qu'il a lui-même fournies.
  // INTERDIT : improviser une opinion, une préférence, un conseil ou une
  // interprétation émotionnelle à la 1re personne en son nom. En cas de
  // trou, écrire du factuel neutre — ou laisser le trou et le lui dire.
  //
  // Corrections apportées par David le 14/08/2026 :
  // - ngoni 2018 = le N'Goni de son thérapeute Fred Hervaud (détail qu'il
  //   rend public lui-même) ; la collaboration avec Joris = 2023.
  // - rencontre avec Yonathan : au BAR EXTÉRIEUR du festival (pas au port).
  // - scolarité : collège de Marciac D'ABORD, PUIS le lycée (bac TMD =
  //   Technique de Musique et de Danse, équivalent sport-études musique).
  // - solfège : 7h30/semaine sur 4 niveaux ; il ne sait toujours pas lire.
  // - Aora Mana : cadreur / réalisateur / monteur VR 360° / pilote de drone
  //   — il n'en est PAS co-fondateur.
  // - origine du « pont technique » : formateur Google + sonorisation et
  //   parc informatique du Salon Santé Nature (à Flourens ; le salon a
  //   changé plusieurs fois de lieu — correction de David du 14/08/2026,
  //   ce n'était PAS Toulouse).
  //
  // Corrections complémentaires de David (14/08/2026, 2e passe) :
  // - CALEBASSE = 2012 (il en joue comme percussion depuis 2012) ;
  //   NGONI = 2018 (celui de Fred Hervaud). Les deux sont vrais et
  //   distincts : ne JAMAIS les confondre (la phrase du site Résonances
  //   est ambiguë parce que le ngoni est fabriqué avec une calebasse).
  // - Bac TMD = 2012 (tranche le conflit 2010 / 2012).
  // - Le Nid : ouverture le 13 mars 2026.
  // - Marie-Christine Reculard = sa professeure de chant. PERSONNE RÉELLE :
  //   la description de sa méthode est citée VERBATIM de son site officiel
  //   https://www.mariechristinereculard.com/ — ne rien inventer, ne rien
  //   interpréter. Le lien entre sa méthode et le mode « Chanter & Jouer »
  //   est le propos de David lui-même.
  // ⚠️ « Chanter & Jouer » N'EST PAS accessible publiquement (capacité de
  //   laboratoire dans l'app) : ne jamais l'annoncer comme disponible.
  // ============================================================
  about: {
    title: 'À propos — David Lesage, musicien, pédagogue et inventeur',
    description:
      'Batteur de formation devenu joueur de handpan et chanteur : le Conservatoire, The Voice, Naxos et la scène internationale du handpan, deux instruments sur mesure sans mode d’emploi — et les outils que j’ai fini par construire.',
    heroEyebrow: 'À propos',
    heroTitle: 'Batteur de formation, joueur de handpan, chanteur — et constructeur d’outils',
    heroLead:
      'Je suis David Lesage : batteur de formation devenu joueur de handpan, chanteur, pédagogue — et constructeur d’outils. Voici mon parcours, dans l’ordre, avec ses dates.',
    heroImgAlt: 'David Lesage, musicien',
    heroCtaStory: 'Lire l’histoire',
    heroCtaToday: 'Ce que je fais aujourd’hui',

    storyEyebrow: 'Mon histoire',
    storyTitle: 'De la batterie au handpan, par un long détour',
    storyIntro:
      'Les étapes, les rencontres et les dates qui mènent aux instruments que je joue et aux outils que je construis.',

    chapters: [
      {
        eyebrow: 'Les débuts',
        title: 'La batterie à 4 ans, puis le solfège',
        paras: [
          'J’ai commencé la musique à 4 ans, à la batterie. Dès mon premier cours, on m’a imposé la lecture de partitions. J’ai tout arrêté, et j’ai appris en autodidacte, à l’oreille.',
          'J’y suis revenu par les études, dans cet ordre : d’abord quatre ans au collège de jazz de Marciac — la section jazz adossée au festival, parrainée par Wynton Marsalis —, où je découvre l’improvisation vocale ; ensuite le lycée, avec un bac <strong>TMD — Technique de Musique et de Danse</strong>, obtenu en 2012 au lycée Saint-Sernin à Toulouse. C’est l’équivalent d’un sport-études, mais musique/études — on parle aussi d’horaires aménagés. Puis quatre ans au Conservatoire de Toulouse, dont je sors en 2013 avec un prix de batterie mention très bien.',
          'Pour « rattraper mon retard », j’ai eu 7h30 de cours de solfège par semaine, dans 4 niveaux différents. Je ne sais toujours pas lire la musique… tellement la pédagogie était déconnectée de la sensation et du sens, avec une approche uniquement tournée vers la musique classique.',
        ],
      },
      {
        eyebrow: 'Les détours',
        title: 'Vidéo, formation, réalité virtuelle',
        paras: [
          'J’ai monté des groupes, appris la captation et le montage vidéo, rejoint en 2017 l’équipe de Thierry Vanoffe comme formateur et créateur des vidéos de la chaîne Numéricoach, puis travaillé à partir de 2020 sur Aora Mana — l’une des premières plateformes de voyages initiatiques en réalité virtuelle — comme cadreur, réalisateur, monteur en réalité virtuelle 360° et pilote de drone.',
          'Je passe les auditions à l’aveugle de The Voice sur TF1, saison 11, avec un chant africain : <em>Koth Biro</em> — enregistrées le 21 décembre 2021, diffusées le 12 février 2022. À la suite de l’émission, je suis invité pour un concert solo en Côte d’Ivoire.',
          'En travaillant en tant que formateur Google, je réalise à quel point je suis doué pour trouver des solutions techniques et technologiques aux problèmes des gens. Mais déjà bien avant ça, je m’occupais de la sonorisation des conférences du Salon Santé Nature, à Flourens — le salon a changé plusieurs fois d’endroit —, et de leur parc informatique. J’ai toujours aidé les gens à trouver des astuces et solutions à leurs problèmes informatiques.',
        ],
      },
      {
        eyebrow: 'Transmettre',
        title: 'La calebasse, Now Groove et le ngoni',
        paras: [
          'Je joue de la calebasse, comme instrument de percussion, depuis 2012.',
          'À la calebasse, il me manquait la caisse claire et le charley. J’ai résolu le manque avec des œufs en plastique — un bricolage qui est devenu une façon de jouer, puis une façon d’enseigner.',
          'C’est devenu Now Groove (2021) : une méthode de rythme par appels-réponses et émoticônes visuelles, qui tient debout avec cinquante personnes dans la même salle.',
          'En 2018, alors que je suis dévasté par une rupture amoureuse, mon thérapeute Fred Hervaud me remet entre les mains son propre N’Goni : c’est ma rencontre avec l’instrument. En 2023 commence ma collaboration avec Joris Feuillâtre, autour de la harpe gonilélé, que je transmets aujourd’hui comme ambassadeur de La Maison du Ngoni. Mes cours et mes ateliers tournent sous Now Music Academy, portée par l’association Résonances Productions.',
        ],
      },
      {
        eyebrow: 'Le chant',
        title: 'Marie-Christine Reculard et le chant holistique',
        paras: [
          'Marie-Christine Reculard est ma professeure de chant. Elle a créé <em>Le Chant Holistique</em>, qu’elle décrit sur son site comme « une méthode unique de chant thérapeutique et énergétique par la voix, les couleurs, les voyelles sacrées, les mantras, le yoga et les techniques de respirations ». Son site : <a href="https://www.mariechristinereculard.com/" target="_blank" rel="noopener" class="underline">mariechristinereculard.com</a>.',
          'Sa méthode m’a inspiré, notamment pour un mode « Chanter & Jouer » — chanter en s’accompagnant au handpan — sur lequel je travaille pour Handpan Compagnon. Il est encore au stade de laboratoire : il n’est pas accessible dans l’application aujourd’hui.',
        ],
      },
      {
        eyebrow: 'Naxos, Grèce · juin 2022',
        title: 'Le concert qui m’a fait entrer dans le monde du handpan',
        paras: [
          'Je joue au HONA Festival, à Agia Anna. Quand j’arrive, je ne suis personne : la scène est minuscule, la sono est mauvaise, il n’y a pas de retour. Mais je propose quelque chose qu’on n’avait pas vu — je chante, je joue trois handpans en même temps, et je fais les percussions aux pieds et aux mains.',
          'Le lendemain, je croise un homme au bar extérieur du festival. Je ne sais pas qui c’est ; on m’explique que c’est l’un des meilleurs fabricants de handpan au monde. C’est Yonathan, de Yishama. Il m’écoute longuement, calmement, et n’essaie pas de me vendre ses instruments.',
          'Ce même été, on met entre mes mains le tout premier Neotone en version bêta. Un mois plus tard je joue au festival HUG en Hongrie, je passe par l’atelier, et je repars avec un Neotone bêta et un engagement clair : remonter les bugs et aider à faire évoluer l’instrument. Je le fais depuis — des milliers de retours plus tard, je connais personnellement Csaba, Norbert et l’équipe de Soundventure à Budapest.',
        ],
      },
      {
        eyebrow: 'Mai 2023 → août 2023',
        title: 'Deux instruments magnifiques, et aucun mode d’emploi',
        paras: [
          'En mai 2023, je reçois les deux handpans que Yonathan a dessinés pour moi : dix-huit notes chacun, accordés en 432 Hz, pensés pour une seule chose — que je puisse chanter en m’accompagnant, dans n’importe quelle tonalité.',
          'Il n’existait pas de méthode. Le handpan est un instrument du XXIᵉ siècle, encore en pleine évolution, souvent modal, et il y a presque autant de dispositions de notes que d’instruments.',
          'En août 2023, j’ouvre un document — juste pour arriver à voir quels accords je peux faire sur mes propres instruments. Quelques mois plus tard, Yonathan me suggère d’en faire un petit livret d’accords, pour moi. J’ai fait le livret. Il est devenu une application.',
        ],
      },
    ],

    quoteNaxos: 'À ce moment-là, je ne réalise pas que je rentre dans un cercle ultra-privé du monde du handpan international.',
    quoteNaxosSource: 'Ce que je raconte de ce concert',
    quoteShips: 'C’est comme si j’avais deux vaisseaux spatiaux, mais que je ne savais pas les piloter.',
    quoteShipsSource: 'Mes deux Yishama, les premiers mois',

    linkYishama: 'Mon histoire avec Yonathan et mes deux Yishama',
    linkApp: 'Découvrir Handpan Compagnon',

    todayEyebrow: 'Aujourd’hui · Paris 20ᵉ',
    todayTitle: 'Musicien, prof, et constructeur d’outils',
    todayIntro:
      'Je suis intermittent du spectacle, installé à Paris. Le Nid, au 29 rue des Orteaux dans le 20ᵉ, est le lieu que je porte avec Iris Chasles, ouvert le 13 mars 2026 : un lieu à taille humaine, dans l’est parisien, où l’on reçoit en petit comité. Cinq propositions s’y croisent — concerts, workshop de rythme à la calebasse, cours individuels, atelier de yoga et accompagnement psycho-corporel —, auxquelles s’ajoutent les présentations d’instruments, gratuites et sur inscription. On peut y toucher, essayer, écouter, et repartir avec son Neotone le jour même. Mes deux Yishama y sont aussi, pas à vendre, juste pour être joués. Le programme complet est publié par l’association Résonances Productions.',
    today: [
      { t: 'Je joue', d: 'Handpan, voix, calebasse et ngoni sur scène : 112 dates recensées de 2009 à 2026, dans 7 pays — dont 21 à Jazz in Marciac, deux éditions du Sziget à Budapest, l’Everness Festival en Hongrie et une première partie d’Amadou &amp; Mariam. Deux opus enregistrés sous le titre L’Alliance du Phoenix, et des showcases gratuits au Nid presque chaque mois.' },
      { t: 'J’enseigne', d: 'Now Music Academy : handpan, rythme à la calebasse et harpe gonilélé, en visio partout dans le monde ou en présentiel à Paris. Je réponds personnellement.' },
      { t: 'Je construis', d: 'Handpan Compagnon rend l’harmonie visible par les couleurs, les formes et les émotions. Guso Facile fait la même chose pour l’administratif des intermittents.' },
      { t: 'Je fais le pont', d: 'Bêta-testeur Neotone (Soundventure, Budapest), ambassadeur et affilié Yishama, ambassadeur La Maison du Ngoni.' },
    ],

    milestonesEyebrow: 'Repères',
    milestonesTitle: 'Quelques jalons datés',
    milestones: [
      { y: '2012', t: 'Bac TMD — Technique de Musique et de Danse, lycée Saint-Sernin, Toulouse.' },
      { y: '2012', t: 'Je commence la calebasse, comme instrument de percussion.' },
      { y: '2013', t: 'Prix de batterie, mention très bien — Conservatoire de Toulouse.' },
      { y: '2018', t: 'Je découvre le ngoni — celui de mon thérapeute, Fred Hervaud.' },
      { y: '2021', t: 'Now Groove — ma méthode de rythme visuelle à la calebasse.' },
      { y: 'Févr. 2022', t: 'The Voice saison 11 (TF1) : audition à l’aveugle enregistrée le 21/12/2021, diffusée le 12/02/2022. Puis un concert solo en Côte d’Ivoire.' },
      { y: 'Juin 2022', t: 'HONA Festival, Naxos. Rencontre avec Yonathan (Yishama), premier Neotone bêta en main.' },
      { y: 'Juil. 2022', t: 'Festival HUG, Hongrie. Je repars de l’atelier avec un Neotone bêta.' },
      { y: '2023', t: 'Début de ma collaboration avec Joris Feuillâtre (harpe gonilélé).' },
      { y: 'Mai 2023', t: 'Je reçois mes deux handpans Yishama : 18 notes chacun, 432 Hz.' },
      { y: 'Août 2023', t: 'Le document qui deviendra Handpan Compagnon.' },
      { y: '13 mars 2026', t: 'Ouverture du Nid, 29 rue des Orteaux, Paris 20ᵉ.' },
      { y: 'Aujourd’hui', t: 'Le Nid, Paris 20ᵉ — cours, essais et showcases.' },
    ],

    visionEyebrow: 'Ma vision pédagogique',
    visionTitle: 'Le handpan, un instrument d’accompagnement à part entière',
    visionIntro:
      'Avec cette approche, le handpan prend enfin sa place aux côtés de la guitare et du piano. Grâce aux « 4 Magiques » (I-IV-V-VI), n’importe qui peut accompagner les morceaux qu’il aime en quelques minutes, tout en abordant la théorie comme un jeu.',
    pillars: [
      { t: 'Visible', d: 'La couleur, la géométrie et l’émotion remplacent le jargon. On voit la musique avant de la nommer.' },
      { t: 'Accessible', d: 'Tutoiement, simplicité, chaleur. De l’enfant curieux au musicien confirmé — je réponds personnellement.' },
      { t: 'Vérifiable', d: 'Conservatoire de Toulouse, scène, bêta-test Neotone au long cours : des repères datés, que chacun peut vérifier.' },
    ],

    proofsEyebrow: 'Mes repères',
    proofsTitle: 'Crédibilité & parcours',
    proofsIntro: 'Des repères datés et vérifiables.',
    proofs: [
      'Prix de batterie mention très bien · Conservatoire de Toulouse (2013)',
      'Collège de jazz de Marciac · quatre ans',
      'Ambitus vocal de cinq octaves',
      'The Voice saison 11 · audition à l’aveugle (TF1, 12/02/2022)',
      '112 dates de scène recensées · 2009–2026, 7 pays',
      'Intermittent du spectacle',
      'Bêta-testeur Neotone (Soundventure, Budapest)',
      'Ambassadeur et affilié Yishama',
      'Ambassadeur La Maison du Ngoni',
      'Le Nid · 29 rue des Orteaux, Paris 20ᵉ',
      'Résonances Productions · association loi 1901',
      'L’Alliance du Phoenix · Opus I & II',
    ],

    collabEyebrow: 'Collaborations',
    collabTitle: 'Tu as un projet ? Parlons-en.',
    collabIntro: 'Pédagogie musicale, handpan, mes outils — ou tout autre projet, même hors Neotone. Marques, organisateurs, médias, collaborateurs : la porte est ouverte.',
    collabCta1: 'Travaillons ensemble',
    collabCta2: 'Me contacter',
  },
  contact: {
    title: 'Contact — David Lesage, musicien & pédagogue',
    description:
      'Je réponds personnellement à chaque message — un musicien, pas un service client. Pour ton achat, tes cours, l’app ou une collaboration : écris-moi.',
    eyebrow: 'Contact',
    title2: 'Une question ? Parlons-en.',
    intro: 'Je réponds personnellement à chaque message — je ne suis pas un service client, mais un musicien qui joue le Neotone au quotidien. Pour choisir ton modèle, ton bois, ou organiser ta venue : écris-moi.',
    coords: { email: 'Email — réponse rapide', phone: 'Téléphone', showroom: 'Showroom · sur rendez-vous' },
    form: { name: 'Nom & prénom', email: 'Email', subject: 'Sujet', message: 'Message', submit: 'M’écrire', note: 'Sinon, écris-moi directement à' },
    subjects: ['Achat d’un Neotone', 'Cours', 'Handpan Compagnon', 'Collaboration', 'Presse', 'Autre'],
  },
  legal: {
    title: 'Mentions légales — David Lesage',
    description:
      'Mentions légales et conditions du site David Lesage : éditeur, hébergement, propriété intellectuelle, prix et TVA. Showroom 29 rue des Orteaux, Paris 20ᵉ.',
    h1: 'Mentions légales du site David Lesage',
    blocks: [
      { h: 'Éditeur', p: 'David Lesage — musicien, pédagogue et inventeur. Showroom : 29 rue des Orteaux, 75020 Paris. Email : contact@lesagedavid.fr · Téléphone : +33 6 10 73 31 52.' },
      { h: 'Hébergement', p: 'Site statique généré avec Astro, hébergé par Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis — vercel.com. Nom de domaine géré par OVH SAS, 2 rue Kellermann, 59100 Roubaix, France.' },
      { h: 'Propriété intellectuelle', p: 'Les contenus, textes, photographies et vidéos de ce site sont la propriété de leurs auteurs respectifs. Les photographies et spécifications produit Neotone proviennent de la documentation officielle Soundventure Ltd. David Lesage est ambassadeur indépendant Neotone.' },
      { h: 'Prix & TVA', p: 'Tous les prix affichés sont indicatifs et peuvent évoluer sans préavis. Les taux de TVA appliqués par le calculateur sont les taux standards en vigueur en 2026 ; les frais de douane hors UE restent à la charge de l’acheteur.' },
    ],
  },
  // ── CONDITIONS GÉNÉRALES (page /conditions-generales) ─────────────────────
  // 🚨 PAGE JURIDIQUE PUBLIÉE AU NOM D'UNE PERSONNE RÉELLE. Même règle que la
  // page /a-propos : rien d'inventé, chaque affirmation est vérifiable dans le
  // dépôt ou dans les faits. Sources de chaque affirmation, vérifiées le
  // 17/08/2026 :
  //  · Identité de l'éditeur → recopiée MOT POUR MOT du bloc `legal` ci-dessus
  //    (aucun SIRET ni forme juridique n'y figure : ne PAS en inventer un).
  //  · Données collectées → BookingForm.astro, ContactPage.astro,
  //    BetaNotice.astro, MulingOrderForm.astro + l'objet `profile` de
  //    supabase/functions/site-lead/index.ts.
  //  · Supabase hébergé en Irlande → projet zqcuhnjjrgmybftppkcl, région
  //    `eu-west-1` (API Supabase).
  //  · Fonctions serveur aux États-Unis → en-tête `x-vercel-id: lhr1::iad1::…`
  //    sur https://www.lesagedavid.fr/api/subscribe (iad1 = Washington).
  //  · Messagerie chez Google → MX de lesagedavid.fr = aspmx.l.google.com,
  //    SPF `include:_spf.google.com`.
  //  · Aucun cookie / aucune mesure d'audience → aucun `set-cookie` en prod,
  //    aucune occurrence de @vercel/analytics, gtag, fbq, matomo… dans le dépôt.
  //    localStorage sert UNIQUEMENT à mémoriser la langue (Layout.astro).
  //  · Google Fonts + i.ytimg.com chargés à l'affichage → Layout.astro,
  //    YouTube.astro (vérifiés présents dans le HTML de production).
  //  · Muling (Chine) destinataire → MULING_EMAIL = '85846599@qq.com' (QQ /
  //    Tencent, Chine) dans muling-order/index.ts ; les champs listés dans la
  //    page sont EXACTEMENT ceux de `mulingHtml()` (nom, email, téléphone,
  //    quantité, pays, adresse, consigne de livraison, montant, référence — le
  //    message libre n'y est PAS, il ne part qu'en `admin_note`).
  //  · Paiement Muling en Allemagne → `BANK` du même fichier : IBAN DE17…,
  //    BIC SXPYDEHH, « Banking Circle S.A. — succursale allemande », bénéficiaire
  //    = le fabricant lui-même. Argent et données ne suivent PAS le même chemin.
  //  · Rôle de démonstrateur + affiliation perçue par Résonances Productions →
  //    mots de David du 17/08/2026 (voir le commentaire de la section). Le
  //    « association loi 1901 » vient du bloc `showroom` de ce fichier, déjà
  //    publié. Ne rien affirmer de plus sur le lien juridique : rien d'autre
  //    n'est sourcé.
  //  · Stripe = lecture des tarifs seulement → api/prices.js, src/lib/prices.ts.
  //  · Lien de désinscription → Edge Function `unsubscribe-updates` ACTIVE.
  //  · Snipcart est dans le code mais DÉSACTIVÉ en production (aucune clé
  //    PUBLIC_SNIPCART_KEY) → volontairement non cité, aucun paiement sur le site.
  // ⚠️ `version` DOIT rester égal à TERMS_VERSION dans site-lead/index.ts ET
  //    dans muling-order/index.ts (les TROIS) : c'est ce couple qui permet de
  //    savoir quel texte chaque personne a accepté. Changer le texte → changer
  //    les trois, jamais un seul.
  //    (17/08/2026 : la version n'a PAS été incrémentée en ajoutant la case
  //    facultative « nouveautés » — ce texte-ci n'a jamais été mis en ligne, donc
  //    personne n'a accepté la version antérieure. À la prochaine modification
  //    après déploiement, incrémenter.)
  terms: {
    title: 'Conditions générales — David Lesage',
    description:
      'Conditions générales du site David Lesage : ce que je collecte dans les formulaires, pourquoi, avec quels outils, combien de temps je le garde, et comment exercer tes droits.',
    h1: 'Conditions générales',
    versionLabel: 'Version',
    version: '2026-08-17',
    updatedLabel: 'Dernière mise à jour',
    updated: '17 août 2026',
    lead: 'Cette page dit en clair ce qui se passe quand tu remplis un formulaire sur ce site : ce que je collecte, pourquoi, avec quels outils, combien de temps je le garde, et comment tu reprends la main quand tu veux. Pas de jargon. Si quelque chose n’est pas clair, écris-moi — c’est moi qui lis.',
    // Mention voulue par David (17/08/2026) : le dispositif se construit, le texte suivra.
    // Ne pas la retirer sans son accord — elle est là pour ne pas faire passer un cadre
    // en cours d’installation pour un cadre définitif.
    inProgress:
      'Ce document accompagne la mise en place d’un écosystème encore en construction — le site, l’application, le showroom et les partenariats avec les fabricants s’installent progressivement. Il évoluera donc au fil de cette mise en place. La version en vigueur est celle indiquée ci-dessus, et c’est celle que tu acceptes en cochant la case d’un formulaire.',
    sections: [
      {
        h: 'Qui est responsable',
        p: 'David Lesage — musicien, pédagogue et inventeur. Showroom : 29 rue des Orteaux, 75020 Paris. Email : contact@lesagedavid.fr · Téléphone : +33 6 10 73 31 52. Il n’y a pas de service marketing derrière ce site : c’est moi qui décide de ce qui est collecté, moi qui le lis, et moi qui te réponds.',
        items: [] as string[],
      },
      {
        // ⚠️ MOTS DE DAVID (17/08/2026), à ne pas « améliorer » : « c'est
        // résonances productions qui reçoit les fonds, David est un
        // démonstrateur, je ne suis pas directement rémunéré. Résonances reçoit
        // cet argent, c'est du partenariat d'affiliation. »
        // « association loi 1901 » est repris du bloc `showroom` de ce même
        // fichier (déjà publié sur le site) — aucun autre lien juridique entre
        // David et l'association n'est affirmé ici, parce qu'aucun n'est sourcé.
        //
        // (17/08/2026) IDENTIFICATION DE L'ASSOCIATION ajoutée. Source unique :
        // https://www.resonancesproductions.org/association (page publique de
        // l'association), transmise par David. Rien d'autre n'a été déduit :
        // pas de n° de TVA, pas de nom de dirigeant, pas d'autre date.
        // 🚨 L'ÉDITEUR DU SITE RESTE DAVID LESAGE, personne physique (voir la
        // section « Qui est responsable » ci-dessus et la page Mentions
        // légales). La question « éditer le site au nom de l'association ? »
        // est en attente d'arbitrage — ajouter une identification n'est PAS
        // transférer une responsabilité. Ne pas modifier ce point sans David.
        h: 'Mon rôle, et qui perçoit l’argent',
        p: 'Autant le dire d’emblée, ça évite les malentendus : je présente sur ce site des instruments fabriqués par des partenaires — Neotone, Yishama, les micros, les harpes Gonilélé. J’interviens comme démonstrateur, et je ne suis pas rémunéré directement par ces ventes.',
        items: [
          'Ces partenariats sont des partenariats d’affiliation : ils donnent lieu à une rémunération, et c’est l’association Résonances Productions (association loi 1901 à but non lucratif) qui la perçoit, pas moi à titre personnel.',
          'Pour que tu saches précisément de qui il s’agit, voici son identification : Résonances Productions, association loi 1901 à but non lucratif, déclarée à la sous-préfecture de Pamiers et publiée au Journal officiel des associations le 28 octobre 2017 — n° RNA W092002501, SIRET 919 514 075 00010, code APE 9001Z (arts du spectacle vivant). Siège social : 2 impasse des Bleuets, 09600 Aigues-Vives. Adresse de correspondance : 29 rue des Orteaux, 75020 Paris. Courriel : contact@resonancesproductions.org.',
          'Cette identification dit qui perçoit ces sommes, et rien de plus : l’éditeur de ce site est David Lesage, personne physique — c’est lui le responsable de cette page et de tes données, comme indiqué juste au-dessus et sur les mentions légales.',
          'Ça ne change rien à ce que je te dis d’un instrument : je te réponds en musicien qui joue ces instruments au quotidien, et je préfère te dire qu’un instrument ne te convient pas plutôt que de te le vendre.',
          'Aucun paiement n’est encaissé sur ce site, ni par moi. Les achats se font ailleurs : sur la boutique HelloAsso de Résonances Productions, dans l’application pour son abonnement, ou directement auprès du fabricant pour un micro Muling.',
        ],
      },
      {
        h: 'Ce que tu me donnes, formulaire par formulaire',
        p: 'Rien n’est collecté à ton insu : tout vient de ce que tu écris toi-même. Les champs facultatifs restent vides si tu n’y touches pas.',
        items: [
          'Réservation (venue au showroom, place à un showcase, rendez-vous individuel, demande de code de remise Neotone) : prénom, nom, email, téléphone si tu le donnes, nombre de personnes, date visée, jusqu’à trois créneaux que tu proposes, type et format de séance (sur place ou en visio), instruments que tu veux découvrir, modèle Neotone envisagé, pays, compte de réseau social, comment tu m’as connu, depuis quand tu joues, ce que tu aimerais réussir, et ton message.',
          'Contact : nom et prénom, email, sujet, message.',
          'Liste d’attente de l’application : prénom, nom, email, si tu as déjà un handpan et lequel, la ou les casquettes que tu déclares (pour toi, pour enseigner, pour fabriquer), ton objectif, ton nombre d’élèves et — si tu fabriques des handpans — ton pays, le nombre de notes que tu produis, les métaux que tu travailles et ta façon de fixer tes prix. Plus ta motivation, si tu candidates comme bêta-testeur.',
          'Commande du micro Muling : prénom, nom, email, téléphone, quantité, adresse de livraison complète, consignes pour le livreur, message, puis la preuve de virement que tu déposes (image ou PDF).',
          'Dans tous les cas s’ajoutent automatiquement : la langue du site, la page d’où part ta demande, la date et l’heure auxquelles tu as accepté ces conditions avec leur numéro de version, et — si tu as coché la seconde case, celle qui est facultative — la date à laquelle tu as accepté de recevoir mes nouveautés.',
        ],
      },
      {
        h: 'Ce que j’en fais',
        p: 'Trois choses, pas une de plus.',
        items: [
          'Te répondre. C’est la raison d’être de chaque formulaire : je lis et je réponds personnellement.',
          'Organiser ce que tu as demandé : confirmer un créneau, préparer les instruments pour ta venue, faire suivre une commande. Une demande de rendez-vous individuel crée aussi une proposition de cours dans mon agenda, à l’intérieur de l’application.',
          'Te tenir au courant de mes nouveautés — mais seulement si tu as coché la seconde case du formulaire, celle qui est facultative et qui n’est jamais cochée d’avance : une nouvelle date de showcase, l’ouverture de l’application, un nouvel instrument. Si tu ne la coches pas, je ne t’écris que pour ta demande, et rien d’autre. Si tu la coches, j’écris peu, et je cible : selon la porte par laquelle tu es entré et selon ce que tu as déclaré t’intéresser, tu ne reçois pas la même chose que quelqu’un d’autre. Tu peux dire stop quand tu veux, sans avoir à te justifier.',
        ],
      },
      {
        h: 'Sur quelle base',
        p: 'Sur ton consentement — et il y a deux cases, parce qu’il y a deux choses différentes. Tu peux retirer l’un comme l’autre à tout moment : ça n’annule pas ce qui a déjà été fait, mais ça arrête tout pour la suite.',
        items: [
          'La case « J’accepte les conditions générales » est obligatoire : sans elle je ne peux pas traiter ta demande. La date de ton acceptation est enregistrée avec le numéro de version de cette page — c’est ce qui permet de savoir plus tard quel texte exactement tu avais sous les yeux.',
          'La case « Je veux être informé·e des prochaines dates et des nouveautés » est facultative, et elle n’est jamais cochée d’avance. Elle ne conditionne rien : ton formulaire part exactement pareil si tu la laisses vide. Accepter les conditions générales ne vaut pas accord pour recevoir mes nouveautés — c’est pour ça que ce sont deux cases et non une.',
          'Pour une commande de micro, tes coordonnées de livraison sont en plus tout simplement nécessaires pour que le colis parte.',
        ],
      },
      {
        h: 'Les outils qui voient passer tes données',
        p: 'Je ne vends ni ne loue aucune donnée, à personne, jamais. Voici la liste complète des services qui interviennent réellement.',
        items: [
          'Supabase — la base de données où tes réponses sont enregistrées, et l’espace de stockage des preuves de virement. Le projet est hébergé en Irlande, dans l’Union européenne.',
          'Vercel — l’hébergeur du site. Les petites fonctions serveur qui relaient les formulaires s’exécutent aux États-Unis.',
          'La messagerie contact@lesagedavid.fr — c’est là qu’arrivent les notifications et que je te réponds. Elle est hébergée chez Google.',
          'Google Fonts et les vignettes YouTube — le site charge ses polices d’écriture et les miniatures des vidéos depuis les serveurs de Google. Aucune de tes réponses ne leur est transmise, mais l’adresse IP de ton navigateur, oui.',
          'YouTube — une vidéo ne se charge que si tu cliques dessus, et elle passe par youtube-nocookie.com. Tant que tu ne cliques pas, rien ne part.',
          'Muling Musical Instruments Co., Ltd. (Chine) — uniquement si tu commandes un micro : c’est le fabricant qui expédie, ta commande lui est donc envoyée par email, à une adresse chinoise. Ce message contient ton nom, ton email, ton téléphone, la quantité commandée, ton pays, ton adresse complète, tes consignes de livraison, le montant et la référence de commande. Une case dédiée te le demande explicitement avant l’envoi. Le fait que le virement, lui, parte sur un compte allemand n’y change rien : ces informations partent bien en Chine.',
          'OVH — le nom de domaine lesagedavid.fr.',
          'HelloAsso — certains produits, cours et stages s’achètent sur la boutique HelloAsso de Résonances Productions. En cliquant, tu quittes ce site : c’est alors la politique de HelloAsso qui s’applique, et rien de ce que tu saisis là-bas ne passe par ici.',
          'Stripe — le site y lit les tarifs affichés de l’application, et rien d’autre : aucune donnée personnelle ne lui est envoyée depuis ce site. L’abonnement et son paiement se font dans l’application, sur son propre site.',
        ],
      },
      {
        h: 'Ce qui sort de l’Union européenne',
        p: 'Autant le dire franchement : une partie du chemin passe hors d’Europe. La base de données, elle, reste en Irlande.',
        items: [
          'Les fonctions serveur qui relaient les formulaires s’exécutent aux États-Unis, chez Vercel.',
          'Ma messagerie est hébergée chez Google, société américaine — donc les emails que nous échangeons aussi.',
          'Les polices d’écriture et les vignettes vidéo sont chargées depuis des serveurs de Google.',
          // ⚠️ Vérifié dans supabase/functions/muling-order/index.ts : MULING_EMAIL
          // = 85846599@qq.com (QQ / Tencent, Chine) et `mulingHtml()` liste
          // exactement ces champs. Le compte bancaire est allemand (BANK.iban =
          // DE17…), mais l'argent et les données ne suivent PAS le même chemin :
          // ne jamais laisser entendre que rien ne sort d'Europe.
          'Pour une commande de micro uniquement, ta commande part en Chine, par email, chez le fabricant : nom, email, téléphone, quantité, pays, adresse complète, consignes de livraison, montant et référence. C’est indispensable pour qu’il puisse t’expédier le colis. Attention à ne pas confondre avec le paiement, qui lui reste en Europe : ce sont deux chemins différents.',
        ],
      },
      {
        h: 'Combien de temps je garde tout ça',
        // ⚠️ Ne PAS réintroduire « ou tu cliques dans un de mes emails » : aucun
        // suivi de clic n'existe (aucun pixel, aucun lien tracé — cf. la section
        // « Cookies et mesure d'audience »), et David n'en veut pas. La règle
        // est bien 3 ans après le dernier ÉCHANGE, ça c'est sa décision.
        p: 'Trois ans après notre dernier échange. Et le compteur repart de zéro à chaque nouvel échange : tu m’écris, tu me réponds, tu réserves, tu commandes, et les trois ans recommencent. Si plus rien ne se passe pendant trois ans, tes informations sont effacées. Tu peux évidemment demander leur effacement bien avant — voir plus bas.',
        items: [] as string[],
      },
      {
        h: 'Cookies et mesure d’audience',
        p: 'Ce site ne dépose aucun cookie. Il n’utilise aucun outil de mesure d’audience, aucun pixel publicitaire, aucun traceur — c’est pour ça qu’il n’y a pas de bandeau à accepter en arrivant. La seule chose que ton navigateur retient localement, c’est la langue que tu as choisie : elle ne quitte jamais ton appareil.',
        items: [] as string[],
      },
      {
        h: 'Tes droits, et comment les exercer',
        p: 'Un seul geste suffit : écris à contact@lesagedavid.fr. Pas de formulaire à remplir, pas de justificatif à fournir tant que je n’ai pas de doute sérieux sur ton identité. Je te réponds personnellement, dans un délai d’un mois au maximum.',
        items: [
          'Accès — savoir exactement ce que j’ai sur toi ; je peux t’en envoyer la copie.',
          'Rectification — corriger une information fausse ou dépassée.',
          'Effacement — tout supprimer.',
          'Opposition — refuser un usage, en particulier les emails de nouveautés.',
          'Portabilité — récupérer ce que tu m’as donné dans un fichier réutilisable ailleurs.',
          'Limitation — demander que tes informations soient mises de côté le temps qu’on règle un désaccord.',
          'Retrait du consentement — à tout moment, sans avoir à te justifier.',
        ],
      },
      {
        h: 'Ne plus recevoir mes emails',
        p: 'Chaque email de nouveautés contient un lien de désinscription : un clic, c’est réglé. Sinon, une ligne à contact@lesagedavid.fr suffit — « stop » fait très bien l’affaire, et tu n’as rien à justifier. Ça n’annule ni un rendez-vous ni une commande en cours : les messages nécessaires au suivi de ta demande, eux, continuent de partir.',
        items: [] as string[],
      },
      {
        h: 'Si tu n’es pas d’accord avec moi',
        p: 'Tu peux introduire une réclamation auprès de la CNIL, l’autorité française de protection des données : CNIL, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — www.cnil.fr. Mais écris-moi d’abord si tu veux : c’est plus rapide, et je préfère régler les choses directement.',
        items: [] as string[],
      },
      {
        h: 'Sécurité',
        p: 'Le site est servi en HTTPS de bout en bout. La base de données n’est accessible qu’avec des identifiants dédiés, et ses règles d’accès font que seul mon compte administrateur peut lire les demandes. Les preuves de virement déposées lors d’une commande vont dans un espace de stockage privé, jamais public. Aucune donnée bancaire ne se saisit sur ce site : aucun paiement n’y est encaissé.',
        items: [] as string[],
      },
      {
        h: 'Rendez-vous, showcases et commandes',
        p: 'Aucun paiement ne se fait sur ce site. Un rendez-vous individuel se règle par le lien que je t’envoie dans ma réponse : c’est le règlement qui réserve ton créneau et nous engage tous les deux. Jusqu’à 24 h avant, on le décale sans aucun souci ; à moins de 24 h, le règlement reste acquis mais tu ne perds pas ton rendez-vous — on le reporte dans les 3 mois. Les showcases sont gratuits, sur réservation, avec un nombre de places limité. Une commande de micro Muling se règle par virement bancaire, sur un compte situé en Allemagne, directement auprès du fabricant : c’est toi qui fais la démarche, à ton initiative, et ni ce site ni moi n’encaissons ce paiement. Le fabricant assure ensuite l’expédition et le suivi.',
        items: [] as string[],
      },
      {
        h: 'Les contenus du site',
        p: 'Textes, photographies et vidéos appartiennent à leurs auteurs respectifs. Le détail — éditeur, hébergement, propriété intellectuelle, prix et TVA — est sur la page Mentions légales.',
        items: [] as string[],
      },
      {
        h: 'Si ces conditions changent',
        p: 'Cette page porte un numéro de version et une date. Quand le texte change, la version change avec lui, et la nouvelle s’applique aux formulaires envoyés ensuite. Ce que tu as accepté, toi, reste enregistré avec son propre numéro : on saura toujours quel texte tu avais sous les yeux ce jour-là.',
        items: [] as string[],
      },
    ],
    contactTitle: 'Une question sur cette page ?',
    contactText: 'Écris-moi à contact@lesagedavid.fr. Je réponds personnellement, et je préfère largement une question posée trop tôt à un doute gardé pour soi.',
    contactCta: 'M’écrire',
    legalLink: 'Voir les mentions légales',
  },
  // Données produit traduisibles (prose). Les valeurs numériques restent dans src/data.
  data: {
    woodSupplements: {
      frene: 'Inclus dans le prix de base',
      chene: 'Inclus dans le prix de base',
      acajou: 'Supplément +90 € HT',
      cerisier: 'Supplément +90 € HT',
      noyer: 'Supplément +190 € HT',
    },
    // Nom anglais de l'essence (affiché en sous-titre) + description longue (modal plein écran)
    woodEnNames: { frene: 'Ash', chene: 'Oak', acajou: 'Mahogany', cerisier: 'Cherry', noyer: 'Walnut' },
    woodDescriptions: {
      frene:
        'Bois clair aux veines longitudinales marquées et au grain fin. Le frêne est le bois standard du Neotone¹ — légèreté, résonance équilibrée, esthétique épurée. Choisi par les musiciens qui veulent un instrument neutre et polyvalent, qui ne tire pas trop le regard pendant le jeu.',
      chene:
        'Bois robuste aux veines plus serrées que le frêne, dans des tons miel doré. Caractère noble, plus chaud visuellement que le frêne. Inclus dans le prix de base — l’alternative naturelle pour ceux qui veulent un rendu visuel plus chaud sans surcoût.',
      acajou:
        'Bois rouge ocre profond, lourd et chaud. L’acajou apporte de la profondeur visuelle et une élégance vintage — il évoque immédiatement les instruments classiques de qualité. Très belle patine au fil des années.',
      cerisier:
        'Bois rosé tirant vers l’orangé, aux veines fines et homogènes. Le cerisier vieillit en gagnant en intensité, fonçant légèrement avec l’âge. Un caractère doux et distinctif, entre le clair du chêne et le profond de l’acajou.',
      noyer:
        'Bois sombre aux nuances chocolat profond, parfois marbré de veines plus claires. Le noyer est le plus contrasté des cinq, parfait pour un look haut de gamme assumé. Souvent demandé pour des productions visuelles ou des configurations scéniques où l’instrument est en lumière.',
    },
    // ── Métaux Yishama (page /yishama). Contenu tiré de l'article
    // « Nitrided handpan vs stainless handpan » publié par Yishama
    // et de leur catalogue. Rien d'inventé : ce que Yishama ne dit
    // pas, on ne le dit pas non plus (cf. `ember`).
    metalNames: { nitrure: 'Acier nitruré', inox: 'Inox', ember: 'Ember Steel' },
    metalEnNames: { nitrure: 'Nitrided steel', inox: 'Stainless steel', ember: 'Ember steel' },
    metalTags: { nitrure: 'Clair et puissant', inox: 'Chaud, sustain long', ember: 'Au catalogue Yishama' },
    metalDescriptions: {
      nitrure:
        'On part d’un acier laminé à froid à faible teneur en carbone — le plus souvent du DC04 — envoyé dans une installation spécialisée pour la nitruration. Le procédé durcit l’acier et crée une couche protectrice à sa surface. C’est l’acier historique du handpan.',
      inox:
        'L’acier inoxydable ne rouille pas. C’est sa première qualité, mais pas la plus intéressante : il donne surtout un timbre très différent, plus rond, avec une queue de son beaucoup plus longue que le nitruré.',
      ember:
        'Un acier inoxydable développé spécifiquement pour le handpan, que Yishama propose dans son catalogue à côté du nitruré et de l’inox classique. Yishama ne le compare pas aux deux autres dans son article : plutôt que de résumer ce qu’ils n’écrivent pas, le mieux est de l’entendre — demande-leur un extrait sonore, ou viens écouter au showroom.',
    },
    metalSound: {
      nitrure:
        'Un son plus céramique, presque terre cuite. Les fréquences hautes sont amplifiées avec beaucoup de volume — Yishama écrit qu’on l’entend à des kilomètres.',
      inox:
        'Un timbre très chaud et doux, avec une abondance de sustain, plus longue que sur le nitruré. Les fréquences amplifiées se situent plutôt dans le bas du spectre.',
      ember: 'Non détaillé par Yishama dans leur comparatif des matériaux.',
    },
    metalCare: {
      nitrure:
        'Demande plus de soin que l’inox : nettoyage et huilage réguliers. À éviter à la plage, malgré la couche de nitruration.',
      inox:
        'Résistant à la rouille : nettoyage et huilage plus espacés, mais toujours recommandés. En revanche très sensible à la chaleur — en plein soleil, il peut se désaccorder temporairement.',
      ember: 'Un inox : mêmes précautions générales que l’inox classique.',
    },
    metalBest: {
      nitrure: 'Le plein air, la rue, tout ce qui doit porter loin sans sonorisation.',
      inox: 'L’intérieur, le concert, le studio — plutôt que le jeu de rue.',
      ember: 'À écouter avant de trancher.',
    },
    // Titres FR des vidéos Yishama (même ordre que `videos` dans data/yishama.ts)
    yishamaVideos: [
      'La toute première rencontre avec l’instrument',
      'Ce que j’aime sur mon Yishama — la logique de la gamme',
      'Fallin’ — reprise d’Alicia Keys',
      'Copier-Coller — reprise de Bigflo & Oli',
      'Ave Maria, version jazz',
      'Rózsa — chanson traditionnelle hongroise',
    ],
    modelTaglines: { one: "L'essentiel, sans écran", mutant: "L'expression maximale, avec écran LCD" },
    modelNotes: { one: '10 notes · sans écran', mutant: '19 notes · écran LCD' },
    modelFeatures: {
      one: [
        '9 notes principales + ding + dome (10 zones de jeu)',
        'Jusqu’à 9 gammes chargées hors-ligne (touches dédiées) · illimité une fois connecté',
        'Création de gammes personnalisées illimitées via interface web',
        'Ding multifonction : changer de gamme · enregistreur intégré',
        'Contrôle MIDI complet (in / out)',
        '1 entrée pédale (volume ou expression)',
        'Sortie audio mono (1 jack) ou stéréo (2 jacks)',
        'Batterie Li-Ion 7800 mAh — 8 h d’autonomie',
        '1 300 échantillons par gamme · 48 kHz / 32 bit',
      ],
      mutant: [
        '9 emplacements de notes avec zones d’extension = 19 notes par gamme',
        'Jusqu’à 18 gammes chargées hors-ligne (touches dédiées) · illimité une fois connecté',
        'Création de gammes personnalisées illimitées via interface web',
        'Écran LCD rétroéclairé intégré',
        'Ding multifonction : changer de gamme · enregistreur intégré',
        'Contrôle MIDI complet (in / out)',
        '1 entrée pédale (volume ou expression)',
        'Sortie audio mono (1 jack) ou stéréo (2 jacks)',
        'Batterie Li-Ion 7800 mAh — 8 h d’autonomie',
        '1 300 échantillons par gamme · 48 kHz / 32 bit',
      ],
    },
    specs: [
      { title: 'Qualité audio studio', items: ['48 kHz / 32 bit · DAC 24 bits / 384 kHz', 'Rapport signal/bruit : 112 dB', 'Latence audio : 5 ms', '1 300 échantillons studio par gamme', 'Notes : 7 nuances × 10–15 vélocités'] },
      { title: '7 gammes officielles incluses (+ illimitées via l’app)', items: ['Gammes officielles issues de handpans MAG Instruments & Yishama', 'Ex. : B-Amara · C-Aegean · C# Pygmy · D-Kurd · F#2 Pygmy · G-Romanian Hijaz…', 'Crée tes propres gammes, sans aucune limite', 'Gammes partagées gratuitement par la communauté'] },
      { title: 'Batterie 8 heures', items: ['Batterie Li-Ion 7,4 V · 7 800 mAh intégrée', '8 heures d’autonomie en jeu continu', 'Charge complète : 4 heures', 'Adaptateur secteur 12 V fourni'] },
      { title: 'MIDI in/out complet', items: ['Contrôleur MIDI (out) + module sonore MIDI (in)', '6 zones du corps + 18 pads + Ding + Dome', 'Notes MIDI assignables par zone', 'Compatible standards MIDI'] },
      { title: 'Connectique pro', items: ['Sorties ligne (R/L) asymétriques', 'Sortie casque · MIDI in/out', '1 entrée pédale (volume ou expression)', 'Mono (1 jack) ou stéréo (2 jacks)', 'WiFi · réglages, création de gammes'] },
      { title: 'Format, poids & capteurs', items: ['47 cm de diamètre · 16 cm de hauteur', '3,5 kg (selon essence du bois)', 'Précision du capteur : 0,5 cm', 'Sensibilité : 20 à 5 000 g', 'Détecte frappe, pression et position'] },
    ],
    comparatif: [
      { aco: 'Pour jouer 10 gammes, il faut 10 handpans : transport difficile, stockage encombrant, budget qui grimpe.', neo: 'Un seul Neotone ouvre une infinité de gammes — un seul instrument à transporter, ranger et payer. Et tu crées même tes gammes sur mesure.' },
      { aco: 'Deux joueurs, deux gammes différentes : difficile de jouer ensemble ou de partager une gamme.', neo: 'Tout le monde charge la même gamme pour jouer ensemble — l’apprentissage et le partage deviennent simples, et tu t’ouvres au monde pour jouer avec d’autres instruments.' },
      { aco: 'En jam avec des percussions, un saxophone ou une basse, le handpan acoustique est vite couvert.', neo: 'Le volume se règle : tu restes toujours audible au milieu des autres instruments, sur scène comme en jam.' },
      { aco: 'Accompagner un chanteur est difficile : une gamme acoustique fixe s’adapte mal aux différentes voix.', neo: 'Tu accompagnes la voix dans toutes les tessitures et joues des chansons connues comme au piano ou à la guitare — le handpan sort enfin de son univers de niche.' },
      { aco: 'Fragile et sensible : impossible de jouer en plein soleil, et l’accordage bouge avec le temps et les chocs.', neo: 'Toujours parfaitement accordé, insensible à la chaleur. Choisis 440 Hz ou 432 Hz et transpose une gamme pour jouer dans la bonne tonalité avec les autres instruments.' },
      { aco: 'Très peu de notes. La physique du métal limite tout : taille, dissonances, place disponible.', neo: "L'électronique libère le placement des notes : bien plus de notes et de gammes possibles sur un seul instrument." },
      { aco: 'La technique de frappe acoustique est exigeante : ça peut être décourageant au début pour certaines personnes, qui abandonnent faute de plaisir immédiat.', neo: 'Des capteurs à sensibilité réglable : un son juste dès la première frappe, le plaisir de jouer tout de suite.' },
      { aco: 'Faire sortir les harmoniques demande une précision rare en acoustique.', neo: 'Sur le Neotone, les harmoniques sortent facilement — et les effets acoustiques restent là.' },
      { aco: 'Sur le Mutant acoustique, les zones des notes mutantes sont petites et précises.', neo: 'La taille des zones de frappe est réglable (jusqu’à 30 % de la note) : agrandis pour débuter, réduis pour la précision.' },
    ],
    faq: [
      { q: 'Quelle garantie accompagne le Neotone ?', a: 'Chaque Neotone est livré avec une garantie de 6 ans, une housse semi-rigide et un chargeur.' },
      { q: 'Quelle entreprise fabrique le Neotone ?', a: "Le Neotone est fabriqué par Soundventure Ltd, à Budapest (Hongrie). L'instrument est né du rêve de deux amis, Csaba et Norbert ; la société a été fondée en 2021, avec le soutien de MAG Instruments et Yishama Ltd. Je me suis rendu plusieurs fois dans leurs ateliers en Hongrie : je connais personnellement Csaba et Norbert ainsi que toute l'équipe (Gergely, Dániel et les artisans de MAG Instruments, et Yonathan de Yishama). Je suis aussi beta-testeur officiel de la marque depuis 2023 — depuis le premier Neotone¹, j'ai remonté et fait corriger des milliers de bugs et proposé de nombreuses améliorations." },
      { q: "À qui s'adresse le Neotone ?", a: "À tout le monde : jouer du handpan numérique ne demande aucun prérequis. Il devient vite indispensable pour les musiciens de scène (boucler, brancher des pédales), pour l'enregistrement studio, pour les joueurs nocturnes (jeu au casque) et pour les digital nomades. Et pour les joueurs déjà conquis, il ouvre le champ infini de la création de gammes." },
      { q: 'Procure-t-il les mêmes sensations qu’un handpan acoustique ?', a: "L'expérience diffère du jeu acoustique : le son ne sort pas directement de l'instrument mais d'un casque ou d'une enceinte. Avantages : immersion totale au casque, volume réglable, plus aucun Larsen sur scène. Les systèmes Bose L1 sont idéaux ; le Bose S1 Pro est une excellente option portative." },
      { q: 'Le Mutant est-il identique à un vrai handpan « mutant » ?', a: "Non. Les notes supplémentaires se jouent via une zone distincte à l'intérieur de chaque tonefield, ce qui demande un jeu doux et précis. Tu peux agrandir cette zone jusqu’à 30 % de la note pour plus de confort." },
      { q: 'Je débute — recommandes-tu le Neotone ?', a: "Les deux modèles conviennent parfaitement aux débutants. Jouer du Neotone est même plus facile que de jouer d'un handpan acoustique : la sensibilité des capteurs est réglable, tu obtiens un son juste dès la première frappe. Le Mutant demande un jeu un peu plus précis pour ses notes supplémentaires, mais permet d'aller beaucoup plus loin dans l'harmonie." },
      { q: 'Faut-il du matériel supplémentaire pour produire du son ?', a: "Le Neotone est un instrument numérique autonome avec son propre moteur sonore : il n'a pas besoin d'ordinateur pour fonctionner. Il n'a pas de haut-parleurs intégrés, il est donc nécessaire de le brancher à une enceinte (exemple : enceinte autonome Bose S1 Pro+) ou de jouer au casque pour entendre le son." },
      { q: 'Peut-on appliquer des effets au son du Neotone ?', a: 'Comme avec une guitare électrique, tu peux y connecter tout le matériel externe : pédales d’effet (Boss OC-3), loop stations (Roland RC-505 MKII), reverbs (Strymon Nightsky, Hologram Microcosm).' },
      { q: 'Le Neotone est-il portable et autonome sur batterie ?', a: 'Oui. Environ 8 heures d’autonomie en jeu continu. Il est livré avec un chargeur, utilisable que l’instrument soit en cours de jeu ou non.' },
    ],
    procedure: [
      { title: 'Contacte-moi pour recevoir ton code de remise', text: 'Envoie un email avec ton nom et prénom, ton pays de livraison, ton email et ton numéro de téléphone.' },
      { title: 'Reçois ton code de remise unique', text: 'Tu reçois un code de réduction nominatif de la part de Neotone (−5 % en ligne, −7 % au showroom).' },
      { title: 'Passe commande chez Neotone', text: 'Neotone te recontacte sous deux jours avec une offre personnalisée.' },
      { title: "Verse l'acompte de 1 000 € HT", text: "À réception de la confirmation, tu règles un acompte de 1 000 € HT. Cela déclenche la fabrication artisanale de ton instrument." },
      { title: 'Patience pendant la fabrication', text: 'Le délai varie entre 2 et 5 mois selon la file d’attente. Tu reçois un délai estimatif personnalisé.' },
      { title: 'Règle le solde et reçois ton Neotone', text: 'Dès que ton instrument est prêt, tu es notifié par email. Tu règles le solde puis l’instrument t’est expédié avec sa facture, partout dans le monde.' },
    ],
    procedureShowroom: [
      { title: 'Prends rendez-vous avec moi', text: 'Deux options : viens à l’une de mes dates de showcase publiques (une par mois), ou réserve un rendez-vous individuel rien que pour toi — 1h · 50 € ou 1h30 · 70 €.' },
      { title: 'Essaie les deux modèles en vrai', text: 'Sur place, tu prends le temps de tester le Neotone¹ et le Mutant, de comparer les bois, et de me poser toutes tes questions.' },
      { title: 'Repars avec ton instrument le jour même', text: 'Tu profites de la remise showroom (−7 %) et tu repars directement avec ton Neotone — sans délai de fabrication.' },
    ],
    included: [
      { title: 'Sac de transport', text: 'Sac noir spécial avec bandoulière et sangles sac à dos · 520 × 220 mm.' },
      { title: 'Livraison mondiale', text: 'Frais d’envoi compris dans le prix, partout dans le monde.' },
      { title: 'Garantie 6 ans', text: 'Réparation + transport inclus.' },
      { title: 'Chargeur secteur fourni', text: 'Chargeur 12 V standard livré (prise selon le pays de livraison).' },
    ],
    extras: [
      { title: 'Un casque ou des oreillettes', text: 'Pour jouer en silence, la nuit ou en appartement. Idéalement un casque avec prise jack 6,35 mm (ou un adaptateur).' },
      { title: 'Un câble jack coudé', text: 'Un câble jack mono (1 sortie) ou stéréo (2 sorties) pour relier le Neotone à ton enceinte. Important : prends un connecteur coudé côté instrument — c’est ce qui permet de poser le handpan au sol sans abîmer la connectique.' },
      { title: 'Une enceinte', text: 'Indispensable pour diffuser le son. Mon conseil : la Bose S1 Pro+ (≈ 599 €), autonome (8 h de batterie), redoutable en jam ou pour des petits concerts — avec plus de basses que l’ancienne S1 Pro, un émetteur sans fil en option, et le caisson Sub 1 si tu veux de vraies basses profondes et chaleureuses.' },
      { title: 'Un câble MIDI → USB', text: 'Un câble MIDI vers USB (ou USB-A vers USB-C) si tu veux piloter un logiciel de musique (DAW : Logic Pro, Ableton Live…).' },
    ],
    calc: {
      modeQuestion: 'Comment veux-tu recevoir ton Neotone ?',
      modeOnline: '📦 Je me fais livrer',
      modeOnlineSub: 'Livraison mondiale incluse · remise 5 %',
      modeShowroom: '🏠 Je viens au showroom ★',
      modeShowroomSub: 'Paris 20ᵉ · remise 7 % · sans délai',
      step1: '1 · Choisis ton modèle',
      step2: '2 · Choisis ton bois',
      step3: '3 · Ton pays de livraison',
      b2b: 'J’ai un numéro de TVA intracommunautaire (B2B) — la TVA est récupérable (autoliquidation), tu paies le prix HT.',
      recap: 'Récapitulatif',
      basePrice: 'Prix public HT (envoi compris)',
      subtotal: 'Sous-total HT',
      savings: 'Tu économises',
      // Cas B2B intracommunautaire : le total affiché n'est PAS une réduction pure —
      // il additionne la remise (gain réel) et la TVA non facturée (trésorerie, pas un
      // gain : l'assujetti la récupérerait de toute façon). Le libellé et la note
      // ci-dessous existent pour ne pas faire passer l'un pour l'autre.
      savingsB2B: 'Tu ne débourses pas',
      savingsB2BNote:
        'Soit {discountRate} de remise + {vatRate} de TVA du prix de base — l’écart avec le prix catalogue TTC ({catalog}). Seule la remise de {discount} est un gain réel : la TVA, tu ne l’avances pas (autoliquidation), et tu la récupérerais de toute façon.',
      getCode: 'Obtenir mon code de remise',
      discountLabel: 'Remise ambassadeur',
      vat: 'TVA',
      finalTTC: 'Prix final TTC à payer',
      finalIncluded: 'Livraison mondiale incluse · Garantie 6 ans',
      finalShowroom: 'Retrait au showroom · Paris 20ᵉ · aucun délai, aucun frais d’envoi',
      finalB2B: 'Prix HT à payer (autoliquidation)',
      finalB2BNote: 'TVA récupérable · n° de TVA intracommunautaire requis',
      finalExtUE: 'Prix HT à payer · hors UE',
      finalExtUENote: 'Sans TVA UE · frais de douane locaux à ta charge',
      b2bNote: 'Autoliquidation de la TVA : tu déclares et récupères la TVA dans ton pays. Numéro de TVA intracommunautaire valide requis.',
      vatStd: 'TVA',
      noVat: 'sans TVA UE',
    },
  },
}

export type Dict = typeof fr

// EN importé séparément pour garder ce fichier lisible.
import { en } from './en'

const dicts: Record<Lang, Dict> = { fr, en }

export function getDict(lang: Lang): Dict {
  return dicts[lang] ?? fr
}

export { fr }
