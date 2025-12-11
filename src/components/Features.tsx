'use client'

import {
  CursorArrowRaysIcon,
  UserGroupIcon,
  ChartBarIcon,
  BookOpenIcon,
  PresentationChartLineIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/solid'

const Features = () => {
  const features = [
    {
      icon: <CursorArrowRaysIcon className="w-6 h-6" />,
      title: 'Usabilidad y accesibilidad',
      description: 'Entorno intuitivo y rápido para docentes y estudiantes, sin necesidad de capacitación.',
      color: 'text-brand-p3-brandeis-blue'
    },
    {
      icon: <UserGroupIcon className="w-6 h-6" />,
      title: 'Gestión de alumnos y aulas',
      description: 'Automatiza matrículas y aulas, reduciendo carga administrativa y errores.',
      color: 'text-brand-p3-brunswick-green'
    },
    {
      icon: <ChartBarIcon className="w-6 h-6" />,
      title: 'Calificaciones y evaluaciones inteligentes',
      description: 'Escalas alineadas al MINEDU, rúbricas integradas y reportes automáticos.',
      color: 'text-brand-p3-sunglow'
    },
    {
      icon: <BookOpenIcon className="w-6 h-6" />,
      title: 'Gestión de materiales y contenidos interactivos',
      description: 'Contenidos gamificados, personalizados y dinámicos con IA.',
      color: 'text-brand-p3-orange-pantone'
    },
    {
      icon: <PresentationChartLineIcon className="w-6 h-6" />,
      title: 'Seguimiento académico en tiempo real',
      description: 'Dashboards, alertas tempranas y analíticas para intervenciones oportunas.',
      color: 'text-brand-p3-brandeis-blue'
    },
    {
      icon: <CurrencyDollarIcon className="w-6 h-6" />,
      title: 'Optimización de costos y valor percibido',
      description: 'Inversión rentable que maximiza resultados educativos y eficiencia.',
      color: 'text-brand-p3-brunswick-green'
    }
  ]

  return (
    <section id="caracteristicas" className="section bg-brand-isabelline">
      <div className="container">
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
              className="card group"
            >
              {/* Icon */}
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-6 ${feature.color} bg-white border-2 border-current shadow-lg`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-fluid-lg font-semibold text-brand-dark-green mb-3">
                {feature.title}
              </h3>

              <p className="text-fluid-sm text-brand-dark-green/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-brand-sunglow/20 text-brand-dark-green font-medium">
            <span className="w-2 h-2 bg-brand-p3-orange-pantone rounded-full mr-3 animate-pulse"></span>
            ¿Listo para automatizar tu gestión educativa con IA?
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features