'use client'

import { useEffect } from 'react'

const routes = new Map([
  ['order', '/demos/order-portal/index.html'],
  ['stock', '/demos/stock-workbench/index.html'],
  ['quote', '/demos/quote-configurator/index.html'],
  ['assistant', '/demos/quote-configurator/index.html'],
])

export function DemoAnchorRedirect({ locale }: { locale: string }) {
  useEffect(() => {
    const follow = () => {
      const anchor = window.location.hash.slice(1)
      const path = routes.get(anchor)
      if (path) window.location.replace(`${path}?lang=${locale === 'fr' ? 'fr' : 'en'}${anchor === 'assistant' ? '#assistant' : ''}`)
    }
    follow()
    window.addEventListener('hashchange', follow)
    return () => window.removeEventListener('hashchange', follow)
  }, [locale])
  return null
}
