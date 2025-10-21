import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mentorium - Plataforma Educativa con IA',
    short_name: 'Mentorium',
    description: 'Plataforma educativa con IA diseñada para instituciones en Perú. Automatiza materiales, evaluaciones, notas y reportes oficiales MINEDU.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0F766E',
    orientation: 'portrait-primary',
    categories: ['education', 'productivity'],
    lang: 'es-ES',
    dir: 'ltr',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
