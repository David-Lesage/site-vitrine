-- 0188 — site_leads : mode d'achat, bois et facturation du formulaire Neotone (21/10/2026)
-- Écrit par la session SITE (propriétaire de site_leads) ; appliqué par la session APP.
-- Lu par l'app (boutons « Neotone → Sheet » et « Demander le code à Neotone »).
-- Écrit par l'EF site-lead (source 'neotone-discount' uniquement), à déployer APRÈS cette migration.

alter table public.site_leads
  add column if not exists neotone_purchase_mode text,
  add column if not exists neotone_wood text,
  add column if not exists billing jsonb;

do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'site_leads_neotone_purchase_mode_chk') then
    alter table public.site_leads
      add constraint site_leads_neotone_purchase_mode_chk
      check (neotone_purchase_mode is null or neotone_purchase_mode in ('showroom', 'online'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'site_leads_neotone_wood_chk') then
    alter table public.site_leads
      add constraint site_leads_neotone_wood_chk
      check (neotone_wood is null or neotone_wood in ('frene', 'chene', 'acajou', 'cerisier', 'noyer'));
  end if;
end $$;

comment on column public.site_leads.neotone_purchase_mode is 'Formulaire Neotone : showroom (−7 %, vente directe au Hub) ou online (code −5 %).';
comment on column public.site_leads.neotone_wood is 'Formulaire Neotone : clé de bois du site (frene, chene, acajou, cerisier, noyer).';
comment on column public.site_leads.billing is 'Formulaire Neotone : facturation structurée (type, nom, société, TVA, SIRET, adresse, CP, ville, pays, livraison). Données personnelles : lecture admin seulement.';
-- Aucune policy nouvelle : les colonnes héritent des droits existants de site_leads (insert via EF service_role, lecture admin).
