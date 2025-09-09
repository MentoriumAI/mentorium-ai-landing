import { ReactElement, SVGProps } from 'react'

export interface ColorConfig {
  name: string
  iconClass: string
  chipFill: string
  chipStroke: string
}

export interface OrbitItem {
  key: string
  chipClass: string
  svg: ReactElement<SVGProps<SVGSVGElement>>
}

export interface AnimationConfig {
  duration: number
  delay: number
}

export interface OrbitConfig {
  centerX: number
  centerY: number
  radiusX: number
  radiusY: number
  jitterMin: number
  jitterMax: number
  angleJitterMinDeg: number
  angleJitterMaxDeg: number
}

export interface MobileBubbleConfig {
  animationDelay: number
  animationDuration: number
  pulseDelay: number
  pulseDuration: number
}