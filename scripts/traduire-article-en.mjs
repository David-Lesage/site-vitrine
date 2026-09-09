#!/usr/bin/env node
/**
 * traduire-article-en.mjs — génère la version ANGLAISE d'un article de blog FR.
 * ============================================================================
 *
 * POURQUOI
 * --------
 * Le blog est FR (racine) + EN (/en). Cap de David (09/09/2026) : « fr + en
 * quoi qu'il arrive, il y a énormément d'anglophones qui utilisent
 * l'application ». Tout `src/content/blog/<slug>.md` doit avoir son
 * `<slug>-en.md`. Ce script produit le jet ; un relecteur humain ou agent
 * repasse derrière avec le glossaire.
 *
 * SOURCE DE VÉRITÉ = LE FRANÇAIS. On ne traduit jamais une traduction.
 *
 * CE QU'IL PROTÈGE (jamais envoyé au traducteur)
 * ----------------------------------------------
 *   • les blocs de code et le code inline (`…`) ;
 *   • les URL des liens et des images markdown — seul le LIBELLÉ part traduire ;
 *   • les noms propres du glossaire (Neotone, Yishama, Le Nid, Handpan
 *     Constellation Studio, ChromaKeys, noms de notes et de gammes…) : « Le Nid »
 *     rendu « The Nest » désigne un lieu qui n'existe pas.
 * Chaque élément protégé part sous forme d'un jeton `⟦n⟧` que l'API laisse
 * passer, restauré à l'arrivée.
 *
 * LIENS INTERNES
 * --------------
 * Convention du site : la version anglaise pointe vers `/en/…`. Le script
 * préfixe donc les liens internes, SAUF `/images/…` (mêmes fichiers pour les
 * deux langues) et ce qui est déjà en `/en/`.
 *
 * FRONTMATTER
 * -----------
 * `title`, `description` et `tags` sont traduits ; `pubDate`, `cover`,
 * `category`, `permalink` et `draft` sont recopiés à l'identique (le permalink
 * est la clé qui apparie les deux langues) ; `lang` passe à `"en"`.
 *
 * BUDGET ET REJOUABILITÉ
 * ----------------------
 * Compte les caractères envoyés (= ce que Google facture) et s'arrête net au
 * plafond. Cache disque `scripts/.cache-traduction-en.json` (hors dépôt) :
 * relancer ne repaie aucun caractère déjà traduit.
 *
 * USAGE
 *   node scripts/traduire-article-en.mjs --dry-run
 *   node scripts/traduire-article-en.mjs --budget 60000
 *   node scripts/traduire-article-en.mjs --slug mes-handpans-une-seule-porte
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ICI = path.dirname(fileURLToPath(import.meta.url))
const RACINE = path.resolve(ICI, '..')
const BLOG = path.join(RACINE, 'src/content/blog')
const CACHE = path.join(ICI, '.cache-traduction-en.json')

const args = process.argv.slice(2)
const DRY = args.includes('--dry-run')
const BUDGET = Number(args[args.indexOf('--budget') + 1]) || 200000
const SLUG = args.includes('--slug') ? args[args.indexOf('--slug') + 1] : null

// ---------------------------------------------------------------- clé Google
function cleGoogle() {
  if (process.env.GOOGLE_TRANSLATE_API_KEY) return process.env.GOOGLE_TRANSLATE_API_KEY
  // repli : le .env.local de l'application porte la même clé
  const candidats = [
    path.join(RACINE, '.env.local'),
    path.join(process.env.HOME, 'CLAUDE/NEOTONE STUDIO/NEOTONE 1er mai 2026/.env.local'),
  ]
  for (const f of candidats) {
    if (!fs.existsSync(f)) continue
    const m = fs.readFileSync(f, 'utf8').match(/^GOOGLE_TRANSLATE_API_KEY=(.+)$/m)
    if (m) return m[1].trim().replace(/^["']|["']$/g, '')
  }
  return null
}

// ------------------------------------------------------------- intouchables
const NOMS_PROPRES = [
  'Handpan Constellation Studio', 'Handpan Studio', 'ChromaKeys', 'Neotone',
  'Yishama', 'Le Nid', 'David Lesage', 'Résonances Productions', 'Atlas',
  'Ismael Barredo', 'Stripe', 'Supabase',
]

/** Découpe le markdown en segments traduisibles, en mettant de côté tout le reste. */
function proteger(texte) {
  const gardes = []
  const jeton = (s) => { gardes.push(s); return `⟦${gardes.length - 1}⟧` }
  let t = texte
  t = t.replace(/```[\s\S]*?```/g, (m) => jeton(m))       // blocs de code
  t = t.replace(/`[^`\n]+`/g, (m) => jeton(m))            // code inline
  t = t.replace(/(!?\[)([^\]]*)(\]\()([^)]+)(\))/g,       // liens et images
    (_, a, libelle, b, url, c) => `${jeton(a)}${libelle}${jeton(b + url + c)}`)
  for (const nom of NOMS_PROPRES) {
    t = t.split(nom).join(jeton(nom))
  }
  return { t, gardes }
}

const restaurer = (t, gardes) => t.replace(/⟦(\d+)⟧/g, (_, i) => gardes[Number(i)])

/** Applique la convention de liens de la version anglaise. */
function liensEn(md) {
  return md.replace(/\]\((\/[^)]*)\)/g, (m, url) => {
    if (url.startsWith('/images/') || url.startsWith('/en/')) return m
    return `](/en${url})`
  })
}

// ------------------------------------------------------------------- Google
const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, 'utf8')) : {}
let envoyes = 0
let arrete = false

const DECODE = { '&amp;': '&', '&#39;': "'", '&quot;': '"', '&lt;': '<', '&gt;': '>', '&nbsp;': ' ' }
const decoder = (s) => s.replace(/&amp;|&#39;|&quot;|&lt;|&gt;|&nbsp;/g, (m) => DECODE[m])

async function traduire(chaine, cle) {
  const brut = chaine.trim()
  if (!brut || /^⟦\d+⟧$/.test(brut)) return chaine
  if (cache[chaine] !== undefined) return cache[chaine]
  if (arrete) return chaine
  if (envoyes + chaine.length > BUDGET) { arrete = true; return chaine }
  if (DRY) { envoyes += chaine.length; return chaine }

  const r = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${cle}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: chaine, source: 'fr', target: 'en', format: 'text' }),
  })
  if (!r.ok) throw new Error(`Google ${r.status} : ${(await r.text()).slice(0, 300)}`)
  const out = decoder((await r.json()).data.translations[0].translatedText)
  envoyes += chaine.length
  cache[chaine] = out
  fs.writeFileSync(CACHE, JSON.stringify(cache, null, 1))
  return out
}

// -------------------------------------------------------------------- article
function separerFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!m) throw new Error('frontmatter introuvable')
  return { fm: m[1], corps: m[2] }
}

async function traduireArticle(slug, cle) {
  const source = path.join(BLOG, `${slug}.md`)
  const cible = path.join(BLOG, `${slug}-en.md`)
  const { fm, corps } = separerFrontmatter(fs.readFileSync(source, 'utf8'))

  // --- frontmatter : seuls title, description et tags voyagent
  const lignes = []
  for (const ligne of fm.split('\n')) {
    let m
    if ((m = ligne.match(/^(title|description): "(.*)"$/))) {
      const { t, gardes } = proteger(m[2])
      lignes.push(`${m[1]}: "${restaurer(await traduire(t, cle), gardes).replace(/"/g, "'")}"`)
    } else if ((m = ligne.match(/^tags: \[(.*)\]$/))) {
      const tags = []
      for (const tag of m[1].split(',')) {
        const brut = tag.trim().replace(/^"|"$/g, '')
        const { t, gardes } = proteger(brut)
        tags.push(`"${restaurer(await traduire(t, cle), gardes)}"`)
      }
      lignes.push(`tags: [${tags.join(', ')}]`)
    } else if (ligne.startsWith('lang:')) {
      lignes.push('lang: "en"')
    } else {
      lignes.push(ligne)
    }
  }

  // --- corps : LIGNE PAR LIGNE.
  // Traduire un bloc entier d'un coup fait perdre à l'API les marqueurs de
  // structure : les `##` disparaissent, les rangées de tableau fusionnent, les
  // balises HTML se referment mal. On envoie donc chaque ligne seule, en
  // mettant de côté son PRÉFIXE de structure (titre, puce, citation, cellule)
  // et les lignes qui ne contiennent aucune prose (balises, séparateurs).
  const { t, gardes } = proteger(corps)
  const traduites = []
  for (const ligne of t.split('\n')) {
    if (!ligne.trim()) { traduites.push(ligne); continue }
    // lignes sans prose : balise HTML seule, séparateur de tableau, ligne de jetons
    if (/^\s*(<[^>]+>\s*)+$/.test(ligne) || /^\s*\|[\s|:-]+\|\s*$/.test(ligne) ||
        /^\s*(⟦\d+⟧\s*)+$/.test(ligne) || /^\s*-{3,}\s*$/.test(ligne)) {
      traduites.push(ligne); continue
    }
    // rangée de tableau : chaque cellule séparément, les barres restent en place
    if (/^\s*\|.*\|\s*$/.test(ligne)) {
      const cellules = ligne.split('|')
      for (let i = 1; i < cellules.length - 1; i++) {
        cellules[i] = ` ${(await traduire(cellules[i].trim(), cle)).trim()} `
      }
      traduites.push(cellules.join('|')); continue
    }
    // prose : on isole le préfixe de structure (#, -, *, >, 1.) et l'indentation
    const m = ligne.match(/^(\s*(?:[#]{1,6}\s+|[-*+]\s+|>\s?|\d+\.\s+)?)([\s\S]*)$/)
    traduites.push(m[1] + await traduire(m[2], cle))
  }
  const corpsEn = liensEn(restaurer(traduites.join('\n'), gardes))

  if (!DRY) fs.writeFileSync(cible, `---\n${lignes.join('\n')}\n---\n\n${corpsEn}`)
  return cible
}

// ---------------------------------------------------------------------- main
const manquants = SLUG ? [SLUG] : fs.readdirSync(BLOG)
  .filter((f) => f.endsWith('.md') && !/-(en|es)\.md$/.test(f))
  .map((f) => f.replace(/\.md$/, ''))
  .filter((s) => !fs.existsSync(path.join(BLOG, `${s}-en.md`)))

if (!manquants.length) {
  console.log('✅ Tous les articles français ont leur version anglaise.')
  process.exit(0)
}

const cle = cleGoogle()
if (!cle && !DRY) {
  console.error('❌ GOOGLE_TRANSLATE_API_KEY introuvable (env, .env.local du site ou de l’app).')
  process.exit(1)
}

console.log(`${manquants.length} article(s) sans version anglaise :`)
for (const slug of manquants) {
  const f = await traduireArticle(slug, cle)
  console.log(`   ${DRY ? '·' : '✓'} ${path.basename(f)}`)
}
console.log(`\n${DRY ? 'À envoyer' : 'Envoyés'} : ${envoyes.toLocaleString('fr-FR')} caractères` +
  (arrete ? `  ⚠️ BUDGET ATTEINT (${BUDGET}) — relancer pour finir, le cache garde l’acquis.` : ''))
