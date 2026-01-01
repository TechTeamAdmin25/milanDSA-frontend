'use client'

import React, { useState, useRef, useMemo, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence, useSpring } from 'framer-motion'

interface NavItem {
  label: string
  id: string
  path: string
}

export const PillBase = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [expanded, setExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const navItems: NavItem[] = useMemo(() => [
    { label: 'Home', id: 'home', path: '/' },
    { label: 'Gallery', id: 'gallery', path: '/gallery' },
    { label: 'Team', id: 'team', path: '/team' },
    { label: 'Sponsors', id: 'sponsors', path: '/sponsors' },
    { label: 'Explore', id: 'explore', path: '/explore' },
    { label: 'Events', id: 'events', path: '/events' },
  ], [])

  const activeItem = navItems.find(i => i.path === pathname) || navItems[0]

  const width = useSpring(140, { stiffness: 260, damping: 28 })
  const height = useSpring(52, { stiffness: 260, damping: 28 })

  useEffect(() => {
    if (expanded) {
      width.set(isMobile ? 220 : 480)
      height.set(isMobile ? navItems.length * 44 + 16 : 52)
    } else {
      width.set(140)
      height.set(52)
    }
  }, [expanded, isMobile, navItems.length, width, height])

  useEffect(() => {
    if (!expanded) return
    const close = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false)
      }
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [expanded])

  const navigate = (path: string) => {
    setExpanded(false)
    router.push(path)
  }

  if (pathname?.startsWith('/operator')) return null

  return (
    <motion.nav
      ref={containerRef}
      className="relative select-none"
      style={{
        width,
        height,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        background: 'rgba(15, 15, 15, 0.55)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 999,
        boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
        overflow: 'hidden'
      }}
      onClick={() => setExpanded(v => !v)}
      onMouseEnter={() => !isMobile && setExpanded(true)}
      onMouseLeave={() => !isMobile && setExpanded(false)}
    >
      <div className="relative z-10 h-full w-full flex items-center justify-center px-4">
        {!expanded && (
          <span className="text-sm font-semibold tracking-wide text-white">
            {activeItem.label}
          </span>
        )}

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`flex ${isMobile ? 'flex-col items-center gap-2' : 'flex-row gap-6'}`}
            >
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`text-sm transition ${
                    pathname === item.path
                      ? 'text-white font-semibold'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
