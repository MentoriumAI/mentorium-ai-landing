import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Faculty_Glyphic } from 'next/font/google'
import { ThemeProvider } from '@/context/ThemeContext'
import StructuredData from '@/components/StructuredData'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import GoogleSearchConsole from '@/components/GoogleSearchConsole'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
})

const facultyGlyphic = Faculty_Glyphic({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-faculty-glyphic',
  weight: '400'
})

export const viewport = 'width=device-width, initial-scale=1'

export const metadata: Metadata = {
  metadataBase: new URL('https://mentorium.ai'),
  title: {
    default: 'Mentorium - Plataforma Educativa con IA para Colegios | Software de Gestión Escolar',
    template: '%s | Mentorium',
  },
  description: 'Mentorium es una plataforma educativa para colegios en Perú que automatiza la gestión escolar con inteligencia artificial. Software de gestión escolar digital que optimiza tareas administrativas, automatización de procesos educativos, notas, asistencia y reportes MINEDU. ¡Conoce este software educativo innovador!',
  keywords: 'plataforma educativa para colegios, software de gestión escolar, plataforma educativa virtual, sistema de gestión escolar digital, automatización de procesos educativos, inteligencia artificial en educación, plataforma educativa con inteligencia artificial, software educativo para colegios, ERP para colegios, gestión escolar digital, automatización escolar, aula virtual integrada, control de asistencia automatizado, sistema de notas automatizado, software académico para institutos, IA para colegios, mejor software educativo en Perú',
  authors: [{ name: 'Mentorium' }],
  creator: 'Mentorium',
  publisher: 'Mentorium',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://mentorium.ai',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://mentorium.ai',
    siteName: 'Mentorium',
    title: 'Mentorium - Plataforma Educativa con IA para Colegios | Software de Gestión Escolar',
    description: 'Plataforma educativa para colegios en Perú que automatiza la gestión escolar con inteligencia artificial. Optimiza tareas administrativas, automatización de procesos educativos, notas y asistencia.',
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
    title: 'Mentorium - Plataforma Educativa con IA para Colegios',
    description: 'Software de gestión escolar con automatización de procesos educativos. Gestiona notas, asistencia y reportes MINEDU con inteligencia artificial.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    // Add Google Search Console verification
    // google: 'your-verification-code', // This will be set via env var in GoogleSearchConsole component
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <GoogleSearchConsole />
        <StructuredData />
      </head>
      <body className={`${inter.className} ${inter.variable} ${facultyGlyphic.variable}`}>
        <GoogleAnalytics />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}