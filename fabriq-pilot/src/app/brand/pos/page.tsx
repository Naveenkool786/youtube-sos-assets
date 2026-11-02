import Link from 'next/link';
import { createServerSupabase } from '@/lib/supabase';
import type { POStatus } from '@/types/database';

const STATUS_CHIP: Record<POStatus, string> = {
  draft: 'chip-neutral', pending_factory: 'chip-warning', accepted: 'chip-primary',
  in_production: 'chip-primary', awaiting_inspection: 'chip-warning', inspected: 'chip-success',
  released: 'chip-success', shipped: 'chip-success', ncr_open: 'chip-danger',
  closed: 'chip-neutral', cancelled: 'chip-neutral',
};
const STATUS_LABELS: Record<POStatus, string> = {
  draft: 'Draft', pending_factory: 'Pending', accepted: 'Accepted',
  in_production: 'In production', awaiting_inspection: 'Awaiting inspection',
  inspected: 'Inspected', released: 'Released', shipped: 'Shipped',
  ncr_open: 'NCR open', closed: 'Closed', cancelled: 'Cancelled',
};

export default async function PurchaseOrdersPage() {
  const supabase = await createServerSupabase();

  const { data: pos } = await supabase
    .from('purchase_orders')
    .select('*, factory:tenants!purchase_orders_factory_id_fkey(name,short_code), inspection_firm:tenants!purchase_orders_inspection_firm_id_fkey(name)')
    .order('po_date', { ascending: false });

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      <div className="flex items-center justify-between mb-6 pl-10 md:pl-0">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Purchase Orders</h1>
        <Link href="/brand/pos/new" className="btn btn-primary btn-sm">+ New PO</Link>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs" style={{ background: 'var(--bg)', color: 'var(--text-muted)' }}>
                <th className="text-left px-4 py-2 font-medium">PO #</th>
                <th className="text-left px-4 py-2 font-medium">Style</th>
                <th className="text-left px-4 py-2 font-medium hidden sm:table-cell">Factory</th>
                <th className="text-right px-4 py-2 font-medium hidden sm:table-cell">Qty</th>
                <th className="text-left px-4 py-2 font-medium">Status</th>
                <th className="text-right px-4 py-2 font-medium hidden md:table-cell">Ex-factory</th>
              </tr>
            </thead>
            <tbody>
              {(pos || []).map((po: any) => (
                <tr key={po.id} className="border-t cursor-pointer hover:bg-slate-50" style={{ borderColor: 'var(--border)' }}>
                  <td className="px-4 py-3 font-mono text-xs">
                    <Link href={`/brand/pos/${po.id}`} className="hover:underline" style={{ color: 'var(--primary)' }}>{po.po_number}</Link>
                  </td>
                  <td className="px-4 py-3">{po.style_name || po.style_number}</td>
                  <td className="px-4 py-3 hidden sm:table-cell" style={{ color: 'var(--text-muted)' }}>{po.factory?.name}</td>
                  <td className="px-4 py-3 text-right font-mono text-xs hidden sm:table-cell">{po.quantity?.toLocaleString()}</td>
                  <td className="px-4 py-3"><span className={`chip ${STATUS_CHIP[po.status as POStatus]}`}>{STATUS_LABELS[po.status as POStatus]}</span></td>
                  <td className="px-4 py-3 text-right text-xs hidden md:table-cell" style={{ color: 'var(--text-muted)' }}>
                    {po.ex_factory_date ? new Date(po.ex_factory_date).toLocaleDateString('en-GB') : '—'}
                  </td>
                </tr>
              ))}
              {(!pos || pos.length === 0) && (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-sm" style={{ color: 'var(--text-subtle)' }}>No purchase orders yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
