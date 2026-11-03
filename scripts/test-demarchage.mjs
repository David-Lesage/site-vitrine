// Test des règles de démarchage (src/lib/demarchage.js) sur un corpus commun.
//   node scripts/test-demarchage.mjs         → règles JavaScript seules
//   node scripts/test-demarchage.mjs --sql   → + parité avec la fonction SQL générée
//                                              (fonction temporaire, rien n'est écrit en base)
// Les deux premiers cas reprennent de VRAIS messages reçus le 03/11/2026, liens
// remplacés par https://exemple.invalid/… (ne jamais recopier les liens réels).
import { execFileSync } from 'node:child_process'
import { writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { evaluerDemarchage } from '../src/lib/demarchage.js'

export const CORPUS = [
  { nom: 'rédacteur freelance + agenda (reçu, EN)', attendu: 'probable',
    message: "[Buying a Neotone] Hi David, I'm a freelance writer working with music brands. I write SEO-friendly blog posts that bring steady traffic and help you grow your audience. If that sounds useful, book a quick call here: https://exemple.invalid/calendly/30min Best, Alex" },
  { nom: 'flatterie + page « à ton nom » (reçu, EN)', attendu: 'probable',
    message: "[Other] Hello David, I came across your work and I love the colour method you use to teach the handpan. What does a session in Paris cost? Everything is laid out on this page: https://exemple.invalid/p/lesagedavid Kind regards" },
  { nom: 'vraie demande de cours (FR)', attendu: 'non',
    message: "[Cours] Bonjour David, je débute au handpan (un D Kurd 9 notes) et j'aimerais prendre un cours d'une heure au showroom un samedi matin. Merci !" },
  { nom: 'vrai acheteur avec vidéo YouTube (EN)', attendu: 'non',
    message: "[Buying a Neotone] Hi, I'm interested in a Neotone Mutant in walnut. Could I try it at the showroom next week? Here is me playing: https://www.youtube.com/watch?v=exemple" },
  { nom: 'agence SEO (ES)', attendu: 'probable',
    message: "[Otro] Hola, somos una agencia de marketing digital. Podemos aumentar tus ventas con posicionamiento SEO. Auditoría gratuita." },
  { nom: 'fabricant qui propose un instrument (EN, lien)', attendu: 'non',
    message: "[Collaboration] Hello, I'm a handpan maker based in Spain and would be happy to send you an instrument to try. https://exemple.invalid/atelier" },
  { nom: 'adresse e-mail dans le message (FR)', attendu: 'non',
    message: "[Autre] Bonjour, répondez-moi plutôt sur prenom@exemple.invalid, c'est pour un cours de handpan." },
  { nom: 'web design + plusieurs liens (EN)', attendu: 'probable',
    message: "[Handpan Constellation Studio] Hi! Our web design agency builds beautiful websites. Portfolio: https://exemple.invalid/a https://exemple.invalid/b exemple-agence.com" },
]

let echecs = 0
const js = CORPUS.map((c) => evaluerDemarchage(c.message))
CORPUS.forEach((c, i) => {
  const r = js[i]
  const ok = r.statut === c.attendu
  if (!ok) echecs++
  console.log(`${ok ? '✓' : '✗'} ${c.nom} → ${r.statut} (${r.score})${r.raisons.length ? ' · ' + r.raisons.join(' ; ') : ''}`)
})

if (process.argv.includes('--sql')) {
  const fn = execFileSync('node', [new URL('./generer-sql-demarchage.mjs', import.meta.url).pathname], { encoding: 'utf8' })
    .replace('public.site_lead_demarchage', 'pg_temp.site_lead_demarchage')
  const lit = (s) => `$m$${s}$m$`
  const sql = `${fn}\nselect jsonb_agg(pg_temp.site_lead_demarchage(m) order by n) as r from unnest(array[${CORPUS.map((c) => lit(c.message)).join(',')}]) with ordinality as t(m, n);\n`
  const dir = mkdtempSync(join(tmpdir(), 'demarchage-'))
  const f = join(dir, 'test.sql')
  writeFileSync(f, sql)
  const out = execFileSync(process.env.SUPABASE_BIN || `${process.env.HOME}/.local/bin/supabase`, ['db', 'query', '--linked', '-f', f], { encoding: 'utf8', cwd: process.env.SUPABASE_WORKDIR || process.cwd() })
  const json = JSON.parse(out.slice(out.indexOf('{')))
  const r = json.rows[0].r
  const sqlRes = typeof r === 'string' ? JSON.parse(r) : r
  CORPUS.forEach((c, i) => {
    const a = js[i], b = sqlRes[i]
    const same = a.score === b.score && a.statut === b.statut && JSON.stringify(a.raisons) === JSON.stringify(b.raisons)
    if (!same) echecs++
    console.log(`${same ? '✓' : '✗'} parité SQL · ${c.nom}${same ? '' : ` → JS ${JSON.stringify(a)} / SQL ${JSON.stringify(b)}`}`)
  })
}

if (echecs) { console.error(`✗ ${echecs} échec(s)`); process.exit(1) }
console.log('✓ tout est conforme')
