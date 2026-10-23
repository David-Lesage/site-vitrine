-- site_leads : processus d'achat Neotone en 3 cas (25/10/2026, validé par David)
-- Écrit par la session SITE (propriétaire de site_leads). NON APPLIQUÉE.
-- À appliquer AVANT de déployer site-lead et neotone-purchase-action (prendre le
-- prochain numéro libre de supabase/migrations/ côté APP si 0189 est déjà pris).
-- Prérequis : migration-0188-site-leads-neotone-achat.sql (neotone_purchase_mode,
-- neotone_wood, billing) déjà appliquée.
--
-- Additive : colonnes nullables, aucune donnée existante modifiée, AUCUNE policy
-- ajoutée (les deux Edge Functions écrivent avec la clé service ; rien n'est
-- ouvert à anon ni à authenticated).

alter table public.site_leads
  -- état de la demande d'achat (null = pas une demande d'achat)
  add column if not exists purchase_state text,
  add column if not exists purchase_state_at timestamptz,
  -- ce que le client a vu et demandé
  add column if not exists neotone_stock_state text,          -- 'in' (cas 1) · 'transit' (cas 2) · 'out' (cas 3)
  add column if not exists neotone_pickup_date date,          -- date souhaitée de retrait à Paris
  add column if not exists neotone_arrival_label text,        -- date d'arrivée affichée au client (colonne L), cas 2
  add column if not exists neotone_price jsonb,               -- montants du calculateur (−7 % showroom)
  -- réponse de David au client (cas 2 et 3)
  add column if not exists neotone_proposed_date text,        -- texte libre (« 9-13 novembre », « vers le 14/11 »)
  add column if not exists neotone_proposed_rev integer not null default 0, -- n° de proposition : invalide les anciens liens « Oui, je confirme »
  add column if not exists neotone_proposed_at timestamptz,
  add column if not exists neotone_client_confirmed_at timestamptz,
  -- facturation et suite
  add column if not exists neotone_serial text,
  add column if not exists neotone_invoice_requested_at timestamptz,
  add column if not exists neotone_paid_at timestamptz,
  add column if not exists neotone_delivered_at timestamptz,
  add column if not exists neotone_cancelled_at timestamptz,
  add column if not exists neotone_purchase_log jsonb not null default '[]'::jsonb,
  -- limite des demandes de délais à Neotone (déjà dans migration-site-leads-neotone-partner-mail-at.sql ; idempotent)
  add column if not exists neotone_partner_mail_at timestamptz;

alter table public.site_leads drop constraint if exists site_leads_purchase_state_chk;
alter table public.site_leads add constraint site_leads_purchase_state_chk
  check (purchase_state is null or purchase_state in ('new','date_proposed','client_confirmed','invoicing','paid','delivered','cancelled'));

alter table public.site_leads drop constraint if exists site_leads_neotone_stock_state_chk;
alter table public.site_leads add constraint site_leads_neotone_stock_state_chk
  check (neotone_stock_state is null or neotone_stock_state in ('in','transit','out'));

comment on column public.site_leads.purchase_state is 'Achat Neotone : new / date_proposed / client_confirmed / invoicing / paid / delivered / cancelled (EF site-lead + neotone-purchase-action).';
comment on column public.site_leads.neotone_proposed_rev is 'Incrémenté à chaque date proposée au client : seul le lien « Oui, je confirme » de la dernière proposition est valable.';
comment on column public.site_leads.neotone_purchase_log is 'Journal des actions (horodatage, action, date proposée, n° de série).';

-- Suivi des demandes en cours (tableau de bord éventuel de l'app).
create index if not exists site_leads_purchase_state_idx
  on public.site_leads (purchase_state, purchase_state_at)
  where purchase_state is not null;

-- Limite des demandes de délais (source + modèle + bois + date récente).
create index if not exists site_leads_neotone_partner_mail_idx
  on public.site_leads (neotone_model, neotone_wood, neotone_partner_mail_at)
  where source = 'neotone-stock-request' and neotone_partner_mail_at is not null;
