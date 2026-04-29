'use client'

const ITEMS = [
  'Harvard Flourishing',
  'Oxford',
  'MIT',
  'CNBC Mongolia',
  'Oyutolgoi',
  'Ministry of Education',
  'NTV Mongolia',
  'Nova Studio',
  'Berlin Competition',
]

export default function MarqueeBanner() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div className="bg-cream border-y border-ink/8 py-4 overflow-hidden">
      <div
        className="flex gap-14 whitespace-nowrap"
        style={{ width: 'max-content', animation: 'marquee 32s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-5">
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-ink/30">
              {item}
            </span>
            <span className="text-rose/40 text-xs leading-none">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
