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
        flex-none w-72 sm:w-80 lg:w-96 p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl
        frost-main-card cursor-pointer select-none flex flex-col relative overflow-hidden
        feature-card-enhanced transition-all duration-300 ease-out
        ${isFocused 
          ? 'scale-105' 
          : 'scale-100 hover:scale-102'
        }
      `}
      style={{
        height: CARD_HEIGHT_CSS,
        background: `linear-gradient(135deg, ${card.backgroundColor}, ${card.backgroundColor}dd)`,
        borderColor: card.borderColor,
        borderWidth: '2px',
        borderStyle: 'solid',
        boxShadow: isFocused 
          ? `0 8px 32px ${card.accentColor}20, 0 0 0 1px ${card.accentColor}30`
          : `0 4px 16px ${card.accentColor}10, 0 0 0 1px ${card.accentColor}15`
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
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-3">
          {/* Icon with enhanced styling */}
          <div 
            className={`
              card-icon w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl lg:text-3xl flex-shrink-0
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
                className={`
                  px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase
                  transition-all duration-300 ease-out transform
                  backdrop-blur-sm shadow-sm hover:shadow-md
                  ${isFocused ? 'scale-105 shadow-lg' : 'hover:scale-102'}
                `}
                style={{ 
                  backgroundColor: `rgba(${card.accentColor.match(/\d+/g)?.join(', ')}, 0.12)`,
                  color: card.accentColor,
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
        <div className="mb-4">
          <h3 
            className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight transition-colors duration-200"
            style={{ 
              color: isFocused ? card.accentColor : '#093b2c'
            }}
          >
            {card.title}
          </h3>
        </div>

        {/* Description with improved contrast */}
        {card.description && (
          <p className="text-sm sm:text-base text-brand-dark-green/85 leading-relaxed mb-5 flex-1">
            {card.description}
          </p>
        )}

        {/* Elegant progress indicator with shimmer effect */}
        <div className="mb-5">
          <div 
            className="progress-bar h-1 rounded-full transition-all duration-300"
            style={{
              background: `linear-gradient(to right, ${card.accentColor}, ${card.accentColor}60, ${card.accentColor}20)`,
              transform: isFocused ? 'scaleX(1.1)' : 'scaleX(1)'
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