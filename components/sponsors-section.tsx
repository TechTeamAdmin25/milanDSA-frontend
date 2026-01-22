"use client";


import { motion } from "framer-motion";
import { Sparkles, Zap, Star, Globe, Heart } from "lucide-react";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { ScrollVelocity } from "@/components/ui/scroll-velocity";

// Placeholder Sponsor Data
const TITLE_SPONSORS = [
  {
    name: "TechGiant Corp",
    description:
      "Leading the way in innovation and technology solutions worldwide.",
    href: "#",
    cta: "Visit Website",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-50" />
    ),
    Icon: Zap,
  },
  {
    name: "Global Bank",
    description: "Trusted financial partner for millions.",
    href: "#",
    cta: "Learn More",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-50" />
    ),
    Icon: Globe,
  },
];

const GOLD_SPONSORS = [
  {
    name: "Future Foods",
    description: "Sustainable nutrition for the next generation.",
    href: "#",
    cta: "Visit",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 opacity-50" />
    ),
    Icon: Heart,
  },
  {
    name: "Pixel Studios",
    description: "Creative design and digital experiences.",
    href: "#",
    cta: "Portfolio",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-rose-500/20 opacity-50" />
    ),
    Icon: Sparkles,
  },
  {
    name: "Urban Gear",
    description: "Streetwear and lifestyle apparel.",
    href: "#",
    cta: "Shop",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 opacity-50" />
    ),
    Icon: Star,
  },
];

export function SponsorsSection() {
  return (
    <main className="min-h-screen w-full bg-[#F5F5F7] text-neutral-900 overflow-x-hidden selection:bg-purple-200">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
         <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-100/40 via-transparent to-transparent" />
      </div>

      {/* Hero Header */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 text-center z-10 bg-neutral-950 w-full overflow-hidden">
         {/* Abstract Glower */}
         <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8 relative z-10"
        >
           <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur text-sm font-medium tracking-wide uppercase text-neutral-300">
             Official Partners
           </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8 relative z-10"
        >
           Our Sponsors<span className="text-blue-500">.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-xl text-neutral-400 font-light leading-relaxed relative z-10"
        >
          Powering the festival experience through strategic collaborations. <br className="hidden md:block" />
          Meet the brands that make MILAN 2026 possible.
        </motion.p>
      </section>

      {/* Marquee Section */}
      <section className="py-12 bg-neutral-950 rounded-b-[3rem] shadow-xl relative z-10 mb-12">
        <ScrollVelocity velocity={1} className="text-neutral-400 font-medium opacity-60 hover:opacity-100 transition-opacity">
          PAST SPONSORS • BLINKIT • RED BULL • COKE STUDIO • SPOTIFY • AMAZON • GOOGLE • 
        </ScrollVelocity>
      </section>

      {/* Title Sponsors Grid (Light) */}
      <section className="px-6 py-24 max-w-7xl mx-auto relative z-10">
        <div className="mb-16 flex items-center justify-between">
           <h2 className="text-3xl font-bold text-neutral-900">Title Sponsors</h2>
           <div className="hidden md:block h-px flex-1 bg-neutral-200 ml-8" />
        </div>
        
        <BentoGrid className="lg:auto-rows-[20rem]">
          {TITLE_SPONSORS.map((sponsor) => (
            <BentoCard key={sponsor.name} {...sponsor} />
          ))}
        </BentoGrid>
      </section>

      {/* Associate Sponsors Grid (Light) */}
      <section className="px-6 py-12 max-w-7xl mx-auto relative z-10">
        <div className="mb-16 flex items-center justify-between">
           <h2 className="text-3xl font-bold text-neutral-900">Associate Sponsors</h2>
           <div className="hidden md:block h-px flex-1 bg-neutral-200 ml-8" />
        </div>

        <BentoGrid className="lg:auto-rows-[16rem]">
          {GOLD_SPONSORS.map((sponsor) => (
            <BentoCard key={sponsor.name} {...sponsor} />
          ))}
        </BentoGrid>
      </section>

      {/* CTA Section (Light) */}
      <section className="px-6 py-32 text-center relative z-10 bg-[#F5F5F7]">
        <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-12 shadow-2xl border border-white/20">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900">Partner With Us</h3>
          <p className="text-neutral-500 mb-10 text-lg leading-relaxed">
            Connect with over 50,000 students and showcase your brand at one of India&apos;s largest cultural festivals.
          </p>
          <a
            href="mailto:sponsorship@milan.srm"
            className="inline-flex items-center justify-center px-10 py-5 text-base font-semibold text-white bg-neutral-900 rounded-full hover:scale-105 hover:bg-black transition-all duration-300 shadow-xl"
          >
            Become a Sponsor
          </a>
        </div>
      </section>
    </main>
  )
}