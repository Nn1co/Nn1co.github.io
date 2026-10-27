import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { buildMetadata } from '@/lib/seo'
import { ProjectIllustration } from '@/components/work/ProjectIllustration'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'orderWorkflow.page' })
  return buildMetadata({ locale, path: '/netsuite-order-workflow', title: t('title'), description: t('description') })
}

export default async function OrderWorkflowPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('orderWorkflow')
  return <div className="wrap workflow-page">
    <section className="workflow-hero"><div className="page-intro"><p className="eyebrow">{t('hero.audience')}</p><h1>{t('hero.title')}</h1><p>{t('hero.body')}</p><div className="inline-actions"><Link href="/demos#order" className="button">{t('hero.demo')}</Link><Link href="/contact" className="text-link">{t('hero.contact')}</Link></div></div><div className="workflow-art"><ProjectIllustration kind="orders" locale={locale} /><p className="illustration-note">{t('note')}</p></div></section>
    <section className="workflow-process"><h2>{t('stepsTitle')}</h2><ol className="approach-grid">{(t.raw('steps') as { title: string; body: string }[]).map((step, index) => <li key={step.title}><span className="step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.body}</p></li>)}</ol><Link href="/work/prp-v2" className="text-link">{t('related')}</Link></section>
  </div>
}
