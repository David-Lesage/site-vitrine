// ============================================================
// Tarifs Studio de Handpan Constellation Studio, résolus DYNAMIQUEMENT
// depuis Stripe via l'Edge Function publique get-prices de l'app
// Handpan Constellation Studio. Dès qu'un prix change dans Stripe, l'affichage suit.
//
// - À la compilation (SSG) : on récupère les montants et on les fige
//   dans le HTML → corrects à chaque déploiement, sans JS.
// - Côté client : un petit script re-interroge get-prices pour une
//   mise à jour en direct (actif dès que l'origine du site est
//   autorisée côté CORS de l'Edge Function).
//
// La clé « anon/publishable » est publique (sécurité par RLS), comme
// dans l'app elle-même.
// ============================================================

export const SUPABASE_URL = 'https://zqcuhnjjrgmybftppkcl.supabase.co'
export const SUPABASE_ANON_KEY = 'sb_publishable_turahpl0xi-qKN6jmG3yBg_tqpVZbtx'
export const GET_PRICES_URL = `${SUPABASE_URL}/functions/v1/get-prices`

// Décision David 14/10/2026 : seule la formule Essentiel a un prix (3,49 € TTC / mois,
// 1 mois d'essai). Studio et Prof : « À venir », quelle que soit la réponse de Stripe.
export type PlanId = 'essential'
export interface PriceInfo {
  amount: number | null
  currency: string
  interval: 'month' | 'year' | null
}
export type PriceMap = Record<PlanId, PriceInfo>

// Valeur de repli tant que le prix Stripe « essential » n'existe pas (ou si la
// récupération échoue) : 3,49 € TTC / mois (décision David 14/10/2026).
export const FALLBACK_PRICES: PriceMap = {
  essential: { amount: 3.49, currency: 'eur', interval: 'month' },
}

export function formatAmount(p: PriceInfo | undefined, locale = 'fr-FR'): string {
  if (!p || p.amount == null) return '—'
  const symbol = p.currency === 'eur' ? '€' : p.currency === 'usd' ? '$' : p.currency.toUpperCase()
  const n = Number.isInteger(p.amount)
    ? p.amount.toLocaleString(locale)
    : p.amount.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return `${n} ${symbol}`
}

// Récupération au build (Node, sans contrainte CORS). Repli silencieux.
export async function fetchPricesAtBuild(): Promise<PriceMap> {
  try {
    const res = await fetch(GET_PRICES_URL, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: '{}',
    })
    if (!res.ok) return FALLBACK_PRICES
    const data = (await res.json()) as Partial<PriceMap>
    const e = data.essential
    return { essential: e && e.amount != null ? e : FALLBACK_PRICES.essential }
  } catch {
    return FALLBACK_PRICES
  }
}
