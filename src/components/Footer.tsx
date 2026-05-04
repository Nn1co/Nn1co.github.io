import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Rule } from './shared/Rule'

export async function Footer() {
  const t = await getTranslations()

  return (
    <footer className="mt-24 border-t border-rule-soft">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <p className="font-display text-xl tracking-wide text-cream md:text-2xl">
            {t('footer.brand')}
          </p>
          <p className="mt-1 text-sm text-cream-dim">{t('footer.tagline')}</p>
        </div>

        <Rule variant="soft" />

        <div className="my-10 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-cream-muted">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${t('common.email')}`}
                  className="text-cream-dim transition-colors hover:text-gold"
                >
                  {t('common.email')}
                </a>
              </li>
              <li>
                <a
                  href={t('common.linkedinUrl')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-dim transition-colors hover:text-gold"
                >
                  {t('footer.linkedin')} ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-cream-muted">
              {t('footer.navigation')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services"
                  className="text-cream-dim transition-colors hover:text-gold"
                >
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-cream-dim transition-colors hover:text-gold"
                >
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-cream-dim transition-colors hover:text-gold"
                >
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-cream-muted">
              {t('footer.legal')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/legal/privacy"
                  className="text-cream-dim transition-colors hover:text-gold"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/notice"
                  className="text-cream-dim transition-colors hover:text-gold"
                >
                  {t('footer.notice')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Rule variant="soft" />

        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-cream-muted">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  )
}
