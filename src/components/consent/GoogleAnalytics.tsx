'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

const COOKIE_NAME = 'NEXT_TGTC_CONSENT'

function isGranted(): boolean {
  if (typeof document === 'undefined') return false
  const match = document.cookie
    .split('; ')
    .find((c) => c.startsWith(`${COOKIE_NAME}=`))
  return match?.split('=')[1] === 'granted'
}

export function GoogleAnalytics() {
  const [granted, setGranted] = useState(false)

  useEffect(() => {
    if (!GA_ID) return
    setGranted(isGranted())
    const onGrant = () => setGranted(true)
    window.addEventListener('tgtc:consent-granted', onGrant)
    return () => window.removeEventListener('tgtc:consent-granted', onGrant)
  }, [])

  if (!granted || !GA_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
