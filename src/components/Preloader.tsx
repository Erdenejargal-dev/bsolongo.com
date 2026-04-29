'use client'

import { useEffect, useRef } from 'react'

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    const init = async () => {
      const { gsap } = await import('gsap')

      // Keep body from scrolling while loading
      document.body.style.overflow = 'hidden'

      const tl = gsap.timeline()

      // 1. Slide name up into view
      tl.from('.pl-name', {
        y: '110%',
        duration: 0.9,
        ease: 'power4.out',
        delay: 0.1,
      })
      // 2. Grow the red line
      .to('.pl-line', {
        scaleX: 1,
        duration: 0.55,
        ease: 'power2.inOut',
      }, '-=0.2')
      // 3. Brief hold, then signal Hero to start
      .add(() => {
        window.dispatchEvent(new CustomEvent('preloaderExiting'))
        document.body.style.overflow = ''
      }, '+=0.25')
      // 4. Curtain rises — top panel slides up
      .to('.pl-top', {
        yPercent: -100,
        duration: 0.95,
        ease: 'power4.inOut',
      })
      // 5. Bottom panel drops down simultaneously (split-wipe reveal)
      .to('.pl-bottom', {
        yPercent: 100,
        duration: 0.95,
        ease: 'power4.inOut',
        onComplete: () => {
          overlay.style.display = 'none'
          window.dispatchEvent(new CustomEvent('preloaderDone'))
        },
      }, '<')
    }

    init()
  }, [])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] pointer-events-none select-none"
      aria-hidden
    >
      {/* Top half of curtain */}
      <div className="pl-top absolute inset-x-0 top-0 h-1/2 bg-ink" />

      {/* Bottom half of curtain */}
      <div className="pl-bottom absolute inset-x-0 bottom-0 h-1/2 bg-ink" />

      {/* Centered name + line — sits over the seam */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
        <div className="overflow-hidden">
          <p
            className="pl-name font-display italic font-light text-cream"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}
          >
            Solongo B.
          </p>
        </div>
        <div
          className="pl-line h-px bg-rose origin-left"
          style={{ width: 'clamp(3rem, 8vw, 6rem)', transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  )
}
