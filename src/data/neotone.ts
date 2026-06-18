// ============================================================
// Données Neotone NEUTRES (langue-agnostiques) : prix, TVA, images,
// icônes, codes pays. Toute la prose vit dans src/i18n/dict.ts
// (clés data.*), indexée dans le même ordre que ces tableaux.
// ============================================================

export type WoodKey = 'frene' | 'chene' | 'acajou' | 'cerisier' | 'noyer'
export type ModelId = 'one' | 'mutant'

// Libellés des bois (FR + EN) — noms propres d'essences
export const woodNames: Record<WoodKey, { fr: string; en: string }> = {
  frene: { fr: 'Frêne', en: 'Ash' },
  chene: { fr: 'Chêne', en: 'Oak' },
  acajou: { fr: 'Acajou', en: 'Mahogany' },
  cerisier: { fr: 'Cerisier', en: 'Cherry' },
  noyer: { fr: 'Noyer', en: 'Walnut' },
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

export const modelImages: Record<ModelId, { src: string; w: number; h: number }> = {
  one: { src: '/images/neotone-1-edition.webp', w: 670, h: 653 },
  mutant: { src: '/images/neotone-mutant-edition.webp', w: 670, h: 614 },
}

// Icônes des cartes specs / inclus (ordre = dict.data.specs / dict.data.included)
export const specIcons = ['lucide:music', 'lucide:circle-dot', 'lucide:battery-charging', 'lucide:cable', 'lucide:settings', 'lucide:ruler']
export const includedIcons = ['lucide:briefcase', 'lucide:globe', 'lucide:shield-check', 'lucide:plug']

export interface Country {
  code: string
  vat: number
  eu: boolean
  name: { fr: string; en: string }
  note?: { fr: string; en: string }
}

export const countries: Country[] = [
  { code: 'FR', vat: 20, eu: true, name: { fr: 'France', en: 'France' } },
  { code: 'DE', vat: 19, eu: true, name: { fr: 'Allemagne', en: 'Germany' } },
  { code: 'AT', vat: 20, eu: true, name: { fr: 'Autriche', en: 'Austria' } },
  { code: 'BE', vat: 21, eu: true, name: { fr: 'Belgique', en: 'Belgium' } },
  { code: 'BG', vat: 20, eu: true, name: { fr: 'Bulgarie', en: 'Bulgaria' } },
  { code: 'CY', vat: 19, eu: true, name: { fr: 'Chypre', en: 'Cyprus' } },
  { code: 'HR', vat: 25, eu: true, name: { fr: 'Croatie', en: 'Croatia' } },
  { code: 'DK', vat: 25, eu: true, name: { fr: 'Danemark', en: 'Denmark' } },
  { code: 'ES', vat: 21, eu: true, name: { fr: 'Espagne', en: 'Spain' } },
  { code: 'EE', vat: 24, eu: true, name: { fr: 'Estonie', en: 'Estonia' } },
  { code: 'FI', vat: 25.5, eu: true, name: { fr: 'Finlande', en: 'Finland' } },
  { code: 'GR', vat: 24, eu: true, name: { fr: 'Grèce', en: 'Greece' } },
  { code: 'HU', vat: 27, eu: true, name: { fr: 'Hongrie', en: 'Hungary' } },
  { code: 'IE', vat: 23, eu: true, name: { fr: 'Irlande', en: 'Ireland' } },
  { code: 'IT', vat: 22, eu: true, name: { fr: 'Italie', en: 'Italy' } },
  { code: 'LV', vat: 21, eu: true, name: { fr: 'Lettonie', en: 'Latvia' } },
  { code: 'LT', vat: 21, eu: true, name: { fr: 'Lituanie', en: 'Lithuania' } },
  { code: 'LU', vat: 17, eu: true, name: { fr: 'Luxembourg', en: 'Luxembourg' } },
  { code: 'MT', vat: 18, eu: true, name: { fr: 'Malte', en: 'Malta' } },
  { code: 'NL', vat: 21, eu: true, name: { fr: 'Pays-Bas', en: 'Netherlands' } },
  { code: 'PL', vat: 23, eu: true, name: { fr: 'Pologne', en: 'Poland' } },
  { code: 'PT', vat: 23, eu: true, name: { fr: 'Portugal', en: 'Portugal' } },
  { code: 'CZ', vat: 21, eu: true, name: { fr: 'Tchéquie', en: 'Czechia' } },
  { code: 'RO', vat: 21, eu: true, name: { fr: 'Roumanie', en: 'Romania' } },
  { code: 'SK', vat: 23, eu: true, name: { fr: 'Slovaquie', en: 'Slovakia' } },
  { code: 'SI', vat: 22, eu: true, name: { fr: 'Slovénie', en: 'Slovenia' } },
  { code: 'SE', vat: 25, eu: true, name: { fr: 'Suède', en: 'Sweden' } },
  { code: 'GB', vat: 0, eu: false, name: { fr: 'Royaume-Uni', en: 'United Kingdom' }, note: { fr: "Hors UE : aucune TVA européenne facturée. La TVA d'import britannique de 20 % et d'éventuels frais de douane peuvent être appliqués à la livraison.", en: 'Outside the EU: no European VAT charged. UK import VAT of 20% and possible customs fees may apply on delivery.' } },
  { code: 'CH', vat: 0, eu: false, name: { fr: 'Suisse', en: 'Switzerland' }, note: { fr: "Suisse — frais d'importation estimés (à vérifier) : TVA d'importation suisse 8,1 % sur la valeur totale + frais Swiss Post 13 CHF + 3 %. Estimation totale ≈ 330 à 360 CHF de frais supplémentaires à la livraison. Montants à vérifier avec ton transporteur au moment de la commande.", en: 'Switzerland — estimated import fees (to verify): Swiss import VAT 8.1% on the total value + Swiss Post fees CHF 13 + 3%. Total estimate ≈ CHF 330 to 360 of extra fees on delivery. Amounts to verify with your carrier at order time.' } },
  { code: 'NO', vat: 0, eu: false, name: { fr: 'Norvège', en: 'Norway' }, note: { fr: "Hors UE : aucune TVA européenne facturée. La TVA d'import norvégienne de 25 % et d'éventuels frais de douane peuvent être appliqués à la livraison.", en: 'Outside the EU: no European VAT charged. Norwegian import VAT of 25% and possible customs fees may apply on delivery.' } },
  { code: 'US', vat: 0, eu: false, name: { fr: 'États-Unis', en: 'United States' }, note: { fr: "Hors UE : aucune TVA européenne facturée. Les taxes d'État, droits d'importation et frais de courtage sont à régler à la livraison.", en: 'Outside the EU: no European VAT charged. State taxes, import duties and brokerage fees are payable on delivery.' } },
  { code: 'CA', vat: 0, eu: false, name: { fr: 'Canada', en: 'Canada' }, note: { fr: "Hors UE : aucune TVA européenne facturée. La TPS/TVH/GST et d'éventuels frais de douane sont à régler à la livraison.", en: 'Outside the EU: no European VAT charged. GST/HST and possible customs fees are payable on delivery.' } },
  { code: 'AU', vat: 0, eu: false, name: { fr: 'Australie', en: 'Australia' }, note: { fr: "Hors UE : aucune TVA européenne facturée. La GST australienne (10 %) et d'éventuels frais de douane sont à régler à la livraison.", en: 'Outside the EU: no European VAT charged. Australian GST (10%) and possible customs fees are payable on delivery.' } },
  { code: 'JP', vat: 0, eu: false, name: { fr: 'Japon', en: 'Japan' }, note: { fr: "Hors UE : aucune TVA européenne facturée. La taxe de consommation japonaise et d'éventuels frais de douane sont à régler à la livraison.", en: 'Outside the EU: no European VAT charged. Japanese consumption tax and possible customs fees are payable on delivery.' } },
  { code: 'OTHER', vat: 0, eu: false, name: { fr: 'Autre pays hors UE', en: 'Other non-EU country' }, note: { fr: "Hors UE : aucune TVA européenne facturée. Des frais de douane et taxes d'importation locaux peuvent être appliqués par les autorités du pays de destination, à ta charge.", en: 'Outside the EU: no European VAT charged. Local customs and import taxes may be charged by the destination country, at your expense.' } },
]
