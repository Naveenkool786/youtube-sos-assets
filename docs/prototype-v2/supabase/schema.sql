-- FABRIQ — Prototype v2 Database Schema
-- Run this in Supabase SQL Editor BEFORE policies.sql and seed.sql
-- Postgres 15+ (Supabase default)

-- =========================================================
-- EXTENSIONS
-- =========================================================
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- =========================================================
-- MASTER DATA (shared, read-only for most users)
-- =========================================================

create table public.countries (
  code char(2) primary key,
  name text not null,
  region text not null
);

create table public.defect_categories (
  id uuid primary key default uuid_generate_v4(),
  code text not null unique,
  name text not null,
  severity text not null check (severity in ('minor','major','critical')),
  pictorial_url text,
  description text,
  created_at timestamptz default now()
);

create table public.inspection_standards (
  id uuid primary key default uuid_generate_v4(),
  code text not null unique,
  name text not null,
  version text,
  description text
);

-- =========================================================
-- TENANTS (brand / factory / inspection firm)
-- =========================================================

create type tenant_type as enum ('brand','factory','inspection_firm');

create table public.tenants (
  id uuid primary key default uuid_generate_v4(),
  tenant_type tenant_type not null,
  name text not null,
  short_code text unique,
  country_code char(2) references public.countries(code),
  logo_url text,
  website text,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index tenants_type_idx on public.tenants(tenant_type);
create index tenants_active_idx on public.tenants(active);

-- =========================================================
-- USERS (profiles linked to Supabase auth.users)
-- =========================================================

create type user_role as enum (
  'brand_admin','brand_qa','brand_merch',
  'factory_admin','factory_qc_head','factory_line_supervisor','factory_worker',
  'firm_admin','firm_inspector',
  'super_admin'
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  tenant_id uuid references public.tenants(id) on delete set null,
  tenant_type tenant_type,
  role user_role not null,
  display_name text,
  email text,
  avatar_url text,
  locale text default 'en',
  active boolean default true,
  created_at timestamptz default now()
);

create index profiles_tenant_idx on public.profiles(tenant_id);

-- =========================================================
-- POs (Purchase Orders — the heart of the system)
-- =========================================================

create type po_status as enum (
  'draft','pending_factory','accepted','in_production',
  'awaiting_inspection','inspected','released','shipped','ncr_open','closed','cancelled'
);

create table public.purchase_orders (
  id uuid primary key default uuid_generate_v4(),
  po_number text not null unique,
  brand_id uuid not null references public.tenants(id),
  factory_id uuid not null references public.tenants(id),
  inspection_firm_id uuid references public.tenants(id),
  style_number text,
  style_name text,
  product_category text,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,2),
  currency text default 'USD',
  po_date date not null default current_date,
  ex_factory_date date,
  ship_mode text,
  aql_level text default 'II',
  inspection_standard_id uuid references public.inspection_standards(id),
  status po_status not null default 'draft',
  created_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index po_brand_idx on public.purchase_orders(brand_id);
create index po_factory_idx on public.purchase_orders(factory_id);
create index po_firm_idx on public.purchase_orders(inspection_firm_id);
create index po_status_idx on public.purchase_orders(status);
create index po_date_idx on public.purchase_orders(po_date);

-- =========================================================
-- INSPECTIONS
-- =========================================================

create type inspection_type as enum (
  'in_line','pre_final','final_random','4_point_fabric','ethical_audit','container_loading'
);

create type inspection_status as enum (
  'scheduled','started','in_progress','paused','completed_pass','completed_fail','cancelled'
);

create table public.inspections (
  id uuid primary key default uuid_generate_v4(),
  po_id uuid not null references public.purchase_orders(id) on delete cascade,
  inspection_type inspection_type not null,
  scheduled_date date,
  started_at timestamptz,
  completed_at timestamptz,
  inspector_id uuid references public.profiles(id),
  inspection_firm_id uuid references public.tenants(id),
  sample_size integer,
  major_defects_found integer default 0,
  minor_defects_found integer default 0,
  critical_defects_found integer default 0,
  major_defects_allowed integer,
  minor_defects_allowed integer,
  critical_defects_allowed integer default 0,
  status inspection_status not null default 'scheduled',
  result text check (result in ('pass','fail','pending')),
  signature_hash text,
  signature_signed_at timestamptz,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index inspection_po_idx on public.inspections(po_id);
create index inspection_firm_idx on public.inspections(inspection_firm_id);
create index inspection_date_idx on public.inspections(scheduled_date);

-- =========================================================
-- DEFECTS (logged during inspection or in-line by factory)
-- =========================================================

create table public.defects (
  id uuid primary key default uuid_generate_v4(),
  inspection_id uuid references public.inspections(id) on delete cascade,
  po_id uuid not null references public.purchase_orders(id) on delete cascade,
  defect_category_id uuid not null references public.defect_categories(id),
  severity text not null check (severity in ('minor','major','critical')),
  quantity integer not null default 1 check (quantity > 0),
  location text,
  photo_urls text[] default array[]::text[],
  logged_by uuid references public.profiles(id),
  logged_from text check (logged_from in ('factory_line','factory_qc','inspector','brand')),
  logged_at timestamptz default now(),
  notes text
);

create index defects_po_idx on public.defects(po_id);
create index defects_inspection_idx on public.defects(inspection_id);
create index defects_severity_idx on public.defects(severity);
create index defects_logged_at_idx on public.defects(logged_at desc);

-- =========================================================
-- NCRs (Non-Conformance Reports)
-- =========================================================

create type ncr_status as enum (
  'issued','assigned','root_cause_analysis','corrective_action','verified','closed','rejected'
);

create table public.ncrs (
  id uuid primary key default uuid_generate_v4(),
  ncr_number text not null unique,
  po_id uuid not null references public.purchase_orders(id) on delete cascade,
  issued_by uuid references public.profiles(id),
  assigned_to uuid references public.profiles(id),
  severity text not null check (severity in ('minor','major','critical')),
  title text not null,
  description text,
  root_cause text,
  corrective_action text,
  verification_notes text,
  status ncr_status not null default 'issued',
  issued_at timestamptz default now(),
  due_at timestamptz,
  closed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index ncr_po_idx on public.ncrs(po_id);
create index ncr_status_idx on public.ncrs(status);
create index ncr_assigned_idx on public.ncrs(assigned_to);

-- =========================================================
-- COST OF QUALITY (CoQ) tracked per PO, aggregated per brand
-- =========================================================

create table public.coq_entries (
  id uuid primary key default uuid_generate_v4(),
  po_id uuid references public.purchase_orders(id) on delete cascade,
  brand_id uuid not null references public.tenants(id),
  factory_id uuid references public.tenants(id),
  bucket text not null check (bucket in ('prevention','appraisal','internal_failure','external_failure')),
  amount numeric(12,2) not null,
  currency text default 'USD',
  description text,
  recorded_at timestamptz default now(),
  recorded_by uuid references public.profiles(id)
);

create index coq_po_idx on public.coq_entries(po_id);
create index coq_brand_idx on public.coq_entries(brand_id);
create index coq_bucket_idx on public.coq_entries(bucket);

-- =========================================================
-- AI CHAT HISTORY (per user, for AI assistant context)
-- =========================================================

create table public.ai_conversations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.ai_messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references public.ai_conversations(id) on delete cascade,
  role text not null check (role in ('user','assistant','system')),
  content text not null,
  tokens_used integer,
  created_at timestamptz default now()
);

create index ai_msg_conv_idx on public.ai_messages(conversation_id);

-- =========================================================
-- AUDIT LOG (for compliance evidence)
-- =========================================================

create table public.audit_log (
  id uuid primary key default uuid_generate_v4(),
  actor_id uuid references public.profiles(id),
  tenant_id uuid references public.tenants(id),
  entity_type text not null,
  entity_id uuid,
  action text not null,
  before_state jsonb,
  after_state jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz default now()
);

create index audit_entity_idx on public.audit_log(entity_type, entity_id);
create index audit_actor_idx on public.audit_log(actor_id);
create index audit_created_idx on public.audit_log(created_at desc);

-- =========================================================
-- TRIGGERS: auto-update updated_at
-- =========================================================

create or replace function public.touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger t_tenants_updated before update on public.tenants
  for each row execute function public.touch_updated_at();
create trigger t_po_updated before update on public.purchase_orders
  for each row execute function public.touch_updated_at();
create trigger t_insp_updated before update on public.inspections
  for each row execute function public.touch_updated_at();
create trigger t_ncr_updated before update on public.ncrs
  for each row execute function public.touch_updated_at();
create trigger t_aiconv_updated before update on public.ai_conversations
  for each row execute function public.touch_updated_at();

-- =========================================================
-- HELPER: auto-create profile on auth.users insert
-- (You call public.create_profile from a Supabase Auth hook)
-- =========================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =========================================================
-- VIEWS: aggregate CoQ per PO
-- =========================================================

create or replace view public.v_coq_by_po as
select
  po.id as po_id,
  po.po_number,
  po.brand_id,
  po.factory_id,
  sum(case when coq.bucket = 'prevention' then coq.amount else 0 end) as prevention,
  sum(case when coq.bucket = 'appraisal' then coq.amount else 0 end) as appraisal,
  sum(case when coq.bucket = 'internal_failure' then coq.amount else 0 end) as internal_failure,
  sum(case when coq.bucket = 'external_failure' then coq.amount else 0 end) as external_failure,
  sum(coq.amount) as total_coq
from public.purchase_orders po
left join public.coq_entries coq on coq.po_id = po.id
group by po.id;

create or replace view public.v_defect_summary_po as
select
  d.po_id,
  sum(case when d.severity = 'minor' then d.quantity else 0 end) as minor_count,
  sum(case when d.severity = 'major' then d.quantity else 0 end) as major_count,
  sum(case when d.severity = 'critical' then d.quantity else 0 end) as critical_count,
  sum(d.quantity) as total_defects
from public.defects d
group by d.po_id;

-- =========================================================
-- DONE. Next: run policies.sql
-- =========================================================
