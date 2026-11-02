import Link from 'next/link';
import { createServerSupabase } from '@/lib/supabase';
import type { InspectionStatus, Severity } from '@/types/database';

const STATUS_CHIP: Record<InspectionStatus, string> = {
  scheduled: 'chip-warning', started: 'chip-primary', in_progress: 'chip-primary',
  paused: 'chip-neutral', completed_pass: 'chip-success', completed_fail: 'chip-danger', cancelled: 'chip-neutral',
};
const STATUS_LABELS: Record<InspectionStatus, string> = {
  scheduled: 'Scheduled', started: 'Started', in_progress: 'In progress',
  paused: 'Paused', completed_pass: 'Pass', completed_fail: 'Fail', cancelled: 'Cancelled',
};
const SEV_CHIP: Record<Severity, string> = { minor: 'chip-info', major: 'chip-warning', critical: 'chip-danger' };

export default async function InspectionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerSupabase();

  const { data: insp } = await supabase
    .from('inspections')
    .select('*, po:purchase_orders(po_number, style_name, quantity, aql_level, factory:tenants!purchase_orders_factory_id_fkey(name))')
    .eq('id', id)
    .single() as { data: any };

  if (!insp) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Inspection not found</h1>
          <Link href="/inspector/inspections" className="text-sm underline" style={{ color: 'var(--primary)' }}>Back</Link>
        </div>
      </div>
    );
  }

  const { data: defects } = await supabase
    .from('defects')
    .select('*, category:defect_categories(*)')
    .eq('inspection_id', id)
    .order('logged_at', { ascending: false });

  const allDefects = (defects || []) as any[];
  const critical = allDefects.filter((d) => d.severity === 'critical').reduce((s, d) => s + (d.quantity || 0), 0);
  const major = allDefects.filter((d) => d.severity === 'major').reduce((s, d) => s + (d.quantity || 0), 0);
  const minor = allDefects.filter((d) => d.severity === 'minor').reduce((s, d) => s + (d.quantity || 0), 0);

  const sampleSize = insp.sample_size || Math.min(200, insp.po?.quantity || 200);
  const majorLimit = insp.major_defects_allowed ?? Math.floor(sampleSize * 2.5 / 100);
  const minorLimit = insp.minor_defects_allowed ?? Math.floor(sampleSize * 4.0 / 100);
  const willPass = critical === 0 && major <= majorLimit && minor <= minorLimit;

  const isSubmitted = ['completed_pass', 'completed_fail'].includes(insp.status);

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      <Link href="/inspector/inspections" className="text-sm mb-4 inline-block" style={{ color: 'var(--text-muted)' }}>← Back</Link>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div>
          <div className="font-mono text-xs font-bold" style={{ color: 'var(--text-muted)' }}>{id.slice(0, 12)}</div>
          <h1 className="text-2xl font-bold">{(insp.inspection_type || '').replace(/_/g, ' ').toUpperCase()} Inspection</h1>
          <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{insp.po?.po_number} · AQL {insp.po?.aql_level || 'Level II'}</div>
        </div>
        <span className={`chip ${STATUS_CHIP[insp.status as InspectionStatus]}`}>{STATUS_LABELS[insp.status as InspectionStatus]}</span>
      </div>

      {/* AQL KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="card p-4 text-center">
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Sample Size</div>
          <div className="text-2xl font-bold">{sampleSize}</div>
        </div>
        <div className="card p-4 text-center" style={{ background: critical > 0 ? 'var(--danger-soft)' : undefined }}>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Critical (max 0)</div>
          <div className="text-2xl font-bold" style={{ color: critical > 0 ? 'var(--danger)' : 'var(--success)' }}>{critical}</div>
        </div>
        <div className="card p-4 text-center" style={{ background: major > majorLimit ? 'var(--danger-soft)' : undefined }}>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Major (max {majorLimit})</div>
          <div className="text-2xl font-bold" style={{ color: major > majorLimit ? 'var(--danger)' : 'var(--success)' }}>{major}</div>
        </div>
        <div className="card p-4 text-center" style={{ background: minor > minorLimit ? 'var(--danger-soft)' : undefined }}>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Minor (max {minorLimit})</div>
          <div className="text-2xl font-bold" style={{ color: minor > minorLimit ? 'var(--danger)' : 'var(--success)' }}>{minor}</div>
        </div>
      </div>

      {/* Verdict */}
      {isSubmitted && (
        <div className="card p-4 mb-4 flex items-center gap-2" style={{ background: willPass ? 'var(--success-soft)' : 'var(--danger-soft)' }}>
          <span className="text-lg">{willPass ? '✓' : '✗'}</span>
          <span className="font-semibold" style={{ color: willPass ? 'var(--success)' : 'var(--danger)' }}>
            Verdict: {willPass ? 'PASS — within AQL limits' : 'FAIL — exceeds AQL'}
          </span>
        </div>
      )}

      {/* Defects */}
      <div className="card overflow-hidden">
        <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <h3 className="font-semibold text-sm">Defects Logged ({allDefects.length})</h3>
        </div>
        <div className="px-5 py-4">
          {allDefects.length > 0 ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  <th className="text-left pb-2">Defect</th>
                  <th className="text-left pb-2">Location</th>
                  <th className="text-left pb-2">Severity</th>
                  <th className="text-right pb-2">Count</th>
                </tr>
              </thead>
              <tbody>
                {allDefects.map((d: any) => (
                  <tr key={d.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                    <td className="py-2">{d.category?.name || '—'}</td>
                    <td className="py-2 text-xs" style={{ color: 'var(--text-muted)' }}>{d.location || '—'}</td>
                    <td className="py-2"><span className={`chip ${SEV_CHIP[d.severity as Severity]}`}>{d.severity}</span></td>
                    <td className="py-2 text-right font-mono font-bold">{d.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm py-4 text-center" style={{ color: 'var(--text-subtle)' }}>No defects logged.</p>
          )}
        </div>
      </div>
    </div>
  );
}
