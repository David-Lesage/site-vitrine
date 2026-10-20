#!/usr/bin/env node
/**
 * check-helloasso-prices.mjs — compare les prix affichés sur le site à ceux
 * d'HelloAsso, et liste les écarts. NE MODIFIE RIEN.
 * ===========================================================================
 *
 * HelloAsso fait foi (David, 20/10/2026). Les tarifs des cours et de la démo
 * sont déjà relus au build (src/lib/helloassoCatalogue.ts) ; les AUTRES fiches
 * liées à HelloAsso (calebasse, housse, méthode Now Groove, Gonilélé, albums…)
 * gardent un prix écrit à la main dans le dépôt. Ce script dit lesquels ont
 * dérivé.
 *
 * Source HelloAsso : point d'accès public, lecture seule, sans clé
 *   GET https://zqcuhnjjrgmybftppkcl.supabase.co/functions/v1/helloasso-notifications?action=catalogue
 * (cache 15 min côté serveur, 30 requêtes / 10 min : un seul appel ici).
 *
 * Source site : lue en TEXTE dans src/data/shop.ts, src/data/site.ts et
 * src/data/gonilele.ts (pas d'import : ce sont des modules TypeScript).
 *
 * USAGE
 *   node scripts/check-helloasso-prices.mjs
 *   node scripts/check-helloasso-prices.mjs --strict   (code de sortie 1 s'il y a un écart)
 *
 * Légende : ✅ identique · ⚠️ ÉCART · ℹ️ info (pas de prix affiché sur le site,
 * ou produit HelloAsso sans fiche) · ❓ introuvable (libellé ou fiche renommé).
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'

const RACINE = path.resolve(import.meta.dirname, '..')
const URL_CATALOGUE =
  process.env.HELLOASSO_CATALOGUE_URL ||
  'https://zqcuhnjjrgmybftppkcl.supabase.co/functions/v1/helloasso-notifications?action=catalogue'
const strict = process.argv.includes('--strict')

const lire = (rel) => readFileSync(path.join(RACINE, rel), 'utf8')
const shopTs = lire('src/data/shop.ts')
const siteTs = lire('src/data/site.ts')
const goniTs = lire('src/data/gonilele.ts')

// ── Site : extraction des prix écrits dans le dépôt ─────────────────────────
/** La ligne `{ id: '<id>', … }` de shop.ts (une fiche = une ligne). */
function ficheShop(id) {
  const ligne = shopTs.split('\n').find((l) => l.includes(`{ id: '${id}'`))
  if (!ligne) return null
  const priceLabel = (ligne.match(/priceLabel: '([^']*)'/) || [])[1] ?? null
  const url = (ligne.match(/url: '([^']*)'/) || [])[1] ?? null
  return { priceLabel, url }
}
/** Premier montant en euros d'un libellé (« dès 440 € » → 440). */
const montantLibelle = (s) => {
  const m = s && s.match(/(\d+(?:[.,]\d+)?)\s*€/)
  return m ? Number(m[1].replace(',', '.')) : null
}
const sessionSite = (id) => Number((siteTs.match(new RegExp(`id: '${id}'[^\\n]*?price: (\\d+)`)) || [])[1] ?? NaN)
const forfaitSite = (min) => Number((siteTs.match(new RegExp(`packagePrice: \\{[^}]*?${min}: (\\d+)`)) || [])[1] ?? NaN)
const goniSite = (cle) => Number((goniTs.match(new RegExp(`${cle}: (\\d+)`)) || [])[1] ?? NaN)

// ── HelloAsso ──────────────────────────────────────────────────────────────
async function catalogue() {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), 8000)
  try {
    const res = await fetch(URL_CATALOGUE, { signal: ctrl.signal, headers: { accept: 'application/json' } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } finally {
    clearTimeout(t)
  }
}
const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim()
const montantHA = (t) => (t.prixLibre && typeof t.minimumEuros === 'number' ? t.minimumEuros : t.montantEuros)
const fmt = (n) => (Number.isFinite(n) ? `${String(n).replace('.', ',')} €` : '—')

// ── Ce qu'on compare ───────────────────────────────────────────────────────
// `site` : le montant affiché (null = le site n'affiche pas de prix).
// `ou`   : où ce montant est écrit, pour savoir quoi corriger.
const COMPARAISONS = [
  // Relu au build (helloassoCatalogue.ts) : ici, on vérifie le REPLI de site.ts.
  { nom: 'Cours 1h (minimum du prix libre)', slug: 'cours-prive-et-stages-avec-david-lesage', re: /^cours 1h(?!30)/, site: sessionSite('lesson-60'), ou: 'site.ts sessionTypes lesson-60 (repli ; le build lit HelloAsso)' },
  { nom: 'Cours 1h30 (minimum du prix libre)', slug: 'cours-prive-et-stages-avec-david-lesage', re: /^cours 1h30/, site: sessionSite('lesson-90'), ou: 'site.ts sessionTypes lesson-90 (repli ; le build lit HelloAsso)' },
  { nom: 'Forfait 4 cours de 1h (minimum)', slug: 'cours-prive-et-stages-avec-david-lesage', re: /^forfait 4 cours de 1h(?!30)/, site: forfaitSite(60), ou: 'site.ts lessonPackage.packagePrice[60] (repli ; le build lit HelloAsso)' },
  { nom: 'Forfait 4 cours de 1h30 (minimum)', slug: 'cours-prive-et-stages-avec-david-lesage', re: /^forfait 4 cours de 1h30/, site: forfaitSite(90), ou: 'site.ts lessonPackage.packagePrice[90] (repli ; le build lit HelloAsso)' },
  { nom: 'Démonstration privée 1h', slug: 'demonstration-prive-avec-david-lesage', re: /^session demonstration privee - 1h(?!30)/, site: sessionSite('demo-60'), ou: 'site.ts sessionTypes demo-60 (repli ; le build lit HelloAsso)' },
  { nom: 'Démonstration privée 1h30', slug: 'demonstration-prive-avec-david-lesage', re: /^session demonstration privee - 1h30/, site: sessionSite('demo-90'), ou: 'site.ts sessionTypes demo-90 (repli ; le build lit HelloAsso)' },
  // Un 2ᵉ « cours 1h » existe dans la boutique Now Groove : il doit suivre le cours à l'unité.
  { nom: 'Cours 1h en visio (boutique Now Groove)', slug: 'formation-de-rythme-now-groove-david-lesage', re: /^1 cours d.1h en visio/, site: sessionSite('lesson-60'), ou: 'HelloAsso (le site annonce les cours dès 60 €) : tarif à aligner ou à retirer chez HelloAsso' },
  // Écrits à la main dans le dépôt.
  { nom: 'Kit de calebasse (fiche « calebasse »)', slug: 'formation-de-rythme-now-groove-david-lesage', re: /^kit calebasse seul .*livraison europe/, site: montantLibelle(ficheShop('calebasse')?.priceLabel), ou: 'shop.ts calebasse.priceLabel' },
  { nom: 'Housse de calebasse (fiche « housse »)', slug: 'pres-vente-housse-calebasse-now-groove-by-david-lesage', re: /^1 housse/, site: montantLibelle(ficheShop('housse')?.priceLabel), ou: 'shop.ts housse.priceLabel' },
  { nom: 'Housse sac à dos (boutique Now Groove)', slug: 'formation-de-rythme-now-groove-david-lesage', re: /^1 housse sac a dos/, site: montantLibelle(ficheShop('housse')?.priceLabel), ou: 'shop.ts housse.priceLabel' },
  { nom: 'Méthode Now Groove (fiche « now-groove »)', slug: 'formation-de-rythme-now-groove-david-lesage', re: /^cours de rythmes/, site: montantLibelle(ficheShop('now-groove')?.priceLabel), ou: 'shop.ts now-groove (aucun priceLabel)' },
  { nom: 'Pack complet calebasse + housse + cours', slug: 'formation-de-rythme-now-groove-david-lesage', re: /^pack complet calebasse/, site: null, ou: 'aucune fiche sur le site' },
  { nom: 'Pack DUO cours + kit calebasse', slug: 'formation-de-rythme-now-groove-david-lesage', re: /^pack special duo/, site: null, ou: 'aucune fiche sur le site' },
  { nom: 'Gonilélé 10 cordes (fiche « gonilele », page /gonilele)', slug: 'gonilele-harpe-africaine', re: /^gonilele - harpe africaine/, site: goniSite('cordes10'), ou: 'gonilele.ts cordes10 + shop.ts gonilele.priceLabel + dict gonilele (le site ne renvoie PAS vers ce formulaire : même produit ?)' },
  { nom: 'Album « L’Alliance du Phoenix » (double EP, téléchargement)', slug: 'acheter-album-l-alliance-du-phoenix-david-lesage', re: /^double ep/, site: null, ou: 'fiches phoenix-opus1/2 : lien Spotify, pas de prix' },
  { nom: 'Album « L’Alliance du Phoenix » (clé USB)', slug: 'acheter-album-l-alliance-du-phoenix-david-lesage', re: /^cle usb/, site: null, ou: 'fiches phoenix-opus1/2 : lien Spotify, pas de prix' },
  { nom: 'Musique David Lesage (téléchargement)', slug: 'boutique-david-lesage', re: /^telechargement direct/, site: null, ou: 'aucune fiche avec prix sur le site' },
]

// ── Exécution ──────────────────────────────────────────────────────────────
let data
try {
  data = await catalogue()
} catch (e) {
  console.error(`❌ Catalogue HelloAsso injoignable (${e.name === 'AbortError' ? 'délai de 8 s dépassé' : e.message}). Rien n'a été comparé.`)
  process.exit(strict ? 1 : 0)
}
const formulaires = Array.isArray(data?.formulaires) ? data.formulaires : []
console.log(`Catalogue HelloAsso — ${data?.organisation?.nom ?? '?'} — mis à jour le ${data?.misAJourLe ?? '?'}${data?.perime ? ' (⚠️ cache périmé)' : ''}\n`)

let ecarts = 0
const slugsVus = new Set()
for (const c of COMPARAISONS) {
  slugsVus.add(c.slug)
  const form = formulaires.find((f) => f.slug === c.slug)
  const tarif = form?.tarifs?.find((t) => c.re.test(norm(t.libelle)))
  if (!tarif) {
    console.log(`❓ ${c.nom} — introuvable sur HelloAsso (${form ? 'libellé' : 'formulaire'} renommé ?) · formulaire ${c.slug}`)
    continue
  }
  const ha = montantHA(tarif)
  const libre = tarif.prixLibre ? ' (prix libre, minimum)' : ''
  if (c.site === null || !Number.isFinite(c.site)) {
    console.log(`ℹ️  ${c.nom} — HelloAsso ${fmt(ha)}${libre} · site : pas de prix affiché (${c.ou})`)
  } else if (c.site === ha) {
    console.log(`✅ ${c.nom} — ${fmt(ha)}${libre}`)
  } else {
    ecarts++
    console.log(`⚠️  ÉCART ${c.nom} — HelloAsso ${fmt(ha)}${libre} ≠ site ${fmt(c.site)} · à corriger dans : ${c.ou}`)
    console.log(`      libellé HelloAsso : « ${tarif.libelle} » · ${form.url}`)
  }
}

const autres = formulaires.filter((f) => !slugsVus.has(f.slug))
if (autres.length) {
  console.log('\nFormulaires HelloAsso non suivis par ce script (événements, ateliers…) :')
  for (const f of autres) console.log(`   · ${f.titre} (${f.type}) — ${f.tarifs.map((t) => `${t.libelle} : ${fmt(montantHA(t))}${t.prixLibre ? ' libre' : ''}`).join(' | ')}`)
}
console.log(`\n${ecarts === 0 ? 'Aucun écart.' : `${ecarts} écart(s).`} Rien n'a été modifié.`)
process.exit(strict && ecarts ? 1 : 0)
