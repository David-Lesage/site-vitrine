# Consigne : page de vente en espagnol

Version 1, 02/11/2026. Décision éditoriale : toute retouche passe par git.

## Le but

Un joueur de handpan hispanophone doit lire cette page comme si elle avait été écrite pour lui,
et avoir envie de créer son compte. Même argument, écrit par quelqu'un qui pense en espagnol.
Fidèle au sens et aux faits, libre sur la tournure.

**Variante :** espagnol d'Espagne, compréhensible en Amérique latine. Tutoiement (*tú*), jamais
*vos* ni *usted*. Éviter les mots que l'Amérique latine lit de travers ou ne comprend pas quand
un mot commun existe (*ordenador* reste, c'est la variante choisie ; pas d'argot local).

## Le lecteur

Il possède un handpan, ou en rêve. Il joue souvent à l'oreille, et la théorie peut l'intimider.
*Solfeo* existe et se comprend : c'est même le mot juste quand le français dit solfège.
Il achète un outil, il ne lit pas un manuel.

## La voix

David Lesage : musicien, chanteur, professeur. Direct, chaleureux, concret. Phrases courtes.
Le texte de David à la première personne et le témoignage de Marina Fortuna sont des paroles
rapportées : fidélité d'abord, on ne les embellit pas. Sa signature se termine par
` · traducido del francés`.

## À éviter

- Le calque du français : une phrase correcte qu'aucun Espagnol n'écrirait.
- Le jargon de la pub et des apps, et les anglicismes évitables.
- Le masculin générique lourd et les `/a` : tourner la phrase quand c'est possible.
- Les promesses absentes du français.
- Le tiret cadratin (U+2014), interdit sur cette page.

## Ce qui ne bouge jamais

- **Faits :** chiffres, prix, pourcentages, durées, noms de gammes, titres, noms propres. Prix au
  format `3,49 €`. Remise : `ahorra 28 %` plutôt que `−28 %`.
- **Noms propres :** ChromaKeys, Neotone, Handpan Constellation Studio, Atlas Sonore, Yishama,
  David Lesage, Web MIDI Browser, Studio, Neotone Drums.
- **Lexique** : `../app/scripts/LEXIQUE-MUSICAL.md` depuis `site/`, §7 (compás, partitura,
  grado, tonalidad…) et ses mises en garde. Note de David déjà relevée : *ding* ne se traduit pas.
- **Noms d'écrans et de fonctions :** ce que le lecteur retrouvera dans l'app. Les vérifier par
  recherche ciblée sur la colonne `es:` de `../app/translations.ts` (lecture seule, jamais en
  entier). Si la page et l'app divergent, garder l'app. Vérifier en particulier le mot de
  *formule* (`fórmula` ou `plan`), *coque*, *fabricants*/*ateliers*, *répertoire*, *mode Logique*,
  *Pluie de notes*, *passeport vocal*, *tapis roulant*, *rituel*, *pan numérique*, les quatre
  formules et les trois paliers, les sept émotions.
- **Noms de notes :** Do Re Mi Fa Sol La Si, naturels en espagnol. Les lignes écrites en lettres
  gardent les lettres.

## Leçons de l'anglais, à appliquer d'emblée

Le français lui-même a ces pièges. Ne pas les recopier :

- **Titre (L18) :** « ton handpan, gratuit pour toujours » se lit comme un instrument gratuit. Dire
  que c'est l'app qui est gratuite.
- **« Pourquoi pas autre chose ? » (L184) :** peut inviter à aller voir ailleurs. Dire *por qué
  esto y no otra cosa*, ou mieux.
- **« I Équilibre » (L133) :** présenter clairement : l'accord I (Equilibrio).
- **Boutons :** la forme la plus naturelle en espagnol, sans calquer la première personne si elle
  sonne faux. Les deux boutons voisins (L72, L73) restent parallèles.
- **Annuel (L265, L281) :** *en un solo pago* doit être clair sans laisser croire à un achat unique :
  tout abonnement se renouvelle (L292).
- **« Le rouge revient, c'est la maison » (L79) :** garder l'image, pas la syntaxe.
- **« L'outil que j'aurais rêvé qu'on m'enseigne » (L217) :** on ne *enseigne* pas un outil, L218 dit
  « qu'on me donne ».
- **« le solfège m'a coupé de mon envie de jouer » (L218) :** tournure naturelle, même sens.
- **« Une chanson, pour de vrai » (L77) :** titre naturel, pas un calque.
- **« 74 coques connues » (L49) :** ce sont des modèles de handpan (décision de Yannick).
- **Instrument électronique :** un seul terme sur la page, celui de la colonne app pour *pan
  numérique*, sauf dans le témoignage de Marina.
- **Les deux-points** ne remplacent pas *y* dans une phrase d'argument.
- **Carte :** *sin tarjeta* suffit, *bancaria* alourdit.
- **Fonctions floues :** « ailleurs » (L258) = voir et écouter la gamme transposée. Pour L271, L272,
  L276, L168 (+7, +9), ne rien inventer : traduire au plus près et mettre une note.

## La technique

Chaque ligne est un fragment exact remplacé dans le HTML ou le JavaScript :

- Garder à l'identique balises, attributs, classes, `data-*`, et le code autour du texte. Ne
  traduire que le texte lisible, `alt`, `aria-label`, `title`, `data-mens`, `data-ann` compris.
- Liens internes : `href="/x/"` devient `href="/es/x/"`, l'accueil `href="/es/"`. URL externes
  inchangées.
- `<span data-n="Do">` : attribut et contenu intacts.
- Fragments JavaScript : garder identifiants, guillemets droits et opérateurs. Dans le texte,
  apostrophe courbe s'il en faut, guillemets `« »`.
- Tenir compte de la place : bouton et pastille restent courts.
- Un `alt` décrit exactement ce qui est montré : il n'est pas un argument.
