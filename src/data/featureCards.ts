import { ReactElement } from 'react'

export interface FeatureCard {
  id: string
  icon: string // Emoji for now, can be replaced with React components later
  title: string
  description?: string
  colorScheme: 'blue' | 'yellow' | 'orange' | 'green'
  accentColor: string
  backgroundColor: string
  borderColor: string
}

export const featureCards: FeatureCard[] = [
  {
    id: 'menos-gestion',
    icon: '🚀',
    title: 'Menos gestión, más educación',
    description: 'Automatiza tareas administrativas para enfocarte en la enseñanza',
    colorScheme: 'blue',
    accentColor: 'rgb(0, 111, 234)',
    backgroundColor: 'rgba(0, 111, 234, 0.12)',
    borderColor: 'rgba(0, 111, 234, 0.35)'
  },
  {
    id: 'matriculas-automaticas',
    icon: '📝',
    title: 'Matrículas automáticas en segundos',
    description: 'Sistema inteligente que agiliza inscripciones estudiantiles',
    colorScheme: 'green',
    accentColor: 'rgb(15, 76, 56)',
    backgroundColor: 'rgba(15, 76, 56, 0.12)',
    borderColor: 'rgba(15, 76, 56, 0.35)'
  },
  {
    id: 'reportes-listos',
    icon: '📊',
    title: 'Reportes listos para directores',
    description: 'Dashboards y métricas claras para decisiones estratégicas',
    colorScheme: 'yellow',
    accentColor: 'rgb(255, 196, 0)',
    backgroundColor: 'rgba(255, 196, 0, 0.15)',
    borderColor: 'rgba(255, 196, 0, 0.4)'
  },
  {
    id: 'detecta-riesgo',
    icon: '🚨',
    title: 'Detecta alumnos en riesgo a tiempo',
    description: 'Alertas inteligentes para intervención educativa oportuna',
    colorScheme: 'orange',
    accentColor: 'rgb(251, 97, 19)',
    backgroundColor: 'rgba(251, 97, 19, 0.12)',
    borderColor: 'rgba(251, 97, 19, 0.35)'
  },
  {
    id: 'materiales-interactivos',
    icon: '📚',
    title: 'Materiales interactivos y gamificados',
    description: 'Contenido dinámico que mantiene estudiantes motivados',
    colorScheme: 'blue',
    accentColor: 'rgb(0, 111, 234)',
    backgroundColor: 'rgba(0, 111, 234, 0.12)',
    borderColor: 'rgba(0, 111, 234, 0.35)'
  },
  {
    id: 'comunicacion-fluida',
    icon: '🤝',
    title: 'Comunicación fluida con toda la comunidad',
    description: 'Conecta docentes, estudiantes y familias eficientemente',
    colorScheme: 'green',
    accentColor: 'rgb(15, 76, 56)',
    backgroundColor: 'rgba(15, 76, 56, 0.12)',
    borderColor: 'rgba(15, 76, 56, 0.35)'
  },
  {
    id: 'asistente-virtual',
    icon: '💬',
    title: 'Asistente virtual 24/7 para dudas comunes',
    description: 'IA que responde preguntas frecuentes instantáneamente',
    colorScheme: 'orange',
    accentColor: 'rgb(251, 97, 19)',
    backgroundColor: 'rgba(251, 97, 19, 0.12)',
    borderColor: 'rgba(251, 97, 19, 0.35)'
  }
]

// Helper function to get cards with infinite scroll duplication
export const getInfiniteScrollCards = (): FeatureCard[] => {
  return [...featureCards, ...featureCards] // Duplicate for seamless infinite scroll
}