# Relecture : « La carte des joueurs » (FR + EN), commit `8d84aef`

> Relecteur distinct (ne l'a pas écrit). Lecture seule, aucun build relancé.
> Sources vérifiées : dépôt de l'app `~/CLAUDE/NEOTONE STUDIO/NEOTONE 1er mai 2026/` (HEAD `177eaf98`, après `61f0bb91`),
> `translations.ts` (clés `com.*`, `account.*`), `auth/account-menu.ts`, `auth/legal-text.ts` (CGU § 6 bis),
> `community/*`, `data/handpan-makers.json`, migrations 0221 et 0222, et la base de production (lecture seule :
> la fonction `community_default_stars`, la colonne `show_full_last_name` et les six champs prof existent bien).
> Captures : `/private/tmp/claude-501/-Users-davidlesage-CLAUDE/d7f07e1f-7686-41e9-a369-7f4bc8e9d723/scratchpad/carte-joueurs/`.

## VERDICT : PUBLIABLE APRÈS 3 CORRECTIONS COURTES (aucun point bloquant)

Les faits sont justes. Toutes les citations de l'app sont exactes, au signe typographique près (voir S1).
L'article ne laisse **pas** croire qu'on peut retirer soi-même son étoile simple. Mais il ne dit pas non plus
comment la retirer : il faut ajouter une phrase honnête (C1). Deux autres retouches : retirer l'attribution
« les mots que j'ai choisis », qu'on ne peut pas prouver (C2), et nuancer « chaque joueur a son étoile » (C3).
La version en ligne est encore l'ancienne (« Mise à jour du 23 octobre ») : rien n'est déployé.

---

## Problèmes

### Bloquant
Aucun.

### À corriger

**C1. Le retrait de l'étoile simple n'est pas dit (vie privée).** FR l. 56-58, EN l. 56-58.
La section « Et si tu changes d'avis » dit vrai : éteindre la fiche te ramène à l'étoile simple. Mais un lecteur
qui veut disparaître complètement ne sait pas quoi faire. Dans l'app, aucune case ne le permet. Seuls existent la
modération (`map_hidden`, inécrivable depuis l'app : `player-repository.ts:128`, filtre de `community_default_stars`
dans 0222), sur demande écrite (CGU § 6 bis, `legal-text.ts:366-367`, adresse du § 10 : contact@lesagedavid.fr),
et la suppression du compte (« Mon compte » → supprimer mon compte, fonction `delete-my-account`).
Phrase proposée, à ajouter **après** la l. 58 :
- FR : `Ton étoile simple, elle, ne s'éteint pas d'une case : elle vient avec les conditions d'utilisation. Si tu ne veux pas y être, écris-moi à contact@lesagedavid.fr et je la retire de la carte. Supprimer ton compte la retire aussi.`
- EN : `Your simple star, though, can't be switched off with a box: it comes with the terms of use. If you'd rather not be on the map, write to me at contact@lesagedavid.fr and I'll remove it. Deleting your account removes it too.`

> Note pour David : « je la retire » t'engage personnellement. C'est ce que dit la CGU (« l'éditeur peut retirer une
> étoile… sur demande écrite »), mais la formulation reste ta décision.

**C2. « avec les mots que j'ai choisis » ne peut pas être prouvé.** FR l. 20, EN l. 20 (« in words I chose »).
Le texte cité (`com.profile.sub_v2`) vient du prototype `prototypes/constellation-joueurs-profil.html:275`. Rien
n'indique que David l'a écrit lui-même : le panneau a été validé par lui le 28/08, mais ses mots n'ont pas été relevés.
Règle : ne jamais attribuer des mots à David sans preuve.
- FR : `En tête de l'écran « Mon profil public », l'app dit à quoi elle sert :`
- EN : `At the top of the "My public profile" screen, the app says what it is for:`

**C3. « chaque joueuse et chaque joueur a son étoile » va un peu trop loin.** FR l. 16 et 94, EN l. 16 et 94.
D'après 0222, une étoile ne s'allume que pour un compte qui a **accepté les CGU v7**, a un **prénom** et un **pays**.
Les comptes existants ne l'obtiennent qu'à leur prochaine entrée dans l'app, quand ils acceptent les conditions
(#612 : « ton étoile s'allume à ce moment-là »).
- FR l. 16 : `Depuis le 22 octobre, **chaque joueuse et chaque joueur de l'app a son étoile sur la carte**, dès qu'il accepte les nouvelles conditions d'utilisation.`
- FR l. 94, fin : `Depuis le 22 octobre, chaque joueuse et chaque joueur qui accepte les conditions a la sienne.`
- EN l. 16 : `…**every player using the app has a star on the map**, as soon as they accept the new terms of use.`
- EN l. 94 : `Since 22 October, every player who accepts the terms has their own.`

**C4. Ne dire qu'à la fin qui voit l'étoile.** FR l. 30 / EN l. 30.
« Réservée aux comptes connectés » n'arrive qu'à la l. 109, alors que c'est la première question d'un lecteur sur
sa vie privée (CGU § 6 bis : « La carte n'est visible que des personnes connectées à un compte »). Ajouter dans la
citation de la l. 30 :
- FR : `… Jamais ton adresse, ta ville ni ton e-mail. Et seuls les comptes connectés voient la carte.`
- EN : `… Never your address, your city or your email. And only signed-in accounts can see the map.`

### Suggestions

**S1. Apostrophes des citations.** L'app écrit `’` dans `com.profile.sub_v2`, `com.map.why_empty_v2` et
`com.map.brands_click_why`. L'article écrit `'` (l. 22, 80, 90). Le texte est identique et le choix est typographique.
À aligner seulement si le site utilise `’` ailleurs.

**S2. « 541 ateliers de handpan recensés dans 53 pays »** (FR l. 80, EN l. 80). Le fichier compte 541 fiches, mais
11 ne sont pas des handpans (4 tongue drums, 4 instruments électroniques, 3 accessoires). Les 53 pays sont exacts, et
17 fiches n'ont aucun pays. Le chiffre est le même que celui de l'app (`com.map.brands_toggle_title`), donc il n'est
pas faux à l'écran. Plus juste : `541 fabricants recensés, dans 53 pays` / `541 makers listed, across 53 countries`.

**S3. « Ce volet est tout neuf »** (FR l. 48, EN l. 48). Les six questions sont en base depuis le 23/09 (migration
0087). C'est neuf par rapport à la version du 1er septembre, pas « tout neuf ». Proposition :
`Ce volet est arrivé fin septembre.` / `This part arrived in late September.`

**S4. Pour le SEO, mettre « handpan » dans le H2 qui porte la requête.** FR l. 76 :
`## Trouver un prof de handpan, un joueur, un fabricant près de chez toi`. EN :
`## Find a handpan teacher, a player, a maker near you`.

**S5. La voix de David s'est affadie.** L'ancienne version avait des prises de position en « je » qui restent vraies
et qui ont disparu. Par exemple : « Même quelqu'un qui voudrait être plus précis ne le pourrait pas, il n'y a nulle
part où mettre l'information », toujours exact puisque la table n'a ni latitude ni longitude. Ou encore : « Une carte
de gens, c'est le genre de fonction qu'on ne peut pas concevoir seul dans son coin ». Ces deux phrases pourraient
revenir (après la l. 66 et en toute fin). Les autres phrases retirées décrivaient l'ancienne règle et devaient partir.
Exemples : « un interrupteur dur à allumer, facile à éteindre », « personne n'a encore dit oui ». L'ancienne version
ne contenait aucune citation verbatim de David : rien n'a été perdu de ce côté.

**S6. Pour la session de l'app (hors article).** L'infobulle du menu « 🎧 Mon profil public »
(`com.menu.profile_title`, `account-menu.ts:212`) dit encore « tu choisis ce que tu montres, ou rien du tout ».
Ce n'est plus vrai depuis #612. `com.menu.map_title` (« qui ont allumé leur étoile ») n'est plus utilisée, mais
existe toujours. À transmettre à la session de l'app ; l'article ne cite ni l'une ni l'autre.

---

## Grille de la charte (`specs/CHARTE-ARTICLES.md`)

**Figures.** L'article n'a aucune figure pour l'instant : les 4 captures sont en attente, en commentaires HTML
retirés au rendu par `rehypeStripHtmlComments`. Seule la couverture s'affiche.

| # | Point | Verdict |
|---|---|---|
| 1-7 | Figures du corps | Sans objet (aucune figure). Les 4 commandes de captures respectent la charte : comparaison éteinte/allumée en image composite côte à côte, aucun texte incrusté, compte fictif. |
| 4 | Couverture provisoire : dit-elle vrai ? | Conforme, avec une réserve. C'est un vrai rendu de l'app (pan + constellation Dm). Elle ne contredit rien, mais ne montre pas la carte. |
| 5b | Texte incrusté dans la couverture | Réserve : l'écran du handpan affiche « I Équilibre / Dm », un libellé français, aussi visible sur la page EN. C'est l'interface, donc toléré pour une image provisoire. |
| 8 | Une idée par paragraphe, gras sobre, infobulles | Conforme (infobulles sur CGU, géolocalisation, anonyme). Gras un peu long l. 46 (phrase entière en gras), acceptable. |
| 9 | Vocabulaire § 3 | Conforme (« handpans », jamais « creux », ni « bandeau » ni « hybride »). |
| 10 | Aucune justification ni excuse | Conforme : le ton défensif de l'ancienne version (« ce n'est pas une case de conformité… ») a disparu. |
| 11 | Chaque affirmation sur l'app est prouvée | Conforme, sauf C2 et C3 (voir tableau d'exactitude). |
| 12 | Renvois cliquables | Conforme : 2 liens internes, qui existent en FR et en EN. Le « / » final est ajouté au rendu par `rehypeTrailingSlash`, vérifié : `/blog/feedback-ameliorer-handpan-studio` renvoie un 301 vers la version avec « / ». |

## Exactitude, affirmation par affirmation

| Article (FR) | Source | Verdict |
|---|---|---|
| Citation « Que celles et ceux… ne le savait pas. » | `com.profile.sub_v2` (début) | Exacte (apostrophes : S1). L'attribution à David : C2. |
| Prénom, initiale, pays ; « Marie L. · France » ; jamais adresse, ville, e-mail | `com.star.why`, CGU § 6 bis, 0222 | Exact |
| Centre du pays ; pays choisi à l'accueil ; redemandé une seule fois ; sans pays, pas d'étoile | #612, `com.star.country_nudge`, 0222 | Exact |
| Seule option « Afficher mon nom de famille en entier », décochée au départ | `com.star.full_title/full_desc`, 0222 (`default false`) | Exact |
| Placeholder « Prénom, initiale, pseudo… comme tu veux » | `com.profile.ph_name` | Exact |
| Fiche éteinte par défaut ; allumée, elle remplace l'étoile | `emptyDraft()` `visible:false`, `com.star.preview_rich`, 0222 (`visible = false`) | Exact |
| « Ce qui est vide n'apparaît pas — pas de champ orphelin sur ta fiche. » | `com.profile.note_listen` | Exact |
| « Partager publiquement mes instruments », case à part, décochée ; gamme/famille/modèle ; jamais réglages, morceaux, enregistrements | `com.profile.instr_title/instr_desc`, `emptyDraft()` | Exact |
| « 🎓 Je donne des cours » halo doré + « Profs » ; « 🔨 Je fabrique des instruments » halo cuivré + « Fabricants » | `com.profile.teach_*`, `maker_*` | Exact |
| Six questions facultatives (liste) | `com.profile.note_teach`, `lab_teach*` ; colonnes présentes en base | Exact (« tout neuf » : S3) |
| « 👁 Voici exactement ce que les autres verront » ; même composant au pixel | `com.profile.preview_title/preview_why` ; `playerCardHtml` importé par `player-profile.ts:44` et `player-map.ts:51` | Exact |
| Éteindre + enregistrer : on redevient étoile simple ; « 🗑 Tout retirer » ; compte, morceaux, handpans intacts | `com.profile.undo_why_v2`, `erase`, `erase_note`, `erase_confirm` | Exact |
| Pas de géolocalisation, pas d'adresse ; position déduite d'une liste de villes embarquée ; pas de colonne latitude ni longitude | `cities-data.ts:5-13`, `player-repository.ts:15` ; colonnes de `player_profiles` en production : aucune latitude ni longitude | Exact |
| « une région suffit, et l'app te le propose » | `com.profile.hint_city` | Exact |
| Quatre onglets Tous · 🎵 Musiciens · Profs · Fabricants | `com.map.f_*` | Exact |
| Cercle violet par pays, anonyme, « chaque compte compte pour un », moins de 3 personnes : jamais nommé | `com.mus.*`, `com.mus.honest_body_v2`, 0221 (seuil 3, retrait du « ne pas me compter ») | Exact |
| Recherche, 🗺 Carte / ☰ Liste, tri par nom ou par pays | `com.map.search`, `view_*`, `sort_*` | Exact |
| « 🌐 L'annuaire des fabricants », 541 / 53 pays, cercle bleu, « la carte de l'artisanat, pas celle des personnes » | `com.map.brands_*`, `data/handpan-makers.json` (541 fiches, 53 pays) | Exact (nuance : S2) |
| Noms en doré quand il y a peu d'étoiles ; au-delà, tous les noms qui ont la place | `player-map.ts:171` (`FEW = 12`), #609 | Exact |
| Citation « Une étoile se pose au centre du pays… sans joueurs. » | `com.map.why_empty_v2` | Exact |
| 1er septembre 2026 : une étoile, un prof | Ancienne version de l'article | Repris tel quel |
| Menu « Moi & la communauté », « ✨ La constellation des joueurs », « 🎧 Mon profil public », « ✨ Voir la carte » | `account.sec.moi`, `com.menu.map`, `account.public_profile`, `com.profile.see_map` | Exact |
| Réservée aux comptes connectés ; « Ma fiche peut être vue sans compte » ne change rien aujourd'hui | `com.profile.note_who`, `visitors_*`, `account-menu.ts:242-245` | Exact |
| « Merci de faire vivre ce petit monde. — David » | `com.profile.sign` | Exact |
| « Depuis le 22 octobre, chaque joueur a son étoile » | 0222 : il faut CGU v7, prénom et pays | À nuancer (C3) |

## Vie privée : ce que l'article dit, et à qui c'est visible

| Information | Qui la voit | L'article le dit ? |
|---|---|---|
| Prénom, initiale du nom, pays (étoile simple) | Comptes connectés | Oui, mais « comptes connectés » seulement à la l. 109 (C4) |
| Nom de famille en entier | Comptes connectés, si l'option est cochée | Oui |
| Fiche détaillée, champ par champ | Comptes connectés, si elle est allumée | Oui |
| Instruments | Comptes connectés, si la deuxième case est cochée | Oui |
| Visiteurs sans compte | Personne aujourd'hui | Oui |
| Retirer son étoile simple | Modération sur demande écrite, ou suppression du compte | **Non dit** (C1). L'article ne survend rien : il ne promet pas de retrait en un clic. |
| Compteur Musiciens | Anonyme, seuil de 3 | Oui. Plus aucune mention de « Ne pas me compter », supprimé. |

## FR / EN

Le contenu est identique, ligne pour ligne (111 lignes chacun, mêmes sections, mêmes commentaires de captures).
L'anglais est naturel. Les libellés anglais sont ceux de l'app : « Me & the community », « 🎧 My public profile »,
« Show my full last name », « Share my instruments publicly », « 🎓 I teach », « 🔨 I make instruments »,
« 👁 Here is exactly what others will see », « Everyone / Teachers / Makers », « 🌐 The makers directory »,
« a map of the craft, not of people », « My card can be seen without an account »,
« Thank you for keeping this small world alive. — David ». Les liens EN pointent vers `/en/blog/…`, qui existent.
Les corrections C1 à C4 sont à reporter dans les deux fichiers.

## SEO

- **Titre** FR : 62 caractères, EN : 50. **Description** FR : 158, EN : 160. Tous dans les limites.
- **Requête visée** : « carte des joueurs de handpan » / « trouver un prof de handpan près de chez moi ».
  Le titre et la description les portent, mais pas le H2 (S4).
- **Liens internes** : 2, valides, « / » final ajouté au rendu.
- **Couverture provisoire** (`blog-constellations-2026-couverture.webp`) : **acceptable en attendant**. C'est un vrai
  rendu, sans contradiction. Deux réserves : (1) c'est **la même image** que la couverture de « Les constellations du
  handpan », donc deux pages partagent la même image de partage (og:image) ; (2) elle ne montre pas la carte. À
  remplacer dès que la capture « Tous » est faite.

## Rendu (captures du rédacteur, aucun build relancé)

- FR 1440 (`fr-1440-part0/1.png`) : en-tête, couverture, citations, H2 et H3, infobulles soulignées, liste à puces
  du « Comment y aller » : rendu propre, aucune trace des commentaires « CAPTURE À VENIR ».
- FR 390 réel (`fr-390-vrai-viewport.jpg`) : titre, chapeau et couverture lisibles, pas de débordement visible.
- La date affichée reste « 1 septembre 2026 » (pubDate) : la mention « réécrit le 23 octobre » est dans l'encadré
  d'ouverture, ce qui suffit.
