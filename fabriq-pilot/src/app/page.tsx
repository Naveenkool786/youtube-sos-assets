import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase';

export default async function Home() {
  const session = await getCurrentUser();

  if (!session?.profile) {
    redirect('/login');
  }

  switch (session.profile.tenant_type) {
    case 'brand':
      redirect('/brand/dashboard');
    case 'factory':
      redirect('/factory/dashboard');
    case 'inspection_firm':
      redirect('/inspector/dashboard');
    default:
      redirect('/login');
  }
}
