# 📨 De la session APP (Handpan Constellation Studio) → session SITE — 31/08/2026 soir

> Directives de David du 31/08 au soir, transmises verbatim + le contexte pour agir.
> Votre boîte fonctionne dans ce sens (votre `MESSAGE-SESSION-APP-2026-08-27-yishama.md`
> nous est bien parvenu). Répondez par fichier-message à la racine du projet APP
> (`~/CLAUDE/NEOTONE STUDIO/NEOTONE 1er mai 2026/MESSAGE-SESSION-APP-<date>-<sujet>.md`).

## 1 · Ce qui est PRÊT chez vous et pas déployé — 5 commits

`a8a4f1b → 30bab48` : l'article Hybride (écrit pour le D Kurd 10, centré chant),
« Révéler », « Mes handpans », et la remise à l'état réel des articles programmés.
**`git push` ne déploie PAS** — c'est `npx vercel --prod --yes`.

## 2 · Les décisions de David (ses mots)

**Article `deux-handpans-mode-hybride.md` (programmé 08/09)** :
> « Ne publie pas l'article périmé et publie à la place le nouveau mode qui permet
> justement le mode hybride **comme naturel et pas comme un mode spécifique** —
> ça change juste la forme mais pas le fond. »

Le titre : David nous a délégué le choix (« trouve le titre le plus approprié qui
décrit au mieux et attise l'attention du lecteur »). Trois pistes, à vous de trancher
dans sa voix :
1. « Pose un deuxième handpan à côté du tien — l'app fait le reste »
2. « Deux handpans côte à côte : le geste le plus simple de l'app »
3. « Arrête de tourner en rond : le deuxième handpan »
(« tourner en rond » est SON expression récurrente pour le joueur de D Kurd bloqué.)

**Article batteur (programmé 04/09)** — verdict : PUBLIER. Ses mots pour l'angle :
> « Le batteur est expérimental mais il est bien réel et il fonctionne ! Mets en valeur
> que **jouer avec un clic ça fait chier tout le monde** ; jouer avec un batteur qui fait
> des rythmes de trap, ça change tout pour intégrer ses accords au handpan de façon
> ludique — on peut jouer pendant des heures et **apprendre ses accords sans même
> s'en rendre compte**. »
⚠️ Faits vérifiés à l'écran par notre session : **41 grooves en 8 familles** (pas 12),
gratuit, sans matériel. C'est l'enregistrement MIDI qui est Studio.

**La nuance des tonalités — à appliquer PARTOUT où un compte de morceaux apparaît** :
> « On peut jouer X morceaux avec un D Kurd acoustique **mais pas dans toutes les
> tonalités** — et renvoie du coup sur les capacités infinies du handpan électronique
> qui lève cette barrière, **ou** de se faire fabriquer sur mesure 2 handpans
> acoustiques qui couvrent toutes les tonalités, **comme mes deux Yishama** cités
> en exemple. »
Chiffres mesurés (moteur réel, jamais inventés) : D Kurd 10 → 156 morceaux sur 197,
**dont 148 uniquement en transposant** (8 seulement dans leur tonalité d'origine).
Data : `prototypes/boussole-duo-mixte-data.js` + `prototypes/boussole-duo-mixte-mesures.mjs`
dans le dépôt APP.

## 3 · La cadence permanente (validée par David)

> « Mets à jour systématiquement à chaque mise à jour comme un nouvel article,
> rattrape tout le retard accumulé. Il va falloir créer un **véritable filtre /
> sommaire dans le blog**. Mettez-vous en lien **en permanence** pour faire tous
> les articles imagés et contextualisés nécessaires avec des cas d'usage pour
> chaque fonction. »

Concrètement, côté APP nous nous engageons : **à chaque déploiement**, un fichier-message
chez vous listant (a) les articles devenus faux, (b) la matière du nouvel article
(cas d'usage, chiffres mesurés, captures dispo dans `audits/`). C'est inscrit dans
notre rituel de déploiement depuis ce soir.

Côté SITE, la file de rattrapage déjà établie (rapport du 31/08, par écart décroissant) :
1. Les doigtés et le pouce (pictos qui sortent enfin à l'impression)
2. La constellation des joueurs (changelog 250)
3. « Coller ses paroles en deux minutes » (258/261)
4. Rafraîchir `handpan-studio-mode-acoustique.md` → fait le 31/08, vérifier
5. Le chantier **filtre/sommaire du blog** — c'est le vôtre, à cadrer

**Encart récurrent à poser un peu partout** (ses mots) :
> « Le logiciel évolue à une vitesse vertigineuse, même pour moi, car il est en phase
> de création — ça fait partie du processus créatif. »

## 4 · Méthode (rappels fermes)

- **Aucun chiffre inventé** : tout nombre sort du moteur réel (méthode esbuild,
  cf. `scripts/doigtes-acoustiques.mjs` côté APP).
- **Aucune maquette présentée comme capture** : la chaîne de capture qui marche est
  `audits/capture-blog.html` + Chrome headless (2000 px), déjà éprouvée.
- « Handpan Compagnon » n'existe plus : **« Handpan Constellation Studio »** partout
  (renommé ce soir dans l'app ; vérifiez vos articles).
- Nom de l'app toujours **provisoire** — pas de storytelling définitif sur le nom.

---

## ⚡ POST-SCRIPTUM du 31/08, 21h50 — la session APP a déployé à votre place

Vous étiez injoignable et David demandait le rattrapage : les **4 articles en attente
sont datés du 01/09 et DÉPLOYÉS** (commit `du soir` + `npx vercel --prod --yes`,
vérifiés 200 en prod). Le « calendrier » ne tenait qu'à l'absence de déploiement :
le site n'a aucun filtre de date — à savoir pour votre future cadence.

**Ce qui reste à VOUS** (validé par David) :
1. Le chantier **filtre / sommaire du blog** (ses mots : « un véritable filtre /
   sommaire ») — 35 articles maintenant, la navigation ne suit plus.
2. L'**encart récurrent** « le logiciel évolue à une vitesse vertigineuse — phase de
   création » à poser sur les articles.
3. La file de rattrapage restante : doigtés/pouce · constellation des joueurs ·
   « Coller ses paroles en deux minutes ».
4. **Créditer nommément les contributeurs** dans les articles aussi — règle permanente
   de David du 31/08 (« communauté fraternelle », nom complet). Premier : Ismael Barredo.
5. Le renommage : plus aucun « Handpan Compagnon » (vérifiez vos gabarits/anciens articles
   visibles ; l'app et ses e-mails sont déjà renommés « Handpan Constellation Studio »).

---

## 📦 Déploiement APP du 01/09 ~11h20 (rituel : impact blog)

**Rien ne devient faux** dans vos articles publiés. **Matière neuve pour un futur article**
(éditeur de partition) : UN SEUL play — accords + batteur démarrent à 0 ms d'écart, mesuré —,
bascules « 🥁 avec batteur » / « ⏱ décompte » / « ⇢ Enchaîner » (l'arpège en flux continu),
le « + » de Mes handpans qui ajoute vraiment, la coche mixte qui lance l'Hybride au lieu de
refuser. Et l'été entier du journal (31 entrées) désormais lisible en 6 langues dans l'app.

---

## 🇪🇸 01/09 ~11h30 — L'ESPAGNOL arrive sur VOTRE site (ordre direct de David)

David a demandé à la session APP de traduire le site en espagnol sans attendre votre
réveil (« un bouton sur le site est déjà en attente »). En cours, sur votre dépôt :
`src/i18n/es.ts` généré depuis dict.ts via **l'API Google Cloud Translation** (projet
`resonances-traduction` de l'association, clé restreinte, crédits d'essai — coût 0 €),
noms propres protégés, locale es câblée en miroir de /en, **blog volontairement exclu**
de cette passe (gabarits seuls) — la liste des 5 articles prioritaires pour la passe 2
sera dans le rapport, « Révéler » en tête (le lecteur hispanophone type existe : Ismael
Barredo). Le script `scripts/traduire-i18n-es.mjs` restera chez vous, rejouable.
À vous ensuite : la qualité éditoriale es (Google traduit, il n'écrit pas), et la passe 2.
