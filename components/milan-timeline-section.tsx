'use client';

import React, { useState } from 'react';
import { Timeline } from '@/components/ui/timeline';
import { FramerCarousel, CarouselItem } from '@/components/ui/framer-carousel';

// Milan '25 images (from 2024 timeline section)
const milan25Images: CarouselItem[] = [
  {
    id: 1,
    url: 'https://assets.aceternity.com/templates/startup-1.webp',
    title: 'Milan 25 Event',
  },
  {
    id: 2,
    url: 'https://assets.aceternity.com/templates/startup-2.webp',
    title: 'Milan 25 Event',
  },
  {
    id: 3,
    url: 'https://assets.aceternity.com/templates/startup-3.webp',
    title: 'Milan 25 Event',
  },
  {
    id: 4,
    url: 'https://assets.aceternity.com/templates/startup-4.webp',
    title: 'Milan 25 Event',
  },
];

// Milan '24 images (from early 2023 timeline section)
const milan24Images: CarouselItem[] = [
  {
    id: 1,
    url: 'https://assets.aceternity.com/pro/hero-sections.png',
    title: 'Milan 24 Event',
  },
  {
    id: 2,
    url: 'https://assets.aceternity.com/features-section.png',
    title: 'Milan 24 Event',
  },
  {
    id: 3,
    url: 'https://assets.aceternity.com/pro/bento-grids.png',
    title: 'Milan 24 Event',
  },
  {
    id: 4,
    url: 'https://assets.aceternity.com/cards.png',
    title: 'Milan 24 Event',
  },
];

// Milan '23 images (from changelog timeline section)
const milan23Images: CarouselItem[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=880&auto=format&fit=crop',
    title: 'Milan 23 Event',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=880&auto=format&fit=crop',
    title: 'Milan 23 Event',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=880&auto=format&fit=crop',
    title: 'Milan 23 Event',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=880&auto=format&fit=crop',
    title: 'Milan 23 Event',
  },
];

// Milan '22 images (from carousel example - first 4)
const milan22Images: CarouselItem[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1471899236350-e3016bf1e69e?q=80&w=880&auto=format&fit=crop',
    title: 'Milan 22 Event',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1539552678512-4005a33c64db?q=80&w=880&auto=format&fit=crop',
    title: 'Milan 22 Event',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1709983966747-58c311fa6976?q=80&w=880&auto=format&fit=crop',
    title: 'Milan 22 Event',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1683722319473-f851deb3fdf2?q=80&w=880&auto=format&fit=crop',
    title: 'Milan 22 Event',
  },
];

const allImages = [milan25Images, milan24Images, milan23Images, milan22Images];

export function MilanTimelineSection() {
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleTimelineIndexChange = (index: number) => {
    setActiveTimelineIndex(index);
    // Reset carousel to first image when timeline changes
    setCarouselIndex(0);
  };

  const timelineData = [
    {
      title: "Milan '25",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal leading-relaxed md:mt-0">
            Themed "Cosmic Odyssey", featured a stellar performance by Sunidhi Chauhan and hosted the national finals of RoboWars.
          </p>
          <div className="h-32 md:h-48"></div>
        </div>
      ),
    },
    {
      title: "Milan '24",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal leading-relaxed md:mt-0">
            "Retro Revival" brought back the 80s and 90s, with a memorable concert by the band The Local Train and a vintage gaming expo.
          </p>
          <div className="h-32 md:h-48"></div>
        </div>
      ),
    },
    {
      title: "Milan '23",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal leading-relaxed md:mt-0">
            With the theme "Digital Dreams", this edition saw Nucleya headline the EDM night and introduced a massive 48-hour hackathon.
          </p>
          <div className="h-32 md:h-48"></div>
        </div>
      ),
    },
    {
      title: "Milan '22",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal leading-relaxed md:mt-0">
            "Aqueous Realms" explored the mysteries of the deep, with a stunning laser show and a keynote by a renowned marine biologist.
          </p>
          <div className="h-32 md:h-48"></div>
        </div>
      ),
    },
  ];

  const currentImages = allImages[activeTimelineIndex] || milan25Images;

  return (
    <section className="w-full min-h-screen bg-white dark:bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-12">
          {/* Left Side - Timeline */}
          <div className="order-2 lg:order-1">
            <Timeline
              data={timelineData}
              onActiveIndexChange={handleTimelineIndexChange}
              heading="Milan Through The Years"
              description="A journey through the evolution of Milan, showcasing the themes, performances, and innovations that defined each edition."
            />
          </div>

          {/* Right Side - Carousel */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-40 h-fit lg:pt-25">
            <FramerCarousel
              items={currentImages}
              currentIndex={carouselIndex}
              onIndexChange={setCarouselIndex}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
