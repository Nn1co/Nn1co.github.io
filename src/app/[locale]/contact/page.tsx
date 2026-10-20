import { ContactComposer, type ContactFormMessages } from '@/components/contact/ContactComposer'
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
  return (
    <div className="wrap">
      <div className="contact-layout">
        <section className="page-intro contact-copy">
          <p className="eyebrow">{t('hero.eyebrow')}</p><h1>{t('hero.title')}</h1><p>{t('hero.lede')}</p>
          <dl className="contact-details">
            <div><dt>{t('emailLabel')}</dt><dd><a className="contact-address" href={`mailto:${email}`}>{email}</a></dd></div>
            <div><dt>{t('linkedinLabel')}</dt><dd><a className="text-link" href={common('linkedinUrl')} target="_blank" rel="noopener noreferrer">TG Tech Consulting</a></dd></div>
          </dl>
        </section>
        <ContactComposer email={email} messages={t.raw('form') as ContactFormMessages} />
      </div>
    </div>
  )
}
