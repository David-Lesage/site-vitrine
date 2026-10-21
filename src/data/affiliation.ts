// ⚙️ INTERRUPTEUR — capture du lien d'affiliation de l'application (21/10/2026)
//
// Spec figée par la session « Moteur d'affiliation », validée par David le 21/10/2026.
// Lien officiel donné aux affiliés : https://www.lesagedavid.fr/handpan-app/?ref=K7M3QX
//
// Trois positions, et UNE seule ligne à changer (AFFILIATION_MODE ci-dessous) :
//
//   'off'        → VALEUR LIVRÉE. Le script n'est même pas chargé : aucune lecture,
//                  aucune écriture, aucun écouteur. Le site se comporte comme avant.
//   'immediate'  → capture du ?ref dès l'arrivée sur n'importe quelle page.
//   'consent'    → capture seulement après un consentement explicite. ⚠️ Le site
//                  n'a AUCUNE bannière de consentement aujourd'hui (il n'en a pas
//                  besoin : aucun cookie, aucun traceur — voir la section
//                  « Cookies et mesure d'audience » de la politique de
//                  confidentialité et des CGU). En 'consent', rien ne se passe
//                  tant qu'une future bannière n'a pas donné le signal :
//                    window.hcsConsent = true            (si elle s'exécute avant)
//                    window.dispatchEvent(new Event('hcs:consent'))  (sinon)
//
// Avant de passer en 'immediate' ou 'consent' : mettre à jour la politique de
// confidentialité ET les CGU (bloc « Cookies et mesure d'audience »), qui affirment
// aujourd'hui que seule la langue choisie est retenue localement.
//
// Logique pure (testée par scripts/test-affiliation.mjs) : src/scripts/affiliation-core.mjs
// Branchement navigateur : src/scripts/affiliation.ts, chargé par
// src/components/AffiliationCapture.astro, lui-même rendu par src/layouts/Layout.astro
// UNIQUEMENT quand ce mode n'est pas 'off'.

export type AffiliationMode = 'off' | 'immediate' | 'consent'

export const AFFILIATION_MODE: AffiliationMode = 'off'
