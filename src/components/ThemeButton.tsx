'use client'

import { useState } from 'react'
import ThemeEditor from './ThemeEditor'

export default function ThemeButton() {
  const [isEditorOpen, setIsEditorOpen] = useState(false)

  // Only show in development mode
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <>
      <button
        onClick={() => setIsEditorOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-brand-brandeis-blue text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        title="Open Theme Editor"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v6a2 2 0 002 2h4a2 2 0 002-2V5zM21 15a2 2 0 00-2-2h-4a2 2 0 00-2 2v2a2 2 0 002 2h4a2 2 0 002-2v-2z"
          />
        </svg>
      </button>

      <ThemeEditor 
        isOpen={isEditorOpen} 
        onClose={() => setIsEditorOpen(false)} 
      />
    </>
  )
}