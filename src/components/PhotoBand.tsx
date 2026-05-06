'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function PhotoBand() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Parallax: image moves slower than scroll speed
      gsap.to('.photoband-img', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Label fade in
      gsap.from('.photoband-label', {
        scrollTrigger: { trigger: wrapRef.current, start: 'top 70%' },
        opacity: 0,
        y: 10,
        duration: 0.8,
        ease: 'power3.out',
      })
    }

    init()
  }, [])

  return (
    <div ref={wrapRef} className="relative overflow-hidden" style={{ height: 'clamp(40vh, 60vw, 70vh)' }}>
      {/* The image is slightly oversized so parallax has room */}
      <div className="photoband-img absolute inset-x-0 -top-[10%] -bottom-[10%]">
        <Image
          src="https://res.cloudinary.com/dedugs945/image/upload/v1725533578/IMG_1165_pcqsoa.jpg"
          alt="Solongo B. — Hugo Endowment Fund"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Ink tint — keeps brand palette coherent */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(26,23,20,0.3) 0%, rgba(26,23,20,0.15) 50%, rgba(26,23,20,0.45) 100%)' }}
        />
      </div>

      {/* Corner label */}
      <div className="photoband-label absolute bottom-7 left-6 md:left-12 lg:left-20 flex items-center gap-3">
        <span className="block w-8 h-px bg-cream/40" />
        <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-cream/50">
          Founder Spotlight
        </span>
      </div>
    </div>
  )
}
