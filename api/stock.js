// Fonction serverless Vercel (runtime Node) — relaie en direct le stock des
// Neotone depuis le Google Sheet de David, via son Apps Script publié
// (scripts/google-apps-script/stock-public.gs). Même principe que api/prices.js :
// appelée côté serveur (pas de contrainte CORS), le navigateur interroge
// /api/stock en same-origin au chargement de /le-neotone.
//
// Réponse : tableau au format de `normalizeStock()` (src/lib/stock.ts) :
//   [{ partner:'neotone', model:'one'|'mutant', wood:'frene'|…, status:'disponible'|'en_transit', expected_arrival_on:'AAAA-MM-JJ'|null }]
//
// Choix des codes de réponse (documentés ici, appliqués par la page) :
//   · URL non configurée (constante vide, pas de variable d'env.) → 200 + []
//     C'est un état NORMAL et connu (« pas de source ») : la page retire tout
//     affichage de stock et ne grise rien.
//   · Apps Script injoignable, trop lent (> 8 s), réponse illisible ou erreur
//     signalée par le script → 502. La page garde alors ce qui a été figé au
//     build, sans rien inventer : une panne passagère de Google n'efface pas
//     un stock affiché quelques minutes plus tôt, et n'en crée pas non plus.
//
// L'URL et la transformation viennent d'un module partagé avec le build
// (une seule implémentation, testée par scripts/test-stock-source.mjs).

import { fetchSheetStock, resolveStockScriptUrl } from '../src/lib/stockSource.js'

export default async function handler(req, res) {
  if (req.method && req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD')
    res.status(405).json({ error: 'method_not_allowed' })
    return
  }

  const url = resolveStockScriptUrl(process.env)
  if (!url) {
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
    res.status(200).json([])
    return
  }

  try {
    const rows = await fetchSheetStock(url)
    // Cache CDN 1 min (+ stale-while-revalidate 5 min) : une modification du
    // Sheet apparaît sur le site en ~1 min, sans redéploiement, et l'Apps
    // Script n'est pas appelé à chaque visite.
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
    res.status(200).json(rows)
  } catch (err) {
    // Cache très court sur l'erreur : on ne martèle pas Google pendant une panne.
    res.setHeader('Cache-Control', 's-maxage=15')
    res.status(502).json({ error: 'upstream' })
  }
}
