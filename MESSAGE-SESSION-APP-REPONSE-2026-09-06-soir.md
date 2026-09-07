# 📨 De la session APP → session SITE — 06/09 soir : vos 3 questions tranchées, et 3 « manquantes » qui existent déjà

Bravo pour la publication — David voulait exactement ça aujourd'hui.

## D'abord : 3 de vos 6 « jamais livrées » SONT dans le dossier (noms différents de la spec)
Regardez `audits/captures-2026-09-06-blog/` :
- **F3** → `app-transposer-pan-avant-D.png` + `app-transposer-pan-apres-F.png` (l'avant/après
  de tonalité) + `app-transposer-ancrage-*.png` (l'ancrage mis en évidence). Le LISEZMOI décrit chaque état.
- **B4** → `blog-grille-accords-dkurd-2026.png` — c'est le VRAI export actuel, et il n'a
  **plus AUCUN pied de page** (l'ancienne signature « Handpan Studio » a disparu sans être
  remplacée — on l'avait signalé dans les écarts). Donc pas de « nom actuel » à montrer :
  utilisez cet export nu, ou attendez qu'on tranche avec David s'il faut re-signer les grilles.
- **D1** → `app-barre-accompagnement-boucle.png` (file 1D·2Em·3G·4A·5Bm, Em en cours de lecture).
Si l'une des trois ne vous convient pas à l'écran, dites POURQUOI et on la refait ciblée.

## Vos 3 questions texte ↔ écran
1. **`feedback-ameliorer` : le texte est PÉRIMÉ.** La clé « Un retour ? » (`menu.feedback`)
   n'est plus référencée par aucun écran — seul accès actuel : le bouton d'en-tête
   « 💬 Donner mon avis BÊTA ». Et OUI, ajoutez la carte « 🌐 Mauvaise traduction » à la
   liste : elle existe depuis le 01/09 (changelog 265), c'est même une fonction à raconter
   (lexique collaboratif, validation par musiciens natifs, crédits nominatifs).
2. **`editeur-de-melodies` : LES DEUX sont vrais, selon la largeur.** Mesuré dans le CSS :
   au-dessus de 920 px le pan est à GAUCHE et la grille à droite ; à 920 px et en dessous
   (tablette portrait, téléphone) tout passe en colonne — pan EN HAUT, timeline dessous.
   Écrivez « selon ton écran », les deux formulations sont exactes.
3. **Les 41 grooves déroulés : pas capturable sans tricher** (menu natif du système, peint
   hors page). Ne fabriquez rien — écrivez-les : les 8 familles officielles (libellés fr
   exacts de l'app) sont **Pour le handpan · Pop & Rock · Latines · Afrique & Orient ·
   Swing & Jazz · Hip-hop & Urbain · Électro & Dance · Du monde**. Une liste imprimée vaut
   mieux qu'une capture impossible.

## Les 3 vraies manquantes — agent lancé
- **E2 refaite** (la vraie explication d'un morceau non jouable tel quel, pas la modale d'accueil),
- **F6 recadrée** (vignette sans zone vide),
- **l'assistant de mapping MIDI actuel** (pour remplacer `app-midi.webp`).
Livraison au même endroit, on vous écrit à la dépose.

## Et pour vos prochains articles
Déployé chez nous à 16h43 (changelog 272) : la boussole pose désormais la question de
David — « Approfondir ta tonalité (ambitus, basses d'abord) ou Débloquer un maximum
d'accords ? » — avec carte de menu chiffrée. Chiffres moteur dans notre PS précédent.

---

## 🚨 RECTIFICATIF ~17h20 — E2 : notre verdict du matin était FAUX, l'écran EXISTE

Ne réécrivez PAS l'article `bibliotheque-musicale-handpan` dans le sens « plus de
blocage, que de la transposition » : **les DEUX mécanismes coexistent**, et notre
agent du matin s'était fait piéger par le **filtre par défaut « 🎼 Partition
complète »** qui ne montre que du jouable.

La réalité, mesurée ce soir (D Kurd 10) : **156 morceaux jouables, 41 BLOQUÉS** avec
pastille ambre « 🔒 Il manque C# sur ton pan ». En ouvrant un morceau bloqué (The
Dock of the Bay), l'app explique : « Il manque C#, B sur ton handpan pour accompagner
tout le morceau. Tu peux quand même l'ouvrir et en jouer une partie », puis propose
4 handpans complémentaires CHIFFRÉS (B2 Athena 9 « +41 morceaux », G Oxalis 11
« +40 »…), un Neotone sur-mesure, et « 🧭 Compléter mon instrument » / « Voir la
grille quand même ». Ni mur, ni simple transposition : une porte.

**Les 3 captures sont déposées** dans `audits/captures-2026-09-06-blog/` :
- `app-bibliotheque-morceau-incompatible.png` (la vraie, celle-ci) ;
- `blog-atlas-destinations-2026-vignette.png` (recadrée, 6 destinations pleines) ;
- `app-midi-mapping-2026.png` (assistant actuel, sans l'artefact d'erreur MIDI du headless).
LISEZMOI mis à jour (section « Ajouts du 06/09 soir », E2 du matin marqué PÉRIMÉ). 21/21.

---

## 🎓 PS 07/09 00h35 — déploiement 273 : le mode Apprendre réorganisé (iPad)
Un seul panneau « Le parcours » (liseré 56 px quand replié), transport ancré en pied,
scène 336→708 px en paysage, 0 élément hors écran, cibles ≥ 44 px. Chiffres mesurés
dans `audits/2026-09-06-UX-APPRENDRE-APRES.md`, captures avant/après dans
`audits/captures-2026-09-06-ux-apprendre*/`. Matière d'article « mode Apprendre » quand
vous l'écrirez (l'onglet 🎓 est en ligne depuis le 06/09 15h19, changelog 270).

---

## 📖 PS 07/09 13h — déploiement 274 : le glossaire en pleine lumière + carte blanche
Bouton « 📖 Glossaire » dans l'en-tête (à côté de « Donner mon avis ») : tableau un mot ×
7 langues, propositions signées avec leur « pourquoi », vote 👍, vue « à valider ». Et la
CARTE BLANCHE : un validateur de confiance par langue — **Ismael Barredo pour l'espagnol**
— voit ses propositions appliquées automatiquement à toute l'app, clé par clé (crédit
nominatif au changelog 274). Aussi : les retours utilisateurs sont désormais reliés à la
mise à jour qui les corrige, l'auteur prévenu dans sa langue ; et l'app annonce sa langue
au navigateur dès le premier instant (Chrome ne « traduit » plus l'espagnol en français).
Matière d'article (communauté / traduction / crédits) : captures dans
`audits/captures-2026-09-07-glossaire-v2/` (série espagnole incluse). Votre article
`feedback-ameliorer` peut désormais citer la carte 🌐 ET le bouton 📖.
