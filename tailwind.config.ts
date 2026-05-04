import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0E1410',
          soft: '#142019',
        },
        cream: {
          DEFAULT: '#E8E2CF',
          dim: 'rgba(232,226,207,0.72)',
          muted: 'rgba(232,226,207,0.45)',
        },
        gold: {
          DEFAULT: '#D4A55F',
          dim: '#A8814A',
        },
        oxblood: '#B73A2C',
        parchment: '#F4EDE1',
        rule: {
          soft: 'rgba(232,226,207,0.12)',
          dotted: 'rgba(232,226,207,0.25)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Iowan Old Style', 'Palatino', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Iowan Old Style', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        xs: ['11px', { lineHeight: '1.5' }],
        sm: ['13px', { lineHeight: '1.6' }],
        base: ['16px', { lineHeight: '1.65' }],
        lg: ['19px', { lineHeight: '1.55' }],
        xl: ['24px', { lineHeight: '1.4' }],
        '2xl': ['32px', { lineHeight: '1.25' }],
        '3xl': ['44px', { lineHeight: '1.1' }],
        '4xl': ['64px', { lineHeight: '1.05' }],
        '5xl': ['88px', { lineHeight: '1.0' }],
      },
      letterSpacing: {
        widest: '0.18em',
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        DEFAULT: '4px',
        full: '9999px',
      },
      boxShadow: {
        'inset-glow': 'inset 0 0 30px rgba(212,165,95,0.04)',
      },
      maxWidth: {
        prose: '72ch',
      },
    },
  },
  plugins: [],
}

export default config
