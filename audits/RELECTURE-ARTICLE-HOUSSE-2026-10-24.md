# Relecture — article « Housse de calebasse Now Groove » (commit bcc5c94)

**VERDICT : publiable APRÈS CORRECTIONS** (rien de faux, mais le cœur de l'article (pourquoi David a conçu la housse) est vide, et l'article est en `draft: false`).

Relecteur distinct, 24/10/2026. Lecture des sources, sans build ni rendu réel : les points 3 et 5 de la grille (rendu) restent à contrôler sur la page générée.

## Faits vérifiés (conformes)
| Affirmation | Source |
|---|---|
| Calebasse depuis 2012 | dict.ts:2933 / en.ts:2344 |
| Caisse claire + charley → œufs en plastique (verbatim) | dict.ts:2934 |
| Now Groove 2021, appels-réponses, émoticônes | en.ts:2346 (+ équivalent FR) |
| Tapis intégré, sangles détachables, poche (œufs, accessoires, méthode), velours, faite main, série ultra limitée | dict.ts:864 |
| 99 € | shop.ts:91 (`priceLabel`) |
| Liens HelloAsso housse et kit | shop.ts:91 / shop.ts:89 |
| Rubrique « Mes créations » / "My creations" | dict.ts:837 / en.ts:719 |
| Liens /cours/, /boutique/, /en/cours/, /en/boutique/ | pages existantes |
| Affiliation : aucune (création propre, vendue par l'association), cohérent avec la mémoire « structure juridique » | — |
| Promesse médicale : aucune | — |

## Images (chacune regardée)
- prod-calebasse.jpeg : calebasse à l'envers sur tapis gris, 2 œufs bleus, logo gravé. Légende conforme.
- prod-housse-1.jpg : sac rond marron, médaillon « Now Groove by David Lesage », bretelles. Conforme.
- prod-housse-2.jpg : dos, disque cognac, 2 bretelles, sangle de poitrine à boucle. Conforme. Les dimensions 720×733 sont justes.
- prod-housse-3.jpg : main sur la poignée, fermeture éclair sur la tranche, bretelle à mousqueton. Conforme. 720×1100 juste.
- prod-housse-4.jpg : velours cognac, galon brun. Conforme.
- Les figures dos/tranche sont côte à côte (règle absolue §5). Aucun texte incrusté sauf le logo du produit, qui fait partie de l'objet.

## Problèmes à corriger

1. **BLOQUANT POUR LE FOND : le storytelling manque.** David a demandé un article qui raconte qu'il a conçu la housse, et le paragraphe « pourquoi » n'est qu'un commentaire (FR l.29, EN l.29). Correction : obtenir les mots de David, puis remplacer le commentaire. En attendant, passer `draft: true` (FR l.10, EN l.10) pour qu'une version sans histoire ne parte pas en ligne avec le prochain déploiement.
2. **« Prévente » contre « vendue ».** Le slug HelloAsso dit `pres-vente` et le commentaire de shop.ts:90 dit « pré-vente », mais le texte dit « vendue 99 € » (FR l.67, EN l.67). Or David a écrit « j'en ai plein à vendre » : il s'agit donc probablement d'une vente avec stock. Correction : le faire confirmer par David. Si c'est confirmé, garder « vendue » et corriger le commentaire de shop.ts:90.
3. **« Série ultra limitée » contre « j'en ai plein ».** La formule vient bien de la fiche (dict.ts:864), mais elle risque de contredire le stock réel. Faire confirmer par David : si le stock est large, préférer « édition faite main, en petite série ».
4. **Infobulle manquante (grille, point 8).** « charley » (FR l.21) est un terme technique pour un débutant. Correction : `<abbr title="cymbale double actionnée au pied, qui marque le tempo dans une batterie">charley</abbr>`. En EN l.21, faire de même sur "hi-hat".
5. **Livraison 22 € et pack 347 € absents du dépôt** : le rédacteur a eu raison de ne pas les écrire. À ajouter seulement après confirmation de David (question 5 du rédacteur).
6. **Mineur, FR l.15** : « posé sur son tapis » se rapporte à « instrument » ; c'est correct, rien à changer. **FR l.33** : « pensé et dessiné moi-même » ne sera justifié que par le paragraphe du point 1.

## Grille charte
| Point | État |
|---|---|
| 1 (côte à côte) | conforme |
| 2 (changement visible) | sans objet |
| 3 (recadrage) | conforme sur les sources, rendu non vérifié |
| 4 (l'image dit vrai) | conforme |
| 5 (palette, écran) | sans objet |
| 5b (pas de texte incrusté) | conforme |
| 6 (légendes) | conforme |
| 7 (paire) | sans objet |
| 8 (infobulles) | **non conforme** (charley) |
| 9 (vocabulaire) | conforme |
| 10 (pas d'excuse) | conforme |
| 11 (affirmations prouvées) | conforme |
| 12 (liens cliquables) | conforme |
