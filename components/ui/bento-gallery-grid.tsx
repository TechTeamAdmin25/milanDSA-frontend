"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { X } from "lucide-react"

interface BentoGalleryGridProps {
  images: string[]
  className?: string
}

export function BentoGalleryGrid({ images, className }: BentoGalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Pattern for grid spans
  // 0: Large Square (2x2)
  // 1: Small (1x1)
  // 2: Tall (1x2)
  // 3: Small (1x1)
  // 4: Wide (2x1)
  // 5: Small (1x1)
  // 6: Small (1x1)
  const getSpanClass = (index: number) => {
    const pattern = index % 7
    switch (pattern) {
      case 0:
        return "md:col-span-2 md:row-span-2"
      case 2:
        return "md:row-span-2"
      case 4:
        return "md:col-span-2"
      default:
        return "col-span-1 row-span-1"
    }
  }

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[250px] gap-4 p-4",
          className
        )}
      >
        {images.map((src, idx) => (
          <motion.div
            key={idx}
            className={cn(
              "relative overflow-hidden rounded-xl cursor-pointer group",
              getSpanClass(idx)
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            onClick={() => setSelectedImage(src)}
          >
            <Image
              src={src}
              alt={`Gallery image ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50 p-2"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <div className="relative w-full max-w-5xl h-[80vh]" onClick={e => e.stopPropagation()}>
             <Image
              src={selectedImage}
              alt="Selected gallery image"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}