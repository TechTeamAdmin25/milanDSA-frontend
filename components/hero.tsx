'use client'

import Image from "next/image"

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src="/milan/hero-main.png"
        alt="Milan SRM Cultural Fest"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <p className="tracking-widest text-sm md:text-base text-neutral-200">
          DIRECTORATE OF STUDENT AFFAIRS
        </p>

        <h1 className="mt-4 text-6xl md:text-8xl font-extrabold text-white">
          MILAN 2026
        </h1>

        <p className="mt-6 max-w-2xl text-base md:text-lg text-neutral-200">
          SRM Institute of Science and Technology’s National Cultural Festival
        </p>

        <div className="mt-10 flex gap-4">
          <a
            href="/events"
            className="group relative inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] active:scale-95"
          >
            <span className="relative z-10">Explore Events</span>
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-75" />
          </a>

          <a
            href="/gallery"
            className="group inline-flex items-center justify-center rounded-full border border-white/70 bg-black/20 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
          >
            View Gallery
          </a>
        </div>
      </div>
    </section>
  )
}
