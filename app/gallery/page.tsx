import ImageGallery from "@/components/ui/image-gallery";

const galleryImages = [
  // Concert
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&h=800&w=800&auto=format&fit=crop",
  // Performance
  "https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&h=800&w=800&auto=format&fit=crop",
  // DJ Night / Music Event
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&h=800&w=800&auto=format&fit=crop",
  // Fun / Celebration
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&h=800&w=800&auto=format&fit=crop",
  // Gaming
  "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&h=800&w=800&auto=format&fit=crop",
  // Crowd / Event
  "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&h=800&w=800&auto=format&fit=crop",
  // Art
  "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&h=800&w=800&auto=format&fit=crop",
  // Tech Expo
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&h=800&w=800&auto=format&fit=crop",
  // Fashion
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&h=800&w=800&auto=format&fit=crop",
];

export default function GalleryPage() {
  return (
    <div className="h-screen bg-background pt-24 overflow-hidden flex flex-col">
      <ImageGallery
        title="Festival Moments"
        description=""
        images={galleryImages}
        className="flex-1"
      />
    </div>
  );
}
