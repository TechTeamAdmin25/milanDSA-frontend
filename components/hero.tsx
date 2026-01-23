'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import { Ticket } from "lucide-react"

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Scale Animation */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full"
      >
        <Image
          src="/milan/hero-main.png"
          alt="Milan SRM Cultural Fest"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4 md:px-6">
        
        {/* Animated Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md"
        >
          <span className="text-sm md:text-base font-bold tracking-widest text-neutral-200 uppercase">
            Directorate of Student Affairs
          </span>
        </motion.div>

        {/* Main Title with Gradient */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
          className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-neutral-500 drop-shadow-2xl"
        >
          MILAN 2026
        </motion.h1>

        {/* Description Text */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 max-w-3xl"
        >
             <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-light max-w-2xl mx-auto">
                The iconic national-level cultural festival of <span className="text-purple-300 font-medium">SRM IST</span>. 
                A four-day extravaganza where <span className="text-white font-medium">creativity meets community spirit</span>, uniting talent from across India. <br/><span className="text-purple-200 font-semibold block mt-4 text-xl">Starting from 19th Feb 2026</span>
            </p>
        </motion.div>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          <a
            href="/passes"
            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-black transition-all hover:scale-105 hover:bg-neutral-100 active:scale-95 w-56"
          >
            Get Passes
            <Ticket className="h-4 w-4 transition-transform group-hover:rotate-12" />
            <div className="absolute inset-0 -z-10 rounded-full bg-white blur-xl opacity-0 transition-opacity group-hover:opacity-30" />
          </a>

          <a
            href="/events"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/50 hover:scale-105 active:scale-95 w-56"
          >
            Explore Events
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <div className="h-10 w-6 rounded-full border-2 border-white/30 flex justify-center p-1">
          <div className="h-2 w-1.5 rounded-full bg-white" />
        </div>
      </motion.div>
    </section>
  )
}
