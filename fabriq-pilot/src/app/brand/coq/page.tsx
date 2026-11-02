import { createServerSupabase } from '@/lib/supabase';
import type { CoQBucket } from '@/types/database';

const BUCKET_LABELS: Record<CoQBucket, string> = {
  prevention: 'Prevention', appraisal: 'Appraisal',
  internal_failure: 'Internal Failure', external_failure: 'External Failure',
};
const BUCKET_COLORS: Record<CoQBucket, string> = {
  prevention: 'var(--success)', appraisal: 'var(--info)',
  internal_failure: 'var(--warning)', external_failure: 'var(--danger)',
};

export default async function CoQPage() {
  const supabase = await createServerSupabase();

  const { data: entries } = await supabase
    .from('coq_entries')
    .select('*')
    .order('recorded_at', { ascending: false });

  const all = (entries || []) as any[];
  const total = all.reduce((s, e) => s + Number(e.amount || 0), 0);
  const byCat: Record<string, { total: number; count: number }> = {};
  for (const e of all) {
    if (!byCat[e.bucket]) byCat[e.bucket] = { total: 0, count: 0 };
    byCat[e.bucket].total += Number(e.amount || 0);
    byCat[e.bucket].count += 1;
  }

  const buckets: CoQBucket[] = ['prevention', 'appraisal', 'internal_failure', 'external_failure'];
  const circ = 2 * Math.PI * 52;
  let acc = 0;
  const arcs = buckets.map((b) => {
    const val = byCat[b]?.total || 0;
    const pct = total > 0 ? val / total : 0;
    const arc = { bucket: b, offset: acc, pct };
    acc += pct;
    return arc;
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      <div className="pl-10 md:pl-0 mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>Cost of Quality</h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Calculated from all CoQ entries across purchase orders.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Total CoQ</div>
              <div className="text-4xl font-bold" style={{ color: 'var(--text)' }}>${total.toLocaleString()}</div>
            </div>
            {total > 0 && (
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r="52" fill="none" stroke="var(--border)" strokeWidth="16"/>
                {arcs.map((a, i) => (
                  <circle key={i} cx="70" cy="70" r="52" fill="none"
                    stroke={BUCKET_COLORS[a.bucket]}
                    strokeWidth="16"
                    strokeDasharray={`${circ * a.pct} ${circ}`}
                    strokeDashoffset={-circ * a.offset}
                    transform="rotate(-90 70 70)"
                  />
                ))}
              </svg>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {buckets.map((b) => {
              const d = byCat[b] || { total: 0, count: 0 };
              const pct = total > 0 ? (d.total / total * 100).toFixed(1) : '0';
              return (
                <div key={b} className="p-3 rounded-lg" style={{ background: 'var(--bg)' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full" style={{ background: BUCKET_COLORS[b] }} />
                    <span className="text-sm font-semibold">{BUCKET_LABELS[b]}</span>
                  </div>
                  <div className="text-xl font-bold">${d.total.toLocaleString()}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{pct}% · {d.count} entries</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-sm mb-3">Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--text-muted)' }}>Total entries</span>
              <span className="font-bold">{all.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--text-muted)' }}>Failure costs</span>
              <span className="font-bold" style={{ color: 'var(--danger)' }}>
                ${((byCat['internal_failure']?.total || 0) + (byCat['external_failure']?.total || 0)).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--text-muted)' }}>Prevention ratio</span>
              <span className="font-bold" style={{ color: 'var(--success)' }}>
                {total > 0 ? ((byCat['prevention']?.total || 0) / total * 100).toFixed(1) : '0'}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <h3 className="font-semibold">All Entries ({all.length})</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs" style={{ background: 'var(--bg)', color: 'var(--text-muted)' }}>
              <th className="text-left px-4 py-2 font-medium">Date</th>
              <th className="text-left px-4 py-2 font-medium">Category</th>
              <th className="text-left px-4 py-2 font-medium hidden sm:table-cell">Description</th>
              <th className="text-right px-4 py-2 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {all.map((e: any) => (
              <tr key={e.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                <td className="px-4 py-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                  {e.recorded_at ? new Date(e.recorded_at).toLocaleDateString('en-GB') : '—'}
                </td>
                <td className="px-4 py-2">
                  <span className="chip" style={{
                    background: BUCKET_COLORS[e.bucket as CoQBucket] + '20',
                    color: BUCKET_COLORS[e.bucket as CoQBucket],
                  }}>{BUCKET_LABELS[e.bucket as CoQBucket]}</span>
                </td>
                <td className="px-4 py-2 text-xs hidden sm:table-cell">{e.description || '—'}</td>
                <td className="px-4 py-2 text-right font-mono font-bold">${Number(e.amount).toLocaleString()}</td>
              </tr>
            ))}
            {all.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-12 text-center text-sm" style={{ color: 'var(--text-subtle)' }}>No CoQ entries yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
