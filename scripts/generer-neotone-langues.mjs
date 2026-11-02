#!/usr/bin/env node
/* Page de vente Neotone : /en/handpan-app/neotone/ et /es/handpan-app/neotone/ sont GÉNÉRÉES depuis la page française.
   Le corps vient de specs/traduction-neotone/{en,es}-4-final.json (fragments N001...).
   Le menu, le pied et la fenêtre d'inscription viennent de la table de scripts/generer-vente-langues.mjs,
   pour que les deux pages de vente disent la même chose. S'arrête si un fragment français n'existe plus.
   Usage : node scripts/generer-neotone-langues.mjs [script contenant la table, défaut scripts/generer-vente-langues.mjs] */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

const FR = 'public/handpan-app/neotone/index.html', D = 'specs/traduction-neotone/'
const src = readFileSync(FR, 'utf8')
const table = JSON.parse(readFileSync(D + 'table.json', 'utf8'))

const lignes = readFileSync(process.argv[2] || 'scripts/generer-vente-langues.mjs', 'utf8').split(/\r?\n/)
const debut = lignes.findIndex((l) => l.startsWith('const T = [')), fin = lignes.findIndex((l, i) => i > debut && l === ']')
const T = []
for (const l of lignes.slice(debut + 1, fin).map((x) => x.trim())) {
  if (l && !l.startsWith('//')) T.push((0, eval)(l.replace(/,$/, '')))
}
T.sort((a, b) => b[0].length - a[0].length)

const META = { en: { lang: 'en', locale: 'en_GB', col: 1 }, es: { lang: 'es', locale: 'es_ES', col: 2 } }
const URL_FR = 'https://www.lesagedavid.fr/handpan-app/neotone/'
const plain = (v) => v.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()

for (const m of Object.values(META)) {
  const trad = JSON.parse(readFileSync(`${D}${m.lang}-4-final.json`, 'utf8'))
  let out = src
  // La coquille d'abord, hors du corps : ses lignes de table portent des blocs entiers (fenêtre d'inscription).
  // Le bouton propre à cette page repasse par le texte de la table, puis reçoit sa traduction.
  const BTN = 'Continuer : enregistrer ma carte', BTN_ID = Object.keys(table).find((k) => table[k].fr === BTN)
  const a = out.indexOf('<main>'), b = out.indexOf('</main>')
  let avant = out.slice(0, a), apres = out.slice(b).split(BTN).join('Continuer vers le paiement')
  for (const row of T) {
    avant = avant.split(row[0]).join(row[m.col])
    apres = apres.split(row[0]).join(row[m.col])
  }
  const blocBtn = T.find((r) => r[0].includes('Continuer vers le paiement'))
  const btnTrad = blocBtn[m.col].match(/envoi\.textContent='([^']*)'\}?$/)
  if (!btnTrad) { console.error('bouton de la fenêtre introuvable dans la table'); process.exit(1) }
  apres = apres.split(btnTrad[1]).join(trad[BTN_ID])
  out = avant + out.slice(a, b) + apres
  // Le corps : fragments les plus longs d'abord.
  const ids = Object.keys(table).sort((x, y) => table[y].fr.length - table[x].fr.length)
  for (const id of ids) {
    const fr = table[id].fr
    if (id === BTN_ID || !src.includes(fr)) { if (id !== BTN_ID) { console.error(`${id} introuvable, table à refaire : ${fr.slice(0, 100)}`); process.exit(1) } continue }
    out = out.split(fr).join(trad[id])
  }

  out = out.replace('<html lang="fr">', `<html lang="${m.lang}">`)
    .replace(`<link rel="canonical" href="${URL_FR}">`, `<link rel="canonical" href="https://www.lesagedavid.fr/${m.lang}/handpan-app/neotone/">`)
    .replace(`<meta property="og:url" content="${URL_FR}">`, `<meta property="og:url" content="https://www.lesagedavid.fr/${m.lang}/handpan-app/neotone/">`)
    .replace('<meta property="og:locale" content="fr_FR">', `<meta property="og:locale" content="${m.locale}">`)
    .replace('<a href="/handpan-app/" aria-current="page">', `<a href="/${m.lang}/handpan-app/" aria-current="page">`)
    .replace(' aria-current="true">Français', '>Français')
    .replace(new RegExp(`(data-lang-pick="${m.lang}")>`), '$1 aria-current="true">')
    .replace(/<!--[\s\S]*?-->\n?/g, '')
    .replace(/<script>(?:(?!<\/script>)[\s\S])*?lang-auto(?:(?!<\/script>)[\s\S])*?<\/script>\s*/, '') // une page localisée ne redirige jamais

  // Données structurées : la FAQ visible, à l'identique.
  const z = out.slice(out.indexOf('<section id="faq"'), out.indexOf('<section id="fin"'))
  const faq = [...z.matchAll(/<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)]
    .map(([, q, r]) => ({ '@type': 'Question', name: plain(q), acceptedAnswer: { '@type': 'Answer', text: plain(r) } }))
  if (faq.length !== 6) { console.error(`FAQ : 6 questions attendues, ${faq.length}`); process.exit(1) }
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq })
  out = out.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, () => `<script type="application/ld+json">${ld}</script>`)

  mkdirSync(`public/${m.lang}/handpan-app/neotone`, { recursive: true })
  writeFileSync(`public/${m.lang}/handpan-app/neotone/index.html`, out)

  // Contrôle : français resté visible.
  const vis = out.slice(out.indexOf('<body'))
    .replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, '\n')
  const reste = vis.split('\n').map((x) => x.trim()).filter((x) => /\b(ton|tes|une|les|des|et|mois|gamme|gratuit|carte|accord)\b/i.test(x))
  console.log(`${m.lang} : ${out.length} caractères ; lignes suspectes ${reste.length}`)
  reste.slice(0, 25).forEach((x) => console.log('   ', x.slice(0, 110)))
}
