// components/navbar.tsx
'use client'

import React, { useState, useRef, useMemo, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence, useSpring } from 'framer-motion'
// ADDED: Ticket import
import { Home, Image as ImageIcon, Users, Calendar, Menu, Handshake, Compass, Ticket } from 'lucide-react'

interface NavItem {
  label: string
  id: string
  path: string
  icon: React.ElementType
}

export const PillBase = () => {
  const router = useRouter()
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)

  const [expanded, setExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!expanded) return
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [expanded])

  // FIX: Reordered items and added Tickets
  const navItems: NavItem[] = useMemo(() => [
    { label: 'Home', id: 'home', path: '/', icon: Home },
    { label: 'Events', id: 'events', path: '/events', icon: Calendar },
    { label: 'Sponsors', id: 'sponsors', path: '/sponsors', icon: Handshake },
    { label: 'Tickets', id: 'tickets', path: '/tickets', icon: Ticket },
    { label: 'Explore', id: 'explore', path: '/explore', icon: Compass },
    { label: 'Gallery', id: 'gallery', path: '/gallery', icon: ImageIcon },
    { label: 'Team', id: 'team', path: '/team', icon: Users },
  ], [])

  const activeItem = navItems.find((i) => i.path === pathname) || navItems[0]

  const handleNavigate = (path: string) => {
    setExpanded(false)
    router.push(path)
  }

  const width = useSpring(160, { stiffness: 300, damping: 30 })
  const height = useSpring(56, { stiffness: 300, damping: 30 })

  useEffect(() => {
    if (expanded) {
      // Adjusted width to fit the extra items
      width.set(isMobile ? 260 : 850) 
      height.set(isMobile ? navItems.length * 50 + 24 : 56)
    } else {
      width.set(160)
      height.set(56)
    }
  }, [expanded, isMobile, navItems.length, width, height])

  if (pathname?.startsWith('/operator')) return null

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.nav
        ref={containerRef}
        style={{ width, height }}
        className="pointer-events-auto relative flex flex-col items-center justify-center overflow-hidden border border-white/10 shadow-2xl backdrop-blur-xl bg-black/60 rounded-[50px]"
        onClick={() => {
          if (isMobile) setExpanded(!expanded)
        }}
        onMouseEnter={() => !isMobile && setExpanded(true)}
        onMouseLeave={() => !isMobile && setExpanded(false)}
      >
        <div className={`relative z-10 w-full h-full flex ${isMobile && expanded ? 'flex-col justify-center py-4' : 'items-center justify-center'}`}>
          {!expanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center gap-2"
            >
              <activeItem.icon size={18} className="text-white" />
              <span className="text-sm font-semibold tracking-wide text-white">
                {activeItem.label}
              </span>
              {isMobile && <Menu size={16} className="text-white/50 ml-2" />}
            </motion.div>
          )}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`flex ${isMobile ? 'flex-col items-center w-full gap-2' : 'flex-row items-center justify-between w-full px-6'}`}
              >
                {navItems.map((item) => {
                  const isActive = pathname === item.path
                  return (
                    <button
                      key={item.id}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigate(item.path)
                      }}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300
                        ${isMobile ? 'w-[90%]' : ''}
                        ${isActive 
                            ? 'bg-white/20 text-white font-medium' 
                            : 'text-white/60 hover:text-white hover:bg-white/10'}
                      `}
                    >
                      <item.icon size={18} />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  )
}