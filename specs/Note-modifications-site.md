# Note de modifications du site vitrine — passage « contribution » → freemium Découverte / Studio
*Suite aux décisions arbitrées (Yannick). Objectif : supprimer tout discours « contribution / paie ce que tu veux » et afficher le freemium structuré **Découverte (gratuit) + Studio (payant)**. Repo : `site-vitrine` (Astro). Cette note est aussi déposée dans `site-vitrine/specs/`.*

---

## Ce qui change (résumé)
- Fin du modèle « contribution » (gratuit / 10 / 80 / 300, « paie ce que tu veux »).
- Nouveau : **Découverte gratuit** + **Studio** à **9,90 €/mois · 89 €/an · 249 € à vie (offre fondateur limitée)**.
- Message **compte** : **création de compte obligatoire** (nom, prénom, email + cases CGU et politique de confidentialité) pour accéder à l'app, même gratuite. *(Décision David, prévaut sur le « sans compte ».)*
- **MIDI** = fonction de Studio (et bonus possible à l'achat d'un Neotone).
- Nom de marque inchangé pour l'instant : **Handpan Studio**.

---

## Action NON-dev préalable (David / Yannick)
- **Mettre à jour les prix dans Stripe** : mensuel 9,90 € · annuel 89 € · à vie 249 €. Le site lit les montants **en direct depuis Stripe** (via `api/prices.js` → Supabase `get-prices`), donc c'est la **source de vérité**.
- Cadrer l'offre **à vie comme fondateur limitée** (durée ou quantité), puis la retirer.

---

## Fichiers à modifier (dev)

### 1. `src/i18n/dict.ts` (FR) & `src/i18n/en.ts` (EN) — le gros du travail (copie)
Remplacer tout le vocabulaire « contribution » par « Découverte / Studio » :
- **Section tarifs** (FR ~l.338-359 / EN ~l.332-353) :
  - `priceEyebrow` : « Tarifs · contribution » → **« Tarifs »**.
  - `priceTitle` : « Choisis ta contribution » → **« Découverte, ou Studio »** (ou « Choisis ton accès »).
  - `priceIntro` : retirer « tu finances l'évolution / tu ne paies pas un produit fini ». Nouveau sens : *« Commence gratuitement avec la Découverte. Passe au Studio pour créer tes gammes, sauvegarder, exporter sans filigrane et connecter ton Neotone. »*
  - `priceCta` : « Je contribue » → **« Je passe au Studio »**.
  - Noms des plans (FR ~l.355-357) : « Contribution mensuelle/annuelle/à vie » → **« Studio mensuel » / « Studio annuel (2 mois offerts) » / « Studio à vie — offre fondateur »**.
  - `priceNote` : retirer « dès la première contribution » → *« Montants synchronisés avec Stripe. Le Studio débloque tout l'atelier de création. »*
- **Carte produit** (FR l.158 / EN équivalent) : description « Découverte gratuite, puis contribution libre… » → **« Découverte gratuite, puis Studio à partir de 9,90 €/mois — débloque la création, la sauvegarde et l'export. »**
- **Section « communauté contributive »** (FR ~l.329-332 / EN ~l.323-326) : on **garde l'esprit communauté** (le feedback façonne l'app) mais on **retire le sens « en t'abonnant tu finances/contribues »**. Reformuler vers : *« ton retour façonne l'app »*, sans lier l'abonnement à un acte de financement.

### 2. `src/components/PricingTable.astro`
- Commentaires l.2 et l.31 : « Grille de contributions » / « Contributions » → **« Grille d'accès Découverte / Studio »**.
- Garder 4 cartes : **Découverte (gratuit)** + **Studio mensuel / annuel / à vie (fondateur)**. Badge « à vie » → **« Offre fondateur limitée »**. Le « Le plus choisi » peut rester sur l'annuel.

### 3. `src/lib/prices.ts`
- Commentaire l.2 « Tarifs « contribution » » → **« Tarifs Studio »**.
- **Fallbacks** l.30-32 : `monthly 10 → 9.90`, `annual 80 → 89`, `lifetime 300 → 249` (au cas où Stripe est indisponible ; la vraie valeur vient de Stripe).

### 4. `src/data/shop.ts`
- Ligne produit Handpan Studio : « Gratuit · dès 10 €/mois » → **« Gratuit · Studio dès 9,90 €/mois »** ; mettre à jour la description si elle parle de contribution.

### 5. `src/components/pages/StudioPage.astro`
- Section `#tarifs` : tirée des clés i18n ci-dessus (se met à jour automatiquement une fois la copie changée). Vérifier le rendu.
- Près du CTA « Ouvrir l'application », message : **« Crée ton compte gratuit pour commencer »** (nom, prénom, email + acceptation des CGU et de la politique de confidentialité). Retirer toute mention « sans compte ».
- Optionnel : mentionner que l'**export gratuit** est filigrané et que **Studio** retire le filigrane (levier de conversion).

---

## Points à valider côté humain
- Conserver ou non un **crédit de marque discret** sur l'export Studio (David : **oui**, « créé avec Handpan Studio by David Lesage »).
- Formulation exacte de l'offre fondateur à vie (durée / quantité / date de fin) avant de l'afficher.

---
*Cohérent avec « Grille-acces-et-prix-v2.md ». Une fois les prix Stripe mis à jour et la copie i18n changée, la page de tarifs reflète le nouveau modèle.*
