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
  // Video 1
  "https://assets.mixkit.co/videos/preview/mixkit-concert-crowd-lights-2993-large.mp4",
  // Additional images for grid effect
  "https://images.unsplash.com/photo-1514525253440-b393452e372e?q=80&h=800&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1459749411177-0473ef71607b?q=80&h=800&w=800&auto=format&fit=crop",
  // Video 2
  "https://assets.mixkit.co/videos/preview/mixkit-cheering-crowd-at-a-rock-concert-14115-large.mp4",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&h=800&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&h=800&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563841930606-67e26ce48b15?q=80&h=800&w=800&auto=format&fit=crop",
];

// ... imports remain the same
import { Sparkles } from "lucide-react";

// ... constants remain the same

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F7] text-neutral-900 pb-20 selection:bg-pink-200">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-100/40 via-transparent to-transparent" />
         <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-rose-100/40 via-transparent to-transparent" />
      </div>

      {/* Hero Header */}
      <section className="relative pt-40 pb-20 px-6 flex flex-col items-center text-center z-10">
        <div className="mb-8">
           <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 bg-white/50 backdrop-blur text-sm font-medium tracking-wide uppercase text-neutral-500">
             <Sparkles className="w-4 h-4 text-pink-500" />
             Captured Moments
           </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-neutral-900 mb-8">
           Gallery<span className="text-pink-500">.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl text-neutral-500 font-light leading-relaxed">
          A visual journey through the vibrant energy, performances, and memories of MILAN.
        </p>
      </section>

      <div className="container mx-auto px-4 relative z-10">
        <BentoGalleryGrid
          images={galleryImages}
          className=""
        />
      </div>
    </main>
  );
}
