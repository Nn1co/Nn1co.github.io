'use client'

import { useTranslations } from 'next-intl'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Rule } from '@/components/shared/Rule'
import { CtaSecondary } from '@/components/shared/CtaSecondary'
import { InkButton } from '@/components/motion/InkButton'
import { Typewriter } from '@/components/motion/Typewriter'

export function HeroSection() {
  const t = useTranslations('home.hero')
  const indexItems = t.raw('indexItems') as string[]

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pt-32 md:pt-48 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div className="flex flex-col gap-8">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 className="font-display text-3xl text-cream md:text-4xl lg:text-5xl">
            <Typewriter
              segments={[
                { text: t('h1Before') },
                { text: t('h1Emphasis'), italic: true, gold: true },
                { text: t('h1After') },
              ]}
            />
          </h1>
          <p className="max-w-prose text-lg text-cream-dim md:text-xl">{t('lede')}</p>
          <div className="flex flex-wrap items-center gap-6 pt-4">
            <InkButton href="/contact">{t('ctaPrimary')}</InkButton>
            <CtaSecondary href="/services">{t('ctaSecondary')}</CtaSecondary>
          </div>
        </div>

        <aside
          aria-label={t('indexTitle')}
          className="relative self-start border border-rule-soft bg-ink-soft/40 p-6 shadow-inset-glow lg:mt-12"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-2 border border-rule-soft"
          />
          <div className="relative">
            <Eyebrow className="text-cream-muted">{t('indexTitle')}</Eyebrow>
            <Rule variant="dotted" className="my-4" />
            <ol className="space-y-3 font-body text-base text-cream-dim">
              {indexItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="mt-0.5 inline-block w-6 shrink-0 font-mono text-xs uppercase tracking-widest text-gold">
                    {romanize(idx + 1)}
                  </span>
                  <span>{item}</span>
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
