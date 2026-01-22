'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid'
import { Timeline } from '@/components/ui/timeline'
import { Music, Code, Palette, Gamepad2 } from 'lucide-react'

// ... imports remain the same

export default function EventsPage() {
  const categories = [
    {
      name: "Cultural Events",
      className: "col-span-3 md:col-span-2",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100/50 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
      ),
      Icon: Music,
      description: "Dance, Music, Drama, and Fashion. Unleash your inner artist on the grandest stage.",
      href: "#schedule",
      cta: "View Schedule",
    },
    {
      name: "Technical Events",
      className: "col-span-3 md:col-span-1",
      background: (
        <div className="absolute inset-0 bg-gradient-to-bl from-cyan-100/50 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
      ),
      Icon: Code,
      description: "Hackathons, Coding Contests, and Tech Quizzes.",
      href: "#schedule",
      cta: "View Schedule",
    },
    {
      name: "Literary & Arts",
      className: "col-span-3 md:col-span-1",
      background: (
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-100/50 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
      ),
      Icon: Palette,
      description: "Debates, Poetry, Painting, and Sketching.",
      href: "#schedule",
      cta: "View Schedule",
    },
    {
      name: "Gaming & Esports",
      className: "col-span-3 md:col-span-2",
      background: (
        <div className="absolute inset-0 bg-gradient-to-tl from-emerald-100/50 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
      ),
      Icon: Gamepad2,
      description: "Valorant, FIFA, BGMI, and more. Battle it out for glory.",
      href: "#schedule",
      cta: "View Schedule",
    },
  ]

  const scheduleData = [
     // ... existing data (Shuru Roadshow, Shuru, Jhalak, Rendezvous) ...
    {
      title: "Shuru Roadshow",
      content: (
        <div className="space-y-4">
          <div className="bg-neutral-900/80 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:border-purple-500/50 transition-all duration-300 group">
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
              The Official Curtain-Raiser
            </h3>
            <p className="text-neutral-400 leading-relaxed text-base">
              The official curtain-raiser for Freshers&apos; celebrations. A high-energy roadshow featuring music, dance, and campus-wide excitement, setting the stage for the main event.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Shuru",
      content: (
        <div className="space-y-4">
           <div className="bg-neutral-900/80 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:border-blue-500/50 transition-all duration-300 group">
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
              Where Freshers Find Their Spotlight
            </h3>
            <p className="text-neutral-400 leading-relaxed text-base mb-4">
              The ultimate freshers&apos; talent showcase. A platform for new students to step into the spotlight across arts, music, and tech.
            </p>
            <div className="flex flex-wrap gap-2">
                {["Dance", "Music", "Drama", "Fashion", "Gaming", "Literary"].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-neutral-300">
                    {tag}
                </span>
                ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Jhalak",
      content: (
        <div className="space-y-4">
           <div className="bg-neutral-900/80 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:border-orange-500/50 transition-all duration-300 group">
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
              The Inter-House Cultural Battles
            </h3>
            <p className="text-neutral-400 leading-relaxed text-base">
                The spirited Inter-House cultural battle. Houses compete for glory in dance, music, and fashion, showcasing team spirit and raw talent in an electrifying arena.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Rendezvous",
      content: (
        <div className="space-y-4">
           <div className="bg-neutral-900/80 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:border-emerald-500/50 transition-all duration-300 group">
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
              A Celebration of Creativity & Unity
            </h3>
            <p className="text-neutral-400 leading-relaxed text-base mb-4">
                A grand celebration of creativity where all clubs unite. Electrifying performances, cultural exchange, and a true display of student unity organized entirely by students.
            </p>
             <p className="italic text-sm text-neutral-500 border-l-2 border-emerald-500 pl-3">
                &ldquo;The show must go on, unstoppable even by harsh weather.&rdquo;
              </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-[#F5F5F7] text-neutral-900 overflow-x-hidden selection:bg-purple-200">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-100/40 via-transparent to-transparent" />
         <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center z-10 bg-neutral-950 w-full rounded-b-[3rem] shadow-xl overflow-hidden">
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
                Experience the Magic
            </span>
        </motion.div>

        <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-9xl font-bold tracking-tighter text-white mb-8 relative z-10"
        >
            Events<span className="text-purple-500">.</span>
        </motion.h1>
        
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl text-xl md:text-2xl text-neutral-400 font-light leading-relaxed relative z-10"
        >
            A curated showcase of talent, innovation, and community spirit. <br className="hidden md:block"/>
            Explore the celebrations that define our culture.
        </motion.p>
      </section>

      {/* Categories Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-neutral-900">Discover Categories</h2>
            <div className="hidden md:block h-px flex-1 bg-neutral-200 ml-8" />
        </div>
        
        <BentoGrid>
          {categories.map((item) => (
            <BentoCard key={item.name} {...item} />
          ))}
        </BentoGrid>
      </section>

      {/* Timeline/Schedule */}
      <section id="schedule" className="relative z-10 py-10 dark bg-neutral-950">
        <Timeline 
          data={scheduleData} 
          heading="Flagship Events"
          description="A chronological journey through our biggest celebrations."
          className="bg-neutral-950 text-white"
        />
      </section>

      {/* Host an Event CTA */}
      <section className="relative z-10 py-24 px-6 bg-[#F5F5F7]">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
                Have an idea for an event?
            </h2>
            <p className="text-xl text-neutral-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                Bring your vision to life at MILAN. We support students in organizing workshops, competitions, and performances.
            </p>
            <a 
                href="mailto:events@milan.srm"
                className="inline-flex h-12 items-center justify-center rounded-full bg-neutral-900 px-8 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"
            >
                Host an Event
            </a>
        </div>
      </section>
    </main>
  )
}
