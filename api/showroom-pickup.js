// Relais Vercel → Edge Function `showroom-reservation` (POST action 'pickup').
// Le client propose une date + un horaire de retrait au showroom après avoir
// déposé sa preuve de paiement (Muling ou Hisong). Filtre par liste explicite.
const SUPABASE_URL = 'https://zqcuhnjjrgmybftppkcl.supabase.co'
const ANON = 'sb_publishable_turahpl0xi-qKN6jmG3yBg_tqpVZbtx'

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method_not_allowed' }); return }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
    const p = body.pickup || {}
    const headers = { apikey: ANON, Authorization: `Bearer ${ANON}`, 'Content-Type': 'application/json' }
    if (process.env.SITE_LEAD_TOKEN) headers['x-site-token'] = process.env.SITE_LEAD_TOKEN
    const r = await fetch(`${SUPABASE_URL}/functions/v1/showroom-reservation`, {
      method: 'POST', headers,
      body: JSON.stringify({
        action: 'pickup', saleId: String(body.saleId || ''), email: String(body.email || ''),
        pickup: { kind: p.kind === 'showcase' ? 'showcase' : p.kind === 'onsite' ? 'onsite' : 'custom', date: String(p.date || ''), time: String(p.time || ''), note: String(p.note || '').slice(0, 500), place: p.place === 'showcase-paris' || p.place === 'other' ? p.place : '', placeText: String(p.placeText || '').slice(0, 120) },
      }),
    })
    const data = await r.json().catch(() => ({}))
    if (!r.ok) { res.status(r.status === 400 || r.status === 404 ? r.status : 502).json({ error: data.error || 'upstream' }); return }
    res.status(200).json({ ok: true })
  } catch {
    res.status(500).json({ error: 'server_error' })
  }
}
