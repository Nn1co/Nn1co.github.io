'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileOverlay } from './MobileOverlay'
import { cn } from '@/lib/cn'

export function Header() {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-[padding,background-color,backdrop-filter,border-color] duration-300 ease-out',
          scrolled
            ? 'border-b border-rule-soft bg-ink/85 py-3 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent py-6'
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="font-display text-base tracking-wide text-cream transition-colors hover:text-gold md:text-lg"
            aria-label="TG TECH CONSULTING — accueil"
          >
            TG TECH <span className="text-gold">·</span> CONSULTING
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
            <NavLink href="/services">{t('services')}</NavLink>
            <NavLink href="/about">{t('about')}</NavLink>
            <NavLink href="/contact">{t('contact')}</NavLink>
          </nav>

          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          <button
            type="button"
            className="-mr-2 p-2 md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label={t('menu')}
            aria-expanded={mobileOpen}
          >
            <svg
              width="22"
              height="14"
              viewBox="0 0 22 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <line x1="0" y1="1" x2="22" y2="1" />
              <line x1="0" y1="7" x2="22" y2="7" />
              <line x1="0" y1="13" x2="22" y2="13" />
            </svg>
          </button>
        </div>
      </header>

      <MobileOverlay open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="border-b border-dotted border-transparent pb-0.5 font-mono text-xs uppercase tracking-widest text-cream-dim transition-[color,border-color] duration-200 hover:border-gold hover:text-cream"
    >
      {children}
    </Link>
  )
}
