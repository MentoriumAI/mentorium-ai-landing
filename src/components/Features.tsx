'use client'

const Features = () => {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ),
      title: '🎯 Usabilidad y accesibilidad',
      description: 'Entorno intuitivo y rápido para docentes y estudiantes, sin necesidad de capacitación.',
      color: 'text-brand-brandeis-blue'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
          <path d="M6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
        </svg>
      ),
      title: '👥 Gestión de alumnos y aulas',
      description: 'Automatiza matrículas y aulas, reduciendo carga administrativa y errores.',
      color: 'text-brand-brunswick-green'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
        </svg>
      ),
      title: '📊 Calificaciones y evaluaciones inteligentes',
      description: 'Escalas alineadas al MINEDU, rúbricas integradas y reportes automáticos.',
      color: 'text-brand-sunglow'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
        </svg>
      ),
      title: '🎮 Gestión de materiales y contenidos interactivos',
      description: 'Contenidos gamificados, personalizados y dinámicos con IA.',
      color: 'text-brand-orange-pantone'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
      title: '📈 Seguimiento académico en tiempo real',
      description: 'Dashboards, alertas tempranas y analíticas para intervenciones oportunas.',
      color: 'text-brand-brandeis-blue'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
      title: '💰 Optimización de costos y valor percibido',
      description: 'Inversión rentable que maximiza resultados educativos y eficiencia.',
      color: 'text-brand-brunswick-green'
    }
  ]

  return (
    <section id="caracteristicas" className="section bg-brand-isabelline relative overflow-hidden">
      {/* Subtle Background Accents (no gradient) */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-brand-brandeis-blue/5 rounded-full filter blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-brunswick-green/5 rounded-full filter blur-xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="section-title">
            Eficiencia en cada click
          </h2>
          <p className="section-subtitle">
            Mentorium no es solo un LMS, es un asistente inteligente que trabaja contigo
          </p>
        </div>

        <div className="grid-responsive-cards">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card group hover:scale-105 transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-6 ${feature.color} bg-white border-2 border-current group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-fluid-lg font-semibold text-brand-dark-green mb-3 group-hover:text-brand-brandeis-blue transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-fluid-sm text-brand-dark-green/70 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-brand-isabelline/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-brand-sunglow/20 text-brand-dark-green font-medium">
            <span className="w-2 h-2 bg-brand-orange-pantone rounded-full mr-3 animate-pulse"></span>
            ¿Listo para automatizar tu gestión educativa con IA?
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features