import Link from 'next/link';
import { createServerSupabase } from '@/lib/supabase';
import type { POStatus, InspectionStatus, Severity, NCRStatus, CoQBucket } from '@/types/database';

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
const TYPE_LABELS: Record<string, string> = {
  in_line: 'In-line', pre_final: 'Pre-final', final_random: 'Final random',
  '4_point_fabric': '4-point fabric', ethical_audit: 'Ethical audit', container_loading: 'Container loading',
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
const BUCKET_LABELS: Record<CoQBucket, string> = {
  prevention: 'Prevention', appraisal: 'Appraisal',
  internal_failure: 'Internal Failure', external_failure: 'External Failure',
};
const BUCKET_COLORS: Record<CoQBucket, string> = {
  prevention: 'var(--success)', appraisal: 'var(--info)',
  internal_failure: 'var(--warning)', external_failure: 'var(--danger)',
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
      <main className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">PO not found</h1>
          <Link href="/brand/pos" className="text-sm underline" style={{ color: 'var(--primary)' }}>Back to POs</Link>
        </div>
      </main>
    );
  }

  const [{ data: inspections }, { data: defects }, { data: ncrs }, { data: coqEntries }] = await Promise.all([
    supabase.from('inspections').select('*, inspector:profiles!inspections_inspector_id_fkey(display_name)')
      .eq('po_id', id).order('scheduled_date', { ascending: false }),
    supabase.from('defects').select('*, category:defect_categories(*)').eq('po_id', id).order('logged_at', { ascending: false }),
    supabase.from('ncrs').select('*').eq('po_id', id),
    supabase.from('coq_entries').select('*').eq('po_id', id),
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
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      <button onClick={undefined} className="btn btn-ghost mb-4 pl-10 md:pl-0">
        <Link href="/brand/pos" className="flex items-center gap-1 text-sm" style={{ color: 'var(--text-muted)' }}>
          ← Back to Purchase Orders
        </Link>
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{po.po_number}</h1>
        <span className={`chip ${STATUS_CHIP[po.status as POStatus]}`}>{STATUS_LABELS[po.status as POStatus]}</span>
        {po.style_name && <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{po.style_name}</span>}
      </div>

      {/* Details */}
      <Section title="Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
          <InfoRow label="Factory" value={po.factory?.name || '—'} />
          <InfoRow label="Quantity" value={po.quantity?.toLocaleString()} />
          <InfoRow label="Unit price" value={po.unit_price ? `${po.currency} ${Number(po.unit_price).toFixed(2)}` : '—'} />
          <InfoRow label="PO date" value={fmtDate(po.po_date)} />
          <InfoRow label="Ex-factory date" value={fmtDate(po.ex_factory_date)} />
          <InfoRow label="Ship mode" value={po.ship_mode || '—'} />
          <InfoRow label="AQL level" value={po.aql_level || '—'} />
          <InfoRow label="Inspection firm" value={po.inspection_firm?.name || '—'} />
        </div>
      </Section>

      {/* Quality Standards */}
      <Section title="Quality Standards">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-sm">
          <div className="text-center"><div className="text-xs" style={{ color: 'var(--text-muted)' }}>Sampling</div><div className="font-bold">AQL Level II</div></div>
          <div className="text-center"><div className="text-xs" style={{ color: 'var(--text-muted)' }}>Major AQL</div><div className="font-bold">2.5</div></div>
          <div className="text-center"><div className="text-xs" style={{ color: 'var(--text-muted)' }}>Minor AQL</div><div className="font-bold">4.0</div></div>
          <div className="text-center"><div className="text-xs" style={{ color: 'var(--text-muted)' }}>Critical</div><div className="font-bold">0 allowed</div></div>
          <div className="text-center"><div className="text-xs" style={{ color: 'var(--text-muted)' }}>Lab tests</div><div className="font-bold">10 mandatory</div></div>
        </div>
      </Section>

      {/* Inspections */}
      <Section title="Inspections">
        {inspections && inspections.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs" style={{ background: 'var(--bg)', color: 'var(--text-muted)' }}>
                  <th className="px-4 py-2 text-left font-medium">Type</th>
                  <th className="px-4 py-2 text-left font-medium">Date</th>
                  <th className="px-4 py-2 text-left font-medium hidden sm:table-cell">Inspector</th>
                  <th className="px-4 py-2 text-left font-medium">Status</th>
                  <th className="px-4 py-2 text-left font-medium">Result</th>
                  <th className="px-4 py-2 text-right font-medium">Maj</th>
                  <th className="px-4 py-2 text-right font-medium">Min</th>
                  <th className="px-4 py-2 text-right font-medium">Crit</th>
                </tr>
              </thead>
              <tbody>
                {inspections.map((insp: any) => (
                  <tr key={insp.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                    <td className="px-4 py-3">{TYPE_LABELS[insp.inspection_type] || insp.inspection_type}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-muted)' }}>{fmtDate(insp.scheduled_date)}</td>
                    <td className="px-4 py-3 text-xs hidden sm:table-cell" style={{ color: 'var(--text-muted)' }}>{insp.inspector?.display_name || '—'}</td>
                    <td className="px-4 py-3"><span className={`chip ${INSP_CHIP[insp.status as InspectionStatus]}`}>{INSP_LABELS[insp.status as InspectionStatus]}</span></td>
                    <td className="px-4 py-3">
                      {insp.result === 'pass' && <span className="font-medium" style={{ color: 'var(--success)' }}>Pass</span>}
                      {insp.result === 'fail' && <span className="font-medium" style={{ color: 'var(--danger)' }}>Fail</span>}
                      {(!insp.result || insp.result === 'pending') && <span style={{ color: 'var(--text-muted)' }}>Pending</span>}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs">{insp.major_defects_found}/{insp.major_defects_allowed ?? '—'}</td>
                    <td className="px-4 py-3 text-right font-mono text-xs">{insp.minor_defects_found}/{insp.minor_defects_allowed ?? '—'}</td>
                    <td className="px-4 py-3 text-right font-mono text-xs">{insp.critical_defects_found}/{insp.critical_defects_allowed ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty>No inspections recorded.</Empty>
        )}
      </Section>

      {/* Defects */}
      <Section title="Defects">
        {defects && defects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs" style={{ background: 'var(--bg)', color: 'var(--text-muted)' }}>
                  <th className="px-4 py-2 text-left font-medium">Category</th>
                  <th className="px-4 py-2 text-left font-medium">Severity</th>
                  <th className="px-4 py-2 text-right font-medium">Qty</th>
                  <th className="px-4 py-2 text-left font-medium hidden sm:table-cell">Location</th>
                  <th className="px-4 py-2 text-right font-medium hidden sm:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {defects.map((d: any) => (
                  <tr key={d.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                    <td className="px-4 py-3">{d.category?.name || '—'}</td>
                    <td className="px-4 py-3"><span className={`chip ${SEV_CHIP[d.severity as Severity]}`}>{d.severity}</span></td>
                    <td className="px-4 py-3 text-right font-mono font-bold">{d.quantity}</td>
                    <td className="px-4 py-3 text-xs hidden sm:table-cell" style={{ color: 'var(--text-muted)' }}>{d.location || '—'}</td>
                    <td className="px-4 py-3 text-right text-xs hidden sm:table-cell" style={{ color: 'var(--text-muted)' }}>{fmtDate(d.logged_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty>No defects logged.</Empty>
        )}
      </Section>

      {/* NCRs */}
      <Section title="Non-Conformance Reports">
        {ncrs && ncrs.length > 0 ? (
          <div className="space-y-3">
            {ncrs.map((ncr: any) => (
              <div key={ncr.id} className="p-4 rounded-lg" style={{ border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{ncr.ncr_number}</span>
                  <span className={`chip ${SEV_CHIP[ncr.severity as Severity]}`}>{ncr.severity}</span>
                  <span className={`chip ${NCR_CHIP[ncr.status as NCRStatus]}`}>{NCR_LABELS[ncr.status as NCRStatus]}</span>
                </div>
                <h3 className="font-medium mb-1">{ncr.title}</h3>
                {ncr.description && <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{ncr.description}</p>}
              </div>
            ))}
          </div>
        ) : (
          <Empty>No NCRs issued.</Empty>
        )}
      </Section>

      {/* CoQ */}
      {coqTotal > 0 && (
        <Section title="Cost of Quality">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {(['prevention', 'appraisal', 'internal_failure', 'external_failure'] as CoQBucket[]).map((bucket) => (
              <div key={bucket} className="text-center">
                <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{BUCKET_LABELS[bucket]}</div>
                <div className="text-xl font-bold" style={{ color: BUCKET_COLORS[bucket] }}>
                  ${((coqByBucket[bucket] || 0) / 1000).toFixed(1)}k
                </div>
              </div>
            ))}
          </div>
          <div className="text-right text-sm pt-3" style={{ borderTop: '1px solid var(--border)' }}>
            Total: <span className="text-lg font-bold">${(coqTotal / 1000).toFixed(1)}k</span>
          </div>
        </Section>
      )}

      {/* Timeline */}
      <Section title="Timeline">
        <div className="space-y-3">
          <TimelineItem color="var(--primary)" title="Created" date={po.created_at} />
          {(inspections || []).map((i: any) => (
            <TimelineItem key={i.id} color="var(--info)" title={`Inspection ${INSP_LABELS[i.status as InspectionStatus] || i.status}`} date={i.created_at} />
          ))}
          {(ncrs || []).map((n: any) => (
            <TimelineItem key={n.id} color="var(--danger)" title={`NCR ${NCR_LABELS[n.status as NCRStatus] || n.status}`} date={n.created_at} />
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card overflow-hidden mb-4">
      <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <h2 className="font-semibold" style={{ color: 'var(--text)' }}>{title}</h2>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1.5" style={{ borderBottom: '1px solid var(--border)' }}>
      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</span>
      <span className="text-xs font-medium">{value}</span>
    </div>
  );
}

function TimelineItem({ color, title, date }: { color: string; title: string; date: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="w-2 h-2 rounded-full mt-1.5" style={{ background: color }} />
      <div>
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{date ? new Date(date).toLocaleString() : '—'}</div>
      </div>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="text-sm py-4 text-center" style={{ color: 'var(--text-subtle)' }}>{children}</p>;
}

function fmtDate(d: string | null): string {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-GB');
}
