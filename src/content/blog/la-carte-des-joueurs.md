---
title: "La carte des joueurs : une constellation où rien n'est allumé par défaut"
description: "Handpan Constellation Studio a maintenant sa carte du monde. Chaque joueur y est une étoile — mais elle est éteinte tant que tu ne l'allumes pas, champ par champ, et l'app ne sait jamais où tu es."
pubDate: 2026-09-01
cover: "/images/blog-constellations-3-traces.webp"
category: "communaute"
tags: ["communauté", "profil public", "carte"]
lang: "fr"
permalink: "la-carte-des-joueurs"
draft: false
---

Le handpan est un petit monde très éparpillé. Des gens qui jouent à trois rues les uns des autres ne le savent pas. Quelqu'un cherche un prof et n'a aucun moyen de savoir qu'il y en a un dans sa ville. C'est vrai depuis toujours, et ça n'a rien à voir avec la technique : il n'existe simplement aucun endroit où se voir.

Depuis fin août, l'application en a un. **Une carte du monde, où chaque joueur qui le souhaite est une étoile.** Pays, ville si tu veux, « je donne des cours », « je fabrique des instruments », tes liens Spotify et YouTube, et même tes instruments.

Mais ce n'est pas ça, le sujet de cet article. Une carte communautaire, tout le monde en a une. Ce qui est différent ici, c'est **le sens dans lequel l'interrupteur est posé.**

## Le renversement : tu n'es pas dessus, et tu ne l'as jamais été

Fais l'exercice mentalement avec les autres services que tu utilises. Tu t'inscris, et tu **es** sur la carte, dans l'annuaire, dans la liste des membres. Ensuite, si ça ne te va pas, tu vas chercher le réglage qui te retire. Le défaut, c'est la visibilité ; le retrait, c'est un effort.

Ici, c'est l'inverse, et c'est la seule décision de conception qui compte vraiment :

> **Tu n'apparais pas.** Tu utilises l'application normalement, personne ne te voit. Un jour, si tu en as envie, tu allumes un interrupteur — et pas avant.

Cet interrupteur porte un nom qui ne trompe personne, **« Apparaître sur la carte »**, il vit dans « 🌍 Mon profil public », dans le menu de ton compte, et il est **éteint tant que tu ne l'allumes pas**. C'est la seule condition d'apparition : il n'existe pas d'autre chemin qui te ferait arriver sur la carte.

Et une fois allumé, ce n'est pas un paquet. C'est **champ par champ**. Tu peux mettre ton pays et rien d'autre. Tu peux mettre ta casquette de prof sans mettre ta ville. Tu peux mettre tes liens sans dire ce que tu fabriques. Ce qui est vide n'apparaît pas — il n'y a pas de ligne orpheline sur ta fiche, pas de « non renseigné » qui pointe l'absence.

Et le défaut n'est pas inversé une fois : **il l'est à chaque étage.** L'exemple qui le montre le mieux, ce sont tes instruments. On pourrait légitimement penser qu'allumer son étoile publie la liste de ses pans — c'est le genre d'information qu'une carte de joueurs voudrait montrer, et je la trouve précieuse. Eh bien non : **le partage des instruments est une deuxième case, séparée, elle aussi éteinte par défaut.** Tu peux être sur la carte, avec ta ville et ta casquette de prof, et n'avoir rien dit de ce que tu joues. Allumer, ici, n'entraîne jamais autre chose qu'un seul allumage.

Je précise, parce que ça compte : ce n'est pas une case de conformité posée en dernière minute. C'est le point de départ à partir duquel tout le reste a été dessiné.

## L'application ne sait pas où tu es

C'est le deuxième point, et il est technique autant qu'éthique.

**Aucune géolocalisation. Aucune adresse.** L'application n'appelle jamais le navigateur pour lui demander où tu te trouves, et ne te demande jamais une adresse — elle n'a pas de champ pour ça.

Alors comment une étoile trouve-t-elle sa place ? **Elle est déduite du nom de la ville que tu as écrit toi-même.** C'est tout. Ce que l'application connaît de ta position, c'est un mot que tu as tapé. Et si tu ne veux pas taper de ville, ton étoile se pose sur le pays.

Et je peux être plus précis que « on ne stocke que la ville », parce que la différence est énorme. **Il n'y a que deux cases de lieu dans tout le système : un code de pays sur deux lettres, et un nom de ville de soixante caractères au maximum.** C'est tout ce qui existe. Il n'y a **pas de case pour une latitude, pas de case pour une longitude** — elles ne sont pas laissées vides, elles n'ont jamais été créées. Les coordonnées d'une étoile sont calculées **au moment de l'affichage**, en cherchant le nom de ta ville dans une liste de villes embarquée avec l'application ; et si tu n'as pas mis de ville, l'étoile se pose au centre du pays.

La conséquence à retenir : **jamais plus précis que ta ville.** Ce n'est pas une promesse de bonne conduite, ni un réglage que quelqu'un pourrait changer d'avis un jour. **Même quelqu'un qui voudrait être plus précis ne le pourrait pas** — il n'y a nulle part où mettre l'information. Tu peux d'ailleurs rester encore plus large qu'une ville : une région suffit, si c'est ce qui te met à l'aise.

## L'aperçu n'est pas une promesse, c'est le même écran

Voilà le détail que je trouve le plus satisfaisant, et il est presque invisible.

Quand tu remplis ton profil, tu as à côté un encart intitulé **« voici ce que les autres verront »**. Dans beaucoup d'applications, un encart comme celui-là est un *résumé* : quelqu'un l'a écrit à la main, un jour, et il dérive doucement à mesure que le reste évolue. Tu crois montrer une chose, tu en montres une autre.

Ici, cet aperçu **est la fiche de la carte**. Le même composant, au pixel. Ce n'est pas une reproduction fidèle : c'est littéralement l'objet qui s'affichera quand quelqu'un cliquera sur ton étoile, sorti de son contexte et posé à côté du formulaire, qui se met à jour à chaque case que tu coches.

La différence est énorme et tient en une phrase : **il n'y a pas de code capable de faire diverger les deux.** Ce n'est pas une garantie que je te donne, c'est une garantie que je n'ai pas les moyens de rompre.

## Une carte qui assume d'être presque vide

Il y a un moment gênant dans la vie de toute carte communautaire : le début. Douze points sur un planisphère, ça a l'air d'un échec. La réaction habituelle, c'est de cacher la carte jusqu'à ce qu'elle soit « présentable », ou de la gonfler.

J'ai choisi autre chose : **elle doit être belle dès les premiers inscrits, pas seulement à mille.** Quand les étoiles sont peu nombreuses, elles sont grosses, elles portent un nom, elles se relient entre elles — la rareté devient un dessin plutôt qu'un vide. C'est exactement ce que fait le ciel, d'ailleurs : douze étoiles, ça suffit largement à faire une constellation.

Et le corollaire auquel je tiens le plus, c'est une question d'honnêteté envers celui qui regarde. Une carte qui laisse croire qu'elle recense le monde ment sur son propre échantillon — et vu le sens dans lequel est posé l'interrupteur, elle mentirait beaucoup. Alors la carte le dit elle-même, à l'écran, dans les sept langues de l'application :

> **Un pays sans point n'est pas un pays sans joueurs, c'est un pays où personne n'a encore dit oui.**

Elle sait aussi compter jusqu'à zéro sans se cacher — « Vous êtes 0 à avoir allumé votre étoile » — et, sur une zone déserte, elle propose simplement : « sois le premier point de cette zone ».

Ce que tu vois sur cette carte, c'est donc **qui a dit oui**. Rien d'autre. Ce n'est pas un recensement du handpan dans le monde, et ça ne le sera jamais.

Autant aller au bout de la démonstration, puisque c'est vrai au moment où j'écris ces lignes. **Ce soir, 1er septembre 2026, la constellation compte une étoile.** Une seule. Un prof, halo doré ; aucun fabricant pour l'instant. Ce n'est pas un aveu gêné, c'est une date : la carte existe depuis quelques jours, et voilà exactement où elle en est. Si tu lis ça maintenant, tu peux être la deuxième.

## Pourquoi « constellation », et pas « carte des membres »

Ce n'est pas un mot d'ambiance. C'est déjà **le mot de l'application**, et il désigne quelque chose de précis.

Dans Handpan Constellation Studio, [un accord est une Constellation](/blog/les-constellations-du-handpan) : des notes qui n'ont l'air de rien séparément, qu'on relie par des traits, et qui forment une figure que l'œil retient d'un coup. Le geste est toujours le même — prendre des points isolés et rendre visible ce qui les relie.

La carte fait exactement ça, un cran plus haut. Les points isolés ne sont plus des notes, ce sont **des gens**. Ils existaient déjà, dispersés, sans savoir les uns des autres. La carte ne les crée pas : elle trace les traits.

Ce qui rend le mot juste plutôt que joli, c'est que le rendu suit : ce n'est pas un fond de carte routière avec des épingles rouges. C'est un ciel, des continents à peine esquissés, et des points lumineux. Un halo **doré** pour celles et ceux qui donnent des cours, **cuivré** pour celles et ceux qui fabriquent des instruments — avec des filtres et une recherche, pour trouver un prof ou un fabricant sans faire défiler le monde entier.

## Et si tu changes d'avis

Un geste. **Tu éteins l'interrupteur maître, ton étoile disparaît de la carte, immédiatement.**

Pas de champ à vider un par un, pas de formulaire, pas de demande à m'adresser, pas de délai. Et ce n'est pas un masquage cosmétique : la carte ne lit tout simplement que les profils dont l'interrupteur est allumé, il n'existe pas de chemin qui contourne ce filtre.

C'est la contrepartie logique du reste. Un interrupteur qui est dur à allumer et facile à éteindre, ce n'est pas un défaut d'ergonomie — c'est le bon sens de marche.

## Comment y aller

Dans l'application : le menu de ton compte, puis **« 🌍 Mon profil public »**. Tout est là, sur un seul écran — l'interrupteur, les champs, et l'aperçu à côté. La carte, elle, ne s'ouvre qu'aux comptes connectés : elle montre des gens, elle n'est pas une page publique qu'un moteur de recherche viendrait indexer.

Prends le temps de le remplir sans allumer, si tu veux voir à quoi ça ressemble. L'aperçu se met à jour pendant que tu tapes, et tant que l'interrupteur est éteint, tu es le seul à le regarder.

Et comme toujours : si quelque chose te manque, ou te gêne, [dis-le-moi depuis l'application](/blog/feedback-ameliorer-handpan-studio). Une carte de gens, c'est le genre de fonction qu'on ne peut pas concevoir seul dans son coin — les questions qu'elle pose se posent à ceux qui y sont.
