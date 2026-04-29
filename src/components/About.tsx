'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const STATS = [
  { value: 5,    suffix: '',  label: 'Fund Programs' },
  { value: 132,  suffix: '+', label: 'Kindergartens Reached' },
  { value: 142,  suffix: '+', label: 'Book Characters' },
  { value: 2028, suffix: '',  label: 'College Cohort Opens' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    let ctx: { revert: () => void } | null = null

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Portrait — simple slide-in from left, NO clipPath (risky)
        gsap.fromTo('.about-portrait',
          { x: -40, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1.3, ease: 'power3.out',
            scrollTrigger: { trigger: '.about-portrait', start: 'top 82%' },
          }
        )

        gsap.fromTo('.about-label',
          { opacity: 0, y: 12 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.about-label', start: 'top 85%' },
          }
        )

        gsap.fromTo('.about-quote',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: '.about-quote', start: 'top 80%' },
          }
        )

        gsap.fromTo('.about-bio p',
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: '.about-bio', start: 'top 82%' },
          }
        )

        // Counter animations
        counterRefs.current.forEach((el, i) => {
          if (!el) return
          const target = STATS[i].value
          gsap.fromTo(el,
            { textContent: 0 },
            {
              textContent: target,
              duration: 2.2,
              ease: 'power2.out',
              snap: { textContent: 1 },
              scrollTrigger: { trigger: el, start: 'top 88%' },
              onUpdate() { if (el) el.textContent = String(Math.round(Number(el.textContent))) },
            }
          )
        })
      }, sectionRef)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="bg-cream overflow-hidden">

      {/* ── Top: portrait + intro ── */}
      <div className="grid lg:grid-cols-[5fr_7fr]">

        {/* Portrait */}
        <div className="about-portrait relative h-[60vw] lg:h-screen overflow-hidden">
          <Image
            src="https://res.cloudinary.com/dedugs945/image/upload/v1725096685/hero-mobile-1_u19gys.png"
            alt="Solongo B."
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
          {/* Credential badge */}
          <div className="absolute bottom-6 left-6 bg-ink/85 backdrop-blur-sm px-5 py-4">
            <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-rose mb-1">Forbes</p>
            <p className="font-display italic font-light text-cream text-2xl leading-none">5× Award</p>
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-cream/40 mt-1">Winner · 2023</p>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 md:px-12 lg:px-16 py-20 lg:py-32 flex flex-col justify-center space-y-10">
          <p className="about-label font-sans text-[11px] tracking-[0.35em] uppercase text-rose">
            Mission
          </p>
          <blockquote
            className="about-quote font-display italic font-light text-ink leading-[1.05]"
            style={{ fontSize: 'clamp(2rem, 4vw, 4.2rem)' }}
          >
            "Education is the one asset that compounds forever."
          </blockquote>

          <div className="about-bio space-y-4">
            <p className="font-sans text-[15px] leading-[1.9] text-ink/60">
              Solongo B. is a Mongolian educational innovator dedicated to building sustainable,
              debt-free futures for children and families. Through the Hugo Endowment Fund she runs
              five flagship programs spanning pre-school ecosystems, longevity research, career
              architecture, and global family education.
            </p>
            <p className="font-sans text-[15px] leading-[1.9] text-ink/60">
              Recognised by Forbes five times and endorsed by the Mongolian Ministry of Education,
              her children's book series <em>Oyunii Umch</em> features 142+ original characters now
              embedded in kindergarten curricula nationwide.
            </p>
          </div>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-ink/8">
        {STATS.map((stat, i) => (
          <div
            key={i}
            className={`px-8 py-12 lg:py-16 ${i < 3 ? 'border-r border-ink/8' : ''}`}
          >
            <p
              className="font-display font-light text-wine leading-none mb-2"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)' }}
            >
              <span ref={(el) => { counterRefs.current[i] = el }}>{stat.value}</span>
              <span>{stat.suffix}</span>
            </p>
            <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-ink/40">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
