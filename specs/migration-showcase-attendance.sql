-- =============================================================================
-- showcase_attendance (21/09/2026) — rappel J-1 + annulation / report par la
-- personne elle-même. ADDITIVE UNIQUEMENT : aucune ligne modifiée, aucune
-- colonne ni valeur de statut retirée. Règle de David : on ne supprime JAMAIS
-- une inscription, on change son statut.
-- Appliquée via MCP apply_migration (nom `showcase_attendance`).
-- =============================================================================
alter table public.site_leads
  add column if not exists attendance_token uuid not null default gen_random_uuid(),
  add column if not exists reminder_sent_at timestamptz,
  add column if not exists cancelled_at timestamptz,
  add column if not exists rescheduled_from date,
  add column if not exists rescheduled_at timestamptz,
  add column if not exists attendance_changed_by text
    check (attendance_changed_by is null or attendance_changed_by in ('self','admin'));

create unique index if not exists site_leads_attendance_token_key
  on public.site_leads (attendance_token);

-- Élargissement du CHECK de statut : toutes les valeurs existantes conservées.
alter table public.site_leads drop constraint if exists site_leads_status_check;
alter table public.site_leads add constraint site_leads_status_check check (status = any (array[
  'new','replied','confirmed','attended','no_show','interested','customer','closed',
  'cancelled','rescheduled'
]::text[]));

-- =============================================================================
-- Planification (appliquée séparément, migration `showcase_reminder_cron`).
-- 10 h Paris = 08:00 UTC (été) / 09:00 UTC (hiver) → DEUX déclenchements ;
-- la fonction ne fait rien si l'heure locale Paris n'est pas 10 h.
-- Le secret n'est PAS en clair dans cron.job : il est lu dans Supabase Vault
-- (nom `showcase_reminder_secret`, même valeur que le secret d'EF
-- SHOWCASE_REMINDER_SECRET).
-- =============================================================================
-- create extension if not exists pg_cron with schema pg_catalog;
-- create extension if not exists pg_net  with schema extensions;
-- select cron.schedule('showcase-reminder', '0 8,9 * * *', $$
--   select net.http_post(
--     url     := 'https://zqcuhnjjrgmybftppkcl.supabase.co/functions/v1/showcase-reminder',
--     headers := jsonb_build_object(
--       'Content-Type', 'application/json',
--       'x-reminder-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'showcase_reminder_secret')
--     ),
--     body    := '{}'::jsonb
--   );
-- $$);
-- Contrôles : select * from cron.job; select * from cron.job_run_details order by start_time desc limit 10;
-- Arrêt     : select cron.unschedule('showcase-reminder');
