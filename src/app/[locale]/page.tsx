import { setRequestLocale } from 'next-intl/server'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Headline } from '@/components/shared/Headline'
import { Rule } from '@/components/shared/Rule'
import { CtaPrimary } from '@/components/shared/CtaPrimary'
import { CtaSecondary } from '@/components/shared/CtaSecondary'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-6 px-6 pb-24 pt-32 md:pt-48">
      <Eyebrow>№ 00 · Practice · Benelux</Eyebrow>
      <Headline as="h1" size="4xl">
        TG TECH <span className="text-gold">·</span> CONSULTING
      </Headline>
      <p className="max-w-prose text-lg text-cream-dim">
        Site en cours de construction. Lancement prochain — conseil NetSuite et
        intégration IA, pratique indépendante au Benelux.
      </p>
      <Rule variant="dotted" className="my-4" />
      <div className="flex flex-wrap items-center gap-6">
        <CtaPrimary href="/contact">Engager une discussion</CtaPrimary>
        <CtaSecondary href="/services">Voir les services</CtaSecondary>
      </div>
    </div>
  )
}
