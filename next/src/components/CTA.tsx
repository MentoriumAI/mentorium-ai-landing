'use client'

import Link from 'next/link'

const CTA = () => {
  return (
    <section id="demo" className="section bg-brand-isabelline relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-brand-brandeis-blue/5 rounded-full filter blur-xl animate-float"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-sunglow/20 text-sm font-medium text-brand-dark-green mb-8">
            🚀 ¡Únete a la revolución educativa!
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark-green mb-6">
            Transforma tu proceso educativo
            <span className="text-brand-brandeis-blue"> hoy mismo</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-brand-dark-green/70 mb-12 max-w-3xl mx-auto leading-relaxed">
            Descubre cómo Mentorium puede revolucionar la forma en que creas, 
            gestionas y compartes contenido educativo
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link 
              href="#contacto" 
              className="btn-primary btn-large group hover:shadow-glow"
            >
              Solicitar Demostración Gratuita
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <Link 
              href="#caracteristicas" 
              className="btn-secondary btn-large group"
            >
              Ver Más Características
              <svg className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl p-6 group hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-brand-brunswick-green flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-brand-dark-green mb-2">Demo en 15 minutos</h3>
              <p className="text-brand-dark-green/70 text-sm">Ve Mentorium en acción con una demostración personalizada</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl p-6 group hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-brand-brandeis-blue flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-brand-dark-green mb-2">Prueba gratuita</h3>
              <p className="text-brand-dark-green/70 text-sm">30 días gratis para explorar todas las funcionalidades</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl p-6 group hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-brand-sunglow flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-brand-dark-green mb-2">Soporte dedicado</h3>
              <p className="text-brand-dark-green/70 text-sm">Equipo experto disponible durante toda la implementación</p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-brand-dark-green/60 text-sm">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-brand-dark-moss-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Sin compromiso</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-brand-dark-moss-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Configuración incluida</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-brand-dark-moss-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Migración asistida</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-brand-dark-moss-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Capacitación gratuita</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default CTA