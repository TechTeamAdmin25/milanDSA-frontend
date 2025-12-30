'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { KineticCursor } from '@/components/ui/kinetic-cursor'
import { PillBase } from '@/components/ui/3d-adaptive-navigation-bar'
import { MobileHeader } from '@/components/ui/mobile-header'

export function ConditionalLayout() {
  const pathname = usePathname()
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 1024)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  if (pathname?.startsWith('/admin')) {
    return null
  }

  if (!isDesktop) {
    return <MobileHeader />
  }

  return (
    <>
      <KineticCursor />
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <PillBase />
      </header>
    </>
  )
}
