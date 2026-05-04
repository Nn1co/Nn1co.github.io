'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { LanguageSwitcher } from './LanguageSwitcher'
import { cn } from '@/lib/cn'

type MobileOverlayProps = {
  open: boolean
  onClose: () => void
}

export function MobileOverlay({ open, onClose }: MobileOverlayProps) {
  const t = useTranslations()
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => setAnimateIn(true))
      return () => cancelAnimationFrame(id)
    }
    setAnimateIn(false)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 overflow-y-auto bg-ink transition-transform duration-300 ease-out',
        animateIn ? 'translate-x-0' : 'translate-x-full'
      )}
      role="dialog"
      aria-modal="true"
      aria-label={t('nav.menu')}
    >
      <div className="flex min-h-screen flex-col px-6 py-6">
        <div className="flex items-center justify-between">
          <span className="font-display text-base tracking-wide text-cream">
            TG TECH <span className="text-gold">·</span> CONSULTING
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('nav.close')}
            className="-mr-2 rounded p-2"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <line x1="3" y1="3" x2="19" y2="19" />
              <line x1="19" y1="3" x2="3" y2="19" />
            </svg>
          </button>
        </div>

        <nav aria-label="Primary mobile" className="mt-16 flex flex-col gap-6">
          <Link
            href="/services"
            onClick={onClose}
            className="font-display text-3xl text-cream"
          >
            {t('nav.services')}
          </Link>
          <Link
            href="/about"
            onClick={onClose}
            className="font-display text-3xl text-cream"
          >
            {t('nav.about')}
          </Link>
          <Link
            href="/contact"
            onClick={onClose}
            className="font-display text-3xl text-cream"
          >
            {t('nav.contact')}
          </Link>
        </nav>

        <div className="mt-auto space-y-4 pt-12">
          <a
            href={`mailto:${t('common.email')}`}
            className="block font-mono text-xs uppercase tracking-widest text-cream-dim hover:text-gold"
          >
            {t('common.email')}
          </a>
          <a
            href={t('common.linkedinUrl')}
            target="_blank"
            rel="noopener noreferrer"
            className="block font-mono text-xs uppercase tracking-widest text-cream-dim hover:text-gold"
          >
            {t('footer.linkedin')} ↗
          </a>
          <div className="pt-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  )
}
