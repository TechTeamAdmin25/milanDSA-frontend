import { ImageData } from "@/components/ui/img-sphere";

export const IMAGES: ImageData[] = Array.from({ length: 60 }, (_, i) => ({
  id: `img-${i + 1}`,
  src: `/team/${(i % 6) + 1}.webp`,
  alt: `Team member ${i + 1}`,
  title: "Team Member",
  description: "Core team member",
}));
