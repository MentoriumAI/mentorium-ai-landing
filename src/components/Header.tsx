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

          {/* Mobile Menu Button - Enhanced touch target and animation */}
          <button
            className="lg:hidden p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 active:scale-95"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 h-6 flex flex-col items-center justify-center relative">
              <span 
                className={`absolute block w-5 h-0.5 bg-slate-700 transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                }`}
              />
              <span 
                className={`absolute block w-5 h-0.5 bg-slate-700 transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}
              />
              <span 
                className={`absolute block w-5 h-0.5 bg-slate-700 transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
                }`}
              />
            </div>
          </button>
        </nav>

        {/* Mobile Navigation - Enhanced with smooth animations */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`glass-card mt-4 p-6 space-y-4 transform transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-y-0 scale-100' : '-translate-y-4 scale-95'
          }`}>
            {navItems.map((item, index) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`block nav-link text-lg py-2 px-4 rounded-lg hover:bg-brand-isabelline/50 transition-all duration-200 transform ${
                  isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                }`}
                style={{ 
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms' 
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link 
              href="#demo" 
              className={`btn-primary w-full justify-center mt-6 transform transition-all duration-300 ${
                isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ 
                transitionDelay: isMobileMenuOpen ? `${navItems.length * 50}ms` : '0ms' 
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Solicitar Demo
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header