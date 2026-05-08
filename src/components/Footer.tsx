import Link from 'next/link'

const FUND_LINKS = [
  'Zugtaalt',
  'Longevity Club',
  'Human Career Program',
  'Life Tree',
  'World Family Academy',
]

const PROGRAM_LINKS = [
  'College 2028',
  'Sandbox Program',
  "Children's Book",
  'About',
  'Press',
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink pt-24 pb-8">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 pb-20 border-b border-cream/8">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <p className="font-display text-4xl italic font-light text-cream">Solongo B.</p>
            <p className="font-sans text-[14px] leading-loose text-cream/45 max-w-xs">
              Mongolian educational innovator. Founder of Hugo Endowment Fund.
              Forbes award winner. Author of Children's book series.
            </p>
            <a
              href="mailto:hello@bsolongo.com"
              className="inline-block font-sans text-[13px] text-gold hover:text-gold/70 transition-colors"
            >
              hello@bsolongo.com
            </a>
            <div className="flex gap-3 pt-2">
              {[
                { label: 'Instagram', short: 'IG', href: 'https://www.instagram.com/batsuuri.soko/' },
                { label: 'Facebook',  short: 'FB', href: 'https://www.facebook.com/solongo.eco' },
                { label: 'LinkedIn',  short: 'LI', href: 'https://mn.linkedin.com/in/solongo-batsuuri' },
              ].map(({ label, short, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-cream/15 flex items-center justify-center hover:border-gold transition-colors duration-300"
                >
                  <span className="font-sans text-[10px] tracking-wider text-cream/40">{short}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Fund */}
          <div>
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
              Fund
            </p>
            <ul className="space-y-3">
              {FUND_LINKS.map((link) => (
                <li key={link}>
                  <Link
                    href="#fund"
                    className="font-sans text-[13px] text-cream/40 hover:text-cream transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
              Programs
            </p>
            <ul className="space-y-3">
              {PROGRAM_LINKS.map((link) => (
                <li key={link}>
                  <Link
                    href={`#${link.toLowerCase().replace(/\s+/g, '').replace("'", '')}`}
                    className="font-sans text-[13px] text-cream/40 hover:text-cream transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-[11px] text-cream/20">
            © 2025 Solongo B. · bsolongo.com
          </p>
          <p className="font-sans text-[11px] text-cream/20">
            Ulaanbaatar, Mongolia
          </p>
        </div>
      </div>
    </footer>
  )
}
