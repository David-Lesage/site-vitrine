# Relecture — article « pied-handpan-atlas-pro-ou-all » (FR + EN) — 24/10/2026

**VERDICT : PUBLIABLE APRÈS CORRECTIONS** (rien de bloquant ; 4 corrections de texte + vérification du rendu à faire).

Relecteur distinct, sur les sources (commit 6a2e7fb). Rendu réel NON vu (pas de build demandé) : les lignes de la grille qui portent sur le rendu restent à cocher par la session principale.

## Vérifié conforme
- Prix 250 / 270 €, avec code 225 / 243 €, relevé du 20/10/2026, port ≈ 12 € Europe : `src/data/atlas.ts` (atlasPrices, atlasWithCode, atlasShipping, ATLAS_PRICES_READ_AT).
- Hauteurs 51–109 / 50–96 cm, 1,8 kg pour le Pro, 8 aimants protégés, compatibilité nitruré / inox / Ember Steel : `atlas.ts`.
- Body inclus avec le All, non inclus avec le Pro ; sac inclus seulement avec le Pro : `atlas.ts` (ATLAS_BODY_STATUS, l. 461-463).
- Positions : le Pro « assis, debout », la gamme bois trois positions : `dict.ts:1456`.
- Code −10 % sur tous les produits, Body compris ; affiliation dite (« je touche une commission »), aucun montant : conforme à `atlas.ts:101`.
- Les deux modèles sont au showroom : `dict.ts:869`.
- Citations de David, mot pour mot : `dict.ts:1539`, `1542`, `1663`, `1675`, `1682`.
- Aucune promesse médicale. La phrase « posture la plus équilibrante pour le corps » (dict) n'a pas été reprise : c'est bien.
- Liens : `/pieds-atlas/`, `/en/handpan-stands/` (le fichier `src/pages/en/handpan-stands.astro` existe), `/showroom/`, `/boutique/`, article setup nomade (le permalien existe en FR et en EN).
- Images, chacune regardée : l'Atlas Pro déployé et replié (légende juste), l'Atlas All debout avec ses rallonges (juste), le Body tenu entre les genoux (juste). Photo de scène : la mention « pieds d'avant Atlas » est honnête, les supports visibles sont en bois et en X.

## Problèmes et corrections

1. **FR l.23 / EN l.23 — un fait est inventé, et il est présenté comme les mots de David.** « Sur scène, j'ai deux handpans… » : le chiffre ne figure dans aucune source. `dict.ts:1539` dit seulement « une pédale de kick électronique au pied et plusieurs instruments autour de moi », et la photo montre **trois** handpans.
   Correction FR : « Sur scène, j'ai plusieurs handpans, une pédale de kick électronique au pied et d'autres instruments autour de moi. Tout est debout, tout est à portée de main. »
   Correction EN : « On stage I have several handpans, an electronic kick pedal under my foot and other instruments around me. Everything stands, everything is within reach. »

2. **FR l.87 / EN l.87 — la citation est tronquée, et son sens glisse.** La phrase de David (`dict.ts:1682`) : « Du coup on ne peut pas utiliser la tête seule pour jouer assis, alors que la version bois oui, mais plus longue à monter, plus volumineuse à transporter et moins réglable. » L'article en fait « on peut utiliser la tête seule… » suivi d'un fragment entre guillemets.
   Correction : citer la phrase entière en bloc de citation, juste après la citation du 6 septembre de la l.77. On peut aussi la fusionner dans cette citation, puisqu'elle en est la suite directe.

3. **FR l.77 + l.57 — question 1 du rédacteur.** La citation de David (« pas proposée, ni en option ni avec ») contredit le site lui-même : `dict.ts:1820` et `1856`, ainsi que `atlas.ts:410-417`, disent que le Body se vend seul (165 €, 148,50 € avec le code) et qu'il se monte sur un Pro (Marco Agri). Sans précision, le lecteur croit que le Pro ne peut pas du tout jouer sur les genoux.
   Correction : garder la citation telle quelle et ajouter après elle une phrase factuelle, sans contredire David : « Précision : Marco Agri, le créateur d'Atlas, me l'a confirmé : la tête Atlas Body n'est pas fournie avec le Pro, mais elle se vend seule (165 €) et toutes les pièces sont compatibles entre elles. » Dans le tableau l.57, mettre « non incluse (vendue à part, 165 €) ». **C'est à David de valider la formulation**, puisque c'est sa citation qui est nuancée.

4. **EN l.3 — coquille dans la description** : « Heights, playing positions, public, prices ». Correction : « Heights, playing positions, public prices and my DAVID-ATLAS partner code (10% off). » Recompter ensuite les caractères (160 au maximum).

5. **FR l.64-67 / EN — grille côte à côte (question 3 du rédacteur) : à vérifier au rendu.** La règle de la charte (côte à côte, toujours) est respectée. Mais `grid-template-columns:1fr 1fr` en style inline, sans aucun point de rupture, donne deux images d'environ 160 px sur téléphone, avec des légendes longues et serrées. Il faut aussi vérifier que le style `.prose figure` ne remet pas de marge. Correction possible : raccourcir les légendes, par exemple « **Atlas Pro** — déployé et replié » et « **Atlas All** — version bois, debout », et déplacer la phrase « Remarque l'écart… » dans le texte sous la grille.

6. **Grille charte, point 8 — pas d'infobulle.** Aucun terme de théorie musicale ici, donc rien d'obligatoire. Facultatif : un `<abbr>` sur « acier nitruré » et « Ember Steel ».

## Ouvert pour David (question 2 du rédacteur)
Son ressenti en jeu (stabilité, montage au quotidien) : à écrire par lui. Ne pas le rédiger à sa place.

## Grille (texte)
8 conforme (avec le point 6 en option) · 9 conforme · 10 conforme · 11 sans objet (pas d'affirmation sur l'app) · 12 conforme. Figures : 1, 3, 4, 5b et 6 conformes sur les sources ; rendu à vérifier (point 5).
