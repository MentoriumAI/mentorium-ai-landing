import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Faculty_Glyphic } from 'next/font/google'
import { ThemeProvider } from '@/context/ThemeContext'

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
  title: 'Mentorium: Plataforma educativa con IA en Perú | Automatización y eficiencia para instituciones',
  description: 'Mentorium es la primera plataforma educativa con IA diseñada para instituciones en Perú. Automatiza materiales, evaluaciones, notas y reportes oficiales MINEDU. Ahorra tiempo, reduce costos y mejora la gestión escolar con inteligencia artificial y soporte local.',
  keywords: 'plataforma educativa Perú, LMS con inteligencia artificial, software educativo automatización, gestión escolar digital, automatización evaluaciones MINEDU, sistema académico con IA, reducción de costos educativos, innovación educativa Perú, Mentorium plataforma educativa, eficiencia en instituciones educativas',
  authors: [{ name: 'Mentorium' }],
  creator: 'Mentorium',
  publisher: 'Mentorium',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://mentorium.ai',
    siteName: 'Mentorium',
    title: 'Mentorium: Plataforma educativa con IA en Perú | Automatización y eficiencia para instituciones',
    description: 'Mentorium es la primera plataforma educativa con IA diseñada para instituciones en Perú. Automatiza materiales, evaluaciones, notas y reportes oficiales MINEDU. Ahorra tiempo, reduce costos y mejora la gestión escolar con inteligencia artificial y soporte local.',
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
    title: 'Mentorium: Plataforma educativa con IA en Perú',
    description: 'Automatiza materiales, evaluaciones, notas y reportes oficiales MINEDU con IA. Ahorra tiempo y costos con soporte local en Perú.',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} ${inter.variable} ${facultyGlyphic.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}