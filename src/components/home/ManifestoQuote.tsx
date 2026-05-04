import { getTranslations } from 'next-intl/server'
import { Reveal } from '@/components/motion/Reveal'

export async function ManifestoQuote() {
  const t = await getTranslations('home.manifesto')

  return (
    <section className="relative overflow-hidden bg-ink-soft py-32">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-8 font-display text-[14rem] leading-none text-gold/15 md:left-12 md:top-12 md:text-[20rem]"
      >
        “
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 right-6 font-display text-[14rem] leading-none text-gold/15 md:bottom-12 md:right-12 md:text-[20rem]"
      >
        ”
      </span>
      <Reveal className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <blockquote>
          <p className="breathe font-display text-2xl italic leading-snug text-cream md:text-3xl lg:text-4xl">
            {t('quote')}
          </p>
          <footer className="mt-10">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">
              {t('signature')}
            </p>
          </footer>
        </blockquote>
      </Reveal>
    </section>
  )
}
