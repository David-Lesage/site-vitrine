// Doublures locales (aucun réseau, aucune base, aucun e-mail) pour test-local/antispam.test.ts.
export const etat: { verdict: string | null; inserts: any[]; updates: any[]; mails: any[] } = { verdict: null, inserts: [], updates: [], mails: [] };
class Requete {
  cols = ''; op = 'select'; payload: any = null; table: string;
  constructor(t: string) { this.table = t; }
  select(c = '') { if (this.op === 'select') this.cols = c; return this; }
  insert(p: any) { this.op = 'insert'; this.payload = p; etat.inserts.push({ table: this.table, ...p }); return this; }
  update(p: any) { this.op = 'update'; this.payload = p; etat.updates.push({ table: this.table, ...p }); return this; }
  eq() { return this; } limit() { return this; } order() { return this; } gte() { return this; } not() { return this; } is() { return this; }
  resultat() {
    if (this.op === 'insert') return { data: { id: 'lead-test' }, error: null };
    if (this.op === 'select' && this.cols.includes('spam_statut')) return { data: etat.verdict ? { spam_statut: etat.verdict, spam_score: 5, spam_raisons: ['lien vers un site externe'] } : { spam_statut: 'non' }, error: null };
    return { data: null, error: null };
  }
  maybeSingle() { return Promise.resolve(this.resultat()); }
  single() { return Promise.resolve(this.resultat()); }
  then(ok: any, ko: any) { return Promise.resolve(this.resultat()).then(ok, ko); }
}
export function createClient() {
  return { from: (t: string) => new Requete(t), rpc: () => Promise.resolve({ data: null, error: null }) };
}
export class SMTPClient {
  constructor(_o: unknown) {}
  async send(m: any) { etat.mails.push(m); }
  async close() {}
}
