import { getTranslations } from 'next-intl/server'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Rule } from '@/components/shared/Rule'
import { Reveal } from '@/components/motion/Reveal'

type Partner = { name: string; caption: string }

export async function PartnersSection() {
  const t = await getTranslations('home.partners')
  const items = t.raw('items') as Partner[]

  return (
    <Reveal as="section" className="mx-auto max-w-6xl px-6 py-24">
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <p className="mt-3 max-w-prose font-display text-2xl text-cream md:text-3xl">
        {t('headline')}
      </p>
      <Rule variant="soft" className="my-10" />
      <ul className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {items.map((partner, idx) => (
          <li key={partner.name} className="flex flex-col gap-4">
            <span
              className="font-display text-3xl tracking-[0.2em] text-cream md:text-4xl"
              aria-label={partner.name}
            >
              {partner.name}
            </span>
            <Rule variant="dotted" />
            <p className="font-mono text-xs uppercase tracking-widest text-cream-muted">
              {partner.caption}
            </p>
            {idx === 0 && (
              <span aria-hidden="true" className="hidden md:block" />
            )}
          </li>
        ))}
      </ul>
    </Reveal>
  )
}
