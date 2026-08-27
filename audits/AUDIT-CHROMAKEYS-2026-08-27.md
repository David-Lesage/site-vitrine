# AUDIT — « ChromaKeys » sur le site vitrine · 27/08/2026

> **Statut : LISTE DE TRAVAIL, RIEN N'EST CORRIGÉ.**
> David a demandé **un article de blog**, pas une réécriture du site. Aucune des phrases
> listées ici n'a été touchée. Elles attendent son arbitrage.
>
> Livré en même temps que cet audit : `src/content/blog/les-deux-visions-chromakeys.md`
> et son jumeau `-en.md` — **le seul ajout** au site, avec ce fichier.

---

## 0. Le point de départ (mots de David, 27/08/2026)

> « Le concept de ChromaKeys a **deux fonctions**. Soit on pense en terme du **mode chakras**
> (un DO est toujours rouge), soit on pense en terme de **degré** — donc si la tonalité est E,
> le premier degré de E est rouge. Et ça, il faut bien l'expliquer comme **deux vérités qui
> sont vraies selon comment on va penser les choses**. C'est vrai que le bouton "ChromaKeys"
> dans l'app désigne l'arc-en-ciel de couleurs où DO est toujours rouge. Mais malgré tout le
> ChromaKeys a **deux visions** : celle de la note absolue ou celle du rôle d'une note dans
> une tonalité, et **il faut le rendre explicite sinon ça peut porter à confusion**. »

⚠️ **Cadrage à ne pas perdre** : il **manque une explication**, il n'y a pas **d'erreur à
corriger**. Ne jamais présenter l'une des deux visions comme la bonne et l'autre comme un
abus de langage. C'est aussi la ligne de l'article.

---

## 1. Le décompte, refait le 27/08/2026

Périmètre : `src/` + `public/`, extensions `.ts .astro .md .css .txt .json`
(hors `node_modules/`, `dist/`, `archives/`, `specs/`).

```
grep -roi "chromakeys" src public --include=…   →  67 occurrences
```

> 📌 Un audit antérieur annonçait **75**. L'écart vient du périmètre (les fichiers hors
> `src/` + `public/` — specs, archives, handoffs — ne sont pas du texte public). **67 est le
> chiffre du site lui-même.** Les répartitions par sens ci-dessous portent sur le texte
> réellement lu par un visiteur.

| Fichier | occ. |
|---|---|
| `src/i18n/dict.ts` | 7 |
| `src/i18n/en.ts` | 6 |
| `src/content/blog/handpan-par-les-couleurs.md` (+ `-en`) | 5 + 5 |
| `public/llms.txt` | 5 |
| `src/data/guides.ts` | 4 |
| `src/styles/global.css` | 3 |
| `src/lib/ldJson.ts` | 3 |
| `src/components/pages/StudioPage.astro` | 3 |
| `src/data/site.ts` | 2 |
| `src/content/blog/creer-sa-gamme-de-handpan.md` (+ `-en`) | 2 + 2 |
| 18 autres fichiers (blog, pages, `SEO.astro`) | 1 chacun |

### Les trois sens qui cohabitent

| sens | ce que la phrase dit | verdict |
|---|---|---|
| **NOTE** | « chaque **note** reçoit une couleur fixe » (un do est toujours rouge) | c'est le sens **majoritaire**, et c'est celui de l'app |
| **PARAPLUIE** | « la méthode ChromaKeys », « les couleurs ChromaKeys » — sans dire quelle logique | neutre, jamais faux |
| **DEGRÉ** | « les 7 **degrés** reçoivent une couleur… c'est le système ChromaKeys » | **4 phrases seulement**, dupliquées FR/EN |

✅ **Aucun slug, aucun permalink, aucune URL ne contient « chroma ».**
✅ **Aucun signal SEO n'est en sens DEGRÉ** — vérifié un par un :
`src/lib/ldJson.ts:89` et `:94`, `public/llms.txt:6` et `:27` sont **tous en sens NOTE**
(« chaque note a une couleur »). `SEO.astro:25`, `site.ts` (mot-clé), `blog/index.astro:19`
et `en/blog/index.astro:19` sont en sens **parapluie**.
👉 **Conséquence pratique : rien ne presse, et rien n'est à casser.** Corriger les 4 phrases
DEGRÉ ne déplacerait aucun signal de référencement.

---

## 2. LES 4 PHRASES EN SENS « DEGRÉ » — à arbitrer, **non corrigées**

> Rappel : la question n'est pas « qui a raison ». Ces phrases sont vraies **dans la vision
> degré**. Le problème est qu'elles emploient le mot *ChromaKeys*, qui, dans l'app, désigne
> l'autre vision.

### ① `src/i18n/dict.ts:1734` (`studio.chromaIntro`) + `src/i18n/en.ts:1472`
> « […] **Les 7 degrés** reçoivent chacun une couleur fixe, du rouge au violet : c'est le
> système **ChromaKeys**. »

📍 Affiché sur **`/handpan-app`**, en tête de la section « Et si on rendait l'invisible
visible ? ». Juste en dessous, `StudioPage.astro:231` dessine **7 pastilles I → VII** avec les
émotions : le visuel confirme « degrés », le mot dit « ChromaKeys ».

### ② `src/data/guides.ts:127` + `:519` (EN)
> « […] D'abord la **couleur** : **chaque degré** de la gamme reçoit une couleur (les
> ChromaKeys) […] »

📍 Affiché sur **`/apprendre-le-handpan`**.

### ③ `src/content/blog/handpan-emotions-degres.md:19` + `-en.md:19`
> « Le Mode Logique rend ces rôles **visibles** en leur donnant une couleur stable, **dans la
> logique des ChromaKeys** […] Le degré I garde toujours sa teinte, quel que soit ta gamme. »

📍 C'est **la phrase la moins fausse des quatre** : elle parle bien du Mode Logique, et le
Mode Logique **est** la vision degré. Seul « dans la logique des ChromaKeys » prête à
confusion. ⚠️ Elle contient aussi une faute d'accord (« quel que soit **ta** gamme ») —
signalée, non corrigée.

### ④ `src/content/blog/creer-sa-gamme-de-handpan.md:22` + `-en.md:22`
> « **Les degrés** sont les notes construites autour d'elle ; **en couleurs (ChromaKeys)**,
> chacun garde une teinte stable. »

---

## 3. LES 3 CONTRADICTIONS VISIBLES PAR UN LECTEUR — **non corrigées**

Ce ne sont pas des nuances de vocabulaire : ce sont deux affirmations **opposées**, à
quelques lignes ou quelques écrans l'une de l'autre, sur **la même page**.

### ① `/handpan-app` — la page se contredit elle-même
| | dit |
|---|---|
| `dict.ts:1734` (haut de page) | « **Les 7 degrés** reçoivent chacun une couleur fixe […] c'est le système ChromaKeys » |
| `dict.ts:1879` (FAQ, **même page**) | « Qu'est-ce que les ChromaKeys ? — […] **chaque note** reçoit une couleur fixe » |

Idem EN (`en.ts:1472` / FAQ EN).
👉 **C'est la contradiction la plus coûteuse** : la FAQ est la réponse « officielle », et elle
contredit le corps de la page. C'est aussi elle que Google est le plus susceptible de citer.

### ② `/apprendre-le-handpan` — **5 lignes d'écart**
| | dit |
|---|---|
| `guides.ts:127` | « **chaque degré** de la gamme reçoit une couleur (les ChromaKeys) » |
| `guides.ts:132` (liste juste en dessous) | « Couleurs (ChromaKeys) : **chaque note** a sa couleur » |

Idem EN (`guides.ts:519` / `:524`).

### ③ `blog/handpan-par-les-couleurs.md` — le paragraphe est sous le mauvais titre
| ligne | contenu |
|---|---|
| `:23` | `### Chaque note, une couleur` |
| `:24` | « **Les sept degrés** d'une gamme reçoivent sept couleurs stables. […] le **premier degré** garde toujours sa teinte, le **cinquième** la sienne » |

Le titre annonce la vision note, le paragraphe explique la vision degré. Idem `-en.md`.
👉 C'est l'article **le plus proche** du nouveau : le nouvel article le complète et pointe
vers lui, mais **ne l'a pas corrigé**.

---

## 4. LE TÉMOIN DE STYLE — la seule phrase du site qui distingue déjà correctement

`src/content/blog/editeur-de-melodies-handpan.md:32` :

> « Et **deux logiques de couleur cohabitent** : **ChromaKeys** (la couleur suit la note) ou
> **degré** (la couleur suit le rôle harmonique, comme dans le Mode Logique). La même mélodie
> racontée de deux façons. »

Version EN identique (`-en.md:32`).
👉 **Modèle à suivre pour toute correction** : nommer les deux, ne trancher ni l'une ni
l'autre, en une phrase.

---

## 5. LES COULEURS — CE QUI A ÉTÉ VÉRIFIÉ, ET CE QUI N'A PAS TENU

> Tout ce qui suit a été lu dans les fichiers ou **dans l'app en fonctionnement**
> (`play.handpanstudio.app`, 27/08/2026, session de David, en onglet d'arrière-plan).
> Aucune couleur n'est affirmée de mémoire.

### A. Les variables du site sont bien une palette **de degrés** — seul le NOM est faux

`src/styles/global.css:19-25`, commentées « **ChromaKeys — les 7 degrés** » :

| var | valeur | teinte |
|---|---|---|
| `--color-chroma-1` | `#e2403a` | rouge |
| `--color-chroma-2` | `#e87a2c` | orange |
| `--color-chroma-3` | `#e8c33a` | jaune |
| `--color-chroma-4` | `#4caf6d` | vert |
| `--color-chroma-5` | `#3aa0d8` | bleu clair (cyan) |
| `--color-chroma-6` | `#4156b8` | indigo |
| `--color-chroma-7` | `#8e4fc4` | violet |

Consommées par `src/data/site.ts:238` (`chromaKeys[]`, indexé **`degree: 'I' … 'VII'`**) et
rendues **deux fois** sur `/handpan-app` (`StudioPage.astro:231` et `:257`).

Palette **degrés de l'app** (`constants.ts:210`, `EMOTIONAL_DEGREE_COLORS`) :
`#EF4444` · `#F97316` · `#EAB308` · `#22C55E` · `#38BDF8` · `#5050FF` · `#EB00FF`
→ **même séquence de teintes, slot pour slot** : rouge · orange · jaune · vert · bleu clair ·
indigo · magenta-violet.

✅ **Verdict : le contenu des variables est juste. C'est l'étiquette « ChromaKeys » qui est
de trop.** Un simple changement de commentaire (`--color-chroma-*` = « les 7 degrés »,
sans « ChromaKeys ») réglerait le point sans toucher une seule couleur.
⚠️ **Non fait** : fichier partagé, hors périmètre de la demande.

### B. ❌ CE QUI N'A PAS TENU — « sol est passé au bleu, la au violet »

Le handoff (`REPRENDRE-SITE-VITRINE.md`, passe du 27/08) affirme que l'app a **corrigé
depuis 2023** : sol cyan → bleu `#2563EB`, la bleu → violet `#7C3AED`.
**C'est vrai d'UNE table de l'app, et faux de ce que l'écran affiche.**

| | do | ré | mi | fa | fa♯ | **sol** | sol♯ | **la** | la♯ | **si** |
|---|---|---|---|---|---|---|---|---|---|---|
| **App EN LIGNE**, variables CSS `--chakra-*` (lues dans le navigateur le 27/08) | `#DC2626` | `#EA580C` | `#EAB308` | `#16A34A` | `#22C55E` | **`#0EA5E9` cyan** | `#38BDF8` | **`#0806FF` bleu** | `#5050FF` | **`#EB00FF` magenta** |
| **Table TS** `melody/melody-model.ts:315` (`CHROMAKEYS`) | `#DC2626` | `#EA580C` | `#EAB308` | `#16A34A` | `#22C55E` | **`#2563EB` bleu** | `#3B82F6` | **`#7C3AED` violet** | `#8B5CF6` | **`#D946EF` fuchsia** |

👉 **Deux tables de couleurs de notes coexistent dans l'app** et divergent sur
**sol, sol♯, la, la♯, si**. Les pastilles du handpan lisent les variables CSS ; l'éditeur de
mélodies lit la table TS.
🚫 **Ne pas écrire publiquement « sol est passé au bleu, la au violet »** : sur l'écran que
voit l'utilisateur, **sol est cyan et la est bleu**.
📮 **À signaler à la session Handpan Studio** (dépôt de l'app, lecture seule ici) — ce n'est
pas un chantier du site.

### C. ✅ CE QUI TIENT — et qui explique mécaniquement toute la confusion

Le document manuscrit d'août 2023 (page 4, déjà publiée sur `/yishama`, décrite par David
lui-même dans `dict.ts` → `yishama.bridgeDocAlt`) colorie **les noms de notes** ainsi :

> do rouge · ré orange · mi jaune · fa vert · **sol cyan** · **la bleu** · si magenta

C'est, **slot pour slot**, la palette `--chakra-*` que l'app affiche encore aujourd'hui —
et c'est aussi, **slot pour slot**, la séquence de la palette **des degrés** (app comme site,
au doublon **cyan-puis-bleu** compris).

👉 **La vraie anecdote n'est donc pas « le site a copié la palette des notes ».** C'est :
**à l'origine, un seul arc-en-ciel servait à tout.** En 2023 il nommait les **notes** ;
aujourd'hui la même séquence nomme les **degrés**, pendant que la palette des notes a gardé
son cyan sur l'écran et dérivé vers le bleu/violet dans une seconde table.
Écrire « les 7 degrés… c'est le système ChromaKeys » n'est pas une bourde : **c'est un
vestige exact de l'époque où il n'y avait qu'une seule roue.** C'est ce que dit l'article.

### D. Ce que l'app dit déjà, en toutes lettres

Vérifié dans `NEOTONE STUDIO/NEOTONE 1er mai 2026/` (**lecture seule, rien touché**) :

- `index.html:469` — le bouton s'appelle littéralement **« Chakras »**
  (`data-i18n="visual.color.chakras"`, `title="Couleurs des chakras"`), à côté de
  `btn-color-degree` (`title="Couleur par degré de la gamme"`). **Le « mode chakras » de
  David est le mot de l'app**, pas une approximation.
- `state.ts` / `renderer.ts` — l'état interne s'appelle `colorMode: 'chakra' | 'degree' | 'none'`.
- `translations.ts:3571-3588` — `singplay.ckmode.note` : « Par note — **Un Do est toujours
  rouge, où qu'il soit** […] (La couleur des ChromaKeys et des chakras.) »
- `translations.ts:3552-3569` — `singplay.ckmode.role` : « Par rôle — **Le 1ᵉʳ degré est
  toujours rouge, dans toutes les tonalités : en Ré, c'est le Ré qui devient rouge** […]
  (La couleur du Mode Logique.) »
- `translations.ts:31950` — `ac.duo_paradox.titre_4` : **« Deux lunettes, une seule roue de
  couleurs »**, et `…savoir_laquelle_porter_est_l_apprentissage` : **« Savoir laquelle
  porter, c'est ça, l'apprentissage. »**

👉 **L'app a déjà l'explication. C'est le SITE qui ne l'a pas.** C'est exactement le trou que
l'article vient boucher — et c'est pourquoi l'article reprend l'image des deux lunettes
**telle quelle**, sans en inventer une concurrente.

---

## 6. SI DAVID VEUT CORRIGER — ordre proposé, du plus rentable au plus cosmétique

Aucun de ces points n'est appliqué. Ils sont classés par **ce qu'un lecteur perd** aujourd'hui.

| # | Où | Ce qu'on ferait | Pourquoi d'abord |
|---|---|---|---|
| 1 | `dict.ts:1734` + `en.ts:1472` | Nommer les deux logiques dans la phrase, sur le modèle du § 4 | La FAQ de la **même page** dit déjà l'inverse ; c'est la contradiction la plus lisible |
| 2 | `guides.ts:127` + `:519` | Idem | Contredit sa propre liste **5 lignes plus bas** |
| 3 | `handpan-par-les-couleurs.md:23-24` (+ `-en`) | Soit le titre, soit le paragraphe — pas les deux | Article vitrine de la méthode ; c'est le premier que lit un débutant |
| 4 | `creer-sa-gamme-de-handpan.md:22` (+ `-en`) | Idem | Isolé, moins exposé |
| 5 | `handpan-emotions-degres.md:19` (+ `-en`) | Retirer « dans la logique des ChromaKeys », garder « Mode Logique ». **+ faute d'accord « quel que soit ta gamme »** | Le moins faux des quatre |
| 6 | `global.css:19` + `site.ts:237` | Commentaire seul : « les 7 degrés », sans « ChromaKeys » | Invisible pour le lecteur — hygiène de code |

⚠️ **Deux garde-fous pour la personne qui corrigera :**
1. **Ne jamais transformer une phrase « degré » en phrase « note ».** Les deux sont vraies.
   La correction consiste à **dire laquelle on emploie**, pas à choisir un camp.
2. **Vérifier `/handpan-app` en rendu réel après le point 1** : la phrase et les 7 pastilles
   I → VII se lisent ensemble. Si la phrase parle de notes et que les pastilles montrent des
   degrés, on aura déplacé la contradiction au lieu de la résoudre.

---

## 7. Ce qui a été livré avec cet audit

| Fichier | Statut |
|---|---|
| `src/content/blog/les-deux-visions-chromakeys.md` | **ajouté** |
| `src/content/blog/les-deux-visions-chromakeys-en.md` | **ajouté** |
| `audits/AUDIT-CHROMAKEYS-2026-08-27.md` | **ajouté** (ce fichier) |
| tout le reste | **inchangé** — aucun article existant, aucune clé i18n, aucune variable CSS, aucun slug |

### 📸 Captures : ce qui a été tenté, et ce qui manque

- **Navigateur intégré** → `play.handpanstudio.app` renvoie l'écran de connexion. **Arrêt
  immédiat**, aucun identifiant saisi.
- **Chrome de David**, onglet d'**arrière-plan** (jamais mis au premier plan) → session
  ouverte, l'app a pu être **observée** : c'est de là que viennent les vérifications du § 5.
  Les réglages touchés (mode couleur, onglet, bascule « Par rôle / Par note », tracé de
  l'Accord 1) ont **tous été remis dans leur état d'origine** avant fermeture de l'onglet.
  **Rien n'a été créé, enregistré ni supprimé.**
- ❌ **Mais aucune image n'a pu être écrite sur le disque** : l'outil de capture du navigateur
  rend l'image dans la conversation, il ne produit pas de fichier. Sans fichier, pas de
  `.webp` dans `public/images/`.
- ⛔ **Aucune illustration n'a été fabriquée.** Pas de schéma imitant l'app, pas de
  reconstitution. L'article part avec, en image d'en-tête, **une vraie capture déjà au
  dépôt** (`/images/app-hybride-deux-gammes.webp`) et **aucune image inline**.

👉 **La liste de prises de vue à faire par David est dans le rapport de session**, pas ici :
elle est périssable (les libellés de l'app bougent), alors que ce fichier doit rester lisible
dans six mois.
