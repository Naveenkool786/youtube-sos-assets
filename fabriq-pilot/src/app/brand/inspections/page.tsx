import { createServerSupabase } from '@/lib/supabase';

export default async function InspectionsPage() {
  const supabase = await createServerSupabase();

  const { data: inspections } = await supabase
    .from('inspections')
    .select('*, po:purchase_orders!inspections_po_id_fkey(po_number, style_name), inspector:profiles!inspections_inspector_id_fkey(display_name)')
    .order('scheduled_date', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
      <h1 className="font-serif text-4xl mb-8 pl-10 md:pl-0" style={{ color: '#171A17' }}>Inspections</h1>

      <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: '#E6DFCF' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider" style={{ color: '#5A635C', background: '#F2EDE2' }}>
                <th className="px-6 py-3 text-left font-medium">PO</th>
                <th className="px-6 py-3 text-left font-medium">Type</th>
                <th className="px-6 py-3 text-left font-medium hidden sm:table-cell">Inspector</th>
                <th className="px-6 py-3 text-left font-medium hidden sm:table-cell">Date</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Result</th>
              </tr>
            </thead>
            <tbody>
              {(inspections || []).map((insp: any) => (
                <tr key={insp.id} className="border-t" style={{ borderColor: '#ECE4D1' }}>
                  <td className="px-6 py-4 font-mono text-xs" style={{ color: '#0F4238' }}>{insp.po?.po_number}</td>
                  <td className="px-6 py-4" style={{ color: '#171A17' }}>{insp.inspection_type?.replace(/_/g, ' ')}</td>
                  <td className="px-6 py-4 hidden sm:table-cell" style={{ color: '#5A635C' }}>{insp.inspector?.display_name || '—'}</td>
                  <td className="px-6 py-4 hidden sm:table-cell text-xs" style={{ color: '#5A635C' }}>
                    {insp.scheduled_date ? new Date(insp.scheduled_date).toLocaleDateString('en-GB') : '—'}
                  </td>
                  <td className="px-6 py-4 text-xs" style={{ color: '#5A635C' }}>{insp.status?.replace(/_/g, ' ')}</td>
                  <td className="px-6 py-4">
                    {insp.result === 'pass' && <span className="text-emerald-600 font-medium text-xs">Pass</span>}
                    {insp.result === 'fail' && <span className="text-red-600 font-medium text-xs">Fail</span>}
                    {(!insp.result || insp.result === 'pending') && <span className="text-xs" style={{ color: '#5A635C' }}>Pending</span>}
                  </td>
                </tr>
              ))}
              {(!inspections || inspections.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm" style={{ color: '#5A635C' }}>No inspections yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
