import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tgtechconsulting.com'
export const SITE_NAME = 'TG TECH · CONSULTING'

type BuildMetadataInput = {
  locale: string
  path: string
  title: string
  description: string
  ogTitle?: string
  ogSubtitle?: string
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  ogTitle,
  ogSubtitle,
}: BuildMetadataInput): Metadata {
  const cleanPath = path === '/' ? '' : path
  const url = `${SITE_URL}/${locale}${cleanPath}`
  const alternates: Record<string, string> = {}
  for (const code of routing.locales) {
    alternates[code] = `${SITE_URL}/${code}${cleanPath}`
  }
  alternates['x-default'] = `${SITE_URL}/${routing.defaultLocale}${cleanPath}`

  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(ogTitle ?? title)}${
    ogSubtitle ? `&subtitle=${encodeURIComponent(ogSubtitle)}` : ''
  }`

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: url,
      languages: alternates,
    },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      title,
      description,
      locale,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle ?? title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}
