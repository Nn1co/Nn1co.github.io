import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Header } from '@/components/nav/Header'
import { Footer } from '@/components/Footer'
import { ConsentBanner } from '@/components/consent/ConsentBanner'
import { JsonLd } from '@/components/seo/JsonLd'
import { TechGrid } from '@/components/decorative/TechGrid'
import { DriftingFog } from '@/components/decorative/DriftingFog'
import { routing, type Locale } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <JsonLd locale={locale} />
      {/* Global ambient backdrop — runs even when the user is idle */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <TechGrid />
        <DriftingFog intensity="subtle" />
      </div>
      <Header />
      <main id="main" className="relative">
        {children}
      </main>
      <Footer />
      <ConsentBanner />
    </NextIntlClientProvider>
  )
}
