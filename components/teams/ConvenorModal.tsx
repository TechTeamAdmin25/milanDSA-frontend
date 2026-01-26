"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { ImageData } from "@/components/ui/img-sphere";

export default function ConvenorModal({
  convenor,
  onClose,
}: {
  convenor: ImageData | null;
  onClose: () => void;
}) {
  if (!convenor) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* IMAGE */}
        <div className="relative aspect-square">
          <Image
            src={convenor.src}
            alt={convenor.alt}
            fill
            className="object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors backdrop-blur-sm">
            <X size={18} />
          </button>
        </div>

        {/* NAME & POSITION */}
        <div className="p-5">
          {convenor.title && (
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {convenor.title}
            </h3>
          )}
          {convenor.description && (
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {convenor.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
