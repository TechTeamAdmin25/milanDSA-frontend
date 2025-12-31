'use client'

import { useState } from 'react'
import { Timeline } from '@/components/ui/timeline'
import { FramerCarousel, CarouselItem } from '@/components/ui/framer-carousel'

const timelineImages: CarouselItem[][] = [
  [
    { id: 1, url: '/milan/timeline/2025-1.jpg', title: 'Milan 2025' },
    { id: 2, url: '/milan/timeline/2025-2.jpg', title: 'Milan 2025' },
    { id: 3, url: '/milan/timeline/2025-3.jpg', title: 'Milan 2025' }
  ],
  [
    { id: 1, url: '/milan/timeline/2024-1.jpg', title: 'Milan 2024' },
    { id: 2, url: '/milan/timeline/2024-2.jpg', title: 'Milan 2024' },
    { id: 3, url: '/milan/timeline/2024-3.jpg', title: 'Milan 2024' }
  ],
  [
    { id: 1, url: '/milan/timeline/2023-1.jpg', title: 'Milan 2023' },
    { id: 2, url: '/milan/timeline/2023-2.jpg', title: 'Milan 2023' },
    { id: 3, url: '/milan/timeline/2023-3.jpg', title: 'Milan 2023' }
  ],
  [
    { id: 1, url: '/milan/timeline/2022-1.jpg', title: 'Milan 2022' },
    { id: 2, url: '/milan/timeline/2022-2.jpg', title: 'Milan 2022' },
    { id: 3, url: '/milan/timeline/2022-3.jpg', title: 'Milan 2022' }
  ]
]

export function MilanTimelineSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [carouselIndex, setCarouselIndex] = useState(0)

  const data = [
    {
      title: "Milan '25",
      content: (
        <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Milan 2025 expanded its national footprint with higher inter-college participation, larger audiences, and a stronger focus on large-scale cultural showcases across multiple stages.
        </p>
      )
    },
    {
      title: "Milan '24",
      content: (
        <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Milan 2024 emphasized creative diversity, featuring a balanced mix of performing arts, competitions, and campus-wide cultural engagement over multiple days.
        </p>
      )
    },
    {
      title: "Milan '23",
      content: (
        <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Milan 2023 marked a return to full-scale celebrations, drawing participants from institutions across the country and reinforcing Milan’s reputation as a national-level cultural festival.
        </p>
      )
    },
    {
      title: "Milan '22",
      content: (
        <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Milan 2022 focused on rebuilding student cultural engagement, setting the foundation for subsequent editions with strong participation and multi-disciplinary events.
        </p>
      )
    }
  ]

  return (
    <section className="w-full bg-white dark:bg-neutral-950 py-24">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12">
        <Timeline
          data={data}
          heading="Milan Through the Years"
          description="Tracing the growth of Milan as SRMIST’s flagship national cultural festival."
          onActiveIndexChange={(i) => {
            setActiveIndex(i)
            setCarouselIndex(0)
          }}
        />

        <div className="hidden lg:block sticky top-32 h-fit">
          <FramerCarousel
            items={timelineImages[activeIndex]}
            currentIndex={carouselIndex}
            onIndexChange={setCarouselIndex}
          />
        </div>
      </div>
    </section>
  )
}
