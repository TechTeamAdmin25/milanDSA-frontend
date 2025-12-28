'use client'

import Image from "next/image"

export default function Tickets() {


  return (
    <div className="relative w-full min-h-screen">
      {/* Hero Section with Background Image */}
      <div className="relative w-full h-screen overflow-hidden">
        <Image
          src="/BackgroundImages/TicketBackgroundImage.png"
          alt="Ticket Background"
          fill
          className="object-contain object-top"
          priority
        />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white z-10">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 drop-shadow-2xl">
              Tickets
            </h1>
            <p className="text-xl md:text-3xl mb-8 drop-shadow-xl opacity-95">
              Get your tickets for MILAN 26&apos;
            </p>
            <button className="bg-white text-black px-8 py-4 text-lg font-semibold rounded-full hover:bg-gray-100 transition-colors drop-shadow-xl">
              Purchase Tickets
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
