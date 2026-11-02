// Régénère l'aperçu local du modèle d'e-mail Muling, avec des données FICTIVES.
//   deno run --allow-write=. scripts/apercu-email-muling.ts
import { composerMailClient, urlPage, type DonneesMail, type LangueMail } from '../supabase/functions/_shared/muling-email-modele.ts';

const fiche = (langue: LangueMail): DonneesMail => ({
    langue, variante: 'commande', prenom: 'Camille', reference: 'RESONANCE-EXEMPLE0', quantite: 1, montant: 245, showroom: false,
    banque: { beneficiary: 'Bénéficiaire fictif', iban: 'XX00 0000 0000 0000 0000 00', bic: 'XXXXXXXX', bank: 'Banque fictive' },
    urlDepot: urlPage('jeton-fictif', langue), urlAnnuler: urlPage('jeton-fictif', langue, true),
});
const blocs = (['fr', 'en', 'es'] as LangueMail[]).map((l) => {
    const m = composerMailClient(fiche(l));
    return `<h2 style="font:600 15px sans-serif;margin:24px 16px 8px;">${l.toUpperCase()} · ${m.subject}</h2><iframe title="${l}" style="width:100%;height:860px;border:0;" srcdoc="${m.html.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"></iframe>`;
}).join('\n');
await Deno.writeTextFile('supabase/functions/_shared/apercu-email-muling.html',
    `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Aperçu e-mail Muling (données fictives)</title></head><body style="margin:0;background:#e5e7eb;">\n${blocs}\n</body></html>\n`);
