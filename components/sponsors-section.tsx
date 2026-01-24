"use client";


import { useState, ComponentType } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Star, Globe, Heart, Music, DollarSign, Coffee, ShoppingBag, BookOpen, Radio, Gamepad2, Utensils, Feather, Monitor } from "lucide-react";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { ScrollVelocity } from "@/components/ui/scroll-velocity";

// Helper to create logo component with fallback
const createLogo = (src: string, Fallback: ComponentType<{ className?: string }>) => {
  return function Logo({ className }: { className?: string }) {
    const [error, setError] = useState(false);
    if (error) return <Fallback className={className} />;
    return (
      <img
        src={src}
        alt="Sponsor Logo"
        className={`${className} object-contain`}
        onError={() => setError(true)}
      />
    );
  };
};

const TITLE_SPONSORS = [
  {
    name: "The Hindu",
    description: "India's National Newspaper since 1878.",
    href: "https://www.thehindu.com/",
    cta: "Read News",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 opacity-50" />
    ),
    Icon: createLogo("/sponsors/the-hindu.png", Feather),
  },
  {
    name: "Coca-Cola",
    description: "Real Magic.",
    href: "https://www.coca-cola.com/",
    cta: "Visit",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-pink-600/20 opacity-50" />
    ),
    Icon: createLogo("/sponsors/coca-cola.png", Heart),
  },
  {
    name: "JioSaavn",
    description: "Music for everyone.",
    href: "https://www.jiosaavn.com/",
    cta: "Listen",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 opacity-50" />
    ),
    Icon: createLogo("/sponsors/jiosaavn.png", Music),
  },
  {
    name: "Red Bull",
    description: "Gives You Wiings.",
    href: "https://www.redbull.com/",
    cta: "Explore",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 opacity-50" />
    ),
    Icon: createLogo("/sponsors/red-bull.png", Zap),
  },
  {
    name: "The Times of India",
    description: "Let Truth Prevail.",
    href: "https://timesofindia.indiatimes.com/",
    cta: "News",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-slate-500/20 to-gray-500/20 opacity-50" />
    ),
    Icon: createLogo("/sponsors/toi.png", Globe),
  },
  {
    name: "Subway",
    description: "Eat Fresh.",
    href: "https://www.subway.com/",
    cta: "Order",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-yellow-500/20 opacity-50" />
    ),
    Icon: createLogo("/sponsors/subway.png", Utensils),
  },
  {
    name: "McDonald's",
    description: "I'm Lovin' It.",
    href: "https://www.mcdonalds.com/",
    cta: "Visit",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-red-500/20 opacity-50" />
    ),
    Icon: createLogo("/sponsors/mcdonalds.png", Utensils),
  },
  {
    name: "Snapchat",
    description: "Share the moment.",
    href: "https://www.snapchat.com/",
    cta: "Snap",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 opacity-50" />
    ),
    Icon: createLogo("/sponsors/snapchat.png", Star),
  },
];

const GOLD_SPONSORS = [
  {
    name: "Green Trends",
    description: "Styling India.",
    href: "#",
    cta: "Visit",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-lime-500/20 to-green-500/20 opacity-50" />
    ),
    Icon: createLogo("/sponsors/green-trends.png", Sparkles),
  },
  {
    name: "Payed",
    description: "Payment Solutions.",
    href: "#",
    cta: "More",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 opacity-50" />
    ),
    Icon: createLogo("/sponsors/payed.png", DollarSign),
  },
  {
    name: "Fever 104 FM",
    description: "The sound of the city.",
    href: "#",
    cta: "Listen",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 opacity-50" />
    ),
    Icon: createLogo("/sponsors/fever-fm.png", Radio),
  },
  {
    name: "Zebronics",
    description: "Premium Audio.",
    href: "#",
    cta: "Shop",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/20 to-stone-500/20 opacity-50" />
    ),
    Icon: createLogo("/sponsors/zebronics.png", Music),
  },
  {
    name: "Eazydiner",
    description: "Book tables easily.",
    href: "#",
    cta: "Book",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 opacity-50" />
    ),
    Icon: createLogo("/sponsors/eazydiner.png", Utensils),
  },
  {
    name: "Snitch",
    description: "Men's Fashion.",
    href: "#",
    cta: "Shop",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-black/20 opacity-50" />
    ),
    Icon: createLogo("/sponsors/snitch.png", ShoppingBag),
  },
  {
    name: "WCC",
    description: "World Cricket Championship.",
    href: "#",
    cta: "Play",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-sky-600/20 opacity-50" />
    ),
    Icon: createLogo("/sponsors/wcc.png", Gamepad2),
  },
  {
    name: "Dabur Honey",
    description: "Purity guaranteed.",
    href: "#",
    cta: "Visit",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 opacity-50" />
    ),
    Icon: createLogo("/sponsors/dabur-honey.png", Heart),
  },
  {
    name: "Unschool",
    description: "Learn anything.",
    href: "#",
    cta: "Learn",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-purple-500/20 opacity-50" />
    ),
    Icon: createLogo("/sponsors/unschool.png", BookOpen),
  },
  {
    name: "Drunken Monkey",
    description: "Naturally High.",
    href: "#",
    cta: "Drink",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-600/20 opacity-50" />
    ),
    Icon: createLogo("/sponsors/drunken-monkey.png", Coffee),
  },
  {
    name: "Dabur Gulabari",
    description: "Rose Glow.",
    href: "#",
    cta: "Visit",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-rose-400/20 opacity-50" />
    ),
    Icon: createLogo("/sponsors/dabur-gulabari.png", Sparkles),
  },
  {
    name: "ComicByte",
    description: "Gaming & Accessories.",
    href: "#",
    cta: "Shop",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 opacity-50" />
    ),
    Icon: createLogo("/sponsors/comic-byte.png", Gamepad2),
  },
  {
    name: "Mr. Burger",
    description: "Fresh & Juicy.",
    href: "#",
    cta: "Eat",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-red-600/20 opacity-50" />
    ),
    Icon: createLogo("/sponsors/mr-burger.png", Utensils),
  },
  {
    name: "Coding Ninjas",
    description: "Be a Coding Ninja.",
    href: "#",
    cta: "Code",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-500/20 opacity-50" />
    ),
    Icon: createLogo("/sponsors/coding-ninjas.png", Monitor),
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