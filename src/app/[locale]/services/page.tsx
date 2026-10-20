import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { ServicePillar } from '@/components/services/ServicePillar'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services' })
  return buildMetadata({ locale, path: '/services', title: t('page.title'), description: t('page.metaDescription'), ogTitle: t('hero.title') })
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('services')
  return (
    <div className="wrap">
      <section className="page-intro services-intro">
        <h1>{t('hero.title')}</h1>
      </section>
      <ServicePillar id="netsuite" />
      <ServicePillar id="replacements" />
      <ServicePillar id="ai" />
    </div>
  )
}
