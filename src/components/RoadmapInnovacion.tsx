'use client'

import Link from 'next/link'
import { AcademicCapIcon, UserIcon, ClockIcon, HeartIcon } from '@heroicons/react/24/solid'

const RoadmapInnovacion = () => {
  const roadmapItems = [
    {
      icon: <AcademicCapIcon className="w-8 h-8" />,
      title: 'Copilot Pedagógico',
      description: 'Genera planes de clase completos en minutos.',
      status: 'coming-soon',
      color: 'from-brand-brandeis-blue to-blue-600'
    },
    {
      icon: <UserIcon className="w-8 h-8" />,
      title: 'Detección de necesidades educativas especiales',
      description: 'Mediante análisis de interacciones.',
      status: 'research',
      color: 'from-brand-brunswick-green to-green-600'
    },
    {
      icon: <ClockIcon className="w-8 h-8" />,
      title: 'Optimización de horarios y recursos',
      description: 'Con algoritmos inteligentes.',
      status: 'development',
      color: 'from-brand-sunglow to-yellow-500'
    },
    {
      icon: <HeartIcon className="w-8 h-8" />,
      title: 'Análisis de bienestar y clima escolar',
      description: 'En tiempo real.',
      status: 'beta',
      color: 'from-brand-orange-pantone to-red-500'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'coming-soon':
        return { text: 'Próximamente', color: 'bg-blue-100 text-blue-800' }
      case 'research':
        return { text: 'En Investigación', color: 'bg-purple-100 text-purple-800' }
      case 'development':
        return { text: 'En Desarrollo', color: 'bg-yellow-100 text-yellow-800' }
      case 'beta':
        return { text: 'En Beta', color: 'bg-green-100 text-green-800' }
      default:
        return { text: 'Disponible', color: 'bg-green-100 text-green-800' }
    }
  }

  return (
    <section id="roadmap" className="section bg-brand-isabelline relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-brand-brandeis-blue/5 rounded-full filter blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-brunswick-green/5 rounded-full filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-brandeis-blue/10 text-sm font-medium text-brand-brandeis-blue mb-6">
            🚀 Roadmap de Innovación
          </div>
          
          <h2 className="section-title mb-6">
            El futuro de la educación con IA
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Mentorium sigue evolucionando con inteligencia artificial para revolucionar completamente la experiencia educativa
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mb-8 sm:mb-12">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-brand-brandeis-blue via-brand-brunswick-green to-brand-orange-pantone rounded-full"></div>
          
          <div className="space-y-6 sm:space-y-8">
            {roadmapItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Card */}
                <div className={`relative w-full max-w-sm ${index % 2 === 0 ? 'mr-2' : 'ml-2'}`}>
                  <div className="bg-white rounded-xl border border-white/50 shadow-lg p-4 hover:scale-105 transition-all duration-500 group">
                    <div className="flex items-start space-x-4">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                             style={{ 
                               borderColor: item.color.includes('brandeis-blue') ? '#006FEA' : 
                                          item.color.includes('brunswick-green') ? '#0f4c38' :
                                          item.color.includes('sunglow') ? '#FFC400' : 
                                          '#FB6113',
                               color: item.color.includes('brandeis-blue') ? '#006FEA' : 
                                     item.color.includes('brunswick-green') ? '#0f4c38' :
                                     item.color.includes('sunglow') ? '#FFC400' : 
                                     '#FB6113'
                             }}>
                          {item.icon}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-brand-dark-green mb-2 group-hover:text-brand-brandeis-blue transition-colors duration-300">
                          {item.title}
                        </h3>
                        
                        <p className="text-sm text-brand-dark-green/70 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-brand-brandeis-blue/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </div>

                  {/* Timeline Dot */}
                  <div className={`absolute top-1/2 transform -translate-y-1/2 ${index % 2 === 0 ? '-right-3' : '-left-3'} w-3 h-3 rounded-full bg-white border-2 border-brand-brandeis-blue shadow-lg z-10`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl shadow-lg inline-block p-8 max-w-2xl">
            <h3 className="text-2xl font-bold text-brand-dark-green mb-4">
              Sé parte del futuro educativo
            </h3>
            <p className="text-brand-dark-green/80 mb-6">
              Únete a Mentorium hoy y accede a las innovaciones más avanzadas en educación con IA
            </p>
            
            <Link 
              href="#demo" 
              className="btn-primary btn-large group inline-flex items-center"
            >
              <span>Comenzar con Mentorium</span>
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            {/* Features List */}
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
              <div className="flex items-center space-x-2 text-brand-dark-green/70">
                <div className="w-2 h-2 bg-brand-brandeis-blue rounded-full"></div>
                <span>Actualizaciones automáticas</span>
              </div>
              <div className="flex items-center space-x-2 text-brand-dark-green/70">
                <div className="w-2 h-2 bg-brand-brunswick-green rounded-full"></div>
                <span>Acceso anticipado a nuevas funciones</span>
              </div>
              <div className="flex items-center space-x-2 text-brand-dark-green/70">
                <div className="w-2 h-2 bg-brand-orange-pantone rounded-full"></div>
                <span>Feedback directo con nuestro equipo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RoadmapInnovacion