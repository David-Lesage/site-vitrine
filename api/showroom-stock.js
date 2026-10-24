// Relais Vercel → Edge Function `showroom-reservation` (GET ?action=stock).
// Nombre de micros Muling / Hisong au showroom, en temps réel depuis
// l'inventaire de l'app (stock_levels). Lecture seule, cache 60 s.
const SUPABASE_URL = 'https://zqcuhnjjrgmybftppkcl.supabase.co'
const ANON = 'sb_publishable_turahpl0xi-qKN6jmG3yBg_tqpVZbtx'

export default async function handler(req, res) {
  if (req.method && req.method !== 'GET' && req.method !== 'HEAD') {
    res.status(405).json({ error: 'method_not_allowed' })
    return
  }
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 6000)
    const r = await fetch(`${SUPABASE_URL}/functions/v1/showroom-reservation?action=stock`, {
      headers: { apikey: ANON, Authorization: `Bearer ${ANON}` }, signal: ctrl.signal,
    })
    clearTimeout(t)
    const data = await r.json().catch(() => null)
    if (!r.ok || !data) { res.status(502).json({ error: 'upstream' }); return }
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120')
    res.status(200).json({ muling: Number(data.muling) || 0, hisong: Number(data.hisong) || 0, at: data.at })
  } catch {
    res.status(502).json({ error: 'upstream' })
  }
}
