import Link from 'next/link';
import { createServerSupabase } from '@/lib/supabase';
import type { POStatus, InspectionStatus, Severity, NCRStatus } from '@/types/database';

const STATUS_CHIP: Record<POStatus, string> = {
  draft: 'chip-neutral', pending_factory: 'chip-warning', accepted: 'chip-primary',
  in_production: 'chip-primary', awaiting_inspection: 'chip-warning', inspected: 'chip-success',
  released: 'chip-success', shipped: 'chip-success', ncr_open: 'chip-danger',
  closed: 'chip-neutral', cancelled: 'chip-neutral',
};
const STATUS_LABELS: Record<POStatus, string> = {
  draft: 'Draft', pending_factory: 'Pending', accepted: 'Accepted',
  in_production: 'In production', awaiting_inspection: 'Awaiting inspection',
  inspected: 'Inspected', released: 'Released', shipped: 'Shipped',
  ncr_open: 'NCR open', closed: 'Closed', cancelled: 'Cancelled',
};
const INSP_CHIP: Record<InspectionStatus, string> = {
  scheduled: 'chip-warning', started: 'chip-primary', in_progress: 'chip-primary',
  paused: 'chip-neutral', completed_pass: 'chip-success', completed_fail: 'chip-danger', cancelled: 'chip-neutral',
};
const INSP_LABELS: Record<InspectionStatus, string> = {
  scheduled: 'Scheduled', started: 'Started', in_progress: 'In progress',
  paused: 'Paused', completed_pass: 'Pass', completed_fail: 'Fail', cancelled: 'Cancelled',
};
const SEV_CHIP: Record<Severity, string> = { minor: 'chip-info', major: 'chip-warning', critical: 'chip-danger' };
const NCR_CHIP: Record<NCRStatus, string> = {
  issued: 'chip-warning', assigned: 'chip-warning', root_cause_analysis: 'chip-primary',
  corrective_action: 'chip-primary', verified: 'chip-success', closed: 'chip-success', rejected: 'chip-danger',
};
const NCR_LABELS: Record<NCRStatus, string> = {
  issued: 'Issued', assigned: 'Assigned', root_cause_analysis: 'Root cause',
  corrective_action: 'Corrective action', verified: 'Verified', closed: 'Closed', rejected: 'Rejected',
};

export default async function FactoryPODetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerSupabase();

  const { data: po } = await supabase
    .from('purchase_orders')
    .select('*, brand:tenants!purchase_orders_brand_id_fkey(*), inspection_firm:tenants!purchase_orders_inspection_firm_id_fkey(*)')
    .eq('id', id).single() as { data: any };

  if (!po) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">PO not found</h1>
          <Link href="/factory/pos" className="text-sm underline" style={{ color: 'var(--primary)' }}>Back to POs</Link>
        </div>
      </div>
    );
  }

  const [{ data: inspections }, { data: defects }, { data: ncrs }] = await Promise.all([
    supabase.from('inspections').select('*, inspector:profiles!inspections_inspector_id_fkey(display_name)').eq('po_id', id).order('scheduled_date', { ascending: false }),
    supabase.from('defects').select('*, category:defect_categories(*)').eq('po_id', id).order('logged_at', { ascending: false }),
    supabase.from('ncrs').select('*').eq('po_id', id),
  ]);

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      <Link href="/factory/pos" className="text-sm mb-4 inline-flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>← Back</Link>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{po.po_number}</h1>
        <span className={`chip ${STATUS_CHIP[po.status as POStatus]}`}>{STATUS_LABELS[po.status as POStatus]}</span>
      </div>

      <div className="card p-5 mb-4">
        <h2 className="font-semibold mb-3">Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
          <Row label="Brand" value={po.brand?.name || '—'} />
          <Row label="Quantity" value={po.quantity?.toLocaleString()} />
          <Row label="PO date" value={po.po_date ? new Date(po.po_date).toLocaleDateString('en-GB') : '—'} />
          <Row label="Ex-factory" value={po.ex_factory_date ? new Date(po.ex_factory_date).toLocaleDateString('en-GB') : '—'} />
          <Row label="AQL level" value={po.aql_level || '—'} />
          <Row label="Style" value={po.style_name || po.style_number || '—'} />
        </div>
      </div>

      {/* Inspections */}
      <div className="card overflow-hidden mb-4">
        <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--border)' }}><h2 className="font-semibold">Inspections</h2></div>
        <div className="px-5 py-4">
          {inspections && inspections.length > 0 ? (
            <table className="w-full text-sm">
              <thead><tr className="text-xs" style={{ color: 'var(--text-muted)' }}><th className="text-left pb-2">Type</th><th className="text-left pb-2">Date</th><th className="text-left pb-2">Status</th><th className="text-left pb-2">Result</th></tr></thead>
              <tbody>
                {inspections.map((i: any) => (
                  <tr key={i.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                    <td className="py-2 text-xs">{i.inspection_type?.replace(/_/g, ' ')}</td>
                    <td className="py-2 text-xs" style={{ color: 'var(--text-muted)' }}>{i.scheduled_date ? new Date(i.scheduled_date).toLocaleDateString('en-GB') : '—'}</td>
                    <td className="py-2"><span className={`chip ${INSP_CHIP[i.status as InspectionStatus]}`}>{INSP_LABELS[i.status as InspectionStatus]}</span></td>
                    <td className="py-2 text-xs">{i.result === 'pass' ? <span style={{ color: 'var(--success)' }}>Pass</span> : i.result === 'fail' ? <span style={{ color: 'var(--danger)' }}>Fail</span> : <span style={{ color: 'var(--text-muted)' }}>Pending</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <p className="text-sm text-center py-4" style={{ color: 'var(--text-subtle)' }}>No inspections.</p>}
        </div>
      </div>

      {/* Defects */}
      {defects && defects.length > 0 && (
        <div className="card overflow-hidden mb-4">
          <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--border)' }}><h2 className="font-semibold">Defects ({defects.length})</h2></div>
          <div className="px-5 py-4">
            <table className="w-full text-sm">
              <thead><tr className="text-xs" style={{ color: 'var(--text-muted)' }}><th className="text-left pb-2">Category</th><th className="text-left pb-2">Severity</th><th className="text-right pb-2">Qty</th></tr></thead>
              <tbody>
                {defects.map((d: any) => (
                  <tr key={d.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                    <td className="py-2">{d.category?.name || '—'}</td>
                    <td className="py-2"><span className={`chip ${SEV_CHIP[d.severity as Severity]}`}>{d.severity}</span></td>
                    <td className="py-2 text-right font-mono font-bold">{d.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* NCRs */}
      {ncrs && ncrs.length > 0 && (
        <div className="card overflow-hidden mb-4">
          <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--border)' }}><h2 className="font-semibold">NCRs</h2></div>
          <div className="px-5 py-4 space-y-3">
            {ncrs.map((n: any) => (
              <div key={n.id} className="p-3 rounded-lg" style={{ border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs">{n.ncr_number}</span>
                  <span className={`chip ${SEV_CHIP[n.severity as Severity]}`}>{n.severity}</span>
                  <span className={`chip ${NCR_CHIP[n.status as NCRStatus]}`}>{NCR_LABELS[n.status as NCRStatus]}</span>
                </div>
                <div className="text-sm font-medium">{n.title}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1.5" style={{ borderBottom: '1px solid var(--border)' }}>
      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</span>
      <span className="text-xs font-medium">{value}</span>
    </div>
  );
}
