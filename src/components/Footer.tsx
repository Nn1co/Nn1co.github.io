import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Brand } from './shared/Brand'

export async function Footer() {
  const t = await getTranslations()
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-contact">
          <h2>{t('footer.ctaLine')}</h2>
          <Link href="/contact" className="button">{t('footer.ctaButton')}</Link>
        </div>
        <div className="footer-main">
          <Brand />
          <nav aria-label={t('footer.navigation')}>
            <Link href="/netsuite-order-workflow">{t('nav.orders')}</Link>
            <Link href="/services">{t('nav.services')}</Link>
            <a href={t('common.linkedinUrl')} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
