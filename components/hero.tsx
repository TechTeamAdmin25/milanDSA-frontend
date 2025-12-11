'use client'

import CustomImageTrail from "@/components/CustomImageTrail"
import './ImageTrail.css'

export function Hero() {
  // Unsplash images that definitely exist - more images for longer trail
  const images = [
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    "https://images.unsplash.com/photo-1464822759844-d150f38e8c1b",
    "https://images.unsplash.com/photo-1471115853179-bb1d604434e0",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    "https://images.unsplash.com/photo-1418065460487-3e41a6c84d09",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
  ].map(url => `${url}?auto=format&fit=crop&w=800&q=80`)

  return (
    <div className="flex w-full h-screen justify-center items-center bg-white dark:bg-black relative overflow-hidden">
      {/* Image trail container - positioned to cover entire screen */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="w-full h-full">
          <CustomImageTrail items={images} />
            </div>
      </div>
      <h1 className="text-center text-7xl md:text-9xl font-bold z-10 select-none bg-clip-text text-transparent bg-gradient-to-r from-neutral-950 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400 pointer-events-none">
        Welcome to <br/>
        MILAN 26&apos;
      </h1>
    </div>
  )
}
