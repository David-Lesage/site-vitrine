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
personal_goal : learn | compose                   (seulement si usage_type = personal)
```

Différence assumée : `app-lead` **rejette** (400) une réponse incohérente ; `site-lead`
la **met à null**. C'est la porte d'entrée publique du site — perdre un contact sur un 400
coûterait plus cher qu'une sous-réponse manquante.

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
