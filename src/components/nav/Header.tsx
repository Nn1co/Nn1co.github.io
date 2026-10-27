'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Brand } from '@/components/shared/Brand'

export function Header() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    setOpen(false)
    document.documentElement.lang = locale
  }, [pathname, locale])

  const links = [
    { href: '/netsuite-order-workflow', label: t('orders') },
    { href: '/services', label: t('services') },
  ]
  const navigation = links.map(({ href, label }) => (
    <Link key={href} href={href} className="nav-link" aria-current={pathname === href ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</Link>
  ))

  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus() }
    }}>
      <div className="wrap header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label={t('primary')}>{navigation}</nav>
        <div className="header-actions">
          <LanguageSwitcher />
          <Link href="/contact" className="button button-small">{t('contact')}</Link>
          <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls={open ? 'mobile-navigation' : undefined} aria-label={open ? t('close') : t('menu')} onClick={() => setOpen(!open)}>
            <span>{open ? t('close') : t('menu')}</span>
            <i className={open ? 'menu-lines is-open' : 'menu-lines'} aria-hidden="true" />
          </button>
        </div>
      </div>
      {open && <nav id="mobile-navigation" className="wrap mobile-nav" aria-label={t('primary')}>{navigation}<Link href="/contact" className="nav-link" aria-current={pathname === '/contact' ? 'page' : undefined} onClick={() => setOpen(false)}>{t('contact')}</Link></nav>}
    </header>
  )
}
