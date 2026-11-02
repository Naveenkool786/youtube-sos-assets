import { createServerSupabase } from '@/lib/supabase';
import type { InspectionStatus } from '@/types/database';

const STATUS_CHIP: Record<InspectionStatus, string> = {
  scheduled: 'chip-warning', started: 'chip-primary', in_progress: 'chip-primary',
  paused: 'chip-neutral', completed_pass: 'chip-success', completed_fail: 'chip-danger', cancelled: 'chip-neutral',
};
const STATUS_LABELS: Record<InspectionStatus, string> = {
  scheduled: 'Scheduled', started: 'Started', in_progress: 'In progress',
  paused: 'Paused', completed_pass: 'Pass', completed_fail: 'Fail', cancelled: 'Cancelled',
};

export default async function FactoryInspectionsPage() {
  const supabase = await createServerSupabase();

  const { data: inspections } = await supabase
    .from('inspections')
    .select('*, po:purchase_orders(po_number)')
    .order('scheduled_date', { ascending: false });

  const { data: defects } = await supabase.from('defects').select('inspection_id');
  const defectCounts: Record<string, number> = {};
  for (const d of (defects || []) as any[]) {
    if (d.inspection_id) defectCounts[d.inspection_id] = (defectCounts[d.inspection_id] || 0) + 1;
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6 pl-10 md:pl-0" style={{ color: 'var(--text)' }}>Inspections</h1>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs" style={{ background: 'var(--bg)', color: 'var(--text-muted)' }}>
              <th className="text-left px-4 py-2 font-medium">ID</th>
              <th className="text-left px-4 py-2 font-medium">PO</th>
              <th className="text-left px-4 py-2 font-medium">Type</th>
              <th className="text-left px-4 py-2 font-medium">Status</th>
              <th className="text-left px-4 py-2 font-medium hidden sm:table-cell">Date</th>
              <th className="text-right px-4 py-2 font-medium hidden sm:table-cell">Defects</th>
            </tr>
          </thead>
          <tbody>
            {(inspections || []).map((i: any) => (
              <tr key={i.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{i.id.slice(0, 8)}</td>
                <td className="px-4 py-3 text-xs">{i.po?.po_number}</td>
                <td className="px-4 py-3 text-xs">{i.inspection_type?.replace(/_/g, ' ')}</td>
                <td className="px-4 py-3"><span className={`chip ${STATUS_CHIP[i.status as InspectionStatus]}`}>{STATUS_LABELS[i.status as InspectionStatus]}</span></td>
                <td className="px-4 py-3 text-xs hidden sm:table-cell" style={{ color: 'var(--text-muted)' }}>
                  {i.scheduled_date ? new Date(i.scheduled_date).toLocaleDateString('en-GB') : '—'}
                </td>
                <td className="px-4 py-3 text-right font-mono text-xs hidden sm:table-cell">{defectCounts[i.id] || 0}</td>
              </tr>
            ))}
            {(!inspections || inspections.length === 0) && (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-sm" style={{ color: 'var(--text-subtle)' }}>No inspections.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
