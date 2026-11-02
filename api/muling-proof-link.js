// Relais Vercel → Edge Function `muling-proof-link` (lien personnel de dépôt et d'annulation,
// reconnaissance d'une commande ouverte). Serveur à serveur : SITE_LEAD_TOKEN n'atteint jamais le
// navigateur. Les opérations admin ne passent pas ici. Aucune dépendance npm (bun.lock gelé).

const SUPABASE_URL = 'https://zqcuhnjjrgmybftppkcl.supabase.co'
const ANON = 'sb_publishable_turahpl0xi-qKN6jmG3yBg_tqpVZbtx'
const OPS = ['recognize', 'resume', 'view', 'deposit', 'cancel']

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' })
    return
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
    if (!OPS.includes(body.op)) {
      res.status(400).json({ error: 'unknown_op' })
      return
    }
    const headers = { apikey: ANON, Authorization: `Bearer ${ANON}`, 'Content-Type': 'application/json' }
    if (process.env.SITE_LEAD_TOKEN) headers['x-site-token'] = process.env.SITE_LEAD_TOKEN
    const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim()
    if (ip) headers['x-client-ip'] = ip

    const r = await fetch(`${SUPABASE_URL}/functions/v1/muling-proof-link`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        op: body.op,
        email: body.email,
        t: body.t,
        lang: body.lang,
        fileBase64: body.fileBase64,
        confirm: body.confirm === true,
      }),
    })
    const data = await r.json().catch(() => ({}))
    if (!r.ok) {
      const passThrough = [400, 404, 409, 413, 429].includes(r.status)
      res.status(passThrough ? r.status : 502).json({ error: data.error || 'upstream' })
      return
    }
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: 'server_error' })
  }
}
