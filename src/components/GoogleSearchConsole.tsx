/**
 * Google Search Console Verification Component
 *
 * Setup Instructions:
 * 1. Go to https://search.google.com/search-console
 * 2. Add your property (mentorium.ai)
 * 3. Choose "HTML tag" verification method
 * 4. Copy the content value from the meta tag
 * 5. Add it to your .env.local file:
 *    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code
 * 6. The component will automatically add the meta tag
 */

export default function GoogleSearchConsole() {
  const verificationCode = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION

  if (!verificationCode) {
    return null
  }

  return (
    <meta name="google-site-verification" content={verificationCode} />
  )
}
