import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Rule } from '@/components/shared/Rule'
import { CtaSecondary } from '@/components/shared/CtaSecondary'
import { InkButton } from '@/components/motion/InkButton'
import { Reveal } from '@/components/motion/Reveal'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about.page' })
  return buildMetadata({
    locale,
    path: '/about',
    title: t('title'),
    description: t('metaDescription'),
    ogTitle: 'Thibaut Gendebien.',
  })
}

type Principle = { label: string; title: string; body: string }
type CardItem = { label: string; value: string }

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('about')
  const common = await getTranslations('common')
  const paragraphs = t.raw('narrative.paragraphs') as string[]
  const principles = t.raw('principles.items') as Principle[]
  const cardItems = (t.raw('card.items') as CardItem[] | undefined) ?? []
  const cardEyebrow = t.has('card.eyebrow') ? t('card.eyebrow') : null
  const ctaEmailHint = t.has('cta.emailHint') ? t('cta.emailHint') : null

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-32 md:pt-48">
        <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
        <h1 className="mt-6 font-display text-4xl tracking-tight text-cream md:text-5xl">
          {t('hero.h1')}
        </h1>
        <p className="mt-8 max-w-prose text-lg text-cream-dim md:text-xl">
          {t('hero.lede')}
        </p>
      </section>

      <Reveal as="section" className="mx-auto max-w-6xl px-6 py-24">
        <Eyebrow>{t('narrative.eyebrow')}</Eyebrow>
        <Rule variant="soft" className="mt-6" />
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr]">
          {cardItems.length ? (
            <aside
              aria-label={cardEyebrow ?? undefined}
              className="relative self-start border border-rule-soft bg-ink-soft/40 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-rule-jade"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-2 border border-rule-soft/60"
              />
              <div className="relative">
                {cardEyebrow ? (
                  <p className="font-mono text-[10px] uppercase tracking-widest text-cream-muted">
                    <span className="text-jade">/</span> {cardEyebrow.replace(/^\/\s*/, '')}
                  </p>
                ) : null}
                <Rule variant="dotted" className="my-4" />
                <dl className="space-y-4">
                  {cardItems.map((item) => (
                    <div key={item.label} className="flex flex-col gap-1">
                      <dt className="font-mono text-[10px] uppercase tracking-widest text-cream-muted">
                        {item.label}
                      </dt>
                      <dd className="font-display text-base leading-snug text-cream md:text-lg">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          ) : (
            <div aria-hidden="true" className="hidden lg:block" />
          )}
          <div className="space-y-6 text-lg text-cream-dim md:text-xl">
            {paragraphs.map((para, idx) => (
              <p key={idx} className="max-w-prose">
                {para}
              </p>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="mx-auto max-w-6xl px-6 py-24">
        <Eyebrow>{t('principles.eyebrow')}</Eyebrow>
        <Rule variant="soft" className="my-10" />
        <ol className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {principles.map((principle) => (
            <li key={principle.label} className="flex flex-col gap-4">
              <span className="font-display text-5xl text-gold">{principle.label}</span>
              <h3 className="font-display text-2xl text-cream">{principle.title}</h3>
              <p className="text-base text-cream-dim">{principle.body}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal as="section" className="mx-auto max-w-6xl px-6 py-24">
        <Eyebrow>{t('cta.eyebrow')}</Eyebrow>
        <h2 className="mt-3 font-display text-3xl text-cream md:text-4xl">
          {t('cta.h2')}
        </h2>
        <p className="mt-6 max-w-prose text-lg text-cream-dim">{t('cta.lede')}</p>
        <Rule variant="soft" className="my-10" />
        <div className="flex flex-wrap items-center gap-6">
          <InkButton href={`mailto:${common('email')}`}>{t('cta.primary')}</InkButton>
          <CtaSecondary href={common('linkedinUrl')} external>
            {t('cta.secondary')}
          </CtaSecondary>
        </div>
        {ctaEmailHint ? (
          <p className="mt-4 font-mono text-[11px] tracking-wide text-cream-muted">
            <a
              href={`mailto:${common('email')}`}
              className="border-b border-dotted border-rule-dotted pb-px transition-colors duration-200 hover:border-gold hover:text-cream"
            >
              {ctaEmailHint}
            </a>
          </p>
        ) : null}
      </Reveal>
    </>
  )
}
