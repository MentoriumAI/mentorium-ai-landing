"use client"

import Link from 'next/link'
import { cloneElement, type ReactElement, type SVGProps, useState, useEffect, useCallback, useMemo } from 'react'
import { SparklesIcon, LightBulbIcon, ArrowRightIcon } from '@/components/icons'

const Hero = () => {
  // Brand color variants used randomly (but deterministically) per icon
  const colorConfigs = useMemo(() => [
    {
      name: 'blue',
      iconClass: 'text-brand-brandeis-blue',
      chipFill: 'rgba(0, 111, 234, 0.12)',
      chipStroke: 'rgba(0, 111, 234, 0.25)'
    },
    {
      name: 'yellow',
      iconClass: 'text-brand-sunglow',
      chipFill: 'rgba(255, 196, 0, 0.16)',
      chipStroke: 'rgba(255, 196, 0, 0.25)'
    },
    {
      name: 'orange',
      iconClass: 'text-brand-orange-pantone',
      chipFill: 'rgba(251, 97, 19, 0.14)',
      chipStroke: 'rgba(251, 97, 19, 0.28)'
    },
    {
      name: 'green',
      iconClass: 'text-brand-brunswick-green',
      chipFill: 'rgba(15, 76, 56, 0.12)',
      chipStroke: 'rgba(15, 76, 56, 0.24)'
    }
  ], [])

  // Client-side state for randomized colors to avoid hydration mismatch
  const [topRowColors, setTopRowColors] = useState(colorConfigs)
  const [bottomRowColors, setBottomRowColors] = useState(colorConfigs)
  const [isClient, setIsClient] = useState(false)

  // Enhanced orbit calculations using percentage-based coordinates - spread out more from card center
  const cx = 50  // Center X as percentage (card center)
  const cy = 50  // Center Y as percentage (card center)
  // Optimized radii: slightly increased horizontal spread, tighter vertical spread
  const rx = 53  // Horizontal radius as percentage (slightly increased from 50)
  const ry = 30  // Vertical radius as percentage (kept tight as requested)
  // Balanced jitter range for organic spread around the card center
  const jitterMin = 0.1   // Moderate radial jitter for natural variation
  const jitterMax = 0.2   // Controlled radial jitter to maintain even spacing
  // Reduced angular jitter for better even distribution
  const angleJitterMinDeg = -8   // Smaller angular range for more even spacing
  const angleJitterMaxDeg = 8    // Keeps organic feel while ensuring better distribution

  type OrbitItem = { key: string; chipClass: string; svg: ReactElement<SVGProps<SVGSVGElement>> }

  const items: OrbitItem[] = [
    { key: 'book', chipClass: 'shadow-glow-orange', svg: (
      <svg className="w-7 h-7 text-brand-orange-pantone" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
      </svg>
    )},
    { key: 'sparkles', chipClass: 'shadow-glow-green', svg: (
      <SparklesIcon className="w-7 h-7" />
    )},
    { key: 'bulb', chipClass: 'shadow-glow-orange', svg: (
      <LightBulbIcon className="w-7 h-7" />
    )},
    { key: 'gear', chipClass: 'shadow-glow-green', svg: (
      <svg className="w-7 h-7 text-brand-brunswick-green" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
      </svg>
    )},
    { key: 'clock', chipClass: 'shadow-glow-orange', svg: (
      <svg className="w-7 h-7 text-brand-orange-pantone" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
      </svg>
    )},
    { key: 'chart', chipClass: 'shadow-glow-green', svg: (
      <svg className="w-7 h-7 text-brand-brunswick-green" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
      </svg>
    )},
    { key: 'star', chipClass: 'shadow-glow-green', svg: (
      <svg className="w-7 h-7 text-brand-brunswick-green" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    )},
    { key: 'rocket', chipClass: 'shadow-glow-orange', svg: (
      <svg className="w-7 h-7 text-brand-orange-pantone" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
      </svg>
    )},
  ]

  const n = items.length

  // Shuffle function using client-side randomization for color assignments
  const shuffleArray = useCallback(<T,>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }, [])

  // Client-side effect to randomize colors after hydration
  useEffect(() => {
    setIsClient(true)
    setTopRowColors(shuffleArray([...colorConfigs]))
    setBottomRowColors(shuffleArray([...colorConfigs]))
  }, [colorConfigs, shuffleArray])

  // Fixed icon arrangements for mobile (same icons, different colors)
  const topRowItems = items.slice(0, 4) // First 4 icons always
  const bottomRowItems = items.slice(4, 8) // Last 4 icons always

  // Deterministic pseudo-random in [0,1) based on index to avoid hydration mismatch
  const rand01 = (k: number) => {
    const s = Math.sin((k + 1) * 12.9898) * 43758.5453
    return s - Math.floor(s)
  }

  // Quantize to reduce tiny FP differences between Node (SSR) and browser (CSR)
  const round = (v: number, p = 3) => {
    const m = Math.pow(10, p)
    return Math.round(v * m) / m
  }

  const orbitElements = items.map((item, i) => {
    // Enhanced angular distribution: start from top, distribute evenly with small offset
    const baseAngle = (-Math.PI / 2) + (2 * Math.PI * i) / n
    // Add a small rotation offset to avoid symmetrical clustering
    const offsetAngle = baseAngle + (Math.PI / (n * 2)) // Half-step offset for better distribution
    // Angular jitter within reduced range for more even spacing
    const angleJitterDeg = angleJitterMinDeg + (angleJitterMaxDeg - angleJitterMinDeg) * rand01(i + 101)
    const thetaJ = offsetAngle + (angleJitterDeg * Math.PI / 180)
    // Radial jitter within configurable range [jitterMin, jitterMax]
    const jitter = jitterMin + (jitterMax - jitterMin) * rand01(i)
    const rScale = 1 + jitter
    const x = cx + (rx * rScale) * Math.cos(thetaJ)
    const y = cy - (ry * rScale) * Math.sin(thetaJ)
    const cfg = colorConfigs[i % colorConfigs.length]
    const iconClass = cfg.iconClass
    const chipFill = cfg.chipFill
    const chipStroke = cfg.chipStroke
    const sized = cloneElement(item.svg as ReactElement<SVGProps<SVGSVGElement>>, {
      width: 4.5,
      height: 4.5,
      x: -2.25,
      y: -2.25,
      className: `${iconClass}`
    })
    // Deterministic animation timing per icon
    const dur = 4 + Math.floor(rand01(i + 303) * 4) // 4-7s
    const delay = Math.floor(rand01(i + 404) * 9) * 0.2 // 0,0.2,...,1.6s
    // Dynamic pulsing scale: approximately 3 icons big at a time via phase-staggered pulse
    // Enhanced per-icon big scale amplitude for more dramatic pulsing
    const bigScale = round(1.6 + 0.3 * rand01(i + 606), 3) // 1.6 - 1.9 (increased from 1.45-1.65)
    // Pulse cycle duration and evenly distributed phase so big states are staggered
    const pulseDur = 16 // seconds
    const phaseBase = (i / n) * pulseDur
    const phaseJitter = round(0.6 * (rand01(i + 707) - 0.5), 2) // +/-0.3s to avoid perfect sync
    const pulseDelay = round(phaseBase + phaseJitter, 2)

    type PulseStyle = React.CSSProperties & { ['--big-scale']?: string }
    const pulseStyle: PulseStyle = {
      ['--big-scale']: `${bigScale}`,
      animationDuration: `${pulseDur}s`,
      animationDelay: `${pulseDelay}s`
    }
    return (
      <g key={item.key} transform={`translate(${round(x)}, ${round(y)})`} filter="url(#chipShadow)">
        <g className="orbit-pulse" style={pulseStyle}>
          <g className="orbit-icon" style={{ animationDuration: `${dur}s`, animationDelay: `${delay}s` }}>
            {/* Base tinted chip */}
            <circle r="4.5" fill={chipFill} stroke={chipStroke} strokeWidth="0.2" />
            {/* Frosted sheen overlay */}
            <circle r="4.5" fill="url(#chipFrostGrad)" fillOpacity="0.9" />
            {/* Subtle inner highlight ring */}
            <circle r="4.2" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="0.15" />
            {sized}
          </g>
        </g>
      </g>
    )
  })

  return (
    <section id="inicio" className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Subtle Background Element */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-brandeis-blue/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container relative z-20 pt-24 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-36">
        <div className="grid grid-cols-1 lg:grid lg:grid-cols-12 gap-8 lg:gap-x-8 lg:items-center">
          {/* Hero Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left order-1 lg:order-1 lg:col-span-5">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight font-serif">
              <span className="text-brand-dark-green">La plataforma educativa</span>
              <br />
              <span className="bg-gradient-to-r from-brand-brunswick-green to-brand-brandeis-blue bg-clip-text text-transparent">inteligente</span>
              <br />
              <span className="text-brand-dark-green">que multiplica resultados</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-brand-dark-green/80 max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto lg:mx-0 leading-relaxed">
              Optimiza la gestión académica con IA: materiales, aulas y evaluaciones en menos tiempo y a menor costo.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              <Link 
                href="#demo" 
                className="btn-primary btn-large group"
              >
                <span className="text-sm sm:text-base">Comenzar con Mentorium</span>
                <ArrowRightIcon className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              {/* Microcopy */}
              <p className="text-sm text-brand-dark-green/60 text-center lg:text-left">
                100% online, sin instalación y sin costo inicial.
              </p>
            </div>

          </div>

          {/* Mobile Card with Linear Bubbles - Only visible on mobile/tablet */}
          <div className="lg:hidden flex flex-col items-center justify-center py-16 sm:py-20 order-2 relative">
            {/* Top Row of Bubbles */}
            <div className="flex justify-center items-center gap-4 sm:gap-6 mb-6 relative z-10">
              {topRowItems.map((item, i) => {
                // Use randomized colors only on client, fallback to sequential during SSR
                const cfg = isClient ? topRowColors[i % topRowColors.length] : colorConfigs[i % colorConfigs.length]
                const iconClass = cfg.iconClass
                const chipFill = cfg.chipFill
                const chipStroke = cfg.chipStroke
                const sized = cloneElement(item.svg as ReactElement<SVGProps<SVGSVGElement>>, {
                  className: `w-5 h-5 sm:w-6 sm:h-6 ${iconClass}`
                })
                // Staggered animation delays for wave effect
                const delay = i * 0.5 // 0.5s intervals
                const duration = 3 + (i % 2) // Alternate between 3s and 4s
                
                return (
                  <div
                    key={`mobile-top-${item.key}`}
                    className="mobile-bubble-float relative"
                    style={{ 
                      animationDelay: `${delay}s`,
                      animationDuration: `${duration}s`
                    }}
                  >
                    <div 
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mobile-bubble-pulse relative overflow-hidden"
                      style={{ 
                        backgroundColor: chipFill,
                        border: `2px solid ${chipStroke}`,
                        animationDelay: `${delay + 1}s`,
                        animationDuration: `${duration + 1}s`,
                        boxShadow: '0 4px 20px 0 rgba(31, 38, 135, 0.15), 0 0 20px rgba(251, 97, 19, 0.1)'
                      }}
                    >
                      {/* Subtle frosted sheen overlay - reduced opacity to preserve icon colors */}
                      <div 
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.25) 60%, rgba(255,255,255,0.15) 100%)',
                          opacity: 0.7
                        }}
                      />
                      {/* Inner highlight ring like desktop */}
                      <div 
                        className="absolute inset-1 rounded-full border border-white/40 pointer-events-none"
                      />
                      {/* Icon with higher z-index to ensure vibrant colors */}
                      <div className="relative z-10">
                        {sized}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Main Card */}
            <div className="frost-main-card card-breathe p-6 sm:p-8 rounded-2xl sm:rounded-3xl w-full max-w-[90%] sm:max-w-[480px] mx-4 relative z-20">
              <div className="space-y-4 sm:space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow-green">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-brand-dark-green">Plataforma Educativa</span>
                  </div>
                  <div className="w-2 h-2 bg-brand-orange-pantone rounded-full animate-pulse"></div>
                </div>

                {/* Content with Green/Orange Theme */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="h-3 bg-gradient-to-r from-brand-brunswick-green/30 to-brand-orange-pantone/30 rounded-full"></div>
                  <div className="h-3 bg-gradient-to-r from-brand-orange-pantone/30 to-brand-brunswick-green/30 rounded-full w-4/5"></div>
                  <div className="h-3 bg-gradient-to-r from-brand-dark-green/30 to-brand-orange-pantone/40 rounded-full w-3/5"></div>
                </div>

                {/* Features with 4 Brand Colors as Bullets: Blue, Yellow, Orange, Green */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-brand-brandeis-blue rounded-full flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm text-brand-dark-green">Automatización IA</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-brand-sunglow rounded-full flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm text-brand-dark-green">Cumple MINEDU</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-brand-orange-pantone rounded-full flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm text-brand-dark-green">Alertas Tempranas</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-brand-brunswick-green rounded-full flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm text-brand-dark-green">Asistente Virtual</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row of Bubbles */}
            <div className="flex justify-center items-center gap-4 sm:gap-6 mt-6 relative z-10">
              {bottomRowItems.map((item, i) => {
                // Use randomized colors only on client, fallback to sequential during SSR
                const cfg = isClient ? bottomRowColors[i % bottomRowColors.length] : colorConfigs[i % colorConfigs.length]
                const iconClass = cfg.iconClass
                const chipFill = cfg.chipFill
                const chipStroke = cfg.chipStroke
                const sized = cloneElement(item.svg as ReactElement<SVGProps<SVGSVGElement>>, {
                  className: `w-5 h-5 sm:w-6 sm:h-6 ${iconClass}`
                })
                // Staggered animation delays for wave effect, offset from top row
                const delay = (i * 0.5) + 2 // Start 2s after and 0.5s intervals
                const duration = 3.5 + (i % 2) // Alternate between 3.5s and 4.5s
                
                return (
                  <div
                    key={`mobile-bottom-${item.key}`}
                    className="mobile-bubble-float relative"
                    style={{ 
                      animationDelay: `${delay}s`,
                      animationDuration: `${duration}s`
                    }}
                  >
                    <div 
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mobile-bubble-pulse relative overflow-hidden"
                      style={{ 
                        backgroundColor: chipFill,
                        border: `2px solid ${chipStroke}`,
                        animationDelay: `${delay + 1.5}s`,
                        animationDuration: `${duration + 1}s`,
                        boxShadow: '0 4px 20px 0 rgba(31, 38, 135, 0.15), 0 0 20px rgba(251, 97, 19, 0.1)'
                      }}
                    >
                      {/* Subtle frosted sheen overlay - reduced opacity to preserve icon colors */}
                      <div 
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.25) 60%, rgba(255,255,255,0.15) 100%)',
                          opacity: 0.7
                        }}
                      />
                      {/* Inner highlight ring like desktop */}
                      <div 
                        className="absolute inset-1 rounded-full border border-white/40 pointer-events-none"
                      />
                      {/* Icon with higher z-index to ensure vibrant colors */}
                      <div className="relative z-10">
                        {sized}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Desktop Column: Illustration + Card with Orbital System - Hidden on mobile, visible on large screens */}
          <div className="hidden lg:block relative order-2 lg:order-2 lg:col-span-7">
            {/* Maximum orbit container with optimal space for widely spread icons */}
            <div className="relative overflow-visible w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[5/3] min-h-[450px] max-h-[550px]">
              {/* Hero Illustration with Orbital Icons */}
              <div className="absolute inset-0 z-20 overflow-visible">
                {/* Simplified Orbital Icon System */}
                <div className="absolute inset-0 pointer-events-none overflow-visible">
                  {/* Responsive orbital SVG */}
                  <svg className="absolute inset-0 w-full h-full z-20 hero-orbit overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                    <defs>
                      {/* Circular drop shadow to match the round bubbles */}
                      <filter id="chipShadow" x="-100%" y="-100%" width="300%" height="300%" colorInterpolationFilters="sRGB">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                        <feOffset dx="0" dy="2" result="offset" />
                        <feFlood floodColor="rgba(31, 38, 135, 0.15)" />
                        <feComposite in2="offset" operator="in" />
                        <feMerge>
                          <feMergeNode />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      {/* Subtle white gradient for frosted sheen */}
                      <radialGradient id="chipFrostGrad" cx="30%" cy="30%" r="80%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                        <stop offset="60%" stopColor="rgba(255,255,255,0.70)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.55)" />
                      </radialGradient>
                    </defs>
                    {/* Center near the right column where the card lives */}
                    
                    {/* Icons */}
                    {orbitElements}
                  </svg>
                </div>
              </div>

              <div className="absolute inset-0 z-10 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                {/* Main Card with Frosted Glass + Breathing Animation */}
                <div className="frost-main-card card-breathe p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl w-full max-w-[85%] sm:max-w-[520px] lg:max-w-[480px]">
                  <div className="space-y-4 sm:space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow-green">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                          </svg>
                        </div>
                        <span className="text-sm sm:text-base font-semibold text-brand-dark-green">Plataforma Educativa</span>
                      </div>
                      <div className="w-2 h-2 bg-brand-orange-pantone rounded-full animate-pulse"></div>
                    </div>

                    {/* Content with Green/Orange Theme */}
                    <div className="space-y-3 sm:space-y-4">
                      <div className="h-3 bg-gradient-to-r from-brand-brunswick-green/30 to-brand-orange-pantone/30 rounded-full"></div>
                      <div className="h-3 bg-gradient-to-r from-brand-orange-pantone/30 to-brand-brunswick-green/30 rounded-full w-4/5"></div>
                      <div className="h-3 bg-gradient-to-r from-brand-dark-green/30 to-brand-orange-pantone/40 rounded-full w-3/5"></div>
                    </div>

                    {/* Features with 4 Brand Colors as Bullets: Blue, Yellow, Orange, Green */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-brand-brandeis-blue rounded-full flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm text-brand-dark-green">Automatización IA</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-brand-sunglow rounded-full flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm text-brand-dark-green">Cumple MINEDU</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-brand-orange-pantone rounded-full flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm text-brand-dark-green">Alertas Tempranas</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-brand-brunswick-green rounded-full flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm text-brand-dark-green">Asistente Virtual</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero