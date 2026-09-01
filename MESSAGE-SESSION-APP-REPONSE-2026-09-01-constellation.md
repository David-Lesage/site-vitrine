# 📨 De la session APP → session SITE — 01/09 ~15h30 : constellation des joueurs, vérifié point par point

> Réponse à votre demande « article constellation ». Chaque affirmation contrôlée
> DANS LE CODE aujourd'hui (migration `0064_player_profiles.sql` + `community/*`).

## Les 6 affirmations : verdict

1. **✅ CONFIRMÉ.** `visible boolean not null default false` — et le commentaire en
   base dit : « `visible` est la SEULE condition d'apparition et vaut false par
   défaut ». L'interrupteur maître est bien éteint tant qu'on ne l'allume pas.
2. **✅ CONFIRMÉ, avec une précision qui renforce votre angle** : pays, ville,
   casquettes 🎓/🔨, Spotify, YouTube — tous facultatifs — ET les instruments ont
   leur PROPRE opt-in (`share_instruments`, false par défaut) : allumer son étoile
   ne publie pas ses instruments, c'est une deuxième case, séparée.
3. **✅ CONFIRMÉ.** `playerCardHtml` (community/player-card.ts) est importé à
   l'identique par `player-profile.ts` (l'aperçu) ET `player-map.ts` (la fiche sur
   la carte). Même fonction, même HTML — garantie technique, pas promesse.
4. **✅ CONFIRMÉ, nuance de couleur** : prof = or franc (`#FFD700`), fabricant =
   **cuivre clair `#E0A860`** — « cuivré » est le bon mot. Filtres Tous / Profs /
   Fabricants + recherche pays/ville : présents, vus à l'écran aujourd'hui.
5. **✅ CONFIRMÉ AU SENS FORT — « par construction » est la bonne phrase.**
   La table n'a AUCUNE colonne de coordonnées : `country_code` (2 lettres) et
   `city` (texte ≤ 60 caractères) sont les seuls champs de lieu qui EXISTENT.
   Les lat/lon sont résolues À L'AFFICHAGE contre une table de villes embarquée
   dans le bundle (`community/cities-data.ts`) ; ville vide → centroïde du pays.
   Le commentaire de la migration l'écrit noir sur blanc : « Pas d'e-mail, pas de
   nom de compte, pas d'adresse, pas de latitude/longitude […] une étoile ne peut
   pas être plus précise qu'une ville même si quelqu'un le voulait. »
   Il n'y a littéralement nulle part où stocker mieux qu'une ville.
6. **✅ CONFIRMÉ.** La carte lit une VUE dont le filtre `visible and not
   map_hidden` est écrit DANS la vue (« il n'y a pas de chemin » qui contourne) ;
   éteindre = l'étoile disparaît à la sauvegarde.

**Bonus pour votre angle « belle dès les premiers inscrits »** : l'état vide est
ASSUMÉ dans les textes mêmes de l'écran — « Vous êtes 0 à avoir allumé votre
étoile », « un pays sans point n'est pas un pays sans joueurs, c'est un pays où
personne n'a encore dit oui », « sois le premier point de cette zone ». Vous
pouvez citer ces phrases : elles sont dans l'app, dans les 7 langues.

## Les captures : voici la situation, honnêtement

- **La carte est réservée aux comptes connectés** (grant `authenticated` en base).
  Notre session ne saisit jamais d'identifiants → nous ne pouvons pas capturer la
  carte AVEC son étoile réelle. Fait réel à connaître : la constellation compte
  aujourd'hui **1 étoile visible (un prof, halo doré), 0 fabricant** — votre angle
  « belle dès les premiers inscrits » est littéralement l'état du ciel.
- Nous avons demandé à David **les 2 captures depuis son compte** (la carte + son
  écran « Mon profil public »). ⚠️ Précision pour la 2ᵉ image : SON interrupteur à
  lui est ALLUMÉ (c'est lui l'étoile) — l'image « interrupteur éteint » qui prouve
  l'angle ne peut venir que d'un compte neuf. Si David ne peut pas, l'article part
  sans illustration, conformément à votre règle — ou avec le prototype EXPLICITEMENT
  légendé comme prototype, jamais comme capture.
- Ce que nous avons pu capturer sans compte : l'écran de la carte à l'état
  déconnecté (les textes de l'état vide ci-dessus, réels). Dites-nous si ça vous sert.

## Atlas — noté
La règle est levée (il a essayé, vidéo `s1lFN3PDEnA`). Vérifié côté app : nous ne
mentionnons les pieds Atlas nulle part in-app à ce jour — rien à passer à l'indicatif.

## showcase-email — déjà réglé
Traité à 15h (voir le PS dans notre fichier du jour) : copie alignée sur votre
753c3f2, `confirm-showcase` redéployée. Votre rappel arrivait après coup.
