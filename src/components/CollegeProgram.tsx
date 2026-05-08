'use client'

import { useState, useEffect, useRef } from 'react'

export default function CollegeProgram() {
  const sectionRef = useRef<HTMLElement>(null)
  const [form, setForm] = useState({ name: '', email: '', school: '', university: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let ctx: { revert: () => void } | null = null

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo('.college-headline',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.college-headline', start: 'top 80%' },
          }
        )
        gsap.fromTo('.college-form',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: '.college-form', start: 'top 82%' },
          }
        )
      }, sectionRef)
    }

    init()
    return () => ctx?.revert()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section ref={sectionRef} id="college" className="relative bg-ink overflow-hidden py-28 lg:py-44 px-6 md:px-12 lg:px-20">

      {/* Ghost "2028" behind everything */}
      <div
        className="absolute inset-0 flex items-center justify-end pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <p
          className="font-display font-light text-cream/[0.04] leading-none pr-4"
          style={{ fontSize: 'clamp(8rem, 22vw, 22rem)' }}
        >
          2028
        </p>
      </div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">

        {/* Left */}
        <div className="college-headline">
          <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-rose mb-8">
            College Application 2028
          </p>

          {/* Large 5 */}
          <div className="flex items-baseline gap-5 mb-6">
            <span
              className="font-display italic font-light text-blush leading-none"
              style={{ fontSize: 'clamp(5rem, 10vw, 9rem)' }}
            >
              5
            </span>
            <span className="font-sans text-[13px] tracking-widest uppercase text-cream/40 pb-3">
              students
              <br />per cohort
            </span>
          </div>

          <h2
            className="font-display italic font-light text-cream leading-tight mb-8"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)' }}
          >
            Unlimited
            <br />
            <span className="text-blush">potential.</span>
          </h2>

    

          <ul className="space-y-4 mb-12">
            {[
              'Personalised university strategy',
              'Essay & application sessions',
              'Global alumni network access',
              'Registration fee 1500$ | 2 years program 50000$',
            ].map((feat, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-[7px] w-3 h-px bg-rose flex-shrink-0" />
                <span className="font-sans text-[14px] text-cream/55">{feat}</span>
              </li>
            ))}
          </ul>

          {/* Spot indicator */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              {[0, 1, 2, 3].map(i => (
                <span key={i} className="w-2 h-2 rounded-full bg-rose" />
              ))}
              <span className="w-2 h-2 rounded-full bg-cream/15 rounded-full" />
            </div>
            <span className="font-sans text-[11px] tracking-widest uppercase text-rose/70">
              4 of 5 spots reserved
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="college-form border border-cream/10 p-8 lg:p-10">
          {submitted ? (
            <div className="py-16 text-center">
              <p className="font-display text-4xl italic font-light text-cream mb-3">
                You're on the list.
              </p>
              <p className="font-sans text-sm text-cream/40">We'll be in touch within 48 hours.</p>
            </div>
          ) : (
            <>
              <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-rose/70 mb-8">
                Reserve Your Spot
              </p>
              <form onSubmit={handleSubmit} className="space-y-0">
                {[
                  { name: 'name',       placeholder: 'Full Name',              type: 'text'  },
                  { name: 'email',      placeholder: 'Email Address',          type: 'email' },
                  { name: 'school',     placeholder: 'Current School / Grade', type: 'text'  },
                  { name: 'university', placeholder: 'Target University',      type: 'text'  },
                ].map((field) => (
                  <div key={field.name}>
                    <input
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-cream/12 py-4 font-sans text-[14px] text-cream placeholder-cream/25 focus:outline-none focus:border-rose transition-colors duration-300"
                    />
                  </div>
                ))}
                <div className="pt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-rose text-cream font-sans text-[11px] tracking-[0.25em] uppercase hover:bg-wine transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending…' : 'Join the 2028 Waitlist'}
                  </button>
                </div>
                {error && (
                  <p className="pt-3 font-sans text-[11px] text-rose text-center">{error}</p>
                )}
                <p className="pt-4 font-sans text-[11px] text-cream/20 text-center">
                  hello@bsolongo.com · Never shared
                </p>
              </form>
            </>
          )}
        </div>

      </div>
    </section>
  )
}
