#!/usr/bin/env node
/* Lit la table de scripts/generer-vente-langues.mjs sans l'exécuter.
   Identifiant d'une ligne = son numéro de ligne dans le script (table figée pendant la passe).
   Écrit source-fr.md (français seul, pour un rédacteur à l'aveugle) et table.json (les trois colonnes). */
import { readFileSync, writeFileSync } from 'node:fs'
const dir = 'specs/traduction-vente/'
const lignes = readFileSync('scripts/generer-vente-langues.mjs', 'utf8').split(/\r?\n/)
const debut = lignes.findIndex((l) => l.startsWith('const T = [')), fin = lignes.findIndex((l, i) => i > debut && l === ']')
const rows = {}; let section = ''; const md = ['# Page de vente V4.1 : le français, ligne par ligne', '']
for (let i = debut + 1; i < fin; i++) {
  const l = lignes[i].trim()
  if (l.startsWith('//')) { section = l.replace(/^\/\/\s*=*\s*/, '').replace(/\s*=*$/, ''); md.push('', `## ${section}`, ''); continue }
  if (!l) continue
  const [fr, en, es] = (0, eval)(l.replace(/,$/, ''))
  const id = `L${i + 1}`
  rows[id] = { section, fr, en, es }
  md.push(`- **${id}** : \`${fr.replace(/`/g, "'")}\``)
}
writeFileSync(dir + 'table.json', JSON.stringify(rows, null, 1))
writeFileSync(dir + 'source-fr.md', md.join('\n') + '\n')
console.log(Object.keys(rows).length, 'lignes')
