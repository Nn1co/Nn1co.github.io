import { SITE_URL, SITE_NAME } from '@/lib/seo'

type JsonLdProps = {
  locale: string
}

export function JsonLd({ locale }: JsonLdProps) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/api/og?title=TG%20TECH%20·%20CONSULTING`,
    sameAs: ['https://www.linkedin.com/in/thibaut-gendebien-7b777297'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'thibaut.gendebien@tgtechconsulting.com',
        availableLanguage: ['fr', 'en'],
      },
    ],
  }

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      locale === 'fr'
        ? 'Conseil ERP NetSuite et Odoo, intégration IA et automatisation des opérations métier. Accompagnement à distance.'
        : 'NetSuite and Odoo ERP consulting, AI integration and business automation. Remote delivery.',
    knowsAbout: [
      'NetSuite',
      'Odoo',
      'SuiteScript',
      'SuiteCloud Development Framework',
      'AI integration',
      'ERP automation',
    ],
    founder: {
      '@type': 'Person',
      name: 'Thibaut Gendebien',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
    </>
  )
}
