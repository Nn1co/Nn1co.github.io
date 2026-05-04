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
  const t = await getTranslations({ locale, namespace: 'contact.page' })
  return buildMetadata({
    locale,
    path: '/contact',
    title: t('title'),
    description: t('metaDescription'),
    ogTitle: locale === 'fr' ? 'Écrire.' : 'Write.',
  })
}

type Block = { label: string; value: string; kind: 'email' | 'linkedin' | 'text' }
type Signal = { label: string; value: string }

const MAILTO_BODY_FR =
  "Bonjour Thibaut,%0D%0A%0D%0AContexte : NetSuite [version, modules]. Sujet : [le vrai problème]. Disponibilité visio : [créneaux].%0D%0A%0D%0AMerci."
const MAILTO_BODY_EN =
  "Hi Thibaut,%0D%0A%0D%0AContext: NetSuite [version, modules]. Topic: [the real issue]. Video availability: [time slots].%0D%0A%0D%0AThanks."

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('contact')
  const common = await getTranslations('common')
  const blocks = t.raw('blocks') as Block[]
  const signals = (t.raw('signals') as Signal[] | undefined) ?? []
  const ctaPrimary = t.has('hero.ctaPrimary') ? t('hero.ctaPrimary') : null
  const ctaSecondary = t.has('hero.ctaSecondary') ? t('hero.ctaSecondary') : null
  const subject = locale === 'fr' ? 'Sujet NetSuite' : 'NetSuite topic'
  const body = locale === 'fr' ? MAILTO_BODY_FR : MAILTO_BODY_EN
  const mailtoHref = `mailto:${common('email')}?subject=${encodeURIComponent(subject)}&body=${body}`

  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pb-12 pt-32 md:pt-48">
        <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
        <h1 className="mt-6 font-display text-4xl tracking-tight text-cream md:text-5xl">
          {t('hero.h1')}
        </h1>
        <p className="mt-6 max-w-prose text-lg text-cream-dim md:text-xl">
          {t('hero.lede')}
        </p>
        {ctaPrimary ? (
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <InkButton href={mailtoHref}>{ctaPrimary}</InkButton>
            {ctaSecondary ? (
              <CtaSecondary href={common('linkedinUrl')} external>
                {ctaSecondary}
              </CtaSecondary>
            ) : null}
          </div>
        ) : null}
      </section>

      {signals.length ? (
        <section className="mx-auto max-w-3xl px-6">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-6 border-t border-rule-soft pt-8 sm:grid-cols-3">
            {signals.map((signal) => (
              <div key={signal.label} className="flex flex-col gap-1">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-cream-muted">
                  {signal.label}
                </dt>
                <dd className="font-display text-lg text-cream md:text-xl">
                  {signal.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <Reveal as="section" className="mx-auto max-w-3xl px-6 py-24">
        <ul className="space-y-0">
          {blocks.map((block, idx) => (
            <li key={idx}>
              {idx > 0 && <Rule variant="soft" />}
              <ContactBlock block={block} commonEmail={common('email')} commonLinkedin={common('linkedinUrl')} />
            </li>
          ))}
        </ul>
        <Rule variant="soft" />
        <p className="mt-12 max-w-prose text-base italic text-cream-dim">
          {t('closing')}
        </p>
      </Reveal>
    </>
  )
}

function ContactBlock({
  block,
  commonEmail,
  commonLinkedin,
}: {
  block: Block
  commonEmail: string
  commonLinkedin: string
}) {
  const linkClass =
    'font-display text-xl text-cream transition-colors hover:text-gold md:text-2xl'

  return (
    <div className="grid grid-cols-1 gap-2 py-6 md:grid-cols-[1fr_3fr] md:items-baseline md:gap-8 md:py-8">
      <div className="font-mono text-xs uppercase tracking-widest text-cream-muted">
        {block.label}
      </div>
      <div>
        {block.kind === 'email' && (
          <a href={`mailto:${commonEmail}`} className={linkClass}>
            {block.value}
          </a>
        )}
        {block.kind === 'linkedin' && (
          <a
            href={commonLinkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {block.value} ↗
          </a>
        )}
        {block.kind === 'text' && (
          <span className="font-display text-xl text-cream md:text-2xl">{block.value}</span>
        )}
      </div>
    </div>
  )
}
