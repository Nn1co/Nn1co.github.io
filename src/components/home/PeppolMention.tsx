import { getTranslations } from 'next-intl/server'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Rule } from '@/components/shared/Rule'
import { Reveal } from '@/components/motion/Reveal'
import { SectionWatermark } from '@/components/decorative/SectionWatermark'
import { DataNodes } from '@/components/decorative/DataNodes'

export async function PeppolMention() {
  const t = await getTranslations('home.peppol')

  return (
    <section className="relative overflow-hidden">
      <SectionWatermark align="right">06</SectionWatermark>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 opacity-50">
        <DataNodes />
      </div>

      <Reveal className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <Eyebrow>{t('eyebrow')}</Eyebrow>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[1fr_3fr]">
          <span
            aria-hidden="true"
            className="font-display text-6xl text-jade md:text-7xl"
          >
            ¶
          </span>
          <p className="max-w-prose text-xl text-cream-dim md:text-2xl">
            {t('body')}
          </p>
        </div>
        <Rule variant="soft" className="mt-12" />
      </Reveal>
    </section>
  )
}
