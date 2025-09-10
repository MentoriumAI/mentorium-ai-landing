"use client"

import Link from 'next/link'
import { ArrowRightIcon } from '@/components/icons'
import CardShowreel from '@/components/animations/CardShowreel'

const Hero = () => {

  return (
    <section id="inicio" className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Subtle Background Element */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-brandeis-blue/5 rounded-full filter blur-3xl"></div>
      </div>

      {/* Title Section - Full width with centered content */}
      <div className="relative z-20 w-full pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-20">
        <div className="container">
          <div className="text-center max-w-5xl mx-auto space-y-8 sm:space-y-12">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight font-serif">
              <span className="text-brand-dark-green">La plataforma educativa inteligente que transforma la enseñanza-aprendizaje y maximiza los resultados</span>
              {/* <br />
              <span className="bg-gradient-to-r from-brand-brunswick-green to-brand-brandeis-blue bg-clip-text text-transparent">inteligente</span>
              <br />
              <span className="text-brand-dark-green">que multiplica resultados</span> */}
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl lg:text-3xl text-brand-dark-green/80 max-w-4xl mx-auto leading-relaxed">
            Convierte cada etapa educativa en una oportunidad de crecimiento: Mentorium integra pedagogía e inteligencia artificial en una innovación tecnológica que impulsa mejores resultados en menos tiempo.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-6">
              <Link 
                href="#demo" 
                className="btn-primary btn-large group"
              >
                <span className="text-base sm:text-lg">Comienza hoy con Mentorium</span>
                <ArrowRightIcon className="ml-2 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              {/* Microcopy */}
              <p className="text-base text-brand-dark-green/60">
                100% online, sin instalación y sin costo inicial.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Showreel Section - Full width */}
      <div className="relative z-20 w-full py-8 sm:py-12 lg:py-16">
        <CardShowreel autoScrollSpeed={25} pauseOnHover={true} />
      </div>
    </section>
  )
}

export default Hero