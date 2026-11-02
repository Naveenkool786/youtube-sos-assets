'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';
import {
  LayoutDashboard,
  Package,
  ClipboardCheck,
  AlertTriangle,
  DollarSign,
  Settings,
  Menu,
  X,
  LogOut,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/brand/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/brand/pos', label: 'Purchase Orders', icon: Package },
  { href: '/brand/inspections', label: 'Inspections', icon: ClipboardCheck },
  { href: '/brand/ncrs', label: 'NCRs', icon: AlertTriangle },
  { href: '/brand/coq', label: 'Quality Costs', icon: DollarSign },
  { href: '/brand/settings', label: 'Settings', icon: Settings },
];

export default function BrandSidebar({
  displayName,
  email,
}: {
  displayName: string | null;
  email: string | null;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/login';
  }

  const sidebar = (
    <div className="flex flex-col h-full w-64" style={{ background: '#0F4238' }}>
      <div className="px-5 pt-6 pb-4 flex items-center gap-2">
        <svg viewBox="0 0 30 30" className="w-6 h-6 text-white">
          <rect x="3" y="3" width="24" height="24" rx="6" fill="currentColor" opacity="0.15" />
          <path d="M7 10 L15 6 L23 10 L15 14 Z" fill="currentColor" opacity="0.9" />
          <path d="M7 15 L15 11 L23 15 L15 19 Z" fill="currentColor" opacity="0.6" />
          <path d="M7 20 L15 16 L23 20 L15 24 Z" fill="currentColor" opacity="0.3" />
        </svg>
        <span className="font-serif text-lg text-white">FABRIQ</span>
        <span className="ml-1 text-[10px] uppercase tracking-widest text-white/50">Brand</span>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active ? 'bg-white/10 text-white font-medium' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-5 mt-auto">
        <div className="border-t border-white/10 pt-4 px-3">
          <div className="text-sm text-white truncate">{displayName || email}</div>
          <div className="text-xs text-white/40 truncate mb-3">{email}</div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-white shadow-md border"
        style={{ borderColor: '#E6DFCF' }}
      >
        <Menu size={20} style={{ color: '#0F4238' }} />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative h-full w-64 shadow-xl">
            {sidebar}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex h-screen sticky top-0 shrink-0">
        {sidebar}
      </aside>
    </>
  );
}
