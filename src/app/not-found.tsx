import Link from 'next/link'

export default function NotFound() {
  return (
    <html lang="fr">
      <body className="bg-ink text-cream antialiased">
        <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-cream-muted">
            № 404 · Page introuvable
          </p>
          <h1 className="font-display text-3xl text-cream md:text-4xl">
            Cette page n&apos;existe pas.
          </h1>
          <p className="max-w-prose text-cream-dim">
            La page que vous cherchez a peut-être été déplacée, supprimée, ou n&apos;a jamais existé.
          </p>
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-widest text-gold underline-offset-4 hover:underline"
          >
            ← Retour à l&apos;accueil
          </Link>
        </main>
      </body>
    </html>
  )
}
