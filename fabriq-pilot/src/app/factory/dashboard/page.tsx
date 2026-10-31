import { redirect } from 'next/navigation';
import { getCurrentUser, createServerSupabase } from '@/lib/supabase';
import AIAssistant from '@/components/AIAssistant';
import type { POStatus } from '@/types/database';

const STATUS_COLORS: Record<POStatus, string> = {
  draft: 'bg-gray-200 text-gray-700',
  pending_factory: 'bg-amber-100 text-amber-700',
  accepted: 'bg-blue-100 text-blue-700',
  in_production: 'bg-blue-100 text-blue-700',
  awaiting_inspection: 'bg-amber-100 text-amber-700',
  inspected: 'bg-emerald-100 text-emerald-700',
  released: 'bg-emerald-100 text-emerald-700',
  shipped: 'bg-emerald-100 text-emerald-700',
  ncr_open: 'bg-rose-100 text-rose-700',
  closed: 'bg-gray-200 text-gray-700',
  cancelled: 'bg-gray-200 text-gray-700',
};

const STATUS_LABELS: Record<POStatus, string> = {
  draft: 'Draft', pending_factory: 'Pending', accepted: 'Accepted',
  in_production: 'In production', awaiting_inspection: 'Awaiting inspection',
  inspected: 'Inspected', released: 'Released', shipped: 'Shipped',
  ncr_open: 'NCR open', closed: 'Closed', cancelled: 'Cancelled',
};

export default async function FactoryDashboard() {
  const session = await getCurrentUser();
  if (!session?.profile) redirect('/login');
  if (session.profile.tenant_type !== 'factory') redirect('/');

  const supabase = await createServerSupabase();

  const { data: pos } = await supabase
    .from('purchase_orders')
    .select('*, brand:tenants!purchase_orders_brand_id_fkey(name,short_code), inspection_firm:tenants!purchase_orders_inspection_firm_id_fkey(name)')
    .order('ex_factory_date', { ascending: true })
    .limit(20);

  const { data: defects } = await supabase
    .from('defects')
    .select('severity, quantity')
    .limit(500) as { data: any[] | null };

  const totalDefects = (defects || []).reduce((s: number, d: any) => s + d.quantity, 0);
  const criticalDefects = (defects || []).filter((d: any) => d.severity === 'critical').reduce((s: number, d: any) => s + d.quantity, 0);

  const { count: openNcrCount } = await supabase
    .from('ncrs')
    .select('id', { count: 'exact', head: true })
    .not('status', 'in', '(closed,rejected)');

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
            <span className="ml-3 text-xs uppercase tracking-widest" style={{ color: '#5A635C' }}>Factory</span>
          </div>
          <span className="text-sm" style={{ color: '#5A635C' }}>{session.profile.display_name || session.profile.email}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-5 py-10">
        <h1 className="font-serif text-4xl mb-2" style={{ color: '#171A17' }}>
          Factory Dashboard
        </h1>
        <p className="mb-8" style={{ color: '#5A635C' }}>Track your orders, inspections, and quality metrics.</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <KpiCard label="Active POs" value={pos?.length ?? 0} />
          <KpiCard label="Total Defects" value={totalDefects} tone={totalDefects > 20 ? 'warn' : 'ok'} />
          <KpiCard label="Critical" value={criticalDefects} tone={criticalDefects > 0 ? 'bad' : 'ok'} />
          <KpiCard label="Open NCRs" value={openNcrCount ?? 0} tone={openNcrCount && openNcrCount > 0 ? 'warn' : 'ok'} />
        </div>

        <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: '#E6DFCF' }}>
          <div className="px-6 py-4 border-b" style={{ borderColor: '#E6DFCF' }}>
            <h2 className="font-serif text-xl" style={{ color: '#171A17' }}>Purchase Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wider" style={{ color: '#5A635C', background: '#F2EDE2' }}>
                  <th className="px-6 py-3 text-left font-medium">PO #</th>
                  <th className="px-6 py-3 text-left font-medium">Brand</th>
                  <th className="px-6 py-3 text-left font-medium">Style</th>
                  <th className="px-6 py-3 text-right font-medium">Qty</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                  <th className="px-6 py-3 text-right font-medium">Ex-factory</th>
                </tr>
              </thead>
              <tbody>
                {(pos || []).map((po: any) => (
                  <tr key={po.id} className="border-t hover:bg-amber-50/40" style={{ borderColor: '#ECE4D1' }}>
                    <td className="px-6 py-4 font-mono text-xs">{po.po_number}</td>
                    <td className="px-6 py-4" style={{ color: '#5A635C' }}>{po.brand?.name}</td>
                    <td className="px-6 py-4">{po.style_name || po.style_number}</td>
                    <td className="px-6 py-4 text-right font-mono text-xs">{po.quantity.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[po.status as POStatus]}`}>
                        {STATUS_LABELS[po.status as POStatus]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-xs" style={{ color: '#5A635C' }}>
                      {po.ex_factory_date ? new Date(po.ex_factory_date).toLocaleDateString('en-GB') : '—'}
                    </td>
                  </tr>
                ))}
                {(!pos || pos.length === 0) && (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-sm" style={{ color: '#5A635C' }}>No purchase orders assigned yet.</td></tr>
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
