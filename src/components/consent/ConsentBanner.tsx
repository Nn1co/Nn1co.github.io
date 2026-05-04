'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const COOKIE_NAME = 'NEXT_TGTC_CONSENT'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

function readConsentCookie(): 'granted' | 'refused' | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie
    .split('; ')
    .find((c) => c.startsWith(`${COOKIE_NAME}=`))
  if (!match) return null
  const value = match.split('=')[1]
  if (value === 'granted' || value === 'refused') return value
  return null
}

function writeConsentCookie(value: 'granted' | 'refused') {
  document.cookie = `${COOKIE_NAME}=${value}; max-age=${COOKIE_MAX_AGE}; path=/; samesite=lax`
}

export function ConsentBanner() {
  const t = useTranslations('consent')
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (readConsentCookie() === null) setShown(true)
  }, [])

  if (!shown) return null

  const handle = (decision: 'granted' | 'refused') => {
    writeConsentCookie(decision)
    setShown(false)
    if (decision === 'granted') {
      window.dispatchEvent(new Event('tgtc:consent-granted'))
    }
  }

  return (
    <div
      role="dialog"
      aria-label={t('label')}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-rule-soft bg-ink/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm text-cream-dim">
          {t('message')}{' '}
          <Link
            href="/legal/privacy"
            className="border-b border-dotted border-rule-dotted text-cream transition-colors hover:border-gold hover:text-gold"
          >
            {t('learnMore')}
          </Link>
        </p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => handle('refused')}
            className="font-mono text-xs uppercase tracking-widest text-cream-dim transition-colors hover:text-cream"
          >
            {t('refuse')}
          </button>
          <button
            type="button"
            onClick={() => handle('granted')}
            className="rounded-full bg-gold px-5 py-2 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:bg-gold-dim"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  )
}
