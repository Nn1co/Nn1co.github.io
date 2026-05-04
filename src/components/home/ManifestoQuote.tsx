import { getTranslations } from 'next-intl/server'
import { Reveal } from '@/components/motion/Reveal'

export async function ManifestoQuote() {
  const t = await getTranslations('home.manifesto')

  return (
    <section className="bg-ink-soft py-24">
      <Reveal className="mx-auto max-w-4xl px-6 text-center">
        <blockquote>
          <p className="font-display text-2xl italic leading-snug text-cream md:text-3xl lg:text-4xl">
            « {t('quote')} »
          </p>
          <footer className="mt-8">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">
              {t('signature')}
            </p>
          </footer>
        </blockquote>
      </Reveal>
    </section>
  )
}
