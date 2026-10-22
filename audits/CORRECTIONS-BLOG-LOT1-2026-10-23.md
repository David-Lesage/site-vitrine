# Corrections du blog — lot 1 (texte seul) — 23/10/2026

> Pour le relecteur. Source : `audits/INVENTAIRE-BLOG-2026-10-22.md` (§1 et §4).
> Preuves : journal de l'app `guide/changelog-data.ts` (`#NNN`) et `prototypes/carte-des-outils.html`.
> Règles suivies : `specs/CHARTE-ARTICLES.md`. **Aucune image, iframe ni slug touché.**
> Chaque article corrigé a reçu `updatedDate: 2026-10-23` (champ déjà prévu par `src/content.config.ts`).
> `npx astro build` passe. Rien n'est poussé ni déployé.

## Résumé

- **26 articles corrigés**, chacun en FR et en EN (52 fichiers).
- Commits : `736b34f` (carte des joueurs) · `17e3a9b` (phrase « Studio », 8 articles) · `7179953` (articles faux sur le fond) · `fd8b719` (noms et chemins, 12 articles) · `50f683a` (éditeur de mélodies, batteur, pupitre).
- Principe : quand un mode d'emploi décrit une capture qui n'a pas changé, la phrase reste cohérente avec la capture et un encadré « Mise à jour du 23 octobre 2026 » dit ce qui a changé. La réécriture complète, avec captures neuves, reste au lot 2.
- Libellés anglais de l'app : quand je ne connais pas le libellé exact de l'interface anglaise, le libellé français est donné en italique à côté.

## ⚠️ Non fait : « Neotone 10 ou 19 notes », la phrase des sept degrés

La coordination m'a transmis la décision de David (23/10) : garder sa phrase et ajouter une nuance juste après. **L'écriture a été refusée par le garde-fou de permissions** de cette session (aucune explication). Rien n'est donc modifié dans ce passage. Texte proposé, prêt à poser (FR, ligne 40, juste après « Le Neotone¹ à 10 notes n'a pas les sept degrés. ») :

> Depuis octobre 2026, l'app joue pourtant **les 7 degrés sur un Neotone¹**. Chaque note y garde un rôle fixe dans toutes les tonalités, et les 7 accords deviennent jouables. Mais ils ne sont pas tous complets sous tes mains : seuls les quatre plus joués (I, V, vi, IV ; en mineur i, VI, III, VII) ont leur basse, les autres peuvent sonner renversés, et pour jouer un degré en entier l'app réaccorde une note pour toi, avec un bouton pour revenir. Le réglage par défaut est « Pop 4 » ; un réglage « 7 degrés » existe, en accords de trois notes. Sur le Mutant, les sept degrés sont là d'emblée, sans rien réaccorder.

Tableau (ligne 92) : cellule Neotone¹ de « Les 7 degrés en majeur et en mineur » : vide → « dans l'app, pas tous en entier ». EN : même texte traduit (voir le script de session).
Mécanisme (#424, #555) : l'app **n'ajoute pas de note** ; elle donne un rôle fixe à chaque note, joue certains accords renversés et **réaccorde une note** pour jouer un degré en entier. L'argument de David (avec 19 notes, les 7 degrés sont directement sous les mains) **tient toujours**.

## Points « à vérifier dans l'app » laissés tels quels

- la-carte-des-joueurs : la phrase « Un pays sans point… personne n'a encore dit oui » et « Vous êtes 0 à avoir allumé votre étoile » sont-elles encore à l'écran depuis le #612 ? Le partage des instruments est-il toujours une case séparée de la fiche détaillée ? Halo cuivré pour les fabricants inscrits ? « La carte ne s'ouvre qu'aux comptes connectés » ?
- deux-handpans-mode-hybride : la ligne « 🎵 N morceaux jouables avec ta gamme » sous les 7 degrés existe-t-elle encore ?
- handpan-studio-mode-acoustique : le choix d'affichage des notes du dessous « Étoile / 2 coques » existe-t-il encore ?
- layouts-vocaux : « en acoustique, pas de sélecteur Profond / Brillant / Ample » (le #545 montre les dispositions aussi en « Accords »).
- les-trois-mineurs : les nuances sont-elles encore « sous le bouton Triste », ou dans le rail 🎛 Dispositions & Logique ?
- le-capo : le paragraphe « Sur le Neotone 1… les sept degrés n'y sont pas tous là » et le commentaire CK2-07 touchent la même question que la phrase de David : laissés en attente, à aligner sur sa décision. Commentaire CK2-04 (levé par #450, #477 ?).
- reveler : chiffres 197 / 156 / 41 à recompter (le répertoire affiche 157 sur R1) ; « la roue de tonalité est juste à côté » ; Révéler marche-t-il aussi avec un Neotone (#533, #601) ?
- bibliotheque-musicale : compte « 156 » (157 sur R1), lié à la capture.
- editeur-de-melodies : « fera partie de la version Studio ; pendant la bêta, ouvert à tous » (matrice des paliers).
- jouer-avec-un-batteur : « Ce qui relève de la version Studio, c'est l'enregistrement MIDI » (Studio « à venir », #446 : quel palier ?) ; nouveau décompte des grooves.
- feedback : la fenêtre à cinq cartes s'ouvre-t-elle toujours par « 💬 Donner mon avis » ? Les deux « consultations ouvertes » de la légende.
- mes-handpans : « les anciennes fiches fusionnées traînent encore ».
- L'Étoile des 24 tonalités : le #613 l'annonce dans le duo ; j'ai supposé que la roue porte ce nom partout (transposer, layouts-vocaux, deux-handpans).

## Phrases liées à une capture, pour le lot 2

- la-carte-des-joueurs : maquette `blog-carte-joueurs-maquette.webp` et ses deux iframes (`/prototypes/constellation-joueurs-*.html`), ancienne règle ; textes datés « 1er septembre » ; mobile « l'écran depuis lequel on allume son étoile » ; « Éteins l'interrupteur en haut : mon étoile s'éteint » (bac à sable).
- mes-handpans : tout le mode d'emploi (panneau de droite, cases à cocher, barre « POUR », 🎡 Tester une autre tonalité) et les deux légendes ; encadré daté en tête.
- deux-handpans : légende du bandeau du duo (version de septembre).
- apprendre-les-accords : légende « Joue la note qui pulse ! » (version de septembre).
- jam-rapide : `app-jam-rapide-voir-la-gamme.webp` à retirer ; sa légende est passée au passé. Légende recap : « Mes accompagnements » → « Mes morceaux » (conforme à la capture).
- layouts-vocaux : légende « dans le panneau droit, sous la note d'ancrage » (capture de juillet, encadré ajouté).
- reveler : paragraphe « Sous le pan, la barre 🎼 Atelier d'accords… trois boutons » (chemin de septembre, encadré ajouté).
- le-capo : légende « Tester une autre tonalité » (ligne 177).
- les-deux-visions : 14 paires montrent l'îlot ChromaKeys ancien style.
- bibliotheque-musicale, reveler : compte « 156 » à l'écran.
- handpan-par-les-couleurs, atlas, creer-sa-gamme, accompagner : textes alternatifs (`alt`) décrivant l'ancien écran (onglet Création, « Découvrir d'autres gammes », panneau Mes handpans) : à refaire avec les captures.
- ta-partition : légende de l'export « sur un compte gratuit » (le filigrane reste juste, #397).

## Ajouts proposés par l'inventaire, non faits (pas une erreur dans le texte)

les-4-accords (layout Pop 4 du Neotone¹, #555) · les-trois-mineurs (nuances sur Neotone¹, #555) · bibliotheque (filtres ⭐ #507, pastille 🎙 #598) · diagrammes (jeu de cartes d'accords #336, #600) · editeur-de-melodies (vrai pan #539, sélection #522, Handpan Hero #600) · editeur-de-partition (plein écran #414, Adapter #368) · transposer (passeport vocal #598, #603, Transposer sur place #460) · completer (« Que veux-tu faire ? » #604, photo R9) · la-carte-des-joueurs (541 fabricants).

---

## Détail, article par article (avant / après)

### `la-carte-des-joueurs`

**FR 1** — justification : #612

Avant :

> title: "La carte des joueurs : une constellation où rien n'est allumé par défaut"

Après :

> title: "La carte des joueurs : une étoile pour chacun, et rien de plus par défaut"

**FR 2** — justification : #612

Avant :

> description: "Handpan Constellation Studio a maintenant sa carte du monde. Chaque joueur y est une étoile — mais elle est éteinte tant que tu ne l'allumes pas, champ par champ, et l'app ne sait jamais où tu es."

Après :

> description: "Handpan Constellation Studio a sa carte du monde. Chaque joueur y est une étoile : un prénom, une initiale, un pays. Tout le reste s'allume champ par champ, si tu le veux, et l'app ne sait jamais où tu es."

**FR 3** — justification : #612

Avant :

> Le handpan est un petit monde très éparpillé.

Après :

> > **Mise à jour du 23 octobre 2026.** Cet article date du 1er septembre. À l'époque, il fallait allumer son étoile pour apparaître sur la carte. Depuis le 22 octobre, **chaque joueuse et chaque joueur y a son étoile** : son prénom, l'initiale de son nom et son pays. Les passages ci-dessous sont corrigés en conséquence.
> 
> Le handpan est un petit monde très éparpillé.

**FR 4** — justification : #612

Avant :

> **Une carte du monde, où chaque joueur qui le souhaite est une étoile.** Pays, ville si tu veux,

Après :

> **Une carte du monde, où chaque joueur est une étoile.** Et, si tu le souhaites : ville,

**FR 5** — justification : #612

Avant :

> Ce qui est différent ici, c'est **le sens dans lequel l'interrupteur est posé.**

Après :

> Ce qui est différent ici, c'est **ce qui est montré par défaut, et ce qui ne l'est pas.**

**FR 6** — justification : #612

Avant :

> ## Le renversement : tu n'es pas dessus, et tu ne l'as jamais été
> 
> Fais l'exercice mentalement avec les autres services que tu utilises. Tu t'inscris, et tu **es** sur la carte, dans l'annuaire, dans la liste des membres. Ensuite, si ça ne te va pas, tu vas chercher le réglage qui te retire. Le défaut, c'est la visibilité ; le retrait, c'est un effort.
> 
> Ici, c'est l'inverse, et c'est la seule décision de conception qui compte vraiment :
> 
> > **Tu n'apparais pas.** Tu utilises l'application normalement, personne ne te voit. Un jour, si tu en as envie, tu allumes un interrupteur — et pas avant.
> 
> Cet interrupteur porte un nom qui ne trompe personne, **« Apparaître sur la carte »**, il vit dans « 🌍 Mon profil public », dans le menu de ton compte, et il est **éteint tant que tu ne l'allumes pas**. C'est la seule condition d'apparition : il n'existe pas d'autre chemin qui te ferait arriver sur la carte.
> 
> Et une fois allumé, ce n'est pas un paquet. C'est **champ par champ**. Tu peux mettre ton pays et rien d'autre. Tu peux mettre

Après :

> ## Par défaut : un prénom, une initiale, un pays
> 
> Fais l'exercice mentalement avec les autres services que tu utilises. Tu t'inscris, et tu **es** sur la carte, dans l'annuaire, dans la liste des membres, avec tout ce que tu as donné à l'inscription. Ensuite, si ça ne te va pas, tu vas chercher le réglage qui te retire.
> 
> Ici aussi, en acceptant les conditions d'utilisation, tu apparais sur la carte. Mais regarde ce qui apparaît :
> 
> > **Ton prénom, l'initiale de ton nom, ton pays.** « Marie L. · France ». Jamais ton adresse, ta ville ni ton e-mail. L'étoile se pose au centre de ton pays.
> 
> La seule option de cette étoile simple, dans « 🌍 Mon profil public » (menu de ton compte) : afficher ton nom de famille en entier.
> 
> Tout le reste, c'est ta **fiche détaillée** : nom choisi, ville, casquette de prof, réseaux, instruments. Elle est facultative et **éteinte tant que tu ne l'allumes pas**. Allumée, elle remplace ton étoile simple.
> 
> Et une fois allumée, ce n'est pas un paquet. C'est **champ par champ**. Tu peux mettre

**FR 7** — justification : #612

Avant :

> Et le défaut n'est pas inversé une fois : **il l'est à chaque étage.** L'exemple qui le montre le mieux, ce sont tes instruments. On pourrait légitimement penser qu'allumer son étoile publie la liste

Après :

> Et ce principe vaut **à chaque étage.** L'exemple qui le montre le mieux, ce sont tes instruments. On pourrait légitimement penser qu'allumer sa fiche publie la liste

**FR 8** — justification : #612

Avant :

> **Elle est déduite du nom de la ville que tu as écrit toi-même.** C'est tout. Ce que l'application connaît de ta position, c'est un mot que tu as tapé. Et si tu ne veux pas taper de ville, ton étoile se pose sur le pays.

Après :

> **Par défaut, elle se pose au centre de ton pays**, choisi dans une liste. Si tu allumes ta fiche et écris une ville, **sa place est déduite du nom de cette ville.** C'est tout. Ce que l'application connaît de ta position, c'est un mot que tu as tapé.

**FR 9** — justification : #612

Avant :

> Une carte qui laisse croire qu'elle recense le monde ment sur son propre échantillon — et vu le sens dans lequel est posé l'interrupteur, elle mentirait beaucoup.

Après :

> Une carte qui laisse croire qu'elle recense le monde ment sur son propre échantillon : elle ne montre que les joueurs inscrits dans l'application.

**FR 10** — justification : #612

Avant :

> Ce que tu vois sur cette carte, c'est donc **qui a dit oui**. Rien d'autre.

Après :

> Ce que tu vois sur cette carte, ce sont donc **les joueurs inscrits dans l'application**. Rien d'autre.

**FR 11** — justification : #612

Avant :

> Autant aller au bout de la démonstration, puisque c'est vrai au moment où j'écris ces lignes. **Ce soir, 1er septembre 2026, la constellation compte une étoile.** Une seule. Un prof, halo doré ; aucun fabricant pour l'instant. Ce n'est pas un aveu gêné, c'est une date : la carte existe depuis quelques jours, et voilà exactement où elle en est. Si tu lis ça maintenant, tu peux être la deuxième.

Après :

> Un repère daté, pour l'histoire. **Le 1er septembre 2026, quand j'ai écrit la première version de cet article, la constellation comptait une étoile.** Une seule. Un prof, halo doré ; aucun fabricant. Depuis le 22 octobre, chaque joueuse et chaque joueur inscrit a la sienne.

**FR 12** — justification : #612

Avant :

> Voilà la seule chose que cette page ne peut pas te montrer honnêtement : un ciel plein. Alors je te montre la **maquette de conception** — le dessin qui a servi à fabriquer la carte, avec douze étoiles au lieu d'une.

Après :

> Voilà la **maquette de conception** — le dessin qui a servi à fabriquer la carte, avec douze étoiles. Elle date d'avant la règle du 22 octobre.

**FR 13** — justification : #612

Avant :

> C'est un croquis d'atelier. Le nombre réel, vérifié, est celui du paragraphe précédent : **une étoile**.

Après :

> C'est un croquis d'atelier, dessiné quand la carte ne comptait **qu'une étoile**.

**FR 14** — justification : #612

Avant :

> Ci-dessous, le panneau « 🌍 Mon profil public » tel qu'il existe dans l'application, <strong>pré-rempli

Après :

> Ci-dessous, le panneau « 🌍 Mon profil public » tel qu'il existait dans l'application le 1<sup>er</sup> septembre 2026, avant la règle du 22 octobre, <strong>pré-rempli

**FR 15** — justification : #612

Avant :

> Un geste. **Tu éteins l'interrupteur maître, ton étoile disparaît de la carte, immédiatement.**

Après :

> Un geste. **Tu éteins ta fiche détaillée, elle disparaît de la carte, immédiatement.** Il ne reste que ton étoile simple : prénom, initiale, pays.

**FR 16** — justification : #612

Avant :

> la carte ne lit tout simplement que les profils dont l'interrupteur est allumé, il n'existe pas de chemin qui contourne ce filtre.

Après :

> la carte ne lit tout simplement que les fiches détaillées allumées, il n'existe pas de chemin qui contourne ce filtre.

**FR 17** — justification : #612

Avant :

> Prends le temps de le remplir sans allumer, si tu veux voir à quoi ça ressemble. L'aperçu se met à jour pendant que tu tapes, et tant que l'interrupteur est éteint, tu es le seul à le regarder.

Après :

> Prends le temps de remplir ta fiche sans l'allumer, si tu veux voir à quoi ça ressemble. L'aperçu se met à jour pendant que tu tapes, et tant que ta fiche est éteinte, tu es le seul à la regarder.

**FR 18** — justification : #609

Avant :

> avec des filtres et une recherche, pour trouver un prof ou un fabricant sans faire défiler le monde entier.

Après :

> avec des onglets (Tous · 🎵 Musiciens · Profs · Fabricants) et une recherche, pour trouver un prof ou un fabricant sans faire défiler le monde entier. L'onglet 🎵 Musiciens, lui, ne nomme personne : un cercle par pays dit combien de musiciens utilisent l'app, et un pays de moins de 3 personnes n'est jamais nommé.

**FR 19** — justification : #612

Avant :

> ### L'écran depuis lequel on allume son étoile

Après :

> ### L'écran depuis lequel on allume sa fiche

**EN 1** — justification : #612

Avant :

> title: "The players' map: a constellation where nothing is switched on by default"

Après :

> title: "The players' map: a star for everyone, and nothing more by default"

**EN 2** — justification : #612

Avant :

> description: "Handpan Constellation Studio now has its world map. Every player is a star on it — but yours stays dark until you light it, field by field, and the app never knows where you are."

Après :

> description: "Handpan Constellation Studio has its world map. Every player is a star on it: a first name, an initial, a country. Everything else lights up field by field, if you want it to, and the app never knows where you are."

**EN 3** — justification : #612

Avant :

> The handpan is a small world, scattered very thin.

Après :

> > **Updated 23 October 2026.** This article dates from 1 September. Back then, you had to light your star to appear on the map. Since 22 October, **every player has their star on it**: first name, the initial of their surname, and their country. The passages below have been corrected accordingly.
> 
> The handpan is a small world, scattered very thin.

**EN 4** — justification : #612

Avant :

> **A world map, where every player who wants to be there is a star.** Country, town if you like,

Après :

> **A world map, where every player is a star.** And, if you wish: town,

**EN 5** — justification : #612

Avant :

> What's different here is **which way round the switch is set.**

Après :

> What's different here is **what is shown by default, and what isn't.**

**EN 6** — justification : #612

Avant :

> ## The reversal: you're not on it, and you never were
> 
> Try the thought experiment with the other services you use. You sign up, and you **are** on the map, in the directory, in the member list. Then, if that doesn't suit you, you go hunting for the setting that takes you off. Visibility is the default; opting out is the effort.
> 
> Here it's the other way round, and it's the one design decision that really matters:
> 
> > **You don't appear.** You use the app normally, nobody sees you. One day, if you feel like it, you flip a switch — and not before.
> 
> That switch has a name nobody can misread, **"Appear on the map"**, it lives in "🌍 My public profile" in your account menu, and it stays **off until you turn it on**. It is the only condition for appearing: there is no other route that puts you on the map.
> 
> And once it's on, it isn't a bundle. It's **field by field**. You can give your country and nothing else. You can wear

Après :

> ## By default: a first name, an initial, a country
> 
> Try the thought experiment with the other services you use. You sign up, and you **are** on the map, in the directory, in the member list, with everything you gave when you signed up. Then, if that doesn't suit you, you go hunting for the setting that takes you off.
> 
> Here too, by accepting the terms of use, you appear on the map. But look at what appears:
> 
> > **Your first name, the initial of your surname, your country.** "Marie L. · France". Never your address, your town or your email. The star sits at the centre of your country.
> 
> The only option for that simple star, in "🌍 My public profile" (your account menu): show your full surname.
> 
> Everything else is your **detailed card**: chosen name, town, teacher hat, social links, instruments. It's optional and **off until you turn it on**. Once on, it replaces your simple star.
> 
> And once it's on, it isn't a bundle. It's **field by field**. You can wear

**EN 7** — justification : #612

Avant :

> And the default isn't reversed once: **it's reversed at every level.** Your instruments show it best. You could reasonably assume that lighting your star publishes

Après :

> And that principle holds **at every level.** Your instruments show it best. You could reasonably assume that turning on your card publishes

**EN 8** — justification : #612

Avant :

> **It's derived from the name of the town you typed yourself.** That's all. What the app knows about your position is a word you wrote. And if you'd rather not type a town, your star sits on the country instead.

Après :

> **By default, it sits at the centre of your country**, picked from a list. If you turn on your card and type a town, **its place is derived from the name of that town.** That's all. What the app knows about your position is a word you wrote.

**EN 9** — justification : #612

Avant :

> A map that lets you believe it surveys the world is lying about its own sample — and given which way the switch is set, it would be lying a lot.

Après :

> A map that lets you believe it surveys the world is lying about its own sample: it only shows players registered in the app.

**EN 10** — justification : #612

Avant :

> So what you see on that map is **who said yes**. Nothing else.

Après :

> So what you see on that map is **the players registered in the app**. Nothing else.

**EN 11** — justification : #612

Avant :

> I may as well finish the demonstration, since it's true as I write this. **Tonight, 1 September 2026, the constellation holds one star.** Just one. A teacher, golden halo; no makers yet. That isn't an embarrassed confession, it's a date: the map has existed for a few days, and this is exactly where it stands. If you're reading this now, you can be the second.

Après :

> A dated landmark, for the record. **On 1 September 2026, when I wrote the first version of this article, the constellation held one star.** Just one. A teacher, golden halo; no makers. Since 22 October, every registered player has their own.

**EN 12** — justification : #612

Avant :

> Here's the one thing this page cannot honestly show you: a full sky. So let me show you the **design mockup** instead — the drawing the map was built from, with twelve stars instead of one.

Après :

> Here is the **design mockup** — the drawing the map was built from, with twelve stars. It predates the 22 October rule.

**EN 13** — justification : #612

Avant :

> It's a studio sketch. The real, verified number is the one in the paragraph above: **one star**.

Après :

> It's a studio sketch, drawn when the map held **only one star**.

**EN 14** — justification : #612

Avant :

> ### The screen you light your star from

Après :

> ### The screen you turn your card on from

**EN 15** — justification : #612

Avant :

> Below is the "🌍 My public profile" panel as it exists in the application, <strong>prefilled

Après :

> Below is the "🌍 My public profile" panel as it existed in the application on 1 September 2026, before the 22 October rule, <strong>prefilled

**EN 16** — justification : #612

Avant :

> One gesture. **You turn the master switch off, your star leaves the map, immediately.**

Après :

> One gesture. **You turn your detailed card off, it leaves the map, immediately.** Only your simple star remains: first name, initial, country.

**EN 17** — justification : #612

Avant :

> the map simply only ever reads profiles whose switch is on, and there's no route around that filter.

Après :

> the map simply only ever reads detailed cards that are switched on, and there's no route around that filter.

**EN 18** — justification : #612

Avant :

> Take your time filling it in without switching it on, if you want to see what it looks like. The preview updates as you type, and while the switch is off you're the only one looking at it.

Après :

> Take your time filling in your card without switching it on, if you want to see what it looks like. The preview updates as you type, and while your card is off you're the only one looking at it.

**EN 19** — justification : #609

Avant :

> with filters and a search, so you can find a teacher or a maker without scrolling through the whole world.

Après :

> with tabs (All · 🎵 Musicians · Teachers · Makers) and a search, so you can find a teacher or a maker without scrolling through the whole world. The 🎵 Musicians tab names nobody: one circle per country says how many musicians use the app, and a country with fewer than 3 people is never named.


### `bibliotheque-musicale-handpan`

**FR 1** — justification : #422, #446

Avant :

> Cette sauvegarde en ligne fait partie de la version **Studio** ; recevoir et consulter un contenu partagé reste gratuit.

Après :

> Cette sauvegarde vaut pour tous : **tout ce que tu crées est sauvegardé sur ton compte, quel que soit ton palier**, même en gratuit. Recevoir et consulter un contenu partagé reste gratuit aussi.

**EN 1** — justification : #422, #446

Avant :

> That online backup is part of the **Studio** version; receiving and viewing shared content stays free.

Après :

> That backup is for everyone: **everything you create is saved to your account, whatever your plan**, even on the free tier. Receiving and viewing shared content stays free too.


### `diagrammes-accords-handpan-pdf`

**FR 1** — justification : #422, #446

Avant :

> Créer et exporter tes diagrammes en mode acoustique est **gratuit** ; la version Studio ajoute la sauvegarde cloud.

Après :

> Créer et exporter tes diagrammes en mode acoustique est **gratuit**, et tout ce que tu crées est sauvegardé sur ton compte, quel que soit ton palier.

**EN 1** — justification : #422, #446

Avant :

> Creating and exporting your diagrams in acoustic mode is **free**; the Studio version adds cloud saving.

Après :

> Creating and exporting your diagrams in acoustic mode is **free**, and everything you create is saved to your account, whatever your plan.


### `editeur-de-partition-handpan`

**FR 1** — justification : #422, #446

Avant :

> Créer et exporter en mode acoustique est **gratuit** ; la version Studio ajoute la sauvegarde cloud pour retrouver tes chansons partout.

Après :

> Créer et exporter en mode acoustique est **gratuit**, et tes chansons sont sauvegardées sur ton compte, quel que soit ton palier, pour les retrouver partout.

**EN 1** — justification : #422, #446

Avant :

> Creating and exporting in acoustic mode is **free**; the Studio version adds cloud saving to find your songs everywhere.

Après :

> Creating and exporting in acoustic mode is **free**, and your songs are saved to your account, whatever your plan, so you find them everywhere.


### `exporter-ses-partitions-handpan`

**FR 1** — justification : #422, #446

Avant :

> Créer et exporter tes partitions en mode acoustique est **gratuit** ; la version Studio ajoute la sauvegarde cloud pour retrouver tes créations partout.

Après :

> Créer et exporter tes partitions en mode acoustique est **gratuit**, et tes créations sont sauvegardées sur ton compte, quel que soit ton palier, pour les retrouver partout.

**EN 1** — justification : #422, #446

Avant :

> Creating and exporting your scores in acoustic mode is **free**; the Studio version adds cloud saving to find your creations everywhere.

Après :

> Creating and exporting your scores in acoustic mode is **free**, and your creations are saved to your account, whatever your plan, so you find them everywhere.


### `ta-partition-prend-vie`

**FR 1** — justification : #397, #404, #446

Avant :

> Les exports réalisés sans accès Studio portent un discret filigrane « version gratuite »

Après :

> Les exports réalisés sur un compte gratuit portent un discret filigrane « version gratuite »

**FR 2** — justification : #397, #404, #446

Avant :

> Le même export, réalisé <strong>sans accès Studio</strong> :

Après :

> Le même export, réalisé <strong>sur un compte gratuit</strong> :

**FR 3** — justification : #430

Avant :

> Le Pupitre s'ouvre depuis l'éditeur, depuis tes morceaux, et à la sortie du [Jam Rapide]

Après :

> Le Pupitre s'ouvre depuis l'éditeur, depuis tes morceaux, depuis l'onglet **▶ Jouer**, et à la sortie du [Jam Rapide]

**EN 1** — justification : #397, #404, #446

Avant :

> Exports made without Studio access carry a discreet "free version" watermark

Après :

> Exports made on a free account carry a discreet "free version" watermark

**EN 2** — justification : #397, #404, #446

Avant :

> The same export, made <strong>without Studio access</strong>:

Après :

> The same export, made <strong>on a free account</strong>:

**EN 3** — justification : #430

Avant :

> The music stand opens from the editor, from your pieces, and on the way out of [Quick Jam]

Après :

> The music stand opens from the editor, from your pieces, from the **▶ Play** tab, and on the way out of [Quick Jam]


### `deux-handpans-mode-hybride`

**FR 1** — justification : #422, #611, #613

Avant :

> Le mode acoustique, « Compléter » et la roue de tonalité sont **gratuits** ; enregistrer durablement ta configuration à deux handpans fait partie de la version Studio.

Après :

> Le mode acoustique, « Compléter » et L'Étoile des 24 tonalités sont **gratuits**, et ton duo est enregistré sur ton compte, même en gratuit : il te suit sur tous tes appareils.

**FR 2** — justification : #533, #608, #611, #613, #463

Avant :

> ## 🌗 Deux cases à cocher, et le bandeau apparaît
> 
> Poser un second handpan tient désormais en **deux cases à cocher**. Panneau de droite, bloc **Mes handpans** : tu coches un instrument, il joue seul ; tu en coches un deuxième, le duo se pose — badges **⓵** et **⓶**, dans l'ordre où tu as coché. Les anciennes listes déroulantes de « 2ᵉ pan » (la bande guidée, le funnel « Compléter ») ont disparu fin août : il ne reste qu'un geste, **🤝 Mettre à côté**, et il accepte tous tes instruments, Neotone et coques sur mesure compris.
> 
> Un bandeau s'affiche alors au-dessus de tes pans :

Après :

> ## 🌗 Le second pan, et le bandeau du duo
> 
> > **Mise à jour du 23 octobre 2026.** Les deux cases à cocher du panneau de droite n'existent plus. Tes instruments sont maintenant dans **Mes handpans**, en cartes, et **🤝 Mon duo** a deux emplacements. Dès que tes deux handpans sont posés, l'app te demande **ce que tu veux en faire** : 🌈 tout jouer, 🎵 jouer un morceau, 🎯 compléter ta tonalité ou ✋ garder tel quel. Sous les pans, deux rangées de cartes : les 7 accords de ta tonalité, puis les accords **en plus** que seuls tes deux handpans ensemble permettent. Un bouton « ✕ Un seul handpan » ramène à un seul instrument.
> 
> Un bandeau s'affiche au-dessus de tes pans. Dans sa version de septembre, celle de la capture ci-dessous :

**FR 3** — justification : #447, #607 (nom) ; présence de la ligne : à vérifier

Avant :

> Dès qu'une gamme est chargée en Mode Logique acoustique, une ligne apparaît

Après :

> Dès qu'une gamme acoustique est chargée dans Découvrir › Degrés & émotions, une ligne apparaît

**FR 4** — justification : #600, #613

Avant :

> - La **roue de tonalité** te laisse écouter ta gamme transposée dans une autre tonalité.

Après :

> - **L'Étoile des 24 tonalités** (l'ancienne roue de tonalité), et dans 🧰 Outils l'écoute de ta gamme dans une autre tonalité, te laissent écouter ta gamme transposée.

**EN 1** — justification : #422, #611, #613

Avant :

> Acoustic mode, "Complete" and the key wheel are **free**; permanently registering your two-handpan setup is part of the Studio version.

Après :

> Acoustic mode, "Complete" and the Star of the 24 keys are **free**, and your duo is saved to your account, even on the free tier: it follows you on all your devices.

**EN 2** — justification : #533, #608, #611, #613, #463

Avant :

> ## 🌗 Two checkboxes, and the banner appears
> 
> Setting a second handpan down now takes **two checkboxes**. Right-hand panel, **My handpans** block: tick one instrument and it plays alone; tick a second and the pair is set — badges **⓵** and **⓶**, in the order you ticked. The old "2nd pan" dropdowns (the guided strip, the "Complete" funnel) were removed at the end of August: one gesture is left, **🤝 Put alongside**, and it accepts every one of your instruments, Neotone and custom shells included.
> 
> A banner then appears above your pans:

Après :

> ## 🌗 The second pan, and the duo banner
> 
> > **Updated 23 October 2026.** The two checkboxes in the right-hand panel no longer exist. Your instruments now live in **My handpans**, as cards, and **🤝 My duo** has two slots. As soon as your two handpans are set down, the app asks **what you want to do with them**: 🌈 play everything, 🎵 play a song, 🎯 complete your key, or ✋ keep as is. Under the pans, two rows of cards: the 7 chords of your key, then the **extra** chords that only your two handpans together allow. A "✕ One handpan" button takes you back to a single instrument.
> 
> A banner appears above your pans. In its September version, the one in the screenshot below:

**EN 3** — justification : #447, #607 (nom) ; présence de la ligne : à vérifier

Avant :

> As soon as a scale is loaded in acoustic Logic Mode, a line appears

Après :

> As soon as an acoustic scale is loaded in Discover › Degrees & emotions, a line appears

**EN 4** — justification : #600, #613

Avant :

> - The **key wheel** (*roue de tonalité*) lets you listen to your scale transposed into another key.

Après :

> - **The Star of the 24 keys** (the former key wheel), and in 🧰 Tools the tool for hearing your scale in another key, let you listen to your scale transposed into another key.

**EN 5** — justification : #463

Avant :

> A "✕ One handpan" button takes you back

Après :

> A "✕ Un seul handpan" (*one handpan only*) button takes you back

**EN 6** — justification : #447, #607

Avant :

> loaded in Discover › Degrees & emotions, a line

Après :

> loaded in Discover › Degrees & emotions (*Découvrir › Degrés & émotions*), a line


### `handpan-studio-mode-acoustique`

**FR 1** — justification : #422, #446, #427

Avant :

> La sauvegarde de ta bibliothèque personnelle et les fonctions avancées relèvent de la version Studio, mais rien ne t'y oblige pour commencer.

Après :

> Ta bibliothèque personnelle est sauvegardée sur ton compte, même en gratuit ; certaines fonctions avancées relèvent des offres payantes, mais rien ne t'y oblige pour commencer.

**FR 2** — justification : #545, #557

Avant :

> Cet article date de juillet 2026. Depuis, le mode acoustique s'est réorganisé autour de **trois portes**, toutes gratuites, toutes dans le panneau de droite ou sous le pan.

Après :

> Cet article date de juillet 2026. Depuis, le mode acoustique s'est réorganisé autour de **trois portes**, toutes gratuites. Le panneau de droite est devenu un **rail** de cinq repères, toujours à la même place : ⏯ Lecture & tempo · 🎛 Dispositions & Logique · 🎓 Apprendre · 🧭 Explorer · ⋯ Plus (mise à jour du 23 octobre 2026).

**FR 3** — justification : #533, #535, #611

Avant :

> **Mes handpans.** Le panneau de droite ne s'ouvre plus sur le catalogue du monde mais sur **tes** instruments. Tu coches un handpan pour le jouer seul, tu en coches deux pour les jouer ensemble — c'est tout le sujet

Après :

> **Mes handpans.** Tous **tes** instruments, en cartes, avec leur vrai dessin. En haut, **🤝 Mon duo** a deux emplacements pour en jouer deux ensemble — c'est tout le sujet

**FR 4** — justification : #456, #469

Avant :

> **🎼 Atelier d'accords → ✨ Révéler.** Sous le pan, une barre affiche tous les accords jouables sur ton instrument. Le bouton

Après :

> **🎼 Atelier d'accords → ✨ Révéler.** L'Atelier d'accords s'ouvre dans un panneau à droite, sans cacher le pan, rangé en trois onglets : Explorer, Construire et Tonalité. Le bouton

**FR 5** — justification : #557

Avant :

> **🎯 Compléter ta gamme.** Le funnel qui compare

Après :

> **🎯 Compléter ta gamme.** Une pilule sous le nom de ton handpan, avec « · N notes manquantes » quand c'est le cas. Elle ouvre le funnel qui compare

**EN 1** — justification : #422, #446, #427

Avant :

> Saving your personal library and the advanced functions belong to the Studio version, but nothing forces you into it to get started.

Après :

> Your personal library is saved to your account, even on the free tier; some advanced functions belong to the paid plans, but nothing forces you into them to get started.

**EN 2** — justification : #545, #557

Avant :

> This article dates from July 2026. Since then, acoustic mode has reorganised itself around **three doors**, all free, all either in the right-hand panel or under the pan.

Après :

> This article dates from July 2026. Since then, acoustic mode has reorganised itself around **three doors**, all free. The right-hand panel has become a **rail** of five landmarks, always in the same place: ⏯ Playback & tempo · 🎛 Voicings & Logic · 🎓 Learn · 🧭 Explore · ⋯ More (updated 23 October 2026).

**EN 3** — justification : #533, #535, #611

Avant :

> **My handpans.** The right-hand panel no longer opens on the world's catalogue but on **your** instruments. Tick one handpan to play it alone, tick two to play them together — that's the whole subject

Après :

> **My handpans.** All **your** instruments, as cards, with their real drawing. At the top, **🤝 My duo** has two slots to play two of them together — that's the whole subject

**EN 4** — justification : #456, #469

Avant :

> **🎼 Chord workshop → ✨ Reveal.** Under the pan, a bar shows every chord playable on your instrument. The

Après :

> **🎼 Chord workshop → ✨ Reveal.** The chord workshop opens in a panel on the right, without hiding the pan, arranged in three tabs: Explore, Build and Key. The

**EN 5** — justification : #557

Avant :

> **🎯 Complete your scale.** The funnel that compares

Après :

> **🎯 Complete your scale.** A pill under your handpan's name, showing "· N missing notes" when that's the case. It opens the funnel that compares


### `mes-handpans-une-seule-porte`

**FR 1** — justification : #422, #611

Avant :

> Ce qui relève du **Studio**, c'est la **sauvegarde durable dans le cloud** : c'est elle qui fait que ta configuration te retrouve sur un autre appareil, et c'est justement le sujet du paragraphe précédent. En Découverte, tes instruments vivent sur la machine où tu les as déclarés.

Après :

> Et **tout est sauvegardé sur ton compte, même en gratuit** : tes handpans et tes duos te retrouvent sur un autre appareil, comme le décrit le paragraphe précédent.

**FR 2** — justification : #533, #535, #570, #611

Avant :

> Cet article est une réparation autant qu'une nouveauté.

Après :

> > **Mise à jour du 23 octobre 2026.** Depuis cet article, l'écran a encore changé. **Mes handpans** montre maintenant tous tes instruments en cartes, avec leur vrai dessin, en plein écran sur ordinateur. En haut, **🤝 Mon duo** a deux emplacements ; plus bas, **🤝 Mes duos** garde chaque duo enregistré, avec « ▶ Jouer le duo ». Chaque handpan garde son propre bois. Le mode d'emploi ci-dessous (le panneau de droite, les cases à cocher, la barre « POUR ») décrit l'écran du 1er septembre, celui que montrent les captures.
> 
> Cet article est une réparation autant qu'une nouveauté.

**FR 3** — justification : #592, #593 (+ carte des outils : 🟡)

Avant :

> **La reconnaissance de gamme au micro n'existe pas encore.** Si tu ne sais pas quelle est ta gamme, il faut passer par l'[Atlas Sonore](/blog/atlas-des-gammes-de-handpan) et la reconnaître à l'oreille. C'est annoncé, ce n'est pas fait.

Après :

> **La reconnaissance de gamme au micro est arrivée, et elle est encore jeune.** Si tu ne sais pas quelle est ta gamme, 🧰 Outils › « 🎤 Reconnaître ma gamme au micro » te guide pas à pas : tu joues tes notes, l'app les nomme, et le dessin de ton handpan se remplit à chaque note reconnue. Si le micro n'entend rien de reconnaissable, l'écoute dure deux minutes sans qu'on puisse l'interrompre. L'[Atlas Sonore](/blog/atlas-des-gammes-de-handpan) reste là pour la reconnaître à l'oreille.

**FR 4** — justification : #533, #535, #570, #611

Avant :

> > Panneau de droite → **Mes handpans** → **coche un instrument** pour le jouer seul, **coches-en deux** pour les jouer ensemble.
> 
> Il n'y a plus d'autre chemin. C'était le but.

Après :

> > **Mes handpans** → tes instruments en cartes ; **🤝 Mon duo** et ses deux emplacements pour en jouer deux ensemble ; **🤝 Mes duos** pour retrouver ceux que tu as enregistrés.
> 
> Une seule porte pour tes instruments. C'était le but.

**EN 1** — justification : #422, #611

Avant :

> What belongs to **Studio** is **lasting backup in the cloud**: that's what makes your setup find you again on another device, and it's exactly the subject of the previous section. In Discovery mode, your instruments live on the machine where you declared them.

Après :

> And **everything is saved to your account, even on the free tier**: your handpans and your duos find you again on another device, as the previous section describes.

**EN 2** — justification : #533, #535, #570, #611

Avant :

> This article is as much a repair as it is a new feature.

Après :

> > **Updated 23 October 2026.** Since this article, the screen has changed again. **My handpans** now shows all your instruments as cards, with their real drawing, full screen on a computer. At the top, **🤝 My duo** has two slots; further down, **🤝 My duos** keeps every saved duo, with "▶ Play the duo". Each handpan keeps its own wood. The how-to below (the right-hand panel, the tick boxes, the "FOR" bar) describes the 1 September screen, the one the screenshots show.
> 
> This article is as much a repair as it is a new feature.

**EN 3** — justification : #592, #593 (+ carte des outils : 🟡)

Avant :

> **Scale recognition by microphone doesn't exist yet.** If you don't know your scale, you have to go through the [Sound Atlas](/en/blog/atlas-des-gammes-de-handpan) and recognise it by ear. It's announced, it isn't built.

Après :

> **Scale recognition by microphone has arrived, and it is still young.** If you don't know your scale, the microphone scale-recognition tool in 🧰 Tools guides you step by step: you play your notes, the app names them, and the drawing of your handpan fills in with each note it recognises. If the microphone hears nothing recognisable, listening lasts two minutes and can't be interrupted. The [Sound Atlas](/en/blog/atlas-des-gammes-de-handpan) is still there to recognise it by ear.

**EN 4** — justification : #533, #535, #570, #611

Avant :

> > Right-hand panel → **My handpans** → **tick one instrument** to play it alone, **tick two** to play them together.
> 
> There's no other path any more. That was the point.

Après :

> > **My handpans** → your instruments as cards; **🤝 My duo** and its two slots to play two together; **🤝 My duos** to find the ones you saved.
> 
> One door for your instruments. That was the point.


### `apprendre-les-accords-handpan`

**FR 1** — justification : #481, #487, #515, #601

Avant :

> dans les deux cas, l'app allume sur l'écran les notes réelles de ta gamme, une par une.

Après :

> dans les deux cas, l'app allume sur l'écran les notes réelles de ta gamme, une par une.
> 
> > **Mise à jour du 23 octobre 2026.** Chaque accord a maintenant son bouton **🎓**, à côté de 👁 et ▶. Il ouvre un écran rien que pour lui, « Apprendre cet accord » : la note à jouer, son numéro et la main à utiliser, le tracé qui grandit à chaque bonne note, puis « Bien joué ! » et l'accord suivant. Tu choisis comment pratiquer (simple, aller-retour ou descendant) et qui t'écoute : le micro ou l'écran. Ça marche aussi avec deux handpans côte à côte. La capture ci-dessous montre la version de septembre.

**FR 2** — justification : #487, #514, #515

Avant :

> <!-- 📷 CAPTURE JUMELLE : PAS D'ÉQUIVALENT ACOUSTIQUE (vérifié le 09/09/2026).

Après :

> <!-- MAJ 23/10/2026 : ce constat est dépassé. L'écran 🎓 « Apprendre cet accord » existe (#487, #515) et le micro écoute un acoustique (#514). Capture acoustique ET Neotone à produire au lot 2. -->
> <!-- 📷 CAPTURE JUMELLE : PAS D'ÉQUIVALENT ACOUSTIQUE (vérifié le 09/09/2026).

**FR 3** — justification : #481

Avant :

> choisis un accord simple, et laisse-toi guider note après note.

Après :

> choisis un accord simple, touche son **🎓**, et laisse-toi guider note après note.

**EN 1** — justification : #481, #487, #515, #601

Avant :

> either way, the app lights up the real notes of your scale on screen, one at a time.

Après :

> either way, the app lights up the real notes of your scale on screen, one at a time.
> 
> > **Updated 23 October 2026.** Every chord now has its own **🎓** button, next to 👁 and ▶. It opens a screen just for that chord, "Learn this chord": the note to play, its number and the hand to use, the shape growing with each right note, then "Well played!" and the next chord. You choose how to practise (simple, back-and-forth or descending) and who listens to you: the microphone or the screen. It also works with two handpans side by side. The screenshot below shows the September version.

**EN 2** — justification : #487, #514, #515

Avant :

> <!-- 📷 TWIN SCREENSHOT: NO ACOUSTIC EQUIVALENT (checked 09/09/2026).

Après :

> <!-- UPDATE 23/10/2026: this finding is outdated. The 🎓 "Learn this chord" screen exists (#487, #515) and the microphone listens to an acoustic (#514). Acoustic AND Neotone screenshots to produce in batch 2. -->
> <!-- 📷 TWIN SCREENSHOT: NO ACOUSTIC EQUIVALENT (checked 09/09/2026).

**EN 3** — justification : #481

Avant :

> pick a simple chord, and let it guide you note by note.

Après :

> pick a simple chord, tap its **🎓**, and let it guide you note by note.

**EN 4** — justification : #487

Avant :

> a screen just for that chord, "Learn this chord": the note to play, its number and the hand to use, the shape growing with each right note, then "Well played!" and the next chord.

Après :

> a screen just for that chord, *Apprendre cet accord* (learn this chord): the note to play, its number and the hand to use, the shape growing with each right note, then a "well played" and the next chord.


### `jam-rapide-accompagner-un-musicien`

**FR 1** — justification : #402

Avant :

> et tu obtiens la même partition. Une seule étape de cet article vaut spécifiquement pour le handpan électronique, et elle est annoncée comme telle.

Après :

> et tu obtiens la même partition, posée sur ton propre instrument.

**FR 2** — justification : #402

Avant :

> ## La fiche « Voir la gamme » : une étape propre au handpan électronique
> 
> Celle-ci ne vaut que pour le handpan électronique. À la sortie du Jam Rapide, une fiche « Voir la gamme » te dessine l'instrument correspondant sur une **vraie coque Neotone** : chaque accord y est disposé fondamentale · tierce · quinte · octave, exactement comme en Mode Logique, et la coque se choisit toute seule — Neotone¹ à 10 notes si ça suffit, Mutant à 19 notes sinon.
> 
> Tu vois donc, avant de jouer une seule note, si le morceau tient sur ton instrument — et si tu joues sur un [Neotone](/neotone), tu peux charger cette disposition directement. Sur un handpan acoustique, il n'y a rien à charger : les notes y sont martelées une fois pour toutes. La fiche te sert alors seulement de point de comparaison — ce que le morceau demande, face à ce que ton pan possède.

Après :

> ## Ton instrument, pas un autre
> 
> > **Mise à jour du 23 octobre 2026.** En septembre, une fiche « Voir la gamme » dessinait à la sortie du Jam Rapide un instrument Neotone choisi par l'app. Elle a disparu en octobre.
> 
> Le Jam Rapide pose maintenant les accords sur **le handpan que tu as chargé**, avec les mêmes notes aux mêmes endroits. Si un accord ne peut pas être joué en entier sur ton instrument, la carte te dit quelle note manque. Transposer change la tonalité, jamais ton instrument.
> 
> Tu vois donc, avant de jouer une seule note, si le morceau tient sur ton instrument.

**FR 3** — justification : #402

Avant :

> <figcaption>La fiche de sortie. L'app annonce la coque qu'elle a retenue

Après :

> <figcaption><strong>L'ancienne fiche de sortie, telle qu'elle existait en septembre</strong> : elle n'existe plus depuis que le Jam Rapide joue sur ton instrument. L'app y annonçait la coque qu'elle avait retenue

**FR 4** — justification : capture

Avant :

> Le morceau est déjà rangé dans <em>Mes accompagnements</em>,

Après :

> Le morceau est déjà rangé dans <em>Mes morceaux</em>,

**FR 5** — justification : #430

Avant :

> La prochaine fois qu'on te lance une tonalité par-dessus l'épaule, ouvre [Handpan Constellation Studio](/handpan-app) et rends-la jouable

Après :

> La prochaine fois qu'on te lance une tonalité par-dessus l'épaule, ouvre [Handpan Constellation Studio](/handpan-app), puis **▶ Jouer › ⚡ Jam rapide**, et rends-la jouable

**FR 6** — justification : #402

Avant :

> Cliquer un degré trace son polygone sur l'instrument et liste ses notes.

Après :

> Cliquer un degré traçait son polygone sur l'instrument et listait ses notes.

**EN 1** — justification : #402

Avant :

> and you get the same score. Only one step in this article applies specifically to the electronic handpan, and it is flagged as such.

Après :

> and you get the same score, laid out on your own instrument.

**EN 2** — justification : #402

Avant :

> ## The "See the scale" card: a step specific to the electronic handpan
> 
> This one applies to the electronic handpan only. On the way out of Quick Jam, a "See the scale" card (*Voir la gamme*) draws the matching instrument on a **real Neotone shell**: each chord is voiced root · third · fifth · octave, exactly as in Logic Mode, and the shell picks itself — Neotone¹ with 10 notes if that's enough, Mutant with 19 otherwise.
> 
> So before playing a single note you can see whether the piece fits your instrument — and if you play a [Neotone](/en/neotone), you can load that layout straight away. On an acoustic handpan there is nothing to load: its notes are hammered into the steel once and for all. The card then serves purely as a comparison — what the piece asks for, against what your pan holds.

Après :

> ## Your instrument, not another one
> 
> > **Updated 23 October 2026.** In September, a "See the scale" card (*Voir la gamme*) drew, on the way out of Quick Jam, a Neotone instrument picked by the app. It was removed in October.
> 
> Quick Jam now lays the chords out on **the handpan you have loaded**, with the same notes in the same places. If a chord can't be played in full on your instrument, the card tells you which note is missing. Transposing changes the key, never your instrument.
> 
> So before playing a single note you can see whether the piece fits your instrument.

**EN 3** — justification : #402

Avant :

> <figcaption>The output card. The app names the shell it picked

Après :

> <figcaption><strong>The former output card, as it existed in September</strong>: it no longer exists now that Quick Jam plays on your instrument. The app named the shell it had picked

**EN 4** — justification : capture

Avant :

> The piece is already filed under <em>My accompaniments</em>,

Après :

> The piece is already filed under <em>Mes morceaux</em> (my pieces),

**EN 5** — justification : #430

Avant :

> open [Handpan Constellation Studio](/en/handpan-app) and make it playable

Après :

> open [Handpan Constellation Studio](/en/handpan-app), then **▶ Play › ⚡ Quick Jam** (*▶ Jouer › ⚡ Jam rapide*), and make it playable

**EN 6** — justification : #402

Avant :

> Clicking a degree draws its polygon on the instrument and lists its notes.

Après :

> Clicking a degree drew its polygon on the instrument and listed its notes.


### `layouts-vocaux-handpan`

**FR 1** — justification : #545

Avant :

> Les layouts vocaux sont trois réglages du [Mode Logique

Après :

> Les layouts vocaux — que l'app appelle aujourd'hui **« Dispositions d'accord »** — sont trois réglages du [Mode Logique

**FR 2** — justification : #545, #559

Avant :

> </figure>
> 
> ## Les trois presets

Après :

> </figure>
> 
> > **Mise à jour du 23 octobre 2026.** La capture date de juillet. Ce réglage vit maintenant dans le rail de droite, repère **🎛 Dispositions & Logique**, et chaque carte d'accord porte une puce (« Profond ▾ ») qui change le registre pour ce seul degré. En Découverte, les trois positions s'appellent 🌑 Grave · ☀️ Clair · 🌈 Large.
> 
> ## Les trois presets

**FR 3** — justification : #613

Avant :

> sur un acoustique, la roue de tonalité te fait *entendre*

Après :

> sur un acoustique, la roue de tonalité (aujourd'hui L'Étoile des 24 tonalités) te fait *entendre*

**FR 4** — justification : #545

Avant :

> essaie les trois layouts, et laisse

Après :

> essaie les trois dispositions, et laisse

**EN 1** — justification : #545

Avant :

> Vocal layouts are three settings of [Handpan Constellation Studio's Logic Mode]

Après :

> Vocal layouts — which the app now calls **chord voicings** (*Dispositions d'accord*) — are three settings of [Handpan Constellation Studio's Logic Mode]

**EN 2** — justification : #545, #559

Avant :

> </figure>
> 
> ## The three presets

Après :

> </figure>
> 
> > **Updated 23 October 2026.** The screenshot dates from July. This setting now lives in the right-hand rail, under the **🎛 Voicings & Logic** landmark, and each chord card carries a chip ("Deep ▾") that changes the register for that degree alone. In Discovery level, the three positions are called 🌑 Low · ☀️ Clear · 🌈 Wide.
> 
> ## The three presets

**EN 3** — justification : #613

Avant :

> on an acoustic one, the key wheel lets you *hear*

Après :

> on an acoustic one, the key wheel (now the Star of the 24 keys) lets you *hear*

**EN 4** — justification : #545

Avant :

> try the three layouts, and let

Après :

> try the three voicings, and let


### `les-4-accords-magiques-handpan`

**FR 1** — justification : #545

Avant :

> pense à choisir un layout vocal adapté à ta voix

Après :

> pense à choisir une [disposition d'accord](/blog/layouts-vocaux-handpan) adaptée à ta voix

**EN 1** — justification : #545

Avant :

> remember to pick a vocal layout suited to your voice

Après :

> remember to pick a [chord voicing](/en/blog/layouts-vocaux-handpan) suited to your voice


### `neotone-10-ou-19-notes`

**FR 1** — justification : #545

Avant :

> Les [layouts vocaux](/blog/layouts-vocaux-handpan) montrent

Après :

> Les [dispositions d'accord](/blog/layouts-vocaux-handpan) (autrefois « layouts vocaux ») montrent

**EN 1** — justification : #545

Avant :

> The [vocal layouts](/en/blog/layouts-vocaux-handpan) show

Après :

> The [chord voicings](/en/blog/layouts-vocaux-handpan) (formerly "vocal layouts") show


### `completer-son-handpan-acoustique-avec-un-neotone`

**FR 1** — justification : #545

Avant :

> ## L'app connaît déjà ce problème : le Layout vocal

Après :

> ## L'app connaît déjà ce problème : les Dispositions d'accord

**FR 2** — justification : #545

Avant :

> sous le nom de **Layout vocal**.

Après :

> sous le nom de **Dispositions d'accord** (autrefois « Layout vocal »).

**FR 3** — justification : #545

Avant :

> C'est la structure même de ces trois layouts,

Après :

> C'est la structure même de ces trois dispositions,

**EN 1** — justification : #545

Avant :

> ## The app already knows this problem: the Vocal Layout

Après :

> ## The app already knows this problem: chord voicings

**EN 2** — justification : #545

Avant :

> under the name **Vocal Layout**.

Après :

> under the name **chord voicings** (*Dispositions d'accord*, formerly "Vocal Layout").

**EN 3** — justification : #545

Avant :

> That's the very structure of these three layouts,

Après :

> That's the very structure of these three voicings,


### `transposer-pour-chanter-handpan`

**FR 1** — justification : #600, #613

Avant :

> depuis la carte qui annonce l'instrument sur lequel tu joues, une **roue de tonalité** te laisse *tester* ta gamme dans une autre tonalité.

Après :

> une **roue de tonalité**, aujourd'hui **L'Étoile des 24 tonalités**, te laisse *tester* ta gamme dans une autre tonalité ; c'est aussi un raccourci de 🧰 Outils : écouter ta gamme dans une autre tonalité.

**FR 2** — justification : #545

Avant :

> ### Transposition et layout : le duo gagnant

Après :

> ### Transposition et disposition d'accord : le duo gagnant

**FR 3** — justification : #545

Avant :

> le layout vocal règle la **forme** de l'accompagnement autour de la voix. Ensemble, ils moulent la chanson autour de toi : tu choisis un [layout vocal](/blog/layouts-vocaux-handpan) adapté

Après :

> la disposition d'accord (autrefois « layout vocal ») règle la **forme** de l'accompagnement autour de la voix. Ensemble, elles moulent la chanson autour de toi : tu choisis une [disposition d'accord](/blog/layouts-vocaux-handpan) adaptée

**EN 1** — justification : #600, #613

Avant :

> from the card naming the instrument you play on, a **key wheel** lets you *test* your scale in another key.

Après :

> a **key wheel**, now **the Star of the 24 keys**, lets you *test* your scale in another key; it's also a shortcut in 🧰 Tools: hearing your scale in another key.

**EN 2** — justification : #545

Avant :

> ### Transposition and layout: the winning duo

Après :

> ### Transposition and chord voicing: the winning duo

**EN 3** — justification : #545

Avant :

> the vocal layout sets the **shape** of the accompaniment around the voice. Together they mould the song around you: you pick a [vocal layout](/en/blog/layouts-vocaux-handpan) suited

Après :

> the chord voicing (formerly "vocal layout") sets the **shape** of the accompaniment around the voice. Together they mould the song around you: you pick a [chord voicing](/en/blog/layouts-vocaux-handpan) suited


### `les-constellations-du-handpan`

**FR 1** — justification : #416

Avant :

> Le réglage se trouve dans la palette, sous **Constellation**

Après :

> Le réglage se trouve dans la palette (bouton **🎨 Affichage**), sous **Constellation**

**EN 1** — justification : #416

Avant :

> The setting lives in the palette, under **Constellation**

Après :

> The setting lives in the palette (the **🎨 Display** button, *Affichage*), under **Constellation**


### `le-capo-du-handpan`

**FR 1** — justification : #416

Avant :

> Dans la palette d'outils, section **Notation**

Après :

> Dans la palette d'outils (bouton **🎨 Affichage**), section **Notation**

**FR 2** — justification : #600

Avant :

> En mode acoustique, il y a un bouton **« Tester une autre tonalité »**. Il sert à autre chose.

Après :

> En mode acoustique, il y a un bouton **« Tester une autre tonalité »** (aujourd'hui aussi en un clic dans 🧰 Outils : écouter ta gamme dans une autre tonalité). Il sert à autre chose.

**FR 3** — justification : #545

Avant :

> C'est le sujet des [layouts vocaux](/blog/layouts-vocaux-handpan) — Profond, Ample, Brillant —

Après :

> C'est le sujet des [dispositions d'accord](/blog/layouts-vocaux-handpan) (autrefois « layouts vocaux ») — Profond, Ample, Brillant —

**EN 1** — justification : #416

Avant :

> In the tool palette, **Notation** section

Après :

> In the tool palette (the **🎨 Display** button, *Affichage*), **Notation** section

**EN 2** — justification : #600

Avant :

> In acoustic mode, there is a **"Try a different key"** button. It serves something else.

Après :

> In acoustic mode, there is a **"Try a different key"** button (now also one click away in 🧰 Tools: hearing your scale in another key). It serves something else.

**EN 3** — justification : #545

Avant :

> That's the subject of the [vocal layouts](/en/blog/layouts-vocaux-handpan) — Deep, Wide, Bright —

Après :

> That's the subject of the [chord voicings](/en/blog/layouts-vocaux-handpan) (formerly "vocal layouts") — Deep, Wide, Bright —


### `les-deux-visions-chromakeys`

**FR 1** — justification : #416

Avant :

> En haut de l'écran, la bande d'outils. Dedans, un îlot au contour multicolore : **ChromaKeys**.

Après :

> En haut de l'écran, le bouton **🎨 Affichage** ouvre la palette d'outils. Dedans, un îlot au contour multicolore : **ChromaKeys**.

**FR 2** — justification : #430, #447

Avant :

> ça se travaille dans le mode **Chanter & Jouer**

Après :

> ça se travaille dans le menu **🎤 Chanter**

**FR 3** — justification : #525

Avant :

> **Hors du mode Logique** — en Gammes, dans Mon instrument, et toujours

Après :

> **Hors du mode Logique** — en Gammes, dans Créer › Une gamme, et toujours

**EN 1** — justification : #416

Avant :

> At the top of the screen, the toolbar. Inside it, an island with a multicoloured outline: **ChromaKeys**.

Après :

> At the top of the screen, the **🎨 Display** button (*Affichage*) opens the tool palette. Inside it, an island with a multicoloured outline: **ChromaKeys**.

**EN 2** — justification : #430, #447

Avant :

> it's worked on in **Sing & Play** mode

Après :

> it's worked on in the **🎤 Sing** menu (*Chanter*)

**EN 3** — justification : #525

Avant :

> **Outside Logic mode** — in Scales, in My instrument, and always

Après :

> **Outside Logic mode** — in Scales, in Create › A scale (*Une gamme*), and always


### `creer-sa-gamme-de-handpan`

**FR 1** — justification : #525

Avant :

> (aujourd'hui la carte « Mon instrument » de l'écran **Créer**)

Après :

> (aujourd'hui la carte « Une gamme » de l'écran **Créer**)

**FR 2** — justification : #525

Avant :

> (aujourd'hui « Mon instrument », dans <strong>Créer</strong>)

Après :

> (aujourd'hui « Une gamme », dans <strong>Créer</strong>)

**EN 1** — justification : #525

Avant :

> (now the "My instrument" card in the **Create** screen)

Après :

> (now the "A scale" card, *Une gamme*, in the **Create** screen)

**EN 2** — justification : #525

Avant :

> (now "My instrument", in <strong>Create</strong>)

Après :

> (now "A scale", in <strong>Create</strong>)


### `reveler-les-accords-de-ton-handpan`

**FR 1** — justification : #430, #456

Avant :

> Charge ta gamme en mode acoustique. Sous le pan, tu as la barre

Après :

> > **Mise à jour du 23 octobre 2026.** Le chemin a changé. L'Atelier d'accords s'ouvre maintenant dans un panneau à droite, sans cacher le pan, et ✨ Révéler figure aussi dans l'onglet **▶ Jouer**, parmi ce que ton pan permet. Le paragraphe suivant décrit le chemin de septembre.
> 
> Charge ta gamme en mode acoustique. Sous le pan, tu as la barre

**EN 1** — justification : #430, #456

Avant :

> Load your scale in acoustic mode. Under the pan you have the

Après :

> > **Updated 23 October 2026.** The route has changed. The chord workshop now opens in a panel on the right, without hiding the pan, and ✨ Reveal also sits in the **▶ Play** tab, among what your pan allows. The next paragraph describes the September route.
> 
> Load your scale in acoustic mode. Under the pan you have the


### `feedback-ameliorer-handpan-studio`

**FR 1** — justification : carte des outils (porte unique depuis le 24/08)

Avant :

> Ouvre le menu d'aide de [Handpan Constellation Studio](/handpan-app), clique sur **« Un retour ? »**, et une petite fenêtre

Après :

> Dans [Handpan Constellation Studio](/handpan-app), clique sur **💬 Donner mon avis**, en haut de l'écran, et une petite fenêtre

**FR 2** — justification : carte des outils

Avant :

> clique sur « Un retour ? », et dis-le-moi.

Après :

> clique sur « 💬 Donner mon avis », et dis-le-moi.

**FR 3** — justification : #571, #472

Avant :

> - 💬 **Donner un avis** — « un retour général, un ressenti ».

Après :

> - 💬 **Donner un avis** — « un retour général, un ressenti ».
> 
> Pour un bug, il y a plus court : le bouton **🐞 Signaler un bug**, à côté de la cloche dans l'en-tête, ouvre directement le formulaire. Et l'app joint d'elle-même ce qu'il faut pour comprendre ton problème : l'écran où tu étais, ton handpan et tes derniers gestes.

**EN 1** — justification : carte des outils (porte unique depuis le 24/08)

Avant :

> Open the help menu in [Handpan Constellation Studio](/en/handpan-app), click **"Feedback"**, and a small window

Après :

> In [Handpan Constellation Studio](/en/handpan-app), click **💬 Give my opinion** (*Donner mon avis*), at the top of the screen, and a small window

**EN 2** — justification : carte des outils

Avant :

> click "Feedback", and tell me.

Après :

> click "💬 Give my opinion", and tell me.

**EN 3** — justification : #571, #472

Avant :

> - 💬 **Share a thought** — "general feedback, a feeling".

Après :

> - 💬 **Share a thought** — "general feedback, a feeling".
> 
> For a bug there's a shorter route: the **🐞 Report a bug** button, next to the bell in the header, opens the form directly. And the app itself attaches what's needed to understand your problem: the screen you were on, your handpan and your last few actions.


### `handpan-emotions-degres`

**FR 1** — justification : #447, #607

Avant :

> Ouvre [Handpan Constellation Studio](/handpan-app) et compose ta première phrase

Après :

> Ouvre [Handpan Constellation Studio](/handpan-app), va dans **Découvrir › Degrés & émotions**, et compose ta première phrase

**EN 1** — justification : #447, #607

Avant :

> Open [Handpan Constellation Studio](/en/handpan-app) and compose your first phrase

Après :

> Open [Handpan Constellation Studio](/en/handpan-app), go to **Discover › Degrees & emotions** (*Découvrir › Degrés & émotions*), and compose your first phrase


### `accompagner-des-chansons-au-handpan`

**FR 1** — justification : lien (charte §4)

Avant :

> Le [Mode Chanson](/handpan-app) va plus loin

Après :

> Le [Mode Chanson](/blog/editeur-de-partition-handpan) va plus loin

**FR 2** — justification : #447, #607

Avant :

> Ouvre [Handpan Constellation Studio](/handpan-app) et pose ta première suite d'accords

Après :

> Ouvre [Handpan Constellation Studio](/handpan-app), va dans **Découvrir › Degrés & émotions**, et pose ta première suite d'accords

**EN 1** — justification : lien (charte §4)

Avant :

> The [Song Mode](/en/handpan-app) goes further

Après :

> The [Song Mode](/en/blog/editeur-de-partition-handpan) goes further

**EN 2** — justification : #447, #607

Avant :

> Open [Handpan Constellation Studio](/en/handpan-app) and lay down your first chord sequence

Après :

> Open [Handpan Constellation Studio](/en/handpan-app), go to **Discover › Degrees & emotions** (*Découvrir › Degrés & émotions*), and lay down your first chord sequence


### `editeur-de-melodies-handpan`

**FR 1** — justification : #597 (+ carte des outils : 🟡)

Avant :

> — seule la prise au vol par MIDI, décrite plus bas, demande un instrument électronique.

Après :

> — la prise au vol par MIDI demande un instrument électronique, et un acoustique peut s'enregistrer au micro, comme décrit plus bas.

**FR 2** — justification : #597 (+ carte des outils : 🟡)

Avant :

> ## Enregistrer ce que tu joues (handpan électronique)
> 
> Cette section-là ne concerne que les handpans électroniques : il faut une sortie MIDI, qu'un pan acoustique n'a pas.

Après :

> ## Enregistrer ce que tu joues
> 
> La prise au vol par MIDI ne concerne que les handpans électroniques : il faut une sortie MIDI, qu'un pan acoustique n'a pas.

**FR 3** — justification : #597 (+ carte des outils : 🟡)

Avant :

> Tu corriges ensuite à la souris ce que la main a raté.

Après :

> Tu corriges ensuite à la souris ce que la main a raté.
> 
> **Sur un handpan acoustique**, c'est le micro qui écoute. Depuis le 22 octobre, Importer propose « ⏺ M'enregistrer maintenant » : tu joues, ⏹ Arrêter, et l'app te propose les notes ; tu corriges à l'oreille. Le son ne quitte pas ton appareil. C'est aussi un outil à part dans 🧰 Outils : « Transcrire mon jeu au micro ». C'est encore jeune : fiable sur un jeu lent et propre, beaucoup moins sur un jeu rapide.

**FR 4** — justification : #326

Avant :

> L'éditeur s'ouvre depuis la **Bibliothèque musicale**,

Après :

> L'éditeur s'ouvre depuis **Créer** et depuis la **Bibliothèque musicale**,

**EN 1** — justification : #597 (+ carte des outils : 🟡)

Avant :

> — only the live MIDI capture described below needs an electronic instrument.

Après :

> — live MIDI capture needs an electronic instrument, and an acoustic one can record itself through the microphone, as described below.

**EN 2** — justification : #597 (+ carte des outils : 🟡)

Avant :

> ## Recording what you play (electronic handpan)
> 
> This section applies to electronic handpans only: it needs a MIDI output, which an acoustic pan does not have.

Après :

> ## Recording what you play
> 
> Live MIDI capture applies to electronic handpans only: it needs a MIDI output, which an acoustic pan does not have.

**EN 3** — justification : #597 (+ carte des outils : 🟡)

Avant :

> Then you fix with the mouse whatever your hand missed.

Après :

> Then you fix with the mouse whatever your hand missed.
> 
> **On an acoustic handpan**, the microphone does the listening. Since 22 October, Import offers *⏺ M'enregistrer maintenant* (record myself now): you play, ⏹ Stop, and the app suggests the notes; you correct them by ear. The sound never leaves your device. It's also a tool of its own in 🧰 Tools: *Transcrire mon jeu au micro* (transcribe my playing by microphone). It is still young: reliable on slow, clean playing, much less on fast playing.

**EN 4** — justification : #326

Avant :

> The editor opens from the **music library** (*Bibliothèque musicale*),

Après :

> The editor opens from **Create** (*Créer*) and from the **music library** (*Bibliothèque musicale*),


### `jouer-avec-un-batteur-handpan`

**FR 1** — justification : #491, #494, #497, #595

Avant :

> *Électro & Dance*, *Du monde*. Chacun a ses fills.

Après :

> *Électro & Dance*, *Du monde*. Chacun a ses fills.
> 
> C'était le compte du 1er septembre. Depuis, le batteur a gagné sept rythmes urbains (trap, drill, boom bap, afro-trap, dembow, amapiano…) et de nouveaux sons : un kit « Doux » par défaut, qui va bien avec le handpan, un kit « Acoustique », un kit « Acoustique réel » de vraies percussions enregistrées, et des kits Trap 808, Boom bap, House et Lo-fi. L'ancien son reste disponible sous le nom « Électro ». Et dans l'éditeur de mélodies, le batteur suit maintenant la mélodie sur une seule horloge.

**EN 1** — justification : #491, #494, #497, #595

Avant :

> *Electronic & Dance*, *From around the world*. Each one has its fills.

Après :

> *Electronic & Dance*, *From around the world*. Each one has its fills.
> 
> That was the count on 1 September. Since then, the drummer has gained seven urban rhythms (trap, drill, boom bap, afro-trap, dembow, amapiano…) and new sounds: a "Soft" kit by default (*Doux*), which sits well with the handpan, an "Acoustic" kit, a "Real acoustic" kit of genuinely recorded percussion, and Trap 808, Boom bap, House and Lo-fi kits. The old sound is still available under the name "Electro". And in the melody editor, the drummer now follows the melody on a single clock.

