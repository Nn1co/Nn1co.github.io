import { getTranslations } from 'next-intl/server'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Rule } from '@/components/shared/Rule'
import { Reveal } from '@/components/motion/Reveal'

export async function PeppolMention() {
  const t = await getTranslations('home.peppol')

  return (
    <Reveal as="section" className="mx-auto max-w-6xl px-6 py-20">
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <p className="mt-6 max-w-3xl text-lg text-cream-dim md:text-xl">
        {t('body')}
      </p>
      <Rule variant="soft" className="mt-12" />
    </Reveal>
  )
}
