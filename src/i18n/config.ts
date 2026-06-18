// ============================================================
// Configuration i18n
// FR = langue par défaut (à la racine). EN = /en.
// DE/ES/IT/PT : déclarées pour le sélecteur (affichées « bientôt »)
// tant que leur dictionnaire n'est pas fourni → ajouter le code à
// `activeLangs` + créer src/i18n/<lang>.ts pour les activer.
// ============================================================

export type Lang = 'fr' | 'en'

export const defaultLang: Lang = 'fr'

// Langues réellement routées (avec dictionnaire complet)
export const activeLangs: Lang[] = ['fr', 'en']

// Toutes les langues visées par le projet (pour le sélecteur + roadmap)
export const allLanguages: { code: string; label: string; flag: string; active: boolean }[] = [
  { code: 'fr', label: 'Français', flag: '🇫🇷', active: true },
  { code: 'en', label: 'English', flag: '🇬🇧', active: true },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', active: false },
  { code: 'es', label: 'Español', flag: '🇪🇸', active: false },
  { code: 'it', label: 'Italiano', flag: '🇮🇹', active: false },
  { code: 'pt', label: 'Português', flag: '🇵🇹', active: false },
]

export const ogLocale: Record<Lang, string> = {
  fr: 'fr_FR',
  en: 'en_US',
}

export const htmlLang: Record<Lang, string> = {
  fr: 'fr',
  en: 'en',
}
