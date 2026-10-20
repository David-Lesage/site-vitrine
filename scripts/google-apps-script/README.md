# Google Apps Script — stock public des Neotone (+ écriture des cases violettes)

`stock-public.gs` publie, en lecture seule, les Neotone **disponibles** ou **en transit** du Google Sheet de commandes (onglet « Orders Total ») : modèle, bois, statut et dates d'expédition. Aucune donnée client (nom, e-mail, adresse, téléphone, n° de série) ni prix ne sort.

## Mise en route (David, une seule fois)

1. https://script.google.com → **Nouveau projet** (projet autonome, pas lié au Sheet partagé avec Neotone).
2. Coller le contenu de `stock-public.gs` dans `Code.gs`, enregistrer.
3. Facultatif : exécuter `testerLocalement` (autoriser l'accès au Sheet) et relire le JSON dans le journal.
4. **Déployer → Nouveau déploiement → Application Web** · Exécuter en tant que : **Moi** · Accès : **Tout le monde**.
5. Copier l'URL (`…/exec`) dans `src/lib/stockSource.js`, constante `STOCK_SCRIPT_URL` (ou variable d'environnement Vercel `STOCK_SCRIPT_URL`), puis redéployer le site.

Pour modifier le script ensuite sans changer d'URL : **Gérer les déploiements → crayon → Nouvelle version**.

## Chaîne côté site

- `src/lib/stockSource.js` : URL + traduction des valeurs du Sheet (`sheetToStockRows`), testée par `node scripts/test-stock-source.mjs`.
- `api/stock.js` : relais `/api/stock` (cache CDN 60 s), lu par la page au chargement.
- `src/lib/stock.ts` : lecture au build + rendu des blocs de la page `/le-neotone`.

URL vide ou script injoignable : la page n'affiche aucun stock et ne grise aucun modèle.

---

## Écriture des cases violettes — `doPost` (10/10/2026)

Même projet Apps Script, **même URL `/exec`**. `doGet` (stock) est inchangé.
`doPost` écrit, pour UNE vente, les cases violettes de l'onglet « Orders Total ». Il est
appelé par l'app (EF `send-sale-to-partner`, après le clic de David « Envoyer à Neotone »),
**jamais par un navigateur ni par le site**.

### Mise en route (David, une fois — via Chrome sur contact@lesagedavid.fr)

1. Ouvrir le projet « Stock public Neotone » → remplacer `Code.gs` par ce `stock-public.gs`, enregistrer.
2. **Paramètres du projet (roue dentée) → Propriétés du script → Ajouter** :
   `WRITE_SECRET` = une longue chaîne aléatoire (≥ 32 caractères). Ne l'écrire nulle part
   dans un dépôt : elle va seulement dans les secrets Supabase de l'app (par ex.
   `NEOTONE_SHEET_WRITE_SECRET`). Sans cette propriété, `doPost` répond `not_configured`.
3. **Déployer → Gérer les déploiements → crayon → Version : « Nouvelle version » → Déployer.**
   ⚠️ PAS « Nouveau déploiement » (l'URL changerait et le stock du site tomberait).
   Google redemande l'autorisation (écriture dans le Sheet) dans une fenêtre séparée : à cliquer par David.
4. Premier essai : un appel `dryRun: true` sur un n° de série réel, AVEC la session APP.

### Contrat de l'appel (pour la session APP)

`POST <URL /exec>` · `Content-Type: application/json` (ou `text/plain`) · suivre les redirections
(Apps Script répond par une 302 vers `script.googleusercontent.com` : `fetch` la suit par défaut).
Le statut HTTP est **toujours 200** : lire `ok` dans le JSON.

Entrée :

```json
{
  "secret": "<WRITE_SECRET>",
  "serial": "843",
  "customerDiscount": 0.07,
  "name": "Prénom Nom",
  "company": "Raison sociale (facultatif, société seulement)",
  "vat": "FR12345678901",
  "billingAddress": "1 rue X\n75020 Paris\nFrance",
  "email": "client@example.com",
  "phone": "+33 6 12 34 56 78",
  "dryRun": true
}
```

- Obligatoires : `secret`, `serial`, `name`, `email`, `billingAddress`. Les autres sont facultatifs
  (un champ vide n'est pas écrit).
- `serial` : comparé EXACTEMENT (espaces de bord retirés) à la colonne « Serial Nr. » ; il faut
  **une seule** ligne.
- `customerDiscount` : **fraction** entre 0 et 0,5 (`0.07` = 7 %), écrite en nombre (la colonne
  « Price to customer » la reprend dans sa formule).
- `billingAddress` : lignes séparées par `\n` (rue / CP ville / pays).

Ce qui est écrit (colonnes repérées par leur **en-tête**, jamais par leur lettre) :

| En-tête | Valeur |
|---|---|
| Customer discount | `customerDiscount` (nombre) |
| Name of the Customer | `name` |
| Valid EU VAT Number | `vat` (seulement s'il est fourni) |
| Billing adress of the customer | **bloc multi-lignes** : `Prénom Nom` (ou `Raison sociale — Prénom Nom`) / lignes de `billingAddress` / `VAT: <n°>` si fourni / `Tel: <téléphone>` si fourni |
| Email of the Customer | `email` |

Décision de David (10/10/2026) : **pas de colonne « Phone »**. Ses mots : « il faudra mettre le numéro
dans la colonne W "Billing adress of the customer", il y a déjà des infos d'anciens clients. Tout dans
la même case : nom, prénom, adresse, numéro de TVA si applicable ».
Les textes sont écrits précédés d'une apostrophe (invisible) : `+33…` ou `=…` restent du texte.

Sorties :

```json
{ "ok": true, "dryRun": true, "columns": ["Customer discount", "Name of the Customer", "…"],
  "preview": { "Name of the Customer": "Prénom Nom", "…": "…" }, "written": [] }
{ "ok": true, "dryRun": false, "columns": [...], "preview": {...}, "written": [...mêmes colonnes] }
{ "ok": false, "error": "already_filled", "alreadyFilled": ["Email of the Customer"] }
{ "ok": false, "error": "missing_header", "missing": ["Serial Nr."] }
```

Autres `error` : `invalid_json`, `not_configured`, `forbidden` (secret faux), `busy` (verrou non
obtenu en 15 s), `missing_tab`, `serial_not_found`, `serial_ambiguous`, `missing_field: …`,
`invalid_email`, `invalid_discount`, `write_failed`.

Règles : **jamais d'écrasement** — si UNE seule des cases à écrire est déjà remplie, RIEN n'est écrit
sur la ligne (`already_filled` + liste des en-têtes concernés). Verrou `LockService` (deux envois
simultanés ne se mélangent pas). La réponse ne contient aucune donnée du Sheet : seulement des noms de
colonnes, et dans `preview` les valeurs **envoyées par l'appelant**.

Tests purs (sans Google) : `node scripts/test-achat-neotone.mjs` (`planCustomerWrite_`).
