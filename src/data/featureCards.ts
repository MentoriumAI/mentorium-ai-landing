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
    description: 'Automatiza tareas administrativas y enfócate en lo importante',
    colorScheme: 'blue',
    accentColor: 'rgb(0, 111, 234)',
    backgroundColor: 'rgba(0, 111, 234, 0.08)',
    borderColor: 'rgba(0, 111, 234, 0.2)'
  },
  {
    id: 'matriculas-automaticas',
    icon: '📝',
    title: 'Matrículas automáticas en segundos',
    description: 'Sistema inteligente que agiliza el proceso de inscripciones',
    colorScheme: 'green',
    accentColor: 'rgb(15, 76, 56)',
    backgroundColor: 'rgba(15, 76, 56, 0.08)',
    borderColor: 'rgba(15, 76, 56, 0.2)'
  },
  {
    id: 'reportes-listos',
    icon: '📊',
    title: 'Reportes listos para directores',
    description: 'Dashboards y métricas claras para toma de decisiones',
    colorScheme: 'yellow',
    accentColor: 'rgb(255, 196, 0)',
    backgroundColor: 'rgba(255, 196, 0, 0.1)',
    borderColor: 'rgba(255, 196, 0, 0.25)'
  },
  {
    id: 'detecta-riesgo',
    icon: '🚨',
    title: 'Detecta alumnos en riesgo a tiempo',
    description: 'Alertas inteligentes para intervenir antes que sea tarde',
    colorScheme: 'orange',
    accentColor: 'rgb(251, 97, 19)',
    backgroundColor: 'rgba(251, 97, 19, 0.08)',
    borderColor: 'rgba(251, 97, 19, 0.2)'
  },
  {
    id: 'materiales-interactivos',
    icon: '📚',
    title: 'Materiales interactivos y gamificados',
    description: 'Contenido dinámico que mantiene a los estudiantes motivados',
    colorScheme: 'blue',
    accentColor: 'rgb(0, 111, 234)',
    backgroundColor: 'rgba(0, 111, 234, 0.08)',
    borderColor: 'rgba(0, 111, 234, 0.2)'
  },
  {
    id: 'comunicacion-fluida',
    icon: '🤝',
    title: 'Comunicación fluida con toda la comunidad',
    description: 'Conecta docentes, estudiantes y familias en una sola plataforma',
    colorScheme: 'green',
    accentColor: 'rgb(15, 76, 56)',
    backgroundColor: 'rgba(15, 76, 56, 0.08)',
    borderColor: 'rgba(15, 76, 56, 0.2)'
  },
  {
    id: 'asistente-virtual',
    icon: '💬',
    title: 'Asistente virtual 24/7 para dudas comunes',
    description: 'IA que responde preguntas frecuentes en cualquier momento',
    colorScheme: 'orange',
    accentColor: 'rgb(251, 97, 19)',
    backgroundColor: 'rgba(251, 97, 19, 0.08)',
    borderColor: 'rgba(251, 97, 19, 0.2)'
  }
]

// Helper function to get cards with infinite scroll duplication
export const getInfiniteScrollCards = (): FeatureCard[] => {
  return [...featureCards, ...featureCards] // Duplicate for seamless infinite scroll
}