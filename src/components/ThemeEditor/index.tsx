'use client'

import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { fontCombinations, googleFonts } from '@/config/fonts'
import { generateThemeFromBrandColors } from '@/config/colors'
import type { BrandColors, FontConfig } from '@/types/theme'

interface ThemeEditorProps {
  isOpen: boolean
  onClose: () => void
}

export default function ThemeEditor({ isOpen, onClose }: ThemeEditorProps) {
  const { theme, updateFonts, updateColors, resetToDefault, exportConfig } = useTheme()
  const [activeTab, setActiveTab] = useState<'fonts' | 'colors'>('fonts')

  if (!isOpen) return null

  const handleFontCombinationChange = (combinationName: keyof typeof fontCombinations) => {
    const combination = fontCombinations[combinationName]
    updateFonts({
      primary: { ...combination.primary } as FontConfig,
      heading: { ...combination.heading } as FontConfig,
      mono: combination.mono ? { ...combination.mono } as FontConfig : undefined
    })
  }

  const handleBrandColorChange = (colorKey: keyof BrandColors, value: string) => {
    const newBrandColors = {
      ...theme.colors.brand,
      [colorKey]: value
    }
    const newTheme = generateThemeFromBrandColors(newBrandColors)
    updateColors(newTheme)
  }

  const handleExport = () => {
    const config = exportConfig()
    navigator.clipboard.writeText(config)
    alert('Theme configuration copied to clipboard!')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Theme Editor</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex mt-4 space-x-4">
            <button
              onClick={() => setActiveTab('fonts')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'fonts'
                  ? 'bg-brand-brandeis-blue text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Fonts
            </button>
            <button
              onClick={() => setActiveTab('colors')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'colors'
                  ? 'bg-brand-brandeis-blue text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Colors
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'fonts' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Font Combinations</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(fontCombinations).map(([name, combination]) => (
                    <div
                      key={name}
                      onClick={() => handleFontCombinationChange(name as keyof typeof fontCombinations)}
                      className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-brand-brandeis-blue hover:shadow-md transition-all"
                    >
                      <h4 className="font-semibold capitalize mb-2" style={{ fontFamily: combination.heading.family }}>
                        {name}
                      </h4>
                      <p className="text-sm text-gray-600" style={{ fontFamily: combination.primary.family }}>
                        Heading: {combination.heading.family}
                        <br />
                        Body: {combination.primary.family}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Individual Fonts</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Font</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={theme.fonts.primary?.family || ''}
                      onChange={(e) => {
                        const font = Object.values(googleFonts).find(f => f.family === e.target.value)
                        if (font) updateFonts({ primary: { ...font } as FontConfig })
                      }}
                    >
                      {Object.values(googleFonts).map(font => (
                        <option key={font.family} value={font.family}>
                          {font.family}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Heading Font</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={theme.fonts.heading?.family || ''}
                      onChange={(e) => {
                        const font = Object.values(googleFonts).find(f => f.family === e.target.value)
                        if (font) updateFonts({ heading: { ...font } as FontConfig })
                      }}
                    >
                      {Object.values(googleFonts).map(font => (
                        <option key={font.family} value={font.family}>
                          {font.family}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'colors' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Brand Colors</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(theme.colors.brand).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                        {key.replace(/-/g, ' ')}
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={value}
                          onChange={(e) => handleBrandColorChange(key as keyof BrandColors, e.target.value)}
                          className="w-12 h-10 rounded border border-gray-300"
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleBrandColorChange(key as keyof BrandColors, e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded font-mono text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Color Preview</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {Object.entries(theme.colors.brand).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div 
                        className="w-full h-16 rounded-lg border border-gray-200 mb-2"
                        style={{ backgroundColor: value }}
                      />
                      <span className="text-xs text-gray-600 capitalize">
                        {key.replace(/-/g, ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-between">
          <div className="space-x-2">
            <button
              onClick={resetToDefault}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Reset to Default
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 text-brand-brandeis-blue bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Export Config
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-brand-brandeis-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}