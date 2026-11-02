import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase';
import PortalSidebar from '@/components/PortalSidebar';

const NAV_ITEMS = [
  { href: '/brand/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { href: '/brand/pos', label: 'Purchase Orders', icon: 'package' },
  { href: '/brand/inspections', label: 'Inspections', icon: 'clipboard' },
  { href: '/brand/ncrs', label: 'NCRs', icon: 'alert' },
  { href: '/brand/coq', label: 'Quality Costs', icon: 'dollar' },
  { href: '/brand/settings', label: 'Settings', icon: 'settings' },
];

export default async function BrandLayout({ children }: { children: React.ReactNode }) {
  const session = await getCurrentUser();
  if (!session?.profile) redirect('/login');
  if (session.profile.tenant_type !== 'brand') redirect('/');

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>
      <PortalSidebar
        portalLabel="Brand"
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
