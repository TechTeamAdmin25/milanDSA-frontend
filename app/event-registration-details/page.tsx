'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/context/auth-context'

export default function EventRegistrationDetailsPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
        // Fallback protection
        router.push('/event-register')
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return null

  return (
    <main className="min-h-screen bg-neutral-950 pt-24 pb-12 px-4 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-neutral-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl text-center"
      >
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2">Ready to Register!</h1>
        <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
            You are logged in as <span className="text-white font-medium">{user.email}</span>. 
            Proceed to select your events or complete your general registration.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
             <Button onClick={() => router.push('/events')} className="h-14 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-medium">
                Browse Events
            </Button>
            <Button className="h-14 bg-white text-black hover:bg-neutral-200 rounded-xl font-bold">
                Complete Registration
            </Button>
        </div>
      </motion.div>
    </main>
  )
}
