# Relecture — article Forbrain (commit 82b5f81) — 24/10/2026

**VERDICT : APRÈS CORRECTIONS** (1 point bloquant tant que David n'a pas répondu : la commission)

Relecture faite sur la source et pas sur le rendu réel (aucun build demandé). Les lignes 3, 5 et 5b de la grille restent à revérifier sur la page rendue.

## Problèmes

1. **BLOQUANT — commission affirmée sans source.** `src/data/shop.ts:110` dit en toutes lettres « Rien sur la commission ». Ni le dictionnaire ni la fiche ne la mentionnent.
   - FR l.53 / EN l.53 : « je touche une commission, sans surcoût pour toi ». Personne n'a confirmé ce fait.
   - Correction tant que David n'a pas confirmé : « Mon lien est un **lien d'affiliation** : il ne te coûte rien de plus, et il t'ouvre la remise. » (EN : "My link is an **affiliate link**: it costs you nothing extra and unlocks the discount.")
   - Si David confirme la commission, garder la phrase actuelle et retirer « Rien sur la commission » de shop.ts:110.
2. **Prix 269 €** : conforme à shop.ts:107-112 (relevé du 20/10, offre « du moment »). À reconfirmer avant le déploiement, puisque c'est une offre limitée.
3. **Légende de l'image (FR l.21 / EN l.21)** : l'image est un packshot sans tête. On n'y voit donc pas les pastilles se poser « devant les oreilles ». La partie « remarque… devant les oreilles, pas dedans » demande au lecteur de voir quelque chose que l'image ne montre pas (grille 4 et 6).
   - Correction FR : « *Le Forbrain : un arceau qui passe derrière la nuque, deux pastilles de conduction osseuse (elles se posent devant les oreilles, pas dedans) et un micro sur tige.* »
   - Le texte alternatif est conforme (arceau, pastilles bleues, micro qui part du boîtier gauche).
4. **Langue (charte §6)** : le jumeau EN devait passer par la session Traduction. Il est acceptable, mais il faut le signaler à cette session pour relecture. La citation EN "the experience is striking" reprend exactement en.ts:756.
5. **Mineur — description (l.3)** : « Testé par moi » est conforme au dictionnaire (« Je l'ai testé »).

## Vérifications conformes
- **Citation « l'expérience est bluffante »** : identique à dict.ts:878.
- **Faits techniques** (conduction osseuse, filtre dynamique aigus/graves, autonome sans écran ni application, outil d'entraînement, voix/diction/justesse/attention) : tous présents dans dict.ts:878 et en.ts:756.
- **Aucune promesse médicale** : la phrase « Je n'en attends rien de médical » reprend la fiche (conforme à shop.ts:111).
- **Lien et code** : URL identique à shop.ts:112. Code 3A9907007 et −10 % automatique conformes.
- **Liens internes** : les articles cibles existent (transposer-pour-chanter-handpan, jouer-et-chanter-au-casque-neotone, quel-casque-choisir-neotone, FR et EN). Les pages /blog/[slug], /en/blog/[slug], /boutique et /en/boutique existent.
- **« / » final** : conforme à `trailingSlash: 'always'` dans astro.config (le plugin rehypeTrailingSlash l'ajoute de toute façon).
- **Catégorie** : le produit est bien dans la rubrique `micros` (shop.ts:112), comme dit l.57.
- **Commentaire PHOTO À VENIR** : retiré au rendu (rehypeStripHtmlComments).

## Grille (sur la source)
| # | Point | Résultat |
|---|---|---|
| 1, 2, 7 | Comparaison | sans objet (packshot unique, sujet sans lien avec l'instrument) |
| 3 | Recadrage | conforme |
| 4 | L'image dit vrai | conforme |
| 5 | Palette, écran centré, textures | sans objet |
| 5b | Texte incrusté | seulement le logo de la marque : conforme |
| 6 | Légende | NON CONFORME (point 3) |
| 8 | Paragraphes, infobulles | conforme (infobulle sur « conduction osseuse ») |
| 9 | Vocabulaire du §3 | conforme |
| 10 | Aucune justification ni excuse | conforme |
| 11 | Affirmations sur l'app | sans objet. Affirmation commerciale non sourcée : NON CONFORME (point 1) |
| 12 | Renvois cliquables | conforme |
