'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#caracteristicas', label: 'Características' },
    { href: '#beneficios', label: 'Beneficios' },
    { href: '#integraciones', label: 'Integraciones' },
    { href: '#contacto', label: 'Contacto' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-elegant border-b border-slate-200/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between py-4 lg:py-6">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl lg:text-3xl font-bold gradient-text hover:scale-105 transition-transform duration-200"
          >
            Mentorium
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="nav-link"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link 
              href="#demo" 
              className="btn-primary btn-large hover:shadow-glow"
            >
              Solicitar Demo
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col items-center justify-center space-y-1">
              <span 
                className={`block w-4 h-0.5 bg-slate-700 transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''
                }`}
              />
              <span 
                className={`block w-4 h-0.5 bg-slate-700 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span 
                className={`block w-4 h-0.5 bg-slate-700 transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
                }`}
              />
            </div>
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="glass-card mt-4 p-6 space-y-4">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="block nav-link text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link 
                href="#demo" 
                className="btn-primary w-full justify-center mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Solicitar Demo
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header