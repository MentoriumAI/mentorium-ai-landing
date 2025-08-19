'use client'

const Benefits = () => {
  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Ahorro de tiempo',
      description: 'Reduce significativamente el tiempo dedicado a la creación de documentos educativos.',
      stat: '75%',
      statLabel: 'menos tiempo',
      color: 'text-accent-600'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Calidad mejorada',
      description: 'Estandarización y mejora continua de materiales educativos con IA.',
      stat: '90%',
      statLabel: 'mayor calidad',
      color: 'text-primary-600'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Normativas internacionales',
      description: 'Alineación automática con estándares académicos globales y mejores prácticas.',
      stat: '100%',
      statLabel: 'cumplimiento',
      color: 'text-secondary-600'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Integración fluida',
      description: 'Compatibilidad perfecta con tus herramientas y plataformas educativas actuales.',
      stat: '50+',
      statLabel: 'integraciones',
      color: 'text-warning-600'
    }
  ]

  return (
    <section id="beneficios" className="section hero-gradient relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title text-slate-800">
            Más tiempo para enseñar, menos para gestionar
          </h2>
          <p className="section-subtitle text-slate-700">
            Libera tu potencial educativo con beneficios medibles y resultados comprobados
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Card */}
              <div className="glass-card h-full p-8 text-center hover:scale-105 transition-all duration-500">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className={`${benefit.color} p-3 rounded-2xl bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}>
                    {benefit.icon}
                  </div>
                </div>

                {/* Stat */}
                <div className="mb-4">
                  <div className={`text-4xl font-bold ${benefit.color} mb-1`}>
                    {benefit.stat}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">
                    {benefit.statLabel}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  {benefit.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>

              {/* Floating Indicator */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-cta rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Quote */}
        <div className="mt-20 text-center">
          <blockquote className="glass-card inline-block p-8 max-w-4xl">
            <p className="text-xl lg:text-2xl text-slate-700 italic leading-relaxed mb-4">
              &ldquo;Mentorium no solo automatiza procesos, transforma la manera en que los educadores crean y comparten conocimiento.&rdquo;
            </p>
            <footer className="text-slate-600 font-medium">
              — Investigación en Tecnología Educativa, 2024
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}

export default Benefits