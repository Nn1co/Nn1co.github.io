import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { getLocale } from 'next-intl/server'
import { fontDisplay, fontBody, fontMono } from './fonts'
import { cn } from '@/lib/cn'
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
    'Conseil NetSuite et intégration IA pour les opérations métier. Pratique indépendante au Benelux.',
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
      className={cn(fontDisplay.variable, fontBody.variable, fontMono.variable)}
    >
      <body className="bg-ink font-body text-cream antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-ink"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
