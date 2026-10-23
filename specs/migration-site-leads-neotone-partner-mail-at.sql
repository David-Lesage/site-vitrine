-- site_leads : horodatage du mail envoyé à Neotone pour une demande « pas au showroom » (25/10/2026)
-- Écrit par la session SITE (propriétaire de site_leads) ; NON APPLIQUÉE — à appliquer par la session APP
-- (prochain numéro libre de supabase/migrations/), avec le feu vert de David.
--
-- Pourquoi : l'EF site-lead (source 'neotone-stock-request') n'écrit pas plus d'UN mail à Neotone par
-- couple modèle + bois toutes les 48 h. Elle lit cette colonne pour le savoir, et la pose après envoi.
-- Tant que la colonne n'existe pas, l'EF n'envoie RIEN à Neotone (elle ne sait pas compter) : le mail
-- interne à David et la confirmation au client partent normalement.
-- Ordre : 1) cette migration ; 2) déployer site-lead ; 3) seulement ensuite, si David a validé le texte,
-- passer NEOTONE_STOCK_REQUEST_EMAIL_ENABLED à true (supabase/functions/site-lead/neotone-stock-request.ts).
-- Additive, sans effet sur les lignes existantes. Aucune nouvelle table.

alter table public.site_leads
  add column if not exists neotone_partner_mail_at timestamptz;

comment on column public.site_leads.neotone_partner_mail_at is
  'Date du mail automatique envoyé à Neotone (demande de délais, source neotone-stock-request). Sert à la limite 1 mail / modèle + bois / 48 h.';

-- Lecture de la limite : source + modèle + bois + date récente.
create index if not exists site_leads_neotone_partner_mail_idx
  on public.site_leads (neotone_model, neotone_wood, neotone_partner_mail_at)
  where source = 'neotone-stock-request' and neotone_partner_mail_at is not null;
