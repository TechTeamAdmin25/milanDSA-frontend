import Image from "next/image";
import { ImageData } from "@/components/ui/img-sphere";

interface Props {
  hoveredConvenor: string | null;
  popupPosition: { x: number; y: number } | null;
  getRandomImage: (id: string) => ImageData;
}

export default function HoverPreview({
  hoveredConvenor,
  popupPosition,
  getRandomImage,
}: Props) {
  // Safety check: Don't render if we don't have an ID or a Position
  if (!hoveredConvenor || !popupPosition) return null;

  // Currently gets a random image.
  // (Note: To show the real person, you'd need to pass the real image data here instead of ID)
  const img = getRandomImage(hoveredConvenor);

  return (
    <div
      className="fixed z-50 pointer-events-none transition-opacity duration-200"
      style={{
        left: popupPosition.x,
        top: popupPosition.y,
        transform: "translateY(-50%)", // Centers the box vertically relative to the mouse/item
      }}>
      <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-200 shadow-xl bg-white">
        <Image
          src={img.src}
          alt={img.alt}
          width={96}
          height={96}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
