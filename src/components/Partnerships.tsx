'use client'

import { useEffect, useRef } from 'react'

const PARTNERS = [
  { name: 'Harvard Flourishing', note: 'Research Partner' },
  { name: 'Oxford', note: 'Academic Partner' },
  { name: 'MIT', note: 'Technology Partner' },
  { name: 'CNBC Mongolia', note: 'Media Partner' },
  { name: 'Nova Studio', note: 'Creative Partner' },
  { name: 'Ministry of Education', note: 'Government Partner' },
  { name: 'Oyutolgoi', note: 'Corporate Partner' },
  { name: 'NTV Mongolia', note: 'Broadcast Partner' },
  { name: 'Berlin Competition', note: '2nd Stage Accepted' },
  { name: 'Asian Development Bank', note: 'Development Partner' },
]

export default function Partnerships() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | null = null

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.from('.partner-cell', {
          scrollTrigger: { trigger: '.partners-grid', start: 'top 78%' },
          opacity: 0,
          y: 20,
          stagger: { amount: 0.6, from: 'start' },
          duration: 0.8,
          ease: 'power3.out',
        })
      }, sectionRef)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-cream">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-gold mb-3">
              Partners & Institutions
            </p>
            <h2
              className="font-display italic font-light text-ink leading-none"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
            >
              Trusted globally.
            </h2>
          </div>
        </div>

        <div className="partners-grid grid grid-cols-3 gap-px bg-ink/8">
          {PARTNERS.map((partner, i) => (
            <div
              key={i}
              className="partner-cell bg-cream flex flex-col items-center justify-center gap-1.5 py-10 px-4 group hover:bg-forest transition-colors duration-500"
            >
              <span className="font-sans font-medium text-[13px] tracking-wide text-ink/30 group-hover:text-cream/70 transition-colors duration-500 text-center leading-snug">
                {partner.name}
              </span>
              <span className="font-sans text-[10px] tracking-widest uppercase text-ink/18 group-hover:text-gold/50 transition-colors duration-500">
                {partner.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
