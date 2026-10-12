'use client'

import { Chevron } from '@/components/shared/Chevron'
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
  useEffect(() => setOpen(false), [pathname, locale])

  const links = [
    { href: '/', label: t('home') },
    { href: '/services', label: t('services') },
    { href: '/about', label: t('about') },
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
          <Link href="/contact" className="button button-small">{t('contact')} <Chevron /></Link>
          <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls={open ? 'mobile-navigation' : undefined} aria-label={open ? t('close') : t('menu')} onClick={() => setOpen(!open)}>
            <span>{open ? t('close') : t('menu')}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={open ? 'M5 5l14 14M5 19L19 5' : 'M3 8h18M3 16h18'} /></svg>
          </button>
        </div>
      </div>
      {open && <nav id="mobile-navigation" className="wrap mobile-nav" aria-label={t('primary')}>{navigation}<Link href="/contact" className="nav-link" aria-current={pathname === '/contact' ? 'page' : undefined} onClick={() => setOpen(false)}>{t('contact')}{' '}<Chevron /></Link></nav>}
    </header>
  )
}
