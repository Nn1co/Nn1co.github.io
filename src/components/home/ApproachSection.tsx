import { getTranslations } from 'next-intl/server'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Headline } from '@/components/shared/Headline'
import { Rule } from '@/components/shared/Rule'
import { Reveal } from '@/components/motion/Reveal'

type ApproachItem = { label: string; title: string; body: string }

export async function ApproachSection() {
  const t = await getTranslations('home.approach')
  const items = t.raw('items') as ApproachItem[]

  return (
    <Reveal as="section" className="mx-auto max-w-6xl px-6 py-24">
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <Headline as="h2" size="3xl" className="mt-3 max-w-3xl">
        {t('h2Before')}
        <em className="italic text-gold">{t('h2Emphasis')}</em>
        {t('h2After')}
      </Headline>

      <Rule variant="soft" className="my-12" />

      <ol className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {items.map((item) => (
          <li key={item.label} className="flex flex-col gap-4">
            <span className="font-display text-5xl text-gold">{item.label}</span>
            <h3 className="font-display text-2xl text-cream">{item.title}</h3>
            <p className="text-base text-cream-dim">{item.body}</p>
          </li>
        ))}
      </ol>
    </Reveal>
  )
}
