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
    <section className="w-full bg-white dark:bg-neutral-950 py-16 md:py-24">
      <div className="w-full flex flex-col space-y-12 md:space-y-16">
        {/* Text Banner - Full Width */}
        <div className="w-full px-0">
          <ScrollVelocity velocity={-2}>Our Esteemed Guests</ScrollVelocity>
        </div>

        {/* Guest Cards - First Row (Left to Right) - Full Width */}
        <div className="w-full px-0">
          <ScrollVelocity velocity={velocity[0]}>
            {duplicatedGuests.map((guest, index) => (
              <div
                key={`${guest.name}-${index}`}
                className="relative h-[8rem] w-[12rem] md:h-[10rem] md:w-[15rem] xl:h-[14rem] xl:w-[20rem] flex-shrink-0 group mr-4 md:mr-6"
              >
                <div className="relative h-full w-full overflow-hidden rounded-lg">
                  <Image
                    src={guest.thumbnail}
                    alt={guest.name}
                    fill
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-sm md:text-base xl:text-lg mb-1">{guest.name}</h3>
                    <p className="text-xs md:text-sm xl:text-base text-white/90">{guest.designation}</p>
                  </div>
                </div>
              </div>
            ))}
          </ScrollVelocity>
        </div>

        {/* Guest Cards - Second Row (Right to Left) - Full Width */}
        <div className="w-full px-0">
          <ScrollVelocity velocity={velocity[1]}>
            {duplicatedGuests.map((guest, index) => (
              <div
                key={`${guest.name}-reverse-${index}`}
                className="relative h-[8rem] w-[12rem] md:h-[10rem] md:w-[15rem] xl:h-[14rem] xl:w-[20rem] flex-shrink-0 group mr-4 md:mr-6"
              >
                <div className="relative h-full w-full overflow-hidden rounded-lg">
                  <Image
                    src={guest.thumbnail}
                    alt={guest.name}
                    fill
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-sm md:text-base xl:text-lg mb-1">{guest.name}</h3>
                    <p className="text-xs md:text-sm xl:text-base text-white/90">{guest.designation}</p>
                  </div>
                </div>
              </div>
            ))}
          </ScrollVelocity>
        </div>
      </div>
    </section>
  )
}
