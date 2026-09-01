// ============================================================
// Configuration i18n
// FR = langue par défaut (à la racine). EN = /en. ES = /es (01/09/2026).
// DE/IT/PT : déclarées pour le sélecteur (affichées « bientôt »)
// tant que leur dictionnaire n'est pas fourni → ajouter le code à
// `activeLangs` + créer src/i18n/<lang>.ts pour les activer.
//
// L'espagnol a été activé pour Ismael Barredo, ambassadeur hispanophone, et
// les premiers comptes `es` de l'app. Son dictionnaire (`es.ts`) est GÉNÉRÉ
// depuis le français par `scripts/traduire-i18n-es.mjs` — cf. l'en-tête du
// fichier avant d'y toucher.
// ============================================================

export type Lang = 'fr' | 'en' | 'es'

export const defaultLang: Lang = 'fr'

// Langues réellement routées (avec dictionnaire complet)
export const activeLangs: Lang[] = ['fr', 'en', 'es']

// Toutes les langues visées par le projet (pour le sélecteur + roadmap)
export const allLanguages: { code: string; label: string; flag: string; active: boolean }[] = [
  { code: 'fr', label: 'Français', flag: '🇫🇷', active: true },
  { code: 'en', label: 'English', flag: '🇬🇧', active: true },
  { code: 'es', label: 'Español', flag: '🇪🇸', active: true },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', active: false },
  { code: 'it', label: 'Italiano', flag: '🇮🇹', active: false },
  { code: 'pt', label: 'Português', flag: '🇵🇹', active: false },
]

export const ogLocale: Record<Lang, string> = {
  fr: 'fr_FR',
  en: 'en_US',
  es: 'es_ES',
}

export const htmlLang: Record<Lang, string> = {
  fr: 'fr',
  en: 'en',
  es: 'es',
}
