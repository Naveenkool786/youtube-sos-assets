import Link from 'next/link';
import { createServerSupabase } from '@/lib/supabase';
import type { POStatus } from '@/types/database';

const KANBAN_COLS: POStatus[] = ['pending_factory', 'accepted', 'in_production', 'awaiting_inspection', 'inspected', 'shipped'];
const COL_LABELS: Record<string, string> = {
  pending_factory: 'Pending', accepted: 'Accepted', in_production: 'In Production',
  awaiting_inspection: 'Awaiting Inspection', inspected: 'Inspected', shipped: 'Shipped',
};

export default async function KanbanPage() {
  const supabase = await createServerSupabase();

  const { data: pos } = await supabase
    .from('purchase_orders')
    .select('id, po_number, style_name, style_number, quantity, status')
    .order('ex_factory_date', { ascending: true });

  const allPOs = (pos || []) as any[];

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
      <h1 className="text-2xl font-bold mb-4 pl-10 md:pl-0" style={{ color: 'var(--text)' }}>PO Board</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {KANBAN_COLS.map((col) => {
          const items = allPOs.filter((p) => p.status === col);
          return (
            <div key={col} className="rounded-xl p-3" style={{ background: 'var(--surface-elev)', border: '1px solid var(--border)', minHeight: 400 }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase" style={{ color: 'var(--text-muted)' }}>{COL_LABELS[col]}</span>
                <span className="chip chip-neutral text-[10px]">{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.map((po) => (
                  <Link key={po.id} href={`/factory/pos/${po.id}`} className="card p-3 block hover:shadow-md transition-shadow cursor-pointer">
                    <div className="font-mono text-[10px] font-bold" style={{ color: 'var(--text-muted)' }}>{po.po_number}</div>
                    <div className="font-medium text-sm mb-1">{po.style_name || po.style_number}</div>
                    <div className="text-xs" style={{ color: 'var(--text-subtle)' }}>{po.quantity?.toLocaleString()} pcs</div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
