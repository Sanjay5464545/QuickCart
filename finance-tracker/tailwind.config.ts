import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(220 13% 18%)',
        input: 'hsl(220 13% 18%)',
        ring: 'hsl(220 13% 18%)'
      }
    },
  },
  plugins: [],
} satisfies Config