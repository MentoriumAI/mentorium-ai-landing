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
  const [translateX, setTranslateX] = useState(0)
  const translateXRef = useRef<number>(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const infiniteCards = getInfiniteScrollCards()
  const originalCardsCount = featureCards.length
  
  // Cubic easing function for smooth transitions
  const easeInOutCubic = useCallback((t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }, [])
  
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
  }, [isAutoScrolling, isUserInteracting, isPreparingToResume, autoScrollSpeed, easeInOutCubic])

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
      
      // Only move if there's meaningful speed with frame skipping protection
      if (Math.abs(easedSpeed) > 0.1) {
        // Cap deltaTime to prevent huge jumps during frame skips
        const cappedDeltaTime = Math.min(deltaTime, 50) // Max 50ms per frame
        const moveDistance = (easedSpeed * cappedDeltaTime) / 1000
        translateXRef.current -= moveDistance // Negative for left movement
        
        // Seamless infinite loop reset
        const cardWidth = CARD_DIMENSIONS.WIDTH.DESKTOP + CARD_DIMENSIONS.GAP
        const totalOriginalWidth = originalCardsCount * cardWidth
        
        if (translateXRef.current <= -totalOriginalWidth * 2) {
          translateXRef.current = -totalOriginalWidth
        } else if (translateXRef.current >= 0) {
          translateXRef.current = -totalOriginalWidth
        }
        
        setTranslateX(translateXRef.current)
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
  }, [targetSpeed, originalCardsCount, isPreparingToResume, autoScrollSpeed])

  // Enhanced mouse interactions with smooth transitions
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsUserInteracting(true)
      setIsAutoScrolling(false)
    }
  }, [pauseOnHover])

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      // Enhanced smooth resume with progressive ramp-up
      setTimeout(() => {
        setIsUserInteracting(false)
        setIsPreparingToResume(true)
        setIsAutoScrolling(true)
        setFocusedCardIndex(null)
        resumeProgressRef.current = 0
      }, 500) // Longer pause before resuming for better UX
    }
  }, [pauseOnHover])

  // Handle card focus
  const handleCardFocus = useCallback((index: number) => {
    setFocusedCardIndex(index % originalCardsCount)
    setIsUserInteracting(true)
  }, [originalCardsCount])

  // Enhanced smooth transform to center the clicked card with animation
  const scrollToCard = useCallback((cardIndex: number) => {
    const cardWidth = CARD_DIMENSIONS.WIDTH.DESKTOP + CARD_DIMENSIONS.GAP
    const totalOriginalWidth = originalCardsCount * cardWidth
    
    // Calculate target position to center the card
    const targetCardPosition = cardIndex * cardWidth
    const containerWidth = window.innerWidth
    const centerOffset = (containerWidth - CARD_DIMENSIONS.WIDTH.DESKTOP) / 2
    
    // Calculate new translateX to center the selected card
    const targetTranslateX = -targetCardPosition + centerOffset - totalOriginalWidth
    
    // Start smooth animation to target position
    setIsAnimating(true)
    setIsUserInteracting(true)
    setIsAutoScrolling(false)
    
    const startTranslateX = translateXRef.current
    const distance = targetTranslateX - startTranslateX
    const duration = Math.min(800, Math.abs(distance) * 2) // Adaptive duration based on distance
    const startTime = performance.now()
    
    const animateToCenter = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Smooth easing function (ease-out-cubic)
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      
      const currentTranslateX = startTranslateX + distance * easedProgress
      translateXRef.current = currentTranslateX
      setTranslateX(currentTranslateX)
      
      if (progress < 1) {
        requestAnimationFrame(animateToCenter)
      } else {
        setIsAnimating(false)
        
        // Progressive resume after animation completes
        setTimeout(() => {
          setIsUserInteracting(false)
          setIsPreparingToResume(true)
          setIsAutoScrolling(true)
          resumeProgressRef.current = 0
        }, 2000)
      }
    }
    
    requestAnimationFrame(animateToCenter)
  }, [originalCardsCount])

  // Enhanced smooth navigation with elegant animations
  const goToPrevious = useCallback(() => {
    const cardWidth = CARD_DIMENSIONS.WIDTH.DESKTOP + CARD_DIMENSIONS.GAP
    const targetTranslateX = translateXRef.current + cardWidth
    
    // Start smooth animation
    setIsAnimating(true)
    setIsUserInteracting(true)
    setIsAutoScrolling(false)
    
    const startTranslateX = translateXRef.current
    const distance = targetTranslateX - startTranslateX
    const duration = 600
    const startTime = performance.now()
    
    const animateNavigation = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Smooth easing (ease-in-out-cubic)
      const easedProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2
      
      const currentTranslateX = startTranslateX + distance * easedProgress
      translateXRef.current = currentTranslateX
      setTranslateX(currentTranslateX)
      
      if (progress < 1) {
        requestAnimationFrame(animateNavigation)
      } else {
        setIsAnimating(false)
        
        // Enhanced elegant resume with progressive ramp-up
        setTimeout(() => {
          setIsUserInteracting(false)
          setTimeout(() => {
            setIsPreparingToResume(true)
            setIsAutoScrolling(true)
            resumeProgressRef.current = 0
          }, 100)
        }, 2000)
      }
    }
    
    // Update focused index for visual feedback
    const newIndex = focusedCardIndex === null ? originalCardsCount - 1 : 
                    focusedCardIndex === 0 ? originalCardsCount - 1 : focusedCardIndex - 1
    setFocusedCardIndex(newIndex)
    
    requestAnimationFrame(animateNavigation)
  }, [focusedCardIndex, originalCardsCount])

  // Enhanced smooth navigation with elegant animations
  const goToNext = useCallback(() => {
    const cardWidth = CARD_DIMENSIONS.WIDTH.DESKTOP + CARD_DIMENSIONS.GAP
    const targetTranslateX = translateXRef.current - cardWidth
    
    // Start smooth animation
    setIsAnimating(true)
    setIsUserInteracting(true)
    setIsAutoScrolling(false)
    
    const startTranslateX = translateXRef.current
    const distance = targetTranslateX - startTranslateX
    const duration = 600
    const startTime = performance.now()
    
    const animateNavigation = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Smooth easing (ease-in-out-cubic)
      const easedProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2
      
      const currentTranslateX = startTranslateX + distance * easedProgress
      translateXRef.current = currentTranslateX
      setTranslateX(currentTranslateX)
      
      if (progress < 1) {
        requestAnimationFrame(animateNavigation)
      } else {
        setIsAnimating(false)
        
        // Enhanced elegant resume with progressive ramp-up
        setTimeout(() => {
          setIsUserInteracting(false)
          setTimeout(() => {
            setIsPreparingToResume(true)
            setIsAutoScrolling(true)
            resumeProgressRef.current = 0
          }, 100)
        }, 2000)
      }
    }
    
    // Update focused index for visual feedback
    const newIndex = focusedCardIndex === null ? 1 : 
                    focusedCardIndex === originalCardsCount - 1 ? 0 : focusedCardIndex + 1
    setFocusedCardIndex(newIndex)
    
    requestAnimationFrame(animateNavigation)
  }, [focusedCardIndex, originalCardsCount])

  // Enhanced touch interactions with momentum consideration
  const handleTouchStart = useCallback(() => {
    setIsAutoScrolling(false)
    setIsUserInteracting(true)
  }, [])

  const handleTouchEnd = useCallback(() => {
    // Enhanced touch resume with progressive ramp-up
    setTimeout(() => {
      setIsUserInteracting(false)
      setIsPreparingToResume(true)
      setIsAutoScrolling(true)
      resumeProgressRef.current = 0
    }, 1500) // Allows for momentum scrolling before progressive resume
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
      
      {/* Infinite scroll container with transform-based movement */}
      <div className="overflow-hidden pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8 py-16 sm:py-20" style={{ minHeight: '420px' }}>
        <div
          ref={scrollRef}
          className={`flex items-center gap-6 card-showreel-container ${isAutoScrolling ? 'auto-scrolling' : ''} ${isAnimating ? 'transition-none' : 'transition-all duration-300'}`}
          style={{
            minHeight: '420px',
            opacity: isPreparingToResume ? 0.95 + 0.05 * resumeProgressRef.current : isAnimating ? 0.98 : 1,
            transform: `translateX(${translateX}px) ${isAnimating ? 'scale(1.01)' : 'scale(1)'}`,
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
                  ${isPreparingToResume ? 'scale-[0.99]' : ''}
                  ${isFocused ? 'scale-105 z-10' : 'hover:scale-102'}
                  ${isAnimating ? 'transition-none' : ''}
                `}
                style={{
                  filter: isFocused ? 'brightness(1.05) drop-shadow(0 8px 25px rgba(0,0,0,0.15))' : 
                         isAnimating ? 'brightness(1.02)' : 'brightness(1)',
                  zIndex: isFocused ? 20 : 1
                }}
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
      </div>

      {/* Left Arrow Button */}
      <button
        onClick={goToPrevious}
        disabled={isAnimating}
        className={`
          absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30
          w-12 h-12 sm:w-14 sm:h-14 rounded-full
          bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl
          border-2 border-brand-dark-green/10 hover:border-brand-dark-green/20
          flex items-center justify-center
          transition-all duration-300 ease-out
          hover:scale-110 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-brand-brandeis-blue focus:ring-offset-2
          group
          ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'}
          ${isAnimating ? 'scale-100' : ''}
        `}
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
        disabled={isAnimating}
        className={`
          absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30
          w-12 h-12 sm:w-14 sm:h-14 rounded-full
          bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl
          border-2 border-brand-dark-green/10 hover:border-brand-dark-green/20
          flex items-center justify-center
          transition-all duration-300 ease-out
          hover:scale-110 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-brand-brandeis-blue focus:ring-offset-2
          group
          ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'}
          ${isAnimating ? 'scale-100' : ''}
        `}
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