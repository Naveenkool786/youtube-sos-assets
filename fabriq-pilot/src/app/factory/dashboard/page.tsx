import Link from 'next/link';
import { createServerSupabase } from '@/lib/supabase';

export default async function FactoryDashboard() {
  const supabase = await createServerSupabase();

  const { data: pos } = await supabase
    .from('purchase_orders')
    .select('id, status')
    .not('status', 'in', '(closed,cancelled)');

  const { count: inspCount } = await supabase
    .from('inspections').select('id', { count: 'exact', head: true });

  const { count: openNcrCount } = await supabase
    .from('ncrs').select('id', { count: 'exact', head: true })
    .not('status', 'in', '(closed,rejected)');

  const activePOs = pos?.length ?? 0;

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      <div className="pl-10 md:pl-0 mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>Dashboard</h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Track your orders, inspections, and quality metrics.</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="card p-4 text-center">
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>POs active</div>
          <div className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{activePOs}</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Inspections</div>
          <div className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{inspCount ?? 0}</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Open NCRs</div>
          <div className="text-2xl font-bold" style={{ color: openNcrCount && openNcrCount > 0 ? 'var(--danger)' : 'var(--text)' }}>{openNcrCount ?? 0}</div>
        </div>
      </div>

      <Link href="/factory/kanban" className="btn btn-primary">
        Open PO Board →
      </Link>
    </div>
  );
}
