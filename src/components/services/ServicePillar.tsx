import { getTranslations } from 'next-intl/server'

export async function ServicePillar({ id }: { id: 'netsuite' | 'replacements' | 'ai' }) {
  const t = await getTranslations(`services.${id}`)
  const paragraphs = t.raw('paragraphs') as string[]
  return (
    <section id={id} className="service-detail" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>{t('title')}</h2>
      <div className="service-body">
        {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </section>
  )
}
