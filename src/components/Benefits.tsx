'use client'

import { ClockIcon, CurrencyDollarIcon, CheckBadgeIcon, FaceSmileIcon } from '@heroicons/react/24/solid'

const Benefits = () => {
  const benefits = [
    {
      icon: <ClockIcon className="w-8 h-8" />,
      title: 'Ahorro de tiempo administrativo',
      description: 'Ahorra hasta 60% de tiempo administrativo gracias a la automatización.',
      stat: '60%',
      statLabel: 'menos tiempo',
      color: 'text-brand-sunglow'
    },
    {
      icon: <CurrencyDollarIcon className="w-8 h-8" />,
      title: 'Reducción de costos',
      description: 'Reduce costos eliminando licencias individuales y centralizando la gestión.',
      stat: '40%',
      statLabel: 'menos costos',
      color: 'text-brand-brunswick-green'
    },
    {
      icon: <CheckBadgeIcon className="w-8 h-8" />,
      title: 'Cumplimiento MINEDU',
      description: 'Cumple 100% con estándares MINEDU, evitando reprocesos.',
      stat: '100%',
      statLabel: 'MINEDU',
      color: 'text-brand-brandeis-blue'
    },
    {
      icon: <FaceSmileIcon className="w-8 h-8" />,
      title: 'Mayor satisfacción',
      description: 'Mayor satisfacción de docentes y padres con comunicación más ágil. Escalable y flexible.',
      stat: '95%',
      statLabel: 'satisfacción',
      color: 'text-brand-orange-pantone'
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
            Transforma tu institución educativa con resultados medibles y comprobados
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
                <div className="mb-4 sm:mb-6 flex justify-center">
                  <div className={`${benefit.color} p-2 sm:p-3 rounded-2xl bg-white border-2 border-current group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {benefit.icon}
                  </div>
                </div>

                {/* Stat */}
                <div className="mb-4">
                  <div className={`text-fluid-3xl font-bold ${benefit.color} mb-1`}>
                    {benefit.stat}
                  </div>
                  <div className="text-fluid-sm text-brand-dark-green/70 font-medium">
                    {benefit.statLabel}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-fluid-lg font-semibold text-brand-dark-green mb-3">
                  {benefit.title}
                </h3>
                
                <p className="text-fluid-sm text-brand-dark-green/70 leading-relaxed">
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