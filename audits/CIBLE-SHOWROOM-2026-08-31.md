# À qui parle le showroom ? — cartographie de l'écosystème parisien

> Document de **recherche**, produit le **01/09/2026**. Aucune modification de code.
> Toutes les vérifications d'URL ont été faites le **01/09/2026** (requête HTTP + lecture de page
> quand la page était lisible sans compte).
>
> ⚠️ **Limite de méthode à connaître avant de lire** : les pages et groupes **Facebook** répondent
> HTTP 200 même derrière un mur de connexion. Un « 200 » prouve donc que **l'URL existe**, pas que
> le groupe est actif ni son nombre de membres. Partout où je n'ai pas pu lire le contenu, c'est
> écrit **(existence vérifiée, activité à vérifier)**. Rien dans ce document n'est un nom inventé :
> chaque nom vient d'une source citée.
>
> ⛔ Ce document ne contient **aucune accroche, aucun slogan, aucun titre de page**. La promesse du
> showroom est la question de David, pas la mienne.

---

## 0. Ce que dit la page /showroom aujourd'hui (état des lieux factuel)

Lu dans `src/i18n/dict.ts` (bloc `showroom`) et sur la page en ligne `https://lesagedavid.fr/showroom`.

| Élément | Contenu actuel |
|---|---|
| `<title>` | « Essayer handpan, Gonilélé et micros à Paris — Showroom \| David Lesage » |
| `meta description` | « Essaie tous mes instruments à Paris : le handpan électronique Neotone, mes handpans acoustiques Yishama, la harpe africaine Gonilélé, la calebasse et les… » |
| `<h1>` | « Showroom David Lesage » |
| `<h2>` (dans l'ordre) | À quoi ça ressemble, un showcase au Nid · Accès au showroom · Calendrier des showcases publics gratuits · Au programme d'une session · Tout ce que tu peux essayer sur place · Repars avec ton Neotone¹, le jour même · Tu ne peux pas venir — ou tu préfères un moment rien que pour toi ? · Réserver ta venue |

Objectif déclaré dans le code : *« La finalité c'est qu'elle s'inscrive à une date, c'est le seul
objectif »* (commentaire `ShowroomPage.astro`, 20/08/2026).

**Observation SEO immédiate** : le `<h1>` est un **nom propre** (« Showroom David Lesage »), c'est-à-dire
une requête que personne ne tape s'il ne connaît pas déjà David. Le `<title>`, lui, contient bien
« Essayer handpan … à Paris » — la page capte donc en `<title>` ce qu'elle ne capte pas en `<h1>`.
Aucun des 8 `<h2>` ne contient l'expression « handpan Paris », « essayer un handpan », ni « gratuit »
en tête. Détail plus loin, §4.

**Bénéfices objectivement vérifiables du dispositif** (matière brute, pas une accroche — chaque
point est déjà écrit ailleurs sur le site) :
- essayer avant d'acheter, sur place, plusieurs instruments côte à côte ;
- comparer **acoustique et électronique dans la même pièce** (2 Yishama + 2 Neotone) ;
- repartir **le jour même** avec un Neotone, sans délai de fabrication (−7 % showroom vs −5 % en ligne) ;
- toucher des instruments rares hors handpan : Gonilélé, calebasse, tambour cadre (L'Âme du Tambour), micros Hisong / Muling, pieds Atlas ;
- entendre en direct la différence entre deux micros sur le même instrument ;
- c'est **gratuit**, ~2h annoncées (3h en pratique), en petit groupe ;
- rencontrer d'autres personnes qui jouent, dans un lieu (Le Nid) et non dans un magasin.

---

## 1. Les cercles réellement identifiés

J'en ai trouvé **quatre**, plus un cinquième plus faible que je signale comme tel.

### Cercle A — Ecstatic dance / danse consciente parisienne
C'est le cercle le **mieux structuré** et celui où David **est déjà à l'intérieur** (Instatic dance).

| Nom exact | URL | Ce que c'est | Vérif. 01/09/2026 |
|---|---|---|---|
| **Ecstatic Dance Paris** (Assoc. Dance & Ecstatic Arts, Virginie Brune) | https://ecstaticdance.org/dance/ecstatic-dance-paris/ | Le rendez-vous hebdomadaire : **tous les dimanches 11h–14h**, Studio Bleu Pantin, 100 av. du Général Leclerc, 93500 Pantin, 15 €. Billetterie Billetweb. | Page lue, détails ci-contre |
| Ecstatic Dance Paris — billetterie | https://www.billetweb.fr/multi_event.php?multi=2269 | La page de vente des dates. | 200 |
| Ecstatic Dance Paris — Facebook | https://www.facebook.com/EcstaticDanceParis/ | Page officielle du même collectif. | existence vérifiée |
| **LovEcstatic Dance Paris** | https://www.facebook.com/LoveEcstaticDanceParis/ · https://linktr.ee/lovecstaticdanceparis | Deuxième collectif ecstatic parisien, dates avec DJ invités (DJ Lao, DJ Ô Djinn, DJ Maya, DJ Sajam…), billetterie **HelloAsso via l'association « Les Champs d'Amour »**. | existence vérifiée (linktree 200) |
| Les Champs d'Amour (asso porteuse) | https://www.helloasso.com/associations/les-champs-d-amour | Billetterie HelloAsso des dates ecstatic. | HelloAsso renvoie 403 aux robots — **à vérifier depuis un navigateur** |
| **Danse libre & 5 Rythmes® — Paris / bois de Vincennes** | https://danselibre.com/ | Danse libre et 5 Rythmes en salle et en extérieur. | 200 |
| **Le son en mouvement — Caro Djette** | https://www.lesonenmouvements.com/ | DJ + praticienne de danse consciente à Paris. Un profil qui **programme de la musique pour danseurs** : c'est un pont naturel Neotone. | 200 |
| **Les Vies Dansent — Amélie Schweiger** (5 Rythmes) | https://www.lesviesdansent.fr/ · https://www.5rhythms.com/classes/DanserlaVagueDancetheWave-287837 | Enseignante 5 Rythmes référencée sur le site mondial 5Rhythms. | à vérifier (non testé) |
| Contact improvisation — ateliers Ville de Paris | https://www.paris.fr/activites/atelier-de-danse-contact-improvisation-tous-niveaux-117529 | Atelier hebdo tous niveaux, sept. 2026 → juin 2027, 16 €. Public voisin. | 200 |
| Biodanza France | https://www.biodanza-france.com/ | Annuaire national des cours/stages Biodanza. | à vérifier (non testé) |
| **DanceResource** (agenda mondial danse consciente) | https://events.danceresource.org/events | Agenda international où les collectifs déposent leurs dates. | 200 |
| Meetup — thème « ecstatic dance » | https://www.meetup.com/fr-FR/topics/ecstatic-dance/fr/ | Groupes Meetup francophones sur le thème. | 200 |

**Indice interne confirmé** : « Instatic dance » est bien une soirée **au Nid**, guidée, DJ set d'**Iris
Chasles** + live de David (voix, Neotone, n'goni), 20 €, jauge 20 personnes, cinq règles (sobriété,
pieds nus, silence). C'est le format le plus proche d'un « public captif » que David possède déjà :
**les 20 personnes d'une Instatic dance sont exactement la cible d'un showcase.**

### Cercle B — Communauté handpan Paris / France
C'est le cercle **le plus qualifié** (ils cherchent déjà à essayer un handpan) et **le plus petit**.

| Nom exact | URL | Ce que c'est | Vérif. |
|---|---|---|---|
| **Handpan Paris et Ile de France** (groupe FB) | https://www.facebook.com/groups/203669438114255/ | Groupe régional. **David y est déjà.** | existence vérifiée |
| **Le RDV du Handpan – Paris** (@rdvhang) | https://www.facebook.com/rdvhang/ | Jam mensuelle, créée par « Klaim » en 2012, historiquement au parc des Buttes-Chaumont. Inscriptions via la page FB. | existence vérifiée ; ancienneté/fréquence **à revérifier sur place** |
| **Collectif Hangora** | https://www.hangora.fr/ | Collectif parisien : ateliers découverte, **jams gratuites**, performances hybrides. Partenaires : Mistral Pans, Flower Pan, Ederod, Master the Handpan. Contact : hangora.collectif@gmail.com. Organise **HandPaname**. | page lue |
| **HandPaname 2026** | https://shotgun.live/en/festivals/handpaname-2026 | Festival handpan **à Pantin (Cité Fertile), 6 septembre 2026** : concerts (Nadishana, Jeremy Nattagh & Adèle Blanchin, Rania Badri, Team Hangora…), ateliers, masterclasses, yoga, relaxation sonore, **village d'artisans facteurs de handpan**. | page Shotgun en 429 au moment du test (**anti-robot**) — **contenu issu de la recherche, à confirmer d'un clic** |
| **TOUCH a PAN** | https://www.facebook.com/touch1pan/ | Ateliers/stages handpan à Paris et en France (base Maisons-Alfort d'après les sources) : séance découverte ~35 €, atelier 3 h ~60 €, instruments prêtés, ~4 dates/mois, inscriptions Billetweb. **Concurrent direct sur « essayer un handpan »**. | page FB : existence vérifiée. ⚠️ le site `touchapan.com` **ne répond pas** (000) |
| **Handpan Occasion France** (groupe FB) | groupe cité par plusieurs sources, ~5 000 membres annoncés | Petites annonces entre particuliers. **URL exacte non trouvée → à vérifier** | ❌ non vérifié |
| Groupe FB où HandPaname a été annoncé | https://www.facebook.com/groups/2382216785345951/ | Groupe handpan francophone (nom exact non lisible sans compte). | existence vérifiée, **nom à confirmer** |
| **World Handpan Map — agenda** | https://worldhandpanmap.com/events | Carte + agenda mondial des events, festivals, jams. **Un lieu où un showroom parisien peut être référencé.** | 200 |
| **GRIASDI 2026** | https://griasdi-gathering.org/griasdi-2026/ | Le gathering handpan de référence, **10ᵉ édition, 18–21 juin 2026, Böllerbauer / Kulturvogel, Haag (Autriche)** — ⚠️ **pas en France**. David suit déjà la page. | 200 |
| Pangonia Handpan Festival | https://www.pangonia.de/tickets.php | Festival handpan allemand. | à vérifier (non testé) |

### Cercle C — Yoga / bien-être / son (bains sonores)
Le plus **gros** en volume, le moins « acheteur d'instrument » — mais celui qui **programme** des
musiciens et achète des instruments pour ses séances.

| Nom exact | URL | Ce que c'est | Vérif. |
|---|---|---|---|
| **Zen and Sounds** | https://www.zen-and-sounds.com/ | Se présente comme le **premier centre français entièrement dédié** à la relaxation sonore : gong baths quotidiens, massages sonores, chorale de mantras, yoga du son. Paris + sud de la France. | 200 |
| **Ohm Fusion** | https://www.ohm-fusion.fr/ | Yoga, méditation, cercles de femmes, bains sonores collectifs, retraites (une annoncée 16–18 oct. 2026). | 200 |
| **Resonance Sound & Healing** (Paris 16) | https://www.resonancehealing.fr/ | Gong baths et massages sonores, collectif / duo / privé. | 200 |
| **Moon Sisters Paris** | https://www.moonsistersparis.com/soundbath | Soundbaths + cercles. | 200 |
| **Bain Sonore** | https://www.bain-sonore.com/ | Portail/agenda de bains sonores. | 200 |
| **Yoga du Son Paris** (Virginie Chase) | https://www.yogaduson.paris/ | Yoga du son, bols, massages sonores. | à vérifier (non testé) |
| **La Main Sonore** (Alisonne Sinard) | https://lamainsonore.com/ | Yin Yoga & Sound Bath réguliers (jeudi, vendredi, dimanche). | 403 au robot — **existe, à ouvrir dans un navigateur** |
| Ohmycream — sélection sound bath Paris | https://www.ohmycream.com/blogs/journal/sound-bath-sonotherapie-massage-sonore-paris | Article prescripteur listant les adresses de bains sonores à Paris. **Cible de relations presse.** | à vérifier (non testé) |

### Cercle D — Festivals conscients / transformationnels (France & Europe)
C'est le cercle **saisonnier** : il ne remplit pas un showcase de septembre, il fabrique de la
notoriété et des rencontres.

| Nom exact | URL | Ce que c'est | Vérif. |
|---|---|---|---|
| **Ecstatic Dance Gathering France** | https://www.ecstaticdancegathering.fr/ | 23–26 juillet 2026, Domaine du Balbuzard, Auvergne. Festival conscient sans alcool ni substances. | 200 |
| **Ecstatic Fest Lez'Arts** | https://www.ecstaticfest-lezarts.fr/programme-2026/ | 5ᵉ édition, **6–9 août 2026**, Fanlac (Dordogne) : ecstatic dance, cercles de chant, concerts. | 200 |
| **Ouest Ecstatic Festival** | https://ouest-ecstatic.com/ | 18–20 août 2026, Loire-Atlantique. | 403 au robot — **existe, à ouvrir dans un navigateur** |
| **Noosom** | https://noosom.app/festivals | **Annuaire des festivals et rassemblements conscients** en France. Bouton « Publier un évènement » + offres de visibilité pour organisateurs. **Canal de diffusion directement actionnable.** | page lue |
| Festivals Ecstatic Dance en France (recension) | https://www.benjaminbossu.com/activites-devenir-soi/festivals-ecstatic-dance-en-france/ | Article-annuaire qui recense la scène. Prescripteur. | à vérifier (non testé) |
| **Boom Festival** | https://boomfestival.org/ | ⚠️ **Point à corriger dans le raisonnement de David** : Boom est **biennal**. La prochaine édition pleine est annoncée **18–25 juillet 2027** (30 ans). Des sources tierces annoncent des dates 2026 — **elles se contredisent entre elles**, je ne les retiens pas. | site 200 ; dates 2026 **non fiables** |
| **Being Gathering** (Boomland) | https://www.being-gathering.org/ | L'événement « intercalaire » de l'organisation Boom : **1–5 juillet 2026**, à Boomland (Idanha-a-Nova, Portugal). C'est **ça**, l'équivalent Boom en 2026. | 200 |
| Lucydelic — sélections festivals 2026 | https://lucydelic.fr/festivals-2026-france/ | Média français qui recense festivals psytrance / conscients. Prescripteur. | à vérifier (non testé) |

### Cercle E — DJ / électro (le plus faible des cinq, et je le dis)
Je n'ai **pas** trouvé de communauté parisienne organisée autour des « instruments électroniques
jouables sur scène ». Ce que j'ai trouvé, c'est une scène **organic house / downtempo / tribal**
dont l'esthétique recoupe exactement celle du Neotone.

| Nom exact | URL | Ce que c'est | Vérif. |
|---|---|---|---|
| **Collectif O'Tawa** | https://www.o-tawa.com/ · https://www.instagram.com/otawa.collectif/ · https://shotgun.live/fr/venues/o-tawa-eb679340-4949-4ee8-b1b3-2979e5062484 | Collectif + label parisien depuis 2018 : organic house, downtempo, tribal techno, trance, **sets hybrides live/DJ**, festival Innervisions. C'est **le** point d'entrée électro le plus proche du Neotone. | Instagram 200 ; site o-tawa.com **à ouvrir** (non testé en HTTP) |
| Agenda électro Paris (agendaculturel) | https://75.agendaculturel.fr/concert/electro/ | Agenda concerts/soirées électro Paris. | à vérifier (non testé) |
| Electro-news.eu | https://electro-news.eu/ | Média qui couvre justement les soirées « chamaniques / psychédéliques » à Paris (articles sur O'Tawa, Kamiwaza, Utopia). **Prescripteur presse.** | à vérifier (non testé) |
| Oval Sound (handpan numérique concurrent) | https://ovalsound.com (à confirmer) · https://www.kickstarter.com/projects/2101519704/oval-the-first-digital-handpan | Le concurrent direct du Neotone côté « handpan digital ». Existe un « Oval Ensemble » chez Playmodes (Barcelone). **Utile pour comprendre le vocabulaire employé par ce public.** | URL officielle **non vérifiée** |

**Honnêteté** : ce cercle E est une **hypothèse documentée**, pas un fait établi. Je n'ai pas trouvé
de preuve qu'un producteur électro parisien cherche activement « un instrument jouable en live ».
Ce que j'ai trouvé, c'est un milieu qui **programme déjà du handpan dans des sets downtempo**.

---

## 2. Les habitudes — ce que j'ai pu observer, cercle par cercle

Je me limite à ce qui est **observable dans la façon dont ces gens vendent leurs propres places**.

### Ecstatic dance (cercle A)
- **Quand** : le **dimanche matin 11h–14h** (Ecstatic Dance Paris) ou le **soir 19h–22h** (LovEcstatic).
  Un showcase le samedi après-midi n'entre en concurrence avec aucun des deux ; un dimanche matin, si.
- **Comment ils vendent** : **billetterie en ligne systématique et payante d'avance** — Billetweb pour
  Ecstatic Dance Paris, HelloAsso pour LovEcstatic, Shotgun pour les formats plus « soirée ». Ces
  publics sont **habitués à payer un ticket à l'avance pour un événement de 15–20 €**. Conséquence
  directe : ils sont habitués à un **bouton de réservation avec une date, un prix, une jauge** — pas
  à un formulaire de contact qui promet une réponse personnelle.
- **La jauge est un argument, pas un obstacle** : « 20 personnes maximum » (Instatic dance) est écrit
  dans l'annonce comme une qualité. Sur /showroom, « places limitées » est écrit comme une réserve.
- **Seul ou à plusieurs** : ces pratiques se font massivement **seul·e** (on vient danser pour soi) mais
  se **découvrent** par une personne qui amène une autre. Le levier « venir à plusieurs » a une forme
  observable dans ce milieu : le **tarif duo / le lien à partager**, et la publication d'un événement
  Facebook auquel on peut **inviter ses amis en un clic** — mécanisme que /showroom n'utilise pas.
- **Où ils regardent** : Instagram en premier (chaque collectif y renvoie via Linktree), Facebook pour
  le groupe/l'événement, la newsletter du collectif ensuite.

### Handpan (cercle B)
- **Comment ils découvrent** : les **groupes Facebook régionaux** et les **jams récurrentes**
  (Le RDV du Handpan, jams Hangora). Le milieu handpan francophone est encore très « Facebook »,
  bien plus que le milieu danse.
- **Le déclencheur d'achat**, tel qu'il apparaît dans les requêtes Google : ils cherchent **« où
  essayer »** avant **« où acheter »** (voir §4 : « ou essayer un handpan » est la seule complétion
  existante sur ce début de requête). Le showroom répond à une intention **déjà formulée**.
- **Ils viennent en groupe naturellement** : la jam est le format natif de ce milieu.

### Yoga / son (cercle C)
- **Quand** : soirs de semaine et week-end, séances de 1h–2h payantes (15–40 €).
- **Comment ils remplissent** : newsletter du studio + Instagram + agrégateurs (Ohmycream, articles
  « meilleures adresses de sound bath à Paris »). **Ce cercle se remplit par prescription éditoriale**,
  pas par publicité. C'est un cercle où l'on entre **par le praticien**, pas par le public.
- **À plusieurs** : oui, structurellement — cercles, ateliers, duos (« massage sonore en duo » est une
  offre standard chez Resonance et Zen and Sounds).

### Festivals conscients (cercle D)
- **Cycle annuel** : les inscriptions se font **plusieurs mois avant** ; l'été concentre tout
  (juillet–août). Un festival n'est pas un canal de recrutement pour septembre, c'est un canal de
  rencontre pour l'année suivante.
- **Canal actionnable maintenant** : **Noosom** accepte les dépôts d'événements par les organisateurs.

### Électro (cercle E)
- **Quand** : la nuit, du jeudi au samedi. Billetterie **Shotgun** quasi exclusive.
- **Rythme** : ce public ne « s'inscrit » pas trois semaines avant, il achète **la semaine même**.

---

## 3. Ce qui manque à la liste de groupes Facebook de David

David est déjà dans : *Handpan Paris*, *Handpan Paris et Ile de France*, *GRIASDI - Handpan Gathering*,
*Joueurs de hang et handpan professionnels en France*, *Les amoureux du Ngonilele*. Tous sont dans le
**cercle B** (handpan) — **aucun** dans les cercles A, C, D, E.

**Ce qui manque, nommé et vérifié comme URL existante** :

| Groupe / page | URL | Cercle | Vérif. 01/09/2026 |
|---|---|---|---|
| **Ecstatic Dance Paris & Instatic Dance Paris Community** | https://www.facebook.com/groups/ecstaticdanceparis/ | A | existence vérifiée — ⭐ **le nom du groupe contient déjà « Instatic Dance Paris »** |
| **Danser à Paris : 5 Rythmes, Open Floor, Movement…** | https://www.facebook.com/groups/danse.libre.a.paris/ | A | existence vérifiée (nom exact tronqué dans les résultats, **à confirmer d'un clic**) |
| **LovEcstatic Dance Paris** (page) | https://www.facebook.com/LoveEcstaticDanceParis/ | A | existence vérifiée |
| **Ecstatic Dance Paris** (page) | https://www.facebook.com/EcstaticDanceParis/ | A | existence vérifiée |
| **TOUCH a PAN** (page) | https://www.facebook.com/touch1pan/ | B | existence vérifiée |
| **Le RDV du Handpan – Paris** (@rdvhang) | https://www.facebook.com/rdvhang/ | B | existence vérifiée |
| **Percussion du monde** (page) | https://www.facebook.com/percussiondumonde/ | B | à vérifier (non testé) |
| **La Baguetterie** (page) | https://www.facebook.com/baguetterie.fr/ | B | à vérifier (non testé) |
| Groupe handpan francophone n° 2382216785345951 | https://www.facebook.com/groups/2382216785345951/ | B | existence vérifiée, **nom à confirmer** |
| « Handpan Occasion France » | — | B | ❌ **URL introuvable, à chercher depuis un compte connecté** |

**Groupes yoga / bien-être parisiens** : je **n'ai pas réussi** à identifier un groupe Facebook
généraliste « yoga Paris » qui soit à la fois nommé avec certitude et manifestement actif. Ce cercle
vit sur **Instagram et par newsletter de studio**, pas en groupe Facebook. Je préfère écrire ce trou
plutôt que de citer un nom que je n'ai pas vu.

---

## 4. Référencement — les mots-clés que les gens tapent réellement

**Méthode** : complétions Google (`suggestqueries.google.com`, `hl=fr`, `gl=fr`), relevées le
**01/09/2026**. Une complétion **prouve que la requête est réellement tapée** (Google ne suggère que
des requêtes existantes). Elle ne donne **pas** de volume — je n'ai pas accès à un outil de volume,
et je ne l'invente pas.

### A. Requêtes FONDÉES (relevées telles quelles dans les complétions)

**Autour de « handpan paris »** — la mine principale :
`handpan paris cours` · `magasin handpan paris` · `stage handpan paris` · `concert handpan paris 2026` ·
`concert handpan paris` · `location handpan paris` · `initiation handpan paris` · `association handpan paris`

**Autour de l'achat** :
`ou acheter un handpan en france` · `ou acheter un handpan a paris` · `ou acheter un bon handpan` ·
`acheter handpan paris` · `acheter handpan d occasion` · `acheter handpan france` · `quel handpan acheter` ·
`acheter son premier handpan`

**Autour de l'essai** — ⚠️ **une seule complétion existe** sur ce début de requête :
`ou essayer un handpan` (« essayer un handpan » seul ne produit **rien d'autre**).
Et `handpan essai` ne produit **aucune** complétion.

**Autour de l'électronique** :
`handpan electronique roland` · **`handpan électronique neotone`** ← ⭐ le nom Neotone est **déjà** une
complétion Google française. Côté test : `neotone handpan test` apparaît aussi.
⚠️ Mais la requête « neotone » nue est **massivement captée par une marque de cosmétique**
(`neotone body`, `neotone serum`, `neotone isispharma`…) : « neotone » seul n'est **pas** un mot-clé
atteignable, « **handpan électronique neotone** » l'est.

**Autour des cours** :
`cours de handpan paris` · `cours de handpan gratuit` · `cours de handpan en ligne` · `cours handpan debutant`

**Autour du bain sonore** — ⭐ le résultat le plus frappant du relevé :
`bain sonore paris` se décline **par arrondissement**, et **`bain sonore paris 20` est la première
déclinaison suggérée**, avant Paris 11, 16, 12, 18, 15, 9, 19. Le showroom est **dans le 20ᵉ**.

**Divers fondés** : `handpan prix` · `handpan occasion` · `handpan débutant` · `handpaname` (le festival
est lui-même une requête) · `handpan boutique paris` · `boutique handpan france`.

**Requêtes ecstatic dance** : `ecstatic dance paris 2026` · `love ecstatic dance paris` · `conscious dance paris`
et — ⭐ **`ecstatic dance paris david`**. Une complétion contenant le prénom **David** existe déjà sur
« ecstatic dance paris ». Je **ne peux pas prouver** qu'il s'agit de David Lesage (à vérifier), mais
c'est le signal le plus intéressant du relevé.

### B. Requêtes NON fondées (mes suppositions, à traiter comme telles)
`essayer un handpan Paris` · `tester un handpan` · `handpan showroom Paris` (les complétions
« showroom handpan » existent mais sont **toutes allemandes** : Trier, München, Düsseldorf, Stuttgart,
Hamburg, Wien… — **aucune française**) · `handpan Ile de France` (existe comme complétion mais **sans
aucune déclinaison**, signe d'un volume très faible) · `harpe ngoni Paris` (`ngoni paris` : **aucune
complétion**) · `gonilélé` · `essayer un instrument rare Paris`.

### C. Ce que la page /showroom capte déjà, et ce qu'elle ne capte pas

| Requête fondée | Captée par la page ? |
|---|---|
| `ou essayer un handpan` / `ou acheter un handpan a paris` | **Partiellement** : le `<title>` dit « Essayer handpan … à Paris », mais **aucun `<h1>`/`<h2>` ne le reprend**, et le mot « acheter » n'apparaît dans aucun titre |
| `handpan électronique neotone` | **Oui** en `meta description` et dans le corps ; **non** en `<h1>`/`<h2>` |
| `magasin handpan paris` / `handpan boutique paris` | **Non** — le mot « showroom » n'est pas ce que les gens tapent, ils tapent « magasin » et « boutique » |
| `initiation handpan paris` / `stage handpan paris` / `cours de handpan paris` | **Non** sur cette page (le site a `/cours` et `/apprendre-le-handpan` à côté — **risque de cannibalisation à arbitrer, pas à trancher ici**) |
| `bain sonore paris 20` | **Non** — et ce n'est peut-être pas souhaitable : ce n'est pas ce que David propose |
| `concert handpan paris 2026` | **Non** — or les showcases sont des dates publiques gratuites |
| `handpan paris` (générique) | Faiblement : l'expression exacte « handpan Paris » n'est dans **aucun** `<h1>`/`<h2>` |

**Le point structurel** : le `<h1>` « Showroom David Lesage » est un **nom de marque inconnu**.
Toute la page est indexée sous une entité que personne ne cherche encore.

---

## 5. La concurrence — qui propose d'essayer un handpan, et ce qu'ils promettent

### À Paris, physiquement

| Qui | Où / URL | Ce qu'ils promettent | Vérif. |
|---|---|---|---|
| **Percussion du Monde** | 34 av. de la République, 75011 Paris · https://percussiondumonde.fr/ · @percussiondumonde | Magasin d'instruments **spécialisé handpan**. Meta description du site : « Ventes d'instruments de musique plus précisément de percussion. » Mar.–sam. 10h–12h / 14h–19h. | site 200, titre/meta lus |
| **La Baguetterie** | 36–38 rue Victor Massé, 75009 Paris · https://www.baguetterie.fr/percussions/melodique/handpan.html | « Le magasin des batteurs et des percussionnistes », depuis 1979. Rayon handpan présenté comme instrument « de musicothérapie », invitation « au voyage et à la méditation ». | à confirmer (le domaine sans `www` ne répond pas ; l'URL `www.baguetterie.fr` est celle citée partout) |
| **Woodbrass** | 182 av. Jean Jaurès, 75019 Paris · https://www.woodbrass.com/ | Grande surface musicale généraliste ; handpans au catalogue. | 200 |
| **TOUCH a PAN** | Paris / Maisons-Alfort · https://www.facebook.com/touch1pan/ | **Le plus proche du dispositif de David** : ateliers découverte, **instruments prêtés**, « idéal pour une première expérience », ~4 dates/mois. Mais **payant** (~35 € découverte, ~60 € les 3 h) et **orienté apprentissage**, pas essai-achat. ⚠️ site web hors service. | page FB : existence vérifiée |
| **Collectif Hangora** | https://www.hangora.fr/ | Ateliers découverte + **jams gratuites** + performances. Promesse affichée : « créer du lien par l'art et le son ». Partenaire de plusieurs facteurs. | page lue |
| **Le RDV du Handpan** | https://www.facebook.com/rdvhang/ | Jam mensuelle gratuite en extérieur. | existence vérifiée |
| **HandPaname** (1×/an) | https://shotgun.live/en/festivals/handpaname-2026 | 6 sept. 2026, Cité Fertile Pantin : **village d'artisans facteurs de handpan** = le jour de l'année où on peut essayer 10 instruments à Paris. | à confirmer (429) |

### En ligne (France)

| Qui | URL | Promesse d'accueil | Vérif. |
|---|---|---|---|
| **Handpan France** | https://handpan-france.com/ | « Livraison rapide en 7 jours sur certains handpans », « Livraison offerte en France », « 4,9/5 », « 100 € de réduction sur votre 1ʳᵉ commande ». **Aucun essai physique, aucun showroom mentionné.** | page lue |
| ZenaPan | cité par des articles tiers | Boutique en ligne + conseils. | ❌ **URL non vérifiée** |

### Les prescripteurs éditoriaux (les pages qui se placent sur les requêtes de David)
Ces sites **captent déjà** « où essayer / acheter un handpan à Paris » — ce sont à la fois des
concurrents SEO et des endroits où **exister** :
- https://www.mon-handpan.fr/ou-trouver-un-handpan-a-paris-adresses-incontournables/
- https://choisir-son-handpan.fr/handpan-paris/
- https://www.artdisques.com/ou-tester-et-acheter-un-handpan-a-paris/
- https://www.melodiesdumonde.fr/ou-acheter-un-handpan-en-france-boutiques-et-luthiers/
- https://www.myguitarmag.com/handpan-france-ou-essayer-et-acheter-pres-de-chez-vous/
- https://www.hangdrum.fr/cours-de-handpan-a-paris-ce-quil-faut-savoir/

⚠️ **Aucune de ces pages ne cite le showroom de David** dans ce que j'ai pu lire. C'est un fait
vérifiable et actionnable, pas une opinion.

**Ce que dessine ce paysage, en creux** (constat, pas conclusion) : à Paris, on peut **acheter** un
handpan dans un magasin, **apprendre** dans un atelier payant, **jammer** gratuitement dans un parc,
ou **acheter en ligne sans essayer**. Le mot « essayer » n'est le sujet principal d'**aucune** de ces
offres. Et **aucune** ne propose de comparer acoustique et électronique côte à côte.

---

## 6. Ce que je n'ai pas réussi à vérifier

1. **Le contenu et l'activité des groupes Facebook** — mur de connexion. Les URL existent, l'activité et les nombres de membres non vérifiés.
2. **« Handpan Occasion France »** (~5 000 membres selon des sources tierces) : **URL introuvable**.
3. **Le nom exact** du groupe `facebook.com/groups/2382216785345951/` et de `groups/danse.libre.a.paris/`.
4. **HandPaname 2026** : la page Shotgun m'a renvoyé un 429 (anti-robot). Date (6 sept. 2026), lieu (Cité Fertile, Pantin) et programme viennent de la recherche, **pas d'une lecture directe**.
5. **HelloAsso** (403 aux robots) : les dates LovEcstatic / Les Champs d'Amour n'ont pas pu être lues, ni la page Résonances Productions.
6. **`ouest-ecstatic.com` et `lamainsonore.com`** : 403 anti-robot — les sites existent, contenu non lu.
7. **`touchapan.com`** : **ne répond pas du tout** (000). Touch a Pan semble ne vivre que sur Facebook/Billetweb — **à revérifier avant de le citer comme concurrent actif**.
8. **Boom Festival 2026** : sources contradictoires (21–28 juillet vs 22–29 juillet), alors que la source la plus solide dit **prochaine édition pleine en 2027** et **Being Gathering 1–5 juillet 2026** entre-temps. **Ne pas écrire de date Boom 2026 sur le site.**
9. **`ecstatic dance paris david`** : complétion réelle, mais **rien ne prouve** qu'elle désigne David Lesage.
10. **Aucun volume de recherche chiffré** : je n'ai pas d'outil de volume. Tout le §4 dit « cette requête existe », jamais « elle fait X recherches/mois ».
11. **Groupe Facebook yoga/bien-être parisien** : aucun nom que je puisse affirmer.
12. **Site officiel d'Oval Sound** : non vérifié.
