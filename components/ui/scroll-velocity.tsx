"use client"

import * as React from "react"

import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame, wrap } from "framer-motion"

import { cn } from "@/lib/utils"

interface ScrollVelocityProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode[] | string
  velocity: number
  movable?: boolean
  clamp?: boolean
}

const ScrollVelocity = React.forwardRef<HTMLDivElement, ScrollVelocityProps>(
  ({ children, velocity = 5, movable = true, clamp = false, className, ...props }, ref) => {
    const baseX = useMotionValue(0)
    const { scrollY } = useScroll()
    const scrollVelocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 100,
    })
    const velocityFactor = useTransform(smoothVelocity, [0, 10000], [0, 5], {
      clamp,
    })
    const directionFactor = React.useRef<number>(1)
    const scrollThreshold = React.useRef<number>(5)

    useAnimationFrame((t, delta) => {
      if (movable) {
        move(delta)
      } else {
        if (Math.abs(scrollVelocity.get()) >= scrollThreshold.current) {
          move(delta)
        }
      }
    })

    function move(delta: number) {
      let moveBy = directionFactor.current * velocity * (delta / 1000)
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1
      }
      moveBy += directionFactor.current * moveBy * velocityFactor.get()
      baseX.set(baseX.get() + moveBy)
    }

    // Calculate wrap range based on content type
    // For text with 20 duplicates, wrap at -50% (half the content)
    // For other content with 3 duplicates, wrap at -33.33%
    const isString = typeof children === "string"
    const wrapRange = isString ? -50 : -33.33
    const x = useTransform(baseX, (v) => `${wrap(0, wrapRange, v)}%`)

    return (
      <div
        ref={ref}
        className={cn("relative m-0 flex flex-nowrap overflow-hidden whitespace-nowrap leading-[0.8] tracking-[-2px]", className)}
        {...props}
      >
        <motion.div
          className="flex flex-row flex-nowrap whitespace-nowrap text-xl font-semibold uppercase md:text-2xl xl:text-4xl"
          style={{ x }}
        >
          {typeof children === "string" ? (
            <>
              {Array.from({ length: 20 }).map((_, idx) => (
                <span key={idx} className="inline-block mr-8 md:mr-12 xl:mr-16">{children}</span>
              ))}
            </>
          ) : (
            <>
              {children}
              {children}
              {children}
            </>
          )}
        </motion.div>
      </div>
    )
  }
)

ScrollVelocity.displayName = "ScrollVelocity"

export { ScrollVelocity, type ScrollVelocityProps }
