# Doigtés relevés — méthode manuscrite d'août 2023

Extrait le 27/08/2026 du Google Slides **« David Lesage Scale Methode »**
(`1ihAENHVlc0RhzM_CG7Vv1uE_TytM61xMYHBSdug3Qik`, créé le 04/08/2023).

**L = main gauche · R = main droite.** La n-ième lettre correspond à la n-ième note.

> ⚠️ **Rien n'a été deviné.** Chaque doigté a été lu à la fois dans le texte du Slides et
> sur l'image de la diapo. Quand les deux se contredisaient, l'image l'emporte et l'écart
> est écrit noir sur blanc. Là où le document ne dit rien, la case est vide — pas remplie.

---

## Comment j'ai lu les diapos

La pile de notes colorée à gauche de chaque diapo se lit **du bas vers le haut** : la flèche
rouge pointe vers le haut et la case du bas est encadrée en noir gras (c'est la note de
départ). Cette règle n'est pas une supposition — elle est **prouvée par la diapo 6**, où la
pile lue bas→haut redonne exactement la chaîne « R L L R L R L » écrite dans le titre.

---

## Tableau de synthèse

| Diapo | Instrument | Accord | Notes (grave → aigu) | Mains | État |
|---|---|---|---|---|---|
| 5 | D Kurd 18 *(déduit)* | Do Majeur (CM) | *inexploitable* | — | ⛔ inexploitable |
| 6 | **Hybride** (2 pans) | Do Majeur (CM) | C3 · E3 · G3 · C4 · E4 · G4 · C5 | **R L L R L R L** | ⚠️ 1 réserve sur C5 |
| 7 | D Kurd 18 | Ré mineur (Dm) | D3 · F3 · A3 · D4 · F4 · A4 · D5 | **L R L L R L R** | ⚠️ complet, 2 écarts |
| 8 | D Kurd 18 | Fa Majeur (F) | F3 · A3 · C4 · F4 · A4 · C5 · F5 | **R L R L R L R** | ⚠️ complet, écart notes |
| 9 | D Kurd 18 | Sol mineur (Gm) | G3 · B♭3 · D4 · G4 · B♭5 · D5 · G5 | *aucune* | ⛔ pas de doigté |
| 10 | D Kurd 18 | La mineur (Am) | A3 · C4 · E4 · A4 · C5 | **L R R L** + 1 manquante | ⚠️ incomplet |
| 11 | D Kurd 18 | Si b Majeur (Bb) | B♭2 · D3 · F3 · B♭3 · D4 · F4 · B♭5 | **L R R L R L** + 1 manquante | ⚠️ incomplet |

**Bilan : 2 accords avec un doigté complet (diapos 7 et 8), 1 quasi complet (diapo 6),
2 incomplets d'une main (diapos 10 et 11), 2 sans aucun doigté (diapos 5 et 9).**

---

## Détail accord par accord

### Diapo 6 — Do Majeur, **à cheval sur les deux pans** ⭐

C'est l'entrée la plus solide du document, et la plus intéressante : c'est le seul accord
hybride, et l'ancêtre direct du mode Hybride de l'app.

| Note | C3 | E3 | G3 | C4 | E4 | G4 | C5 |
|---|---|---|---|---|---|---|---|
| **Main** | R | L | L | R | L | R | **L ?** |
| **Pan** | D Kurd | **E 18** | D Kurd | D Kurd | D Kurd | D Kurd | D Kurd |

> *« Ordre des mains spécifique : "R L L R L R L" »*

Deux sources indépendantes concordent parfaitement : la colonne L/R du tableau de gauche
**et** la chaîne écrite en titre. Une seule note se joue sur le E 18 : **E3**, son ding.

**❓ Une seule question pour David** — sur le dessin, le badge collé à C5 se lit « R » alors
que le tableau et le titre donnent tous deux « L ». Le badge chevauche le trait D3–C5, son
ancrage est douteux. **La dernière note (C5), tu la frappes main gauche ou main droite ?**
Les six autres badges confirment le tableau sans ambiguïté.

---

### Diapo 7 — Ré mineur (D Kurd)

| Note | D3 | F3 | A3 | D4 | F4 | A4 | D5 |
|---|---|---|---|---|---|---|---|
| **Aller** | L | R | L | L | R | L | R |

**Retour** (tel qu'écrit) : R L R L L R — *6 lettres seulement.*

> *« Ordre des mains spécifique — Allez: Grave → Aigue · Retour: Grave → Aigue »*

- Le tableau « Allez » ne donne que **6** mains. Les **7** de la ligne ci-dessus viennent des
  badges du dessin, qui sont complets ; les 6 du tableau en sont exactement les 6 premières.
  Le tableau est donc **tronqué d'une colonne**, il ne contredit rien.
- **Écart texte/image** : la pile écrit « A3 » en 6e position, mais le dessin surligne
  clairement **A4** (ellipse bleue en haut à gauche, bien distincte du A3 bleu du bas).
  J'ai retenu A4.
- ⚠️ La ligne « Retour » est étiquetée **« Grave → Aigue »**, comme l'aller. C'est
  probablement une coquille pour « Aigue → Grave » (la diapo 11 l'écrit correctement).
  **Ne pas implémenter le retour tant que tu n'as pas tranché ce sens.**

---

### Diapo 8 — Fa Majeur (D Kurd)

| Note | F3 | A3 | C4 | F4 | A4 | C5 | F5 |
|---|---|---|---|---|---|---|---|
| **Aller** | R | L | R | L | R | L | R |

> *« Les mains jouent en alternance Droite / Gauche — "R L R L" »*

Alternance stricte démarrant à droite. Les 7 mains viennent des badges du dessin, complets.
Le « R L R L » du titre n'est qu'un **motif de 4 lettres**, pas une séquence de 7.

- **Écart texte/image sur deux notes** : la pile écrit **C3** et **C4** là où le dessin
  surligne **C4** et **C5**. Le dessin donne un arpège strictement ascendant (ce que la diapo
  annonce) ; la pile ne l'est pas. J'ai retenu le dessin. **Les deux versions sont jouables
  sur l'instrument — à confirmer.**

---

### Diapo 10 — La mineur (D Kurd) — *incomplet*

| Note | A3 | C4 | E4 | A4 | **C5** |
|---|---|---|---|---|---|
| **Aller** | L | R | R | L | **?** |

**Retour** (tel qu'écrit) : R L R R — *4 lettres.*

5 notes, 4 mains. Le tableau est tronqué d'une colonne et, contrairement à la diapo 7, le
dessin **ne porte aucun badge L/R** pour rattraper la dernière. **La main du C5 final est
inconnue** — je ne l'ai pas devinée. Même réserve que la diapo 7 sur le sens du « Retour ».

---

### Diapo 11 — Si b Majeur (D Kurd) — *incomplet*

| Note | B♭2 | D3 | F3 | B♭3 | D4 | F4 | **B♭5** |
|---|---|---|---|---|---|---|---|
| **Aller** | L | R | R | L | R | L | **?** |

**Retour** (tel qu'écrit) : R L R L L L — *6 lettres.*

7 notes, 6 mains, aucun badge sur le dessin. **La main du B♭5 final est inconnue.**
Les notes, elles, sont sûres et strictement ascendantes (le saut F4 → B♭5 s'explique :
il n'y a pas de B♭4 sur le D Kurd). C'est la **seule** diapo dont le retour est correctement
étiqueté « Aigue → Grave ».

---

### Diapo 9 — Sol mineur (D Kurd) — *aucun doigté*

Notes : **G3 · B♭3 · D4 · G4 · B♭5 · D5 · G5**

> *« Les mains jouent en alternance Gauche / Droite »*

Aucun badge sur le dessin, aucune chaîne de lettres. La mention est **générique** : elle ne
dit pas quelle main frappe quelle note. Les notes, elles, sont sûres.

Deux observations :
- **B♭5 rompt l'ordre ascendant** (il se place entre G4 et D5). Ce n'est pas forcément une
  erreur : le D Kurd n'a pas de B♭4, et B♭5 est le seul si bémol disponible dans cette zone.
  C'est peut-être un choix de voicing assumé.
- **C4 est surligné en rouge vif sur la coque** alors qu'il n'appartient pas à Sol mineur et
  n'apparaît ni dans la pile ni dans la grille chromatique. Très probablement un **résidu de
  copier-coller de la diapo 8** (Fa Majeur), où C4 était rouge. Ne pas l'intégrer.

---

### Diapo 5 — Do Majeur (D Kurd) — *inexploitable en l'état*

Pile telle qu'écrite, de haut en bas :
`C5 · G4 · E4 (note manquante) · C5 · G4 · E4 · C4 · G3 · E3 · C2`

Quatre problèmes :
1. **Aucun doigté par note** — ni badge, ni chaîne de lettres, seulement « alternance
   Droite / Gauche ».
2. **10 cases, non monotones** : lue bas→haut, la pile donne C2, E3, G3, C4, E4, G4, C5,
   puis à nouveau E4, G4, C5. Le sens de lecture est indéterminable.
3. **C2 n'existe sur aucun des deux instruments** (le plus grave du D Kurd est B♭2, celui du
   E 18 est A2).
4. La case noire dit **« E4 (note manquante) »** — mais E4 existe bel et bien sur le D Kurd.
   En revanche **E3, présent dans la pile, n'existe pas sur le D Kurd**.

**🔎 Hypothèse (non appliquée, à confirmer par David) :** la note réellement manquante serait
**E3**, et c'est exactement ce que la diapo 6 résout en allant la chercher sur le ding du
E 18. Si c'est bien ça, les diapos 5 et 6 forment ensemble l'acte de naissance du mode
hybride : *« sur un seul pan l'accord est incomplet — avec les deux, il se referme. »*

---

## Ce que le document **ne** couvre **pas**

- **Le E 18 n'a aucun accord documenté.** Il n'apparaît que dans les cartographies de notes
  (diapos 2, 3, 4, 14, 15, 21) et comme fournisseur du E3 dans l'accord hybride de la diapo 6.
  **Zéro doigté propre à cet instrument** — tout est à jouer et à noter.
- **Les doigts ne sont jamais nommés.** Le document ne parle que de mains (L/R). Pouce, index,
  majeur : entièrement à produire.
- **6 accords sur 24.** La paire est annoncée comme permettant 24 accords
  (`pairFacts`, `src/data/yishama.ts`). Le document en aborde 6, dont 2 inexploitables.
- **Aucune 7e, aucun renversement, aucune gamme complète.**
- **Halo (Beyoncé), diapos 19–20** : cartographies d'accords pour un morceau
  (A / Bm / F♯m / D), **sans aucune indication de main**. Rien à implémenter.
  ⚠️ Titre et nom d'artiste en clair sur ces deux visuels — à arbitrer avant publication.

---

## Récapitulatif des questions ouvertes pour David

1. **Diapo 6** — le C5 final : main gauche (tableau + titre) ou main droite (badge du dessin) ?
2. **Diapo 8** — l'arpège passe-t-il par C4/C5 (dessin) ou C3/C4 (pile) ?
3. **Diapo 7** — le A4 du dessin ou le A3 de la pile ?
4. **Diapos 10 et 11** — quelle main sur la dernière note (C5, puis B♭5) ?
5. **Diapos 7 et 10** — le « Retour » se joue-t-il bien aigu → grave ?
6. **Diapo 5** — la note manquante, c'est bien E3 et pas E4 ?
