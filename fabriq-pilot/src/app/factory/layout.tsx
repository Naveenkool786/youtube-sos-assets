import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase';
import PortalSidebar from '@/components/PortalSidebar';

const NAV_ITEMS = [
  { href: '/factory/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { href: '/factory/kanban', label: 'PO Board', icon: 'kanban' },
  { href: '/factory/pos', label: 'Purchase Orders', icon: 'package' },
  { href: '/factory/inspections', label: 'Inspections', icon: 'clipboard' },
  { href: '/factory/ncrs', label: 'NCRs', icon: 'alert' },
  { href: '/factory/settings', label: 'Settings', icon: 'settings' },
];

export default async function FactoryLayout({ children }: { children: React.ReactNode }) {
  const session = await getCurrentUser();
  if (!session?.profile) redirect('/login');
  if (session.profile.tenant_type !== 'factory') redirect('/');

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>
      <PortalSidebar
        portalLabel="Factory"
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
