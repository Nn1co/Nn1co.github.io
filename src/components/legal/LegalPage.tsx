import { getTranslations } from 'next-intl/server'

type Section = { title: string; body: string }
type Props = { namespace: 'legal.privacy' }

export async function LegalPage({ namespace }: Props) {
  const t = await getTranslations(namespace)
  const sections = t.raw('sections') as Section[]
  return (
    <article className="wrap legal-page">
      <h1>{t('h1')}</h1><p>{t('intro')}</p>
      {sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}
    </article>
  )
}
