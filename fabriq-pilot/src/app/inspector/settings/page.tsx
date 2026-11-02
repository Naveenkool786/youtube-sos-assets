import { getCurrentUser } from '@/lib/supabase';
import ThemeToggle from '@/components/ThemeToggle';

export default async function InspectorSettingsPage() {
  const session = await getCurrentUser();
  const p = session?.profile;
  const t = p?.tenant;

  return (
    <div className="max-w-[800px] mx-auto px-4 md:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6 pl-10 md:pl-0" style={{ color: 'var(--text)' }}>Settings</h1>

      <div className="card p-5 mb-4">
        <h2 className="font-semibold mb-4">Appearance</h2>
        <div className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>Choose your preferred color theme</div>
        <ThemeToggle />
      </div>

      <div className="card p-5 mb-4">
        <h2 className="font-semibold mb-4">Profile</h2>
        <div className="space-y-3 text-sm">
          <Row label="Display name" value={p?.display_name || '—'} />
          <Row label="Email" value={p?.email || '—'} />
          <Row label="Role" value={p?.role?.replace(/_/g, ' ') || '—'} />
        </div>
      </div>

      <div className="card p-5">
        <h2 className="font-semibold mb-4">Organization</h2>
        <div className="space-y-3 text-sm">
          <Row label="Name" value={t?.name || '—'} />
          <Row label="Type" value={t?.tenant_type?.replace(/_/g, ' ') || '—'} />
          <Row label="Short code" value={t?.short_code || '—'} />
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2" style={{ borderBottom: '1px solid var(--border)' }}>
      <span style={{ color: 'var(--text-muted)' }}>{label}</span>
      <span>{value}</span>
    </div>
  );
}
