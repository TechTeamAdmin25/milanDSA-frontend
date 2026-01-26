"use client"

import { ScrollVelocity } from "@/components/ui/scroll-velocity"
import Image from "next/image"
import { motion } from "framer-motion"

interface Guest {
  name: string
  designation: string
  thumbnail: string
}

const row1Guests: Guest[] = [
  {
    name: "Shreya Ghoshal",
    designation: "Playback Singer",
    thumbnail: "/milan/guests/Shreya-Ghoshal-Photoshoot-v2.png",
  },
  {
    name: "Asha Bhosle",
    designation: "Legendary Singer",
    thumbnail: "/milan/guests/asha_bhosle.png",
  },
  {
    name: "Vijay Deverakonda",
    designation: "Actor",
    thumbnail: "/milan/guests/Vijay_devarakonda.png",
  },
  {
    name: "Kamal Haasan",
    designation: "Legendary Actor",
    thumbnail: "/milan/guests/Kamal_Hasan.png",
  },
  {
    name: "Aditya Roy Kapur",
    designation: "Actor",
    thumbnail: "/milan/guests/Aditya_Roy_Kapur.png",
  },
  {
    name: "John Abraham",
    designation: "Actor",
    thumbnail: "/milan/guests/John-Abraham-feature.png",
  },
  {
    name: "Amit Trivedi",
    designation: "Music Composer",
    thumbnail: "/milan/guests/amit_trivedi.png",
  },
  {
    name: "Bassjackers",
    designation: "DJ Duo",
    thumbnail: "/milan/guests/bassjackers.png",
  },
  {
    name: "Vishal–Shekhar",
    designation: "Music Duo",
    thumbnail: "/milan/guests/Vishal_shekar.png",
  },
  {
    name: "Mammootty",
    designation: "Legendary Actor",
    thumbnail: "/milan/guests/mammothy.png",
  },
  {
    name: "Devi Sri Prasad",
    designation: "Music Composer",
    thumbnail: "/milan/guests/devi_sri_prasad.png",
  },
  {
    name: "Jonita Gandhi",
    designation: "Playback Singer",
    thumbnail: "/milan/guests/jonita_gandhi-v2.png",
  },
  {
    name: "Vidya Vox",
    designation: "Singer",
    thumbnail: "/milan/guests/vidya_vox.png",
  },
]

const row2Guests: Guest[] = [
  {
    name: "Nani",
    designation: "Natural Star",
    thumbnail: "/milan/guests/nani.png",
  },
  {
    name: "Shruti Haasan",
    designation: "Actor & Singer",
    thumbnail: "/milan/guests/shruti_hasaan.png",
  },
  {
    name: "Kayadu Lohar",
    designation: "Actor",
    thumbnail: "/milan/guests/kayadu_lohar.png",
  },
  {
    name: "Thaman S",
    designation: "Music Composer",
    thumbnail: "/milan/guests/Thaman_S.png",
  },
  {
    name: "Taapsee Pannu",
    designation: "Actor",
    thumbnail: "/milan/guests/taapsee_pannu.png",
  },
  {
    name: "Rakul Preet Singh",
    designation: "Actor",
    thumbnail: "/milan/guests/rakul-preet-singh.png",
  },
  {
    name: "Abish Mathew",
    designation: "Comedian",
    thumbnail: "/milan/guests/Abish-Mathew.png",
  },
  {
    name: "Sorabh Pant",
    designation: "Comedian",
    thumbnail: "/milan/guests/sorabh_pant.png",
  },
  {
    name: "Diego Miranda",
    designation: "DJ",
    thumbnail: "/milan/guests/diego_Miranda.png",
  },
  {
    name: "KEVU",
    designation: "DJ",
    thumbnail: "/milan/guests/SOMNII-KEVU.png",
  },
  {
    name: "Ritviz",
    designation: "Musician",
    thumbnail: "/milan/guests/ritviz.png",
  },
  {
    name: "Thaikkudam Bridge",
    designation: "Band",
    thumbnail: "/milan/guests/thaikuddam_bridge.png",
  },
  {
    name: "Andrea Jeremiah",
    designation: "Actor & Singer",
    thumbnail: "/milan/guests/andrea_jeremeiah.png",
  },
]

const velocity = [0.5, -0.5]

export function GuestShowcase() {
  // Duplicate for seamless infinite scroll motion matching previous behavior
  const row1 = [...row1Guests, ...row1Guests, ...row1Guests, ...row1Guests]
  const row2 = [...row2Guests, ...row2Guests, ...row2Guests, ...row2Guests]

  return (
    <section className="relative w-full py-24 overflow-hidden text-neutral-900">
      {/* Solid Base Background */}
      <div className="absolute inset-0 bg-neutral-50 -z-20" />

      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, 100, 0],
              y: [0, -50, 0]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[100px]" 
          />
          <motion.div 
             animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, -100, 0],
              y: [0, 50, 0]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px]" 
          />
      </div>
      
      <div className="w-full flex flex-col space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center px-4">
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-neutral-800 to-blue-600">
                  Our Past Headliners
                </span>
             </h2>
             <p className="text-neutral-600 max-w-2xl mx-auto text-lg font-light">
               The stars who made Milan unforgettable
             </p>
        </div>

        {/* Marquee Title wrapper if needed, or just remove if redundant with header. 
            Let's keep the scrolling title as a stylistic background element? 
            Actually, let's remove the huge scrolling text to make it cleaner and focus on the images.
        */}

        {/* Guest Cards - First Row (Left to Right) - Full Width */}
        <div className="w-full relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-50 to-transparent z-10 pointer-events-none" />
          
          <ScrollVelocity velocity={velocity[0]} className="py-4">
            {row1.map((guest, index) => (
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
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-50 to-transparent z-10 pointer-events-none" />

          <ScrollVelocity velocity={velocity[1]} className="py-4">
            {row2.map((guest, index) => (
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
