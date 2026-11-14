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
//
// 14/11/2026 (annulation → report ou rendez-vous privé, variante B) :
//   • les dates viennent de l'agenda PARTAGÉ (app_public_config, clé
//     'showcase_agenda'), repli EVENT_HOURS si la lecture échoue ;
//   • l'accusé d'annulation = `cancelOfferMail()` : 1 à 3 prochaines dates, chacune
//     avec « Je viens le … » → /showcase/ma-venue?t=…&date=… (la page présélectionne
//     la date, la personne confirme d'un clic → action 'reschedule' ci-dessous) +
//     le bloc rendez-vous individuel ; sans date future → lien liste d'attente ;
//   • une inscription ANNULÉE peut être reportée (c'était déjà accepté) et même
//     revenir à SA date d'origine si elle est encore à venir (annulation levée).
// =============================================================================
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import {
    ADMIN_EMAIL, SHOWCASE_SOURCES, ackMail, adminMail, agendaHours, futureShowcaseDates, langOf,
    loadShowcaseAgenda, sendMails,
} from '../_shared/showcase-attendance.ts';
import { cancelLangOf, cancelOfferMail } from '../_shared/showcase-cancel-offer.ts';

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
const COLS = 'id, email, first_name, last_name, event_date, status, lang, people_count, admin_note, source, cancelled_at, attendance_token';

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

        const { agenda } = await loadShowcaseAgenda(admin);
        const future = futureShowcaseDates(agenda);
        const cancelled = lead.status === 'cancelled';
        // Dates proposées : toutes les dates futures, sauf la sienne — SAUF si elle
        // est annulée : elle peut alors revenir à sa date d'origine si elle est à venir.
        const allowed = future.filter((d) => cancelled || d !== lead.event_date);
        const upcoming = allowed.map((d) => ({ date: d, ...agendaHours(agenda, d) }));
        if (req.method === 'GET') {
            return json(req, {
                ok: true, first_name: lead.first_name ?? '', event_date: lead.event_date, status: lead.status,
                hours: agendaHours(agenda, lead.event_date), upcoming,
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
            // Revalidation SERVEUR : seule une date de showcase FUTURE de l'agenda est
            // acceptée ; la même date seulement pour lever une annulation.
            if (!allowed.includes(newDate)) {
                return json(req, { error: 'invalid_date', upcoming }, 400);
            }
            const sameDate = newDate === oldDate;
            update = {
                status: 'rescheduled', rescheduled_from: oldDate, rescheduled_at: nowIso, event_date: newDate,
                reminder_sent_at: null, cancelled_at: null, attendance_changed_by: 'self',
                admin_note: note(sameDate
                    ? `Annulation levée par la personne : elle revient au showcase du ${newDate} (statut précédent : ${lead.status ?? '—'}).`
                    : `Reporté par la personne : ${oldDate} → ${newDate} (statut précédent : ${lead.status ?? '—'}).`),
            };
        } else {
            return json(req, { error: 'unknown_action' }, 400);
        }

        const kind = action === 'cancel' ? 'cancel' : 'reschedule';
        // Annulation → e-mail « prochaines dates + rendez-vous individuel » (14/11/2026).
        const ack = kind === 'cancel'
            ? cancelOfferMail({
                lang: cancelLangOf(lead.lang), firstName: lead.first_name ?? '', oldDate,
                token: lead.attendance_token as string | null,
                upcoming: future.filter((d) => d !== oldDate).map((d) => ({ date: d, ...agendaHours(agenda, d) })),
            })
            : ackMail({ kind, lang, firstName: lead.first_name ?? '', oldDate, newDate });
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
