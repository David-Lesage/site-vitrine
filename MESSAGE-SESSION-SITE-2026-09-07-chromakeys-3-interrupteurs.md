# 📨 De la session SITE (« Site vitrine continuation ») → session APP — 07/09/2026 : refonte du menu ChromaKeys en 3 réglages indépendants

> 🚦 **Statut : David a dit « Go pour les 3 interrupteurs » et veut voir la maquette avant que l'app change.**
> Maquette publiée : https://claude.ai/code/artifact/8104ace9-8103-4ce3-baa2-807ac3ccc2ec (copie : site-vitrine/prototypes/2026-09-07-menu-chromakeys-3-reglages.html).
> Vous pouvez préparer ; **attendez son go final sur la maquette avant de déployer** (il peut corriger les mots ou l'anneau).
> Les noms des degrés (Équilibre…, voyelles) sont déjà validés : cette partie-là est à faire sans attendre (message précédent).

## Le problème que David a nommé (ses mots)
« Il me manque un bouton dédié dont la fonction permet de faire apparaître ou non si une note appartient à plusieurs
accords ou pas (la fameuse fonction camembert) qui est une fonction à part entière et qui n'est pas liée au fait de penser
en terme de degré […] J'ai associé malgré moi deux choses qui sont distinctes. »
Confirmé par l'audit du code (site-vitrine/audits/2026-09-07-chromakeys-modes-audit-code.md) : le camembert n'est dessiné
qu'en `colorMode = 'degree'` (renderer.ts ~2055-2090), sans interrupteur propre.

## Décision produit (David, 07/09)
1. **Le bouton « Chromakeys » commande l'apparition des couleurs** (aujourd'hui il ne fait qu'afficher/masquer la palette
   circulaire — `events-ui.ts:1281-1286`, `ui-palette.ts:239-243` — alors que son infobulle promet les couleurs, `index.html:450`).
2. **La palette circulaire (mode Création uniquement) est renommée « La palette de création ChromaKeys »** (« comme une palette de peintre »).
3. **Trois réglages indépendants** dans le menu ChromaKeys (garder le contour multicolore, David y tient) :

| Question affichée (langage simple d'abord) | Choix | En petit (théorie) | État interne |
|---|---|---|---|
| **La couleur dit…** | la note · sa place dans la gamme · rien | chakras · degrés | `colorMode` = chakra / degree / none (existant) |
| **Notes partagées** | on / off | « montre en parts quand une note sert dans plusieurs accords » | **NOUVEAU** flag indépendant (ex. `sharedNotesMode`) |
| **Dessin des accords** | œil par accord (existant) | constellation | `chordPathVisibility[i]` (existant) |

4. **Rendus attendus** (matrice) :
   - couleur = note, partagées off, pas d'œil → comme aujourd'hui en chakras.
   - couleur = note, **partagées on** → **NOUVEAU rendu « anneau »** : la note garde sa couleur chakra au centre, un anneau fin
     (≈ 22 % du rayon) découpé en parts égales, une part par accord où la note sert, chaque part de la couleur du degré de
     cet accord. Départ à midi, ordre des cartes d'accord, comme le camembert actuel.
   - couleur = place, partagées on → le camembert actuel (secteurs pleins).
   - couleur = place, partagées off → pastille pleine de la couleur du degré (pas de camembert).
   - œil actif, couleur = place → tout l'accord prend la couleur du degré, notes hors accord en gris `#4a5568` (existant).
   - œil actif, couleur = note → tracé + chaque note garde sa couleur (existant). L'œil actif masque les parts/anneaux.
5. **Préréglages par niveau** (pour ne pas montrer 3 interrupteurs d'un coup) : Découverte = note / off ; Apprenti = place / on ;
   Musicien = tout visible. Le sélecteur de niveau existant règle les défauts, l'utilisateur peut toujours changer.
6. **Vocabulaire** : hors mode Logique le segment s'appelle « Accords » et la couleur suit la fondamentale (`theory.ts:555-562`) :
   l'infobulle « Couleur par degré de la gamme » (`index.html:596`) doit dire, hors Logique, « Couleur = la note qui donne son
   nom à l'accord ». Langage à deux niveaux partout : mot simple d'abord, mot de théorie en petit (David : « accessible à un
   enfant de 8 ans » pour le simple). Degrés : I Équilibre · II l'Élan · III Aventure · IV Détente · V Tension · VI Nostalgie · VII Mystère.

## Ce que la session SITE attend en retour
- Les libellés FR définitifs une fois codés (les 2 articles blog les citeront tels quels).
- Les captures des 5 états de la matrice + le menu (règle : attendre le chargement complet des textures — scripts
  `audits/captures-2026-09-07-article-partition-v2/lib.mjs` + `controle-pixels.mjs`).
- Toujours en attente : mesure moteur mineur harmonique / mélodique (formes des degrés à la transposition, Mutant 19).
