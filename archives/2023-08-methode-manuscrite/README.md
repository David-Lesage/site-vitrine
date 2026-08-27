# Méthode manuscrite — août 2023

Document fondateur de **Handpan Constellation Studio**, retrouvé et archivé le 27/08/2026.

## Ce que c'est

Un Google Slides de **21 diapositives** dans lequel David Lesage a construit, à la main,
une cartographie complète de ses **deux handpans** (E 18 notes et D kurd 18 notes) : où
tombe chaque note sur chaque coque, quelles notes composent chaque accord, dans quel ordre
les jouer — et surtout **dans quel ordre les mains se posent** (« R L L R L R L », aller
grave→aigu puis retour).

C'est l'ancêtre manuel de ce que le mode Hybride de l'application calcule aujourd'hui
automatiquement.

## Provenance

| | |
|---|---|
| Titre d'origine | **David Lesage Scale Methode** |
| ID Google Drive | `1ihAENHVlc0RhzM_CG7Vv1uE_TytM61xMYHBSdug3Qik` |
| Créé le | **04/08/2023, 09:19 UTC** |
| Modifié le | 02/08/2026 |
| Diapositives | 21 |
| Titre de la 1re diapo | « The missing part of the handpan player / La partie manquante du joueur handpan » |

Le Google Slides d'origine reste intact dans le Drive de David — cette archive est une
copie en lecture seule.

## Pourquoi on le conserve

1. **Il date le récit au jour près.** Le site raconte déjà : « En août 2023, j'ai commencé
   un document pour voir, enfin, comment composer mes accords sur mes deux pans. […] Ce
   document est devenu Handpan Constellation Studio. » (clé `yishama.bridgeP2` dans
   `src/i18n/dict.ts`). La date de création du fichier — **04/08/2023** — confirme ce récit.

2. **Il était déjà cité dans le code, jamais montré.** Le commentaire d'en-tête de
   `src/data/yishama.ts` référence ce document comme source du relevé des notes des deux
   handpans. C'est la pièce manquante entre le récit et le code.

3. **Il est inachevé, et c'est la valeur.** David n'est pas allé au bout : il reste un
   modèle vierge, des pages de travail à moitié montées, un intertitre resté noir et
   sans texte. Un document inachevé n'est pas un raté — c'est la matière du storytelling
   R&D. **Ne rien supprimer, ne rien nettoyer, ne rien recadrer.**

## Contenu page par page

| Pages | Contenu |
|---|---|
| 1 | Page de titre : handpan schématique, 7 pastilles de couleur, trajectoires de mains en flèches rouges |
| 2 | Les deux gammes côte à côte (E 18 notes / D kurd 18 notes), notes nommées |
| 3 | Cartographie du placement des notes + grille chromatique 4 octaves (bicolore) |
| 4 | Même cartographie, **une couleur par nom de note** — ancêtre direct du code couleur de l'app |
| 5–11 | Accords un par un : Do M, Do M (2 pans), Ré m, Fa M, Sol m, La m, Sib M — avec ordre des notes, ordre des mains (L/R) et flèches de trajectoire |
| 12 | **Diapo noire, entièrement vide** (intertitre jamais rempli — jumelle non titrée de la page 18) |
| 13–14 | Coques nues légendées : « D Kurd - 18 notes David Lesage », « E - 18 notes David Lesage » |
| 15 | « Modèle Vierge » — le gabarit que David se fabriquait pour dupliquer chaque accord |
| 16–17 | Pages de travail inachevées : grille chromatique isolée, grande zone vide |
| 18 | Intertitre « Mapping Morceaux de handpans » |
| 19–20 | **Halo (Beyoncé)** : grille d'accords A / Bm / F#m / D reportée sur les deux coques, trajectoires colorées d'une coque à l'autre |
| 21 | Coque E nue (doublon de la page 14) |

## Fichiers

- `methode-manuscrite-2023-08-04.pdf` — export PDF fidèle du Slides (21 pages)
- `pages/slide-01.png` … `slide-21.png` — rendu 1800 × 1013 px, non retouché
- **`doigtes-2023.json`** — les doigtés (ordre des notes + main qui frappe) relevés
  accord par accord, avec traçabilité au numéro de diapo et niveau de confiance
- **`doigtes-2023.md`** — les mêmes doigtés en tableaux lisibles, avec la liste des
  questions ouvertes pour David

> ⚠️ Les doigtés sont de la **donnée musicale destinée à être enseignée**. Rien n'y a été
> déduit ni complété : là où le document de 2023 est muet ou ambigu, c'est écrit comme tel.
> Six points restent à trancher par David (voir la fin de `doigtes-2023.md`).

## Filiation avec l'application

- **Ordre des mains (L/R)** noté à la main pages 5–11 → mode **Hybride** (calculé
  automatiquement aujourd'hui)
- **Une couleur par nom de note** page 4 → code couleur chromatique de l'app
- **Les deux coques ensemble** pages 6, 15, 19, 20 → gestion multi-handpan / le
  « paradoxe du cadre » (2 pans = 12 notes sur 12)
- **Grille chromatique 4 octaves** en bas de presque chaque page → vue « toutes les
  notes disponibles »
