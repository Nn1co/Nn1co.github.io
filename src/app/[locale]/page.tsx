import { Chevron } from '@/components/shared/Chevron'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }
type Service = { id: string; title: string; body: string; tags: string }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home.page' })
  return buildMetadata({ locale, path: '/', title: t('title'), description: t('metaDescription'), ogTitle: locale === 'fr' ? 'ERP & IA.' : 'ERP & AI.', ogSubtitle: locale === 'fr' ? 'NetSuite, Odoo et intégration IA' : 'NetSuite, Odoo and AI integration' })
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('home')
  const services = t.raw('services.items') as Service[]
  return (
    <>
      <section className="wrap hero">
        <div className="hero-grid">
          <div>
            <h1><span>{t('hero.title')}</span><span>{t('hero.line')}</span><em>{t('hero.emphasis')}</em></h1>
            <Link href="/contact" className="button">{t('hero.primary')}<Chevron /></Link>
          </div>
          <figure className="system-diagram" aria-label={t('hero.diagramLabel')}>
            <figcaption>{t('hero.diagramTitle')}</figcaption>
            <div className="system-core"><strong>NetSuite / Odoo</strong><span>ERP</span></div>
            <div className="system-connections">
              <div className="system-node"><strong>{t('hero.tools')}</strong><small>{t('hero.integration')}</small></div>
              <div className="system-node"><strong>Claude / GPT</strong><small>{t('hero.ai')}</small></div>
            </div>
          </figure>
        </div>
      </section>
      <section id="services" className="wrap section">
        <div className="section-heading">
          <div><p className="eyebrow">{t('services.eyebrow')}</p><h2>{t('services.title')}</h2></div>
        </div>
        {services.map((service, index) => (
          <Link key={service.id} href={`/services#${service.id}`} className="service-row">
            <span className="service-number" aria-hidden="true">0{index + 1}</span><h3>{service.title}</h3>
            <div><p>{service.body}</p><small>{service.tags}</small></div><Chevron />
          </Link>
        ))}
      </section>
      <section className="wrap about-strip">
        <div><p className="eyebrow">{t('about.eyebrow')}</p><h2>{t('about.title')}</h2></div>
        <div><p>{t('about.body')}</p><Link href="/about" className="text-link">{t('about.link')}<Chevron /></Link></div>
      </section>
    </>
  )
}
