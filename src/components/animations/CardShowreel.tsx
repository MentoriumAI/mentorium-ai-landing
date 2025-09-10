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
  
  // Enhanced infinite auto-scroll functionality
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
      
      // Seamless infinite loop reset
      const cardWidth = CARD_DIMENSIONS.WIDTH.DESKTOP + CARD_DIMENSIONS.GAP
      const totalOriginalWidth = originalCardsCount * cardWidth
      
      if (scrollContainer.scrollLeft >= totalOriginalWidth) {
        scrollContainer.scrollLeft = scrollContainer.scrollLeft - totalOriginalWidth
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
  }, [isAutoScrolling, autoScrollSpeed, isUserInteracting, originalCardsCount])

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

  // Handle smooth scroll with infinite support
  const scrollToCard = useCallback((cardIndex: number) => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const cardWidth = CARD_DIMENSIONS.WIDTH.DESKTOP + CARD_DIMENSIONS.GAP
    const currentScroll = scrollContainer.scrollLeft
    const totalOriginalWidth = originalCardsCount * cardWidth
    
    // Find the closest instance of the target card
    let targetScrollLeft = cardIndex * cardWidth
    const currentPosition = currentScroll % totalOriginalWidth
    const targetPosition = targetScrollLeft
    
    // Calculate the shortest path to the target
    const forwardDistance = (targetPosition - currentPosition + totalOriginalWidth) % totalOriginalWidth
    const backwardDistance = (currentPosition - targetPosition + totalOriginalWidth) % totalOriginalWidth
    
    if (forwardDistance <= backwardDistance) {
      targetScrollLeft = currentScroll + forwardDistance
    } else {
      targetScrollLeft = currentScroll - backwardDistance
    }
    
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
  }, [originalCardsCount])

  // Smooth navigation with infinite scroll support
  const goToPrevious = useCallback(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return
    
    const cardWidth = CARD_DIMENSIONS.WIDTH.DESKTOP + CARD_DIMENSIONS.GAP
    const targetScroll = scrollContainer.scrollLeft - cardWidth
    
    scrollContainer.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    })
    
    // Update focused index for visual feedback
    const newIndex = focusedCardIndex === null ? originalCardsCount - 1 : 
                    focusedCardIndex === 0 ? originalCardsCount - 1 : focusedCardIndex - 1
    setFocusedCardIndex(newIndex)
    
    setIsUserInteracting(true)
    setIsAutoScrolling(false)
    
    setTimeout(() => {
      setIsUserInteracting(false)
      setIsAutoScrolling(true)
    }, 3000)
  }, [focusedCardIndex, originalCardsCount])

  // Smooth navigation with infinite scroll support
  const goToNext = useCallback(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return
    
    const cardWidth = CARD_DIMENSIONS.WIDTH.DESKTOP + CARD_DIMENSIONS.GAP
    const targetScroll = scrollContainer.scrollLeft + cardWidth
    
    scrollContainer.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    })
    
    // Update focused index for visual feedback
    const newIndex = focusedCardIndex === null ? 1 : 
                    focusedCardIndex === originalCardsCount - 1 ? 0 : focusedCardIndex + 1
    setFocusedCardIndex(newIndex)
    
    setIsUserInteracting(true)
    setIsAutoScrolling(false)
    
    setTimeout(() => {
      setIsUserInteracting(false)
      setIsAutoScrolling(true)
    }, 3000)
  }, [focusedCardIndex, originalCardsCount])

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

  // Handle scroll events for infinite loop reset
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      const cardWidth = CARD_DIMENSIONS.WIDTH.DESKTOP + CARD_DIMENSIONS.GAP
      const totalOriginalWidth = originalCardsCount * cardWidth
      const scrollLeft = scrollContainer.scrollLeft
      
      // Reset position when reaching the end of second set
      if (scrollLeft >= totalOriginalWidth * 2) {
        scrollContainer.scrollLeft = totalOriginalWidth
      }
      // Reset position when scrolling backwards past the first set
      else if (scrollLeft <= 0) {
        scrollContainer.scrollLeft = totalOriginalWidth
      }
    }

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [originalCardsCount])

  // Initialize scroll position to middle set on mount
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return
    
    const cardWidth = CARD_DIMENSIONS.WIDTH.DESKTOP + CARD_DIMENSIONS.GAP
    const totalOriginalWidth = originalCardsCount * cardWidth
    
    // Start in the middle set for seamless infinite scroll
    scrollContainer.scrollLeft = totalOriginalWidth
  }, [originalCardsCount])

  return (
    <div className={`relative ${className}`} style={{ minHeight: '420px' }}>
      {/* Gradient overlays for seamless infinite scroll effect - matching hero gradient-subtle */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 z-10 pointer-events-none"
           style={{
             background: 'linear-gradient(to right, #f7f4ef 0%, #f5f7f4 50%, transparent 100%)'
           }} />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 z-10 pointer-events-none"
           style={{
             background: 'linear-gradient(to left, #f0fdf6 0%, #f5f7f4 50%, transparent 100%)'
           }} />
      
      {/* Infinite scroll container */}
      <div
        ref={scrollRef}
        className="flex items-center gap-6 overflow-x-auto scrollbar-hide pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8 py-16 sm:py-20"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          minHeight: '420px'
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
                onMouseEnter={() => handleCardFocus(globalIndex)}
              >
                <FeatureCard
                  card={card}
                  isFocused={isFocused}
                  onClick={() => scrollToCard(cardIndex)}
                />
              </div>
            )
          })
        )}
      </div>

      {/* Left Arrow Button */}
      <button
        onClick={goToPrevious}
        className="
          absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30
          w-12 h-12 sm:w-14 sm:h-14 rounded-full
          bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl
          border-2 border-brand-dark-green/10 hover:border-brand-dark-green/20
          flex items-center justify-center
          transition-all duration-300 ease-out
          hover:scale-110 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-brand-brandeis-blue focus:ring-offset-2
          group
        "
        aria-label="Ver tarjeta anterior"
      >
        <svg 
          className="w-5 h-5 sm:w-6 sm:h-6 text-brand-dark-green group-hover:text-brand-brandeis-blue transition-colors" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow Button */}
      <button
        onClick={goToNext}
        className="
          absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30
          w-12 h-12 sm:w-14 sm:h-14 rounded-full
          bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl
          border-2 border-brand-dark-green/10 hover:border-brand-dark-green/20
          flex items-center justify-center
          transition-all duration-300 ease-out
          hover:scale-110 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-brand-brandeis-blue focus:ring-offset-2
          group
        "
        aria-label="Ver siguiente tarjeta"
      >
        <svg 
          className="w-5 h-5 sm:w-6 sm:h-6 text-brand-dark-green group-hover:text-brand-brandeis-blue transition-colors" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default CardShowreel