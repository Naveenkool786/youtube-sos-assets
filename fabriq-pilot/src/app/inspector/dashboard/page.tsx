import { redirect } from 'next/navigation';
import { getCurrentUser, createServerSupabase } from '@/lib/supabase';
import AIAssistant from '@/components/AIAssistant';
import type { InspectionStatus } from '@/types/database';

const STATUS_COLORS: Record<InspectionStatus, string> = {
  scheduled: 'bg-amber-100 text-amber-700',
  started: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-blue-100 text-blue-700',
  paused: 'bg-gray-200 text-gray-700',
  completed_pass: 'bg-emerald-100 text-emerald-700',
  completed_fail: 'bg-rose-100 text-rose-700',
  cancelled: 'bg-gray-200 text-gray-700',
};

const STATUS_LABELS: Record<InspectionStatus, string> = {
  scheduled: 'Scheduled', started: 'Started', in_progress: 'In progress',
  paused: 'Paused', completed_pass: 'Pass', completed_fail: 'Fail', cancelled: 'Cancelled',
};

export default async function InspectorDashboard() {
  const session = await getCurrentUser();
  if (!session?.profile) redirect('/login');
  if (session.profile.tenant_type !== 'inspection_firm') redirect('/');

  const supabase = await createServerSupabase();

  const { data: inspections } = await supabase
    .from('inspections')
    .select('*, po:purchase_orders(po_number, style_name, brand:tenants!purchase_orders_brand_id_fkey(name), factory:tenants!purchase_orders_factory_id_fkey(name))')
    .order('scheduled_date', { ascending: true })
    .limit(20);

  const rows = (inspections || []) as any[];
  const scheduled = rows.filter(i => i.status === 'scheduled').length;
  const completed = rows.filter(i => i.status === 'completed_pass' || i.status === 'completed_fail').length;
  const failed = rows.filter(i => i.status === 'completed_fail').length;

  return (
    <main className="min-h-screen" style={{ background: '#FAF7F1' }}>
      <nav className="border-b sticky top-0 z-10 backdrop-blur" style={{ background: 'rgba(250,247,241,0.85)', borderColor: '#E6DFCF' }}>
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 30 30" className="w-6 h-6" style={{ color: '#0F4238' }}>
              <rect x="3" y="3" width="24" height="24" rx="6" fill="currentColor" opacity="0.08" />
              <path d="M7 10 L15 6 L23 10 L15 14 Z" fill="currentColor" opacity="0.9" />
            </svg>
            <span className="font-serif text-xl" style={{ color: '#171A17' }}>FABRIQ</span>
            <span className="ml-3 text-xs uppercase tracking-widest" style={{ color: '#5A635C' }}>Inspector</span>
          </div>
          <span className="text-sm" style={{ color: '#5A635C' }}>{session.profile.display_name || session.profile.email}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-5 py-10">
        <h1 className="font-serif text-4xl mb-2" style={{ color: '#171A17' }}>
          Inspector Dashboard
        </h1>
        <p className="mb-8" style={{ color: '#5A635C' }}>Your scheduled and completed inspections.</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <KpiCard label="Total Inspections" value={inspections?.length ?? 0} />
          <KpiCard label="Scheduled" value={scheduled} />
          <KpiCard label="Completed" value={completed} />
          <KpiCard label="Failed" value={failed} tone={failed > 0 ? 'warn' : 'ok'} />
        </div>

        <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: '#E6DFCF' }}>
          <div className="px-6 py-4 border-b" style={{ borderColor: '#E6DFCF' }}>
            <h2 className="font-serif text-xl" style={{ color: '#171A17' }}>Inspections</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wider" style={{ color: '#5A635C', background: '#F2EDE2' }}>
                  <th className="px-6 py-3 text-left font-medium">PO #</th>
                  <th className="px-6 py-3 text-left font-medium">Style</th>
                  <th className="px-6 py-3 text-left font-medium">Brand</th>
                  <th className="px-6 py-3 text-left font-medium">Factory</th>
                  <th className="px-6 py-3 text-left font-medium">Type</th>
                  <th className="px-6 py-3 text-left font-medium">Date</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {(inspections || []).map((insp: any) => (
                  <tr key={insp.id} className="border-t hover:bg-amber-50/40" style={{ borderColor: '#ECE4D1' }}>
                    <td className="px-6 py-4 font-mono text-xs">{insp.po?.po_number}</td>
                    <td className="px-6 py-4">{insp.po?.style_name}</td>
                    <td className="px-6 py-4" style={{ color: '#5A635C' }}>{insp.po?.brand?.name}</td>
                    <td className="px-6 py-4" style={{ color: '#5A635C' }}>{insp.po?.factory?.name}</td>
                    <td className="px-6 py-4 text-xs">{insp.inspection_type.replace(/_/g, ' ')}</td>
                    <td className="px-6 py-4 text-xs" style={{ color: '#5A635C' }}>
                      {insp.scheduled_date ? new Date(insp.scheduled_date).toLocaleDateString('en-GB') : '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[insp.status as InspectionStatus]}`}>
                        {STATUS_LABELS[insp.status as InspectionStatus]}
                      </span>
                    </td>
                  </tr>
                ))}
                {(!inspections || inspections.length === 0) && (
                  <tr><td colSpan={7} className="px-6 py-12 text-center text-sm" style={{ color: '#5A635C' }}>No inspections assigned yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AIAssistant />
    </main>
  );
}

function KpiCard({ label, value, tone }: { label: string; value: number | string; tone?: 'ok' | 'warn' | 'bad' }) {
  const toneColor = tone === 'warn' ? '#C67952' : tone === 'bad' ? '#D96060' : '#0F4238';
  return (
    <div className="bg-white rounded-xl border p-5" style={{ borderColor: '#E6DFCF' }}>
      <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#5A635C' }}>{label}</div>
      <div className="font-serif text-3xl" style={{ color: toneColor }}>{value}</div>
    </div>
  );
}
