'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export function IntroductionSection() {
  return (
    <section className="relative bg-black text-white py-24 md:py-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-purple-300 text-sm"
          >
            <Sparkles size={14} />
            <span className="tracking-wide uppercase font-semibold">About Milan</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50"
          >
            A Symphony of Culture, Talent, and Celebration
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed"
          >
            Milan is not just a fest; it&apos;s an emotion. Since its inception, Milan has been the heartbeat of SRMIST, bringing together thousands of students from across the nation to celebrate art, music, dance, and literature. It serves as a vibrant platform where creativity meets opportunities, and where memories are forged that last a lifetime.
          </motion.p>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.6 }}
          >
             <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mt-8" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
