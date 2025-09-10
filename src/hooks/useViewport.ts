"use client"

import { useState, useEffect } from 'react'

export interface ViewportSize {
  width: number
  height: number
  isMobile: boolean
  isSmall: boolean
  isDesktop: boolean
}

export const useViewport = (): ViewportSize => {
  const [viewport, setViewport] = useState<ViewportSize>({
    width: 0,
    height: 0,
    isMobile: true,
    isSmall: false,
    isDesktop: false
  })

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      setViewport({
        width,
        height,
        isMobile: width < 640,
        isSmall: width >= 640 && width < 1024,
        isDesktop: width >= 1024
      })
    }

    // Set initial values
    updateViewport()

    // Listen for resize events
    window.addEventListener('resize', updateViewport)
    
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  return viewport
}