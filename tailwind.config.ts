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
          DEFAULT: '#0A1410',
          soft: '#0F1B16',
          deep: '#060B09',
        },
        moss: '#0F1A14',
        fern: '#1F3528',
        cream: {
          DEFAULT: '#E8E2CF',
          dim: 'rgba(232,226,207,0.72)',
          muted: 'rgba(232,226,207,0.45)',
        },
        gold: {
          DEFAULT: '#D4A55F',
          dim: '#A8814A',
        },
        jade: {
          DEFAULT: '#34D399',
          dim: '#10B981',
          deep: '#047857',
        },
        cyan: {
          DEFAULT: '#67E8F9',
          dim: '#22D3EE',
        },
        oxblood: '#B73A2C',
        parchment: '#F4EDE1',
        rule: {
          soft: 'rgba(232,226,207,0.10)',
          dotted: 'rgba(232,226,207,0.22)',
          jade: 'rgba(52,211,153,0.20)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Fraunces', 'Iowan Old Style', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
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
        'jade-glow': '0 0 40px rgba(52,211,153,0.18)',
      },
      maxWidth: {
        prose: '72ch',
      },
    },
  },
  plugins: [],
}

export default config
