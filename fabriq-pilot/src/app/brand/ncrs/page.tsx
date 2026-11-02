import { createServerSupabase } from '@/lib/supabase';
import type { Severity, NCRStatus } from '@/types/database';

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

export default async function NCRsPage() {
  const supabase = await createServerSupabase();

  const { data: ncrs } = await supabase
    .from('ncrs')
    .select('*, po:purchase_orders!ncrs_po_id_fkey(po_number)')
    .order('issued_at', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
      <h1 className="font-serif text-4xl mb-8 pl-10 md:pl-0" style={{ color: '#171A17' }}>Non-Conformance Reports</h1>

      <div className="space-y-4">
        {(ncrs || []).map((ncr: any) => (
          <div key={ncr.id} className="bg-white rounded-2xl border p-6" style={{ borderColor: '#E6DFCF' }}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <span className="font-mono text-xs" style={{ color: '#5A635C' }}>{ncr.ncr_number}</span>
              <span className="font-mono text-xs" style={{ color: '#0F4238' }}>{ncr.po?.po_number}</span>
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
        {(!ncrs || ncrs.length === 0) && (
          <div className="bg-white rounded-2xl border p-12 text-center" style={{ borderColor: '#E6DFCF' }}>
            <p className="text-sm" style={{ color: '#5A635C' }}>No NCRs issued.</p>
          </div>
        )}
      </div>
    </div>
  );
}
