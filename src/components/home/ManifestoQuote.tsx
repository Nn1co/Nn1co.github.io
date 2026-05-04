import { getTranslations } from 'next-intl/server'
import { Reveal } from '@/components/motion/Reveal'
import { ParticleField } from '@/components/decorative/ParticleField'
import { DriftingFog } from '@/components/decorative/DriftingFog'
import { Scanline } from '@/components/decorative/Scanline'

export async function ManifestoQuote() {
  const t = await getTranslations('home.manifesto')

  return (
    <section className="relative overflow-hidden bg-ink-soft py-32">
      <DriftingFog intensity="strong" />
      <ParticleField density="high" palette="jade" />
      <Scanline />
      <Scanline delaySeconds={5.5} />

      <Reveal className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <blockquote>
          <p className="breathe font-display text-2xl font-light italic leading-snug text-cream md:text-3xl lg:text-4xl">
            {t('quote')}
          </p>
          <footer className="mt-10">
            <p className="font-mono text-xs uppercase tracking-widest text-jade">
              {t('signature')}
            </p>
          </footer>
        </blockquote>
      </Reveal>
    </section>
  )
}
