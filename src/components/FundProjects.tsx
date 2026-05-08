'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const PROJECTS = [
  {
    num: '01',
    name: 'Zugtaalt',
    tagline: '',
    desc: 'Zugtaalt is a youth project that helps young people step away from social pressure, phone addiction, and daily distractions through running. It creates a space for them to focus on themselves, build discipline, and move toward a healthier future.',
    bg: 'bg-ink',
    fg: 'text-cream',
    accent: 'text-blush',
    cta: 'Explore Model',
    image: 'https://res.cloudinary.com/dmntnayyw/image/upload/f_auto,q_auto,w_800/v1778067217/hero-bg_tfrj0q.jpg',
  },
  {
    num: '02',
    name: 'Longevity Club',
    tagline: 'Long-arc human vitality program',
    desc: 'Longevity Club is a project focused on the future of human life. While the world talks about AI, we believe the real future is longevity: helping people live longer, healthier, and more meaningful lives.',
    bg: 'bg-wine',
    fg: 'text-cream',
    accent: 'text-blush',
    cta: 'Apply Now',
    image: 'https://res.cloudinary.com/dmntnayyw/image/upload/f_auto,q_auto,w_800/v1777865905/IMG_8584_xtsoos.heic',
  },
  {
    num: '03',
    name: 'Human Career Program',
    tagline: 'Personal career + Application coach',
    desc: 'Bespoke career architecture paired with IVY coaching experience. Designed for the next generation of Mongolian leaders pursuing global opportunities.',
    bg: 'bg-cream',
    fg: 'text-ink',
    accent: 'text-wine',
    cta: 'Apply Now',
    image: 'https://res.cloudinary.com/dmntnayyw/image/upload/f_auto,q_auto,w_800/v1777865870/IMG_2366_us63ri.heic',
  },
  {
    num: '04',
    name: 'Life Tree',
    tagline: 'Pre-school ecosystem, 132+ kindergarten partners',
    desc: 'Early childhood as infrastructure. Life Tree partners with 132+ kindergartens across Mongolia to deliver a research-backed, holistic early education curriculum.',
    bg: 'bg-blush',
    fg: 'text-ink',
    accent: 'text-wine',
    cta: 'View Network',
    image: 'https://res.cloudinary.com/dmntnayyw/image/upload/f_auto,q_auto,w_800/v1777865873/IMG_3424_hov9xe.heic',
  },
  {
    num: '05',
    name: 'World Family Academy',
    tagline: "Family certification, expecting mothers' community",
    desc: "Because parenting is the world's most consequential skill. A certification program and global community for expecting and new mothers building intentional families.",
    bg: 'bg-ink',
    fg: 'text-cream',
    accent: 'text-rose',
    cta: 'Join Community',
    image: 'https://res.cloudinary.com/dmntnayyw/image/upload/f_auto,q_auto,w_800/v1777865843/IMG_0646_n3pmvf.heic',
  },
  {
    num: '06',
    name: 'Human OS™',
    tagline: 'Behavioral + emotional operating system for human development',
    desc: 'Most schools measure academic performance. We study the human behind it. Human OS™ is a proprietary development framework like clinical guidelines for doctors giving educators and mentors a standardized system to understand each child\'s emotional, behavioral, and identity development and deliver the right intervention.',
    bg: 'bg-cream',
    fg: 'text-ink',
    accent: 'text-wine',
    cta: 'Explore Framework',
    image: 'https://res.cloudinary.com/dmntnayyw/image/upload/f_auto,q_auto,w_800/v1777865870/IMG_2366_us63ri.heic',
  },
  {
    num: '07',
    name: 'M.Bank™',
    tagline: 'Human Memory Archive — family legacy preserved for generations',
    desc: 'Some families inherit land. Some inherit money. The rarest inheritance is memory. In collaboration with Human International School, M.Bank™ transforms the Mongolian Avdar tradition into a modern Human Memory Archive preserving childhood, family history, and emotional moments through digital and physical memory systems.',
    bg: 'bg-wine',
    fg: 'text-cream',
    accent: 'text-blush',
    cta: 'Open the Vault',
    image: 'https://res.cloudinary.com/dmntnayyw/image/upload/f_auto,q_auto,w_800/v1777865843/IMG_0646_n3pmvf.heic',
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
          Our Programs.
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
              {/* Project image — absolutely positioned so it never affects track.offsetWidth */}
              <div
                className="absolute top-0 right-0 bottom-0 flex items-center justify-center"
                style={{ width: '42%' }}
                aria-hidden
              >
                <div className="relative w-full h-full">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="42vw"
                  />
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
            <div className="relative w-full aspect-video mb-8 overflow-hidden">
              <Image src={p.image} alt={p.name} fill className="object-cover" sizes="100vw" />
            </div>
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
