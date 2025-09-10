'use client'

import Link from 'next/link'

const ProblemSolution = () => {
  return (
    <section id="problema-solucion" className="section bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(15, 76, 56, 0.2) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-brunswick-green/10 text-sm font-medium text-brand-brunswick-green mb-4">
            Problema y Solución
          </div>
          <h2 className="section-title">El enfoque de Mentorium</h2>
          <p className="section-subtitle">Entendemos los retos de la educación actual y los convertimos en oportunidades.</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Problem Side */}
          <div className="bg-white rounded-xl border border-red-100 shadow-lg p-6 sm:p-8 h-full flex flex-col">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 text-sm font-medium text-red-600 mb-4">
              ⚠️ El problema actual
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark-green mb-6">
              Las plataformas educativas tradicionales son rígidas
            </h2>
            
            <div className="space-y-4 text-brand-dark-green/80 flex-1">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Interfaces complejas que hacen difícil enseñar y aprender.</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Gestión manual de alumnos y aulas que sobrecarga a los docentes.</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Calificaciones rígidas y reportes poco confiables.</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Evaluaciones limitadas y poco inclusivas.</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Materiales estáticos que no motivan ni se adaptan al estudiante.</p>
              </div>
            </div>
          </div>

          {/* Solution Side */}
          <div tabIndex={0} className="group relative overflow-hidden bg-gradient-to-br from-brand-brunswick-green/5 to-brand-brandeis-blue/5 rounded-xl border border-brand-brunswick-green/20 shadow-lg p-6 sm:p-8 h-full flex flex-col transform-gpu transition-all duration-500 hover:shadow-2xl hover:border-brand-brunswick-green/40 hover:scale-105 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-brand-brunswick-green/7 hover:to-brand-brandeis-blue/7 ring-0 ring-transparent hover:ring-2 hover:ring-brand-brunswick-green/40 hover:ring-offset-2 hover:ring-offset-white focus:outline-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-brunswick-green/50 focus-visible:ring-offset-0">
            {/* Glow overlay for hover highlight */}
            <div className="pointer-events-none absolute -inset-px rounded-[0.75rem] bg-gradient-to-r from-brand-brunswick-green/10 to-brand-brandeis-blue/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-80 z-0"></div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-brunswick-green/10 text-sm font-medium text-brand-brunswick-green mb-4">
              ✨ La solución
            </div>
            
            <h2 className="relative z-10 text-3xl lg:text-4xl font-bold text-brand-dark-green mb-6">
              Mentorium integra 
              <span className="bg-gradient-to-r from-brand-brunswick-green to-brand-brandeis-blue bg-clip-text text-transparent"> automatización + IA</span>
            </h2>
            
            <div className="relative z-10 space-y-4 flex-1">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-brand-brunswick-green flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-brand-dark-green">Plataforma intuitiva y fácil de usar</p>
                  <p className="text-sm text-brand-dark-green/70">Docentes y estudiantes acceden sin fricciones</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-brand-brandeis-blue flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-brand-dark-green">Matrícula y aulas automatizadas</p>
                  <p className="text-sm text-brand-dark-green/70">Sin errores ni sobrecarga administrativa</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-brand-orange-pantone flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-brand-dark-green">Evaluaciones en múltiples formatos</p>
                  <p className="text-sm text-brand-dark-green/70">Inclusivas y personalizables</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-brand-brunswick-green flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-brand-dark-green">Contenidos dinámicos e interactivos</p>
                  <p className="text-sm text-brand-dark-green/70">Gamificados que motivan el aprendizaje</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-brand-brandeis-blue flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-brand-dark-green">Dashboards, alertas y analíticas claras</p>
                  <p className="text-sm text-brand-dark-green/70">Facilitan decisiones pedagógicas</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-auto">
              <Link 
                href="#demo" 
                className="btn-primary btn-large group"
              >
                <span>Comenzar con Mentorium</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProblemSolution