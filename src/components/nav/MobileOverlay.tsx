'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { LanguageSwitcher } from './LanguageSwitcher'

type MobileOverlayProps = {
  open: boolean
  onClose: () => void
}

export function MobileOverlay({ open, onClose }: MobileOverlayProps) {
  const t = useTranslations()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-overlay"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 overflow-y-auto bg-ink"
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
                className="-mr-2 p-2"
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

            <nav
              aria-label="Primary mobile"
              className="mt-16 flex flex-col gap-6"
            >
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}
