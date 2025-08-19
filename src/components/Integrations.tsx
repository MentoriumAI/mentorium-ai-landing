'use client'

const Integrations = () => {
  const integrations = [
    {
      name: 'Moodle',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3z"/>
        </svg>
      ),
      description: 'Integración directa con cursos y actividades',
      color: 'from-orange-400 to-orange-600'
    },
    {
      name: 'Blackboard',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3z"/>
        </svg>
      ),
      description: 'Sincronización con contenidos y evaluaciones',
      color: 'from-slate-600 to-slate-800'
    },
    {
      name: 'Google Workspace',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 104 0 2 2 0 00-4 0zm6-2a2 2 0 100 4 2 2 0 000-4z" clipRule="evenodd" />
        </svg>
      ),
      description: 'Colaboración en tiempo real con Docs y Drive',
      color: 'from-blue-500 to-blue-700'
    },
    {
      name: 'Microsoft 365',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6z" clipRule="evenodd" />
        </svg>
      ),
      description: 'Exportación a Word, PowerPoint y Teams',
      color: 'from-blue-600 to-blue-800'
    },
    {
      name: 'Canvas',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ),
      description: 'Sincronización de módulos y asignaciones',
      color: 'from-red-500 to-red-700'
    },
    {
      name: 'Zoom',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
        </svg>
      ),
      description: 'Integración con clases virtuales y grabaciones',
      color: 'from-blue-400 to-blue-600'
    }
  ]

  return (
    <section id="integraciones" className="section bg-white relative overflow-hidden">
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
            Compatible con tus herramientas favoritas
          </h2>
          <p className="section-subtitle">
            Mentorium se integra perfectamente con las plataformas que ya usas, 
            maximizando tu inversión tecnológica existente
          </p>
        </div>

        {/* Integration Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="card text-center h-full hover:scale-105 transition-all duration-500 group-hover:shadow-floating">
                {/* Icon */}
                <div className="mb-3 sm:mb-4 flex justify-center">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${integration.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {integration.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-fluid-base font-semibold text-slate-800 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                  {integration.name}
                </h3>
                
                <p className="text-fluid-sm text-slate-600 leading-relaxed">
                  {integration.description}
                </p>

                {/* Status Indicator */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="glass-card p-6 sm:p-8 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-fluid-lg font-semibold text-slate-800 mb-3">API Robusta</h3>
            <p className="text-fluid-sm text-slate-600">Conecta cualquier sistema con nuestra API RESTful documentada y fácil de usar.</p>
          </div>

          <div className="glass-card p-6 sm:p-8 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center mx-auto mb-4">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 01-1 1H8a1 1 0 110-2h4a1 1 0 011 1zm-1 4a1 1 0 100-2H8a1 1 0 100 2h4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-fluid-lg font-semibold text-slate-800 mb-3">Sincronización Automática</h3>
            <p className="text-fluid-sm text-slate-600">Mantén tus datos actualizados en tiempo real entre todas las plataformas.</p>
          </div>

          <div className="glass-card p-6 sm:p-8 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-accent-500 to-warning-500 flex items-center justify-center mx-auto mb-4">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-fluid-lg font-semibold text-slate-800 mb-3">Soporte 24/7</h3>
            <p className="text-fluid-sm text-slate-600">Nuestro equipo técnico te ayuda con la configuración e integración sin costo adicional.</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="glass-card inline-block p-8 max-w-2xl">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              ¿No ves tu plataforma?
            </h3>
            <p className="text-slate-600 mb-6">
              Desarrollamos integraciones personalizadas para adaptarnos a tus necesidades específicas.
            </p>
            <a 
              href="#contacto" 
              className="btn-primary"
            >
              Consultar Integración Personalizada
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Integrations