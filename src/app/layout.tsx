import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import CustomCursor from '@/components/CustomCursor'
import Preloader from '@/components/Preloader'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Solongo B. — Educational Innovator & Founder',
  description:
    'Founder of Hugo Endowment Fund. Mongolian educational innovator, Forbes award winner, and children\'s book author building debt-free futures.',
  metadataBase: new URL('https://bsolongo.com'),
  openGraph: {
    title: 'Solongo B.',
    description: 'Building futures that can\'t be taken away.',
    url: 'https://bsolongo.com',
    siteName: 'Solongo B.',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body suppressHydrationWarning>
        <Preloader />
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
