import { getTranslations } from 'next-intl/server'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Headline } from '@/components/shared/Headline'
import { Rule } from '@/components/shared/Rule'
import { CtaSecondary } from '@/components/shared/CtaSecondary'
import { InkButton } from '@/components/motion/InkButton'
import { MagneticCta } from '@/components/motion/MagneticCta'
import { Reveal } from '@/components/motion/Reveal'
import { SectionWatermark } from '@/components/decorative/SectionWatermark'

export async function FinalCtaSection() {
  const t = await getTranslations('home.finalCta')
  const common = await getTranslations('common')

  return (
    <section className="relative overflow-hidden">
      <SectionWatermark align="center">08</SectionWatermark>
      <Reveal className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <Eyebrow>{t('eyebrow')}</Eyebrow>
        <Headline as="h2" size="4xl" className="mt-3 max-w-3xl">
          {t('h2Before')}
          <em className="italic text-gold">{t('h2Emphasis')}</em>
          {t('h2After')}
        </Headline>
        <p className="mt-6 max-w-prose text-xl text-cream-dim md:text-2xl">{t('lede')}</p>
        <Rule variant="soft" className="my-10" />
        <div className="flex flex-wrap items-center gap-8">
          <MagneticCta>
            <InkButton href={`mailto:${common('email')}`}>{t('ctaPrimary')}</InkButton>
          </MagneticCta>
          <CtaSecondary href={common('linkedinUrl')} external>
            {t('ctaSecondary')}
          </CtaSecondary>
        </div>
      </Reveal>
    </section>
  )
}
