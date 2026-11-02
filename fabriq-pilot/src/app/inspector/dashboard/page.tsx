import Link from 'next/link';
import { getCurrentUser, createServerSupabase } from '@/lib/supabase';
import type { InspectionStatus } from '@/types/database';

const STATUS_CHIP: Record<InspectionStatus, string> = {
  scheduled: 'chip-warning', started: 'chip-primary', in_progress: 'chip-primary',
  paused: 'chip-neutral', completed_pass: 'chip-success', completed_fail: 'chip-danger', cancelled: 'chip-neutral',
};
const STATUS_LABELS: Record<InspectionStatus, string> = {
  scheduled: 'Scheduled', started: 'Started', in_progress: 'In progress',
  paused: 'Paused', completed_pass: 'Pass', completed_fail: 'Fail', cancelled: 'Cancelled',
};

export default async function InspectorToday() {
  const session = await getCurrentUser();
  const firstName = session?.profile?.display_name?.split(' ')[0] || 'Inspector';

  const supabase = await createServerSupabase();

  const { data: inspections } = await supabase
    .from('inspections')
    .select('*, po:purchase_orders(po_number, style_name, quantity, factory:tenants!purchase_orders_factory_id_fkey(name))')
    .order('scheduled_date', { ascending: true });

  const all = (inspections || []) as any[];
  const today = all.filter((i) => ['scheduled', 'started', 'in_progress'].includes(i.status));
  const completed = all.filter((i) => ['completed_pass', 'completed_fail'].includes(i.status)).length;

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      <div className="pl-10 md:pl-0 mb-6">
        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Today</div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Hi, {firstName} 👋</h1>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="card p-4 text-center">
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Total assigned</div>
          <div className="text-2xl font-bold">{all.length}</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Active today</div>
          <div className="text-2xl font-bold" style={{ color: today.length > 0 ? 'var(--primary)' : 'var(--text)' }}>{today.length}</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Completed</div>
          <div className="text-2xl font-bold" style={{ color: 'var(--success)' }}>{completed}</div>
        </div>
      </div>

      <h2 className="font-semibold mb-3" style={{ color: 'var(--text)' }}>Today&apos;s Schedule</h2>

      {today.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-sm" style={{ color: 'var(--text-subtle)' }}>No active assignments. Check <Link href="/inspector/inspections" className="underline" style={{ color: 'var(--primary)' }}>My Inspections</Link> for your full list.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {today.map((i) => (
            <Link key={i.id} href={`/inspector/inspections/${i.id}`} className="card p-4 block hover:shadow-md transition-shadow" style={{ borderLeft: '3px solid var(--primary)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`chip ${STATUS_CHIP[i.status as InspectionStatus]}`}>{STATUS_LABELS[i.status as InspectionStatus]}</span>
                {i.status === 'scheduled' && <span className="chip chip-info text-[9px]">UPCOMING</span>}
              </div>
              <div className="font-bold text-sm">{(i.inspection_type || '').replace(/_/g, ' ').toUpperCase()} Inspection</div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                {i.po?.po_number} · {i.po?.quantity?.toLocaleString()} pcs
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                📍 {i.po?.factory?.name || 'Factory'}
              </div>
              <div className="btn btn-primary btn-sm mt-3 w-full justify-center">
                {i.status === 'scheduled' ? 'Start Inspection →' : 'Continue →'}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
