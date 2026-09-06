# Audit des images du blog — 06/09/2026

> **Mission** : arrêter d'illustrer l'application avec des images qui ne la montrent pas.
> Lecture seule : aucun article, aucune image, aucun dictionnaire n'a été modifié.
> Toutes les images ont été **ouvertes et regardées**, pas déduites de leur nom de fichier.
>
> Les mots de David :
> > « J'ai besoin que d'autres articles soient également illustrés avec des captures réelles de
> > l'interface. […] il serait plus pertinent que tu le fasses en communiquant avec la session
> > qui gère le code de l'app, pour que tout soit cohérent et raccord. »
> > « Les fonds actuels ne sont pas le reflet de la réalité. »

---

## 0. Les chiffres, d'abord

| Mesure | Valeur |
|---|---|
| Articles FR | **32** (29 ont un jumeau EN ; 3 n'en ont pas encore) |
| Articles FR **sans aucune image dans le corps** (couverture seule) | **18 sur 32 — 56 %** |
| Articles FR dont le corps contient au moins une illustration | 14 |
| Images de couverture distinctes utilisées | 22 pour 32 articles |
| Couvertures partagées par ≥ 2 articles | **6 images, couvrant 15 articles** |

### Le partage d'images, chiffré exactement

| Image de couverture | Nombre d'articles FR | Lesquels |
|---|---|---|
| `app-logique.webp` | **5** | accompagner-des-chansons · apprendre-les-accords · feedback-ameliorer · handpan-emotions-degres · les-trois-mineurs |
| `app-creation.webp` | **3** | creer-sa-gamme · editeur-de-melodies · exporter-ses-partitions |
| `blog-partition-hallelujah.webp` | **2** | bibliotheque-musicale · editeur-de-partition |
| `constel-polygone.webp` | **2** | handpan-par-les-couleurs · les-4-accords-magiques |
| `app-hybride-deux-gammes.webp` | **2** | les-deux-visions-chromakeys · mes-handpans-une-seule-porte |
| `neotone-hero-david.webp` | **2** | pourquoi-handpan-electronique · jouer-et-chanter-au-casque |

> ⚠️ **Le problème est doublé** : les 29 jumeaux EN reprennent **exactement les mêmes `cover:`**
> (vérifié fichier par fichier, zéro divergence). Sur `/en/blog`, un lecteur voit donc les mêmes
> six vignettes répétées. Corriger une couverture FR sans corriger son jumeau EN laisserait
> l'index anglais en l'état.

---

## 1. Le fait le plus important de cet audit

**Les quatre images `app-*.webp` du 22/06/2026 montrent une interface qui n'existe plus.**

`app-logique.webp`, `app-creation.webp`, `app-atlas.webp`, `app-midi.webp` et
`constel-polygone.webp` affichent toutes la **barre d'onglets « Logique · Gammes · Création ·
Midi connect »**. L'app actuelle affiche « **Que faire ? · Logique · Gammes · Création · Chanter
& Jouer** », sous le titre « **Handpan Constellation Studio — Powered by David Lesage** », avec
le bouton « Palette d'outils » et « Donner mon avis BÊTA ».

Référence de ce que montre l'app aujourd'hui : `blog-chromakeys-degres-e18-logique.webp`
(27/08) et `app-hybride-deux-gammes.webp` (27/08) — ce sont les seules captures du dépôt qui
portent la coiffe actuelle.

**Conséquence** : `app-logique.webp` est la couverture la plus utilisée du blog (5 articles ×
2 langues = **10 pages**), et c'est une capture périmée. C'est le point de départ du chantier.

> Aucune image du dépôt ne porte à l'écran l'ancien nom « Handpan Compagnon » — vérifié
> visuellement. Le nom obsolète n'est donc pas *dans* les pixels. Il reste en revanche dans
> `blog-grille-accords-dkurd.webp`, dont le pied de page imprimé dit « **Handpan Studio** by
> David Lesage » là où l'app signe désormais « créé avec **Handpan Constellation Studio** by
> David Lesage » (visible, lui, dans `blog-chromakeys-degres-e18-partition.webp`). C'est un
> export PDF daté, à refaire.

---

## 2. Le tableau des 32 articles

Légende des verdicts :
✅ capture réelle à jour · ⚠️ capture réelle mais périmée · 🎨 image composée / décorative ·
❌ hors sujet · 🏞️ photo (légitime, article non logiciel)

| # | Article FR | Sujet · décrit-il une fonction de l'app ? | Image actuelle | Verdict | Justification (une ligne) |
|---|---|---|---|---|---|
| 1 | `accompagner-des-chansons-au-handpan` | Mode Logique comme instrument d'accompagnement — **oui** | `app-logique.webp` + corps : `blog-partition-hallelujah.webp` | ⚠️ | Vraie capture du cercle des degrés avec bulle « I Équilibre C », mais coiffe « Midi connect » disparue. |
| 2 | `apprendre-les-accords-handpan` | Mode d'apprentissage guidé, note allumée une à une — **oui** | `app-logique.webp` (partagée ×5) — **corps vide** | ⚠️ + ❌ | La capture ne montre **aucun** état « guidé » : ni note en surbrillance, ni progression. L'article décrit un écran qu'il ne montre jamais. |
| 3 | `atlas-des-gammes-de-handpan` | Atlas Sonore, voyage par destinations — **oui** | `blog-atlas-destinations.webp` — corps vide | ⚠️ | Vraie capture du panneau « Où veux-tu voyager aujourd'hui ? » avec les 6 destinations, mais **recadrage bancal** : bord noir à droite, cartes coupées en bas. |
| 4 | `bibliotheque-musicale-handpan` | Bibliothèque, badges de compatibilité de gamme — **oui** | `blog-partition-hallelujah.webp` (partagée ×2) — corps vide | ❌ | Montre une **partition Hallelujah**, pas la bibliothèque. Le cœur de l'article (les badges ✅/⚠️ par morceau, les compteurs) n'apparaît nulle part. |
| 5 | `completer-son-handpan-acoustique-avec-un-neotone` | D Kurd 10 + Neotone, 2 → 24 tonalités — **partiellement** (surtout instruments) | `showroom-instruments.webp` + 4 SVG dans le corps | 🏞️ + 🎨 | Vraie photo du showroom (Neotone, handpans, écran) et 4 schémas SVG maison, cohérents. Le seul écran promis (« les deux Neotone tels que l'application les génère ») est un SVG, pas l'app. |
| 6 | `creer-sa-gamme-de-handpan` | Créer sa gamme en mode acoustique — **oui** | `app-creation.webp` (partagée ×3) — corps vide | ⚠️ | Vraie capture de l'onglet Création (« Neotone Mutant »), mais ancienne coiffe **et** montre un Neotone électronique alors que le tutoriel dit « mode acoustique, gratuit ». |
| 7 | `deux-handpans-mode-hybride` | L'accord dessiné à cheval sur deux pans — **oui** | `blog-bottom-coques.webp` — corps vide | ❌ | L'image montre les **notes du dessous d'un seul D Kurd 20** en deux coques, pas deux handpans côte à côte. `app-hybride-deux-gammes.webp` (qui montre exactement ce que l'article décrit) est utilisée ailleurs. 🚨 Le titre parle de « mode Hybride » alors que l'app a renommé ce cas « **Tes 2 handpans** » (« Hybride » ne désigne plus que acoustique + électronique). |
| 8 | `diagrammes-accords-handpan-pdf` | Diagrammes d'accords, export PDF/PNG — **oui** | `blog-grille-accords-familles.webp` + 3 dans le corps | ✅ | Vrais exports produits par l'app (roue, zoom Gm renversé, page complète). Seule réserve : le pied signe « Handpan Studio », nom d'avant. |
| 9 | `editeur-de-melodies-handpan` | Timeline, crayon, boucle, export .mid — **oui** | `app-creation.webp` (partagée ×3) — corps vide | ❌ | **Aucune timeline** dans l'image : c'est le cercle des accords. L'article décrit un éditeur horizontal jamais montré. Écart le plus large du blog. |
| 10 | `editeur-de-partition-handpan` | Mode Chanson, paroles + diagrammes ancrés — **oui** | `blog-partition-hallelujah.webp` — corps vide | ✅ | La capture montre exactement ça : « HALLELUJAH / Leonard Cohen », diagrammes au-dessus des paroles. Le bon article pour garder cette image. |
| 11 | `etre-bien-dans-le-son-neotone` | Placement de l'enceinte — **non** (matériel) | `blog-son-neotone-schema.svg` + 1 SVG | 🎨 (légitime) | Schémas maison ; aucune capture d'interface nécessaire. **Ne rien demander.** |
| 12 | `exporter-ses-partitions-handpan` | Export PDF/PNG des progressions — **oui** | `app-creation.webp` (partagée ×3) — corps vide | ❌ | Montre l'éditeur de gammes, pas un export. L'article parle même du filigrane « créé avec Handpan Constellation Studio » — qui est visible dans une autre image du dépôt. |
| 13 | `feedback-ameliorer-handpan-studio` | Le bouton « Donner mon avis » — **oui** | `app-logique.webp` (partagée ×5) — corps vide | ❌ | Le bouton « 💬 Donner mon avis BÊTA » n'existe même pas dans cette capture (coiffe d'avant). Sujet et image sans rapport. |
| 14 | `handpan-emotions-degres` | Les 7 degrés colorés / émotions — **oui** | `app-logique.webp` (partagée ×5) — corps vide | ⚠️ | C'est l'article dont l'image est **la plus juste** (les cartouches I Équilibre → VI Nostalgie sont pile le sujet) — mais elle n'en montre que 6, et la coiffe est périmée. Candidat naturel pour **garder** `app-logique` s'il n'y en a qu'un. |
| 15 | `handpan-par-les-couleurs` | Méthode ChromaKeys — **oui** | `constel-polygone.webp` (partagée ×2) — corps vide | ⚠️ | Vraie capture, mais dans un **état bizarre** : bandeau assombri, « Chromakeys **Off** » surligné en rouge — l'image d'un article sur les ChromaKeys montre les ChromaKeys désactivées. |
| 16 | `handpan-studio-mode-acoustique` | Le mode acoustique — **oui** | `app-acoustique.jpg` + `blog-bottom-etoile` + `blog-bottom-coques` | ✅ | Seule capture montrant le sélecteur « Acoustique / Électronique » et le panneau « Ton handpan acoustique ». Cohérente, à jour (19/08). Bien illustré. |
| 17 | `jam-rapide-accompagner-un-musicien` | Jam Rapide : tonalité + degrés → partition — **oui** | `blog-grille-accords-dkurd.webp` — corps vide | ❌ | Un export PDF de grille d'accords n'est pas le Jam Rapide. Article **programmé (16/09)** décrivant 4 écrans (saisie des degrés, déduction de tonalité, fiche « Voir la gamme », boutons ♭/♯) — zéro image. |
| 18 | `jouer-avec-un-batteur-handpan` | Barre d'accompagnement + tiroir 🥁 Batteur (41 grooves) — **oui** | `app-midi.webp` — corps vide | ❌ | L'image est l'**assistant de mapping MIDI** (« Étape 4/19 : joue la note en surbrillance »), sans aucun rapport avec la boucle d'accords ni le batteur. |
| 19 | `jouer-et-chanter-au-casque-neotone` | Jeu au casque — **non** (matériel/instrument) | `neotone-hero-david.webp` (partagée ×2) | 🏞️ | Beau portrait de David avec deux Neotone. Légitime, mais **partagée** avec l'article n° 26 : à différencier, pas à remplacer par une capture. |
| 20 | `la-carte-des-joueurs` | Carte du monde des joueurs — **oui** | `blog-carte-joueurs-maquette.webp` + 2 iframes | 🎨 **assumée** | **Ne pas condamner** : c'est une maquette explicitement présentée comme telle (bandeau « MAQUETTE · CARTE DU MONDE », les partis pris écrits dessus), et l'article embarque en plus les prototypes jouables locaux. La fonction n'est pas encore dans l'app : une capture réelle n'existe pas. **Ne rien demander.** |
| 21 | `layouts-vocaux-handpan` | Layouts vocaux Profond/Brillant/Ample — **oui** | `invisible-visible.webp` — corps vide | ⚠️ (bon fond, mauvais cadrage) | Vraie capture complète du Mode Logique — et le sélecteur « **Layout vocal · Profond / Brillant / Ample** » y est visible dans le panneau droit ! Mais minuscule, noyé dans un plein écran, et la coiffe est périmée. Il faut le **même écran recadré sur le sélecteur**. |
| 22 | `les-4-accords-magiques-handpan` | Les 4 accords I-V-vi-IV — **oui** | `constel-polygone.webp` (partagée ×2) + `blog-grille-accords-familles.webp` | 🎨 / ⚠️ | La couverture montre un accord unique, pas quatre ; l'image du corps (`blog-diagrammes-accords.webp` **n'est pas** utilisée ici alors qu'elle montre littéralement C · Dm · Em · F en quatre cartes) — inversion à corriger sans rien demander à l'app. |
| 23 | `les-constellations-du-handpan` | Polygone / Ouvert / Mains — **oui** | `blog-constellations-3-traces.webp` + 3 captures | ⚠️ | Montage à partir de vraies captures, exactement sur le sujet — mais issu de l'ancienne interface (bandeau coupé en haut). Le mieux illustré du blog après le n° 16. |
| 24 | `les-deux-visions-chromakeys` | Couleur = note vs couleur = degré — **oui** | `app-hybride-deux-gammes.webp` + 2 captures | ⚠️ 🚨 | Vraies captures récentes (27/08) et coiffe actuelle — **mais** la couverture affiche en toutes lettres « **Hybride : E 18 + D Kurd 18** » et « **Degrés de l'union** », les deux libellés que l'app a renommés. Périmée par le vocabulaire, pas par la mise en page. |
| 25 | `les-trois-mineurs-handpan` | Naturel / harmonique / mélodique sous « Triste » — **oui** | `app-logique.webp` (partagée ×5) — corps vide | ❌ | Le menu « Triste » et ses trois nuances 🌙🔥🎷 n'apparaissent pas ; la capture ne montre même pas le panneau droit où ils vivent. Article **programmé (12/09)**. |
| 26 | `mes-handpans-une-seule-porte` | Le panneau « Mes handpans » — **oui** | `app-hybride-deux-gammes.webp` + `blog-mes-handpans-duo.webp` | ⚠️ / ✅ | L'image du corps est une **excellente** capture réelle du panneau (« Mes handpans (2) », « tu joues dessus / à côté », « MON DUO », « Ajouter mon Neotone ») — elle devrait être la **couverture**. La couverture actuelle, elle, porte les libellés renommés. |
| 27 | `pourquoi-handpan-electronique` | Le Neotone — **non** (instrument) | `neotone-hero-david.webp` (partagée ×2) + `app-midi.webp` | 🏞️ / ⚠️ | Portrait légitime. `app-midi.webp` dans le corps est en revanche l'assistant de mapping ancienne interface, pas « le Neotone comme contrôleur MIDI » en usage. |
| 28 | `quel-casque-choisir-neotone` | Casques — **non** (matériel) | `blog-casque-neotone.webp` + 3 photos produit | 🎨 (légitime) | Montage produit propre et sur le sujet. **Ne rien demander.** |
| 29 | `reveler-les-accords-de-ton-handpan` | Le bouton « Révéler » — **oui** | `blog-grille-accords-roue.webp` + `blog-reveler-dkurd10-ciel.webp` | 🎨 / ✅ | L'image du corps est une **vraie capture** de l'écran Révéler (« 0/6 accords acquis », « 156 morceaux », cycle des quintes en ciel étoilé, les 3 onglets A/B/C) — elle devrait être la couverture. La couverture actuelle est un export PDF blanc, sans rapport avec un article dont tout le propos est visuel et nocturne. |
| 30 | `setup-nomade-neotone-bose-s1` | Neotone + Bose S1 — **non** (matériel) | `blog-setup-nomade.webp` + 2 photos produit | 🎨 (légitime) | Montage produit clair. **Ne rien demander.** |
| 31 | `ta-partition-prend-vie` | Lecteur ▶, badges ×N, Pupitre plein écran — **oui** | `blog-diagrammes-accords.webp` — corps vide | ❌ | L'image montre 4 diagrammes fixes ; l'article promet du **mouvement** (diagramme qui s'illumine, page qui défile, plein écran sur iPad). Article **programmé (20/09)**. Écart affirmation/monstration maximal. |
| 32 | `transposer-pour-chanter-handpan` | Déplacer la note d'ancrage — **oui** | `app-atlas.webp` — corps vide | ⚠️ | Vraie capture d'un pan D Kurd en ChromaKeys, ancienne coiffe, et **la note d'ancrage n'y est pas mise en évidence** : le geste décrit par l'article est invisible. |

### Trois articles n'ont pas de jumeau EN
`completer-son-handpan-acoustique-avec-un-neotone`, `mes-handpans-une-seule-porte`,
`reveler-les-accords-de-ton-handpan` — hors périmètre de cet audit, mais à savoir avant de
lancer un lot de traduction : ils devront recevoir les mêmes images.

---

## 3. Ce qui se règle **sans** rien demander à la session APP

Trois corrections sont de simples permutations d'images déjà présentes dans le dépôt.
À traiter en premier, c'est gratuit :

1. **`reveler-les-accords-de-ton-handpan`** → passer `blog-reveler-dkurd10-ciel.webp` en
   couverture (à la place de l'export PDF blanc `blog-grille-accords-roue.webp`).
2. **`mes-handpans-une-seule-porte`** → passer `blog-mes-handpans-duo.webp` en couverture ;
   libère `app-hybride-deux-gammes.webp` pour `les-deux-visions-chromakeys` seul.
3. **`les-4-accords-magiques-handpan`** → `blog-diagrammes-accords.webp` (les quatre cartes
   C·Dm·Em·F) est la couverture évidente ; elle est actuellement sur `ta-partition-prend-vie`,
   qui ne devrait pas la garder.

---

## 4. Ordre de traitement — par écart entre ce que l'article affirme et ce qu'il montre

**Groupe 1 — l'article décrit un écran qu'il ne montre nulle part (couverture hors sujet + corps vide)**
Ce sont les urgences : le lecteur lit une description détaillée d'une interface et ne la voit jamais.

1. `editeur-de-melodies-handpan` — une timeline décrite en 600 mots, illustrée par un cercle.
2. `ta-partition-prend-vie` — tout l'article porte sur le mouvement ; l'image est fixe. *(programmé 20/09)*
3. `jam-rapide-accompagner-un-musicien` — 4 écrans décrits, 0 image. *(programmé 16/09)*
4. `jouer-avec-un-batteur-handpan` — image = assistant MIDI, sujet = boucle + batteur.
5. `bibliotheque-musicale-handpan` — les badges de compatibilité sont le cœur du texte, absents.
6. `les-trois-mineurs-handpan` — le menu 🌙🔥🎷 n'existe sur aucune image. *(programmé 12/09)*
7. `feedback-ameliorer-handpan-studio` — le bouton dont parle l'article n'est pas dans l'image.
8. `exporter-ses-partitions-handpan` — parle d'exports, montre un éditeur de gammes.
9. `apprendre-les-accords-handpan` — le mode guidé (note allumée) n'est jamais montré.
10. `deux-handpans-mode-hybride` — montre un seul pan pour un article sur deux.

**Groupe 2 — capture réelle mais périmée, ou mal cadrée sur ce que dit le texte**
11. `handpan-emotions-degres` · 12. `accompagner-des-chansons-au-handpan` (les deux sur
`app-logique.webp`, l'image la plus vue du blog) · 13. `layouts-vocaux-handpan` (le sélecteur
est dans l'image, mais illisible) · 14. `transposer-pour-chanter-handpan` · 15. `creer-sa-gamme`
· 16. `handpan-par-les-couleurs` (ChromaKeys « Off ») · 17. `les-constellations-du-handpan` ·
18. `atlas-des-gammes-de-handpan` (recadrage) · 19. `les-deux-visions-chromakeys` (libellés
renommés) · 20. `diagrammes-accords-handpan-pdf` (pied « Handpan Studio »).

**Groupe 3 — rien à demander**
`etre-bien-dans-le-son-neotone`, `quel-casque-choisir-neotone`, `setup-nomade-neotone-bose-s1`,
`jouer-et-chanter-au-casque-neotone`, `pourquoi-handpan-electronique`,
`completer-son-handpan-acoustique-avec-un-neotone`, `handpan-studio-mode-acoustique`,
`la-carte-des-joueurs` (maquette assumée, la fonction n'existe pas encore).

---

## 5. LISTE CONSOLIDÉE DES CAPTURES À DEMANDER À LA SESSION APP

> **Format de livraison souhaité** : PNG ou WebP, **largeur ≥ 1600 px**, thème sombre (celui de
> l'app), interface en **français**, coiffe actuelle visible quand c'est un plein écran.
> Nom de fichier proposé entre parenthèses. **21 captures, 15 articles.**

### A · Mode Logique — remplacer `app-logique.webp` (10 pages FR+EN concernées)

**A1** *(`app-logique-2026.webp`)* — Mode Logique en pleine page, **coiffe actuelle visible**
(« Que faire ? · Logique · Gammes · Création · Chanter & Jouer », titre « Handpan Constellation
Studio »), un pan en ChromaKeys, et **les 7 cartouches de degrés complets** en bas — I Équilibre
→ VII Mystère, pas 6.
→ pour `handpan-emotions-degres` (l'article qui garde la lignée « app-logique »).

**A2** *(`app-logique-progression.webp`)* — le **même écran**, mais avec une **progression
d'accords déjà remplie** dans la barre « Progression des accords » (au moins 4 accords à la
suite, visibles), pour illustrer l'accompagnement d'une chanson.
→ `accompagner-des-chansons-au-handpan`.

**A3** *(`app-mode-guide-note-allumee.webp`)* — le **mode d'apprentissage guidé en cours** : une
seule note du pan **allumée / en surbrillance**, le doigté (L ou R) affiché dessus, et
l'indicateur de progression de l'accord visible. C'est l'écran que l'article décrit mot pour
mot et qu'aucune image du site ne montre.
→ `apprendre-les-accords-handpan`.

**A4** *(`app-triste-trois-mineurs.webp`)* — le panneau droit, **bouton « Triste » actif et son
menu déplié**, montrant les trois nuances 🌙 naturel · 🔥 harmonique · 🎷 mélodique, au niveau
**Musicien**. Idéalement en deux prises (naturel puis harmonique) pour voir les **deux pastilles
qui montent d'un demi-ton** sur le pan.
→ `les-trois-mineurs-handpan` *(programmé le 12/09 — prioritaire)*.

**A5** *(`app-layout-vocal.webp`)* — **gros plan** (pas un plein écran) sur le sélecteur
« **Layout vocal · Profond / Brillant / Ample** » du panneau droit, une option sélectionnée, avec
assez de contexte autour pour qu'on situe le panneau. Il est déjà visible dans
`invisible-visible.webp` mais illisible.
→ `layouts-vocaux-handpan`.

### B · Partition, lecteur, Pupitre

**B1** *(`app-partition-lecteur-en-cours.webp`)* — le **lecteur de partition en train de jouer** :
le diagramme d'accord courant **illuminé / mis en évidence** au milieu des autres, la barre
▶ ⏸ ⏹ visible, le BPM affiché, et les **badges ×N** lisibles sur au moins deux accords.
→ `ta-partition-prend-vie` *(programmé le 20/09 — prioritaire)*.

**B2** *(`app-pupitre-plein-ecran.webp`)* — le **Pupitre en plein écran**, idéalement photographié
ou capturé **sur un iPad ou un téléphone posé devant l'instrument** : c'est le seul cas du lot
où une photo en situation vaudrait mieux qu'une capture propre.
→ `ta-partition-prend-vie`.

**B3** *(`app-export-partition-filigrane.webp`)* — un **export réel** (PDF ou PNG) d'une
progression, montrant le filigrane « **créé avec Handpan Constellation Studio by David
Lesage** ». L'article parle explicitement de cette signature.
→ `exporter-ses-partitions-handpan`.

**B4** *(`blog-grille-accords-dkurd-2026.webp`)* — **refaire** l'export de la grille d'accords
D Minor / Kurd 10 : l'actuel signe « Handpan Studio by David Lesage », nom d'avant le renommage.
→ `diagrammes-accords-handpan-pdf` (remplacement à l'identique, même cadrage).

### C · Jam Rapide *(programmé le 16/09 — prioritaire, 0 image aujourd'hui)*

**C1** *(`app-jam-rapide-saisie.webp`)* — l'écran de saisie du Jam Rapide : **tonalité choisie**
et **degrés posés par section** (Couplet I-IV-V, Refrain III-IV-VI-V), avant génération.

**C2** *(`app-jam-rapide-deduction.webp`)* — la **déduction de tonalité** : le champ où l'on a
tapé « Am, F, C, G » et la réponse de l'app en français simple annonçant la tonalité trouvée
(si possible avec un accord signalé comme hors tonalité et ses alternatives).

**C3** *(`app-jam-rapide-voir-la-gamme.webp`)* — la fiche « **Voir la gamme** » de sortie :
l'instrument dessiné sur une **vraie coque Neotone**, avec la mention du modèle retenu
(Neotone¹ 10 notes ou Mutant 19 notes).

### D · Boucle d'accompagnement et batteur

**D1** *(`app-barre-accompagnement-boucle.webp`)* — la **barre d'accompagnement** avec un accord
**en cours de boucle** (état visuellement actif) et le réglage de tempo visible ; si possible avec
une **file d'enchaînement** de plusieurs accords remplie.
→ `jouer-avec-un-batteur-handpan`.

**D2** *(`app-tiroir-batteur.webp`)* — le **tiroir 🥁 Batteur ouvert** : les familles de grooves
listées et le sélecteur de « vie » (Sobre / Vivant / Généreux). L'article annonce 41 grooves en
huit familles — la capture doit rendre cette abondance crédible.
→ `jouer-avec-un-batteur-handpan`.

### E · Bibliothèque musicale et éditeur de mélodies

**E1** *(`app-bibliotheque-badges.webp`)* — la **liste de la Bibliothèque** avec les **pastilles de
compatibilité** visibles sur plusieurs morceaux (au moins un jouable et un incompatible) et les
**compteurs en tête de liste**. C'est le « badge qui change tout » de l'article.
→ `bibliotheque-musicale-handpan`.

**E2** *(`app-bibliotheque-morceau-incompatible.webp`)* — l'**explication affichée** quand on
ouvre un morceau incompatible, avec le bouton qui propose de basculer sur la bonne gamme (ou la
transposition proposée en mode acoustique). *(facultatif si E1 suffit)*

**E3** *(`app-editeur-melodies-timeline.webp`)* — **l'écran entier de l'éditeur de mélodies** :
le pan en haut, la **timeline horizontale** en dessous avec des notes déjà posées et colorées,
la tête de lecture visible, et la barre de pulsation (pieds gauche bleu / droit rouge).
→ `editeur-de-melodies-handpan` — **la capture la plus attendue de tout le lot**.

**E4** *(`app-editeur-melodies-crayon.webp`)* — le même éditeur avec le **crayon actif**, en train
de dessiner dans la grille. *(facultatif)*

### F · Divers

**F1** *(`app-donner-mon-avis.webp`)* — le **formulaire de feedback ouvert** depuis le bouton
« 💬 Donner mon avis BÊTA », avec le choix bug / idée / question / avis visible.
→ `feedback-ameliorer-handpan-studio`.

**F2** *(`app-deux-handpans-accord-a-cheval.webp`)* — **deux pans côte à côte** avec un accord
**tracé à cheval sur les deux**, dans l'interface **actuelle** (donc avec les libellés
renommés : « Tes 2 handpans » et « Les accords de base, à deux », plus « Hybride » ni « Degrés de
l'union »).
→ `deux-handpans-mode-hybride`, et remplacement de `app-hybride-deux-gammes.webp` sur
`les-deux-visions-chromakeys`.

**F3** *(`app-transposer-ancrage.webp`)* — le geste de **transposition** : la **note d'ancrage
mise en évidence** et, si l'app le permet, un avant/après montrant le pan qui change de
tonalité.
→ `transposer-pour-chanter-handpan`.

**F4** *(`app-creation-acoustique.webp`)* — la **création d'une gamme en mode acoustique**
(l'article est un tutoriel gratuit, or l'image actuelle montre un Neotone Mutant électronique) :
onglet Création, coiffe actuelle, sur un pan acoustique.
→ `creer-sa-gamme-de-handpan`.

**F5** *(`app-chromakeys-on.webp`)* — un pan en **ChromaKeys franchement activées**, bandeau
lumineux, sans l'état grisé « Chromakeys Off » de l'image actuelle.
→ `handpan-par-les-couleurs`.

**F6** *(`blog-atlas-destinations-2026.webp`)* — **reprendre** la capture du panneau Atlas
« Où veux-tu voyager aujourd'hui ? » : les 8 destinations **entières**, sans bord noir à droite
ni carte coupée en bas.
→ `atlas-des-gammes-de-handpan`.

**F7** *(`blog-constellations-3-traces-2026.webp`)* — **refaire les trois tracés** (Polygone /
Ouvert / Mains) sur le **même accord**, dans l'interface actuelle, en trois captures séparées
(le site fera le montage lui-même).
→ `les-constellations-du-handpan`.

---

## 6. Affirmations d'articles à faire vérifier par la session APP

À joindre à la même demande — elles concernent surtout les articles programmés, que la session
APP a signalés comme ayant dérivé.

| Article | Affirmation à vérifier |
|---|---|
| `deux-handpans-mode-hybride` | Le titre et tout le texte disent « **mode Hybride** ». Le changelog dit que « Hybride » ne désigne plus que **acoustique + électronique**, et que deux acoustiques s'appellent « **Tes 2 handpans** ». L'article décrit-il encore la bonne fonction sous le bon nom ? |
| `les-deux-visions-chromakeys` | Emploie-t-il « Degrés de l'union », renommé « Les accords de base, à deux » ? |
| `jouer-avec-un-batteur-handpan` | « **41 grooves** rangés en **huit familles** », noms des familles, et les trois « vies » Sobre / Vivant / Généreux — toujours exacts ? |
| `ta-partition-prend-vie` | Badges **×N de 1 à 8**, métriques **4/4 · 3/4 · 6/8 · 2/4**, tailles de diagrammes **S/M/L/XL**, filigrane « version gratuite » sur les exports sans accès Studio. |
| `jam-rapide-accompagner-un-musicien` | Les **4 familles de gammes** (majeur, mineur naturel, harmonique, mélodique), le choix automatique **Neotone¹ 10 notes / Mutant 19 notes**, et les boutons **♭ / ♯ / ↩**. |
| `les-trois-mineurs-handpan` | Les nuances sont-elles bien sous « Triste », **au niveau Musicien seulement**, avec badge ✨ en Découverte/Apprenti ? Et toujours **réservées à l'électronique** ? |
| `bibliotheque-musicale-handpan` | Les trois rayons ⭐ / ✍️ / 🎼, et la répartition gratuit ↔ Studio (« sauvegarde en ligne = Studio, recevoir un contenu partagé = gratuit »). |
| `editeur-de-melodies-handpan` | L'accélération progressive « **+5 BPM tous les quatre passages** », et le fait que l'éditeur soit **Studio**. |
| `apprendre-les-accords-handpan` | Le doigté suggéré est-il toujours « particulièrement fiable dans le Mode Logique du Neotone électronique » ? |
| `reveler-les-accords-de-ton-handpan` | Les chiffres « **6 accords** » et « **156 morceaux** » pour un D Kurd 10 — ils apparaissent aussi dans `mes-handpans-une-seule-porte` (« Mes morceaux (156) ») : sont-ils toujours ceux que l'app calcule ? |

---

## 7. Points laissés « à trancher »

- **`neotone-hero-david.webp` partagée par 2 articles** : les deux sont des articles Neotone
  (casque, électronique) et la photo leur va. Faut-il une seconde photo pour les distinguer dans
  l'index, ou l'accepter ? Ce n'est pas une capture d'app — **hors périmètre de la demande APP**,
  c'est un arbitrage de David sur sa photothèque.
- **`app-acoustique.jpg`** est le seul fichier `.jpg` parmi les couvertures (tout le reste est en
  `.webp`). Capture réelle et à jour, mais format et poids incohérents avec le reste — conversion
  à décider, sans lien avec l'app.
- **`blog-partition-hallelujah.webp`** : capture réelle et parfaitement sur le sujet pour
  `editeur-de-partition-handpan`. Est-elle assez récente ? Elle date du 02/07 et l'éditeur a
  beaucoup évolué depuis (lecteur, ×N, métrique). **À trancher par la session APP** : la garder
  ou la refaire.
