# Relecture du lot 2 du blog (captures Nuit étoilée) — 24/10/2026

> Relecteur distinct (je n'ai pas fait le lot). Lecture seule : rien n'est modifié dans le dépôt, rien n'est committé.
> Base : commits `51f3276` à `9cc1dd4`, `audits/CAPTURES-BLOG-LOT2-2026-10-24.md`, `specs/CHARTE-ARTICLES.md`.
> Faits vérifiés dans l'app : `~/CLAUDE/NEOTONE STUDIO/NEOTONE 1er mai 2026/` (`translations.ts`, `guide/changelog-data.ts`, `accompanist-widget.ts`, `panels.css`, `acoustic/my-instruments-window.ts`, `acoustic/acoustic-panel.ts`, `feedback/feedback-widget.ts`).
> Captures du rendu : `/private/tmp/claude-501/-Users-davidlesage-CLAUDE/d7f07e1f-7686-41e9-a369-7f4bc8e9d723/scratchpad/relecture-lot2/` (8 fichiers).

## Verdict : publiable APRÈS CORRECTIONS

Le travail image par image est solide. J'ai ouvert toutes les nouvelles captures FR et une partie des EN. Pour presque toutes, la légende et l'`alt` disent exactement ce qu'on voit : notes, numéros d'ordre, couleurs, libellés. Les paires sont côte à côte, au même cadrage, avec une vraie différence. La build passe (134 pages) et aucune image n'est cassée : 0 référence manquante dans `dist`, 0 image non chargée sur les pages ouvertes. Les dimensions `width`/`height` correspondent aux fichiers, et chaque article EN utilise les captures `-en`.

**Trois points bloquent la publication** (détail plus bas) :
1. la capture du lecteur de *Let It Be* montre une harmonie fausse sans le dire ;
2. la section « Renommer » de Mes handpans décrit une fonction introuvable sur l'écran actuel ;
3. le Duo hybride est décrit comme une proposition, alors que l'app l'associe directement.

---

## 🔴 Bloquant

### B1 — `ta-partition-prend-vie` : la capture du lecteur montre *Let It Be* avec une harmonie fausse
- **Fichiers** : `src/content/blog/ta-partition-prend-vie.md` l. 30-38, et `ta-partition-prend-vie-en.md` l. 30-38 (`app-partition-lecteur-en-marche-2026-10(-en).webp`).
- **Problème** : la capture affiche Dm · Équilibre, Am · Tension, Bb · Nostalgie, Gm · Détente. *Let It Be* se joue C, G, Am, F, et c'est ce que montrent les autres captures du même article (pupitre, badges ×4 sur C et ×2 sur G). Ce n'est pas une transposition : en D, on aurait D, A, Bm, G. L'app a « adapté » le morceau au mode mineur. La légende dit seulement « posé en D mineur ». Le lecteur voit donc deux harmonies différentes pour la même chanson dans la même page. C'est exactement le motif qui a fait écarter la capture EN de Hallelujah (« trompeur pour un article qui accompagne la chanson ») : la règle doit valoir ici aussi (charte §4, « aucune image qui se contredit »).
- **Correction** : garder l'ancienne capture `app-partition-lecteur-en-marche.webp` (comme pour la couverture), ou demander une capture de *Let It Be* en C majeur. À défaut, la légende doit le dire clairement, par exemple : « Ici, l'app a adapté *Let It Be* à une gamme de D mineur : les accords affichés (Dm, Am, Bb, Gm) ne sont pas ceux de l'original (C, G, Am, F). » Par ailleurs, « la lecture fonctionne dans tous les cas » ne se voit pas à l'écran : à retirer ou à prouver.

### B2 — `mes-handpans-une-seule-porte` : la section « ✏️ Renommer » décrit une fonction introuvable sur l'écran décrit
- **Fichiers** : `mes-handpans-une-seule-porte.md` l. 107-111 et l. 117 (« renommer ») ; `-en.md` l. 111 et l'équivalent de la l. 117.
- **Problème** : dans la fenêtre Mes handpans actuelle (variante C, par défaut depuis le 20/10 : `acoustic/my-instruments-window.ts` l. 76-87 et l. 535-570), une carte n'a que ▶/✓, ①/② (duo) et 🗑. Aucune action ne renomme un instrument : seuls les **duos** se renomment (l. 426). Le crayon n'existe que dans l'ancien bloc « POUR » (`acoustic-panel.ts` l. 2984), que l'article déclare périmé (l. 18). Le texte affirme donc une fonction sans dire où elle est, et elle ne se trouve pas sur l'écran montré (charte §4).
- **Correction** : vérifier dans l'app si on peut encore renommer un instrument, et où. Si c'est dans le panneau latéral (voir A1), le dire : « ✏️ Renommer. Dans le panneau latéral, le crayon à côté du nom de l'instrument… ». Sinon, retirer le paragraphe « ✏️ Renommer », le mot « renommer » de la l. 117, et renommer le titre l. 107 en « Créditer le fabricant ».

### B3 — `mes-handpans-une-seule-porte` l. 81 (FR) et l. 81 (EN) : le Duo hybride n'est plus « proposé »
- **Problème** : « elle te propose de les associer quand même ». Dans le code actuel (`my-instruments-window.ts` l. 155-163), une paire acoustique + électronique est posée directement, sans confirmation. L'acoustique passe d'office en ① et l'app l'écrit : « Acoustique + électronique : l'acoustique passe au pan principal, l'électronique à côté. » (`mih.duo.mixte_ordre`). Du coup, la phrase de la l. 70 (« Le bouton ⇄ les échange ») est fausse pour ce cas.
- **Correction** (FR) : « Mais elle ne refuse pas non plus, comme elle le faisait avant : pose un acoustique et un électronique dans Mon duo, et tu as un **Duo hybride**. L'acoustique prend alors toujours la place ①, pan principal, et l'app te le dit. C'est une porte, pas un mur. » Même chose en EN : « …you get a **Hybrid duo**; the acoustic always takes slot ①, the main pan, and the app tells you so. »

---

## 🟠 À corriger

### A1 — Le « panneau de droite » existe encore sur une capture du lot
- `mes-handpans-une-seule-porte.md` l. 18 range « un panneau de droite » parmi les consignes périmées, et l. 83 titre encore « Le Neotone a droit au même bloc ».
- Or la nouvelle capture `app-midi-mapping-2026-2026-10.webp` (`pourquoi-handpan-electronique`) montre, à droite, le panneau latéral en mode électronique, avec ses blocs : « ⚡⚡ pose un 2ᵉ Neotone… », Fabricant / Diapason, « Changer de gamme → plus bas », « Ajouter un handpan », « Partager cette gamme », « Ce que tu peux faire », « Compléter ». Les deux articles se contredisent.
- **Correction** : vérifier ce que contient aujourd'hui le panneau latéral. Puis remplacer à la l. 18 « d'un panneau de droite ou de cases à cocher » par « de cases à cocher ou d'une barre « POUR » », et le titre de la l. 83 par « Le Neotone a droit aux mêmes cartes ».

### A2 — `mes-handpans-une-seule-porte` l. 79 (FR et EN) : vocabulaire du duo (charte §3, 23/10)
- « Poser un acoustique à côté d'un acoustique, c'est un **duo**. Poser un acoustique à côté d'un Neotone, ce n'est pas la même chose ». La charte nomme les deux : **Duo acoustique** et **Duo hybride**.
- **Correction** : « Deux acoustiques côte à côte, c'est un **Duo acoustique**. Un acoustique à côté d'un Neotone, c'est un **Duo hybride** : **tes deux handpans** ne viennent pas du même monde, et l'association obéit à ses propres règles — c'est le sujet de [cet article-là](…). » EN : « Two acoustics side by side make an **Acoustic duo**; an acoustic beside a Neotone makes a **Hybrid duo**… »

### A3 — `reveler-les-accords-de-ton-handpan.md` l. 3 et `-en.md` l. 3 : la `description` dit encore 156
- L'écran, la citation et la légende disent 157.
- **Correction** : « …permet d'accompagner plus de 150 morceaux du répertoire… » (EN : « over 150 pieces »). Cette formulation tient aussi quand le compte bouge. Les chiffres de septembre (l. 88-90, l. 130) sont bien présentés comme tels : on peut les garder.

### A4 — Comparaisons empilées (charte §5, « règle absolue »), un défaut antérieur que le lot n'a pas corrigé
- `les-trois-mineurs-handpan` (FR et EN, l. 28-60) : naturel puis harmonique, deux figures de 2880×2506 l'une sous l'autre. Le seul changement (C4 → C#4, C3 → C#3, deux étiquettes, F → F+ et Am → A) demande de défiler entre les deux images (rendu vérifié : `08-trois-mineurs-en-bureau.jpg`).
- `handpan-emotions-degres`, `accompagner`, `handpan-par-les-couleurs`, `creer-sa-gamme` : électronique puis acoustique, empilés. Dans les deux derniers, le cadrage n'est même plus le même.
- **Correction** : pour les trois mineurs, une composite côte à côte recadrée sur le pan et les cartes, avec des étiquettes HTML « Mineur naturel / Mineur harmonique ». Pour les autres, une composite ou une figure à deux colonnes. Ça peut être un lot à part, mais la grille de la charte le marque « non conforme ».

### A5 — `jouer-avec-un-batteur-handpan.md` l. 40 (FR et EN) : Sobre / Vivant / Généreux existe, mais au seul niveau Musicien
- Le réglage existe bien (`accompanist-widget.ts` l. 448-450 et 601-612). Il est masqué en Découverte et en Apprenti (`accompanist-widget.css` l. 187-190), ce qui explique son absence sur la capture.
- **Correction** : « …et, au niveau Musicien, une « vie » — Sobre, Vivant, Généreux. » EN : « …and, at Musician level, a "liveliness"… »

### A6 — `feedback-ameliorer-handpan-studio` : le menu « Que veux-tu nous dire ? » n'a pas disparu
- `feedback/feedback-widget.ts` l. 183-202 : « 💬 Donner mon avis » ouvre toujours le choix du type de retour. Seul « 🐞 Signaler un bug » saute cette étape (`start: 'bug'`). La capture le confirme : elle porte un bouton « ← Retour » et une barre de progression déjà entamée. Le texte réécrit n'est pas faux, mais l'audit part d'un constat inexact, et l'article a perdu la liste des quatre entrées (idée, question, avis, traduction), qui reste vraie.
- **Correction** : au paragraphe « Pour une idée, une question ou un simple ressenti… », ajouter : « il ouvre la petite fenêtre « Que veux-tu nous dire ? », avec 💡 une idée, ❓ une question, 💬 un avis ou 🌐 une mauvaise traduction. » Vérifier dans l'app que les consultations (nom de l'app, tablatures) y sont encore, avant de les remettre.

### A7 — `ta-partition-prend-vie.md` l. 106 (et EN) : « une seule barre en bas »
- La capture montre trois rangées : ✕ · Lire · M'entraîner · Apprendre la grille · Modifier / zoom − 100 % + / Défiler · Boucle A-B · Transposer · ▾ · Exporter · Chanter.
- **Correction** : « …et les commandes de jeu sont regroupées en bas — Lire, M'entraîner, Apprendre la grille, Modifier, le zoom, puis Défiler, Boucle A-B, Transposer, Exporter, Chanter. »

### A8 — `editeur-de-melodies-handpan-en` : l'image EN ne montre pas le même état que la FR
- La capture FR montre l'Ode à la Joie en C sur le Mutant, toutes les notes sur l'instrument. La capture EN la montre en D, avec l'alerte « Not on the instrument: F#4 ». La légende EN le dit honnêtement, mais le lecteur anglophone découvre l'éditeur dans un état d'erreur, et les deux versions n'illustrent plus la même chose.
- **Correction** : demander une capture EN dans le même état que la FR (Ode à la Joie en C).

---

## 🟢 Suggestions

- **S1 — Lecture par degrés en mode Logique** (`les-deux-visions-chromakeys`) : l'article l'annonce comme cœur de la « deuxième réponse » (l. 182-188 : « L'accord du I est toujours rouge… »), et plus aucune capture ne la montre. C'était déjà signalé par l'auteur. Une paire Mutant en mode Logique (I rouge, D3 bleu ciel parce qu'il sert le V) à demander à l'app. Au passage, la phrase « Conséquence visible : deux notes du même nom peuvent porter deux couleurs différentes » est bien illustrée par la capture électronique (D4 bleu ciel, D5 orange).
- **S2 — ChromaKeys, niveaux** : le texte (l. 357) dit « ils reviennent au niveau Apprenti », et l'image montre Musicien. C'est exact : `panels.css` l. 3735 ne masque l'îlot avancé qu'en Découverte. Mais le lecteur cherchera Apprenti. Proposition : « …et ils reviennent dès le niveau Apprenti (ici, en Musicien). » Autre observation à transmettre à l'app : en Découverte, le D Kurd 10 colore par accord (F4, A4 et D4 orange) alors que le Mutant colore par note (F4 vert). Les deux pans du même réglage n'ont pas la même lecture.
- **S3 — `jam-rapide` l. 84** : « la note qui manque est donnée pour chacun ». Deux accords en ont deux (F#m : F#, C# ; Bm : B, F#). Écrire « la ou les notes qui manquent ».
- **S4 — `accompagner-des-chansons-au-handpan.md` l. 26 (et EN l. 26)**, texte antérieur au lot : « Le V, l'élan » / « The V, momentum ». Le V s'appelle **Tension**, Élan est le II (charte §3). Écrire « Le V, la tension. »
- **S5 — Couvertures portrait** : `mes-handpans-une-seule-porte` (rendu `05-mes-handpans-bureau.jpg`) recadre une capture de 1600×2170 dans un bandeau large, qui coupe la carte « Ajouter un handpan acoustique ». La couverture de l'Atlas (vignette) coupe aussi la bande « ZEN • AIR | AKEBONO / KOKIN ». C'est à valider par David (l'INDEX le disait déjà).
- **S6 — Couverture ChromaKeys gardée** (`blog-chromakeys-2026-00-couverture-18-notes.webp`) : elle affiche A#3 / A#5 alors que toutes les nouvelles captures disent Bb3 / Bb5. Petite incohérence en tête d'article.
- **S7 — À signaler à la session app** (vieux noms dans l'interface, pas dans notre texte) : « Le layout vocal n'apparaît pas ici : les creux de ton handpan sont gravés » (`pu.tonalite.layout_vocal_grave`, visible sur `app-logique-degres-acoustique-2026-10` et `blog-capo-2026-08-roue-tonalite-v2-2026-10`) porte à la fois l'ancien nom et « creux ». « 19 creux » sur la carte du Neotone (Mes handpans, MIDI). « Il ne manque à ta coque que B » (transposer). En EN : « COUPLET 1 », « Ode à la Joie » non traduits.
- **S8 — `deux-handpans-ensemble-en.md` l. 55** (hors lot) : `blog-duo-deux-rangees-accords-2026-10.webp` n'a pas de version `-en`.
- **S9 — `pourquoi-handpan-electronique`** : l'`alt` dit « ouvert depuis 🧰 Outils › Brancher mon instrument (MIDI) ». Le libellé existe (`v2.outils.midi.nom`), mais le chemin ne se voit pas sur la capture. On peut garder, ou dire « l'écran de branchement MIDI ».

---

## Les points listés « pour le relecteur » dans l'audit

| Point | Constat |
|---|---|
| Capo : ordre ré / do / la, étiquettes HTML | ✅ Les étiquettes HTML « Ancrage en ré (D) / do (C) / la (A) » correspondent aux trois pans (I Équilibre D, C, A), en FR comme en EN. Elles restent alignées en bureau et à 390 px (`01`, `02`). Le texte est réordonné partout, le renvoi « le dessin ne bouge pas » est juste, les anneaux cuivre ont disparu. Paire du degré V : G2-B2-D3-G3 / E3-G#3-B3-E4, mêmes emplacements ✅. |
| ChromaKeys | ✅ Les 12 paires sont justes, note par note : D4 au bleu ciel et F4 à l'orange ; Bb5 au jaune et A3 en trois ; D3 / D4 / D5 orange ; huit notes sur dix découpées sur le D Kurd 10. Toutes les paires Off/On diffèrent réellement. ⚠️ Plus aucune capture du mode Logique par degrés (S1). |
| Degrés et accompagner (Mutant en ré mineur) | ✅ Dm, Edim, F, Gm, Am, Bb, C sur les deux pans. Numéros d'ordre D2 / F3 / A3 / D4 et D3 / D4 / F4 / A4 conformes. Plus aucune mention de « Pop Complète » ni de « D Majeur » dans le texte. |
| Mes handpans (crayon pour renommer) | 🔴 B2 : introuvable sur l'écran d'octobre. Le reste du mode d'emploi correspond à la capture (cartes, ✓ / ① ② / 🗑, ⇄, Jouer le duo / Défaire le duo / Mes duos, « Apparence modifie »). B3 pour la paire mixte. |
| Bibliothèque | ✅ La légende et le texte réduit correspondent à la fiche (« Il manque Eb, F# sur ton handpan », versions, écoute, Mélodie / Arrangement). Sur la même capture, les cartes affichent « Avec ton D Kurd 10 · en F majeur » : la proposition existe encore, sous forme de tonalité et non plus de 2ᵉ handpan chiffré. Une phrase pourrait le dire. |
| Révéler, 157 contre 156 | 🟠 A3 : la `description` dit encore 156 ; tout le reste est cohérent. |
| Batteur (Sobre / Vivant / Généreux) | 🟠 A5 : le réglage existe, au niveau Musicien seulement. La légende (volume, kit Doux, décompte, tempo dans la barre au-dessus) est exacte. |
| Couverture de l'Atlas | Vignette lisible, mais la bande de la destination est coupée (S5). La légende du carrousel est exacte, et le texte de l'article ne parle plus ni de six destinations ni des thèmes ✅. |
| Captures qui montrent « layout vocal » | Le texte affiché vient de l'app (`translations.ts` l. 42390), ce n'est pas une erreur de l'article. À signaler à l'app (S7). |

## Texte réécrit

- **Mes handpans** : la voix de David est conservée (« C'est une porte, pas un mur », « Avant, il fallait deviner »), sans survente. Hors B2, B3, A1 et A2, tout le mode d'emploi correspond à la capture.
- **Section « étoile »** (`handpan-studio-mode-acoustique`) : exacte. 12 notes sur la coque (D3 à Bb5) et 6 dessous (G3, F3, F5, G5, Bb2, C3) en pointillés, alt et texte conformes. La mention du retrait des « 2 coques » est sobre et datée ✅.
- **Encadrés intégrés** : *jam-rapide*, *layouts-vocaux* (« chaque carte peut déroger (puce ▾) » est visible), *apprendre-les-accords* (🎓 à côté de 👁 et ▶, Frappe 1 sur 7, trois validations, trois façons de jouer : tout est visible) et *reveler* : intégration propre, sans justification. « Notes » partout dans notre texte ; « creux » n'apparaît que dans des citations de l'interface.

## Rendu

`npx astro build` passe : 134 pages. Le serveur `python3 -m http.server 4386 -d dist` a été arrêté après les vérifications. Pages regardées, en bureau (1280) et à 390 px :
- capo, bureau et 390 ;
- ChromaKeys, bureau et 390 ;
- Mes handpans, bureau ;
- partition, 390 ;
- Jam Rapide, 390 ;
- trois mineurs EN, bureau.

Aucune image cassée : le seul `<img>` sans dimension est le placeholder vide de la lightbox, ce qui est normal. Aucun défilement horizontal à 390 px (`scrollWidth` = 390). À 390 px, les captures plein écran (éditeur, Jam) sont illisibles sans la lightbox : c'est attendu, et l'indice « Clique sur l'image pour l'ouvrir » est présent.
