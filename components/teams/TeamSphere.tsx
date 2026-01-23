"use client";

import dynamic from "next/dynamic";
import { ImageData } from "@/components/ui/img-sphere";

const SphereImageGrid = dynamic(() => import("@/components/ui/img-sphere"), {
  ssr: false,
  loading: () => (
    <div className="w-[300px] h-[300px] rounded-full bg-gray-200 animate-pulse" />
  ),
});

interface Props {
  images: ImageData[];
  size: number;
  radius: number;
  scale: number;
  selected: ImageData | null;
  onSelect: (img: ImageData | null) => void;
}

export function SphereSection({
  images,
  size,
  radius,
  scale,
  selected,
  onSelect,
}: Props) {
  return (
    <SphereImageGrid
      images={images}
      containerSize={size}
      sphereRadius={radius}
      baseImageScale={scale}
      autoRotate
      autoRotateSpeed={0.2}
      momentumDecay={0.96}
      maxRotationSpeed={6}
      perspective={1000}
      selectedImage={selected}
      onImageSelect={onSelect}
    />
  );
}
