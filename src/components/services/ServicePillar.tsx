import { getTranslations } from 'next-intl/server'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Headline } from '@/components/shared/Headline'
import { Rule } from '@/components/shared/Rule'
import { Reveal } from '@/components/motion/Reveal'

type Block = { label: string; title: string; body: string }

type ServicePillarProps = {
  id: string
  namespace: 'services.netsuite' | 'services.ai'
}

export async function ServicePillar({ id, namespace }: ServicePillarProps) {
  const t = await getTranslations(namespace)
  const blocks = t.raw('blocks') as Block[]

  return (
    <Reveal as="section" id={id} className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <Headline as="h2" size="3xl" className="mt-3 max-w-3xl">
        {t('h2Before')}
        <em className="italic text-gold">{t('h2Emphasis')}</em>
        {t('h2After')}
      </Headline>
      <p className="mt-6 max-w-prose text-lg text-cream-dim">{t('lede')}</p>

      <Rule variant="soft" className="my-12" />

      <ul className="grid grid-cols-1 gap-px bg-rule-soft md:grid-cols-2">
        {blocks.map((block) => (
          <li
            key={block.label}
            className="bg-ink p-6 transition-colors duration-300 hover:bg-ink-soft md:p-10"
          >
            <div className="mb-4 flex items-baseline gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-gold">
                {block.label}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-cream-muted">
                /
              </span>
              <h3 className="font-display text-xl text-cream md:text-2xl">
                {block.title}
              </h3>
            </div>
            <p className="text-base text-cream-dim">{block.body}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}
