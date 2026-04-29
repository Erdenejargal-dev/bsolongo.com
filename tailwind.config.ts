import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F7F3EE',
        blush: '#EF88AD',
        rose:  '#A53860',
        wine:  '#670D2F',
        ink:   '#3A0519',
        // legacy aliases — keep so existing bg-forest / text-gold / bg-gold classes still work
        forest: '#670D2F',
        gold:   '#A53860',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
