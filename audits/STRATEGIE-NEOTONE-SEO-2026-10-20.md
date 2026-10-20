# Stratégie « Neotone » : référencement Google et IA (20/10/2026)

> Mission **en lecture seule** : aucun fichier du site n'a été modifié en dehors de ce rapport. Rien n'a été commité,
> poussé ni déployé, et aucune requête POST n'a été envoyée.
> Cette stratégie complète `audits/AUDIT-SEO-2026-10-20.md` (l'audit technique), qu'elle ne refait pas.
> Mesures du 20/10/2026 : `curl` sur le site, sur le site du fabricant et sur YouTube, plus un outil de recherche web (index américain).
> **Google n'a pas pu être mesuré directement** (voir § 1.1).

---

## Résumé pour David (12 lignes)

1. **La première place sur « neotone » reviendra presque toujours au fabricant.** Une **deuxième ou troisième place** est réaliste en France. Dans le monde, viser le **top 5**.
2. Sur « **handpan électronique** » (en français), la **première place est atteignable** : peu de pages sont vraiment consacrées au sujet.
3. Sur « **electronic handpan** » et « **digital handpan** » (en anglais, dans le monde), la concurrence est forte (Thomann, Roland, YouTube). Le **top 10** est un objectif honnête pour les 6 à 12 prochains mois.
4. **Votre meilleur atout existe déjà.** Le site du fabricant a un lien vers votre page Neotone : « Paris Hub, hosted by David Lesage ». Il faut le **garder** dans le nouveau site de décembre.
5. **À corriger en priorité :** votre site dit à la fois que vous **concevez** le Neotone (`llms.txt`) et qu'il est **fabriqué par Soundventure** (votre FAQ). Les IA voient la contradiction.
6. Les noms de domaine qui redirigent vers votre site **n'apportent presque rien au classement**. Ils servent à être retenus et tapés, pas à monter dans Google.
7. Vos domaines `neotonestudio.app` et `neotone-studio.app` portent le nom de la marque du fabricant, qui lance `neotone.studio`. C'est un point à clarifier avec lui.
8. Ce qui fera la différence : **une page `/neotone` qui répond à tout**, et **des articles** sur ce que fait votre app avec le Neotone (Neotone Connexion, mémoires, diapason, enregistreur…).
9. Votre angle unique, que personne d'autre n'a : **bêta-testeur depuis 2023**, showroom à Paris, et l'app qui pilote l'instrument. Un vrai « avis après 3 ans » vaut plus que dix pages de publicité.
10. Hors du site, le plus rentable : le **lien du fabricant**, des **titres YouTube** qui contiennent le mot « Neotone », la **fiche Google** du showroom et **Bing** (c'est lui qui alimente ChatGPT et Copilot).
11. Ordre des langues : **anglais et français** d'abord, puis **allemand**, puis **espagnol** et **italien**, toujours relus.
12. Aucun résultat n'est garanti. Google met des semaines, voire des mois, à bouger. On mesurera chaque mois dans Search Console.

---

## 1. Réalisme : où pouvez-vous vous placer ?

### 1.1 Ce que j'ai pu mesurer, et ce que je n'ai pas pu mesurer

| Source | Résultat |
|---|---|
| **Google** (`curl`) | ❌ Non mesurable : Google exige JavaScript pour afficher ses résultats. **La seule vraie mesure de vos positions, c'est Search Console** (Performance › Requêtes, filtre « neotone »). |
| **DuckDuckGo** (`curl`) | ❌ Bloqué (protection anti-robot). |
| **Bing** (`curl`) | ❌ Inutilisable : Bing renvoie aux robots des résultats sans rapport (WhatsApp, Shein…). |
| **Outil de recherche web** (index américain, ce n'est pas google.fr) | ✅ Voir le tableau ci-dessous. |
| **YouTube** (`curl`, lecture approximative de la page de résultats) | ✅ Voir ci-dessous. |
| **Site du fabricant** `play.digitalhandpan.com` | ✅ Lu en entier (voir § 4.1). |

**Ce qu'a renvoyé l'outil de recherche web** (index américain, 20/10/2026) :

| Requête | Qui occupe les résultats | lesagedavid.fr |
|---|---|---|
| `neotone handpan` | **Thomann** (8 à 10 résultats sur 10, une fiche par pays et par bois), un article de presse sur le capteur Zemic | absent |
| `digital handpan` | Thomann (Neotone), forum Paniverse, Sound on Sound (test du Lumen), SparkFun | absent |
| `electronic handpan` / `handpan électronique` | blog Instruments du Monde, **Roland Mood Pan MN-10**, **Lumen**, Hackster (fabrication maison), Kirstein | absent |
| `neotone studio` | **rien de pertinent** (des studios d'enregistrement aux noms proches) : le terrain est vide aujourd'hui | absent |
| `Neotone handpan numérique avis prix` | Thomann (note 3,5/5 sur deux avis pour le Mutant), Instruments du Monde | absent |
| `"lesagedavid.fr"` | aucune page du site | — |

👉 **À lire avec prudence.** Cet index est américain et ne reflète pas google.fr. Il montre tout de même deux choses :
(1) **Thomann domine** les recherches commerciales sur le Neotone, avec une fiche par pays et par essence de bois ;
(2) le **site du fabricant n'y apparaît pas non plus** dans les 10 premiers. Le terrain est donc moins verrouillé qu'on pourrait le croire.

**YouTube** (requête `neotone handpan`) : **vos vidéos sont dans les deux premiers résultats**. L'une est sur la chaîne NEOTONE (« NEOTONE digital handpan preview by David Lesage [FR] »), l'autre est une collaboration (« Pourquoi choisir un handpan électronique »).
Les autres chaînes qui parlent du Neotone : Shoreline Music (revendeur américain), Mario Infantes, **Amy Naylor – Handpan Connect** (y compris une vidéo **en français**, « Le handpan numérique Neotone a-t-il un bon son ? »), 65 Drums (« Neotone Mutant Electronic Handpan First Impressions », en tête sur `electronic handpan`).
Votre chaîne compte **314 abonnés**. Dans vos 15 dernières vidéos, le mot « Neotone » n'apparaît que sous la forme `@neotone.digitalhandpan`, et jamais en mot simple dans un titre.

### 1.2 Ce que dit l'état de l'art

- **Recherche d'une marque** (« neotone ») : Google place le **site officiel en premier** dans la très grande majorité des cas, souvent avec des liens vers ses sous-pages. Viennent ensuite les grands revendeurs (ici Thomann), les réseaux sociaux de la marque, un bloc vidéos et des avis indépendants. **Passer devant le fabricant sur son propre nom n'est pas un objectif raisonnable.**
- **La 2ᵉ place se gagne** avec la page la plus utile et la plus indépendante sur le sujet, dans la langue de la personne qui cherche, et soutenue par des liens d'autres sites. En français, la concurrence est faible : le fabricant n'a pas de version française, et Thomann.fr ne publie que des fiches produits.
- **Recherche générique** (« electronic handpan ») : Google cherche des pages **comparatives et neutres**. Une page qui ne parle que d'une marque est désavantagée face à un comparatif.

### 1.3 Objectifs réalistes (6 à 12 mois, sans garantie)

| Requête | Qui sera devant | Objectif honnête pour David |
|---|---|---|
| `neotone` (google.fr) | le fabricant (digitalhandpan.com, puis neotone.studio), Thomann.fr, le bloc vidéos | **2ᵉ ou 3ᵉ** |
| `neotone` (google.com, monde) | le fabricant, Thomann, Shoreline, Instagram, YouTube | **top 5** |
| `neotone studio` | le fabricant dès décembre (nom de domaine identique à la requête) | **2ᵉ ou 3ᵉ** avec une page qui explique ce qu'est neotone.studio et ce que fait l'app. Risque de confusion : voir § 2.3 |
| `handpan électronique` | boutiques de handpans généralistes, Instruments du Monde | **1ʳᵉ à 3ᵉ** : c'est la requête la plus atteignable |
| `handpan numérique` | idem | **1ʳᵉ à 3ᵉ** |
| `electronic handpan` / `digital handpan` | Thomann, Roland, Lumen, Sound on Sound, YouTube | **top 10**, puis top 5 si des sites anglophones font des liens |
| `neotone paris`, `essayer neotone`, `neotone showroom` | personne d'autre | **1ʳᵉ** (probablement déjà acquise : à vérifier dans Search Console) |
| `neotone avis` / `neotone review` | Thomann (avis), YouTube | **top 3** avec un vrai avis de bêta-testeur |
| `neotone app` / `neotone scale builder` | le fabricant | **1ʳᵉ ou 2ᵉ** si le fabricant fait un lien vers l'app |

---

## 2. Les domaines : ce qui aide, ce qui est risqué

### 2.1 Pourquoi un domaine redirigé n'apporte presque rien au classement

- Une **redirection 301** transmet à la page d'arrivée la valeur **des liens qui pointent déjà vers ce domaine**. Les domaines `.app` de David n'ont pratiquement pas de liens extérieurs : il n'y a **rien à transmettre**.
- Avoir le mot-clé dans le nom de domaine (`neotonestudio.app`) ne pèse **presque plus rien** dans le classement depuis la mise à jour « Exact Match Domain » de Google (2012). Et un domaine qui redirige n'est **jamais affiché** dans les résultats.
- **Ce que les domaines apportent vraiment** : ils sont faciles à retenir et à imprimer (QR codes, affiches, cartes), ils protègent contre l'achat par un tiers, et ils gardent en vie les vieux liens de l'app.

### 2.2 Ce qui est risqué

- **Le même site servi sur plusieurs domaines** : c'est le cas aujourd'hui. `www.handpanstudio.app`, `www.handpan-studio.app`, `www.neotone-studio.app` et `www.neotonestudio.app` répondent par une **307 (temporaire)** vers `/handpan-app` **sur leur propre domaine**, et ces domaines servent tout le site en double. `lesagedavid.fr` sans « www » sert lui aussi tout le site (200). Tout cela est déjà décrit dans l'audit (P1-2) : il faut une **301 (ou 308) vers `https://www.lesagedavid.fr/…/`, en un seul saut**.
- **Des mini-sites ou des « pages satellites »** sur ces domaines, avec du contenu Neotone qui renvoie vers lesagedavid.fr : c'est exactement ce que Google sanctionne (règles anti-spam « doorway pages », « expired domain abuse » et « scaled content abuse », renforcées en mars 2024). **À ne pas faire.**
- **Du contenu dupliqué entre langues ou domaines** sans balises de langue correctes : déjà traité par l'audit (P1-1).

### 2.3 Risque de marque (constat, pas un avis juridique)

Le fabricant, Soundventure Kft., lance en décembre 2026 le domaine `neotone.studio`, et la requête « neotone studio » deviendra le nom de son site. **Les domaines `neotonestudio.app` et `neotone-studio.app` de David, et le nom « Neotone Studio » encore déclaré comme ancien nom de l'app** (`alternateName` dans `src/lib/ldJson.ts`), désignent alors presque exactement la même chose que le site officiel de la marque.
**C'est un point à clarifier avec le fabricant**, et éventuellement avec Yannick. Je ne tranche pas.
(Pour information : `neotone.com` est actuellement affiché « à vendre ». Je ne recommande ni de l'acheter ni d'en parler.)

### 2.4 Ce qui marche

1. **Un seul domaine fait foi** : `www.lesagedavid.fr`, avec « / » à la fin des adresses.
2. Tous les autres domaines renvoient en **301, au niveau du domaine, vers la page qui correspond à leur sens** : les domaines « handpan studio » vers `/handpan-app/`. Pour les domaines « neotone studio », la cible dépend de la clarification du § 2.3.
3. **`/le-neotone` → `/neotone/` en un seul saut, y compris `/en/le-neotone`**, car c'est l'adresse exacte que cite le fabricant (§ 4.1). Ensuite, demander au fabricant de mettre son lien à jour.

---

## 3. Le contenu qui gagne

### 3.1 La page pilier `/neotone` : ce qui existe et ce qui manque

**Ce qui existe déjà (et c'est solide)** : les 2 modèles, les prix, la garantie de 6 ans, la livraison mondiale incluse, les 5 bois, un comparatif avec l'acoustique, le choix entre 10 et 19 notes, le calculateur par pays, la procédure d'achat, le showroom (avec une vidéo), une FAQ de 10 questions, l'équipe du fabricant, les données Product, FAQ et fil d'Ariane.

**Ce qui manque pour devenir LA référence indépendante :**

| # | Manque constaté (mesuré sur la page en ligne le 20/10) | Proposition |
|---|---|---|
| 1 | **Aucune réponse en une phrase en haut de page.** Le H1 est un superlatif (« le meilleur handpan électronique au monde »), que les IA et Google prennent pour une affirmation commerciale sans preuve. | Sous le H1, un paragraphe de 2 ou 3 phrases : qu'est-ce que le Neotone, qui le fabrique (Soundventure Kft., Budapest, 2021), les deux modèles, le prix, où l'essayer. C'est ce paragraphe que les IA citent. |
| 2 | **« Neotone One » n'apparaît nulle part** (0 occurrence en FR et en EN). La page écrit « Neotone¹ », alors que Thomann et les acheteurs écrivent « Neotone One ». | Écrire au moins une fois « Neotone One (Neotone¹) » dans le texte, les titres et les données Product (`alternateName`). |
| 3 | **Aucun lien vers le site du fabricant** (0 lien sortant vers digitalhandpan.com). | Un lien « site officiel » clair. Il montre l'indépendance et confirme qui fabrique quoi. |
| 4 | **La page ne relie que 3 articles de blog** (casque, son, capo). `neotone-10-ou-19-notes`, `pourquoi-handpan-electronique`, `completer-son-handpan-acoustique-avec-un-neotone`, `setup-nomade-neotone-bose-s1` et `jouer-et-chanter-au-casque-neotone` n'y sont pas. | Un bloc « Tout sur le Neotone » qui relie **tous** les articles Neotone (la page centrale et ses articles se renforcent mutuellement). Chaque article renvoie aussi vers `/neotone/`. |
| 5 | **Rien sur l'app qui pilote l'instrument** (0 occurrence de « Neotone Connexion »). Le pont vers l'app parle seulement de la méthode. | Une section « Piloter ton Neotone depuis l'app » : voir et charger la gamme, les 18 mémoires, le diapason, l'enregistreur interne, la galerie de gammes (nouveautés 520 à 537). Uniquement ce qui est vérifié dans l'app. |
| 6 | **Les gammes** : combien en mémoire, comment en créer, la gamme infinie. | Une section « Les gammes du Neotone » : 18 mémoires (nouveauté 537), Scale Builder du fabricant, octave 6 (520), galerie publique (526), diapason modifiable (532 et 537). |
| 7 | **« Neotone Studio / neotone.studio »** absent. | Le jour où le fabricant l'annonce, un encadré : « neotone.studio = le nouveau site officiel du fabricant (décembre 2026) ; Handpan Constellation Studio = l'app indépendante de David, compatible Neotone ». **Ne pas publier avant l'annonce du fabricant, et faire valider les mots par lui.** |
| 8 | **Les limites honnêtes** : les avis Thomann parlent d'un toucher différent de l'acoustique et d'une disposition des capteurs asymétrique. | Une section « Ce que le Neotone ne fait pas » (une partie est déjà dans la FAQ). Une page qui reconnaît les limites est plus crédible, pour les lecteurs comme pour les IA. |
| 9 | **La TVA dans les données Product** : la page déclare `price: 1990` et `3150` sans préciser que ce sont des prix **hors TVA** (le fabricant affiche « € 1.990 +VAT », « € 3.150 +VAT »). | Ajouter `priceSpecification` avec `valueAddedTaxIncluded: false`, le **fabricant** (`manufacturer` : Organization Soundventure Kft. avec l'URL officielle) et l'`url` de l'offre. La politique de retour reste à confirmer par David : le fabricant parle d'une « money-back guarantee ». Ne rien inventer. |
| 10 | **Vidéos** : la visite du showroom est non répertoriée, sans données vidéo. | La rendre publique (décision de David) et ajouter `VideoObject` avec `uploadDate` (audit P2-3). Ajouter 1 ou 2 vidéos de jeu, dont une en anglais. |
| 11 | **Pas de date de mise à jour visible.** | « Mis à jour le … », et `dateModified`. Les IA et Google préfèrent les pages datées et récentes. |
| 12 | **Questions de FAQ manquantes** | « Neotone One ou Mutant ? » (lien vers l'article), « Combien de gammes ? », « Le Neotone marche-t-il avec une app ? », « Puis-je changer le diapason (432 Hz) ? », « Où l'acheter hors d'Europe ? » (le fabricant renvoie vers Shoreline Music pour les États-Unis), « Peut-on le rendre ? » (à confirmer), « Qu'est-ce que neotone.studio ? » (après l'annonce). |

**Une cohérence de nom à trouver** : le fabricant écrit « Paris Hub, hosted by David Lesage », et votre vidéo s'appelle « Neotone Hub Paris ». Choisissez **un seul nom** (par exemple « Neotone Paris Hub ») et utilisez-le partout : page, fiche Google, YouTube, données structurées. C'est un signal d'entité fort.

### 3.2 Les articles à écrire

Règles : la charte `specs/CHARTE-ARTICLES.md` s'applique (vérité, captures réelles, relecteur distinct).
Chaque article ne promet **que ce qui est vu dans l'app** : les nouveautés 520 à 539 sont datées du 19 et du 20/10, et certaines sont réservées aux bêta-testeurs (523, 524). L'article doit le dire.
FR et EN d'abord. Le titre EN est la requête que tape un anglophone.

**Vague 1 : ce mois-ci (forte intention, angle unique)**

| # | Titre FR | Titre EN | Requête visée | Source |
|---|---|---|---|---|
| A1 | Neotone : mon avis après 3 ans de bêta-test | Neotone review: 3 years as an official beta tester | `neotone avis`, `neotone review` | Expérience de David, à écrire avec ses mots. C'est **l'article le plus précieux** : personne d'autre ne peut l'écrire. |
| A2 | Neotone Connexion : piloter ton Neotone depuis l'app | Neotone app: control your Neotone from Handpan Constellation Studio | `neotone app`, `neotone connect` | 521, 523, 527, 532, 537 |
| A3 | Combien coûte un Neotone en 2026 ? Prix TTC par pays, livraison, douane | How much does a Neotone cost in 2026? Price by country | `prix neotone`, `neotone price` | page `/neotone` (calculateur), prix du fabricant |
| A4 | Changer le diapason de ton Neotone (432 Hz, 440 Hz…) | How to change the Neotone's tuning (432 Hz…) | `neotone 432 hz`, `handpan 432 hz` | 532, 537 (et l'expérience 432 Hz de David avec Yishama) |
| A5 | Retitrer l'article existant `neotone-10-ou-19-notes` | « Neotone One vs Neotone Mutant: which one? » | `neotone one vs mutant` | existant, juste le titre EN |

**Vague 2 : avant décembre**

| # | Titre FR | Titre EN | Requête visée | Source |
|---|---|---|---|---|
| B1 | Les 18 mémoires du Neotone : ranger et synchroniser tes gammes | Neotone scales: managing the 18 memory slots | `neotone scales` | 527, 532, 537 |
| B2 | La galerie de gammes Neotone : trouver une gamme et la charger | The Neotone scale gallery | `neotone scale gallery` | 526 |
| B3 | Enregistrer avec le Neotone : enregistreur interne et mini-studio | Recording with the Neotone | `neotone recording`, `enregistrer handpan` | 524, 530 |
| B4 | Faire jouer un fichier MIDI à ton Neotone | Play any MIDI file on your Neotone | `neotone midi` | 524 (bêta) |
| B5 | Créer ta gamme jusqu'à l'octave 6 | Build a custom Neotone scale (up to octave 6) | `neotone scale builder` | 520, 525 |
| B6 | Les bois du Neotone : frêne, chêne, acajou, cerisier, noyer | Neotone wood options: ash, oak, mahogany, cherry, walnut | `neotone walnut`, `neotone mahogany` (Thomann vend par bois) | page `/neotone`, 534 |
| B7 | Où essayer un Neotone ? Paris, Budapest… | Where to try a Neotone | `essayer neotone`, `neotone paris`, `try neotone` | site du fabricant (« Budapest or Paris ») |
| B8 | Handpan électronique : tous les modèles en 2026 (Neotone, Roland Mood Pan, Lumen…) | Electronic handpans in 2026: every model compared | `handpan électronique`, `electronic handpan` | **Comparatif factuel** : fiches publiques des autres modèles, sans dénigrement. Le Neotone est l'instrument de David, il faut le dire. |
| B9 | Neotone Studio, neotone.studio : ce qui change en décembre | neotone.studio: Neotone's new website, explained | `neotone studio` | **Seulement après l'annonce officielle du fabricant.** |

**À traiter en simple nouveauté** (peu de recherches « Neotone ») : hors ligne pendant 15 jours (531, 536), textures et coques (534, 538), « Mes handpans » et duos (533, 535), éditeur de mélodie (522, 539), ouverture plus rapide (528), doublons (529). C'est utile pour les utilisateurs, mais secondaire pour le référencement.

### 3.3 Les langues, par priorité

1. **Anglais** : la langue du fabricant, de Thomann et de la majorité des recherches mondiales. Toute page Neotone a sa version EN.
2. **Français** : votre base, et le showroom.
3. **Allemand** : le plus grand marché européen du handpan, le pays de Thomann, et des revendeurs ou centres déjà actifs (`seelenklang-zentrum.de`, cité par le fabricant). Commencer par la page `/neotone`, puis A1 et A3.
4. **Espagnol** : une partie du site existe déjà, mais **corriger d'abord sa qualité** (audit P2-11).
5. **Italien** : le partenariat ATLAS, et l'app parle italien.

**Règle** : une traduction automatique publiée sans relecture et en série est exactement ce que Google appelle « scaled content abuse ». Mieux vaut 3 pages allemandes relues que 30 pages approximatives.

---

## 4. Hors du site : ce qui compte le plus

### 4.1 Le lien du fabricant (le plus fort de tous)

**Constat (lu le 20/10)** : `play.digitalhandpan.com` (site Wix, en anglais seulement) contient le bloc « VISIT US IN BUDAPEST OR PARIS … the Paris Hub, hosted by David Lesage ». Ce bloc a un **lien suivi** (sans `nofollow`) vers `https://www.lesagedavid.fr/en/le-neotone`. Votre Linktree figure aussi dans la liste des artistes.
`neotone.studio` ne répond pas encore (aucune réponse du domaine aujourd'hui).

| Ce que David fait | Ce que Claude prépare |
|---|---|
| Écrire à Soundventure (Csaba, Norbert ou Gergely) : (1) mettre le lien à jour vers `/en/neotone/` après le changement d'adresse ; (2) **garder le bloc « Paris Hub »** dans le nouveau site `neotone.studio` ; (3) si possible, une page « ambassadeurs / où essayer » avec un lien par ambassadeur ; (4) leur avis sur une mention de Handpan Constellation Studio comme app compatible ; (5) la date de lancement de neotone.studio et ce qu'ils pensent de l'usage de « Neotone Studio » par David (§ 2.3). | Le brouillon de l'email en anglais, en partant des faits du § 2.3 et de ce paragraphe. **Jamais envoyé sans David.** |
| En décembre, vérifier que le lien a survécu à la migration. | Un contrôle `curl` du nouveau site le jour du lancement. |

Le formulaire de réservation du showroom propose déjà « Le site de Neotone » comme source de contact : c'est un bon moyen de mesurer ce lien.

### 4.2 YouTube (deuxième moteur de recherche au monde)

| Ce que David fait | Ce que Claude prépare |
|---|---|
| Écrire **« Neotone » en mot simple** dans les titres (les `@` ne suffisent pas) ; un lien vers `lesagedavid.fr/neotone/` dans les 2 premières lignes de la description ; des chapitres ; des sous-titres EN. | Des titres et descriptions FR et EN pour les vidéos Neotone existantes. |
| Tourner 3 vidéos, en anglais ou avec deux pistes audio : « Neotone review after 3 years », « Neotone One vs Mutant », « Neotone + app: change scale, tuning, record ». | Le plan de chaque vidéo, aligné sur les articles A1, A5 et A2 (la vidéo et l'article se renforcent). |
| Rendre publique la visite du showroom (`Vlzo3KbpPjw`, aujourd'hui non répertoriée). | Les données `VideoObject` sur la page. |

### 4.3 La fiche Google (Google Business Profile) du showroom

- **Je n'ai trouvé aucune trace** d'une fiche dans le dépôt : à vérifier par David.
- **David** : créer ou réclamer la fiche (la vérification se fait par vidéo ou par courrier). Catégorie : magasin d'instruments de musique (et professeur de musique en catégorie secondaire). Indiquer « sur rendez-vous ». Le nom doit être le **vrai nom** utilisé partout (§ 3.1), sans mots-clés ajoutés : Google suspend les fiches dont le nom est « bourré » de mots-clés. Photos réelles, puis demander des avis aux visiteurs (sans contrepartie).
- **Claude** : le texte de la fiche, la liste des services, les questions-réponses, puis les mêmes informations pour **Bing Places** (qui peut importer la fiche Google) et **Apple Business Connect**.
- Rappel : l'adresse (29 rue des Orteaux) est déjà publique sur le site. La fiche la rendra plus visible encore : c'est à David de choisir.

### 4.4 Google Search Console et Bing Webmaster Tools

- **Search Console** : déjà en place (gestes faits le 07/09). **David**, chaque mois : Performance › filtre « neotone », « handpan électronique », « electronic handpan » ; noter la position moyenne. Après le passage à `/neotone/`, inspecter l'adresse et demander l'indexation. **Claude** : une grille de suivi, et la lecture des exports que David lui donne.
- **Bing Webmaster Tools** : **aucune trace** dans le dépôt. **David** : créer le compte et importer le site depuis Search Console (environ 10 minutes, création de compte = à faire par lui), puis envoyer le sitemap. Bing alimente **Copilot**, en grande partie **ChatGPT** (recherche web), DuckDuckGo, Yahoo et Ecosia.
- **IndexNow** (prévenir Bing et Yandex à chaque mise en ligne) : **Claude** peut préparer le fichier de clé dans `public/` et un petit script lancé après chaque déploiement. Le script envoie une requête à Bing : à faire seulement avec l'accord de David.

### 4.5 Wikidata

- Wikidata nourrit le Knowledge Graph de Google et les IA. Mais une fiche **sans sources indépendantes** (presse, livres) est souvent supprimée, et créer sa propre fiche est un conflit d'intérêts : c'est permis si on le déclare, mais c'est mal vu.
- **Ordre conseillé** : d'abord un ou deux articles de presse (§ 4.7), ensuite une fiche « David Lesage » qui cite ces sources, avec les liens vers le site, YouTube et The Voice saison 11 (2022). Une éventuelle fiche « Neotone » (produit de Soundventure) devrait plutôt venir du fabricant.
- **David** : crée le compte Wikidata et publie. **Claude** : prépare la liste exacte des déclarations et des sources, uniquement des faits vérifiés.

### 4.6 Forums et communautés

- Le forum **Paniverse** a un fil sur les handpans numériques (`paniverse.org/digipan/`). Il y a aussi **Reddit r/handpan**, les groupes Facebook de joueurs (FR et internationaux) et les Discord de handpan.
- **Règle** : répondre utilement à de vraies questions, et **toujours dire qu'on est ambassadeur**. C'est honnête, ces communautés bannissent les vendeurs masqués, et **la loi française sur les influenceurs (loi n° 2023-451 du 9 juin 2023)** impose de mentionner une collaboration commerciale.
- **David** : publie avec ses comptes. **Claude** : repère les fils pertinents et prépare des brouillons de réponses à relire.

### 4.7 La presse

- **Angles** : le premier « Neotone Paris Hub » ; une app qui rend la musique visible et pilote un instrument électronique ; un ancien de The Voice devenu bêta-testeur d'un instrument hongrois.
- **Cibles** : Audiofanzine (énorme en français, avec fiches produits et avis d'utilisateurs : y ajouter le Neotone et un avis déclaré), Keyboards Recording, Le Parisien (édition Paris 20ᵉ), la presse handpan. En anglais : MusicRadar, Sound on Sound (qui a testé le Lumen), et le blog Instruments du Monde (son article sur les handpans électroniques cite déjà le Neotone).
- **David** : envoie et répond aux journalistes. **Claude** : prépare le dossier de presse (faits vérifiés, photos existantes) et les emails de présentation, en français et en anglais.

---

## 5. Être cité par les IA (GEO)

### 5.1 Ce qui fait citer un site

- **Être indexé par les bons moteurs** : ChatGPT (recherche web) s'appuie en grande partie sur Bing et sur son propre robot (`OAI-SearchBot`) ; Copilot sur Bing ; Gemini et les aperçus IA de Google sur l'index Google ; Perplexity sur son propre robot. Claude, d'après des analyses publiques de 2025, s'appuie sur Brave Search. **Votre `robots.txt` accueille déjà ces robots** : c'est bien.
- **Des phrases autonomes et factuelles** en tête de section (qui, quoi, combien, où), des chiffres, des tableaux, des FAQ. Une étude universitaire (« GEO: Generative Engine Optimization », Aggarwal et al., KDD 2024) a mesuré, dans son banc d'essai, une hausse de visibilité allant jusqu'à environ 40 % quand on ajoute des statistiques, des citations et des sources.
- **Le consensus entre sources** : une IA répète ce que plusieurs sites disent pareil. D'où l'importance du fabricant, de Thomann, de YouTube, des forums et de la presse.
- **`llms.txt`** : déjà en place, et peu coûteux. **Aucun grand moteur n'a confirmé qu'il le lit** (Google a dit que non). C'est un plus, pas un levier.

### 5.2 Corriger la cohérence des entités (priorité n° 1, décision de David)

| Constat | Où | Pourquoi c'est un problème | Proposition |
|---|---|---|---|
| « Il **conçoit** le handpan électronique Neotone » et « Neotone : handpan électronique / numérique **conçu par David Lesage** » | `src/lib/llms.ts` (en-tête et Définitions, texte validé par David) | **Contredit** la FAQ du site (« fabriqué par Soundventure Ltd… né du rêve de Csaba et Norbert ») et le site du fabricant. Une IA peut répéter l'erreur (fausse attribution, gênante vis-à-vis du fabricant) ou se méfier de toute la source. | David choisit une formulation exacte, par exemple « ambassadeur officiel et bêta-testeur du Neotone (fabriqué par Soundventure Kft., Budapest) depuis 2023 ». C'est ensuite **la même phrase partout** : llms.txt, À propos, Person, fiche Google, YouTube. |
| `alternateName: ['David Lesage', 'Handpan Constellation Studio', 'Neotone']` | `websiteLdJson()` dans `src/lib/ldJson.ts` | Déclare que le **site** s'appelle « Neotone ». Cela mélange votre site et la marque du fabricant. | Retirer « Neotone » de cette liste. |
| `sameAs` de la personne David contient `instagram.com/neotone.digitalhandpan` (titre du compte : « NEOTONE ») et `facebook.com/people/Neotone-Digital-Handpan` | `site.social` (`src/data/site.ts`), utilisé par `personLdJson()` et le MusicStore | `sameAs` veut dire « c'est la même entité ». Si ces comptes sont ceux du fabricant, le site affirme que **David = la marque Neotone**. | Si ce sont les comptes du fabricant, les retirer de `sameAs` (on peut garder un lien visible « Neotone sur Instagram »). Si David les gère, le préciser. **À confirmer par David.** |
| `alternateName` de l'app contient « Neotone Studio » | `softwareAppLdJson()` | Dès décembre, « Neotone Studio » désigne le site du fabricant. | Décision liée au § 2.3. |
| Produits sans fabricant | `productLdJson()` | Seule la marque est déclarée. | Ajouter `manufacturer` (Organization Soundventure Kft., avec l'URL officielle et, plus tard, `neotone.studio`). |
| Pas d'`Organization` pour le site | audit P3 | L'éditeur n'est pas tranché (Q-003, chez Yannick). | Ne pas inventer. On garde la Person en attendant. |

### 5.3 Mesurer chaque mois (panel de questions)

- Les mêmes 10 questions, en français et en anglais, posées chaque mois à ChatGPT, Perplexity, Gemini, Copilot et Claude. Par exemple : « Qu'est-ce que le Neotone ? », « Où essayer un handpan électronique à Paris ? », « Meilleur handpan électronique 2026 », « Neotone One ou Mutant ? », « Existe-t-il une app pour le Neotone ? », « What is neotone.studio? » (après décembre).
- On note : David cité (oui ou non), lien vers lesagedavid.fr (oui ou non), et toute erreur factuelle.
- **David** pose les questions dans ses comptes. **Claude** prépare la grille et analyse les réponses collées.

---

## 6. Le plan en 3 horizons

### Cette semaine (20 → 26/10)

| # | Action | Qui | Impact |
|---|---|---|---|
| 1 | Décider la phrase d'identité exacte (« conçoit » ou « ambassadeur et bêta-testeur ») ; retirer « Neotone » de `alternateName` du site ; trancher les `sameAs` Instagram et Facebook | **David** décide, **Claude** applique | ★★★ (IA) |
| 2 | `/le-neotone` → `/neotone/` en un seul saut 301 (y compris **`/en/le-neotone`**, cité par le fabricant), avec le « / » final (audit P1-1, P1-2). Une autre session y travaille déjà. | **Claude** (session en cours) | ★★★ |
| 3 | Email au fabricant : mise à jour du lien, maintien du « Paris Hub » sur neotone.studio, page ambassadeurs, question « Neotone Studio » | **Claude** rédige, **David** envoie | ★★★ |
| 4 | Bing Webmaster Tools : import depuis Search Console, puis sitemap | **David** (compte) | ★★ |
| 5 | Page `/neotone` : paragraphe-réponse en tête, « Neotone One », lien vers le site officiel, bloc « Tout sur le Neotone » vers tous les articles | **Claude** (après la session en cours, pas en parallèle : mêmes fichiers) | ★★★ |
| 6 | Vérifier si une fiche Google du showroom existe ; sinon, la créer | **David** | ★★ (local) |

### Ce mois-ci (→ 20/11)

- Articles **A1 (avis après 3 ans), A2 (Neotone Connexion), A3 (prix 2026), A4 (diapason)**, en FR et EN, avec la grille de la charte. A1 avec les mots de David : Claude lui pose des questions et met en forme, il n'invente rien.
- Page `/neotone` : sections « Piloter ton Neotone depuis l'app », « Les gammes », « Ce que le Neotone ne fait pas », FAQ enrichie, date de mise à jour.
- Données Product complètes : `manufacturer`, TVA, `url`, politique de retour une fois confirmée par David.
- YouTube : retitrer les vidéos Neotone, rendre publique la visite du showroom, tourner « Neotone review » en anglais.
- Forums : 5 à 10 réponses utiles, avec la mention d'ambassadeur.
- Premier panel de questions aux IA, pour avoir le **point de départ**.

### Avant décembre (→ 30/11)

- Articles **B1 à B8** en FR et EN. **B9 (« neotone.studio »)** prêt mais **publié seulement après l'annonce du fabricant**, avec ses mots validés.
- Allemand : `/de/neotone/`, puis A1 et A3, relus. Espagnol : corriger la qualité avant d'ajouter. Italien : la page `/neotone`.
- Dossier de presse et 3 à 5 envois (Audiofanzine, Keyboards Recording, Le Parisien 20ᵉ, MusicRadar).
- Décision sur `neotonestudio.app` et `neotone-studio.app` : garder et rediriger, les rendre ou les laisser expirer (David, éventuellement avec Yannick et le fabricant).
- Wikidata : seulement si une source de presse existe.
- **Le jour du lancement de neotone.studio** : vérifier le lien vers David, publier B9, mettre à jour la FAQ, lancer le panel IA, surveiller « neotone studio » dans Search Console.

---

## Annexe : les faits relevés le 20/10/2026

- **Fabricant** : `play.digitalhandpan.com` (Wix), titre « NEOTONE Digital Handpan | Play NEOTONE », en anglais seulement, sans balises de langue ; `digitalhandpan.com` → 301 vers `play.` ; prix « € 1.990 +VAT » (One) et « € 3.150 +VAT » (Mutant), « including worldwide shipping and a money-back guarantee », « 6-year warranty* » ; « Based in the US? Order here! » renvoie vers Shoreline Music ; un code de parrainage s'obtient auprès des artistes ; le bloc « Paris Hub, hosted by David Lesage » contient un lien vers `https://www.lesagedavid.fr/en/le-neotone` (`rel="noreferrer noopener"`, sans `nofollow`).
- `neotone.studio` et `www.neotone.studio` ne répondent pas encore. `neotone.com` est affiché « à vendre ».
- **Page `/le-neotone/` (FR)** : H1 « Le Neotone, le meilleur handpan électronique au monde » ; 0 « Neotone One », 51 « Neotone¹ », 0 « Neotone Connexion », 0 lien vers le fabricant, 3 liens vers le blog ; Product à 1990 et 3150 sans TVA déclarée. **EN** : 11 « digital handpan », 0 « Neotone One ».
- **Domaines** : `neotonestudio.app`, `neotone-studio.app`, `handpan-studio.app` et `handpanstudio.app` → 308 vers `www.` → **307** vers `/handpan-app` sur leur propre domaine. `lesagedavid.fr` → 200 (site en double). `/neotone/` → 404 (pas encore créée).
- **YouTube @DavidLesageArtiste** : 314 abonnés ; dernière vidéo du 25/09/2026 ; le mot « Neotone » n'apparaît que sous la forme `@neotone.digitalhandpan` dans 3 titres sur 15.
- **Blog** : 34 articles FR (et leurs versions EN), dont 7 consacrés au Neotone ; dernier article publié le 01/10/2026. Les nouveautés de l'app 520 à 539 (19 et 20/10) n'ont pas encore d'article.
