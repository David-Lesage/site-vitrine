# REPRENDRE — Site vitrine David Lesage

> Mémoire de contexte du projet **`~/CLAUDE/site-vitrine`** (Astro 6 + Tailwind v4 → Vercel, `lesagedavid.fr`).
> À lire en entier en début de session, **section « ÉTAT ACTUEL » en priorité**.
> Ne jamais confondre avec les handoffs de l'app (`~/CLAUDE/NEOTONE STUDIO/…`).

---

## ⚠️ RÈGLE DE PARTAGE AVEC LA SESSION APP (à lire avant de toucher quoi que ce soit)

Le site et l'app se rejoignent sur la **liste de contacts**. Deux sessions ont travaillé en
parallèle sur cette jonction le 22/07/2026 et ont provoqué une perte de données silencieuse
en production. La frontière n'est PAS « app / site » — c'est **par surface** :

| Surface | Propriétaire |
|---|---|
| ce dépôt (`site-vitrine`, y compris `api/*`) · EF **`site-lead`** · table `site_leads`, vues et policies CRM | **session site vitrine** |
| dépôt de l'app · EF **`app-lead`** · `auth/admin-users-panel.ts` · écran de connexion | **session app** |

Avant d'éditer un fichier de l'autre côté : vérifier `git status` là-bas. Un fichier
**modifié non commité** = une session est dessus → ne pas y toucher, passer par un brief.

**Deux pièges qui ont réellement mordu :**
1. `site-lead` n'avait de source dans **aucun dépôt** → personne ne la mettait à jour, alors
   que c'est elle qui écrit en base. Sa source vit désormais dans
   `supabase/functions/site-lead/` (avec un README). Toujours redéployer depuis ce fichier.
2. **Un commit ne déploie rien.** `git push` ne met pas la prod à jour. Des changements sont
   restés commités mais absents de la production pendant des heures.

---

## ÉTAT ACTUEL — 17/08/2026 (après-midi) — 🧮 Calculateur : la TVA non facturée entre dans « tu économises »

Demande de David : *« quand la personne coche la case TVA intracommunautaire, dans "tu
économises" il faut rajouter l'économie de la TVA… ça fait −27 % »*.

### La formule retenue (une seule règle, les 3 cas en découlent)
**« Tu économises » = prix catalogue du pays − prix réellement payé.** Le prix catalogue
est le prix public **TTC** dans l'UE, **HT** hors UE :

| cas | référence | payé | écart |
|---|---|---|---|
| UE, particulier | (1+v)·P | (1+v)·(P−remise) | remise × (1+v) — **inchangé** |
| UE, **B2B** | (1+v)·P | P−remise | **remise + v·P** — nouveau |
| hors UE (coché ou non) | P | P−remise | remise — **inchangé** |

Contrôle de David (base 100 €, showroom 7 %, FR) : 120 − 93 = **27 €**, soit **7 € de remise
+ 20 € de TVA** contenue dans le prix catalogue. Les deux termes sont exacts **par rapport à
cette référence** (ne pas les confondre avec « 20 % de 93 € = 18,60 € », qui répond à une
autre question). Le **pourcentage** est exprimé sur la **même base que la remise déjà
affichée** — le prix HT : 7 % + 20 % = **27 %**. C'est ce qui rend « 537,30 € (−27 %) »
cohérent avec la ligne « Remise ambassadeur −7 % » juste au-dessus.
⚠️ `0.07 * 100` vaut `7.000000000000001` en flottant → `Math.round` obligatoire (c'était le
bug attrapé au premier test).

### 🚨 L'honnêteté commerciale — décision qui appartient à David
Pour un assujetti la TVA **n'est pas une économie** : il la récupère de toute façon. Le vrai
avantage est de **ne pas l'avancer**. Donc, en B2B UE uniquement :
- le libellé change : **« Tu ne débourses pas »** (pas « Tu économises »),
- une note sous le badge sépare les deux natures : *« Soit 7 % de remise + 20 % de TVA du prix
  de base — l'écart avec le prix catalogue TTC (2 388,00 €). Seule la remise de 139,30 € est
  un gain réel : la TVA, tu ne l'avances pas (autoliquidation), et tu la récupérerais de
  toute façon. »*

**C'est une proposition, pas un arbitrage technique** : David peut vouloir une formule plus
vendeuse (ou plus sobre). Le montant et le pourcentage, eux, ne doivent pas bouger.

### Fichiers touchés (aucun autre composant)
`src/components/Calculator.astro` · `src/i18n/dict.ts` · `src/i18n/en.ts`
(2 clés ajoutées de chaque côté : `calc.savingsB2B`, `calc.savingsB2BNote` ; aucune supprimée).
Aucune dépendance, aucune Edge Function, aucune donnée en base.

### Vérifié (mesures réelles, FR + EN, 375 px et 1280 px)
`astro build` 89 pages. Neotone¹ frêne 1 990 € HT :
showroom FR B2B **537,30 € (−27 %)** · showroom DE 19 % B2B 517,40 € (−26 %) ·
en ligne FR B2B 497,50 € (−25 %) · en ligne FI 25,5 % B2B 606,95 € (−30,5 %) ·
en ligne FR particulier **119,40 €** (inchangé) · Suisse hors UE, cochée **ou** décochée,
**99,50 €** avec le libellé « Tu économises » (inchangé). `scrollWidth == clientWidth`,
badge sur une ligne, note en 4 lignes à 375 px, contraste ≈ 5,3:1 (cream/55 sur ink).
⚠️ Les captures d'écran de l'extension Chrome revenaient blanches (fenêtre Chrome pas au
premier plan) — la vérification est donc **par mesure DOM/layout**, pas à l'œil.

---

## ÉTAT ACTUEL — 17/08/2026 — 🖼️ Favicon : retour au handpan cuivre

Le commit `5c59c3b` avait installé le symbole du logo « moulinet » **sans validation de
David** (il a depuis fourni un autre logo). Remis en état, **sans rien supprimer** :
`favicon.svg` / `favicon.png` = handpan cuivre (copie de `favicon-handpan.*`) ; le moulinet
est conservé sous **`favicon-logo-moulinet.svg` / `.png`** et **`apple-touch-icon-moulinet.png`** ;
`favicon-alt-clair.*` (badge blanc) reste là, inutilisé. `SEO.astro` est revenu aux deux
lignes d'avant `5c59c3b` (plus de `sizes="512x512"`, qui était faux — le handpan fait
128×128 — et `apple-touch-icon` repointe sur `favicon.png`).
👉 Quand David aura tranché le logo : réactiver en renommant, ne pas repartir de zéro.

---

## ÉTAT ACTUEL — 17/08/2026 — 🌓 Lisibilité des voiles de hero (bug Brave iOS)

Commité en local (`61bb937`), **déployé le 17/08 après-midi** avec le calculateur.

### Le bug
Sur iPhone, le titre de l'accueil est parfait dans Chrome et **illisible dans Brave** : le voile
sombre par-dessus la photo **n'apparaît pas**, le texte crème se retrouve sur un mur blanc.

### La cause, établie
Tailwind v4 compile `bg-gradient-to-r from-ink via-ink/85 …` en
`--tw-gradient-position: to right in oklab` + `background-image: linear-gradient(var(--tw-gradient-stops))`,
**sans aucun repli** — contrairement aux opacités (`bg-cream/90` sort bien en `#f4ebd9e6` AVANT sa
variante `color-mix`, sous `@supports`). Vérifié sur les 69 utilitaires d'opacité du bundle : **toutes**
ont un repli hex. Le dégradé est donc le **seul** mécanisme sans filet.
Prouvé en simulant les deux pannes possibles dans le navigateur :
- « in oklab » non supporté dans un dégradé → `background-image` calculé = **`none`** ;
- `@property` non supporté (`var(--tw-gradient-from-position)` sans valeur) → **stops tous transparents**.
Dans les deux cas **le voile disparaît en silence**. C'est exactement le symptôme.
❓ Ce qui **n'est pas** établi : pourquoi Brave iOS précisément (même WebKit que Chrome iOS).
Piste non vérifiable sans le téléphone : **le « Night mode » de Brave** (Réglages → Apparence),
qui expliquerait aussi l'en-tête crème vu « brun translucide ». **À vérifier sur l'iPhone de David.**

### Le correctif
`src/styles/global.css` : 4 classes de voile en **CSS ancien** (rgba littéral, ni `color-mix`, ni
`@property`, ni `oklab`) — `.veil-hero-x`, `.veil-hero-x-soft`, `.veil-hero-bottom`, `.veil-hero-y` —
qui remplacent les `bg-gradient-to-*` dans `HomePage.astro:66`, `LessonsPage.astro:36`,
`ShowroomPage.astro:63`. 🚨 **Ne jamais re-tailwindiser ces règles.**
Aussi : `color-scheme: light` sur `html`, et `color: transparent` de `.text-gradient-brand` mis sous
`@supports (background-clip: text)` (sinon un mot du `<h1>` peut devenir invisible ; repli = cuivre).

### Renforts assumés (mesurés, pas à l'œil)
Le voile horizontal tombait à 0 à droite : sur mobile le texte occupe TOUTE la largeur et finissait
sur le visage éclairé. Contrastes mesurés à 375 px sur les pixels réels des glyphes :

| | avant | après | seuil AA |
|---|---|---|---|
| Accueil — eyebrow doré | 1,02:1 | **4,74:1** | 4,5 |
| Accueil — `<h1>` | 1,31:1 | **8,21:1** | 3 |
| Cours — eyebrow | 1,3:1 | **5,39:1** | 4,5 |
| Showroom — chapô | 3,97:1 | **5,79:1** | 4,5 |

Mobile : fin du dégradé 0 → **0,78**. Showroom : haut du voile 0,30 → **0,60**.
**Le rendu de bureau n'a pas changé.**

### ⚠️ Reste en dessous d'AA
`ShowroomPage` — eyebrow **doré 12 px** sur la vidéo à 375 px : **3,84:1** (p95 5,14) pour 4,5 requis.
Le doré sur vidéo claire plafonne ; conforme = voile quasi opaque (la vidéo ne se verrait plus) ou
eyebrow crème au lieu de doré → **décision de charte, à trancher par David**.

---

## ÉTAT ACTUEL — 17/08/2026 (matin) — 🏛️ Identification légale de Résonances Productions (CG)

Commit `e6df505`, **poussé et déployé en prod** (FR + EN, 200, vérifié à l'écran).

### Ce qui a été ajouté
La page `/conditions-generales` disait déjà que les partenariats d'affiliation sont perçus par
**l'association Résonances Productions**, sans aucune identification. Trois puces dans la
section **« Mon rôle, et qui perçoit l'argent »** (FR `dict.ts` / EN `en.ts`, bloc `terms`
uniquement) :
1. l'existante, complétée en « association loi 1901 **à but non lucratif** » ;
2. **l'identification** : déclarée à la sous-préfecture de **Pamiers**, publiée au **JO des
   associations le 28/10/2017** — **RNA W092002501** · **SIRET 919 514 075 00010** · **APE
   9001Z** (arts du spectacle vivant) · siège **2 impasse des Bleuets, 09600 Aigues-Vives** ·
   correspondance **29 rue des Orteaux, 75020 Paris** · **contact@resonancesproductions.org** ;
3. une puce qui **lève l'ambiguïté** : cette identification dit qui perçoit l'argent, **et rien
   de plus** — l'éditeur du site reste **David Lesage, personne physique**.

**Source unique** : `https://www.resonancesproductions.org/association` (page publique de
l'association), transmise par David. **Rien d'autre n'a été déduit** : pas de n° de TVA, pas de
nom de dirigeant, pas d'autre date. Sourcé en commentaire dans les deux dictionnaires.

### 🚨 Ce qui n'a PAS bougé, et pourquoi
- **`mentions-legales` (bloc `legal`) : pas touché.** C'est elle qui porte l'identité de
  l'éditeur, donc elle dépend de l'arbitrage **en attente avec Yannick** : *« le site doit-il
  être édité au nom de l'association ou de David ? »*. Ajouter une identification ≠ transférer
  une responsabilité.
- **Aucun lien juridique affirmé** entre David et l'association (ni mandat, ni représentation,
  ni gérance, ni « sa structure ») — aucun n'est sourcé.
- **`terms.version` reste `2026-08-17`** (= `TERMS_VERSION` dans `supabase/functions/site-lead/`) :
  la page a été publiée le jour même, et c'est un **complément d'identification**, pas un
  changement d'engagement. Personne n'a accepté un texte contradictoire.
- **Aucune Edge Function redéployée, aucune donnée touchée en base** (que du texte de site).

Vérifié : `astro build` (89 pages), rendu réel FR + EN en **375 px** (et 320 px) et en desktop —
`scrollWidth == clientWidth`, aucun débordement des identifiants longs (SIRET, RNA, courriel) —
puis en **production** sur les deux URLs.

---

## ÉTAT ACTUEL — 17/08/2026 — 🔗 Lien reprenable « je signale mon virement » (Muling)

**⚠️ Vercel : DÉPLOYÉ depuis le 17/08 (matin)** — emporté par le déploiement des CG ci-dessus.
Le lien `/micro-muling?commande=<uuid>` répond 200 en prod, l'URL pour Anne est donc utilisable.
**⚠️ L'Edge Function `muling-order` v4 reste, elle, NON déployée** (point 2 ci-dessous) : les
prochains emails de commande ne porteront le bouton qu'après son redéploiement.

### Le bug (constaté sur une vraie cliente)
L'email de commande Muling disait *« reviens sur l'écran de confirmation »* — or cet écran
n'existait **que dans l'onglet ouvert au moment de la commande** (état du composant
`MulingOrderForm.astro`). Onglet fermé = **plus aucun chemin** pour signaler son virement.
Résultat réel : commande du 14/08 (`d438aa30-…`, `RESONANCE-D438AA30`) toujours
`payment_claimed_at IS NULL` trois jours après — pas un oubli, une impasse.

### La correction
`/micro-muling?commande=<uuid>` (et `/en/micro-muling?commande=<uuid>`) **rouvre l'étape 2**
directement : coordonnées bancaires, PDF, dépôt de preuve. Page statique → fonctionne des
semaines plus tard, navigateur neuf, sans session. L'email de commande porte désormais un
bouton **« J'ai effectué le virement »** (FR/EN) + l'URL en clair sous le bouton.

**Choix : pas de route dédiée.** Le composant `MulingOrderForm.astro` possède déjà
l'affichage bancaire, l'export PDF et le formulaire de preuve ; une page à part aurait
dupliqué tout ça (ou imposé une extraction risquée), et `/micro-muling` existe déjà en
FR/EN/ZH avec le composant monté. Le lien tombe donc sur la page produit, modale ouverte.

### Sécurité — ce qui a été volontairement NON fait
- **Aucune donnée personnelle affichée** avant vérification : ni nom, ni adresse, ni
  téléphone, ni **montant**. Seule la **référence** s'affiche, et elle est **déduite** de
  l'identifiant déjà présent dans l'URL (`RESONANCE-` + 8 premiers caractères en majuscules
  — vérifié conforme sur les 4 commandes réelles en base). **Zéro requête** à l'ouverture.
- **Aucune route nouvelle** exposant une commande à partir du seul identifiant.
- Le montant exact étant inconnu, la ligne « Montant à virer » est **masquée** en retour par
  lien et remplacée par « le montant exact figure dans ton email de confirmation ».
  Mieux vaut rien qu'un chiffre faux recopié dans un virement.
- L'email de la commande est **redemandé** et comparé côté serveur par
  `muling-claim-payment` (inchangée). **Le lien seul ne déclenche rien.** 404 → message
  explicite « cette adresse ne correspond pas à cette commande ».

### Fichiers touchés
`src/components/MulingOrderForm.astro` · `src/i18n/dict.ts` · `src/i18n/en.ts`
(6 clés ajoutées, aucune supprimée) · `supabase/functions/muling-order/index.ts` (v4).
Aucune dépendance npm, aucune colonne en base, aucune modification de
`muling-claim-payment` ni de `api/muling-claim.js`.

### Reste à faire (aucun test n'a rien déclenché en prod)
1. `npx vite build`… → ici c'est **`npx astro build` + `npx vercel --prod --yes`** pour que
   la page accepte le paramètre.
2. **Redéployer l'EF `muling-order`** (`verify_jwt: false`) pour que les prochains emails
   portent le bouton. Déployée en v9 le 17/08 à 03:35 = v3 du fichier ; **v4 en attente**.
3. **URL à envoyer à Anne** (ne marchera qu'après l'étape 1) :
   `https://www.lesagedavid.fr/micro-muling?commande=d438aa30-cc80-493e-b5d3-96c32a740c18`

---

## ÉTAT ACTUEL — 16/08/2026 — 🖼️ Image d'aperçu de lien (Open Graph) adaptative par page

Demande de David : *« est-ce qu'en fonction des pages qui sont partagées il est possible
d'avoir une image d'aperçu différente qui soit cohérente avec la page, quand on partage
un lien dans WhatsApp par exemple ? J'aimerais que ce soit adaptatif. »*

### 1. 🐞 Bug corrigé : les dimensions annoncées étaient FAUSSES

`SEO.astro` écrivait en dur `og:image:width=1200` / `og:image:height=630` — faux pour
**toutes** les images réellement utilisées (`hero-david.jpg` = 2400×1350, les covers
d'articles = 1200×1708, 1600×900, 720×720…). WhatsApp/Facebook/LinkedIn se servent de
ces valeurs pour réserver la place de l'aperçu **avant** de télécharger l'image : une
image carrée annoncée en 1200×630 s'affichait rognée.

Choix retenu : **mesurer le fichier au moment du build**, pas le supprimer ni le figer.
Nouveau `src/lib/imageSize.ts` — lecture des en-têtes JPEG / PNG / WebP / GIF, **zéro
dépendance npm ajoutée** (bun.lock gelé). Si le format n'est pas mesurable (SVG) ou si
le fichier est absent, les deux balises ne sont **pas écrites du tout** (elles sont
optionnelles ; les plateformes mesurent alors elles-mêmes) et un avertissement sort
pendant le build. Ajout au passage de `og:image:secure_url` et `og:image:type`.

### 2. Une image cohérente par page

Toutes les images d'aperçu sont des **JPEG** (WhatsApp est capricieux avec le WebP) et
des recadrages de **vraies photos déjà présentes** dans `public/images/` — rien de
généré, rien de téléchargé. Convention de nommage : `og-<page>.jpg`.

| Page (FR **et** EN, même composant) | Image |
|---|---|
| `/` + `/blog`, `/contact`, `/mentions-legales`, `/showroom` (défaut) | `og-accueil.jpg` (1200×630) |
| `/a-propos`, `/cours` | `og-david.jpg` (1200×630) |
| `/le-neotone` | `og-le-neotone.jpg` (1200×630) |
| `/yishama` | `og-yishama.jpg` (1200×630) — remplace le `.webp` |
| `/boutique` | `og-boutique.jpg` (1200×630) |
| `/handpan-compagnon` | `og-handpan-compagnon.jpg` (1200×662) |
| `/micro-muling` (+ `/zh`) | `og-micro-muling.jpg` (1200×674) |
| `/apprendre-le-handpan` | `og-apprendre-le-handpan.jpg` (1200×630) |
| `/gonilele` | `prod-gonilele-3.jpg` (1000×878, tel quel) |

Le **défaut** de `SEO.astro` est passé de `hero-david.jpg` (2400×1350, 673 Ko) à
`og-accueil.jpg` : toutes les pages sans image dédiée s'améliorent d'un coup.

### ⚠️ Manque de vraies photos (à demander à David)

- **`/showroom`** — aucune photo du Nid (Paris 20ᵉ) dans le dépôt, seulement la carte
  Google (`localisation-showroom-poster.webp`, 720×720). Reste sur le défaut.
- **`/quel-handpan-choisir`** et **`/handpan-electronique-vs-acoustique`** — il faudrait
  une photo montrant plusieurs handpans / un acoustique et un Neotone côte à côte.
- **`/cours`** — `prod-cours-stages.jpg` serait parfait (David assis avec son handpan)
  mais fait **371×371** : inutilisable en aperçu. Une version ≥1200 px serait idéale.
- **`/gonilele`** — la plus belle photo (`prod-gonilele-3.jpg`) est presque carrée et
  ne fait que 1000 px : la recadrer en paysage couperait des harpes. Une photo paysage
  ≥1200 px des Gonilélé serait un vrai gain.
- 🐞 **Article `etre-bien-dans-le-son-neotone`** : sa `cover` est un **SVG**
  (`blog-son-neotone-schema.svg`) — aucun scraper d'aperçu (WhatsApp, Facebook,
  LinkedIn) ne lit le SVG, donc **cet article n'a pas d'aperçu**. À convertir en
  JPEG/PNG un jour (hors périmètre ici : on ne touche pas aux articles).

### Fichiers touchés

`src/lib/imageSize.ts` (nouveau), `src/components/SEO.astro`,
`src/components/pages/{Home,About,Lessons,Neotone,Yishama,Muling,Studio,Shop,Gonilele,Guide}Page.astro`,
`public/images/og-*.jpg` (8 nouveaux fichiers).

---

## ÉTAT ACTUEL — 13/08/2026 (soir) — 👤 Page `/a-propos` réécrite (biographie réelle)

Commits `abec9d6` + `520c7c8`, **déployés et vérifiés en prod** (FR + EN, 200).
Demande de David : *« la page est très pauvre et incomplète et même légèrement inexacte,
fait des recherches sur moi sur le net et complète cette histoire de façon plus réaliste »*.

### 🚨 RÈGLE ABSOLUE POSÉE SUR CETTE PAGE (à ne jamais enfreindre)
`/a-propos` est la biographie d'une **personne réelle**. Un commentaire en tête du bloc
`about` de `dict.ts` liste **la source de chaque fait**. Deux interdits gravés :
1. **Rien d'inventé** : pas de date, de prix, de récompense ni de « collaboration » non sourcés.
   Un lien d'**ambassadeur/affilié** ne se transforme jamais en « partenariat ».
2. **Rien du tiers PRIVÉ du « Book »** (carnet privé) : ni santé, ni psychothérapie, ni
   diagnostic, ni ASPI, ni famille, ni finances personnelles, ni Ennéagramme / Human Design /
   numérologie — **même de façon oblique ou reformulée**. Vérifié après déploiement par un
   scan de la page en prod : 0 occurrence sur 17 termes sensibles testés.

### Ce qui change
Le récit passe de 4 paragraphes à **5 chapitres datés** (les débuts · les détours ·
Now Groove / La Maison du Ngoni · Naxos juin 2022 · mai→août 2023), + **frise de 9 jalons**,
+ section **« aujourd'hui »** (jouer / enseigner / construire / faire le pont), + repères.
Composants réutilisés tels quels (`Section`, `SectionHeading`, `Button`) — rien de nouveau.

### Corrections d'exactitude (l'ancienne page était fausse sur ces points)
- « Conservatoire **national** » → **Conservatoire de Toulouse** (+ bac TMD Saint-Sernin,
  collège de jazz de Marciac). Corrigé aussi dans `personLdJson` (`alumniOf`).
- **« ambassadeur certifié »** (mot non sourcé, personne ne l'a « certifié ») → supprimé.
- **« The Voice · Saison 11 » présenté comme une récompense** → formulé exactement :
  *auditions à l'aveugle, TF1, 2022*. En JSON-LD, retiré de `award` → passé en `performerIn`.
- 🔗 **Lien YouTube mort** : `@DavidLesageMusique` renvoyait **404** (footer + réseaux +
  `sameAs` du JSON-LD, donc tout le site). Vrai compte = **`@DavidLesageArtiste`** (200).
  Corrigé dans `src/data/site.ts`.

### ⚠️ Choix technique à connaître
La page n'utilise plus `common.credentials` (partagée avec l'**accueil**) mais sa propre liste
**`about.proofs`**. Motif : rendre `/a-propos` exacte **sans** toucher l'accueil.
🚨 **`common.credentials` affiche donc TOUJOURS « The Voice · Saison 11 » en preuve sur
l'accueil** — formulation que cette page a justement jugée trompeuse. À trancher avec David.

### ⚠️ Restes à faire / à valider par David (rien de bloquant, mais non tranché)
- **Date de début du bêta-test Neotone : 3 versions incompatibles** — l'ancien Wix dit *2021*,
  `/le-neotone` dit *« depuis 2023 »*, les récits d'entretien datent l'instrument bêta de
  **l'été 2022** (Naxos juin, atelier juillet). La page `/a-propos` **ne donne volontairement
  aucune année de départ**. À trancher, puis aligner `/le-neotone`.
- **La Maison du Ngoni : 2018 ou 2023 ?** `/gonilele` affirme « je collabore avec Joris
  Feuillâtre **depuis 2018** », une autre source situe l'entrée en 2018 mais la collaboration
  en 2023. La page dit « en 2018 j'entre dans le monde du ngoni » (sûr) sans dater la collab.
- **Duo Solune** (avec Iris) : projet artistique public, **volontairement absent** de la page —
  il engage une autre personne. À rajouter seulement si David le demande.
- **Guso Facile** est cité comme outil ; vérifier avec David qu'il veut le rendre public ici.
- Aucune photo nouvelle : la page réutilise `hero-david.jpg`. Pas de visuel de scène
  (Naxos / HUG) dans `public/images/` — si David en fournit, le chapitre Naxos les mérite.

---

## ÉTAT ACTUEL — 13/08/2026 — Boutique : catégorie « Handpan » (Acoustique ET Électronique)

Livré + déployé. Suite directe du « monde du ET » (accueil `#instruments`, showroom `#deux-univers`).

### Ce qui change
- L'onglet boutique **« Handpans numériques » → « Handpan »** (FR) / « Handpan » (EN).
- **Sous-catégories** (un seul niveau, nouveau champ `sub` sur `Product` +
  `categorySubs` dans `src/data/shop.ts`) : `acoustique` **ET** `electronique`.
- **Yishama remonte** de la catégorie « Instruments d'exception » vers **`handpans` /
  `acoustique`**, côte à côte avec les 2 Neotone (`electronique`) — demande de David.
  « Instruments d'exception » garde Gonilélé + tambour chamanique.
- Rendu : sous-menu de pastilles (ancres) + **deux colonnes de largeur identique séparées
  par le rond « ET »**, exactement le langage visuel de l'accueil et du showroom
  (acoustique = cuivre/`circle-dot`, électronique = rouille/`audio-waveform`).
  Chaque colonne se termine par un encart « Tout savoir sur… » collé en bas (`mt-auto`)
  → les deux univers finissent à la **même hauteur** (mesuré : 1778 px = 1778 px)
  malgré 1 produit d'un côté et 2 de l'autre.
- **Asymétrie commerciale préservée** (`shop.handpanNote`) : Neotone (fabriqué par
  Soundventure) = calculateur + code de remise nominatif + garantie 6 ans ; Yishama =
  **ambassadeur et affilié**, commande sur leur site via mon lien. Rien de « signé »,
  aucun partenariat officiel annoncé. Lien pont vers `/handpan-compagnon`.

### Bug de mise en page corrigé au passage
La carte **micro Muling** avait un grand vide qui repoussait le bouton « Découvrir » en bas.
Cause : le ressort `flex-1` dans la carte + l'étirement de la grille alignaient tous les CTA
sur la carte la plus haute de la rangée. Correctif : ressort supprimé, grilles produits en
`items-start` → chaque CTA suit son contenu, cartes alignées **en haut**. Vide résiduel sous
le CTA Muling : 25 px (padding), au lieu de plusieurs centaines.

### Fichiers touchés
`src/data/shop.ts` · `src/components/pages/ShopPage.astro` ·
**`src/components/ShopCard.astro` (nouveau — carte produit extraite, pour ne pas dupliquer
le markup entre la grille classique et les deux colonnes)** · `src/i18n/dict.ts` ·
`src/i18n/en.ts`. Nouvelles clés i18n : `shop.subcategories`, `shop.subNavLabel`,
`shop.handpanNote`, `shop.handpanBridge`. Aucune URL/route/slug modifiée.

Vérifié : `astro build` propre (87 pages), FR + EN, desktop + 375 px (aucun débordement,
le sous-menu ne déborde pas), bons produits sous chaque sous-onglet.

---

## ÉTAT ACTUEL — 11/08/2026 (nuit) — ⚖️ « Le monde du ET » + URL `/handpan-compagnon`

Quatre chantiers livrés et déployés d'un seul bloc (build + commit + `vercel --prod`).

### 1. Équilibre acoustique ↔ électronique (accueil)
Consigne de David : *« pas de compétition, de la complétion, deux univers qui co-existent
(le monde du ET) »*. Neotone était partout, Yishama nulle part sur l'accueil.
- Nouvelle section **`#instruments`** — « Acoustique **et** électronique » : deux cartes
  **strictement symétriques** (Yishama / Neotone), **même séance photo**
  (`yishama-hero-david.webp` / `neotone-hero-david.webp`), même gabarit, même nombre de
  puces, CTA jumeaux → `/yishama` et `/le-neotone`, badge « ET » au centre.
- Bandeau **« trait d'union »** : l'app parle les deux langues (mode acoustique, mode
  électronique, **🎯 Compléter**, mode **Hybride**) = la complétion réellement livrée.
- La 1ʳᵉ carte du trio ne pointe plus vers `/le-neotone` mais vers `#instruments`, avec un
  visuel **split** acoustique | électronique.
- Vidéos de l'accueil : 1 Yishama (`Zp_zaqsRBCg`) + 2 Neotone, et **deux boutons de playlist
  identiques**. 🚨 Ne pas remettre trois vidéos Neotone.
- Meta description accueil rééquilibrée.

### 2. Showroom rééquilibré — sans surcorriger
Consigne : Yishama en avant, **« pas plus que Neotone »**. Nouvelle section `#deux-univers`
(expérience, pas achat) : deux cartes symétriques + **note franche** disant la seule
asymétrie réelle (*seul le Neotone est en stock, les Yishama sont mes instruments
personnels*). Le bloc « Repars avec ton Neotone le jour même » est **inchangé** (fait
commercial). Hero, `program` et `events` nomment désormais les Yishama.

### 3. Page `/yishama` — passage sensible réécrit
« On m'a donné les instruments, pas la méthode » pouvait se lire comme un **reproche aux
fabricants**. Réécrit (clés `bridgeTitle`, `bridgeP1` + nouvelles `bridgeP1b` / `bridgeP1c`) :
la cause est la **nature de l'instrument** — XXIᵉ siècle, en évolution, autant de handpans que
de gammes/dispositions, souvent **modal** (force ET limite), plus le fait que David vient de la
**batterie**. Le vécu est conservé, et il amène logiquement l'app. 🚨 Ne pas revenir à l'ancienne
formulation.

### 4. 🔗 URL : `/handpan-studio` → **`/handpan-compagnon`** (FR + EN)
Décision de David (11/08). Ce qui a bougé : les fichiers `src/pages/handpan-compagnon.astro` +
`src/pages/en/…`, la nav (`data/site.ts`), les CTA, `guides.ts`, `shop.ts` (`url` seulement — l'`id`
`handpan-studio` reste, c'est une clé i18n), `llms.txt`, `README.md`.
**N'ONT PAS bougé** : `play.handpanstudio.app`, les apex, les clés i18n, les slugs de blog
(`/blog/handpan-studio-mode-acoustique`), et **tout `src/content/blog/`**.
Redirections dans **`vercel.json`** : `/handpan-studio` et `/en/handpan-studio` (+ variantes avec
slash) en **301 explicite** (`statusCode: 301` — sans ça Vercel renvoie un 308) ; la redirection
des **apex** (`handpanstudio.app`…) pointe désormais sur `/handpan-compagnon`.
Vérifié **en production** : nouvelles URLs 200 · anciennes 301 sans boucle · apex →
`/handpan-compagnon` · un article de blog qui pointe encore vers l'ancien chemin arrive bien sur
la page · sitemap ne liste que la nouvelle URL.
🚨 Les ~54 articles de blog gardent leurs liens `/handpan-studio` **volontairement** : c'est le 301
qui les fait vivre. Si un jour le blog est repris, refaire cette vérification.

---

## ÉTAT ACTUEL — 11/08/2026 (soir) — 🏷️ L'app s'appelle « Handpan Compagnon » (nom TEMPORAIRE)

**Décision de David** (elle lève le blocage écrit plus bas, section « MARQUE HANDPAN STUDIO ») :
l'app s'affiche désormais **« Handpan Compagnon »**. C'est **un nom d'attente**, pas le nom
définitif — « en attendant de trouver le bon ». Déployé en prod le 11/08.

### Règle de ce renommage : NOM D'AFFICHAGE UNIQUEMENT
Rien d'autre n'a bougé, et rien d'autre ne doit bouger tant que le nom n'est pas arrêté :
- **Aucune URL / route / slug / domaine** : la page reste **`/handpan-studio`** (+ `/en/handpan-studio`),
  l'app reste sur **`play.handpanstudio.app`**, les apex ne changent pas. Motif : le nom est
  provisoire, et churner les URLs casserait deux fois les liens entrants, les 14 articles du
  10/08 et le SEO.
- **Aucun renommage de fichier, de composant, d'image ni de CLÉ i18n.** `handpanStudio.*`,
  `nav.studio`, `dict.studio.*` gardent leurs noms — seules les **valeurs** changent.
- Un remplacement `Handpan Studio` → `Handpan Compagnon` (avec l'espace, sensible à la casse)
  est **sûr** : il ne touche ni `handpan-studio` (slugs) ni `handpanstudio.app` (domaine).

### Ce qui a été renommé (fait, en prod)
`src/i18n/dict.ts` + `src/i18n/en.ts` (FR et EN — pas d'autre locale : `src/pages/zh/` ne
contient que `micro-muling.astro`, sans occurrence), page `/handpan-studio`, accueil, header/nav,
footer, CTA, `src/data/guides.ts` · `site.ts` · `shop.ts` · `yishama.ts`,
`src/lib/ldJson.ts` (JSON-LD : `knowsAbout`, `alternateName`, `SoftwareApplication.name`),
`SEO.astro` (meta keywords), `YishamaPage.astro`, `blog/[slug].astro` (le bouton CTA),
`public/llms.txt`, `public/robots.txt`, `README.md`, `CLAUDE.md`.
Aussi : les 2 commentaires de code qui disaient encore **« Neotone Studio »** (`src/lib/prices.ts`,
`api/prices.js`). ⚠️ **« Neotone » seul ne se renomme JAMAIS** — c'est le handpan électronique
de Soundventure, une vraie marque partenaire.

### 🚫 Volontairement PAS renommé
- **Tout `src/content/blog/`** (40 anciens articles + les 14 du 10/08, FR et EN) — **~200 occurrences
  laissées en « Handpan Studio »**. Décision explicite de David le 11/08 : *« ne change pas tout dans
  le blog, le nom n'est pas encore arrêté, juste sur les pages principales. »* Le corps des articles
  sera repris **quand le nom définitif sera choisi**, pas avant. Conséquence assumée : sur une page
  d'article, la nav et le bouton disent « Handpan Compagnon » et le texte dit « Handpan Studio ».
- `specs/Note-modifications-site.md` (« Nom de marque inchangé pour l'instant : Handpan Studio ») —
  spec datée, archive d'une décision passée.
- Les sections datées de CE fichier plus bas — elles racontent l'historique, y compris le conflit
  de marque. À lire comme telles.

### ⚠️ Header : la barre de nav était DÉJÀ trop large à 1280 px
Mesuré (10 entrées, FR, au point de rupture `xl` = 1280 px, largeur utile 1216 px) :
**avant** le renommage la barre demandait déjà **1231 px** (−15 px, cassé depuis l'ajout de
Yishama le 11/08 au matin) ; **après**, 1268 px (−52 px). Corrigé dans `Header.astro` en resserrant
les liens : **`px-2.5` → `px-2`** et **`gap-1` → `gap-0`** sur l'`ul` → **1192 px** (marge **+24 px**
en FR, **+66 px** en EN). Vérifié dans un iframe à viewport réel 1280 / 1366 / 1440 : une seule ligne,
**30 px de dégagement** entre la dernière entrée et le bloc de droite, `scrollWidth == clientWidth`.
🚨 **Une 11ᵉ entrée de nav, ou un libellé plus long, repassera en négatif.** Refaire la mesure avant
d'en ajouter une — ou passer le point de rupture au-dessus de `xl`.

### À faire quand le nom définitif sera trouvé
1. Reprendre le blog (`src/content/blog/`, FR + EN) — le gros du volume est là.
2. Reprendre `specs/`, et décider si les URLs/domaines suivent enfin (là seulement ça vaut le coût SEO).
3. Aligner **l'app** : son propre nom, et surtout le **filigrane d'export** (« créé avec Handpan
   Studio by David Lesage ») — il est décrit dans les articles de blog, donc les deux doivent bouger
   ensemble pour rester vrais.

---

## ÉTAT ACTUEL — 11/08/2026 — Nouvelle page `/yishama` (récit + 2 handpans acoustiques)

**Demande de David** : une page dédiée à Yishama, sur le modèle de `/le-neotone`, mais dont le
**centre de gravité est le récit personnel avec Yonathan** (« c'est surtout mon histoire avec eux
et avec Yonathan qui compte »), pas la fiche produit.

### Ce qui a été livré
- **`src/pages/yishama.astro`** + **`src/pages/en/yishama.astro`** (wrappers) →
  **`src/components/pages/YishamaPage.astro`** (11 sections).
- **`src/data/yishama.ts`** — données neutres : notes exactes des 2 instruments, ids vidéo,
  playlist, liens, clés des 3 aciers. **Chaque donnée y est sourcée en commentaire.**
- **`src/components/MetalModal.astro`** — équivalent de `WoodModal` pour les 3 aciers Yishama
  (nitruré / inox / Ember). **Sans photo** : pas de cliché fiable par acier → disque dessiné en
  CSS (`.metal-card-disc` / `.metal-disc` dans `global.css`), plutôt qu'illustrer un métal par un autre.
- i18n : bloc `yishama.*` dans `dict.ts` + `en.ts`, plus `data.metal*` et `data.yishamaVideos`.
- Navigation : entrée **`yishama`** ajoutée dans `src/data/site.ts` (`nav`) → 10 entrées.
  ⚠️ Il a fallu ajouter `whitespace-nowrap` + `px-2.5` aux liens du header (`Header.astro`) :
  à 10 entrées, les libellés en deux mots passaient à la ligne au point de rupture `xl`.
- Liens croisés : depuis `/le-neotone` (section « Gage de confiance », où Yonathan est déjà cité)
  et depuis `/handpan-studio` (bloc mode acoustique).

### Sources (tout est vérifié — ne rien ajouter qui ne le soit pas)
`~/CLAUDE/Projects/Marketing/Recit-Yishama-entretien-David.md` (récit de David),
`Analyse-globale-dossier-Yishama.md` (chronologie), `Analyse-2-handpans-David-degres-jouables.md`
(notes + calcul chromatique), `Yishama-fil-complet-WhatsApp.md` (citations de Yonathan),
l'ancien site Wix `batdav.wixsite.com/david-lesage/ambassadeur` (mots publics de David + photos),
et `yishama.com` (aciers, format, gravure laser, devise).

### 🚫 Volontairement HORS de la page (à ne pas rajouter)
Montants (valeur des instruments, devis 15 handpans), clauses du « Yonathan contract » et de la
lettre d'intention côté engagements, facturation / valeur déclarée en douane, santé et vie privée
de David comme de Yonathan, emails restés sans réponse, friction Mag Instruments, et le conflit de
nom avec le revendeur européen « Handpan Studio » cité dans leur newsletter du 20/12/2025.
La page dit **« ambassadeur et affilié »**, jamais « partenariat officiel » : rien n'est signé.

### ⚠️ Restes à faire / à valider par David
- **« 5 octaves »** : non vérifié dans les sources primaires (elles disent « le plus grand ambitus
  possible »). **Non publié.** Si David confirme un chiffre, l'ajouter dans `yishama.whyP3`.
- **Aucune photo à plat du dessus/dessous des 2 instruments** n'existe. La page utilise ce qui
  existe vraiment (portrait studio, selfie avec Yonathan et Andréa, image de la vidéo *Shape of My
  Heart* où les deux pans sont visibles). Si David les photographie, elles serviront aussi à créer
  les layouts dédiés dans l'app.
- Ember Steel : Yishama ne le décrit pas dans son comparatif → la page le dit franchement plutôt
  que d'inventer. À enrichir s'ils publient quelque chose.

---

## ÉTAT ACTUEL — 10/08/2026 — Blog : 7 nouveaux articles + filtre par catégorie

**Contexte** : le blog n'avait plus bougé depuis le 19/07/2026 (dernière vague d'écriture,
`git log src/content/blog/`), alors que l'app a livré ~80 entrées de changelog depuis.
Deux chantiers livrés d'un coup.

### 1. Filtre par sujet sur la liste du blog
- Nouveau champ **`category`** dans le schéma (`src/content.config.ts`) — **obligatoire** :
  un article sans catégorie fait échouer le build (voulu, plutôt qu'une mauvaise case en silence).
- Taxonomie + libellés FR/EN dans **`src/lib/blogCategories.ts`** (8 catégories, slugs neutres) :
  `methode` · `logique` · `acoustique` · `gammes` · `partitions` · `chant` · `neotone` · `communaute`.
- UI : **`src/components/BlogFilter.astro`** (puces `rounded-full` du design system, compteurs,
  `aria-pressed`, lien profond `?c=<slug>`, masquage en `style.display` — PAS la classe `.hidden`,
  qui perdrait contre l'utilitaire `flex` des cartes).
- Les **40 articles existants ont été rétro-catégorisés** un par un (pas deviné depuis le titre).
- La carte de liste affiche désormais le **libellé de catégorie** au lieu du 1er tag ; la page
  d'article affiche une puce catégorie **cliquable** vers `/blog?c=<slug>` (+ ses tags).
- Les `tags` restent libres et ne servent PAS au filtre.

### 2. Sept nouveaux articles (FR + EN = 14 fichiers)
Couvrent ce qui a été livré dans l'app depuis le 20/07, **hors expérimental** :
éditeur de mélodies · Bibliothèque musicale + synchro cloud · barre d'accompagnement + batteur ·
mode Hybride / 2 handpans · les 3 nuances du mineur · Jam Rapide · la partition qui se joue (Pupitre, ×N).
Dates de publication : 27/08 → 20/09 (la cadence du blog date en avance ; le dernier article
existant est daté du 23/08).

**🚫 Volontairement PAS écrits** (vérifié dans `auth/capabilities.ts` + `labo/feature-status.ts`
de l'app) : **Chanter & Jouer** (`cap.singplay` n'est PAS dans les droits Studio — seulement
prof/élève/admin, statut `lab`), Mode Scène (`lab`), Pluie de notes (`lab`), coques sur mesure
(`lab`), Mode Enseignant, Labo, dashboards admin/partenaires, bêta fermée. Règle à garder :
**avant d'écrire sur une fonction, vérifier son statut réel dans le dépôt de l'app.**

### Point à surveiller
La couverture de l'article Hybride réutilise `/images/blog-bottom-coques.webp` (deux coques
côte à côte, capture réelle mais issue de l'affichage « bottom notes »). À remplacer par une
vraie capture du bandeau 🌗 Hybride quand David en aura une.

### ⚠️ node_modules local était cassé
Le nettoyage des fichiers `Icon` (artefacts iCloud, commit `ac760cf`) a supprimé **tous** les
fichiers dont le nom commence par `icon` dans `node_modules` (APFS insensible à la casse) →
le build échouait. Réparé par `rm -rf node_modules && npm install --no-package-lock`, puis
`npm install --no-save --no-package-lock vite@7.3.5 @tailwindcss/vite@4.3.1 tailwindcss@4.3.1`
pour retrouver les versions de `bun.lock` (npm résolvait vite 8 → incompatible avec Tailwind).
`package.json` et `bun.lock` n'ont PAS été touchés. Si ça recasse : refaire ces deux commandes.

---

## ÉTAT ACTUEL — 09/08/2026 — 🐞 CORRIGÉ : emails reçus en source MIME brute

**Symptôme** : la notification « Rendez-vous individuel » arrivait chez David en source MIME
non décodée (`<!doctype html>`, `lang=3d"fr"`, `=e2=80=94`, frontières `--attachment100`
visibles comme du texte).

**Vraie cause** (ce n'était NI le HTML sans partie texte, NI la version de denomailer —
1.6.0 est la dernière publiée) : **denomailer 1.6.0 casse l'en-tête `Subject:`**.
`quotedPrintableEncodeInline()` enveloppe l'objet dans `=?utf-8?Q?…?=` puis lui applique
`quotedPrintableEncode()`, qui insère un **saut de ligne souple `=\r\n` tous les 74
caractères — à l'intérieur de l'en-tête**. Ce CRLF, suivi d'une ligne qui ne commence pas
par une espace, **termine le bloc d'en-têtes** (RFC 5322 §2.2.3) : `MIME-Version`,
`Content-Type: multipart/…`, les frontières et le HTML encodé basculent dans le CORPS.

Déclencheur double : objet **non-ASCII** ET **> 74 caractères** une fois encodé. D'où le
piège qui a fait perdre du temps : le formulaire « rejoindre l'app » marchait très bien
(`Handpan Studio — tu es sur la liste ✨` = 53 car.) alors que c'est **exactement la même
fonction, la même lib et le même appel `.send()`** — seul l'objet, qui embarque le nom du
visiteur, dépassait la limite. `muling-claim-payment` n'envoie que du TEXTE brut et était
touché pareil : ce n'était donc pas un problème de HTML.

**Correctif** : `supabase/functions/_shared/mail.ts` → `mailSubject()`. denomailer ne
réécrit pas un objet déjà 100 % ASCII qui ne commence pas par `=?` : on encode donc
nous-mêmes en mots encodés **RFC 2047 base64** (accents et emoji conservés), avec repli en
ASCII pur en dernier recours. **Tout `subject:` passé à `.send()` doit traverser
`mailSubject()`** — c'est la règle à ne pas oublier en ajoutant un email.

Vérifié par un test réel : 6 des 16 objets réels du dépôt étaient cassés AVANT, 0 après
(harnais qui importe le VRAI encodeur de denomailer). Envoi de bout en bout via
`lesagedavid.fr/api/subscribe` → email reçu et rendu en HTML propre, accents corrects.
Ligne de test supprimée de `site_leads`.

Les **5** Edge Functions qui envoient des emails sont corrigées et redéployées :
`site-lead` (v17), `muling-claim-payment` (v5), `muling-order`, `invite-partner`,
`order-documents`. Toutes sont passées à la disposition imbriquée `<slug>/index.ts` +
`_shared/`. ⚠️ `verify_jwt` à préserver : **false** pour `site-lead`, `muling-order`,
`muling-claim-payment` ; **true** pour `invite-partner`, `order-documents`.

**Reste à faire (non bloquant)** : denomailer encode aussi le CORPS en quoted-printable
avec des hexadécimaux **minuscules** (`=3d`), ce que la RFC 2045 §6.7 interdit. Impact
constaté aujourd'hui : cosmétique (balise `<meta viewport>` légèrement abîmée). Risque réel
en revanche sur une URL contenant `?token=…` (email d'expédition `order-documents`).
Parade propre : passer les corps en `mimeContent` base64 plutôt qu'en `html:` / `content:`.

---

## ÉTAT ACTUEL — 08/08/2026 (voir aussi la section 22/07 plus bas, toujours valable)

### Commande Muling — vrai formulaire déployé
`/micro-muling` a un formulaire de commande en 3 étapes (composant `MulingOrderForm.astro`,
Edge Functions `muling-order` v1 + `muling-claim-payment` v1) :
1. Coordonnées + adresse + quantité → ligne dans `affiliate_sales` (`partner='muling'`,
   devise USD, prix -5% appliqué). 3 emails partent (client, David, **Muling à chaque
   commande**).
2. Écran de paiement : **IBAN de Muling affiché** (dérogation assumée à la règle « pas
   d'IBAN sur la page de vente », validée par David le 08/08 pour ce cas précis) + dépôt
   d'une preuve de virement (image/PDF, 5 Mo max) dans le bucket privé `muling-proofs`.
3. Écran de remerciement — Muling reprend la main pour l'expédition.

Le fabricant n'a plus AUCUN lien cliquable sur `/micro-muling` (David : éviter l'achat en
direct). Prix remisé mis en avant partout (hero, prix, boutique).

**Accès partenaire (RLS backend fait, UI à construire côté app)** : table
`partner_accounts` + vue `partner_orders` + `my_partner_scope()` — un partenaire connecté
ne voit que ses propres lignes, écriture limitée à `fulfillment_status`/`tracking_number`/
`admin_note`. Brief pour l'écran :
`NEOTONE STUDIO/NEOTONE 1er mai 2026/BRIEF-partenaire-muling-dashboard.md`.
⚠️ Compte Muling (`85846599@qq.com`) **pas encore créé** dans Supabase Auth — procédure
dans le brief.

Reliquat sans conséquence : un fichier de test (68 octets) reste dans le bucket
`muling-proofs` — la suppression directe des objets Storage est bloquée par Supabase
(protection anti-perte), la ligne `affiliate_sales` associée, elle, est bien supprimée.

## ÉTAT ACTUEL — 22/07/2026

### Déploiement
```bash
cd /Users/davidlesage/CLAUDE/site-vitrine
npx astro build && npx vercel --prod --yes     # ← le SEUL moyen de mettre en ligne
git push origin HEAD                            # séparé, ne déploie pas
```
- `bun.lock` **gelé** : aucune nouvelle dépendance npm, jamais (ça casse le build Vercel).
- Le build est le contrôle de parité FR/EN (`en: Dict = typeof fr`) : une clé manquante d'un
  côté fait échouer le build. ⚠️ La même faute commise **des deux côtés** passe le build —
  déjà arrivé (titre vide en prod).

### Fait et vérifié en production
- **CRM des demandes de réservation** : les 3 anciens `mailto:` de `/showroom` sont devenus une
  modale de formulaire (`src/components/BookingForm.astro`) → `/api/subscribe` → EF `site-lead`
  → table `site_leads`. Capture motif, téléphone, message, nombre de personnes, date visée.
  La personne reçoit un accusé de réception, David une notification à `contact@lesagedavid.fr`
  (avec `Reply-To` sur l'adresse du visiteur).
- **Calendrier des showcases** : encadré mis en avant + bandeau « prochain showcase » dans le
  hero, dates passées filtrées (build + filet client), état vide qui capture l'email.
- **`neotone@lesagedavid.fr` supprimé** partout → `contact@lesagedavid.fr` (clé `emailNeotone` retirée).
- **EF `site-lead` v7** : accepte le formulaire enrichi (`handpanType`, `personalGoal`,
  `wantsBeta`, `usage_type='maker'`). Allowlists identiques à `app-lead`.
- **Base CRM** : pipeline `status`, horodatage automatique (`replied_at` / `attended_at`),
  relance manuelle (`follow_up_at` + note), policies admin (`is_site_admin()`), et deux vues
  `site_lead_tasks` / `site_lead_event_roster`.
- **Formulaire = déclaration d'intention** (site ET écran de connexion de l'app, identiques) :
  casquettes cumulables (`roles[]`), chacune annonçant sa contrepartie ; sous-questions ciblées
  (objectif perso, nombre d'élèves, fiche fabricant) ; encadré d'engagement d'honnêteté.
  `usage_type` est DÉRIVÉE des casquettes côté serveur, et une sous-réponse dont la casquette
  n'est pas déclarée est **ignorée** — impossible de gonfler son profil depuis le navigateur.
  Deal fabricant gravé : catalogue de l'app, apport d'affaires, pourcentage, prix de mise en relation.
- **App v83/v84/v85 déployée** : colonnes triables + panneau élargi dans « Comptes & accès »,
  formulaire refondu sur l'écran de connexion. EF `app-lead` v4, `site-lead` v9.

### 🔴 À FAIRE — bloqué sur David
- **Photos Muling** : 11 images produit (`HMP2详情01-10`, `HMP2主图01`) à récupérer.
  ⛔ EXCLURE `德国帐户.png` et `香港帐户.jpg` — coordonnées bancaires.
- **Blog phase 2** : ~12 captures d'écran de l'app à faire par David pour enrichir les articles.

### File d'attente
1. **Le filigrane sur les exports gratuits est PROMIS dans le formulaire** — il doit exister
   dans l'app avant l'ouverture au public, sinon la promesse est fausse.
2. **Écran CRM dans le dashboard** — spec complète dans
   `~/CLAUDE/NEOTONE STUDIO/NEOTONE 1er mai 2026/BRIEF-crm-contacts-site.md`
   (4 écrans : boîte de réception, fiche contact, mes tâches, avant un showcase).
3. **Gérer les dates de showcase depuis le dashboard** (table `showcase_events` + lecture live)
   au lieu du code — chantier proposé, pas validé.
4. **Brevo** : centralisation des contacts + newsletter RGPD (en attente que David ait du temps).

### Agenda des showcases — synchro MANUELLE
`src/data/site.ts` → `agendaEvents`. **Source de vérité = l'agenda Google « Le Nid »**
(partagé avec Iris, `iris.chasles@gmail.com`) :
`30716d7f4373d33769612165eb0607e5b33fd533b984df2df61fe9518ab32eae@group.calendar.google.com`
Accessible via les outils Google Calendar (`list_events`).
**Seuls les événements intitulés « Showcase » vont sur le site** — pas les workshops
(yoga, calebasse), concerts, résidences, ni les « Rdv mensuel au Nid ».
⚠️ La copie est manuelle : une date ajoutée/déplacée dans l'agenda n'apparaît qu'après
édition du fichier + redéploiement. Dernière synchro : **01/08/2026** (5 dates jusqu'au 05/12).
Les dates passées disparaissent seules (filtre build + client dans `ShowroomPage.astro`).

### Rendez-vous individuels — tarifs et créneaux
**Les tarifs vivent dans `src/data/site.ts` → `sessionTypes`** (demo 1h30/50 €, cours 1h/50 €,
cours 1h30/70 €). Changer un prix LÀ le change partout : cartes de la page showroom ET options
du formulaire (via `src/lib/sessions.ts`). Ne jamais les recoder ailleurs.
La personne **propose jusqu'à 3 créneaux** (`preferred_slots`), David en confirme un.
Conditions annoncées dans le formulaire ET rappelées dans l'email d'accusé : le rendez-vous
devient ferme au règlement, reportable jusqu'à 24 h avant.
⚠️ **Le règlement n'est PAS automatisé** : aucun lien de paiement n'est envoyé, David encaisse
à la main. À brancher sur Stripe si le volume augmente.
⚠️ Le cas « annulation à moins de 24 h » n'est volontairement PAS écrit (David ne l'a pas tranché).

### ⚠️ MARQUE « HANDPAN STUDIO » — déposée par le studio d'Amsterdam (⬆️ TRANCHÉ le 11/08 : voir tout en haut)
Vérifié dans TMview le 06/08/2026 : **« HANDPAN STUDIO » est une marque de l'Union
européenne ENREGISTRÉE** — EUIPO n° **018962523**, déposée le **12/12/2023** par
**Handpan Studio V.O.F.** (Amsterdam), classes **15, 35, 37, 40, 41, 42**
(instruments de musique, commerce, enseignement, services logiciels).
Conséquence : le renommage envisagé « Play Handpan Studio » CONSERVE l'élément dominant
de leur marque — décision de David en attente (avis d'un conseil en PI recommandé,
ou accord amiable : ils sont ambassadeurs Neotone comme lui). NE PAS lancer le
renommage massif ni le SEO sur « handpan studio » avant cette décision.
Domaines achetés en réserve : playhandpan.app · playhandpanstudio.app · playneotone.app
(gérés sur OVH, manager.eu.ovhcloud.com).

### Dashboard ventes / affiliations — FONDATIONS FAITES (06/08)
Table `affiliate_sales` + `neotone_coupon_pool`, vues `affiliate_revenue` et
`affiliate_tasks`, RLS admin (insert/update/delete permis, contrairement à site_leads).
**Sheet Soundventure importé** : 33 lignes (22 ventes payées = 66 443 € CA Neotone,
3 497 € commissions Résonances), 3 leads, 8 sans suite, 47 codes libres.
Écrans à construire côté app : spec complète dans
`NEOTONE STUDIO/NEOTONE 1er mai 2026/BRIEF-dashboard-ventes.md`.

### (archive) matière réunie avant les fondations
- **Google Sheet Soundventure** (ambassadeur) accessible et lu : contrat du 01/11/2024
  (fin prévue 01/11/2025 — à clarifier, sans doute renouvelé côté Airtable), ~25 prospects
  avec nom, email, tél, Instagram, date, code coupon DLes_*, % remises, date de vente,
  prix TTC/HT, commission (~5 % HT ≈ 162–167 €/instrument), statut de paiement.
  ⚠️ Le Sheet contient l'IBAN de David : EXCLURE les lignes bancaires de tout import.
- **Règles de commission** : Neotone 5 % du HT (facture mensuelle envoyée par eux à
  contact@) · Hisong 25 % via Shopify Collabs (automatique) · Muling : rien en place
  (ils veulent des virements — c'est le dashboard qui doit combler) · Yishama : 0 vente.
- Facturation Neotone : manuelle via un facturier Google Sheet.
- Reste à trancher : dashboard dans l'app (recommandé) — et écrire la spec AVANT de coder.

### Identifiants utiles (rien de secret ici)
- Supabase : projet **`zqcuhnjjrgmybftppkcl`** (Handpan Studio). Clé publiable du site dans `api/subscribe.js`.
- EF `site-lead` : `verify_jwt = false`, protégée par `SITE_LEAD_TOKEN` (Vercel + Supabase).
- App : `https://play.handpanstudio.app` · site : `https://lesagedavid.fr`.

---

## Journal

### 10/08/2026
- Blog : filtre par catégorie (8 sujets, FR/EN, lien profond `?c=`) + 40 articles existants
  rétro-catégorisés + 7 nouveaux articles bilingues sur les fonctions livrées depuis le 19/07.
- Écarté volontairement du blog : tout ce qui est `experimental` / `lab` côté app
  (Chanter & Jouer, Mode Scène, Pluie de notes, coques sur mesure, Enseignant, Labo, admin).
- Réparation de `node_modules` (fichiers `icon*` supprimés par le nettoyage iCloud).

### 06/08/2026 (suite)
- Dashboard ventes : fondations en base + import du Sheet Soundventure (22 ventes,
  66 443 € CA / 3 497 € commissions) + brief des 4 écrans pour la session app.
  Décision : dashboard DANS L'APP. Marque : David en parle avec Yannick.

### 06/08/2026
- Formulaire code Neotone : téléphone sans « facultatif », champ réseaux sociaux (v15).
- Page Muling : section fabricant FR/EN/ZH + avertissements constructeur (brief du 05/08).
- **Découverte : « HANDPAN STUDIO » = marque UE enregistrée (018962523) par le studio
  d'Amsterdam** → renommage suspendu à la décision de David (voir section dédiée).

### 02/08/2026
- Formulaire de RDV individuel : tarif annoncé avant l'envoi (menu déroulant), la personne
  propose jusqu'à 3 créneaux, conditions de règlement et de report affichées + rappelées par email.
  Migration `site_leads_session_and_slots`, `site-lead` v11.
- Tarifs centralisés dans `site.ts` (`sessionTypes`) + `lib/sessions.ts` : les cartes de la page
  showroom et le formulaire lisent la même source.
- **Piège re-rencontré** : `api/subscribe.js` filtre par liste EXPLICITE. Les nouveaux champs
  partaient du formulaire et l'EF les acceptait, mais le relais Vercel les jetait → `null` en base.
  RÈGLE : tout champ ajouté au formulaire doit être ajouté DANS LES TROIS (formulaire, relais, EF),
  et vérifié en base par un test de bout en bout avant de conclure.

### 01/08/2026
- Agenda des showcases synchronisé depuis le calendrier Google « Le Nid » : 5 dates
  (23/08, 19/09, 18/10, 14/11 à 16h–19h ; 05/12 à 15h–18h). Les 17 autres événements du
  calendrier (workshops, concerts, résidences, rdv mensuels) sont volontairement exclus.

### 22/07/2026
- CRM des demandes de réservation construit de bout en bout et déployé ; calendrier des
  showcases rendu visible et purgé des dates passées ; `neotone@` remplacé par `contact@`.
- **Incident** : deux sessions en parallèle sur la jonction site ↔ app. Les champs
  `handpanType` / `personalGoal` / `wantsBeta` et le profil `maker` étaient **jetés
  silencieusement en production** — migration, `api/subscribe.js` et `app-lead` à jour, mais
  `site-lead` (qui écrit en base) restée en v6 et sans source dans aucun dépôt. Réparé en v7,
  source versionnée, règle de partage des surfaces écrite ci-dessus.
- Découvert au passage que le site n'avait pas été redéployé depuis les commits de l'autre
  session : la prod tournait sur un build antérieur. Déployé.
- App v83 : tri par colonnes et panneau élargi dans « Comptes & accès ».
- Formulaire refondu en déclaration d'intention (site + app), migration `site_leads_declared_intent`,
  `site-lead` v9 et `app-lead` v4. **Piège rencontré** : `app-lead` v4 a été déployée avant le
  redéploiement Vercel de l'app → toute inscription depuis `play.*` a été rejetée en
  `400 invalid_roles` pendant l'intervalle. RÈGLE : quand une Edge Function durcit son contrat,
  déployer le CLIENT (Vercel) AVANT, ou dans la minute qui suit.
