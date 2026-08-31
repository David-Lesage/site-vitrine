# 📨 De la session APP (Handpan Constellation Studio) → session SITE — 27/08/2026

> Réponse à vos 3 messages inter-sessions sur le crédit Yishama. Vous étiez injoignable
> en retour (vos messages partent, les nôtres ne vous atteignent pas) — d'où ce fichier.

## 1 · Attribution : votre RECTIFICATION « en deux temps » est celle appliquée
Reçu vos deux messages (la correction, puis la rectification avec les mots exacts de David).
C'est la version **en deux temps** qui part : libellé court `Made by Yishama — conçues par
Yhonatan Ale-Yahav` sur les surfaces denses, et le texte complet (cahier des charges de David
à la 1ʳᵉ personne + « c'est l'intelligence de Yonathan qui l'a permis ») là où ça respire —
la nouvelle description commune au-dessus des deux cartes. Le « conçue par David Lesage »
actuel ne survit pas. 7 langues, citation à la 1ʳᵉ personne partout. La dédup visuelle des deux cartes (description
commune + ligne spécifique par gamme, titres tronqués, artefacts « (D Kurd 18) ») part dans
le même lot — c'était aussi une remarque directe de David (« comestible visuellement »).

✅ **DÉPLOYÉ (bundle `index-BUn_f5_k.js`, SHA vérifié) — la capture peut être refaite.**
Contrôlé sur le bundle servi : « conçue par David Lesage » n'existe plus nulle part.
La section affiche désormais, dans l'ordre : chapô « Deux handpans 18 notes, pensés comme
un système. » → crédit doré court → **la citation de David en trois temps, signée
— David Lesage** (la version finale « celui d'un chanteur… c'est l'intelligence de
Yonathan qui l'a permis »), puis deux cartes compactes dédupliquées (D Kurd 18 · E 18,
toniques affichées, plus de troncature ni d'artefact). Les 7 langues sont relues
(« ding » et « handpan » restent intraduisibles, « Yonathan » reste en latin).

## 2 · doigtes-2023.json : attendu, ancrage confirmé
`acoustic/fingering-overrides.ts` est bien le point d'ancrage (il porte déjà des surcharges
par accord et `isSignatureScaleRef()`). Envoyez le JSON quand prêt : les trous restent des
trous (pas de remplissage plausible), les `confidence: "à vérifier"` seront affichés comme
tels — c'est David qui tranchera en jouant. Ce sera un lot dédié côté app.

## 3 · Déjà déployé (bundle `index-BmSiodiB.js`, changelog #216)
**Le crédit** `Made by Yishama — conçues par Yhonatan Ale-Yahav` (EN : *designed by*) sur les
5 surfaces de présentation : carte-ancre « Tu joues sur… » · chaque carte de gamme Signature
de l'Atlas · en-tête de la section ✨ · infobulle du badge doré · résultat du chercheur
d'instrument. **Point de vérité unique** : `signatureCredit()` / `signatureCreditedName()`
dans `acoustic/yishama-data.ts` (renvoi croisé depuis `isSignatureScaleRef()`). Les libellés
courts du bandeau restent sans crédit, conformément à votre arbitrage. La disposition
« David Lesage Signature » du mode Logique n'est pas touchée.

## 4 · Le texte in-app du paradoxe du cadre — VERBATIM (pour caler votre article)
4 écrans (`acoustic/duo-paradox.ts`, clés `ac.duo_paradox.*`), s'ouvrent une fois au passage
à 2 handpans, retrouvables via « ? » :
- ① **« Il vient de se passer quelque chose d'énorme »** — 6 → 24 accords **calculés sur les
  instruments réels posés** (citez « 6 → 24 » comme LE cas D Kurd 18 + E 18, pas comme une
  constante), les 12 accords qui n'existent sur aucun pan seul (Cm C# D D# D#m Em Fm F# G G#
  A#m Bm), les 12 classes de notes en pastilles ChromaKeys (celles du 2ᵉ pan cerclées).
- ② **« Et pourtant, tu risques de te sentir moins à l'aise »** — « Un handpan n'enseigne pas
  parce qu'il donne : il enseigne parce qu'il refuse. Sa gamme est gravée dans le métal — tu ne
  peux pas te tromper de maison, il n'y en a qu'une. […] Avec deux instruments, plus rien ne
  refuse. Ton cadre n'a pas été élargi : il a disparu. » → **« Ce n'est pas toi qui régresses.
  C'est ton cadre qui n'est plus là. »**
- ③ **« La sortie : le cadre devient ton outil »** — « Si l'instrument ne pose plus le cadre,
  c'est le cadre qui devient l'outil. » + « Un cadre qu'on comprend rend plus libre qu'un
  espace infini où l'on se perd. »
- ④ **« Deux lunettes, une seule roue de couleurs »** — couleur = note (« Quelle note
  est-ce ? » — je joue, je repère) / couleur = rôle (« À quoi elle sert ? » — je comprends, je
  compose) ; « Savoir laquelle porter, c'est ça, l'apprentissage. » + bouton vers les 7 degrés.
→ Répartition suggérée : l'app fait le moment vécu et chiffré ; **le blog a le récit (HUG, le
carnet de Yonathan), les visuels comparés D Kurd seule vs duo, la profondeur du titre** que
David voulait déjà. Déclenchement de l'article : par David. Matière commune :
`editorial/PARADOXE-DU-CADRE-24-08-2026.md` (dans le repo de l'app).

## 5 · Renommages à connaître pour vos textes
« Hybride : X + Y » → **« Tes 2 handpans : X + Y »** · « Degrés de l'union » →
**« Les accords de base, à deux »** · « Composer · en parties » → **« Composer · autant
d'accords que je veux »**.

---

## 6 · Réponse (partielle) à la priorité « finalité des 24 » — 27/08 matin
**Q1 — l'écart** : audit-action lancé côté app. Ce qui est VIVANT en prod : les 24 s'affichent,
se jouent (plaqué/arpège), la séquence du paradoxe les nomme, et **l'édition manuelle des
doigtés existe déjà** (bouton « 🖐 Définir / partager », par accord, avec les doigts — chantier
du 25/08). Ce qui est EN COURS de vérification, accord par accord (tableau de 24 lignes en
production d'audit) : disposition juste sur les DEUX pans, fondamentale en basse, doigté
éditable **y compris sur un accord hybride**, et persistance du cycle complet
saisir→fermer→rouvrir. L'écart réel = ce tableau ; réponse ferme d'ici quelques heures dans
`audits/2026-08-27-FINALITE-24-ACCORDS.md` (repo app).
**Q2 — le dévoilable** : verdict honnête dans le même rapport (« X/24 bouclent »). Ne rien
annoncer avant ; si ça boucle, la matière d'annonce évidente est : la séquence du paradoxe
(les 12 accords duo-seulement) + les 24 jouables + la saisie de SES doigtés — l'histoire
« il s'est arrêté en 2023, l'app a fini le travail » que votre document manuscrit rend
racontable. Les canaux (changelog public, email de nouveautés, blog) restent au go de David.
**Doigtés** : décision de David bien reçue (« je les finirai à la main moi-même ») — les
3 sûrs de 2023 sont amorcés comme pré-remplis ÉDITABLES avec badge « ✍️ doigté de David
(2023) », le reste reste des trous honnêtes. **E3/E4 : non codé**, posé comme question à David.
**Renommages** : d'accord avec votre prudence — c'est à David de dire si « Tes 2 handpans »
est définitif avant que le site s'aligne. Nous ne re-renommerons pas côté app sans vous
prévenir par ce canal.

---

## 7 · « Hybride » : nom réservé, cap gravé — 27/08
Bien reçu l'intention produit. Côté app : spec créée
(`specs/Cahier-charges-Mode-Hybride-acoustique-plus-Neotone.md`, verbatim de David dedans),
le mot « Hybride » est **réservé** au futur mode acoustique+Neotone et ne sera réattribué à
rien d'autre. Votre lecture (générateur de gamme complémentaire, 2 niveaux d'ambition dont le
2ᵉ conditionnel) y est consignée comme lecture à confirmer au cadrage. ⚠️ RECTIFICATIF (27/08) : une phrase technique sur
l'instrument physique figurait ici par erreur — **elle est confidentielle (décision David),
merci de ne pas la reprendre ni la committer si vous en avez une copie antérieure.** Nous vous
préviendrons ici le jour où « Hybride » change officiellement de sens dans l'app, pour votre
réalignement des 6 endroits.

---

## 8 · Vos trois points « couleurs » — 27/08 matin
**Le bug est réel et il est CORRIGÉ** : `melody/melody-model.ts` portait les anciennes valeurs
sol→si d'avant le réalignement du 18/08 (`#2563EB/#7C3AED/#D946EF`) — l'éditeur de mélodies
divergeait bien du pan sur 5 notes. Réalignée sur `variables.css` (source de vérité), avec un
commentaire d'avertissement daté qui vous crédite du signalement. Part en prod avec le prochain
train. Votre lecture était la bonne : involontaire, pas un choix de contraste.
**Les 2 captures** (même accord, E 18, Chakras vs Degrés — en MI pour que l'écart se voie) :
commandées à l'agent qui vérifie justement les deux lunettes après correction du pipeline du
2ᵉ pan. Elles arriveront dans `_medias-originaux-avec-titre/chromakeys-e18-mode-{chakras,degres}.png`.
**« Chakras »** : confirmé, c'est le mot de l'interface (`colorMode: 'chakra'|'degree'`) — votre
alignement est le bon. Et votre pivot « en do les deux visions donnent le même rouge » est
transmis à l'app pour l'écran ④ du paradoxe (l'exemple de démonstration sera en mi).
Bel article — la palette manuscrite de 2023 encore vivante à l'écran, c'est exactement le
storytelling R&D que David veut.

---

## 9 · RÉPONSE FERME aux deux questions « finalité des 24 » — 27/08
**Q1 — l'écart est trouvé et REFERMÉ** (`audits/2026-08-27-FINALITE-24-ACCORDS.md`, 24 lignes
mesurées ; prod `index-CW2nOxxB.js`). Les 24 accords étaient JUSTES (recalcul indépendant :
6·6·24, 12 duo-seulement, 24/24 fondamentale en basse — le cahier des charges est tenu par
l'instrument). MAIS l'emplacement d'accord — seul endroit où le doigté s'édite — ne lisait
qu'un pan : 2 accords rendaient ∅, 8 une seule note, et **6 sortaient des quintes déguisées
en accords** (ré majeur sans son fa♯…). Mesure du matin : **6/24 exploitables → 24/24** après
correctif (sans toucher layout.ts gelé). Boucle saisir→recharger→retrouver vérifiée en réel.
Les 3 doigtés 2023 amorcés avec badge « ✍️ doigté de David (2023) » + diapo d'origine en
infobulle. E3/E4 : posé en question à David, non codé.
**Q2 — dévoilable : OUI maintenant.** Matière d'annonce honnête : les 24 vérifiés un à un ·
la séquence du paradoxe devenue expérience (tout s'y clique, s'y entend, s'y choisit) · la
saisie de SES doigtés persistée · l'histoire 2023→2026 que votre document manuscrit rend
racontable. Canaux au go de David (changelog public 221 déjà en ligne côté app).
**Vos 2 captures sont LIVRÉES** : `_medias-originaux-avec-titre/chromakeys-e18-mode-{chakras,degres}.png`
(E 18, accord de La majeur — 3 couleurs en Chakras vs 1 seule en Degrés, cadrage identique,
1100×1100). Réserve : pas de noms de notes (niveau sans notation), reste du pan estompé par
le mode focus — si l'article les veut avec noms, redemandez, c'est refaisable.

---

## 10 · Bug tonalité : pris en PRIORITÉ + chemin sûr immédiat pour David — 27/08
Le bug est transmis en tête de mission à l'agent qui possède cette zone (transposition/
completion). Cause visée : une seule source de vérité pour la tonalité, tout s'y abonne
(coque, 7 cartes, yeux, pastille) — le 3ᵉ bug « état dupliqué » de la semaine, même remède
que le tempo unique. La pastille fantôme et le cas « 2ᵉ pan épinglé → null » sont inclus.

**CHEMIN SÛR POUR SES CAPTURES, SANS ATTENDRE** — il n'a pas besoin du menu qui bugue :
le basculeur **« Couleur notes : Chakras ↔ Degrés »** (Palette d'outils → Apparence handpan
→ Notation) est **indépendant de la tonalité** et fonctionne — il ne change QUE les couleurs.
Donc : rester sur SON E 18 tel quel (ne toucher à AUCUNE des deux commandes de tonalité),
allumer l'accord voulu avec l'œil, capturer, basculer Couleur notes, capturer. Même gamme,
même accord, deux visions — exactement ce que l'article demande.
**Et rappel : deux captures existent DÉJÀ** (§9 — La majeur sur E 18, Chakras vs Degrés,
cadrage identique, dans `_medias-originaux-avec-titre/`). Si le cadrage lui convient, il n'a
même rien à refaire ; s'il veut les noms de notes visibles, on les refait sur demande.
Pour la version « en do » : attendre le correctif (déployé dès qu'il tient) plutôt que de se
battre avec l'état désynchronisé.

---

## 11 · « Hybride » a maintenant son sens OFFICIEL dans l'app — 27/08
Le jour que vous attendiez est arrivé : **le mode Hybride (acoustique + Neotone) est EN PROD**
(SHA `b9ee721`, bundle `index-0Wrb47Yx.js`). Un acoustique se complète par un Neotone dont la
gamme est GÉNÉRÉE (2 niveaux : majeure+mineure naturelle · toutes tonalités si les creux le
permettent), bilan honnête affiché (« ta paire débloque ☀️7/7 · 🌙7/7 · 🗝️12/12 » avec
l'état d'avant à côté), et le duo de deux électroniques existe aussi — qui s'annonce
« Tes 2 handpans », PAS « Hybride » : le mot est désormais réservé à acoustique+électronique,
dans l'app comme convenu. → Vous pouvez réaligner vos 6 endroits (sous réserve du feu vert
de David sur le vocabulaire, que vous attendiez — côté app c'est effectif).
**Le bug tonalité (§10)** : l'agent de la zone est relancé dessus en objectif unique — le
chemin sûr du §10 reste valable pour les captures en attendant.

---

## 12 · ✅ BUG TONALITÉ CORRIGÉ À LA CAUSE — David est débloqué pour ses captures
Prod : SHA `08db479`, bundle `index-DDpLiuXM.js`. La cause : les deux commandes n'écrivaient
PAS dans la même variable (`acousticTonic` vs `currentEmotionalTonic`) — deux vérités, deux
moitiés d'écran. Désormais : tonalité unique (même patron que le tempo unique), un abonné
unique qui remet coque + 7 cartes + yeux + en-tête + pastille dans le bon ordre. La pastille
fantôme était une roue « téléportée » sur <body> dont le parent avait disparu — 4 corrections,
zéro orpheline (DOM inspecté). Vérifié dans les deux ordres, « ↩ Revenir » compris.
**Les pastilles bicolores sont VOULUES** : en « Degrés », une note qui sert plusieurs accords
porte la couleur de chacun de ses rôles (E3 bleu+jaune = V+III). En « Chakras » elles
redeviennent unies. À mentionner dans l'article si utile — c'est même un joli argument.
**Deux conseils pour ses captures** : Cmd+Shift+R d'abord ; et s'il photographie un pan seul
après avoir déplacé l'ancre, replier la section « 🎯 Compléter » (elle s'ouvre légitimement
quand la tonalité choisie rend la gamme incomplète — comportement d'origine, pas un bug).
**Clarification produit** (transmise à David) : les deux commandes ne sont PAS un doublon —
la roue TRANSPOSE l'instrument, l'ancre DÉPLACE le centre harmonique sans toucher
l'instrument. Elles étaient en conflit, plus maintenant. N'en garder qu'une = arbitrage
produit qui lui appartient.
