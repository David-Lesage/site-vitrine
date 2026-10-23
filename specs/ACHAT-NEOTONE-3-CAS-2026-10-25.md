# Achat d'un Neotone : les 3 cas (construit le 25/10/2026, rien de déployé)

Processus validé par David le 25/10. Complète `PROCESSUS-ACHAT-NEOTONE-REEL-2026-10-25.md` et `ACHAT-NEOTONE-PROCEDURE-2026-10-09.md`.
Tout est **livré éteint** : aucun mail ne part chez Neotone, rien n'est écrit dans le Sheet tant que les interrupteurs restent à `false`.

## 1. Schéma

```
                      Calculateur /neotone (mode showroom −7 %)
                 ┌───────────────┬───────────────────┬─────────────────────┐
             en stock         en route              ni l'un ni l'autre
       « Acheter au showroom »  « Faire la demande »   « Faire la demande »
                 │                   │                     │
        FORMULAIRE COMPLET (même formulaire pour les 3 cas) :
        prénom, nom, téléphone*, e-mail, facturation complète, TVA (n° ou « je n'en ai pas »),
        date souhaitée de retrait à Paris*, encart « paiement avant la venue »
                 │                   │                     │
             CAS 1               CAS 2                  CAS 3
                 │                   │                     ├─► mail AUTO à Neotone (délais) ⛔ OFF
                 │                   │                     │   (modèle, bois, date — aucune donnée client)
  mail David : [Lancer la      mail David :           mail David :
  facturation]  [Annuler]      [Répondre au client]   [Répondre au client]
                 │                   │  date pré-remplie   │  date écrite par David
                 │                   │  (colonne L)        │  (d'après Neotone)
                 │                   ▼                     ▼
                 │        mail client « Ton Neotone sera au showroom vers le <date>. Ça te convient ? »
                 │                      [Oui, je confirme]  (David en copie)
                 │                             │
                 │                   mail David « X confirme » [Lancer la facturation] [Annuler]
                 ▼                             ▼
         Page « Lancer la facturation » : n° de série choisi dans la LISTE (Apps Script privé)
                 │
                 ├─► mail de facturation à neotone@digitalhandpan.com (David + client en copie) ⛔ OFF
                 ├─► écriture des cases violettes du Sheet ⛔ OFF
                 └─► mail David « Facturation lancée » [Marquer payée] [Marquer remise] [Annuler]
                                 │
         Neotone facture (szamlazz, en semaine) → le client paie → David marque « payée », puis « remise » le jour J
```

## 2. États en base (`site_leads.purchase_state`)

| État | Posé par | Quand |
|---|---|---|
| `new` | site-lead | dépôt du formulaire (cas 1, 2, 3) |
| `date_proposed` | neotone-purchase-action `reply` | David envoie une date (chaque nouvelle date : `neotone_proposed_rev` + 1) |
| `client_confirmed` | `confirm` | le client clique « Oui, je confirme » |
| `invoicing` | `invoice` | mail de facturation parti chez Neotone (interrupteur ON) |
| `paid` | `paid` | David clique « Marquer payée » |
| `delivered` | `delivered` | David clique « Marquer remise » (possible depuis `paid` ou `invoicing`) |
| `cancelled` | `cancel` | David annule (depuis tout état avant `paid`) |

Chaque action n'est permise que depuis certains états et l'écriture est conditionnée à l'état lu : deux clics ne font qu'une action, un seul mail part. `invoice` depuis `new` n'est permis qu'au cas 1 ; `reply` n'existe pas au cas 1. Journal de chaque action dans `neotone_purchase_log`.

## 3. Les liens « en un clic »

Tous pointent vers **`https://lesagedavid.fr/neotone-suivi/?l=fr|en&t=<jeton>`** (page autonome, `noindex`, hors sitemap). La passerelle Supabase ne sert pas de HTML (voir `confirm-lesson-slot`), d'où une page du site qui appelle l'Edge Function `neotone-purchase-action` en `POST`. **Ouvrir la page ne fait rien** : elle affiche la demande, l'action n'a lieu qu'au clic sur son bouton (un aperçu de messagerie ne déclenche donc rien).

Jeton : `<leadId>.<action>.<rev>.<expiration>.<HMAC-SHA256>` (`_shared/purchase-token.ts`, même patron que `lesson-token.ts`, domaine `neotone-purchase.v1`). Il ne vaut que pour SA demande et SON action. Clé `NEOTONE_PURCHASE_SECRET` (repli sur les secrets existants).

| Lien | Dans quel mail | Ce que fait la page | Validité |
|---|---|---|---|
| Lancer la facturation chez Neotone | David : dépôt cas 1 ; « X confirme » cas 2/3 | liste des n° de série (pièces « Available » / « In transit » de ce modèle et de ce bois) ; un n° hors liste est refusé ; sans liste, saisie à la main avec avertissement | 60 j |
| Répondre au client | David : dépôt cas 2/3 | date pré-remplie (dernière proposition, sinon colonne L de la pièce en route, sinon la date vue par le client), en lecture seule ; « Proposer une autre date » la rend modifiable ; « Envoyer cette date au client » | 60 j |
| Oui, je confirme | client : proposition de date | page FR/EN, ne montre que le prénom, l'instrument et la date ; lien caduc dès qu'une nouvelle date est proposée | 30 j |
| Marquer payée / Marquer remise | David : « Facturation lancée » | change l'état, aucun mail | 90 j |
| Annuler la demande | tous les mails de David | état `cancelled`, aucun mail | 60-90 j |

## 4. Les mails (objet et contenu)

Captures de chaque mail : `/private/tmp/claude-501/-Users-davidlesage-CLAUDE/d7f07e1f-7686-41e9-a369-7f4bc8e9d723/scratchpad/achat-3-cas/mail-*.png`.

| # | Cas | De → à | Objet | Contenu |
|---|---|---|---|---|
| 1 | 1 | site → client (FR/EN) | David Lesage — ta demande est bien reçue ✨ | étapes : transmission à Neotone avec le n° de série, paiement AVANT la venue, en semaine, szamlazz.hu / spams, aucun paiement au showroom, Neotone remis déjà payé, preuve de paiement sur demande ; récapitulatif chiffré ; facturation |
| 2 | 1 | site → David | [Site] Acheter un Neotone au showroom (−7 %) — Prénom Nom | fiche complète + « Retrait souhaité » + « Parcours d'achat : cas 1 » + bloc [Lancer la facturation chez Neotone] [Annuler] |
| 3 | 2, 3 | site → client (FR/EN) | David Lesage — ta demande pour un Neotone est transmise ✨ | cas 2 : « en route, je reviens vers toi avec la date, un clic suffira » ; cas 3 : « je demande les délais à Neotone » ; date de retrait ; « Comment se passe le paiement » ; facturation à vérifier |
| 4 | 2, 3 | site → David | [Site] Achat d'un Neotone pas au showroom (en route ou à fabriquer) — Prénom Nom | fiche + ligne « Mail à Neotone » (cas 2 : « pièce en route, Neotone ne reçoit rien ») + bloc [Répondre au client] [Annuler] |
| 5 | 3 | David → neotone@ (cc David), anglais | Paris Hub — lead time for a Neotone¹ (10 notes) in walnut | texte validé du 25/10 + « The customer would like to pick it up in Paris around <date>. » Aucune donnée du client. ⛔ `NEOTONE_STOCK_REQUEST_EMAIL_ENABLED` |
| 6 | 2, 3 | David → client (cc David), FR/EN | Ton Neotone : au showroom vers le <date> ? | « Ton Neotone (<modèle> en <bois>) sera au showroom vers le <date>. Ça te convient ? » [Oui, je confirme] ; « Une autre date ? Réponds à cet email » ; paiement ; récapitulatif |
| 7 | 2, 3 | site → David | [Neotone] Prénom Nom confirme la date (<date>) — à facturer | [Lancer la facturation chez Neotone] [Annuler] + récapitulatif |
| 8 | 1, 2, 3 | David → neotone@ (cc David + client), anglais | Paris Hub — invoice request — Neotone #<série> (<modèle>, <bois>) — Nom – Société | « The sale of Neotone #977 is confirmed… » ; n° de série, modèle, bois, vente directe / retrait au Hub / −7 %, prix catalogue HT, remise, prix client HT, TVA (autoliquidation si n° intracom., sinon taux du pays), total à facturer, client, nom de facturation, adresse, n° TVA (ou « none »), SIRET, e-mail, téléphone ; en pied, une ligne pour le client (FR/EN selon sa langue) : szamlazz.hu, spams, preuve de paiement sur demande. ⛔ `NEOTONE_INVOICE_EMAIL_ENABLED` (OFF : aperçu à David seul, objet « [APERÇU — non envoyé à Neotone] », état inchangé) |
| 9 | 1, 2, 3 | site → David | [Neotone] Facturation lancée — #<série> — Prénom Nom | statut du mail à Neotone, résultat de l'écriture du Sheet, [Marquer payée] [Marquer remise] [Annuler] |

Le texte exact est dans `supabase/functions/_shared/neotone-purchase.ts` (mails 6 à 9 et bloc d'actions) et `site-lead/` (1 à 5).

## 5. Le Sheet (Apps Script `scripts/google-apps-script/stock-public.gs`)

Sortie publique **inchangée** (toujours sans n° de série). Ajouts, protégés par la propriété de script `PRIVATE_KEY` :
- `GET ?mode=private&key=…` → `{ pieces: [{ serial, model, wood, status, arrivalText }] }`, lignes Neotone « Available » ou « In transit … » seulement. Appelé par l'Edge Function, jamais par le navigateur.
- `POST { key, action: 'write_sale', serial, fields }` → écrit dans la ligne dont la colonne n° de série vaut `serial`. **Ne remplace jamais une case non vide** : un seul conflit et rien n'est écrit (réponse `conflict` + liste). Verrou `LockService`.

En-têtes visés (ligne 1, repérés par leur nom, insensibles à la casse et aux espaces) :

| En-tête | Ce qui y est écrit |
|---|---|
| `Customer discount` | `7%` |
| `Name of the Customer` | `Prénom Nom – Raison sociale` |
| `Valid EU VAT Number` | le n° intracom., ou `none` |
| `Billing adress of the customer` (orthographe du Sheet) | nom de facturation s'il diffère, raison sociale, adresse, CP ville, pays, `Phone: …`, `VAT: …` (décision du 10/10 : tout dans cette case) |
| `Email of the Customer` | e-mail du client |

⚠️ **À vérifier par David** : l'en-tête exact de la colonne des n° de série. Le script prend le premier trouvé parmi `Serial number`, `Serial No`, `Serial`, `SN`, `S/N`, `Number`, `No`, `#` (constante `SERIAL_HEADERS`, à corriger sinon). « Sale status » (colonne L) n'est jamais modifié.

## 6. Interrupteurs et limite

| Interrupteur | Fichier | Livré | Effet à OFF |
|---|---|---|---|
| `NEOTONE_STOCK_REQUEST_EMAIL_ENABLED` | `supabase/functions/site-lead/neotone-stock-request.ts` | `false` | cas 3 : pas de demande de délais à Neotone (la ligne « Mail à Neotone » le dit à David) |
| `NEOTONE_INVOICE_EMAIL_ENABLED` | `supabase/functions/_shared/neotone-purchase.ts` | `false` | « Lancer la facturation » envoie un APERÇU à David seul ; état et Sheet inchangés |
| `SHEET_WRITE_ENABLED` | idem | `false` | rien n'est écrit dans le Sheet |

**Limite de la demande de délais (proposée, à valider)** : un mail par couple modèle + bois dans les 48 h **sauf si le nouveau client veut son instrument plus tôt** que tous ceux déjà demandés dans la fenêtre. Un client moins pressé ne relance pas Neotone (leur réponse vaut aussi pour lui) ; un client plus pressé, si. Colonne absente : rien ne part.

## 7. Migration (non appliquée)

`specs/migration-0189-site-leads-achat-neotone-3-cas.sql`. Elle ajoute à `site_leads`, rien d'autre :
`purchase_state` (text + check des 7 états), `purchase_state_at`, `neotone_stock_state` (check in/transit/out), `neotone_pickup_date` (date), `neotone_arrival_label`, `neotone_price` (jsonb), `neotone_proposed_date` (text), `neotone_proposed_rev` (int, défaut 0), `neotone_proposed_at`, `neotone_client_confirmed_at`, `neotone_serial`, `neotone_invoice_requested_at`, `neotone_paid_at`, `neotone_delivered_at`, `neotone_cancelled_at`, `neotone_purchase_log` (jsonb, défaut `[]`), `neotone_partner_mail_at` (idempotent avec la migration du 25/10) ; deux index partiels. **Aucune policy**, rien d'ouvert à `anon`. Prérequis : `migration-0188` (colonnes `neotone_purchase_mode`, `neotone_wood`, `billing`).

## 8. Mise en ligne, dans l'ordre

1. **Relire** les textes (mails 5, 6, 8 surtout) et la règle de limite §6. Valider la question ouverte : rien du client dans la demande de délais (décision par défaut).
2. **Migrations** (session APP) : `migration-0188` si pas déjà faite, puis `migration-0189`. Sans elles, l'achat au showroom et la demande hors stock **échouent** (les autres formulaires ne sont pas touchés).
3. **Apps Script** (Chrome, compte de David) : coller la nouvelle version de `stock-public.gs` ; vérifier `SERIAL_HEADERS` contre l'en-tête réel ; Propriétés du script → `PRIVATE_KEY` (≥ 32 caractères aléatoires) ; lancer `testerLocalement` (la sortie publique ne doit montrer aucun n° de série) ; Déployer → Gérer les déploiements → crayon → **Nouvelle version** (même URL).
4. **Secrets Supabase** : `STOCK_PRIVATE_URL` (URL /exec), `STOCK_PRIVATE_KEY` (= `PRIVATE_KEY`), `NEOTONE_PURCHASE_SECRET` (≥ 32 caractères, facultatif mais conseillé).
5. **Fonctions** : `supabase functions deploy neotone-purchase-action --no-verify-jwt --project-ref zqcuhnjjrgmybftppkcl`, puis `supabase functions deploy site-lead --project-ref zqcuhnjjrgmybftppkcl` (même réglage JWT qu'aujourd'hui).
6. **Site** : `npx astro build` puis `npx vercel --prod --yes` (le formulaire envoie `pickupDate`, `neotoneStockState`, `neotoneArrival`, `billing.noVat` ; `api/subscribe.js` les relaie ; page `/neotone-suivi/`).
7. **Essai à blanc** avec l'adresse de David comme client : un cas 2, « Répondre au client », confirmer, « Lancer la facturation » → l'aperçu arrive chez David seul.
8. **Allumer**, un par un, après feu vert de David : `NEOTONE_INVOICE_EMAIL_ENABLED`, puis `SHEET_WRITE_ENABLED`, puis `NEOTONE_STOCK_REQUEST_EMAIL_ENABLED` ; redéployer les fonctions concernées après chaque bascule.

## 9. Écarts et limites connus

- La TVA est demandée à toute **société** (n° ou case « je n'en ai pas », bloquant). Un particulier n'a pas la question.
- L'état du stock (cas 2 ou 3) vient de ce que le client a vu dans le calculateur ; David choisit de toute façon le n° de série dans la liste au moment de facturer.
- Changer de n° de série après la facturation n'envoie pas de mail correctif : il faut annuler et écrire à Neotone.
- « Payée » et « remise » se marquent à la main (aucune lecture de la boîte mail).
- Page de suivi : FR pour David, FR/EN pour le client. Un client en espagnol reçoit les mails en français (convention existante de `site-lead`). Textes du site en FR/EN/ES ; `es.ts` est un fichier généré, modifié ici à la main.
- Le mail 1 (cas 1) ne rappelle pas la date de retrait au client (elle est dans le mail de David et en base).

## 10. Vérifications faites (aucun envoi réel)

- Harnais deno, SMTP + Supabase + Apps Script simulés : `/private/tmp/claude-501/-Users-davidlesage-CLAUDE/d7f07e1f-7686-41e9-a369-7f4bc8e9d723/scratchpad/achat-harness/run.ts`, 32 contrôles OK (`achat-3-cas/resume.txt`) : liste de n° filtrée, n° hors liste refusé, double clic refusé, ancien lien de confirmation caduc, vue client sans données de facturation, aucune donnée client dans la demande de délais, limite 48 h par date, jeton modifié refusé, plus rien après annulation.
- `deno check` des deux fonctions, `npx astro build` OK, test du formulaire en navigateur avec faux `/api/stock` (FR bureau, EN 390 px, FR 390 px) et de la page `/neotone-suivi/` (répondre, confirmer en anglais, facturer, lien invalide) : `achat-3-cas/page-*.png`.
