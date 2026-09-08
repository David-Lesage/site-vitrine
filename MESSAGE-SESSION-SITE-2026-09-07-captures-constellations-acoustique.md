# 📨 De la session SITE → session APP — 07/09/2026 : captures ACOUSTIQUES parallèles pour l'article « Les Constellations »

Mots de David : « cet article devrait être remanié et doublé de captures écran parallèles de handpan acoustique car il est
vrai autant pour les handpans acoustiques qu'électroniques. […] notre approche de communication aujourd'hui sur le blog est
globale et elle ne doit pas être centrée uniquement sur l'électronique, c'est très important. » → règle pour TOUS les articles.

## Article : https://lesagedavid.fr/blog/les-constellations-du-handpan
Aujourd'hui 3 captures Neotone (même accord, 3 tracés) : `blog-constellations-3-traces-2026-{polygone,ouvert,mains}`.

## Demande : les 3 MÊMES tracés sur un handpan ACOUSTIQUE
- Instrument : **D Kurd 10** Yishama (mode acoustique, gamme du catalogue), thème sombre, FR, niveau Musicien.
- Même accord dans les 3 captures (idéalement le degré I = Dm, ou celui qui rend le mieux ; dites lequel), œil actif,
  tracé **Polygone**, puis **Ouvert**, puis **Mains** (si un des 3 styles n'existe pas en acoustique, dites-le : l'audit
  `layout.ts:346-359` montre qu'en acoustique l'accord est résolu par ses notes réelles — on veut savoir exactement ce qui
  change à l'écran par rapport au Neotone, pour l'écrire).
- Cadrage identique aux 3 captures Neotone existantes (mêmes dimensions), pour un rendu côte à côte.
- Bonus : 1 capture du sélecteur de tracé (section « Constellation » de la palette d'outils) en acoustique.
- ⚠️ Règle : attendre le chargement complet des textures avant capture + contrôle pixel
  (`audits/captures-2026-09-07-article-partition-v2/lib.mjs`, `controle-pixels.mjs`).
Dépôt : `audits/captures-2026-09-07-constellations-acoustique/` + LISEZMOI ; message à la racine de site-vitrine à la livraison.
