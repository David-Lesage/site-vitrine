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

## ÉTAT ACTUEL — 10/08/2026 — Blog : 7 nouveaux articles + filtre par catégorie

**Contexte** : le blog n'avait plus bougé depuis le 19/07/2026 (dernière vague d'écriture,
`git log src/content/blog/`), alors que l'app a livré ~80 entrées de changelog depuis.
Deux chantiers livrés d'un coup.

### 1. Filtre par sujet sur la liste du blog
- Nouveau champ **`category`** dans le schéma (`src/content.config.ts`) — **obligatoire** :
  un article sans catégorie fait échouer le build (voulu, plutôt qu'une mauvaise case en silence).
- Taxonomie + libellés FR/EN dans **`src/lib/blogCategories.ts`** (8 catégories, slugs neutres) :
  `methode` · `logique` · `acoustique` · `gammes` · `partitions` · `chant` · `neotone` · `communaute`.
- UI : **`src/components/BlogFilter.astro`** (puces `rounded-full` du design system, compteurs,
  `aria-pressed`, lien profond `?c=<slug>`, masquage en `style.display` — PAS la classe `.hidden`,
  qui perdrait contre l'utilitaire `flex` des cartes).
- Les **40 articles existants ont été rétro-catégorisés** un par un (pas deviné depuis le titre).
- La carte de liste affiche désormais le **libellé de catégorie** au lieu du 1er tag ; la page
  d'article affiche une puce catégorie **cliquable** vers `/blog?c=<slug>` (+ ses tags).
- Les `tags` restent libres et ne servent PAS au filtre.

### 2. Sept nouveaux articles (FR + EN = 14 fichiers)
Couvrent ce qui a été livré dans l'app depuis le 20/07, **hors expérimental** :
éditeur de mélodies · Bibliothèque musicale + synchro cloud · barre d'accompagnement + batteur ·
mode Hybride / 2 handpans · les 3 nuances du mineur · Jam Rapide · la partition qui se joue (Pupitre, ×N).
Dates de publication : 27/08 → 20/09 (la cadence du blog date en avance ; le dernier article
existant est daté du 23/08).

**🚫 Volontairement PAS écrits** (vérifié dans `auth/capabilities.ts` + `labo/feature-status.ts`
de l'app) : **Chanter & Jouer** (`cap.singplay` n'est PAS dans les droits Studio — seulement
prof/élève/admin, statut `lab`), Mode Scène (`lab`), Pluie de notes (`lab`), coques sur mesure
(`lab`), Mode Enseignant, Labo, dashboards admin/partenaires, bêta fermée. Règle à garder :
**avant d'écrire sur une fonction, vérifier son statut réel dans le dépôt de l'app.**

### Point à surveiller
La couverture de l'article Hybride réutilise `/images/blog-bottom-coques.webp` (deux coques
côte à côte, capture réelle mais issue de l'affichage « bottom notes »). À remplacer par une
vraie capture du bandeau 🌗 Hybride quand David en aura une.

### ⚠️ node_modules local était cassé
Le nettoyage des fichiers `Icon` (artefacts iCloud, commit `ac760cf`) a supprimé **tous** les
fichiers dont le nom commence par `icon` dans `node_modules` (APFS insensible à la casse) →
le build échouait. Réparé par `rm -rf node_modules && npm install --no-package-lock`, puis
`npm install --no-save --no-package-lock vite@7.3.5 @tailwindcss/vite@4.3.1 tailwindcss@4.3.1`
pour retrouver les versions de `bun.lock` (npm résolvait vite 8 → incompatible avec Tailwind).
`package.json` et `bun.lock` n'ont PAS été touchés. Si ça recasse : refaire ces deux commandes.

---

## ÉTAT ACTUEL — 09/08/2026 — 🐞 CORRIGÉ : emails reçus en source MIME brute

**Symptôme** : la notification « Rendez-vous individuel » arrivait chez David en source MIME
non décodée (`<!doctype html>`, `lang=3d"fr"`, `=e2=80=94`, frontières `--attachment100`
visibles comme du texte).

**Vraie cause** (ce n'était NI le HTML sans partie texte, NI la version de denomailer —
1.6.0 est la dernière publiée) : **denomailer 1.6.0 casse l'en-tête `Subject:`**.
`quotedPrintableEncodeInline()` enveloppe l'objet dans `=?utf-8?Q?…?=` puis lui applique
`quotedPrintableEncode()`, qui insère un **saut de ligne souple `=\r\n` tous les 74
caractères — à l'intérieur de l'en-tête**. Ce CRLF, suivi d'une ligne qui ne commence pas
par une espace, **termine le bloc d'en-têtes** (RFC 5322 §2.2.3) : `MIME-Version`,
`Content-Type: multipart/…`, les frontières et le HTML encodé basculent dans le CORPS.

Déclencheur double : objet **non-ASCII** ET **> 74 caractères** une fois encodé. D'où le
piège qui a fait perdre du temps : le formulaire « rejoindre l'app » marchait très bien
(`Handpan Studio — tu es sur la liste ✨` = 53 car.) alors que c'est **exactement la même
fonction, la même lib et le même appel `.send()`** — seul l'objet, qui embarque le nom du
visiteur, dépassait la limite. `muling-claim-payment` n'envoie que du TEXTE brut et était
touché pareil : ce n'était donc pas un problème de HTML.

**Correctif** : `supabase/functions/_shared/mail.ts` → `mailSubject()`. denomailer ne
réécrit pas un objet déjà 100 % ASCII qui ne commence pas par `=?` : on encode donc
nous-mêmes en mots encodés **RFC 2047 base64** (accents et emoji conservés), avec repli en
ASCII pur en dernier recours. **Tout `subject:` passé à `.send()` doit traverser
`mailSubject()`** — c'est la règle à ne pas oublier en ajoutant un email.

Vérifié par un test réel : 6 des 16 objets réels du dépôt étaient cassés AVANT, 0 après
(harnais qui importe le VRAI encodeur de denomailer). Envoi de bout en bout via
`lesagedavid.fr/api/subscribe` → email reçu et rendu en HTML propre, accents corrects.
Ligne de test supprimée de `site_leads`.

Les **5** Edge Functions qui envoient des emails sont corrigées et redéployées :
`site-lead` (v17), `muling-claim-payment` (v5), `muling-order`, `invite-partner`,
`order-documents`. Toutes sont passées à la disposition imbriquée `<slug>/index.ts` +
`_shared/`. ⚠️ `verify_jwt` à préserver : **false** pour `site-lead`, `muling-order`,
`muling-claim-payment` ; **true** pour `invite-partner`, `order-documents`.

**Reste à faire (non bloquant)** : denomailer encode aussi le CORPS en quoted-printable
avec des hexadécimaux **minuscules** (`=3d`), ce que la RFC 2045 §6.7 interdit. Impact
constaté aujourd'hui : cosmétique (balise `<meta viewport>` légèrement abîmée). Risque réel
en revanche sur une URL contenant `?token=…` (email d'expédition `order-documents`).
Parade propre : passer les corps en `mimeContent` base64 plutôt qu'en `html:` / `content:`.

---

## ÉTAT ACTUEL — 08/08/2026 (voir aussi la section 22/07 plus bas, toujours valable)

### Commande Muling — vrai formulaire déployé
`/micro-muling` a un formulaire de commande en 3 étapes (composant `MulingOrderForm.astro`,
Edge Functions `muling-order` v1 + `muling-claim-payment` v1) :
1. Coordonnées + adresse + quantité → ligne dans `affiliate_sales` (`partner='muling'`,
   devise USD, prix -5% appliqué). 3 emails partent (client, David, **Muling à chaque
   commande**).
2. Écran de paiement : **IBAN de Muling affiché** (dérogation assumée à la règle « pas
   d'IBAN sur la page de vente », validée par David le 08/08 pour ce cas précis) + dépôt
   d'une preuve de virement (image/PDF, 5 Mo max) dans le bucket privé `muling-proofs`.
3. Écran de remerciement — Muling reprend la main pour l'expédition.

Le fabricant n'a plus AUCUN lien cliquable sur `/micro-muling` (David : éviter l'achat en
direct). Prix remisé mis en avant partout (hero, prix, boutique).

**Accès partenaire (RLS backend fait, UI à construire côté app)** : table
`partner_accounts` + vue `partner_orders` + `my_partner_scope()` — un partenaire connecté
ne voit que ses propres lignes, écriture limitée à `fulfillment_status`/`tracking_number`/
`admin_note`. Brief pour l'écran :
`NEOTONE STUDIO/NEOTONE 1er mai 2026/BRIEF-partenaire-muling-dashboard.md`.
⚠️ Compte Muling (`85846599@qq.com`) **pas encore créé** dans Supabase Auth — procédure
dans le brief.

Reliquat sans conséquence : un fichier de test (68 octets) reste dans le bucket
`muling-proofs` — la suppression directe des objets Storage est bloquée par Supabase
(protection anti-perte), la ligne `affiliate_sales` associée, elle, est bien supprimée.

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

### 10/08/2026
- Blog : filtre par catégorie (8 sujets, FR/EN, lien profond `?c=`) + 40 articles existants
  rétro-catégorisés + 7 nouveaux articles bilingues sur les fonctions livrées depuis le 19/07.
- Écarté volontairement du blog : tout ce qui est `experimental` / `lab` côté app
  (Chanter & Jouer, Mode Scène, Pluie de notes, coques sur mesure, Enseignant, Labo, admin).
- Réparation de `node_modules` (fichiers `icon*` supprimés par le nettoyage iCloud).

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
