"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Sparkles, ArrowRight, Download, Share2 } from "lucide-react"

export function PosterGeneratorSection() {
  return (
    <section className="relative w-full py-24 bg-black overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm"
            >
              <Sparkles size={14} />
              <span className="tracking-wide uppercase font-semibold">New Experience</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-[1.1]"
            >
              Create Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                Milan Moment
              </span>
            </motion.h2>

            <motion.p
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="text-lg text-neutral-400 max-w-xl mx-auto lg:mx-0 font-light"
            >
              Step into the spotlight. Generate your personalized, AI-powered Milan festival poster. Choose your vibe, add your name, and share your excitement with the world.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
               <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 group">
                 Generate Poster
                 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
               </button>
               <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <span className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-neutral-800" />
                    ))}
                  </span>
                  <span>Join 2,000+ others</span>
               </div>
            </motion.div>
          </div>

          {/* Right Preview */}
          <div className="relative flex justify-center lg:justify-end">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
               whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative w-[320px] h-[480px] md:w-[360px] md:h-[540px] bg-neutral-900 rounded-2xl overflow-hidden shadow-[0_0_50px_-10px_rgba(168,85,247,0.3)] border border-white/10 group cursor-pointer"
             >
                {/* Poster Background */}
                <Image 
                  src="/milan-poster-bg.png" 
                  alt="Poster Background" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                 {/* Poster Content Overlay */}
                 <div className="absolute inset-0 flex flex-col justify-between p-6 z-20">
                    {/* Header */}
                    <div className="text-center pt-4">
                        <div className="text-[10px] font-bold tracking-[0.4em] text-white/90 uppercase mb-3 drop-shadow-md">SRMIST Presents</div>
                        <h3 className="text-4xl font-black text-white drop-shadow-[0_0_15px_rgba(0,255,255,0.6)] tracking-tighter italic">
                          MILAN
                        </h3>
                    </div>

                    {/* Student Overlay - Positioned to blend */}
                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] h-[85%] z-10 pointer-events-none mix-blend-screen opacity-100">
                        <Image 
                          src="/student-overlay.png" 
                          alt="Student" 
                          fill 
                          className="object-contain object-bottom"
                        />
                     </div>
                     
                    {/* Footer / Name */}
                    <div className="relative z-30 text-center mb-12">
                       <div className="bg-black/30 backdrop-blur-md border border-white/20 p-4 rounded-xl transform group-hover:translate-y-[-5px] transition-transform duration-300">
                          <p className="text-[10px] text-cyan-300 uppercase tracking-widest mb-1 font-semibold">Headlining</p>
                          <p className="text-2xl md:text-3xl font-black text-white tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] font-sans">
                            YOUR NAME
                          </p>
                       </div>
                    </div>
                 </div>

                 {/* Glitch Overlay Effect (Subtle) */}
                 <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none mix-blend-overlay" />
                 
                 {/* UI Controls Overlay (Mockup interface) */}
                 <div className="absolute top-4 right-4 z-40">
                    <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur border border-white/10 text-[10px] items-center gap-1 text-white font-mono hidden group-hover:flex transition-opacity">
                      <span>PREVIEW MODE</span>
                    </div>
                 </div>
                 
                 <div className="absolute bottom-4 right-4 z-40 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                      <Download size={16} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-black/60 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:scale-110 transition-transform">
                      <Share2 size={16} />
                    </button>
                 </div>
             </motion.div>
             
             {/* Decorative Elements */}
             <div className="absolute top-1/2 -right-8 w-16 h-16 border border-purple-500/30 rounded-full flex items-center justify-center animate-spin-slow pointer-events-none">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
