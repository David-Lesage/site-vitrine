// ============================================================
// Accès public à l'application Handpan Studio — source unique.
//
// L'interrupteur « officiel » vit désormais dans Supabase :
//   table `public.app_public_config`, ligne `key = 'app_public_access'`,
//   colonne `value` (booléen JSON). Elle est lisible en anonyme (policy
//   SELECT pour `anon`) et pilotée par le back-office de l'application.
//   => UN SEUL interrupteur pour l'app ET le site.
//
// Le site étant généré statiquement, la lecture se fait CÔTÉ CLIENT au
// chargement (voir `src/components/AppAccessSync.astro`). Le rendu HTML par
// défaut utilise `site.appPublicAccess` (false = fermé) : c'est le REPLI.
// Si la lecture échoue (réseau, CORS, table absente), on garde ce repli —
// donc jamais d'ouverture accidentelle.
// ============================================================
import { site } from '@/data/site'

/** URL PostgREST publique + clé *publishable* (déjà utilisée par `api/subscribe.js`). */
export const APP_CONFIG_ENDPOINT =
  'https://zqcuhnjjrgmybftppkcl.supabase.co/rest/v1/app_public_config?select=value&key=eq.app_public_access'
export const APP_CONFIG_KEY = 'sb_publishable_turahpl0xi-qKN6jmG3yBg_tqpVZbtx'

/** État connu au build (repli). */
export const appOpenAtBuild = site.appPublicAccess

/**
 * Attributs d'un bouton « accès à l'application ».
 * Le HTML est rendu dans l'état du build ; le script de synchro peut basculer
 * l'élément dans l'autre état grâce aux `data-*-href` / `data-*-label`.
 */
export function appCta(openLabel: string, closedLabel: string, closedHref = '#acces') {
  const open = appOpenAtBuild
  return {
    label: open ? openLabel : closedLabel,
    attrs: {
      href: open ? site.appUrl : closedHref,
      external: open,
      'data-app-cta': '',
      'data-open-href': site.appUrl,
      'data-open-label': openLabel,
      'data-closed-href': closedHref,
      'data-closed-label': closedLabel,
    },
  }
}
