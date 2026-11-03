// Test LOCAL de site-lead (anti-démarchage, 03/11/2026) — sans réseau ni base ni e-mail :
//   cd supabase/functions/site-lead && deno test --allow-env --allow-read --import-map=test-local/import_map.json test-local/antispam.test.ts
import { etat } from './mocks.ts';
let handler: (r: Request) => Promise<Response>;
// deno-lint-ignore no-explicit-any
Object.defineProperty(Deno, "serve", { value: (h: any) => { handler = h; }, configurable: true, writable: true });
for (const [k, v] of Object.entries({ SMTP_HOST: 'smtp.exemple.invalid', SMTP_USER: 'u', SMTP_PASS: 'p', SMTP_FROM: 'Site <envoi@exemple.invalid>', SUPABASE_URL: 'http://x', SUPABASE_SERVICE_ROLE_KEY: 'x' })) Deno.env.set(k, v);
await import('../index.ts');

const base = { email: 'visiteur@exemple.invalid', firstName: 'Test', lastName: 'Local', phone: '+33 1 00 00 00 00', source: 'contact', lang: 'fr', termsAccepted: true, message: '[Cours] Bonjour, un cours de handpan svp' };
async function envoyer(extra: Record<string, unknown>, verdict: string | null) {
  etat.verdict = verdict; etat.inserts = []; etat.updates = []; etat.mails = [];
  const r = await handler(new Request('http://x/site-lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...base, ...extra }) }));
  return { status: r.status, corps: await r.json(), mails: [...etat.mails], inserts: [...etat.inserts] };
}
const assert = (c: unknown, m: string) => { if (!c) throw new Error(m); };
// deno-lint-ignore no-explicit-any
const corps = (m: any) => (m.mimeContent as { content: string }[]).map((p) => new TextDecoder().decode(Uint8Array.from(atob(p.content.replace(/\s+/g, '')), (c) => c.charCodeAt(0)))).join('');

Deno.test('vraie demande → accusé + notification vers contact+site, expéditeur « Formulaire du site »', async () => {
  const r = await envoyer({ exercice: 'reussi' }, 'non');
  assert(r.status === 200, 'statut');
  const n = r.mails.find((m) => m.replyTo);
  assert(n && n.to === 'contact+site@lesagedavid.fr', 'destinataire ' + n?.to);
  assert(n.from === '"Formulaire du site" <envoi@exemple.invalid>', 'expéditeur ' + n.from);
  assert(!String(n.subject).includes('Démarchage'), 'objet');
  assert(corps(n).includes('réussi ✓'), 'ligne exercice');
});
Deno.test('démarchage probable → contact+demarchage, objet préfixé, raisons en tête', async () => {
  const r = await envoyer({ avertiDemarchage: true }, 'probable');
  const n = r.mails.find((m) => m.replyTo);
  assert(n && n.to === 'contact+demarchage@lesagedavid.fr', 'destinataire ' + n?.to);
  const objet = String(n.subject).replace(/=\?utf-8\?B\?([^?]+)\?=/g, (_m: string, b: string) => new TextDecoder().decode(Uint8Array.from(atob(b), (c) => c.charCodeAt(0)))).replace(/\?= =\?/g, '');
  assert(objet.replace(/ (?=\S)/g, ' ').includes('[⚠️ Démarchage probable]') || objet.includes('Démarchage probable]'), 'objet ' + n.subject + ' / ' + objet);
  const html = corps(n);
  assert(html.indexOf('Démarchage probable') < html.indexOf('Motif'), 'raisons en tête');
  assert(html.includes('lien vers un site externe'), 'raisons');
});
Deno.test('robot certain (pot de miel) → enregistré « certain », AUCUN e-mail', async () => {
  const r = await envoyer({ spamCertain: ['champ invisible rempli (pot de miel)'] }, null);
  assert(r.status === 200 && r.mails.length === 0, 'mails ' + r.mails.length);
  assert(r.inserts.some((i) => i.spam_statut === 'certain'), 'insert certain');
});
Deno.test('adresse bloquée (verdict « certain » de la base) → AUCUN e-mail', async () => {
  const r = await envoyer({}, 'certain');
  assert(r.status === 200 && r.mails.length === 0, 'mails ' + r.mails.length);
});
