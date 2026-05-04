import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Header } from '@/components/nav/Header'
import { Footer } from '@/components/Footer'
import { ConsentBanner } from '@/components/consent/ConsentBanner'
import { JsonLd } from '@/components/seo/JsonLd'
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
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <ConsentBanner />
    </NextIntlClientProvider>
  )
}
