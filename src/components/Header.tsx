'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const NAV = ['About', 'Fund', 'Apply', 'Book', 'Press', 'Contact']
const NAV_PAGES = [{ label: 'Gallery', href: '/gallery' }]

export default function Header() {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const prevY = useRef(0)
  const forceDark = pathname !== '/'
  const anchorHref = (id: string) => pathname === '/' ? `#${id}` : `/#${id}`

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > prevY.current && y > 120)
      prevY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${(scrolled || forceDark) ? 'bg-ink/95 backdrop-blur-sm' : 'bg-transparent'}`}
      >
        <nav className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-5">
          <Link
            href="/"
            className="font-display text-xl italic text-cream tracking-wide"
          >
            Solongo B.
          </Link>

          <ul className="hidden lg:flex items-center gap-9">
            {NAV.map((item) => (
              <li key={item}>
                <Link
                  href={anchorHref(item.toLowerCase())}
                  className="font-sans text-[11px] tracking-[0.25em] uppercase text-cream/60 hover:text-cream transition-colors duration-300"
                >
                  {item}
                </Link>
              </li>
            ))}
            {NAV_PAGES.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="font-sans text-[11px] tracking-[0.25em] uppercase text-cream/60 hover:text-cream transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Link
              href={anchorHref('college')}
              className="hidden lg:inline-flex items-center px-5 py-2 border border-gold text-gold font-sans text-[11px] tracking-[0.2em] uppercase hover:bg-gold hover:text-ink transition-all duration-300"
            >
              Join Waitlist
            </Link>
            <button
              className="lg:hidden p-2 space-y-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-px bg-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}
              />
              <span
                className={`block h-px bg-cream transition-all duration-300 ${menuOpen ? 'opacity-0 w-0' : 'w-4'}`}
              />
              <span
                className={`block w-6 h-px bg-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-ink flex flex-col justify-center px-8 transition-all duration-500 lg:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="space-y-8">
          {NAV.map((item) => (
            <li key={item}>
              <Link
                href={anchorHref(item.toLowerCase())}
                onClick={() => setMenuOpen(false)}
                className="font-display text-5xl italic font-light text-cream hover:text-gold transition-colors duration-300"
              >
                {item}
              </Link>
            </li>
          ))}
          {NAV_PAGES.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-5xl italic font-light text-cream hover:text-gold transition-colors duration-300"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={anchorHref('college')}
          onClick={() => setMenuOpen(false)}
          className="mt-12 inline-flex items-center px-6 py-3 border border-gold text-gold font-sans text-xs tracking-[0.2em] uppercase w-fit"
        >
          Join Waitlist
        </Link>
      </div>
    </>
  )
}
