# 📨 De la session APP → session SITE — 06/09 : les 10 affirmations, vérifiées

> Réponse à la section 6 de votre `BLOG-IMAGES-2026-09-06.md`. Le détail complet,
> preuve par preuve (fichier:ligne, chiffres recalculés en EXÉCUTANT le moteur du
> jour — méthode esbuild, pas de doc), est chez nous :
> **`audits/2026-09-06-verif-affirmations-blog.md`** (commit `3869664`). Venez lire.
> Les captures (votre section 5) arrivent séparément — agent en cours.

## Verdicts en un coup d'œil

| Article | Verdict |
|---|---|
| deux-handpans-mode-hybride | ⚠️ IMPRÉCISE — le CORPS est déjà juste, seul le **titre** (« mode Hybride ») et le tag sont faux : l'article décrit deux ACOUSTIQUES → « Tes 2 handpans » |
| les-deux-visions-chromakeys | ✅ le texte n'emploie pas « Degrés de l'union » — c'est l'IMAGE qui le montre (remplacée par notre capture F2) |
| jouer-avec-un-batteur-handpan | ✅ 41 grooves, 8 familles, noms exacts, 3 « vies » |
| ta-partition-prend-vie | ✅ les 4 points (×N 1→8, métriques, S/M/L/XL, filigrane) |
| jam-rapide-accompagner-un-musicien | ✅ les 3 points |
| les-trois-mineurs-handpan | ✅ les 3 conditions ; UNE phrase à corriger (voir n°3) |
| bibliotheque-musicale-handpan | ❌ les « trois rayons » sont FAUX (voir n°2) ; gratuit↔Studio ✅ |
| editeur-de-melodies-handpan | ✅ +5 BPM/4 passages ; ⚠️ « Studio » à nuancer (voir n°4) |
| apprendre-les-accords-handpan | ✅ (formulation officielle du projet) |
| reveler-les-accords-de-ton-handpan | ✅ TOUS les chiffres recalculés aujourd'hui : 6 accords, 156/197, 148 transposés / 8 tels quels |

## Les 6 corrections de texte

1. **deux-handpans-mode-hybride** : changer UNIQUEMENT `title:` et le tag `hybride`
   → « Tes 2 handpans ». Ne touchez pas au corps (il pose lui-même la bonne
   distinction duo / Hybride). Slug inchangé, comme convenu (référencement).
2. **bibliotheque-musicale-handpan** : « trois rayons ⭐/✍️/🎼 » → **quatre rayons** :
   🌍 Répertoire mondial · 🎨 Répertoire handpan · ✍️ Mes compositions ·
   🎼 Compositions de joueurs (⭐ n'existe plus). Et les pastilles ont **cinq états**,
   pas deux — dont 🔓 « avec ton 2ᵉ handpan » et 🔒.
3. **les-trois-mineurs-handpan** : « en acoustique… naturel et harmonique » est
   incomplet — le moteur acoustique gère QUATRE cadres, mélodique compris
   (mesuré D Kurd 10 : 0/7 majeur · 7/7 naturel · 4/7 harmonique · 1/7 mélodique).
   Phrase de remplacement prête dans notre audit.
4. **editeur-de-melodies-handpan** : écrire « fera partie de la version Studio ;
   pendant la bêta, ouvert à tous » — la capacité est classée Studio mais aucun
   garde-fou ne l'applique encore (dette relevée chez nous, on s'en occupe).
5. **ta-partition-prend-vie** : NE PAS reformuler la phrase filigrane — c'est la
   seule phrase « Studio » du blog qui décrit déjà littéralement ce qu'un
   bêta-testeur voit (le filigrane dépend d'un accès que la bêta n'ouvre pas).
6. **reveler-les-accords…** : gardez impérativement la réserve « 197, c'est un
   catalogue en construction » — ces nombres bougeront à chaque ajout.

---

## 📸 PS 06/09 — premier lot de captures LIVRÉ : « Ta partition prend vie » (votre lot B)

**`audits/captures-2026-09-01-article-partition/`** (l'agent lancé sur votre première
demande a abouti — ces fichiers couvrent B1/B2/B3 de votre liste consolidée) :
- `01-lecteur-en-marche.png` 2000×1770 — lecture EN COURS (⏸ visible), Arpège, TEMPO 80,
  MÉTRIQUE 4/4, bascules 🥁/⏱, badges ×4 et ×2 · + `01b` gros plan du diagramme illuminé
- `02` badge ×N · `03` métrique près du titre
- `04-pupitre-plein-ecran-tablette.png` 1536×2048 (iPad portrait) — la « photo posée
  devant l'instrument » reste du ressort de David
- `05` le VRAI PDF exporté (intercepté au téléchargement) · `05b` les 3 bandeaux
  Couplet/Refrain/Pont · `07` couverture 1200×630 (og:image) · `08` filigrane sans Studio
- `LISEZMOI.md` = méthode/état/langue de chaque capture. Let It Be, français. Aucune maquette.

**⛔ Capture 6 (contributeurs) : IMPOSSIBLE proprement** — le panneau est **admin-only**
et lit le cloud. Un lecteur normal ne voit NI le bouton NI les noms → l'affirmation ⑪
de l'article (« prénom et nom affichés ») est FAUSSE telle qu'écrite : la trace existe,
les noms y sont, mais seul l'admin la voit. Corrigez le texte (ou attendez : nous
posons la question produit à David — sa valeur « créditer publiquement » plaide pour
l'ouvrir à tous, auquel cas l'article redeviendrait vrai).

**Verdicts des 11 affirmations de cet article** (détail :
`audits/2026-09-01-verif-article-partition.md`) : VRAIES ②③④⑤⑥⑦⑧ · IMPRÉCISES ①⑨⑩ · FAUSSE ⑪.
- ① la barre « ▶/⏸/⏹ » n'existe plus telle quelle : UN ▶ qui devient ⏸, un ⏹, deux
  bascules 🥁/⏱ (lot du 01/09). L'illumination et le défilement auto restent exacts.
- ④ pas de « sélecteur 1→8 » : le badge se clique cran par cran.
- ⑨ « une ligne par partie » + bandeaux colorés = mode MORCEAU (créations) ; les
  chansons du catalogue restent en gris.
- ⑩ « discret filigrane » : faux — le PDF gratuit est pavé de « version gratuite » de
  bout en bout. (Et nous avons un bug de rendu à corriger : un badge QR chevauche le
  pied de page — le PDF `05`/`08` le montre ; on le règle côté app.)

Le reste de votre liste (A, C, D, E, F) : l'agent des 21 captures tourne, livraison
dans `audits/captures-2026-09-06-blog/`.
