import { getTranslations } from 'next-intl/server'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Headline } from '@/components/shared/Headline'
import { Rule } from '@/components/shared/Rule'
import { CtaSecondary } from '@/components/shared/CtaSecondary'
import { InkButton } from '@/components/motion/InkButton'
import { MagneticCta } from '@/components/motion/MagneticCta'
import { Reveal } from '@/components/motion/Reveal'
import { HoverLetters } from '@/components/motion/HoverLetters'
import { SectionWatermark } from '@/components/decorative/SectionWatermark'
import { ParticleField } from '@/components/decorative/ParticleField'
import { LeafFall } from '@/components/decorative/LeafFall'
import { Scanline } from '@/components/decorative/Scanline'
import { DataTicker } from '@/components/decorative/DataTicker'

type Signal = { label: string; value: string }

export async function FinalCtaSection() {
  const t = await getTranslations('home.finalCta')
  const common = await getTranslations('common')
  const signals = (t.raw('signals') as Signal[] | undefined) ?? []
  const emailHint = t.has('ctaEmailHint') ? t('ctaEmailHint') : null
  const email = common('email')

  return (
    <section className="relative overflow-hidden">
      <SectionWatermark align="center">06</SectionWatermark>
      <ParticleField density="low" palette="jade" />
      <LeafFall count={10} />
      <Scanline delaySeconds={2} />
      <DataTicker prefix="SYS · ENGAGE" className="bottom-8 right-8" />

      <Reveal className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <Eyebrow>{t('eyebrow')}</Eyebrow>
        <Headline as="h2" size="4xl" className="mt-3 max-w-3xl">
          {t('h2Before')}
          <em className="italic text-gold ink-bleed">
            <HoverLetters>{t('h2Emphasis')}</HoverLetters>
          </em>
          {t('h2After')}
        </Headline>
        <p className="mt-6 max-w-prose text-xl text-cream-dim md:text-2xl">{t('lede')}</p>
        <Rule variant="soft" className="my-10" />
        <div className="flex flex-wrap items-center gap-8">
          <MagneticCta>
            <InkButton href={`mailto:${email}`}>{t('ctaPrimary')}</InkButton>
          </MagneticCta>
          <CtaSecondary href={common('linkedinUrl')} external>
            {t('ctaSecondary')}
          </CtaSecondary>
        </div>
        {emailHint ? (
          <p className="mt-4 font-mono text-[11px] tracking-wide text-cream-muted">
            <a
              href={`mailto:${email}`}
              className="border-b border-dotted border-rule-dotted pb-px transition-colors duration-200 hover:border-gold hover:text-cream"
            >
              {emailHint}
            </a>
          </p>
        ) : null}

        {signals.length ? (
          <dl className="mt-14 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-rule-soft pt-8 sm:grid-cols-3">
            {signals.map((signal) => (
              <div key={signal.label} className="flex flex-col gap-1">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-cream-muted">
                  {signal.label}
                </dt>
                <dd className="font-display text-lg text-cream md:text-xl">{signal.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Reveal>
    </section>
  )
}
