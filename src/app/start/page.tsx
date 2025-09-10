'use client'

import Link from 'next/link'
import { ArrowRightIcon } from '@/components/icons'

export default function StartPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-isabelline via-white to-brand-isabelline/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-brandeis-blue/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-brunswick-green/5 rounded-full filter blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 hover:scale-105 transition-transform duration-200">
            <span className="text-4xl lg:text-5xl font-bold gradient-text">
              Mentorium
            </span>
          </Link>
        </div>

        {/* Heading */}
        <h1 className="text-3xl lg:text-4xl font-bold text-brand-dark-green mb-4 leading-tight">
          ¿Cómo quieres continuar?
        </h1>
        
        <p className="text-lg text-brand-dark-green/70 mb-12 max-w-xl mx-auto leading-relaxed">
          Elige la opción que mejor se adapte a tus necesidades
        </p>

        {/* CTA Options */}
        <div className="grid gap-6 max-w-lg mx-auto">
          {/* Schedule Meeting */}
          <Link 
            href="https://cal.com/mentorium-ai-moshe-ojeda/30min"
            className="group bg-white/80 backdrop-blur-sm border-2 border-brand-brunswick-green/20 hover:border-brand-brunswick-green/40 rounded-2xl p-8 text-left transition-all duration-300 hover:scale-105 hover:shadow-xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex items-center space-x-1">
                <ArrowRightIcon className="w-5 h-5 text-brand-dark-green/40 group-hover:text-brand-brunswick-green group-hover:translate-x-1 transition-all duration-300" />
                <svg className="w-4 h-4 text-brand-dark-green/40 group-hover:text-brand-brunswick-green transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-brand-dark-green mb-2">
              Agendar una reunión
            </h2>
            <p className="text-brand-dark-green/60 text-sm leading-relaxed">
              Agenda una demostración personalizada de 30 minutos con nuestro equipo
            </p>
          </Link>

          {/* Platform Access - Disabled */}
          <div className="relative">
            {/* Coming Soon Badge */}
            <div className="absolute -top-2 -right-2 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-sunglow text-brand-dark-green shadow-sm">
                Próximamente
              </span>
            </div>
            
            <div className="bg-white/40 backdrop-blur-sm border-2 border-brand-brandeis-blue/10 rounded-2xl p-8 text-left opacity-60 cursor-not-allowed">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-brandeis-blue/50 to-brand-brandeis-blue/40 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-5 h-5 text-brand-dark-green/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-brand-dark-green/60 mb-2">
                Ingresar a la plataforma
              </h2>
              <p className="text-brand-dark-green/40 text-sm leading-relaxed">
                Accede directamente a Mentorium para visualizar un proyecto de demostración
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-12">
          <Link 
            href="/"
            className="text-brand-dark-green/60 hover:text-brand-dark-green transition-colors duration-200 text-sm inline-flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Volver al inicio</span>
          </Link>
        </div>
      </div>
    </div>
  )
}