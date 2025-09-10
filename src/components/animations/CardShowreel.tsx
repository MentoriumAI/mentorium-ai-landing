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
  autoScrollSpeed = 30,
  pauseOnHover = true, 
  className = "" 
}: CardShowreelProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [translateX, setTranslateX] = useState(0)
  const lastTimeRef = useRef<number>(0)
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const isDraggingRef = useRef(false)
  
  const originalCardsCount = featureCards.length
  const cardWidth = CARD_DIMENSIONS.WIDTH.DESKTOP + CARD_DIMENSIONS.GAP
  const totalWidth = originalCardsCount * cardWidth

  // Simple infinite auto-scroll animation
  useEffect(() => {
    if (!isPlaying) return

    const animate = (currentTime: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime
      }
      
      const deltaTime = currentTime - lastTimeRef.current
      const moveDistance = (autoScrollSpeed * deltaTime) / 1000
      
      setTranslateX(prev => {
        let newX = prev - moveDistance
        
        // Reset position for infinite scroll
        if (newX <= -totalWidth) {
          newX = 0
        }
        
        return newX
      })
      
      lastTimeRef.current = currentTime
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, autoScrollSpeed, totalWidth])

  // Pause animation on interaction
  const pauseAnimation = useCallback(() => {
    if (!pauseOnHover) return
    
    setIsPlaying(false)
    lastTimeRef.current = 0
    
    // Clear any existing timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current)
    }
  }, [pauseOnHover])

  // Resume animation after delay
  const resumeAnimation = useCallback(() => {
    if (!pauseOnHover) return
    
    // Clear any existing timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current)
    }
    
    // Resume after 2 seconds
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPlaying(true)
      lastTimeRef.current = 0
    }, 2000)
  }, [pauseOnHover])

  // Mouse interactions
  const handleMouseEnter = useCallback(() => {
    pauseAnimation()
  }, [pauseAnimation])

  const handleMouseLeave = useCallback(() => {
    resumeAnimation()
  }, [resumeAnimation])

  // Touch interactions
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    pauseAnimation()
    const touch = e.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
    isDraggingRef.current = false
  }, [pauseAnimation])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return

    const touch = e.touches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y

    // If horizontal movement is greater than vertical, handle as swipe
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      e.preventDefault() // Prevent vertical scroll
      isDraggingRef.current = true
      
      setTranslateX(prev => {
        let newX = prev + deltaX * 0.5 // Damping factor for smooth movement
        
        // Keep within bounds for infinite scroll
        if (newX <= -totalWidth) {
          newX = 0
        } else if (newX > 0) {
          newX = -totalWidth + cardWidth
        }
        
        return newX
      })
      
      // Update touch start for next delta calculation
      touchStartRef.current = { x: touch.clientX, y: touch.clientY }
    }
  }, [totalWidth, cardWidth])

  const handleTouchEnd = useCallback(() => {
    touchStartRef.current = null
    isDraggingRef.current = false
    resumeAnimation()
  }, [resumeAnimation])

  // Wheel/scroll interactions
  const handleWheel = useCallback((e: React.WheelEvent) => {
    // Prevent vertical scroll when scrolling horizontally
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault()
    }
    
    // Handle horizontal scrolling
    if (e.deltaX !== 0) {
      pauseAnimation()
      setTranslateX(prev => {
        let newX = prev - e.deltaX * 2 // Multiply for smoother scrolling
        
        // Keep within bounds for infinite scroll
        if (newX <= -totalWidth) {
          newX = 0
        } else if (newX > 0) {
          newX = -totalWidth + cardWidth
        }
        
        return newX
      })
      resumeAnimation()
    }
  }, [pauseAnimation, resumeAnimation, totalWidth, cardWidth])

  // Navigation buttons
  const goToPrevious = useCallback(() => {
    pauseAnimation()
    setTranslateX(prev => {
      let newX = prev + cardWidth
      if (newX > 0) {
        newX = -totalWidth + cardWidth
      }
      return newX
    })
    resumeAnimation()
  }, [pauseAnimation, resumeAnimation, cardWidth, totalWidth])

  const goToNext = useCallback(() => {
    pauseAnimation()
    setTranslateX(prev => {
      let newX = prev - cardWidth
      if (newX <= -totalWidth) {
        newX = 0
      }
      return newX
    })
    resumeAnimation()
  }, [pauseAnimation, resumeAnimation, cardWidth, totalWidth])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className={`relative ${className}`} style={{ minHeight: '420px' }}>
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 z-10 pointer-events-none"
           style={{
             background: 'linear-gradient(to right, #f7f4ef 0%, #f5f7f4 50%, transparent 100%)'
           }} />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 z-10 pointer-events-none"
           style={{
             background: 'linear-gradient(to left, #f0fdf6 0%, #f5f7f4 50%, transparent 100%)'
           }} />
      
      {/* Cards container */}
      <div className="overflow-hidden pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8 py-16 sm:py-20" style={{ minHeight: '420px' }}>
        <div
          ref={scrollRef}
          className="flex items-center gap-6"
          style={{
            minHeight: '420px',
            transform: `translateX(${translateX}px)`,
            transition: isPlaying ? 'none' : 'transform 0.3s ease-out',
            willChange: 'transform'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          {/* Double set of cards for infinite scroll */}
          {[...Array(2)].map((_, setIndex) => 
            featureCards.map((card, cardIndex) => (
              <div
                key={`${card.id}-set-${setIndex}`}
                className="transition-transform duration-200 hover:scale-105"
              >
                <FeatureCard card={card} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Navigation buttons - Hidden on mobile */}
      <button
        onClick={goToPrevious}
        className={`
          hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30
          w-12 h-12 sm:w-14 sm:h-14 rounded-full
          bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl
          border-2 border-brand-dark-green/10 hover:border-brand-dark-green/20
          items-center justify-center
          transition-all duration-300 ease-out
          hover:scale-110 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-brand-brandeis-blue focus:ring-offset-2
          group hover:bg-white
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

      <button
        onClick={goToNext}
        className={`
          hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30
          w-12 h-12 sm:w-14 sm:h-14 rounded-full
          bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl
          border-2 border-brand-dark-green/10 hover:border-brand-dark-green/20
          items-center justify-center
          transition-all duration-300 ease-out
          hover:scale-110 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-brand-brandeis-blue focus:ring-offset-2
          group hover:bg-white
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