import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }
type ProfileItem = { date: string; title: string; subtitle: string; body: string }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about.page' })
  return buildMetadata({ locale, path: '/about', title: t('title'), description: t('metaDescription'), ogTitle: 'Thibaut Gendebien.' })
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('about')
  const common = await getTranslations('common')
  const details = t.raw('details') as { label: string; value: string }[]
  const paragraphs = t.raw('paragraphs') as string[]
  const career = t.raw('career.items') as ProfileItem[]
  const qualifications = t.raw('qualifications.items') as ProfileItem[]
  const languages = t.raw('languages.items') as { name: string; level: string }[]
  return (
    <div className="wrap">
      <section className="page-intro">
        <p className="eyebrow">{t('hero.eyebrow')}</p><h1>{t('hero.title')}</h1><p>{t('hero.lede')}</p>
      </section>
      <section className="profile" aria-labelledby="profile-title">
        <dl>{details.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
        <div className="profile-copy">
          <h2 id="profile-title">{t('title')}</h2>
          {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <a href={common('linkedinUrl')} className="text-link" target="_blank" rel="noopener noreferrer">{t('link')}</a>
        </div>
      </section>
      <details className="profile-disclosure">
        <summary><span className="eyebrow">{t('career.eyebrow')}</span><h2>{t('career.title')}</h2></summary>
        <ol className="qualification-list career-list">
          {career.map((item) => (
            <li key={item.title}>
              <span className="qualification-year">{item.date}</span>
              <div><h3>{item.title}</h3><p className="qualification-subtitle">{item.subtitle}</p></div>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </details>
      <details className="profile-disclosure">
        <summary><span className="eyebrow">{t('qualifications.eyebrow')}</span><h2>{t('qualifications.title')}</h2></summary>
        <ol className="qualification-list">
          {qualifications.map((item) => (
            <li key={item.title}>
              <span className="qualification-year">{item.date}</span>
              <div><h3>{item.title}</h3><p className="qualification-subtitle">{item.subtitle}</p></div>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </details>
      <details className="profile-disclosure">
        <summary><span className="eyebrow">{t('languages.eyebrow')}</span><h2>{t('languages.title')}</h2></summary>
        <dl className="language-list">
          {languages.map((language) => <div key={language.name}><dt>{language.name}</dt><dd>{language.level}</dd></div>)}
        </dl>
      </details>
    </div>
  )
}
