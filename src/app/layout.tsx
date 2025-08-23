import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/context/ThemeContext'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
})

export const viewport = 'width=device-width, initial-scale=1'

export const metadata: Metadata = {
  metadataBase: new URL('https://mentorium.ai'),
  title: 'Mentorium - IA para Educación | Crea Documentos Educativos Automáticamente',
  description: 'Plataforma educativa con IA que automatiza la creación de sílabos, evaluaciones y materiales. Compatible con Moodle y Blackboard. Cumple normas MINEDU. Prueba gratis.',
  keywords: 'plataforma educativa, inteligencia artificial educación, crear sílabos automáticamente, evaluaciones IA, materiales educativos, LMS, Moodle, Blackboard, MINEDU, gestión académica',
  authors: [{ name: 'Mentorium' }],
  creator: 'Mentorium',
  publisher: 'Mentorium',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://mentorium.ai',
    siteName: 'Mentorium',
    title: 'Mentorium - IA para Educación | Automatiza Creación de Documentos Educativos',
    description: 'Crea sílabos, evaluaciones y materiales educativos automáticamente con IA. Compatible con LMS. Cumple MINEDU. Ahorra 80% del tiempo.',
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
    title: 'Mentorium - IA para Educación',
    description: 'Crea documentos educativos automáticamente con IA. Compatible con LMS. Ahorra 80% del tiempo.',
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
      <body className={`${inter.className} ${inter.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}