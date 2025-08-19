'use client'

import Link from 'next/link'

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Subtle Background Element */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-brandeis-blue/5 rounded-full filter blur-3xl animate-float"></div>
      </div>

      <div className="container relative z-10 pt-24 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Hero Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-sunglow/20 text-sm font-medium text-brand-dark-green">
              ✨ Plataforma SaaS Educativa
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight font-serif">
              <span className="text-brand-dark-green">Reinventando</span>
              <br />
              <span className="text-brand-dark-green">la educación,</span>
              <br />
              <span className="bg-gradient-to-r from-brand-brunswick-green to-brand-brandeis-blue bg-clip-text text-transparent">un documento</span>
              <br />
              <span className="text-brand-dark-green">a la vez</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-brand-dark-green/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Automatiza y optimiza la creación de materiales educativos con 
              <span className="font-semibold text-brand-brandeis-blue"> inteligencia artificial</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="#demo" 
                className="btn-primary btn-large group"
              >
                Solicitar Demostración
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <Link 
                href="#caracteristicas" 
                className="btn-secondary btn-large group"
              >
                Ver Características
                <svg className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-brand-isabelline">
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-brand-brandeis-blue">10x</div>
                <div className="text-sm text-brand-dark-green/70">Más rápido</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-brand-orange-pantone">500+</div>
                <div className="text-sm text-brand-dark-green/70">Universidades</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-brand-dark-moss-green">99%</div>
                <div className="text-sm text-brand-dark-green/70">Satisfacción</div>
              </div>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Card */}
              <div className="glass-card p-8 lg:p-12 floating-element">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                        </svg>
                      </div>
                      <span className="font-semibold text-slate-800">Plataforma Educativa</span>
                    </div>
                    <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="h-3 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-full"></div>
                    <div className="h-3 bg-gradient-to-r from-secondary-200 to-accent-200 rounded-full w-4/5"></div>
                    <div className="h-3 bg-gradient-to-r from-accent-200 to-warning-200 rounded-full w-3/5"></div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-accent-400 rounded-full"></div>
                      <span className="text-sm text-slate-600">IA Integrada</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-secondary-400 rounded-full"></div>
                      <span className="text-sm text-slate-600">LMS Compatible</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-primary-400 rounded-full"></div>
                      <span className="text-sm text-slate-600">Colaborativo</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-warning-400 rounded-full"></div>
                      <span className="text-sm text-slate-600">Tiempo Real</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 glass-card rounded-2xl flex items-center justify-center floating-element" style={{ animationDelay: '1s' }}>
              <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>

            <div className="absolute -bottom-6 -left-6 w-16 h-16 glass-card rounded-2xl flex items-center justify-center floating-element" style={{ animationDelay: '3s' }}>
              <svg className="w-6 h-6 text-secondary-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero