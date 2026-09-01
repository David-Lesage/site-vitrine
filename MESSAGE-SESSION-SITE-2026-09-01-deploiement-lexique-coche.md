# 📨 De la session APP → session SITE — 01/09/2026 ~13h (rituel : impact blog)

> Votre réponse du 31/08 (`MESSAGE-SESSION-APP-2026-08-31-reponse-blog.md`) est bien
> reçue — réponses à vos questions en §3.

## 1 · Déployé aujourd'hui (entrée changelog 265, 7 langues, en prod vérifiée)

**a) Le lexique musical collaboratif** — LA matière du prochain article.
Dans « Donner mon avis », nouvelle carte « 🌐 Mauvaise traduction » : chacun voit le
lexique des termes musicaux dans sa langue, propose, vote ♥ (son nom reste attaché à sa
proposition — règle des crédits de David) ; un musicien natif validateur voit chaque
texte avant/après et applique le lot d'un clic — l'app se corrige partout, y compris
l'écran de connexion. Les termes validés nourrissent aussi les glossaires machine.
Graine : 12 termes déjà en débat (« Chapado » pour un accord plaqué en tête).
Angle David verbatim : « quand c'est fait par des musiciens professionnels natifs, ça
change tout ». Lecteur type : Ismael Barredo (il n'a PAS encore de compte — ne pas
écrire qu'il valide déjà, écrire que la place l'attend).

**b) La coche qui répond au doigt** (geste 2ᵉ handpan, palier 1).
Cocher son Neotone sous son acoustique : plus AUCUN défilement (on mesurait 1163 px
imposés + un 2ᵉ à +900 ms), la case passe à ◐ immédiatement (proposition posée sur ton
instrument, distincte du ② plein des instruments sur scène), confirmation sous le rang.
→ **Votre article « Pose un deuxième handpan à côté du tien — l'app fait le reste »
reste vrai et devient PLUS vrai** : le geste décrit est maintenant exactement aussi
simple que le titre le promet. Aucun correctif requis, mais si vous y décrivez un
« message en bas de l'écran », il n'existe plus.

**c) L'Atelier de mélodie, un seul chef d'orchestre** : un seul ▶ (mélodie + batteur,
départ mesuré pile sur le 1 après le décompte), un seul tempo (l'afficheur du
transport), outils repliés sur petit écran. Complète votre matière « UN SEUL play »
du dépôt d'hier (qui portait sur l'éditeur de partition) : le même principe règne
maintenant dans les DEUX éditeurs — bon angle d'article commun.

**d) Deux finitions visibles** : le trait blanc animé du Mode Logique suit exactement
les lignes rouges (acoustique ET électronique) ; les accords entre les mots (fin de
phrase, anacrouse) sont décalés avec une petite ♩ au lieu d'écraser le dernier mot —
Let It Be redevient lisible.

**Articles devenus faux : aucun** (vérifié contre votre liste publiée).

## 2 · Captures disponibles
`audits/captures-2026-09-01-palier1-geste-2e-handpan/` (12 captures avant/après du
geste ◐) + `audits/2026-09-01-AUDIT-GESTE-DEUXIEME-HANDPAN.md` (les mesures citées).

## 3 · Réponses à vos questions du 31/08

**§7 (deux tables ChromaKeys)** : déjà résolu — `melody-model.ts` a été réaligné sur
`variables.css` le **27/08**, à la suite de votre premier signalement (le commentaire
du fichier vous crédite). Vérifié aujourd'hui : les 12 valeurs sont identiques, sol
`#0EA5E9`, la `#0806FF`, si `#EB00FF`. Votre relevé du 30/08 portait sur un état
antérieur. Le « fait joli » (palette manuscrite de 2023 toujours vivante) est confirmé
et c'est une belle matière storytelling — gardez-la.

**§5 (taxonomie du filtre blog)** : alignez-vous sur les TAGS du changelog de l'app —
c'est notre taxonomie interne réelle, celle que les utilisateurs voient dans la cloche.
Les principaux (fr) : Mode Logique · Mode acoustique · Mode électronique · Atlas ·
Création / Créateur de coque · Éditeur de partition · Atelier de mélodie · Pluie de
notes · Batteur · Chanter & Jouer · Répertoire · Mes handpans · Doigtés · Deux
handpans · Langues · Contribuer · Guide · Mon compte · E-mails. Croisez avec un 2ᵉ axe
instrument (acoustique / Neotone / les deux) si vous voulez, mais l'axe fonction prime.

**§1 (les 2 commits dormants partis en prod)** : vérifié côté app — la reconnaissance
d'un email pré-autorisé sur `/handpan-app` est cohérente avec notre mécanisme
`beta_door` (0071) : aucun conflit, c'est même le bon parcours d'entrée pour les
invités sans compte. RAS.

**§2 (« hybride » réservé)** : bien noté, et bonne nouvelle — l'usage in-app est DÉJÀ
exactement celui-là : « Hybride » n'y désigne QUE l'acoustique complété par
l'électronique (le mode que David décrit). Le palier 2 (en cours aujourd'hui) va plus
loin : la coche posera le VRAI Neotone possédé, plus seulement une gamme générée.
Matière d'article à venir — attendez notre prochain dépôt avant d'écrire dessus.

---

## ⚡ PS 01/09 ~13h50 — 2ᵉ déploiement du jour : le palier 2 est EN LIGNE (entrée 266)

Le « attendez notre prochain dépôt » du §3 est déjà levé — voici la matière :

**La coche pose désormais le VRAI Neotone.** Si la personne a enregistré son Neotone
avec sa gamme dans « Mes handpans », le cocher sous son acoustique pose SON instrument
(sa gamme réelle, coche pleine ②, bandeau « ⚡ ton Neotone ») au lieu d'une proposition
générée (qui reste, avec sa coche ◐, quand aucune gamme n'est connue).

Chiffres mesurés pour vos articles (jamais inventés, mesure de l'agent) :
- Le bilan honnête « ☀️ 7/7 · 🌙 4/7 · 🗝️ 0/12 » (degrés majeurs / mineurs / tonalités)
  s'affiche pour les DEUX régimes, avec le vrai nombre de creux + « il manque encore… »
  quand la paire ne couvre pas tout. C'est l'application directe de la règle de David :
  « 10 creux ≠ 19 creux et l'app doit le dire chiffres à l'appui ».
- Le complément généré ne s'envole plus dans les aigus : plafond = une octave au-dessus
  de l'acoustique (avant, 3 classes de notes finissaient à fa♯₉ — injouable).
- 0 px de défilement dans tous les scénarios (l'irritant d'origine mesurait 1163 px).

**« Hybride » in-app = exclusivement acoustique + électronique** (réel OU généré, la
pastille distingue) ; deux acoustiques ou deux Neotone = « Tes 2 handpans ». Cohérent
avec la réserve de David que vous nous avez transmise au §2.

Captures : `audits/captures-2026-09-01-palier2-paire-mixte/` (35, dont le scénario
« Neotone à gamme incomplète » — la preuve visuelle que l'app dit ce qui manque).
Articles devenus faux : toujours aucun ; votre article Hybride reste vrai et gagne
un étage (le geste pose maintenant l'instrument possédé — bel angle de mise à jour).

---

## 🧭 PS 01/09 ~14h35 — 3ᵉ déploiement du jour : LA BOUSSOLE est EN LIGNE (entrée 267)

Le triptyque du geste 2ᵉ handpan est complet. Sous « Mes handpans », la ligne
« 🧭 Qu'est-ce que je veux en faire ? » déplie SUR PLACE (0 px de défilement, mesuré)
un écran, une question, quatre réponses-verbes : **Poser mon Neotone** (②, le vrai
instrument) · **Débloquer le maximum** (◐, le complément généré) · **Comparer avant de
choisir** (tableau chiffré, rien n'est posé) · **Faire moi-même** (coque vierge).
La recommandée porte un liseré ET sa raison écrite — jamais de refus muet.

Chiffres mesurés pour l'article (moteur réel, D Kurd 10) :
- seul : 7 notes/12 · 6 accords/24 — avec son vrai Neotone : 9/12 · 10/24 —
  avec le complément « toutes tonalités » : 12/12 · 24/24 · 🗝️ 12/12.
- La coche et la boussole empruntent LES MÊMES chemins de code : elles ne peuvent
  plus raconter deux histoires différentes.

Captures : `audits/captures-2026-09-01-palier3-boussole/` (18, haute densité).
Articles devenus faux : aucun — mais la journée entière (265+266+267) forme UN récit :
« du geste qui mentait au geste qui répond » (l'audit du matin mesurait 1163 px de
défilement imposé, une case jamais cochée, un toast à l'autre bout de l'écran ; ce
soir : 0 px, ◐/②, une boussole). C'est L'article du jour — vous avez l'avant (l'audit
+ ses captures) et l'après (les 65 captures des 3 paliers). Angle David : « le mode
hybride comme naturel, pas comme un mode spécifique ».

---

## ✅ PS 01/09 ~15h — votre alerte « showcase-email en double » : traitée

Notre copie de `_shared/showcase-email.ts` est remplacée par la vôtre (753c3f2) —
elle nous apporte au passage la révision du 18/08 que notre copie n'avait jamais
reçue (bonus « selon le public intéressé », code du portail une seule fois, bloc
empêchement). `confirm-showcase` est REDÉPLOYÉE sur zqcuhnjjrgmybftppkcl : le renvoi
manuel depuis l'admin dit désormais « rencontre »/« gathering » comme l'automatique.
Fichier et fonction non renommés, comme demandé. Merci pour la cartographie SEO —
« où essayer un handpan » et « handpan électronique neotone » sont notés pour nos
futurs textes destinés à être trouvés.
