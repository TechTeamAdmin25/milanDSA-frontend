"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GalleryHorizontal } from "lucide-react";
import { BentoGalleryGrid } from "@/components/ui/bento-gallery-grid";
import { sessionShuffle } from "@/lib/sessionShuffle";

export function GalleryClient({ initialImages }: { initialImages: string[] }) {
  // Initialize with server data to ensure first paint matches server HTML
  const [galleryImages, setGalleryImages] = useState<string[]>(initialImages);

  useEffect(() => {
    // FIX 1: Wrap the state update in setTimeout.
    // This moves the execution to the next event loop tick, clearing the
    // "synchronous setState" error and preventing render blocking.
    const timer = setTimeout(() => {
      const shuffled = sessionShuffle<string>(
        "milan-gallery-session",
        initialImages,
      );
      setGalleryImages(shuffled);
    }, 0);

    return () => clearTimeout(timer);
  }, [initialImages]);

  return (
    <>
      {/* Hero Header */}
      <section className="relative pt-40 pb-24 px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-purple-300 text-sm mb-8">
          <GalleryHorizontal size={14} />
          <span className="uppercase tracking-widest font-semibold">
            Milan Moments
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, type: "spring" }}
          // FIX 2: Updated to Tailwind v4 syntax (bg-linear-to-br)
          className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-white via-neutral-200 to-neutral-500">
          Gallery
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-neutral-400 font-light leading-relaxed">
          A visual archive of energy, expression, and unforgettable nights —
          where <span className="text-purple-300">culture</span>,{" "}
          <span className="text-blue-300">music</span>, and{" "}
          <span className="text-white">memories</span> collide.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 140 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          // FIX 3: Updated to Tailwind v4 syntax (bg-linear-to-r)
          className="h-1 bg-linear-to-r from-purple-500 to-blue-500 rounded-full mx-auto mt-12"
        />
      </section>

      {/* Gallery Grid */}
      <section className="relative z-10 pb-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            {/* The grid will re-render with shuffled images once the effect runs */}
            <BentoGalleryGrid images={galleryImages} />
          </motion.div>
        </div>
      </section>
    </>
  );
}
