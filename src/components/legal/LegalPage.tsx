import { getTranslations } from 'next-intl/server'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Rule } from '@/components/shared/Rule'

type Section = { title: string; body: string }

type LegalPageProps = {
  namespace: 'legal.privacy' | 'legal.notice'
  showLastUpdated?: boolean
}

export async function LegalPage({ namespace, showLastUpdated = false }: LegalPageProps) {
  const t = await getTranslations(namespace)
  const shared = await getTranslations('legal.shared')
  const sections = t.raw('sections') as Section[]
  const lastUpdated = showLastUpdated
    ? (() => {
        try {
          return t('lastUpdated')
        } catch {
          return null
        }
      })()
    : null

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-32 md:pt-48">
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h1 className="mt-6 font-display text-3xl text-cream md:text-4xl">
        {t('h1')}
      </h1>
      <p className="mt-6 max-w-prose text-lg text-cream-dim">{t('intro')}</p>

      <Rule variant="soft" className="my-12" />

      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.title} className="space-y-3">
            <h2 className="font-mono text-xs uppercase tracking-widest text-gold">
              {section.title}
            </h2>
            <p className="text-base text-cream-dim">{section.body}</p>
          </section>
        ))}
      </div>

      {lastUpdated && (
        <>
          <Rule variant="soft" className="mt-16" />
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-cream-muted">
            {shared('lastUpdatedLabel')} · {lastUpdated}
          </p>
        </>
      )}
    </article>
  )
}
