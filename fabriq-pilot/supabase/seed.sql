-- FABRIQ — Sample Data
-- Run AFTER schema.sql and policies.sql
-- NOTE: You must have created at least one user via Supabase Auth first.
-- After signup, note the auth.users.id and update seed_user_id below.

-- =========================================================
-- CONFIGURATION
-- Change this to your actual signed-up auth user id after creating via Supabase Auth UI
-- =========================================================
do $$
declare
  seed_user_id uuid := '00000000-0000-0000-0000-000000000001'; -- REPLACE WITH REAL USER ID
begin

-- =========================================================
-- MASTER DATA
-- =========================================================

insert into public.countries (code, name, region) values
  ('BD','Bangladesh','Asia'),
  ('VN','Vietnam','Asia'),
  ('IN','India','Asia'),
  ('KH','Cambodia','Asia'),
  ('CN','China','Asia'),
  ('TR','Turkey','Europe'),
  ('US','United States','North America'),
  ('GB','United Kingdom','Europe'),
  ('DE','Germany','Europe'),
  ('BR','Brazil','South America')
on conflict (code) do nothing;

insert into public.inspection_standards (code, name, version, description) values
  ('AQL-II','ISO 2859-1 Level II','2019','Standard apparel single sampling plan'),
  ('AQL-I','ISO 2859-1 Level I','2019','Reduced sampling'),
  ('AQL-III','ISO 2859-1 Level III','2019','Tightened sampling'),
  ('4PT','4-Point Fabric Inspection','2020','Rolled goods pre-production QC'),
  ('ASTM','ASTM D5430','2021','Visual Inspection of Fabrics')
on conflict (code) do nothing;

insert into public.defect_categories (code, name, severity, description) values
  ('STITCH-OPEN','Open stitch','major','Seam opened or broken'),
  ('STITCH-SKIP','Skip stitch','minor','Missed stitches in seam'),
  ('STITCH-UNEVEN','Uneven stitching','minor','Inconsistent stitch length'),
  ('FABRIC-HOLE','Fabric hole','major','Puncture or tear in fabric'),
  ('FABRIC-STAIN','Fabric stain','minor','Visible marks or discoloration'),
  ('COLOR-MIS','Color mismatch','major','Color does not match approval'),
  ('BTN-LOOSE','Loose button','minor','Button attachment weak'),
  ('BTN-MISS','Missing button','major','Button not attached'),
  ('ZIP-FAULT','Zipper fault','major','Zipper not functioning'),
  ('LABEL-MIS','Wrong label','critical','Incorrect care or brand label'),
  ('MEASURE-OUT','Measurement out of tolerance','major','Spec deviation beyond allowance'),
  ('CONTAM-NEEDLE','Needle contamination','critical','Broken needle in garment')
on conflict (code) do nothing;

-- =========================================================
-- TENANTS
-- =========================================================

insert into public.tenants (id, tenant_type, name, short_code, country_code) values
  -- Brands
  ('11111111-1111-1111-1111-111111111001','brand','ActiveWave Apparel','ACTW','US'),
  ('11111111-1111-1111-1111-111111111002','brand','Blueberry Threads','BLUE','GB'),

  -- Factories
  ('22222222-2222-2222-2222-222222222001','factory','Dhaka Textiles Ltd','DT','BD'),
  ('22222222-2222-2222-2222-222222222002','factory','Hanoi Garments Co.','HG','VN'),
  ('22222222-2222-2222-2222-222222222003','factory','Phnom Milan Industries','PM','KH'),

  -- 3P Inspection Firms
  ('33333333-3333-3333-3333-333333333001','inspection_firm','Bureau Veritas','BV','TR'),
  ('33333333-3333-3333-3333-333333333002','inspection_firm','QC Sentinel','QCS','IN')
on conflict (id) do nothing;

-- =========================================================
-- SEED USER PROFILE (assumes auth user already exists)
-- =========================================================

insert into public.profiles (id, tenant_id, tenant_type, role, display_name, email)
values (
  seed_user_id,
  '11111111-1111-1111-1111-111111111001',
  'brand',
  'brand_qa',
  'Naveen Kool',
  'naveenkool786@gmail.com'
)
on conflict (id) do update set
  tenant_id = excluded.tenant_id,
  tenant_type = excluded.tenant_type,
  role = excluded.role;

-- =========================================================
-- SAMPLE POs
-- =========================================================

insert into public.purchase_orders
  (id, po_number, brand_id, factory_id, inspection_firm_id, style_number, style_name, product_category, quantity, unit_price, po_date, ex_factory_date, status, created_by)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa0001','PO-2611-ACTW-001','11111111-1111-1111-1111-111111111001','22222222-2222-2222-2222-222222222001','33333333-3333-3333-3333-333333333001','SS26-SH-001','Men''s Chambray Shirt','Shirts',12000,8.50,'2026-10-01','2026-11-28','in_production',seed_user_id),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa0002','PO-2611-ACTW-002','11111111-1111-1111-1111-111111111001','22222222-2222-2222-2222-222222222002','33333333-3333-3333-3333-333333333001','SS26-TR-002','Women''s Trousers','Bottoms',8500,12.75,'2026-10-05','2026-12-05','awaiting_inspection',seed_user_id),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa0003','PO-2611-ACTW-003','11111111-1111-1111-1111-111111111001','22222222-2222-2222-2222-222222222003','33333333-3333-3333-3333-333333333002','SS26-DR-003','Linen Summer Dress','Dresses',4200,18.90,'2026-10-10','2026-12-15','inspected',seed_user_id),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa0004','PO-2611-ACTW-004','11111111-1111-1111-1111-111111111001','22222222-2222-2222-2222-222222222001','33333333-3333-3333-3333-333333333001','FW26-JK-001','Field Jacket','Outerwear',6000,42.00,'2026-10-15','2027-01-20','accepted',seed_user_id),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa0005','PO-2611-ACTW-005','11111111-1111-1111-1111-111111111001','22222222-2222-2222-2222-222222222002','33333333-3333-3333-3333-333333333001','FW26-SW-002','Cashmere Sweater','Knitwear',3000,65.00,'2026-10-16','2027-02-01','ncr_open',seed_user_id)
on conflict (id) do nothing;

-- =========================================================
-- SAMPLE INSPECTIONS
-- =========================================================

insert into public.inspections
  (po_id, inspection_type, scheduled_date, inspection_firm_id, sample_size, major_defects_allowed, minor_defects_allowed, status, result, major_defects_found, minor_defects_found, critical_defects_found)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa0002','final_random','2026-11-15','33333333-3333-3333-3333-333333333001',200,10,14,'scheduled','pending',0,0,0),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa0003','final_random','2026-11-10','33333333-3333-3333-3333-333333333002',125,7,10,'completed_pass','pass',4,8,0),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa0005','final_random','2026-11-05','33333333-3333-3333-3333-333333333001',80,5,7,'completed_fail','fail',8,12,1);

-- =========================================================
-- SAMPLE DEFECTS
-- =========================================================

insert into public.defects
  (po_id, defect_category_id, severity, quantity, logged_from, logged_by)
select
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa0005',
  dc.id,
  dc.severity,
  (random() * 5 + 1)::integer,
  'inspector',
  seed_user_id
from public.defect_categories dc
where dc.code in ('STITCH-OPEN','FABRIC-HOLE','BTN-LOOSE','ZIP-FAULT','COLOR-MIS')
limit 10;

-- =========================================================
-- SAMPLE NCR
-- =========================================================

insert into public.ncrs
  (ncr_number, po_id, issued_by, severity, title, description, status, due_at)
values
  ('NCR-2611-001','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa0005',seed_user_id,'major','Multiple fabric defects in Cashmere Sweater lot','Fabric holes and zipper issues detected in 10% of inspected sample. Rework required before release.','root_cause_analysis','2026-11-20 23:59:00+00')
on conflict (ncr_number) do nothing;

-- =========================================================
-- SAMPLE CoQ ENTRIES
-- =========================================================

insert into public.coq_entries (po_id, brand_id, factory_id, bucket, amount, description, recorded_by)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa0001','11111111-1111-1111-1111-111111111001','22222222-2222-2222-2222-222222222001','prevention',1200.00,'Pre-production training visit',seed_user_id),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa0001','11111111-1111-1111-1111-111111111001','22222222-2222-2222-2222-222222222001','appraisal',850.00,'In-line inspection fees',seed_user_id),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa0002','11111111-1111-1111-1111-111111111001','22222222-2222-2222-2222-222222222002','appraisal',620.00,'Final random inspection fee',seed_user_id),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa0005','11111111-1111-1111-1111-111111111001','22222222-2222-2222-2222-222222222002','internal_failure',3400.00,'Rework for Cashmere Sweater defects',seed_user_id),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa0005','11111111-1111-1111-1111-111111111001','22222222-2222-2222-2222-222222222002','external_failure',1200.00,'Air freight for delayed release',seed_user_id);

end $$;

-- =========================================================
-- VERIFICATION
-- =========================================================
-- Run these to confirm data loaded correctly:
-- select count(*) from public.tenants;        -- should be 7
-- select count(*) from public.purchase_orders; -- should be 5
-- select count(*) from public.defects;         -- should be ~10
-- select * from public.v_coq_by_po;            -- should show 5 rows
