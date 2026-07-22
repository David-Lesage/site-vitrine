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
- **App (dépôt voisin) v83** : panneau « Comptes & accès » avec colonnes triables + fenêtre
  élargie. Commité et poussé, **PAS déployé** (voir file d'attente).

### 🔴 À FAIRE — bloqué sur David
- **Donner les prochaines dates de showcase.** La seule date de `src/data/site.ts` →
  `agendaEvents` est le **19/07/2026, déjà passée**. Le calendrier affiche donc l'état vide.
  Ajouter une date = éditer ce fichier **+ redéployer** (elles ne sont pas en base).
- **Photos Muling** : 11 images produit (`HMP2详情01-10`, `HMP2主图01`) à récupérer.
  ⛔ EXCLURE `德国帐户.png` et `香港帐户.jpg` — coordonnées bancaires.
- **Blog phase 2** : ~12 captures d'écran de l'app à faire par David pour enrichir les articles.

### File d'attente
1. **Déployer l'app** (v83) — ⚠️ `vite.config.ts` et `.claude/launch.json` sont modifiés non
   commités par la session app : un `npx vercel --prod` embarquerait ces changements.
   Demander le feu vert explicite de David et vérifier `git rev-list --left-right --count origin/master...HEAD` = `0 0`.
2. **Écran CRM dans le dashboard** — spec complète dans
   `~/CLAUDE/NEOTONE STUDIO/NEOTONE 1er mai 2026/BRIEF-crm-contacts-site.md`
   (4 écrans : boîte de réception, fiche contact, mes tâches, avant un showcase).
3. **Gérer les dates de showcase depuis le dashboard** (table `showcase_events` + lecture live)
   au lieu du code — chantier proposé, pas validé.
4. **Brevo** : centralisation des contacts + newsletter RGPD (en attente que David ait du temps).

### Identifiants utiles (rien de secret ici)
- Supabase : projet **`zqcuhnjjrgmybftppkcl`** (Handpan Studio). Clé publiable du site dans `api/subscribe.js`.
- EF `site-lead` : `verify_jwt = false`, protégée par `SITE_LEAD_TOKEN` (Vercel + Supabase).
- App : `https://play.handpanstudio.app` · site : `https://lesagedavid.fr`.

---

## Journal

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
