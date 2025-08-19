"use client"

import Link from 'next/link'
import { cloneElement, isValidElement } from 'react'

const Hero = () => {
  // Precompute orbit icons positioned at equal arc-length intervals
  const viewW = 820
  const viewH = 520
  const cx = 410
  const cy = 260
  // Radii chosen to comfortably surround the centered card inside a 3:2 box
  const rx = 330
  const ry = 205
  // Configurable radial jitter range (fraction of radius): set between -0.10 and 0.10 e.g.
  const jitterMin = 0.05
  const jitterMax = 0.10
  // Configurable angular jitter range in degrees (relative to Y-axis placement)
  const angleJitterMinDeg = -8
  const angleJitterMaxDeg = 8

  const items = [
    { key: 'book', chipClass: 'shadow-glow-orange', svg: (
      <svg className="w-7 h-7 text-brand-orange-pantone" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
      </svg>
    )},
    { key: 'brain', chipClass: 'shadow-glow-green', svg: (
      <svg className="w-7 h-7 text-brand-brunswick-green" fill="currentColor" viewBox="0 0 20 20">
        <path d="M5.5 6a1.5 1.5 0 011.5-1.5h6a1.5 1.5 0 011.5 1.5v1c0 .83-.67 1.5-1.5 1.5H9v1.5h4a1.5 1.5 0 011.5 1.5v1c0 .83-.67 1.5-1.5 1.5H9v1.5h2a1.5 1.5 0 011.5 1.5v1c0 .83-.67 1.5-1.5 1.5H5a1.5 1.5 0 01-1.5-1.5v-10A1.5 1.5 0 015 4.5h.5V6z"/>
        <circle cx="6" cy="8" r="1"/>
        <circle cx="8" cy="6" r="1"/>
        <circle cx="10" cy="8" r="1"/>
        <circle cx="12" cy="6" r="1"/>
      </svg>
    )},
    { key: 'bulb', chipClass: 'shadow-glow-orange', svg: (
      <svg className="w-7 h-7 text-brand-orange-pantone" fill="currentColor" viewBox="0 0 20 20">
        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 6.343a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464a1 1 0 10-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM6 10a1 1 0 01-1 1H4a1 1 0 110-2h1a1 1 0 011 1zM9 16v1a1 1 0 102 0v-1a1 1 0 10-2 0zM10 12a2 2 0 100-4 2 2 0 000 4z"/>
      </svg>
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
  const samples = 720
  const startAngle = -Math.PI / 2
  const pts = [] as { x: number; y: number; s: number }[]
  let cum = 0
  let prevX = cx + rx * Math.cos(startAngle)
  let prevY = cy - ry * Math.sin(startAngle)
  pts.push({ x: prevX, y: prevY, s: 0 })
  for (let k = 1; k <= samples; k++) {
    const t = startAngle + (2 * Math.PI * k) / samples
    const x = cx + rx * Math.cos(t)
    const y = cy - ry * Math.sin(t)
    cum += Math.hypot(x - prevX, y - prevY)
    pts.push({ x, y, s: cum })
    prevX = x
    prevY = y
  }
  const total = cum
  const pointAt = (sTarget: number) => {
    if (sTarget <= 0) return pts[0]
    if (sTarget >= total) return pts[pts.length - 1]
    for (let i = 1; i < pts.length; i++) {
      if (pts[i].s >= sTarget) {
        const p0 = pts[i - 1]
        const p1 = pts[i]
        const span = p1.s - p0.s || 1
        const t = (sTarget - p0.s) / span
        return { x: p0.x + t * (p1.x - p0.x), y: p0.y + t * (p1.y - p0.y), s: sTarget }
      }
    }
    return pts[pts.length - 1]
  }

  // Brand color variants used randomly (but deterministically) per icon
  const colorConfigs = [
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
  ] as const

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
    const theta = (-Math.PI / 2) + (2 * Math.PI * i) / n
    // Angular jitter within configurable range [angleJitterMinDeg, angleJitterMaxDeg]
    const angleJitterDeg = angleJitterMinDeg + (angleJitterMaxDeg - angleJitterMinDeg) * rand01(i + 101)
    const thetaJ = theta + (angleJitterDeg * Math.PI / 180)
    // Radial jitter within configurable range [jitterMin, jitterMax]
    const jitter = jitterMin + (jitterMax - jitterMin) * rand01(i)
    const rScale = 1 + jitter
    const x = cx + (rx * rScale) * Math.cos(thetaJ)
    const y = cy - (ry * rScale) * Math.sin(thetaJ)
    const cfg = colorConfigs[i % colorConfigs.length]
    const iconClass = cfg.iconClass
    const chipFill = cfg.chipFill
    const chipStroke = cfg.chipStroke
    const sized = isValidElement(item.svg)
      ? cloneElement(item.svg as any, { width: 28, height: 28, x: -14, y: -14, className: `w-7 h-7 ${iconClass}` })
      : null
    // Deterministic animation timing per icon
    const dur = 4 + Math.floor(rand01(i + 303) * 4) // 4-7s
    const delay = Math.floor(rand01(i + 404) * 9) * 0.2 // 0,0.2,...,1.6s
    // Dynamic pulsing scale: approximately 3 icons big at a time via phase-staggered pulse
    // Per-icon big scale amplitude (deterministic)
    const bigScale = round(1.45 + 0.2 * rand01(i + 606), 3) // 1.45 - 1.65
    // Pulse cycle duration and evenly distributed phase so big states are staggered
    const pulseDur = 16 // seconds
    const phaseBase = (i / n) * pulseDur
    const phaseJitter = round(0.6 * (rand01(i + 707) - 0.5), 2) // +/-0.3s to avoid perfect sync
    const pulseDelay = round(phaseBase + phaseJitter, 2)
    return (
      <g key={item.key} transform={`translate(${round(x)}, ${round(y)})`} filter="url(#chipShadow)">
        <g className="orbit-pulse" style={{ ['--big-scale' as any]: `${bigScale}`, animationDuration: `${pulseDur}s`, animationDelay: `${pulseDelay}s` }}>
          <g className="orbit-icon" style={{ animationDuration: `${dur}s`, animationDelay: `${delay}s` }}>
            {/* Base tinted chip */}
            <circle r="28" fill={chipFill} stroke={chipStroke} />
            {/* Frosted sheen overlay */}
            <circle r="28" fill="url(#chipFrostGrad)" fillOpacity="0.9" />
            {/* Subtle inner highlight ring */}
            <circle r="27" fill="none" stroke="rgba(255,255,255,0.6)" />
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
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-brandeis-blue/5 rounded-full filter blur-3xl animate-float"></div>
      </div>

      <div className="container relative z-20 pt-24 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Hero Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-sunglow/20 text-sm font-medium text-brand-dark-green">
              ✨ Plataforma SaaS Educativa
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight font-serif">
              <span className="text-brand-dark-green">Reinventando</span>
              <br />
              <span className="text-brand-dark-green">la educación,</span>
              <br />
              <span className="bg-gradient-to-r from-brand-brunswick-green to-brand-brandeis-blue bg-clip-text text-transparent">un documento</span>
              <br />
              <span className="text-brand-dark-green">a la vez</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-brand-dark-green/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Automatiza y optimiza la creación de materiales educativos con 
              <span className="font-semibold text-brand-brandeis-blue"> inteligencia artificial</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="#demo" 
                className="btn-primary btn-large group"
              >
                Solicitar Demostración
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <Link 
                href="#caracteristicas" 
                className="btn-secondary btn-large group"
              >
                Ver Características
                <svg className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-brand-isabelline">
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-brand-brandeis-blue">10x</div>
                <div className="text-sm text-brand-dark-green/70">Más rápido</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-brand-orange-pantone">500+</div>
                <div className="text-sm text-brand-dark-green/70">Universidades</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-brand-dark-moss-green">99%</div>
                <div className="text-sm text-brand-dark-green/70">Satisfacción</div>
              </div>
            </div>
          </div>

          {/* Second Column: Illustration + Card */}
          <div className="relative ml-auto max-w-[820px]">
            {/* Fixed-size orbit box to prevent squashing */}
            <div className="relative ml-auto" style={{ width: 820, height: 520 }}>
              {/* Hero Illustration with Orbital Icons */}
              <div className="absolute inset-0 z-0">
                {/* Simplified Orbital Icon System */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Debug Ellipse (visible stroke) */}
                  <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 820 520" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                    <defs>
                      {/* Soft drop shadow to emulate glass depth */}
                      <filter id="chipShadow" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
                        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(31, 38, 135, 0.20)" floodOpacity="0.85" />
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

              <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
                {/* Main Card with Frosted Glass + Breathing Animation */}
                <div className="frost-main-card card-breathe p-8 lg:p-12 rounded-3xl w-[520px] lg:w-[560px]">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow-green">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                          </svg>
                        </div>
                        <span className="font-semibold text-brand-dark-green">Plataforma Educativa</span>
                      </div>
                      <div className="w-2 h-2 bg-brand-orange-pantone rounded-full animate-pulse"></div>
                    </div>

                    {/* Content with Green/Orange Theme */}
                    <div className="space-y-4">
                      <div className="h-3 bg-gradient-to-r from-brand-brunswick-green/30 to-brand-orange-pantone/30 rounded-full"></div>
                      <div className="h-3 bg-gradient-to-r from-brand-orange-pantone/30 to-brand-brunswick-green/30 rounded-full w-4/5"></div>
                      <div className="h-3 bg-gradient-to-r from-brand-dark-green/30 to-brand-orange-pantone/40 rounded-full w-3/5"></div>
                    </div>

                    {/* Features with 4 Brand Colors as Bullets: Blue, Yellow, Orange, Green */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-brand-brandeis-blue rounded-full"></div>
                        <span className="text-sm text-brand-dark-green">IA Integrada</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-brand-sunglow rounded-full"></div>
                        <span className="text-sm text-brand-dark-green">LMS Compatible</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-brand-orange-pantone rounded-full"></div>
                        <span className="text-sm text-brand-dark-green">Colaborativo</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-brand-brunswick-green rounded-full"></div>
                        <span className="text-sm text-brand-dark-green">Tiempo Real</span>
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