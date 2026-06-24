// Fonction serverless Vercel (runtime Node) — relaie en direct les tarifs Stripe
// depuis l'Edge Function publique get-prices de l'app Neotone Studio.
// Appelée côté serveur → pas de contrainte CORS. Le navigateur interroge cette
// route en same-origin (/api/prices) → les prix se mettent à jour automatiquement
// quand un prix change dans Stripe (dans la limite du cache CDN ci-dessous).

const SUPABASE_URL = 'https://zqcuhnjjrgmybftppkcl.supabase.co'
const ANON = 'sb_publishable_turahpl0xi-qKN6jmG3yBg_tqpVZbtx'

export default async function handler(req, res) {
  try {
    const r = await fetch(`${SUPABASE_URL}/functions/v1/get-prices`, {
      method: 'POST',
      headers: {
        apikey: ANON,
        Authorization: `Bearer ${ANON}`,
        'Content-Type': 'application/json',
      },
      body: '{}',
    })
    if (!r.ok) {
      res.status(502).json({ error: 'upstream', status: r.status })
      return
    }
    const data = await r.json()
    // Cache CDN 2 min (+ stale-while-revalidate) : un changement de prix Stripe
    // se reflète sous ~2 min sans redéploiement, tout en limitant les appels.
    res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate=600')
    res.status(200).json(data)
  } catch (err) {
    res.status(502).json({ error: 'fetch_failed' })
  }
}
