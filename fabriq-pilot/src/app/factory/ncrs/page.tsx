import { createServerSupabase } from '@/lib/supabase';
import type { NCRStatus, Severity } from '@/types/database';

const STATUS_CHIP: Record<NCRStatus, string> = {
  issued: 'chip-warning', assigned: 'chip-warning', root_cause_analysis: 'chip-primary',
  corrective_action: 'chip-primary', verified: 'chip-success', closed: 'chip-success', rejected: 'chip-danger',
};
const STATUS_LABELS: Record<NCRStatus, string> = {
  issued: 'Issued', assigned: 'Assigned', root_cause_analysis: 'Root cause',
  corrective_action: 'Corrective action', verified: 'Verified', closed: 'Closed', rejected: 'Rejected',
};
const SEV_CHIP: Record<Severity, string> = { minor: 'chip-info', major: 'chip-warning', critical: 'chip-danger' };

export default async function FactoryNCRsPage() {
  const supabase = await createServerSupabase();

  const { data: ncrs } = await supabase
    .from('ncrs')
    .select('*, po:purchase_orders(po_number)')
    .order('issued_at', { ascending: false });

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6 pl-10 md:pl-0" style={{ color: 'var(--text)' }}>NCRs</h1>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs" style={{ background: 'var(--bg)', color: 'var(--text-muted)' }}>
              <th className="text-left px-4 py-2 font-medium">NCR #</th>
              <th className="text-left px-4 py-2 font-medium">PO</th>
              <th className="text-left px-4 py-2 font-medium">Severity</th>
              <th className="text-left px-4 py-2 font-medium hidden sm:table-cell">Title</th>
              <th className="text-left px-4 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {(ncrs || []).map((n: any) => (
              <tr key={n.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                <td className="px-4 py-3 font-mono text-xs font-bold">{n.ncr_number}</td>
                <td className="px-4 py-3 text-xs">{n.po?.po_number}</td>
                <td className="px-4 py-3"><span className={`chip ${SEV_CHIP[n.severity as Severity]}`}>{n.severity}</span></td>
                <td className="px-4 py-3 text-xs hidden sm:table-cell">{n.title}</td>
                <td className="px-4 py-3"><span className={`chip ${STATUS_CHIP[n.status as NCRStatus]}`}>{STATUS_LABELS[n.status as NCRStatus]}</span></td>
              </tr>
            ))}
            {(!ncrs || ncrs.length === 0) && (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-sm" style={{ color: 'var(--text-subtle)' }}>No NCRs.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
