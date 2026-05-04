import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import { fontDisplay, fontBody, fontMono } from './fonts'
import { cn } from '@/lib/cn'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'TG TECH · CONSULTING',
    template: '%s · TG TECH CONSULTING',
  },
  description:
    'Conseil NetSuite et intégration IA pour les opérations métier. Pratique indépendante au Benelux.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  return (
    <html
      lang={locale}
      className={cn(fontDisplay.variable, fontBody.variable, fontMono.variable)}
    >
      <body className="bg-ink font-body text-cream antialiased">{children}</body>
    </html>
  )
}
