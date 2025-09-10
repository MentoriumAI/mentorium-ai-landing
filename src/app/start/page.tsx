'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon } from '@/components/icons'

export default function StartPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-isabelline via-white to-brand-isabelline/50 relative overflow-hidden py-8">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-brandeis-blue/5 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-brunswick-green/5 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-brand-sunglow/3 rounded-full filter blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {/* Logo/Brand */}
        <div className="mb-12 mt-8">
          <Link href="/" className="inline-flex flex-col items-center space-y-4 group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo-no-bg.svg"
                alt="Mentorium Logo"
                width={96}
                height={96}
                className="w-full h-full"
                priority
              />
            </div>
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
              Mentorium
            </span>
          </Link>
        </div>

        {/* CTA Options */}
        <div className="grid gap-8 max-w-xl mx-auto">
          {/* Schedule Meeting */}
          <Link 
            href="https://cal.com/mentorium-ai-moshe-ojeda/30min"
            className="group relative bg-white/90 backdrop-blur-sm border-2 border-brand-brunswick-green/20 hover:border-brand-brunswick-green/50 rounded-3xl p-8 sm:p-10 text-left transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-brand-brunswick-green/10 transform-gpu"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-brunswick-green/5 via-transparent to-brand-brandeis-blue/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-brunswick-green to-brand-dark-green flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex items-center space-x-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRightIcon className="w-6 h-6 text-brand-dark-green group-hover:text-brand-brunswick-green group-hover:translate-x-2 transition-all duration-300" />
                  <svg className="w-5 h-5 text-brand-dark-green group-hover:text-brand-brunswick-green transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-dark-green mb-3 group-hover:text-brand-brunswick-green transition-colors duration-300">
                Agendar una reunión
              </h2>
              <p className="text-brand-dark-green/70 text-sm sm:text-base leading-relaxed">
                Agenda una demostración personalizada de 30 minutos con nuestro equipo y descubre cómo Mentorium puede transformar tu proceso educativo
              </p>
              
              {/* Badge */}
              <div className="mt-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-brand-brunswick-green/10 text-brand-brunswick-green border border-brand-brunswick-green/20">
                  ✨ Recomendado
                </span>
              </div>
            </div>
          </Link>

          {/* Platform Access - Disabled */}
          <div className="relative">
            {/* Coming Soon Badge */}
            <div className="absolute -top-3 -right-3 z-20">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-brand-sunglow text-brand-dark-green shadow-lg border-2 border-white">
                🚀 Próximamente
              </span>
            </div>
            
            <div className="relative bg-white/50 backdrop-blur-sm border-2 border-brand-brandeis-blue/15 rounded-3xl p-8 sm:p-10 text-left opacity-70 cursor-not-allowed overflow-hidden">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-brandeis-blue/5 via-transparent to-brand-brandeis-blue/10 rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-brandeis-blue/40 to-brand-brandeis-blue/30 flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <div className="flex items-center space-x-2 opacity-50">
                    <svg className="w-6 h-6 text-brand-dark-green/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-dark-green/60 mb-3">
                  Ingresar a la plataforma
                </h2>
                <p className="text-brand-dark-green/50 text-sm sm:text-base leading-relaxed">
                  Accede directamente a Mentorium para visualizar un proyecto de demostración y explorar todas las funcionalidades disponibles
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-16">
          <Link 
            href="/"
            className="group text-brand-dark-green/60 hover:text-brand-dark-green transition-colors duration-300 text-base inline-flex items-center space-x-3 px-4 py-2 rounded-xl hover:bg-white/30 backdrop-blur-sm"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Volver al inicio</span>
          </Link>
        </div>
      </div>
    </div>
  )
}