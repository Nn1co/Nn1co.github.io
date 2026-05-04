import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'legal.privacy.page' })
  return buildMetadata({
    locale,
    path: '/legal/privacy',
    title: t('title'),
    description: t('metaDescription'),
  })
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <LegalPage namespace="legal.privacy" showLastUpdated />
}
