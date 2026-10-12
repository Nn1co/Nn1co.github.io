import { Chevron } from '@/components/shared/Chevron'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Brand } from './shared/Brand'

export async function Footer() {
  const t = await getTranslations()
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-contact">
          <div><h2>{t('footer.ctaLine')}</h2><p>{t('footer.tagline')}</p></div>
          <a href={`mailto:${t('common.email')}`} className="button">{t('footer.ctaButton')}<Chevron /></a>
        </div>
        <div className="footer-main">
          <Brand />
          <nav aria-label={t('footer.navigation')}>
            <Link href="/services">{t('nav.services')}</Link>
            <Link href="/about">{t('nav.about')}</Link>
            <a href={t('common.linkedinUrl')} target="_blank" rel="noopener noreferrer">LinkedIn{' '}<Chevron /></a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>{t('footer.copyright')}</p>
          <nav aria-label={t('footer.legal')}><Link href="/legal/privacy">{t('footer.privacy')}</Link></nav>
        </div>
      </div>
    </footer>
  )
}
