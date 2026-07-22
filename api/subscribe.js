// Fonction serverless Vercel (runtime Node) — relaie les inscriptions du site
// vers l'Edge Function `site-lead` de Supabase (enregistrement + email de
// confirmation). Appel serveur à serveur : pas de contrainte CORS, et la clé
// n'est jamais exposée au navigateur.
//
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

    const headers = {
      apikey: ANON,
      Authorization: `Bearer ${ANON}`,
      'Content-Type': 'application/json',
    }
    // Secret partagé optionnel : à définir dans Vercel ET dans Supabase
    // (SITE_LEAD_TOKEN) pour que seul le site puisse appeler la fonction.
    if (process.env.SITE_LEAD_TOKEN) headers['x-site-token'] = process.env.SITE_LEAD_TOKEN

    const r = await fetch(`${SUPABASE_URL}/functions/v1/site-lead`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email,
        firstName: body.firstName,
        lastName: body.lastName,
        hasHandpan: body.hasHandpan,
        // Sous-question : type de handpan possédé (si hasHandpan = 'yes')
        handpanType: body.handpanType,
        // Déclaration d'intention : casquettes multiples. `usage_type` en est
        // dérivé côté serveur ; `usageType` reste transmis pour les anciens appels.
        usageType: body.usageType,
        roles: body.roles,
        pledgeHonest: body.pledgeHonest === true,
        // Sous-question : objectif (si la casquette « pour moi » est cochée)
        personalGoal: body.personalGoal,
        // Sous-question prof : dimensionne la Licence Enseignant
        studentCount: body.studentCount,
        // Fiche fabricant — alimente le catalogue de mise en relation
        makerCountry: body.makerCountry,
        makerMaxNotes: body.makerMaxNotes,
        makerMetals: body.makerMetals,
        makerPricing: body.makerPricing,
        motivation: body.motivation,
        // Candidature bêta-testeur explicite (motivation obligatoire côté site)
        wantsBeta: body.wantsBeta === true,
        wantsShowcase: body.wantsShowcase === true,
        // Demandes de réservation (showroom, showcase, rendez-vous privé)
        phone: body.phone,
        message: body.message,
        peopleCount: body.peopleCount,
        eventDate: body.eventDate,
        source: body.source || 'beta-waitlist',
        lang: body.lang || 'fr',
        page: body.page,
      }),
    })

    const data = await r.json().catch(() => ({}))
    if (!r.ok) {
      res.status(r.status === 400 ? 400 : 502).json({ error: data.error || 'upstream' })
      return
    }
    res.status(200).json({ ok: true, emailSent: data.emailSent === true })
  } catch (err) {
    res.status(500).json({ error: 'server_error' })
  }
}
