import { getTranslations } from 'next-intl/server'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Headline } from '@/components/shared/Headline'
import { Rule } from '@/components/shared/Rule'
import { CtaSecondary } from '@/components/shared/CtaSecondary'
import { InkButton } from '@/components/motion/InkButton'
import { Reveal } from '@/components/motion/Reveal'

export async function FinalCtaSection() {
  const t = await getTranslations('home.finalCta')
  const common = await getTranslations('common')

  return (
    <Reveal as="section" className="mx-auto max-w-6xl px-6 py-24">
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <Headline as="h2" size="4xl" className="mt-3 max-w-3xl">
        {t('h2Before')}
        <em className="italic text-gold">{t('h2Emphasis')}</em>
        {t('h2After')}
      </Headline>
      <p className="mt-6 max-w-prose text-lg text-cream-dim">{t('lede')}</p>
      <Rule variant="soft" className="my-10" />
      <div className="flex flex-wrap items-center gap-6">
        <InkButton href={`mailto:${common('email')}`}>{t('ctaPrimary')}</InkButton>
        <CtaSecondary href={common('linkedinUrl')} external>
          {t('ctaSecondary')}
        </CtaSecondary>
      </div>
    </Reveal>
  )
}
