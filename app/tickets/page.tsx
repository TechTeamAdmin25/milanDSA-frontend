'use client'

import React from 'react'
import Image from "next/image"
import { motion } from "framer-motion"
import { Ticket, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Tickets() {
  return (
    <main className="relative min-h-screen bg-neutral-950 text-white overflow-hidden">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/BackgroundImages/TicketBackgroundImage.png"
          alt="Ticket Background"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/50 to-neutral-950" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col items-center justify-center text-center">
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="space-y-6 max-w-4xl"
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-purple-200 mb-4"
          >
            <Sparkles size={16} className="text-yellow-400" />
            <span>Limited Early Bird Tickets Available</span>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500 drop-shadow-2xl">
            MILAN &apos;26
          </h1>
          
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
             Passes live soon!
          </h2>

          <p className="text-lg md:text-2xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Secure your spot at the grandest celebration of talent, culture, and innovation. Don&apos;t miss out on the experience of a lifetime.
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="pt-8"
          >
            <Button 
              size="lg" 
              className="group relative px-8 py-8 text-xl bg-white text-black hover:bg-neutral-200 rounded-full transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] border-2 border-transparent"
            >
              <Ticket className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              Get Your Tickets
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <p className="mt-4 text-sm text-neutral-500">
              *Student ID required for entry
            </p>
          </motion.div>
        </motion.div>
      </div>

    </main>
  )
}
