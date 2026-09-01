// ============================================================
// Données Neotone NEUTRES (langue-agnostiques) : prix, TVA, images,
// icônes, codes pays. Toute la prose vit dans src/i18n/dict.ts
// (clés data.*), indexée dans le même ordre que ces tableaux.
// ============================================================

import type { Lang } from '@/i18n/config'

export type WoodKey = 'frene' | 'chene' | 'acajou' | 'cerisier' | 'noyer'
export type ModelId = 'one' | 'mutant'

// Libellés des bois (FR + EN + ES) — noms d'essences
export const woodNames: Record<WoodKey, Record<Lang, string>> = {
  frene: { fr: 'Frêne', en: 'Ash', es: 'Fresno' },
  chene: { fr: 'Chêne', en: 'Oak', es: 'Roble' },
  acajou: { fr: 'Acajou', en: 'Mahogany', es: 'Caoba' },
  cerisier: { fr: 'Cerisier', en: 'Cherry', es: 'Cerezo' },
  noyer: { fr: 'Noyer', en: 'Walnut', es: 'Nogal' },
}

export const woods: { key: WoodKey; img: string }[] = [
  { key: 'frene', img: '/images/bois-frene.webp' },
  { key: 'chene', img: '/images/bois-chene.webp' },
  { key: 'acajou', img: '/images/bois-acajou.webp' },
  { key: 'cerisier', img: '/images/bois-cerisier.webp' },
  { key: 'noyer', img: '/images/bois-noyer.webp' },
]

export const models: { id: ModelId; fromPrice: number; woods: Record<WoodKey, number> }[] = [
  { id: 'one', fromPrice: 1990, woods: { frene: 1990, chene: 1990, acajou: 2080, cerisier: 2080, noyer: 2180 } },
  { id: 'mutant', fromPrice: 3150, woods: { frene: 3150, chene: 3150, acajou: 3240, cerisier: 3240, noyer: 3340 } },
]


// Photos défilantes (carrousel) par modèle. `wide` = visuel large (écran, connectique)
// affiché en `contain` au lieu de `cover`. Ordre repris de l'ancien site.
export const modelCarousels: Record<ModelId, { src: string; wide?: boolean }[]> = {
  one: [
    { src: '/images/neotone1-1.jpg' },
    { src: '/images/neotone1-2.jpg' },
    { src: '/images/neotone1-3.jpg' },
    { src: '/images/neotone1-6.jpg' },
    { src: '/images/neotone1-5.jpg' },
    { src: '/images/neotone1-4.jpg' },
    { src: '/images/neotone1-7.jpg' },
    { src: '/images/neotone1-8.jpg' },
    { src: '/images/neotone1-9.jpg' },
    { src: '/images/neotone1-10.jpg' },
  ],
  mutant: [
    { src: '/images/mutant-0.jpg' },
    { src: '/images/mutant-1.jpg' },
    { src: '/images/mutant-2.jpg' },
    { src: '/images/mutant-ecran.avif', wide: true },
    { src: '/images/mutant-connectique.avif', wide: true },
    { src: '/images/mutant-3.jpg' },
    { src: '/images/mutant-4.jpg' },
    { src: '/images/mutant-5.jpg' },
    { src: '/images/mutant-6.jpg' },
    { src: '/images/mutant-9.jpg' },
    { src: '/images/mutant-10.jpg' },
    { src: '/images/mutant-11.jpg' },
    { src: '/images/mutant-8.jpg' },
  ],
}

// Photos détaillées (vue dessus / dessous) ouvertes au clic sur une essence.
export const woodDetails: Record<WoodKey, { imgTop: string; imgBottom: string }> = {
  frene: { imgTop: '/images/frene-01.avif', imgBottom: '/images/frene-02.avif' },
  chene: { imgTop: '/images/chene-01.avif', imgBottom: '/images/chene-02.avif' },
  acajou: { imgTop: '/images/acajou-01.avif', imgBottom: '/images/acajou-02.avif' },
  cerisier: { imgTop: '/images/cerisier-01.avif', imgBottom: '/images/cerisier-02.avif' },
  noyer: { imgTop: '/images/noyer-01.avif', imgBottom: '/images/noyer-02.avif' },
}

// Icônes des cartes specs / inclus (ordre = dict.data.specs / dict.data.included)
export const specIcons = ['lucide:music', 'lucide:circle-dot', 'lucide:battery-charging', 'lucide:cable', 'lucide:settings', 'lucide:ruler']
export const includedIcons = ['lucide:briefcase', 'lucide:globe', 'lucide:shield-check', 'lucide:plug']
export const extrasIcons = ['lucide:headphones', 'lucide:cable', 'lucide:speaker', 'lucide:usb']

export interface Country {
  code: string
  vat: number
  eu: boolean
  name: Record<Lang, string>
  note?: Record<Lang, string>
}

export const countries: Country[] = [
  { code: 'FR', vat: 20, eu: true, name: { fr: 'France', en: 'France', es: 'Francia' } },
  { code: 'DE', vat: 19, eu: true, name: { fr: 'Allemagne', en: 'Germany', es: 'Alemania' } },
  { code: 'AT', vat: 20, eu: true, name: { fr: 'Autriche', en: 'Austria', es: 'Austria' } },
  { code: 'BE', vat: 21, eu: true, name: { fr: 'Belgique', en: 'Belgium', es: 'Bélgica' } },
  { code: 'BG', vat: 20, eu: true, name: { fr: 'Bulgarie', en: 'Bulgaria', es: 'Bulgaria' } },
  { code: 'CY', vat: 19, eu: true, name: { fr: 'Chypre', en: 'Cyprus', es: 'Chipre' } },
  { code: 'HR', vat: 25, eu: true, name: { fr: 'Croatie', en: 'Croatia', es: 'Croacia' } },
  { code: 'DK', vat: 25, eu: true, name: { fr: 'Danemark', en: 'Denmark', es: 'Dinamarca' } },
  { code: 'ES', vat: 21, eu: true, name: { fr: 'Espagne', en: 'Spain', es: 'España' } },
  { code: 'EE', vat: 24, eu: true, name: { fr: 'Estonie', en: 'Estonia', es: 'Estonia' } },
  { code: 'FI', vat: 25.5, eu: true, name: { fr: 'Finlande', en: 'Finland', es: 'Finlandia' } },
  { code: 'GR', vat: 24, eu: true, name: { fr: 'Grèce', en: 'Greece', es: 'Grecia' } },
  { code: 'HU', vat: 27, eu: true, name: { fr: 'Hongrie', en: 'Hungary', es: 'Hungría' } },
  { code: 'IE', vat: 23, eu: true, name: { fr: 'Irlande', en: 'Ireland', es: 'Irlanda' } },
  { code: 'IT', vat: 22, eu: true, name: { fr: 'Italie', en: 'Italy', es: 'Italia' } },
  { code: 'LV', vat: 21, eu: true, name: { fr: 'Lettonie', en: 'Latvia', es: 'Letonia' } },
  { code: 'LT', vat: 21, eu: true, name: { fr: 'Lituanie', en: 'Lithuania', es: 'Lituania' } },
  { code: 'LU', vat: 17, eu: true, name: { fr: 'Luxembourg', en: 'Luxembourg', es: 'Luxemburgo' } },
  { code: 'MT', vat: 18, eu: true, name: { fr: 'Malte', en: 'Malta', es: 'Malta' } },
  { code: 'NL', vat: 21, eu: true, name: { fr: 'Pays-Bas', en: 'Netherlands', es: 'Países Bajos' } },
  { code: 'PL', vat: 23, eu: true, name: { fr: 'Pologne', en: 'Poland', es: 'Polonia' } },
  { code: 'PT', vat: 23, eu: true, name: { fr: 'Portugal', en: 'Portugal', es: 'Portugal' } },
  { code: 'CZ', vat: 21, eu: true, name: { fr: 'Tchéquie', en: 'Czechia', es: 'Chequia' } },
  { code: 'RO', vat: 21, eu: true, name: { fr: 'Roumanie', en: 'Romania', es: 'Rumanía' } },
  { code: 'SK', vat: 23, eu: true, name: { fr: 'Slovaquie', en: 'Slovakia', es: 'Eslovaquia' } },
  { code: 'SI', vat: 22, eu: true, name: { fr: 'Slovénie', en: 'Slovenia', es: 'Eslovenia' } },
  { code: 'SE', vat: 25, eu: true, name: { fr: 'Suède', en: 'Sweden', es: 'Suecia' } },
  { code: 'GB', vat: 0, eu: false, name: { fr: 'Royaume-Uni', en: 'United Kingdom', es: 'Reino Unido' }, note: { fr: "Hors UE : aucune TVA européenne facturée. La TVA d'import britannique de 20 % et d'éventuels frais de douane peuvent être appliqués à la livraison.", en: 'Outside the EU: no European VAT charged. UK import VAT of 20% and possible customs fees may apply on delivery.', es: "Fuera de la UE: no se factura el IVA europeo. Pueden aplicarse el IVA de importación británico del 20 % y posibles gastos de aduana en el momento de la entrega." } },
  { code: 'CH', vat: 0, eu: false, name: { fr: 'Suisse', en: 'Switzerland', es: 'Suiza' }, note: { fr: "Suisse — frais d'importation estimés (à vérifier) : TVA d'importation suisse 8,1 % sur la valeur totale + frais Swiss Post 13 CHF + 3 %. Estimation totale ≈ 330 à 360 CHF de frais supplémentaires à la livraison. Montants à vérifier avec ton transporteur au moment de la commande.", en: 'Switzerland — estimated import fees (to verify): Swiss import VAT 8.1% on the total value + Swiss Post fees CHF 13 + 3%. Total estimate ≈ CHF 330 to 360 of extra fees on delivery. Amounts to verify with your carrier at order time.', es: "Suiza — gastos de importación estimados (a verificar): IVA de importación suizo del 8,1 % sobre el valor total + gastos de Swiss Post de 13 CHF + 3 %. Estimación total ≈ 330 a 360 CHF de gastos adicionales en la entrega. Importes a verificar con tu transportista en el momento del pedido." } },
  { code: 'NO', vat: 0, eu: false, name: { fr: 'Norvège', en: 'Norway', es: 'Noruega' }, note: { fr: "Hors UE : aucune TVA européenne facturée. La TVA d'import norvégienne de 25 % et d'éventuels frais de douane peuvent être appliqués à la livraison.", en: 'Outside the EU: no European VAT charged. Norwegian import VAT of 25% and possible customs fees may apply on delivery.', es: "Fuera de la UE: no se factura el IVA europeo. Pueden aplicarse el IVA de importación noruego del 25 % y posibles gastos de aduana en el momento de la entrega." } },
  { code: 'US', vat: 0, eu: false, name: { fr: 'États-Unis', en: 'United States', es: 'Estados Unidos' }, note: { fr: "Hors UE : aucune TVA européenne facturée. Les taxes d'État, droits d'importation et frais de courtage sont à régler à la livraison.", en: 'Outside the EU: no European VAT charged. State taxes, import duties and brokerage fees are payable on delivery.', es: "Fuera de la UE: no se factura el IVA europeo. Los impuestos estatales, los derechos de importación y los gastos de gestión se abonan en el momento de la entrega." } },
  { code: 'CA', vat: 0, eu: false, name: { fr: 'Canada', en: 'Canada', es: 'Canadá' }, note: { fr: "Hors UE : aucune TVA européenne facturée. La TPS/TVH/GST et d'éventuels frais de douane sont à régler à la livraison.", en: 'Outside the EU: no European VAT charged. GST/HST and possible customs fees are payable on delivery.', es: "Fuera de la UE: no se factura el IVA europeo. El GST/HST/TPS y los posibles gastos de aduana se abonan en el momento de la entrega." } },
  { code: 'AU', vat: 0, eu: false, name: { fr: 'Australie', en: 'Australia', es: 'Australia' }, note: { fr: "Hors UE : aucune TVA européenne facturée. La GST australienne (10 %) et d'éventuels frais de douane sont à régler à la livraison.", en: 'Outside the EU: no European VAT charged. Australian GST (10%) and possible customs fees are payable on delivery.', es: "Fuera de la UE: no se factura el IVA europeo. El GST australiano (10 %) y los posibles gastos de aduana se abonan en el momento de la entrega." } },
  { code: 'JP', vat: 0, eu: false, name: { fr: 'Japon', en: 'Japan', es: 'Japón' }, note: { fr: "Hors UE : aucune TVA européenne facturée. La taxe de consommation japonaise et d'éventuels frais de douane sont à régler à la livraison.", en: 'Outside the EU: no European VAT charged. Japanese consumption tax and possible customs fees are payable on delivery.', es: "Fuera de la UE: no se factura el IVA europeo. El impuesto japonés sobre el consumo y los posibles gastos de aduana se abonan en el momento de la entrega." } },
  { code: 'OTHER', vat: 0, eu: false, name: { fr: 'Autre pays hors UE', en: 'Other non-EU country', es: 'Otro país fuera de la UE' }, note: { fr: "Hors UE : aucune TVA européenne facturée. Des frais de douane et taxes d'importation locaux peuvent être appliqués par les autorités du pays de destination, à ta charge.", en: 'Outside the EU: no European VAT charged. Local customs and import taxes may be charged by the destination country, at your expense.', es: "Fuera de la UE: no se factura el IVA europeo. Las autoridades del país de destino pueden aplicar gastos de aduana e impuestos de importación locales, que corren por tu cuenta." } },
]
