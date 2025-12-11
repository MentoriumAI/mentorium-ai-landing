"use client"

import Link from 'next/link'
import { ArrowRightIcon } from '@/components/icons'
import CardShowreel from '@/components/animations/CardShowreel'

const Hero = () => {

  return (
    <section id="inicio" className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary-50/50 to-transparent"></div>

      {/* Title Section - Full width with centered content */}
      <div className="relative z-20 w-full pt-32 sm:pt-44 lg:pt-52 pb-8 sm:pb-12">
        <div className="container">
          <div className="text-center max-w-5xl mx-auto space-y-4 sm:space-y-6">
            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold" style={{ fontFamily: 'var(--font-faculty-glyphic)', lineHeight: '1.15', paddingBottom: '0.25rem' }}>
              <span className="bg-gradient-to-r from-brand-brunswick-green to-brand-brandeis-blue bg-clip-text text-transparent" style={{ display: 'inline-block', paddingBottom: '0.1em' }}>Mentorium</span><br/>
              <span className="bg-gradient-to-br from-brand-brunswick-green to-brand-dark-moss-green bg-clip-text text-transparent" style={{ display: 'inline-block', paddingBottom: '0.1em' }}>La plataforma educativa inteligente que transforma la enseñanza y el aprendizaje</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-brand-dark-green/80 max-w-4xl mx-auto leading-relaxed">
            Integra pedagogía e inteligencia artificial para convertir cada etapa educativa en una experiencia de crecimiento.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-4">
              <Link 
                href="/start" 
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
      <div className="relative z-20 w-full">
        <CardShowreel autoScrollSpeed={30} pauseOnHover={true} />
      </div>
    </section>
  )
}

export default Hero