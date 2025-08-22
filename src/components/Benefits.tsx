'use client'

const Benefits = () => {
  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Ahorro de tiempo administrativo',
      description: 'Ahorra hasta 60% de tiempo administrativo gracias a la automatización.',
      stat: '60%',
      statLabel: 'menos tiempo',
      color: 'text-brand-sunglow'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Reducción de costos',
      description: 'Reduce costos eliminando licencias individuales y centralizando la gestión.',
      stat: '40%',
      statLabel: 'menos costos',
      color: 'text-brand-brunswick-green'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Cumplimiento MINEDU',
      description: 'Cumple 100% con estándares MINEDU, evitando reprocesos.',
      stat: '100%',
      statLabel: 'MINEDU',
      color: 'text-brand-brandeis-blue'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
        </svg>
      ),
      title: 'Mayor satisfacción',
      description: 'Mayor satisfacción de docentes y padres con comunicación más ágil. Escalable y flexible.',
      stat: '95%',
      statLabel: 'satisfacción',
      color: 'text-brand-orange-pantone'
    }
  ]

  return (
    <section id="beneficios" className="section bg-brand-isabelline relative overflow-hidden">

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
                  <div className={`${benefit.color} p-2 sm:p-3 rounded-2xl bg-gray-50 group-hover:scale-110 transition-transform duration-300`}>
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

        {/* Bottom Quote */}
        <div className="mt-20 text-center">
          <blockquote className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl shadow-lg inline-block p-8 max-w-4xl">
            <p className="text-xl lg:text-2xl text-brand-dark-green italic leading-relaxed mb-4">
              &ldquo;Mentorium transforma instituciones educativas con automatización inteligente y cumplimiento total de estándares MINEDU.&rdquo;
            </p>
            <footer className="text-brand-dark-green/70 font-medium">
              — Estudio de Implementación Institucional, 2024
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}

export default Benefits