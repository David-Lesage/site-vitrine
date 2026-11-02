// =============================================================================
// Modèle d'e-mail client Muling, UN SEUL : commande, renvoi du lien, bouton admin et, plus tard,
// relances. De vrais boutons, aucun long lien visible en HTML ; la partie texte porte les liens
// en repli. Pur : aucun accès réseau, ce qui permet l'aperçu local (scripts/apercu-email-muling.ts).
// =============================================================================

export type LangueMail = 'fr' | 'en' | 'es';
export type VarianteMail = 'commande' | 'lien' | 'admin' | 'relance';

export interface CoordonneesBancaires {
    beneficiary: string | null;
    iban: string;
    bic: string | null;
    bank: string | null;
}

export interface DonneesMail {
    langue: LangueMail;
    variante: VarianteMail;
    prenom: string;
    reference: string;
    quantite: number;
    montant: number | string;
    showroom: boolean;
    /** null : réglage non renseigné, le bloc est remplacé par une phrase d'attente. */
    banque: CoordonneesBancaires | null;
    urlDepot: string;
    /** null : lien de secours sans jeton, pas de bouton d'annulation. */
    urlAnnuler: string | null;
}

export const SITE_URL = 'https://www.lesagedavid.fr';

export function urlPage(jeton: string, langue: LangueMail, annuler = false): string {
    return `${SITE_URL}/commande-muling/?t=${encodeURIComponent(jeton)}&l=${langue}${annuler ? '&action=annuler' : ''}`;
}

/** L'ancien lien, sans jeton : la page demande l'e-mail de la commande. */
export function urlAncienLien(saleId: string, langue: LangueMail): string {
    const prefixe = langue === 'fr' ? '' : `/${langue}`;
    return `${SITE_URL}${prefixe}/micro-muling/?commande=${saleId}`;
}

const TEXTES = {
    fr: {
        objets: { commande: 'Ta commande Muling', lien: 'Ton lien pour ta commande Muling', admin: 'Virement de ta commande Muling', relance: 'Rappel : ta commande Muling attend ton virement' },
        titres: { commande: 'Merci pour ta commande', lien: 'Voici le lien de ta commande', admin: 'Les informations de ton virement', relance: 'Ta commande attend ton virement' },
        intros: {
            commande: 'J’ai bien reçu ta commande. Elle sera validée et transmise à Muling dès que ta preuve de virement sera déposée.',
            lien: 'Tu as demandé à reprendre ta commande. Elle sera validée et transmise à Muling dès que ta preuve de virement sera déposée.',
            admin: 'Voici de quoi faire ton virement. Ta commande sera validée et transmise à Muling dès que ta preuve sera déposée.',
            relance: 'Ta commande n’est pas encore validée : je n’ai pas reçu de preuve de virement.',
        },
        showroom: 'Tu récupères ton micro en main propre au showroom : rien ne sera expédié.',
        bonjour: (p: string) => p ? `Bonjour ${p},` : 'Bonjour,',
        recap: 'Récapitulatif', quantite: 'Quantité', montant: 'Montant à virer', reference: 'Référence à indiquer',
        virement: 'Coordonnées du virement', beneficiaire: 'Bénéficiaire', banque: 'Banque',
        sepa: 'Paiement en euros, par virement SEPA uniquement. Indique bien la référence dans le libellé.',
        attente: 'Je t’envoie les coordonnées du virement très vite.',
        etape: 'Une fois le virement fait, dépose ta preuve (capture d’écran ou PDF).',
        depot: 'Déposer ma preuve de virement', annuler: 'Annuler ma commande',
        annulerNote: 'Tu as changé d’avis ? Rien ne sera annulé sans confirmation de ta part sur la page.',
        expire: 'Ce lien personnel reste valable 30 jours. Ne le transfère pas.',
        signature: 'Merci,', texteDepot: 'Déposer ma preuve de virement :', texteAnnuler: 'Annuler ma commande :',
    },
    en: {
        objets: { commande: 'Your Muling order', lien: 'Your link for your Muling order', admin: 'Transfer details for your Muling order', relance: 'Reminder: your Muling order is waiting for your transfer' },
        titres: { commande: 'Thank you for your order', lien: 'Here is your order link', admin: 'Your transfer details', relance: 'Your order is waiting for your transfer' },
        intros: {
            commande: 'I’ve received your order. It will be confirmed and sent to Muling as soon as your proof of transfer is uploaded.',
            lien: 'You asked to resume your order. It will be confirmed and sent to Muling as soon as your proof of transfer is uploaded.',
            admin: 'Here is everything you need for your transfer. Your order will be confirmed and sent to Muling as soon as your proof is uploaded.',
            relance: 'Your order isn’t confirmed yet: I haven’t received a proof of transfer.',
        },
        showroom: 'You’ll collect your mic in person at the showroom: nothing will be shipped.',
        bonjour: (p: string) => p ? `Hi ${p},` : 'Hi,',
        recap: 'Summary', quantite: 'Quantity', montant: 'Amount to transfer', reference: 'Reference to include',
        virement: 'Transfer details', beneficiaire: 'Beneficiary', banque: 'Bank',
        sepa: 'Payment in euros, by SEPA transfer only. Please include the reference in the transfer note.',
        attente: 'I’ll send you the transfer details very soon.',
        etape: 'Once you’ve paid, upload your proof (screenshot or PDF).',
        depot: 'Upload my proof of transfer', annuler: 'Cancel my order',
        annulerNote: 'Changed your mind? Nothing is cancelled until you confirm on the page.',
        expire: 'This personal link stays valid for 30 days. Please don’t forward it.',
        signature: 'Thank you,', texteDepot: 'Upload my proof of transfer:', texteAnnuler: 'Cancel my order:',
    },
    es: {
        objets: { commande: 'Tu pedido Muling', lien: 'Tu enlace para tu pedido Muling', admin: 'Transferencia de tu pedido Muling', relance: 'Recordatorio: tu pedido Muling espera tu transferencia' },
        titres: { commande: 'Gracias por tu pedido', lien: 'Aquí tienes el enlace de tu pedido', admin: 'Los datos de tu transferencia', relance: 'Tu pedido espera tu transferencia' },
        intros: {
            commande: 'He recibido tu pedido. Se validará y se enviará a Muling en cuanto subas tu comprobante de transferencia.',
            lien: 'Has pedido retomar tu pedido. Se validará y se enviará a Muling en cuanto subas tu comprobante de transferencia.',
            admin: 'Aquí tienes lo necesario para tu transferencia. Tu pedido se validará y se enviará a Muling en cuanto subas tu comprobante.',
            relance: 'Tu pedido aún no está validado: no he recibido el comprobante de transferencia.',
        },
        showroom: 'Recogerás tu micrófono en persona en el showroom: no se enviará nada.',
        bonjour: (p: string) => p ? `Hola ${p}:` : 'Hola:',
        recap: 'Resumen', quantite: 'Cantidad', montant: 'Importe a transferir', reference: 'Referencia que debes indicar',
        virement: 'Datos de la transferencia', beneficiaire: 'Beneficiario', banque: 'Banco',
        sepa: 'Pago en euros, únicamente por transferencia SEPA. Indica la referencia en el concepto.',
        attente: 'Te enviaré los datos de la transferencia muy pronto.',
        etape: 'Cuando hayas hecho la transferencia, sube tu comprobante (captura de pantalla o PDF).',
        depot: 'Subir mi comprobante de transferencia', annuler: 'Cancelar mi pedido',
        annulerNote: '¿Has cambiado de idea? No se cancelará nada sin tu confirmación en la página.',
        expire: 'Este enlace personal es válido durante 30 días. No lo reenvíes.',
        signature: 'Gracias,', texteDepot: 'Subir mi comprobante de transferencia:', texteAnnuler: 'Cancelar mi pedido:',
    },
} as const;

const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

const ligne = (k: string, v: string, fort = false) =>
    `<tr><td style="padding:5px 12px 5px 0;color:#6b7280;font-size:13px;vertical-align:top;">${esc(k)}</td><td style="padding:5px 0;color:#111827;font-size:14px;${fort ? 'font-weight:700;' : ''}">${esc(v)}</td></tr>`;

/** Bouton « à l'épreuve d'Outlook » : une cellule colorée et un lien en bloc. */
function bouton(url: string, texte: string, principal: boolean): string {
    const fond = principal ? '#b4462a' : '#ffffff';
    const encre = principal ? '#ffffff' : '#7a3a26';
    const bord = principal ? '#b4462a' : '#c9b6a8';
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0;"><tr><td align="center" bgcolor="${fond}" style="border-radius:999px;border:1px solid ${bord};">
<a href="${esc(url)}" style="display:inline-block;padding:13px 26px;font-size:15px;font-weight:600;color:${encre};text-decoration:none;border-radius:999px;">${esc(texte)}</a>
</td></tr></table>`;
}

const montantTexte = (m: number | string) => `${m} EUR`;

export function composerMailClient(d: DonneesMail): { subject: string; html: string; text: string } {
    const T = TEXTES[d.langue];
    const b = d.banque;
    const lignesBanque = b ? [
        b.beneficiary ? [T.beneficiaire, b.beneficiary] : null,
        ['IBAN', b.iban],
        b.bic ? ['BIC', b.bic] : null,
        b.bank ? [T.banque, b.bank] : null,
    ].filter(Boolean) as string[][] : [];

    const html = `<!doctype html><html lang="${d.langue}"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /></head>
<body style="margin:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 8px;"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;border:1px solid #e5e7eb;">
<tr><td style="padding:28px 28px 8px;">
  <div style="font-size:21px;font-weight:700;color:#111827;">${esc(T.titres[d.variante])}</div>
  <p style="margin:14px 0 0;color:#374151;font-size:15px;line-height:1.6;">${esc(T.bonjour(d.prenom))}</p>
  <p style="margin:10px 0 0;color:#374151;font-size:15px;line-height:1.6;">${esc(T.intros[d.variante])}</p>
  ${d.showroom ? `<p style="margin:10px 0 0;color:#374151;font-size:15px;line-height:1.6;">${esc(T.showroom)}</p>` : ''}
</td></tr>
<tr><td style="padding:18px 28px 4px;">
  <h2 style="margin:0 0 8px;font-size:16px;color:#111827;">${esc(T.recap)}</h2>
  <table role="presentation" cellpadding="0" cellspacing="0">
    ${ligne(T.quantite, `${d.quantite} x Muling HMP-2`)}
    ${ligne(T.montant, montantTexte(d.montant), true)}
    ${ligne(T.reference, d.reference, true)}
  </table>
</td></tr>
<tr><td style="padding:18px 28px 4px;">
  <h2 style="margin:0 0 8px;font-size:16px;color:#111827;">${esc(T.virement)}</h2>
  ${b ? `<table role="presentation" cellpadding="0" cellspacing="0">${lignesBanque.map(([k, v]) => ligne(k, v)).join('')}</table>
  <p style="margin:10px 0 0;color:#6b7280;font-size:12px;line-height:1.5;">${esc(T.sepa)}</p>`
        : `<p style="margin:0;color:#374151;font-size:14px;">${esc(T.attente)}</p>`}
</td></tr>
<tr><td style="padding:20px 28px 28px;">
  <p style="margin:0 0 14px;color:#374151;font-size:14px;line-height:1.6;">${esc(T.etape)}</p>
  ${bouton(d.urlDepot, T.depot, true)}
  ${d.urlAnnuler ? `<div style="height:12px;line-height:12px;">&nbsp;</div>${bouton(d.urlAnnuler, T.annuler, false)}
  <p style="margin:12px 0 0;color:#6b7280;font-size:12px;line-height:1.5;">${esc(T.annulerNote)}</p>
  <p style="margin:4px 0 0;color:#6b7280;font-size:12px;line-height:1.5;">${esc(T.expire)}</p>` : ''}
  <p style="margin:18px 0 0;color:#374151;font-size:14px;">${esc(T.signature)}<br />David Lesage</p>
</td></tr>
</table></td></tr></table></body></html>`;

    const text = [
        T.bonjour(d.prenom), '', T.intros[d.variante], d.showroom ? T.showroom : null, '',
        `${T.quantite} : ${d.quantite} x Muling HMP-2`,
        `${T.montant} : ${montantTexte(d.montant)}`,
        `${T.reference} : ${d.reference}`, '',
        ...(b ? [...lignesBanque.map(([k, v]) => `${k} : ${v}`), T.sepa] : [T.attente]), '',
        T.texteDepot, d.urlDepot,
        ...(d.urlAnnuler ? ['', T.texteAnnuler, d.urlAnnuler, '', T.expire] : []),
        '', T.signature, 'David Lesage',
    ].filter((l) => l !== null).join('\n');

    return { subject: `${T.objets[d.variante]} — ${d.reference}`, html, text };
}

/** Confirmation au client après dépôt : sa preuve écrite. */
export function composerConfirmationDepot(
    langue: LangueMail, nom: string, reference: string, quantite: number, montant: number | string,
): { subject: string; text: string } {
    const m = montantTexte(montant);
    if (langue === 'fr') return {
        subject: `Ta preuve de virement est bien reçue — réf. ${reference}`,
        text: [`Bonjour ${nom},`, '', 'C’est confirmé : ta preuve de virement a bien été reçue et transmise à Muling, avec toutes les infos de ta commande.', '',
            `Quantité : ${quantite}x HMP-2`, `Montant : ${m}`, `Référence : ${reference}`, '',
            'Muling va vérifier la réception du virement et te recontacter directement pour la suite (expédition et suivi de commande).',
            'Garde cet email comme preuve de ta démarche.', '', 'Merci,', 'David Lesage'].join('\n'),
    };
    if (langue === 'es') return {
        subject: `Hemos recibido tu comprobante de transferencia — ref. ${reference}`,
        text: [`Hola ${nom}:`, '', 'Confirmado: tu comprobante de transferencia se ha recibido y enviado a Muling, junto con todos los datos de tu pedido.', '',
            `Cantidad: ${quantite}x HMP-2`, `Importe: ${m}`, `Referencia: ${reference}`, '',
            'Muling comprobará la recepción de la transferencia y se pondrá en contacto contigo directamente para el envío y el seguimiento.',
            'Guarda este correo como comprobante de tu gestión.', '', 'Gracias,', 'David Lesage'].join('\n'),
    };
    return {
        subject: `Your proof of payment was received — ref. ${reference}`,
        text: [`Hi ${nom},`, '', 'Confirmed: your proof of payment has been received and sent to Muling, along with your full order details.', '',
            `Quantity: ${quantite}x HMP-2`, `Amount: ${m}`, `Reference: ${reference}`, '',
            'Muling will check the transfer and get in touch with you directly for the next steps (shipping and tracking).',
            'Keep this email as proof of your submission.', '', 'Thank you,', 'David Lesage'].join('\n'),
    };
}

/** Confirmation au client après annulation. */
export function composerConfirmationAnnulation(langue: LangueMail, reference: string): { subject: string; text: string } {
    if (langue === 'fr') return {
        subject: `Ta commande Muling est annulée — réf. ${reference}`,
        text: ['Bonjour,', '', `C’est fait : ta commande ${reference} est annulée. Si tu avais déjà fait ton virement, réponds-moi à contact@lesagedavid.fr.`, '', 'David Lesage'].join('\n'),
    };
    if (langue === 'es') return {
        subject: `Tu pedido Muling está cancelado — ref. ${reference}`,
        text: ['Hola:', '', `Listo: tu pedido ${reference} está cancelado. Si ya hiciste la transferencia, escríbeme a contact@lesagedavid.fr.`, '', 'David Lesage'].join('\n'),
    };
    return {
        subject: `Your Muling order is cancelled — ref. ${reference}`,
        text: ['Hi,', '', `Done: your order ${reference} is cancelled. If you already made the transfer, please write to me at contact@lesagedavid.fr.`, '', 'David Lesage'].join('\n'),
    };
}
