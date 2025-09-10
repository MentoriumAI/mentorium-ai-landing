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
  chips: string[]
}

export const featureCards: FeatureCard[] = [
  {
    id: 'menos-gestion',
    icon: '🚀',
    title: 'Menos gestión, más educación',
    description: 'Dedica tu tiempo a la enseñanza mientras Mentorium automatiza las tareas administrativas.',
    colorScheme: 'blue',
    accentColor: 'rgb(0, 111, 234)',
    backgroundColor: 'rgba(0, 111, 234, 0.12)',
    borderColor: 'rgba(0, 111, 234, 0.35)',
    chips: ['Eficiencia']
  },
  {
    id: 'matriculas-automaticas',
    icon: '📝',
    title: 'Matrículas automáticas en segundos',
    description: 'Inscribe alumnos y crea aulas sin esfuerzo, reduciendo errores y sobrecarga.',
    colorScheme: 'green',
    accentColor: 'rgb(15, 76, 56)',
    backgroundColor: 'rgba(15, 76, 56, 0.12)',
    borderColor: 'rgba(15, 76, 56, 0.35)',
    chips: ['Automatización', 'Eficiencia']
  },
  {
    id: 'reportes-listos',
    icon: '📊',
    title: 'Reportes listos en cualquier momento',
    description: 'Obtén informes oficiales y dashboards instantáneos para directores y coordinadores.',
    colorScheme: 'yellow',
    accentColor: 'rgb(255, 196, 0)',
    backgroundColor: 'rgba(255, 196, 0, 0.15)',
    borderColor: 'rgba(255, 196, 0, 0.4)',
    chips: ['AI', 'Datos']
  },
  {
    id: 'detecta-riesgo',
    icon: '🚨',
    title: 'Detecta riesgos a tiempo',
    description: 'Recibe alertas tempranas sobre estudiantes en riesgo para intervenir de forma oportuna.',
    colorScheme: 'orange',
    accentColor: 'rgb(251, 97, 19)',
    backgroundColor: 'rgba(251, 97, 19, 0.12)',
    borderColor: 'rgba(251, 97, 19, 0.35)',
    chips: ['Seguimiento', 'AI']
  },
  {
    id: 'materiales-interactivos',
    icon: '📚',
    title: 'Materiales interactivos y gamificados',
    description: 'Motiva el aprendizaje con contenidos dinámicos, personalizados y divertidos.',
    colorScheme: 'blue',
    accentColor: 'rgb(0, 111, 234)',
    backgroundColor: 'rgba(0, 111, 234, 0.12)',
    borderColor: 'rgba(0, 111, 234, 0.35)',
    chips: ['Aprendizaje', 'AI']
  },
  {
    id: 'comunicacion-fluida',
    icon: '🤝',
    title: 'Comunicación fluida con la comunidad educativa',
    description: 'Conecta docentes, estudiantes y familias con herramientas de interacción integradas.',
    colorScheme: 'green',
    accentColor: 'rgb(15, 76, 56)',
    backgroundColor: 'rgba(15, 76, 56, 0.12)',
    borderColor: 'rgba(15, 76, 56, 0.35)',
    chips: ['Comunidad', 'Eficiencia']
  },
  {
    id: 'asistente-virtual',
    icon: '💬',
    title: 'Asistente virtual 24/7 para estudiantes y docentes',
    description: 'Resuelve dudas al instante con un chatbot multirol integrado en la plataforma.',
    colorScheme: 'orange',
    accentColor: 'rgb(251, 97, 19)',
    backgroundColor: 'rgba(251, 97, 19, 0.12)',
    borderColor: 'rgba(251, 97, 19, 0.35)',
    chips: ['Soporte', 'AI']
  },
  {
    id: 'soporte-especializado',
    icon: '🛠️',
    title: 'Soporte especializado de Mentorium',
    description: 'Accede a un equipo local que acompaña cada paso de tu implementación.',
    colorScheme: 'blue',
    accentColor: 'rgb(0, 111, 234)',
    backgroundColor: 'rgba(0, 111, 234, 0.12)',
    borderColor: 'rgba(0, 111, 234, 0.35)',
    chips: ['Soporte Local']
  },
  {
    id: 'evaluaciones-flexibles',
    icon: '🎯',
    title: 'Evaluaciones flexibles y diferenciadas',
    description: 'Adapta rúbricas, escalas y formatos para medir el progreso con precisión.',
    colorScheme: 'yellow',
    accentColor: 'rgb(255, 196, 0)',
    backgroundColor: 'rgba(255, 196, 0, 0.15)',
    borderColor: 'rgba(255, 196, 0, 0.4)',
    chips: ['Adaptabilidad', 'AI']
  },
  {
    id: 'plataforma-estable',
    icon: '🔒',
    title: 'Plataforma estable y siempre disponible',
    description: 'Garantiza continuidad educativa con infraestructura robusta y segura.',
    colorScheme: 'green',
    accentColor: 'rgb(15, 76, 56)',
    backgroundColor: 'rgba(15, 76, 56, 0.12)',
    borderColor: 'rgba(15, 76, 56, 0.35)',
    chips: ['Seguridad', 'Autogestión']
  },
  {
    id: 'aprendizaje-adaptado',
    icon: '💡',
    title: 'Aprendizaje adaptado al estudiante',
    description: 'Personaliza experiencias según competencias, estilos de aprendizaje y necesidades.',
    colorScheme: 'orange',
    accentColor: 'rgb(251, 97, 19)',
    backgroundColor: 'rgba(251, 97, 19, 0.12)',
    borderColor: 'rgba(251, 97, 19, 0.35)',
    chips: ['Adaptabilidad', 'AI']
  },
  {
    id: 'pricing-flexible',
    icon: '🌐',
    title: '100% online con pricing flexible',
    description: 'Accede sin instalaciones ni costos iniciales, elige el plan que mejor se adapte a tu institución.',
    colorScheme: 'blue',
    accentColor: 'rgb(0, 111, 234)',
    backgroundColor: 'rgba(0, 111, 234, 0.12)',
    borderColor: 'rgba(0, 111, 234, 0.35)',
    chips: ['Online', 'Flexible']
  }
]

// Helper function to get cards with infinite scroll duplication
export const getInfiniteScrollCards = (): FeatureCard[] => {
  return [...featureCards, ...featureCards] // Duplicate for seamless infinite scroll
}