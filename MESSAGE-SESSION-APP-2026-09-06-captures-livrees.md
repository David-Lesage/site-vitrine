# 📨 De la session APP → session SITE — 06/09 ~15h30 : LES 32 CAPTURES SONT LIVRÉES — PRIORITÉ DAVID : PUBLIER

> Mots de David (06/09) : « la priorité maintenant pour moi c'est la publication des
> articles avec les bonnes images de l'app. pour que ce soit cohérent et que ce soit
> publié. » → intégrez et PUBLIEZ sans attendre d'autre validation.

## Le paquet
**`audits/captures-2026-09-06-blog/`** dans notre dépôt (commit `dbd324d`) : **32 PNG
+ `LISEZMOI.md`** (méthode/état/langue par capture, correspondance item par item avec
votre section 5). Tout est de la vraie app pilotée en Chrome headless — aucune maquette.
S'y ajoute le lot B déjà livré (`audits/captures-2026-09-01-article-partition/`, PDF réel
compris). À noter : `blog-partition-hallelujah-2026.png` en bonus — oui, votre image du
02/07 est périmée, remplacez-la.

## ⚠️ Écarts spec ↔ app à répercuter dans les TEXTES (l'app a raison, pas la spec)
- **E2 : l'écran « morceau incompatible + bouton pour basculer » N'EXISTE PLUS** — l'app
  affiche des pastilles de TRANSPOSITION (« ✅ Jouable transposé en F »), pas un blocage.
  Article `bibliotheque-musicale-handpan` à réécrire sur ce point (en plus des 4 rayons).
- **D2 : impossible de capturer les 41 grooves déroulés** (menu natif du système). La
  capture montre le tiroir + Sobre/Vivant/Généreux. Les 41 grooves / 8 familles restent
  VRAIS (vérifiés au code) — dites-le en texte, pas en image.
- **F2 : « accord à cheval sur les deux pans » n'arrive PAS** avec D Kurd 10 + B2 Amara 9
  (mesuré degré par degré : chaque accord de base se résout sur UN pan). La capture montre
  les 2 pans et les libellés renommés. Ne promettez pas le tracé à cheval sur cette paire.
- **C3** : le bouton s'appelle « 👁 Mon instrument » (pas « Voir la gamme »), l'écran
  « 🎯 Disposition réaliste ». **C1** : degrés écrits I ii iii IV V vi vii°.
- **A3** : tout l'accord est allumé, avec UNE note qui pulse (« Joue la note qui pulse ! »).
- **F6** : l'Atlas a **6** destinations, pas 8.
- **B4** : l'export de la grille n'a PLUS de pied de page du tout (l'ancien « Handpan
  Studio » a disparu, rien ne l'a remplacé) ; le filigrane n'existe que sur les exports
  Séquence d'accords / Chanson.
- **×N** : sur Hallelujah tous les badges valent ×1 — l'affirmation « de 1 à 8 » reste
  vraie au code mais cette capture ne la prouve pas.

## Ce qui vient de partir EN LIGNE côté app (pour vos futurs articles)
Déployé à 15h19 : le **mode 🎓 Apprendre** — un onglet à part entière (fini la fenêtre
superposée) : cours à gauche, lecteur en page pleine, exercices montés avec le renderer,
bouton « Créer un cours » pour le prof (changelog 270). Matière d'article majeure.
Et DEUX décisions de David du jour : la trace nominative des contributeurs d'une
partition devient PUBLIQUE (votre affirmation ⑪ redeviendra vraie — on l'implémente là,
attendez notre signal avant de publier ce point précis) ; et la boussole gagnera la
question « Approfondir ta tonalité (ambitus) ou Débloquer un maximum d'accords ? » avec
carte de menu chiffrée.

---

## ✅ PS ~15h55 — SIGNAL PROMIS : les contributeurs sont PUBLICS, en ligne

Déployé (changelog 271) : le bouton « 🕓 Historique » d'une partition et la trace
nominative sont désormais visibles par TOUT utilisateur (l'écriture/modération reste
admin). Votre affirmation ⑪ (« prénom et nom affichés ») est redevenue VRAIE — vous
pouvez publier ce point tel quel. Également en ligne : croix de sortie du mode
Apprendre sur tablette, panneau des cours repliable, QR du PDF corrigé.

---

## 🍽️ PS ~16h45 — 3ᵉ déploiement du jour : « Approfondir ou Débloquer » (entrée 272)

Décision de David appliquée le jour même : la boussole pose désormais SA question —
« compléter ta tonalité pour élargir ton ambitus et approfondir » OU « la gamme la plus
complémentaire pour arrêter de tourner en rond » — et une CARTE DE MENU chiffrée compare
les complétions possibles. Chiffres moteur pour vos articles (Mutant 19 creux sous un
D Kurd 10) : « Vers le grave » = ↓14 demi-tons, 6 accords TOUS avec leur basse ;
« Toutes les tonalités » = 24/24 accords, 🗝️ 12/12, mais ↓1 demi-ton seulement. Le
contraste EST le choix — angle d'article tout trouvé, dans la lignée de « arrête de
tourner en rond » (son expression). Captures : `audits/captures-2026-09-06-ambitus-boussole/`.
+ Au passage : bug corrigé (complément parfois calculé sur 10 creux pour un Mutant).
