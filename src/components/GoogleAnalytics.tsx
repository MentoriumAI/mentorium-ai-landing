/**
 * Google Analytics Component
 *
 * Setup Instructions:
 * 1. Create a Google Analytics 4 property at https://analytics.google.com
 * 2. Get your measurement ID (format: G-XXXXXXXXXX)
 * 3. Add it to your .env.local file:
 *    NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 * 4. The component will automatically load GA4 when the env var is set
 */

'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return

    const url = pathname + searchParams.toString()

    // Send pageview with custom URL
    if (window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      })
    }
  }, [pathname, searchParams])

  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void
  }
}
