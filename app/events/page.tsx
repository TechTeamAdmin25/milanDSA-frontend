"use client";

import React, { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { BentoGrid, BentoCard } from "@/components/event/BentoGrid";
import MilanCalendar from "@/components/event/MilanCalendar";
import EventDetailsModal, {
  EventItem,
} from "@/components/event/EventDetailsModal";

// FIXED: Import from the .ts file
import { eventsData } from "./eventdata";

import {
  Music,
  Theater,
  Palette,
  Gamepad2,
  Brain,
  BookOpen,
  Sparkles,
  Swords,
  type LucideIcon,
} from "lucide-react";

/* ----------------------------------
   Types
----------------------------------- */

type EventSummary = {
  total_events: number;
  events_for_srm_students: number;
};

type EventsDataSource = {
  summary: EventSummary;
  [key: string]: EventItem[] | EventSummary;
};

/* ----------------------------------
   UI Configuration (Meta Data)
----------------------------------- */

const CATEGORY_META: Record<
  string,
  {
    title: string;
    description: string;
    icon: LucideIcon;
    className: string;
    background: ReactNode;
  }
> = {
  movies_and_dramatics: {
    title: "Movies & Dramatics",
    description: "Stage, scripts, films and performances",
    icon: Theater,
    className: "md:col-span-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-violet-100/50 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
    ),
  },
  creative_arts: {
    title: "Creative Arts",
    description: "Design, sketching and visual creativity",
    icon: Palette,
    className: "md:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/50 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
    ),
  },
  music: {
    title: "Music",
    description: "Bands, vocals, rap and instruments",
    icon: Music,
    className: "md:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-bl from-indigo-100/50 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
    ),
  },
  dance: {
    title: "Dance",
    description: "Solo, crew, classical and street styles",
    icon: Music,
    className: "md:col-span-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
    ),
  },
  fashion: {
    title: "Fashion",
    description: "Runway, styling and personality",
    icon: Sparkles,
    className: "md:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-100/50 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
    ),
  },
  astrophilia: {
    title: "Astrophilia",
    description: "Space, science and innovation",
    icon: Brain,
    className: "md:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-bl from-slate-200/50 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
    ),
  },
  literary: {
    title: "Literary",
    description: "Debate, poetry and speaking",
    icon: BookOpen,
    className: "md:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
    ),
  },
  self_defense: {
    title: "Self Defense",
    description: "Combat and strength events",
    icon: Swords,
    className: "md:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-tr from-red-100/50 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
    ),
  },
  gaming: {
    title: "Gaming",
    description: "Esports and competitive gaming",
    icon: Gamepad2,
    className: "md:col-span-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-tl from-cyan-100/50 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
    ),
  },
};

/* ----------------------------------
   Main Page Component
----------------------------------- */

export default function EventsPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { summary, ...categoryData } = eventsData as EventsDataSource;

  const [activeCategoryKey, setActiveCategoryKey] = useState<string | null>(
    null,
  );

  const activeCategoryEvents = activeCategoryKey
    ? (categoryData[activeCategoryKey] as EventItem[])
    : [];

  const activeCategoryMeta = activeCategoryKey
    ? CATEGORY_META[activeCategoryKey]
    : null;

  return (
    <main className="min-h-screen bg-[#F5F5F7] text-neutral-900 overflow-x-hidden selection:bg-purple-200">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-100/40 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center z-10 bg-neutral-950 w-full rounded-b-[3rem] shadow-xl overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8 relative z-10">
          <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur text-sm font-medium tracking-wide uppercase text-neutral-300">
            Experience the Magic
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl md:text-9xl font-bold tracking-tighter text-white mb-8 relative z-10">
          Events<span className="text-purple-500">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl text-xl md:text-2xl text-neutral-400 font-light leading-relaxed relative z-10">
          A curated showcase of talent, innovation, and community spirit.{" "}
          <br className="hidden md:block" />
          Explore the celebrations that define our culture.
        </motion.p>
      </section>

      {/* Categories Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-neutral-900">
            Discover Categories
          </h2>
          <div className="hidden md:block h-px flex-1 bg-neutral-200 ml-8" />
        </div>

        <BentoGrid>
          {Object.entries(categoryData).map(([key, events]) => {
            if (!Array.isArray(events)) return null;
            const meta = CATEGORY_META[key];
            if (!meta) return null;

            return (
              <motion.div
                key={key}
                onClick={() => setActiveCategoryKey(key)}
                className={`${meta.className} cursor-pointer`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}>
                <BentoCard
                  name={meta.title}
                  description={`${events.length} events • ${meta.description}`}
                  href="#categories"
                  cta="View Events"
                  Icon={meta.icon}
                  background={meta.background}
                  className="h-full"
                />
              </motion.div>
            );
          })}
        </BentoGrid>
      </section>

      {/* Calendar Section */}
      <section
        id="schedule"
        className="relative z-10 py-24 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Event Schedule
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              The biggest dates of the year. Mark your calendars for the
              ultimate celebration.
            </p>
          </div>

          <MilanCalendar />
        </div>
      </section>

      {/* Host an Event CTA */}
      <section className="relative z-10 py-24 px-6 bg-[#F5F5F7]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
            Have an idea for an event?
          </h2>
          <p className="text-xl text-neutral-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Bring your vision to life at MILAN. We support students in
            organizing workshops, competitions, and performances.
          </p>
          <a
            href="mailto:events@milan.srm"
            className="inline-flex h-12 items-center justify-center rounded-full bg-neutral-900 px-8 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2">
            Host an Event
          </a>
        </div>
      </section>

      {/* Modal */}
      {activeCategoryKey && activeCategoryMeta && (
        <EventDetailsModal
          isOpen={!!activeCategoryKey}
          onClose={() => setActiveCategoryKey(null)}
          title={activeCategoryMeta.title}
          description={activeCategoryMeta.description}
          events={activeCategoryEvents}
        />
      )}
    </main>
  );
}
