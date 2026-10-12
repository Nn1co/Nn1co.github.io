import { Chevron } from '@/components/shared/Chevron'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact.page' })
  return buildMetadata({ locale, path: '/contact', title: t('title'), description: t('metaDescription'), ogTitle: locale === 'fr' ? 'Écrire.' : 'Write.' })
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('contact')
  const common = await getTranslations('common')
  const email = common('email')
  const mailto = `mailto:${email}?subject=${encodeURIComponent(t('subject'))}&body=${encodeURIComponent(t('draft'))}`
  return (
    <div className="wrap">
      <section className="page-intro">
        <p className="eyebrow">{t('hero.eyebrow')}</p><h1>{t('hero.title')}</h1><p>{t('hero.lede')}</p>
      </section>
      <div className="contact-actions">
        <a href={mailto} className="button">{t('hero.primary')}<Chevron /></a>
        <a href={common('linkedinUrl')} className="text-link" target="_blank" rel="noopener noreferrer">{t('hero.secondary')}<Chevron /></a>
      </div>
      <dl className="contact-details">
        <div><dt>{t('emailLabel')}</dt><dd><a href={`mailto:${email}`}>{email}</a></dd></div>
        <div><dt>{t('linkedinLabel')}</dt><dd><a href={common('linkedinUrl')} target="_blank" rel="noopener noreferrer">Thibaut Gendebien <Chevron /></a></dd></div>
      </dl>
    </div>
  )
}
