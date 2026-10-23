# Mail automatique à Neotone — demande de délais pour un Neotone pas au showroom (25/10/2026)

**État : NON ACTIVÉ.** L'interrupteur `NEOTONE_STOCK_REQUEST_EMAIL_ENABLED` est livré à `false`
(`supabase/functions/site-lead/neotone-stock-request.ts`). Tant que David n'a pas validé ce texte,
rien ne part chez Neotone ; le mail interne à David et la confirmation au client partent normalement.

## Quand il part
Un client clique sur « Faire la demande » dans le calculateur de `/neotone/#calculateur` pour un modèle +
bois absent du showroom (ou en route), puis envoie le formulaire (source `neotone-stock-request`).

## Envoi
- **À** : neotone@digitalhandpan.com
- **Copie** : contact@lesagedavid.fr
- **Répondre à** : contact@lesagedavid.fr
- **De** : l'expéditeur SMTP habituel de `site-lead` (contact@lesagedavid.fr)
- **Limite** : au plus un mail par couple modèle + bois toutes les 48 h (colonne `neotone_partner_mail_at`,
  migration `specs/migration-site-leads-neotone-partner-mail-at.sql`, NON appliquée).
- **Aucune donnée du client** : ni nom, ni e-mail, ni téléphone, ni message. La fonction qui écrit ce mail
  ne reçoit que le modèle et le bois.

## Texte exact (anglais) — exemple : Mutant en acajou

**Sujet :** `Paris Hub — lead time for a Neotone¹ Mutant (19 notes) in mahogany`

> Hello Neotone team,
>
> A customer at the Paris Hub is interested in buying a Neotone¹ Mutant (19 notes) in mahogany. I don’t have this model in this wood in stock at the showroom at the moment.
>
> Could you tell me your current build time for this model and wood, and the delivery time to Paris, so that I can inform my customer?
>
> Thank you very much!
>
> Best regards,
> David Lesage
> Paris Hub — Neotone showroom
> contact@lesagedavid.fr · lesagedavid.fr

Variantes : modèle = `Neotone¹ (10 notes)` ou `Neotone¹ Mutant (19 notes)` ; bois = `ash`, `oak`,
`mahogany`, `cherry`, `walnut` (frêne, chêne, acajou, cerisier, noyer).

## Traduction française (pour David, n'est pas envoyée)

**Sujet :** Paris Hub — délai pour un Neotone¹ Mutant (19 notes) en acajou

> Bonjour l'équipe Neotone,
>
> Un client du Paris Hub souhaite acheter un Neotone¹ Mutant (19 notes) en acajou. Je n'ai pas ce modèle dans ce bois en stock au showroom en ce moment.
>
> Pourriez-vous me donner votre délai de fabrication actuel pour ce modèle et ce bois, ainsi que le délai de livraison jusqu'à Paris, pour que je puisse informer mon client ?
>
> Merci beaucoup !
>
> Bien cordialement,
> David Lesage
> Paris Hub — showroom Neotone
> contact@lesagedavid.fr · lesagedavid.fr

## Pour l'activer (après validation du texte)
1. Appliquer la migration `specs/migration-site-leads-neotone-partner-mail-at.sql` (session APP).
2. Passer `NEOTONE_STOCK_REQUEST_EMAIL_ENABLED` à `true` dans `supabase/functions/site-lead/neotone-stock-request.ts`.
3. Déployer `site-lead`. La notification interne à David indique à chaque demande, ligne « Mail à Neotone »,
   si le mail est parti ou pourquoi il n'est pas parti (interrupteur, limite 48 h, migration absente).

Rendu local (harnais deno, SMTP et Supabase simulés) : captures `mail-*.png` du dossier
`stock-demande/` du scratchpad de la session du 25/10/2026.
