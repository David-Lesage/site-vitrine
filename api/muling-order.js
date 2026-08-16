// Relais Vercel → Edge Function `muling-order`. Même motif que subscribe.js :
// serveur à serveur, la clé n'est jamais exposée au navigateur.
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
    const email = String(body.email || '').trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      res.status(400).json({ error: 'invalid_email' })
      return
    }
    if (body.consent !== true) {
      res.status(400).json({ error: 'missing_consent' })
      return
    }

    const headers = { apikey: ANON, Authorization: `Bearer ${ANON}`, 'Content-Type': 'application/json' }
    if (process.env.SITE_LEAD_TOKEN) headers['x-site-token'] = process.env.SITE_LEAD_TOKEN

    const r = await fetch(`${SUPABASE_URL}/functions/v1/muling-order`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email,
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        country: body.country,
        address: body.address,
        city: body.city,
        postalCode: body.postalCode,
        quantity: body.quantity,
        message: body.message,
        // 🐞 17/08/2026 : `deliveryNote` était envoyé par le formulaire et attendu
        // par l'Edge Function, mais ce relais — qui filtre par liste EXPLICITE —
        // ne le transmettait pas. `affiliate_sales.delivery_note` était donc
        // toujours vide. Exactement le piège documenté dans subscribe.js.
        deliveryNote: body.deliveryNote,
        consent: true,
        // Conditions générales du site — DISTINCT de `consent` ci-dessus, qui est
        // l'accord de transmission des coordonnées à Muling (tiers, Chine).
        termsAccepted: body.termsAccepted === true,
        lang: body.lang || 'fr',
        page: body.page,
      }),
    })

    const data = await r.json().catch(() => ({}))
    if (!r.ok) {
      res.status(r.status === 400 ? 400 : 502).json({ error: data.error || 'upstream' })
      return
    }
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: 'server_error' })
  }
}
