'use client'

import { useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  return (
    <nav aria-label={locale === 'fr' ? 'Langue' : 'Language'} className="language-switcher">
      <Link href={pathname} locale="fr" lang="fr" aria-label="Français" aria-current={locale === 'fr' ? 'true' : undefined}>FR</Link>
      <span aria-hidden="true">/</span>
      <Link href={pathname} locale="en" lang="en" aria-label="English" aria-current={locale === 'en' ? 'true' : undefined}>EN</Link>
    </nav>
  )
}
