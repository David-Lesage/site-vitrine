# Rapport — alerte Search Console « Introuvable (404) » (hreflang vers des pages inexistantes)

**Date :** 07/09/2026 · **Périmètre :** `SEO.astro`, `LanguageSwitcher.astro`, `src/i18n/utils.ts`, `vercel.json`
**État :** corrigé, buildé, vérifié en local. **Non déployé** (déploiement + validation GSC à faire par David).

---

## (a) Diagnostic — avant correction

Build de référence : **116 pages** dans `dist/`. Analyse automatisée de toutes les balises
`<link rel="alternate" hreflang>` émises, croisée avec les pages réellement construites.

**35 URLs distinctes annoncées à Google n'existaient pas** (soit 67 balises fautives, chaque URL
étant déclarée par la page FR *et* par la page EN quand celle-ci existe) :

| Type | Nb d'URLs 404 | Détail |
|---|---|---|
| `hreflang="es"` vers `/es/blog/<slug>/` | **32** | Aucun article `lang: "es"` n'existe, et il n'y a délibérément **pas** de route `src/pages/es/blog/[slug].astro` (seul `index.astro` existe) |
| `hreflang="en"` vers `/en/blog/<slug>/` | **3** | Articles FR sans traduction EN : `completer-son-handpan-acoustique-avec-un-neotone`, `mes-handpans-une-seule-porte`, `reveler-les-accords-de-ton-handpan` |
| Pages statiques (`/a-propos`, `/le-neotone`, `/pieds-atlas`…) | **0** | Toutes existent bien en FR/EN/ES, y compris le slug traduit `/en/handpan-stands` |
| Pages EN/ES émettant des hreflang fautifs | inclus ci-dessus | les pages EN dupliquaient les 32 alternates ES |

**Le sitemap n'a jamais été en cause** : `dist/sitemap-0.xml` liste 116 URLs, toutes présentes dans
`dist`, et **aucune** `/es/blog/<slug>`. Google découvrait ces URLs uniquement en suivant les
balises hreflang du `<head>`. C'est exactement le mécanisme décrit dans le contexte.

Cause racine, `src/components/SEO.astro` (anciennes l. 37-39) :
```js
const alternates = activeLangs.map((l) => ({ lang: l, href: localizePath(basePath, l) }))
```
→ concaténation aveugle du préfixe de langue, sans jamais vérifier que la cible est construite.
Même défaut dans `LanguageSwitcher.astro` (`hrefFor`), qui envoyait donc l'utilisateur sur une 404
en cliquant « Español » depuis un article.

---

## (b) Ce qui a été corrigé

### 1. `src/i18n/utils.ts` — la source de vérité (nouveau)

Trois fonctions, alimentées par **les mêmes sources que le build** (donc jamais désynchronisées) :

- `pageExistsForLang(cheminNeutre, lang)` :
  - **articles de blog** → présence d'une entrée de collection `blog` avec `lang` + `permalink`
    correspondants et `draft: false` — exactement le filtre des `getStaticPaths()` des routes ;
  - **pages statiques** → présence du fichier dans `src/pages/<lang>/…`, listé par
    `import.meta.glob('/src/pages/**/*.astro')` (résolu par Vite au build, **aucune dépendance
    npm ajoutée**, `bun.lock` intact). Les routes dynamiques `[slug]` sont exclues du set.
    Les slugs traduits sont gérés puisqu'on passe par `localizePath` (`/pieds-atlas` → `/en/handpan-stands`).
- `availableLangs(cheminNeutre)` → la liste des langues réellement disponibles.
- `switcherHref(cheminNeutre, lang)` → cible du sélecteur de langue (voir plus bas).

La collection blog n'est lue **qu'une fois** pour tout le build (promesse mémoïsée) : le temps de
build est inchangé (≈12 s avant comme après).

### 2. `src/components/SEO.astro`

`activeLangs.map(...)` remplacé par `await availableLangs(basePath)`. Le `x-default` reste le
français, mais n'est plus émis si (cas théorique) la page FR n'existait pas — plus jamais d'URL
inventée.

Résultat concret :
- article traduit (`la-carte-des-joueurs`) → `fr` + `en` + `x-default` ;
- article non traduit (`mes-handpans-une-seule-porte`) → `fr` + `x-default` seulement.

### 3. `src/components/LanguageSwitcher.astro` — **choix UX**

Quand la page courante n'existe pas dans la langue demandée, le lien ne disparaît pas et ne pointe
pas vers une 404 : `switcherHref` **remonte à la section parente la plus proche qui existe dans
cette langue**, et retombe sur l'accueil de la langue en dernier recours.

Concrètement, depuis un article FR : « Español » → **`/es/blog`** (et « English » → `/en/blog`),
c'est-à-dire l'**index du blog**, pas la racine `/es/`.

**Pourquoi l'index plutôt que la racine** : c'est le comportement le plus cohérent avec l'UX déjà
en place. `src/pages/es/blog/index.astro` a été écrit précisément pour ce cas — il liste les
articles français avec un badge « En français » explicite, dans un habillage espagnol. Un lecteur
hispanophone qui clique « Español » depuis un article atterrit donc dans le contexte le plus proche
de ce qu'il lisait (la liste des articles), au lieu d'être renvoyé à l'accueil et de devoir
retrouver son chemin. La règle est générique : elle s'appliquera d'elle-même à toute future section
partiellement traduite.

### 4. `vercel.json` — filet de sécurité (301 explicites)

Pour les URLs **déjà indexées ou partagées** avant le correctif, on ne laisse pas un 404 sec :

- `/es/blog/:slug` et `/es/blog/:slug/` → **301** vers `/blog/:slug/` (l'article français) ;
- les **3** slugs EN manquants, listés **nommément** (`/en/blog/<slug>` et variante avec slash)
  → **301** vers `/blog/<slug>/`.

`statusCode: 301` explicite, comme les redirections existantes (sans lui Vercel renvoie un 308).

> ⚠️ **Maintenance — à savoir avant d'ajouter des articles espagnols.** `vercel.json` n'accepte pas
> de commentaires, donc la note est ici (et dans `REPRENDRE-SITE-VITRINE.md`) :
> **la règle `/es/blog/:slug` est générique et sera évaluée AVANT le système de fichiers.** Le jour
> où des articles `lang: "es"` et une route `src/pages/es/blog/[slug].astro` existeront, cette règle
> **masquera** les vrais articles espagnols. Il faudra alors **la supprimer** (ou la remplacer par
> la liste nominative des slugs encore non traduits, sur le modèle des 3 entrées EN).
> Les entrées EN, elles, sont nominatives : elles ne peuvent pas masquer un article existant, mais
> il faudra retirer la ligne correspondante le jour où l'un des 3 articles sera traduit.
>
> Vérifié : la règle **ne capture pas** l'index `/es/blog/` — le motif `:slug` de Vercel exige au
> moins un caractère, et `/es/blog/index.html` est bien construit (il doit rester en 200).

### 5. `vercel.json` — chaîne de redirections aplatie

**Il n'y avait PAS de chaîne `/handpan-studio` → `/handpan-compagnon` → `/handpan-app`** : les deux
anciennes adresses pointaient déjà **directement** vers `/handpan-app`, en un seul saut. Bonne nouvelle.

En revanche un **second saut implicite** existait : toutes les destinations étaient écrites **sans
slash final** (`/handpan-app`) alors que les pages canoniques du site en ont un (`/handpan-app/`,
cf. le sitemap). Vercel renvoyait donc un 301 vers `/handpan-app`, puis un 308 vers `/handpan-app/`
— **une chaîne de 2 sauts sur les 11 redirections existantes**, ce qui alimente très probablement
le motif GSC « Page avec redirection » (33 pages). Toutes les destinations `statusCode: 301` ont été
passées en slash final : **un seul saut désormais**.

---

## (c) Les 5 autres motifs GSC — ce qui reste

| Motif | Pages | Verdict |
|---|---|---|
| **Autre page avec balise canonique correcte** | 61 | **Normal, aucune action.** Ce sont les variantes EN/ES et les URLs sans slash : elles déclarent bien leur canonique, Google la respecte. C'est le signe que le balisage fonctionne. |
| **Page en double : Google n'a pas choisi la même URL canonique** | 46 | **À surveiller.** Cause la plus probable : les pages `/es/…` sont un habillage espagnol sur du contenu très proche du FR (et `/es/blog` liste des articles français) — Google les traite comme des doublons du FR et préfère la version FR. Le correctif hreflang aide (le maillage FR↔EN↔ES est désormais honnête) ; le vrai remède est du contenu réellement traduit. Ne pas forcer : une canonique inter-langues serait contre-productive. |
| **Détectée, actuellement non indexée** | 35 | **Normal.** File d'attente d'exploration de Google sur un site récent. Se résorbe seul ; les 35 URLs 404 supprimées libèrent du budget de crawl. |
| **Page avec redirection** | 33 | **Partiellement corrigé** (voir § 5 : chaîne 301→308 aplatie). Le reste est attendu : redirections d'anciens slugs, apex→www, `/handpan-studio`→`/handpan-app`. Aucune action supplémentaire. |
| **Explorée, actuellement non indexée** | 19 | **Normal / qualité.** Google a vu la page mais ne la juge pas assez distincte (souvent les variantes de langue peu différenciées). Même levier que le motif « doublon » : du contenu propre à chaque langue. |

---

## (d) Gestes manuels pour David dans Search Console

**Après déploiement en production, et seulement après.**

1. **Indexation → Pages → « Introuvable (404) »** → bouton **« Valider la correction »**.
   Google recontrôle un échantillon puis étend ; compter **de quelques jours à ~2 semaines**.
   Ne pas relancer la validation pendant qu'elle est « en cours ».
2. **Sitemaps** → repérer l'entrée erronée **`https://www.lesagedavid.fr/`** (soumise par erreur, GSC
   dit « Le sitemap est un fichier HTML », 0 page découverte) → menu **⋮ → Supprimer le sitemap**.
   Ne pas toucher à `sitemap-index.xml`, qui est le bon.
3. *(Facultatif)* **Inspection d'URL** sur `https://www.lesagedavid.fr/es/blog/accompagner-des-chansons-au-handpan`
   → doit désormais afficher une redirection vers l'article FR, plus une 404.
4. Ne **pas** demander de suppression d'URL (outil « Retraits ») : les 301 font le travail proprement,
   et un retrait masquerait le signal sans le corriger.

---

## (e) Vérification post-déploiement (à exécuter par la session principale)

```bash
# 1. Les 404 sont devenues des 301 vers l'article FR (attendu : 301 + Location: /blog/<slug>/)
curl -sI https://www.lesagedavid.fr/es/blog/accompagner-des-chansons-au-handpan  | head -5
curl -sI https://www.lesagedavid.fr/es/blog/la-carte-des-joueurs/                 | head -5
curl -sI https://www.lesagedavid.fr/en/blog/mes-handpans-une-seule-porte/         | head -5

# 2. L'index du blog espagnol reste bien en 200 (la règle ne doit PAS le capturer)
curl -sI https://www.lesagedavid.fr/es/blog/  | head -3   # attendu : 200
curl -sI https://www.lesagedavid.fr/es/blog   | head -3   # 308 vers /es/blog/ puis 200

# 3. Les redirections d'anciens slugs : UN SEUL saut (plus de 301 puis 308)
curl -sIL https://www.lesagedavid.fr/handpan-studio     | grep -E "^HTTP|^location"
curl -sIL https://www.lesagedavid.fr/handpan-compagnon  | grep -E "^HTTP|^location"
curl -sIL https://www.lesagedavid.fr/en/pieds-atlas     | grep -E "^HTTP|^location"

# 4. Plus aucun hreflang "es" sur un article non traduit
curl -s https://www.lesagedavid.fr/blog/mes-handpans-une-seule-porte/ | grep 'rel="alternate"'
# attendu : fr + x-default UNIQUEMENT

# 5. Un article traduit garde bien son alternate EN
curl -s https://www.lesagedavid.fr/blog/la-carte-des-joueurs/ | grep 'rel="alternate"'
# attendu : fr + en + x-default
```

**Vérifications déjà faites en local (build du 07/09/2026) :**
- `npx astro build` → 116 pages, build OK ;
- balises hreflang pointant vers une page absente de `dist` : **35 → 0** ;
- `dist/sitemap-0.xml` : 116 URLs, **0 absente de `dist`**, **0** URL `/es/blog/<slug>` ;
- sélecteur de langue depuis un article FR non traduit → `/en/blog` et `/es/blog` (pages existantes) ;
- sélecteur depuis `/a-propos` → toujours `/en/a-propos` et `/es/a-propos` (aucune régression).
