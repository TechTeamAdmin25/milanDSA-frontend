'use client'

import React from 'react'
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Ticket, Sparkles, ArrowRight, ShieldCheck, Ban, University, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"

type PassType = 'events' | 'single' | 'pro'

interface PassOption {
  id: PassType
  title: string
  price: string
  description: string
  features: string[]
  restriction: 'open' | 'srm'
  icon: React.ElementType
  color: string
}

const PASSES: PassOption[] = [
  {
    id: 'events',
    title: "Events Pass",
    price: "₹499",
    description: "Access to all technical and non-technical events.",
    features: ["All Technical Events", "All Non-Tech Events", "Workshops Entry", "Certificate of Participation"],
    restriction: 'open',
    icon: University,
    color: "from-blue-400 to-cyan-400"
  },
  {
    id: 'single',
    title: "Single-Day Pass",
    price: "₹299",
    description: "Experience the magic of Milan for one day.",
    features: ["Single Day Entry", "Select Pro-Shows", "Carnival Access", "Food Court Access"],
    restriction: 'srm',
    icon: Ticket,
    color: "from-purple-400 to-pink-400"
  },
  {
    id: 'pro',
    title: "Pro-Show Pass",
    price: "₹899",
    description: "Exclusive access to the star-studded nights.",
    features: ["All Pro-Shows", "VIP Standing Area", "Meet & Greet Opportunities", "Priority Entry"],
    restriction: 'srm',
    icon: Sparkles,
    color: "from-amber-400 to-orange-400"
  }
]



export default function Passes() {
  const { user } = useAuth()
  const router = useRouter()
  // Removed unused state vars

  const handleBuyPass = async (pass: PassOption) => {
    // Removed unused state clearers
    
    // Case 1: Events Pass Logic
    if (pass.id === 'events') {
        if (!user) {
            // Force Login before showing Registration Form
            localStorage.setItem('redirectAfterLogin', '/event-register')
            router.push('/login?returnUrl=/event-register')
        } else {
            // Logged in user goes to Registration Form
            router.push('/event-register')
        }
        return
    }

    // Case 2 & 3: Single Day & Pro Show (SRM Only)
    // Common Logic: Login Required -> Email Domain Check -> Redirect/Block

    if (!user) {
        // Not logged in: Redirect to login with return url
        const targetUrl = pass.id === 'single' ? '/checkout/single-day' : '/checkout/proshow'
        // Saving to localStorage as backup/redundancy for "Redirection Memory"
        localStorage.setItem('redirectAfterLogin', targetUrl)
        router.push(`/login?returnUrl=${targetUrl}`)
        return
    }

    // User is logged in, check eligibility
    const isSrmEmail = user.email?.endsWith('@srmist.edu.in')
    
    if (!isSrmEmail) {
        // Fallback for button state bypass attempt
        return
    }

    // Eligible SRM User
    if (pass.id === 'single') {
        router.push('/checkout/single-day')
    } else if (pass.id === 'pro') {
        router.push('/checkout/proshow')
    }
  }

  return (
    <main className="relative min-h-screen bg-neutral-950 text-white overflow-x-hidden selection:bg-purple-500/30">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/BackgroundImages/PassBackgroundImage.png"
          alt="Pass Background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/90 via-neutral-950/80 to-neutral-950" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24 flex flex-col items-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-purple-200 mb-2">
            <Sparkles size={14} className="text-yellow-400" />
            <span>Secure Your Spot</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500">
            Choose Your Access
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Unlock the ultimate experience with our verified pass system. Select the tier that suits you best.
          </p>
        </motion.div>

        {/* Pass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {PASSES.map((pass, index) => (
            <motion.div
              key={pass.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col"
            >
              {/* Card Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-b ${pass.color} opacity-0 group-hover:opacity-20 transition duration-500 blur-xl rounded-3xl`} />
              
              <div className="relative flex flex-col h-full bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-1">
                
                {/* Header */}
                <div className="mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pass.color} p-3 mb-6 shadow-lg shadow-purple-900/20`}>
                    <pass.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{pass.title}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">{pass.price}</span>
                    <span className="text-neutral-500 font-medium">/person</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-white/5 mb-6" />

                {/* Features */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {pass.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-300">
                      <CheckCircle2 className={`w-5 h-5 shrink-0 bg-clip-text text-transparent bg-gradient-to-r ${pass.color}`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Restriction Badge */}
                <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 bg-neutral-950/50 p-3 rounded-xl border border-white/5">
                  {pass.restriction === 'srm' ? (
                     <>
                       <ShieldCheck className="w-4 h-4 text-purple-400" />
                       <span>SRM Verified Only</span>
                     </>
                  ) : (
                    <>
                       <CheckCircle2 className="w-4 h-4 text-blue-400" />
                       <span>Open to All</span>
                    </>
                  )}
                </div>

                {/* Action Button */}
                {/* Action Button */}
                {(() => {
                  const isSrmPass = pass.restriction === 'srm'
                  const isSrmEmail = user?.email?.endsWith('@srmist.edu.in')
                  const isEligible = !isSrmPass || (user && isSrmEmail)
                  
                  let buttonText = user ? "Purchase Pass" : "Login to Buy"
                  if (pass.id === 'events') buttonText = user ? "Register Now" : "Login to Register"
                  
                  // Override for blocked state
                  if (user && !isEligible) {
                    buttonText = "SRM Verified Only"
                  }

                  return (
                    <div className="space-y-2">
                        <Button 
                          onClick={() => handleBuyPass(pass)}
                          disabled={!!user && !isEligible}
                          className={`w-full font-bold py-6 rounded-xl group/btn overflow-hidden relative ${
                             user && !isEligible 
                                ? "bg-neutral-800 text-neutral-500 cursor-not-allowed border border-white/5" 
                                : "bg-white text-black hover:bg-neutral-200"
                          }`}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            <>
                                {buttonText}
                                {(user && isEligible) || !user ? (
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                ) : (
                                    <Ban className="w-4 h-4" />
                                )}
                            </>
                          </span>
                          {/* Hover Gradient only if active */}
                          {(!user || isEligible) && (
                              <div className={`absolute inset-0 bg-gradient-to-r ${pass.color} opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300`} />
                          )}
                        </Button>
                        
                        {/* Ineligibility Warning */}
                        {user && !isEligible && (
                            <p className="text-center text-xs text-red-400/80 font-medium">
                                Requires @srmist.edu.in email address
                            </p>
                        )}
                    </div>
                  )
                })()}

              </div>
            </motion.div>
          ))}
        </div>

        {/* Error/Success Feedback Modal/Overlay - Using specific state feedback directly on screen or simplified toast */}
        <AnimatePresence>
            {/* Removed legacy state-based toasts */}
        </AnimatePresence>

      </div>
    </main>
  )
}
