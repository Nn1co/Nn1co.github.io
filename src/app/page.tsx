import { Eyebrow } from '@/components/shared/Eyebrow'
import { Headline } from '@/components/shared/Headline'
import { Rule } from '@/components/shared/Rule'

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-6 px-6 py-24">
      <Eyebrow>№ 00 · Practice · Benelux</Eyebrow>
      <Headline as="h1" size="4xl">
        TG TECH <span className="italic text-gold">·</span> CONSULTING
      </Headline>
      <p className="max-w-prose text-lg text-cream-dim">
        Site en cours de construction. Lancement prochain — conseil NetSuite et
        intégration IA, pratique indépendante au Benelux.
      </p>
      <Rule variant="dotted" className="my-2" />
      <p className="font-mono text-xs uppercase tracking-widest text-cream-muted">
        Design system v0 · {new Date().getFullYear()}
      </p>
    </main>
  )
}
