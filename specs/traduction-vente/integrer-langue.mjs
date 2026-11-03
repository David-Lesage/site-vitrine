#!/usr/bin/env node
/* Réécrit une colonne de la table du script depuis un JSON {Lnnn: texte}, ligne à ligne, sans toucher aux autres colonnes.
   Contrôle d'abord : balises et nombres du français présents, pas de tiret cadratin. Bloque au moindre écart.
   Une ligne déjà identique (technique, ou déjà intégrée) n'est pas contrôlée.
   Usage : node specs/traduction-vente/integrer-langue.mjs en specs/traduction-vente/complet/en-4-final.json */
import { readFileSync, writeFileSync, renameSync } from 'node:fs'
const [lang, fichier] = process.argv.slice(2), col = { en: 1, es: 2 }[lang]
const S = 'scripts/generer-vente-langues.mjs', d = JSON.parse(readFileSync(fichier, 'utf8'))
const brut = readFileSync(S, 'utf8'), nl = brut.includes('\r\n') ? '\r\n' : '\n', L = brut.split(/\r?\n/)

// Les attributs de texte lisible se traduisent : ils sortent de la comparaison des balises.
const tags = (s) => (s.match(/<[^>]+>/g) || [])
  .map((t) => t.replace(/\/(en|es)\//g, '/').replace(/\s(alt|title|aria-label|data-mens|data-ann)="[^"]*"/g, ''))
  .join('|')
// Les prix de data-mens et data-ann restent dans la comparaison des nombres.
const nombres = (s) => (s
  .replace(/<[^>]+>/g, (t) => ' ' + (t.match(/data-(?:mens|ann)="[^"]*"/g) || []).join(' ') + ' ')
  .replace(/(\d),(\d)/g, '$1.$2')
  .match(/\d+(?:\.\d+)?/g) || []).sort().join(' ')

const pb = []
let n = 0
for (const [id, txt] of Object.entries(d)) {
  const i = Number(id.slice(1)) - 1, row = (0, eval)(L[i].trim().replace(/,$/, ''))
  if (row[col] === txt) continue
  if (txt.includes('—')) pb.push(`${id} tiret cadratin`)
  if (tags(row[0]) !== tags(txt)) pb.push(`${id} balises\n  ${tags(row[0])}\n  ${tags(txt)}`)
  if (nombres(row[0]) !== nombres(txt)) pb.push(`${id} nombres : ${nombres(row[0])} / ${nombres(txt)}`)
  row[col] = txt
  L[i] = `  [${row.map((v) => JSON.stringify(v)).join(', ')}],`
  n++
}
if (pb.length) { console.error(pb.join('\n')); console.error(pb.length, 'écarts, rien écrit'); process.exit(1) }
writeFileSync(S + '.tmp', L.join(nl))
renameSync(S + '.tmp', S)
console.log(n, 'lignes réécrites sur', Object.keys(d).length)
