// =============================================================================
// Edge Function : showcase-reminder (21/09/2026)
// Rappel automatique la VEILLE de chaque showcase, à 10 h (heure de Paris).
// Cron pg_cron `showcase-reminder` à 08:00 ET 09:00 UTC (été/hiver) : la
// fonction ne fait rien si l'heure Paris n'est pas 10 h (sauf `force_hour`).
// Protégée par l'en-tête `x-reminder-secret` = secret SHOWCASE_REMINDER_SECRET
// (valeur aussi dans Supabase Vault `showcase_reminder_secret`, lue par le cron).
// Corps : { dry_run?: boolean, force_hour?: boolean, date?: 'AAAA-MM-JJ' (date de l'événement, défaut = demain) }
// Sélection : source showcase, event_date = demain, status ≠ 'cancelled',
// reminder_sent_at null. Écrit reminder_sent_at après envoi réussi.
// =============================================================================
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import {
    SHOWCASE_SOURCES, addDays, langOf, parisNow, reminderHtml, reminderSubject, sendMails,
} from '../_shared/showcase-attendance.ts';

const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

Deno.serve(async (req) => {
    const secret = Deno.env.get('SHOWCASE_REMINDER_SECRET') ?? '';
    if (!secret || req.headers.get('x-reminder-secret') !== secret) return json({ error: 'forbidden' }, 403);
    try {
        const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
        const dryRun = body.dry_run === true;
        const now = parisNow();
        if (now.hour !== 10 && body.force_hour !== true && !dryRun) {
            return json({ ok: true, skipped: `heure Paris = ${now.hour} h, pas 10 h` });
        }
        const target = typeof body.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(body.date) ? body.date : addDays(now.date, 1);

        const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
            auth: { persistSession: false },
        });
        const { data, error } = await admin.from('site_leads')
            .select('id, email, first_name, lang, event_date, status, attendance_token')
            .in('source', SHOWCASE_SOURCES).eq('event_date', target)
            .is('reminder_sent_at', null).or('status.is.null,status.neq.cancelled');
        if (error) throw error;
        const rows = (data ?? []).filter((r) => r.email);

        if (dryRun) {
            return json({
                ok: true, dry_run: true, paris: now, event_date: target, count: rows.length,
                would_send: rows.map((r) => ({ id: r.id, lang: langOf(r.lang), status: r.status, subject: reminderSubject(target, langOf(r.lang)) })),
            });
        }

        const sent: string[] = [];
        const failed: { id: string; error: string }[] = [];
        for (const r of rows) {
            const lang = langOf(r.lang);
            try {
                await sendMails([{
                    to: r.email as string, replyTo: 'contact@lesagedavid.fr',
                    subject: reminderSubject(target, lang),
                    html: reminderHtml({ firstName: r.first_name ?? '', lang, eventDate: target, token: r.attendance_token }),
                }]);
                await admin.from('site_leads').update({ reminder_sent_at: new Date().toISOString() }).eq('id', r.id);
                sent.push(r.id);
            } catch (e) {
                failed.push({ id: r.id, error: e instanceof Error ? e.message : String(e) });
            }
        }
        return json({ ok: true, event_date: target, sent: sent.length, failed });
    } catch (err) {
        console.error('showcase-reminder error:', err);
        return json({ error: err instanceof Error ? err.message : 'server_error' }, 500);
    }
});
