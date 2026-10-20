import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ProjectIllustration } from '@/components/work/ProjectIllustration'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { PROJECT_SLUGS, projectIllustrations } from '@/lib/projects'
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
  const t = await getTranslations({ locale, namespace: 'work' })
  return buildMetadata({
    locale,
    path: `/work/${project}`,
    title: t(`items.${project}.title`),
    description: t(`items.${project}.summary`),
  })
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params
  const project = projectSlug(slug)
  setRequestLocale(locale)
  const t = await getTranslations('work')
  const copy = t.raw(`items.${project}`) as ProjectCopy

  return (
    <div className="wrap project-page">
      <Link href="/#services" className="back-link">{t('back')}</Link>
      <section className="page-intro project-intro">
        <h1>{copy.title}</h1>
        <p>{copy.summary}</p>
      </section>
      <div className="project-visual">
        <ProjectIllustration kind={projectIllustrations[project]} locale={locale} />
      </div>
      <div className="project-story">
        <section>
          <h2>{t('problemLabel')}</h2>
          <p>{copy.problem}</p>
        </section>
        <section>
          <h2>{copy.solutionLabel ?? t('solutionLabel')}</h2>
          {copy.solution.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>
      </div>
      <section className="project-next">
        <div><h2>{t('offerLabel')}</h2><p>{copy.forYou}</p></div>
        <Link href="/contact" className="button">{t('contactLabel')}</Link>
      </section>
    </div>
  )
}
