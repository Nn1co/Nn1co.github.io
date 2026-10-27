import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { DemoStage } from '@/components/demos/DemoStage'
import { DemoAnchorRedirect } from '@/components/nav/DemoAnchorRedirect'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'demos.page' })
  return buildMetadata({ locale, path: '/demos', title: t('title'), description: t('description') })
}

export default async function DemosPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <>
    <DemoAnchorRedirect locale={locale} />
    <DemoStage locale={locale} />
  </>
}
