import { BentoGalleryGrid } from "@/components/ui/bento-gallery-grid";

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
  // Additional images for grid effect
  "https://images.unsplash.com/photo-1514525253440-b393452e372e?q=80&h=800&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1459749411177-0473ef71607b?q=80&h=800&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&h=800&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&h=800&w=800&auto=format&fit=crop",
   "https://images.unsplash.com/photo-1563841930606-67e26ce48b15?q=80&h=800&w=800&auto=format&fit=crop",
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Festival Moments</h1>
        <p className="text-muted-foreground">Capturing the spirit of Milan through the years.</p>
      </div>
      <div className="container mx-auto">
        <BentoGalleryGrid
          images={galleryImages}
          className=""
        />
      </div>
    </div>
  );
}
