'use client'

import { useEffect, useRef } from 'react'

const AWARDS = [
  { source: 'Forbes',                title: 'Women 2023',                    year: '2023', category: 'Women Leadership' },
  { source: 'Forbes',                title: 'Best School Education',         year: '2023', category: 'Education' },
  { source: 'Forbes',                title: 'Children-Friendly Environment', year: '2023', category: 'Environment' },
  { source: 'Forbes',                title: 'Customer Center Experience',    year: '2023', category: 'Excellence' },
  { source: 'Forbes',                title: 'Architecture',                  year: '2023', category: 'Design' },
  { source: 'Berlin Competition',    title: '2nd Stage Accepted',            year: '2023', category: 'Innovation' },
  { source: 'Ministry of Education', title: '100+ Staff Recognition',        year: '2023', category: 'Education' },
]

export default function Awards() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | null = null

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo('.award-row',
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0,
            stagger: 0.07,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.awards-list', start: 'top 78%' },
          }
        )
      }, sectionRef)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section ref={sectionRef} id="awards" className="py-28 lg:py-36 bg-wine">
      <div className="px-6 md:px-12 lg:px-20">

        {/* Header */}
        <div className="flex items-end justify-between mb-16 pb-8 border-b border-cream/10">
          <div>
            <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-blush/60 mb-3">
              Recognition
            </p>
            <h2
              className="font-display italic font-light text-cream leading-none"
              style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}
            >
              The record.
            </h2>
          </div>
          <p
            className="font-display italic font-light text-cream/10 leading-none hidden lg:block"
            style={{ fontSize: 'clamp(4rem, 8vw, 8rem)' }}
          >
            2023
          </p>
        </div>

        {/* Editorial list */}
        <div className="awards-list">
          {AWARDS.map((award, i) => (
            <div
              key={i}
              className="award-row group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-8 py-6 border-b border-cream/10 hover:pl-4 transition-all duration-400"
            >
              {/* Source */}
              <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-rose sm:w-44 flex-shrink-0">
                {award.source}
              </span>

              {/* Title */}
              <span
                className="font-display italic font-light text-cream flex-1 leading-snug"
                style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2.2rem)' }}
              >
                {award.title}
              </span>

              {/* Category + year */}
              <div className="flex items-center gap-6 sm:w-48 justify-end flex-shrink-0">
                <span className="font-sans text-[10px] tracking-widest uppercase text-cream/25 hidden md:block">
                  {award.category}
                </span>
                <span className="font-sans text-[11px] text-cream/35">{award.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
