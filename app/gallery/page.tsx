"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, GalleryHorizontal } from "lucide-react";
import { BentoGalleryGrid } from "@/components/ui/bento-gallery-grid";
import { sessionShuffle } from "@/lib/sessionShuffle";

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    async function loadImages() {
      const res = await fetch("/api/gallery");
      const images: string[] = await res.json();

      const shuffled = sessionShuffle<string>("milan-gallery-session", images);

      setGalleryImages(shuffled);
    }

    loadImages();
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Ambient Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/4 w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] right-1/4 w-[600px] h-[600px] bg-blue-900/30 rounded-full blur-[160px]" />
      </div>

      {/* Hero Header */}
      <section className="relative pt-40 pb-24 px-6 text-center z-10">
        {/* Badge */}
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

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, type: "spring" }}
          className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-neutral-500">
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
          className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mt-12"
        />
      </section>

      {/* Gallery Grid */}
      <section className="relative z-10 pb-32">
        <div className="container mx-auto px-4">
          {galleryImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}>
              <BentoGalleryGrid images={galleryImages} />
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
