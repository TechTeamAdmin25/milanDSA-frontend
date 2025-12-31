"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function MobileHeader() {
  const pathname = usePathname()

  const linkClass = (path: string) =>
    `text-xs font-medium ${
      pathname === path ? "text-white" : "text-white/70"
    }`

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur">
      <nav className="flex h-14 items-center justify-around">
        <Link href="/" className={linkClass("/")}>
          Home
        </Link>
        <Link href="/gallery" className={linkClass("/gallery")}>
          Gallery
        </Link>
        <Link href="/team" className={linkClass("/team")}>
          Team
        </Link>
        <Link href="/events" className={linkClass("/events")}>
          Events
        </Link>
      </nav>
    </header>
  )
}
