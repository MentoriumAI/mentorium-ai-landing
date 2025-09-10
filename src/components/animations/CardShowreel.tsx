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
  autoScrollSpeed = 15, // Slower default speed for elegant movement
  pauseOnHover = true, 
  className = "" 
}: CardShowreelProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const [currentSpeed, setCurrentSpeed] = useState(autoScrollSpeed)
  const [targetSpeed, setTargetSpeed] = useState(autoScrollSpeed)
  const [isPreparingToResume, setIsPreparingToResume] = useState(false)
  const speedTransitionRef = useRef<number>(autoScrollSpeed)
  const resumeProgressRef = useRef<number>(0)
  
  const infiniteCards = getInfiniteScrollCards()
  const originalCardsCount = featureCards.length
  
  // Cubic easing function for smooth transitions
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }
  
  // Enhanced speed transition effect with progressive ramp-up
  useEffect(() => {
    if (!isAutoScrolling || isUserInteracting) {
      setTargetSpeed(0)
      setIsPreparingToResume(false)
      resumeProgressRef.current = 0
      return
    }
    
    if (isPreparingToResume) {
      // Progressive ramp-up during resume
      const rampUpSpeed = autoScrollSpeed * (0.25 + 0.75 * easeInOutCubic(resumeProgressRef.current))
      setTargetSpeed(rampUpSpeed)
    } else {
      setTargetSpeed(autoScrollSpeed)
    }
  }, [isAutoScrolling, isUserInteracting, isPreparingToResume, autoScrollSpeed])

  // Enhanced infinite auto-scroll with smooth speed transitions
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let lastTime = 0
    const speedTransitionRate = 0.05 // Slower transition for smoother easing (5% per frame)
    const minSpeedThreshold = 0.05 // Prevent micro-movements
    
    const animate = (currentTime: number) => {
      if (lastTime === 0) lastTime = currentTime
      
      const deltaTime = currentTime - lastTime
      
      // Handle progressive resume ramp-up
      if (isPreparingToResume && resumeProgressRef.current < 1) {
        resumeProgressRef.current = Math.min(1, resumeProgressRef.current + deltaTime / 2000) // 2 second ramp-up
        if (resumeProgressRef.current >= 1) {
          setIsPreparingToResume(false)
        }
      }
      
      // Enhanced smooth speed interpolation with cubic easing
      const speedDifference = targetSpeed - speedTransitionRef.current
      const easingFactor = easeInOutCubic(Math.min(1, Math.abs(speedDifference) / autoScrollSpeed))
      speedTransitionRef.current += speedDifference * speedTransitionRate * (0.5 + 0.5 * easingFactor)
      
      // Apply minimum threshold to prevent jerky micro-movements
      const easedSpeed = Math.abs(speedTransitionRef.current) < minSpeedThreshold ? 0 : speedTransitionRef.current
      setCurrentSpeed(easedSpeed)
      
      // Only scroll if there's meaningful speed
      if (Math.abs(easedSpeed) > 0.1) {
        const scrollDistance = (easedSpeed * deltaTime) / 1000
        scrollContainer.scrollLeft += scrollDistance
        
        // Seamless infinite loop reset
        const cardWidth = CARD_DIMENSIONS.WIDTH.DESKTOP + CARD_DIMENSIONS.GAP
        const totalOriginalWidth = originalCardsCount * cardWidth
        
        if (scrollContainer.scrollLeft >= totalOriginalWidth * 2) {
          scrollContainer.scrollLeft = totalOriginalWidth
        } else if (scrollContainer.scrollLeft <= 0) {
          scrollContainer.scrollLeft = totalOriginalWidth
        }
      }
      
      lastTime = currentTime
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [targetSpeed, originalCardsCount])

  // Enhanced mouse interactions with smooth transitions
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsUserInteracting(true)
      setIsAutoScrolling(false)
    }
  }, [pauseOnHover])

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      // Smooth resume with slight delay
      setTimeout(() => {
        setIsUserInteracting(false)
        setIsAutoScrolling(true)
        setFocusedCardIndex(null)
      }, 200) // Brief pause before resuming
    }
  }, [pauseOnHover])

  // Handle card focus
  const handleCardFocus = useCallback((index: number) => {
    setFocusedCardIndex(index % originalCardsCount)
    setIsUserInteracting(true)
  }, [originalCardsCount])

  // Handle smooth scroll with infinite support and center the clicked card
  const scrollToCard = useCallback((cardIndex: number) => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const cardWidth = CARD_DIMENSIONS.WIDTH.DESKTOP + CARD_DIMENSIONS.GAP
    const currentScroll = scrollContainer.scrollLeft
    const totalOriginalWidth = originalCardsCount * cardWidth
    const containerWidth = scrollContainer.clientWidth
    
    // Calculate the center offset (where we want the card center to be)
    const centerOffset = (containerWidth - CARD_DIMENSIONS.WIDTH.DESKTOP) / 2
    
    // Find the closest instance of the target card and center it
    const currentPosition = currentScroll % totalOriginalWidth
    const targetCardPosition = cardIndex * cardWidth
    
    // Calculate the shortest path to center the target card
    const forwardDistance = (targetCardPosition - currentPosition + totalOriginalWidth) % totalOriginalWidth
    const backwardDistance = (currentPosition - targetCardPosition + totalOriginalWidth) % totalOriginalWidth
    
    let targetScrollLeft: number
    if (forwardDistance <= backwardDistance) {
      targetScrollLeft = currentScroll + forwardDistance - centerOffset
    } else {
      targetScrollLeft = currentScroll - backwardDistance - centerOffset
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

  // Smooth navigation with elegant auto-resume
  const goToPrevious = useCallback(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return
    
    const cardWidth = CARD_DIMENSIONS.WIDTH.DESKTOP + CARD_DIMENSIONS.GAP
    const targetScroll = scrollContainer.scrollLeft - cardWidth
    
    // Smooth scroll with custom timing
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
    
    // Elegant resume with fade-in effect
    setTimeout(() => {
      setIsUserInteracting(false)
      setTimeout(() => {
        setIsAutoScrolling(true)
      }, 100) // Brief pause before smooth resume
    }, 2500)
  }, [focusedCardIndex, originalCardsCount])

  // Smooth navigation with elegant auto-resume
  const goToNext = useCallback(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return
    
    const cardWidth = CARD_DIMENSIONS.WIDTH.DESKTOP + CARD_DIMENSIONS.GAP
    const targetScroll = scrollContainer.scrollLeft + cardWidth
    
    // Smooth scroll with custom timing
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
    
    // Elegant resume with fade-in effect
    setTimeout(() => {
      setIsUserInteracting(false)
      setTimeout(() => {
        setIsAutoScrolling(true)
      }, 100) // Brief pause before smooth resume
    }, 2500)
  }, [focusedCardIndex, originalCardsCount])

  // Enhanced touch interactions with momentum consideration
  const handleTouchStart = useCallback(() => {
    setIsAutoScrolling(false)
    setIsUserInteracting(true)
  }, [])

  const handleTouchEnd = useCallback(() => {
    // Longer delay for touch to allow for momentum scrolling
    setTimeout(() => {
      setIsUserInteracting(false)
      setIsAutoScrolling(true)
    }, 1500) // Reduced from 2000ms for better UX
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