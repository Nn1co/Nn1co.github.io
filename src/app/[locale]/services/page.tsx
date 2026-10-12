import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { ServicePillar } from '@/components/services/ServicePillar'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services.page' })
  return buildMetadata({ locale, path: '/services', title: t('title'), description: t('metaDescription'), ogTitle: locale === 'fr' ? 'ERP, IA et automatisation.' : 'ERP, AI and automation.', ogSubtitle: locale === 'fr' ? 'NetSuite, Odoo et intégration IA' : 'NetSuite, Odoo and AI integration' })
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('services')
  return (
    <div className="wrap">
      <section className="page-intro services-intro">
        <h1>{t('hero.title')}<em>{t('hero.emphasis')}</em></h1>
        <p>{t('hero.lede')}</p>
      </section>
      <ServicePillar id="netsuite" />
      <ServicePillar id="ai" />
      <ServicePillar id="copilot" />
    </div>
  )
}
