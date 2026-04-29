'use client'

import { useEffect, useRef } from 'react'

const ARTICLES = [
  {
    category: 'Forbes Mongolia',
    title: 'Building Debt-Free Futures Inside Hugo Endowment Fund',
    excerpt: 'How one Mongolian innovator is rewriting the rulebook on educational investment — and why the world is paying attention.',
    readTime: '4 min',
    date: '2023',
    href: '#',
  },
  {
    category: 'CNBC Mongolia',
    title: 'The 40·40·20 Theory Changing How Families Think About Education',
    excerpt: "A Nobel-backed framework finds powerful new application in Mongolia's growing middle class — and beyond.",
    readTime: '3 min',
    date: '2023',
    href: '#',
  },
  {
    category: 'NTV Mongolia',
    title: 'Oyunii Umch: 142 Characters, One Vision for Mongolian Children',
    excerpt: "The children's book series that captured the hearts of educators, parents, and a Ministry — and its author's even bigger ambitions.",
    readTime: '5 min',
    date: '2023',
    href: '#',
  },
]

export default function Press() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | null = null

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo('.article-card',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: '.press-grid', start: 'top 78%' },
          }
        )
      }, sectionRef)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-28 lg:py-36 bg-cream">
      <div className="px-6 md:px-12 lg:px-20">

        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-rose mb-3">Press</p>
            <h2
              className="font-display italic font-light text-ink leading-none"
              style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}
            >
              In the news.
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:inline-flex font-sans text-[11px] tracking-widest uppercase text-rose border-b border-rose/40 pb-1 hover:opacity-60 transition-opacity"
          >
            All Articles
          </a>
        </div>

        <div className="press-grid grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/8">
          {ARTICLES.map((article, i) => (
            <article key={i} className="article-card bg-cream group">
              <a href={article.href} className="flex flex-col h-full p-8">
                {/* Top accent line */}
                <div className="w-8 h-0.5 bg-rose mb-8 group-hover:w-16 transition-all duration-500" />

                <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-rose mb-5">
                  {article.category}
                </p>

                <h3
                  className="font-display italic font-light text-ink leading-snug mb-4 flex-grow"
                  style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)' }}
                >
                  {article.title}
                </h3>

                <p className="font-sans text-[14px] leading-relaxed text-ink/50 mb-8">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-5 border-t border-ink/8">
                  <span className="font-sans text-[10px] tracking-widest uppercase text-ink/30">
                    {article.readTime} read
                  </span>
                  <span className="font-sans text-[10px] tracking-widest uppercase text-rose group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
