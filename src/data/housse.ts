// Housse de calebasse Now Groove (création de David, faite main, petite série).
// Source des textes et photos : la boutique HelloAsso de Résonances Productions
// (lue le 24/10/2026) — https://www.helloasso.com/associations/resonances-productions/boutiques/pres-vente-housse-calebasse-now-groove-by-david-lesage
// Photos de David téléchargées depuis cette page → public/images/housse-now-groove/.
// HelloAsso propose DEUX options, toutes deux affichées à 99 € :
//   « 1 Housse / Tapis Calebasse + livraison (22€) » et « … - RETRAIT A PARIS ».
// ⚠️ AMBIGU : l'intitulé dit « + livraison (22€) » mais le prix affiché est le même
// (99 €) que le retrait. On recopie tel quel, sans trancher (question posée à David).
export const housseHelloAssoUrl = 'https://www.helloasso.com/associations/resonances-productions/boutiques/pres-vente-housse-calebasse-now-groove-by-david-lesage'
const P = '/images/housse-now-groove/'
export const housseNowGroove = {
  price: 99,
  shippingNote: {
    fr: 'Deux options sur HelloAsso, affichées à 99 € : avec livraison (l’option indique « + livraison 22 € ») ou retrait à Paris, au showroom.',
    en: 'Two options on HelloAsso, both shown at €99: with delivery (the option reads “+ delivery €22”) or pick-up in Paris, at the showroom.',
    es: 'Dos opciones en HelloAsso, ambas a 99 €: con envío (la opción indica «+ envío 22 €») o recogida en París, en el showroom.',
  },
  photos: {
    hero: [P + 'face.webp', P + 'dos-bretelles.webp', P + 'portee-dos.webp', P + 'en-main.webp', P + 'portee-cote.webp'],
    details: [
      { src: P + 'poignee.webp', w: 720, h: 1100, key: 'handle' },
      { src: P + 'interieur-velours.webp', w: 720, h: 1021, key: 'velvet' },
      { src: P + 'pochette-fermee.webp', w: 1400, h: 1050, key: 'pouchClosed' },
      { src: P + 'pochette-ouverte.webp', w: 1400, h: 1050, key: 'pouchOpen' },
      { src: P + 'kit-accessoires.webp', w: 1070, h: 1400, key: 'kit' },
      { src: P + 'housse-detachee.webp', w: 1400, h: 953, key: 'detached' },
    ],
    complete: { src: P + 'contenu-complet.webp', w: 1400, h: 863 },
  },
} as const
