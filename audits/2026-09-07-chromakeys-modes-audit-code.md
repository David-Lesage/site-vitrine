# Audit code — système de couleurs de l'app (ChromaKeys / Chakras / Degré)

- **Dépôt audité (LECTURE SEULE)** : `~/CLAUDE/NEOTONE STUDIO/NEOTONE 1er mai 2026`
- **HEAD au moment de l'audit** : `99e35c7`
- **Date** : 07/09/2026
- **Méthode** : lecture de code uniquement. Aucune écriture, aucun build, aucun serveur lancé.
  Toutes les affirmations sont citées `fichier:ligne`.

---

## A. « ChromaKeys » — principe, emplacement, libellé, action réelle

**Affirmation de David** : « ChromaKeys = principe arc-en-ciel, 1 couleur = 1 note, et c'est un
bouton/menu à part entière ».

**Ce que dit le code**

1. **C'est bien un îlot à part entière de la palette d'outils**, le premier :
   `index.html:438` — commentaire `<!-- ÎLOT 1 : PALETTE (CHROMAKEYS) -->`,
   `index.html:439` `<div class="tool-group group-palette">`.

2. **Libellé exact affiché (FR)** : `Chromakeys` (un seul mot, C majuscule, *k* minuscule dans
   l'affichage) — `index.html:444`
   `<span class="title-rainbow" ... data-i18n="toolbox.chromakeys">Chromakeys</span>` ;
   clé i18n `translations.ts:108-109` → `fr: "Chromakeys"`.
   Le titre est rendu en dégradé arc-en-ciel CSS (rouge→orange→jaune→vert→bleu→violet→rose) :
   `panels.css:809`.

3. **Ce que fait précisément le bouton de cet îlot** — c'est le point à corriger : l'îlot ne
   contient **qu'un interrupteur Off / On** (`index.html:451-452`, boutons `#btn-display-off` /
   `#btn-display-on`), et cet interrupteur **n'active PAS la coloration des pastilles**. Il pose
   `appState.paletteDisplayMode` :
   - `events-ui.ts:1281-1286` → `'off'` ou `'compact'` ;
   - `ui-palette.ts:239-243` → si `'off'`, la palette est masquée (`container.style.display='none'`,
     classe `palette-off`) et la fonction sort ; sinon la palette s'affiche.

   Ce qu'il affiche/masque = **la palette d'outils circulaire autour du pan** : l'arc des 12
   touches de note (`ui-palette.ts:421-463`), l'arc des octaves (`ui-palette.ts:313-410`) et la
   colonne d'outils en L (🌈 Chakras / 🎹 Piano / gomme / poubelle / annuler / rétablir,
   `ui-palette.ts:273-302`). Le titre de l'infobulle de l'interrupteur dit pourtant
   « Afficher / masquer les couleurs ChromaKeys sur le handpan » (`index.html:450`) — **l'infobulle
   ne décrit pas ce que le code fait**.

4. **La coloration des pastilles du pan** est pilotée par un **autre** contrôle, situé dans un
   autre îlot (« Apparence Handpan » → chip « Notation ») : le segmenté « Couleur notes »
   `index.html:592-597` (`#btn-color-none` 🚫 / `#btn-color-chakra` « Chakras » / `#btn-color-degree` 🎯),
   qui pose `appState.colorMode` (`events-ui.ts:804-810`).

5. **Le principe « 1 couleur = 1 note » est réel** mais s'appelle, dans le code et à l'écran,
   le mode **Chakras** (voir B). Le mot « ChromaKeys » n'apparaît à l'écran que comme titre
   de l'îlot de la palette ; dans les commentaires de code il désigne la table note→couleur
   (ex. `style-logic.ts:381` « getNoteColor(slot.name, -1) renvoie la ChromaKey de la note »).

**Verdict : nuancé.** ChromaKeys est bien un îlot/menu à part entière et bien le nom maison du
principe arc-en-ciel note→couleur, **mais son bouton Off/On n'allume pas les couleurs des
pastilles** : il affiche/masque la palette circulaire d'outils autour du pan. La coloration des
pastilles se règle ailleurs, dans « Couleur notes ».

---

## B. Mode « chakras » — libellé et table note→couleur

**Affirmation de David** : une note = une couleur fixe (do toujours rouge).

**Ce que dit le code**

- **Libellé exact affiché (FR)** : `Chakras` — `index.html:595`
  (`data-i18n="visual.color.chakras"`), valeur FR `translations.ts:286-287` → `fr: "Chakras"`.
  Le libellé du segmenté qui le contient est `Couleur notes` (`index.html:591`,
  clé `visual.note_color`, `translations.ts:259-260`).
  Infobulle : « Couleurs des chakras » (`index.html:595`).
  Dans la palette circulaire, le même mode a un bouton 🌈 dont le `title` est
  **« Mode Chakras »** en dur (`ui-palette.ts:273-279`, non traduit).

- **Application** : `style-logic.ts:240-244`
  ```ts
  else if (appState.colorMode === 'chakra') {
      const sanitized = noteName.replace('#', 's').toLowerCase();
      result.fill = `var(--chakra-${sanitized})`;
      result.opacity = '1';
  }
  ```
  → la couleur ne dépend que du **nom de note**, jamais de l'octave ni du contexte.

- **Table exacte des 12 notes** (`variables.css:31-42`, thème par défaut) :

| Note | Variable CSS | Hex | Commentaire du code |
|---|---|---|---|
| C (do) | `--chakra-c` | `#DC2626` | Dark Red |
| C# | `--chakra-cs` | `#EF4444` | Light Red |
| D (ré) | `--chakra-d` | `#EA580C` | Dark Orange |
| D# | `--chakra-ds` | `#F97316` | Light Orange |
| E (mi) | `--chakra-e` | `#EAB308` | Yellow (Natural only) |
| F (fa) | `--chakra-f` | `#16A34A` | Dark Green |
| F# | `--chakra-fs` | `#22C55E` | Light Green |
| G (sol) | `--chakra-g` | `#0EA5E9` | Sky / Light Blue (5e chakra, gorge) |
| G# | `--chakra-gs` | `#38BDF8` | Light Sky |
| A (la) | `--chakra-a` | `#0806FF` | Indigo électrique foncé (6e chakra, 3e œil) |
| A# | `--chakra-as` | `#5050FF` | Indigo clair |
| B (si) | `--chakra-b` | `#EB00FF` | Magenta-violet vif (7e chakra, couronne) |

  Commentaire d'ancrage : `variables.css:28` « C(racine)=rouge, D(sacré)=orange, … ».
  Deux jeux dérivés existent pour les fonds et dégradés (`variables.css:45-70`), et **un thème
  alternatif redéfinit ces mêmes variables** (`variables.css:255-257` : `--chakra-c: #C9445F`,
  `--chakra-cs: #F28677`, `--chakra-d: #993B00`…) — donc les hex ci-dessus sont ceux du thème par
  défaut, pas des constantes absolues.

**Verdict : confirmé** (avec la précision que 12 couleurs distinctes existent, dièses compris, et
qu'un thème alternatif peut décaler les hex).

---

## C. Mode « degré » — libellé, table, et le mot « Accord »

**Affirmation de David** : la couleur suit le rôle dans la tonalité (I toujours rouge) ; ce mode
s'appelle « Accord » en mode Gamme.

**Ce que dit le code**

- **Le bouton est le troisième du segmenté « Couleur notes »** : `index.html:596`,
  `#btn-color-degree`, contenu affiché `🎯`, infobulle « Couleur par degré de la gamme »
  (clé `ui.couleur_par_degre_de_la`, `translations.ts:6935-6936`).

- **Son libellé texte change selon l'onglet** — c'est exactement le point de David :
  `ui-modes.ts:19-23`
  ```ts
  if (appState.currentMode === 'logic') {
      btnDegree.textContent = t('g2.ui_modes.degres');   // « Degrés »
  } else {
      btnDegree.textContent = t('ui.colormode_chords');  // « Accords »
  }
  ```
  - `g2.ui_modes.degres` → `fr: "Degrés"` (`translations.ts:30328-30329`)
  - `ui.colormode_chords` → `fr: "Accords"` (`translations.ts:39615`)

  Donc : **« Degrés » en mode Logique, « Accords » dans TOUS les autres onglets** (Gammes,
  Création, Midi…), pas seulement en mode Gamme. Le `🎯` du HTML est écrasé par ce texte dès le
  premier passage de `updateToggleButtonsState()`.

- **Table degré→couleur** : `constants.ts:210-218`

| Degré | Hex | Commentaire du code |
|---|---|---|
| I | `#EF4444` | Rouge — Racine/Maison |
| II | `#F97316` | Orange — Mouvement/Chaleur |
| III | `#EAB308` | Jaune — Soleil/Émotion |
| IV | `#22C55E` | Vert — Nature/Repos |
| V | `#38BDF8` | Bleu clair / Sky — 5e chakra gorge |
| VI | `#5050FF` | Indigo clair — 6e chakra 3e œil |
| VII | `#EB00FF` | Magenta-violet — 7e chakra couronne |

- **⚠️ Découverte majeure — ces couleurs de degré ne sortent QU'EN MODE LOGIQUE.**
  `theory.ts:528-567` (`getNoteColor`) : la branche degrés est gardée par
  `if (appState.currentMode === 'logic')` (`theory.ts:533`) ; sinon
  (`theory.ts:555-563`) le code retourne **la couleur chakra**, y compris quand
  `colorMode === 'degree'`. Le commentaire l'assume : `theory.ts:455-457`
  « Hors Logique (Gammes / Création / MIDI, électronique ET acoustique), le coloriage “Degré”
  retombe sur les ChromaKeys ». `style-logic.ts:392-394` le redit pour le mode Gammes :
  « la couleur suit la note (ChromaKey) ».
  Conséquence : **le bouton nommé « Accords » hors Logique ne colore pas par rôle** — il colore
  par la ChromaKey de la fondamentale de l'accord auquel la note participe, ce qui produit un
  rendu « couleur = l'accord » (toutes les notes d'un même accord prennent la couleur de sa
  fondamentale), et non « couleur = degré ».

- Le degré lui-même est calculé par `theory.ts:411-431` (`getDynamicDegree`) : intervalle
  fondamentale↔tonique, projeté sur `SCALE_INTERVALS_MAJOR` `[0,2,4,5,7,9,11]` ou
  `SCALE_INTERVALS_NATURAL_MINOR` `[0,2,3,5,7,8,10]` (`constants.ts:265-266`). Tonique de
  référence : `acousticTonic` en acoustique, `currentEmotionalTonic` en Neotone (`theory.ts:414`).

- **Troisième vocabulaire, ailleurs** : la boussole du duo mixte propose deux « lentilles »
  nommées **« La couleur = la note »** et **« La couleur = le rôle »**
  (`acoustic/duo-paradox.ts:348-349`, clés `ac.duo_paradox.couleur_note` / `couleur_degre`,
  `translations.ts:33120-33137`) — même bascule `chakra` / `degree` (`duo-paradox.ts:579`), mots
  différents.

**Verdict : nuancé.** Le mot « Accord(s) » existe bien et remplace « Degrés », mais **hors mode
Logique en général** (pas seulement en Gammes) — et ce n'est pas qu'un renommage : hors Logique
le moteur de couleur ne calcule plus de degré du tout.

---

## D. Bouton « œil » — quelle couleur reçoit chaque pastille, mode × œil

**Affirmation de David** : en mode degré, œil actif ⇒ constellation d'un accord tracée et toutes
ses notes d'une même couleur (I en do majeur ⇒ tout rouge) ; en chakras la constellation se trace
mais chaque note garde sa couleur propre.

**Ce que dit le code**

- **L'œil** : bouton `.show-path-button`, généré en `ui-helpers.ts:1420`, infobulle FR
  **« Afficher/Masquer le tracé de l'accord »** (clé `g2.ui_helpers.afficher_masquer_le_trace_de`,
  `translations.ts:24991-24992`). Il bascule `appState.chordPathVisibility[index]`
  (`events-ui.ts:1926-1930`) et l'état visuel « selected » est posé en `chord-controller.ts:451-457`.

- **Le tracé** (`path-renderer.ts:26-109`) n'est dessiné que pour les accords dont l'œil est actif
  (ou en lecture / boucle / édition) : `path-renderer.ts:46-51`. **La couleur du tracé** :
  `path-renderer.ts:88` `pathColor = getNoteColor(root, stableIndex)` — donc couleur de degré en
  Logique, couleur chakra de la fondamentale ailleurs, indépendamment de `colorMode` (sauf accord
  « custom » avec `colorMode === 'none'` → blanc, `path-renderer.ts:77-78`).

- **Les pastilles**, mode par mode (`style-logic.ts:164-244`) :

| `colorMode` | Œil | Remplissage de chaque pastille |
|---|---|---|
| `chakra` | inactif | `var(--chakra-<note>)` pour **toutes** les notes — `style-logic.ts:240-243`. La branche « focus » (œil) n'est pas atteinte car aucun œil n'est actif. |
| `chakra` | actif | Le mode focus s'active (`style-logic.ts:165-180`) : les notes **hors** de l'accord ciblé reçoivent le gris `#4a5568` et **retournent immédiatement** (`style-logic.ts:176-179`) ; les notes de l'accord passent par `style-logic.ts:240-243` et gardent **leur propre couleur chakra**. Le tracé, lui, est à la couleur de la fondamentale. |
| `degree` (mode Logique) | actif | Focus : hors accord ⇒ gris `#4a5568` ; dans l'accord ⇒ 1 seule participation ⇒ `style-logic.ts:215-231` ⇒ `getNoteColor(root, chordIndex)` ⇒ **la couleur du degré, identique pour toutes les notes de l'accord** (I ⇒ `#EF4444` rouge). Les doublures d'octave éventuelles (« notes bonus ✨ ») passent à `opacity 0.4` (`style-logic.ts:229-231`, alimentées par `style-logic.ts:334-341`). |
| `degree` (hors Logique) | actif | Même mécanique, mais `getNoteColor` retombe sur la chakra de la fondamentale (`theory.ts:555-562`) ⇒ toutes les notes de l'accord prennent **la couleur de la note fondamentale**, pas une couleur de degré. |
| `none` | — | `renderer.ts:1013` pose la classe `colors-disabled` sur le conteneur ; aucun `fill` n'est écrit. |

**Verdict : confirmé** pour les deux affirmations, avec deux précisions : (1) l'œil **éteint en
gris** toutes les notes hors accord, ce que la description « colore toutes ses notes d'une même
couleur » ne dit pas ; (2) « I ⇒ tout rouge » n'est vrai **qu'en mode Logique** — ailleurs c'est
la couleur de la fondamentale.

---

## E. Sans œil actif — octaves en chakras, division de couleur en degré/accord

**Affirmation de David** : en chakras, tous les Ré sont orange ; en degré/accord une note
appartenant à plusieurs accords voit sa couleur divisée.

**Ce que dit le code**

- **Chakras** : la couleur ne lit que `noteName` (`style-logic.ts:241`), jamais l'octave ⇒
  D3, D4, D5 sont tous `--chakra-d` = `#EA580C`. **Confirmé.**

- **Degré/accord, plusieurs participations** : `style-logic.ts:233-238`
  ```ts
  else {                       // participations.length > 1
      result.fill = 'transparent';
      ...
  }
  ```
  puis `renderer.ts:2024-2030` (« PIE CHART MODE ») : le disque de base devient transparent et
  `renderPieChart` est appelé si `participations.length > 1`.

- **Rendu exact de la division** (`renderer.ts:2055-2090`) — ce sont des **secteurs de camembert**,
  pas des anneaux :
  - `angleStep = 2π / participations.length` (`renderer.ts:2056`) ⇒ **parts strictement égales** ;
  - premier secteur démarrant à `-π/2`, soit **à midi**, puis dans le sens des angles croissants
    (`renderer.ts:2059-2060`) ;
  - **l'ordre des secteurs = l'ordre d'enregistrement des participations**, c'est-à-dire l'ordre
    des accords traités dans `analyzeActiveChords` (`style-logic.ts:276`, `312-323`), donc l'ordre
    des cartes d'accord ;
  - couleur de chaque secteur : `getNoteColor(rootForColor, p.chordIndex)` (`renderer.ts:2068`) —
    même règle qu'ailleurs (degré en Logique, chakra de la fondamentale sinon) ;
  - une participation « pastel » (doublure d'octave) est rendue à 40 % d'opacité
    (`renderer.ts:2071-2074`) ;
  - en mode acoustique le secteur circulaire est déformé en secteur **elliptique** pour épouser la
    forme ovale du creux (`renderer.ts:2079-2082`) ;
  - les secteurs sont insérés sous le fond de texte de la note (`renderer.ts:2086-2088`).
  - **Nombre de couleurs maximum** : aucun plafond codé. Le nombre de parts = le nombre d'accords
    actifs qui contiennent cette note ; le mode Logique en expose 7 (les 7 degrés,
    `constants.ts:222-230`), donc jusqu'à 7 secteurs en pratique.

- Deux « filets » garantissent qu'aucune pastille ne reste grise sans œil actif : en Logique,
  toute note de la gamme sans participation reçoit son « degré maison » (`style-logic.ts:357-372`) ;
  en Gammes, toute note reçoit sa propre ChromaKey (`style-logic.ts:385-398`).

**Verdict : confirmé.** Précisions : ce sont des **secteurs égaux partant de midi**, ordonnés
selon les cartes d'accord, sans maximum codé (7 en pratique en Logique).

---

## F. Modes / onglets et vocabulaire couleur employé

**Onglets réellement présents** (`index.html:342-348`, doublés dans le menu mobile
`index.html:352-358`) :

| Onglet (libellé FR affiché) | `data-mode` | Source |
|---|---|---|
| Que faire ? | `intentions` | `index.html:342` (routé par `routeMode()`) |
| Logique | `logic` | `index.html:343` |
| Gammes | `library` | `index.html:344` |
| Création | `creation` | `index.html:345` |
| Chanter & Jouer | `singplay` | `index.html:346` — **`style="display:none"`** dans le HTML |
| Apprendre | `learn` | `index.html:347` |
| Midi connect | `midi` | `index.html:348` |

`appState.currentMode` ne prend que 4 valeurs : `'creation' | 'logic' | 'library' | 'midi'`
(`state.ts:211`) — « Que faire ? », « Chanter & Jouer » et « Apprendre » sont des destinations
routées, pas des valeurs de ce champ.

**Vocabulaire couleur par mode** (bouton « Couleur notes », 3ᵉ segment) :

| Mode | Mot affiché | Ce que fait réellement le mode |
|---|---|---|
| Logique | **Degrés** (`ui-modes.ts:20`) | couleur = degré, table `EMOTIONAL_DEGREE_COLORS` (`theory.ts:533-547`) |
| Gammes | **Accords** (`ui-modes.ts:22`) | retombe sur les ChromaKeys (`theory.ts:555-562`, `style-logic.ts:392`) |
| Création | **Accords** | idem |
| Midi connect | **Accords** | idem |

**La « palette d'outils »** = le bandeau `.toolbox-footer-tools` (`index.html:436`), replié par
défaut (`collapsed`). Il contient, dans l'ordre : l'îlot **Chromakeys** (`index.html:439`, Off/On),
l'îlot **Apparence Handpan** (`index.html:458`, `data-i18n="toolbox.visual"`) organisé en cartes-chips
verticaux — **Mains & doigté** (`index.html:493`), **Notation** (`index.html:524`, qui contient
« Ce qui s'affiche sur les notes » et le segmenté **Couleur notes**), **Constellation**
(`index.html:614`, clé `g7.idx.constellation` → `fr: "Constellation"`, `translations.ts:39140`),
puis l'îlot **Exporter** et l'îlot **Ton vaisseau** (cf. `panels.css:3256` « les trois
îlots-satellites (Chromakeys · Ton vaisseau · Exporter) »). En niveau Découverte les chips sont
masqués et la palette est épurée (`index.html:477-478`).

**Verdict : nuancé.** La liste des onglets est confirmée à deux détails près (« Chanter & Jouer »
est masqué en dur dans le HTML ; « Que faire ? » / « Apprendre » ne sont pas des `currentMode`).
Le basculement de vocabulaire est **Logique vs tout le reste**, pas « Logique vs Gammes ».

---

## G. Acoustique vs électronique — transposition, capo, couleurs

**Affirmation de David** : le changement de tonalité (transposition d'un layout, « capo ») n'est
possible qu'en mode électronique (Neotone).

**Ce que dit le code**

- **Le pare-feu existe et est explicite**, mais il porte sur les **altérations**, pas sur la
  transposition en bloc : `ui-minor-variants.ts:33-37` — « les nuances 🔥/🎷 restent NEUTRALISÉES
  en acoustique (`body.app-acoustic`) : **un handpan physique a des notes fixes, on ne peut pas y
  monter une note d'un demi-ton** ». Le CSS correspondant : `ui-minor-variants.ts:214-224`.
- Autres verrous acoustiques : `logic-controller.ts:29` (`if (appState.appMode === 'acoustic') return;`),
  `events-handpan.ts:365`, `first-run.ts:81`, `atlas-electro.ts:108`.
- **Mais une transposition acoustique existe bel et bien**, en aperçu réversible :
  `acoustic/tonality-wheel.ts:1-8` — « Depuis la carte-ancre “TU JOUES SUR …”, l'utilisateur peut
  TESTER sa gamme dans une AUTRE tonalité : on décale TOUTES les notes du handpan du même
  intervalle → il ENTEND sa gamme transposée (cas d'usage : trouver la tonalité qui va à sa voix
  **avant d'acheter**) ». La transposition elle-même : `tonality-wheel.ts:69-76`
  (`transposeLayout`, « géométrie conservée, notes décalées »). C'est un **aperçu d'écoute
  réversible** (snapshot/restore, `tonality-wheel.ts:35-48`), doublé d'un rapprochement vers la
  gamme du catalogue Yishama la plus proche (`tonality-wheel.ts:104-120`) — donc un entonnoir
  d'achat, pas un capo.
- Le mode électronique, lui, transpose sans contrainte : `acoustic/atlas-source.ts:265`
  « `'free'` = les 12 racines toujours disponibles (le Neotone transpose tout) » ;
  `atlas-planetarium.ts:13` et `:365` idem.
- **Ce que les modes de couleur font quand même en acoustique** : tout fonctionne, avec un
  pare-feu de tonique. `theory.ts:412-414` : « en acoustique, on colore par degré relativement au
  ding de la gamme Yishama (`acousticTonic`) ; en Neotone, `currentEmotionalTonic` reste la seule
  référence ». Le mode Logique acoustique existe (`acoustic/acoustic-panel.ts:130`) et force
  `colorMode = 'degree'` (`acoustic/acoustic-logique.ts:144` et `:172`,
  `acoustic/acoustic-mode.ts:134`). Le mode Création acoustique force `colorMode = 'chakra'`
  (`acoustic/acoustic-creation.ts:301-302` : « chaque note = sa couleur ChromaKeys, sans accord
  actif ») et restaure l'ancien mode en sortie (`acoustic-creation.ts:384-385`).
  Le second pan d'un duo suit désormais la même règle de couleur que le premier
  (`renderer.ts:660-690`, correctif du 26/08/2026).

**Verdict : nuancé.** Le pare-feu acoustique est réel mais formulé sur les **altérations d'un
demi-ton** (nuances du mineur). Une **transposition d'écoute réversible** est explicitement
proposée en acoustique via la roue de tonalité. Les modes de couleur fonctionnent pleinement en
acoustique, avec le ding de la gamme Yishama comme tonique de référence.

---

## H. Constellations et tonalité — la forme est-elle invariante ?

**Ce que dit le code**

- **En mode Logique électronique, la forme du tracé d'un degré est FIXE, par construction.**
  `logic-optimized.ts:91-98` (commentaire d'en-tête) :
  « TEMPLATES VISUELS — PARTAGÉS PAR TOUS LES MODES. **La géométrie des 7 polygones d'accord est
  INDÉPENDANTE du mode car le placement slot→degré est fixe.** Seules les notes JOUÉES par ces
  slots changent selon le mode (via leur octave). »
- Le tracé est défini par des **numéros de pads**, pas par des notes :
  `logic-optimized.ts:101-116` (`OPTIMIZED_VISUAL_TEMPLATES`), ex. degré I = pads `[0,4,6,9]`
  (+ pastel `[18]`), degré V = `[11,2,3,6]`. La sélection se fait ensuite purement par numéro
  visuel : `logic-optimized.ts:222-233`.
- La **transposition** ne touche que le contenu des pads : `logic-optimized.ts:161-187`
  (`applyOptimizedLogic` recalcule `targetMidi = tonicMidi + interval + …` et réécrit
  `handpanLayout[i].note`). Les templates ne sont pas relus. ⇒ **Changer de tonique ne change pas
  la forme.**
- **Majeur vs mineur naturel** : seul `scaleIntervals` change (`logic-optimized.ts:176` avec
  `SCALE_INTERVALS_MAJOR` / `SCALE_INTERVALS_NATURAL_MINOR`, `constants.ts:265-266`). Les slots ne
  bougent pas ⇒ **même forme**, notes différentes. `logic-optimized.ts:171-174` note que le ii
  devient ii° en mineur, « conforme à la théorie musicale ».
- **Mineur harmonique / mélodique** : servis par des presets qui **héritent les templates tels
  quels** et n'altèrent que le contenu de certains pads —
  `labo/presets/minor-presets.ts:6-21` : la map est `ERGONOMIC_MAP_PROFOND` à l'identique plus un
  `chromaticOffset:+1` sur les seuls pads altérés ;
  🔥 harmonique = pads **2 et 8** (la 7ᵉ) — `minor-presets.ts:110-111` (`HARMONIC_RAISED_SLOTS = [2,8]`) ;
  🎷 mélodique (forme ascendante figée) = pads **13, 7, 2, 8** (6ᵉ + 7ᵉ) —
  `minor-presets.ts:112-113` (`MELODIC_RAISED_SLOTS`).
  Les templates copiés sont strictement identiques (`minor-presets.ts:71-79` vs
  `logic-optimized.ts:101-116`), et le fichier justifie l'héritage des doigtés
  (`minor-presets.ts:17-21` : « l'altération d'un demi-ton ne change JAMAIS l'ordre de hauteur des
  notes d'un polygone »). Accords transformés annoncés : « III→III⁺, v→**V** (la vraie dominante),
  VII→vii° ; i, ii°, iv, VI inchangés » (`minor-presets.ts:117-120`).
  ⇒ **même forme de constellation, qualité d'accord différente.**
- **Ce qui PEUT faire varier la forme** :
  1. `appState.logicLayoutMode` (`profond` / `ample` / `brillant`) : la map d'octaves change
     (`logic-optimized.ts:75-89`) → les mêmes pads sonnent d'autres octaves, et certains accords
     passent en 1ʳᵉ inversion (`logic-optimized.ts:95-97`) ; la **géométrie** ne bouge pas, mais
     `main` est trié par hauteur avant tracé (`logic-optimized.ts:236`), donc **l'ordre du chemin**
     — et donc le dessin du polygone ouvert / des flèches — peut changer.
  2. Le **Labo Logique** (admin) peut substituer map et templates :
     `logic-optimized.ts:81-82` (`getActiveLabMap`) et `:214` (`getActiveLabTemplates`).
  3. **Le mode ACOUSTIQUE ne passe pas du tout par ces templates** : pare-feu explicite
     `layout.ts:346-359` et `layout.ts:469-476` — plaquer les gabarits 19 slots sur un layout
     acoustique de 10 notes sortait des accords faux. En acoustique, l'accord est résolu **par ses
     notes théoriques** avec un voicing serré (`layout.ts:365-408`) ⇒ **la forme dépend alors de la
     disposition réelle de l'instrument et n'est pas invariante par transposition.**
  4. En mode **Création**, la forme vient d'un moteur de voicings avec carrousel
     (`layout.ts:486-502`) — plusieurs formes possibles pour le même accord.
- **Mutant 19 creux** : les templates couvrent les numéros de pad 0 à 18 (`logic-optimized.ts:161`
  `for (let visualNum = 0; visualNum <= 18; visualNum++)`), c'est-à-dire exactement la disposition
  19 slots ; `layout.ts:349` la nomme « layout mutant 19 slots ». Le modèle est sélectionnable
  (`#btn-model-standard` / `#btn-model-mutant`, `ui-modes.ts:32-38`) ; sur un modèle standard tous
  les pads du template ne sont pas peuplés, et `getOptimizedGeometricSequence` n'ajoute que les
  slots réellement présents (`logic-optimized.ts:222-233`) ⇒ **polygone potentiellement plus
  pauvre**. Non vérifié numériquement ici (voir plus bas).

**Verdict : confirmé** en mode Logique électronique (forme strictement invariante par
transposition, par mode majeur/mineur, et par nuance harmonique/mélodique), **infirmé** en mode
acoustique et en mode Création (la forme est recalculée à partir des notes réellement disponibles).

---

## Vocabulaire réellement affiché — tableau de synthèse

| Où / quand | Mot affiché (FR) | Ce qu'il désigne | Source |
|---|---|---|---|
| Palette d'outils, îlot 1 (titre) | **Chromakeys** | l'îlot qui affiche/masque la palette circulaire | `index.html:444` · `translations.ts:109` |
| Palette d'outils, îlot 1 (boutons) | **Off / On** | `paletteDisplayMode` — palette circulaire visible ou non | `index.html:451-452` · `events-ui.ts:1281-1286` |
| Apparence Handpan → Notation (libellé) | **Couleur notes** | le segmenté de `colorMode` | `index.html:591` · `translations.ts:260` |
| … segment 1 | 🚫 (« Notes sans couleur ») | `colorMode = 'none'` | `index.html:594` |
| … segment 2 | **Chakras** | `colorMode = 'chakra'` — couleur = la note | `index.html:595` · `translations.ts:287` |
| … segment 3, **en mode Logique** | **Degrés** | couleur = le degré (table `EMOTIONAL_DEGREE_COLORS`) | `ui-modes.ts:20` · `translations.ts:30329` |
| … segment 3, **hors Logique** | **Accords** | couleur = la ChromaKey de la fondamentale de l'accord | `ui-modes.ts:22` · `translations.ts:39615` |
| … infobulle du segment 3 | « Couleur par degré de la gamme » | (invariable, ne suit pas le mot affiché) | `index.html:596` · `translations.ts:6936` |
| Palette circulaire, bouton 🌈 | **Mode Chakras** (titre, non traduit) | `paletteMode` + `colorMode = 'chakra'` | `ui-palette.ts:273-279` |
| Palette circulaire, bouton 🎹 | **Mode Piano** (titre, non traduit) | `paletteMode = 'piano'` (n'affecte pas `colorMode`) | `ui-palette.ts:283-289` |
| Boussole du duo mixte | **La couleur = la note** / **La couleur = le rôle** | même bascule chakra / degree | `acoustic/duo-paradox.ts:348-349` · `translations.ts:33120-33137` |
| Chip de section, palette d'outils | **Constellation** | outils de style de tracé | `index.html:614` · `translations.ts:39140` |
| Bouton œil, sur chaque carte d'accord | infobulle **« Afficher/Masquer le tracé de l'accord »** | `chordPathVisibility[i]` | `ui-helpers.ts:1420` · `translations.ts:24992` |
| Éditeur de layouts (Labo) | « Couleur = degré émotionnel (le rendu du Mode Logique) » | — | `translations.ts:37667` |

Note : le mot **« constellation »** n'est jamais employé par l'app pour désigner le tracé lui-même
dans l'infobulle de l'œil (« tracé de l'accord ») ; il n'apparaît que comme nom de la section
d'outils.

---

## Ce qui n'a pas pu être établi en lecture seule

1. **Les hex effectivement rendus à l'écran.** Les couleurs chakra sont des variables CSS
   redéfinies par au moins un thème (`variables.css:255-257` vs `:31-42`). Savoir quel thème est
   actif par défaut pour un visiteur demande d'exécuter l'app.
2. **Le rendu réel du camembert** (nombre de secteurs typiquement observé, lisibilité, ordre à
   l'écran) : la logique est claire (`renderer.ts:2055-2090`) mais la vérification visuelle
   nécessite l'app.
3. **La forme des constellations sur un modèle standard (non-mutant)** : les templates listent des
   pads 0→18 ; combien survivent sur un layout standard n'est pas déterminable sans exécuter
   `noteDisplayNumberMap`. Vérification numérique laissée à la session APP.
4. **L'état par défaut de l'interrupteur Chromakeys selon le mode.** `state.ts:537` initialise
   `paletteDisplayMode: 'off'` et `ui-palette.ts:218-220` mentionne « le cas par défaut en mode
   Logique », mais des préréglages de niveau (Découverte / Apprenti / Musicien) peuvent le
   modifier — non tracé exhaustivement ici.
5. **Ce que voit réellement l'utilisateur en mode « Chanter & Jouer »** : l'onglet est
   `display:none` dans `index.html:346`, réactivé ailleurs dans le code — le vocabulaire couleur
   qu'il expose n'a pas été tracé.
6. **Les variantes mineures harmonique/mélodique en production** : elles passent par
   `logic-layouts-lab.ts` avec des « doubles gardes admin/bêta » (`minor-presets.ts:31-33`).
   Savoir si un utilisateur ordinaire y a accès aujourd'hui demande de lire la configuration
   d'accès en vigueur, pas seulement le code des presets.
