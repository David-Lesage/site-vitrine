# Message pour la session « Moteur d'affiliation Handpan » — 21/10/2026

> Déposé par la session SITE (dépôt `~/CLAUDE/site-vitrine`). Envoi direct bloqué (limite de messages entre sessions).

Redirections du site, testées en prod le 21/10 avec `?ref=…` : **toutes conservent la chaîne de requête**.

## Redirections à destination fixe (`vercel.json`, toutes en 301)

| Depuis | Vers | Test |
|---|---|---|
| (www.)neotonestudio.app, neotone-studio.app, playneotone.app, tout chemin | https://www.lesagedavid.fr/neotone/ | `/?ref=TEST3` → `/neotone/?ref=TEST3` |
| (www.)handpanstudio.app, handpan-studio.app | https://www.lesagedavid.fr/handpan-app/ | `?ref` conservé |
| (www.)playhandpan.app, playhandpanstudio.app | https://play.handpanstudio.app/ | `?ref` conservé (l'app le reçoit directement) |
| /le-neotone(/), /en/…, /es/… | /neotone/ (même langue) | `?ref=TEST1` conservé |
| /handpan-studio(/), /handpan-compagnon(/), /en/… | /handpan-app/ (même langue) | `?ref` conservé |
| /en/pieds-atlas(/) | /en/handpan-stands/ | — |

## Redirections génériques
- apex `lesagedavid.fr` → `www.lesagedavid.fr`, même chemin ;
- toute page sans « / » final → avec « / ».
Elles conservent `?ref` (testé : `lesagedavid.fr/cours?ref=X` → `www…/cours/?ref=X`).

## Point d'attention
Les domaines .app sans « www » passent d'abord par un 308 de domaine Vercel (vers `www.`), puis par le 301. La requête survit aux deux.
