# Relecture du blog — lot 1 (corrections de texte) + vidéos — 23/10/2026

Relecteur distinct (agent neuf, aucune de ces modifications écrites par lui). Lecture seule : aucun fichier du site modifié, rien de commité.

Périmètre relu : `git diff 51b8065..HEAD -- src/content/blog src/styles` (commits `736b34f`, `17e3a9b`, `7179953`, `fd8b719`, `50f683a`, `ead2d47`, `336e7cf`, `7a2d88f`) : 63 fichiers d'articles, 13 vidéos et `src/styles/global.css`.

## Verdict

**Publiable après les corrections listées.**

Il y a 1 correction obligatoire avant publication : une légende de vidéo affirme une chose fausse (A1). Le reste est soit mineur, soit hors du lot.

| Catégorie | Nombre |
|---|---|
| Bloquant | 0 |
| À corriger (avant publication) | 6 |
| Suggestion | 9 |

---

## Ce qui a été vérifié, et le résultat

- **Faits produit : 22 affirmations vérifiées** contre `guide/changelog-data.ts` et `prototypes/carte-des-outils.html`. 21 sont exactes. Une est sourcée mais douteuse (A3).
  - #612 Carte : prénom, initiale, pays ; fiche détaillée facultative ; seule option = nom en entier.
  - #609 Onglet Musiciens ; un pays de moins de 3 personnes n'est jamais nommé.
  - #611 Mes duos ; « ▶ Jouer le duo » ; synchronisation sur tous les appareils.
  - #527 / #596 Les 4 choix du duo : 🌈 tout jouer, 🎵 jouer un morceau, 🎯 compléter ta tonalité, ✋ garder tel quel.
  - Ligne 2420 du journal : « ✕ Un seul handpan ».
  - #613 : « L'Étoile des 24 tonalités ».
  - Ligne 1121 du journal : rail à cinq repères ⏯ 🎛 🎓 🧭 ⋯ (🪘 Instrument retiré, ligne 1119).
  - Ligne 1119 : pilule « 🎯 Compléter » avec « · N notes manquantes ».
  - Ligne 2327 : Atelier d'accords en 3 onglets, Explorer, Construire et Tonalité.
  - Lignes 1092-1094 et 1287 : « Dispositions d'accord » (ex « Layout vocal ») ; puce « Profond ▾ » ; en Découverte, 🌑 Grave · ☀️ Clair · 🌈 Large.
  - #481, #487 (ligne 2078) et #515 (ligne 1682) : 🎓 Apprendre cet accord ; « Bien joué ! » ; simple, aller-retour ou descendant ; écouté par le micro ou par l'écran.
  - Ligne 667 : « ⏺ M'enregistrer maintenant » et « Transcrire mon jeu au micro ».
  - Carte des outils : transcription au micro fiable sur un jeu lent, pas sur un jeu rapide.
  - Ligne 948 : 🐞 Signaler un bug à côté de la cloche.
  - Ligne 2282 : contexte joint aux retours (écran, handpan, derniers gestes).
  - Lignes 1941, 1981 et 2022 : batteur avec kits Doux, Acoustique, Acoustique réel, Trap 808, Boom bap, House, Lo-fi, ancien son « Électro », rythmes urbains.
  - Ligne 693 : batteur et mélodie sur une seule horloge.
  - Ligne 3250 : Jam rapide joue sur ton instrument et dit quelle note manque.
  - Ligne 3002 (#424 / #555) : Neotone¹ avec 7 degrés, basse sur I, V, vi, IV, accord renversé, réaccordage avec retour.
  - Lignes 3022 et 5321 : sauvegarde sur le compte quel que soit le palier.
  - Ligne 3300 : filigrane sur compte gratuit.
  - Lignes 1204 et 1535 : Créer › « Une gamme ».
  - **Bêta non survendue.** La transcription au micro et la reconnaissance de gamme sont toutes deux annoncées « encore jeunes ». C'est conforme.
- **Voix de David.** Sa phrase « Le Neotone¹ à 10 notes n'a pas les sept degrés » est intacte. Sa citation « il vaut mieux un 19 notes… » est aussi intacte. Toutes les citations entre guillemets retirées dans le diff sont des libellés de l'app (« Un retour ? », « Mon instrument », « Voir la gamme »…), jamais des mots de David. Aucune citation de David n'a été altérée.
- **Cohérence FR / EN.** Les 26 paires disent la même chose et l'anglais est naturel. Écarts : A6 et S7.
- **Vocabulaire de la charte.** Aucun « creux » pour compter les notes dans les ajouts. « Hybride » n'est jamais employé comme nom de fonction ; seuls le slug existant `deux-handpans-mode-hybride` et des noms d'images le contiennent. « bandeau » désigne la bannière du duo, pas le pan : c'est conforme. Aucune excuse ni justification ajoutée.
- **Vidéos.** 3 images extraites par vidéo avec ffmpeg et regardées, plus 5 images de plus pour `completer-dkurd`. Images dans `/private/tmp/claude-501/-Users-davidlesage-CLAUDE/d7f07e1f-7686-41e9-a369-7f4bc8e9d723/scratchpad/relecture/frames/`.
  - Les 5 vidéos avec texte français incrusté n'apparaissent que dans des articles FR : `mode-logique-couleurs`, `completer-dkurd`, `trois-constellations`, `neotone-mutant-couleurs`, et `neotone1-hetre` qui n'a pas d'incrustation. C'est conforme.
  - Les 6 démos d'écran utilisées en EN (`demo-oeil`, `-atlas`, `-creation`, `-couleur`, `-styles`, `-transposer`) n'ont aucun texte incrusté. On n'y voit que l'interface en français, et la légende EN le signale. C'est conforme.
  - `duo-hybride-revele.mp4` et `ecoute-micro.mp4` sont publiés dans `public/` mais aucun article ne les utilise. Ce n'est pas bloquant.
  - Aucune vidéo en lecture automatique, toutes en `preload="none"`.
- **Rendu.**
  - `npx astro build` réussit : 132 pages, un seul avertissement vite sans rapport (`AffiliationCapture`).
  - **Liens internes : 4 213 liens, sources et posters vérifiés dans `dist` sur les 63 pages touchées, 0 cassé.**
  - Les 4 articles relus en bureau 1440 px et en mobile 390 px : `neotone-10-ou-19-notes`, `la-carte-des-joueurs`, `en/apprendre-les-accords-handpan`, `completer-son-handpan-acoustique-avec-un-neotone`. Captures dans `/private/tmp/claude-501/-Users-davidlesage-CLAUDE/d7f07e1f-7686-41e9-a369-7f4bc8e9d723/scratchpad/relecture/*-bureau.png` et `*-mobile-390.png`.
  - Les captures mobiles de Chrome headless coupent à droite. C'est un artefact de l'outil : dans le navigateur à 390 px, `scrollWidth` vaut 390 sur 3 pages. Sur `completer…`, la page déborde de 12 px, voir S9.
  - Le serveur est arrêté.

---

## À corriger (avant publication)

### A1. La légende de la vidéo de « compléter » dit Neotone, mais la vidéo montre un autre handpan
**Fichier :** `src/content/blog/completer-son-handpan-acoustique-avec-un-neotone.md`, ligne 72.

**Problème :** la légende dit « puis ce qu'un **Neotone** posé à côté ajoute ». Or la vidéo `completer-dkurd.mp4` montre « **D Kurd 11 + E3 majeur · 12 notes** ». Le carton final dit « avec ton D Kurd 11 et le bon 2ᵉ handpan ». Un handpan de 12 notes n'est ni un Neotone¹ (10 notes) ni un Mutant (19 notes). Le mot Neotone n'apparaît nulle part dans la vidéo.

L'erreur est grave dans *cet* article : il explique justement que « compléter son acoustique » veut dire acoustique + électronique, et que deux acoustiques, « c'est un duo ». La légende enfreint la règle de la charte « Rien affirmé sans l'avoir vu ».

**Correction proposée (texte exact) :**
> Animation sur une photo : un D Kurd 11 acoustique, et l'app sur la tablette. L'app montre d'abord les 7 accords de ré mineur et les notes qui manquent, puis ce qu'un second handpan bien choisi ajoute — ici un E3 majeur à 12 notes : les tonalités complètes passent de 2 à 24 sur 24. Le principe est le même avec un D Kurd 10, et le Neotone est l'une des façons d'apporter ces notes.

Autre option : retirer la vidéo de cet article et la garder pour l'article du duo `deux-handpans-mode-hybride` (FR seulement), où elle colle au sujet.

### A2. L'article sur la carte cite des textes de l'app qui contredisent maintenant la règle du 22 octobre
**Fichiers :** `src/content/blog/la-carte-des-joueurs.md`, lignes 72 à 74 (bloc cité et compteur), et `la-carte-des-joueurs-en.md`, mêmes lignes.

**Problème :** l'article cite :
- « Un pays sans point n'est pas un pays sans joueurs, c'est un pays où personne n'a encore dit oui » ;
- « Vous êtes 0 à avoir allumé votre étoile ».

Ces textes existent toujours dans l'app (`translations.ts` : `com.map.sub`, `com.map.honest_head`, `com.map.why_empty`). Mais ils décrivent l'ancienne règle : `com.map.sub` dit « Chaque étoile est quelqu'un qui a choisi d'apparaître ». Depuis le #612, tout joueur qui a accepté les conditions a son étoile. L'article ajoute plus haut que la carte montre « les joueurs inscrits dans l'application », donc il se contredit à quelques lignes d'écart.

**Correction proposée :**
- Côté app (à signaler à la session APP) : mettre à jour ces trois libellés.
- Côté blog, en attendant, remplacer la ligne 74 FR par :
  > Elle sait aussi dire où elle est vide — et, sur une zone déserte, elle propose simplement : « sois le premier point de cette zone ».
- Remplacer la ligne 74 EN par :
  > It can say where it's empty, too — and over an empty region it simply offers: "be the first dot in this area".
- Garder la phrase « Un pays sans point… » : elle reste vraie (« dire oui » = accepter les conditions).

### A3. « L'écoute dure deux minutes sans qu'on puisse l'interrompre » : douteux, et mal placé
**Fichiers :** `src/content/blog/mes-handpans-une-seule-porte.md`, ligne 131, et `-en.md`, ligne 131.

**Problème :** la phrase vient de la carte des outils (ligne 263). Mais le journal #592 (22/10) dit « ← Retour fonctionne à chaque étape ». Le code `onboarding/ecoute-gamme.ts` ferme l'écoute sur Échap (`surTouche`, ligne ~699) et relance l'utilisateur après 10 s sans rien entendre (ligne 1194). La carte des outils est probablement en retard sur ce point.

De plus, ce paragraphe est rangé sous le titre « Ce qui n'est pas encore là », alors qu'il annonce une fonction arrivée.

**Correction proposée :**
- Supprimer la phrase « Si le micro n'entend rien… interrompre. » (EN : « If the microphone hears nothing… can't be interrupted. »). Sinon, la faire confirmer par la session APP.
- Ligne 125, renommer le titre en « ## Ce qui n'est pas encore là, et ce qui vient d'arriver » (EN : « ## What isn't here yet, and what just arrived »).

### A4. « L'Étoile » avec une majuscule au milieu de la phrase, et une phrase bancale
**Fichiers :**
- `src/content/blog/deux-handpans-mode-hybride.md`, lignes 76 et 79 ;
- `layouts-vocaux-handpan.md`, ligne 58 ;
- `transposer-pour-chanter-handpan.md`, ligne 46.

**Problème :** le nom dans l'app est « L'Étoile des 24 tonalités » (#613). Placé nu au milieu d'une phrase, il donne « « Compléter » et L'Étoile des 24 tonalités sont gratuits », qui se lit comme une coquille. La ligne 76 est aussi difficile à suivre (« …, et dans 🧰 Outils l'écoute de ta gamme dans une autre tonalité, te laissent écouter ta gamme transposée »).

**Correction proposée :** mettre le nom entre guillemets partout, comme les autres libellés de l'app.
- Ligne 79 : « Le mode acoustique, « Compléter » et « L'Étoile des 24 tonalités » sont **gratuits**, … »
- Ligne 76 :
  > - **« L'Étoile des 24 tonalités »** (l'ancienne roue de tonalité) te laisse écouter ta gamme transposée dans une autre tonalité ; le même outil existe en raccourci dans 🧰 Outils. Tu entends le futur instrument avant qu'il existe.
- `layouts-vocaux-handpan.md`, ligne 58 : « (aujourd'hui « L'Étoile des 24 tonalités ») ».
- `transposer-pour-chanter-handpan.md`, ligne 46 : « aujourd'hui **« L'Étoile des 24 tonalités »** ».

### A5. Les deux vidéos de la comparaison Neotone s'empilent sur mobile
**Fichiers :** `src/styles/global.css`, bloc `.article-mp4-pair` (ajout du 23/10), utilisé dans `neotone-10-ou-19-notes.md`, lignes 30 à 45.

**Problème :** sous 640 px, les deux vidéos passent l'une sous l'autre (mesuré à 390 px : deux blocs de 358 px de large, empilés). La règle absolue de la charte (§5) demande une comparaison **côte à côte, sans défilement**, et prévoit le cas du petit écran : « préférer une image composite plutôt qu'un empilement ». Le commentaire CSS assume l'empilement.

**Correction proposée :** garder les deux colonnes à toutes les largeurs. Remplacer la règle :

```css
.prose-blog .article-mp4-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-top: 2.25rem;
  margin-bottom: 2.25rem;
}
```

Supprimer ensuite le `@media (min-width: 640px)`. À 390 px, chaque vidéo fait environ 175 px de large ; le lecteur peut passer en plein écran. Autre option : faire monter une vidéo composite (les deux animations côte à côte dans un seul fichier).

### A6. Un libellé traduit en anglais au milieu de libellés laissés en français
**Fichier :** `src/content/blog/editeur-de-melodies-handpan-en.md`, ligne 63.

**Problème :** la phrase laisse *⏺ M'enregistrer maintenant* et *Transcrire mon jeu au micro* en français avec leur traduction entre parenthèses, mais écrit « ⏹ Stop ». Le bouton s'appelle « ⏹ Arrêter » (journal, ligne 667), donc le lecteur EN ne le retrouvera pas à l'écran.

**Correction proposée :** « you play, *⏹ Arrêter* (stop), and the app suggests the notes; »

---

## Suggestions

**S1.** `neotone-10-ou-19-notes.md`, ligne 59, et `-en.md`, ligne 42 : dans un article pour débutants, cette ligne est purement théorique. Elle écrit « I, V, vi, IV ; en mineur i, VI, III, VII » et « renversés » sans explication, ce qui va contre les trois niveaux de langage et l'infobulle demandée au §1 de la charte. Proposition FR :
> seuls les quatre accords les plus joués (<abbr title="En majeur : I Équilibre, V Tension, VI Nostalgie, IV Détente.">I, V, vi, IV</abbr> ; en mineur i, VI, III, VII) ont leur basse, les autres peuvent sonner <abbr title="La note la plus grave n'est pas celle qui donne son nom à l'accord.">renversés</abbr>,

**S2.** La carte des joueurs, ligne 148 FR et EN : « la carte ne lit tout simplement que les fiches détaillées allumées ». Depuis le #612, la carte lit aussi les étoiles simples. Préciser : « la carte ne lit tout simplement les fiches détaillées que si elles sont allumées, il n'existe pas de chemin qui contourne ce filtre. » (EN : « the map only ever reads a detailed card when it's switched on, and there's no route around that filter. »)

**S3.** La carte des joueurs : le #612 dit « Sans pays, ton étoile n'est pas posée ». La note de mise à jour (ligne 14) affirme « chaque joueuse et chaque joueur y a son étoile ». On peut ajouter « … et son pays (choisi dans une liste à l'accueil) ».

**S4.** `neotone-10-ou-19-notes.md`, ligne 30 et suivantes : les deux vidéos de la paire ne montrent pas la même chose. À gauche, les notes s'allument une à une, en ré majeur. À droite, les accords s'allument, en do majeur. Or la charte demande une comparaison « même cadrage ». La comparaison reste lisible, mais une paire « mêmes accords, même tonalité » serait plus parlante.

**S5.** `creer-sa-gamme-de-handpan.md`, ligne 41, et `-en.md`, ligne 41 : la vidéo ne part pas d'un pan vide. Le ding D3, Bb3 et A3 sont déjà posés. Proposition : « on part d'un pan presque vide (le ding et deux notes) ». EN : « starting from an almost empty pan (the ding and two notes) ».

**S6.** `mode-logique-couleurs` (`accompagner-des-chansons-au-handpan.md` et `handpan-emotions-degres.md`) : la légende cite « II Élan, puis IV Détente » mais la vidéo continue avec VI Nostalgie. On peut écrire « ici II Élan, IV Détente (sol mineur), puis VI Nostalgie ».

**S7.** `apprendre-les-accords-handpan-en.md`, ligne 37 : la légende écrit « in <strong>« Degrés &amp; émotions »</strong> », alors que le texte de l'article EN emploie « **Discover › Degrees & emotions** (*Découvrir › Degrés & émotions*) ». Harmoniser : « in **Degrees & emotions** (*Degrés & émotions*) ». Même remarque pour « « Dispositions & Logique » » dans `le-capo-du-handpan-en.md` et `transposer-pour-chanter-handpan-en.md` → « **Voicings & Logic** (*Dispositions & Logique*) ».

**S8.** `public/videos/blog/duo-hybride-revele.mp4` (3,3 Mo) et `ecoute-micro.mp4` (4,3 Mo) sont publiés mais aucun article ne les utilise. Soit les placer, par exemple `duo-hybride-revele` dans `deux-handpans-mode-hybride.md` (FR), soit les sortir de `public/`. Attention au nom de fichier « hybride » : le vocabulaire est réservé, mais ce n'est pas visible par le lecteur.

**S9.** Hors du lot, mais constaté au rendu : `completer-son-handpan-acoustique-avec-un-neotone.md`, le tableau « D Kurd 10 seul / + Neotone¹ / + Mutant » déborde de 12 px à 390 px et provoque un défilement horizontal de la page. Envelopper le tableau dans `<div style="overflow-x:auto">` ou réduire la taille de police du tableau sur mobile.
