import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const viewport = 'width=device-width, initial-scale=1'

export const metadata: Metadata = {
  metadataBase: new URL('https://mentorium.ai'),
  title: 'Mentorium - Reinventando la educación, un documento a la vez',
  description: 'Mentorium - Plataforma SaaS para la creación y gestión de documentos educativos. Automatiza y optimiza la creación de materiales educativos con inteligencia artificial.',
  keywords: 'educación, inteligencia artificial, documentos educativos, sílabos, materiales educativos, LMS, Moodle, Blackboard',
  authors: [{ name: 'Mentorium' }],
  creator: 'Mentorium',
  publisher: 'Mentorium',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://mentorium.ai',
    siteName: 'Mentorium',
    title: 'Mentorium - Reinventando la educación, un documento a la vez',
    description: 'Plataforma SaaS para la creación y gestión de documentos educativos con inteligencia artificial.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mentorium - Plataforma Educativa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mentorium - Reinventando la educación',
    description: 'Automatiza y optimiza la creación de materiales educativos con IA',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}