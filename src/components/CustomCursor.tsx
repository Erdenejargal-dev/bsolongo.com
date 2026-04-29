'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    // BUG FIX: previously `ring.style.transform += ' scale(2.4)'` was used
    // on every mouseenter, which APPENDED a new scale() to the string each
    // time without ever removing the old one.  After 3 hovers the ring was
    // effectively scaled to scale(2.4³ = 13.8) and growing forever, causing
    // a massive paint area on every rAF tick.
    // Now we lerp a dedicated scale value inside the rAF loop instead.
    let hoverScale = 1
    let isHovered = false
    let rafId = 0

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      // Dot follows instantly — direct transform, no lerp needed
      dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`
    }

    const loop = () => {
      ringX = lerp(ringX, mouseX, 0.12)
      ringY = lerp(ringY, mouseY, 0.12)
      // Smoothly lerp scale instead of clobbering the transform string
      hoverScale = lerp(hoverScale, isHovered ? 2.4 : 1, 0.15)
      ring.style.transform =
        `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%)) scale(${hoverScale})`
      rafId = requestAnimationFrame(loop)
    }

    // Only toggle opacity on hover — scale is handled by the rAF loop above
    const onEnter = () => {
      isHovered = true
      ring.style.opacity = '0.35'
    }

    const onLeave = () => {
      isHovered = false
      ring.style.opacity = '1'
    }

    document.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(loop)

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    addListeners()

    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  )
}
