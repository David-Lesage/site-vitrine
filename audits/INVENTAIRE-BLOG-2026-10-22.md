# Inventaire du blog — 22/10/2026

> Mission en lecture seule (aucun article modifié). Sources : les 34 articles FR et leurs 34 jumeaux EN de
> `src/content/blog/`, le journal de l'app (`guide/changelog-data.ts`, n° 300 à 619), la carte des outils
> (`prototypes/carte-des-outils.html`), et **chaque image du blog regardée** (planches de contrôle faites dans le
> dossier de travail de la session, pas dans le dépôt).
> Abréviations de chemins :
> - `APP/` = `~/CLAUDE/NEOTONE STUDIO/NEOTONE 1er mai 2026/`
> - `MED/` = `APP/audits/2026-10-21-maquette-yannick/medias-a-glisser/`
> - `#NNN` = numéro de la nouveauté dans le journal de l'app.

---

## 0. Résumé pour David

1. Le blog compte **34 articles**, chacun en français et en anglais. Les deux versions utilisent les mêmes images.
2. **4 articles sont à jour** : ils parlent du matériel (casque, enceinte, setup nomade) et pas de l'app.
3. **8 articles sont faux sur le fond.** Le plus grave est « La carte des joueurs » : il promet « tu n'apparais pas tant que tu n'allumes pas ton étoile ». Depuis le #612, tout le monde y a son étoile.
4. **19 articles ont des phrases à corriger** : un chemin qui a changé, un nom renommé (« Layout vocal », « Mes créations », « Mon instrument »), et surtout la phrase « la sauvegarde en ligne, c'est le Studio ». Elle est fausse depuis le #422 (tout est sauvegardé, même en Gratuit), et le Studio n'est pas encore en vente (#446).
5. **Toutes les captures de l'app datent d'avant le 10/09.** Elles montrent l'ancien thème, l'ancien panneau de droite et les anciens boutons cyan. **59 captures sont à remplacer**, et 7 exports PDF sont à revérifier.
6. Seulement **8 captures « Nuit étoilée » prêtes** peuvent remplacer directement une ancienne. Il faut **produire environ 51 captures**, par lots, sur le banc de l'app.
7. **Une question pour toi** : l'article « Neotone 10 ou 19 notes » cite tes mots (« le Neotone¹ n'a pas les sept degrés »). Or l'app joue maintenant les 7 degrés sur le Neotone¹ (#424, #555). On garde, on nuance, ou on retire ?
8. Sur les 14 nouveautés du brief, **11 n'ont aucun article** et 3 en ont un, mais faux (duo, constellation des joueurs, Mes handpans).
9. Je propose **12 nouveaux articles**, un par mise à jour. Le premier est le duo (stable, vidéos prêtes). Les bêtas (polyrythmes, Neotone Drum, notes au micro) sont présentées comme des bêtas.
10. Pour les vidéos : **14 vidéos** à mettre sur YouTube, chacune avec un titre et l'article qui l'intégrera. En attendant, un MP4 muet en 720p peut être posé dans chaque article.

---

## 1. Tableau de tous les articles (FR + EN regroupés)

États : ✅ à jour · ✏️ texte à corriger · 🖼️ captures obsolètes · ⛔ faux sur le fond. Un article peut cumuler.
Toutes les images citées sont dans `public/images/`.

**Captures « Nuit étoilée » prêtes**, regardées et validées pour remplacer une ancienne :
- **R1** `MED/04 …/A-JOUR-2026-10-22-NUIT-repertoire-dkurd-1440x900.png` (et 2880x1800) : le répertoire, avec les pastilles, les filtres de difficulté et d'enchaînement, et le compte « 157 ».
- **R2** `MED/08 …/A-JOUR-2026-10-22-NUIT-duo-hybride-pans-accord-a-deux-1440x900.png` : D Kurd 18 + Mutant, un accord posé à cheval sur les deux handpans.
- **R3** `MED/08 …/A-JOUR-2026-10-22-NUIT-duo-hybride-deux-rangees-accords-1440x900.png` : les 7 accords, puis les 16 accords « en plus, grâce à tes deux handpans ».
- **R4** `MED/10 …/A-JOUR-2026-10-22-NUIT-constellation-musiciens-par-pays-1440x900.png` : l'onglet Musiciens, 695 musiciens.
- **R5** `MED/10 …/A-JOUR-2026-10-22-NUIT-constellation-joueurs-fabricants-1440x900.png`.
- **R6** `APP/audits/2026-10-22-constellation-synchro/final-1440-ecran.png` : D Kurd 10 dans Découvrir, accords, Nuit étoilée, nouveau logo.
- **R7** `APP/audits/2026-10-22-interface-retouches/captures-apres/bureau-defaut-08-degres.png` : Neotone Mutant, Degrés & émotions, les cartes « Profond ▾ ».
- **R8** `APP/audits/2026-10-22-icones-dorees/captures/dore-nuit-ordi-3-affichage.png` : le menu 🎨 Affichage ouvert, avec l'îlot ChromaKeys, la Notation, l'Apparence et la Constellation.
- **R9** `MED/07 …/PHOTO-DAVID-acoustique-electronique-tablette-1.webp` à `-7.webp` : de vraies photos d'un acoustique et d'un Neotone¹ côte à côte, avec la tablette. Ce n'est pas une capture.

| Article (slug) | Date | État | Ce qui est faux (n° de nouveauté) | Images obsolètes → remplacement proposé | Vidéo à intégrer |
|---|---|---|---|---|---|
| accompagner-des-chansons-au-handpan | 18/07 | ✏️🖼️ | Les légendes décrivent l'ancien écran : bloc « Logique et Émotions » et panneau « Mes handpans » à droite (#545, #557). Le « Mode Logique » s'ouvre maintenant par Découvrir › Degrés & émotions (#447, #607). Le lien « Mode Chanson » pointe vers /handpan-app. | `app-logique-progression-2026-09.webp` → **R7**, ou à produire avec une progression posée · `app-logique-progression-acoustique-2026-09.webp` → aucune capture équivalente : à produire (D Kurd 10, Degrés & émotions) · `blog-partition-hallelujah-2026.webp` → aucune : à produire | `APP/audits/2026-10-22-videos-demo/mode-logique-muet.mp4` (poster `mode-logique-poster.webp`). Puis la 13 « Joue ce soir — Let It Be » quand elle sera prête. |
| apprendre-les-accords-handpan | 11/08 | ⛔🖼️ | L'article décrit l'ancien « mode guidé » du panneau Logique. Depuis, chaque accord a son bouton 🎓 et un écran dédié, « Apprendre cet accord » (#481, #487, #490, #515). Le commentaire « pas d'équivalent acoustique » est faux : le micro écoute un acoustique (#514). L'apprentissage existe aussi à deux handpans (#601). | `app-mode-guide-note-allumee-2026-09.webp` → aucune : à produire (écran 🎓 Apprendre cet accord, en acoustique ET sur Neotone) | `MED/03 …/A-JOUR-2026-10-22-sa-oeil1-muet.mp4` (poster `…-sa-oeil1-poster.webp`) |
| atlas-des-gammes-de-handpan | 06/07 | ✏️🖼️ | Le panneau « Découvrir d'autres gammes » sous « Mes handpans » n'existe plus. L'Atlas s'ouvre par le bouton « Atlas sonore › » de Découvrir, ou par le repère 🧭 Explorer du rail (#545, #557 ; visible sur R8). | `blog-atlas-destinations-2026-09.webp` → aucune Nuit : à produire. En attendant, `APP/audits/2026-10-22-videos-demo/sa-atlas-poster.webp` (nouvelle interface, mais thème Bleu, pas Nuit étoilée) · `blog-atlas-destinations-2026-vignette.webp` (couverture : cartes des destinations sur fond ancien) → à produire | `APP/audits/2026-10-22-videos-demo/sa-atlas-muet.mp4` |
| bibliotheque-musicale-handpan | 31/08 | ✏️🖼️ | « Cette sauvegarde en ligne fait partie de la version Studio » est faux : tout est sauvegardé, même en Gratuit (#422), y compris les duos et les réglages (#611, #618), et le Studio est « à venir » (#446). « 📓 Mes créations » s'appelle maintenant 📁 Ma bibliothèque (#442, #530). Nouveaux : filtres difficulté ⭐ et enchaînement (#507), pastille 🎙 « dans ta voix » (#598). Le compte « 156 » est passé à 157 (R1). | `app-bibliotheque-badges.webp` → **R1** · `app-bibliotheque-morceau-incompatible.webp` → aucune : à produire | — |
| completer-son-handpan-acoustique-avec-un-neotone | 31/08 | ✏️ (+ photo) | « Layout vocal » s'appelle maintenant « Dispositions d'accord » (#545). Ce qui manque : l'app demande « Que veux-tu faire avec ces deux handpans ? » (#604, #608), affiche « Accords à deux 0 → 16 » et charge elle-même la gamme complémentaire sur le Neotone (#601, #604). « Compléter » est devenu une pilule sous le nom du handpan (#557). | `showroom-instruments.webp` : photo, encore juste · **photo manquante** (commentaire dans l'article) → **R9** (`PHOTO-DAVID-acoustique-electronique-tablette-*.webp`, ou `MED/12 …/hybride-mag-neotone1-dessus-ipad.webp`). Le commentaire voulait idéalement un D Kurd 10 : choisir avec David. | `MED/07 …/ANIM-PHOTO-07-completer-dkurd-v2-720p.mp4` (poster `…-completer-dkurd-v2-image-fixe.png`) |
| creer-sa-gamme-de-handpan | 29/06 | ✏️🖼️ | La carte « Mon instrument » de Créer s'appelle « Une gamme » (#525). Les légendes décrivent l'ancien panneau de droite (#545, #557). | `app-creation-acoustique-2026-09.webp` → à produire (`APP/audits/2026-10-22-videos-demo/sa-creation-poster.webp` en attendant, thème Bleu) · `app-chromakeys-on-2026-09.webp` → à produire | `APP/audits/2026-10-22-videos-demo/sa-creation-muet.mp4` + lien YouTube existant `zWqXGlHb2wI` (créer ses gammes sur le Neotone) |
| deux-handpans-mode-hybride | 01/09 | ⛔🖼️ | Tout le « comment faire » est périmé. Fini les « deux cases à cocher dans le panneau de droite » et le bandeau 🌗 : il y a maintenant Mes handpans en plein écran, en cartes, avec 🤝 Mon duo et 🤝 Mes duos (#533, #535, #570, #611). L'app demande « Que veux-tu faire ? » (Tout jouer · Jouer un morceau · Compléter ma tonalité · Garder tel quel, #608). Il y a deux rangées d'accords (#608, #613), « ✕ Un seul handpan » (#463), et L'Étoile des 24 tonalités (#613). « Enregistrer durablement à deux = Studio » est faux (#422, #611). Vocabulaire à revoir : voir §4-E. | `app-deux-handpans-accord-a-cheval-2026-09.webp` → **R2**. Attention, R2 montre un Hybride (acoustique + Mutant) : pour le cas deux acoustiques, à produire (piste : `APP/audits/2026-10-22-duo-correctifs/parcours/aco-aco-apres-2-choix-rangees.png`, thème à contrôler). | `MED/08 …/ANIM-PHOTO-08-hybride-revele-v2-720p.mp4` + YouTube existant `Zp_zaqsRBCg` (Shape of My Heart sur deux Yishama) |
| diagrammes-accords-handpan-pdf | 19/08 | ✏️ | « La version Studio ajoute la sauvegarde cloud » est faux (#422, #446). Le jeu de cartes d'accords imprimable existe maintenant (#336, raccourci 🧰 Outils #600) : à citer. | 4 exports PDF (`blog-grille-accords-dkurd/-familles/-roue/-zoom.webp`) : pas d'interface autour, **à revérifier** contre un export actuel (#384, #387, #422 ont touché l'export) | — |
| editeur-de-melodies-handpan | 27/08 | ✏️🖼️ | « Seule la prise au vol par MIDI » est faux : on peut maintenant s'enregistrer au micro (#597, #499, #498). L'éditeur s'ouvre par Créer et 🧰 Outils, plus seulement par la Bibliothèque (#326, #600). Il dessine le vrai pan (#539), a la sélection et la quantification (#522), le batteur synchronisé (#595), et la Pluie de notes devient « Handpan Hero » (#600). | `app-editeur-melodies-timeline.webp` → aucune Nuit : à produire (piste : `APP/audits/2026-10-22-micro-original/3-transcrire-micro-ouvert.png`, éditeur derrière la fenêtre, thème à contrôler) | — |
| editeur-de-partition-handpan | 15/08 | ✏️🖼️ | « Studio = sauvegarde cloud » est faux (#422, #446). L'éditeur s'ouvre en plein écran (#414). « Adapter un morceau » arrive directement dans la partition (#368). Le filigrane se voit dès l'aperçu (#397). | `blog-partition-hallelujah-2026.webp` → aucune : à produire | — |
| etre-bien-dans-le-son-neotone | 16/07 | ✅ | — (matériel) | 2 schémas SVG : encore justes | — |
| exporter-ses-partitions-handpan | 07/08 | ✏️ | « Studio = sauvegarde cloud » est faux (#422, #446). | `app-partition-pdf-exporte.webp` (export PDF) → **à revérifier** | — |
| feedback-ameliorer-handpan-studio | 23/08 | ✏️🖼️ | Le chemin « menu d'aide › Un retour ? » a changé : il y a un bouton 🐞 « Signaler un bug » dans l'en-tête (#571, visible sur R6, R7, R8), et l'app joint maintenant le contexte (#472). Les deux « consultations ouvertes » de la légende (nom de l'app, tablatures) sont à revérifier. | `app-donner-mon-avis.webp` → à produire (fenêtre 🐞 actuelle). La capture `APP/audits/2026-10-22-fenetre-avis/captures/premiere-ordinateur-1440x900-nuit-etoilee.png` est la nouvelle fenêtre « Donne-moi ton avis » (questionnaire), une autre fonction : utile en complément, pas en remplacement. | — |
| handpan-emotions-degres | 10/07 | 🖼️ (+✏️ léger) | Le chemin a changé : Découvrir › Degrés & émotions (#607). En Découverte, les cartes parlent en émotions (#435). | `app-logique-2026-09.webp` → **R7** · `app-logique-degres-acoustique-2026-09.webp` → à produire (D Kurd 10, Degrés & émotions) | `APP/audits/2026-10-22-videos-demo/mode-logique-muet.mp4` (la vidéo YouTube `QV4Xe7zp4nM` est déjà intégrée) |
| handpan-par-les-couleurs | 15/06 | ✏️🖼️ | Les légendes parlent de l'« onglet Création » (#447, #525). **Incohérence interne, sans lien avec une nouveauté** : le texte dit que « les sept degrés reçoivent sept couleurs », la légende que « un do est rouge ». Les deux lectures existent : renvoyer vers « Les deux visions ChromaKeys ». | `app-chromakeys-on-2026-09.webp`, `app-creation-acoustique-2026-09.webp` (les mêmes que creer-sa-gamme) → à produire | `MED/01 …/A-JOUR-2026-10-22-sa-couleur-muet.mp4` (poster `…-sa-couleur-poster.webp`) |
| handpan-studio-mode-acoustique | 14/07 | ⛔🖼️ | La section « Ce qui a changé depuis » est elle-même périmée. Le panneau de droite est devenu un rail (#545, #557). On ne « coche » plus ses handpans (#533). Compléter est une pilule (#557). L'Atelier d'accords s'ouvre dans un panneau à 3 onglets (#456, #469). « La sauvegarde relève du Studio » est faux (#422). | `app-acoustique.jpg` (très ancien : onglets Logique · Gammes · Création) → **R6** · `blog-bottom-coques.webp`, `blog-bottom-etoile.webp` → à produire, après avoir vérifié que le choix Étoile / 2 coques existe encore (#593 dessine les notes du dessous « sur un seul dessin » à l'écoute au micro) | `MED/02 …/ANIM-02-ecoute-micro-720p.mp4` (si on y parle de l'écoute de sa gamme) |
| jam-rapide-accompagner-un-musicien | 16/09 | ⛔🖼️ | La section « La fiche Voir la gamme… la coque Neotone se choisit toute seule » est fausse depuis le #402 : le Jam rapide pose les accords sur TON instrument chargé, sans en inventer un. Le moteur de transposition est maintenant commun (#406). Accès : ▶ Jouer › ⚡ Jam rapide (#430). La légende parle de « Mes accompagnements », l'écran de « Mes morceaux ». | `app-jam-rapide-saisie.webp`, `app-jam-rapide-deduction.webp`, `app-jam-rapide-etape3-recap.webp` → à produire · `app-jam-rapide-voir-la-gamme.webp` → à **retirer** (l'état décrit n'existe plus, #402) | — |
| jouer-avec-un-batteur-handpan | 01/09 | ✏️🖼️ | Nouveaux kits : « Doux » par défaut, Acoustique, Électro (#491) ; Trap 808, Boom bap, House, Lo-fi et 7 rythmes (#494) ; Acoustique réel (#497). Le batteur suit la mélodie sur une seule horloge (#595). Le décompte « 41 grooves, 8 familles » est à recompter dans l'app. | `app-tiroir-batteur.webp` → aucune : à produire | — |
| jouer-et-chanter-au-casque-neotone | 03/08 | ✅ | — (matériel) | `neotone-hero-david.webp` : photo, encore juste | Lien YouTube existant à ajouter : `KNQc6jCs0VE` (Amara au Neotone, avec la voix) |
| la-carte-des-joueurs | 01/09 | ⛔🖼️ | **La thèse centrale est fausse.** L'article dit « Tu n'apparais pas tant que tu n'allumes pas l'interrupteur ». Depuis le #612 : « en acceptant les conditions d'utilisation, chaque joueuse et chaque joueur apparaît » (prénom, initiale du nom, pays). Seule option : le nom de famille entier. Ajouts : l'onglet 🎵 Musiciens avec un compteur anonyme par pays (#609), et 541 fabricants (carte des outils). Le paragraphe « Ce soir… une étoile » est daté. | `blog-carte-joueurs-maquette.webp` (maquette fictive) → **R4** + **R5** · les deux iframes `/prototypes/constellation-joueurs-*.html` (données fictives, ancienne règle) → à retirer ou à refaire | — |
| layouts-vocaux-handpan | 22/07 | ⛔🖼️ | « Layout vocal » s'appelle maintenant « Dispositions d'accord » (#545). Le réglage est sur chaque carte (« Profond ▾ »), et la Découverte le nomme 🌑 Grave · ☀️ Clair · 🌈 Large (#559). La phrase « en acoustique, pas de sélecteur » est **à vérifier** : le #559 montre le même panneau en « Accords ». Le titre et le slug portent l'ancien nom. | `app-layout-vocal.webp` → aucune : à produire (rail 🎛 Dispositions & Logique, et la puce d'une carte) | — |
| le-capo-du-handpan | 01/10 | ✏️🖼️ | Le paragraphe Neotone¹ et le commentaire CK2-07 (« basculer vers Neotone¹ ne change rien ») sont dépassés : le Neotone¹ a sa Logique (Pop 4, Pop 5, 7 degrés, Basses magiques, #424, #555). « Layouts vocaux » (#545). « Tester une autre tonalité » est devenu 🧰 Outils › Écouter ma gamme dans une autre tonalité (#600) et L'Étoile des 24 tonalités (#613). La « palette d'outils, section Notation » est dans 🎨 Affichage (R8). Le commentaire CK2-04 (« pas de morceau → progression ») est peut-être levé par #450 et #477 : à vérifier. | `blog-capo-2026-01-mutant-logique.webp` → **R7** (recadrée) · `blog-capo-2026-03-degre-V-cote-a-cote.webp`, `blog-capo-2026-09-grille-3-tonalites-v2.webp`, `blog-capo-2026-10-sans-noms-ordre-mains.webp`, `blog-capo-2026-08-roue-tonalite-v2.webp` → à produire · `blog-capo-2026-guitare-capo-v3.svg` : encore juste | `APP/audits/2026-10-22-videos-demo/sa-transposer-muet.mp4` (nouvelle interface, thème Bleu : à refaire en Nuit pour YouTube) |
| les-4-accords-magiques-handpan | 26/07 | ✏️ | « Layout vocal » (#545). À ajouter : sur le Neotone¹, le layout « Pop 4 » est fait pour ces 4 accords (#555). | `blog-grille-accords-familles.webp` (export PDF) → **à revérifier** | — |
| les-constellations-du-handpan | 02/07 | 🖼️ (+✏️ léger) | Le chemin « la palette, sous Constellation » est devenu 🎨 Affichage › Constellation (R8). | `blog-constellations-2026-trio-acoustique-v2.webp`, `blog-constellations-2026-trio-electronique-v2.webp` → à produire · `blog-constellations-2026-couverture.webp` (le pan seul) : encore juste | `MED/03 …/A-JOUR-2026-10-22-sa-styles-muet.mp4` + `MED/01 …/ANIM-PHOTO-01-mag-3-constellations-grand-ipad-720p.mp4` |
| les-deux-visions-chromakeys | 24/09 | ✏️🖼️ | « En haut de l'écran, la bande d'outils… un îlot » : l'îlot est maintenant dans le menu 🎨 Affichage (R8, et la vidéo sa-couleur). Les mots « en Gammes, dans Mon instrument » sont à changer (#447, #525). Le mode « Chanter & Jouer » est devenu le menu « Chanter » (#447). | 14 paires montrent l'îlot en ancien style cyan : `…-01-ouverture-paire`, `-03-note-re-paire`, `-07-niveaux-acoustique`, `-07-niveaux-electronique-v7`, `-09-note-place-acoustique-v6`, `-09-note-place-electronique-v7`, `-10-partagees-acoustique-v6`, `-10-partagees-electronique-v6`, `-11-oeil-acoustique-v6`, `-11-oeil-electronique-v7`, `-13-note-place-18-notes-v7`, `-14-off-on-18-notes`, `-14-off-on-acoustique`, `-14-off-on-electronique` → à produire (les pans eux-mêmes sont encore justes : **priorité basse**) · `-00-couverture-18-notes` et `-12-arc-en-ciel` : encore justes | `MED/01 …/A-JOUR-2026-10-22-sa-couleur-muet.mp4` (la vidéo YouTube `QV4Xe7zp4nM` est déjà là) |
| les-trois-mineurs-handpan | 12/09 | ✏️🖼️ | Le Neotone¹ a maintenant aussi les nuances : harmonique, 1 note change ; mélodique, 3 (#555). Les nuances ne sont plus dans le panneau « Logique et Émotions » : elles sont dans le rail 🎛 Dispositions & Logique (#545). | `app-triste-trois-mineurs-naturel-2026-09.webp`, `app-triste-trois-mineurs-harmonique-2026-09.webp` → à produire | — |
| mes-handpans-une-seule-porte | 01/09 | ⛔🖼️ | Le mode d'emploi entier est faux. Mes handpans est en plein écran, en cartes, avec 🤝 Mon duo et Mes duos, « ▶ Jouer le duo », un bois par handpan (#533, #535, #570, #611). Le panneau de droite n'existe plus sous cette forme (#545, #557). « Sauvegarde Studio, en Découverte tout reste sur la machine » est faux (#422, #611). « La reconnaissance de gamme au micro n'existe pas encore » est faux (#592, #593). | `blog-mes-handpans-duo-2026-09.webp`, `blog-mes-handpans-electronique-2026-09.webp` → à produire (piste : `APP/audits/2026-10-22-mes-duos-synchro/01-mac-mes-duos.png`, fenêtre Mes handpans + Mes duos, thème à contrôler) | — |
| neotone-10-ou-19-notes | 22/09 | ⛔ (à arbitrer) | « Le Neotone¹ à 10 notes n'a pas les sept degrés » (ta citation) et la ligne « Les 7 degrés en majeur et en mineur : Mutant seul » sont contredits par l'app : « les 7 accords sont jouables » sur le Neotone¹ (#424), avec le layout « 7 degrés (T1, triades) » (#555). La charte (§4) accepte un fait d'instrument donné par David : **c'est à toi de trancher** (§4-D). Le lien « layouts vocaux » est aussi à renommer (#545). | `blog-capo-2026-01-mutant-logique.webp` → **R7** · 2 schémas SVG : encore justes | `MED/07 …/ANIM-PHOTO-07-neotone1-hetre-grand-ipad-720p.mp4` + `MED/07 …/ANIM-PHOTO-07-neotone-mutant-grand-ipad-720p.mp4`, en paire côte à côte |
| pourquoi-handpan-electronique | 22/06 | 🖼️ | — (le texte parle de l'instrument) | `app-midi-mapping-2026.webp` (ancien en-tête avec Logique · Gammes · Création · Midi connect) → aucune : à produire (Midi connect actuel) · `neotone-hero-david.webp` : photo, encore juste | `MED/07 …/ANIM-PHOTO-07-neotone-mutant-mode-logique-couleur-degre-grand-ipad-720p.mp4` |
| quel-casque-choisir-neotone | 19/07 | ✅ | — (matériel) | Photos produits et `blog-casque-neotone.webp` : encore justes | YouTube existant `rx8ZZcL7Nog` (un studio dans ma poche) |
| reveler-les-accords-de-ton-handpan | 01/09 | ✏️🖼️ | Le chemin a changé : l'Atelier d'accords s'ouvre dans un panneau à droite (#456, #469). Révéler marche aussi avec un Neotone (#533) et montre les vrais instruments (#601). « Décrit en mode acoustique seulement » est donc à nuancer. Les chiffres « 197 / 156 / 41 » sont à recompter (157 sur R1). D'après la carte des outils, Révéler est encore 🧪 Expérimental : le ton de l'article (« Révéler est jeune ») reste juste. | `blog-reveler-dkurd10-ciel.webp` → aucune : à produire | — |
| setup-nomade-neotone-bose-s1 | 17/07 | ✅ | — (matériel) | Photos : encore justes | — |
| ta-partition-prend-vie | 20/09 | ✏️🖼️ | « Exports sans accès Studio » : le premier forfait payant s'appelle « Essentiel » (#404, #446), et le Studio est « à venir » (#446). « ⇣ Défiler au tempo » est réservé à Essentiel (#427). L'éditeur s'ouvre en plein écran (#414). Le Pupitre s'ouvre aussi par ▶ Jouer (#430). | `app-partition-lecteur-en-marche.webp`, `app-partition-diagramme-illumine.webp`, `app-partition-badge-repetitions.webp`, `app-partition-metrique-titre.webp`, `app-pupitre-plein-ecran-tablette.webp`, `blog-partition-prend-vie-couverture.webp` → à produire · `app-partition-pdf-exporte.webp`, `app-partition-filigrane-version-gratuite.webp` (exports PDF) → **à revérifier** | 13 « Joue ce soir — Let It Be », quand elle sera prête |
| transposer-pour-chanter-handpan | 30/07 | ✏️🖼️ | « Layout vocal » (#545). Absent : le passeport vocal propose maintenant la bonne tonalité pour chaque chanson (#598), et la règle même un Neotone (#603). « Transposer » change la partition sur place (#460). La roue s'appelle L'Étoile des 24 tonalités (#613), et il y a un raccourci dans Outils (#600). | `app-atlas.webp` (ancien en-tête Logique · Gammes · Création · Midi connect) → à produire (piste : `APP/audits/2026-10-22-tonalite-voix/acou-dkurd-soprano-musicien-bureau.png`, fiche « Let It Be » « un peu basse pour ta voix », mais thème ancien : à refaire en Nuit) | `APP/audits/2026-10-22-videos-demo/sa-transposer-muet.mp4`, puis 13 « Trouver ma voix » |

**Compte par état** (état principal) :
- ✅ **4** : etre-bien, jouer-et-chanter-au-casque, quel-casque, setup-nomade.
- ⛔ **8** : apprendre-les-accords, deux-handpans-mode-hybride, handpan-studio-mode-acoustique, jam-rapide, la-carte-des-joueurs, layouts-vocaux, mes-handpans-une-seule-porte, neotone-10-ou-19-notes.
- ✏️ **19**, presque tous avec des captures obsolètes en plus.
- 🖼️ seul **3** : handpan-emotions-degres, les-constellations-du-handpan, pourquoi-handpan-electronique.

**Images** :
- **59** captures d'interface obsolètes (fichiers uniques ; certaines servent à 2 articles).
- **7** exports PDF à revérifier.
- **1** photo manquante, maintenant disponible (R9).
- **1** capture à retirer (`app-jam-rapide-voir-la-gamme.webp`).
- Remplacement direct possible pour **8** captures (R1 à R8) ; les **~51** autres sont à produire.
- Toutes les images d'interface datent du 06/09 au 10/09. Elles sont donc antérieures à la nouvelle interface (#447, 15/10) et au thème Nuit étoilée (#610, 22/10).

**Version EN** : chaque `-en.md` utilise exactement les mêmes images que sa version FR (vérifié fichier par fichier). Il porte les mêmes erreurs : les corrections de texte passent par la session Traduction (charte §6).

---

## 2. Les 14 thèmes du brief : couverture actuelle

L'état vient de la carte des outils : 🟢 Solide · 🟡 Partiel · 🧪 Expérimental.

| # | Thème (nouveautés) | Article existant ? | État dans l'app | Médias à jour |
|---|---|---|---|---|
| 1 | Deux handpans / Hybride / Mes duos (#601, #604, #608, #611, #613, #589) | **Partiellement, et faux** : deux-handpans-mode-hybride, mes-handpans-une-seule-porte, completer-son-handpan… | 🟢 « Vue Hybride » · 🟡 conseiller « quel deuxième handpan » (base de morceaux courte) · Multi-handpans 🟡 bêta | R2, R3 · vidéos `MED/08 …/ANIM-PHOTO-08-hybride-revele-v2-720p.mp4`, `MED/07 …/ANIM-PHOTO-07-completer-dkurd-v2-720p.mp4`, `MED/08 …/ANIM-PHOTO-08-duo-neotone-grand-ipad-720p.mp4` · 13 (en cours) : duo en 3 temps, les 4 duos · captures non Nuit à contrôler : `APP/audits/2026-10-22-duo-accords/`, `-duo-lot3/`, `-mes-duos-synchro/` |
| 2 | Chaque chanson dans ta voix, Hallelujah Lab (#598, #603) | **Non**. transposer-pour-chanter et layouts-vocaux en parlent à côté | 🟡 « Aide-moi à trouver ma voix » (barème calé sur peu de voix) | `APP/audits/2026-10-22-tonalite-voix/` (50 captures, ancien style : à refaire en Nuit) · 13 « Trouver ma voix » (en cours) |
| 3 | Mes notes en couleur, en direct (#599) | **Non** | 🟡 (MIDI exact ; micro en bêta) | `APP/audits/2026-10-22-notes-en-direct/desktop-2-midi-accord.png` et 13 autres (style doré, à contrôler) |
| 4 | Reconnaître ma gamme au micro (#592, #593) | **Non** (mes-handpans dit même « n'existe pas encore ») | 🟡 (le taux de reconnaissance n'a jamais été mesuré : « à ne pas citer comme un chiffre ») | 5 captures `MED/02 …/A-JOUR-2026-10-22-NUIT-ecoute-1…5-*.png` · vidéo `MED/02 …/ANIM-02-ecoute-micro-720p.mp4` |
| 5 | Catalogue des coques + Espace fabricant (#614) | **Non** | 🟡 | `APP/audits/2026-10-22-catalogue-coques/captures/` (15 captures, dont `01-sans-0223-catalogue-cyclope.png`, `12-choix-instrument-coque-validee.png`, `14-espace-fabricant.png`) |
| 6 | 13 raccourcis dans Outils + Handpan Hero (#600) | **Non** (editeur-de-melodies parle de la Pluie) | Raccourcis 🟢 · Pluie / Handpan Hero 🧪 | `APP/audits/2026-10-22-raccourcis/` (62 captures, en-tête « Apprendre · Transmettre », donc d'avant le #607 : à refaire) |
| 7 | Mon rituel et Ma progression (#607) | **Non** | Pas de fiche « rituel » dans la carte des outils. Les fiches voisines (cours, élève) sont 🟡. | `APP/audits/2026-10-22-apprentissage-rituel/apres-bureau-apprendre-avec-rituel.png`, `apres-bureau-outils-progression.png` (Nuit, regardées) |
| 8 | Apprendre · Transmettre, fiches élèves (#594, #596) | **Non** | 🟡 Mode Enseignant (liaison agenda pas encore active) | `APP/audits/2026-10-22-transmettre/` (20 captures, ancien style cyan : à refaire) |
| 9 | Transcrire mon jeu au micro + jouer avec l'original (#597) | **Non** (editeur-de-melodies dit « MIDI seulement ») | 🟡 les deux | `APP/audits/2026-10-22-micro-original/` (10 captures, thème à contrôler) |
| 10 | Constellation des joueurs, onglet Musiciens (#609, #612) | **Oui, mais faux** : la-carte-des-joueurs | 🟢 | R4, R5, + `MED/10 …/A-JOUR-2026-10-22-NUIT-constellation-carte-seule.png`, `…-constellation-musiciens-carte-seule.png` |
| 11 | Neotone Drum (#563…#586) + Neotone Connexion avec un 2ᵉ Neotone (#588, #589) | **Non** | Neotone Drum 🟡 bêta (bêta-testeurs) · Midi connect 🟡 (pas d'iPad ni d'iPhone) | `APP/audits/2026-10-21-neotone-drum/` (53 captures, d'avant le thème Nuit) · `APP/audits/2026-10-21-deux-neotone/` |
| 12 | Reprendre là où j'en étais (#591) | **Non** | 🟢 (réglages de confort) | Pas de capture identifiée : à produire |
| 13 | Ciel Constellation, réglages synchronisés, icônes dorées, Nuit étoilée (#610, #615, #617, #618) | **Non** | 🟢 | `APP/audits/2026-10-22-icones-dorees/captures/` (dorées / émojis, Nuit / clair), `APP/audits/2026-10-22-constellation-synchro/` (ciel, logo, synchro Mac→iPad), `APP/audits/2026-10-22-pictos-menu/` |
| 14 | Polyrythmes, inspiré de Mathémusique (#556) | **Non** | 🟡 bêta, pour tous (manquent : nombre de pas par anneau, export MIDI, swing, micro) | `APP/audits/2026-10-21-polyrythme/bureau-1440-3contre2.png` · `APP/audits/2026-10-22-credit-mathemusique/polyrythmes-credit-desktop.png` (crédit visible dans l'app) |

**Bilan** : 11 thèmes sans aucun article. 3 ont un article, mais faux (1, 10, et 4 par la phrase de mes-handpans).

---

## 3. Ordre de publication proposé (un article par mise à jour)

Principe : d'abord ce qui est stable et a des médias prêts. Les bêtas sont dites bêtas dès la première phrase, avec leurs limites telles que la carte des outils les écrit.

| Ordre | Titre provisoire | Requête visée FR / EN | Nouveautés couvertes | Statut, médias |
|---|---|---|---|---|
| 1 | **Deux handpans : que veux-tu en faire ?** | « jouer deux handpans ensemble » / « play two handpans together » | #601, #604, #608, #611, #613 (et #589 en encadré pour deux Neotone) | 🟢. Vidéos 08 et 07 prêtes, R2, R3. Remplace la partie périmée de deux-handpans-mode-hybride (§4-A). |
| 2 | **La constellation des joueurs : tout le monde a son étoile** (réécriture de la-carte-des-joueurs, même slug) | « carte des joueurs de handpan » / « handpan players map » | #609, #612 | 🟢. R4, R5. Une réécriture compte comme la publication de cette mise à jour. |
| 3 | **Quelle est la gamme de mon handpan ? L'app l'écoute au micro** | « reconnaître gamme handpan » / « identify handpan scale » | #592, #593 | 🟡. Vidéo 02 + 5 captures Nuit. Ne citer aucun taux de réussite (carte des outils). |
| 4 | **Une nouvelle robe pour l'app : Nuit étoilée, icônes dorées, réglages qui te suivent** | « application handpan » / « handpan app » | #610, #615, #617, #618, #591 | 🟢. Captures icônes-dorées, constellation-synchro. Explique aussi pourquoi toutes les captures du blog changent. |
| 5 | **Le catalogue des coques : chaque handpan à sa vraie place, validé par son fabricant** | « catalogue gammes handpan fabricants » / « handpan scale catalog makers » | #614 | 🟡. Captures catalogue-coques. L'Espace fabricant est « sur invitation ». |
| 6 | **Chaque chanson dans ta voix** | « handpan tonalité pour ma voix » / « handpan key for my voice » | #598, #603 | 🟡 (barème vocal calé sur peu de voix). Attendre la vidéo 13 « Trouver ma voix » et des captures Nuit. |
| 7 | **Vois tes notes s'allumer pendant que tu joues** | « voir les notes jouées handpan » / « see notes you play handpan » | #599 | 🟡. Le MIDI est exact, le micro est en bêta : à dire. Utile pour se filmer. |
| 8 | **Transcrire ce que tu joues au micro, et jouer avec l'original** | « transcrire handpan partition » / « transcribe handpan to notes » | #597 | 🟡. Captures micro-original. Corrige editeur-de-melodies au passage. |
| 9 | **Ton rituel de pratique et ta progression, en un clic** | « routine pratique handpan » / « handpan practice routine » | #607 | Captures apprentissage-rituel (Nuit). |
| 10 | **Professeur de handpan : l'onglet Transmettre** | « logiciel professeur handpan » / « handpan teacher app » | #594, #596 | 🟡 (agenda pas encore relié). Captures à refaire en Nuit. Public prof : ta cible prioritaire. |
| 11 | **Polyrythmes au handpan : le cercle rythmique** (bêta) | « polyrythme 3 contre 2 handpan » / « handpan polyrhythm 3 against 2 » | #556 | 🟡 bêta. **Crédit obligatoire** dans le texte et en légende : Mathémusique, mathemusique.fr, chaîne YouTube @mathemusique (déjà affiché dans l'app : capture credit-mathemusique). Dire ce qui manque encore. |
| 12 | **Neotone Drum : ton Neotone devient une batterie** (bêta) | « Neotone drum pad » / « Neotone drum pads » | #563, #566, #575, #582, #584, #585, #586 (+ #588, #589 en encadré) | 🟡 bêta, réservé aux bêta-testeurs : à dire en première ligne. Captures à refaire en Nuit. |

**Sans article dédié**, à fondre dans d'autres articles :
- **13 raccourcis Outils / Handpan Hero (#600)** : la Pluie est 🧪 Expérimental, elle se mentionne dans l'article 8 et dans editeur-de-melodies.
- **« Reprendre là où j'en étais » (#591)** : dans l'article 4.

---

## 4. Plan de correction groupé (pour un agent qui corrige par lots)

### Lot A — réécritures ⛔ (une à la fois, relecteur distinct, captures neuves)
- **la-carte-des-joueurs** : nouvelle règle (#612), onglet Musiciens (#609), R4 et R5. Retirer ou refaire la maquette et les deux iframes fictives.
- **mes-handpans-une-seule-porte** : nouveau parcours Mes handpans / Mon duo / Mes duos. Supprimer « n'existe pas encore » pour le micro (renvoyer vers l'article 3).
- **deux-handpans-mode-hybride** : à fondre avec le nouvel article 1, ou à rediriger vers lui. Garder ce qui reste vrai (« il manque toujours une note »).
- **handpan-studio-mode-acoustique** : réécrire la section « Ce qui a changé depuis » d'après le rail (#545, #557).
- **apprendre-les-accords-handpan** : décrire l'écran 🎓 Apprendre cet accord (#487, #490, #515, #514).
- **jam-rapide** : retirer la section « Voir la gamme » (#402) et sa capture.
- **layouts-vocaux** : renommer en « Dispositions d'accord » (#545, #559). Le titre et le slug sont aussi à revoir (redirection à prévoir). Vérifier ce qui existe en acoustique.

### Lot B — la phrase « Studio » (remplacement mécanique, 8 articles)
« La version Studio ajoute la sauvegarde cloud » (et ses variantes) devient « tout ce que tu crées est sauvegardé sur ton compte, quel que soit ton palier » (#422). Dans ta-partition, « sans accès Studio » devient « sur un compte gratuit » (#404, #446).

Articles : bibliotheque-musicale, diagrammes-accords, editeur-de-partition, exporter-ses-partitions, handpan-studio-mode-acoustique, deux-handpans-mode-hybride, mes-handpans-une-seule-porte, ta-partition-prend-vie (et editeur-de-melodies : « fera partie du Studio » est à vérifier dans la matrice des paliers).

### Lot C — noms et chemins (rechercher / remplacer guidé, 12 articles)
- « Layout vocal » → « Dispositions d'accord » (#545) : completer, layouts-vocaux, le-capo, les-4-accords, neotone-10-ou-19, transposer.
- « Mes créations » → « Ma bibliothèque » (#442, #530) : bibliotheque-musicale.
- « carte Mon instrument de Créer » → « Une gamme » (#525) : creer-sa-gamme, les-deux-visions.
- « Mode Logique (barre du haut) » → « Découvrir › Degrés & émotions » (#447, #607) : accompagner, handpan-emotions-degres, les-trois-mineurs, le-capo.
- « palette / bande d'outils » → « menu 🎨 Affichage » (R8) : les-constellations, les-deux-visions, le-capo.
- « panneau Logique et Émotions » → « rail 🎛 Dispositions & Logique » (#545) : les-trois-mineurs, accompagner.
- « Tester une autre tonalité » / « roue de tonalité » → « Écouter ma gamme dans une autre tonalité » (#600) et « L'Étoile des 24 tonalités » (#613) : le-capo, transposer, deux-handpans.
- « menu d'aide › Un retour ? » → « 🐞 Signaler un bug » (#571) : feedback.
- « Chanter & Jouer » → menu « Chanter » (#447) : les-deux-visions.

### Lot D — faits produit à mettre à jour (paragraphes courts)
- Neotone¹ et Logique (#424, #555) : le-capo, les-trois-mineurs, les-4-accords. **Pour neotone-10-ou-19-notes, attendre ta décision** : ta citation contredit l'app (voir la question 7 du résumé).
- Éditeur de mélodies, micro et nouveaux outils (#597, #522, #539, #595, #600).
- Batteur, nouveaux kits (#491, #494, #497, #595).
- Révéler, nouveau chemin et Neotone (#456, #469, #533, #601). Chiffres du répertoire à recompter.
- Bibliothèque : filtres (#507) et pastille voix (#598).
- Completer : « Que veux-tu faire ? » et chargement de la gamme sur le Neotone (#601, #604, #608) ; poser la photo R9.

### Lot E — vocabulaire « Hybride » (question de charte, pas de nouveauté)
La charte (§3, 21/09) réserve « mode Hybride » au futur mode acoustique + électronique. Ce mode existe maintenant : « Hybride généré » (#608) et « Vue Hybride » dans la carte des outils. Le slug `deux-handpans-mode-hybride` parle pourtant surtout de deux acoustiques. À mettre à jour dans la charte et à appliquer au slug : ta décision.

### Lot F — captures (par écran, pour produire en série sur le banc)
**Environ 51 captures à produire**, en Nuit étoilée, au même cadrage que l'ancienne quand il y a une comparaison côte à côte (charte §5) :

| Écran | Nombre | Articles |
|---|---|---|
| Degrés & émotions, acoustique + Mutant | ~6 | accompagner ×2, emotions, capo-01, neotone-10-19, trois-mineurs ×2 |
| ChromaKeys dans 🎨 Affichage, paires acoustique / électronique | 14 | deux-visions (priorité basse : les pans restent justes) |
| Création « Une gamme » | 2 | creer, couleurs |
| Constellation : trios | 2 | constellations |
| Capo : comparaisons | 4 | le-capo |
| Partition, Pupitre, lecteur | 7 | ta-partition ×6, editeur-de-partition (Hallelujah, aussi dans accompagner) |
| Jam rapide | 3 | jam-rapide |
| Mes handpans / Mes duos | 2 | mes-handpans |
| Écrans isolés | 11 | apprendre (1), atlas (2), bibliothèque-incompatible (1), éditeur de mélodies (1), batteur (1), dispositions d'accord (1), Midi connect (1), Révéler (1), transposer (1), feedback (1) |

Plus 2 captures « notes du dessous », après vérification de l'option.

**Avant tout remplacement** : refaire un export PDF actuel et le comparer aux 7 exports du blog.

**Règle de nommage** : nouveaux fichiers en `…-2026-10.webp`, sans écraser les anciens (David garde toutes les étapes pour le storytelling).

---

## 5. Vidéos à intégrer et à mettre sur YouTube

### 5.1 Ce qui existe, et la contrainte des textes incrustés
- **Démos d'écran « nouvelle interface + son »** : `APP/audits/2026-10-22-videos-demo/` (`mode-logique`, `sa-couleur`, `sa-oeil1`, `sa-styles`, `sa-transposer`, `sa-atlas`, `sa-creation`, en `-son.mp4`, `-muet.mp4` et `-poster.webp`, 1920×1080).
  - ⚠️ D'après leur `NOTES.md` et les posters regardés, elles sont tournées en **thème « sombre » (aujourd'hui 🔵 Bleu)**, avec l'en-tête « Apprendre · Transmettre » d'avant le #607. Ce n'est **pas Nuit étoilée**.
  - Elles conviennent en fond muet. Pour YouTube, mieux vaut les retourner en Nuit étoilée.
- **Animations photo + tablette** : `MED/01`, `02`, `07`, `08`, en 720p et 1080p, avec ou sans son, plus une image fixe pour l'aperçu. Elles montrent l'app en Nuit étoilée (posters regardés).
  - ⚠️ Elles portent du **texte français incrusté** (« Ré majeur · seulement à deux », « 2. Même la note cyclope », « Polygone — la forme de l'accord »).
  - Elles vont aux articles FR. Pour les articles EN, il faudra une version sans texte ou une version anglaise (charte §5, « jamais de texte incrusté »).
- **Dossier 13** (duo en 3 temps, 4 duos, Neotone compatible, « Joue ce soir » avec Let It Be, 3 niveaux, Trouver ma voix) : **n'existe pas encore**. `APP/audits/2026-10-22-video-joue-ce-soir/` et `-video-nouveautes/` sont vides.
- Le site n'a pas encore de dossier vidéo (`public/` ne contient que `images/` et `prototypes/`). Les MP4 720p muets pèsent de 0,5 à 5,5 Mo, ce qui reste raisonnable.

### 5.2 Vidéos à mettre sur YouTube

En attendant le lien YouTube, l'article héberge le MP4 720p muet, en boucle, avec son image d'aperçu. À la mise en ligne YouTube, on remplace par le lecteur léger déjà utilisé sur le blog (`yt-lite`).

| # | Fichier source (version avec son, pour YouTube) | Durée | Titre YouTube proposé (mot-clé en tête) | Article qui l'intègre |
|---|---|---|---|---|
| 1 | `MED/08 …/ANIM-PHOTO-08-hybride-revele-v2-1080p-son.mp4` | 70 s | « Jouer deux handpans ensemble : un acoustique + un Neotone, les accords à deux » | Nouvel article 1 + deux-handpans-mode-hybride |
| 2 | `MED/07 …/ANIM-PHOTO-07-completer-dkurd-v2-1080p-son.mp4` | 56 s | « Compléter un D Kurd avec un handpan électronique : de 2 à 24 tonalités » | completer-son-handpan-acoustique-avec-un-neotone |
| 3 | `MED/02 …/ANIM-02-ecoute-micro-1080p-son.mp4` (à vérifier : seule la version 720p est confirmée dans la liste) | 25 s | « Reconnaître la gamme de son handpan au micro » | Nouvel article 3 |
| 4 | `MED/01 …/ANIM-PHOTO-01-mag-mode-logique-couleur-degre-grand-ipad-1080p-son.mp4` | 30 s | « Les 7 accords d'un handpan en couleurs : le Mode Logique » | handpan-emotions-degres, accompagner-des-chansons |
| 5 | `MED/01 …/ANIM-PHOTO-01-mag-3-constellations-grand-ipad-1080p-son.mp4` | 13 s (format Short) | « 3 façons de dessiner un accord de handpan » | les-constellations-du-handpan |
| 6 | `MED/07 …/ANIM-PHOTO-07-neotone-mutant-mode-logique-couleur-degre-grand-ipad-1080p-son.mp4` | 30 s | « Neotone Mutant : les 7 degrés en couleurs sur un handpan électronique » | pourquoi-handpan-electronique, neotone-10-ou-19-notes |
| 7 | `MED/07 …/ANIM-PHOTO-07-neotone1-hetre-grand-ipad-1080p-son.mp4` | 9 s (Short) | « Neotone¹ 10 notes dans l'app Handpan Constellation Studio » | neotone-10-ou-19-notes (côte à côte avec la 6) |
| 8 | `APP/audits/2026-10-22-videos-demo/sa-transposer-son.mp4` (à retourner en Nuit) | 17 s | « Le capo du handpan : la même forme d'accord dans toutes les tonalités » | le-capo-du-handpan, transposer-pour-chanter |
| 9 | `MED/01 …/A-JOUR-2026-10-22-sa-couleur-son.mp4` (à retourner en Nuit) | 21 s | « ChromaKeys : une couleur par note sur ton handpan » | handpan-par-les-couleurs, les-deux-visions-chromakeys |
| 10 | `MED/03 …/A-JOUR-2026-10-22-sa-styles-son.mp4` (à retourner en Nuit) | 18 s | « Polygone, Ouvert, Mains : voir un accord de handpan » | les-constellations-du-handpan |
| 11 | `APP/audits/2026-10-22-videos-demo/sa-atlas-son.mp4` (à retourner en Nuit) | 20 s | « L'Atlas des gammes de handpan : écouter avant de choisir » | atlas-des-gammes-de-handpan |
| 12 | `APP/audits/2026-10-22-videos-demo/sa-creation-son.mp4` (à retourner en Nuit) | 22 s | « Créer sa gamme de handpan en 20 secondes » | creer-sa-gamme-de-handpan |
| 13 | `MED/03 …/A-JOUR-2026-10-22-sa-oeil1-son.mp4` (à retourner en Nuit) | 15 s | « Apprendre un accord de handpan : l'œil et la constellation » | apprendre-les-accords-handpan |
| 14 | Dossier 13 (en production) : « Joue ce soir — Let It Be », « Trouver ma voix », « Les 4 duos », « 3 niveaux » | — | « Jouer Let It Be au handpan ce soir » · « Trouver la tonalité de sa voix au handpan » · « 4 façons de jouer deux handpans » | ta-partition-prend-vie / accompagner · nouvel article 6 · nouvel article 1 |

### 5.3 Liens YouTube déjà en ligne, à ajouter là où ils manquent
Ils viennent des fichiers `LIENS-YOUTUBE.md` des dossiers 01, 03, 08 et 09.

| Vidéo | Article(s) |
|---|---|
| `Zp_zaqsRBCg` (Shape of My Heart, deux Yishama) | deux-handpans, nouvel article 1 |
| `zWqXGlHb2wI` (créer ses gammes sur le Neotone) | creer-sa-gamme |
| `KNQc6jCs0VE` (Amara au Neotone, avec la voix) | jouer-et-chanter-au-casque, nouvel article 6 |
| `rx8ZZcL7Nog` (un studio dans ma poche) | quel-casque, jouer-et-chanter-au-casque |
| `s1lFN3PDEnA` (pourquoi je joue debout, Atlas et Yishama) | setup-nomade, ou un futur article sur les pieds |

`QV4Xe7zp4nM` est déjà intégrée dans 4 articles.

---

## 6. Ce que ce rapport ne fait pas

- Aucune capture neuve n'a été produite, et aucun article n'a été modifié.
- Les captures marquées « thème à contrôler » ou « à vérifier » ont été repérées par leur dossier ; seules R1 à R9 ont été regardées et validées comme Nuit étoilée.
- Plusieurs points demandent un contrôle dans l'app avant correction, et ne sont pas présentés comme faux :
  - le sélecteur de dispositions en acoustique ;
  - l'affichage Étoile / 2 coques ;
  - les « consultations » de la fenêtre de retours ;
  - le décompte des grooves ;
  - la levée du commentaire CK2-04.
