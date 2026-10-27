import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { getLocale } from 'next-intl/server'
import { fontBody, fontMono } from './fonts'
import { GoogleAnalytics } from '@/components/consent/GoogleAnalytics'
import { SITE_URL } from '@/lib/seo'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'TG TECH · CONSULTING',
    template: '%s · TG TECH CONSULTING',
  },
  description:
    'Applications NetSuite sur mesure et assistants IA connectés, pensés pour le quotidien de vos équipes.',
  applicationName: 'TG TECH CONSULTING',
  authors: [{ name: 'TG TECH CONSULTING' }],
  creator: 'TG TECH CONSULTING',
  publisher: 'TG TECH CONSULTING',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  return (
    <html
      lang={locale}
      className={`${fontBody.variable} ${fontMono.variable}`}
    >
      <body>
        {children}
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
