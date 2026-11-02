// =============================================================================
// Edge Function : muling-order
// Commande du micro Muling (formulaire dédié /micro-muling, PAS BookingForm
// générique) — écrit dans public.affiliate_sales (partner='muling'), PAS
// dans site_leads : ce n'est pas un lead, c'est une commande avec adresse
// de livraison, quantité et prix fixe en euros.
//
// Distincte de site-lead pour ne pas alourdir une fonction déjà volumineuse
// avec un modèle de données et des destinataires d'email différents.
//
// Appelée par /api/muling-order.js (Vercel) — SERVEUR À SERVEUR, protégée
// par SITE_LEAD_TOKEN (même secret que site-lead).
// verify_jwt = false (visiteur non connecté).
//
// v1 (08/08/2026).
// v2 (09/08/2026) : objet via `mailSubject()` + corps en base64 via `htmlPart()`
//      — deux bugs distincts de denomailer 1.6.0 (en-tête `Subject:` coupé par un
//      `=\r\n`, et `=` échappé en `=3d` MINUSCULE, interdit RFC 2045 §6.7).
//      Cf. _shared/mail.ts.
// v3 (17/08/2026) : 🐞 `terms_version` MANQUANTE. La v2 enregistrait bien
//      `terms_accepted_at` mais PAS la version du texte accepté, contrairement à
//      `site-lead` : une commande de micro n'aurait jamais su à quelles
//      conditions générales elle correspondait, ce qui vide l'horodatage de sa
//      valeur (c'est le COUPLE date + version qui est opposable). Corrigé avec la
//      MÊME valeur que site-lead. Ajout au passage du consentement FACULTATIF aux
//      nouveautés (`news_opt_in` / `news_opt_in_at`), la 3ᵉ case du formulaire.
//      ⚠ Nécessite `affiliate_sales.terms_version` (text), `news_opt_in`
//      (boolean) et `news_opt_in_at` (timestamptz) — ADD COLUMN nullable appliqué
//      le 17/08/2026. Sans elles, l'insert lève une erreur → 500 → commande perdue.
// v4 (17/08/2026) : 🐞 LIEN REPRENABLE. L'email disait « reviens sur l'écran de
//      confirmation » — or cet écran n'existait que dans l'onglet ouvert au
//      moment de la commande (état du composant `MulingOrderForm.astro`).
//      Onglet fermé = plus aucun moyen de signaler son virement. Constaté sur
//      une vraie commande du 14/08/2026, restée `payment_claimed_at IS NULL`
//      trois jours plus tard faute de chemin de retour. L'email porte désormais
//      un bouton vers `/micro-muling?commande=<saleId>` (FR) ou
//      `/en/micro-muling?commande=<saleId>` (EN), qui rouvre cet écran à tout
//      moment, sans session. Le lien seul ne déclenche rien : l'email de la
//      commande est redemandé et vérifié par `muling-claim-payment`.
// v5 (25/10/2026) : VENTE EN DIRECT AU SHOWROOM. Champ `saleMode`
//      ('online' | 'showroom') → colonne EXISTANTE `affiliate_sales.purchase_channel`
//      (CHECK online|showroom, déjà en base). En `showroom` : remise en main
//      propre depuis le stock consigné, donc AUCUNE adresse de livraison exigée
//      ni enregistrée ; même prix, même virement SEPA à Muling. Muling reçoit
//      toujours l'email, avec la mention « ne pas expédier ». C'est l'app qui
//      crée le mouvement d'inventaire `sale_direct` à partir de purchase_channel :
//      cette fonction ne touche JAMAIS à stock_movements.
// v6 (25/10/2026) : PAYÉ SUR PLACE (comme hisong-direct). En `showroom`, si le
//      client a DÉJÀ viré à Muling, il joint sa capture (image/PDF) + le montant
//      viré (obligatoire, peut différer de 245 €) DANS LE MÊME envoi : upload dans
//      le bucket privé `muling-proofs` (<id>/<ts>.<ext>), payment_proof_path /
//      payment_claimed_at / fulfillment_status='payment_claimed', et la preuve
//      part en PIÈCE JOINTE du mail à Muling (mêmes drapeaux « DO NOT SHIP »).
//      Écart de montant → ligne AJOUTÉE à admin_note. sale_place laissé vide
//      (le lieu vient de la modale de retrait). Sans fichier : v5 inchangée.
// v7 (02/11/2026) : MULING N'EST PLUS PRÉVENU À LA COMMANDE, seulement quand la preuve arrive
//      (décision de David). David reste prévenu. Le chemin « payé sur place » garde son envoi,
//      preuve jointe. Mail client issu du modèle partagé `_shared/muling-email-modele.ts`, avec
//      vrais boutons et lien personnel ; IBAN lu dans `muling_bank_settings`. Sans jeton (migration
//      absente, par exemple), repli sur l'ancien lien `?commande=<id>`. Preuve : contenu vérifié
//      (PDF, PNG, JPEG, 3 Mo), un WebP n'est donc plus accepté.
// =============================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';
import { htmlPart, mailSubject, textPart } from '../_shared/mail.ts';
import { lireBanque } from '../_shared/muling-banque.ts';
import { estCommandeTest, routageMuling } from '../_shared/muling-mail.ts';
import { composerMailClient, urlAncienLien, urlPage } from '../_shared/muling-email-modele.ts';
import { genererJeton, hacher, langueMail, LIEN_DUREE_JOURS, lirePreuve } from '../_shared/muling-preuve.ts';

const ADMIN_EMAIL = 'contact@lesagedavid.fr';
const DASHBOARD_URL = 'https://play.handpanstudio.app/';
const JSON_HEADERS = { 'Content-Type': 'application/json' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// ⚠️ Dupliqué depuis src/data/muling.ts — les DEUX doivent changer ensemble.
// Prix en euros (David, 08/08/2026) : cohérent avec le compte bancaire de
// Muling, qui n'accepte que des virements SEPA en euros.
const PRICE_EUR = 258;
const DISCOUNT_PCT = 5;
const DISCOUNT_CODE = 'David-Lesage-5';
// Valeur LITTÉRALE donnée par David (258 × 0,95 = 245,10 €, pas 246,50 € —
// écart assumé, voir le commentaire dans src/data/muling.ts).
const DISCOUNTED_PRICE_EUR = 245; // arrondi demandé par David le 24/10/2026
const COMMISSION_PER_UNIT_EUR = 100; // accord de principe du 22/07/2026 avec Muling (en USD à l'origine, non re-négocié en EUR)
// CONDITIONS GÉNÉRALES — ⚠️ DOIT rester STRICTEMENT ÉGALE à TERMS_VERSION dans
// supabase/functions/site-lead/index.ts (et à `terms.version` de src/i18n/dict.ts) :
// deux valeurs différentes rendraient impossible de savoir quel texte une
// personne a réellement accepté selon le formulaire qu'elle a rempli.
const TERMS_VERSION = '2026-08-19';

const PROOF_BUCKET = 'muling-proofs';
function json(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}
function esc(s: string): string {
    return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
}

function shell(inner: string): string {
    return `<!doctype html><html><head><meta charset="utf-8" /></head>
<body style="margin:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
${inner}
      </table>
    </td></tr>
  </table>
</body></html>`;
}
const row = (k: string, v: string) =>
    `<tr><td style="padding:4px 0;color:#6b7280;font-size:13px;width:130px;vertical-align:top;">${k}</td><td style="padding:4px 0;color:#111827;font-size:14px;">${v}</td></tr>`;

function mulingHtml(f: Record<string, string | number | null>): string {
    return shell(`
        <tr><td style="padding:26px 28px 6px;"><div style="font-size:20px;font-weight:700;color:#111827;">New order via David Lesage</div></td></tr>
        <tr><td style="padding:8px 28px 20px;"><table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
          ${Object.entries(f).map(([k, v]) => (v === null || v === '' ? '' : row(k, esc(String(v))))).join('')}
        </table></td></tr>
        <tr><td style="padding:0 28px 12px;"><p style="margin:0;color:#6b7280;font-size:13px;">Discount code ${esc(DISCOUNT_CODE)} applied (${DISCOUNT_PCT}% off) — as agreed. Please confirm receipt, payment and shipping in the dashboard once you have them.</p></td></tr>
        <tr><td style="padding:0 28px 26px;"><a href="${DASHBOARD_URL}" style="display:inline-block;background:#b4462a;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:10px 22px;border-radius:999px;">Open the dashboard</a></td></tr>
`);
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: JSON_HEADERS });
    if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

    try {
        const expected = Deno.env.get('SITE_LEAD_TOKEN') ?? '';
        if (expected && req.headers.get('x-site-token') !== expected) return json({ error: 'Forbidden' }, 403);

        const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
        const email = String(body.email ?? '').trim().toLowerCase();
        const firstName = String(body.firstName ?? '').trim().slice(0, 80);
        const lastName = String(body.lastName ?? '').trim().slice(0, 80);
        const phone = String(body.phone ?? '').trim().slice(0, 40) || null;
        const country = String(body.country ?? '').trim().slice(0, 80) || null;
        const address = String(body.address ?? '').trim().slice(0, 300) || null;
        const city = String(body.city ?? '').trim().slice(0, 120) || null;
        const postalCode = String(body.postalCode ?? '').trim().slice(0, 20) || null;
        const message = String(body.message ?? '').trim().slice(0, 4000) || null;
        const deliveryNote = String(body.deliveryNote ?? '').trim().slice(0, 1000) || null;
        const lang = String(body.lang ?? 'fr').trim().slice(0, 5);
        const page = String(body.page ?? '').trim().slice(0, 200);
        const consent = body.consent === true;
        // CONDITIONS GÉNÉRALES du site (17/08/2026) — case obligatoire commune à
        // tous les formulaires, DISTINCTE de `consent` ci-dessus (transmission
        // des coordonnées à Muling, un tiers en Chine). Deux consentements, deux
        // colonnes : `terms_accepted_at` et `consent_at`. Comme partout, on
        // enregistre sans rejeter — la commande d'un client ne doit pas se
        // perdre sur une case ; c'est le navigateur qui la rend obligatoire.
        // ⚠ Nécessite `affiliate_sales.terms_accepted_at` (ADD COLUMN nullable,
        // appliqué le 17/08/2026) : sans elle, l'insert lève une erreur → 500.
        const termsAccepted = body.termsAccepted === true;
        const termsAcceptedAt = termsAccepted ? new Date().toISOString() : null;

        // NOUVEAUTÉS (v3) — 3ᵉ case du formulaire, la seule FACULTATIVE : elle
        // ne conditionne pas la commande et n'est jamais pré-cochée. C'est elle,
        // et pas l'acceptation des conditions générales, qui autorise à écrire à
        // cette personne pour autre chose que sa commande.
        const newsOptIn = body.newsOptIn === true;

        // v5 : mode de vente. Toute valeur inconnue = 'online' (comportement d'avant).
        const purchaseChannel = body.saleMode === 'showroom' ? 'showroom' : 'online';
        const isShowroom = purchaseChannel === 'showroom';

        // v6 : payé sur place — capture + montant viré, en showroom seulement.
        const fileBase64 = isShowroom ? String(body.fileBase64 ?? '') : '';
        const paidOnSite = !!fileBase64;
        const lu = paidOnSite ? lirePreuve(fileBase64) : null;
        if (lu && !lu.ok) return json({ error: lu.error }, 400);
        const preuve = lu?.ok ? lu.fichier : null;
        const amountPaid = paidOnSite ? Math.round(Number(body.amountPaid) * 100) / 100 : NaN;
        if (paidOnSite && (!Number.isFinite(amountPaid) || amountPaid < 1 || amountPaid > 5000)) return json({ error: 'invalid_amount' }, 400);

        const rawQty = Number(body.quantity);
        const quantity = Number.isFinite(rawQty) && rawQty > 0 ? Math.min(Math.round(rawQty), 20) : 1;

        if (!EMAIL_RE.test(email)) return json({ error: 'invalid_email' }, 400);
        if (!consent) return json({ error: 'missing_consent' }, 400);
        // TÉLÉPHONE OBLIGATOIRE (16/10/2026) : Muling en a besoin pour la livraison
        // et l'a redemandé sur la commande RASMUS DAHLVIK, dont le champ était
        // facultatif. Au moins 6 chiffres — pas de contrôle de format plus fin :
        // les numéros viennent du monde entier.
        if ((phone ?? '').replace(/\D/g, '').length < 6) return json({ error: 'missing_phone' }, 400);
        if (!isShowroom && (!country || !address || !city || !postalCode)) return json({ error: 'missing_address' }, 400);

        const admin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
            { auth: { persistSession: false, autoRefreshToken: false } },
        );

        const priceOriginal = PRICE_EUR * quantity;
        const priceDiscounted = DISCOUNTED_PRICE_EUR * quantity;
        const commission = COMMISSION_PER_UNIT_EUR * quantity;
        const fmtEur = (n: number) => `${n % 1 ? n.toFixed(2).replace('.', ',') : n} €`;
        const diff = paidOnSite ? Math.round((amountPaid - priceDiscounted) * 100) / 100 : 0;
        const paidNote = paidOnSite
            ? `Payé sur place : virement de ${fmtEur(amountPaid)} à Muling` + (diff !== 0 ? ` — écart ${diff > 0 ? '+' : '−'}${fmtEur(Math.abs(diff))} par rapport au prix ${fmtEur(priceDiscounted)}` : '')
            : '';

        const { data: ins, error } = await admin.from('affiliate_sales').insert({
            partner: 'muling',
            source: 'muling-order',
            customer_name: `${firstName} ${lastName}`.trim() || null,
            email, phone,
            // En showroom, rien à livrer : aucune adresse enregistrée.
            shipping_country: isShowroom ? null : country, shipping_address: isShowroom ? null : address,
            shipping_city: isShowroom ? null : city, shipping_postal_code: isShowroom ? null : postalCode,
            purchase_channel: purchaseChannel,
            quantity,
            price_original_eur: priceOriginal,
            price_discounted_eur: priceDiscounted,
            commission_eur: commission,
            currency: 'EUR',
            lang,
            status: 'lead',
            fulfillment_status: 'new',
            consent_at: new Date().toISOString(),
            terms_accepted_at: termsAcceptedAt,
            terms_version: termsAccepted ? TERMS_VERSION : null,
            news_opt_in: newsOptIn,
            news_opt_in_at: newsOptIn ? new Date().toISOString() : null,
            admin_note: [message, paidNote].filter(Boolean).join('\n') || null,
            delivery_note: isShowroom ? null : deliveryNote,
        }).select('id').single();
        if (error) throw error;
        const saleId = ins!.id as string;
        // « RESONANCE » (Résonances Productions), pas le nom du client : le
        // libellé de virement doit rester générique et reconnaissable côté
        // Muling, quel que soit le client (David, 08/08/2026).
        const ref = `RESONANCE-${saleId.slice(0, 8).toUpperCase()}`;
        const { error: refErr } = await admin.from('affiliate_sales').update({ order_ref: ref }).eq('id', saleId);
        // Ne bloque pas la commande pour ça (le client a déjà sa référence), mais
        // ne le laisse plus JAMAIS passer sous silence — c'est ce qui a masqué le
        // bug du trigger le 08/08/2026 (order_ref resté null en base).
        if (refErr) console.error('muling-order: échec écriture order_ref:', refErr);

        // v6 : preuve de virement. Une panne d'upload ne perd pas la vente.
        let proofPath: string | null = null;
        if (preuve) {
            const path = `${saleId}/${Date.now()}.${preuve.ext}`;
            const { error: upErr } = await admin.storage.from(PROOF_BUCKET).upload(path, preuve.bytes, { contentType: preuve.mime, upsert: false });
            if (upErr) console.error('muling-order upload error:', upErr);
            else {
                const { error: updErr } = await admin.from('affiliate_sales').update({
                    payment_proof_path: path, payment_claimed_at: new Date().toISOString(), fulfillment_status: 'payment_claimed',
                }).eq('id', saleId);
                if (updErr) console.error('muling-order update error:', updErr); else proofPath = path;
            }
        }

        let emailSent = false;
        const host = Deno.env.get('SMTP_HOST') ?? '';
        const user = Deno.env.get('SMTP_USER') ?? '';
        const pass = Deno.env.get('SMTP_PASS') ?? '';
        const from = Deno.env.get('SMTP_FROM') ?? user;
        const port = Number(Deno.env.get('SMTP_PORT') ?? '465');

        if (host && user && pass && from) {
            const send = async (to: string, cc: string | string[] | undefined, replyTo: string | undefined, subject: string, html: string, withProof = false, text?: string) => {
                const c = new SMTPClient({ connection: { hostname: host, port, tls: port === 465, auth: { username: user, password: pass } } });
                const attachments = withProof && proofPath && preuve
                    ? [{ filename: `proof-of-payment-${ref}.${preuve.ext}`, content: fileBase64, encoding: 'base64' as const, contentType: preuve.mime }]
                    : undefined;
                try { await c.send({ from, to, cc, replyTo, subject: mailSubject(subject), mimeContent: text ? [textPart(text), htmlPart(html)] : [htmlPart(html)], ...(attachments ? { attachments } : {}) }); return true; }
                catch (e) { console.error('muling-order mail error:', e); return false; }
                finally { try { await c.close(); } catch { /* ignore */ } }
            };

            // Le lien personnel, ou l'ancien lien si le jeton n'a pas pu être créé :
            // la commande et son e-mail ne dépendent pas de cette table.
            const langue = langueMail(lang);
            let urlDepot = urlAncienLien(saleId, langue);
            let urlAnnuler: string | null = null;
            if (!proofPath) {
                const jeton = genererJeton();
                const { error: lienErr } = await admin.rpc('muling_lien_creer', {
                    p_sale_id: saleId, p_hash: await hacher(jeton), p_jours: LIEN_DUREE_JOURS,
                });
                if (lienErr) console.error('muling-order lien:', lienErr.message);
                else { urlDepot = urlPage(jeton, langue); urlAnnuler = urlPage(jeton, langue, true); }
            }
            const banque = await lireBanque(admin);
            const mail = composerMailClient({
                langue, variante: 'commande', prenom: firstName, reference: ref, quantite: quantity,
                montant: priceDiscounted, showroom: isShowroom, banque, urlDepot, urlAnnuler,
            });
            emailSent = await send(email, undefined, ADMIN_EMAIL, mail.subject, mail.html, false, mail.text);

            const detailsCommande = {
                Name: `${firstName} ${lastName}`.trim() || null, Email: email, Phone: phone,
                Quantity: quantity,
                'Sale mode': isShowroom ? 'SHOWROOM — handed over in person by David from consigned stock. DO NOT SHIP.' : 'Online — please ship',
                Country: isShowroom ? null : country, Address: isShowroom ? null : `${address}, ${postalCode} ${city}`,
                'Delivery note': isShowroom ? null : deliveryNote,
                'Amount (EUR)': priceDiscounted, Reference: ref,
                'Paid on site': proofPath ? `YES — customer transferred ${amountPaid.toFixed(2)} EUR to Muling; proof of payment ATTACHED to this email` : null,
            };
            if (proofPath) {
                // Payé sur place : la preuve est là, Muling reçoit la commande, David en copie.
                const dest = routageMuling(email, `Showroom sale — ${firstName} ${lastName} (${quantity}x HMP-2)`.trim());
                await send(dest.to, dest.cc, ADMIN_EMAIL, dest.subject, mulingHtml(detailsCommande), true);
            } else {
                // Sans preuve : David seul. Muling recevra tout avec la preuve (`_shared/muling-depot.ts`).
                await send(ADMIN_EMAIL, undefined, email,
                    `${estCommandeTest(email) ? '[TEST] ' : ''}Nouvelle commande Muling sans preuve — ${firstName} ${lastName} (${quantity}x HMP-2)`.trim(),
                    mulingHtml({ ...detailsCommande, 'Muling notified': 'Not yet — only once the proof of payment is uploaded', 'IBAN settings': banque ? null : 'EMPTY: the customer email has no bank details' }));
            }
        }

        return json({ ok: true, saleId, ref, emailSent, saleMode: purchaseChannel, proofSaved: !!proofPath, amount: priceDiscounted, currency: 'EUR' });
    } catch (err) {
        console.error('muling-order error:', err);
        return json({ error: err instanceof Error ? err.message : 'server_error' }, 500);
    }
});
