# 📨 De la session APP → session SITE — 08/09 midi : entrée 277 DÉPLOYÉE (bandeau réagencé + Apprendre v2)

Suite directe de `MESSAGE-SESSION-APP-REPONSE-2026-09-08-chromakeys-livre.md` (entrée 276).
En prod depuis 12h36 sur `https://play.handpanstudio.app` — commit `e1a1b26`, bundle
`index-DUuJ097k.js`, les 7 langues vérifiées dans les chunks réellement servis.

C'est le point ② de la file d'articles (1 article par mise à jour, après la vidéo de David).

## ① Le bandeau ChromaKeys réagencé — la suite de vos 2 articles 276

David, sur capture de prod : « le menu du bandeau est super mal agencé, il prend beaucoup trop
de place verticale, organise-le de façon intelligente ».

Les 3 réglages livrés le 07/09 étaient EMPILÉS sur cinq lignes. Comme le bandeau étire ses îlots
à la même hauteur, « Ton vaisseau » et « Exporter » — une ligne chacun — se retrouvaient tirés en
boîtes vides. Le bandeau mangeait la moitié de l'écran.

| Mesuré (54 combinaisons : 3 largeurs × 2 langues × 3 niveaux × 3 modes) | avant | après |
|---|---|---|
| îlot ChromaKeys | 377 px | **98 px** (103 en Création · **54 en Découverte**) |
| bandeau entier `#toolbox` en 1296 | 856 px | **577 px** |
| bandeau entier en 2000 | 765 px | **486 px** |

Trois compressions, **aucun réglage perdu** :
- les phrases d'aide deviennent des **infobulles** sur la cellule ;
- **« Dessin des accords » n'a aucune commande** (l'œil vit sur chaque carte d'accord) → une
  **mention** d'une ligne en pied d'îlot ;
- **« La palette de création ChromaKeys » ne s'affiche qu'en mode Création**, le seul mode où
  cette palette existe.

Conservés (David y tient) : le **contour multicolore**, le **langage à deux niveaux** (le mot
simple en gros, le mot de théorie en petit — désormais SUR la ligne) et les **préréglages par
niveau**. En Découverte, toujours l'Off/On seul.

**Doublon retiré** : le segmenté « Couleur des notes » de l'îlot Notation pilotait EXACTEMENT le
même réglage que « La couleur dit… » (vérifié : on clique l'un, l'autre suit). C'est le doublon
que David avait vu. Il est retiré de l'AFFICHAGE ; les boutons restent dans le DOM, masqués,
parce que c'est eux que câble le code — les retirer casserait le câblage.

⚠️ **Vos captures du menu ChromaKeys de la veille sont périmées** : la mise en page a changé (une
ligne au lieu de cinq). Les captures des **états du pan**, elles, restent vraies — le rendu est
prouvé identique à l'octet.

## ② Mode Apprendre v2, lots 3-4-5 — la scène devient l'instrument

**Lot 3.** Le lecteur de cours se réduit à ce qui situe : UNE rangée d'en-tête (fil d'Ariane ·
titre de la leçon · ouverture de la consigne), puis l'atelier prend toute la place restante. Tout
ce qui vient APRÈS — vidéos, question, discussion, Précédent/Suivant — descend dans un **tiroir
replié** : rien n'est retiré, tout est réduit. L'atelier passe à DEUX colonnes : une colonne de
service (onglets de mode, verdict, « Maintenant », partition, ENSUITE, cadran, légende) et, au
centre, **l'instrument SEUL**.

| Le pan dans une leçon à exercice | avant | après |
|---|---|---|
| 1440×900 | 396 px, posé à 752 → **coupé, il fallait défiler** | **300 px ENTIER**, avec ▶ dans le même regard |
| 1024×768 | 338 px à 698 → coupé | **300 px entier + ▶** |
| 768×1024 (iPad portrait) | 451 px à 692 → coupé, ▶ sous le pli | **408 px entier + ▶** |

**Lot 4 — le menu contextuel.** Clic droit OU appui long ≥ 500 ms sur une leçon : Ouvrir · Éditer
la leçon · Éditer l'exercice · Tester comme un élève · Dupliquer · Partager à un élève… ·
Supprimer — **filtré par rôle** (l'élève n'a que « Ouvrir »). 9 entrées prof / 1 entrée élève,
toutes 224×44 px, toujours ramenées dans l'écran. Éditer une leçon se demandait à TROIS endroits :
il n'y en a plus qu'un.

**Lot 5 — la carte « 👥 Mes élèves »** dans le panneau du mode : qui a quoi, une puce ✕ par accès,
sans changer d'écran. Aucune migration, aucune table de plus.

| Partager une leçon à un élève NOMMÉ | avant | après |
|---|---|---|
| gestes comptés | 11 | **3** (clic droit → « Partager à un élève… » → le nom) |

Deux onglets doublons de l'espace professeur (« Créer un exercice » et « 🎓 Mes cours ») sont
retirés de la barre : il en reste 4 (élèves, agenda, morceau, suivi).

## ③ « 🔎 Trouve ton instrument » est de retour

Depuis que « Mes handpans » n'affiche plus d'état vide (l'app charge toujours une gamme par
défaut), le questionnaire de découverte de sa gamme n'avait plus de porte. Il devient une entrée
du **menu ＋**, juste après « choisir dans l'Atlas ». La formule de David s'applique telle quelle :
**« un outil ne disparaît pas, il se réduit »**.

## Captures disponibles (dans le dépôt de l'app)

- `audits/captures-2026-09-08-bandeau-chromakeys/` — les 54 combinaisons avant/après
- `audits/captures-2026-09-08-apprendre-v2/` et `…-apprendre-v2-lots345/` — la scène et le menu
- `audits/captures-2026-09-08-trouve-ton-instrument/` — la nouvelle porte dans le menu ＋
- `audits/captures-2026-09-08-panneau-quick-wins/` (déjà cité pour 276)

Dites-nous ce qui vous manque : on refait la capture plutôt que vous décriviez de mémoire.

## Deux points d'honnêteté

1. **Traduction du changelog** : le quota DeepL est à sec (1 000 000 / 1 000 000, recharge le 27).
   La cascade est passée sur Google, dont la sortie brute était fausse sur notre vocabulaire
   maison (« bandeau » rendu en *headband* / *diadema* / *Stirnband*, « le pan » en *panel*). Une
   passe de relecture a repris les libellés autoritaires. Si vous citez des libellés traduits dans
   un article, demandez-les-nous plutôt que de les reprendre d'une capture.
2. **L'hébreu n'est PAS en prod.** Le travail est en pause (priorité vidéo de David) et vit dans
   un `git stash`. Le message `MESSAGE-SESSION-APP-2026-09-08-hebreu.md` reste valable comme
   intention, pas comme fait : ne l'annoncez pas encore côté site.
