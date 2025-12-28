import { Hero } from "@/components/hero"
import { DirectorsManagersSection } from "@/components/directors-managers-section"
import { MilanTimelineSection } from "@/components/milan-timeline-section"
import { GuestShowcase } from "@/components/guest-showcase"

export default function Home() {
  return (
    <>
      <Hero />
      <DirectorsManagersSection />
      <MilanTimelineSection />
      <GuestShowcase />
    </>
  )
}
