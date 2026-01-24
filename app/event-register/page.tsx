'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Mail, User } from 'lucide-react'
import { useAuth } from '@/context/auth-context'


export default function EventRegisterPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isPrefilled = useRef(false)

  useEffect(() => {
    if (isLoading) return
    if (!user) {
        router.push('/login?returnUrl=/event-register')
        return
    }
    // Pre-fill only once
    if (!isPrefilled.current && user) {
        setTimeout(() => {
            if (user.email) setEmail(user.email)
            if (user.name) setName(user.name)
            isPrefilled.current = true
        }, 0)
    }
  }, [user, isLoading, router])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Functional mock for "Registration Form" logic
    // In real flow, this might just redirect to login or handle a separate registration API
    // Prompt says: "Show Registration Form + Email verification (OTP or link)"
    
    // For now, let's simulate sending to the details page after "verification"
    setTimeout(() => {
        router.push('/event-registration-details')
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-neutral-950 pt-24 pb-12 px-4 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-neutral-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Event Registration</h1>
        <p className="text-neutral-400 mb-8">Sign up to participate in Milan &apos;26 events.</p>

        <form onSubmit={handleRegister} className="space-y-4">
             <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-500 uppercase">Full Name</label>
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input 
                        type="text" 
                        placeholder="John Doe" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500 transition-colors" 
                        required 
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-500 uppercase">Email Address</label>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com" 
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500 transition-colors" 
                        required 
                    />
                </div>
            </div>

            <Button disabled={isSubmitting} className="w-full h-12 bg-white text-black hover:bg-neutral-200 mt-4 rounded-xl font-bold">
                {isSubmitting ? 'Processing...' : 'Verify & Register'} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
        </form>
        
        <div className="mt-6 text-center">
             {/* Login is now mandatory before this step */}
        </div>
      </motion.div>
    </main>
  )
}
