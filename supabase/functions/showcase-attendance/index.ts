// =============================================================================
// Edge Function : showcase-attendance (21/09/2026) — PUBLIQUE (verify_jwt=false)
// Appelée par la page /showcase/ma-venue?t=<attendance_token>.
//   GET  ?t=token                                → { first_name, event_date, status, hours, upcoming[] }
//   POST { t, action:'cancel', dry_run? }        → status 'cancelled'
//   POST { t, action:'reschedule', new_date, dry_run? } → event_date = new_date, status 'rescheduled'
// Le jeton (uuid aléatoire, 122 bits) est la seule clé : jamais l'email en sortie.
// Règle de David : on ne SUPPRIME jamais une inscription, on change son statut.
// Après chaque action : mail à David (ADMIN_EMAIL) + accusé à la personne.
// dry_run:true → renvoie ce qui serait fait, sans écrire ni envoyer.
// =============================================================================
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import {
    ADMIN_EMAIL, SHOWCASE_SOURCES, ackMail, adminMail, futureShowcaseDates, hoursFor, langOf, sendMails,
} from '../_shared/showcase-attendance.ts';

const ORIGINS = [
    'https://www.lesagedavid.fr', 'https://lesagedavid.fr', 'https://project-a5vpj.vercel.app',
    'http://localhost:4321', 'http://localhost:4322',
];
function cors(req: Request): Record<string, string> {
    const o = req.headers.get('Origin') ?? '';
    return {
        'Access-Control-Allow-Origin': ORIGINS.includes(o) ? o : ORIGINS[0],
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Vary': 'Origin',
    };
}
const json = (req: Request, body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...cors(req), 'Content-Type': 'application/json' } });

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const COLS = 'id, email, first_name, last_name, event_date, status, lang, people_count, admin_note, source, cancelled_at';

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: cors(req) });
    try {
        const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
            auth: { persistSession: false },
        });
        const body = req.method === 'POST' ? ((await req.json().catch(() => ({}))) as Record<string, unknown>) : {};
        const token = String(req.method === 'GET' ? new URL(req.url).searchParams.get('t') ?? '' : body.t ?? '').trim();
        if (!UUID.test(token)) return json(req, { error: 'invalid_token' }, 400);

        const { data: lead, error } = await admin.from('site_leads').select(COLS)
            .eq('attendance_token', token).in('source', SHOWCASE_SOURCES).maybeSingle();
        if (error) throw error;
        if (!lead || !lead.event_date) return json(req, { error: 'not_found' }, 404);

        const upcoming = futureShowcaseDates().filter((d) => d !== lead.event_date)
            .map((d) => ({ date: d, ...hoursFor(d) }));
        if (req.method === 'GET') {
            return json(req, {
                ok: true, first_name: lead.first_name ?? '', event_date: lead.event_date, status: lead.status,
                hours: hoursFor(lead.event_date), upcoming,
            });
        }
        if (req.method !== 'POST') return json(req, { error: 'method_not_allowed' }, 405);

        const action = String(body.action ?? '');
        const dryRun = body.dry_run === true;
        const lang = langOf(lead.lang);
        const oldDate = lead.event_date as string;
        const nowIso = new Date().toISOString();
        const stamp = nowIso.slice(0, 16).replace('T', ' ');
        const note = (line: string) => [lead.admin_note, `[${stamp} UTC] ${line}`].filter(Boolean).join('\n').slice(-4000);

        let update: Record<string, unknown>;
        let newDate: string | undefined;
        if (action === 'cancel') {
            if (lead.status === 'cancelled') return json(req, { ok: true, already: true, status: 'cancelled' });
            update = {
                status: 'cancelled', cancelled_at: nowIso, attendance_changed_by: 'self',
                admin_note: note(`Annulé par la personne (showcase du ${oldDate}, statut précédent : ${lead.status ?? '—'}).`),
            };
        } else if (action === 'reschedule') {
            newDate = String(body.new_date ?? '').trim();
            // Revalidation SERVEUR : seule une date de showcase FUTURE connue est acceptée.
            if (!futureShowcaseDates().includes(newDate) || newDate === oldDate) {
                return json(req, { error: 'invalid_date', upcoming }, 400);
            }
            update = {
                status: 'rescheduled', rescheduled_from: oldDate, rescheduled_at: nowIso, event_date: newDate,
                reminder_sent_at: null, cancelled_at: null, attendance_changed_by: 'self',
                admin_note: note(`Reporté par la personne : ${oldDate} → ${newDate} (statut précédent : ${lead.status ?? '—'}).`),
            };
        } else {
            return json(req, { error: 'unknown_action' }, 400);
        }

        const kind = action === 'cancel' ? 'cancel' : 'reschedule';
        const ack = ackMail({ kind, lang, firstName: lead.first_name ?? '', oldDate, newDate });
        const adm = adminMail({
            kind, firstName: lead.first_name ?? '', lastName: lead.last_name ?? '', email: lead.email ?? '',
            oldDate, newDate, peopleCount: lead.people_count,
        });
        const mails = [
            { to: ADMIN_EMAIL, subject: adm.subject, html: adm.html, replyTo: lead.email ?? undefined },
            ...(lead.email ? [{ to: lead.email as string, subject: ack.subject, html: ack.html, replyTo: ADMIN_EMAIL }] : []),
        ];

        if (dryRun) {
            return json(req, {
                ok: true, dry_run: true, lead_id: lead.id, would_update: update,
                would_send: mails.map((m) => ({ to: m.to === ADMIN_EMAIL ? ADMIN_EMAIL : '(la personne)', subject: m.subject })),
            });
        }

        const { error: upErr } = await admin.from('site_leads').update(update).eq('id', lead.id);
        if (upErr) throw upErr;
        let mailError: string | null = null;
        try { await sendMails(mails); } catch (e) { mailError = e instanceof Error ? e.message : String(e); console.error(e); }
        return json(req, { ok: true, status: update.status, event_date: newDate ?? oldDate, mail_error: mailError });
    } catch (err) {
        console.error('showcase-attendance error:', err);
        return json(req, { error: 'server_error' }, 500);
    }
});
