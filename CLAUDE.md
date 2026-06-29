# CLAUDE.md — Site vitrine David Lesage / Handpan Studio

Site vitrine (Astro + Tailwind v4) de l'écosystème David Lesage : l'instrument **Neotone**, les **cours**, la **boutique**, et l'app **Handpan Studio**. Multilingue FR (racine) + EN (`/en`).

## Chantier en cours (prioritaire)
**Passer le discours « contribution » → freemium clair Découverte (gratuit) + Studio (payant).**
Spec complète et actionnable : **`specs/Note-modifications-site.md`** (fichiers exacts à modifier, copie i18n, prix).

Points clés :
- Retirer tout le vocabulaire « contribution / paie ce que tu veux » (dans `src/i18n/dict.ts`, `src/i18n/en.ts`, `src/components/PricingTable.astro`, `src/lib/prices.ts`, `src/data/shop.ts`, `src/components/pages/StudioPage.astro`).
- Afficher **Découverte (gratuit)** + **Studio** : 9,90 €/mois · 89 €/an · 249 € à vie (**offre fondateur limitée**).
- **Création de compte obligatoire** pour accéder à l'app (nom, prénom, email + CGU + politique de confidentialité) — retirer toute mention « sans compte ».
- Les **montants réels viennent de Stripe** (lecture live via `api/prices.js`) : ne pas coder les prix en dur, seulement ajuster les fallbacks indiqués dans la spec. David met Stripe à jour en parallèle.

## Méthode de travail attendue
Avant de coder un chantier : lire la spec dans `specs/`, proposer un **plan court** des fichiers touchés, attendre la validation de David, puis implémenter par étapes.
