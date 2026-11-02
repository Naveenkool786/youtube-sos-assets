import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase';
import PortalSidebar from '@/components/PortalSidebar';

const NAV_ITEMS = [
  { href: '/inspector/dashboard', label: 'Today', icon: 'calendar' },
  { href: '/inspector/inspections', label: 'My Inspections', icon: 'list' },
  { href: '/inspector/settings', label: 'Settings', icon: 'settings' },
];

export default async function InspectorLayout({ children }: { children: React.ReactNode }) {
  const session = await getCurrentUser();
  if (!session?.profile) redirect('/login');
  if (session.profile.tenant_type !== 'inspection_firm') redirect('/');

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>
      <PortalSidebar
        portalLabel="Inspector"
        navItems={NAV_ITEMS}
        displayName={session.profile.display_name}
        email={session.profile.email}
      />
      <main className="flex-1 min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
