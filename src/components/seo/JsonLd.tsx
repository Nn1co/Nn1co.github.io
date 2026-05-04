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
        areaServed: ['BE', 'LU', 'NL'],
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
        ? 'Conseil NetSuite indépendant et intégration IA dans les opérations métier. Pratique basée au Benelux.'
        : 'Independent NetSuite consulting and AI integration into business operations. Practice based in the Benelux.',
    areaServed: [
      { '@type': 'Country', name: 'Belgium' },
      { '@type': 'Country', name: 'Luxembourg' },
      { '@type': 'Country', name: 'Netherlands' },
    ],
    knowsAbout: [
      'NetSuite',
      'SuiteScript',
      'SuiteCloud Development Framework',
      'Peppol e-invoicing',
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
