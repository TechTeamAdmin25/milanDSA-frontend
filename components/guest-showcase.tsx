"use client"

import { ScrollVelocity } from "@/components/ui/scroll-velocity"
import Image from "next/image"

interface Guest {
  name: string
  designation: string
  thumbnail: string
}

const guests: Guest[] = [
  {
    name: "Dr. Sarah Johnson",
    designation: "Tech Innovation Leader",
    thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=640&auto=format&fit=crop",
  },
  {
    name: "Michael Chen",
    designation: "Creative Director",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=640&auto=format&fit=crop",
  },
  {
    name: "Emily Rodriguez",
    designation: "Entrepreneur & Speaker",
    thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=640&auto=format&fit=crop",
  },
  {
    name: "David Kumar",
    designation: "Industry Expert",
    thumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=640&auto=format&fit=crop",
  },
  {
    name: "Lisa Anderson",
    designation: "Thought Leader",
    thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=640&auto=format&fit=crop",
  },
  {
    name: "James Wilson",
    designation: "Innovation Strategist",
    thumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=640&auto=format&fit=crop",
  },
  {
    name: "Priya Sharma",
    designation: "Digital Transformation Expert",
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=640&auto=format&fit=crop",
  },
  {
    name: "Robert Taylor",
    designation: "Business Consultant",
    thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=640&auto=format&fit=crop",
  },
]

// Duplicate guests multiple times for seamless infinite scrolling
const duplicatedGuests = [...guests, ...guests, ...guests, ...guests]

const velocity = [0.5, -0.5]

export function GuestShowcase() {
  return (
    <section className="relative w-full py-24 overflow-hidden bg-black text-white">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800/50 via-neutral-950 to-neutral-950 -z-10" />
      
      <div className="w-full flex flex-col space-y-16">
        {/* Section Header */}
        <div className="text-center px-4">
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-500 mb-4">
               Past Speakers & Guests
             </h2>
             <p className="text-neutral-400 max-w-2xl mx-auto">
               Inspiring minds that have graced our stages
             </p>
        </div>

        {/* Marquee Title wrapper if needed, or just remove if redundant with header. 
            Let's keep the scrolling title as a stylistic background element? 
            Actually, let's remove the huge scrolling text to make it cleaner and focus on the images.
        */}

        {/* Guest Cards - First Row (Left to Right) - Full Width */}
        <div className="w-full relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          
          <ScrollVelocity velocity={velocity[0]} className="py-4">
            {duplicatedGuests.map((guest, index) => (
              <div
                key={`${guest.name}-${index}`}
                className="relative h-[280px] w-[220px] md:h-[320px] md:w-[260px] flex-shrink-0 group mx-4 rounded-xl overflow-hidden border border-white/10 bg-neutral-900/50 backdrop-blur-sm"
              >
                  <Image
                    src={guest.thumbnail}
                    alt={guest.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-lg text-white mb-1 leading-tight">{guest.name}</h3>
                    <p className="text-xs font-medium text-indigo-400 tracking-wide uppercase">{guest.designation}</p>
                  </div>
              </div>
            ))}
          </ScrollVelocity>
        </div>

        {/* Guest Cards - Second Row (Right to Left) - Full Width */}
        <div className="w-full relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          <ScrollVelocity velocity={velocity[1]} className="py-4">
            {duplicatedGuests.map((guest, index) => (
              <div
                key={`${guest.name}-reverse-${index}`}
                 className="relative h-[280px] w-[220px] md:h-[320px] md:w-[260px] flex-shrink-0 group mx-4 rounded-xl overflow-hidden border border-white/10 bg-neutral-900/50 backdrop-blur-sm"
              >
                  <Image
                    src={guest.thumbnail}
                    alt={guest.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-lg text-white mb-1 leading-tight">{guest.name}</h3>
                    <p className="text-xs font-medium text-pink-400 tracking-wide uppercase">{guest.designation}</p>
                  </div>
              </div>
            ))}
          </ScrollVelocity>
        </div>
      </div>
    </section>
  )
}
