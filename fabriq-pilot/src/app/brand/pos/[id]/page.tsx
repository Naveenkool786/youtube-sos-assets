import Link from 'next/link';
import { createServerSupabase } from '@/lib/supabase';
import type { POStatus, InspectionStatus, Severity, NCRStatus, CoQBucket } from '@/types/database';

const STATUS_COLORS: Record<POStatus, string> = {
  draft: 'bg-gray-200 text-gray-700',
  pending_factory: 'bg-amber-100 text-amber-700',
  accepted: 'bg-blue-100 text-blue-700',
  in_production: 'bg-blue-100 text-blue-700',
  awaiting_inspection: 'bg-amber-100 text-amber-700',
  inspected: 'bg-emerald-100 text-emerald-700',
  released: 'bg-emerald-100 text-emerald-700',
  shipped: 'bg-emerald-100 text-emerald-700',
  ncr_open: 'bg-rose-100 text-rose-700',
  closed: 'bg-gray-200 text-gray-700',
  cancelled: 'bg-gray-200 text-gray-700',
};

const STATUS_LABELS: Record<POStatus, string> = {
  draft: 'Draft',
  pending_factory: 'Pending factory',
  accepted: 'Accepted',
  in_production: 'In production',
  awaiting_inspection: 'Awaiting inspection',
  inspected: 'Inspected',
  released: 'Released',
  shipped: 'Shipped',
  ncr_open: 'NCR open',
  closed: 'Closed',
  cancelled: 'Cancelled',
};

const INSPECTION_STATUS_LABELS: Record<InspectionStatus, string> = {
  scheduled: 'Scheduled',
  started: 'Started',
  in_progress: 'In progress',
  paused: 'Paused',
  completed_pass: 'Completed (Pass)',
  completed_fail: 'Completed (Fail)',
  cancelled: 'Cancelled',
};

const INSPECTION_TYPE_LABELS: Record<string, string> = {
  in_line: 'In-line',
  pre_final: 'Pre-final',
  final_random: 'Final random',
  '4_point_fabric': '4-point fabric',
  ethical_audit: 'Ethical audit',
  container_loading: 'Container loading',
};

const SEVERITY_COLORS: Record<Severity, string> = {
  minor: 'bg-amber-100 text-amber-700',
  major: 'bg-orange-100 text-orange-700',
  critical: 'bg-red-100 text-red-700',
};

const NCR_STATUS_LABELS: Record<NCRStatus, string> = {
  issued: 'Issued',
  assigned: 'Assigned',
  root_cause_analysis: 'Root cause analysis',
  corrective_action: 'Corrective action',
  verified: 'Verified',
  closed: 'Closed',
  rejected: 'Rejected',
};

const BUCKET_LABELS: Record<CoQBucket, string> = {
  prevention: 'Prevention',
  appraisal: 'Appraisal',
  internal_failure: 'Internal failure',
  external_failure: 'External failure',
};

export default async function PODetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerSupabase();

  const { data: po } = await supabase
    .from('purchase_orders')
    .select('*, factory:tenants!purchase_orders_factory_id_fkey(*), inspection_firm:tenants!purchase_orders_inspection_firm_id_fkey(*), brand:tenants!purchase_orders_brand_id_fkey(*)')
    .eq('id', id)
    .single() as { data: any };

  if (!po) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: '#FAF7F1' }}>
        <div className="text-center">
          <h1 className="font-serif text-3xl mb-4" style={{ color: '#171A17' }}>PO not found</h1>
          <Link href="/brand/dashboard" className="text-sm underline" style={{ color: '#0F4238' }}>
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  const [{ data: inspections }, { data: defects }, { data: ncrs }, { data: coqEntries }] = await Promise.all([
    supabase
      .from('inspections')
      .select('*, inspector:profiles!inspections_inspector_id_fkey(display_name)')
      .eq('po_id', id)
      .order('scheduled_date', { ascending: false }),
    supabase
      .from('defects')
      .select('*, category:defect_categories(*)')
      .eq('po_id', id)
      .order('logged_at', { ascending: false }),
    supabase
      .from('ncrs')
      .select('*')
      .eq('po_id', id),
    supabase
      .from('coq_entries')
      .select('*')
      .eq('po_id', id),
  ]);

  const coqByBucket: Record<string, number> = {};
  let coqTotal = 0;
  for (const entry of coqEntries || []) {
    const e = entry as any;
    const amt = Number(e.amount || 0);
    coqByBucket[e.bucket] = (coqByBucket[e.bucket] || 0) + amt;
    coqTotal += amt;
  }

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8 py-8">
      <Link href="/brand/pos" className="inline-flex items-center gap-1 text-sm mb-6 hover:underline pl-10 md:pl-0" style={{ color: '#0F4238' }}>
        ← Back to Purchase Orders
      </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
          <h1 className="font-serif text-3xl" style={{ color: '#171A17' }}>{po.po_number}</h1>
          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium w-fit ${STATUS_COLORS[po.status as POStatus]}`}>
            {STATUS_LABELS[po.status as POStatus]}
          </span>
          {po.style_name && (
            <span className="text-lg" style={{ color: '#5A635C' }}>{po.style_name}</span>
          )}
        </div>

        {/* Info Grid */}
        <Section title="Details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <InfoRow label="Factory" value={(po as any).factory?.name || '—'} />
            <InfoRow label="Quantity" value={po.quantity.toLocaleString()} />
            <InfoRow label="Unit price" value={po.unit_price ? `${po.currency} ${Number(po.unit_price).toFixed(2)}` : '—'} />
            <InfoRow label="PO date" value={fmtDate(po.po_date)} />
            <InfoRow label="Ex-factory date" value={fmtDate(po.ex_factory_date)} />
            <InfoRow label="Ship mode" value={po.ship_mode || '—'} />
            <InfoRow label="AQL level" value={po.aql_level || '—'} />
            <InfoRow label="Inspection firm" value={(po as any).inspection_firm?.name || '—'} />
          </div>
        </Section>

        {/* Inspections */}
        <Section title="Inspections">
          {inspections && inspections.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-wider" style={{ color: '#5A635C', background: '#F2EDE2' }}>
                    <th className="px-4 py-2 text-left font-medium">Type</th>
                    <th className="px-4 py-2 text-left font-medium">Date</th>
                    <th className="px-4 py-2 text-left font-medium">Inspector</th>
                    <th className="px-4 py-2 text-left font-medium">Status</th>
                    <th className="px-4 py-2 text-left font-medium">Result</th>
                    <th className="px-4 py-2 text-right font-medium">Maj</th>
                    <th className="px-4 py-2 text-right font-medium">Min</th>
                    <th className="px-4 py-2 text-right font-medium">Crit</th>
                  </tr>
                </thead>
                <tbody>
                  {inspections.map((insp: any) => (
                    <tr key={insp.id} className="border-t" style={{ borderColor: '#ECE4D1' }}>
                      <td className="px-4 py-3" style={{ color: '#171A17' }}>{INSPECTION_TYPE_LABELS[insp.inspection_type] || insp.inspection_type}</td>
                      <td className="px-4 py-3" style={{ color: '#5A635C' }}>{fmtDate(insp.scheduled_date)}</td>
                      <td className="px-4 py-3" style={{ color: '#5A635C' }}>{insp.inspector?.display_name || '—'}</td>
                      <td className="px-4 py-3" style={{ color: '#5A635C' }}>{INSPECTION_STATUS_LABELS[insp.status as InspectionStatus] || insp.status}</td>
                      <td className="px-4 py-3">
                        {insp.result === 'pass' && <span className="text-emerald-600 font-medium">Pass</span>}
                        {insp.result === 'fail' && <span className="text-red-600 font-medium">Fail</span>}
                        {(!insp.result || insp.result === 'pending') && <span style={{ color: '#5A635C' }}>Pending</span>}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-xs" style={{ color: '#171A17' }}>
                        {insp.major_defects_found}/{insp.major_defects_allowed ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-xs" style={{ color: '#171A17' }}>
                        {insp.minor_defects_found}/{insp.minor_defects_allowed ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-xs" style={{ color: '#171A17' }}>
                        {insp.critical_defects_found}/{insp.critical_defects_allowed ?? '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState>No inspections recorded.</EmptyState>
          )}
        </Section>

        {/* Defects */}
        <Section title="Defects">
          {defects && defects.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-wider" style={{ color: '#5A635C', background: '#F2EDE2' }}>
                    <th className="px-4 py-2 text-left font-medium">Category</th>
                    <th className="px-4 py-2 text-left font-medium">Severity</th>
                    <th className="px-4 py-2 text-right font-medium">Qty</th>
                    <th className="px-4 py-2 text-left font-medium">Location</th>
                    <th className="px-4 py-2 text-left font-medium">Source</th>
                    <th className="px-4 py-2 text-right font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {defects.map((d: any) => (
                    <tr key={d.id} className="border-t" style={{ borderColor: '#ECE4D1' }}>
                      <td className="px-4 py-3" style={{ color: '#171A17' }}>{d.category?.name || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${SEVERITY_COLORS[d.severity as Severity]}`}>
                          {d.severity}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-xs" style={{ color: '#171A17' }}>{d.quantity}</td>
                      <td className="px-4 py-3" style={{ color: '#5A635C' }}>{d.location || '—'}</td>
                      <td className="px-4 py-3" style={{ color: '#5A635C' }}>{d.logged_from?.replace('_', ' ') || '—'}</td>
                      <td className="px-4 py-3 text-right text-xs" style={{ color: '#5A635C' }}>{fmtDate(d.logged_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState>No defects logged.</EmptyState>
          )}
        </Section>

        {/* NCRs */}
        <Section title="Non-Conformance Reports">
          {ncrs && ncrs.length > 0 ? (
            <div className="space-y-3">
              {ncrs.map((ncr: any) => (
                <div key={ncr.id} className="border rounded-xl p-4" style={{ borderColor: '#ECE4D1' }}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <span className="font-mono text-xs" style={{ color: '#5A635C' }}>{ncr.ncr_number}</span>
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium w-fit ${SEVERITY_COLORS[ncr.severity as Severity]}`}>
                      {ncr.severity}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100" style={{ color: '#5A635C' }}>
                      {NCR_STATUS_LABELS[ncr.status as NCRStatus] || ncr.status}
                    </span>
                  </div>
                  <h3 className="font-medium mb-1" style={{ color: '#171A17' }}>{ncr.title}</h3>
                  {ncr.description && <p className="text-sm" style={{ color: '#5A635C' }}>{ncr.description}</p>}
                </div>
              ))}
            </div>
          ) : (
            <EmptyState>No NCRs issued.</EmptyState>
          )}
        </Section>

        {/* Cost of Quality */}
        <Section title="Cost of Quality">
          {coqTotal > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              {(['prevention', 'appraisal', 'internal_failure', 'external_failure'] as CoQBucket[]).map((bucket) => (
                <div key={bucket} className="text-center">
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#5A635C' }}>
                    {BUCKET_LABELS[bucket]}
                  </div>
                  <div className="font-serif text-xl" style={{ color: bucket.includes('failure') ? '#D96060' : '#0F4238' }}>
                    ${((coqByBucket[bucket] || 0) / 1000).toFixed(1)}k
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState>No cost of quality data.</EmptyState>
          )}
          {coqTotal > 0 && (
            <div className="text-right text-sm border-t pt-3" style={{ borderColor: '#ECE4D1', color: '#171A17' }}>
              Total: <span className="font-serif text-lg font-medium">${(coqTotal / 1000).toFixed(1)}k</span>
            </div>
          )}
        </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border overflow-hidden mb-6" style={{ borderColor: '#E6DFCF' }}>
      <div className="px-6 py-4 border-b" style={{ borderColor: '#E6DFCF' }}>
        <h2 className="font-serif text-xl" style={{ color: '#171A17' }}>{title}</h2>
      </div>
      <div className="px-6 py-4">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1 border-b" style={{ borderColor: '#F2EDE2' }}>
      <span style={{ color: '#5A635C' }}>{label}</span>
      <span style={{ color: '#171A17' }}>{value}</span>
    </div>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return <p className="text-sm py-4 text-center" style={{ color: '#5A635C' }}>{children}</p>;
}

function fmtDate(d: string | null): string {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-GB');
}
