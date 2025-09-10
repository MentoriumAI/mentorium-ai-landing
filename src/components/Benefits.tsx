'use client'

import { ClockIcon, CurrencyDollarIcon, CheckBadgeIcon, FaceSmileIcon, AcademicCapIcon } from '@heroicons/react/24/solid'

const Benefits = () => {
  const benefits = [
    {
      icon: <ClockIcon className="w-8 h-8" />,
      title: 'Máxima optimización',
      description: 'Libera tiempo administrativo automatizando calificaciones, reportes y gestión de aulas para enfocarte en lo pedagógico.',
      stat: 'Ahorro de tiempo administrativo',
      color: 'text-brand-sunglow'
    },
    {
      icon: <CheckBadgeIcon className="w-8 h-8" />,
      title: '100% cumplimiento con estándares nacionales',
      description: 'Garantiza trazabilidad, reportes oficiales y alineación total.',
      stat: 'Gestión académica confiable',
      color: 'text-brand-brandeis-blue'
    },
    {
      icon: <FaceSmileIcon className="w-8 h-8" />,
      title: 'Gran satisfacción',
      description: 'Comunicación ágil, retroalimentación constante y experiencia de aprendizaje más fluida para toda la institución.',
      stat: 'Comunidad educativa',
      color: 'text-brand-orange-pantone'
    },
    {
      icon: <AcademicCapIcon className="w-8 h-8" />,
      title: 'Aprendizaje potenciado',
      description: 'Personalización con IA, actividades interactivas y evaluaciones inteligentes para mejorar el desempeño estudiantil.',
      stat: 'Impacto en el aula',
      color: 'text-brand-brunswick-green'
    }
  ]

  return (
    <section id="beneficios" className="section bg-white relative overflow-hidden">

      <div className="container relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="section-title">
            Beneficios Clave para Instituciones
          </h2>
          <p className="section-subtitle">
            Impulsa la transformación educativa de tu institución con resultados claros y medibles
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Card */}
              <div className="bg-white rounded-xl border border-white/50 shadow-lg h-full p-6 sm:p-8 text-center hover:scale-105 transition-all duration-500">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className={`${benefit.color} p-3 rounded-2xl bg-white border-2 border-current group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {benefit.icon}
                  </div>
                </div>

                {/* Stat Label */}
                <div className="mb-6">
                  <div className={`text-lg font-bold ${benefit.color} leading-tight`}>
                    {benefit.stat}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-brand-dark-green mb-4 leading-tight">
                  {benefit.title}
                </h3>
                
                <p className="text-sm text-brand-dark-green/70 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>

              {/* Floating Indicator */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-brand-orange-pantone rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Benefits