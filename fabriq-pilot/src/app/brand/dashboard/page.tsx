import Link from 'next/link';
import { createServerSupabase } from '@/lib/supabase';
import AIAssistant from '@/components/AIAssistant';
import type { POStatus, CoQBucket } from '@/types/database';

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

const BUCKET_COLORS: Record<CoQBucket, string> = {
  prevention: 'var(--success)', appraisal: 'var(--info)',
  internal_failure: 'var(--warning)', external_failure: 'var(--danger)',
};
const BUCKET_LABELS: Record<CoQBucket, string> = {
  prevention: 'Prevention', appraisal: 'Appraisal',
  internal_failure: 'Internal Failure', external_failure: 'External Failure',
};

export default async function BrandDashboard() {
  const supabase = await createServerSupabase();

  const { data: pos } = await supabase
    .from('purchase_orders')
    .select('*, factory:tenants!purchase_orders_factory_id_fkey(name,short_code)')
    .order('po_date', { ascending: false })
    .limit(20);

  const { data: coqRows } = await supabase.from('v_coq_by_po').select('*').limit(100);
  const totalCoq = (coqRows || []).reduce((sum, r: any) => sum + Number(r.total_coq || 0), 0);
  const totalInternal = (coqRows || []).reduce((sum, r: any) => sum + Number(r.internal_failure || 0), 0);
  const totalExternal = (coqRows || []).reduce((sum, r: any) => sum + Number(r.external_failure || 0), 0);

  const { count: openNcrCount } = await supabase
    .from('ncrs').select('id', { count: 'exact', head: true })
    .not('status', 'in', '(closed,rejected)');

  const { data: coqEntries } = await supabase.from('coq_entries').select('bucket, amount').limit(500);
  const coqByBucket: Record<string, { total: number; count: number }> = {};
  for (const e of (coqEntries || []) as any[]) {
    const b = e.bucket;
    if (!coqByBucket[b]) coqByBucket[b] = { total: 0, count: 0 };
    coqByBucket[b].total += Number(e.amount || 0);
    coqByBucket[b].count += 1;
  }

  return (
    <>
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
        <div className="mb-8 pl-10 md:pl-0">
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>Dashboard</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Here&apos;s what&apos;s happening across your supply chain.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <KpiCard label="Active POs" value={pos?.length ?? 0} />
          <KpiCard label="Open NCRs" value={openNcrCount ?? 0} tone={openNcrCount && openNcrCount > 0 ? 'warn' : 'ok'} />
          <KpiCard label="CoQ this period" value={`$${(totalCoq / 1000).toFixed(1)}k`} tone={totalCoq > 10000 ? 'warn' : 'ok'} />
          <KpiCard label="Failure costs" value={`$${((totalInternal + totalExternal) / 1000).toFixed(1)}k`} tone={totalInternal + totalExternal > 5000 ? 'bad' : 'ok'} />
        </div>

        {/* CoQ Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {(['prevention', 'appraisal', 'internal_failure', 'external_failure'] as CoQBucket[]).map((bucket) => {
            const d = coqByBucket[bucket] || { total: 0, count: 0 };
            const pct = totalCoq > 0 ? (d.total / totalCoq * 100).toFixed(1) : '0';
            return (
              <div key={bucket} className="card p-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full" style={{ background: BUCKET_COLORS[bucket] }} />
                  <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>{BUCKET_LABELS[bucket]}</span>
                </div>
                <div className="text-xl font-bold" style={{ color: 'var(--text)' }}>${(d.total / 1000).toFixed(1)}k</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{pct}% · {d.count} entries</div>
              </div>
            );
          })}
        </div>

        {/* Recent POs */}
        <div className="card overflow-hidden">
          <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
            <h2 className="font-semibold" style={{ color: 'var(--text)' }}>Recent Purchase Orders</h2>
            <Link href="/brand/pos/new" className="btn btn-primary btn-sm">+ New PO</Link>
          </div>
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
                  <tr><td colSpan={6} className="px-4 py-12 text-center text-sm" style={{ color: 'var(--text-subtle)' }}>
                    No purchase orders yet. <Link href="/brand/pos/new" className="underline" style={{ color: 'var(--primary)' }}>Create your first one</Link>
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AIAssistant />
    </>
  );
}

function KpiCard({ label, value, tone }: { label: string; value: number | string; tone?: 'ok' | 'warn' | 'bad' }) {
  const borderColor = tone === 'warn' ? 'var(--warning)' : tone === 'bad' ? 'var(--danger)' : 'var(--primary)';
  const valueColor = tone === 'warn' ? 'var(--warning)' : tone === 'bad' ? 'var(--danger)' : 'var(--text)';
  return (
    <div className="card p-4" style={{ borderLeft: `3px solid ${borderColor}` }}>
      <div className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>{label}</div>
      <div className="text-2xl font-bold" style={{ color: valueColor }}>{value}</div>
    </div>
  );
}
