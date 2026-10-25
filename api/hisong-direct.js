// Relais Vercel → Edge Function `hisong-direct` (vente directe au showroom du
// micro Hisong). Même motif que muling-order.js : serveur à serveur, filtre par
// liste EXPLICITE (tout champ non listé ici est perdu).
// Aucune dépendance npm.
// ⚠️ Corps Vercel limité à 4,5 Mo : le formulaire borne le fichier à 3 Mo (base64 ≈ ×1,37).

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
    // David 25/10/2026 : montant variable au showroom (remise), base et plafond 340 €.
    const amount = Math.round(Number(body.amount) * 100) / 100
    if (!Number.isFinite(amount) || amount <= 0 || amount > 340) {
      res.status(400).json({ error: 'invalid_amount' })
      return
    }
    const headers = { apikey: ANON, Authorization: `Bearer ${ANON}`, 'Content-Type': 'application/json' }
    if (process.env.SITE_LEAD_TOKEN) headers['x-site-token'] = process.env.SITE_LEAD_TOKEN
    const r = await fetch(`${SUPABASE_URL}/functions/v1/hisong-direct`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email,
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        // David 24/10/2026 : au showroom, seulement micro + RX Plus (pas de micro seul).
        pack: 's1RxPlus',
        quantity: 1, // 1 micro par réservation
        amount,
        message: body.message,
        termsAccepted: body.termsAccepted === true,
        newsOptIn: body.newsOptIn === true,
        lang: body.lang || 'fr',
        // v2 : preuve de paiement (capture du paiement Stripe), facultative.
        fileBase64: body.fileBase64,
        fileType: body.fileType,
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
