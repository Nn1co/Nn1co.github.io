import { getTranslations } from 'next-intl/server'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Headline } from '@/components/shared/Headline'
import { Rule } from '@/components/shared/Rule'
import { Reveal } from '@/components/motion/Reveal'
import { HoverLetters } from '@/components/motion/HoverLetters'
import { SectionWatermark } from '@/components/decorative/SectionWatermark'

type ApproachItem = { label: string; title: string; body: string }

export async function ApproachSection() {
  const t = await getTranslations('home.approach')
  const items = t.raw('items') as ApproachItem[]

  return (
    <section className="relative overflow-hidden">
      <SectionWatermark align="center">05</SectionWatermark>
      <Reveal className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <Eyebrow>{t('eyebrow')}</Eyebrow>
        <Headline as="h2" size="3xl" className="mt-3 max-w-3xl">
          {t('h2Before')}
          <em className="italic text-gold ink-bleed">
            <HoverLetters>{t('h2Emphasis')}</HoverLetters>
          </em>
          {t('h2After')}
        </Headline>

        <Rule variant="soft" className="my-12" />

        <ol className="relative grid grid-cols-1 gap-12 md:grid-cols-3">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-rule-jade to-transparent md:block"
          />
          {items.map((item) => (
            <li key={item.label} className="group relative flex flex-col gap-4">
              <span className="font-display text-7xl leading-none text-jade transition-transform duration-500 group-hover:-translate-y-1 md:text-8xl">
                {item.label}
              </span>
              <h3 className="font-display text-2xl text-cream">
                <HoverLetters intensity="soft">{item.title}</HoverLetters>
              </h3>
              <p className="max-w-prose text-base text-cream-dim">{item.body}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  )
}
