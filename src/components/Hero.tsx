"use client"

import Link from 'next/link'
import { ArrowRightIcon } from '@/components/icons'
import CardShowreel from '@/components/animations/CardShowreel'

const Hero = () => {

  return (
    <section id="inicio" className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Colorful Halo/Aura Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Main central aura - largest and most prominent */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-brand-brandeis-blue/20 via-brand-sunglow/15 to-brand-orange-pantone/20 rounded-full filter blur-3xl animate-pulse-glow"></div>
        
        {/* Secondary floating orbs with different colors and positions */}
        <div className="absolute top-1/4 right-1/5 w-80 h-80 bg-gradient-to-br from-brand-brunswick-green/25 to-brand-dark-moss-green/20 rounded-full filter blur-2xl animate-float-slow"></div>
        
        <div className="absolute bottom-1/3 left-1/6 w-64 h-64 bg-gradient-to-tr from-brand-sunglow/30 to-brand-orange-pantone/25 rounded-full filter blur-2xl animate-float-delayed"></div>
        
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-bl from-brand-brandeis-blue/35 to-brand-brunswick-green/20 rounded-full filter blur-xl animate-subtle-float"></div>
        
        {/* Smaller accent orbs for additional depth */}
        <div className="absolute top-3/4 right-1/2 w-32 h-32 bg-brand-dark-moss-green/25 rounded-full filter blur-xl animate-float-slow"></div>
        
        <div className="absolute top-1/6 left-1/4 w-40 h-40 bg-gradient-to-r from-brand-orange-pantone/30 to-brand-sunglow/25 rounded-full filter blur-xl animate-float-delayed"></div>
        
        {/* Edge glow effects */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-brand-brandeis-blue/15 via-transparent to-transparent rounded-full filter blur-3xl"></div>
        
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-brand-orange-pantone/15 via-transparent to-transparent rounded-full filter blur-3xl"></div>
      </div>

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