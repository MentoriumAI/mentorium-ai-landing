"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { FeatureCard } from './FeatureCard'
import { featureCards } from '@/data/featureCards'
import { CARD_DIMENSIONS } from '@/constants/cardDimensions'

interface CardShowreelProps {
  autoScrollSpeed?: number // pixels per second
  pauseOnHover?: boolean
  className?: string
}

export const CardShowreel = ({ 
  autoScrollSpeed = 15, // Slower default speed for elegant movement
  pauseOnHover = true, 
  className = "" 
}: CardShowreelProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null)
  const [translateX, setTranslateX] = useState(0)
  const translateXRef = useRef<number>(0)
  
  const originalCardsCount = featureCards.length
  
  // Cubic easing function for smooth transitions
  const easeInOutCubic = useCallback((t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }, [])
  

  // Ultra-simple smooth auto-scroll
  useEffect(() => {
    if (isPaused) return
    
    const animate = () => {
      // Very simple movement - 1 pixel per frame at 60fps = 60px/second
      const moveDistance = 1
      translateXRef.current -= moveDistance
      
      // Seamless infinite loop reset
      const cardWidth = CARD_DIMENSIONS.WIDTH.DESKTOP + CARD_DIMENSIONS.GAP
      const totalOriginalWidth = originalCardsCount * cardWidth
      
      if (translateXRef.current <= -totalOriginalWidth * 2) {
        translateXRef.current = -totalOriginalWidth
      } else if (translateXRef.current >= 0) {
        translateXRef.current = -totalOriginalWidth
      }
      
      setTranslateX(translateXRef.current)
      
      if (!isPaused) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }
    
    animationRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPaused, originalCardsCount])

  // Simple mouse interactions
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(true)
    }
  }, [pauseOnHover])

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      // Immediate restart - no delay
      setIsPaused(false)
      setFocusedCardIndex(null)
    }
  }, [pauseOnHover])

  // Handle card focus (visual only, no movement)
  const handleCardClick = useCallback((index: number) => {
    setFocusedCardIndex(index % originalCardsCount)
    // Clear focus after 2 seconds
    setTimeout(() => {
      setFocusedCardIndex(null)
    }, 2000)
  }, [originalCardsCount])



  // Simple touch interactions
  const handleTouchStart = useCallback(() => {
    setIsPaused(true)
  }, [])

  const handleTouchEnd = useCallback(() => {
    // Immediate restart on touch end
    setIsPaused(false)
  }, [])


  // Initialize transform position to middle set on mount
  useEffect(() => {
    const cardWidth = CARD_DIMENSIONS.WIDTH.DESKTOP + CARD_DIMENSIONS.GAP
    const totalOriginalWidth = originalCardsCount * cardWidth
    
    // Start in the middle set for seamless infinite scroll
    translateXRef.current = -totalOriginalWidth
    setTranslateX(-totalOriginalWidth)
  }, [originalCardsCount])


  return (
    <div className={`relative ${className}`} style={{ minHeight: '280px' }}>
      {/* Gradient overlays for seamless infinite scroll effect - matching hero gradient-subtle */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 z-10 pointer-events-none"
           style={{
             background: 'linear-gradient(to right, #f7f4ef 0%, #f5f7f4 50%, transparent 100%)'
           }} />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 z-10 pointer-events-none"
           style={{
             background: 'linear-gradient(to left, #f0fdf6 0%, #f5f7f4 50%, transparent 100%)'
           }} />
      
      {/* Infinite scroll container with transform-based movement */}
      <div className="overflow-hidden pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8 py-8 sm:py-12" style={{ minHeight: '280px' }}>
        <div
          ref={scrollRef}
          className={`flex items-center gap-6 card-showreel-container ${!isPaused ? 'auto-scrolling' : ''} transition-all duration-300`}
          style={{
            minHeight: '280px',
            transform: `translateX(${translateX}px)`,
            willChange: 'transform'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
        {/* Triple set of cards for seamless infinite scroll */}
        {[...Array(3)].map((_, setIndex) => 
          featureCards.map((card, cardIndex) => {
            const globalIndex = setIndex * originalCardsCount + cardIndex
            const isFocused = focusedCardIndex === cardIndex
            
            return (
              <div
                key={`${card.id}-set-${setIndex}`}
                className={`
                  transition-all duration-300 ease-out cursor-pointer
                  ${isFocused ? 'scale-105 z-10' : 'hover:scale-102'}
                `}
                style={{
                  filter: isFocused 
                    ? 'brightness(1.05) drop-shadow(0 8px 25px rgba(0,0,0,0.15))' 
                    : 'brightness(1)',
                  zIndex: isFocused ? 20 : 1
                }}
                onMouseEnter={() => setFocusedCardIndex(cardIndex)}
              >
                <FeatureCard
                  card={card}
                  isFocused={isFocused}
                  onClick={() => handleCardClick(cardIndex)}
                />
              </div>
            )
          })
        )}
        </div>
      </div>


    </div>
  )
}

export default CardShowreel