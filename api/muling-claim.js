// Relais Vercel → Edge Function `muling-claim-payment` (dépôt de preuve de
// virement + « J'ai payé »). Même motif que subscribe.js.
// Aucune dépendance npm (bun.lock gelé).

const SUPABASE_URL = 'https://zqcuhnjjrgmybftppkcl.supabase.co'
const ANON = 'sb_publishable_turahpl0xi-qKN6jmG3yBg_tqpVZbtx'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' })
    return
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
    const saleId = String(body.saleId || '').trim()
    const email = String(body.email || '').trim()
    if (!saleId || !email) {
      res.status(400).json({ error: 'missing_fields' })
      return
    }

    const headers = { apikey: ANON, Authorization: `Bearer ${ANON}`, 'Content-Type': 'application/json' }
    if (process.env.SITE_LEAD_TOKEN) headers['x-site-token'] = process.env.SITE_LEAD_TOKEN

    const r = await fetch(`${SUPABASE_URL}/functions/v1/muling-claim-payment`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        saleId, email,
        fileBase64: body.fileBase64,
        fileType: body.fileType,
        lang: body.lang || 'fr',
      }),
    })

    const data = await r.json().catch(() => ({}))
    if (!r.ok) {
      const passThrough = [400, 404].includes(r.status)
      res.status(passThrough ? r.status : 502).json({ error: data.error || 'upstream' })
      return
    }
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: 'server_error' })
  }
}
