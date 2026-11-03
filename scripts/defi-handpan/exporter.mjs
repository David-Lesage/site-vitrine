// Exporte le DESSIN DU HANDPAN DE L'APP pour le « petit exercice » des formulaires
// (03/11/2026, demande de David : « même rendu que l'app […] ne crée PAS un nouveau dessin »).
//
//   node scripts/defi-handpan/exporter.mjs "<dossier de l'app Handpan Studio>"
//
// 1. compile, DANS le dépôt de l'app, `createMiniHandpanSvg` (partition-renderer.ts) et
//    `getGeometricChordSequence` (layout.ts) avec le harnais de ses tests
//    (scripts/test-grille-nuance.mjs : DOM minimal simulé, rien de remplacé) ;
// 2. dessine le pan Neotone Mutant en Ré mineur et 6 accords, tels que l'app les dispose ;
// 3. écrit src/data/defiHandpan.json (pan neutre + ordre de jeu de chaque accord).
// ⚠️ Les accords doivent rester ceux de `defi_formulaire_creer()` (migration 0321 de l'app).
// Fichiers temporaires dans l'app : .defi-export.* (effacés à la fin, jamais commités).
import { readFileSync, writeFileSync, copyFileSync, unlinkSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ici = path.dirname(fileURLToPath(import.meta.url))
const app = process.argv[2]
if (!app) { console.error('Usage : node scripts/defi-handpan/exporter.mjs "<dossier de l\'app>"'); process.exit(1) }
const brut = path.join(ici, 'export-brut.tmp.json')
const entree = path.join(app, '.defi-export.tmp.ts')
const lanceur = path.join(app, '.defi-export-runner.tmp.mjs')
copyFileSync(path.join(ici, 'entree-app.ts.txt'), entree)
let r = readFileSync(path.join(app, 'scripts/test-grille-nuance.mjs'), 'utf8')
  .replaceAll('grille-nuance.test.ts', '.defi-export.tmp.ts')
  .replaceAll('.grille-nuance.test.tmp.mjs', '.defi-export.out.tmp.mjs')
  .replaceAll('.grille-nuance.prelude.tmp.mjs', '.defi-export.prelude.tmp.mjs')
  .replace(/const racine = .*/, `const racine = ${JSON.stringify(app)};`)
  .replace('globalThis.location = {', 'globalThis.screen = { width: 1280, height: 800 }; globalThis.devicePixelRatio = 1; globalThis.location = {')
  .replace("b.onResolve({ filter: /^tone$/ }", "b.onResolve({ filter: /\\?(inline|url|raw)$|\\.(webp|jpg|jpeg|glb|gltf|woff2?)$/ }, () => ({ path: 'x', namespace: 'vide' }));\n            b.onLoad({ filter: /.*/, namespace: 'vide' }, () => ({ contents: 'export default \"\"' }));\n            b.onResolve({ filter: /^tone$/ }")
writeFileSync(lanceur, r)
const res = spawnSync(process.execPath, [lanceur], { stdio: 'inherit', env: { ...process.env, SORTIE: brut } })
for (const f of [entree, lanceur]) { try { unlinkSync(f) } catch {} }
if (res.status !== 0) process.exit(res.status ?? 1)

const d = JSON.parse(readFileSync(brut, 'utf8'))
unlinkSync(brut)
const NOMS = { 'D:Mineur': 'Dm', 'F:Majeur': 'F', 'G:Mineur': 'Gm', 'A:Mineur': 'Am', 'C:Majeur': 'C', 'A#:Majeur': 'Bb' }
const accords = d.accords.filter((a) => NOMS[`${a.root}:${a.type}`]).map((a) => ({ accord: NOMS[`${a.root}:${a.type}`], notes: a.ordre }))
// Pan NEUTRE : le SVG de l'app pour le 1er accord, toutes les notes remises en « fantôme »,
// sans tracé ni libellé — le navigateur pose ensuite l'accord tiré par le serveur.
let svg = d.accords[0].svg
  .replace(/<path [^>]*class="chord-path"[^>]*\/>/g, '')
  .replace(/<text [^>]*class="note-text"[^>]*>[^<]*<\/text>/g, '')
  .replace(/<circle [^>]*class="ripple-circle"[^>]*\/>/g, '')
  .replace(/class="note-group [^"]*"/g, 'class="note-group ghost-note"')
  .replace(/(class="note-circle-base") style="[^"]*"/g, '$1')
  .replace(/<text [^>]*class="note-number-text-mini"[^>]*>[^<]*<\/text>/g, '')
  .replace(/ data-notes="[^"]*"/, '')
  .replace(/material-[a-z-]+/, 'material-neotone')
  .replace(/style="fill: url\(#[^)]*\); "/, '')
writeFileSync(path.join(ici, '../../src/data/defiHandpan.json'), JSON.stringify({
  source: "Export de createMiniHandpanSvg (app Handpan Studio, partition-renderer.ts) — pan Neotone Mutant, Ré mineur. Régénérer : node scripts/defi-handpan/exporter.mjs <app>",
  notes: d.layout.map((n) => ({ note: n.note, cx: Math.round(n.cx * 10) / 10, cy: Math.round(n.cy * 10) / 10, r: n.r })),
  accords,
  svg,
}, null, 1) + '\n')
console.log(`✓ src/data/defiHandpan.json — ${accords.length} accords, SVG ${svg.length} caractères`)
