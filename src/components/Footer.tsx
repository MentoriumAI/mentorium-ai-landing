'use client'

import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contacto" className="bg-brand-dark-green text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container relative z-10">
        {/* Contact Section */}
        <div className="section">
          {/* Full-width heading above columns */}
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            <span className="text-brand-sunglow">Contáctanos</span>
          </h2>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Info */}
            <div>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                ¿Listo para transformar tu proceso educativo? 
                Agenda una demostración personalizada y descubre el futuro de la educación.
              </p>

              {/* Contact Methods */}
              <div className="space-y-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-slate-300">hola@mentorium.ai</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Teléfono</div>
                    <div className="text-slate-300">(+51) 953 719 060</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Quick Benefits */}
            <div className="glass-card bg-white/10 p-8">
              <h3 className="font-semibold mb-4">¿Por qué elegir Mentorium?</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Implementación en menos de 30 días</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Incremento significativo en la eficiencia educativa</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Soporte dedicado en español cuando lo necesites</span>
                </div>
              </div>

              {/* CTA inside card */}
              <div className="mt-6 text-center">
                <Link href="#demo" className="btn-primary btn-large inline-flex items-center">
                  <span>Comienza hoy con Mentorium</span>
                  <svg className="ml-2 w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="border-t border-slate-700 pt-12 pb-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="text-2xl font-bold gradient-text mb-4 inline-block">
                Mentorium
              </Link>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Transformando la educación a través de la inteligencia artificial. 
                Creamos herramientas que permiten a los educadores enfocarse en lo que realmente importa: enseñar.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-slate-300 hover:bg-primary-600 hover:text-white transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Enlaces rápidos</h3>
              <ul className="space-y-3 text-slate-300">
                <li>
                  <Link href="#inicio" className="hover:text-primary-400 transition-colors duration-200">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="#problema-solucion" className="hover:text-primary-400 transition-colors duration-200">
                    Problema y Solución
                  </Link>
                </li>
                <li>
                  <Link href="#caracteristicas" className="hover:text-primary-400 transition-colors duration-200">
                    Características
                  </Link>
                </li>
                <li>
                  <Link href="#beneficios" className="hover:text-primary-400 transition-colors duration-200">
                    Beneficios
                  </Link>
                </li>
                <li>
                  <Link href="#roadmap" className="hover:text-primary-400 transition-colors duration-200">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-3 text-slate-300">
                <li>
                  <Link href="/privacidad" className="hover:text-primary-400 transition-colors duration-200">
                    Política de privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/terminos" className="hover:text-primary-400 transition-colors duration-200">
                    Términos y condiciones
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-primary-400 transition-colors duration-200">
                    Política de cookies
                  </Link>
                </li>
                <li>
                  <Link href="/gdpr" className="hover:text-primary-400 transition-colors duration-200">
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
            <div>
              © {currentYear} Mentorium. Todos los derechos reservados.
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span>Hecho con ❤️ para educadores</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Todo bien, todo correcto</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer