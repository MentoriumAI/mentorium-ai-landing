"use client"

import { FeatureCard as FeatureCardType } from '@/data/featureCards'
import { CARD_DIMENSIONS, CARD_HEIGHT_CSS } from '@/constants/cardDimensions'

interface FeatureCardProps {
  card: FeatureCardType
  isFocused?: boolean
  onClick?: () => void
}

export const FeatureCard = ({ card, isFocused = false, onClick }: FeatureCardProps) => {
  return (
    <div
      className={`
        flex-none w-80 sm:w-96 p-6 sm:p-8 rounded-2xl sm:rounded-3xl
        frost-main-card cursor-pointer select-none flex flex-col
        transition-all duration-300 ease-out
        ${isFocused 
          ? 'scale-105 shadow-2xl shadow-black/20' 
          : 'scale-100 hover:scale-102 shadow-lg shadow-black/10'
        }
      `}
      style={{
        height: CARD_HEIGHT_CSS,
        backgroundColor: card.backgroundColor,
        borderColor: card.borderColor,
        borderWidth: '1px',
        borderStyle: 'solid'
      }}
      onClick={onClick}
    >
      {/* Header - Fixed at top */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Icon with dynamic background */}
          <div 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0"
            style={{
              backgroundColor: card.accentColor,
              color: 'white',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
            }}
          >
            {card.icon}
          </div>
        </div>
        
        {/* Status indicator */}
        <div 
          className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
          style={{ backgroundColor: card.accentColor }}
        />
      </div>

      {/* Content - Flexible middle section */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Title */}
        <div className="mb-3">
          <h3 className="text-lg sm:text-xl font-semibold text-brand-dark-green leading-tight">
            {card.title}
          </h3>
        </div>

        {/* Description (if provided) */}
        {card.description && (
          <p className="text-sm sm:text-base text-brand-dark-green/70 leading-relaxed mb-4 flex-1">
            {card.description}
          </p>
        )}

        {/* Visual elements inspired by original card */}
        <div className="space-y-2 sm:space-y-3 mb-4">
          <div 
            className="h-2 rounded-full"
            style={{
              background: `linear-gradient(to right, ${card.accentColor}40, ${card.accentColor}20)`
            }}
          />
          <div 
            className="h-2 rounded-full w-4/5"
            style={{
              background: `linear-gradient(to right, ${card.accentColor}30, ${card.accentColor}15)`
            }}
          />
          <div 
            className="h-2 rounded-full w-3/5"
            style={{
              background: `linear-gradient(to right, ${card.accentColor}20, ${card.accentColor}10)`
            }}
          />
        </div>

        {/* Feature indicators - Fixed at bottom */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: card.accentColor }}
            />
            <span className="text-xs sm:text-sm text-brand-dark-green/60">
              Activo
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <div 
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: `${card.accentColor}80` }}
            />
            <div 
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: `${card.accentColor}60` }}
            />
            <div 
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: `${card.accentColor}40` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureCard