import { getTranslations } from 'next-intl/server'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Headline } from '@/components/shared/Headline'
import { Rule } from '@/components/shared/Rule'
import { CtaSecondary } from '@/components/shared/CtaSecondary'
import { Reveal } from '@/components/motion/Reveal'
import { HoverLetters } from '@/components/motion/HoverLetters'
import { SectionWatermark } from '@/components/decorative/SectionWatermark'
import { cn } from '@/lib/cn'

type Block = { label: string; title: string; body: string }

type PillarSectionProps = {
  namespace: 'home.netsuite' | 'home.ai'
  href: string
  alignment?: 'left' | 'right'
  watermark?: string
}

export async function PillarSection({
  namespace,
  href,
  alignment = 'left',
  watermark,
}: PillarSectionProps) {
  const t = await getTranslations(namespace)
  const blocks = t.raw('blocks') as Block[]

  return (
    <section className="relative overflow-hidden">
      {watermark && (
        <SectionWatermark align={alignment === 'right' ? 'left' : 'right'}>
          {watermark}
        </SectionWatermark>
      )}
      <Reveal className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <div
          className={cn(
            'flex flex-col gap-6',
            alignment === 'right' && 'lg:items-end lg:text-right'
          )}
        >
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <Headline as="h2" size="3xl" className="max-w-3xl">
            {t('h2Before')}
            <em className="italic text-gold ink-bleed">
              <HoverLetters>{t('h2Emphasis')}</HoverLetters>
            </em>
            {t('h2After')}
          </Headline>
          <p className="max-w-prose text-lg text-cream-dim">{t('lede')}</p>
        </div>

        <Rule variant="soft" className="my-12" />

        <ul className="grid grid-cols-1 gap-px bg-rule-soft md:grid-cols-3">
          {blocks.map((block) => (
            <li
              key={block.label}
              className="lift-card group bg-ink p-6 hover:bg-ink-soft md:p-8"
            >
              <div className="mb-4 flex items-baseline gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-jade">
                  {block.label}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-cream-muted">
                  /
                </span>
                <h3 className="font-display text-xl text-cream transition-colors group-hover:text-jade">
                  <HoverLetters intensity="soft">{block.title}</HoverLetters>
                </h3>
              </div>
              <p className="text-base text-cream-dim">{block.body}</p>
            </li>
          ))}
        </ul>

        <div
          className={cn(
            'mt-10 flex',
            alignment === 'right' ? 'lg:justify-end' : 'lg:justify-start'
          )}
        >
          <CtaSecondary href={href}>{t('cta')}</CtaSecondary>
        </div>
      </Reveal>
    </section>
  )
}
