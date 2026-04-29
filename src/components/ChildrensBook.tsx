'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function ChildrensBook() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | null = null

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.from('.book-cover', {
          scrollTrigger: { trigger: '.book-cover', start: 'top 78%' },
          scale: 0.92,
          opacity: 0,
          duration: 1.3,
          ease: 'power3.out',
        })
        gsap.from('.book-copy > *', {
          scrollTrigger: { trigger: '.book-copy', start: 'top 80%' },
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 1,
          ease: 'power3.out',
        })
      }, sectionRef)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section ref={sectionRef} id="book" className="py-32 lg:py-48 bg-cream">
      <div className="px-6 md:px-12 lg:px-20 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Book cover — real square photo */}
        <div className="book-cover relative mx-auto max-w-sm lg:max-w-none">
          {/* Soft shadow */}
          <div className="absolute -inset-6 bg-ink/8 blur-3xl rounded-sm" />

          {/* Square image */}
          <div className="relative aspect-square overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dedugs945/image/upload/v1725099268/channels4_profile_th9pt6.jpg"
              alt="Oyunii Umch — Children's Book by Solongo B."
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 45vw"
            />
            {/* Subtle brand tint on hover area */}
            <div className="absolute inset-0 bg-forest/10 mix-blend-multiply" />
          </div>

          {/* Badge */}
          <div className="absolute -top-3 -right-3 bg-gold text-ink font-sans text-[10px] tracking-[0.2em] uppercase px-4 py-2 z-10">
            142+ Characters
          </div>

          {/* Bottom label strip */}
          <div className="bg-ink px-5 py-3 flex items-center justify-between">
            <span className="font-display italic text-cream text-lg">Oyunii Umch</span>
            <span className="font-sans text-[10px] tracking-widest uppercase text-cream/35">
              NTV · MoE
            </span>
          </div>
        </div>

        {/* Editorial copy */}
        <div className="book-copy space-y-6">
          <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-gold">
            Children's Education
          </p>

          <h2
            className="font-display italic font-light text-ink leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
          >
            Stories that shape
            <br />
            who they become.
          </h2>

          <p className="font-sans text-[15px] leading-loose text-ink/65">
            <em>Oyunii Umch</em> ("Treasure of the Mind") is Solongo B.'s landmark children's book
            series — 142 original characters who teach Mongolian children about curiosity, resilience,
            and the power of education. Endorsed by the Ministry of Education and adapted for NTV Mongolia.
          </p>

          <p className="font-sans text-[15px] leading-loose text-ink/65">
            The series is now embedded in 132+ kindergarten curricula across Mongolia through the
            Life Tree program, making these characters part of an entire generation's formative years.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {["Children's Education", 'Mongolian Literature', 'NTV Partner', 'Ministry Endorsed'].map(
              (tag) => (
                <span
                  key={tag}
                  className="font-sans text-[10px] tracking-widest uppercase text-forest border border-forest/25 px-3 py-1.5"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          <div className="pt-4">
            <a
              href="#"
              className="inline-flex items-center gap-3 font-sans text-[11px] tracking-[0.25em] uppercase text-forest border-b border-forest/40 pb-1 hover:opacity-60 transition-opacity"
            >
              Read More About the Series <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
