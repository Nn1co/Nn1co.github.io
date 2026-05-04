'use client'

import { useTransition } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { cn } from '@/lib/cn'

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const switchTo = (next: Locale) => {
    if (next === locale) return
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
  }

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-rule-soft px-3 py-1.5 font-mono text-xs uppercase tracking-widest',
        isPending && 'opacity-60'
      )}
    >
      {routing.locales.map((code, idx) => (
        <span key={code} className="contents">
          {idx > 0 && <span className="text-cream-muted">·</span>}
          <button
            type="button"
            onClick={() => switchTo(code)}
            aria-current={locale === code ? 'true' : undefined}
            className={cn(
              'transition-colors',
              locale === code
                ? 'text-gold'
                : 'text-cream-dim hover:text-cream'
            )}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  )
}
