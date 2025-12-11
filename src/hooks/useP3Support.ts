"use client"

import { useState, useEffect } from 'react'

export interface P3Support {
  supportsP3: boolean
  supportsHDR: boolean
  isLoading: boolean
}

/**
 * Hook to detect Display P3 and HDR support
 *
 * Uses CSS media queries to detect:
 * - P3 color gamut support via (color-gamut: p3)
 * - HDR dynamic range via (dynamic-range: high)
 *
 * Returns fallback-safe values (false) during SSR and loading
 */
export const useP3Support = (): P3Support => {
  const [support, setSupport] = useState<P3Support>({
    supportsP3: false,
    supportsHDR: false,
    isLoading: true
  })

  useEffect(() => {
    const detectSupport = () => {
      // Check for P3 color gamut support
      const supportsP3 = window.matchMedia('(color-gamut: p3)').matches

      // Check for HDR dynamic range support
      const supportsHDR = window.matchMedia('(dynamic-range: high)').matches

      setSupport({
        supportsP3,
        supportsHDR,
        isLoading: false
      })
    }

    // Detect on mount
    detectSupport()

    // Listen for media query changes (e.g., display switch)
    const p3Query = window.matchMedia('(color-gamut: p3)')
    const hdrQuery = window.matchMedia('(dynamic-range: high)')

    const handleChange = () => detectSupport()

    p3Query.addEventListener('change', handleChange)
    hdrQuery.addEventListener('change', handleChange)

    return () => {
      p3Query.removeEventListener('change', handleChange)
      hdrQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return support
}

/**
 * Utility function to get P3 color class based on support
 * Falls back to sRGB class if P3 not supported
 */
export const getP3ColorClass = (
  supportsP3: boolean,
  p3Class: string,
  fallbackClass: string
): string => {
  return supportsP3 ? p3Class : fallbackClass
}
