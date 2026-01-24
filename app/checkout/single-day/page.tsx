'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/auth-context'
import { Loader2, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SingleDayCheckoutPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  // Derived Access State
  const accessDenied = user && !user.email.endsWith('@srmist.edu.in')

  useEffect(() => {
    if (isLoading) return

    if (!user) {
        localStorage.setItem('redirectAfterLogin', '/checkout/single-day')
        router.push('/login?returnUrl=/checkout/single-day')
        return
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-black">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
        </div>
    )
  }

  if (accessDenied) {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-black p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-red-950/30 border border-red-500/20 rounded-3xl p-8 text-center"
            >
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldAlert className="w-8 h-8 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold text-red-100 mb-2">Access Denied</h1>
                <p className="text-red-200/70 mb-8">
                    The Single Day Celebrity Pass is exclusively reserved for SRM Students. 
                    Please login with your institutional email (@srmist.edu.in).
                </p>
                <Button onClick={() => router.push('/passes')} className="bg-red-500/10 text-red-200 hover:bg-red-500/20 border-red-500/20 w-full">
                    Return to Passes
                </Button>
            </motion.div>
        </div>
    )
  }

  // Eligible SRM User
  return (
    <main className="min-h-screen bg-neutral-950 pt-32 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl font-black text-white mb-8">Checkout: Single Day Pass</h1>
            {/* Payment Integration would go here */}
            <div className="bg-neutral-900 border border-white/10 rounded-3xl p-8 h-96 flex items-center justify-center text-neutral-500">
                Payment Gateway Integration Area
            </div>
        </div>
    </main>
  )
}
