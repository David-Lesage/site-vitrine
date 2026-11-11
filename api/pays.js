// Fonction serverless Vercel (runtime Node) — renvoie le PAYS du visiteur, déduit de
// son adresse IP par Vercel (en-tête `x-vercel-ip-country`, code ISO à 2 lettres).
// Sert à la page de vente /handpan-app/ pour choisir la langue au premier passage
// (11/11/2026, demande de David). Même règle que l'app (play.handpanstudio.app).
//
// Vie privée : on ne lit QUE le pays (jamais l'IP elle-même), rien n'est stocké ni
// journalisé, et la réponse n'est mise en cache nulle part (elle dépend du visiteur).
//
// Réponse : {"pays":"ES"} — ou {"pays":null} si Vercel ne sait pas (en local, réseau
// privé…). Le navigateur se replie alors sur la langue du navigateur.
//
// Aucune dépendance npm (bun.lock gelé).

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store')
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.status(405).json({ error: 'method_not_allowed' })
    return
  }
  const brut = String(req.headers['x-vercel-ip-country'] || '').toUpperCase()
  const pays = /^[A-Z]{2}$/.test(brut) ? brut : null
  res.status(200).json({ pays })
}
