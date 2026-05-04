import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'legal.notice.page' })
  return { title: t('title'), description: t('metaDescription') }
}

export default async function NoticePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <LegalPage namespace="legal.notice" />
}
