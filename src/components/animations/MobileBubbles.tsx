"use client"

import { cloneElement, ReactElement, SVGProps } from 'react'
import { OrbitItem, ColorConfig } from './types'
import { defaultColorConfigs } from './utils'

interface MobileBubblesProps {
  items: OrbitItem[]
  colorConfigs?: ColorConfig[]
  isClient?: boolean
  className?: string
  delayOffset?: number
}

export const MobileBubbles = ({ 
  items, 
  colorConfigs = defaultColorConfigs, 
  isClient = false, 
  className = "",
  delayOffset = 0
}: MobileBubblesProps) => {
  return (
    <div className={`flex justify-center items-center gap-4 sm:gap-6 relative z-10 ${className}`}>
      {items.map((item, i) => {
        // Use randomized colors only on client, fallback to sequential during SSR
        const cfg = isClient ? colorConfigs[i % colorConfigs.length] : defaultColorConfigs[i % defaultColorConfigs.length]
        const iconClass = cfg.iconClass
        const chipFill = cfg.chipFill
        const chipStroke = cfg.chipStroke
        
        const sized = cloneElement(item.svg as ReactElement<SVGProps<SVGSVGElement>>, {
          className: `w-5 h-5 sm:w-6 sm:h-6 ${iconClass}`
        })
        
        // Staggered animation delays for wave effect
        const delay = (i * 0.5) + delayOffset
        const duration = 3 + (i % 2) // Alternate between 3s and 4s
        
        return (
          <div
            key={`mobile-${delayOffset > 0 ? 'bottom' : 'top'}-${item.key}`}
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
                animationDelay: `${delay + (delayOffset > 0 ? 1.5 : 1)}s`,
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
  )
}

export default MobileBubbles