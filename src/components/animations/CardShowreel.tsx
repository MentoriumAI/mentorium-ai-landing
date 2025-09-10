"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { FeatureCard } from './FeatureCard'
import { featureCards, getInfiniteScrollCards } from '@/data/featureCards'
import { CARD_DIMENSIONS } from '@/constants/cardDimensions'

interface CardShowreelProps {
  autoScrollSpeed?: number // pixels per second
  pauseOnHover?: boolean
  className?: string
}

export const CardShowreel = ({ 
  autoScrollSpeed = 25, 
  pauseOnHover = true, 
  className = "" 
}: CardShowreelProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  
  const infiniteCards = getInfiniteScrollCards()
  const originalCardsCount = featureCards.length
  
  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling || isUserInteracting) return

    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let lastTime = 0
    
    const animate = (currentTime: number) => {
      if (lastTime === 0) lastTime = currentTime
      
      const deltaTime = currentTime - lastTime
      const scrollDistance = (autoScrollSpeed * deltaTime) / 1000
      
      scrollContainer.scrollLeft += scrollDistance
      
      // Reset to beginning when we've scrolled past the first set of cards
      const maxScroll = scrollContainer.scrollWidth / 2
      if (scrollContainer.scrollLeft >= maxScroll) {
        scrollContainer.scrollLeft = 0
      }
      
      lastTime = currentTime
      animationId = requestAnimationFrame(animate)
    }
    
    animationId = requestAnimationFrame(animate)
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isAutoScrolling, autoScrollSpeed, isUserInteracting])

  // Handle mouse interactions
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsAutoScrolling(false)
    }
  }, [pauseOnHover])

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsAutoScrolling(true)
      setFocusedCardIndex(null)
      setIsUserInteracting(false)
    }
  }, [pauseOnHover])

  // Handle card focus
  const handleCardFocus = useCallback((index: number) => {
    setFocusedCardIndex(index % originalCardsCount)
    setIsUserInteracting(true)
  }, [originalCardsCount])

  // Handle scroll to specific card
  const scrollToCard = useCallback((cardIndex: number) => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const cardWidth = CARD_DIMENSIONS.WIDTH.DESKTOP + CARD_DIMENSIONS.GAP
    const targetScrollLeft = cardIndex * cardWidth
    
    scrollContainer.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    })
    
    setIsUserInteracting(true)
    setIsAutoScrolling(false)
    
    // Resume auto-scroll after a delay
    setTimeout(() => {
      setIsUserInteracting(false)
      setIsAutoScrolling(true)
    }, 3000)
  }, [])

  // Handle touch interactions
  const handleTouchStart = useCallback(() => {
    setIsAutoScrolling(false)
    setIsUserInteracting(true)
  }, [])

  const handleTouchEnd = useCallback(() => {
    // Resume auto-scroll after touch ends with a delay
    setTimeout(() => {
      setIsUserInteracting(false)
      setIsAutoScrolling(true)
    }, 2000)
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* Gradient overlays for seamless infinite scroll effect */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      {/* Scrollable container with padding for full-width layout */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {infiniteCards.map((card, index) => (
          <div
            key={`${card.id}-${Math.floor(index / originalCardsCount)}`}
            style={{ scrollSnapAlign: 'center' }}
            onMouseEnter={() => handleCardFocus(index)}
          >
            <FeatureCard
              card={card}
              isFocused={focusedCardIndex === (index % originalCardsCount)}
              onClick={() => scrollToCard(index)}
            />
          </div>
        ))}
      </div>

      {/* Optional: Navigation dots */}
      <div className="flex justify-center space-x-2 mt-8">
        {featureCards.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              focusedCardIndex === index
                ? 'bg-brand-brandeis-blue scale-125'
                : 'bg-brand-dark-green/30 hover:bg-brand-dark-green/50'
            }`}
            onClick={() => scrollToCard(index)}
            aria-label={`Ir a tarjeta ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default CardShowreel