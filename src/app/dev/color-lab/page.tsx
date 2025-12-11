"use client"

import { useState } from 'react'
import { useP3Support } from '@/hooks/useP3Support'

// Types for gradient picker
interface ColorOption {
  id: string
  hex: string
  name: string
  p3?: string
}

interface GradientState {
  startColor: ColorOption
  endColor: ColorOption
  startStop: number
  endStop: number
  useP3End: boolean
}

// Available colors for picker
const colorOptions = {
  srgb: [
    { id: 'brunswick-green', hex: '#0f4c38', name: 'Brunswick Green' },
    { id: 'dark-green', hex: '#093b2c', name: 'Dark Green' },
    { id: 'brandeis-blue', hex: '#006fea', name: 'Brandeis Blue' },
    { id: 'sunglow', hex: '#fac827', name: 'Sunglow' },
    { id: 'orange-pantone', hex: '#fb6113', name: 'Orange Pantone' },
    { id: 'dark-moss-green', hex: '#536c03', name: 'Dark Moss Green' },
    { id: 'white', hex: '#ffffff', name: 'White' },
  ],
  p3: [
    { id: 'brunswick-green-p3', hex: '#0f4c38', name: 'Brunswick Green', p3: 'color(display-p3 0.05 0.35 0.25)' },
    { id: 'dark-green-p3', hex: '#093b2c', name: 'Dark Green', p3: 'color(display-p3 0.03 0.27 0.20)' },
    { id: 'brandeis-blue-p3', hex: '#006fea', name: 'Brandeis Blue', p3: 'color(display-p3 0 0.50 1.0)' },
    { id: 'sunglow-p3', hex: '#fac827', name: 'Sunglow', p3: 'color(display-p3 1.0 0.85 0.15)' },
    { id: 'orange-pantone-p3', hex: '#fb6113', name: 'Orange Pantone', p3: 'color(display-p3 1.0 0.45 0.08)' },
    { id: 'dark-moss-green-p3', hex: '#536c03', name: 'Dark Moss Green', p3: 'color(display-p3 0.38 0.50 0.02)' },
    { id: 'hdr-white', hex: '#ffffff', name: 'HDR White', p3: 'color(display-p3 1 1 1)' },
  ]
}

export default function ColorLabPage() {
  const { supportsP3, supportsHDR, isLoading } = useP3Support()

  // Gradient picker state
  const [gradientState, setGradientState] = useState<GradientState>({
    startColor: { id: 'brunswick-green', hex: '#0f4c38', name: 'Brunswick Green' },
    endColor: { id: 'brandeis-blue-p3', hex: '#006fea', name: 'Brandeis Blue', p3: 'color(display-p3 0 0.50 1.0)' },
    startStop: 0,
    endStop: 100,
    useP3End: true
  })

  const { startColor, endColor, startStop, endStop, useP3End } = gradientState

  // Custom text state
  const [customText, setCustomText] = useState('Mentorium')
  const [darkBackground, setDarkBackground] = useState(false)

  // Generate gradient CSS
  const generateGradient = () => {
    const endColorValue = useP3End && endColor.p3 ? endColor.p3 : endColor.hex
    return `linear-gradient(to right, ${startColor.hex} ${startStop}%, ${endColorValue} ${endStop}%)`
  }

  const colors = [
    { name: 'Brunswick Green', srgb: 'bg-brand-brunswick-green', p3: 'bg-p3-green', var: '--color-brand-brunswick-green-p3' },
    { name: 'Dark Green', srgb: 'bg-brand-dark-green', p3: 'bg-brand-p3-dark-green', var: '--color-brand-dark-green-p3' },
    { name: 'Brandeis Blue', srgb: 'bg-brand-brandeis-blue', p3: 'bg-p3-blue', var: '--color-brand-brandeis-blue-p3' },
    { name: 'Sunglow', srgb: 'bg-brand-sunglow', p3: 'bg-p3-sunglow', var: '--color-brand-sunglow-p3' },
    { name: 'Orange Pantone', srgb: 'bg-brand-orange-pantone', p3: 'bg-p3-orange', var: '--color-brand-orange-pantone-p3' },
    { name: 'Dark Moss Green', srgb: 'bg-brand-dark-moss-green', p3: 'bg-brand-p3-dark-moss-green', var: '--color-brand-dark-moss-green-p3' },
  ]

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-slate-200">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-bold text-xl text-brand-dark-green">P3/HDR Color Lab</h1>
              <p className="text-sm text-slate-500">Test wide-gamut colors and hybrid gradients</p>
            </div>
            <div className="flex gap-2 text-xs">
              <span className={`px-3 py-1.5 rounded-full ${supportsP3 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                P3: {isLoading ? '...' : supportsP3 ? 'Supported' : 'Not supported'}
              </span>
              <span className={`px-3 py-1.5 rounded-full ${supportsHDR ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                HDR: {isLoading ? '...' : supportsHDR ? 'Supported' : 'Not supported'}
              </span>
            </div>
          </div>

          {/* Color Swatches */}
          <div className="mb-6">
            <h2 className="font-semibold text-sm text-brand-dark-green mb-3">Brand Colors: sRGB vs P3</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {colors.map((color) => (
                <div key={color.name} className="text-center">
                  <div className="flex gap-1 mb-1">
                    <div
                      className={`flex-1 h-16 rounded-l-lg ${color.srgb}`}
                      title={`sRGB: ${color.name}`}
                    />
                    <div
                      className="flex-1 h-16 rounded-r-lg"
                      style={{ backgroundColor: `var(${color.var})` }}
                      title={`P3: ${color.name}`}
                    />
                  </div>
                  <p className="text-[11px] text-slate-600 truncate">{color.name}</p>
                  <p className="text-[9px] text-slate-400">sRGB | P3</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hybrid Gradients */}
          <div className="mb-6 pt-4 border-t border-slate-200">
            <h2 className="font-semibold text-sm text-brand-dark-green mb-3">Hybrid Gradients: sRGB start → HDR highlight end</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <div className="h-12 rounded-lg" style={{ background: 'var(--gradient-hero-text)' }} />
                <p className="text-[11px] text-center text-slate-500 mt-1">Hero: Green→Blue</p>
              </div>
              <div>
                <div className="h-12 rounded-lg" style={{ background: 'var(--gradient-cta)' }} />
                <p className="text-[11px] text-center text-slate-500 mt-1">CTA: Moss→Orange</p>
              </div>
              <div>
                <div className="h-12 rounded-lg" style={{ background: 'var(--gradient-accent)' }} />
                <p className="text-[11px] text-center text-slate-500 mt-1">Accent: Green→Gold</p>
              </div>
              <div>
                <div className="h-12 rounded-lg" style={{ background: 'var(--gradient-primary)' }} />
                <p className="text-[11px] text-center text-slate-500 mt-1">Primary: Dark→Green</p>
              </div>
              <div>
                <div className="h-12 rounded-lg" style={{ background: 'var(--gradient-cool)' }} />
                <p className="text-[11px] text-center text-slate-500 mt-1">Cool: Dark→Blue</p>
              </div>
              <div>
                <div className="h-12 rounded-lg" style={{ background: 'var(--gradient-warm)' }} />
                <p className="text-[11px] text-center text-slate-500 mt-1">Warm: Moss→Gold</p>
              </div>
            </div>
          </div>

          {/* Gradient Text Samples */}
          <div className="mb-6 pt-4 border-t border-slate-200">
            <h2 className="font-semibold text-sm text-brand-dark-green mb-3">Hybrid Gradient Text Samples</h2>
            <div className="flex flex-wrap gap-6 items-center">
              <span className="text-2xl font-bold hdr-gradient-hero-text">Hero Text</span>
              <span className="text-2xl font-bold hdr-gradient-cta-text">CTA Text</span>
              <span className="text-2xl font-bold hdr-gradient-accent-text">Accent Text</span>
              <span className="text-2xl font-bold hdr-gradient-cool-text">Cool Text</span>
              <span className="text-2xl font-bold hdr-gradient-warm-text">Warm Text</span>
            </div>
          </div>

          {/* Interactive Gradient Picker */}
          <div className="mb-6 pt-4 border-t border-slate-200">
            <h2 className="font-semibold text-sm text-brand-dark-green mb-3">Interactive Gradient Picker</h2>

            {/* Color Selectors */}
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label className="text-xs text-slate-500 block mb-2">Start Color (sRGB)</label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.srgb.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setGradientState(prev => ({ ...prev, startColor: color }))}
                      className={`w-8 h-8 rounded-lg border transition-all ${startColor.id === color.id ? 'border-slate-800 scale-110 shadow-md ring-2 ring-slate-800' : 'border-slate-300 hover:scale-105'}`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-2">{startColor.name}</p>
              </div>

              <div>
                <label className="text-xs text-slate-500 block mb-2">End Color (P3/HDR)</label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.p3.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setGradientState(prev => ({ ...prev, endColor: color }))}
                      className={`w-8 h-8 rounded-lg border transition-all ${endColor.id === color.id ? 'border-slate-800 scale-110 shadow-md ring-2 ring-slate-800' : 'border-slate-300 hover:scale-105'}`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-2">{endColor.name}</p>
              </div>
            </div>

            {/* Stop Position Sliders */}
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label className="text-xs text-slate-500 block mb-2">Start Stop: {startStop}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={startStop}
                  onChange={(e) => setGradientState(prev => ({ ...prev, startStop: Number(e.target.value) }))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-brunswick-green"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-2">End Stop: {endStop}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={endStop}
                  onChange={(e) => setGradientState(prev => ({ ...prev, endStop: Number(e.target.value) }))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-brunswick-green"
                />
              </div>
            </div>

            {/* P3 Toggle */}
            <div className="flex items-center gap-2 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useP3End}
                  onChange={(e) => setGradientState(prev => ({ ...prev, useP3End: e.target.checked }))}
                  className="w-4 h-4 rounded accent-brand-brunswick-green"
                />
                <span className="text-xs text-slate-600">Use P3 for end color (brighter on supported displays)</span>
              </label>
            </div>

            {/* Gradient Preview */}
            <div className="mb-4">
              <p className="text-xs text-slate-500 mb-2">Preview:</p>
              <div
                className="h-16 rounded-lg"
                style={{ background: generateGradient() }}
              />
            </div>

            {/* Text Preview */}
            <div className="mb-4">
              <div className="flex items-center gap-4 mb-2">
                <p className="text-xs text-slate-500">Text Preview:</p>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Enter custom text..."
                  className="flex-1 max-w-xs px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-brunswick-green/50 focus:border-brand-brunswick-green"
                />
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={darkBackground}
                    onChange={(e) => setDarkBackground(e.target.checked)}
                    className="w-4 h-4 rounded accent-brand-brunswick-green"
                  />
                  <span className="text-xs text-slate-600">Dark bg</span>
                </label>
              </div>
              <div className={`p-4 rounded-lg transition-colors ${darkBackground ? 'bg-slate-900' : 'bg-white'}`}>
                <span
                  className="text-4xl font-bold"
                  style={{
                    backgroundImage: generateGradient(),
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {customText || 'Mentorium'}
                </span>
              </div>
            </div>

            {/* Generated CSS */}
            <div className="p-3 bg-slate-100 rounded-lg">
              <p className="text-xs text-slate-500 mb-1">Generated CSS:</p>
              <code className="text-xs font-mono text-slate-700 break-all">
                {generateGradient()}
              </code>
            </div>
          </div>

          {/* Stacked Comparison */}
          <div className="pt-4 border-t border-slate-200">
            <h2 className="font-semibold text-sm text-brand-dark-green mb-3">Comparison: Full sRGB vs Hybrid vs Full P3</h2>
            <div className="flex flex-col gap-1">
              <div className="flex items-center">
                <span className="text-xs text-slate-500 w-28 shrink-0">Full sRGB</span>
                <div className="flex-1 h-8 bg-gradient-to-r from-brand-brunswick-green to-brand-brandeis-blue rounded" />
              </div>
              <div className="flex items-center">
                <span className="text-xs text-slate-500 w-28 shrink-0">Hybrid sRGB→HDR</span>
                <div className="flex-1 h-8 rounded" style={{ background: 'var(--gradient-hero-text)' }} />
              </div>
              <div className="flex items-center">
                <span className="text-xs text-slate-500 w-28 shrink-0">Full P3</span>
                <div className="flex-1 h-8 rounded" style={{ background: 'linear-gradient(to right, var(--color-brand-brunswick-green-p3), var(--color-brand-brandeis-blue-p3))' }} />
              </div>
            </div>
          </div>

          {/* HDR White Text Outlines */}
          <div className="pt-4 border-t border-slate-200">
            <h2 className="font-semibold text-sm text-brand-dark-green mb-2">HDR White Text Outlines</h2>
            <p className="text-xs text-slate-500 mb-4">Outer glow/outline using text-shadow - preserves letterforms, brighter on HDR displays</p>

            {/* Dark background showcase */}
            <div className="bg-slate-900 p-6 rounded-lg mb-4">
              <div className="flex flex-col gap-4">
                {/* Three-way comparison: No effect vs Glow Outline vs Crisp Outline */}
                <div>
                  <p className="text-[10px] text-slate-400 mb-3 uppercase tracking-wide">Outline Styles Comparison</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <span className="text-3xl font-bold hdr-gradient-hero-text">Mentorium</span>
                      <p className="text-[9px] text-slate-500 mt-1">No outline</p>
                    </div>
                    <div className="text-center">
                      <span className="text-3xl font-bold hdr-gradient-hero-outline">Mentorium</span>
                      <p className="text-[9px] text-slate-500 mt-1">Glow outline</p>
                    </div>
                    <div className="text-center">
                      <span className="text-3xl font-bold hdr-gradient-hero-outline-crisp">Mentorium</span>
                      <p className="text-[9px] text-slate-500 mt-1">Crisp outline</p>
                    </div>
                  </div>
                </div>

                {/* sRGB vs HDR glow outline */}
                <div className="pt-4 border-t border-slate-700">
                  <p className="text-[10px] text-slate-400 mb-3 uppercase tracking-wide">sRGB Glow vs HDR Glow Outline</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <span
                        className="text-3xl font-bold"
                        style={{
                          background: 'linear-gradient(to right, #0f4c38, #006fea)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          textShadow: '0 0 2px #ffffff, 0 0 4px #ffffff, 0 0 8px #ffffff'
                        }}
                      >
                        Mentorium
                      </span>
                      <p className="text-[9px] text-slate-500 mt-1">sRGB #fff glow</p>
                    </div>
                    <div className="text-center">
                      <span className="text-3xl font-bold hdr-gradient-hero-outline">Mentorium</span>
                      <p className="text-[9px] text-slate-500 mt-1">HDR ultra-white glow</p>
                    </div>
                  </div>
                </div>

                {/* All gradient variants with glow outline */}
                <div className="pt-4 border-t border-slate-700">
                  <p className="text-[10px] text-slate-400 mb-3 uppercase tracking-wide">All variants with HDR glow outline</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    <span className="text-2xl font-bold hdr-gradient-hero-outline">Hero</span>
                    <span className="text-2xl font-bold hdr-gradient-cta-outline">CTA</span>
                    <span className="text-2xl font-bold hdr-gradient-accent-outline">Accent</span>
                    <span className="text-2xl font-bold hdr-gradient-cool-outline">Cool</span>
                    <span className="text-2xl font-bold hdr-gradient-warm-outline">Warm</span>
                  </div>
                </div>

                {/* All gradient variants with crisp outline */}
                <div className="pt-4 border-t border-slate-700">
                  <p className="text-[10px] text-slate-400 mb-3 uppercase tracking-wide">All variants with HDR crisp outline</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    <span className="text-2xl font-bold hdr-gradient-hero-outline-crisp">Hero</span>
                    <span className="text-2xl font-bold hdr-gradient-cta-outline-crisp">CTA</span>
                    <span className="text-2xl font-bold hdr-gradient-accent-outline-crisp">Accent</span>
                    <span className="text-2xl font-bold hdr-gradient-cool-outline-crisp">Cool</span>
                    <span className="text-2xl font-bold hdr-gradient-warm-outline-crisp">Warm</span>
                  </div>
                </div>

                {/* Solid P3 colors with outline */}
                <div className="pt-4 border-t border-slate-700">
                  <p className="text-[10px] text-slate-400 mb-3 uppercase tracking-wide">Solid P3 colors with HDR glow outline</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    <span
                      className="text-2xl font-bold"
                      style={{
                        color: 'var(--color-brand-brunswick-green-p3)',
                        textShadow: '0 0 2px var(--color-ultra-white), 0 0 4px var(--color-ultra-white), 0 0 8px var(--color-ultra-white)'
                      }}
                    >
                      Green
                    </span>
                    <span
                      className="text-2xl font-bold"
                      style={{
                        color: 'var(--color-brand-brandeis-blue-p3)',
                        textShadow: '0 0 2px var(--color-ultra-white), 0 0 4px var(--color-ultra-white), 0 0 8px var(--color-ultra-white)'
                      }}
                    >
                      Blue
                    </span>
                    <span
                      className="text-2xl font-bold"
                      style={{
                        color: 'var(--color-brand-orange-pantone-p3)',
                        textShadow: '0 0 2px var(--color-ultra-white), 0 0 4px var(--color-ultra-white), 0 0 8px var(--color-ultra-white)'
                      }}
                    >
                      Orange
                    </span>
                    <span
                      className="text-2xl font-bold"
                      style={{
                        color: 'var(--color-brand-sunglow-p3)',
                        textShadow: '0 0 2px var(--color-ultra-white), 0 0 4px var(--color-ultra-white), 0 0 8px var(--color-ultra-white)'
                      }}
                    >
                      Gold
                    </span>
                  </div>
                </div>

                {/* Legacy text-stroke comparison (for reference) */}
                <div className="pt-4 border-t border-slate-700">
                  <p className="text-[10px] text-slate-400 mb-3 uppercase tracking-wide">Legacy: text-stroke (eats into letters - less legible)</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-3 opacity-60">
                    <span className="text-2xl font-bold hdr-gradient-hero-border">Hero</span>
                    <span className="text-2xl font-bold hdr-gradient-cta-border">CTA</span>
                    <span className="text-2xl font-bold hdr-gradient-accent-border">Accent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Light background comparison */}
            <div className="bg-slate-100 p-4 rounded-lg">
              <p className="text-[10px] text-slate-500 mb-2 uppercase tracking-wide">Light background: Glow (top) vs Crisp (bottom)</p>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  <span className="text-2xl font-bold hdr-gradient-hero-outline">Hero</span>
                  <span className="text-2xl font-bold hdr-gradient-cta-outline">CTA</span>
                  <span className="text-2xl font-bold hdr-gradient-accent-outline">Accent</span>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  <span className="text-2xl font-bold hdr-gradient-hero-outline-crisp">Hero</span>
                  <span className="text-2xl font-bold hdr-gradient-cta-outline-crisp">CTA</span>
                  <span className="text-2xl font-bold hdr-gradient-accent-outline-crisp">Accent</span>
                </div>
              </div>
            </div>
          </div>

          {/* HDR Glow Effects */}
          <div className="pt-4 border-t border-slate-200">
            <h2 className="font-semibold text-sm text-brand-dark-green mb-2">HDR Glow & Bloom Effects</h2>
            <p className="text-xs text-slate-500 mb-4">P3/HDR colors in box-shadow create more vibrant glows on supported displays</p>

            {/* Dark background for glow visibility */}
            <div className="bg-slate-900 p-8 rounded-lg">
              {/* Side-by-side sRGB vs P3 glows */}
              <div>
                <p className="text-[10px] text-slate-400 mb-4 uppercase tracking-wide text-center">sRGB Glow (left) vs P3/HDR Glow (right)</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {/* Green */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-3">
                      <div
                        className="w-12 h-12 rounded-xl bg-brand-brunswick-green"
                        style={{ boxShadow: '0 0 20px rgba(15, 76, 56, 0.4), 0 0 40px rgba(15, 76, 56, 0.1)' }}
                      />
                      <div
                        className="w-12 h-12 rounded-xl bg-brand-brunswick-green"
                        style={{ boxShadow: 'var(--shadow-glow-green-p3)' }}
                      />
                    </div>
                    <span className="text-xs text-slate-400">Green</span>
                  </div>

                  {/* Blue */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-3">
                      <div
                        className="w-12 h-12 rounded-xl bg-brand-brandeis-blue"
                        style={{ boxShadow: '0 0 20px rgba(0, 111, 234, 0.4), 0 0 40px rgba(0, 111, 234, 0.1)' }}
                      />
                      <div
                        className="w-12 h-12 rounded-xl bg-brand-brandeis-blue"
                        style={{ boxShadow: 'var(--shadow-glow-blue-p3)' }}
                      />
                    </div>
                    <span className="text-xs text-slate-400">Blue</span>
                  </div>

                  {/* Orange */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-3">
                      <div
                        className="w-12 h-12 rounded-xl bg-brand-orange-pantone"
                        style={{ boxShadow: '0 0 20px rgba(251, 97, 19, 0.4), 0 0 40px rgba(251, 97, 19, 0.1)' }}
                      />
                      <div
                        className="w-12 h-12 rounded-xl bg-brand-orange-pantone"
                        style={{ boxShadow: 'var(--shadow-glow-orange-p3)' }}
                      />
                    </div>
                    <span className="text-xs text-slate-400">Orange</span>
                  </div>

                  {/* Gold/Sunglow */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-3">
                      <div
                        className="w-12 h-12 rounded-xl bg-brand-sunglow"
                        style={{ boxShadow: '0 0 20px rgba(250, 200, 39, 0.4), 0 0 40px rgba(250, 200, 39, 0.1)' }}
                      />
                      <div
                        className="w-12 h-12 rounded-xl bg-brand-sunglow"
                        style={{ boxShadow: '0 0 25px color(display-p3 1 0.82 0.12 / 0.6), 0 0 50px color(display-p3 1 0.82 0.12 / 0.2)' }}
                      />
                    </div>
                    <span className="text-xs text-slate-400">Gold</span>
                  </div>
                </div>
              </div>

              {/* HDR White Bloom Comparison */}
              <div className="mt-8 pt-6 border-t border-slate-700">
                <p className="text-[10px] text-slate-400 mb-4 uppercase tracking-wide text-center">White Bloom: sRGB vs HDR (brighter glow on HDR displays)</p>
                <div className="flex justify-center gap-12">
                  {/* sRGB white glow */}
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-full bg-white"
                      style={{ boxShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.4), 0 0 60px rgba(255,255,255,0.2)' }}
                    />
                    <span className="text-xs text-slate-400">sRGB #fff</span>
                  </div>

                  {/* HDR white glow */}
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-full"
                      style={{
                        backgroundColor: 'var(--color-ultra-white)',
                        boxShadow: '0 0 20px var(--color-ultra-white), 0 0 40px var(--color-ultra-white), 0 0 60px var(--color-ultra-white)'
                      }}
                    />
                    <span className="text-xs text-slate-400">HDR White</span>
                  </div>
                </div>
                <p className="text-[9px] text-slate-500 text-center mt-3">On non-HDR screens these look identical. On HDR, right is brighter.</p>
              </div>

              {/* Glowing buttons comparison */}
              <div className="mt-8 pt-6 border-t border-slate-700">
                <p className="text-[10px] text-slate-400 mb-4 uppercase tracking-wide text-center">CTA Buttons: sRGB Glow vs P3/HDR Glow</p>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  {/* sRGB */}
                  <div className="text-center">
                    <button
                      className="px-5 py-2.5 rounded-lg font-semibold text-white text-sm transition-all hover:scale-105"
                      style={{
                        background: 'linear-gradient(to right, #536c03, #fb6113)',
                        boxShadow: '0 0 20px rgba(251, 97, 19, 0.4), 0 0 40px rgba(251, 97, 19, 0.1)'
                      }}
                    >
                      sRGB Glow
                    </button>
                  </div>
                  <div className="text-center">
                    <button
                      className="px-5 py-2.5 rounded-lg font-semibold text-white text-sm transition-all hover:scale-105"
                      style={{
                        background: 'var(--gradient-cta)',
                        boxShadow: 'var(--shadow-glow-orange-p3)'
                      }}
                    >
                      P3/HDR Glow
                    </button>
                  </div>
                  <div className="text-center">
                    <button
                      className="px-5 py-2.5 rounded-lg font-semibold text-white text-sm transition-all hover:scale-105"
                      style={{
                        background: 'linear-gradient(to right, #0f4c38, #006fea)',
                        boxShadow: '0 0 20px rgba(0, 111, 234, 0.4), 0 0 40px rgba(0, 111, 234, 0.1)'
                      }}
                    >
                      sRGB Glow
                    </button>
                  </div>
                  <div className="text-center">
                    <button
                      className="px-5 py-2.5 rounded-lg font-semibold text-white text-sm transition-all hover:scale-105"
                      style={{
                        background: 'var(--gradient-hero-text)',
                        boxShadow: 'var(--shadow-glow-blue-p3)'
                      }}
                    >
                      P3/HDR Glow
                    </button>
                  </div>
                </div>
              </div>

              {/* Strong glow comparison */}
              <div className="mt-8 pt-6 border-t border-slate-700">
                <p className="text-[10px] text-slate-400 mb-4 uppercase tracking-wide text-center">Strong Glow: sRGB vs P3/HDR</p>
                <div className="flex justify-center gap-8">
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className="w-16 h-16 rounded-xl"
                      style={{
                        background: 'linear-gradient(to right, #536c03, #fb6113)',
                        boxShadow: '0 0 30px rgba(251, 97, 19, 0.5), 0 0 60px rgba(15, 76, 56, 0.2)'
                      }}
                    />
                    <span className="text-xs text-slate-400">sRGB Strong</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className="w-16 h-16 rounded-xl"
                      style={{
                        background: 'var(--gradient-cta)',
                        boxShadow: 'var(--shadow-glow-strong-p3)'
                      }}
                    />
                    <span className="text-xs text-slate-400">P3/HDR Strong</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Light background comparison */}
            <div className="mt-4 p-4 bg-slate-100 rounded-lg">
              <p className="text-[10px] text-slate-500 mb-3 uppercase tracking-wide text-center">Light background: sRGB (left) vs P3/HDR (right)</p>
              <div className="flex flex-wrap gap-6 justify-center">
                <div className="flex gap-2 items-center">
                  <div
                    className="w-10 h-10 rounded-xl bg-brand-brunswick-green"
                    style={{ boxShadow: '0 0 15px rgba(15, 76, 56, 0.4)' }}
                  />
                  <div
                    className="w-10 h-10 rounded-xl bg-brand-brunswick-green"
                    style={{ boxShadow: 'var(--shadow-glow-green-p3)' }}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <div
                    className="w-10 h-10 rounded-xl bg-brand-brandeis-blue"
                    style={{ boxShadow: '0 0 15px rgba(0, 111, 234, 0.4)' }}
                  />
                  <div
                    className="w-10 h-10 rounded-xl bg-brand-brandeis-blue"
                    style={{ boxShadow: 'var(--shadow-glow-blue-p3)' }}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <div
                    className="w-10 h-10 rounded-xl bg-brand-orange-pantone"
                    style={{ boxShadow: '0 0 15px rgba(251, 97, 19, 0.4)' }}
                  />
                  <div
                    className="w-10 h-10 rounded-xl bg-brand-orange-pantone"
                    style={{ boxShadow: 'var(--shadow-glow-orange-p3)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
