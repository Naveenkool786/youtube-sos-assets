import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase';
import BrandSidebar from '@/components/BrandSidebar';

export default async function BrandLayout({ children }: { children: React.ReactNode }) {
  const session = await getCurrentUser();
  if (!session?.profile) redirect('/login');
  if (session.profile.tenant_type !== 'brand') redirect('/');

  return (
    <div className="flex min-h-screen" style={{ background: '#FAF7F1' }}>
      <BrandSidebar
        displayName={session.profile.display_name}
        email={session.profile.email}
      />
      <main className="flex-1 min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
