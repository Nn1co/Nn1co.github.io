import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { PartnersSection } from '@/components/home/PartnersSection'
import { PillarSection } from '@/components/home/PillarSection'
import { ApproachSection } from '@/components/home/ApproachSection'
import { PeppolMention } from '@/components/home/PeppolMention'
import { ManifestoQuote } from '@/components/home/ManifestoQuote'
import { FinalCtaSection } from '@/components/home/FinalCtaSection'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home.page' })
  return buildMetadata({
    locale,
    path: '/',
    title: t('title'),
    description: t('metaDescription'),
    ogTitle: locale === 'fr' ? 'NetSuite + Claude. Natif.' : 'NetSuite + Claude. Native.',
    ogSubtitle:
      locale === 'fr'
        ? 'Conseil NetSuite et Claude embarqué · Benelux'
        : 'NetSuite consulting and Claude embedded · Benelux',
  })
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <HeroSection />
      <PartnersSection />
      <PillarSection
        namespace="home.netsuite"
        href="/services#netsuite"
        watermark="03"
      />
      <PillarSection
        namespace="home.ai"
        href="/services#ai"
        alignment="right"
        watermark="04"
      />
      <ApproachSection />
      <PeppolMention />
      <ManifestoQuote />
      <FinalCtaSection />
    </>
  )
}
