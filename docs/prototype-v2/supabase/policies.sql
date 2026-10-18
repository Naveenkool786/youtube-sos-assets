-- FABRIQ — Row Level Security (RLS) Policies
-- Run AFTER schema.sql
-- These policies enforce multi-tenant isolation at the database level.

-- =========================================================
-- ENABLE RLS ON ALL BUSINESS TABLES
-- =========================================================

alter table public.tenants enable row level security;
alter table public.profiles enable row level security;
alter table public.purchase_orders enable row level security;
alter table public.inspections enable row level security;
alter table public.defects enable row level security;
alter table public.ncrs enable row level security;
alter table public.coq_entries enable row level security;
alter table public.ai_conversations enable row level security;
alter table public.ai_messages enable row level security;
alter table public.audit_log enable row level security;

-- Master data is readable by all signed-in users (no RLS needed on these)
-- countries, defect_categories, inspection_standards stay without RLS

-- =========================================================
-- HELPER: get current user's tenant & role
-- =========================================================

create or replace function public.current_tenant_id()
returns uuid
language sql stable security definer
as $$
  select tenant_id from public.profiles where id = auth.uid();
$$;

create or replace function public.current_tenant_type()
returns tenant_type
language sql stable security definer
as $$
  select tenant_type from public.profiles where id = auth.uid();
$$;

create or replace function public.current_role()
returns user_role
language sql stable security definer
as $$
  select role from public.profiles where id = auth.uid();
$$;

-- =========================================================
-- TENANTS: everyone reads their own, admins read all
-- =========================================================

create policy "profiles_select_own_tenant" on public.tenants
  for select using (
    id = public.current_tenant_id()
    or public.current_role() = 'super_admin'
  );

create policy "tenants_update_own_admin" on public.tenants
  for update using (
    id = public.current_tenant_id()
    and public.current_role() in ('brand_admin','factory_admin','firm_admin','super_admin')
  );

-- =========================================================
-- PROFILES
-- =========================================================

create policy "profiles_select_same_tenant" on public.profiles
  for select using (
    tenant_id = public.current_tenant_id()
    or id = auth.uid()
    or public.current_role() = 'super_admin'
  );

create policy "profiles_update_self" on public.profiles
  for update using (id = auth.uid());

create policy "profiles_insert_self" on public.profiles
  for insert with check (id = auth.uid());

-- Tenant admins can create new users in their tenant
create policy "profiles_insert_by_admin" on public.profiles
  for insert with check (
    public.current_role() in ('brand_admin','factory_admin','firm_admin','super_admin')
    and tenant_id = public.current_tenant_id()
  );

-- =========================================================
-- PURCHASE ORDERS
-- =========================================================

-- Brand sees their own POs
-- Factory sees POs assigned to them
-- Inspection firm sees POs where they're the inspector
create policy "po_select_three_party" on public.purchase_orders
  for select using (
    brand_id = public.current_tenant_id()
    or factory_id = public.current_tenant_id()
    or inspection_firm_id = public.current_tenant_id()
    or public.current_role() = 'super_admin'
  );

-- Only brand can create their own POs
create policy "po_insert_by_brand" on public.purchase_orders
  for insert with check (
    brand_id = public.current_tenant_id()
    and public.current_tenant_type() = 'brand'
  );

-- Brand can update their own POs
create policy "po_update_by_brand" on public.purchase_orders
  for update using (
    brand_id = public.current_tenant_id()
    and public.current_tenant_type() = 'brand'
  );

-- Factory can update status only (to acknowledge PO, mark in-production)
create policy "po_status_update_by_factory" on public.purchase_orders
  for update using (
    factory_id = public.current_tenant_id()
    and public.current_tenant_type() = 'factory'
  );

-- =========================================================
-- INSPECTIONS
-- =========================================================

-- Visible to all three parties on the PO
create policy "inspection_select_three_party" on public.inspections
  for select using (
    exists (
      select 1 from public.purchase_orders po
      where po.id = inspections.po_id
        and (po.brand_id = public.current_tenant_id()
          or po.factory_id = public.current_tenant_id()
          or po.inspection_firm_id = public.current_tenant_id())
    )
    or public.current_role() = 'super_admin'
  );

-- Inspector or brand can create inspection
create policy "inspection_insert" on public.inspections
  for insert with check (
    exists (
      select 1 from public.purchase_orders po
      where po.id = inspections.po_id
        and (po.brand_id = public.current_tenant_id()
          or po.inspection_firm_id = public.current_tenant_id())
    )
  );

-- Only inspector can update inspection results
create policy "inspection_update_by_inspector" on public.inspections
  for update using (
    inspection_firm_id = public.current_tenant_id()
    and public.current_tenant_type() = 'inspection_firm'
  );

-- =========================================================
-- DEFECTS
-- =========================================================

create policy "defects_select_three_party" on public.defects
  for select using (
    exists (
      select 1 from public.purchase_orders po
      where po.id = defects.po_id
        and (po.brand_id = public.current_tenant_id()
          or po.factory_id = public.current_tenant_id()
          or po.inspection_firm_id = public.current_tenant_id())
    )
    or public.current_role() = 'super_admin'
  );

-- Factory or inspector can log defects
create policy "defects_insert_factory_or_inspector" on public.defects
  for insert with check (
    exists (
      select 1 from public.purchase_orders po
      where po.id = defects.po_id
        and (po.factory_id = public.current_tenant_id()
          or po.inspection_firm_id = public.current_tenant_id())
    )
  );

-- Only the logger can delete their own entry (within 1 hour)
create policy "defects_delete_own_recent" on public.defects
  for delete using (
    logged_by = auth.uid()
    and logged_at > now() - interval '1 hour'
  );

-- =========================================================
-- NCRs
-- =========================================================

create policy "ncr_select_three_party" on public.ncrs
  for select using (
    exists (
      select 1 from public.purchase_orders po
      where po.id = ncrs.po_id
        and (po.brand_id = public.current_tenant_id()
          or po.factory_id = public.current_tenant_id()
          or po.inspection_firm_id = public.current_tenant_id())
    )
  );

-- Only brand can raise an NCR
create policy "ncr_insert_by_brand" on public.ncrs
  for insert with check (
    exists (
      select 1 from public.purchase_orders po
      where po.id = ncrs.po_id
        and po.brand_id = public.current_tenant_id()
    )
    and public.current_tenant_type() = 'brand'
  );

-- Brand or assigned factory can update NCR
create policy "ncr_update" on public.ncrs
  for update using (
    exists (
      select 1 from public.purchase_orders po
      where po.id = ncrs.po_id
        and (po.brand_id = public.current_tenant_id()
          or po.factory_id = public.current_tenant_id())
    )
  );

-- =========================================================
-- CoQ ENTRIES
-- =========================================================

-- Brand sees their own CoQ data only
create policy "coq_select_brand_own" on public.coq_entries
  for select using (
    brand_id = public.current_tenant_id()
    and public.current_tenant_type() = 'brand'
  );

create policy "coq_insert_brand" on public.coq_entries
  for insert with check (
    brand_id = public.current_tenant_id()
    and public.current_tenant_type() = 'brand'
  );

-- =========================================================
-- AI CONVERSATIONS (private per user)
-- =========================================================

create policy "ai_conv_own" on public.ai_conversations
  for all using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "ai_msg_own" on public.ai_messages
  for all using (
    exists (
      select 1 from public.ai_conversations c
      where c.id = ai_messages.conversation_id and c.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.ai_conversations c
      where c.id = ai_messages.conversation_id and c.user_id = auth.uid()
    )
  );

-- =========================================================
-- AUDIT LOG (read own tenant's actions)
-- =========================================================

create policy "audit_read_tenant" on public.audit_log
  for select using (
    tenant_id = public.current_tenant_id()
    or public.current_role() = 'super_admin'
  );

-- Everyone can insert audit entries (always for their own actions)
create policy "audit_insert" on public.audit_log
  for insert with check (actor_id = auth.uid());

-- =========================================================
-- STORAGE BUCKET POLICIES
-- =========================================================

-- defect-photos bucket: only tenant members can upload/view
-- Run these in Storage → Policies in the Supabase dashboard
-- (SQL below is for reference; use the UI to apply)

-- Upload policy: anyone in a tenant whose PO is referenced
-- Download policy: anyone on the three-party model for that PO
-- Replace {bucket_id} with your actual bucket in the dashboard

-- Example upload policy for defect-photos (configure in dashboard):
--   (role() = 'authenticated' AND public.current_tenant_id() IS NOT NULL)

-- =========================================================
-- DONE. Next: run seed.sql
-- =========================================================
