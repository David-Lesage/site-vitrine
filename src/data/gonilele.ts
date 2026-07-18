// ============================================================
// Données NEUTRES de la page Harpe Gonilélé (La Maison du Ngoni).
// Prose traduite dans src/i18n (clé `gonilele`).
// ============================================================

export const gonilelePhotos = [
  '/images/prod-gonilele-4.jpg',
  '/images/prod-gonilele-2.jpg',
  '/images/prod-gonilele-5.jpg',
  '/images/prod-gonilele-6.jpg',
  '/images/prod-gonilele.jpeg',
  '/images/prod-gonilele-3.jpg',
]

// Vidéo de déballage mise en avant
export const gonileleUnboxingId = 'N-BTeDi81VI'

// Vidéos où David joue / présente le Gonilélé (id YouTube + clé de titre i18n)
export const gonileleVideos: { id: string; key: string }[] = [
  { id: '6fHa6__psT0', key: 'extrait' },
  { id: 'aXfJI1eKyT4', key: 'uneAme' },
  { id: 'MvfffvT2xso', key: 'rappelle' },
  { id: 'tsIkVKVxDAg', key: 'kothbiro' },
  { id: 'Ptvh8paylOQ', key: 'sonoriser' },
  { id: '_v1WfCLkgPU', key: 'amplifier' },
]

// Grille tarifaire (montants neutres ; libellés via i18n gonilele.priceRows)
export const gonilelePrices = {
  cordes10: 440,
  cordes12: 520,
  housse: 40,
  accordeur: 10,
  envoi: 25,
}

// Image de la grille d'accordage qui accompagne l'instrument
export const gonileleAccordageImg = '/images/gonilele-accordage.jpg'
// Document complet (Google Slides) — envoyé uniquement aux acheteurs
export const gonileleTuningDocNote = true

// Paiement — association Résonances Productions
export const gonilelePayment = {
  assoc: 'Résonances Productions',
  iban: 'FR76 1660 7000 5238 1217 5484 877',
  bic: 'CCBPFRPPPPG',
}

// Coordonnées spécifiques (reprises de l'ambassadeur)
export const gonileleContact = {
  phone: '06 10 73 31 52',
  phoneHref: '+33610733152',
  email: 'contact@lesagedavid.fr',
  address: '29 rue des Orteaux, 75020 Paris',
}
