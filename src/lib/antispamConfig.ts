// Interrupteur de l'anti-démarchage (03/11/2026).
//
// EXERCICE_OBLIGATOIRE = false : le « petit exercice » est AFFICHÉ, sa réussite est
// transmise et vérifiée par le serveur, mais il ne BLOQUE PAS l'envoi. C'est l'état
// tant que l'Edge Function `site-lead` (branche `antispam-site-lead`) n'est pas
// déployée : sans elle, un envoi jugé « robot » ne pourrait pas être enregistré
// sans e-mail, et aucune vraie demande ne doit être perdue.
//
// Le jour du déploiement de site-lead (feu vert de David), passer À LA FOIS :
//   · EXERCICE_OBLIGATOIRE = true ici (le bouton Envoyer attend la réussite) ;
//   · SITE_LEAD_SAIT_TRIER = true dans api/subscribe.js (le relais transmet les
//     envois « certains » au lieu de les écarter, et un exercice non réussi
//     devient « certain »).
// 03/11/2026 : site-lead v54 déployée (feu vert de David) → exercice BLOQUANT.
export const EXERCICE_OBLIGATOIRE = true

/** Ce que le « petit exercice » (ExerciceHumain.astro) a déposé dans le formulaire. */
export function lireDefi(data: FormData): { id: string; notes: string[]; secours: number | null } | undefined {
  const id = String(data.get('defiId') || '')
  if (!id) return undefined
  const notes = String(data.get('defiNotes') || '').split(',').filter(Boolean)
  const s = String(data.get('defiSecours') || '')
  return { id, notes, secours: s ? Number(s) : null }
}
