'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import * as THREE from 'three'

const editions = [
  {
    year: "Milan '25",
    facts: ['National Participation', 'Multiple Stages', 'Expanded Footfall'],
    image: '/milan/timeline/2025.png'
  },
  {
    year: "Milan '24",
    facts: ['Four-Day Fest', 'Inter-College Events', 'Large Campus Activation'],
    image: '/milan/timeline/2024.png'
  },
  {
    year: "Milan '23",
    facts: ['Full-Scale Return', 'High Student Turnout', 'Cultural Showcase'],
    image: '/milan/timeline/2023.png'
  },
  {
    year: "Milan '22",
    facts: ['Rebuild Edition', 'Multi-Disciplinary Events', 'Strong Foundations'],
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
          height="2000"
          viewBox="0 0 600 2000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-80"
        >
          <motion.path
            d="M300 0
               C 500 200, 100 400, 300 600
               C 500 800, 100 1000, 300 1200
               C 500 1400, 100 1600, 300 2000"
            stroke="url(#pulse)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            style={{ pathLength }}
          />
          <defs>
            <linearGradient id="pulse" x1="0" y1="0" x2="0" y2="2000">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-30 max-w-6xl mx-auto flex flex-col gap-40 px-6">
        {editions.map((item, index) => {
          const left = index % 2 === 0
          return (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col md:flex-row items-center gap-12 ${
                left ? 'md:flex-row-reverse text-right' : ''
              }`}
            >
              <div className="w-full md:w-1/2">
                <h3 className="text-4xl md:text-5xl font-extrabold">
                  {item.year}
                </h3>
                <ul className={`mt-6 space-y-2 text-sm text-white/70 ${left ? 'ml-auto' : ''}`}>
                  {item.facts.map(f => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>

              <div className="relative w-full md:w-1/2 aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.year}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
