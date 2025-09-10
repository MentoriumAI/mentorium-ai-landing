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
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const [targetSpeed, setTargetSpeed] = useState(autoScrollSpeed)
  const [isPreparingToResume, setIsPreparingToResume] = useState(false)
  const speedTransitionRef = useRef<number>(autoScrollSpeed)
  const resumeProgressRef = useRef<number>(0)
  const [translateX, setTranslateX] = useState(0)
  const translateXRef = useRef<number>(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isCardCentered, setIsCardCentered] = useState(false)
  const [centeredCardIndex, setCenteredCardIndex] = useState<number | null>(null)
  
  const originalCardsCount = featureCards.length
  
  // Cubic easing function for smooth transitions
  const easeInOutCubic = useCallback((t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }, [])
  
  // Enhanced speed transition effect with three-phase resume
  useEffect(() => {
    if (!isAutoScrolling || isUserInteracting || isCardCentered) {
      setTargetSpeed(0)
      setIsPreparingToResume(false)
      resumeProgressRef.current = 0
      return
    }
    
    if (isPreparingToResume) {
      // Three-phase resume: very slow start → gradual increase → full speed
      const progress = resumeProgressRef.current
      let rampUpSpeed: number
      
      if (progress < 0.3) {
        // Phase 1: Very slow start (5% of normal speed)
        rampUpSpeed = autoScrollSpeed * 0.05
      } else if (progress < 0.7) {
        // Phase 2: Gradual acceleration (5% to 50% speed)
        const phaseProgress = (progress - 0.3) / 0.4
        rampUpSpeed = autoScrollSpeed * (0.05 + 0.45 * easeInOutCubic(phaseProgress))
      } else {
        // Phase 3: Final acceleration to full speed
        const phaseProgress = (progress - 0.7) / 0.3
        rampUpSpeed = autoScrollSpeed * (0.5 + 0.5 * easeInOutCubic(phaseProgress))
      }
      
      setTargetSpeed(rampUpSpeed)
    } else {
      setTargetSpeed(autoScrollSpeed)
    }
  }, [isAutoScrolling, isUserInteracting, isPreparingToResume, isCardCentered, autoScrollSpeed, easeInOutCubic])

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
      
      // Handle progressive resume ramp-up with extended duration
      if (isPreparingToResume && resumeProgressRef.current < 1) {
        resumeProgressRef.current = Math.min(1, resumeProgressRef.current + deltaTime / 4000) // 4 second ramp-up
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
  }, [targetSpeed, originalCardsCount, isPreparingToResume, autoScrollSpeed, easeInOutCubic])

  // Enhanced mouse interactions with smooth transitions
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover && !isCardCentered) {
      setIsUserInteracting(true)
      setIsAutoScrolling(false)
    }
  }, [pauseOnHover, isCardCentered])

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover && !isCardCentered) {
      // Enhanced smooth resume with progressive ramp-up
      setTimeout(() => {
        setIsUserInteracting(false)
        setIsPreparingToResume(true)
        setIsAutoScrolling(true)
        setFocusedCardIndex(null)
        resumeProgressRef.current = 0
      }, 500) // Longer pause before resuming for better UX
    }
  }, [pauseOnHover, isCardCentered])

  // Handle card focus
  const handleCardFocus = useCallback((index: number) => {
    setFocusedCardIndex(index % originalCardsCount)
    setIsUserInteracting(true)
  }, [originalCardsCount])

  // Enhanced smooth transform with directional animation and persistent focus
  const scrollToCard = useCallback((cardIndex: number) => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return
    
    const cardWidth = CARD_DIMENSIONS.WIDTH.DESKTOP + CARD_DIMENSIONS.GAP
    const totalOriginalWidth = originalCardsCount * cardWidth
    
    // Get the actual viewport width (container's parent with overflow hidden)
    const viewportWidth = scrollContainer.parentElement?.offsetWidth || window.innerWidth
    
    // Calculate current card position in viewport
    const currentCardPosition = totalOriginalWidth + (cardIndex * cardWidth)
    const currentCardViewportPosition = currentCardPosition + translateXRef.current
    const viewportCenter = viewportWidth / 2
    
    // Detect if card is on left or right side of center
    const isCardOnLeft = currentCardViewportPosition < viewportCenter
    
    // Calculate target position to center the card
    const targetCardPosition = cardIndex * cardWidth
    const centerOffset = (viewportWidth - CARD_DIMENSIONS.WIDTH.DESKTOP) / 2
    const cardActualPosition = totalOriginalWidth + targetCardPosition
    const targetTranslateX = -cardActualPosition + centerOffset
    
    // Set persistent focus state
    setFocusedCardIndex(cardIndex)
    setCenteredCardIndex(cardIndex)
    setIsAnimating(true)
    setIsUserInteracting(true)
    setIsAutoScrolling(false)
    
    const startTranslateX = translateXRef.current
    const distance = targetTranslateX - startTranslateX
    const duration = Math.min(1000, Math.max(600, Math.abs(distance) * 1.5)) // Adjusted duration
    const startTime = performance.now()
    
    const animateToCenter = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Directional easing based on card position
      let easedProgress: number
      if (isCardOnLeft) {
        // Swipe right: ease-in-out with slight bias toward end
        easedProgress = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2
      } else {
        // Swipe left: ease-in-out with slight bias toward start
        easedProgress = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2
      }
      
      const currentTranslateX = startTranslateX + distance * easedProgress
      translateXRef.current = currentTranslateX
      setTranslateX(currentTranslateX)
      
      if (progress < 1) {
        requestAnimationFrame(animateToCenter)
      } else {
        setIsAnimating(false)
        setIsCardCentered(true)
        
        // Hold in center for 3.5 seconds with enhanced focus
        setTimeout(() => {
          setIsCardCentered(false)
          
          // Three-phase resume: hold → slow start → full speed
          setTimeout(() => {
            setIsUserInteracting(false)
            setIsPreparingToResume(true)
            setIsAutoScrolling(true)
            resumeProgressRef.current = 0
            
            // Clear focus after resume starts
            setTimeout(() => {
              setFocusedCardIndex(null)
              setCenteredCardIndex(null)
            }, 1000)
          }, 500) // Brief pause before starting resume
        }, 3500) // Hold period
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
    const duration = 400 // Faster response for arrow buttons
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
    const duration = 400 // Faster response for arrow buttons
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
                  ${isFocused && isCardCentered && centeredCardIndex === cardIndex ? 'scale-110 z-20' : 
                    isFocused ? 'scale-105 z-10' : 'hover:scale-102'}
                  ${isAnimating ? 'transition-none' : ''}
                  ${isCardCentered && centeredCardIndex === cardIndex ? 'animate-pulse' : ''}
                `}
                style={{
                  filter: isFocused && isCardCentered && centeredCardIndex === cardIndex 
                    ? 'brightness(1.08) drop-shadow(0 12px 35px rgba(0,0,0,0.2)) saturate(1.1)' :
                    isFocused ? 'brightness(1.05) drop-shadow(0 8px 25px rgba(0,0,0,0.15))' : 
                    isAnimating ? 'brightness(1.02)' : 'brightness(1)',
                  zIndex: isFocused && isCardCentered && centeredCardIndex === cardIndex ? 30 : 
                         isFocused ? 20 : 1,
                  transform: isCardCentered && centeredCardIndex === cardIndex 
                    ? 'translateY(-2px)' : 'translateY(0px)'
                }}
                onMouseEnter={() => !isCardCentered && handleCardFocus(globalIndex)}
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