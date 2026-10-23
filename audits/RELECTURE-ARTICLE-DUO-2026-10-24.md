# Relecture : « Jouer deux handpans ensemble » (FR + EN)

Commit relu : `dfaffe7`. Fichiers : `src/content/blog/deux-handpans-ensemble.md`, `deux-handpans-ensemble-en.md`, renvois ajoutés dans `deux-handpans-mode-hybride(-en).md`.
Relecteur distinct de l'auteur, 23/10/2026, lecture seule.

## VERDICT : publiable APRÈS corrections

Il n'y a rien de faux de façon grave, et le réservé aux bêta-testeurs est bien signalé. Mais il faut corriger avant de publier :
1. les **noms des trois duos** (décision de David du 23/10, voir §A) ;
2. le **titre incrusté « Le mode Hybride »** de la vidéo `duo-hybride-revele` (voir §B) ;
3. le **« joker »** (§C) ;
4. **trois inexactitudes** sur l'app : « il faut un ordinateur », « pour tout le monde », « Neotone Connexion » en anglais (§D).

Build `npx astro build` : OK (134 pages). Tous les liens internes résolvent. Le rendu à 390 px ne déborde pas (scrollWidth = 390).
Captures : `/private/tmp/claude-501/-Users-davidlesage-CLAUDE/d7f07e1f-7686-41e9-a369-7f4bc8e9d723/scratchpad/relecture-duo/` (`fr-bureau.png`, `en-bureau.png`, `fr-mobile-390.png`, `en-mobile-390.png`, plus les images extraites des vidéos `hyb-*.jpg`, `comp-*.jpg` et `titre.jpg`).

---

## A. BLOQUANT : les trois noms de duo (décision de David du 23/10)

Les mots de David : « on joue en même temps un handpan acoustique et électronique, c'est un Duo Hybride Électro-Acoustique ».
La règle : **Duo hybride électro-acoustique** (forme courte « Duo hybride ») · **Duo acoustique** · **Duo électronique**. En anglais : *Hybrid electro-acoustic duo* · *Acoustic duo* · *Electronic duo*.
L'article n'emploie aujourd'hui aucun de ces trois noms. Voici les remplacements exacts.

### FR : `deux-handpans-ensemble.md`

| Ligne | Actuel | Remplacer par |
|---|---|---|
| 63 (titre) | `## Quand l'un des deux est un Neotone : « Que veux-tu faire avec ces deux handpans ? »` | `## Duo hybride électro-acoustique : « Que veux-tu faire avec ces deux handpans ? »` |
| 99 (titre) | `## Deux acoustiques : ce que tu peux faire avec ce que tu as` | `## Duo acoustique : ce que tu peux faire avec ce que tu as` |
| 123 (titre) | `## Deux Neotone : chacun sur son pan` | `## Duo électronique : chacun sur son pan` |
| 15 | `Cet article parle de tous les duos. Une section est réservée au cas où l'un des deux est un Neotone, et une autre au cas où les deux le sont : elles le disent dans leur titre.` | `Cet article parle des trois sortes de duos : le **duo acoustique** (deux handpans acoustiques), le **duo hybride électro-acoustique** (un acoustique et un Neotone) et le **duo électronique** (deux Neotone). Les sections propres à l'un d'eux le disent dans leur titre.` |
| 29 | `Les deux handpans s'affichent côte à côte, chacun avec ses propres notes. Le duo peut réunir deux acoustiques, un acoustique et un Neotone, ou deux Neotone.` | `Les deux handpans s'affichent côte à côte, chacun avec ses propres notes. Le duo peut être acoustique (deux acoustiques), hybride électro-acoustique (un acoustique et un Neotone) ou électronique (deux Neotone).` |
| 65 | `**Cette section concerne les duos où l'un des handpans au moins est un Neotone.** Les notes…` | `**Cette section concerne le duo hybride : un handpan acoustique et un Neotone.** Les notes…` (la suite est inchangée) |
| 125 | `**Cette section concerne deux handpans électroniques branchés en USB**, par exemple un Mutant et un Neotone¹.` | `**Cette section concerne le duo électronique : deux Neotone branchés en USB**, par exemple un Mutant et un Neotone¹.` |
| 155 | `- **Deux acoustiques** : des accords…` | `- **Duo acoustique** : des accords…` |
| 156 | `- **Un acoustique et un Neotone** : le Neotone prend…` | `- **Duo hybride électro-acoustique** : le Neotone prend…` |
| 157 | `- **Deux Neotone** : chacun sur son pan…` | `- **Duo électronique** : chacun sur son pan…` |

Ligne 65 : avec « l'un au moins », la section couvrait aussi deux Neotone. Or tout son contenu (les notes martelées, la gamme qui complète l'acoustique) ne vaut que pour acoustique + Neotone. Le nouveau nom règle ce flou.

### EN : `deux-handpans-ensemble-en.md`

| Ligne | Actuel | Remplacer par |
|---|---|---|
| 63 | `## When one of the two is a Neotone: "What do you want to do with these two handpans?"` | `## Hybrid electro-acoustic duo: "What do you want to do with these two handpans?"` |
| 91 | `## Two acoustic handpans: what you can do with what you have` | `## Acoustic duo: what you can do with what you have` |
| 109 | `## Two Neotones: each on its own pan` | `## Electronic duo: each on its own pan` |
| 15 | `This article covers every kind of pair. One section is for pairs where one handpan is a Neotone, another for pairs where both are: their titles say so.` | `This article covers the three kinds of duo: the **acoustic duo** (two acoustic handpans), the **hybrid electro-acoustic duo** (one acoustic and one Neotone) and the **electronic duo** (two Neotones). Sections specific to one of them say so in their title.` |
| 29 | `A pair can be two acoustic handpans, one acoustic and one Neotone, or two Neotones.` | `A duo can be acoustic (two acoustic handpans), hybrid electro-acoustic (one acoustic and one Neotone) or electronic (two Neotones).` |
| 65 | `**This section is about pairs where at least one handpan is a Neotone.**` | `**This section is about the hybrid duo: one acoustic handpan and one Neotone.**` |
| 111 | `**This section is about two electronic handpans plugged in over USB**, for example…` | `**This section is about the electronic duo: two Neotones plugged in over USB**, for example…` |
| 141 | `- **Two acoustic handpans**: chords…` | `- **Acoustic duo**: chords…` |
| 142 | `- **One acoustic and one Neotone**: the Neotone takes…` | `- **Hybrid electro-acoustic duo**: the Neotone takes…` |
| 143 | `- **Two Neotones**: each on its own pan…` | `- **Electronic duo**: each on its own pan…` |

Les libellés de l'app en anglais restent ceux de l'app : « 🤝 My pair », « ▶ Play the pair », « My pairs », « Try this pair ». En anglais, le texte dira donc *duo* pour la catégorie et *pair* pour les boutons. C'est cohérent, mais la session de l'app pourrait aligner ses libellés EN sur *duo*. Je le signale, rien de bloquant.

Contrôle « Hybride » : en dehors des noms de fichiers (`duo-hybride-revele`, slug `deux-handpans-mode-hybride`), le mot n'apparaît nulle part dans le texte. Conforme. L'app elle-même affiche encore « Hybride » (bandeau visible sur la tablette dans la vidéo, et « Hybride généré » dans le #608). Ce n'est pas du texte de l'article, mais l'app devra suivre la même règle de noms.

## B. BLOQUANT : la vidéo `duo-hybride-revele` (titre « Le mode Hybride »)

Ce que j'ai vu image par image : de 0 à environ 5,5 s, une carte titre « HANDPAN CONSTELLATION STUDIO · **Le mode Hybride** · Complète ton handpan acoustique avec un **numérique** pour débloquer les 24 tonalités ». À partir de 6 s, la carte « Les mêmes notes » enchaîne. L'affiche (poster) ne montre pas ce titre.
Cette carte enfreint trois règles : « mode » (nouvelle règle de David), « le mode Hybride » comme nom de fonction (charte §3), et « numérique » au lieu de Neotone ou électronique.

**Recommandation : ne pas la publier telle quelle, mais ne pas la retirer non plus.** En attendant la vidéo refaite, couper la carte titre (les 6 premières secondes). Tout le reste de la vidéo est juste et conforme à sa légende. Exemple :
`ffmpeg -ss 6 -i public/videos/blog/duo-hybride-revele.mp4 -c:v libx264 -crf 20 -c:a aac public/videos/blog/duo-hybride-revele-court.mp4`, puis pointer l'article (ligne 82 et ligne 83) sur ce fichier.
Si personne ne peut le faire avant la publication, mieux vaut retirer le `<figure>` des lignes 80 à 86 que publier le titre. La ligne 97 renvoie déjà vers l'article chiffré.

## C. À CORRIGER : le mot « joker »

L'app a une fonction bêta (Multi-handpans, #560) avec le commutateur « 🎯 Gamme choisie | **🃏 Joker** ». En mode Joker, le Neotone « complète ce qui manque ». C'est exactement l'idée de la phrase. En **gras**, le mot ressemble en plus à un libellé : un lecteur qui ouvrira Multi-handpans croira que le duo a un « mode Joker ». Il y a donc un risque réel de confusion avec une fonction bêta.

- FR, ligne 67 : `C'est ce qui fait du Neotone le **joker** de ton acoustique. L'app lui écrit la gamme qui complète la tienne.`
  → `C'est ce qui permet au Neotone de **compléter** ton acoustique : l'app lui propose la gamme qui comble ce qui manque à la tienne.`
- EN, ligne 67 : `That makes the Neotone the **joker** of your acoustic handpan. The app writes it the scale that completes yours.`
  → `That is what lets the Neotone **complete** your acoustic handpan: the app suggests the scale that fills in what yours is missing.`

« écrit » est remplacé par « propose » : écrire la gamme sur l'instrument est justement la partie réservée aux bêta-testeurs.

## D. À CORRIGER : exactitude

1. **« il faut un ordinateur »**, FR ligne 131 (et ligne 157) ; EN lignes 117 et 143. L'app dit autre chose (translations.ts) : « Utilise Chrome ou Edge sur un ordinateur (Mac ou PC) ou sur une tablette Android », et sur iPad elle propose l'app gratuite « Web MIDI Browser ».
   - FR 131 : `Et sur iPad et iPhone, aucun navigateur ne donne accès au MIDI : il faut un ordinateur.` → `Et sur iPad et iPhone, aucun navigateur ne donne accès au MIDI : branche-les sur un ordinateur ou une tablette Android.`
   - FR 157 : `- **Deux Neotone** : chacun sur son pan, en USB, sur ordinateur.` → (avec le nom du §A) `- **Duo électronique** : chacun sur son pan, en USB, sur ordinateur ou tablette Android.`
   - EN 117 : `…no browser gives access to MIDI: you need a computer.` → `…no browser gives access to MIDI: plug them into a computer or an Android tablet.`
   - EN 143 : `…over USB, on a computer.` → `…over USB, on a computer or an Android tablet.`
   (Je n'ai pas vérifié que Web MIDI Browser gère deux Neotone, donc je ne l'ajoute pas.)
2. **« pour tout le monde »**, FR ligne 95 ; EN « for everyone », ligne 87. Dans le code (`acoustic/duo-complement-neotone.ts`, l. 335 et l. 486), c'est le **même bouton** : 📡 « Charger sur mon Neotone » pour les comptes qui ont le relais, 📋 « Copier les notes pour mon Neotone » pour tous les autres. Un bêta-testeur ne voit pas « Copier ».
   - FR : `- **« Copier les notes pour mon Neotone »**, pour tout le monde : l'app copie…` → `- **« Copier les notes pour mon Neotone »**, à la place du chargement direct pour tous les autres : l'app copie…`
   - EN : `- **"Copy the notes for my Neotone"**, for everyone: the app copies…` → `- **"Copy the notes for my Neotone"**, in place of direct loading for everyone else: the app copies…`
3. **EN, ligne 86** : `(Neotone Connexion)` → `(Neotone Connection)`. C'est le libellé anglais de l'app (`v2.outils.passerelle.nom`, `ntr.titre`).
4. FR ligne 90, suggestion : la phrase « L'app le dit clairement : ton instrument n'a pas changé tant que tu ne la charges pas » ne s'affiche qu'avec le relais. Sans relais, l'app affiche « Le chargement direct par internet est en bêta… copie les notes ». La phrase reste vraie sur le fond, donc pas bloquant.
5. FR ligne 145 / EN ligne 131, suggestion : « Si tu fermes l'app en plein travail ». L'app parle de **rechargement de la page** (#608 : « après une actualisation », guide « Au rechargement de la page »). Remplacer par `Si tu actualises la page en plein travail, **« Reprendre »**…` / `If you reload the page mid-session, **"Pick up where I left off"**…`

Affirmations vérifiées et conformes :
- Mon duo, ① ②, ▶ Jouer le duo, le chemin « Changer d'instrument ▾ › Mes handpans » (guide.v3.comp.duo, mih.duo.aide).
- Les deux rangées, « En plus, grâce à tes deux handpans ensemble », « ⚡ seulement à deux » (#608, duo.uni.*).
- L'œil sur les deux pans, les notes numérotées, le trait, les autres notes éteintes avec leur nom (#601, #613).
- Les dispositions Fondam. / Fond.+8 / Renv. 1 / Renv. 2 et « En grand » (#608, #601, apx.photo).
- Les 4 réponses, le passeport vocal, le gain d'abord, le choix retenu par paire, le repli et « Changer » (#604, #608, duo.but.*).
- Essayer cette gamme, Revenir à sa gamme, le chargement direct **réservé aux bêta-testeurs** (duo.complement.relais_reserve, `peutCharger()`), la gamme enregistrée sur le compte Neotone hors ligne, la copie ding d'abord (#604, #608, code).
- Le bloc « Ce que tu peux faire avec ces deux handpans » et « Apprendre un accord à deux » (#608, duo.fixe.*).
- La pilule Compléter, « Quel 2ᵉ handpan me complète le mieux ? », « Essayer ce duo » sans rien enregistrer (cbest.*, vidéo).
- La réserve sur le petit nombre de partitions (carte des outils : huit partitions).
- Associer mes deux Neotone, les doublons écartés, une piste MIDI par instrument (#589), les frappes du 2ᵉ Neotone dans Apprendre un accord (#613), Midi connect hors Découverte (carte des outils).
- Mes duos ▶ ✎ 🗑, la synchronisation entre appareils (#611), même en Gratuit (#422).
- En Découverte, « Compléter mes accords » sans tonalités ni noms de notes (duo-complement-neotone.ts l. 267-270).

## E. Médias

| Média | Ce qu'on voit | Légende | Remarques |
|---|---|---|---|
| Couverture `blog-deux-handpans-ensemble-photo.webp` | Un acoustique cuivré et un Neotone en bois côte à côte, l'iPad sur son bras qui affiche le duo | (couverture) | OK. Le fichier est en `-rw-------` (600) alors que les autres sont en 644 : faire un `chmod 644` par prudence. |
| Capture `blog-duo-deux-rangees-accords-2026-10.webp` | La ligne compacte « 🌈 Tout jouer · gamme complémentaire à l'essai · ⚡ Accords à deux : 16 », « Copier les notes pour mon Neotone », « Changer », les 7 accords de ré mineur (« D Kurd 18 seul »), les pastilles, puis 16 accords « ⚡ seulement à deux » | Juste : ré majeur et mi majeur sont bien dans la rangée, et chaque carte a ses 4 boutons | **À vérifier** : les 16 accords s'étalent sur 3 lignes, alors que le #613 dit « les accords en plus défilent sur une seule ligne ». La capture est peut-être antérieure au #613, ou prise sur un écran très large. Les deux pans ne sont pas dans le cadre : la légende « Un D Kurd 18 et un Neotone Mutant » ne se voit que par les pastilles. Interface FR dans l'article EN (signalée « French interface ») : tolérable, une capture EN serait mieux. |
| Vidéo `duo-hybride-revele.mp4` (70 s, FR seulement) | 2 s : carte titre « Le mode Hybride » ; 12 s : « Les deux instruments jouent les mêmes notes · À deux 0 accord en plus » ; 24 s : « 🌈 Tout jouer · Accords à deux 0 → 16 · Tonalités 2/24 → 24/24 » ; 48 s : « Mi majeur · ⚡ seulement à deux · D Kurd E4 + Neotone G#4 + B4 » ; 62 s : « 24 tonalités » | Conforme | Interface actuelle (Nuit étoilée, icônes dorées). Seul problème : la carte titre (§B). La phrase de fin « Les 24 tonalités jouables en entier » va un peu loin face à l'app (« Tonalités jouables 24/24 »). Mineur, à reprendre dans la vidéo refaite. |
| Vidéo `completer-dkurd.mp4` (56 s, FR seulement) | 2 s : titre « Compléter » ; 22 s : les 7 degrés de ré mineur, « il manque C# D# F# G# B » ; 32 s : « Le 2ᵉ handpan qui le complète » (E3 majeur · 12 notes) ; 42 s : « Essayer ce duo, sans rien enregistrer » ; 52 s : « D Kurd 11 + E3 majeur · 12 accords nouveaux à deux · 2/24 → 24/24 » | Conforme | Interface actuelle. Rien à redire. |
| YouTube `Zp_zaqsRBCg` | Vignette « Shape of my Heart » | OK | — |

Aucune vidéo à texte français n'apparaît dans l'article EN : les deux `<figure class="article-mp4">` en sont absentes, et le texte EN les remplace par des phrases chiffrées (l. 89 et l. 103), justes. Aucune ancienne interface dans les médias.

## F. FR / EN

Le contenu est équivalent. L'EN n'a pas les deux vidéos (voulu) et n'a pas la liste des émotions à la ligne 37 (« Each one carries its emotion. »). Suggestion pour l'EN, ligne 37 : `Each one carries its emotion: Balance, Momentum, Adventure, Release, Tension, Nostalgia, Mystery.`, à condition de prendre les noms EN exacts dans translations.ts, que je n'ai pas vérifiés. L'anglais est naturel.
Libellés EN vérifiés contre translations.ts : My pair, Play the pair, My pairs, What do you want to do with these two handpans?, Play everything, Play a song, Complete my key, Complete my chords, Keep as it is, Try this scale, Back to its scale, Load onto my Neotone, Copy the notes for my Neotone, What you can do with these two handpans, Learn a chord with both, Which 2nd handpan completes mine best?, Try this pair, Pair my two Neotones, ⚡ only together, On top of that, thanks to your two handpans together, Root pos. / Root+8 / Inv. 1 / Inv. 2, Full view, Change, Pick up where I left off, Discovery / Apprentice. Seul écart : « Neotone Connexion » (§D3).

## G. SEO

- Titre FR : 66 caractères (« · David Lesage » s'ajoute au rendu), donc il sera coupé dans Google. Suggestion : `Jouer deux handpans ensemble : ce qu'un 2ᵉ handpan t'apporte` (61). Titre EN : 62, OK.
- Description FR : 157 caractères, EN : 157. Conformes (150-160).
- Requête visée : « jouer deux handpans ensemble » / « deuxième handpan ». Elle est dans le titre, la description, le H1 et les tags. Risque de cannibalisation avec `deux-handpans-mode-hybride`, limité par le renvoi croisé ajouté des deux côtés.
- Liens internes : tous finissent par « / » et tous résolvent dans `dist` (/neotone/, /handpan-app/, /showroom/, /blog/completer-son-handpan-acoustique-avec-un-neotone/, /blog/deux-handpans-mode-hybride/, et les équivalents /en/). Canonical et hreflang fr / en / x-default corrects.

## H. Grille de la charte (specs/CHARTE-ARTICLES.md)

**Figures**

| # | Critère | Capture 2 rangées | Vidéo duo-hybride-revele | Vidéo completer-dkurd |
|---|---|---|---|---|
| 1 | Comparaison côte à côte | Pas une comparaison, sans objet | Côte à côte photo / app, conforme | Conforme |
| 2 | Le changement se voit sans chercher | Conforme (cercles d'or) | Conforme | Conforme |
| 3 | Recadrage serré | Conforme | Conforme | Conforme |
| 4 | L'image dit vrai | Conforme (disposition à vérifier, voir §E) | Conforme | Conforme |
| 5 | Palette actuelle, textures | Conforme | Conforme | Conforme |
| 5b | Aucun texte incrusté | Interface seulement, conforme | **Non conforme** (cartes titres FR, dont « Le mode Hybride ») ; toléré en FR seulement pour une vidéo de démo, sauf la carte titre (§B) | Non conforme sur le principe (titres FR), toléré en FR seulement |
| 6 | La légende dit quoi remarquer | Conforme | Conforme | Conforme |
| 7 | Paire pour l'autre instrument | **Non conforme** : la capture jumelle deux acoustiques est annoncée (commentaire CAPTURE À VENIR, l. 105) mais absente | Sans objet (sujet mixte) | Sans objet (acoustique) |

**Texte**

| # | Critère | Résultat |
|---|---|---|
| 8 | Une idée par paragraphe, gras sobre, infobulles | Conforme (accord, tonalité, disposition, MIDI ont leur `<abbr>`) |
| 9 | Vocabulaire du §3 | **Non conforme** jusqu'à application du §A (les trois noms) et du §C (le « joker » en gras ressemble à un libellé). « note » est bien employé, pas de « creux » pour compter. |
| 10 | Ni justification ni excuse | Conforme |
| 11 | Chaque affirmation sur l'app est prouvée | **Non conforme** sur 3 points (§D1, D2, D3), conforme pour tout le reste |
| 12 | Les renvois sont des liens cliquables | Conforme |

Quatre emplacements CAPTURE À VENIR restent en commentaires HTML (l. 31, 61, 105, 133) : invisibles, honnêtes. Celui de la ligne 61 signale un bug de l'app (« Gb3 » dans un accord de ré majeur), déjà transmis.

## Classement

- **Bloquant** : §A (les trois noms de duo), §B (la carte titre « Le mode Hybride »).
- **À corriger** : §C (joker), §D1 (iPad / ordinateur), §D2 (« pour tout le monde »), §D3 (Neotone Connection EN), grille n° 7 (la capture jumelle deux acoustiques, ou une phrase qui assume son absence), vérifier la disposition sur 3 lignes de la capture face au #613.
- **Suggestions** : §D4, §D5, le titre FR à 61 caractères, les émotions dans l'EN, le `chmod 644` de la photo de couverture, une capture en interface EN.
