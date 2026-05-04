'use client'

import { useTranslations } from 'next-intl'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Rule } from '@/components/shared/Rule'
import { CtaSecondary } from '@/components/shared/CtaSecondary'
import { InkButton } from '@/components/motion/InkButton'
import { Typewriter } from '@/components/motion/Typewriter'
import { MagneticCta } from '@/components/motion/MagneticCta'
import { CursorSpotlight } from '@/components/decorative/CursorSpotlight'
import { SectionWatermark } from '@/components/decorative/SectionWatermark'
import { ParticleField } from '@/components/decorative/ParticleField'
import { Scanline } from '@/components/decorative/Scanline'
import { DataTicker } from '@/components/decorative/DataTicker'

export function HeroSection() {
  const t = useTranslations('home.hero')
  const indexItems = t.raw('indexItems') as string[]

  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      <SectionWatermark>01</SectionWatermark>
      <ParticleField density="med" palette="mixed" />
      <Scanline delaySeconds={3} />
      <CursorSpotlight />
      <DataTicker prefix="SYS · NETSUITE" className="left-6 top-24 md:left-10 md:top-28" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pt-32 md:pt-48 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
        <div className="flex flex-col gap-8">
          <Eyebrow className="glyph-rise">{t('eyebrow')}</Eyebrow>
          <h1
            className="font-display text-4xl font-light leading-[1.02] text-cream md:text-5xl lg:text-[5.5rem]"
            style={{ animation: 'glyph-rise 1.1s cubic-bezier(0.22,1,0.36,1) backwards', animationDelay: '0.1s' }}
          >
            <Typewriter
              segments={[
                { text: t('h1Before') },
                { text: t('h1Emphasis'), italic: true, gold: true },
                { text: t('h1After') },
              ]}
            />
          </h1>
          <p className="max-w-prose text-xl text-cream-dim md:text-2xl">{t('lede')}</p>
          <div className="flex flex-wrap items-center gap-8 pt-4">
            <MagneticCta>
              <InkButton href="/contact">{t('ctaPrimary')}</InkButton>
            </MagneticCta>
            <CtaSecondary href="/services">{t('ctaSecondary')}</CtaSecondary>
          </div>
        </div>

        <aside
          aria-label={t('indexTitle')}
          className="relative self-start border border-rule-jade bg-ink-soft/50 p-6 shadow-jade-glow backdrop-blur-sm lg:mt-24"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-2 border border-rule-soft"
          />
          <div className="relative">
            <Eyebrow className="text-cream-muted" dot={false}>
              <span className="slash">{t('indexTitle')}</span>
            </Eyebrow>
            <Rule variant="dotted" className="my-4" />
            <ol className="space-y-3 font-body text-base text-cream-dim">
              {indexItems.map((item, idx) => (
                <li key={idx} className="group flex items-start gap-4">
                  <span className="mt-0.5 inline-block w-6 shrink-0 font-mono text-xs uppercase tracking-widest text-jade">
                    {romanize(idx + 1)}
                  </span>
                  <span className="under-grow">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </section>
  )
}

function romanize(n: number) {
  const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  return numerals[n - 1] ?? String(n)
}
