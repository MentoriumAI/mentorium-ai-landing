'use client'

import { AcademicCapIcon, UserIcon, ClockIcon, HeartIcon, RocketLaunchIcon } from '@heroicons/react/24/solid'

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
      title: 'Detección de necesidades educativas diferenciadas',
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

  // const getStatusBadge = (status: string) => {
  //   switch (status) {
  //     case 'coming-soon':
  //       return { text: 'Próximamente', color: 'bg-blue-100 text-blue-800' }
  //     case 'research':
  //       return { text: 'En Investigación', color: 'bg-purple-100 text-purple-800' }
  //     case 'development':
  //       return { text: 'En Desarrollo', color: 'bg-yellow-100 text-yellow-800' }
  //     case 'beta':
  //       return { text: 'En Beta', color: 'bg-green-100 text-green-800' }
  //     default:
  //       return { text: 'Disponible', color: 'bg-green-100 text-green-800' }
  //   }
  // }

  return (
    <section id="roadmap" className="section bg-brand-isabelline mb-0 pb-16">
      <div className="container">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-brandeis-blue/10 text-sm font-medium text-brand-brandeis-blue mb-6 gap-2">
            <RocketLaunchIcon className="w-4 h-4" />
            <span>Roadmap de Innovación</span>
          </div>
          
          <h2 className="section-title mb-6">
            El futuro de la educación con IA
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Mentorium sigue evolucionando con inteligencia artificial para revolucionar completamente la experiencia educativa
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-brand-orange-pantone via-brand-brunswick-green to-brand-brandeis-blue rounded-full"></div>
          
          <div className="space-y-6 sm:space-y-8">
            {roadmapItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                {/* Card */}
                <div className={`relative w-full max-w-[22rem] ${index % 2 === 0 ? 'mr-2' : 'ml-2'}`}>
                  <div className="card p-4">
                    <div className="flex items-center space-x-4">
                      {/* Content */}
                      <div className="flex-1">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                          Próximamente
                        </span>

                        <h3 className="text-base sm:text-lg font-semibold text-brand-dark-green mb-2">
                          {item.title}
                        </h3>

                        <p className="text-sm text-brand-dark-green/70 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border-2 flex items-center justify-center shadow-lg`}
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
                    </div>
                  </div>

                </div>
              </div>
            ))}
            
            {/* Final Card */}
            <div className="flex items-center justify-center pt-16">
              <div className="relative w-full max-w-lg">
                <div className="card text-center">
                  <h3 className="text-2xl font-bold text-brand-brandeis-blue mb-4">
                    Menos gestión, más educación
                  </h3>
                  <span className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-brand-brandeis-blue/20 text-brand-brandeis-blue gap-2">
                    <RocketLaunchIcon className="w-4 h-4" />
                    <span>Empieza hoy</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default RoadmapInnovacion