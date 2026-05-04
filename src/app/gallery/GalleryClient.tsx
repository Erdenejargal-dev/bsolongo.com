'use client'

import { useEffect, useCallback, useState } from 'react'

type Resource = {
  public_id: string
  secure_url: string
  width: number
  height: number
}

const COLUMNS = [
  { duration: 70,  direction: 'up'   as const, delay: '0s'   },
  { duration: 90,  direction: 'down' as const, delay: '-20s'  },
  { duration: 80,  direction: 'up'   as const, delay: '-10s'  },
  { duration: 100, direction: 'down' as const, delay: '-35s'  },
]

function thumbUrl(url: string) {
  return url.replace('/upload/', '/upload/w_600,f_auto,q_auto:good/')
}

function lightboxUrl(url: string) {
  return url.replace('/upload/', '/upload/w_1600,f_auto,q_auto/')
}

function MasonryColumn({
  images,
  allImages,
  duration,
  direction,
  delay,
  onOpen,
}: {
  images: Resource[]
  allImages: Resource[]
  duration: number
  direction: 'up' | 'down'
  delay: string
  onOpen: (index: number) => void
}) {
  if (images.length === 0) return null
  const strip = [...images, ...images]

  return (
    <div className="flex-1 overflow-hidden">
      <div
        className="flex flex-col gap-3"
        style={{
          animation: `${direction === 'up' ? 'marquee-vertical' : 'marquee-vertical-reverse'} ${duration}s linear infinite`,
          animationDelay: delay,
          willChange: 'transform',
        }}
      >
        {strip.map((img, i) => {
          const globalIndex = allImages.findIndex(x => x.public_id === img.public_id)
          return (
            <button
              key={`${img.public_id}-${i}`}
              className="w-full flex-shrink-0 overflow-hidden block cursor-none group"
              style={{ aspectRatio: img.width / img.height }}
              onClick={() => onOpen(globalIndex)}
              aria-label="Open image"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbUrl(img.secure_url)}
                alt=""
                loading={i < 4 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-75"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function GalleryClient({ images }: { images: Resource[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const close = useCallback(() => setLightboxIndex(null), [])
  const prev = useCallback(() =>
    setLightboxIndex(i => i !== null ? (i - 1 + images.length) % images.length : null), [images.length])
  const next = useCallback(() =>
    setLightboxIndex(i => i !== null ? (i + 1) % images.length : null), [images.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIndex, close, prev, next])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  const cols = COLUMNS.map((_, ci) => images.filter((_, i) => i % COLUMNS.length === ci))
  const active = lightboxIndex !== null ? images[lightboxIndex] : null

  return (
    <>
      {/* Masonry columns — fills from below header to bottom of viewport */}
      <div
        className="flex gap-3 px-3"
        style={{ height: 'calc(100dvh - 72px)' }}
      >
        {cols.map((colImages, ci) => (
          <MasonryColumn
            key={ci}
            images={colImages}
            allImages={images}
            duration={COLUMNS[ci].duration}
            direction={COLUMNS[ci].direction}
            delay={COLUMNS[ci].delay}
            onOpen={setLightboxIndex}
          />
        ))}
        {images.length === 0 && (
          <p className="font-sans text-cream/30 text-sm text-center w-full py-24">
            No images found in the bsolongo.com folder.
          </p>
        )}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-sm flex items-center justify-center"
          onClick={close}
        >
          {/* Image */}
          <div
            className="relative max-w-[90vw] max-h-[90dvh]"
            onClick={e => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxUrl(active.secure_url)}
              alt=""
              className="block max-w-[90vw] max-h-[90dvh] object-contain"
              style={{ width: active.width, height: active.height }}
            />
          </div>

          {/* Close */}
          <button
            onClick={close}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-cream/50 hover:text-cream transition-colors cursor-none"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 2l16 16M18 2L2 18" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-cream/50 hover:text-cream transition-colors cursor-none"
              aria-label="Previous"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 4l-8 8 8 8" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
          )}

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-cream/50 hover:text-cream transition-colors cursor-none"
              aria-label="Next"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 4l8 8-8 8" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-[11px] tracking-[0.2em] text-cream/30">
            {lightboxIndex! + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
