import type { Metadata } from 'next'
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={cn(fontDisplay.variable, fontBody.variable, fontMono.variable)}
    >
      <body className="bg-ink font-body text-cream antialiased">{children}</body>
    </html>
  )
}
