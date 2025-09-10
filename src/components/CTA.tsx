'use client'

import Link from 'next/link'

const CTA = () => {
  return (
    <section id="demo" className="section bg-brand-isabelline relative overflow-hidden mt-0 pt-6 sm:pt-10">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-brand-brandeis-blue/5 rounded-full filter blur-xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Main Heading */}
          <h2 className="text-fluid-3xl sm:text-fluid-4xl font-bold text-brand-dark-green mb-6 leading-tight mt-6 sm:mt-8">
            <span className="bg-gradient-to-r from-brand-brandeis-blue to-brand-brunswick-green bg-clip-text text-transparent">Transforma tu institución hoy</span>
          </h2>

          {/* Subtitle */}
          <p className="text-fluid-lg text-brand-dark-green/70 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
            Únete a las instituciones que ya están ahorrando tiempo, reduciendo costos y mejorando la calidad educativa con inteligencia artificial
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center mb-12 sm:mb-16">
            <Link 
              href="/start" 
              className="btn-primary btn-large group hover:shadow-glow"
            >
              <span className="text-sm sm:text-base">Comienza hoy con Mentorium</span>
              <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl p-6 group hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-brunswick-green flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-fluid-base font-semibold text-brand-dark-green mb-2">Configurable en minutos</h3>
              <p className="text-fluid-sm text-brand-dark-green/70">Impacto desde el primer día</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl p-6 group hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-brandeis-blue flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-fluid-base font-semibold text-brand-dark-green mb-2">100% online</h3>
              <p className="text-fluid-sm text-brand-dark-green/70">Sin instalación y sin costo inicial</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl p-6 group hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-sunglow flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-fluid-base font-semibold text-brand-dark-green mb-2">Soporte dedicado</h3>
              <p className="text-fluid-sm text-brand-dark-green/70">Equipo experto disponible durante toda la implementación</p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 text-brand-dark-green/60">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-brand-dark-moss-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs sm:text-sm">Configuración incluida</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-brand-dark-moss-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs sm:text-sm">Migración asistida</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-brand-dark-moss-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs sm:text-sm">Capacitación gratuita</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default CTA