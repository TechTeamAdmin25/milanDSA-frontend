// components/conditional-layout.tsx
'use client'

import { usePathname } from "next/navigation"
// FIX: Import from './navbar', NOT './milan-timeline-section'
import { PillBase } from "./navbar" 

export function ConditionalLayout() {
  const pathname = usePathname()

  if (pathname?.startsWith("/studio")) {
    return null
  }

  return <PillBase />
}