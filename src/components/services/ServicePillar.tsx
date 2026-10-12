import { getTranslations } from 'next-intl/server'

type Block = { title: string; body: string }

export async function ServicePillar({ id }: { id: 'netsuite' | 'ai' | 'copilot' }) {
  const t = await getTranslations(`services.${id}`)
  const blocks = t.raw('blocks') as Block[]
  return (
    <section id={id} className="service-detail">
      <div><p className="eyebrow">{t('eyebrow')}</p><h2>{t('title')}</h2><p>{t('lede')}</p></div>
      <ul className="detail-list">
        {blocks.map((block) => <li key={block.title}><h3>{block.title}</h3><p>{block.body}</p></li>)}
      </ul>
    </section>
  )
}
