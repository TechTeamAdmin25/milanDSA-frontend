'use client'

import Image from "next/image"

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src="/milan/hero-main.jpg"
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
            className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-black"
          >
            Explore Events
          </a>

          <a
            href="/gallery"
            className="rounded-md border border-white/70 px-6 py-3 text-sm font-semibold text-white"
          >
            View Gallery
          </a>
        </div>
      </div>
    </section>
  )
}
