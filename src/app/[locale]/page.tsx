import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { buildMetadata } from '@/lib/seo'
import { ProjectIllustration } from '@/components/work/ProjectIllustration'
import type { ProjectSlug } from '@/lib/projects'

type Props = { params: Promise<{ locale: string }> }
type Service = { slug: ProjectSlug; kind: 'orders' | 'portal' | 'supply' | 'assistant'; title: string; body: string; example: string }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home.page' })
  return buildMetadata({ locale, path: '/', title: t('title'), description: t('metaDescription'), ogTitle: locale === 'fr' ? 'NetSuite, en plus simple.' : 'Easier NetSuite.', ogSubtitle: locale === 'fr' ? 'Simplifier la préparation des commandes' : 'Simpler order preparation' })
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('home')
  const services = t.raw('services.items') as Service[]
  return (
    <>
      <section className="wrap home-hero">
        <h1><span>{t('hero.title')}</span>{' '}<em>{t('hero.emphasis')}</em></h1>
        <p>{t('hero.description')}<br />{t('hero.detail')}</p>
        <div className="hero-actions">
          <Link href="/netsuite-order-workflow" className="button">{t('hero.primary')}</Link>
          <a href="#services" className="text-link">{t('hero.secondary')}</a>
        </div>
      </section>
      <section id="services" className="wrap home-work" aria-label={t('services.label')}>
        {services.map((service, index) => (
          <article key={service.slug} className={`work-row${index % 2 ? ' work-row-reverse' : ''}`}>
            <div className="work-copy">
              <h2>{service.title}</h2>
              <p className="work-description">{service.body}</p>
              <div className="service-example">
                <p className="example-label">{t('services.exampleLabel')}</p>
                <Link href={`/work/${service.slug}`} className="example-link">{service.example}</Link>
              </div>
            </div>
            <div className="work-visual"><ProjectIllustration kind={service.kind} locale={locale} /></div>
          </article>
        ))}
      </section>
    </>
  )
}
