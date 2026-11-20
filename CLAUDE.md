# CLAUDE.md — Site vitrine David Lesage / Handpan Compagnon

Site vitrine (Astro + Tailwind v4) de l'écosystème David Lesage : l'instrument **Neotone**, les **cours**, la **boutique**, et l'app **Handpan Compagnon**. Multilingue FR (racine) + EN (`/en`).

## Chantier en cours (prioritaire)
**Passer le discours « contribution » → freemium clair Découverte (gratuit) + Studio (payant).**
Spec complète et actionnable : **`specs/Note-modifications-site.md`** (fichiers exacts à modifier, copie i18n, prix).

Points clés :
- Retirer tout le vocabulaire « contribution / paie ce que tu veux » (dans `src/i18n/dict.ts`, `src/i18n/en.ts`, `src/components/PricingTable.astro`, `src/lib/prices.ts`, `src/data/shop.ts`, `src/components/pages/StudioPage.astro`).
- Afficher **Découverte (gratuit)** + **Studio** : 9,90 €/mois · 89 €/an · 249 € à vie (**offre fondateur limitée**).
- **Création de compte obligatoire** pour accéder à l'app (nom, prénom, email + CGU + politique de confidentialité) — retirer toute mention « sans compte ».
- Les **montants réels viennent de Stripe** (lecture live via `api/prices.js`) : ne pas coder les prix en dur, seulement ajuster les fallbacks indiqués dans la spec. David met Stripe à jour en parallèle.

## Travailler avec l'atelier (Mac + serveur, règle du 18/11/2026)

Je fabrique sur ce Mac. Yannick et moi nous coordonnons sur le serveur, dans l'atelier (`/srv/atelier`), qu'affiche le cockpit. Tu ne copies pas l'atelier ici : tu y écris à distance, par SSH, avec ses propres scripts.

**Accès au serveur.** `ssh -i ~/.ssh/id_ed25519_atelier -o IdentitiesOnly=yes david@13.140.175.135 '<commande>'`. Dans la suite, **ATELIER** désigne ce préfixe suivi de `cd /srv/atelier &&`.

**En ouvrant une session.**
1. `git pull` dans ce dossier, pour partir de la dernière version commune.
2. `ATELIER python3 outils/demande.py liste` et `ATELIER python3 outils/chantier.py liste` : dis-moi en trois lignes ce que Yannick attend de moi et ce qui est en cours.

**Pendant le travail.** Comme d'habitude : version locale (`npm run dev`), captures dans mon Chrome, je valide, puis on enregistre. Build : `npm run build`.

**À la fin de chaque sujet** (pas de chaque message), écris dans l'atelier :
- une ligne au journal : `ATELIER python3 outils/journal.py ajouter "<ce qui a été vu, corrigé, mis en ligne>"` ;
- si un chantier a avancé : `ATELIER python3 outils/chantier.py maj <n°> --etat "<état>" --action "<prochaine action, une phrase>"` ;
- si c'est un nouveau problème : `ATELIER python3 outils/chantier.py nouveau --zone site --type <technique|interface|marketing|pédagogie> --titre "<titre>" --action "<prochaine action>"`.
  États possibles : `potentiel` · `ouvert` · `en cours` · `attente David` · `fait` · `abandonné`.

**Quand j'ai besoin de Yannick :** `ATELIER python3 outils/demande.py nouvelle --pour Yannick --titre "<titre>" --texte "<la demande, avec ce qu'il faut pour la comprendre seul>"`. Prénoms toujours avec majuscule : Yannick, David.

**Mettre en ligne.** Seulement sur mon ordre explicite, après que j'ai vu ce qui part. Tu enregistres, tu pousses sur la version commune, tu lances `scripts/deployer-prod.sh` (il envoie des mails aux utilisateurs : jamais pour un essai), puis une ligne au journal qui commence par « Mis en ligne : ».

Ne jamais écrire un mot de passe, une clé ou un jeton dans le journal, une demande ou un chantier. Ne jamais toucher au code de l'atelier depuis ce Mac : ça, c'est sur le serveur.

---

## Méthode de travail attendue
Avant de coder un chantier : lire la spec dans `specs/`, proposer un **plan court** des fichiers touchés, attendre la validation de David, puis implémenter par étapes.
