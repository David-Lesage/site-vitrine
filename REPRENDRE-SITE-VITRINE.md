# REPRENDRE — Site vitrine David Lesage

> Mémoire de contexte du projet **`~/CLAUDE/site-vitrine`** (Astro 6 + Tailwind v4 → Vercel, `lesagedavid.fr`).
> À lire en entier en début de session, **section « ÉTAT ACTUEL » en priorité**.
> Ne jamais confondre avec les handoffs de l'app (`~/CLAUDE/NEOTONE STUDIO/…`).

---

## ⚠️ RÈGLE DE PARTAGE AVEC LA SESSION APP (à lire avant de toucher quoi que ce soit)

Le site et l'app se rejoignent sur la **liste de contacts**. Deux sessions ont travaillé en
parallèle sur cette jonction le 22/07/2026 et ont provoqué une perte de données silencieuse
en production. La frontière n'est PAS « app / site » — c'est **par surface** :

| Surface | Propriétaire |
|---|---|
| ce dépôt (`site-vitrine`, y compris `api/*`) · EF **`site-lead`** · table `site_leads`, vues et policies CRM | **session site vitrine** |
| dépôt de l'app · EF **`app-lead`** · `auth/admin-users-panel.ts` · écran de connexion | **session app** |

Avant d'éditer un fichier de l'autre côté : vérifier `git status` là-bas. Un fichier
**modifié non commité** = une session est dessus → ne pas y toucher, passer par un brief.

**Deux pièges qui ont réellement mordu :**
1. `site-lead` n'avait de source dans **aucun dépôt** → personne ne la mettait à jour, alors
   que c'est elle qui écrit en base. Sa source vit désormais dans
   `supabase/functions/site-lead/` (avec un README). Toujours redéployer depuis ce fichier.
2. **Un commit ne déploie rien.** `git push` ne met pas la prod à jour. Des changements sont
   restés commités mais absents de la production pendant des heures.

---

## ÉTAT ACTUEL — 22/07/2026

### Déploiement
```bash
cd /Users/davidlesage/CLAUDE/site-vitrine
npx astro build && npx vercel --prod --yes     # ← le SEUL moyen de mettre en ligne
git push origin HEAD                            # séparé, ne déploie pas
```
- `bun.lock` **gelé** : aucune nouvelle dépendance npm, jamais (ça casse le build Vercel).
- Le build est le contrôle de parité FR/EN (`en: Dict = typeof fr`) : une clé manquante d'un
  côté fait échouer le build. ⚠️ La même faute commise **des deux côtés** passe le build —
  déjà arrivé (titre vide en prod).

### Fait et vérifié en production
- **CRM des demandes de réservation** : les 3 anciens `mailto:` de `/showroom` sont devenus une
  modale de formulaire (`src/components/BookingForm.astro`) → `/api/subscribe` → EF `site-lead`
  → table `site_leads`. Capture motif, téléphone, message, nombre de personnes, date visée.
  La personne reçoit un accusé de réception, David une notification à `contact@lesagedavid.fr`
  (avec `Reply-To` sur l'adresse du visiteur).
- **Calendrier des showcases** : encadré mis en avant + bandeau « prochain showcase » dans le
  hero, dates passées filtrées (build + filet client), état vide qui capture l'email.
- **`neotone@lesagedavid.fr` supprimé** partout → `contact@lesagedavid.fr` (clé `emailNeotone` retirée).
- **EF `site-lead` v7** : accepte le formulaire enrichi (`handpanType`, `personalGoal`,
  `wantsBeta`, `usage_type='maker'`). Allowlists identiques à `app-lead`.
- **Base CRM** : pipeline `status`, horodatage automatique (`replied_at` / `attended_at`),
  relance manuelle (`follow_up_at` + note), policies admin (`is_site_admin()`), et deux vues
  `site_lead_tasks` / `site_lead_event_roster`.
- **Formulaire = déclaration d'intention** (site ET écran de connexion de l'app, identiques) :
  casquettes cumulables (`roles[]`), chacune annonçant sa contrepartie ; sous-questions ciblées
  (objectif perso, nombre d'élèves, fiche fabricant) ; encadré d'engagement d'honnêteté.
  `usage_type` est DÉRIVÉE des casquettes côté serveur, et une sous-réponse dont la casquette
  n'est pas déclarée est **ignorée** — impossible de gonfler son profil depuis le navigateur.
  Deal fabricant gravé : catalogue de l'app, apport d'affaires, pourcentage, prix de mise en relation.
- **App v83/v84/v85 déployée** : colonnes triables + panneau élargi dans « Comptes & accès »,
  formulaire refondu sur l'écran de connexion. EF `app-lead` v4, `site-lead` v9.

### 🔴 À FAIRE — bloqué sur David
- **Photos Muling** : 11 images produit (`HMP2详情01-10`, `HMP2主图01`) à récupérer.
  ⛔ EXCLURE `德国帐户.png` et `香港帐户.jpg` — coordonnées bancaires.
- **Blog phase 2** : ~12 captures d'écran de l'app à faire par David pour enrichir les articles.

### File d'attente
1. **Le filigrane sur les exports gratuits est PROMIS dans le formulaire** — il doit exister
   dans l'app avant l'ouverture au public, sinon la promesse est fausse.
2. **Écran CRM dans le dashboard** — spec complète dans
   `~/CLAUDE/NEOTONE STUDIO/NEOTONE 1er mai 2026/BRIEF-crm-contacts-site.md`
   (4 écrans : boîte de réception, fiche contact, mes tâches, avant un showcase).
3. **Gérer les dates de showcase depuis le dashboard** (table `showcase_events` + lecture live)
   au lieu du code — chantier proposé, pas validé.
4. **Brevo** : centralisation des contacts + newsletter RGPD (en attente que David ait du temps).

### Agenda des showcases — synchro MANUELLE
`src/data/site.ts` → `agendaEvents`. **Source de vérité = l'agenda Google « Le Nid »**
(partagé avec Iris, `iris.chasles@gmail.com`) :
`30716d7f4373d33769612165eb0607e5b33fd533b984df2df61fe9518ab32eae@group.calendar.google.com`
Accessible via les outils Google Calendar (`list_events`).
**Seuls les événements intitulés « Showcase » vont sur le site** — pas les workshops
(yoga, calebasse), concerts, résidences, ni les « Rdv mensuel au Nid ».
⚠️ La copie est manuelle : une date ajoutée/déplacée dans l'agenda n'apparaît qu'après
édition du fichier + redéploiement. Dernière synchro : **01/08/2026** (5 dates jusqu'au 05/12).
Les dates passées disparaissent seules (filtre build + client dans `ShowroomPage.astro`).

### Rendez-vous individuels — tarifs et créneaux
**Les tarifs vivent dans `src/data/site.ts` → `sessionTypes`** (demo 1h30/50 €, cours 1h/50 €,
cours 1h30/70 €). Changer un prix LÀ le change partout : cartes de la page showroom ET options
du formulaire (via `src/lib/sessions.ts`). Ne jamais les recoder ailleurs.
La personne **propose jusqu'à 3 créneaux** (`preferred_slots`), David en confirme un.
Conditions annoncées dans le formulaire ET rappelées dans l'email d'accusé : le rendez-vous
devient ferme au règlement, reportable jusqu'à 24 h avant.
⚠️ **Le règlement n'est PAS automatisé** : aucun lien de paiement n'est envoyé, David encaisse
à la main. À brancher sur Stripe si le volume augmente.
⚠️ Le cas « annulation à moins de 24 h » n'est volontairement PAS écrit (David ne l'a pas tranché).

### ⚠️ MARQUE « HANDPAN STUDIO » — déposée par le studio d'Amsterdam
Vérifié dans TMview le 06/08/2026 : **« HANDPAN STUDIO » est une marque de l'Union
européenne ENREGISTRÉE** — EUIPO n° **018962523**, déposée le **12/12/2023** par
**Handpan Studio V.O.F.** (Amsterdam), classes **15, 35, 37, 40, 41, 42**
(instruments de musique, commerce, enseignement, services logiciels).
Conséquence : le renommage envisagé « Play Handpan Studio » CONSERVE l'élément dominant
de leur marque — décision de David en attente (avis d'un conseil en PI recommandé,
ou accord amiable : ils sont ambassadeurs Neotone comme lui). NE PAS lancer le
renommage massif ni le SEO sur « handpan studio » avant cette décision.
Domaines achetés en réserve : playhandpan.app · playhandpanstudio.app · playneotone.app
(gérés sur OVH, manager.eu.ovhcloud.com).

### Dashboard ventes / affiliations — FONDATIONS FAITES (06/08)
Table `affiliate_sales` + `neotone_coupon_pool`, vues `affiliate_revenue` et
`affiliate_tasks`, RLS admin (insert/update/delete permis, contrairement à site_leads).
**Sheet Soundventure importé** : 33 lignes (22 ventes payées = 66 443 € CA Neotone,
3 497 € commissions Résonances), 3 leads, 8 sans suite, 47 codes libres.
Écrans à construire côté app : spec complète dans
`NEOTONE STUDIO/NEOTONE 1er mai 2026/BRIEF-dashboard-ventes.md`.

### (archive) matière réunie avant les fondations
- **Google Sheet Soundventure** (ambassadeur) accessible et lu : contrat du 01/11/2024
  (fin prévue 01/11/2025 — à clarifier, sans doute renouvelé côté Airtable), ~25 prospects
  avec nom, email, tél, Instagram, date, code coupon DLes_*, % remises, date de vente,
  prix TTC/HT, commission (~5 % HT ≈ 162–167 €/instrument), statut de paiement.
  ⚠️ Le Sheet contient l'IBAN de David : EXCLURE les lignes bancaires de tout import.
- **Règles de commission** : Neotone 5 % du HT (facture mensuelle envoyée par eux à
  contact@) · Hisong 25 % via Shopify Collabs (automatique) · Muling : rien en place
  (ils veulent des virements — c'est le dashboard qui doit combler) · Yishama : 0 vente.
- Facturation Neotone : manuelle via un facturier Google Sheet.
- Reste à trancher : dashboard dans l'app (recommandé) — et écrire la spec AVANT de coder.

### Identifiants utiles (rien de secret ici)
- Supabase : projet **`zqcuhnjjrgmybftppkcl`** (Handpan Studio). Clé publiable du site dans `api/subscribe.js`.
- EF `site-lead` : `verify_jwt = false`, protégée par `SITE_LEAD_TOKEN` (Vercel + Supabase).
- App : `https://play.handpanstudio.app` · site : `https://lesagedavid.fr`.

---

## Journal

### 06/08/2026 (suite)
- Dashboard ventes : fondations en base + import du Sheet Soundventure (22 ventes,
  66 443 € CA / 3 497 € commissions) + brief des 4 écrans pour la session app.
  Décision : dashboard DANS L'APP. Marque : David en parle avec Yannick.

### 06/08/2026
- Formulaire code Neotone : téléphone sans « facultatif », champ réseaux sociaux (v15).
- Page Muling : section fabricant FR/EN/ZH + avertissements constructeur (brief du 05/08).
- **Découverte : « HANDPAN STUDIO » = marque UE enregistrée (018962523) par le studio
  d'Amsterdam** → renommage suspendu à la décision de David (voir section dédiée).

### 02/08/2026
- Formulaire de RDV individuel : tarif annoncé avant l'envoi (menu déroulant), la personne
  propose jusqu'à 3 créneaux, conditions de règlement et de report affichées + rappelées par email.
  Migration `site_leads_session_and_slots`, `site-lead` v11.
- Tarifs centralisés dans `site.ts` (`sessionTypes`) + `lib/sessions.ts` : les cartes de la page
  showroom et le formulaire lisent la même source.
- **Piège re-rencontré** : `api/subscribe.js` filtre par liste EXPLICITE. Les nouveaux champs
  partaient du formulaire et l'EF les acceptait, mais le relais Vercel les jetait → `null` en base.
  RÈGLE : tout champ ajouté au formulaire doit être ajouté DANS LES TROIS (formulaire, relais, EF),
  et vérifié en base par un test de bout en bout avant de conclure.

### 01/08/2026
- Agenda des showcases synchronisé depuis le calendrier Google « Le Nid » : 5 dates
  (23/08, 19/09, 18/10, 14/11 à 16h–19h ; 05/12 à 15h–18h). Les 17 autres événements du
  calendrier (workshops, concerts, résidences, rdv mensuels) sont volontairement exclus.

### 22/07/2026
- CRM des demandes de réservation construit de bout en bout et déployé ; calendrier des
  showcases rendu visible et purgé des dates passées ; `neotone@` remplacé par `contact@`.
- **Incident** : deux sessions en parallèle sur la jonction site ↔ app. Les champs
  `handpanType` / `personalGoal` / `wantsBeta` et le profil `maker` étaient **jetés
  silencieusement en production** — migration, `api/subscribe.js` et `app-lead` à jour, mais
  `site-lead` (qui écrit en base) restée en v6 et sans source dans aucun dépôt. Réparé en v7,
  source versionnée, règle de partage des surfaces écrite ci-dessus.
- Découvert au passage que le site n'avait pas été redéployé depuis les commits de l'autre
  session : la prod tournait sur un build antérieur. Déployé.
- App v83 : tri par colonnes et panneau élargi dans « Comptes & accès ».
- Formulaire refondu en déclaration d'intention (site + app), migration `site_leads_declared_intent`,
  `site-lead` v9 et `app-lead` v4. **Piège rencontré** : `app-lead` v4 a été déployée avant le
  redéploiement Vercel de l'app → toute inscription depuis `play.*` a été rejetée en
  `400 invalid_roles` pendant l'intervalle. RÈGLE : quand une Edge Function durcit son contrat,
  déployer le CLIENT (Vercel) AVANT, ou dans la minute qui suit.
