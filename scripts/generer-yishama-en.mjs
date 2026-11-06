#!/usr/bin/env node
/* Page Yishama : /en/handpan-app/yishama/ est GÉNÉRÉE depuis la page française /handpan-app/yishama/ (03/11/2026).
   Le corps vient de specs/traduction-yishama/en-4-final.json (fragments Y001...).
   La fenêtre d'inscription vient de la table de scripts/generer-vente-langues.mjs, comme la page Neotone.
   Page non référencée, sans menu : noindex gardé, pas de hreflang, pas de données structurées.
   S'arrête si un fragment français n'existe plus. Usage : node scripts/generer-yishama-en.mjs */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

const FR = 'public/handpan-app/yishama/index.html', D = 'specs/traduction-yishama/'
const URL_FR = 'https://www.lesagedavid.fr/handpan-app/yishama/', URL_EN = 'https://www.lesagedavid.fr/en/handpan-app/yishama/'
const src = readFileSync(FR, 'utf8')
const table = JSON.parse(readFileSync(D + 'table.json', 'utf8'))
const trad = JSON.parse(readFileSync(D + 'en-4-final.json', 'utf8'))

const lignes = readFileSync('scripts/generer-vente-langues.mjs', 'utf8').split(/\r?\n/)
const debut = lignes.findIndex((l) => l.startsWith('const T = [')), fin = lignes.findIndex((l, i) => i > debut && l === ']')
const T = []
for (const l of lignes.slice(debut + 1, fin).map((x) => x.trim())) {
  if (l && !l.startsWith('//')) T.push((0, eval)(l.replace(/,$/, '')))
}
T.sort((a, b) => b[0].length - a[0].length)

let out = src
// La coquille (hors <main>) : table de la page de vente.
const a = out.indexOf('<main>'), b = out.indexOf('</main>')
let avant = out.slice(0, a), apres = out.slice(b)
for (const row of T) {
  avant = avant.split(row[0]).join(row[1])
  apres = apres.split(row[0]).join(row[1])
}
out = avant + out.slice(a, b) + apres
// Le corps, et les balises de tête : fragments les plus longs d'abord.
const ids = Object.keys(table).sort((x, y) => table[y].fr.length - table[x].fr.length)
for (const id of ids) {
  const fr = table[id].fr
  if (!src.includes(fr)) {
    if (table[id].section === 'fenetre') continue // bouton propre à la page Neotone, absent ici
    console.error(`${id} introuvable, table à refaire : ${fr.slice(0, 100)}`); process.exit(1)
  }
  out = out.split(fr).join(trad[id])
}

out = out.replace('<html lang="fr">', '<html lang="en">')
  .replace(`<link rel="canonical" href="${URL_FR}">`, `<link rel="canonical" href="${URL_EN}">`)
  .replace(`<meta property="og:url" content="${URL_FR}">`, `<meta property="og:url" content="${URL_EN}">`)
  .replace('<meta property="og:locale" content="fr_FR">', '<meta property="og:locale" content="en_GB">')
  .replace('aria-label="Informations légales"', 'aria-label="Legal information"')
  .split('href="/mentions-legales/">Mentions légales<').join('href="/en/mentions-legales/">Legal notice<')
  .split('href="/conditions-generales/">Conditions générales<').join('href="/en/conditions-generales/">Terms and conditions<')
  .split('href="/politique-de-confidentialite/">Confidentialité<').join('href="/en/politique-de-confidentialite/">Privacy<')
  .split('href="/conditions-generales/"').join('href="/en/conditions-generales/"')
  .split('href="/politique-de-confidentialite/"').join('href="/en/politique-de-confidentialite/"')
  .split('href="/mentions-legales/"').join('href="/en/mentions-legales/"')
if (!out.includes('<meta name="robots" content="noindex, nofollow">')) { console.error('noindex perdu'); process.exit(1) }

mkdirSync('public/en/handpan-app/yishama', { recursive: true })
writeFileSync('public/en/handpan-app/yishama/index.html', out)

// Contrôle : français resté visible.
const vis = out.slice(out.indexOf('<body'))
  .replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, '\n')
const reste = vis.split('\n').map((x) => x.trim()).filter((x) => /\b(ton|tes|une|les|des|et|mois|gamme|gratuit|carte|accord|le|la|du|pour)\b/i.test(x))
console.log(`en : ${out.length} caractères ; lignes suspectes ${reste.length}`)
reste.slice(0, 40).forEach((x) => console.log('   ', x.slice(0, 110)))
const js = [...out.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n')
const jsfr = [...js.matchAll(/'([^'\n]{12,})'/g)].map((m) => m[1]).filter((x) => /[éèàçù]|\b(ton|les|des|une|mois)\b/.test(x))
console.log(`chaînes françaises dans le JS : ${jsfr.length}`)
jsfr.slice(0, 30).forEach((x) => console.log('   ', x.slice(0, 110)))
