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
    <div className="fixed bottom-4 left-4 z-50 max-w-md w-full">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="relative aspect-square">
          <Image
            src={convenor.src}
            alt={convenor.alt}
            fill
            className="object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1">
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
