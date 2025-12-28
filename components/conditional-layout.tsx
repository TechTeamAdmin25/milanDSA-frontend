'use client';

import { usePathname } from 'next/navigation';
import { KineticCursor } from '@/components/ui/kinetic-cursor';
import { PillBase } from '@/components/ui/3d-adaptive-navigation-bar';

export function ConditionalLayout() {
  const pathname = usePathname();

  // Hide custom cursor and navigation on admin pages
  const isAdminPage = pathname?.startsWith('/admin');

  if (isAdminPage) {
    return null;
  }

  return (
    <>
      <KineticCursor />
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <PillBase />
      </header>
    </>
  );
}
