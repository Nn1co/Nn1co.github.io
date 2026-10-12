import { Chevron } from '@/components/shared/Chevron'
import { getLocale } from 'next-intl/server'
import Link from 'next/link'

export default async function NotFound() {
  const locale = await getLocale()
  const french = locale === 'fr'
  return (
    <main id="main" className="wrap not-found">
      <p className="eyebrow">404</p>
      <h1>{french ? 'Cette page n’existe pas.' : 'This page does not exist.'}</h1>
      <Link href={`/${locale}`} className="button">{french ? 'Retour à l’accueil' : 'Back to home'}<Chevron /></Link>
    </main>
  )
}
