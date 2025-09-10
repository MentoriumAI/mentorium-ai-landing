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
  const [isPaused, setIsPaused] = useState(false)
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null)
  const [translateX, setTranslateX] = useState(0)
  const translateXRef = useRef<number>(0)
  
  // Physics state
  const [isDragging, setIsDragging] = useState(false)
  const [hasMomentum, setHasMomentum] = useState(false)
  const velocityRef = useRef<number>(0)
  const lastPositionRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const touchStartRef = useRef<{ x: number; time: number } | null>(null)
  const mouseStartRef = useRef<{ x: number; time: number } | null>(null)
  
  const originalCardsCount = featureCards.length
  const momentumAnimationRef = useRef<number | null>(null)
  
  // Physics calculations
  const applyPhysicsMovement = useCallback((deltaX: number) => {
    translateXRef.current += deltaX
    
    // Handle infinite loop boundaries
    const cardWidth = CARD_DIMENSIONS.WIDTH.DESKTOP + CARD_DIMENSIONS.GAP
    const totalOriginalWidth = originalCardsCount * cardWidth
    
    if (translateXRef.current <= -totalOriginalWidth * 2) {
      translateXRef.current = -totalOriginalWidth
    } else if (translateXRef.current >= 0) {
      translateXRef.current = -totalOriginalWidth
    }
    
    setTranslateX(translateXRef.current)
  }, [originalCardsCount])
  
  const startMomentumAnimation = useCallback((initialVelocity: number) => {
    setHasMomentum(true)
    velocityRef.current = initialVelocity
    
    const animateMomentum = () => {
      if (Math.abs(velocityRef.current) > 0.1) {
        applyPhysicsMovement(velocityRef.current)
        velocityRef.current *= 0.95 // Deceleration factor
        momentumAnimationRef.current = requestAnimationFrame(animateMomentum)
      } else {
        setHasMomentum(false)
        velocityRef.current = 0
      }
    }
    
    momentumAnimationRef.current = requestAnimationFrame(animateMomentum)
  }, [applyPhysicsMovement])
  

  // Auto-scroll that respects physics interactions
  useEffect(() => {
    if (isPaused || isDragging || hasMomentum) return
    
    const animate = () => {
      // Simple movement - 1 pixel per frame at 60fps = 60px/second
      applyPhysicsMovement(-1)
      
      if (!isPaused && !isDragging && !hasMomentum) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }
    
    animationRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPaused, isDragging, hasMomentum, applyPhysicsMovement])

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



  // Physics-based touch interactions
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsPaused(true)
    setIsDragging(true)
    
    // Stop any existing momentum
    if (momentumAnimationRef.current) {
      cancelAnimationFrame(momentumAnimationRef.current)
      setHasMomentum(false)
    }
    
    const touch = e.touches[0]
    touchStartRef.current = { x: touch.clientX, time: Date.now() }
    lastPositionRef.current = touch.clientX
    lastTimeRef.current = Date.now()
  }, [])
  
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !touchStartRef.current) return
    
    e.preventDefault() // Prevent page scroll
    const touch = e.touches[0]
    const currentTime = Date.now()
    const deltaX = touch.clientX - lastPositionRef.current
    const deltaTime = currentTime - lastTimeRef.current
    
    // Apply movement
    applyPhysicsMovement(deltaX)
    
    // Calculate velocity for momentum
    if (deltaTime > 0) {
      velocityRef.current = deltaX / deltaTime * 16 // Scale for 60fps
    }
    
    lastPositionRef.current = touch.clientX
    lastTimeRef.current = currentTime
  }, [isDragging, applyPhysicsMovement])

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return
    
    setIsDragging(false)
    
    // Start momentum animation if velocity is significant
    if (Math.abs(velocityRef.current) > 1) {
      startMomentumAnimation(velocityRef.current)
    } else {
      setIsPaused(false)
    }
    
    touchStartRef.current = null
  }, [isDragging, startMomentumAnimation])
  
  // Mouse drag support for desktop
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Only handle middle mouse button or left button with Shift
    if (!(e.button === 1 || (e.button === 0 && e.shiftKey))) return
    
    e.preventDefault()
    setIsPaused(true)
    setIsDragging(true)
    
    // Stop any existing momentum
    if (momentumAnimationRef.current) {
      cancelAnimationFrame(momentumAnimationRef.current)
      setHasMomentum(false)
    }
    
    mouseStartRef.current = { x: e.clientX, time: Date.now() }
    lastPositionRef.current = e.clientX
    lastTimeRef.current = Date.now()
  }, [])
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !mouseStartRef.current) return
    
    e.preventDefault()
    const currentTime = Date.now()
    const deltaX = e.clientX - lastPositionRef.current
    const deltaTime = currentTime - lastTimeRef.current
    
    // Apply movement
    applyPhysicsMovement(deltaX)
    
    // Calculate velocity for momentum
    if (deltaTime > 0) {
      velocityRef.current = deltaX / deltaTime * 16 // Scale for 60fps
    }
    
    lastPositionRef.current = e.clientX
    lastTimeRef.current = currentTime
  }, [isDragging, applyPhysicsMovement])
  
  const handleMouseUp = useCallback(() => {
    if (!isDragging) return
    
    setIsDragging(false)
    
    // Start momentum animation if velocity is significant
    if (Math.abs(velocityRef.current) > 1) {
      startMomentumAnimation(velocityRef.current)
    } else {
      setIsPaused(false)
    }
    
    mouseStartRef.current = null
  }, [isDragging, startMomentumAnimation])

  // Scroll wheel support (both regular and with Shift modifier)
  const handleWheel = useCallback((e: React.WheelEvent) => {
    // Handle horizontal scroll directly or vertical with Shift
    const shouldHandle = e.deltaX !== 0 || e.shiftKey
    if (!shouldHandle) return
    
    e.preventDefault() // Prevent page scroll
    
    // Stop any existing momentum or auto-scroll
    if (momentumAnimationRef.current) {
      cancelAnimationFrame(momentumAnimationRef.current)
      setHasMomentum(false)
    }
    
    // Use horizontal delta if available, otherwise use vertical with Shift
    const scrollDelta = e.deltaX !== 0 ? e.deltaX : e.deltaY
    const scrollVelocity = -scrollDelta * 0.5 // Adjust sensitivity
    
    startMomentumAnimation(scrollVelocity)
  }, [startMomentumAnimation])
  
  // Global mouse event listeners for dragging
  useEffect(() => {
    if (!isDragging) return

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!mouseStartRef.current) return
      
      const currentTime = Date.now()
      const deltaX = e.clientX - lastPositionRef.current
      const deltaTime = currentTime - lastTimeRef.current
      
      // Apply movement
      applyPhysicsMovement(deltaX)
      
      // Calculate velocity for momentum
      if (deltaTime > 0) {
        velocityRef.current = deltaX / deltaTime * 16
      }
      
      lastPositionRef.current = e.clientX
      lastTimeRef.current = currentTime
    }

    const handleGlobalMouseUp = () => {
      if (!isDragging) return
      
      setIsDragging(false)
      
      // Start momentum animation if velocity is significant
      if (Math.abs(velocityRef.current) > 1) {
        startMomentumAnimation(velocityRef.current)
      } else {
        setIsPaused(false)
      }
      
      mouseStartRef.current = null
    }

    document.addEventListener('mousemove', handleGlobalMouseMove)
    document.addEventListener('mouseup', handleGlobalMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, applyPhysicsMovement, startMomentumAnimation])
  
  // Clean up momentum when it ends and resume auto-scroll
  useEffect(() => {
    if (!hasMomentum && !isDragging) {
      // Resume auto-scroll after a short delay
      const timeout = setTimeout(() => {
        setIsPaused(false)
      }, 500)
      
      return () => clearTimeout(timeout)
    }
  }, [hasMomentum, isDragging])

  // Removed duplicate wheel handler and undefined navigation helpers


  return (
    <div className={`relative ${className}`} style={{ minHeight: '280px' }}>
      
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
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          {/* Double set of cards for infinite scroll */}
          {[...Array(2)].map((_, setIndex) => 
            featureCards.map((card, cardIndex) => {
              const isFocused =
                focusedCardIndex !== null &&
                focusedCardIndex === (cardIndex % originalCardsCount)
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