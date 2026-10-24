# Relecture : article micro Muling (commit c8856dd), 24/10/2026

**Verdict : APRÈS CORRECTIONS** (1 point à trancher par David, rien de bloquant sur le reste)

Fichiers relus :
- `src/content/blog/micro-handpan-acoustique-muling.md` (FR)
- `src/content/blog/micro-handpan-acoustique-muling-en.md` (EN)

Sources vérifiées : `src/data/muling.ts`, `src/i18n/dict.ts` (section `muling`, l. 1159-1340), `src/components/MulingOrderForm.astro`.

## Problèmes

### 1. Le calcul du prix est faux tel qu'il est écrit (À TRANCHER PAR DAVID)
- FR l. 86 : « tu as **5 % de réduction**, soit **246,50 €** »
- EN l. 86 : « gives you **5% off**, i.e. **€246.50** »
- 258 × 0,95 = **245,10 €**, pas 246,50 €. `src/data/muling.ts` le signale déjà : 246,50 € est une valeur fournie telle quelle par David, pas un calcul. La page `/micro-muling/` affiche aussi « 258 € − 5 % = 246,50 € » (`mulingOrderPriceLine`), et un lecteur peut refaire le calcul.
- Correction : David choisit le bon prix.
  - Si c'est 246,50 € : retirer le lien « soit », par exemple « le code **David-Lesage-5** te fait passer à **246,50 €** » (EN : « the code **David-Lesage-5** brings it down to **€246.50** »).
  - Si c'est bien 5 % : écrire 245,10 € et corriger `mulingDiscountedPriceEur` dans `src/data/muling.ts`.

### 2. Transparence sur l'affiliation
- La commission Muling n'apparaît nulle part dans le dépôt, à la différence de Yishama (dict.ts l. 694). L'article ne dit rien de faux. En revanche, la phrase « c'est ce qui m'a convaincu de le **représenter** » (FR l. 18) laisse penser à un partenariat commercial.
- Correction : si David touche une commission, ajouter avant « Prix et commande » : « Transparence : je touche une commission sur les ventes Muling passées par moi. Ça ne change rien à ton prix. » S'il n'en touche pas, rien à ajouter.

### 3. Phrase non sourcée (mineur)
- FR l. 18 : « c'est ce qui m'a convaincu de le représenter ». La source (dict.ts `heroLead`) dit seulement « Je l'ai testé en profondeur ». La suite de la phrase prête à David des mots qu'il n'a pas écrits.
- Correction : « Je l'ai testé en profondeur. Voici comment il fonctionne et comment l'installer. » Même correction dans l'EN.

### 4. Incohérence ailleurs sur le site (hors article, à signaler)
- dict.ts l. 868 (fiche boutique `micro-muling`) : « Contractualisation en cours avec le fabricant : écris-moi pour être tenu au courant. » Or l'article et la page dédiée proposent déjà la commande. L'article renvoie vers la boutique, donc le lecteur tombe sur cette contradiction.
- Correction : retirer cette parenthèse (dict.ts et en.ts), à confirmer avec David.

### 5. Légende de la photo du contenu de la boîte (mineur)
- FR l. 43 : « les deux capsules au bout de leurs câbles ». Sur `muling-boite-complet.webp`, on ne distingue qu'une seule capsule rouge, en partie cachée sous les câbles.
- Correction : « Tout le set d'un coup d'œil : le manuel à gauche, le préampli et ses câbles au centre, les pochettes et l'étui rigide à droite. »

### 6. Polarité de l'adaptateur secteur
- L'article reprend le texte de la page : polarité centrale négative. Le manuel visible sur la photo du contenu de la boîte indique « Adapter: Center Negative DC ». Le texte est donc juste, c'est le schéma `muling-schema-fr.webp` qui serait faux. L'article n'utilise pas ce schéma, donc il n'est pas concerné. À corriger sur le schéma de la page.

## Grille de la charte

| Point | Résultat |
|---|---|
| 1-2, 7 Comparaisons | Sans objet (aucune comparaison) |
| 3 Recadrage | Conforme |
| 4 L'image dit vrai | Conforme, sauf la légende du point 5 |
| 5b Texte incrusté | Conforme (seulement le marquage d'usine du préampli) |
| 6 La légende dit quoi remarquer | Conforme |
| 8 Une idée par paragraphe, gras sobre | Conforme. Infobulle `<abbr>` absente sur « harmoniques », « Larsen » et « condensateur » : Larsen est expliqué dans le texte, harmoniques ne l'est pas (à ajouter) |
| 9 Vocabulaire | Conforme |
| 10 Ni justification ni excuse | Conforme |
| 11 Affirmations prouvées | Non conforme : points 1 et 3 |
| 12 Liens cliquables | Conforme (`/neotone/`, `/showroom/`, `/micro-muling/`, `/boutique/`, article Bose. Le permalink EN existe) |
| Promesse médicale | Aucune |
| Encadré acoustique en ouverture (§2) | Conforme |

Les faits techniques (20 h, pile 6F22, 9 V 300 mA, prise 5,5 × 2,1 mm, SHAPE, CH1/CH2, contenu de la boîte, un set pour deux handpans, virement SEPA, livraison ou showroom « même prix, même virement ») sont tous conformes aux sources. L'EN est fidèle au FR.
