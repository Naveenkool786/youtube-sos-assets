import { createServerSupabase } from '@/lib/supabase';
import type { CoQBucket } from '@/types/database';

const BUCKET_LABELS: Record<CoQBucket, string> = {
  prevention: 'Prevention',
  appraisal: 'Appraisal',
  internal_failure: 'Internal Failure',
  external_failure: 'External Failure',
};

const BUCKET_COLORS: Record<CoQBucket, string> = {
  prevention: '#0F4238',
  appraisal: '#2D6A5A',
  internal_failure: '#C67952',
  external_failure: '#D96060',
};

export default async function CoQPage() {
  const supabase = await createServerSupabase();

  const { data: entries } = await supabase
    .from('coq_entries')
    .select('*, po:purchase_orders!coq_entries_po_id_fkey(po_number)')
    .order('recorded_at', { ascending: false });

  const totals: Record<string, number> = {};
  let grandTotal = 0;
  for (const e of entries || []) {
    const entry = e as any;
    const amt = Number(entry.amount || 0);
    totals[entry.bucket] = (totals[entry.bucket] || 0) + amt;
    grandTotal += amt;
  }

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
      <h1 className="font-serif text-4xl mb-8 pl-10 md:pl-0" style={{ color: '#171A17' }}>Cost of Quality</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {(['prevention', 'appraisal', 'internal_failure', 'external_failure'] as CoQBucket[]).map((bucket) => (
          <div key={bucket} className="bg-white rounded-xl border p-5" style={{ borderColor: '#E6DFCF' }}>
            <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#5A635C' }}>
              {BUCKET_LABELS[bucket]}
            </div>
            <div className="font-serif text-3xl" style={{ color: BUCKET_COLORS[bucket] }}>
              ${((totals[bucket] || 0) / 1000).toFixed(1)}k
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border p-5 mb-8 text-right" style={{ borderColor: '#E6DFCF' }}>
        <span className="text-sm" style={{ color: '#5A635C' }}>Grand Total: </span>
        <span className="font-serif text-2xl" style={{ color: '#171A17' }}>${(grandTotal / 1000).toFixed(1)}k</span>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: '#E6DFCF' }}>
        <div className="px-6 py-4 border-b" style={{ borderColor: '#E6DFCF' }}>
          <h2 className="font-serif text-xl" style={{ color: '#171A17' }}>All Entries</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider" style={{ color: '#5A635C', background: '#F2EDE2' }}>
                <th className="px-6 py-3 text-left font-medium">PO</th>
                <th className="px-6 py-3 text-left font-medium">Bucket</th>
                <th className="px-6 py-3 text-right font-medium">Amount</th>
                <th className="px-6 py-3 text-left font-medium hidden sm:table-cell">Description</th>
                <th className="px-6 py-3 text-right font-medium hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {(entries || []).map((e: any) => (
                <tr key={e.id} className="border-t" style={{ borderColor: '#ECE4D1' }}>
                  <td className="px-6 py-4 font-mono text-xs" style={{ color: '#0F4238' }}>{e.po?.po_number || '—'}</td>
                  <td className="px-6 py-4 text-xs" style={{ color: '#171A17' }}>{BUCKET_LABELS[e.bucket as CoQBucket] || e.bucket}</td>
                  <td className="px-6 py-4 text-right font-mono text-xs" style={{ color: e.bucket?.includes('failure') ? '#D96060' : '#171A17' }}>
                    ${Number(e.amount).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell text-xs" style={{ color: '#5A635C' }}>{e.description || '—'}</td>
                  <td className="px-6 py-4 text-right text-xs hidden sm:table-cell" style={{ color: '#5A635C' }}>
                    {e.recorded_at ? new Date(e.recorded_at).toLocaleDateString('en-GB') : '—'}
                  </td>
                </tr>
              ))}
              {(!entries || entries.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm" style={{ color: '#5A635C' }}>No cost entries yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
