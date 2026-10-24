-- Bucket privé `hisong-proofs` — preuves de paiement des ventes Hisong en
-- présentiel (showroom), déposées par le formulaire /micro-hisong
-- (EF hisong-direct v2, service role). MÊMES règles que `muling-proofs` (0240) :
-- aucune lecture publique, admin du site peut déposer/voir/remplacer.
-- À APPLIQUER PAR LA SESSION APP (préparé par la session site, 24/10/2026).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('hisong-proofs', 'hisong-proofs', false, 6291456,
        array['image/png','image/jpeg','image/webp','application/pdf'])
on conflict (id) do nothing;

drop policy if exists hisong_proofs_admin_insert on storage.objects;
create policy hisong_proofs_admin_insert on storage.objects
  for insert to authenticated
  with check (bucket_id = 'hisong-proofs' and public.is_site_admin());

drop policy if exists hisong_proofs_admin_select on storage.objects;
create policy hisong_proofs_admin_select on storage.objects
  for select to authenticated
  using (bucket_id = 'hisong-proofs' and public.is_site_admin());

drop policy if exists hisong_proofs_admin_update on storage.objects;
create policy hisong_proofs_admin_update on storage.objects
  for update to authenticated
  using (bucket_id = 'hisong-proofs' and public.is_site_admin())
  with check (bucket_id = 'hisong-proofs' and public.is_site_admin());

-- ⚠️ EF `partner-proof-url` signe en dur dans 'muling-proofs' : pour voir une
-- preuve Hisong dans le dashboard, choisir le bucket selon affiliate_sales.partner
-- ('hisong' → 'hisong-proofs'). Côté APP.
