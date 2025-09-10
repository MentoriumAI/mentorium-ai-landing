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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-brand-brandeis-blue/20 via-brand-sunglow/15 to-brand-orange-pantone/20 rounded-full filter blur-[150px] animate-pulse-glow"></div>
        
        {/* Secondary floating orbs positioned to avoid overlap */}
        <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] bg-gradient-to-br from-primary-300/20 to-success-400/15 rounded-full filter blur-[100px] animate-float-slow"></div>
        
        <div className="absolute bottom-[15%] left-[8%] w-[350px] h-[350px] bg-gradient-to-tr from-brand-sunglow/25 to-brand-orange-pantone/20 rounded-full filter blur-[90px] animate-float-delayed"></div>
        
        <div className="absolute top-[20%] left-[15%] w-[300px] h-[300px] bg-gradient-to-bl from-brand-brandeis-blue/30 to-primary-400/15 rounded-full filter blur-[80px] animate-subtle-float"></div>
        
        {/* Accent orbs positioned in corners and edges */}
        <div className="absolute bottom-[25%] right-[12%] w-[250px] h-[250px] bg-primary-300/20 rounded-full filter blur-[70px] animate-float-slow"></div>
        
        <div className="absolute top-[35%] right-[25%] w-[200px] h-[200px] bg-gradient-to-r from-brand-orange-pantone/25 to-brand-sunglow/20 rounded-full filter blur-[60px] animate-float-delayed"></div>
        
        {/* Edge glow effects - moved further to corners */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-brand-brandeis-blue/10 via-transparent to-transparent rounded-full filter blur-[120px]"></div>
        
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-gradient-to-tl from-brand-orange-pantone/10 via-transparent to-transparent rounded-full filter blur-[120px]"></div>
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