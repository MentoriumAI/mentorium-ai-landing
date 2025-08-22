'use client'

const Diferenciadores = () => {
  const diferenciadores = [
    {
      number: '1',
      title: 'Especialización Peruana',
      description: 'Alineado a MINEDU desde el diseño.',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
        </svg>
      ),
      color: 'from-brand-brandeis-blue to-blue-600'
    },
    {
      number: '2',
      title: 'IA aplicada a la educación',
      description: 'No solo tecnología, sino automatización pedagógica.',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      color: 'from-brand-brunswick-green to-green-600'
    },
    {
      number: '3',
      title: 'Modelo justo',
      description: 'Facturación curso×estudiante proporcional.',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
      color: 'from-brand-sunglow to-yellow-500'
    },
    {
      number: '4',
      title: 'Implementación rápida',
      description: 'En semanas, no meses.',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
      color: 'from-brand-orange-pantone to-red-500'
    },
    {
      number: '5',
      title: 'Soporte local',
      description: 'Equipo que entiende tu realidad educativa.',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
        </svg>
      ),
      color: 'from-brand-dark-moss-green to-green-700'
    }
  ]

  return (
    <section id="diferenciadores" className="section bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(30deg, #0f4c38 12%, transparent 12.5%, transparent 87%, #0f4c38 87.5%, #0f4c38), linear-gradient(150deg, #0f4c38 12%, transparent 12.5%, transparent 87%, #0f4c38 87.5%, #0f4c38), linear-gradient(30deg, #0f4c38 12%, transparent 12.5%, transparent 87%, #0f4c38 87.5%, #0f4c38), linear-gradient(150deg, #0f4c38 12%, transparent 12.5%, transparent 87%, #0f4c38 87.5%, #0f4c38)`,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px'
        }}></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="section-title">
            Diferenciadores de Mentorium
          </h2>
          <p className="section-subtitle">
            Lo que nos hace únicos en el mercado educativo peruano
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {diferenciadores.map((item, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card */}
              <div className="card text-center h-full hover:scale-105 transition-all duration-500 group-hover:shadow-floating">
                {/* Number Badge */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {item.number}
                </div>

                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-fluid-lg font-semibold text-brand-dark-green mb-3 group-hover:text-brand-brandeis-blue transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-fluid-sm text-brand-dark-green/70 leading-relaxed">
                  {item.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-brand-isabelline/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>

              {/* Connection Line for Desktop */}
              {index < diferenciadores.length - 1 && (
                <div className="hidden lg:block absolute top-6 -right-4 w-8 h-px bg-gradient-to-r from-brand-brunswick-green/50 to-transparent z-10"></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center">
          <div className="bg-brand-isabelline/50 backdrop-blur-sm border border-white/50 rounded-xl shadow-lg inline-block p-8 max-w-2xl">
            <h3 className="text-2xl font-bold text-brand-dark-green mb-4">
              ¿Por qué elegir Mentorium?
            </h3>
            <p className="text-brand-dark-green/80 mb-6">
              Somos la única plataforma diseñada específicamente para el sistema educativo peruano con tecnología de vanguardia.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-white/50 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-brand-brandeis-blue rounded-full"></div>
                <span className="text-brand-dark-green">Hecho para el Perú</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/50 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-brand-brunswick-green rounded-full"></div>
                <span className="text-brand-dark-green">IA Educativa</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/50 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-brand-orange-pantone rounded-full"></div>
                <span className="text-brand-dark-green">Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Diferenciadores