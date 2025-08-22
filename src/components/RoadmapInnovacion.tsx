'use client'

import Link from 'next/link'

const RoadmapInnovacion = () => {
  const roadmapItems = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3z"/>
        </svg>
      ),
      title: 'Copilot Pedagógico',
      description: 'Genera planes de clase completos en minutos.',
      status: 'coming-soon',
      color: 'from-brand-brandeis-blue to-blue-600'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Detección de necesidades educativas especiales',
      description: 'Mediante análisis de interacciones.',
      status: 'research',
      color: 'from-brand-brunswick-green to-green-600'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Optimización de horarios y recursos',
      description: 'Con algoritmos inteligentes.',
      status: 'development',
      color: 'from-brand-sunglow to-yellow-500'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
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
        <div className="relative mb-12 sm:mb-16">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-brand-brandeis-blue via-brand-brunswick-green to-brand-orange-pantone rounded-full"></div>
          
          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Card */}
                <div className={`relative w-full max-w-md ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                  <div className="bg-white rounded-xl border border-white/50 shadow-lg p-6 sm:p-8 hover:scale-105 transition-all duration-500 group">
                    {/* Status Badge */}
                    <div className="mb-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.status).color}`}>
                        {getStatusBadge(item.status).text}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        {item.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg sm:text-xl font-semibold text-brand-dark-green mb-3 group-hover:text-brand-brandeis-blue transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-brand-dark-green/70 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-brand-brandeis-blue/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </div>

                  {/* Timeline Dot */}
                  <div className={`absolute top-1/2 transform -translate-y-1/2 ${index % 2 === 0 ? '-right-10' : '-left-10'} w-4 h-4 rounded-full bg-white border-4 border-brand-brandeis-blue shadow-lg z-10`}></div>
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