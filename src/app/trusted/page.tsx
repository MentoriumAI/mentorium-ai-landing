import Header from '@/components/Header'
import Integrations from '@/components/Integrations'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function TrustedPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section for Trust & Integrations */}
        <section className="relative min-h-[60vh] flex items-center hero-gradient overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-brandeis-blue/5 rounded-full filter blur-3xl"></div>
          </div>

          <div className="container relative z-20 pt-24 sm:pt-24 md:pt-28 lg:pt-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-sunglow/20 text-sm font-medium text-brand-dark-green mb-8">
                🤝 Confianza y compatibilidad garantizada
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight font-serif mb-8">
                <span className="text-brand-dark-green">Mentorium es</span>
                <br />
                <span className="bg-gradient-to-r from-brand-brunswick-green to-brand-brandeis-blue bg-clip-text text-transparent">confiable e integrado</span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl text-brand-dark-green/80 max-w-3xl mx-auto leading-relaxed mb-8">
                Más de 500 instituciones confían en Mentorium para transformar su gestión educativa con la mejor compatibilidad del mercado
              </p>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-brand-isabelline max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-brand-brandeis-blue">500+</div>
                  <div className="text-sm text-brand-dark-green/70">Instituciones</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-brand-orange-pantone">99.8%</div>
                  <div className="text-sm text-brand-dark-green/70">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-brand-dark-moss-green">50+</div>
                  <div className="text-sm text-brand-dark-green/70">Integraciones</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Integrations />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}