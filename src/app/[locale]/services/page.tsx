import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { ServicePillar } from '@/components/services/ServicePillar'
import { buildMetadata } from '@/lib/seo'
import { Link } from '@/i18n/navigation'

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
        <p>{t('hero.body')}</p>
        <Link href="/netsuite-order-workflow" className="text-link">{t('hero.orders')}</Link>
      </section>
      <ServicePillar id="netsuite" />
      <ServicePillar id="replacements" />
      <ServicePillar id="ai" />
      <section className="service-detail" aria-labelledby="stock-title">
        <h2 id="stock-title">{t('stock.title')}</h2>
        <div className="service-body"><p>{t('stock.body')}</p><Link href="/work/supply-chain-workbench" className="text-link">{t('stock.link')}</Link></div>
      </section>
    </div>
  )
}
