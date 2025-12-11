import { Hero } from "@/components/hero"
import { MilanTimelineSection } from "@/components/milan-timeline-section"
import { GuestShowcase } from "@/components/guest-showcase"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Hero />
      <MilanTimelineSection />
      <GuestShowcase />
    </>
  )
}
