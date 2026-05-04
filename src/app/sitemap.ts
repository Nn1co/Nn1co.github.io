import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { SITE_URL } from '@/lib/seo'

const STATIC_PATHS = ['', '/services', '/about', '/contact', '/legal/privacy', '/legal/notice']

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const path of STATIC_PATHS) {
    for (const locale of routing.locales) {
      const url = `${SITE_URL}/${locale}${path}`
      const alternates: Record<string, string> = {}
      for (const code of routing.locales) {
        alternates[code] = `${SITE_URL}/${code}${path}`
      }
      entries.push({
        url,
        lastModified,
        changeFrequency: 'monthly',
        priority: path === '' ? 1 : 0.7,
        alternates: { languages: alternates },
      })
    }
  }

  return entries
}
