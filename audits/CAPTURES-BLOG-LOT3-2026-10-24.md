# Captures du blog, lot 3 — 24/10/2026

> Source : `~/CLAUDE/NEOTONE STUDIO/NEOTONE 1er mai 2026/audits/2026-10-24-captures-blog-lot3/` (INDEX.md), en réponse à `audits/RELECTURE-BLOG-LOT2-2026-10-24.md` (B1, A4, A8, S1) et au commit `e7173d8`.
> Chaque image a été ouverte avant d'écrire la légende et l'`alt`. Articles EN → captures `-en`. `updatedDate` = 2026-10-24 partout.
> Poids : tout est sous 300 Ko. Le trio des mineurs (FR) est réencodé en WebP 78 (302 Ko en 80), le trio EN et la paire « Créer une gamme » en WebP 80. Les deux mineurs côte à côte sont découpés dans la composite (gouttière de 12 px retirée), en WebP 85.

## 1. `ta-partition-prend-vie` (FR et EN) — lecteur

| | Avant | Après |
|---|---|---|
| Image | `app-partition-lecteur-en-marche.webp` (ancien thème sombre, interface FR aussi dans l'EN) | `app-partition-lecteur-let-it-be-do-majeur-2026-10-24(-en).webp` |
| Légende FR | « L'éditeur pendant la lecture : le bouton affiche ⏸, l'attaque est réglée sur Arpège, le tempo sur 80 et la métrique sur 4/4. Les diagrammes sont posés au-dessus des paroles de Let It Be, avec leurs badges ×4 et ×2. » | « L'éditeur pendant la lecture de Let It Be, en do majeur : le bouton de lecture affiche ■ (le morceau joue), l'attaque est réglée sur Arpège et le tempo sur 80. Au-dessus des paroles du couplet, les accords d'origine, C, G, Am, F, chacun avec son émotion, et les badges ×4 et ×2 posés sur le C et le G de la troisième ligne. » |
| EN | « … (The interface is shown in French.) » | Même légende en anglais (Arpeggio), mention retirée |

L'`alt` signale le chevauchement des étiquettes F / C en fin de ligne (affichage de l'app).

## 2. `ta-partition-prend-vie` (FR et EN) — pupitre

| | Avant | Après |
|---|---|---|
| Ordinateur (nouvelle figure) | — | `app-pupitre-let-it-be-do-majeur-2026-10-24(-en).webp` — « Le 🎼 Pupitre sur un ordinateur, ouvert sur Let It Be : l'intro en do majeur, C, G, Am, F, puis C, G, F, C. Ouvert directement, il n'affiche pas de badges ×N : ceux-là se règlent dans l'éditeur. » |
| Tablette | `app-pupitre-plein-ecran-tablette-2026-10.webp` (capture FR dans l'EN, « interface in French ») | `app-pupitre-let-it-be-do-majeur-tablette-2026-10-24(-en).webp` — « Le même Pupitre aux proportions d'un iPad en portrait… » ; EN : mention « (The interface is shown in French.) » retirée |

L'`alt` tablette dit que sous certains mots le cadre de couleur est décalé d'une demi-ligne (affichage actuel de l'app, signalé par la session app).

## 3. `editeur-de-melodies-handpan` (FR et EN) — éditeur de mélodies

| | Avant | Après |
|---|---|---|
| Image + couverture | `app-editeur-melodies-timeline-2026-10.webp` (la capture FR servait aussi l'EN) | `app-editeur-melodies-ode-do-majeur-2026-10-24(-en).webp` |
| Légende FR | « L'éditeur, ouvert sur le thème de l'Ode à la Joie. À gauche, ton handpan ; au centre, la grille… » | « L'éditeur, ouvert sur le thème de l'Ode à la Joie, avec un Neotone Mutant posé en do majeur : la mélodie (E3 E3 F3 G3 G3 F3 E3 D3 C3) tombe entièrement sur les notes du pan. À gauche, ton handpan ; au centre, la grille… » |
| EN | « … (Screenshot of the French interface: the English one will follow.) » | Légende anglaise équivalente, mention retirée |

Texte corrigé au passage : l'alt disait « Bb2 à A5 » et « E4 E4 F4… » (ancienne capture) → C2 à G4 et octave 3. Le petit pan du panneau de gauche est gris : la phrase « chaque note habillée de sa ChromaKey » porte maintenant sur les lignes de la grille. EN : « (*Éditeur de mélodies* in the app, still labelled in French) » retiré (l'app dit « melody editor », `translations.ts`).

## 4. Lecture par degrés en mode Logique (S1)

- `les-deux-visions-chromakeys` (FR et EN) : nouvelle sous-partie « En mode Logique, sur le Neotone Mutant », placée juste après le paragraphe qui l'explique (« L'accord du I est toujours rouge… »), avant « Hors du mode Logique ». Le texte n'avait pas été réduit, seule l'illustration manquait. Deux figures, étiquettes HTML « La couleur dit : la note / sa place dans la gamme » :
  - `blog-chromakeys-logique-degres-mutant-paire-2026-10-24(-en).webp` — « L'accord du I (I Équilibre, C). À gauche, chaque note garde la couleur de son nom : C2 et C4 rouges, E3 jaune, G3 bleu ciel. À droite, tout l'accord est rouge, parce que c'est le I. »
  - `blog-chromakeys-logique-degre-V-mutant-paire-2026-10-24(-en).webp` — « L'accord du V (V Tension, G). À gauche, D3 est orange, comme tous les ré, et B2 magenta, comme tous les si. À droite, G2, B2, D3 et G3 sont tous bleu ciel : D3 est un ré, mais ici il sert l'accord du V. »
- `handpan-emotions-degres` (FR et EN) : l'article dit « Le degré I garde toujours sa teinte » → la paire du I y est ajoutée, avec renvoi vers l'article ChromaKeys. Au passage, « le cinquième crée l'élan… le septième une tension » corrigé en « le cinquième crée la tension… le septième un mystère suspendu » (V = Tension, VII = Mystère, comme dans l'app).

## 5. `les-trois-mineurs-handpan` (FR et EN)

| | Avant | Après |
|---|---|---|
| Harmonique | Deux plein-écran 2880×2506 (`app-triste-trois-mineurs-naturel/harmonique-2026-10`) en paire | `app-trois-mineurs-naturel-2026-10-24(-en).webp` + `app-trois-mineurs-harmonique-2026-10-24(-en).webp` (moitiés de la composite), classe `article-img-pair article-img-pair--stack-sm` : côte à côte dès 640 px, l'une sous l'autre en pleine largeur sous 640 px. Étiquettes HTML « Mineur naturel / Mineur harmonique » |
| Légende | « Les nuances de Triste, dépliées dans le tiroir… L'app y annonce elle-même… 2 pads changent… le V devient A majeur et le III devient F+. » | « Les deux premières nuances de Triste, côte à côte… C4 → C#4 et C3 → C#3… le III devient F+, le V devient A majeur et le VII devient C#°. » Le tiroir n'est plus dans l'image : « 2 pads changent » / « 4 pads changent » passent dans le texte |
| Mélodique (nouveau) | — | `app-trois-mineurs-trio-composite-2026-10-24(-en).webp`, classe `figure-desktop-only` (visible à partir de 1024 px seulement), étiquettes HTML sur trois colonnes. « Le mélodique reprend les deux notes de l'harmonique et fait monter en plus Bb3 → B3 et Bb2 → B2 : quatre pads en tout. Dans ses cartes, le II devient Em, le IV G majeur et le VI B°. » |

CSS ajoutée dans `src/styles/global.css` : `.article-img-pair--stack-sm`, `figure.figure-desktop-only`, `.trio-labels`. En EN, la carte IV s'appelle « RELAXATION » (vérifié sur l'image).

## 6. `handpan-par-les-couleurs` et `creer-sa-gamme-de-handpan` (FR et EN)

| | Avant | Après |
|---|---|---|
| Image | Paire `app-chromakeys-on-2026-10` + `app-creation-acoustique-2026-10` (cadrages différents) | `blog-creer-une-gamme-electronique-acoustique-paire-2026-10-24(-en).webp`, une seule image au même gabarit, étiquettes HTML proportionnelles « Neotone Mutant (électronique) / D Kurd 10 (acoustique) » |
| Légende | Couleurs : « À gauche, les ChromaKeys allumées, palette ouverte… À droite… le D Kurd 10… » ; Créer : « À gauche, l'écran de création… en mode acoustique… À droite… le menu Affichage ouvert… » | Les deux : « Le même écran, Créer › Une gamme, au même cadrage : à gauche sur un Neotone Mutant, à droite sur un handpan acoustique D Kurd 10. Des deux côtés, chaque note porte la couleur de son nom… En bas, les sept accords de base de la gamme, de Dm · Équilibre à C · Mystère, chacun dans la couleur de la note qui lui donne son nom. » |

`creer-sa-gamme` : la phrase « Les captures de cet article montrent l'écran de création… en mode acoustique » devient « La capture… côte à côte, en électronique et en acoustique : le geste est identique, et en acoustique la création est gratuite. » Les couvertures ne changent pas.

## 7. Renommage

`mes-handpans-une-seule-porte(-en).md` : ne parle de nommer que les **duos** (« ✎ Nommer un duo » / « ✎ Name a pair »), aucun crayon d'instrument. Rien à corriger.

## 8. Vidéo 08 (« Le duo hybride électro-acoustique », F#3)

**Absente.** Dans `…/audits/2026-10-21-maquette-yannick/medias-a-glisser/08 - Duo - Vidéo du duo de David/`, le fichier `ANIM-PHOTO-08-*` le plus récent est `hybride-revele-v2` (22/10, 23:04), antérieur à la vidéo déjà en place (`public/videos/blog/duo-hybride-revele.mp4`, commit `e630272` du 23/10, 02:53). Aucun fichier plus récent. `duo-hybride-revele.mp4` n'est pas touché.

## Rendu

`npx astro build` : 134 pages. Toutes les images citées existent dans `dist`. Serveur `python3 -m http.server 4384 -d dist`, contrôle Playwright (locale fr-FR pour les pages FR), puis serveur arrêté. Captures : `/private/tmp/claude-501/-Users-davidlesage-CLAUDE/d7f07e1f-7686-41e9-a369-7f4bc8e9d723/scratchpad/lot3/`.
- À 390 px, aucun débordement (`scrollWidth` = 390) sur les trois mineurs (FR, EN), ChromaKeys, la partition (FR, EN), les émotions et les couleurs. Toutes les images se chargent.
- Trois mineurs à 390 px : les deux pans l'un sous l'autre en pleine largeur. Les noms des notes se lisent bien, les cartes se devinent (couleur, nom de l'accord), et la lightbox donne le détail. Le trio est masqué.
- Trois mineurs à 1280 px : paire côte à côte, et trio visible avec ses trois étiquettes.

## À signaler (vu dans les captures, côté app)

Cadres décalés sous les mots du pupitre (tablette), étiquettes F / C qui se chevauchent dans l'éditeur, Ode à la Joie ouverte en D avec « F#4 absent » sur la gamme par défaut du Mutant, renommage d'instrument devenu inatteignable en V3 (voir l'INDEX de la session app).
