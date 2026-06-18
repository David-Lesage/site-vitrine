// ============================================================
// Données Neotone : modèles, bois, specs, TVA, FAQ
// (réutilisées de l'ancien site neotone-david-lesage)
// ============================================================

export interface ModelData {
  id: 'one' | 'mutant'
  label: string
  notesLabel: string
  tagline: string
  fromPrice: number
  woods: Record<WoodKey, number>
  features: string[]
}

export type WoodKey = 'frene' | 'chene' | 'acajou' | 'cerisier' | 'noyer'

export const woodLabels: Record<WoodKey, string> = {
  frene: 'Frêne',
  chene: 'Chêne',
  acajou: 'Acajou',
  cerisier: 'Cerisier',
  noyer: 'Noyer',
}

export const woods = [
  { key: 'frene' as WoodKey, en: 'Ash', supplement: 'Inclus dans le prix de base', img: '/images/bois-frene.webp' },
  { key: 'chene' as WoodKey, en: 'Oak', supplement: 'Inclus dans le prix de base', img: '/images/bois-chene.webp' },
  { key: 'acajou' as WoodKey, en: 'Mahogany', supplement: 'Supplément +90 € HT', img: '/images/bois-acajou.webp' },
  { key: 'cerisier' as WoodKey, en: 'Cherry', supplement: 'Supplément +90 € HT', img: '/images/bois-cerisier.webp' },
  { key: 'noyer' as WoodKey, en: 'Walnut', supplement: 'Supplément +190 € HT', img: '/images/bois-noyer.webp' },
]

// Dimensions intrinsèques des visuels produit (pour width/height → anti-CLS)
export const modelImages: Record<'one' | 'mutant', { src: string; w: number; h: number }> = {
  one: { src: '/images/neotone-1-edition.webp', w: 670, h: 653 },
  mutant: { src: '/images/neotone-mutant-edition.webp', w: 670, h: 614 },
}

export const models: ModelData[] = [
  {
    id: 'one',
    label: 'Neotone¹',
    notesLabel: '10 notes · sans écran',
    tagline: "L'essentiel, sans écran",
    fromPrice: 1990,
    woods: { frene: 1990, chene: 1990, acajou: 2080, cerisier: 2080, noyer: 2180 },
    features: [
      '9 notes principales + ding + dome (10 zones de jeu)',
      '9 gammes embarquées via touches dédiées · illimitées en wifi',
      'Création de gammes personnalisées illimitées via interface web',
      'Ding multifonction : changer de gamme · enregistreur intégré',
      'Contrôle MIDI complet (in / out)',
      '1 entrée pédale (volume ou expression)',
      'Sortie audio mono (1 jack) ou stéréo (2 jacks)',
      'Batterie Li-Ion 7800 mAh — 8 h d’autonomie',
      '1 300 échantillons par gamme · 48 kHz / 32 bit',
    ],
  },
  {
    id: 'mutant',
    label: 'Neotone¹ Mutant',
    notesLabel: '19 notes · écran LCD',
    tagline: "L'expression maximale, avec écran LCD",
    fromPrice: 3150,
    woods: { frene: 3150, chene: 3150, acajou: 3240, cerisier: 3240, noyer: 3340 },
    features: [
      '9 emplacements de notes avec zones d’extension = 19 notes par gamme',
      '18 gammes embarquées via touches dédiées · illimitées en wifi',
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
]

export interface Country {
  code: string
  name: string
  vat: number
  eu: boolean
  note?: string
}

export const countries: Country[] = [
  { code: 'FR', name: 'France', vat: 20, eu: true },
  { code: 'DE', name: 'Allemagne', vat: 19, eu: true },
  { code: 'AT', name: 'Autriche', vat: 20, eu: true },
  { code: 'BE', name: 'Belgique', vat: 21, eu: true },
  { code: 'BG', name: 'Bulgarie', vat: 20, eu: true },
  { code: 'CY', name: 'Chypre', vat: 19, eu: true },
  { code: 'HR', name: 'Croatie', vat: 25, eu: true },
  { code: 'DK', name: 'Danemark', vat: 25, eu: true },
  { code: 'ES', name: 'Espagne', vat: 21, eu: true },
  { code: 'EE', name: 'Estonie', vat: 24, eu: true },
  { code: 'FI', name: 'Finlande', vat: 25.5, eu: true },
  { code: 'GR', name: 'Grèce', vat: 24, eu: true },
  { code: 'HU', name: 'Hongrie', vat: 27, eu: true },
  { code: 'IE', name: 'Irlande', vat: 23, eu: true },
  { code: 'IT', name: 'Italie', vat: 22, eu: true },
  { code: 'LV', name: 'Lettonie', vat: 21, eu: true },
  { code: 'LT', name: 'Lituanie', vat: 21, eu: true },
  { code: 'LU', name: 'Luxembourg', vat: 17, eu: true },
  { code: 'MT', name: 'Malte', vat: 18, eu: true },
  { code: 'NL', name: 'Pays-Bas', vat: 21, eu: true },
  { code: 'PL', name: 'Pologne', vat: 23, eu: true },
  { code: 'PT', name: 'Portugal', vat: 23, eu: true },
  { code: 'CZ', name: 'Tchéquie', vat: 21, eu: true },
  { code: 'RO', name: 'Roumanie', vat: 21, eu: true },
  { code: 'SK', name: 'Slovaquie', vat: 23, eu: true },
  { code: 'SI', name: 'Slovénie', vat: 22, eu: true },
  { code: 'SE', name: 'Suède', vat: 25, eu: true },
  { code: 'GB', name: 'Royaume-Uni', vat: 0, eu: false, note: "Hors UE : aucune TVA européenne facturée. La TVA d'import britannique de 20 % et d'éventuels frais de douane peuvent être appliqués à la livraison." },
  { code: 'CH', name: 'Suisse', vat: 0, eu: false, note: "Suisse — frais d'importation estimés (à vérifier) : TVA d'importation suisse 8,1 % sur la valeur totale + frais Swiss Post 13 CHF + 3 %. Estimation totale ≈ 330 à 360 CHF de frais supplémentaires à la livraison. Montants à vérifier avec ton transporteur au moment de la commande." },
  { code: 'NO', name: 'Norvège', vat: 0, eu: false, note: "Hors UE : aucune TVA européenne facturée. La TVA d'import norvégienne de 25 % et d'éventuels frais de douane peuvent être appliqués à la livraison." },
  { code: 'US', name: 'États-Unis', vat: 0, eu: false, note: "Hors UE : aucune TVA européenne facturée. Les taxes d'État, droits d'importation et frais de courtage sont à régler à la livraison." },
  { code: 'CA', name: 'Canada', vat: 0, eu: false, note: "Hors UE : aucune TVA européenne facturée. La TPS/TVH/GST et d'éventuels frais de douane sont à régler à la livraison." },
  { code: 'AU', name: 'Australie', vat: 0, eu: false, note: "Hors UE : aucune TVA européenne facturée. La GST australienne (10 %) et d'éventuels frais de douane sont à régler à la livraison." },
  { code: 'JP', name: 'Japon', vat: 0, eu: false, note: "Hors UE : aucune TVA européenne facturée. La taxe de consommation japonaise et d'éventuels frais de douane sont à régler à la livraison." },
  { code: 'OTHER', name: 'Autre pays hors UE', vat: 0, eu: false, note: "Hors UE : aucune TVA européenne facturée. Des frais de douane et taxes d'importation locaux peuvent être appliqués par les autorités du pays de destination, à ta charge." },
]

export const specs = [
  {
    icon: 'lucide:music',
    title: 'Qualité audio studio',
    items: ['48 kHz / 32 bit · DAC 24 bits / 384 kHz', 'Rapport signal/bruit : 112 dB', 'Latence audio : 5 ms', '1 300 échantillons studio par gamme', 'Notes : 7 nuances × 10–15 vélocités'],
  },
  {
    icon: 'lucide:circle-dot',
    title: '6 gammes incluses + illimitées',
    items: ['B-Amara · C-Aegean · C# Pygmy', 'D-Kurd · F#2 Pygmy · G-Romanian Hijaz', 'Création de gammes personnalisées illimitées', '5 gammes MAG Instruments, 1 gamme Yishama'],
  },
  {
    icon: 'lucide:battery-charging',
    title: 'Batterie 8 heures',
    items: ['Batterie Li-Ion 7,4 V · 7 800 mAh intégrée', '8 heures d’autonomie en jeu continu', 'Charge complète : 4 heures', 'Adaptateur secteur 12 V fourni'],
  },
  {
    icon: 'lucide:cable',
    title: 'MIDI in/out complet',
    items: ['Contrôleur MIDI (out) + module sonore MIDI (in)', '6 zones du corps + 18 pads + Ding + Dome', 'Notes MIDI assignables par zone', 'Compatible standards MIDI'],
  },
  {
    icon: 'lucide:settings',
    title: 'Connectique pro',
    items: ['Sorties ligne (R/L) asymétriques', 'Sortie casque · MIDI in/out', '1 entrée pédale (volume ou expression)', 'Mono (1 jack) ou stéréo (2 jacks)', 'WiFi · réglages, création de gammes'],
  },
  {
    icon: 'lucide:ruler',
    title: 'Format, poids & capteurs',
    items: ['47 cm de diamètre · 16 cm de hauteur', '3,5 kg (selon essence du bois)', 'Précision du capteur : 0,5 cm', 'Sensibilité : 20 à 5 000 g', 'Détecte frappe, pression et position'],
  },
]

export const comparatif = [
  { aco: 'Très peu de notes. La physique du métal limite tout : taille, dissonances, place disponible.', neo: "L'électronique libère le placement des notes : bien plus de notes et de gammes possibles sur un seul instrument." },
  { aco: 'Pour jouer 10 gammes, il faut 10 handpans : transport difficile, stockage encombrant, budget qui grimpe.', neo: 'Un seul Neotone ouvre une infinité de gammes — un seul instrument à transporter, ranger et payer.' },
  { aco: 'La technique de frappe acoustique est exigeante : décourageant au début.', neo: 'Des capteurs à sensibilité réglable : un son juste dès la première frappe, le plaisir de jouer tout de suite.' },
  { aco: 'Faire sortir les harmoniques demande une précision rare en acoustique.', neo: 'Sur le Neotone, les harmoniques sortent facilement — et les effets acoustiques restent là.' },
  { aco: 'Sur le Mutant acoustique, les zones des notes mutantes sont petites et précises.', neo: 'La taille des zones de frappe est réglable (jusqu’à 30 % de la note) : agrandis pour débuter, réduis pour la précision.' },
]

export const faq = [
  { q: 'Quelle garantie accompagne le Neotone ?', a: 'Chaque Neotone est livré avec une garantie de 6 ans, une housse semi-rigide et un chargeur.' },
  { q: 'Quelle entreprise fabrique le Neotone ?', a: "Le Neotone est fabriqué par Soundventure Ltd, à Budapest (Hongrie). L'instrument est né du rêve de deux amis ; la société a été fondée en 2021, avec le soutien de MAG Instruments et Yishama Ltd." },
  { q: "À qui s'adresse le Neotone ?", a: "À tout le monde : jouer du handpan numérique ne demande aucun prérequis. Il devient vite indispensable pour les musiciens de scène (boucler, brancher des pédales), pour l'enregistrement studio, pour les joueurs nocturnes (jeu au casque) et pour les digital nomades. Et pour les joueurs déjà conquis, il ouvre le champ infini de la création de gammes." },
  { q: 'Procure-t-il les mêmes sensations qu’un handpan acoustique ?', a: "L'expérience diffère du jeu acoustique : le son ne sort pas directement de l'instrument mais d'un casque ou d'une enceinte. Avantages : immersion totale au casque, volume réglable, plus aucun Larsen sur scène. Les systèmes Bose L1 sont idéaux ; le Bose S1 Pro est une excellente option portative." },
  { q: 'Le Mutant est-il identique à un vrai handpan « mutant » ?', a: "Non. Les notes supplémentaires se jouent via une zone distincte à l'intérieur de chaque tonefield, ce qui demande un jeu doux et précis. Tu peux agrandir cette zone jusqu’à 30 % de la note pour plus de confort." },
  { q: 'Je débute — recommandes-tu le Neotone ?', a: "Les deux modèles conviennent parfaitement aux débutants. Le Mutant demande un jeu un peu plus précis pour ses notes supplémentaires, mais permet d'aller beaucoup plus loin dans l'harmonie." },
  { q: 'Faut-il du matériel supplémentaire pour produire du son ?', a: "Le Neotone est un instrument numérique autonome avec son propre moteur sonore : pas besoin d'ordinateur. Il n'a pas de haut-parleurs intégrés — le son passe par l'une de ses sorties audio." },
  { q: 'Peut-on appliquer des effets au son du Neotone ?', a: 'Comme avec une guitare électrique, tu peux y connecter tout le matériel externe : pédales d’effet (Boss OC-3), loop stations (Roland RC-505 MKII), reverbs (Strymon Nightsky, Hologram Microcosm).' },
  { q: 'Le Neotone est-il portable et autonome sur batterie ?', a: 'Oui. Environ 8 heures d’autonomie en jeu continu. Il est livré avec un chargeur, utilisable que l’instrument soit en cours de jeu ou non.' },
]

export const procedure = [
  { n: 1, title: 'Contacte-moi pour recevoir ton code de remise', text: 'Envoie un email avec ton nom et prénom, ton pays de livraison, ton email et ton numéro de téléphone.' },
  { n: 2, title: 'Reçois ton code de remise unique', text: 'Tu reçois un code de réduction nominatif de la part de Neotone (−5 % en ligne, −7 % au showroom).' },
  { n: 3, title: 'Passe commande chez Neotone', text: 'Neotone te recontacte sous deux jours avec une offre personnalisée.' },
  { n: 4, title: "Verse l'acompte de 1 000 € HT", text: "À réception de la confirmation, tu règles un acompte de 1 000 € HT. Cela déclenche la fabrication artisanale de ton instrument." },
  { n: 5, title: 'Patience pendant la fabrication', text: 'Le délai varie entre 2 et 5 mois selon la file d’attente. Tu reçois un délai estimatif personnalisé.' },
  { n: 6, title: 'Règle le solde et reçois ton Neotone', text: 'Dès que ton instrument est prêt, tu es notifié par email. Tu règles le solde puis l’instrument t’est expédié avec sa facture, partout dans le monde.' },
]

export const included = [
  { icon: 'lucide:briefcase', title: 'Sac de transport', text: 'Sac noir spécial avec bandoulière et sangles sac à dos · 520 × 220 mm.' },
  { icon: 'lucide:globe', title: 'Livraison mondiale', text: 'Frais d’envoi compris dans le prix, partout dans le monde.' },
  { icon: 'lucide:shield-check', title: 'Garantie 6 ans', text: 'Réparation + transport inclus.' },
  { icon: 'lucide:plug', title: 'Chargeur secteur fourni', text: 'Chargeur 12 V standard livré (prise selon le pays de livraison).' },
]
