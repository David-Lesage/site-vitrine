# Audit de contenu — site lesagedavid.fr
**Date : 13–14 août 2026** · audit **lecture seule** (aucun fichier du site modifié par cet audit)
**Déclencheur :** découverte d'une recommandation publiée à la première personne que David n'a jamais formulée
(`src/data/guides.ts` — « Pour un premier handpan, choisis un instrument de 8 ou 9 notes… », en ligne depuis le
01/07/2026, commit `b312b3d`).

> **But de ce document.** Ne pas corriger, mais **rendre visible** : lister tout ce que le site affirme au nom de
> David, et dire pour chaque affirmation si elle repose sur une source réelle, sur rien, ou sur quelque chose de faux.
> La base de faits vérifiés est en **annexe §5** — elle est faite pour resservir à chaque futur texte.

---

## ⚠️ Avertissements de méthode (à lire avant tout)

1. **Le site bouge pendant l'audit.** Une autre session travaille en ce moment sur `src/data/guides.ts`,
   `src/i18n/dict.ts` et la page `/a-propos`. Les corrections déjà appliquées sont signalées ✔️ dans ce rapport.
   L'audit porte sur l'**état de travail au 14/08/2026 04h35**, pas sur la version déployée.
2. **La page `/a-propos` a déjà été réécrite et enrichie** (commit `abec9d6`). Elle est bien meilleure qu'avant —
   mais elle contient encore **4 erreurs factuelles confirmées par David** (§2.A). Elles sont donc en ligne.
3. **Couverture honnête** : `src/i18n/en.ts` (1 395 lignes) n'a pas été relu ligne à ligne — c'est un miroir
   structurel du FR, contrôlé par extraction ciblée (chiffres, dates, crédits, prix). **Une divergence FR/EN
   réelle a quand même été trouvée** (§3, point 12), donc d'autres peuvent exister.
4. **Le blog (54 fichiers) est traité en tier séparé (§4)** : 27 articles FR lus intégralement, jumeaux EN
   contrôlés par recoupement ciblé sur les articles à chiffres et à biographie.

---

## 1. Résumé exécutif

| | Compte | Ce que ça veut dire |
|---|---|---|
| Affirmations inventoriées (hors blog) | **≈ 320** | pages, `src/data/*.ts`, `dict.ts`, JSON-LD |
| Affirmations inventoriées (blog) | **≈ 120** | 27 articles FR + jumeaux EN |
| ⚠️ **Contredites par une source réelle** | **11** | §2.A — priorité absolue |
| 🗣️ **Opinions / conseils dans sa voix** | **≈ 60** | §2.B — la catégorie qui a produit l'incident |
| ❓ **Non sourcées** | **≈ 90** | §3 |
| ✅ Sourcées | le reste | notamment `/yishama` et `data/yishama.ts`, exemplaires |

### Les pires offenseurs, dans l'ordre

1. **`dict.about:1172` — « co-fondé en 2020 Aora Mana ».** David n'était **pas** co-fondateur. C'est un titre
   d'entrepreneur attribué à tort, sur la page biographique, en ligne.
2. **« Ambassadeur officiel Neotone » (3 emplacements + blog).** Le statut de David chez Neotone est
   **explicitement non tranché** dans ses propres dossiers au 08/08/2026 (« À cadrer : ambassadeur ? revendeur ?
   partenaire R&D ? »). Et les mentions légales du site disent, elles, « ambassadeur **indépendant** ».
   Le site affirme donc un statut officiel que rien n'établit.
3. **« Bêta-testeur Neotone depuis 2023 » (3 emplacements) contre « été 2022 » (page /a-propos).** Le site se
   contredit lui-même, et les deux récits d'entretien disent **juillet 2022**.
4. **`guides.ts` — la grappe complète autour de la ligne 362.** La ligne fautive est corrigée ✔️, mais **au moins
   12 conseils frères** du même type survivent dans le même fichier (§2.B).
5. **Tout le discours « −5 % / −7 % / commission / affiliation ».** Le compte rendu de séance du 08/08/2026 acte
   la **fin du modèle « rémunération sur les ventes »** — décision n°6. Le site entier est encore construit dessus.
6. **`dict.gonilele:822` — « Je collabore avec Joris Feuillâtre depuis 2018 ».** Faux selon David : ngoni
   découvert en 2018 via son thérapeute Fred Hervaud ; la collaboration avec Joris date de **2023**.
7. **Les superlatifs mondiaux non sourcés** : « première mondiale », « le seul endroit au monde », « le meilleur
   handpan électronique au monde », « le meilleur prix du marché », « la gamme la plus jouée au monde ».
   L'un d'eux est même écrit dans les **données structurées** lues par Google.
8. **`dict.legal:1287` — « Hébergement à préciser lors de la mise en ligne. »** Mention légale obligatoire,
   restée à l'état de gabarit, en production.

---

## 2. ⚠️ Contredites + 🗣️ Opinions dans sa voix

### 2.A — ⚠️ CONTREDITES (11) — à traiter en premier

| # | `fichier:ligne` | Texte publié | Le fait réel | Source du fait |
|---|---|---|---|---|
| 1 | `src/i18n/dict.ts:1172` | « puis **co-fondé en 2020 Aora Mana** — l'une des premières plateformes de voyages initiatiques en réalité virtuelle » | David **n'était pas co-fondateur**. Son rôle : cadreur, réalisateur, monteur VR 360°, pilote de drone. | Correction directe de David |
| 2 | `src/i18n/dict.ts:1164` | « un **bac TMD au lycée Saint-Sernin** à Toulouse, **un passage au collège de jazz de Marciac** » (ordre : lycée → collège) | Le **collège de Marciac vient AVANT le lycée**. L'ordre publié inverse sa scolarité. | Correction directe de David |
| 3 | `src/i18n/dict.ts:1191` (chap. Naxos) | « Le lendemain, **je croise un homme sur le port**. » | La rencontre avec Yonathan a eu lieu **au bar extérieur du festival**, pas sur un port. ⚠️ La page `/yishama:298` dit déjà correctement « au **bar extérieur du festival** » → **le site se contredit page à page**. | Correction directe de David + `dict.yishama:298` |
| 4 | `dict.ts:822` (gonilele) + `dict.ts:1183` (about) | « **Je collabore avec Joris Feuillâtre depuis 2018.** » / « **En 2018**, j'entre dans le monde du ngoni… je transmets la harpe gonilélé de Joris Feuillâtre » | 2018 = **découverte du ngoni via son thérapeute Fred Hervaud**. La **collaboration avec Joris date de 2023**. Les deux faits ont été fusionnés en un seul. | Correction directe de David |
| 5 | `dict.ts:164` · `dict.ts:267` · `dict.ts:1406` | « bêta-testeur **depuis 2023** » (×3) | Le premier Neotone bêta est mis entre ses mains à **Naxos, juin 2022** ; il repart de l'atelier hongrois avec un bêta en **juillet 2022**. La page `/a-propos:1192` et le jalon `1232` le disent correctement → **contradiction interne**. | `Recit-Mag-entretien-David.md` §1 et §3 ; `Recit-Yishama-entretien-David.md` §4 |
| 6 | `src/data/guides.ts:116` | « **J'ai moi-même quitté le Conservatoire découragé** par le solfège avant de tout réapprendre à l'oreille » | Il **en est sorti diplômé**, avec un prix de batterie mention très bien (`dict.about:1164`, ancien site Wix). « Quitter découragé » et « sortir diplômé » ne peuvent pas être vrais ensemble. | Ancien site Wix + `dict.about:1164` |
| 7 | `dict.ts:165` · `dict.ts:210` · blog `setup-nomade…:29,67` | « **ambassadeur officiel Neotone** » | Statut **non tranché** dans ses propres dossiers : « Pas revendeur classique… **À cadrer : statut de David (ambassadeur ? revendeur ? partenaire R&D ?)** ». Et `dict.legal:1288` dit « ambassadeur **indépendant** ». | `NEOTONE - Fiche de suivi.md` (Drive, 08/2026) |
| 8 | tout le site : `dict.ts:206,210,495,555,1417` · `shop.ts` · blog ×4 | « −5 % en ligne / −7 % au showroom », « je touche une commission », « affiliation » | **Décision n°6 de la séance du 08/08/2026 : fin du modèle « rémunération sur les ventes »**, appliquée à Neotone, Mühling, Atlas. Argument jugé « mauvais et contre-productif ». Le site est intégralement construit sur le modèle abandonné. | `260808 - Compte rendu de séance.md` §1.6 et §3 |
| 9 | `dict.ts:1217` · section showroom `1035-1045` | « J'ai ouvert **Le Nid, mon showroom** du 20ᵉ » / « Showroom David Lesage, 29 rue des Orteaux » | Le Nid est **le lieu de l'association Résonances Productions**, co-porté avec **Iris Chasles** (psychothérapie, yoga) : « un lieu pour éclore ». Le showroom en est **un usage**, pas l'identité du lieu. | resonancesproductions.org/le-nid |
| 10 | `dict.ts:157,396` · `yishama.ts:22` | « Je suis **ambassadeur et affilié** Yishama » | Le **lien d'affiliation est réel** (`wpam_id=40`) ✅. Le titre d'ambassadeur vient d'une **décision orale de Yonathan au HUG 2022**, jamais formalisée : fiche interne 08/2026 = « relation artiste historique, **rien de formalisé** ». Affirmé plus fermement que la réalité. | `YISHAMA - Fiche de suivi.md` ; `Recit-Yishama…` §1 |
| 11 | `dict.ts:1173` + jalon `1231` | « En **février 2022**, je passe les auditions à l'aveugle de The Voice » | Deux sources donnent deux dates : l'ancien site Wix et resonancesproductions.org disent **saison 11 / 2022** ; le récit Mag dit « **l'échec de The Voice en 2021** ». Tournage 2021 / diffusion 2022 est l'hypothèse la plus probable — **mais aucune source ne l'établit**. | Wix + resonancesproductions.org vs `Recit-Mag…` §5 |

> ✔️ **Déjà corrigé par la session en cours** (à ne pas re-signaler) : le Neotone décrit comme instrument « au casque
> uniquement » → mention de l'ampli Bose S1 en extérieur ajoutée dans `guides.ts` (×6) ; et la ligne 362 réécrite
> avec le vrai conseil (~1500 €, puis vite un second, puis éventuellement Neotone ou handpan de chanteur sur mesure).
> ⚠️ **Le blog n'a pas reçu ces corrections** — voir §4.

---

### 2.B — 🗣️ OPINIONS ET CONSEILS DANS SA VOIX (≈ 60)

> Règle de lecture : **ces énoncés peuvent tous être vrais**. Ce n'est pas le point. Le point est qu'ils sont
> attribués à David et qu'il ne les a jamais validés — exactement le mécanisme qui a fait survivre six semaines
> la ligne des 8-9 notes.

#### `src/data/guides.ts` — le foyer principal (les frères de la ligne 362)

| ligne | Texte | Pourquoi c'est un problème |
|---|---|---|
| **382** | « le **D Kurd** fait **l'unanimité**… c'est **la gamme la plus jouée au monde**… le meilleur point de départ » | Double superlatif invérifiable, présenté comme un consensus |
| **447** | « Le D Kurd est **le meilleur choix** pour un premier handpan » (FAQ) | Répétition en FAQ → repris tel quel par les moteurs IA |
| **427-430** | 4 « erreurs à éviter » : « Acheter le moins cher… », « Choisir une gamme rare parce qu'elle est belle… », « Négliger la housse et le support », « Acheter sans avoir essayé » | **La liste même d'où la 5ᵉ ligne fautive a été retirée ✔️.** Les 4 restantes n'ont pas plus de source que celle qui a sauté |
| **156** | « **Dix minutes par jour valent mieux qu'une heure une fois par semaine.** La régularité, pas la durée, fait progresser » | Maxime pédagogique érigée en loi, dans sa voix |
| **147-151** | 5 consignes impératives : « Installe-toi confortablement… Joue le ding central du bout des doigts… Rejoue une courte mélodie de 3 ou 4 notes » | Une méthode d'enseignement complète attribuée à lui |
| **127** | « **Ma méthode** repose sur trois repères concrets… » | S'attribue une méthode formalisée |
| **96 / 206 / 210** | « tu retiens des mélodies **en quelques minutes** » · « **en quelques minutes** tu peux jouer une petite mélodie » · « **en quelques semaines** (10 min/jour), tu improvises avec plaisir » | Trois promesses de délai d'apprentissage chiffrées |
| **167 / 393** | « Pour un débutant, l'électronique lève **deux freins majeurs** » · « l'électronique **t'évite de te tromper et de racheter** » | Recommandation d'achat orientée produit |
| **277** | « **Beaucoup de joueurs** finissent par avoir les deux » | Généralisation sans base |
| **308** | « le Neotone est **imbattable** » | Superlatif commercial dans sa voix |
| **259-265 / 290-296** | 7 puces + tableau comparatif acoustique/électronique, incl. « Désaccordage / rouille → **Jamais** » | Chaque ligne est une assertion absolue |
| **404 / 415 / 455 / 459** | ✔️ réécrites avec le vrai conseil — **mais** conservent « mon showroom est **le seul endroit au monde** » et « **au meilleur prix** » | Le conseil est réparé, la revendication mondiale non |

#### `dict.ts` — recommandations produit explicites

| ligne | Texte |
|---|---|
| **1437** | « **Mon conseil : la Bose S1 Pro+ (≈ 599 €)** … avec plus de basses que l'ancienne S1 Pro » |
| **1408** | « Les systèmes **Bose L1** sont **idéaux** ; le **Bose S1 Pro** est une **excellente option** portative » |
| **1410** | « Jouer du Neotone est même **plus facile** que de jouer d'un handpan acoustique » |
| **1412** | Endossement de 5 produits nommés : **Boss OC-3, Roland RC-505 MKII, Strymon Nightsky, Hologram Microcosm** |
| **1436** | « prends un connecteur **coudé** côté instrument » |
| **506** | Hisong — « **Mon conseil :** si tu veux jouer en live, il te faut le kit 6-en-1 (Master) » + « le **premier** studio mobile tout-en-un » |
| **648-650** | Mühling — « **Pourquoi je le recommande** … C'est ce qui m'a convaincu de **le représenter** » |
| **792** | « **J'utilise personnellement une pile rechargeable**, plus économique et plus écologique » |
| **505** | Tambour — « un fabricant **aligné, passionné et intègre** » (jugement de valeur sur une personne réelle, Julien / L'Âme du Tambour) |
| **819** | Gonilélé — « il incarne **l'alliance du masculin et du féminin, connectée au divin** » (claim spirituel affirmé comme fait) |
| **514** | one sec — « **l'une des rares choses qui a réellement fonctionné** » pour lui |
| **515** | ÖKO — « l'eau est **la chose la plus importante qui soit** » |
| **71** | « **je prends un pourcentage**, et tu leur fais un prix de mise en relation. **Je ne travaille qu'avec des fabricants alignés** » (conditions commerciales énoncées dans sa voix — ⚠️ à recouper avec la décision du 08/08) |
| **124** | « je **t'accompagne personnellement** » · **1219** « je **réponds personnellement** » | promesses de service |
| **1242** | « Grâce aux « 4 Magiques » (I-IV-V-VI), **n'importe qui** peut accompagner les morceaux qu'il aime **en quelques minutes** » |
| **922-926** | « Le handpan **n'a pas** de notation visuelle » / « **Aucune** notation ne montre l'instrument » | assertions catégoriques sur l'état de l'art |

---

## 3. ❓ NON SOURCÉES (≈ 90) — plausibles, aucune source trouvée

### Superlatifs et exclusivités (les plus exposés)
| `fichier:ligne` | Texte |
|---|---|
| `dict.ts:180` | « **★ Première mondiale** » (badge accueil) |
| `dict.ts:181` | « **Le seul endroit au monde** pour tester et repartir avec ton Neotone » |
| `dict.ts:1043` | « **Le Nid est le premier lieu au monde** où ces instruments sont en vente en direct » |
| **`lib/ldJson.ts:164`** | **la même revendication mondiale, en données structurées Schema.org** — lue par Google et les moteurs IA |
| `dict.ts:208` | « le **meilleur handpan électronique au monde** » |
| `dict.ts:182,1044` | « **le meilleur prix du marché** (−7 %) » |
| `dict.ts:183,1045` | « **Stock ultra limité** — quelques instruments disponibles » |
| `dict.ts:384,501` | Yishama « **fait partie des meilleurs fabricants** de handpan au monde » (revendication reprise du récit — acceptable si attribuée) |

### Chiffres et crédits biographiques
| `fichier:ligne` | Texte | Remarque |
|---|---|---|
| `dict.ts:267,1406` | « j'ai remonté et fait corriger **des milliers de bugs** » | aucun décompte nulle part ; `about:1192` dit « des milliers de **retours** » (plus prudent) |
| `dict.ts:1182` | Now Groove « tient debout avec **cinquante personnes** dans la même salle » | invérifiable |
| `dict.ts:1228` | « **2013** — Prix de batterie, Conservatoire de Toulouse » | l'année **n'apparaît nulle part ailleurs**, ni Wix, ni Drive |
| `dict.ts:1190` | « je joue **trois handpans en même temps** » | ✅ cohérent avec `Recit-Mag…` §1 — **sourcé**, gardé ici pour mémoire |
| `dict.ts:1172` | Numéricoach / Thierry Vanoffe **2017** | Thierry Vanoffe est bien un contact réel et actif (carte Disney, séance 08/08), mais **la date 2017 et le rôle « formateur »** ne sont attestés nulle part |
| `dict.ts:1172` | Aora Mana « **l'une des premières** plateformes de voyages initiatiques en VR » | superlatif, en plus du rôle erroné (§2.A n°1) |
| `dict.ts:1222` | « **Guso Facile** fait la même chose pour l'administratif des intermittents » | produit réel, mais aucun état de disponibilité |
| `dict.ts:1219` | « showcases gratuits au Nid **presque chaque mois** » | ✅ corroboré par `site.ts:77-82` (5 dates) et la carte Disney (« 6 dates publiques jusqu'en décembre ») |

### Spécifications produit (fournisseur, non vérifiées côté site)
`dict.ts:227,1386-1391` — DAC 24 bits/384 kHz · latence 5 ms · S/N 112 dB · 47 cm · 16 cm · 3,5 kg · capteur 0,5 cm ·
sensibilité 20–5 000 g · batterie 7800 mAh / 8 h · 1 300 échantillons par gamme · 7 nuances × 10-15 vélocités.
`dict.ts:390` — Yishama « ≈ 55 cm · 28 cm · **4,4 kg** ». `dict.ts:1406` — « Soundventure Ltd **fondée en 2021**,
avec le soutien de MAG Instruments et Yishama Ltd » (le **lien capitalistique MAG ↔ Soundventure est explicitement
marqué « à traiter comme NON VÉRIFIÉ »** dans `Recit-Mag-entretien-David.md`, faute de source publique).

### Claims de tiers repris sans vérification
- `dict.ts:514` — one sec : « approche **validée par la science (études avec l'Institut Max Planck)** »
- `dict.ts:515` — ÖKO : « laboratoire indépendant **accrédité COFRAC** sur **plus de 200 contaminants** »
- `dict.ts:773` — Muling : « **plus de 80 000 ensembles/an entre 2001 et 2010** » ✅ *correctement attribué* (« Le
  fabricant revendique ») — **c'est le bon modèle à généraliser**
- `dict.ts:1332` — « **Yishama écrit** qu'on l'entend à des kilomètres » ✅ *correctement attribué*

### Engagements contractuels et opérationnels
`dict.ts:548,613-615` politique d'annulation 24 h / report 3 mois · `dict.ts:555,574` « réponse sous 24-48 h » /
« Neotone te contacte **sous deux jours** » · `dict.ts:1418-1420` « **acompte de 1 000 € HT** », « délai **2 à 5 mois** » ·
`dict.ts:1405` « **garantie 6 ans** » (répétée 8 fois) · `dict.ts:1087` « chaque session dure environ **2h** ».

### Vérifiables en une minute, jamais vérifiés
`dict.ts:1120-1122` — « Lignes 26 et 64, arrêt Orteaux, **3 min à pied (≈ 250 m)** » · « Ligne 9 — Maraîchers
(**5-7 min**) ou Buzenval (**10 min**) » · « T3b — **Marie de Miribel (12 min)** ».

### Incohérences internes et défauts structurels
| # | Problème |
|---|---|
| 12 | **Divergence FR/EN sur un prix** : `guides.ts:404` (FR) affirme « **1500 €** selon moi » ; la version EN `guides.ts:790` **omet purement et simplement la phrase**. Les deux publics ne lisent pas le même conseil. |
| 13 | **`dict.legal:1287` — « Hébergement à préciser lors de la mise en ligne. »** Gabarit non rempli, en production, sur une mention légale obligatoire. |
| 14 | `dict.studio:971` « L'application **est disponible** » vs `dict.common.beta:43` « L'application **n'est pas encore ouverte** au grand public ». Les deux chaînes sont livrées. |
| 15 | `data/muling.ts:64-71` — le fichier **documente lui-même** un écart de **1,40 €** : 258 × 0,95 = 245,10 €, mais le site affiche 246,50 €. |
| 16 | **Prix dupliqués** (dérive garantie) : 50/70 € dans 5 fichiers ; 9,90 € dans 5 fichiers dont `ldJson.ts:96` et `prices.ts:31` — alors que la règle projet dit « **Stripe = source de vérité, ne pas coder les prix en dur** ». |
| 17 | **`site.ts:33-34` — les liens Instagram et Facebook du site de David pointent vers les comptes _Neotone Digital Handpan_**, pas vers les siens. Repris dans le `sameAs` du JSON-LD `Person`. C'est exactement le diagnostic posé le 28/07 : « le site raconte l'histoire de Neotone ». |
| 18 | **Nom de l'app** : le site dit « Handpan Compagnon » ✔️, le blog dit « **Handpan Studio** » **158 fois**. Or le naming a été **annulé le 08/08** (collision de marque avec le revendeur européen Yishama + le créateur d'Amsterdam), et « Handpan Studio » est marqué « **nom de travail seulement** » dans les règles projet. |
| 19 | `data/gonilele.ts:43-46` et `data/muling.ts:90-95` contiennent des **IBAN en clair** dans le dépôt (Résonances Productions et Muling / Banking Circle). Pas un problème de véracité, mais à connaître. |

---

## 4. 📰 TIER BLOG — 54 fichiers (27 FR + 27 EN)

> **Partition volontaire.** C'est la plus grande surface du site, presque intégralement écrite par Claude dans la
> voix de David, jamais relue par lui. David peut légitimement décider de **ne pas** y toucher, ou de dépublier
> plutôt que de corriger. Cette section existe pour que la décision soit prise en connaissance de cause.
>
> **Couverture** : 27 articles FR lus en entier ; jumeaux EN contrôlés par recoupement ciblé sur les articles à
> chiffres, prix et biographie — **aucune divergence de substance trouvée**, donc toute correction FR devra être
> répliquée à l'identique dans le `-en.md`.

### 🔴 Les 3 articles où « je » engage David personnellement — à valider mot à mot

**1. `setup-nomade-neotone-bose-s1.md` (17/07/2026) — l'article le plus risqué du blog.**
- `:29` « **Je suis ambassadeur officiel** : en passant par moi tu as **−5 % en ligne (ou −7 % au showroom)**, la
  **garantie 6 ans** » → cumule les contradictions §2.A n°7 **et** n°8.
- `:67` « Tu peux aussi **venir l'essayer à Paris et repartir avec le jour même** » → sous-entend un stock permanent.
- `:13` « le setup que **j'utilise vraiment** » · `:55-63` **8 prix en dur** + total « ≈ **2 600 €** ».
- `:71` « via **mon lien partenaire** » (Hisong).

**2. `quel-casque-choisir-neotone.md` (19/07/2026) — matériel personnel nommé, invérifiable.**
- `:13` « **mon setup réel, celui que j'utilise tous les jours** » · `:19` « **mon casque de tous les jours**, le
  Beyerdynamic DT-990 Pro 250 Ohm (≈ 148 €) » · `:25` « **mon looper Boss RC-505 MKII** » · `:35` « **les miennes** :
  les KZ ZS12 Pro X (≈ 34 €) … un rapport qualité-prix **imbattable** » · `:41` « **j'utilise** le X-vive U4 (≈ 199 €)
  … **je me déplace librement sur scène** ».
- ⚠️ Aucune de ces possessions n'est attestée nulle part. Ce sont des affirmations sur sa vie quotidienne.

**3. `etre-bien-dans-le-son-neotone.md` (16/07/2026) — le titre lui-même est une opinion.**
- `:2-3` titre et description : « **Mon conseil** pour être bien dans le son ».
- `:23` « **Mon réglage préféré, et de loin** » · `:31` « **C'est celle que je recommande** » · `:35` « le Bose L1 …
  est **magique** » · `:39` « **le confort ultime** ».

### 🔴 Affirmations neuroscientifiques présentées comme des faits (3)
- `handpan-par-les-couleurs.md:19` — « Cette approche **s'appuie sur une réalité du cerveau : nous mémorisons une
  couleur et une forme bien plus vite qu'un code écrit** » — **aucune source**.
- `apprendre-les-accords-handpan.md:31` — « **Notre cerveau retient beaucoup mieux ce qu'il voit et ce qu'il fait
  que ce qu'il lit** » — aucune source.
- `les-constellations-du-handpan.md:17` — « **ton cerveau adore les formes** ».

### 🔴 Statistiques implicites sur ses propres élèves (invérifiables, et les plus dommageables s'ils sont faux)
- `handpan-par-les-couleurs.md:19` — « **tant de débutants qui se croyaient "pas doués pour la musique" se mettent
  à jouer de vrais morceaux en quelques séances** ».
- `jouer-et-chanter-au-casque-neotone.md:31` — « **Beaucoup de joueurs progressent plus vite au casque** ».
- `jouer-avec-un-batteur-handpan.md:45` — « **C'est le conseil que je répète le plus souvent en cours** : mets
  l'accord en boucle, ferme les yeux, et chante avant de savoir jouer. » → **pratique d'enseignement attribuée à lui**.
- `pourquoi-handpan-electronique.md:19` — « **Pour beaucoup de musiciens**, c'est ce détail qui fait passer de
  "je joue rarement" à "je joue tous les jours" ».
- `transposer-pour-chanter-handpan.md:29` — « **Beaucoup de gens croient qu'ils "chantent faux"** … **c'est ce que
  fait tout accompagnateur professionnel** ».
- `les-4-accords-magiques-handpan.md:13` — « une suite d'accords qui revient dans **des milliers de chansons** ».

### 🔴 Recommandation pédagogique entière, jamais validée
`layouts-vocaux-handpan.md:25,29,33` — l'assignation **preset ↔ tessiture** : « Profond … **l'idéal pour les voix
aiguës** », « Brillant … le compagnon des **voix graves** », « Ample … le point de départ **le plus sûr** ».
C'est une doctrine pédagogique complète publiée sous son nom.

### 🟠 Points transverses du blog
1. **13 prix en euros codés en dur** dans le Markdown (1 990 / 3 150 / 599 / 148 / 34 / 199 / 168 / 759 / 990 /
   319-426 / 15-30 / 2 600) — hors du mécanisme Stripe, ils périment en silence.
2. **Le Neotone y est encore décrit comme un instrument « au casque »** — la correction apportée dans `guides.ts` ✔️
   **n'a pas été répercutée au blog** (`pourquoi-handpan-electronique.md:17-19`, `quel-casque-choisir…`,
   `jouer-et-chanter-au-casque-neotone.md`).
3. **Titres sous droits annoncés comme fournis avec paroles** : `editeur-de-partition-handpan.md:19,23`
   (« Hallelujah », « Let It Be », montée « *Hallelujah…* » citée), `bibliotheque-musicale-handpan.md:25`
   (« Beatles, Cohen »), `deux-handpans-mode-hybride.md:23`. **Risque juridique, pas seulement éditorial.**
4. **Marques concurrentes nommées** : `handpan-studio-mode-acoustique.md:39,43` — « façon ***Notepan*** »,
   « façon ***Yishama*** ». À arbitrer, surtout au moment où le lien Yishama se réactive.
5. **Claims d'unicité concurrentielle** : `bibliotheque-musicale-handpan.md:47` « **une bibliothèque de handpan
   n'existe pas encore vraiment ailleurs** » ; `ta-partition-prend-vie.md:47` « un répertoire **qui n'existait nulle part** ».
6. **Promesse de roadmap et d'inclusion tarifaire** : `feedback-ameliorer-handpan-studio.md:34` « De nouvelles
   gammes, modes et fonctions arrivent **régulièrement**, et **sont inclus** » ; `:24` « **pas de compte tiers** »
   à recouper avec la règle projet « **création de compte obligatoire** ».
7. **Typo** : `atlas-des-gammes-de-handpan.md:17` — « **Céltique** » (→ Celtique).
8. **Aucun article n'est purement théorique** : les 27 contiennent au moins un lien commercial et une mention
   gratuit/Studio. Les moins risqués : `les-constellations-du-handpan`, `handpan-emotions-degres`,
   `les-4-accords-magiques-handpan`, `transposer-pour-chanter-handpan` — risque **modéré**, jamais nul.

---

## 5. 📚 ANNEXE — Base de faits VÉRIFIÉS

> **Usage.** Tout futur texte écrit au nom de David doit pouvoir pointer une ligne de ce tableau. Un fait qui n'y
> figure pas ne s'écrit pas — il se demande. Chaque entrée porte sa source exacte.
>
> **Chemin des sources Drive** (monté localement) :
> `~/Library/CloudStorage/GoogleDrive-david.lesage@resonancesproductions.org/Drive partagés/1 - Ecosysteme David Lesage/`

### 5.1 — Formation et débuts
| Fait | Source |
|---|---|
| Batteur **depuis l'âge de 4 ans** | Ancien site Wix ; lettre d'intention Yishama 22/11/2022 |
| **Prix de batterie, mention très bien, Conservatoire national de Toulouse** — il en est **sorti diplômé** | Ancien site Wix (« a prize for drum performance with distinction ») |
| **Collège de jazz de Marciac AVANT le lycée**, puis bac TMD (lycée Saint-Sernin, Toulouse) | Correction directe de David, 13/08/2026 |
| Autodidacte, à l'oreille ; culture **purement rythmique**, pas de base théorique en harmonie | `Recit-Yishama-entretien-David.md` §5 ; `dict.about` (validé par David) |
| **The Voice, TF1, saison 11** — auditions à l'aveugle, chant africain *Koth Biro*. ⚠️ **Année à trancher** : Wix + resonancesproductions.org = 2022 ; `Recit-Mag` = 2021 | Wix ; resonancesproductions.org ; `Recit-Mag-entretien-David.md` §5 |

### 5.2 — Instruments et marques
| Fait | Source |
|---|---|
| **Ngoni découvert en 2018 via son thérapeute Fred Hervaud** ; **collaboration avec Joris (Feuillâtre) à partir de 2023** | Correction directe de David |
| Instruments joués : **handpan, voix, calebasse, ngoni / harpe gonilélé**, percussions pieds et mains | resonancesproductions.org ; Wix |
| Avant Yishama, il jouait sur des **Ederod** (fabricant français) — **3 instruments, dont 2 payés** | `Recit-Mag-entretien-David.md` §1 |
| **Aucun contrat d'exclusivité signé avec aucun fabricant** — c'est structurel, et c'est son atout | `Recit-Mag…` §2 ; `Recit-Yishama…` |
| **Mag Instruments** : aucun instrument, aucun contrat, aucune affiliation. C'est **le connecteur** (via **Aron**) vers Neotone, et l'invitation au HUG. Plus aucun contact depuis 2023 | `Recit-Mag-entretien-David.md` §2 et §4 |
| **Hisong** (micro chant USB sans fil) : partenariat **le plus avancé**, contrat en cours, 5 micros consignés attendus. Modèle : 30 % vente directe / ~25 % affiliation | `HISONG - Fiche de suivi.md` |
| **Mühling** (micro contact) : **ambassadeur informel, rien de formalisé**, réponse de David en attente (blocage : leur système de paiement) | `MÜHLING - Fiche de suivi.md` |
| **Atlas** (pieds, Italie) : négo **ouverte le 07/08/2026** (call avec Marco Cekada), prototype à ventouses pour le Neotone. **Rien de signé** | `2026-08-08 - Partenariats marques….md` §① |
| **Forbrain / Sound For Life** : **aucun accord, aucun contrat, silence de la marque depuis le 30/03/2026**. David a le casque et **l'utilise chaque semaine dans ses cours de chant** | `FORBRAIN - Fiche de suivi.md` |
| **Neotone / Soundventure Ltd, Budapest** : partenaire **central**, mais **cadre non écrit** — « À cadrer : ambassadeur ? revendeur ? partenaire R&D ? ». Contacts : **Csaba, Norbert** (créateurs), **Gergely**, Dániel | `NEOTONE - Fiche de suivi.md` ; `Recit-Mag…` §3 |
| **Précédent housse Neotone** : David l'a conçue et fait fabriquer ; elle a été **copiée et produite sans lui, sans exemplaire, sans rémunération** | `260808 - Compte rendu de séance.md` §8 |
| **Lien capitalistique MAG ↔ Soundventure ↔ Yishama : NON VÉRIFIÉ**, aucune source publique. Ne jamais l'écrire | `Recit-Mag…` « Faits à confirmer » |

### 5.3 — L'histoire Yishama (la mieux documentée)
| Fait | Source |
|---|---|
| **HONA Festival, Agia Anna, Naxos (Grèce), juin 2022** — concert handpan/voix, petite scène, mauvaise sono, pas de retour. « Quand je suis arrivé, je n'étais personne » | `Recit-Mag-entretien-David.md` §1 |
| Il y joue **3 handpans en même temps + percussions aux pieds et aux mains** en chantant | idem |
| **Le lendemain, rencontre de Yonathan (Yhonatan Ale-Yahav, fondateur/CEO de Yishama) au BAR EXTÉRIEUR du festival** — pas sur un port | Correction directe de David ; `dict.yishama:298` |
| Yonathan **n'essaie pas de vendre** ; dit même que ses instruments ne conviennent peut-être pas à un jeu si percussif | `Recit-Yishama…` §1 |
| **Festival HUG, Hongrie, juillet 2022** — petite scène en forêt ; Yonathan et sa compagne **Andrea** viennent dans sa chambre concevoir les 2 handpans ; décision de le faire ambassadeur ; accueil à Budapest | `Recit-Yishama…` §1 ; `Recit-Mag…` §2 |
| **Lettre d'intention signée le 22/11/2022** (Aigues-Vives) : jouer sur scène, produire des vidéos, promouvoir la marque, composer, se produire à un haut niveau | `Analyse-globale-dossier-Yishama.md` l.12 |
| **Accordage 432 Hz demandé par David** (passion pour la cymatique), confirmé par Yonathan **avant** l'accordage — un choix irréversible | Lettre d'intention ; échanges oct. 2022 |
| **Réception des 2 instruments : ~12 mai 2023**, en caisses bois sécurisées, coques comprises, presque le jour de son anniversaire. **Intégralement financés par Yishama** | `Recit-Yishama…` §3 |
| **Valeur : 5 300 € pièce (~10 600 € au total)** — ⚠️ **jamais publié sur le site, et c'est bien** | `Recit-Yishama…` §3 |
| Les deux pans : **18 notes chacun** — « D Kurd 18 » (ding D3) et « E 18 » (ding E3). Ensemble : **36 notes, les 12 demi-tons, 24 accords majeurs et mineurs avec fondamentale au grave** | `data/yishama.ts` (relevé de David recoupé note à note avec l'app) |
| **Aucun accord n'a jamais été signé des deux côtés.** La clause « revendre et rendre l'argent » vient du **document de David lui-même**, pas de Yonathan | `Recit-Yishama…` post-scriptum §1 |
| Yonathan **le remercie explicitement** (vocal 21/12/2023) et **lui suggère lui-même le livret d'accords** — qui deviendra l'app | `Recit-Yishama…` post-scriptum §2 et §3 |
| **Août 2023** : David crée le document pour visualiser ses accords → origine de l'application | `Recit-Yishama…` §4 |
| **Décembre 2023** : première trace écrite et datée des « colored cards » — germe de ChromaKeys | `Analyse-globale-dossier-Yishama.md` l.177 |
| ⚠️ **Newsletter Yishama du 20/12/2025 : « Handpan Studio » est leur revendeur européen officiel** — collision de marque directe | `Recit-Yishama…` point de vigilance |

### 5.4 — Aujourd'hui (2026)
| Fait | Source |
|---|---|
| **Intermittent du spectacle**, installé à **Paris**, loyer conséquent | `Recit-Mag…` §5 |
| **Résonances Productions** — association loi 1901, déclarée à la sous-préfecture de **Pamiers le 28/10/2017**, **RNA W092002501**, APE **9001Z**. Co-portée avec **Iris Chasles** | resonancesproductions.org |
| **Le Nid — 29 rue des Orteaux, 75020 Paris** (fond de cour, porte verte, 3ᵉ étage). Métros Alexandre Dumas, Buzenval, Maraîchers. **« Un lieu pour éclore »** : psychothérapie et travail psycho-corporel (**Iris Chasles**), concerts intimistes de David, yoga, ateliers de rythme calebasse, cours individuels, présentations d'instruments (gratuites, sur inscription) | resonancesproductions.org/le-nid |
| **Le showroom est un USAGE du Nid**, pas l'identité du lieu. Lancement showroom visé **septembre 2026** | resonancesproductions.org ; `2026-08-08 - Partenariats marques….md` |
| **Le showcase n'est pas un canal de vente** — c'est un **laboratoire de test en conditions réelles** : « tu ne fais pas un projet industriel en vendant cinq handpans » | `260808 - Compte rendu de séance.md` §9 |
| **Album « L'Alliance du Phoenix » en deux opus, 9 titres** (dont *Humano*, *Transe lunaire*, *Le tisseur de liens*) | Ancien site Wix |
| Autres projets : **RITUALS** (concert-rituel), **E-Motion** (spectacle immersif, les 5 éléments), duo **Solune** avec Iris | resonancesproductions.org ; carte Disney 07/08/2026 |
| Chaîne YouTube officielle : **@DavidLesageArtiste** (l'ancien @DavidLesageMusique renvoie un 404) | vérifié 13/08/2026 |
| Musique dite **« Électro-Organique »** — acoustique + électronique + voix ; quête du « son primordial » | Ancien site Wix |
| **Diagnostiqué TDAH**, suivi par une psy et un coach. ⚠️ **Donnée personnelle sensible — ne JAMAIS publier** | `Recit-Yishama…` §5 |

### 5.5 — Le vrai conseil d'achat de David (source unique et faisant autorité)
> « Le prix d'un handpan correct est **autour de 1500 €** selon moi. Puis **rapidement tu en achètes un deuxième,
> car tu tournes en rond avec une seule gamme**. C'est là que la question d'un **Neotone** peut se poser —
> ou d'un **handpan pour chanteur·se fait sur mesure**. »
>
> — Correction directe de David, 13/08/2026. ✔️ Désormais appliquée dans `guides.ts` (FR uniquement — **la version
> EN ne la porte pas**, cf. §3 point 12).

### 5.6 — Décisions stratégiques qui invalident du contenu en ligne
| Décision | Date | Conséquence pour le site |
|---|---|---|
| **Fin du modèle « rémunération sur les ventes »** — commissions, affiliation, dépôt-vente remplacés par des **contrats de conception / R&D facturés** | 08/08/2026 | Tout le discours −5 %/−7 %/commission est **périmé** |
| « **Je vais faire progresser vos ventes / je fais de l'affiliation** » déclaré **mauvais argument et contre-productif** | 08/08/2026 | Affecte les pages marques |
| **« David Lesage signature » sort des communications** (jugé « trop égotique ») | 08/08/2026 | À vérifier : rien de tel sur le site aujourd'hui ✅ — mais `dict.yishama:437` badge « ✨ Signature David Lesage » dans l'app |
| **Naming « Play Handpan Studio » abandonné** ; « Handpan Studio » = **nom de travail uniquement** | 08/08/2026 | Le blog l'emploie **158 fois** |
| David se présente désormais comme **concepteur-designer / « pont technique »**, ni producteur ni commercialisateur | 08/08/2026 | Le positionnement du site (vendeur accompagnant) est en décalage |
| Alerte : le négoce expose au **stock, à la TVA, aux douanes et à la qualification d'activité commerciale non déclarée** | 08/08/2026 | Concerne les pages boutique/showroom |

---

## 6. ❓ Questions ouvertes — seul David peut trancher

**Biographie**
1. **The Voice : 2021 ou 2022 ?** (tournage vs diffusion). Le site affiche « février 2022 » partout, y compris en
   données structurées.
2. **Le prix du Conservatoire : quelle année ?** Le site dit **2013** ; cette date n'existe dans aucune source.
3. **Aora Mana : quel intitulé exact veux-tu ?** (cadreur / réalisateur / monteur VR 360° / pilote de drone —
   et le projet mérite-t-il de rester sur la page ?)
4. **Numéricoach / Thierry Vanoffe : la date 2017 et le rôle « formateur » sont-ils exacts ?**
5. **Marciac : quelles années, et quel intitulé** (« collège de jazz de Marciac » ?).
6. **Ngoni** : veux-tu que **Fred Hervaud** soit nommé publiquement, ou juste « mon thérapeute » / rien du tout ?
7. **Now Groove : les « cinquante personnes dans la même salle »** — chiffre réel ou image ?

**Statuts et marques**
8. **Quel titre veux-tu porter pour Neotone ?** « Ambassadeur officiel » n'est pas établi ; les mentions légales
   disent « ambassadeur indépendant ». Il faut **un seul** mot, partout.
9. **Yishama : « ambassadeur » se dit-il publiquement**, au moment où tu réactives le lien avec Yonathan ?
10. **Le discours commission / −5 % / −7 % reste-t-il en ligne** malgré la décision du 08/08 ? (Il finance
    peut-être encore quelque chose — mais il contredit ta nouvelle position.)
11. **Notepan et Yishama nommés comme références visuelles dans le blog** : on garde ?

**Superlatifs**
12. **« Première mondiale » / « seul endroit au monde » / « meilleur handpan électronique au monde » / « meilleur
    prix du marché »** — assumés, atténués, ou retirés ? (Le « seul endroit au monde » est aussi dans le JSON-LD.)
13. **« Le D Kurd fait l'unanimité / la gamme la plus jouée au monde »** — c'est ton avis, ou un fait que tu peux
    sourcer ?

**Blog**
14. **Le matériel personnel du blog est-il réel ?** DT-990 Pro, KZ ZS12 Pro X, X-vive U4, looper Boss RC-505 MKII,
    Bose S1 Pro+ — et joues-tu réellement en intras sur scène ?
15. **Les affirmations sur tes élèves** (« tant de débutants… en quelques séances », « le conseil que je répète le
    plus souvent en cours ») correspondent-elles à ta pratique ?
16. **Les layouts vocaux ↔ tessitures** (Profond = voix aiguës, Brillant = voix graves, Ample = médium) : c'est
    bien ta doctrine ?
17. **Décision de fond sur le blog** : corriger, dépublier, ou laisser en l'état en assumant ?

**Divers**
18. **Instagram et Facebook** : veux-tu vraiment que ton site pointe vers les comptes Neotone ?
19. **Mentions légales** : quel hébergeur inscrire ? (champ obligatoire, encore vide)
20. **Les paroles de chansons sous droits** annoncées comme fournies dans l'app (Hallelujah, Let It Be…) — as-tu
    vérifié le cadre juridique ?

---

## 7. Ce que je recommande comme ordre de travail

1. **Les 11 contradictions du §2.A** — ce sont des erreurs, pas des nuances. Une demi-journée.
2. **Les 4 questions biographiques bloquantes** (The Voice, 2013, Aora Mana, Marciac) — David seul.
3. **Les superlatifs mondiaux**, JSON-LD compris — c'est ce que les moteurs IA vont répéter.
4. **La mention légale vide** — obligation légale.
5. **La grappe d'opinions de `guides.ts`** — même traitement que la ligne 362.
6. **Le blog** — décision de principe d'abord, exécution ensuite. Ne pas commencer par là.

> **Et une règle pour la suite, tirée de l'incident :** aucun texte à la première personne exprimant un **conseil,
> une préférence ou un jugement** ne devrait être publié sans être passé par David. La plausibilité n'est pas une
> source — c'est précisément ce qui a fait survivre six semaines la ligne des 8-9 notes.

---
*Audit produit en lecture seule. Aucun fichier du site n'a été modifié. Les corrections marquées ✔️ proviennent
d'une autre session, en cours au moment de l'audit.*
