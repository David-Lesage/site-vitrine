// =============================================================================
// Edge Function : neotone-purchase-action  (25/10/2026)
// -----------------------------------------------------------------------------
// Les liens « en un clic » du processus d'achat Neotone (3 cas, voir
// _shared/neotone-purchase.ts et specs/ACHAT-NEOTONE-3-CAS-2026-10-25.md).
//
// Les mails pointent vers la page du SITE `/neotone-suivi/?t=…` (la passerelle
// Supabase réécrit tout text/html en text/plain : voir confirm-lesson-slot).
// Cette page appelle ici, en POST JSON :
//   { t, op: 'view' }                 → ce qu'il faut afficher (aucune écriture)
//   { t, op: 'do', date?, serial? }   → l'action
// Un GET ou un pré-chargement de la messagerie ne fait donc JAMAIS rien : il
// faut un clic sur le bouton de la page.
//
// ── SÉCURITÉ ─────────────────────────────────────────────────────────────────
//   • verify_jwt = false (déployer avec --no-verify-jwt) : la preuve est le
//     jeton HMAC (_shared/purchase-token.ts), lié à UNE demande + UNE action.
//   • Usage unique : chaque action n'est permise que depuis certains états, et
//     l'écriture est conditionnée à l'état lu (`.eq('purchase_state', …)`) :
//     deux clics simultanés ne font qu'une action, un seul mail part.
//   • Le lien « Oui, je confirme » porte la révision de la date : une nouvelle
//     proposition rend l'ancien lien caduc.
//   • Les n° de série viennent de l'Apps Script privé, côté serveur seulement.
// =============================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';
import { htmlPart, mailSubject, textPart } from '../_shared/mail.ts';
import { DAVID_ACTIONS, purchaseActionUrl, signPurchaseToken, verifyPurchaseToken } from '../_shared/purchase-token.ts';
import {
    ADMIN_EMAIL, ALLOWED_FROM, LEAD_COLUMNS, NEOTONE_INVOICE_EMAIL_ENABLED, NEOTONE_ORDERS_EMAIL, SITE, STATE_LABEL_FR,
    clientLang, dateProposalMail, davidConfirmedMail, davidInvoiceLaunchedMail, fetchPrivatePieces, fmtDay, fullName,
    neotoneInvoiceMail, pairLabel, sheetFields, sheetOutcomeFr, writeSaleToSheet,
    type PurchaseLead, type PurchaseState,
} from '../_shared/neotone-purchase.ts';

const ORIGINS = ['https://lesagedavid.fr', 'https://www.lesagedavid.fr', 'http://localhost:4321', 'http://127.0.0.1:4321'];

function cors(req: Request): Record<string, string> {
    const o = req.headers.get('Origin') ?? '';
    return {
        'Access-Control-Allow-Origin': ORIGINS.includes(o) ? o : ORIGINS[0],
        'Access-Control-Allow-Headers': 'content-type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Vary': 'Origin',
    };
}
const json = (req: Request, body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...cors(req), 'Content-Type': 'application/json' } });

type Lead = PurchaseLead & { neotone_purchase_log: unknown[] | null };

async function send(m: { to: string; cc?: string[]; subject: string; html: string; text?: string }): Promise<boolean> {
    const host = Deno.env.get('SMTP_HOST') ?? '';
    const user = Deno.env.get('SMTP_USER') ?? '';
    const pass = Deno.env.get('SMTP_PASS') ?? '';
    const from = Deno.env.get('SMTP_FROM') ?? user;
    const port = Number(Deno.env.get('SMTP_PORT') ?? '465');
    if (!host || !user || !pass || !from) return false;
    const client = new SMTPClient({ connection: { hostname: host, port, tls: port === 465, auth: { username: user, password: pass } } });
    try {
        await client.send({
            from, to: m.to, ...(m.cc?.length ? { cc: m.cc } : {}), replyTo: ADMIN_EMAIL,
            subject: mailSubject(m.subject),
            mimeContent: m.text ? [textPart(m.text), htmlPart(m.html)] : [htmlPart(m.html)],
        });
        return true;
    } finally {
        try { await client.close(); } catch { /* ignore */ }
    }
}

const link = async (lead: Lead, action: Parameters<typeof signPurchaseToken>[1], rev = 0, lang = 'fr') => {
    const t = await signPurchaseToken(lead.id, action, rev);
    return t ? purchaseActionUrl(SITE, t, lang) : SITE;
};

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: cors(req) });
    if (req.method !== 'POST') return json(req, { error: 'method_not_allowed' }, 405);
    try {
        const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
        const tok = await verifyPurchaseToken(String(body.t ?? ''));
        if (!tok) return json(req, { error: 'invalid_link' }, 403);
        const op = body.op === 'do' ? 'do' : 'view';

        const db = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', {
            auth: { persistSession: false, autoRefreshToken: false },
        });
        const { data: lead, error } = await db.from('site_leads').select(`${LEAD_COLUMNS},neotone_purchase_log`).eq('id', tok.leadId).maybeSingle();
        if (error || !lead) return json(req, { error: 'not_found' }, 404);
        const L = lead as Lead;
        const state = (L.purchase_state ?? 'new') as PurchaseState;
        const isDavid = DAVID_ACTIONS.includes(tok.action);
        const lang = isDavid ? 'fr' : clientLang(L.lang);
        const caseNo = L.neotone_stock_state === 'in' ? 1 : L.neotone_stock_state === 'transit' ? 2 : 3;

        // Lien de confirmation d'une ancienne proposition : caduc.
        if (tok.action === 'confirm' && tok.rev !== (L.neotone_proposed_rev ?? 0)) {
            return json(req, { ok: false, action: tok.action, lang, error: 'superseded' });
        }
        let allowed = ALLOWED_FROM[tok.action].includes(state);
        if (tok.action === 'invoice' && state === 'new' && caseNo !== 1) allowed = false; // cas 2/3 : confirmation d'abord
        if (tok.action === 'reply' && caseNo === 1) allowed = false;

        // ── VIEW : ce que la page affiche ────────────────────────────────────
        if (op === 'view') {
            const base = {
                ok: true, action: tok.action, lang, allowed, state, stateLabel: STATE_LABEL_FR[state], caseNo,
                pair: pairLabel(L.neotone_model, L.neotone_wood, lang),
                firstName: L.first_name ?? '',
                proposedDate: L.neotone_proposed_date,
            };
            if (!isDavid) return json(req, base); // le client ne voit que son prénom, son instrument et la date
            const extra: Record<string, unknown> = {
                name: fullName(L), email: L.email, phone: L.phone, serial: L.neotone_serial,
                pickupDate: L.neotone_pickup_date ? fmtDay(L.neotone_pickup_date, 'fr') : null,
                company: L.billing?.company ?? '', vatNumber: L.billing?.vatNumber ?? '',
            };
            if (tok.action === 'reply') {
                // Date pré-remplie : dernière proposition, sinon colonne L de la pièce en route, sinon celle vue par le client.
                let prefill = L.neotone_proposed_date ?? '';
                if (!prefill && caseNo === 2) {
                    const pr = await fetchPrivatePieces(L.neotone_model, L.neotone_wood);
                    if (pr.ok) prefill = pr.pieces.find((p) => p.status === 'In transit' && p.arrivalText)?.arrivalText ?? '';
                }
                extra.prefillDate = prefill || L.neotone_arrival_label || '';
            }
            if (tok.action === 'invoice') {
                const pr = await fetchPrivatePieces(L.neotone_model, L.neotone_wood);
                extra.serials = pr.ok ? pr.pieces.map((p) => ({ serial: p.serial, status: p.status, arrival: p.arrivalText })) : [];
                extra.serialsError = pr.ok ? null : pr.error;
                extra.neotoneEnabled = NEOTONE_INVOICE_EMAIL_ENABLED;
            }
            return json(req, { ...base, ...extra });
        }

        // ── DO ───────────────────────────────────────────────────────────────
        if (!allowed) return json(req, { ok: false, action: tok.action, lang, error: 'not_allowed', state, stateLabel: STATE_LABEL_FR[state] });
        const now = new Date().toISOString();
        const log = (what: string, extra: Record<string, unknown> = {}) => [...(Array.isArray(L.neotone_purchase_log) ? L.neotone_purchase_log : []), { at: now, what, ...extra }];
        /** Écriture conditionnée à l'état lu : le second clic simultané ne change rien. */
        const move = async (patch: Record<string, unknown>) => {
            const q = db.from('site_leads').update({ ...patch, purchase_state_at: now }).eq('id', L.id);
            const guarded = L.purchase_state == null ? q.is('purchase_state', null) : q.eq('purchase_state', state);
            const { data, error: e } = await guarded.select('id');
            return !e && Array.isArray(data) && data.length === 1;
        };

        if (tok.action === 'reply') {
            const date = String(body.date ?? '').trim().slice(0, 60);
            if (date.length < 2) return json(req, { ok: false, action: tok.action, lang, error: 'date_required' }, 400);
            const rev = (L.neotone_proposed_rev ?? 0) + 1;
            if (!await move({ purchase_state: 'date_proposed', neotone_proposed_date: date, neotone_proposed_rev: rev, neotone_proposed_at: now, neotone_purchase_log: log('date_proposed', { date, rev }) })) {
                return json(req, { ok: false, action: tok.action, lang, error: 'conflict' }, 409);
            }
            const cl = clientLang(L.lang);
            const mail = dateProposalMail({ ...L, neotone_proposed_date: date }, date, await link(L, 'confirm', rev, cl));
            const sent = await send({ to: L.email, cc: [ADMIN_EMAIL], subject: mail.subject, html: mail.html });
            return json(req, { ok: true, action: tok.action, lang, done: 'date_proposed', date, mailSent: sent });
        }

        if (tok.action === 'confirm') {
            if (!await move({ purchase_state: 'client_confirmed', neotone_client_confirmed_at: now, neotone_purchase_log: log('client_confirmed', { rev: tok.rev }) })) {
                return json(req, { ok: false, action: tok.action, lang, error: 'conflict' }, 409);
            }
            const date = L.neotone_proposed_date ?? '';
            const mail = davidConfirmedMail(L, date, await link(L, 'invoice'), await link(L, 'cancel'));
            await send({ to: ADMIN_EMAIL, subject: mail.subject, html: mail.html });
            return json(req, { ok: true, action: tok.action, lang, done: 'client_confirmed', date, pair: pairLabel(L.neotone_model, L.neotone_wood, lang) });
        }

        if (tok.action === 'invoice') {
            const serial = String(body.serial ?? '').trim().replace(/^#/, '').slice(0, 20);
            if (!/^[A-Za-z0-9-]{1,20}$/.test(serial)) return json(req, { ok: false, action: tok.action, lang, error: 'serial_required' }, 400);
            const pr = await fetchPrivatePieces(L.neotone_model, L.neotone_wood);
            // Liste disponible ⇒ le n° DOIT en faire partie (garde-fou de la confusion 972/977).
            if (pr.ok && !pr.pieces.some((p) => p.serial === serial)) return json(req, { ok: false, action: tok.action, lang, error: 'serial_not_in_list' }, 400);
            const mail = neotoneInvoiceMail(L, serial);
            if (!NEOTONE_INVOICE_EMAIL_ENABLED) {
                // ⛔ Interrupteur OFF : aperçu à David SEUL, état inchangé.
                await send({ to: ADMIN_EMAIL, subject: `[APERÇU — non envoyé à Neotone] ${mail.subject}`, html: mail.html, text: mail.text });
                return json(req, { ok: true, action: tok.action, lang, done: 'preview_only', serial });
            }
            if (!await move({ purchase_state: 'invoicing', neotone_serial: serial, neotone_invoice_requested_at: now, neotone_purchase_log: log('invoicing', { serial }) })) {
                return json(req, { ok: false, action: tok.action, lang, error: 'conflict' }, 409);
            }
            const sent = await send({ to: NEOTONE_ORDERS_EMAIL, cc: [ADMIN_EMAIL, L.email], subject: mail.subject, html: mail.html, text: mail.text });
            const sheet = await writeSaleToSheet(serial, sheetFields(L));
            const recap = davidInvoiceLaunchedMail(L, serial, {
                neotoneSent: sent, sheet: sheetOutcomeFr(sheet),
                paidUrl: await link(L, 'paid'), deliveredUrl: await link(L, 'delivered'), cancelUrl: await link(L, 'cancel'),
            });
            await send({ to: ADMIN_EMAIL, subject: recap.subject, html: recap.html });
            return json(req, { ok: true, action: tok.action, lang, done: 'invoicing', serial, mailSent: sent, sheet: sheetOutcomeFr(sheet) });
        }

        const simple: Record<string, [PurchaseState, string]> = {
            paid: ['paid', 'neotone_paid_at'], delivered: ['delivered', 'neotone_delivered_at'], cancel: ['cancelled', 'neotone_cancelled_at'],
        };
        const [to, col] = simple[tok.action];
        if (!await move({ purchase_state: to, [col]: now, neotone_purchase_log: log(to) })) {
            return json(req, { ok: false, action: tok.action, lang, error: 'conflict' }, 409);
        }
        return json(req, { ok: true, action: tok.action, lang, done: to, stateLabel: STATE_LABEL_FR[to] });
    } catch (err) {
        console.error('neotone-purchase-action error:', err);
        return json(req, { error: 'server_error' }, 500);
    }
});
