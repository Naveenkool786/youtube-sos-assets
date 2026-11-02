import { getCurrentUser } from '@/lib/supabase';

export default async function SettingsPage() {
  const session = await getCurrentUser();

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-10">
      <h1 className="font-serif text-4xl mb-8 pl-10 md:pl-0" style={{ color: '#171A17' }}>Settings</h1>

      <div className="bg-white rounded-2xl border p-6 mb-6" style={{ borderColor: '#E6DFCF' }}>
        <h2 className="font-serif text-xl mb-4" style={{ color: '#171A17' }}>Profile</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b" style={{ borderColor: '#F2EDE2' }}>
            <span style={{ color: '#5A635C' }}>Name</span>
            <span style={{ color: '#171A17' }}>{session?.profile?.display_name || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b" style={{ borderColor: '#F2EDE2' }}>
            <span style={{ color: '#5A635C' }}>Email</span>
            <span style={{ color: '#171A17' }}>{session?.profile?.email || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b" style={{ borderColor: '#F2EDE2' }}>
            <span style={{ color: '#5A635C' }}>Role</span>
            <span style={{ color: '#171A17' }}>{session?.profile?.role?.replace(/_/g, ' ') || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b" style={{ borderColor: '#F2EDE2' }}>
            <span style={{ color: '#5A635C' }}>Organization</span>
            <span style={{ color: '#171A17' }}>{session?.profile?.tenant?.name || '—'}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border p-6" style={{ borderColor: '#E6DFCF' }}>
        <h2 className="font-serif text-xl mb-4" style={{ color: '#171A17' }}>Organization</h2>
        <p className="text-sm" style={{ color: '#5A635C' }}>
          Organization settings and team management coming soon.
        </p>
      </div>
    </div>
  );
}
