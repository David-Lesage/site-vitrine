// ============================================================
// Configuration i18n
// FR = langue par défaut (à la racine). EN = /en. ES = /es (01/09/2026).
// DE = /de (06/11/2026, chantier 44).
// IT/PT : déclarées pour le sélecteur (affichées « bientôt »)
// tant que leur dictionnaire n'est pas fourni → ajouter le code à
// `activeLangs` + créer src/i18n/<lang>.ts pour les activer.
//
// L'espagnol a été activé pour Ismael Barredo, ambassadeur hispanophone, et
// les premiers comptes `es` de l'app. Son dictionnaire (`es.ts`) a été relu à
// la main le 04/11/2026 (chantier 44) : il n'est plus généré.
//
// L'allemand a été activé le 06/11/2026 (chantier 44) : son dictionnaire (`de.ts`) a été
// traduit depuis le français et relu (05-06/11/2026), avec la consigne de l'app (tutoiement
// `du`, `der Handpan`). Routes en miroir de l'espagnol, slugs français conservés.
// ============================================================

export type Lang = 'fr' | 'en' | 'es' | 'de'

export const defaultLang: Lang = 'fr'

// Langues réellement routées (avec dictionnaire complet)
export const activeLangs: Lang[] = ['fr', 'en', 'es', 'de']

// Toutes les langues visées par le projet (pour le sélecteur + roadmap)
export const allLanguages: { code: string; label: string; flag: string; active: boolean }[] = [
  { code: 'fr', label: 'Français', flag: '🇫🇷', active: true },
  { code: 'en', label: 'English', flag: '🇬🇧', active: true },
  { code: 'es', label: 'Español', flag: '🇪🇸', active: true },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', active: true },
  { code: 'it', label: 'Italiano', flag: '🇮🇹', active: false },
  { code: 'pt', label: 'Português', flag: '🇵🇹', active: false },
]

export const ogLocale: Record<Lang, string> = {
  fr: 'fr_FR',
  en: 'en_US',
  es: 'es_ES',
  de: 'de_DE',
}

export const htmlLang: Record<Lang, string> = {
  fr: 'fr',
  en: 'en',
  es: 'es',
  de: 'de',
}
