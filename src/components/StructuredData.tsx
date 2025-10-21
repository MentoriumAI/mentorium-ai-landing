/**
 * Structured Data Component
 * Provides JSON-LD structured data for SEO
 */

export default function StructuredData() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Mentorium',
    alternateName: 'Mentorium.ai',
    url: 'https://mentorium.ai',
    logo: 'https://mentorium.ai/logo.svg',
    description: 'Mentorium es la primera plataforma educativa con IA diseñada para instituciones en Perú. Automatiza materiales, evaluaciones, notas y reportes oficiales MINEDU.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PE',
      addressLocality: 'Lima',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+51-953-719-060',
      contactType: 'customer service',
      email: 'hola@mentorium.ai',
      availableLanguage: ['Spanish', 'es'],
    },
    sameAs: [
      // Add social media profiles when available
      // 'https://www.linkedin.com/company/mentorium',
      // 'https://twitter.com/mentorium',
    ],
    founder: {
      '@type': 'Organization',
      name: 'Mentorium',
    },
  }

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Mentorium',
    url: 'https://mentorium.ai',
    description: 'Plataforma educativa con IA en Perú | Automatización y eficiencia para instituciones',
    inLanguage: 'es-ES',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://mentorium.ai/docs?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const softwareApplicationData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Mentorium',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Sin costo inicial',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '1',
    },
    description: 'Automatiza materiales, evaluaciones, notas y reportes oficiales MINEDU con IA. Ahorra tiempo y costos con soporte local en Perú.',
    featureList: [
      'Automatización de evaluaciones',
      'Generación de materiales educativos con IA',
      'Reportes oficiales MINEDU',
      'Integración con LMS',
      'Soporte en español',
    ],
  }

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://mentorium.ai',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  )
}
