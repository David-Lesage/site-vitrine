#!/usr/bin/env node
/**
 * traduire-i18n-es.mjs — génère la traduction ESPAGNOLE du site à partir du FRANÇAIS.
 * ====================================================================================
 *
 * POURQUOI
 * --------
 * Le site est FR (racine) + EN (/en). Ismael Barredo, ambassadeur hispanophone,
 * et les premiers comptes `es` de l'app justifient une troisième langue. Le
 * sélecteur de langue l'attendait déjà : `src/i18n/config.ts` déclare `es` en
 * `active: false` (affiché « bientôt »). Ce script remplit le contrat.
 *
 * CE QU'IL FAIT
 * -------------
 * Deux cibles, mêmes règles :
 *
 *   1. `src/i18n/dict.ts` (export `fr`)  →  `src/i18n/es.ts`   (export `es: Dict`)
 *   2. `src/data/guides.ts` (export `guides.fr`) → `src/data/guides-es.ts`
 *                                                  (export `esGuides: GuidesByLang`)
 *
 * La SOURCE DE VÉRITÉ est toujours le FRANÇAIS. L'anglais n'est jamais lu : on
 * ne traduit pas une traduction. Les fichiers produits ont exactement la même
 * FORME que leur source (mêmes clés, même imbrication, mêmes tableaux) — ils
 * sont typés `Dict` / `GuidesByLang`, donc une clé manquante ou en trop fait
 * échouer `npm run build`. C'est le filet.
 *
 * COMMENT
 * -------
 * Google Cloud Translation API v2 (`/language/translate/v2`).
 *   • `format=html` dès qu'une valeur contient des balises OU des éléments
 *     protégés, `format=text` sinon.
 *   • Les INTOUCHABLES sont enveloppés dans `<span class="notranslate">…</span>`,
 *     que l'API a pour consigne de laisser tel quel, puis les balises sont
 *     retirées. Deux familles :
 *       – les NOMS PROPRES (Neotone, Yishama, Le Nid, les noms de gammes…) :
 *         « Le Nid » traduit en « El Nido » désigne un lieu qui n'existe pas ;
 *       – les MARQUEURS de gabarit (`{link}`, `{n}`, `{price}`…) : le composant
 *         Astro les remplace à l'affichage. Un marqueur traduit casse la page.
 *   • Les entités HTML renvoyées par l'API sont redécodées : `&#39;` dans une
 *     page Astro s'affiche littéralement, ce n'est pas du HTML rendu.
 *
 * BUDGET ET REJOUABILITÉ
 * ----------------------
 * Le script compte LES CARACTÈRES ENVOYÉS (texte protégé compris = ce que
 * Google facture) et s'arrête NET au plafond. Un cache disque
 * (`scripts/.cache-traduction-es.json`, hors dépôt) mémorise chaque chaîne déjà
 * traduite : relancer reprend exactement là où le budget avait dit stop, sans
 * repayer un seul caractère. Les chaînes identiques ne sont envoyées qu'une fois.
 *
 * Tant que le cache est incomplet, les valeurs manquantes sont écrites EN
 * FRANÇAIS dans le fichier de sortie (repli visible, jamais de trou) — le build
 * passe, et la relance suivante les remplace.
 *
 * USAGE
 * -----
 *   node scripts/traduire-i18n-es.mjs --dry-run
 *        Aucun appel réseau. Dit combien de chaînes et de caractères restent à
 *        traduire, cache déduit.
 *
 *   node scripts/traduire-i18n-es.mjs --budget 300000
 *        La vraie passe. Plafond par défaut : 300 000 caractères.
 *
 *   node scripts/traduire-i18n-es.mjs --limit 20 --budget 5000
 *        Un échantillon, pour relire la sortie avant d'engager le quota.
 *
 * LA CLÉ D'API
 * ------------
 * Jamais dans ce dépôt. Le script lit `GOOGLE_TRANSLATE_API_KEY` dans
 * l'environnement, ou dans le fichier passé par `--env <chemin>`. Par défaut il
 * regarde le `.env.local` du projet APP, qui la contient déjà :
 *   ~/CLAUDE/NEOTONE STUDIO/NEOTONE 1er mai 2026/.env.local
 * (c'est un CHEMIN, pas un secret — la clé, elle, ne sort jamais de ce fichier.)
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { homedir } from 'node:os'
import path from 'node:path'

const RACINE = path.resolve(import.meta.dirname, '..')
const CACHE = path.join(RACINE, 'scripts', '.cache-traduction-es.json')
const TEMP = path.join(RACINE, 'node_modules', '.cache', 'traduire-es')
const ENV_PAR_DEFAUT = path.join(homedir(), 'CLAUDE', 'NEOTONE STUDIO', 'NEOTONE 1er mai 2026', '.env.local')

// ───────────────────────────────────────────────────────────────────────────
// INTOUCHABLES — ne se traduisent JAMAIS
// ───────────────────────────────────────────────────────────────────────────
// Ordre important : les expressions LONGUES d'abord, sinon « Neotone » masque
// « Neotone¹ » et « Handpan » masque « Handpan Constellation Studio ».
const NOMS_PROPRES = [
  // Produits et marques
  'Handpan Constellation Studio',
  'Handpan Compagnon',
  'Handpan Studio',
  'Neotone¹',
  'Neotone',
  'Yishama',
  'Muling',
  'Hisong',
  'Gonilélé',
  'Atlas',
  'Mutant',
  'ChromaKeys',
  '.handpan',
  // Personnes et structures
  'David Lesage',
  'Résonances Productions',
  'Le Nid',
  // Noms de gammes — un nom de gamme est un identifiant, pas un mot
  'D Kurd',
  'Kurd',
  'Amara',
  'Hijaz',
  'Pygmy',
  'Sabye',
  'Celtic Minor',
  'Integral',
  'Equinox',
  'Mystic',
  'Onoleo',
  'La Sirena',
  'Golden Gate',
  'Magic Voyage',
  'Aegean',
  'Annaziska',
  'Raga Desh',
  'Blues',
  'Ionian',
  'Dorian',
  'Phrygian',
  'Lydian',
  'Mixolydian',
  'Aeolian',
  'Locrian',
]

/** Marqueurs de gabarit : `{link}`, `{n}`, `{price}`… remplacés à l'affichage. */
const MARQUEUR = /\{[a-zA-Z0-9_]+\}/g

// ───────────────────────────────────────────────────────────────────────────
// CE QUI N'EST PAS DU TEXTE — ne part jamais à la traduction
// ───────────────────────────────────────────────────────────────────────────
// `dict.ts` et surtout `guides.ts` mêlent la prose et la MÉCANIQUE : noms
// d'icônes lucide, ancres `id`, discriminants de bloc (`kind: 'p'`), chemins
// d'images, slugs, dates. Sans ce garde-fou l'API rend `lucide:disc-3` →
// « lucide:disco-3 » et `kind: 'p'` → « pag », ce qui casse le rendu en
// silence : la page se construit, mais l'icône n'existe pas et le bloc n'est
// plus reconnu. Deux filets superposés.

/** 1. Clés dont la valeur est TOUJOURS technique, quel que soit son contenu. */
const CLES_TECHNIQUES = new Set([
  'slug',
  'icon',
  'id',
  'kind',
  'href',
  'url',
  'src',
  'image',
  'cover',
  'permalink',
  'anchor',
  'datePublished',
  'dateModified',
  'youtubeId',
  'code',
  'lang',
  'external',
])

/**
 * 2. Formes qui trahissent un identifiant, même sous une clé anodine.
 * De la prose réelle contient toujours une majuscule, un accent ou une espace :
 * ces motifs ne peuvent donc pas l'attraper par erreur.
 */
function estTechnique(valeur) {
  const v = valeur.trim()
  if (!v) return true
  if (/^[/#]/.test(v)) return true // chemin ou ancre
  if (/^(https?:|mailto:|tel:)/i.test(v)) return true // URL
  if (/^\d{4}-\d{2}-\d{2}/.test(v)) return true // date ISO
  if (/^[a-z0-9]+([-_:.][a-z0-9]+)*$/.test(v)) return true // slug / icône / clé
  if (/^[a-z]{1,3}$/.test(v)) return true // discriminant (« p », « ul »)
  return false
}

const OUVRE = '<span class="notranslate">'
const FERME = '</span>'

/** Enveloppe les intouchables. Renvoie le texte prêt à envoyer. */
function proteger(texte) {
  let out = texte
  // 1. Les marqueurs de gabarit.
  out = out.replace(MARQUEUR, (m) => `${OUVRE}${m}${FERME}`)
  // 2. Les noms propres, longs d'abord. On ne protège pas ce qui est DÉJÀ
  //    dans un span (cas « Neotone » à l'intérieur de « Neotone¹ »).
  for (const nom of NOMS_PROPRES) {
    const motif = new RegExp(echapper(nom) + '(?!</span>)', 'g')
    out = out.replace(motif, (m, decalage, chaine) => {
      // Déjà protégé si le texte juste avant est l'ouverture d'un span.
      if (chaine.slice(Math.max(0, decalage - OUVRE.length), decalage) === OUVRE) return m
      // Ou si on est à l'intérieur d'un span déjà ouvert non refermé.
      const avant = chaine.slice(0, decalage)
      if (avant.lastIndexOf(OUVRE) > avant.lastIndexOf(FERME)) return m
      return `${OUVRE}${m}${FERME}`
    })
  }
  return out
}

/** Retire les enveloppes de protection après traduction. */
function deproteger(texte) {
  return texte.split(OUVRE).join('').split(FERME).join('')
}

function echapper(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** Redécode les entités HTML que l'API renvoie. */
function decoderEntites(texte) {
  return texte
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&') // en dernier, sinon on décode deux fois
}

const A_DES_BALISES = /<[a-z/][^>]*>/i

// ───────────────────────────────────────────────────────────────────────────
// RÉPARATION DES BALISES NON REFERMÉES
// ───────────────────────────────────────────────────────────────────────────
// Constat de la première passe : sur les phrases où la balise ferme la chaîne,
// l'API rend « …<span class="text-copper">Neotone los eleva » — le `</span>`
// a disparu. Un span non refermé n'est pas un détail cosmétique : il avale
// tout le texte qui suit et le repeint en cuivre.
//
// Ces balises inline ne s'imbriquent JAMAIS dans ce dépôt (un `<span>` ne
// contient pas un autre `<span>`). On peut donc refermer sans ambiguïté : à la
// fin de la chaîne, avant un `<br>`, ou avant une nouvelle ouverture de la même
// balise. C'est exactement la structure du français source.
const BALISES_INLINE = ['span', 'strong', 'em', 'b', 'i', 'a']

function reparerBalises(traduit) {
  let out = ''
  let reste = traduit
  const pile = []
  const motif = /<(\/?)([a-z][a-z0-9]*)\b[^>]*>/i

  const fermerTout = () => {
    while (pile.length) out += `</${pile.pop()}>`
  }

  let m
  while ((m = reste.match(motif))) {
    const [balise, slash, nomBrut] = m
    const nom = nomBrut.toLowerCase()
    const avant = reste.slice(0, m.index)
    reste = reste.slice(m.index + balise.length)

    out += avant
    if (slash) {
      // Fermeture explicite : elle solde la pile jusqu'à sa propre ouverture.
      const i = pile.lastIndexOf(nom)
      if (i === -1) continue // fermeture orpheline : on la jette
      while (pile.length > i + 1) out += `</${pile.pop()}>`
      pile.pop()
      out += balise
    } else if (BALISES_INLINE.includes(nom)) {
      // Ouverture : une balise inline déjà ouverte doit se refermer avant.
      if (pile.includes(nom)) fermerTout()
      out += balise
      pile.push(nom)
    } else {
      // `<br>`, `<hr>`… : rien ne doit rester ouvert par-dessus.
      if (nom === 'br' || nom === 'hr' || nom === 'p') fermerTout()
      out += balise
    }
  }
  out += reste
  fermerTout()
  return out
}

// ───────────────────────────────────────────────────────────────────────────
// Lecture des modules TypeScript source
// ───────────────────────────────────────────────────────────────────────────
/**
 * Transpile un module TS du site avec l'esbuild DÉJÀ présent dans
 * node_modules (Astro l'embarque) puis l'importe. Aucune dépendance ajoutée :
 * `bun.lock` est gelé.
 */
async function importerTS(fichierRelatif) {
  mkdirSync(TEMP, { recursive: true })
  const sortie = path.join(TEMP, path.basename(fichierRelatif).replace(/\.ts$/, '.mjs'))
  execFileSync(
    path.join(RACINE, 'node_modules', '.bin', 'esbuild'),
    [
      path.join(RACINE, fichierRelatif),
      '--bundle',
      '--format=esm',
      '--platform=node',
      `--outfile=${sortie}`,
      '--log-level=error',
    ],
    { cwd: RACINE },
  )
  return import(sortie + '?t=' + Date.now())
}

// ───────────────────────────────────────────────────────────────────────────
// Parcours en profondeur : collecte / reconstruction
// ───────────────────────────────────────────────────────────────────────────
/**
 * Collecte les chaînes RÉELLEMENT traduisibles. `cle` est le nom de la clé qui
 * porte la valeur (hérité à travers les tableaux : `items: string[]` sous une
 * clé technique reste technique).
 */
function collecter(valeur, sac = new Set(), cle = '') {
  if (typeof valeur === 'string') {
    if (CLES_TECHNIQUES.has(cle) || estTechnique(valeur)) return sac
    sac.add(valeur)
  } else if (Array.isArray(valeur)) {
    valeur.forEach((v) => collecter(v, sac, cle))
  } else if (valeur && typeof valeur === 'object') {
    Object.entries(valeur).forEach(([k, v]) => collecter(v, sac, k))
  }
  return sac
}

/**
 * Reconstruit la même structure en substituant les chaînes traduites. Ce qui
 * n'a pas été collecté n'est pas dans la table et ressort donc intact — les
 * valeurs techniques traversent sans être touchées.
 */
function reconstruire(valeur, table, cle = '') {
  if (typeof valeur === 'string') {
    if (CLES_TECHNIQUES.has(cle) || estTechnique(valeur)) return valeur
    const traduit = table.get(valeur)
    if (traduit === undefined) return valeur
    // Réparation à l'ÉCRITURE, pas au cache : elle est ainsi rejouable et
    // s'applique aussi aux chaînes traduites lors des passes précédentes.
    return A_DES_BALISES.test(valeur) ? reparerBalises(traduit) : traduit
  }
  if (Array.isArray(valeur)) return valeur.map((v) => reconstruire(v, table, cle))
  if (valeur && typeof valeur === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(valeur)) out[k] = reconstruire(v, table, k)
    return out
  }
  return valeur
}

// ───────────────────────────────────────────────────────────────────────────
// Appel de l'API
// ───────────────────────────────────────────────────────────────────────────
async function traduireLot(textes, format, cle) {
  const corps = new URLSearchParams()
  corps.set('target', 'es')
  corps.set('source', 'fr')
  corps.set('format', format)
  for (const t of textes) corps.append('q', t)

  const reponse = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${cle}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: corps,
  })
  if (!reponse.ok) {
    const detail = await reponse.text()
    // La clé peut apparaître dans l'URL renvoyée par Google : on la masque.
    throw new Error(`API ${reponse.status} — ${detail.replace(/key=[^&"'\s]+/g, 'key=***').slice(0, 500)}`)
  }
  const json = await reponse.json()
  return json.data.translations.map((t) => t.translatedText)
}

// ───────────────────────────────────────────────────────────────────────────
// Écriture des fichiers de sortie
// ───────────────────────────────────────────────────────────────────────────
const AVERTISSEMENT = (source, script) => `// ⚠️ FICHIER GÉNÉRÉ — NE PAS ÉDITER À LA MAIN.
//
// Traduction espagnole produite depuis le FRANÇAIS de \`${source}\` par
// \`scripts/${script}\` (Google Cloud Translation v2). La source de vérité reste
// le français : pour corriger un texte, corriger le français puis relancer le
// script — sinon la correction sera écrasée à la passe suivante.
//
// Les noms propres (Neotone, Yishama, Le Nid, noms de gammes…) et les marqueurs
// de gabarit (\`{link}\`, \`{n}\`…) sont protégés pendant la traduction et
// ressortent intacts. Une retouche PONCTUELLE et assumée reste possible : elle
// doit alors être reportée dans le cache \`scripts/.cache-traduction-es.json\`,
// sinon elle ne survivra pas.
`

function ecrireEs(objet) {
  const contenu =
    AVERTISSEMENT('src/i18n/dict.ts', 'traduire-i18n-es.mjs') +
    `\nimport type { Dict } from './dict'\n\nexport const es: Dict = ${JSON.stringify(objet, null, 2)}\n`
  writeFileSync(path.join(RACINE, 'src/i18n/es.ts'), contenu)
}

function ecrireGuidesEs(objet) {
  const contenu =
    AVERTISSEMENT('src/data/guides.ts', 'traduire-i18n-es.mjs') +
    `\nimport type { GuidesByLang } from './guides'\n\nexport const esGuides: GuidesByLang = ${JSON.stringify(objet, null, 2)}\n`
  writeFileSync(path.join(RACINE, 'src/data/guides-es.ts'), contenu)
}

// ───────────────────────────────────────────────────────────────────────────
// Programme principal
// ───────────────────────────────────────────────────────────────────────────
function lireCle(args) {
  if (process.env.GOOGLE_TRANSLATE_API_KEY) return process.env.GOOGLE_TRANSLATE_API_KEY
  const i = args.indexOf('--env')
  const fichier = i !== -1 ? args[i + 1] : ENV_PAR_DEFAUT
  if (!existsSync(fichier)) return null
  for (const ligne of readFileSync(fichier, 'utf8').split('\n')) {
    const m = ligne.match(/^\s*(?:export\s+)?GOOGLE_TRANSLATE_API_KEY\s*=\s*(.*)$/)
    if (m) return m[1].trim().replace(/^["']|["']$/g, '')
  }
  return null
}

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const budget = Number(args[args.indexOf('--budget') + 1]) || 300000
  const limite = args.includes('--limit') ? Number(args[args.indexOf('--limit') + 1]) : Infinity

  // 1. Charger les sources françaises.
  const modDict = await importerTS('src/i18n/dict.ts')
  const modGuides = await importerTS('src/data/guides.ts')
  const sourceDict = modDict.fr
  const sourceGuides = modGuides.guides.fr

  // 2. Cache existant.
  const cache = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, 'utf8')) : {}

  // 3. Inventaire des chaînes uniques, cache déduit.
  const toutes = collecter(sourceDict, collecter(sourceGuides))
  const aFaire = [...toutes].filter((s) => !(s in cache))
  const coutDe = (s) => proteger(s).length
  const coutTotal = aFaire.reduce((n, s) => n + coutDe(s), 0)

  console.log(`Chaînes uniques (dict + guides) : ${toutes.size}`)
  console.log(`Déjà en cache                   : ${toutes.size - aFaire.length}`)
  console.log(`À traduire                      : ${aFaire.length}  (${coutTotal} caractères protégés)`)
  console.log(`Plafond de cette passe          : ${budget}`)

  if (dryRun) {
    console.log('\n--dry-run : aucun appel réseau, aucune écriture.')
    return
  }

  const cle = lireCle(args)
  if (!cle) {
    console.error(
      "\nClé introuvable. Définir GOOGLE_TRANSLATE_API_KEY dans l'environnement,\n" +
        'ou passer --env <chemin d’un fichier .env qui la contient>.',
    )
    process.exit(1)
  }

  // 4. Traduction par lots, avec arrêt net au budget.
  let envoyes = 0
  let traduites = 0
  let stoppe = false
  const file = aFaire.slice(0, limite === Infinity ? aFaire.length : limite)

  // Deux files séparées : le format n'est pas le même.
  const besoinHtml = (s) => A_DES_BALISES.test(s) || proteger(s) !== s

  for (const format of ['text', 'html']) {
    if (stoppe) break
    const sousFile = file.filter((s) => (format === 'html' ? besoinHtml(s) : !besoinHtml(s)))
    let lot = []
    let lotCout = 0

    const vider = async () => {
      if (!lot.length) return
      const envoi = lot.map((s) => (format === 'html' ? proteger(s) : s))
      const resultats = await traduireLot(envoi, format, cle)
      lot.forEach((source, i) => {
        cache[source] = decoderEntites(deproteger(resultats[i]))
      })
      envoyes += lotCout
      traduites += lot.length
      // Écriture INCRÉMENTALE : une coupure ne perd rien de ce qui est payé.
      writeFileSync(CACHE, JSON.stringify(cache, null, 1))
      process.stdout.write(`\r  ${format} : ${traduites} chaînes · ${envoyes} caractères envoyés   `)
      lot = []
      lotCout = 0
    }

    for (const source of sousFile) {
      const cout = coutDe(source)
      if (envoyes + lotCout + cout > budget) {
        await vider()
        stoppe = true
        break
      }
      lot.push(source)
      lotCout += cout
      // Google v2 : 128 segments max par requête. On reste large.
      if (lot.length >= 100 || lotCout >= 20000) await vider()
    }
    if (!stoppe) await vider()
  }
  console.log('')

  if (stoppe) {
    console.log(`\n⛔ Plafond de ${budget} caractères atteint — arrêt net.`)
    console.log('   Le cache est écrit. Relancer le script reprendra exactement ici.')
  }

  // 5. Écriture des fichiers. Toute chaîne encore absente du cache ressort en
  //    FRANÇAIS : un repli visible vaut mieux qu'un trou, et le build passe.
  const table = new Map(Object.entries(cache))
  ecrireEs(reconstruire(sourceDict, table))
  ecrireGuidesEs(reconstruire(sourceGuides, table))

  const manquantes = [...toutes].filter((s) => !table.has(s)).length
  console.log(`\nÉcrit : src/i18n/es.ts et src/data/guides-es.ts`)
  console.log(`Caractères envoyés cette passe : ${envoyes}`)
  console.log(
    manquantes
      ? `⚠️  ${manquantes} chaînes encore en français (relancer le script pour les finir).`
      : '✅ Toutes les chaînes sont traduites.',
  )

  rmSync(TEMP, { recursive: true, force: true })
}

main().catch((e) => {
  console.error('\n' + e.message)
  process.exit(1)
})
