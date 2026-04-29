'use client'

import { useEffect } from 'react'

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: import('lenis').default | null = null

    const init = async () => {
      const { default: Lenis } = await import('lenis')
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      gsap.registerPlugin(ScrollTrigger)

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      })

      lenis.on('scroll', ScrollTrigger.update)

      // GSAP ticker time is in seconds; Lenis.raf() expects milliseconds
      const raf = (time: number) => {
        lenis!.raf(time * 1000)
      }

      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)

      // Recalculate all trigger positions after:
      // 1. GSAP pin spacers have been inserted (FundProjects creates one)
      // 2. Fonts have fully loaded (affect layout heights)
      // Without this, gsap.from(opacity:0) elements can stay invisible forever
      // because their trigger fires at the wrong scroll position.
      const refresh = () => ScrollTrigger.refresh()
      setTimeout(refresh, 300)
      setTimeout(refresh, 900)
      document.fonts.ready.then(refresh)

      // BUG FIX: store raf ref so we can remove it on unmount.
      // Previously gsap.ticker.add(raf) was never paired with a remove(),
      // meaning every React hot-reload or StrictMode double-mount stacked
      // another live ticker callback — each one calling lenis.raf() on every
      // frame and causing compounding scroll jank / drift.
      cleanup = () => {
        gsap.ticker.remove(raf)
        lenis!.destroy()
      }
    }

    let cleanup: (() => void) | null = null

    init()

    return () => {
      cleanup?.()
    }
  }, [])

  return <>{children}</>
}
