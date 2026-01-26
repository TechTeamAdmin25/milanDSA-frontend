import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#F5F5F7] overflow-hidden">
      {/* -------------------------------------------
          1. HERO SECTION SKELETON (Dark Theme)
          Matches the "bg-neutral-950 rounded-b-[3rem]"
      -------------------------------------------- */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 text-center z-10 bg-neutral-950 w-full rounded-b-[3rem] shadow-xl overflow-hidden">
        {/* Background Blobs (Matches real page) */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px]" />

        {/* Badge Pulse */}
        <div className="h-9 w-48 rounded-full border border-white/10 bg-white/5 backdrop-blur-md animate-pulse mb-8 flex items-center justify-center">
          <Sparkles
            size={14}
            className="text-white/20"
          />
        </div>

        {/* Title Pulse */}
        <div className="h-20 md:h-28 w-64 md:w-96 bg-white/5 border border-white/5 rounded-3xl animate-pulse mb-8" />

        {/* Subtitle Lines */}
        <div className="flex flex-col items-center gap-3 w-full max-w-lg">
          <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
        </div>
      </section>

      {/* -------------------------------------------
          2. BENTO GRID SKELETON (Light Theme)
          Matches the "bg-[#F5F5F7]" body
      -------------------------------------------- */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Section Title Skeleton */}
        <div className="mb-12 flex items-center justify-between">
          <div className="h-8 w-48 bg-neutral-300/50 rounded animate-pulse" />
          <div className="hidden md:block h-px flex-1 bg-neutral-200 ml-8" />
        </div>

        {/* Grid Layout - Matches your Events BentoGrid exactly */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[16rem]">
          {/* ROW 1: Movies (Span 2) & Arts (Span 1) */}
          <div className="md:col-span-2 rounded-3xl bg-white border border-neutral-200 shadow-sm animate-pulse">
            {/* Inner gradient to mimic content */}
            <div className="w-full h-full bg-linear-to-br from-neutral-100 to-transparent opacity-50" />
          </div>
          <div className="md:col-span-1 rounded-3xl bg-white border border-neutral-200 shadow-sm animate-pulse delay-75" />

          {/* ROW 2: Music (Span 1) & Dance (Span 2) */}
          <div className="md:col-span-1 rounded-3xl bg-white border border-neutral-200 shadow-sm animate-pulse delay-100" />
          <div className="md:col-span-2 rounded-3xl bg-white border border-neutral-200 shadow-sm animate-pulse delay-150" />

          {/* ROW 3: Fashion, Astro, Literary (Span 1 each) */}
          <div className="md:col-span-1 rounded-3xl bg-white border border-neutral-200 shadow-sm animate-pulse delay-200" />
          <div className="md:col-span-1 rounded-3xl bg-white border border-neutral-200 shadow-sm animate-pulse delay-300" />
          <div className="md:col-span-1 rounded-3xl bg-white border border-neutral-200 shadow-sm animate-pulse delay-500" />
        </div>
      </section>
    </main>
  );
}
