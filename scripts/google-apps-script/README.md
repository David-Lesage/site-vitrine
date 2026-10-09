# Google Apps Script — stock public des Neotone

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
