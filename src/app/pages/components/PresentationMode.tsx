'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import './presentation.css';

interface Slide {
  id: string;
  content: string;
  title?: string;
}

interface PresentationModeProps {
  htmlContent: string;
  title?: string;
}

export default function PresentationMode({ htmlContent, title = 'Presentación' }: PresentationModeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showKeyboardHints, setShowKeyboardHints] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const slideContentRef = useRef<HTMLDivElement>(null);

  // This component no longer handles slide splitting - that's done by PresentationRoute.tsx
  
  // Slide parsing is now handled by PresentationRoute.tsx
  const parseSlides = useCallback((html: string): Slide[] => {
    // This is no longer used - PresentationRoute.tsx handles slide splitting
    return [];
  }, [title]);


  // Initialize slides when component mounts or htmlContent changes
  useEffect(() => {
    if (htmlContent && isOpen) {
      const parsedSlides = parseSlides(htmlContent);
      setSlides(parsedSlides);
      setCurrentSlide(0);
    }
  }, [htmlContent, isOpen, parseSlides]);

  // Handle toolbar button interaction - now redirects to generalized presentation route
  useEffect(() => {
    const toolbarBtn = document.getElementById('presentation-btn');
    const handleToolbarClick = () => {
      // Get current path and convert /pages/... to /presentacion/...
      const currentPath = window.location.pathname;
      
      if (currentPath.startsWith('/pages/')) {
        // Remove '/pages/' prefix and create presentation URL
        const pagesPath = currentPath.substring(7); // Remove '/pages/'
        const presentationUrl = `/presentacion/${pagesPath}?slide=1`;
        window.location.href = presentationUrl;
      } else {
        // Fallback for non-docs pages
        window.location.href = '/presentacion/pacasmayo?slide=1';
      }
    };

    if (toolbarBtn) {
      toolbarBtn.addEventListener('click', handleToolbarClick);
    }

    return () => {
      if (toolbarBtn) {
        toolbarBtn.removeEventListener('click', handleToolbarClick);
      }
    };
  }, []);

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      
      if (slideContentRef.current) {
        slideContentRef.current.classList.add('sliding-out-up');
      }
      
      setTimeout(() => {
        setCurrentSlide(prev => prev + 1);
        
        if (slideContentRef.current) {
          slideContentRef.current.classList.remove('sliding-out-up');
          slideContentRef.current.classList.add('sliding-in-down');
          
          setTimeout(() => {
            if (slideContentRef.current) {
              slideContentRef.current.classList.remove('sliding-in-down');
              slideContentRef.current.classList.add('active');
            }
            setIsTransitioning(false);
          }, 50);
        }
      }, 200);
    }
  }, [currentSlide, slides.length, isTransitioning]);

  const previousSlide = useCallback(() => {
    if (currentSlide > 0 && !isTransitioning) {
      setIsTransitioning(true);
      
      if (slideContentRef.current) {
        slideContentRef.current.classList.add('sliding-out-down');
      }
      
      setTimeout(() => {
        setCurrentSlide(prev => prev - 1);
        
        if (slideContentRef.current) {
          slideContentRef.current.classList.remove('sliding-out-down');
          slideContentRef.current.classList.add('sliding-in-up');
          
          setTimeout(() => {
            if (slideContentRef.current) {
              slideContentRef.current.classList.remove('sliding-in-up');
              slideContentRef.current.classList.add('active');
            }
            setIsTransitioning(false);
          }, 50);
        }
      }, 200);
    }
  }, [currentSlide, isTransitioning]);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length && index !== currentSlide && !isTransitioning) {
      setIsTransitioning(true);
      
      const direction = index > currentSlide ? 'up' : 'down';
      
      if (slideContentRef.current) {
        slideContentRef.current.classList.add(`sliding-out-${direction}`);
      }
      
      setTimeout(() => {
        setCurrentSlide(index);
        
        if (slideContentRef.current) {
          slideContentRef.current.classList.remove(`sliding-out-${direction}`);
          slideContentRef.current.classList.add(`sliding-in-${direction === 'up' ? 'down' : 'up'}`);
          
          setTimeout(() => {
            if (slideContentRef.current) {
              slideContentRef.current.classList.remove(`sliding-in-${direction === 'up' ? 'down' : 'up'}`);
              slideContentRef.current.classList.add('active');
            }
            setIsTransitioning(false);
          }, 50);
        }
      }, 200);
    }
  }, [currentSlide, slides.length, isTransitioning]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen || isTransitioning) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'Space':
        case 'PageDown':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          previousSlide();
          break;
        case 'ArrowRight':
        case 'ArrowLeft':
          // Still allow horizontal arrows for backwards compatibility
          e.preventDefault();
          if (e.key === 'ArrowRight') nextSlide();
          else previousSlide();
          break;
        case 'Escape':
          e.preventDefault();
          closePresentation();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(slides.length - 1);
          break;
      }
      
      // Hide keyboard hints after first interaction
      if (showKeyboardHints) {
        setShowKeyboardHints(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress);
      // Hide body scroll when presentation is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isTransitioning, slides.length, showKeyboardHints, nextSlide, previousSlide, goToSlide]);

  // Hide keyboard hints after 5 seconds
  useEffect(() => {
    if (isOpen && showKeyboardHints) {
      const timer = setTimeout(() => {
        setShowKeyboardHints(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, showKeyboardHints]);

  const openPresentation = () => {
    setIsOpen(true);
    setIsExiting(false);
    setShowKeyboardHints(true);
    // Hide toolbar in presentation mode
    document.body.classList.add('presentation-active');
  };

  const closePresentation = () => {
    setIsExiting(true);
    // Show toolbar again
    document.body.classList.remove('presentation-active');
    setTimeout(() => {
      setIsOpen(false);
      setIsExiting(false);
      setCurrentSlide(0);
    }, 300);
  };


  if (!isOpen) {
    return null; // Only show the toolbar button, no duplicate React button
  }

  const currentSlideData = slides[currentSlide];

  return (
    <div className={`presentation-mode ${isExiting ? 'exiting' : ''}`}>
      {/* Main slide area - full screen */}
      <div className="presentation-slide">
        {currentSlideData ? (
          <div 
            ref={slideContentRef}
            className="slide-content"
            dangerouslySetInnerHTML={{ __html: currentSlideData.content }}
          />
        ) : (
          <div className="slide-content slide-loading">
            <div className="loading-spinner">Preparando presentación...</div>
          </div>
        )}
      </div>

      {/* Vertical sidebar navigation */}
      <div className="presentation-sidebar">
        {/* Close button */}
        <button 
          className="sidebar-close"
          onClick={closePresentation}
          type="button"
          aria-label="Cerrar presentación"
        >
          ✕
        </button>

        {/* Slide progress */}
        <div className="sidebar-progress">
          <span className="current-slide">{currentSlide + 1}</span>
          <div className="progress-divider"></div>
          <span className="total-slides">{slides.length}</span>
        </div>

        {/* Vertical navigation */}
        <div className="sidebar-nav">
          <button 
            className="nav-up"
            onClick={previousSlide}
            disabled={currentSlide === 0 || isTransitioning}
            type="button"
            aria-label="Diapositiva anterior"
          >
            ↑
          </button>

          {/* Vertical slide dots */}
          <div className="sidebar-dots">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`sidebar-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goToSlide(index);
                  }
                }}
                aria-label={`Ir a la diapositiva ${index + 1}`}
              />
            ))}
          </div>

          <button 
            className="nav-down"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1 || isTransitioning}
            type="button"
            aria-label="Siguiente diapositiva"
          >
            ↓
          </button>
        </div>

        {/* Keyboard hints */}
        <div className={`sidebar-hints ${showKeyboardHints ? '' : 'hidden'}`}>
          <div className="hint">↑↓</div>
          <div className="hint-text">ESC</div>
        </div>
      </div>
    </div>
  );
}