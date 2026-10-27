import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }
type Item = { title: string; body: string }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'orderWorkflow' })
  return buildMetadata({ locale, path: '/netsuite-order-workflow', title: t('page.title'), description: t('page.description') })
}

export default async function OrderWorkflowPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('orderWorkflow')
  const steps = t.raw('example.steps') as Item[]
  const options = t.raw('options.items') as Item[]
  const transcript = t.raw('video.transcript') as { time: string; text: string }[]

  return (
    <div className="wrap workflow-page">
      <section className="page-intro workflow-intro">
        <p className="eyebrow">{t('hero.audience')}</p>
        <h1>{t('hero.title')} <em>{t('hero.emphasis')}</em></h1>
        <p>{t('hero.body')}</p>
        <div className="workflow-actions">
          <Link href="/contact" className="button">{t('contact.cta')}</Link>
          <a href="#example" className="text-link">{t('hero.secondary')}</a>
        </div>
      </section>

      <section id="example" className="workflow-section" aria-labelledby="example-title">
        <div className="workflow-heading">
          <p className="eyebrow">{t('example.label')}</p>
          <h2 id="example-title">{t('example.title')}</h2>
          <p>{t('example.disclosure')}</p>
        </div>
        <figure className="workflow-video">
          <video controls playsInline preload="metadata" width="1920" height="1080" poster="/proof/video/poster.png" aria-label={t('video.label')} aria-describedby="video-method">
            <source src="/proof/video/master-65s.mp4" type="video/mp4" />
            <track kind="captions" src="/proof/video/fr.vtt" srcLang="fr" label="Français" default={locale === 'fr'} />
            <track kind="captions" src="/proof/video/en.vtt" srcLang="en" label="English" default={locale === 'en'} />
          </video>
          <figcaption id="video-method">{t('video.method')}</figcaption>
        </figure>
        <div className="video-resources">
          <a href="/proof/demo/index.html" className="text-link">{t('video.demo')}</a>
          <details className="video-transcript">
            <summary>{t('video.transcriptLabel')}</summary>
            <ol>{transcript.map((cue) => <li key={cue.time}><span>{cue.time}</span><p>{cue.text}</p></li>)}</ol>
          </details>
          <a href="/proof/video/master-65s.mp4" className="text-link">{t('video.download')}</a>
        </div>
        <div className="workflow-example">
          <p className="eyebrow">{t('video.stepsLabel')}</p>
          <ol className="workflow-steps">
            {steps.map((step, index) => <li key={step.title}>
              <span className="step-number" aria-hidden="true">0{index + 1}</span>
              <div><h3>{step.title}</h3><p>{step.body}</p></div>
            </li>)}
          </ol>
        </div>
      </section>

      <section className="workflow-section" aria-labelledby="options-title">
        <div className="workflow-heading"><h2 id="options-title">{t('options.title')}</h2><p>{t('options.body')}</p></div>
        <div className="workflow-options">{options.map((option) => <div key={option.title}><h3>{option.title}</h3><p>{option.body}</p></div>)}</div>
      </section>

      <section className="workflow-section workflow-scope" aria-labelledby="scope-title">
        <div className="workflow-heading"><h2 id="scope-title">{t('scope.title')}</h2><p>{t('scope.body')}</p><p>{t('scope.diagnostic')}</p></div>
        <div><h3>{t('scope.acceptanceTitle')}</h3><ul>{(t.raw('scope.acceptance') as string[]).map((item) => <li key={item}>{item}</li>)}</ul><p className="workflow-boundary">{t('scope.boundary')}</p></div>
      </section>

      <section className="workflow-section workflow-evidence" aria-labelledby="evidence-title">
        <div className="workflow-heading"><p className="eyebrow">{t('evidence.label')}</p><h2 id="evidence-title">{t('evidence.title')}</h2><p>{t('evidence.body')}</p></div>
        <div><Link href="/work/prp-v2" className="text-link">{t('evidence.link')}</Link><p className="workflow-boundary">{t('evidence.limit')}</p><Link href="/work/supply-chain-workbench" className="text-link">{t('evidence.stock')}</Link></div>
      </section>

      <section className="workflow-contact" aria-labelledby="workflow-contact-title">
        <p className="eyebrow">{t('contact.label')}</p>
        <h2 id="workflow-contact-title">{t('contact.title')}</h2>
        <p>{t('contact.questions')}</p>
        <Link href="/contact" className="button">{t('contact.cta')}</Link>
        <p className="workflow-boundary">{t('contact.privacy')}</p>
      </section>
    </div>
  )
}
