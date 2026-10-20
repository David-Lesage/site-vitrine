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
// ⚠️⚠️ INTERRUPTEUR : `SALE_INTAKE_ENABLED` (défini dans `saleIntakeCore.js`,
// réexporté ici) est à FALSE. À false, le formulaire se comporte EXACTEMENT
// comme avant (POST /api/subscribe → site-lead → email à David) et le serveur
// n'émet AUCUNE requête vers `sale-intake`.
//
// 🔒 10/10/2026 — l'appel à `sale-intake` est désormais fait CÔTÉ SERVEUR par
// `api/subscribe.js` (en-tête `x-site-token` = `SITE_LEAD_TOKEN`, variable
// d'environnement Vercel). Le navigateur n'a plus ni l'URL ni la clé du
// guichet : il envoie un objet `sale` à /api/subscribe, rien de plus.
// ============================================================
import { SALE_INTAKE_ENABLED, TERMS_VERSION, SALE_PARTNER, DEFAULT_DISCOUNT_PCT } from './saleIntakeCore.js'

/** 🔴 LE SEUL INTERRUPTEUR (source : `saleIntakeCore.js`). */
export { SALE_INTAKE_ENABLED, TERMS_VERSION, SALE_PARTNER, DEFAULT_DISCOUNT_PCT }

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
  /** Prix catalogue HT du calculateur (NOMBRE). */
  price_original_eur?: number
  /** Recalculé côté serveur : original × (1 − 7 % showroom / 5 % en ligne). */
  price_discounted_eur?: number
  /**
   * Mode choisi par le client. ⚠️ Pas (encore) lu par l'EF v1, qui force
   * `purchase_channel = 'online'` (champ interdit au site) : à brancher côté APP.
   */
  purchase_mode?: 'showroom' | 'online'
  news_opt_in?: boolean
  /** ⚠️ Pas lu par l'EF v1 (absent de sa liste `CONNUS`) : ignoré. */
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
 * Plus d'URL ni de clé : le dépôt passe par /api/subscribe (côté serveur).
 */
export function saleIntakeClientConfig() {
  return JSON.stringify({
    enabled: SALE_INTAKE_ENABLED,
    termsVersion: TERMS_VERSION,
  })
}
