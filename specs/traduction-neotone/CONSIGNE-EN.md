# Consigne : page de vente en anglais britannique

Version 2, 02/11/2026 (leçons du pilote). Décision éditoriale : toute retouche passe par git.

## Le but

Un joueur de handpan britannique doit lire cette page comme si elle avait été écrite pour lui,
et avoir envie de créer son compte. Ce n'est pas une traduction de phrases : c'est le même
argument, écrit par quelqu'un qui pense en anglais. Fidèle au sens et aux faits, libre sur la
tournure.

## Le lecteur

Il possède un handpan, ou en rêve. Il joue souvent à l'oreille, ne lit pas forcément la musique,
et peut être intimidé par la théorie. Il achète un outil, il ne lit pas un manuel.
« Solfège » n'a pas d'équivalent anglais courant : choisir selon le sens, *reading music* ou
*music theory*.

## La voix

David Lesage : musicien, chanteur, professeur. Direct, chaleureux, concret. Phrases courtes.
Il parle à une personne (le « tu » français devient *you*, jamais un ton corporate). Les
ruptures de rythme du français sont voulues : les garder quand elles marchent en anglais.

Le texte de David à la première personne et le témoignage de Marina Fortuna sont des paroles
rapportées : fidélité d'abord, on ne les embellit pas.

## À éviter

- Le calque du français : une phrase correcte qu'aucun Britannique n'écrirait.
- Le jargon de la pub et des apps : *unlock your potential, seamless, elevate, game-changing,
  dive in, take it to the next level, supercharge*.
- Les promesses absentes du français. Rien d'ajouté, rien d'enlevé sur le fond.
- L'américain : *colour, recognise, practise* (verbe), *practice* (nom), *favourite*.
- Le tiret cadratin (U+2014), interdit sur cette page.
- *credit card* est un réflexe américain : un Britannique paie souvent par carte de débit. Viser
  *no card details*, *no card needed* ou équivalent, selon la place disponible.

## Ce qui ne bouge jamais

- **Faits :** chiffres, prix, pourcentages, durées, noms de gammes, titres de chansons, noms
  propres. Prix au format `€3.49`, `−28%`.
- **Noms propres de l'écosystème :** ChromaKeys, Neotone, Handpan Constellation Studio, Atlas
  Sonore, Yishama, David Lesage, Web MIDI Browser.
- **Lexique** : `../app/scripts/LEXIQUE-MUSICAL.md`, depuis `site/`. Il prime. Notamment :
  gamme = *scale* ; coque = *shell* ; tonalité = *key* ; partition = *score* ; morceau = *piece* ;
  répertoire = *library* ; Découverte, Apprenti, Musicien = *Discovery, Apprentice, Musician* ;
  mode Logique = *Logic mode* ; les émotions *Balance, Momentum, Adventure, Relaxation, Tension,
  Nostalgia, Mystery*.
- **Noms d'écrans et de fonctions :** ce que le lecteur retrouvera dans l'app. Les vérifier par
  recherche ciblée dans `../app/translations.ts` (lecture seule, fichier énorme, jamais en entier),
  par exemple *Note Rain*, *Voice passport*. Si la page et l'app divergent, garder l'app.
- **Formules :** Free, Essential, Studio, Teach.

## La technique

Chaque ligne est un fragment exact remplacé dans le HTML ou le JavaScript :

- Garder à l'identique balises, attributs, classes, `data-*`, `href`, `aria-label=`, et le
  code autour du texte. Ne traduire que le texte lisible. Les liens français de la colonne
  source deviennent `/en/...` là où un fragment contient un `href` interne.
- Dans les fragments JavaScript, garder les guillemets droits du code. Dans le texte, apostrophe
  courbe `’` et guillemets `“ ”`.
- Tenir compte de la place : bouton et pastille restent courts, un titre ne double pas de longueur.
- Un `alt` ou un `aria-label` décrit exactement ce qui est montré : il n'est pas un argument.

## Leçons du pilote

- Boutons à l'impératif, jamais à la première personne : *Start now*, pas *I'll start now*.
- Une chanson est *in your scale*, jamais *on your scale*. On joue *on your handpan*.
- Remises : *save 28%*, pas *−28%*. Annuel : *paid in one go*, *no free month*.
- Le signe deux-points ne remplace pas *and* dans une phrase d'argument.
- *palier* et *formule* : *plan* partout sur la page.
- « 74 coques connues » : *74 handpan models* (décision de Yannick, 02/11).
- Tout abonnement, mensuel ou annuel, se renouvelle par tacite reconduction : *renew automatically*. La mention vit dans la note sous les formules (L292).
