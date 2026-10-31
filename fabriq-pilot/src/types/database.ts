// FABRIQ — Database Types
// This is a hand-written starter. For production, generate from Supabase:
//   npx supabase gen types typescript --project-id YOUR_ID > src/types/database.generated.ts
// Then re-export from here.

export type TenantType = 'brand' | 'factory' | 'inspection_firm';

export type UserRole =
  | 'brand_admin' | 'brand_qa' | 'brand_merch'
  | 'factory_admin' | 'factory_qc_head' | 'factory_line_supervisor' | 'factory_worker'
  | 'firm_admin' | 'firm_inspector'
  | 'super_admin';

export type POStatus =
  | 'draft' | 'pending_factory' | 'accepted' | 'in_production'
  | 'awaiting_inspection' | 'inspected' | 'released' | 'shipped' | 'ncr_open' | 'closed' | 'cancelled';

export type InspectionType =
  | 'in_line' | 'pre_final' | 'final_random' | '4_point_fabric' | 'ethical_audit' | 'container_loading';

export type InspectionStatus =
  | 'scheduled' | 'started' | 'in_progress' | 'paused' | 'completed_pass' | 'completed_fail' | 'cancelled';

export type Severity = 'minor' | 'major' | 'critical';

export type NCRStatus =
  | 'issued' | 'assigned' | 'root_cause_analysis' | 'corrective_action' | 'verified' | 'closed' | 'rejected';

export type CoQBucket = 'prevention' | 'appraisal' | 'internal_failure' | 'external_failure';

export interface Tenant {
  id: string;
  tenant_type: TenantType;
  name: string;
  short_code: string | null;
  country_code: string | null;
  logo_url: string | null;
  website: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  tenant_id: string | null;
  tenant_type: TenantType | null;
  role: UserRole;
  display_name: string | null;
  email: string | null;
  avatar_url: string | null;
  locale: string;
  active: boolean;
  created_at: string;
}

export interface PurchaseOrder {
  id: string;
  po_number: string;
  brand_id: string;
  factory_id: string;
  inspection_firm_id: string | null;
  style_number: string | null;
  style_name: string | null;
  product_category: string | null;
  quantity: number;
  unit_price: number | null;
  currency: string;
  po_date: string;
  ex_factory_date: string | null;
  ship_mode: string | null;
  aql_level: string;
  inspection_standard_id: string | null;
  status: POStatus;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Inspection {
  id: string;
  po_id: string;
  inspection_type: InspectionType;
  scheduled_date: string | null;
  started_at: string | null;
  completed_at: string | null;
  inspector_id: string | null;
  inspection_firm_id: string | null;
  sample_size: number | null;
  major_defects_found: number;
  minor_defects_found: number;
  critical_defects_found: number;
  major_defects_allowed: number | null;
  minor_defects_allowed: number | null;
  critical_defects_allowed: number;
  status: InspectionStatus;
  result: 'pass' | 'fail' | 'pending' | null;
  signature_hash: string | null;
  signature_signed_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Defect {
  id: string;
  inspection_id: string | null;
  po_id: string;
  defect_category_id: string;
  severity: Severity;
  quantity: number;
  location: string | null;
  photo_urls: string[];
  logged_by: string | null;
  logged_from: 'factory_line' | 'factory_qc' | 'inspector' | 'brand' | null;
  logged_at: string;
  notes: string | null;
}

export interface NCR {
  id: string;
  ncr_number: string;
  po_id: string;
  issued_by: string | null;
  assigned_to: string | null;
  severity: Severity;
  title: string;
  description: string | null;
  root_cause: string | null;
  corrective_action: string | null;
  verification_notes: string | null;
  status: NCRStatus;
  issued_at: string;
  due_at: string | null;
  closed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CoQEntry {
  id: string;
  po_id: string | null;
  brand_id: string;
  factory_id: string | null;
  bucket: CoQBucket;
  amount: number;
  currency: string;
  description: string | null;
  recorded_at: string;
  recorded_by: string | null;
}

// =====================================================
// Supabase Database type (used by @supabase/supabase-js)
// Simplified — for full types, generate via Supabase CLI
// =====================================================
export interface Database {
  public: {
    Tables: {
      tenants: { Row: Tenant; Insert: Partial<Tenant>; Update: Partial<Tenant> };
      profiles: { Row: Profile; Insert: Partial<Profile>; Update: Partial<Profile> };
      purchase_orders: { Row: PurchaseOrder; Insert: Partial<PurchaseOrder>; Update: Partial<PurchaseOrder> };
      inspections: { Row: Inspection; Insert: Partial<Inspection>; Update: Partial<Inspection> };
      defects: { Row: Defect; Insert: Partial<Defect>; Update: Partial<Defect> };
      ncrs: { Row: NCR; Insert: Partial<NCR>; Update: Partial<NCR> };
      coq_entries: { Row: CoQEntry; Insert: Partial<CoQEntry>; Update: Partial<CoQEntry> };
    };
  };
}
