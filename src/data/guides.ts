// ============================================================
// Contenu long-form des PAGES PILIERS (evergreen, SEO/AEO).
// Bilingue FR / EN. Importé par les pages .astro selon la langue.
// On garde ce contenu ICI (et pas dans dict.ts) pour ne pas
// gonfler le dictionnaire d'interface.
//
// David Lesage = auteur/entité. Ton : tutoiement, premium + chaleureux.
// ============================================================

import type { Lang } from '@/i18n/config'

// ---- Types de blocs de contenu (fortement typés) ------------
export interface RichLink {
  href: string // chemin NEUTRE (sera localisé via localizePath) ou URL absolue
  label: string
  external?: boolean
}

export type GuideBlock =
  | { kind: 'p'; html: string } // paragraphe (peut contenir des <a>, <strong>…)
  | { kind: 'ul'; items: string[] } // liste à puces
  | {
      kind: 'table'
      head: string[]
      rows: string[][]
    }

export interface GuideSection {
  id: string
  icon: string // nom d'icône lucide (astro-icon)
  heading: string
  blocks: GuideBlock[]
}

export interface GuideFaqItem {
  q: string
  a: string // texte brut (aussi émis en faqLdJson)
}

export interface GuideCta {
  heading: string
  text: string
  primary: RichLink
  secondary?: RichLink
}

export interface Guide {
  slug: string
  // Métadonnées SEO
  title: string // ≤ 60 c
  description: string // ≤ 155 c
  keywords: string
  // Fil d'Ariane (le maillon « accueil » est ajouté par la page)
  breadcrumbLabel: string
  // Héros
  eyebrow: string
  h1: string // peut contenir du HTML léger
  // Paragraphe-réponse d'accroche 40–60 mots (AEO, citable tel quel)
  leadAnswer: string
  // Corps
  sections: GuideSection[]
  // Bloc « liens utiles » (maillage interne visible)
  relatedHeading: string
  related: RichLink[]
  // FAQ
  faqHeading: string
  faq: GuideFaqItem[]
  // CTA final
  cta: GuideCta
  // Date pour Article JSON-LD
  datePublished: string
  dateModified: string
}

type GuideKey = 'learn' | 'vsAcoustic' | 'chooseHandpan'
type GuidesByLang = Record<GuideKey, Guide>

// ============================================================
// FR
// ============================================================
const fr: GuidesByLang = {
  // ----------------------------------------------------------
  // 1) APPRENDRE LE HANDPAN
  // ----------------------------------------------------------
  learn: {
    slug: 'apprendre-le-handpan',
    title: 'Apprendre le handpan : le guide débutant complet',
    description:
      'Comment apprendre le handpan sans solfège : la méthode par les couleurs et les formes, par où commencer, quel instrument et quel outil choisir.',
    keywords:
      'apprendre le handpan, handpan débutant, comment jouer du handpan, handpan sans solfège, méthode handpan, cours de handpan',
    breadcrumbLabel: 'Apprendre le handpan',
    eyebrow: 'Guide débutant',
    h1: 'Comment apprendre le handpan quand on débute',
    leadAnswer:
      'Pour apprendre le handpan, pas besoin de solfège : commence par écouter, poser tes mains et jouer quelques notes. En repérant chaque note par sa couleur et chaque accord par sa forme, tu retiens des mélodies en quelques minutes — puis tu progresses en jouant régulièrement, à ton oreille.',
    sections: [
      {
        id: 'cest-quoi',
        icon: 'lucide:disc-3',
        heading: 'C’est quoi, un handpan ?',
        blocks: [
          {
            kind: 'p',
            html: 'Le handpan est un instrument à percussion mélodique en acier, en forme de soucoupe. Sur sa face supérieure, une note centrale (le « ding ») est entourée de plusieurs notes accordées entre elles, choisies pour sonner juste ensemble : c’est ce qu’on appelle une <strong>gamme</strong>. Tu en joues avec les doigts et les mains, sans baguette. Résultat : même sans aucune expérience, tout ce que tu joues sonne beau — c’est ce qui rend le handpan si accueillant pour débuter.',
          },
        ],
      },
      {
        id: 'solfege',
        icon: 'lucide:eye-off',
        heading: 'Faut-il connaître le solfège ? (non)',
        blocks: [
          {
            kind: 'p',
            html: 'Non. Le handpan se prête merveilleusement à l’apprentissage à l’oreille. Les notes sont déjà accordées ensemble : tu ne peux pas vraiment « faire faux ». J’ai moi-même quitté le Conservatoire découragé par le solfège avant de tout réapprendre à l’oreille — et c’est cette conviction qui a donné naissance à ma méthode. Le solfège pourra t’intéresser plus tard, par curiosité, mais il n’est jamais un prérequis pour commencer.',
          },
        ],
      },
      {
        id: 'methode',
        icon: 'lucide:palette',
        heading: 'Apprendre par les couleurs et les formes',
        blocks: [
          {
            kind: 'p',
            html: 'Ma méthode repose sur trois repères concrets, qui remplacent les portées et les notes noires. D’abord la <strong>couleur</strong> : chaque degré de la gamme reçoit une couleur (les ChromaKeys), si bien que jouer une mélodie revient à suivre une suite de couleurs. Ensuite la <strong>forme</strong> : chaque accord dessine une géométrie sur l’instrument (les Constellations), une tablature visuelle bien plus parlante qu’une grille d’accords. Enfin l’<strong>émotion</strong> : chaque degré porte une couleur affective (élan, détente, nostalgie…), pour que tu joues ce que tu ressens.',
          },
          {
            kind: 'ul',
            items: [
              'Couleurs (ChromaKeys) : chaque note a sa couleur → tu lis la musique d’un coup d’œil.',
              'Formes (Constellations) : chaque accord est un dessin → tu retiens les enchaînements visuellement.',
              'Émotions : chaque degré a une couleur affective → tu joues ce que tu veux exprimer.',
            ],
          },
        ],
      },
      {
        id: 'commencer',
        icon: 'lucide:footprints',
        heading: 'Par où commencer, concrètement',
        blocks: [
          {
            kind: 'ul',
            items: [
              'Installe-toi confortablement, l’instrument posé sur les genoux ou sur un support, légèrement incliné vers toi.',
              'Joue le ding central du bout des doigts, détendu : écoute la note résonner avant d’enchaîner.',
              'Fais le tour des notes une à une pour t’approprier leur emplacement et leur couleur.',
              'Rejoue une courte mélodie de 3 ou 4 notes, en boucle, jusqu’à ce qu’elle vienne toute seule.',
              'Ajoute un accord (une forme), puis relie-le à la mélodie : tu improvises déjà.',
            ],
          },
          {
            kind: 'p',
            html: 'Dix minutes par jour valent mieux qu’une heure une fois par semaine. La régularité, pas la durée, fait progresser au handpan.',
          },
        ],
      },
      {
        id: 'acoustique-electronique',
        icon: 'lucide:git-compare',
        heading: 'Acoustique ou électronique pour débuter ?',
        blocks: [
          {
            kind: 'p',
            html: 'Les deux se jouent exactement pareil, avec les mains. Le handpan acoustique offre une résonance et un contact physique inimitables. Le <a href="/le-neotone">handpan électronique Neotone</a>, lui, se joue au casque (idéal en appartement, la nuit), change de gamme en un geste et se branche à ton ordinateur. Pour un débutant, l’électronique lève deux freins majeurs : le bruit et le budget d’un seul instrument figé sur une seule gamme. J’explore ce choix en détail dans mon guide <a href="/handpan-electronique-vs-acoustique">handpan électronique vs acoustique</a>.',
          },
        ],
      },
      {
        id: 'outil',
        icon: 'lucide:sparkles',
        heading: 'Avec quel outil apprendre : Handpan Studio',
        blocks: [
          {
            kind: 'p',
            html: 'Pour appliquer la méthode, j’ai créé <a href="/handpan-studio">Handpan Studio</a>, l’application qui rend la musique visible. Elle affiche tes notes en couleurs, dessine les accords en formes, propose un atlas de gammes du monde et te laisse créer les tiennes. La version <strong>Découverte est gratuite</strong> en mode acoustique ; la formule <strong>Studio (dès 9,90 €)</strong> débloque l’électronique, la sauvegarde et la création avancée. C’est le compagnon idéal pour s’exercer, seul, à son rythme.',
          },
        ],
      },
      {
        id: 'niveau-superieur',
        icon: 'lucide:graduation-cap',
        heading: 'Passer au niveau supérieur : les cours',
        blocks: [
          {
            kind: 'p',
            html: 'À un moment, un regard extérieur accélère tout : posture, main, rythme, choix de gamme. Mes <a href="/cours">cours de handpan</a>, en visio partout dans le monde ou en présentiel à Paris, s’adaptent à ton niveau — du tout débutant au musicien confirmé. On y travaille la méthode par les couleurs et les formes, mais aussi le groove et l’expression personnelle. Pour aller plus loin sur la méthode, lis <a href="/blog/handpan-par-les-couleurs">le handpan par les couleurs</a> et <a href="/blog/creer-sa-gamme-de-handpan">créer sa gamme de handpan</a>.',
          },
        ],
      },
    ],
    relatedHeading: 'Pour aller plus loin',
    related: [
      { href: '/handpan-studio', label: 'Découvrir l’app Handpan Studio' },
      { href: '/cours', label: 'Prendre des cours de handpan' },
      { href: '/le-neotone', label: 'Le handpan électronique Neotone' },
      { href: '/blog/handpan-par-les-couleurs', label: 'Article : le handpan par les couleurs' },
      { href: '/blog/creer-sa-gamme-de-handpan', label: 'Article : créer sa gamme de handpan' },
    ],
    faqHeading: 'Questions fréquentes',
    faq: [
      {
        q: 'Le handpan est-il difficile à apprendre ?',
        a: 'Non, c’est l’un des instruments les plus accessibles qui soient. Les notes sont accordées ensemble, donc tout ce que tu joues sonne juste. En quelques minutes tu peux jouer une petite mélodie ; la progression vient ensuite avec la régularité.',
      },
      {
        q: 'Combien de temps pour savoir jouer du handpan ?',
        a: 'Dès la première séance, tu joues des mélodies simples. En quelques semaines de pratique régulière (10 minutes par jour), tu improvises avec plaisir. La maîtrise fine du rythme et des nuances se construit sur des mois, comme tout instrument.',
      },
      {
        q: 'Peut-on apprendre le handpan seul, sans professeur ?',
        a: 'Oui. Beaucoup débutent seuls, à l’oreille, avec un outil visuel comme Handpan Studio. Un professeur reste précieux pour corriger la posture, le geste et le rythme, et pour progresser plus vite — mais il n’est pas indispensable pour commencer.',
      },
      {
        q: 'Faut-il acheter un handpan pour apprendre ?',
        a: 'Pas forcément au tout début : la version Découverte gratuite de Handpan Studio te permet de t’exercer en mode acoustique. Pour jouer vraiment avec tes mains, un handpan acoustique ou un Neotone électronique devient vite indispensable.',
      },
    ],
    cta: {
      heading: 'Prêt à jouer tes premières mélodies ?',
      text: 'Essaie la méthode par les couleurs directement dans l’application — la version Découverte est gratuite.',
      primary: { href: '/handpan-studio#acces', label: 'Accès à l’application' },
      secondary: { href: '/cours', label: 'Voir les cours' },
    },
    datePublished: '2026-07-01',
    dateModified: '2026-07-01',
  },

  // ----------------------------------------------------------
  // 2) HANDPAN ÉLECTRONIQUE VS ACOUSTIQUE
  // ----------------------------------------------------------
  vsAcoustic: {
    slug: 'handpan-electronique-vs-acoustique',
    title: 'Handpan électronique vs acoustique : le comparatif',
    description:
      'Handpan électronique ou acoustique ? Son, jeu au casque, gammes, effets, MIDI, prix, entretien : le comparatif complet pour bien choisir.',
    keywords:
      'handpan électronique, handpan acoustique, Neotone, handpan électronique vs acoustique, comparatif handpan, handpan casque',
    breadcrumbLabel: 'Électronique vs acoustique',
    eyebrow: 'Comparatif',
    h1: 'Handpan électronique vs acoustique : lequel choisir ?',
    leadAnswer:
      'Un handpan acoustique offre une résonance organique et un contact physique uniques, mais reste figé sur une seule gamme et se joue à voix haute. Un handpan électronique comme le Neotone se joue au casque, change de gamme instantanément, ajoute des effets et se branche en MIDI — au prix d’un son amplifié plutôt que naturel.',
    sections: [
      {
        id: 'differences',
        icon: 'lucide:git-compare',
        heading: 'Les vraies différences',
        blocks: [
          {
            kind: 'p',
            html: 'La différence n’est pas le geste — dans les deux cas tu joues avec les mains — mais la façon dont le son est produit et ce que l’instrument te permet de faire autour.',
          },
          {
            kind: 'ul',
            items: [
              'Son : l’acoustique résonne dans l’air, riche et vivant ; l’électronique produit un signal que tu écoutes au casque ou sur enceinte, avec une justesse parfaite.',
              'Casque / nuit : seul l’électronique se joue en silence, un vrai atout en appartement ou tard le soir.',
              'Gammes : l’acoustique est figé sur une gamme ; le Neotone en embarque des dizaines et en change en un geste.',
              'Effets : réverbération, delay, sons alternatifs… l’électronique ouvre un terrain sonore que l’acoustique ne connaît pas.',
              'MIDI : l’électronique se branche à ton ordinateur pour enregistrer, composer et piloter d’autres sons.',
              'Prix : un bon handpan acoustique et un Neotone se situent dans des ordres de grandeur comparables, mais l’électronique remplace à lui seul plusieurs instruments de gammes différentes.',
              'Entretien : l’acier acoustique craint la rouille et le désaccordage ; l’électronique ne se désaccorde jamais et ne rouille pas.',
            ],
          },
        ],
      },
      {
        id: 'pour-qui',
        icon: 'lucide:users',
        heading: 'Pour qui chaque instrument ?',
        blocks: [
          {
            kind: 'p',
            html: 'Le handpan <strong>acoustique</strong> est fait pour toi si tu cherches la vibration physique, le jeu en extérieur ou en cercle, et que tu es attaché à une gamme précise que tu joues à voix haute. Le handpan <strong>électronique Neotone</strong> te convient si tu vis en appartement, joues souvent au casque, veux explorer de nombreuses gammes sans multiplier les instruments, enregistres ta musique ou aimes les effets. Beaucoup de joueurs finissent par avoir les deux — ils sont complémentaires, pas concurrents.',
          },
        ],
      },
      {
        id: 'tableau',
        icon: 'lucide:table',
        heading: 'Tableau comparatif',
        blocks: [
          {
            kind: 'table',
            head: ['Critère', 'Acoustique', 'Électronique (Neotone)'],
            rows: [
              ['Son', 'Résonance naturelle, organique', 'Amplifié, justesse parfaite'],
              ['Jeu au casque / nuit', 'Non', 'Oui'],
              ['Gammes', 'Une seule, figée', 'Des dizaines, interchangeables'],
              ['Effets (réverb, delay…)', 'Non', 'Oui'],
              ['MIDI / enregistrement', 'Micro nécessaire', 'Intégré'],
              ['Désaccordage / rouille', 'Possible avec le temps', 'Jamais'],
              ['Jeu en cercle, en extérieur', 'Idéal', 'Nécessite un ampli/casque'],
            ],
          },
        ],
      },
      {
        id: 'conclusion',
        icon: 'lucide:scale',
        heading: 'Conclusion nuancée',
        blocks: [
          {
            kind: 'p',
            html: 'Il n’y a pas de « meilleur » dans l’absolu : il y a l’instrument juste pour ta vie. Si le silence, la polyvalence des gammes et la création numérique comptent, le <a href="/le-neotone">Neotone</a> est imbattable. Si la vibration acoustique et le jeu partagé priment, un handpan traditionnel te comblera. Et pour t’exercer aux deux mondes sans acheter tout de suite, l’application <a href="/handpan-studio">Handpan Studio</a> propose un mode acoustique gratuit et un mode électronique. J’ai aussi écrit un article dédié : <a href="/blog/pourquoi-handpan-electronique">pourquoi j’ai choisi le handpan électronique</a>.',
          },
        ],
      },
    ],
    relatedHeading: 'Pour aller plus loin',
    related: [
      { href: '/le-neotone', label: 'Découvrir le handpan électronique Neotone' },
      { href: '/handpan-studio', label: 'L’app Handpan Studio (acoustique + électronique)' },
      { href: '/blog/pourquoi-handpan-electronique', label: 'Article : pourquoi le handpan électronique' },
    ],
    faqHeading: 'Questions fréquentes',
    faq: [
      {
        q: 'Le handpan électronique sonne-t-il comme un vrai handpan ?',
        a: 'Le Neotone reproduit fidèlement le timbre du handpan, avec en plus une justesse parfaite et des effets. Le toucher est identique. Ce qui change, c’est la résonance dans l’air d’un acoustique, remplacée ici par une écoute au casque ou sur enceinte.',
      },
      {
        q: 'Peut-on jouer du handpan électronique au casque ?',
        a: 'Oui, c’est l’un de ses grands atouts. Le Neotone se joue entièrement au casque, sans déranger personne — idéal en appartement, la nuit, ou pour s’enregistrer proprement.',
      },
      {
        q: 'Un handpan électronique peut-il changer de gamme ?',
        a: 'Oui. Là où un handpan acoustique est figé sur une gamme, le Neotone en embarque des dizaines et permet d’en changer instantanément, voire de créer les tiennes dans Handpan Studio.',
      },
      {
        q: 'Électronique ou acoustique : lequel pour débuter ?',
        a: 'Les deux se jouent pareil. Pour un débutant en appartement, l’électronique lève le frein du bruit et de la gamme unique. Pour la vibration physique et le jeu en groupe, l’acoustique reste imbattable. Beaucoup finissent par combiner les deux.',
      },
    ],
    cta: {
      heading: 'Envie de tester le handpan électronique ?',
      text: 'Découvre le Neotone, ou essaie les deux modes dans l’application Handpan Studio.',
      primary: { href: '/le-neotone', label: 'Découvrir le Neotone' },
      secondary: { href: '/handpan-studio#acces', label: 'Accès à l’application' },
    },
    datePublished: '2026-07-01',
    dateModified: '2026-07-01',
  },

  // ----------------------------------------------------------
  // 3) QUEL HANDPAN CHOISIR
  // ----------------------------------------------------------
  chooseHandpan: {
    slug: 'quel-handpan-choisir',
    title: 'Quel handpan choisir ? Guide d’achat débutant',
    description:
      'Quel handpan choisir quand on débute : nombre de notes, gamme conseillée (D Kurd), acoustique ou électronique, budget et erreurs à éviter.',
    keywords:
      'quel handpan choisir, acheter un handpan, handpan débutant, gamme handpan D Kurd, prix handpan, handpan Neotone',
    breadcrumbLabel: 'Quel handpan choisir',
    eyebrow: 'Guide d’achat',
    h1: 'Quel handpan choisir quand on débute ?',
    leadAnswer:
      'Pour un premier handpan, choisis un instrument de 8 ou 9 notes dans une gamme accessible comme le D Kurd, la plus polyvalente pour débuter. Décide ensuite entre acoustique (vibration naturelle) et électronique (casque, gammes multiples), essaie-le si possible avant d’acheter, et privilégie un instrument bien accordé plutôt que le moins cher.',
    sections: [
      {
        id: 'nombre-notes',
        icon: 'lucide:hash',
        heading: 'Combien de notes ?',
        blocks: [
          {
            kind: 'p',
            html: 'Pour débuter, un handpan de <strong>8 ou 9 notes</strong> (un ding + 7 ou 8 notes autour) est idéal : assez pour jouer de vraies mélodies, sans te noyer sous les possibilités. Les instruments à 10 notes ou plus, ou avec des notes sous la coque (« bottom notes »), s’adressent aux joueurs plus avancés. Côté électronique, le <a href="/le-neotone">Neotone</a> existe en 10 notes et le Mutant en 19 notes : tu commences simple et tu gardes de la marge pour progresser.',
          },
        ],
      },
      {
        id: 'gamme',
        icon: 'lucide:music',
        heading: 'Quelle gamme ? (le D Kurd conseillé)',
        blocks: [
          {
            kind: 'p',
            html: 'La gamme est le choix le plus important — et sur un acoustique, elle est définitive. Pour un premier instrument, le <strong>D Kurd (ré mineur)</strong> fait l’unanimité : chaleureux, mélancolique juste ce qu’il faut, polyvalent, c’est la gamme la plus jouée au monde et celle qui offre le plus de tutoriels. Des gammes majeures existent pour un son plus lumineux, mais le D Kurd reste le meilleur point de départ. Sur un Neotone, cette décision n’est pas définitive : tu changes de gamme quand tu veux.',
          },
        ],
      },
      {
        id: 'acoustique-electronique',
        icon: 'lucide:git-compare',
        heading: 'Acoustique ou électronique ?',
        blocks: [
          {
            kind: 'p',
            html: 'Question clé, que je détaille dans mon comparatif <a href="/handpan-electronique-vs-acoustique">handpan électronique vs acoustique</a>. En résumé : l’acoustique pour la vibration physique et le jeu en extérieur ; l’électronique (Neotone) pour le casque, les gammes multiples, les effets et l’enregistrement. Si tu vis en appartement ou hésites encore sur la gamme, l’électronique t’évite de te tromper et de racheter.',
          },
        ],
      },
      {
        id: 'budget',
        icon: 'lucide:wallet',
        heading: 'Quel budget ?',
        blocks: [
          {
            kind: 'p',
            html: 'Méfie-toi des instruments très bon marché : sous un certain prix, l’accordage est souvent approximatif et l’instrument sonnera faux — le pire départ possible. Un handpan de facture sérieuse représente un vrai investissement, mais il tient dans le temps et te donne envie de jouer. Un Neotone se situe dans une fourchette comparable à un bon acoustique, tout en remplaçant plusieurs gammes. Regarde aussi la <a href="/boutique">boutique</a> pour les accessoires (housse, support) qui protègent ton instrument.',
          },
        ],
      },
      {
        id: 'essayer',
        icon: 'lucide:map-pin',
        heading: 'Où l’essayer avant d’acheter',
        blocks: [
          {
            kind: 'p',
            html: 'Rien ne remplace le fait de poser les mains sur l’instrument. À Paris, mon <a href="/showroom">showroom</a> est le seul endroit au monde où tu peux tester un Neotone et repartir avec le jour même, sans délai de fabrication et au meilleur prix. Tu y compares les gammes, tu sens la réponse sous les doigts, et je te guide selon ton niveau et tes envies.',
          },
        ],
      },
      {
        id: 'erreurs',
        icon: 'lucide:alert-triangle',
        heading: 'Les erreurs à éviter',
        blocks: [
          {
            kind: 'ul',
            items: [
              'Acheter le moins cher : un instrument mal accordé dégoûte plus qu’il ne motive.',
              'Choisir une gamme rare « parce qu’elle est belle » sur une vidéo : le D Kurd t’ouvre bien plus de morceaux et de tutoriels.',
              'Prendre trop de notes d’emblée : 8–9 notes suffisent largement pour débuter.',
              'Négliger la housse et le support : ils protègent un instrument coûteux et améliorent ton confort de jeu.',
              'Acheter sans avoir essayé, quand un showroom est accessible : le ressenti sous les doigts est décisif.',
            ],
          },
        ],
      },
    ],
    relatedHeading: 'Pour aller plus loin',
    related: [
      { href: '/le-neotone', label: 'Le handpan électronique Neotone (10 & 19 notes)' },
      { href: '/showroom', label: 'Essayer un handpan au showroom de Paris' },
      { href: '/boutique', label: 'Accessoires : housses, supports…' },
      { href: '/handpan-electronique-vs-acoustique', label: 'Comparatif électronique vs acoustique' },
    ],
    faqHeading: 'Questions fréquentes',
    faq: [
      {
        q: 'Quelle gamme de handpan choisir pour débuter ?',
        a: 'Le D Kurd (ré mineur) est le meilleur choix pour un premier handpan : polyvalent, chaleureux, c’est la gamme la plus jouée et la mieux documentée en tutoriels. Sur un Neotone électronique, tu n’es de toute façon pas figé sur une seule gamme.',
      },
      {
        q: 'Combien de notes pour un premier handpan ?',
        a: 'Un handpan de 8 ou 9 notes est idéal pour débuter : assez pour jouer de vraies mélodies, sans complexité inutile. Les modèles à 10 notes et plus conviennent mieux une fois les bases acquises.',
      },
      {
        q: 'Combien coûte un bon handpan ?',
        a: 'Un handpan de facture sérieuse représente un investissement notable. Méfie-toi des prix très bas : en dessous d’un certain seuil, l’accordage est souvent mauvais. Un Neotone électronique se situe dans une fourchette comparable, tout en remplaçant plusieurs gammes.',
      },
      {
        q: 'Où essayer un handpan avant d’acheter ?',
        a: 'À Paris, mon showroom permet de tester les instruments, comparer les gammes et repartir le jour même avec ton Neotone, sans délai de fabrication. Essayer avant d’acheter reste la meilleure façon de ne pas se tromper.',
      },
    ],
    cta: {
      heading: 'Trouve le handpan qui te correspond',
      text: 'Viens l’essayer à Paris, ou découvre le Neotone et ses gammes interchangeables.',
      primary: { href: '/showroom', label: 'Réserver ma venue au showroom' },
      secondary: { href: '/le-neotone', label: 'Découvrir le Neotone' },
    },
    datePublished: '2026-07-01',
    dateModified: '2026-07-01',
  },
}

// ============================================================
// EN (traduction fidèle)
// ============================================================
const en: GuidesByLang = {
  learn: {
    slug: 'apprendre-le-handpan',
    title: 'How to Learn the Handpan: Complete Beginner Guide',
    description:
      'How to learn the handpan without sheet music: the colour-and-shape method, where to start, and which instrument and tool to choose.',
    keywords:
      'learn the handpan, handpan for beginners, how to play the handpan, handpan without sheet music, handpan method, handpan lessons',
    breadcrumbLabel: 'Learn the handpan',
    eyebrow: 'Beginner guide',
    h1: 'How to learn the handpan as a beginner',
    leadAnswer:
      'To learn the handpan you don’t need sheet music: start by listening, resting your hands and playing a few notes. By recognising each note by its colour and each chord by its shape, you memorise melodies within minutes — then you improve by playing regularly, by ear.',
    sections: [
      {
        id: 'cest-quoi',
        icon: 'lucide:disc-3',
        heading: 'What is a handpan?',
        blocks: [
          {
            kind: 'p',
            html: 'The handpan is a melodic steel percussion instrument shaped like a saucer. On its top face, a central note (the “ding”) is surrounded by several notes tuned to sound right together: this is called a <strong>scale</strong>. You play it with your fingers and hands, no mallets. The result: even with no experience, everything you play sounds beautiful — which is exactly what makes the handpan so welcoming for beginners.',
          },
        ],
      },
      {
        id: 'solfege',
        icon: 'lucide:eye-off',
        heading: 'Do you need to read music? (no)',
        blocks: [
          {
            kind: 'p',
            html: 'No. The handpan lends itself wonderfully to learning by ear. The notes are already tuned together: you can’t really “play a wrong note”. I myself left the Conservatory discouraged by music theory before relearning everything by ear — and that conviction gave birth to my method. Music theory may interest you later, out of curiosity, but it’s never a prerequisite to begin.',
          },
        ],
      },
      {
        id: 'methode',
        icon: 'lucide:palette',
        heading: 'Learning through colours and shapes',
        blocks: [
          {
            kind: 'p',
            html: 'My method rests on three concrete cues that replace staves and black notes. First, <strong>colour</strong>: each degree of the scale gets a colour (ChromaKeys), so playing a melody becomes following a sequence of colours. Then <strong>shape</strong>: each chord draws a geometry on the instrument (Constellations), a visual tablature far clearer than a chord chart. Finally, <strong>emotion</strong>: each degree carries an emotional colour (momentum, calm, nostalgia…), so you play what you feel.',
          },
          {
            kind: 'ul',
            items: [
              'Colours (ChromaKeys): each note has its colour → you read the music at a glance.',
              'Shapes (Constellations): each chord is a drawing → you memorise progressions visually.',
              'Emotions: each degree has an emotional colour → you play what you want to express.',
            ],
          },
        ],
      },
      {
        id: 'commencer',
        icon: 'lucide:footprints',
        heading: 'Where to start, concretely',
        blocks: [
          {
            kind: 'ul',
            items: [
              'Sit comfortably, the instrument on your lap or a stand, tilted slightly towards you.',
              'Play the central ding with your fingertips, relaxed: listen to the note resonate before moving on.',
              'Go around the notes one by one to learn their position and their colour.',
              'Loop a short 3- or 4-note melody until it comes on its own.',
              'Add a chord (a shape), then link it to the melody: you’re already improvising.',
            ],
          },
          {
            kind: 'p',
            html: 'Ten minutes a day beats one hour once a week. On the handpan, consistency — not duration — drives progress.',
          },
        ],
      },
      {
        id: 'acoustique-electronique',
        icon: 'lucide:git-compare',
        heading: 'Acoustic or electronic to start?',
        blocks: [
          {
            kind: 'p',
            html: 'Both are played exactly the same way, with your hands. An acoustic handpan offers an inimitable resonance and physical contact. The <a href="/le-neotone">electronic Neotone handpan</a> can be played on headphones (perfect in a flat, at night), changes scale in a single gesture and connects to your computer. For a beginner, going electronic removes two major hurdles: noise, and the cost of a single instrument locked to one scale. I explore this choice in detail in my <a href="/handpan-electronique-vs-acoustique">electronic vs acoustic handpan</a> guide.',
          },
        ],
      },
      {
        id: 'outil',
        icon: 'lucide:sparkles',
        heading: 'Which tool to learn with: Handpan Studio',
        blocks: [
          {
            kind: 'p',
            html: 'To apply the method, I built <a href="/handpan-studio">Handpan Studio</a>, the app that makes music visible. It shows your notes in colours, draws chords as shapes, offers an atlas of world scales and lets you create your own. The <strong>Discovery version is free</strong> in acoustic mode; the <strong>Studio plan (from €9.90)</strong> unlocks the electronic mode, saving and advanced creation. It’s the ideal companion to practise on your own, at your own pace.',
          },
        ],
      },
      {
        id: 'niveau-superieur',
        icon: 'lucide:graduation-cap',
        heading: 'Going further: lessons',
        blocks: [
          {
            kind: 'p',
            html: 'At some point, an outside eye speeds everything up: posture, hands, rhythm, scale choice. My <a href="/cours">handpan lessons</a>, online anywhere in the world or in person in Paris, adapt to your level — from complete beginner to seasoned player. We work on the colour-and-shape method, but also groove and personal expression. To dig deeper into the method, read <a href="/blog/handpan-par-les-couleurs">the handpan through colours</a> and <a href="/blog/creer-sa-gamme-de-handpan">creating your handpan scale</a>.',
          },
        ],
      },
    ],
    relatedHeading: 'Go further',
    related: [
      { href: '/handpan-studio', label: 'Discover the Handpan Studio app' },
      { href: '/cours', label: 'Take handpan lessons' },
      { href: '/le-neotone', label: 'The electronic Neotone handpan' },
      { href: '/blog/handpan-par-les-couleurs', label: 'Article: the handpan through colours' },
      { href: '/blog/creer-sa-gamme-de-handpan', label: 'Article: create your handpan scale' },
    ],
    faqHeading: 'Frequently asked questions',
    faq: [
      {
        q: 'Is the handpan hard to learn?',
        a: 'No, it’s one of the most accessible instruments there is. The notes are tuned together, so everything you play sounds right. Within minutes you can play a little melody; progress then comes with consistency.',
      },
      {
        q: 'How long does it take to learn the handpan?',
        a: 'From the very first session you play simple melodies. With a few weeks of regular practice (ten minutes a day) you improvise with pleasure. Fine control of rhythm and dynamics builds over months, like any instrument.',
      },
      {
        q: 'Can you learn the handpan alone, without a teacher?',
        a: 'Yes. Many start on their own, by ear, with a visual tool like Handpan Studio. A teacher remains valuable to correct posture, gesture and rhythm and to progress faster — but isn’t essential to begin.',
      },
      {
        q: 'Do you need to buy a handpan to learn?',
        a: 'Not necessarily at the very start: the free Discovery version of Handpan Studio lets you practise in acoustic mode. To truly play with your hands, an acoustic handpan or an electronic Neotone soon becomes essential.',
      },
    ],
    cta: {
      heading: 'Ready to play your first melodies?',
      text: 'Try the colour-based method right in the app — the Discovery version is free.',
      primary: { href: '/handpan-studio#acces', label: 'Access to the app' },
      secondary: { href: '/cours', label: 'See the lessons' },
    },
    datePublished: '2026-07-01',
    dateModified: '2026-07-01',
  },

  vsAcoustic: {
    slug: 'handpan-electronique-vs-acoustique',
    title: 'Electronic vs Acoustic Handpan: The Comparison',
    description:
      'Electronic or acoustic handpan? Sound, headphone play, scales, effects, MIDI, price, upkeep: the full comparison to help you choose.',
    keywords:
      'electronic handpan, acoustic handpan, Neotone, electronic vs acoustic handpan, handpan comparison, handpan headphones',
    breadcrumbLabel: 'Electronic vs acoustic',
    eyebrow: 'Comparison',
    h1: 'Electronic vs acoustic handpan: which one to choose?',
    leadAnswer:
      'An acoustic handpan offers a unique organic resonance and physical contact, but stays locked to a single scale and plays out loud. An electronic handpan like the Neotone plays on headphones, changes scale instantly, adds effects and connects over MIDI — at the cost of an amplified rather than natural sound.',
    sections: [
      {
        id: 'differences',
        icon: 'lucide:git-compare',
        heading: 'The real differences',
        blocks: [
          {
            kind: 'p',
            html: 'The difference isn’t the gesture — in both cases you play with your hands — but how the sound is produced and what the instrument lets you do around it.',
          },
          {
            kind: 'ul',
            items: [
              'Sound: acoustic resonates in the air, rich and alive; electronic produces a signal you hear on headphones or speakers, with perfect tuning.',
              'Headphones / night: only the electronic can be played silently, a real asset in a flat or late at night.',
              'Scales: acoustic is locked to one scale; the Neotone holds dozens and switches in a single gesture.',
              'Effects: reverb, delay, alternative sounds… electronic opens a sonic playground the acoustic doesn’t have.',
              'MIDI: electronic connects to your computer to record, compose and drive other sounds.',
              'Price: a good acoustic handpan and a Neotone are in comparable ranges, but the electronic one replaces several instruments in different scales.',
              'Upkeep: acoustic steel can rust and drift out of tune; the electronic never detunes and never rusts.',
            ],
          },
        ],
      },
      {
        id: 'pour-qui',
        icon: 'lucide:users',
        heading: 'Who is each one for?',
        blocks: [
          {
            kind: 'p',
            html: 'The <strong>acoustic</strong> handpan is for you if you crave physical vibration, outdoor or circle playing, and are attached to one specific scale played out loud. The <strong>electronic Neotone</strong> suits you if you live in a flat, often play on headphones, want to explore many scales without owning many instruments, record your music or enjoy effects. Many players end up owning both — they’re complementary, not rivals.',
          },
        ],
      },
      {
        id: 'tableau',
        icon: 'lucide:table',
        heading: 'Comparison table',
        blocks: [
          {
            kind: 'table',
            head: ['Criterion', 'Acoustic', 'Electronic (Neotone)'],
            rows: [
              ['Sound', 'Natural, organic resonance', 'Amplified, perfect tuning'],
              ['Headphone / night play', 'No', 'Yes'],
              ['Scales', 'One, fixed', 'Dozens, interchangeable'],
              ['Effects (reverb, delay…)', 'No', 'Yes'],
              ['MIDI / recording', 'Needs a microphone', 'Built in'],
              ['Detuning / rust', 'Possible over time', 'Never'],
              ['Circle / outdoor play', 'Ideal', 'Needs an amp/headphones'],
            ],
          },
        ],
      },
      {
        id: 'conclusion',
        icon: 'lucide:scale',
        heading: 'A nuanced conclusion',
        blocks: [
          {
            kind: 'p',
            html: 'There’s no “best” in absolute terms: there’s the right instrument for your life. If silence, scale versatility and digital creation matter, the <a href="/le-neotone">Neotone</a> is unbeatable. If acoustic vibration and shared playing come first, a traditional handpan will delight you. And to practise both worlds before buying, the <a href="/handpan-studio">Handpan Studio</a> app offers a free acoustic mode and an electronic mode. I’ve also written a dedicated article: <a href="/blog/pourquoi-handpan-electronique">why I chose the electronic handpan</a>.',
          },
        ],
      },
    ],
    relatedHeading: 'Go further',
    related: [
      { href: '/le-neotone', label: 'Discover the electronic Neotone handpan' },
      { href: '/handpan-studio', label: 'The Handpan Studio app (acoustic + electronic)' },
      { href: '/blog/pourquoi-handpan-electronique', label: 'Article: why the electronic handpan' },
    ],
    faqHeading: 'Frequently asked questions',
    faq: [
      {
        q: 'Does an electronic handpan sound like a real handpan?',
        a: 'The Neotone faithfully reproduces the handpan timbre, with perfect tuning and effects on top. The touch is identical. What changes is the in-air resonance of an acoustic, replaced here by listening on headphones or speakers.',
      },
      {
        q: 'Can you play an electronic handpan on headphones?',
        a: 'Yes, it’s one of its greatest strengths. The Neotone plays entirely on headphones without disturbing anyone — perfect in a flat, at night, or to record cleanly.',
      },
      {
        q: 'Can an electronic handpan change scale?',
        a: 'Yes. Where an acoustic handpan is locked to one scale, the Neotone holds dozens and lets you switch instantly, or even create your own in Handpan Studio.',
      },
      {
        q: 'Electronic or acoustic: which to start with?',
        a: 'Both play the same way. For a beginner in a flat, electronic removes the noise and single-scale hurdles. For physical vibration and group play, acoustic stays unbeatable. Many end up combining both.',
      },
    ],
    cta: {
      heading: 'Want to try the electronic handpan?',
      text: 'Discover the Neotone, or try both modes in the Handpan Studio app.',
      primary: { href: '/le-neotone', label: 'Discover the Neotone' },
      secondary: { href: '/handpan-studio#acces', label: 'Access to the app' },
    },
    datePublished: '2026-07-01',
    dateModified: '2026-07-01',
  },

  chooseHandpan: {
    slug: 'quel-handpan-choisir',
    title: 'Which Handpan to Choose? Beginner Buying Guide',
    description:
      'Which handpan to choose as a beginner: number of notes, recommended scale (D Kurd), acoustic or electronic, budget and mistakes to avoid.',
    keywords:
      'which handpan to choose, buy a handpan, handpan for beginners, D Kurd handpan scale, handpan price, Neotone handpan',
    breadcrumbLabel: 'Which handpan to choose',
    eyebrow: 'Buying guide',
    h1: 'Which handpan should you choose as a beginner?',
    leadAnswer:
      'For a first handpan, choose an 8- or 9-note instrument in an accessible scale like the D Kurd, the most versatile to start with. Then decide between acoustic (natural vibration) and electronic (headphones, multiple scales), try it before buying if you can, and favour a well-tuned instrument over the cheapest one.',
    sections: [
      {
        id: 'nombre-notes',
        icon: 'lucide:hash',
        heading: 'How many notes?',
        blocks: [
          {
            kind: 'p',
            html: 'To start, a handpan with <strong>8 or 9 notes</strong> (one ding plus 7 or 8 notes around it) is ideal: enough to play real melodies without drowning in options. Instruments with 10 notes or more, or with bottom notes, are aimed at more advanced players. On the electronic side, the <a href="/le-neotone">Neotone</a> comes in a 10-note model and the Mutant in 19 notes: you start simple and keep room to grow.',
          },
        ],
      },
      {
        id: 'gamme',
        icon: 'lucide:music',
        heading: 'Which scale? (D Kurd recommended)',
        blocks: [
          {
            kind: 'p',
            html: 'The scale is the most important choice — and on an acoustic, it’s permanent. For a first instrument, the <strong>D Kurd (D minor)</strong> is the consensus pick: warm, just melancholic enough, versatile, it’s the most played scale in the world and the one with the most tutorials. Major scales exist for a brighter sound, but D Kurd remains the best starting point. On a Neotone, this decision isn’t final: you change scale whenever you like.',
          },
        ],
      },
      {
        id: 'acoustique-electronique',
        icon: 'lucide:git-compare',
        heading: 'Acoustic or electronic?',
        blocks: [
          {
            kind: 'p',
            html: 'A key question, which I detail in my <a href="/handpan-electronique-vs-acoustique">electronic vs acoustic handpan</a> comparison. In short: acoustic for physical vibration and outdoor play; electronic (Neotone) for headphones, multiple scales, effects and recording. If you live in a flat or are still unsure about the scale, electronic saves you from choosing wrong and buying twice.',
          },
        ],
      },
      {
        id: 'budget',
        icon: 'lucide:wallet',
        heading: 'What budget?',
        blocks: [
          {
            kind: 'p',
            html: 'Be wary of very cheap instruments: below a certain price, tuning is often rough and the instrument will sound off — the worst possible start. A properly made handpan is a real investment, but it lasts and makes you want to play. A Neotone sits in a range comparable to a good acoustic while replacing several scales. Also check the <a href="/boutique">shop</a> for accessories (bag, stand) that protect your instrument.',
          },
        ],
      },
      {
        id: 'essayer',
        icon: 'lucide:map-pin',
        heading: 'Where to try it before buying',
        blocks: [
          {
            kind: 'p',
            html: 'Nothing replaces putting your hands on the instrument. In Paris, my <a href="/showroom">showroom</a> is the only place in the world where you can test a Neotone and walk away with it the same day, with no manufacturing wait and at the best price. There you compare scales, feel the response under your fingers, and I guide you according to your level and taste.',
          },
        ],
      },
      {
        id: 'erreurs',
        icon: 'lucide:alert-triangle',
        heading: 'Mistakes to avoid',
        blocks: [
          {
            kind: 'ul',
            items: [
              'Buying the cheapest: a poorly tuned instrument puts you off more than it motivates you.',
              'Choosing a rare scale “because it sounds beautiful” in a video: D Kurd opens far more songs and tutorials.',
              'Getting too many notes at once: 8–9 notes are plenty to begin.',
              'Neglecting the bag and stand: they protect a costly instrument and improve your playing comfort.',
              'Buying without trying when a showroom is within reach: the feel under your fingers is decisive.',
            ],
          },
        ],
      },
    ],
    relatedHeading: 'Go further',
    related: [
      { href: '/le-neotone', label: 'The electronic Neotone handpan (10 & 19 notes)' },
      { href: '/showroom', label: 'Try a handpan at the Paris showroom' },
      { href: '/boutique', label: 'Accessories: bags, stands…' },
      { href: '/handpan-electronique-vs-acoustique', label: 'Electronic vs acoustic comparison' },
    ],
    faqHeading: 'Frequently asked questions',
    faq: [
      {
        q: 'Which handpan scale should a beginner choose?',
        a: 'The D Kurd (D minor) is the best choice for a first handpan: versatile, warm, it’s the most played scale and the best documented in tutorials. On an electronic Neotone you aren’t locked to a single scale anyway.',
      },
      {
        q: 'How many notes for a first handpan?',
        a: 'An 8- or 9-note handpan is ideal to start: enough for real melodies without needless complexity. Models with 10 notes and more are better once the basics are in place.',
      },
      {
        q: 'How much does a good handpan cost?',
        a: 'A properly made handpan is a notable investment. Be wary of very low prices: below a certain point, tuning is often poor. An electronic Neotone sits in a comparable range while replacing several scales.',
      },
      {
        q: 'Where can you try a handpan before buying?',
        a: 'In Paris, my showroom lets you test the instruments, compare scales and walk away the same day with your Neotone, with no manufacturing wait. Trying before buying is still the best way to avoid a mistake.',
      },
    ],
    cta: {
      heading: 'Find the handpan that suits you',
      text: 'Come try it in Paris, or discover the Neotone and its interchangeable scales.',
      primary: { href: '/showroom', label: 'Book my showroom visit' },
      secondary: { href: '/le-neotone', label: 'Discover the Neotone' },
    },
    datePublished: '2026-07-01',
    dateModified: '2026-07-01',
  },
}

export const guides: Record<Lang, GuidesByLang> = { fr, en }

export function getGuide(lang: Lang, key: GuideKey): Guide {
  return guides[lang][key]
}
