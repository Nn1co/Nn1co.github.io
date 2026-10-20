'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

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
    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && readConsentCookie() === null) setShown(true)
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
    <aside className="consent-banner" aria-label={t('label')}>
      <p>{t('message')}</p>
      <div>
        <button type="button" className="button button-small button-outline" onClick={() => handle('refused')}>{t('refuse')}</button>
        <button type="button" className="button button-small" onClick={() => handle('granted')}>{t('accept')}</button>
      </div>
    </aside>
  )
}
