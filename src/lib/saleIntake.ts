// ============================================================
// GUICHET DE VENTE NEOTONE — Edge Function `sale-intake`
//
// Contrat FIGÉ par la session « app » (21-22/09/2026). Ce module ne contient
// que des CONSTANTES PUBLIQUES et le type du corps de requête : c'est le
// pendant de `src/lib/prices.ts` (même projet Supabase, même clé
// *publishable* — la sécurité est côté RLS / Edge Function, pas ici).
//
// Pourquoi ce guichet existe (demande de David, 21-22/09/2026) :
//   « dans tous les cas il faut récupérer les informations de facturation ;
//     si la personne a une société qui récupère la TVA, il faut qu'elle mette
//     toutes ces infos dans le formulaire. Comme ça, une fois les données
//     collectées, je veux juste avoir un bouton pour envoyer un email à
//     Neotone avec les informations de la personne. »
// Le bouton « envoyer à Neotone » vit dans l'application (back-office) : le
// site, lui, ne fait qu'une chose — DÉPOSER la vente proprement structurée.
//
// ⚠️⚠️ INTERRUPTEUR : `SALE_INTAKE_ENABLED` est à FALSE tant que l'Edge
// Function n'est pas déployée. À false, le formulaire se comporte EXACTEMENT
// comme avant (POST /api/subscribe → site-lead → email à David) et n'émet
// AUCUNE requête réseau vers `sale-intake`. Le jour où la session app annonce
// « déployée », passer cette seule constante à `true` et redéployer.
// ============================================================
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/prices'

/** 🔴 LE SEUL INTERRUPTEUR. Voir l'avertissement ci-dessus. */
export const SALE_INTAKE_ENABLED = false

export const SALE_INTAKE_URL = `${SUPABASE_URL}/functions/v1/sale-intake`
export { SUPABASE_ANON_KEY }

// CONDITIONS GÉNÉRALES — ⚠️ DOIT rester STRICTEMENT ÉGALE à `TERMS_VERSION`
// dans `supabase/functions/site-lead/index.ts` et
// `supabase/functions/muling-order/index.ts`, et à `terms.version` dans
// `src/i18n/dict.ts`. Un consentement horodaté sur une version qui n'existe
// pas ailleurs n'est pas opposable.
export const TERMS_VERSION = '2026-08-19'

/** Le seul partenaire branché sur ce guichet pour l'instant. */
export const SALE_PARTNER = 'neotone'

/**
 * Corps de requête accepté par `sale-intake`.
 *
 * ⛔ CHAMPS INTERDITS — ne JAMAIS les envoyer depuis le navigateur : `status`,
 * `fulfillment_status`, `source`, `commission_eur`, `discount_promoter_pct`,
 * `invoice_ref`, `serial_number`, `transmitted_*`, `deleted_*`. L'Edge
 * Function pose elle-même `source`, `status`, `purchase_channel`,
 * `transmission_status`, `currency` et `consent_at`.
 *
 * ⛔ `reserved_piece_id` n'est PAS envoyé non plus (décision 22/09/2026) :
 * l'acheteur ne choisit pas un exemplaire, c'est David qui affecte le numéro
 * de série.
 */
export interface SaleIntakePayload {
  // — Obligatoires —
  partner: string
  customer_name: string
  email: string
  billing_kind: 'particulier' | 'societe'
  billing_name: string
  billing_address: string
  billing_postal_code: string
  billing_city: string
  /** ISO 3166-1 alpha-2, ex. « FR ». */
  billing_country: string
  terms_accepted: true
  terms_version: string
  /** Obligatoire dès que `billing_kind === 'societe'`. */
  billing_company?: string
  // — Facultatifs —
  billing_vat_number?: string
  billing_siret?: string
  phone?: string
  lang?: string
  quantity?: number
  model?: string
  wood?: string
  price_original_eur?: number
  price_discounted_eur?: number
  news_opt_in?: boolean
  shipping_name?: string
  shipping_address?: string
  shipping_postal_code?: string
  shipping_city?: string
  shipping_country?: string
  /** Identifiant de la ligne `site_lead` correspondante, si on l'a. */
  site_lead_id?: string
  /** Anti-doublon : uuid figé à l'OUVERTURE du formulaire. */
  client_request_id?: string
}

/** Réponses possibles du guichet. */
export type SaleIntakeResult =
  | { ok: true; sale_id: string; order_ref: string }
  | { ok: false; erreur: string }

/**
 * Ce que le composant lit au runtime, sérialisé dans un attribut `data-*`.
 * Un `<script>` Astro traité ne peut pas interpoler une expression du
 * frontmatter : c'est le même mécanisme que `data-price-grid` /
 * `data-upcoming` dans `BookingForm.astro`.
 */
export function saleIntakeClientConfig() {
  return JSON.stringify({
    enabled: SALE_INTAKE_ENABLED,
    url: SALE_INTAKE_URL,
    key: SUPABASE_ANON_KEY,
    partner: SALE_PARTNER,
    termsVersion: TERMS_VERSION,
  })
}
