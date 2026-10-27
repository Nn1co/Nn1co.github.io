import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { caseStudy } from '@/lib/caseStudies'
import { CasePreview } from '@/components/work/CasePreview'
import { CaseViewer } from '@/components/work/CaseViewer'
import styles from '@/components/work/CaseStudies.module.css'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'work.page' })
  return buildMetadata({ locale, path: '/work', title: t('title'), description: t('description') })
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const fr = locale === 'fr'
  const projects = ['supply-chain-workbench', 'quick-so', 'prp-v2'] as const
  return <div className={styles.page}>
    <header className={styles.intro}>
      <div><span className={styles.eyebrow}>{fr ? 'Réalisations / 3 parcours métier' : 'Selected work / 3 business workflows'}</span><h1>{fr ? 'Nos réalisations dans NetSuite.' : 'Our work in NetSuite.'}</h1></div>
      <p>{fr ? 'Des applications sur mesure pour vendre, commander et planifier. Explorez les projets et essayez une démonstration similaire.' : 'Custom applications for sales, orders and planning. Explore the projects and try a similar demonstration.'}</p>
    </header>
    <nav className={styles.directory} aria-label={fr ? 'Parcourir les projets' : 'Browse the projects'}>{projects.map((slug, index) => <a href={`#${slug}`} key={slug}><span>0{index + 1}</span>{caseStudy(slug, locale).title}</a>)}</nav>
    <CaseViewer locale={locale}>{projects.map((slug, index) => {
      const project = caseStudy(slug, locale)
      return <article className={styles.case} id={slug} key={slug}>
        <CasePreview image={project.image} path={project.path} title={project.title} locale={locale} />
        <div className={styles.caption}>
          <span className={styles.number}>0{index + 1}</span>
          <div><h2>{project.title}</h2><small>{project.category}</small></div>
          <p>{project.summary}</p>
          <Link href={`/work/${slug}`}>{fr ? 'Le projet' : 'The project'}<span aria-hidden="true">↗</span></Link>
        </div>
      </article>
    })}</CaseViewer>
  </div>
}
