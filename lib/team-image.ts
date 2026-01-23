import { ImageData } from "@/components/ui/img-sphere";

const BASE_IMAGES = [
  {
    src: "/team/1.webp",
    alt: "Image 1",
    title: "Mountain Landscape",
    description: "Golden hour mountains",
  },
  {
    src: "/team/2.webp",
    alt: "Image 2",
    title: "Portrait",
    description: "Natural portrait lighting",
  },
  {
    src: "/team/3.webp",
    alt: "Image 3",
    title: "Architecture",
    description: "Modern structures",
  },
  {
    src: "/team/4.webp",
    alt: "Image 4",
    title: "Nature",
    description: "Calm scenery",
  },
] as const;

export const IMAGES: ImageData[] = Array.from({ length: 60 }, (_, i) => {
  const base = BASE_IMAGES[i % BASE_IMAGES.length];
  return {
    id: `img-${i + 1}`,
    ...base,
    alt: `${base.alt} ${i + 1}`,
  };
});
