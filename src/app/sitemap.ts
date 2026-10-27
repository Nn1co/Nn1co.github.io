import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { SITE_URL } from '@/lib/seo'
import { PROJECT_SLUGS } from '@/lib/projects'

const STATIC_PATHS = ['', '/demos', '/work', '/netsuite-order-workflow', '/services', '/contact', ...PROJECT_SLUGS.map((slug) => `/work/${slug}`)]

export default function sitemap(): MetadataRoute.Sitemap {
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
        alternates: { languages: alternates },
      })
    }
  }

  return entries
}
