"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Star, Globe, Award, Heart } from "lucide-react";

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
    <main className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-white overflow-x-hidden pt-24 pb-20">
      {/* Hero Header */}
      <section className="relative px-6 py-20 md:py-32 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-200/40 via-transparent to-transparent dark:from-neutral-800/40 dark:via-transparent dark:to-transparent -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="mb-6 flex items-center justify-center gap-2 text-sm font-medium tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
            <Award className="h-4 w-4 text-yellow-500" />
            <span>Official Partners</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-white dark:to-white/60 mb-8">
            Our Sponsors
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Milan 2026 is made possible by the generous support of our partners. 
            We are proud to collaborate with brands that share our vision for creativity and culture.
          </p>
        </motion.div>
      </section>

      {/* Marquee Section */}
      <section className="py-12 border-y border-neutral-200 dark:border-white/5 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
        <ScrollVelocity velocity={3} className="text-neutral-800 dark:text-neutral-200 opacity-80 hover:opacity-100 transition-opacity">
          PAST SPONSORS • RED BULL • COKE STUDIO • SPOTIFY • AMAZON • GOOGLE • 
        </ScrollVelocity>
      </section>

      {/* Title Sponsors Grid */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-white">Title Sponsors</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </div>
        
        <BentoGrid className="lg:auto-rows-[20rem]">
          {TITLE_SPONSORS.map((sponsor) => (
            <BentoCard key={sponsor.name} {...sponsor} />
          ))}
        </BentoGrid>
      </section>

      {/* Gold Sponsors Grid */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-white">Associate Sponsors</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full" />
        </div>

        <BentoGrid className="lg:auto-rows-[16rem]">
          {GOLD_SPONSORS.map((sponsor) => (
            <BentoCard key={sponsor.name} {...sponsor} />
          ))}
        </BentoGrid>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-32 text-center">
        <div className="max-w-3xl mx-auto bg-white dark:bg-neutral-800 rounded-3xl p-12 shadow-xl border border-neutral-100 dark:border-white/10">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">Interested in sponsoring?</h3>
          <p className="text-neutral-600 dark:text-neutral-300 mb-10 text-lg">
            Connect with over 50,000 students and showcase your brand at one of India&apos;s largest cultural festivals.
          </p>
          <a
            href="mailto:sponsorship@milan.srm"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-black dark:bg-white dark:text-black transition-all duration-200 rounded-full hover:scale-105 hover:bg-neutral-800 dark:hover:bg-neutral-200"
          >
            Become a Sponsor
          </a>
        </div>
      </section>
    </main>
  )
}
