'use client'

import { useEffect, useRef } from 'react'

const PROJECTS = [
  {
    num: '01',
    name: 'Zugtaalt',
    tagline: '40 · 40 · 20 Nobel theory, debt-free futures',
    desc: 'A Nobel-backed framework that restructures how families invest in education — allocating resources across three life phases to guarantee a debt-free future for every child.',
    bg: 'bg-ink',
    fg: 'text-cream',
    accent: 'text-blush',
    frameRgba: 'rgba(247,243,238,',
    cta: 'Explore Model',
  },
  {
    num: '02',
    name: 'Longevity Club',
    tagline: 'Long-arc human vitality program',
    desc: 'Designed for sustained peak performance across decades — not just career phases. A membership program at the intersection of science, habit, and community.',
    bg: 'bg-wine',
    fg: 'text-cream',
    accent: 'text-blush',
    frameRgba: 'rgba(247,243,238,',
    cta: 'Apply Now',
  },
  {
    num: '03',
    name: 'Human Career Program',
    tagline: 'Personal career + AI application coach',
    desc: 'Bespoke career architecture paired with AI-powered coaching tools. Designed for the next generation of Mongolian leaders pursuing global opportunities.',
    bg: 'bg-cream',
    fg: 'text-ink',
    accent: 'text-wine',
    frameRgba: 'rgba(58,5,25,',
    cta: 'Apply Now',
  },
  {
    num: '04',
    name: 'Life Tree',
    tagline: 'Pre-school ecosystem, 132+ kindergarten partners',
    desc: 'Early childhood as infrastructure. Life Tree partners with 132+ kindergartens across Mongolia to deliver a research-backed, holistic early education curriculum.',
    bg: 'bg-blush',
    fg: 'text-ink',
    accent: 'text-wine',
    frameRgba: 'rgba(58,5,25,',
    cta: 'View Network',
  },
  {
    num: '05',
    name: 'World Family Academy',
    tagline: "Family certification, expecting mothers' community",
    desc: "Because parenting is the world's most consequential skill. A certification program and global community for expecting and new mothers building intentional families.",
    bg: 'bg-ink',
    fg: 'text-cream',
    accent: 'text-rose',
    frameRgba: 'rgba(247,243,238,',
    cta: 'Join Community',
  },
]

export default function FundProjects() {
  const outerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressFillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const track = trackRef.current
    if (!outer || !track) return
    if (window.innerWidth < 768) return

    let ctx: { revert: () => void } | null = null

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Use offsetWidth (CSS-computed) rather than scrollWidth to avoid any
        // influence from the overflow:hidden parent on the reported width.
        const totalScroll = () => track.offsetWidth - window.innerWidth

        gsap.to(track, {
          x: () => -totalScroll(),
          ease: 'none',
          scrollTrigger: {
            trigger: outer,
            pin: true,
            scrub: 1.2,
            end: () => `+=${totalScroll()}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressFillRef.current) {
                progressFillRef.current.style.width = `${self.progress * 100}%`
              }
            },
          },
        })
      }, outer)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <div id="fund" className="bg-ink">
      {/* Section header */}
      <div className="px-6 md:px-12 lg:px-20 pt-28 pb-10">
        <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-blush/70 mb-4">
          Hugo Endowment Fund
        </p>
        <h2
          className="font-display italic font-light text-cream leading-none"
          style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)' }}
        >
          Five Programs.
          <br />
          <span className="text-rose">One Mission.</span>
        </h2>
        <p className="mt-6 font-sans text-[11px] tracking-[0.2em] uppercase text-cream/25 hidden md:block">
          Scroll to explore →
        </p>
      </div>

      {/* ── Desktop: pinned horizontal scroll ── */}
      <div
        ref={outerRef}
        className="hidden md:block relative bg-ink"
        style={{ height: '100vh', overflow: 'hidden' }}
      >
        <div
          ref={trackRef}
          className="flex"
          style={{ width: `${PROJECTS.length * 100}vw`, height: '100vh' }}
        >
          {PROJECTS.map((p, i) => (
            <div
              key={i}
              className={`${p.bg} flex-shrink-0 flex flex-col justify-end relative`}
              style={{ width: '100vw', height: '100vh' }}
            >
              {/* ── Mock image placeholder (right half, absolutely positioned) ── */}
              {/*
                Positioned absolutely so it has ZERO effect on flex layout /
                track.offsetWidth — the scroll calculation stays reliable.
                Replace with <Image> once real photography is available.
              */}
              <div
                className="absolute top-0 right-0 bottom-0 flex items-center justify-center"
                style={{ width: '42%' }}
                aria-hidden
              >
                {/* Tinted background hint */}
                <div
                  className="absolute inset-0"
                  style={{ background: `${p.frameRgba}0.03)` }}
                />
                {/* Frame */}
                <div
                  className="relative"
                  style={{ width: '68%', aspectRatio: '3 / 4' }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ border: `1px solid ${p.frameRgba}0.12)` }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `${p.frameRgba}0.04)` }}
                  />
                  {/* Diagonal cross — standard mock convention */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <line x1="0" y1="0" x2="100%" y2="100%"
                      stroke={`${p.frameRgba}0.10)`} strokeWidth="1" />
                    <line x1="100%" y1="0" x2="0" y2="100%"
                      stroke={`${p.frameRgba}0.10)`} strokeWidth="1" />
                  </svg>
                  <span
                    className={`absolute top-3 left-3 font-sans text-[9px] tracking-[0.35em] uppercase ${p.accent} opacity-40`}
                  >
                    {p.num} / {String(PROJECTS.length).padStart(2, '0')}
                  </span>
                  <span
                    className="absolute bottom-3 right-3 font-sans text-[9px] tracking-[0.3em] uppercase"
                    style={{ color: `${p.frameRgba}0.22)` }}
                  >
                    Photo
                  </span>
                </div>
              </div>

              {/* ── Text content (original layout, left ~55%) ── */}
              <div className="relative z-10 px-12 lg:px-24 pb-20" style={{ maxWidth: '58%' }}>
                <p
                  className={`font-display font-light leading-none ${p.accent} mb-4`}
                  style={{ fontSize: 'clamp(5rem, 14vw, 14rem)', opacity: 0.15 }}
                >
                  {p.num}
                </p>
                <p className={`font-sans text-[11px] tracking-[0.3em] uppercase ${p.accent} mb-3 opacity-80`}>
                  {p.tagline}
                </p>
                <h3
                  className={`font-display italic font-light ${p.fg} leading-none mb-6`}
                  style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
                >
                  {p.name}
                </h3>
                <p className={`font-sans text-[15px] leading-relaxed ${p.fg} opacity-60 max-w-md mb-10`}>
                  {p.desc}
                </p>
                <a
                  href="https://hugofund.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-3 font-sans text-[11px] tracking-[0.25em] uppercase ${p.accent} border-b border-current/20 pb-1 hover:opacity-60 transition-opacity`}
                >
                  {p.cta} <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-6 left-12 lg:left-24 right-12 lg:right-24 h-px bg-cream/10">
          <div ref={progressFillRef} className="h-full bg-rose transition-none" style={{ width: '0%' }} />
        </div>
      </div>

      {/* ── Mobile: vertical stack ── */}
      <div className="md:hidden">
        {PROJECTS.map((p, i) => (
          <div key={i} className={`${p.bg} px-6 py-16`}>
            <p className={`font-display font-light text-6xl leading-none ${p.accent} mb-3`} style={{ opacity: 0.18 }}>
              {p.num}
            </p>
            <h3 className={`font-display text-4xl italic font-light ${p.fg} mb-4`}>{p.name}</h3>
            <p className={`font-sans text-sm leading-relaxed ${p.fg} opacity-60 mb-6`}>{p.desc}</p>
            <a
              href="https://hugofund.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.2em] uppercase ${p.accent} border-b border-current/20 pb-1`}
            >
              {p.cta} →
            </a>
          </div>
        ))}
      </div>

      {/* After-scroll CTA */}
      <div className="bg-wine py-28 px-6 md:px-12 lg:px-20 text-center">
        <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-blush/70 mb-4">
          Sandbox Program
        </p>
        <h2
          className="font-display italic font-light text-cream leading-none mb-10"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 7rem)' }}
        >
          You could be next.
        </h2>
        <a
          href="https://hugofund.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-4 bg-blush text-ink font-sans text-[11px] tracking-[0.25em] uppercase hover:bg-blush/90 transition-colors"
        >
          Apply to the Sandbox <span>→</span>
        </a>
      </div>
    </div>
  )
}
