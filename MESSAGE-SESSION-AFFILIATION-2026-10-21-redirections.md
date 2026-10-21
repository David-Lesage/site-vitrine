# Message pour la session « Moteur d'affiliation Handpan » — 21/10/2026

> Déposé par la session SITE (dépôt `~/CLAUDE/site-vitrine`). Envoi direct bloqué (limite de messages entre sessions).

Redirections du site, testées en prod le 21/10 avec `?ref=…` : **toutes conservent la chaîne de requête**.

## Redirections à destination fixe (`vercel.json`, toutes en 301)

| Depuis | Vers | Test |
|---|---|---|
| (www.)neotonestudio.app, neotone-studio.app, playneotone.app, tout chemin | https://www.lesagedavid.fr/neotone/ | `/?ref=TEST3` → `/neotone/?ref=TEST3` |
| (www.)handpanstudio.app, handpan-studio.app | https://www.lesagedavid.fr/handpan-app/ | `?ref` conservé |
| (www.)playhandpan.app, playhandpanstudio.app | https://play.handpanstudio.app/ | `?ref` conservé (l'app le reçoit directement) |
| /le-neotone(/), /en/…, /es/… | /neotone/ (même langue) | `?ref=TEST1` conservé |
| /handpan-studio(/), /handpan-compagnon(/), /en/… | /handpan-app/ (même langue) | `?ref` conservé |
| /en/pieds-atlas(/) | /en/handpan-stands/ | — |

## Redirections génériques
- apex `lesagedavid.fr` → `www.lesagedavid.fr`, même chemin ;
- toute page sans « / » final → avec « / ».
Elles conservent `?ref` (testé : `lesagedavid.fr/cours?ref=X` → `www…/cours/?ref=X`).

## Point d'attention
Les domaines .app sans « www » passent d'abord par un 308 de domaine Vercel (vers `www.`), puis par le 301. La requête survit aux deux.

## Capture `?ref` côté site : construite, INERTE (interrupteur sur 'off')
- Commit `e50b5ef` (main, poussé ; déployé avec l'interrupteur sur 'off' : aucune page ne charge le script, 0 « hcs_ref » en prod).
- Interrupteur : `src/data/affiliation.ts` → `export const AFFILIATION_MODE = 'off' | 'immediate' | 'consent'`.
- Logique pure : `src/scripts/affiliation-core.mjs` ; navigateur : `src/scripts/affiliation.ts` ; chargement : `src/components/AffiliationCapture.astro` (via `Layout.astro`, seulement hors 'off').
- Tests : `node scripts/test-affiliation.mjs` → 36/36. Navigateur (build local en 'immediate') : stockage `hcs_ref`, nettoyage de l'URL, décoration des liens play.* au clic et au clavier, premier code gagnant, code expiré remplacé : OK.
- ⚠️ **Lettre L** : la spec dit « sans 0 O 1 I L », mais la regex figée `^[A-HJ-NP-Z2-9]{6}$` ACCEPTE L (la plage J-N le contient). Le site suit la regex. Si l'app exclut L, il faut changer `REF_RE` des deux côtés.
- ⚠️ **Redirection de langue** : elle perdait `?ref` (FR → /en/…). Corrigé dans `Layout.astro`, mais seulement hors 'off'.
- **Consentement** : le site n'a AUCUNE bannière (il déclare n'avoir ni cookie ni traceur). En mode 'consent', le script attend `window.hcsConsent = true` ou l'événement `hcs:consent`.
- Textes devenus faux à l'activation (« la seule chose que ton navigateur retient localement, c'est la langue ») : politique de confidentialité, `dict.ts` l. ~3422 / `en.ts` ~2723 / `es.ts` ~2450 ; CGU, `dict.ts` ~3225 / `en.ts` ~2577 / `es.ts` ~2303. À modifier après l'avis juridique, AVANT l'activation.
