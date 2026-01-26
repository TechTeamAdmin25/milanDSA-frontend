"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wand2, ArrowRight, Palette } from "lucide-react";
import { UploadModal } from "@/components/explore/upload-modal";
import { AIGeneratorModal } from "@/components/explore/ai-generator-modal";

// Interface for props to ensure type safety
interface PolaroidProps {
  rotate: string;
  label: string;
  delay: number;
  artId: number;
}

const Polaroid = ({ rotate, label, delay, artId }: PolaroidProps) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotate: 0 }}
    whileInView={{ opacity: 1, y: 0, rotate: rotate }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay }}
    className="relative group cursor-pointer"
    style={{ rotate }}>
    <div className="w-64 bg-white p-4 pb-16 shadow-2xl transform transition-transform duration-300 hover:scale-105 hover:z-10 hover:rotate-0 border border-neutral-200">
      {/* Fixed aspect ratio and gradient syntax */}
      <div className="aspect-4/5 bg-neutral-200 overflow-hidden relative">
        <div className="absolute inset-0 bg-linear-to-br from-neutral-200 to-neutral-300 group-hover:from-purple-200 group-hover:to-blue-200 transition-colors duration-500" />
        <div className="absolute inset-0 flex items-center justify-center text-neutral-400 font-mono text-xs uppercase tracking-widest">
          {label}
        </div>
      </div>
      <div className="absolute bottom-6 left-0 w-full text-center px-4">
        <p className="font-handwriting text-neutral-600 text-sm font-medium opacity-70">
          Generated Art #{artId}
        </p>
      </div>
    </div>
  </motion.div>
);

export default function ExplorePage() {
  const [student] = useState<{ full_name: string } | null>(() => {
    if (typeof window === "undefined") return null;
    const storedName = localStorage.getItem("studentName");
    return { full_name: storedName || "Guest Explorer" };
  });

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  // Prefixed unused variables with underscore to satisfy linter
  const handleUpload = async (_file: File, _hashtags: string[]) => {
    if (!student) return;
    // Upload logic placeholder
  };

  return (
    <div className="bg-black text-white selection:bg-purple-500/30 overflow-x-hidden">
      {/* Background Ambience (Fixed) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 blur-[120px] rounded-full" />
      </div>

      {/* WRAPPER: DARK SECTION 
          This wrapper has min-h-screen, ensuring the white section 
          is pushed below the fold initially.
      */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center pb-20">
        {/* 1. HERO SECTION */}
        <section className="pt-32 pb-20 flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-8">
              <span className="px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium tracking-[0.2em] uppercase text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                Experience The Magic
              </span>
            </motion.div>

            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-6 text-white leading-none">
              Design<span className="text-purple-500">.</span>
            </h1>

            <p className="text-xl md:text-2xl text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
              Self-design posters with AI. <br className="hidden md:block" />
              Explore the celebrations that define our culture.
            </p>
          </motion.div>
        </section>

        {/* 2. POLAROID SHOWCASE (Dark Background) */}
        <section className="px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 opacity-60">
              <p className="text-sm uppercase tracking-widest text-neutral-500">
                Recent Creations
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-8 perspective-1000">
              <Polaroid
                rotate="-6deg"
                label="Cyberpunk City"
                delay={0.2}
                artId={842}
              />
              <Polaroid
                rotate="6deg"
                label="Abstract Fluids"
                delay={0.4}
                artId={159}
              />
              <Polaroid
                rotate="-3deg"
                label="Neon Portrait"
                delay={0.6}
                artId={304}
              />
              <Polaroid
                rotate="4deg"
                label="Retro Wave"
                delay={0.8}
                artId={991}
              />
            </div>
          </div>
        </section>
      </div>

      {/* 3. WHITE TINT SECTION (Reveals on Scroll) */}
      <section className="relative z-20 py-32 px-4 bg-neutral-50 text-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 opacity-60">
            <p className="text-sm uppercase tracking-widest text-neutral-500">
              Community Gallery
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-8 perspective-1000">
            {/* New set of 4 Polaroids with different rotations/IDs */}
            <Polaroid
              rotate="3deg"
              label="Minimalist Geo"
              delay={0.2}
              artId={124}
            />
            <Polaroid
              rotate="-5deg"
              label="Vaporwave"
              delay={0.4}
              artId={567}
            />
            <Polaroid
              rotate="5deg"
              label="Glitch Art"
              delay={0.6}
              artId={890}
            />
            <Polaroid
              rotate="-4deg"
              label="Surreal Dream"
              delay={0.8}
              artId={231}
            />
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setAiModalOpen(true)}
          className="w-16 h-16 rounded-full bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center justify-center relative overflow-hidden group border-2 border-transparent hover:border-purple-500 transition-colors">
          {/* Fixed gradient syntax */}
          <div className="absolute inset-0 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          <Sparkles className="w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform" />
        </motion.button>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {uploadModalOpen && (
          <UploadModal
            isOpen={uploadModalOpen}
            onClose={() => setUploadModalOpen(false)}
            onUpload={handleUpload}
            studentName={student?.full_name}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {aiModalOpen && (
          <AIGeneratorModal
            isOpen={aiModalOpen}
            onClose={() => setAiModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
