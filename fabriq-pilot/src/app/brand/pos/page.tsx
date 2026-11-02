import Link from 'next/link';
import { createServerSupabase } from '@/lib/supabase';
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
  draft: 'Draft',
  pending_factory: 'Pending factory',
  accepted: 'Accepted',
  in_production: 'In production',
  awaiting_inspection: 'Awaiting inspection',
  inspected: 'Inspected',
  released: 'Released',
  shipped: 'Shipped',
  ncr_open: 'NCR open',
  closed: 'Closed',
  cancelled: 'Cancelled',
};

export default async function PurchaseOrdersPage() {
  const supabase = await createServerSupabase();

  const { data: pos } = await supabase
    .from('purchase_orders')
    .select('*, factory:tenants!purchase_orders_factory_id_fkey(name,short_code), inspection_firm:tenants!purchase_orders_inspection_firm_id_fkey(name)')
    .order('po_date', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
      <div className="flex items-center justify-between mb-8 pl-10 md:pl-0">
        <h1 className="font-serif text-4xl" style={{ color: '#171A17' }}>Purchase Orders</h1>
        <Link href="/brand/pos/new" className="text-sm font-medium px-4 py-2 rounded-full" style={{ background: '#0F4238', color: '#FFF' }}>
          New PO
        </Link>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: '#E6DFCF' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider" style={{ color: '#5A635C', background: '#F2EDE2' }}>
                <th className="px-6 py-3 text-left font-medium">PO #</th>
                <th className="px-6 py-3 text-left font-medium">Style</th>
                <th className="px-6 py-3 text-left font-medium hidden sm:table-cell">Factory</th>
                <th className="px-6 py-3 text-right font-medium hidden sm:table-cell">Qty</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-right font-medium hidden md:table-cell">Ex-factory</th>
              </tr>
            </thead>
            <tbody>
              {(pos || []).map((po: any) => (
                <tr key={po.id} className="border-t hover:bg-amber-50/40 cursor-pointer" style={{ borderColor: '#ECE4D1' }}>
                  <td className="px-6 py-4 font-mono text-xs">
                    <Link href={`/brand/pos/${po.id}`} className="hover:underline" style={{ color: '#0F4238' }}>
                      {po.po_number}
                    </Link>
                  </td>
                  <td className="px-6 py-4" style={{ color: '#171A17' }}>{po.style_name || po.style_number}</td>
                  <td className="px-6 py-4 hidden sm:table-cell" style={{ color: '#5A635C' }}>{po.factory?.name}</td>
                  <td className="px-6 py-4 text-right font-mono text-xs hidden sm:table-cell" style={{ color: '#171A17' }}>{po.quantity.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[po.status as POStatus]}`}>
                      {STATUS_LABELS[po.status as POStatus]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-xs hidden md:table-cell" style={{ color: '#5A635C' }}>
                    {po.ex_factory_date ? new Date(po.ex_factory_date).toLocaleDateString('en-GB') : '—'}
                  </td>
                </tr>
              ))}
              {(!pos || pos.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm" style={{ color: '#5A635C' }}>
                    No purchase orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
