# Relecture du blog, lot 3 — 24/10/2026

> Relecteur distinct (agent neuf, qui n'a écrit ni les articles ni les captures). Périmètre : commits `3b17380` + `d414644`, audit `audits/CAPTURES-BLOG-LOT3-2026-10-24.md`, grille de `specs/CHARTE-ARTICLES.md`. FR et EN.
> Aucun fichier du site n'a été modifié. Rien n'est commité.

## Verdict

**Presque prêt : 1 bloquant, 6 points à corriger, quelques suggestions.**

- Le **bloquant** concerne `les-trois-mineurs-handpan` : les notes qui changent ne sont pas signalées dans les images (point 2 de la grille), et sur le mélodique, le B2 que la légende annonce est caché par le tracé de l'accord.
- Le reste est juste, et la voix de David est respectée : noms des degrés (I Équilibre / Balance, V Tension, VII Mystère / Mystery, IV Détente / Ease), notes, accords des trois mineurs, octave 3 de l'Ode, couleurs (la indigo, comme l'app).
- **Côte à côte à toutes les largeurs : conforme.** À 390 px, les trois mineurs sont bien côte à côte (deux images de 175 px). Les étiquettes HTML se lisent (13,6 px, sans coupure) et les noms des notes du pan aussi (C4 → C#4). Le texte des cartes ne se lit pas, mais la lightbox le donne. Aucun débordement : `scrollWidth` = largeur de la fenêtre, sur les 7 articles, en FR et en EN, à 390 et à 1280 px.
- **Rendu : conforme.** `npx astro build` génère 134 pages. Sur le serveur `dist` (port 4383, arrêté depuis), toutes les images du lot se chargent, couvertures comprises. Le seul `img` « vide » détecté est `img.lightbox-img`, normal. Captures : `/private/tmp/claude-501/-Users-davidlesage-CLAUDE/d7f07e1f-7686-41e9-a369-7f4bc8e9d723/scratchpad/relecture-lot3/` (fr/en × 390/1280 × article).

---

## Bloquant

### B1. Trois mineurs : le changement ne se voit pas sans chercher, et B2 est illisible dans le mélodique
- **Fichiers** : `public/images/app-trois-mineurs-naturel/harmonique/trio-composite-2026-10-24(-en).webp`, appelées dans `src/content/blog/les-trois-mineurs-handpan(-en).md`, l. 36-58 et 69-81.
- **Constat** : aucun anneau cuivre (`#C77B3A`) ni encadré sur C4 → C#4 et C3 → C#3 (paire), ni sur Bb3 → B3 et Bb2 → B2 (trio). La charte l'exige (§5 « Quand un nom change, le montrer », grille n°2). Sur le panneau mélodique du trio, la note B2 est cachée sous le trait rouge A3–F3–D2 : on ne lit pas « B2 », alors que la légende (l. 80) le met en gras.
- **Correction** : régénérer les deux moitiés et le trio avec un anneau cuivre sur les pads qui changent. C'est un dessin, pas du texte incrusté, donc c'est permis. Dans le trio, les anneaux vont sur C#4 / C#3 (harmonique) et sur C#4 / C#3 / B3 / B2 (mélodique). Pour que B2 se lise, deux possibilités : allumer l'œil sur un accord qui ne passe pas dessus, ou décaler le recadrage. À demander à la session app (banc `audits/2026-10-24-captures-blog-lot3/`). Garder le même cadrage au pixel.

---

## À corriger

### A1. Les `alt` décrivent des défauts d'affichage de l'app
Un `alt` décrit le contenu utile au lecteur. Le défaut, lui, se signale à la session app (c'est déjà fait dans l'INDEX).
- `ta-partition-prend-vie.md` **l. 33**, remplacer :
  « …; en fin de ligne, F et C sont collés et leurs étiquettes se chevauchent. »
  par : « …; en fin de ligne, F · Détente puis C · Équilibre, enchaînés sur le dernier mot. »
- `ta-partition-prend-vie-en.md` **l. 33**, remplacer :
  « …; at the end of the line, F and C sit side by side and their labels overlap. »
  par : « …; at the end of the line, F · Ease then C · Balance, back to back on the last word. »
- `ta-partition-prend-vie.md` **l. 115**, supprimer :
  « ; sous certains mots, le cadre de couleur de l'accord est décalé d'une demi-ligne vers le bas »
  et mettre à la place : « ; le mot sur lequel tombe chaque accord est encadré de sa couleur ».
- `ta-partition-prend-vie-en.md` **l. 115**, supprimer :
  « ; under some words, the chord's coloured frame sits half a line too low »
  et mettre à la place : « ; the word each chord falls on is framed in its colour ».

### A2. Pupitre tablette : la capture montre le défaut, à l'œil nu (décision de David)
- `public/images/app-pupitre-let-it-be-do-majeur-tablette-2026-10-24(-en).webp`, appelée l. 112-120 (FR et EN).
- **Constat** : sous « When », « times », « Mother » et « comes », les cadres colorés tombent sur le mot et donnent l'impression qu'il est **barré**. Les chapeaux dorés recouvrent aussi la moitié de chaque diagramme. C'est l'état réel de l'app, mais le lecteur y voit un affichage cassé. Le texte de l'article ne parle que de la barre de commandes.
- **Correction** : au choix de David, (a) attendre le correctif de l'app (point 1 de l'INDEX app) et refaire la capture ; ou (b) en attendant, recadrer la capture tablette sur l'intro et la barre du bas, sans le couplet. On ne peut pas faire de recadrage continu : il faudrait deux plans ou un composite. Le plus simple reste (a). La capture ordinateur, juste au-dessus, ne pose pas ce problème.

### A3. Pupitre ordinateur : une affirmation que l'image ne prouve pas
- `ta-partition-prend-vie.md` **l. 106** : « Ouvert directement, il n'affiche pas de badges ×N : ceux-là se règlent dans l'éditeur. »
- `ta-partition-prend-vie-en.md` **l. 106** : « Opened directly, it shows no ×N badges: those are set in the editor. »
- **Constat** : la capture ne montre que l'**intro**, alors que les badges avaient été posés sur la 3ᵉ ligne du **couplet**. Ils n'apparaîtraient donc pas dans ce cadre de toute façon. Rien dans `pupitre.ts` ne confirme cette règle. La phrase sonne en plus comme une justification (charte §1).
- **Correction** : supprimer la phrase dans les deux langues. La légende s'arrête alors sur « …puis C, G, F, C. » / « …then C, G, F, C. »

### A4. Mélodique masqué sous 1024 px
- `les-trois-mineurs-handpan(-en).md` **l. 69** (`<figure class="figure-desktop-only">`) et `src/styles/global.css` **l. 947-950**.
- **Constat** : sur téléphone et tablette, le mélodique n'a aucune image, alors que le texte dit « 4 pads changent ». La charte (§5) recommande, sur petit écran, une composite réduite et agrandissable au clic plutôt que rien. À 640-1023 px, le trio tiendrait sans problème.
- **Correction** : retirer `figure-desktop-only` (le trio s'affiche alors partout, à 358 px de large sur téléphone, avec lightbox et la ligne « Clique sur l'image… »). À défaut, abaisser le seuil à `min-width: 640px`. Les `.trio-labels` restent lisibles : 3 × 114 px à 390 px pour « Mineur harmonique » à 13,6 px, à vérifier après le changement.

### A5. Émotions : la lecture « sa place dans la gamme » est propre à l'électronique, mais la figure ne le dit pas
- `handpan-emotions-degres.md` **l. 45** et `-en.md` **l. 45**.
- **Constat** : l'article est « commun » (l. 16 : « que ton handpan soit acoustique ou électronique »). Or la figure ajoutée montre un réglage que l'article ChromaKeys réserve au handpan électronique en mode Logique (« toujours sur un handpan acoustique… ce n'est plus la lecture par degrés »). Un lecteur acoustique cherchera ce réglage sans le trouver (charte §2, cas mixte).
- **Correction FR** : « Ici sur un Neotone Mutant ancré en do » → « Ici sur un handpan électronique, un Neotone Mutant ancré en do ». Ajouter en fin de légende : « Sur un acoustique, les cartes gardent la couleur du degré, mais les notes du pan gardent celle de leur nom. »
  **EN** : « Here on a Neotone Mutant anchored on C » → « Here on an electronic handpan, a Neotone Mutant anchored on C ». Ajouter : « On an acoustic, the cards keep the degree colour, but the notes on the pan keep the colour of their name. »

### A6. Éditeur de mélodies : l'`alt` dit « C2 à C4 » pour le petit pan
- `editeur-de-melodies-handpan.md` **l. 33** : « notes grises nommées de C2 à C4 » ; `-en.md` **l. 33** : « grey notes named C2 to C4 ».
- **Constat** : le petit pan de gauche porte aussi D4, E4, F4 et G4, comme la grille (C2 à G4).
- **Correction** : « notes grises nommées de C2 à G4 » / « grey notes named C2 to G4 ».

---

## Suggestions

- **S1. « Au même cadrage » pour la paire Créer › Une gamme** (`handpan-par-les-couleurs(-en).md` l. 47, `creer-sa-gamme-de-handpan(-en).md` l. 55). Les deux moitiés ont le même gabarit, mais pas le même cadrage : le pan de gauche est plus grand, les cartes de droite sont plus petites et plus basses, et le titre « Les 7 accords… » n'apparaît qu'à droite. Proposition : « Le même écran, *Créer › Une gamme*, côte à côte » / « The same screen, *Create › A scale*, side by side ». À 390 px, l'image ne fait que 118 px de haut : les notes se devinent, et la lightbox fait le reste.
- **S2. « pads » / « pastilles »** (`les-trois-mineurs-handpan.md` l. 80 : « quatre pads en tout »). Le texte dit « pastilles » partout ailleurs. « Pads » n'apparaît qu'entre guillemets, quand on cite l'app (« 2 pads changent »). Proposition : « quatre pastilles en tout ». EN, l. 80 : « four pads in all » → « four dots in all ».
- **S3. Accord au féminin** (`handpan-emotions-degres.md` l. 32, déjà là avant ce lot mais dans le paragraphe qu'introduit la nouvelle figure) : « quel que soit ta gamme » → « quelle que soit ta gamme ».
- **S4. CSS mort** : depuis `d414644`, `.article-img-pair--stack-sm` (`global.css` l. 939-945) n'est plus utilisé, et son commentaire décrit un empilement que David refuse. Le supprimer évitera qu'un agent le réutilise. L'audit `CAPTURES-BLOG-LOT3` (§5 et « Rendu ») décrit encore « l'une sous l'autre sous 640 px » : ajouter une ligne qui renvoie à `d414644`.
- **S5. Libellés EN dans ChromaKeys** : les nouvelles figures disent « Colour tells you: … » (comme l'app : « The colour tells you… »), les anciennes du même article « Colour says: … ». Harmoniser sur « Colour tells you: ».
- **S6. Si = magenta ou violet ?** La légende V (`les-deux-visions-chromakeys.md` l. 222) dit « B2 magenta, comme tous les si ». C'est cohérent avec le reste de l'article et avec l'image, mais l'app nomme cette couleur « violette » (`translations.ts`, `justesse.couleur.b`, `comprendre.visite.pan_a`). À trancher une fois pour tout le blog. Pas d'urgence.
- **S7. À signaler à la session app** : la carte IV s'appelle « RELAXATION » dans le tiroir des degrés (capture EN des mineurs), mais « Ease » sur les diagrammes et les cartes de Créer (`accord.emotion.iv`). Le blog cite fidèlement chaque écran ; l'incohérence est côté app.
- **S8. Recadrage** : en haut des paires ChromaKeys, « Les accords de… » / « My han… » est coupé net, comme en haut des moitiés des mineurs. Ce n'est pas gênant, mais rogner de 30 px en haut ferait plus propre la prochaine fois.
- **S9. Typographie** : à 390 px, le « : » se retrouve parfois en début de ligne (« …changent de nom / : C4 → C#4 »). Une espace insécable avant les deux-points règle le problème (`&nbsp;:`). C'est le cas sur tout le site : à voir hors de ce lot.

---

## Grille figure par figure (FR et EN, mêmes résultats)

| Figure | 1 Côte à côte | 2 Changement visible | 3 Recadrage | 4 Vrai | 5 Palette / textures | 5b Pas de texte incrusté | 6 Légende | 7 Paire de l'autre instrument |
|---|---|---|---|---|---|---|---|---|
| ChromaKeys — I en Logique (aussi dans Émotions) | ✅ | ✅ (tout l'accord passe au rouge) | ✅ (S8) | ✅ | ✅ | ✅ étiquettes HTML | ✅ | n/a (électronique ; voir A5 pour Émotions) |
| ChromaKeys — V en Logique | ✅ | ✅ | ✅ (S8) | ✅ (G2 B2 D3 G3, ding gris) | ✅ | ✅ | ✅ | n/a |
| Éditeur de mélodies, Ode en C (+ couverture) | n/a | n/a | ✅ | ✅ (E3 E3 F3 G3 G3 F3 E3 D3 C3, sans alerte) ; alt ❌ A6 | ✅ | ✅ | ✅ | n/a |
| Lecteur de Let It Be | n/a | n/a | ✅ | ✅ (■, Arpège / Arpeggio, 80, ×4 sur C, ×2 sur G) ; alt ❌ A1 | ✅ | ✅ | ✅ | n/a |
| Pupitre ordinateur | n/a | n/a | ✅ | légende ❌ A3 | ✅ | ✅ | ❌ A3 | n/a |
| Pupitre tablette | n/a | n/a | ✅ | ⚠️ défaut visible A2 ; alt ❌ A1 | ✅ | ✅ | ✅ | n/a |
| Mineurs naturel / harmonique | ✅ à 390 et 1280 px | ❌ B1 | ✅ | ✅ (III F+, V A, VII C#°) | ✅ | ✅ | ✅ | n/a (thème électronique) |
| Trio des mineurs | ✅ en bureau ; ❌ absent < 1024 px (A4) | ❌ B1 (B2 illisible) | ✅ | ✅ (II Em, IV G, VI B°) | ✅ | ✅ | ✅ (S2) | n/a |
| Créer › Une gamme, électronique / acoustique | ✅ | n/a | ✅ (S1) | ✅ (cartes Dm · Équilibre → C · Mystère / Balance → Mystery) | ✅ | ✅ | ⚠️ « au même cadrage » (S1) | ✅ c'est la paire |

**Texte** : 8 ✅ · 9 ✅ (aucun « creux » pour compter, « écran du handpan » respecté) · 10 ❌ A3 (une justification) · 11 ❌ A3, sinon ✅ · 12 ✅ (le renvoi vers `les-deux-visions-chromakeys` est un lien, FR et EN).

**Exactitude du nouveau contenu** : la correction « V Tension, VII Mystère » est conforme à l'app (`translations.ts` : `accord.emotion.v` Tension, `accord.emotion.vii` Mystère / Mystery ; `reveal.emo.6`). La sous-partie « En mode Logique, sur le Neotone Mutant » est à la première personne, dans le ton de l'article, sans surenchère. Les phrases de l'éditeur sur les couleurs (« une ligne par note, chacune habillée de sa ChromaKey ») et sur les octaves (E3…C3, C2 à G4) collent à l'image. Les « deux logiques de couleur » (l. 49) existent bien dans le code (`melody/melody-editor.ts:97`, `ColorMode = 'chroma' | 'degree'`).
