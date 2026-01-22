'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import * as THREE from 'three'

const editions = [
  {
    year: "Milan '25",
    facts: ['Time Travel Theme', '₹15 Lakh Prize Pool', '40+ Electrifying Events'],
    image: '/milan/timeline/2025.png'
  },
  {
    year: "Milan '24",
    facts: ['Streets Theme', '50,000+ Participants', '150+ Events'],
    image: '/milan/timeline/2024.png'
  },
  {
    year: "Milan '23",
    facts: ['₹9 Lakh Prize Pool', 'Celebrity Guests', 'Dynamic Student Showcases'],
    image: '/milan/timeline/2023.png'
  },
  {
    year: "Milan '22",
    facts: ['Legacy Rebuilt', 'South India Talent Hub', 'Multi-Disciplinary Arts'],
    image: '/milan/timeline/2022.png'
  }
]

export function MilanTimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x050505, 10, 40)

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.z = 18

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const geometry = new THREE.BufferGeometry()
    const count = 1200
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color: 0xa855f7,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    let frameId: number

    const animate = () => {
      points.rotation.y += 0.0006
      points.rotation.x += 0.0003
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }

    animate()

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white py-32 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black z-10" />

      <div className="absolute inset-0 flex justify-center pointer-events-none z-20">
        <svg
          width="600"
          height="3200"
          viewBox="0 0 600 3200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-80"
        >
          <motion.path
            d="M300 0
               C 500 250, 100 550, 300 800
               C 500 1050, 100 1350, 300 1600
               C 500 1850, 100 2150, 300 2400
               C 500 2650, 100 2950, 300 3200"
            stroke="url(#pulse)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            style={{ pathLength }}
          />
          <defs>
            <linearGradient id="pulse" x1="0" y1="0" x2="0" y2="3200">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-30 max-w-7xl mx-auto flex flex-col gap-32 px-6">
        {editions.map((item, index) => {
          const left = index % 2 === 0
          return (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${
                left ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Content Side */}
              <div className={`w-full md:w-1/2 flex flex-col justify-center ${left ? 'text-right items-end' : 'text-left items-start'}`}>
                <div className="space-y-6">
                    <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-200 to-purple-400">
                    {item.year}
                    </h3>
                    <div className={`h-1 w-24 bg-purple-500 rounded-full ${left ? 'ml-auto' : ''}`} />
                    <ul className="space-y-4">
                    {item.facts.map((f) => (
                        <li key={f} className="text-lg md:text-xl text-neutral-300 font-light tracking-wide flex items-center gap-3">
                            {!left && <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />}
                            {f}
                            {left && <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />}
                        </li>
                    ))}
                    </ul>
                </div>
              </div>

              {/* Image Side */}
              <div className="relative w-full md:w-1/2 group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl skew-y-1 transition-transform duration-700 group-hover:skew-y-0 group-hover:scale-[1.02]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <Image
                    src={item.image}
                    alt={item.year}
                    fill
                    className="object-cover"
                    />
                </div>
                {/* Decorative border offset */}
                <div className={`absolute inset-0 border-2 border-purple-500/30 rounded-2xl -z-10 translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 ${left ? '-skew-y-1' : 'skew-y-1'}`} />
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
