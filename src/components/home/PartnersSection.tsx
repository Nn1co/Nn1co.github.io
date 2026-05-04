import { getTranslations } from 'next-intl/server'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Rule } from '@/components/shared/Rule'
import { Reveal } from '@/components/motion/Reveal'
import { Marquee } from '@/components/decorative/Marquee'
import { SectionWatermark } from '@/components/decorative/SectionWatermark'
import { DataNodes } from '@/components/decorative/DataNodes'

type Partner = { name: string; caption: string }

export async function PartnersSection() {
  const t = await getTranslations('home.partners')
  const marquee = await getTranslations('marquee')
  const items = t.raw('items') as Partner[]
  const marqueeItems = marquee.raw('items') as string[]

  return (
    <section className="relative overflow-hidden">
      <SectionWatermark align="right">02</SectionWatermark>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-60">
        <DataNodes />
      </div>

      <Reveal className="relative z-10 mx-auto max-w-6xl px-6 pt-24">
        <Eyebrow>{t('eyebrow')}</Eyebrow>
        <p className="mt-4 max-w-prose font-display text-3xl text-cream md:text-4xl">
          {t('headline')}
        </p>
        <Rule variant="soft" className="my-10" />
        <ul className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {items.map((partner) => (
            <li key={partner.name} className="group flex flex-col gap-4">
              <span
                className="font-display text-4xl tracking-[0.22em] text-cream transition-colors group-hover:text-jade md:text-5xl"
                aria-label={partner.name}
              >
                {partner.name}
              </span>
              <Rule variant="dotted" />
              <p className="font-mono text-xs uppercase tracking-widest text-cream-muted">
                {partner.caption}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="relative z-10 mt-20">
        <Marquee items={marqueeItems} />
      </div>
    </section>
  )
}
