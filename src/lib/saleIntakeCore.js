// ============================================================
// DÉPÔT D'UNE VENTE NEOTONE — cœur partagé navigateur / serveur / tests
//
// Pourquoi un fichier .js (et pas dans saleIntake.ts) : il est importé par la
// fonction Vercel `api/subscribe.js` (runtime Node, sans alias `@/` ni
// TypeScript), par le build Astro et par `scripts/test-achat-neotone.mjs`.
// Même principe que `src/lib/stockSource.js` ↔ `api/stock.js`.
//
// Le navigateur ne parle PLUS jamais à l'Edge Function `sale-intake` : il
// envoie sa demande à `/api/subscribe`, qui (1) enregistre le contact via
// `site-lead` (le filet : David reçoit l'email quoi qu'il arrive), puis (2) si
// l'interrupteur ci-dessous est allumé, dépose la vente dans l'app avec le
// jeton serveur `SITE_LEAD_TOKEN` (en-tête `x-site-token`). Le jeton n'existe
// que dans les variables d'environnement Vercel : jamais dans un fichier servi.
// ============================================================

/**
 * 🔴 LE SEUL INTERRUPTEUR. À false : aucune requête vers `sale-intake`, le
 * formulaire se comporte exactement comme avant (email à David seulement).
 * Ne passer à true qu'APRÈS le premier appel réel fait avec la session APP et
 * le feu vert de David (voir REPRENDRE-SITE-VITRINE.md, « RESTE À FAIRE »).
 */
export const SALE_INTAKE_ENABLED = false

// CONDITIONS GÉNÉRALES — ⚠️ DOIT rester STRICTEMENT ÉGALE à `TERMS_VERSION`
// dans `supabase/functions/site-lead/index.ts` et
// `supabase/functions/muling-order/index.ts`, et à `terms.version` dans
// `src/i18n/dict.ts`.
export const TERMS_VERSION = '2026-08-19'

/** Le seul partenaire branché sur ce guichet pour l'instant. */
export const SALE_PARTNER = 'neotone'

/**
 * Remise par défaut selon le mode d'achat choisi dans le calculateur
 * (décision de David du 10/10/2026). David peut la modifier dans l'app avant
 * l'envoi à Neotone : c'est une proposition, pas une décision.
 * ⚠️ Mêmes taux que `compute()` dans `src/components/Calculator.astro`.
 */
export const DEFAULT_DISCOUNT_PCT = { showroom: 7, online: 5 }

/** Arrondi au centime, en NOMBRE (jamais de « € » ni de virgule). */
export const round2 = (n) => Math.round(n * 100) / 100

/** Montant positif et borné, ou `undefined` (jamais une valeur inventée). */
export function toAmount(v) {
  if (v === null || v === undefined || v === '') return undefined
  const n = typeof v === 'number' ? v : Number(String(v).replace(',', '.'))
  if (!Number.isFinite(n) || n <= 0 || n > 1_000_000) return undefined
  return round2(n)
}

/** Prix remisé par défaut : prix catalogue HT × (1 − remise du mode). */
export function defaultDiscountedPrice(original, mode) {
  const o = toAmount(original)
  const pct = DEFAULT_DISCOUNT_PCT[mode]
  if (o === undefined || pct === undefined) return undefined
  return round2(o * (1 - pct / 100))
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const COUNTRY_RE = /^[A-Za-z]{2}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Téléphone : 8 à 15 chiffres (E.164), même règle que le formulaire de contact. */
export function isValidPhone(raw) {
  const phone = String(raw ?? '').trim()
  const digits = phone.replace(/\D/g, '').length
  return /^\+?[\d\s().\-]+$/.test(phone) && digits >= 8 && digits <= 15
}

/**
 * Champs que le site n'a JAMAIS le droit d'envoyer (l'EF les refuse en 400).
 * Liste tenue à jour sur `INTERDITS_EXACTS` / `INTERDITS_PREFIXES` de
 * `supabase/functions/sale-intake/handler.ts` (dépôt de l'app).
 */
export const FORBIDDEN_FIELDS = [
  'id', 'created_at', 'order_ref', 'status', 'fulfillment_status', 'source', 'currency',
  'purchase_channel', 'commission_eur', 'discount_buyer_pct', 'discount_promoter_pct',
  'invoice_ref', 'invoiced_at', 'commission_paid_on', 'ordered_on', 'serial_number',
  'transmitted_at', 'transmitted_to', 'transmission_status', 'admin_note',
  'partner_comment', 'tracking_number', 'manufacturer_order_number', 'shipped_at',
  'delivery_note', 'consent_at', 'terms_accepted_at', 'news_opt_in_at', 'promo_date',
  'promo_date_raw', 'promotion_type', 'social', 'reserved_piece_id',
]
export const FORBIDDEN_PREFIXES = ['deleted_', 'delete_', 'payment_', 'partner_']

const str = (v, max) => (v === null || v === undefined || typeof v === 'object' ? '' : String(v).trim().slice(0, max))

/**
 * Construit le corps EXACT envoyé à `sale-intake` à partir de ce que le
 * navigateur a transmis (`body.sale`) — en LISTE BLANCHE : un champ non prévu
 * ici n'arrive jamais à l'EF, quoi que le navigateur envoie.
 *
 * Le prix remisé n'est PAS cru sur parole : il est recalculé ici depuis le
 * prix catalogue et le mode d'achat (−7 % showroom / −5 % en ligne).
 *
 * @param {Record<string, unknown>} sale  objet `sale` posté par le formulaire
 * @param {{ siteLeadId?: string }} [extra]
 * @returns {{ ok: true, payload: Record<string, unknown> } | { ok: false, erreur: string }}
 */
export function buildSaleIntakePayload(sale, extra = {}) {
  if (!sale || typeof sale !== 'object' || Array.isArray(sale)) return { ok: false, erreur: 'corps_invalide' }
  const s = /** @type {Record<string, unknown>} */ (sale)

  const billingKind = str(s.billing_kind, 20) === 'societe' ? 'societe' : 'particulier'
  const p = {
    partner: SALE_PARTNER,
    customer_name: str(s.customer_name, 120),
    email: str(s.email, 200).toLowerCase(),
    billing_kind: billingKind,
    billing_name: str(s.billing_name, 160),
    billing_address: str(s.billing_address, 300),
    billing_postal_code: str(s.billing_postal_code, 20),
    billing_city: str(s.billing_city, 120),
    billing_country: str(s.billing_country, 2).toUpperCase(),
    terms_accepted: true,
    terms_version: TERMS_VERSION,
  }
  // Obligatoires du contrat figé : on refuse ici plutôt que de laisser l'EF
  // le faire (même motif que l'EF, pour un affichage identique).
  for (const k of ['customer_name', 'billing_name', 'billing_address', 'billing_postal_code', 'billing_city']) {
    if (!p[k]) return { ok: false, erreur: k }
  }
  if (!EMAIL_RE.test(p.email)) return { ok: false, erreur: 'email' }
  if (!COUNTRY_RE.test(p.billing_country)) return { ok: false, erreur: 'billing_country' }
  if (s.terms_accepted !== true) return { ok: false, erreur: 'terms_accepted' }

  if (billingKind === 'societe') {
    const company = str(s.billing_company, 160)
    if (!company) return { ok: false, erreur: 'billing_company' }
    p.billing_company = company
    const vat = str(s.billing_vat_number, 40)
    const siret = str(s.billing_siret, 20)
    if (vat) p.billing_vat_number = vat
    if (siret) p.billing_siret = siret
  }

  const phone = str(s.phone, 40)
  if (phone) p.phone = phone
  const lang = str(s.lang, 5).toLowerCase()
  if (/^[a-z]{2}$/.test(lang)) p.lang = lang
  p.quantity = 1
  const model = str(s.model, 80)
  const wood = str(s.wood, 60)
  if (model) p.model = model
  if (wood) p.wood = wood

  // Mode d'achat : `purchase_channel` est un champ INTERDIT du contrat (l'EF
  // le pose elle-même, aujourd'hui toujours à 'online'). On transmet donc le
  // choix du client sous `purchase_mode` — champ inconnu de l'EF v1, qu'elle
  // IGNORE sans échouer (« un champ nouveau côté site ne doit pas faire
  // échouer une vente »). À brancher côté APP (voir rapport du 10/10/2026).
  const mode = str(s.purchase_mode, 20)
  if (mode === 'showroom' || mode === 'online') p.purchase_mode = mode

  const original = toAmount(s.price_original_eur)
  if (original !== undefined) {
    p.price_original_eur = original
    const discounted = defaultDiscountedPrice(original, mode)
    if (discounted !== undefined) p.price_discounted_eur = discounted
  }

  p.news_opt_in = s.news_opt_in === true

  // Livraison : seulement si elle DIFFÈRE de la facturation (le navigateur
  // n'envoie rien sinon). `shipping_name` n'est pas (encore) lu par l'EF v1.
  const shipCountry = str(s.shipping_country, 2).toUpperCase()
  const shipAddress = str(s.shipping_address, 300)
  if (shipAddress) {
    p.shipping_address = shipAddress
    const n = str(s.shipping_name, 160)
    const pc = str(s.shipping_postal_code, 20)
    const city = str(s.shipping_city, 120)
    if (n) p.shipping_name = n
    if (pc) p.shipping_postal_code = pc
    if (city) p.shipping_city = city
    if (COUNTRY_RE.test(shipCountry)) p.shipping_country = shipCountry
  }

  const reqId = str(s.client_request_id, 40)
  if (UUID_RE.test(reqId)) p.client_request_id = reqId.toLowerCase()
  const leadId = str(extra.siteLeadId, 40)
  if (UUID_RE.test(leadId)) p.site_lead_id = leadId.toLowerCase()

  // Ceinture + bretelles : aucun champ interdit ne peut sortir d'ici.
  for (const k of Object.keys(p)) {
    if (FORBIDDEN_FIELDS.includes(k) || FORBIDDEN_PREFIXES.some((x) => k.startsWith(x))) delete p[k]
  }
  return { ok: true, payload: p }
}

/**
 * Traduit la réponse de l'EF en ce que le navigateur a besoin d'afficher.
 * Ne renvoie JAMAIS `sale_id` au navigateur (inutile côté client).
 */
export function summarizeSaleIntakeResponse(status, data) {
  if (data && data.ok === true && data.order_ref) {
    return { ok: true, order_ref: String(data.order_ref), ...(data.reused ? { reused: true } : {}) }
  }
  const erreur = data && typeof data.erreur === 'string' ? data.erreur.slice(0, 80) : status === 429 ? 'trop_de_demandes' : 'erreur_serveur'
  return { ok: false, erreur }
}
