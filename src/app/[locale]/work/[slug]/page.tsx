import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { CasePreview } from '@/components/work/CasePreview'
import styles from '@/components/work/CaseStudies.module.css'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { PROJECT_SLUGS } from '@/lib/projects'
import { caseStudy } from '@/lib/caseStudies'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string; slug: string }> }
type ProjectCopy = {
  title: string
  summary: string
  problem: string
  solutionLabel?: string
  solution: string
  forYou: string
}

function projectSlug(slug: string) {
  return PROJECT_SLUGS.find((project) => project === slug) ?? notFound()
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => PROJECT_SLUGS.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const project = projectSlug(slug)
  const visual = caseStudy(project, locale)
  return buildMetadata({
    locale,
    path: `/work/${project}`,
    title: visual.title,
    description: visual.summary,
  })
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params
  const project = projectSlug(slug)
  setRequestLocale(locale)
  const t = await getTranslations('work')
  const copy = t.raw(`items.${project}`) as ProjectCopy
  const visual = caseStudy(project, locale)
  const fr = locale === 'fr'

  return (
    <div className={`${styles.page} project-page`}>
      <Link href="/work" className={styles.back}>← {t('back')}</Link>
      <header className={styles.projectHead}>
        <div><span className={styles.eyebrow}>{visual.category}</span><h1>{visual.title}</h1></div>
        <p>{visual.summary}</p>
      </header>
      <CasePreview image={visual.image} path={visual.path} title={visual.title} locale={locale} />
      <div className={styles.story}>
        <section>
          <h2>{t('problemLabel')}</h2>
          <p>{visual.problem}</p>
          <details><summary>{fr ? 'Le contexte' : 'The context'}</summary><p>{copy.problem}</p></details>
        </section>
        <section>
          <h2>{copy.solutionLabel ?? t('solutionLabel')}</h2>
          <p>{visual.outcome}</p>
          <details><summary>{fr ? 'Les fonctions développées' : 'The features'}</summary>{copy.solution.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</details>
        </section>
      </div>
      <section className={styles.next}>
        <div><h2>{t('offerLabel')}</h2><p>{copy.forYou}</p></div>
        <Link href="/contact" className="button">{t('contactLabel')}</Link>
      </section>
    </div>
  )
}
