import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Headline } from '@/components/shared/Headline'
import { Rule } from '@/components/shared/Rule'
import { CtaSecondary } from '@/components/shared/CtaSecondary'
import { InkButton } from '@/components/motion/InkButton'
import { Reveal } from '@/components/motion/Reveal'
import { ServicePillar } from '@/components/services/ServicePillar'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services.page' })
  return { title: t('title'), description: t('metaDescription') }
}

type Anchor = { href: string; label: string }

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('services')
  const common = await getTranslations('common')
  const anchors = t.raw('hero.anchors') as Anchor[]

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-32 md:pt-48">
        <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
        <Headline as="h1" size="4xl" className="mt-3 max-w-4xl">
          {t('hero.h1Before')}
          <em className="not-italic text-gold italic">{t('hero.h1Emphasis')}</em>
          {t('hero.h1After')}
        </Headline>
        <p className="mt-6 max-w-prose text-lg text-cream-dim md:text-xl">
          {t('hero.lede')}
        </p>
        <Rule variant="soft" className="mt-10" />
        <nav aria-label="Page sections" className="mt-6 flex flex-wrap gap-6">
          {anchors.map((anchor) => (
            <a
              key={anchor.href}
              href={anchor.href}
              className="font-mono text-xs uppercase tracking-widest text-cream-dim transition-colors hover:text-gold"
            >
              ↓ {anchor.label}
            </a>
          ))}
        </nav>
      </section>

      <ServicePillar id="netsuite" namespace="services.netsuite" />
      <ServicePillar id="ai" namespace="services.ai" />

      <Reveal as="section" className="mx-auto max-w-6xl px-6 py-24">
        <Eyebrow>{t('cta.eyebrow')}</Eyebrow>
        <Headline as="h2" size="3xl" className="mt-3 max-w-3xl">
          {t('cta.h2')}
        </Headline>
        <p className="mt-6 max-w-prose text-lg text-cream-dim">{t('cta.lede')}</p>
        <Rule variant="soft" className="my-10" />
        <div className="flex flex-wrap items-center gap-6">
          <InkButton href={`mailto:${common('email')}`}>{t('cta.primary')}</InkButton>
          <CtaSecondary href={common('linkedinUrl')} external>
            {t('cta.secondary')}
          </CtaSecondary>
        </div>
      </Reveal>
    </>
  )
}
