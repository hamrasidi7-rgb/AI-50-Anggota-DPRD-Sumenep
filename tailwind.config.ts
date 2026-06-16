import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Override breakpoints to match design spec
    screens: {
      sm:  '640px',
      md:  '768px',
      lg:  '1100px',
      xl:  '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'navy-900':   '#04162a',
        'navy-800':   '#08213c',
        'navy':       '#0B3C6F',
        'royal':      '#1E5AA8',
        'gold':       '#D4AF37',
        'gold-text':  '#EBDDAE',
        'text-hi':    '#F4F8FF',
        'dp-red':     '#E5484D',
        'chat-bg':    '#F3F5F9',
        'online-dot': '#1F9D55',
      },
      maxWidth: {
        content: '1440px',
        chat:    '760px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
