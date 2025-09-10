"use client"

import { FeatureCard as FeatureCardType } from '@/data/featureCards'
import { CARD_HEIGHT_CSS } from '@/constants/cardDimensions'

interface FeatureCardProps {
  card: FeatureCardType
  isFocused?: boolean
  onClick?: () => void
}

export const FeatureCard = ({ card, isFocused = false, onClick }: FeatureCardProps) => {
  return (
    <div
      className={`
        flex-none w-72 sm:w-80 lg:w-96 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl lg:rounded-3xl
        frost-main-card cursor-pointer select-none flex flex-col relative overflow-hidden
        feature-card-enhanced
      `}
      style={{
        height: CARD_HEIGHT_CSS,
        background: `linear-gradient(135deg, ${card.backgroundColor}cc, ${card.accentColor}15, ${card.accentColor}25)`,
        borderColor: card.borderColor,
        borderWidth: '2px',
        borderStyle: 'solid',
        boxShadow: `0 4px 16px ${card.accentColor}10, 0 0 0 1px ${card.accentColor}15`
      }}
      onClick={onClick}
    >
      {/* Color accent strip */}
      <div 
        className="absolute top-0 left-0 w-full h-1"
        style={{ 
          background: `linear-gradient(90deg, ${card.accentColor}, ${card.accentColor}80, transparent)` 
        }}
      />
      {/* Header - Fixed at top */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Icon with enhanced styling */}
          <div 
            className={`
              card-icon w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-lg sm:text-xl lg:text-2xl flex-shrink-0
              transition-all duration-200 
              ${isFocused ? 'scale-110 rotate-3' : 'hover:scale-105'}
            `}
            style={{
              backgroundColor: card.accentColor,
              color: 'white',
              boxShadow: `0 4px 12px ${card.accentColor}40, inset 0 1px 0 rgba(255,255,255,0.2)`
            }}
          >
            {card.icon}
          </div>
        </div>
        
        {/* Chip badges */}
        {card.chips && card.chips.length > 0 && (
          <div className="flex flex-wrap gap-1.5 justify-end">
            {card.chips.map((chip, index) => (
              <div 
                key={index}
                className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase backdrop-blur-sm shadow-sm"
                style={{ 
                  backgroundColor: `rgba(${card.accentColor.match(/\d+/g)?.join(', ')}, 0.12)`,
                  color: card.colorScheme === 'yellow' ? 'rgb(180, 120, 0)' : card.accentColor,
                  border: `1px solid rgba(${card.accentColor.match(/\d+/g)?.join(', ')}, 0.2)`,
                  boxShadow: `0 1px 4px rgba(${card.accentColor.match(/\d+/g)?.join(', ')}, 0.1), inset 0 1px 0 rgba(255,255,255,0.7)`,
                  textShadow: '0 0.5px 1px rgba(255,255,255,0.9)'
                }}
              >
                <span className="relative z-10">{chip}</span>
                {/* Subtle gradient overlay for pill effect */}
                <div 
                  className="absolute inset-0 rounded-full opacity-25"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.05), transparent)`
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content - Flexible middle section */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Title with color accent */}
        <div className="mb-3">
          <h3 
            className="text-base sm:text-lg lg:text-xl font-bold leading-tight transition-colors duration-200"
            style={{ 
              color: isFocused ? card.accentColor : '#093b2c'
            }}
          >
            {card.title}
          </h3>
        </div>

        {/* Description with improved contrast */}
        {card.description && (
          <p className="text-xs sm:text-sm text-brand-dark-green/85 leading-relaxed mb-4 flex-1">
            {card.description}
          </p>
        )}

        {/* Elegant progress indicator with shimmer effect */}
        <div className="mb-3">
          <div 
            className="progress-bar h-1 rounded-full"
            style={{
              background: `linear-gradient(to right, ${card.accentColor}, ${card.accentColor}60, ${card.accentColor}20)`
            }}
          />
        </div>

        {/* Bottom decorative elements */}
        <div className="flex justify-end pt-2">
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${card.accentColor}90` }} />
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${card.accentColor}70` }} />
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${card.accentColor}50` }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureCard