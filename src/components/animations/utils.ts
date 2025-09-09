import { ColorConfig } from './types'

// Brand color variants used randomly (but deterministically) per icon
export const defaultColorConfigs: ColorConfig[] = [
  {
    name: 'blue',
    iconClass: 'text-brand-brandeis-blue',
    chipFill: 'rgba(0, 111, 234, 0.12)',
    chipStroke: 'rgba(0, 111, 234, 0.25)'
  },
  {
    name: 'yellow',
    iconClass: 'text-brand-sunglow',
    chipFill: 'rgba(255, 196, 0, 0.16)',
    chipStroke: 'rgba(255, 196, 0, 0.25)'
  },
  {
    name: 'orange',
    iconClass: 'text-brand-orange-pantone',
    chipFill: 'rgba(251, 97, 19, 0.14)',
    chipStroke: 'rgba(251, 97, 19, 0.28)'
  },
  {
    name: 'green',
    iconClass: 'text-brand-brunswick-green',
    chipFill: 'rgba(15, 76, 56, 0.12)',
    chipStroke: 'rgba(15, 76, 56, 0.24)'
  }
]

// Deterministic pseudo-random in [0,1) based on index to avoid hydration mismatch
export const rand01 = (k: number): number => {
  const s = Math.sin((k + 1) * 12.9898) * 43758.5453
  return s - Math.floor(s)
}

// Quantize to reduce tiny FP differences between Node (SSR) and browser (CSR)
export const round = (v: number, p = 3): number => {
  const m = Math.pow(10, p)
  return Math.round(v * m) / m
}

// Shuffle function using client-side randomization for color assignments
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}