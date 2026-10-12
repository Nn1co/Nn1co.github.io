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
    'Conseil ERP NetSuite et Odoo, intégration IA et automatisation des opérations métier. Accompagnement à distance.',
  applicationName: 'TG TECH CONSULTING',
  authors: [{ name: 'Thibaut Gendebien' }],
  creator: 'Thibaut Gendebien',
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
        <a
          href="#main"
          className="skip-link"
        >
          {locale === 'fr' ? 'Aller au contenu' : 'Skip to content'}
        </a>
        {children}
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
