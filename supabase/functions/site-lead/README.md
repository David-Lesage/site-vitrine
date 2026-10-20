# Edge Function `site-lead` — source de vérité

Cette fonction vit dans le projet Supabase **`zqcuhnjjrgmybftppkcl`** (Handpan Studio),
mais **son code appartient au site vitrine**. Elle est ici pour qu'elle cesse d'être un
fantôme : jusqu'au 22/07/2026 elle n'existait que déployée, dans aucun dépôt — ce qui a
provoqué une perte de données silencieuse (voir plus bas).

## Qui écrit quoi (règle de partage avec le dépôt de l'app)

| Surface | Propriétaire |
|---|---|
| ce dépôt (`site-vitrine`, y compris `api/*`) · EF `site-lead` · table `site_leads`, vues et policies CRM | **session site vitrine** |
| dépôt de l'app · EF `app-lead` · `auth/admin-users-panel.ts` · écran de connexion | **session app** |

`app-lead` (app) **relaie vers** `site-lead` (ici). Les deux écrivent dans la même table
`public.site_leads`. Leurs **allowlists doivent rester identiques** :

```
has_handpan   : yes | no | planning
usage_type    : personal | teacher | both | maker
handpan_type  : acoustic | electronic | both      (seulement si has_handpan = yes)
personal_goal : learn | compose | teach           (seulement si usage_type = personal)
```

**30/08/2026 — `personal_goal` n'est plus une question, c'est une dérivation.** Le
formulaire du site ne pose plus « Pour quoi faire ? » (alignement sur la refonte de l'app
du 28/08) : la case « Pour moi — apprendre, jouer, composer » le dit déjà. Le client envoie
désormais **`personalGoals` (liste)** — `["learn","compose"]`, plus `"teach"` si la case
« Pour enseigner » est cochée aussi — et la fonction la stocke **jointe par des virgules**,
exactement comme `app-lead`. L'ancien champ **`personalGoal` (chaîne) reste accepté** : une
page encore en cache chez un visiteur ne doit pas perdre sa réponse.

Différence assumée : `app-lead` **rejette** (400) une réponse incohérente ; `site-lead`
la **met à null**. C'est la porte d'entrée publique du site — perdre un contact sur un 400
coûterait plus cher qu'une sous-réponse manquante.

## Les deux consentements (17/08/2026) — ne jamais les fusionner

Tous les formulaires du site portent **deux** cases, et elles ne disent pas la même chose :

| Case | Obligatoire ? | Champ envoyé | Colonnes écrites |
|---|---|---|---|
| J'accepte les conditions générales | **oui** | `termsAccepted` | `terms_accepted_at` + `terms_version` |
| Je veux être informé des prochaines dates et des nouveautés | **non**, jamais pré-cochée | `newsOptIn` | `news_opt_in` + `news_opt_in_at` |

Accepter les conditions générales ne vaut **pas** accord pour recevoir de la prospection :
c'est `news_opt_in` — et lui seul — qui autorise à écrire à quelqu'un pour autre chose que
sa demande. Fusionner les deux cases viderait la seconde de sa valeur juridique.

`false` est bien enregistré (ce n'est pas la même chose qu'une absence de réponse), et une
seconde soumission sans cocher **retire** le consentement : ça échoue dans le bon sens.

## Le droit à l'image (19/08/2026) — PAS de troisième consentement

Une question à trois boutons radio (`imageConsent` : `yes` / `blurred` / `no`) a été
construite le 19/08/2026, puis **retirée le jour même** sur décision de David :

> « ajoute aux conditions générales **sans rajouter de boutons supplémentaires** ; les gens
> sont censés lire, s'ils ne le font pas c'est leur responsabilité, mais je n'ai pas envie
> d'alourdir le formulaire. »

Conséquences, à ne pas défaire par erreur :

- **Aucun champ `imageConsent`** n'est envoyé par `BookingForm.astro`, ni relayé par
  `api/subscribe.js`, ni lu ici. Ne pas le réintroduire sans une demande explicite de David.
- ⚠️ **Les colonnes `image_consent` et `image_consent_at` existent toujours** sur
  `public.site_leads` (text + timestamptz, nullable, ajoutées le 19/08/2026). Elles restent
  **vides**. 🚨 **NE PAS les supprimer** : un `DROP COLUMN` est interdit ici, et elles
  resserviront telles quelles si David change d'avis. Une colonne vide ne coûte rien.
- 🚨 Un `image_consent` NULL **ne vaudra jamais accord**. La règle réelle est désormais
  écrite dans les **conditions générales** (section « Photos et vidéos prises sur place » de
  `src/i18n/dict.ts` / `en.ts`) : David floute les visages par défaut, et il suffit de le lui
  dire sur place ou d'écrire à `contact@lesagedavid.fr` pour s'y opposer — ou pour accepter
  d'apparaître à visage découvert — avant comme après publication.

⚠️ `TERMS_VERSION` doit rester identique dans les **trois** endroits : ici,
`muling-order/index.ts`, et `terms.version` de `src/i18n/dict.ts` / `en.ts`.
Valeur en vigueur : **`2026-08-19`** (l'ajout de la finalité « photos et vidéos » aux
conditions générales, validé par David).

## Déployer

Pas de CLI configurée ici : le déploiement passe par l'outil Supabase MCP
(`deploy_edge_function`, `verify_jwt: false`). **Toujours redéployer depuis CE fichier**,
jamais depuis une copie de travail — et le recommiter dans la foulée.

## Incident du 22/07/2026 — à ne pas reproduire

Deux sessions ont travaillé en parallèle sur la jonction site ↔ app. L'une a ajouté trois
questions au formulaire (`handpanType`, `personalGoal`, `wantsBeta`) et le profil `maker` :
migration `0019` appliquée, `api/subscribe.js` mis à jour, `app-lead` mise à jour. Mais
`site-lead`, sans source dans aucun dépôt, est restée en arrière — et c'est elle qui écrit
en base. Résultat : **les quatre champs étaient jetés silencieusement en production**.

Deux causes, deux garde-fous :

1. **Pas de source ⇒ personne ne la met à jour.** → ce dossier.
2. **Un commit ne déploie rien.** Le site est déployé par `npx vercel --prod --yes`, jamais
   par `git push`. Les changements sont restés commités mais absents de la prod pendant
   des heures. → toujours builder + déployer + **tester en base** après un changement de
   formulaire.

Test de bout en bout (à refaire après toute modification du formulaire) :

```bash
curl -s -X POST https://lesagedavid.fr/api/subscribe -H 'Content-Type: application/json' \
  -d '{"email":"verif@exemple.fr","firstName":"Verif","source":"beta-waitlist",
       "hasHandpan":"yes","handpanType":"acoustic","usageType":"personal",
       "personalGoal":"compose","wantsBeta":true,"motivation":"x","lang":"fr"}'
```

puis vérifier en SQL que les colonnes sont bien remplies, et supprimer la ligne de test.
