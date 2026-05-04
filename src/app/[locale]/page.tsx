import { setRequestLocale } from 'next-intl/server'
import { HeroSection } from '@/components/home/HeroSection'
import { PartnersSection } from '@/components/home/PartnersSection'
import { PillarSection } from '@/components/home/PillarSection'
import { ApproachSection } from '@/components/home/ApproachSection'
import { PeppolMention } from '@/components/home/PeppolMention'
import { ManifestoQuote } from '@/components/home/ManifestoQuote'
import { FinalCtaSection } from '@/components/home/FinalCtaSection'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <HeroSection />
      <PartnersSection />
      <PillarSection namespace="home.netsuite" href="/services#netsuite" />
      <PillarSection
        namespace="home.ai"
        href="/services#ai"
        alignment="right"
      />
      <ApproachSection />
      <PeppolMention />
      <ManifestoQuote />
      <FinalCtaSection />
    </>
  )
}
