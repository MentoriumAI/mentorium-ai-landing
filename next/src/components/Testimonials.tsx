'use client'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Dra. Ana Martínez',
      role: 'Directora Académica',
      institution: 'Universidad Tecnológica',
      content: 'Mentorium ha revolucionado la forma en que creamos nuestros materiales educativos. El ahorro de tiempo es increíble y la calidad ha mejorado significativamente.',
      avatar: 'AM',
      rating: 5
    },
    {
      name: 'Prof. Carlos Ruiz',
      role: 'Coordinador de Innovación Educativa',
      institution: 'Instituto Politécnico Nacional',
      content: 'La integración con nuestro LMS existente fue perfecta. La curva de aprendizaje es mínima y los resultados son inmediatos.',
      avatar: 'CR',
      rating: 5
    },
    {
      name: 'Dra. Elena Vásquez',
      role: 'Jefa de Departamento',
      institution: 'Universidad de Barcelona',
      content: 'Como institución internacional, necesitábamos una herramienta que se adaptara a múltiples estándares. Mentorium cumple todas nuestras expectativas.',
      avatar: 'EV',
      rating: 5
    },
    {
      name: 'Prof. Miguel Torres',
      role: 'Director de Tecnología Educativa',
      institution: 'Universidad de los Andes',
      content: 'La automatización inteligente nos permite enfocarnos en lo que realmente importa: la enseñanza. Nuestros profesores están encantados.',
      avatar: 'MT',
      rating: 5
    },
    {
      name: 'Dra. Sofia Mendoza',
      role: 'Decana de Ingeniería',
      institution: 'ITESM Campus Monterrey',
      content: 'La colaboración en tiempo real ha transformado nuestro proceso de desarrollo curricular. Ahora trabajamos de manera más eficiente que nunca.',
      avatar: 'SM',
      rating: 5
    },
    {
      name: 'Prof. Roberto Jiménez',
      role: 'Coordinador de Calidad Académica',
      institution: 'Universidad Central',
      content: 'El cumplimiento automático de normativas internacionales nos ha ahorrado meses de trabajo. Una inversión que se paga sola.',
      avatar: 'RJ',
      rating: 5
    }
  ]

  return (
    <section id="testimonios" className="section bg-brand-isabelline relative overflow-hidden">

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="section-subtitle">
            Más de 500 instituciones educativas confían en Mentorium para transformar su proceso de creación de contenido
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-white/50 shadow-lg p-8 hover:scale-105 transition-all duration-500 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-brand-sunglow"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-brand-dark-green/80 mb-6 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <div className="testimonial-avatar mr-4 text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-brand-dark-green group-hover:text-brand-brandeis-blue transition-colors duration-300">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-brand-dark-green/70">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-brand-dark-green/60">
                    {testimonial.institution}
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-brand-brandeis-blue mb-2">500+</div>
            <div className="text-brand-dark-green font-medium">Instituciones</div>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-brand-orange-pantone mb-2">50K+</div>
            <div className="text-brand-dark-green font-medium">Usuarios Activos</div>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-brand-dark-moss-green mb-2">99.8%</div>
            <div className="text-brand-dark-green font-medium">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-brand-sunglow mb-2">4.9/5</div>
            <div className="text-brand-dark-green font-medium">Satisfacción</div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl shadow-lg inline-block p-8">
            <div className="text-lg font-semibold text-brand-dark-green mb-4">
              Certificado y reconocido por:
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 text-brand-dark-green/70">
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-brand-dark-moss-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>ISO 27001</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-brand-brandeis-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>SOC 2 Type II</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials