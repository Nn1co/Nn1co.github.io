import { getTranslations } from 'next-intl/server'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Rule } from '@/components/shared/Rule'
import { Reveal } from '@/components/motion/Reveal'
import { SectionWatermark } from '@/components/decorative/SectionWatermark'
import { DataNodes } from '@/components/decorative/DataNodes'

export async function PeppolMention() {
  const t = await getTranslations('home.peppol')
  const tags = t.raw('tags') as string[] | undefined

  return (
    <section className="relative overflow-hidden">
      <SectionWatermark align="right">05</SectionWatermark>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 opacity-50">
        <DataNodes />
      </div>

      <Reveal className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <Eyebrow>{t('eyebrow')}</Eyebrow>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[1fr_3fr]">
          <span
            aria-hidden="true"
            className="font-display text-6xl leading-none text-jade md:text-7xl"
          >
            ¶
          </span>
          <div className="flex flex-col gap-6">
            <p className="max-w-prose text-xl text-cream-dim md:text-2xl">
              {t('body')}
            </p>
            {tags?.length ? (
              <ul className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="border border-rule-jade px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-cream-dim transition-colors duration-200 hover:border-jade hover:text-jade"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
        <Rule variant="soft" className="mt-12" />
      </Reveal>
    </section>
  )
}
