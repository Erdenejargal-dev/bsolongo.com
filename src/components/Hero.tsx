'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const LINE1 = ['Building', 'futures']
const LINE2 = ["that", "can't", 'be', 'taken', 'away']

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | null = null

    const runAnim = async () => {
      const { gsap } = await import('gsap')
      ctx = gsap.context(() => {
        gsap.timeline()
          .from('.hero-word',
            { y: '105%', duration: 1.1, stagger: 0.065, ease: 'power4.out' })
          .from('.hero-label',
            { opacity: 0, y: 10, duration: 0.7, ease: 'power3.out' }, '-=0.8')
          .from('.hero-descriptor',
            { opacity: 0, y: 14, duration: 0.7, ease: 'power3.out' }, '-=0.6')
          .from('.hero-btn',
            { opacity: 0, y: 14, stagger: 0.1, duration: 0.6, ease: 'power3.out' }, '-=0.5')
          .from('.hero-meta',
            { opacity: 0, duration: 0.6 }, '-=0.4')
      }, sectionRef)
    }

    const onExiting = () => runAnim()
    window.addEventListener('preloaderExiting', onExiting, { once: true })
    const fallback = setTimeout(runAnim, 2500)

    return () => {
      ctx?.revert()
      window.removeEventListener('preloaderExiting', onExiting)
      clearTimeout(fallback)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-end bg-ink overflow-hidden"
    >
      {/* ── Photo ── */}
      <Image
        src="https://res.cloudinary.com/dedugs945/image/upload/v1725095740/hero-1_z7chj7.png"
        alt="Solongo B."
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* ── Overlay: left-side readable, right lets the photo breathe ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(110deg, rgba(58,5,25,0.82) 0%, rgba(58,5,25,0.52) 48%, rgba(58,5,25,0.08) 100%)',
        }}
      />
      {/* Bottom fade so footer content area is always readable */}
      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{ background: 'linear-gradient(to top, rgba(58,5,25,0.7), transparent)' }}
      />

      {/* ── Top-right credential strip ── */}
      <div className="hero-meta absolute top-28 right-6 md:right-12 lg:right-20 text-right hidden lg:flex flex-col gap-3">
        {[
          { label: 'Forbes', value: '5× Award' },
          { label: 'Harvard · Oxford · MIT', value: 'Partner' },
          { label: 'Ministry of Education', value: 'Endorsed' },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col items-end gap-0.5">
            <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-cream/30">{label}</span>
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-blush/70">{value}</span>
          </div>
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-44 pb-24">
        <p className="hero-label font-sans text-[11px] tracking-[0.35em] uppercase text-blush mb-8">
          Founder · Hugo Endowment Fund · Mongolia
        </p>

        <h1
          className="font-display font-light italic leading-[0.88] mb-10"
          style={{ fontSize: 'clamp(3.2rem, 10.5vw, 10.5rem)' }}
        >
          <span className="block">
            {LINE1.map((word, i) => (
              <span key={i} className="clip-text inline-block mr-[0.18em]">
                <span className="hero-word inline-block text-cream">{word}</span>
              </span>
            ))}
          </span>
          <span className="block">
            {LINE2.map((word, i) => (
              <span key={i} className="clip-text inline-block mr-[0.18em]">
                <span className={`hero-word inline-block ${i === 0 ? 'text-blush' : 'text-cream'}`}>
                  {word}
                </span>
              </span>
            ))}
          </span>
        </h1>

        <p className="hero-descriptor font-sans text-sm leading-loose text-cream/50 max-w-xs mb-10">
          Mongolian educational innovator. Forbes award winner.
          <br />Building debt-free futures since 2020.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <a
            href="#fund"
            className="hero-btn inline-flex items-center justify-center px-8 py-3.5 border border-cream/20 text-cream font-sans text-[11px] tracking-[0.25em] uppercase hover:bg-cream/10 transition-all duration-300"
          >
            Explore the Fund
          </a>
          <a
            href="#college"
            className="hero-btn inline-flex items-center justify-center px-8 py-3.5 border border-blush/40 text-blush font-sans text-[11px] tracking-[0.25em] uppercase hover:bg-blush/10 transition-all duration-300"
          >
            College 2028 Waitlist
          </a>
        </div>

        {/* Scroll cue */}
        <div className="flex items-center gap-3">
          <span className="block w-10 h-px bg-cream/25" />
          <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-cream/25">Scroll</span>
        </div>
      </div>
    </section>
  )
}
