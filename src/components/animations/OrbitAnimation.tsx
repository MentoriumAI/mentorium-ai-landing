"use client"

import { cloneElement, ReactElement, SVGProps } from 'react'
import { OrbitItem, OrbitConfig, ColorConfig } from './types'
import { rand01, round, defaultColorConfigs } from './utils'

interface OrbitAnimationProps {
  items: OrbitItem[]
  config?: Partial<OrbitConfig>
  colorConfigs?: ColorConfig[]
  className?: string
}

const defaultOrbitConfig: OrbitConfig = {
  centerX: 50,
  centerY: 50,
  radiusX: 53,
  radiusY: 30,
  jitterMin: 0.1,
  jitterMax: 0.2,
  angleJitterMinDeg: -8,
  angleJitterMaxDeg: 8
}

export const OrbitAnimation = ({ 
  items, 
  config = {}, 
  colorConfigs = defaultColorConfigs,
  className = ""
}: OrbitAnimationProps) => {
  const orbitConfig = { ...defaultOrbitConfig, ...config }
  const { centerX, centerY, radiusX, radiusY, jitterMin, jitterMax, angleJitterMinDeg, angleJitterMaxDeg } = orbitConfig
  const n = items.length

  const orbitElements = items.map((item, i) => {
    // Enhanced angular distribution: start from top, distribute evenly with small offset
    const baseAngle = (-Math.PI / 2) + (2 * Math.PI * i) / n
    // Add a small rotation offset to avoid symmetrical clustering
    const offsetAngle = baseAngle + (Math.PI / (n * 2))
    // Angular jitter within reduced range for more even spacing
    const angleJitterDeg = angleJitterMinDeg + (angleJitterMaxDeg - angleJitterMinDeg) * rand01(i + 101)
    const thetaJ = offsetAngle + (angleJitterDeg * Math.PI / 180)
    // Radial jitter within configurable range [jitterMin, jitterMax]
    const jitter = jitterMin + (jitterMax - jitterMin) * rand01(i)
    const rScale = 1 + jitter
    const x = centerX + (radiusX * rScale) * Math.cos(thetaJ)
    const y = centerY - (radiusY * rScale) * Math.sin(thetaJ)
    
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
    const bigScale = round(1.6 + 0.3 * rand01(i + 606), 3) // 1.6 - 1.9
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
    <svg 
      className={`absolute inset-0 w-full h-full z-20 hero-orbit overflow-visible ${className}`} 
      viewBox="0 0 100 100" 
      preserveAspectRatio="xMidYMid meet" 
      aria-hidden="true"
    >
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
      {/* Icons */}
      {orbitElements}
    </svg>
  )
}

export default OrbitAnimation