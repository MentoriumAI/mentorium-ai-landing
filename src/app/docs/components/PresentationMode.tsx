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

  // Parse HTML content into slides based on <hr class="rule"/> dividers
  const parseSlides = useCallback((html: string): Slide[] => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Remove any existing <hr class="rule"/> elements and split content
    const parts = html.split(/<hr[^>]*class="rule"[^>]*\/?>/gi);
    
    const slides: Slide[] = [];
    
    parts.forEach((part, index) => {
      if (part.trim()) {
        const slideDiv = document.createElement('div');
        slideDiv.innerHTML = part.trim();
        
        // Extract title from first h1, h2, or h3 in the slide
        const titleElement = slideDiv.querySelector('h1, h2, h3');
        const slideTitle = titleElement ? titleElement.textContent || undefined : undefined;
        
        // Check if content is too long and needs to be split
        const contentLength = slideDiv.textContent?.length || 0;
        const maxContentLength = 2500; // Adjust based on your needs
        
        if (contentLength > maxContentLength) {
          // Split long content into multiple slides
          const paragraphs = Array.from(slideDiv.querySelectorAll('p, li, h1, h2, h3, .card, .callout'));
          const splitSlides = splitContentIntoSlides(paragraphs, slideTitle, maxContentLength);
          slides.push(...splitSlides);
        } else {
          slides.push({
            id: `slide-${index}`,
            content: part.trim(),
            title: slideTitle
          });
        }
      }
    });

    return slides.length > 0 ? slides : [{ id: 'slide-0', content: html, title }];
  }, []);

  // Helper function to split long content into multiple slides
  const splitContentIntoSlides = (elements: Element[], baseTitle?: string, maxLength: number = 2500): Slide[] => {
    const slides: Slide[] = [];
    let currentSlideContent = '';
    let currentSlideElements: Element[] = [];
    let slideIndex = 0;

    for (const element of elements) {
      const elementText = element.textContent || '';
      const elementHtml = element.outerHTML;
      
      // If adding this element would exceed the limit and we have content, create a new slide
      if (currentSlideContent.length + elementText.length > maxLength && currentSlideElements.length > 0) {
        slides.push({
          id: `slide-split-${slideIndex++}`,
          content: currentSlideElements.map(el => el.outerHTML).join('\n'),
          title: baseTitle ? `${baseTitle} (${slideIndex})` : undefined
        });
        
        currentSlideContent = elementText;
        currentSlideElements = [element];
      } else {
        currentSlideContent += elementText;
        currentSlideElements.push(element);
      }
    }

    // Add the remaining content as the last slide
    if (currentSlideElements.length > 0) {
      slides.push({
        id: `slide-split-${slideIndex}`,
        content: currentSlideElements.map(el => el.outerHTML).join('\n'),
        title: baseTitle ? (slides.length > 0 ? `${baseTitle} (${slideIndex + 1})` : baseTitle) : undefined
      });
    }

    return slides;
  };

  // Initialize slides when component mounts or htmlContent changes
  useEffect(() => {
    if (htmlContent && isOpen) {
      const parsedSlides = parseSlides(htmlContent);
      setSlides(parsedSlides);
      setCurrentSlide(0);
    }
  }, [htmlContent, isOpen, parseSlides]);

  // Handle toolbar button interaction
  useEffect(() => {
    const toolbarBtn = document.getElementById('presentation-btn');
    const handleToolbarClick = () => {
      openPresentation();
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen || isTransitioning) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'Space':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          previousSlide();
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
  }, [isOpen, isTransitioning, slides.length, showKeyboardHints]);

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
  };

  const closePresentation = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsExiting(false);
      setCurrentSlide(0);
    }, 300);
  };

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      
      if (slideContentRef.current) {
        slideContentRef.current.classList.add('sliding-out-left');
      }
      
      setTimeout(() => {
        setCurrentSlide(prev => prev + 1);
        
        if (slideContentRef.current) {
          slideContentRef.current.classList.remove('sliding-out-left');
          slideContentRef.current.classList.add('sliding-in-right');
          
          setTimeout(() => {
            if (slideContentRef.current) {
              slideContentRef.current.classList.remove('sliding-in-right');
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
        slideContentRef.current.classList.add('sliding-out-right');
      }
      
      setTimeout(() => {
        setCurrentSlide(prev => prev - 1);
        
        if (slideContentRef.current) {
          slideContentRef.current.classList.remove('sliding-out-right');
          slideContentRef.current.classList.add('sliding-in-left');
          
          setTimeout(() => {
            if (slideContentRef.current) {
              slideContentRef.current.classList.remove('sliding-in-left');
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
      
      const direction = index > currentSlide ? 'left' : 'right';
      
      if (slideContentRef.current) {
        slideContentRef.current.classList.add(`sliding-out-${direction}`);
      }
      
      setTimeout(() => {
        setCurrentSlide(index);
        
        if (slideContentRef.current) {
          slideContentRef.current.classList.remove(`sliding-out-${direction}`);
          slideContentRef.current.classList.add(`sliding-in-${direction === 'left' ? 'right' : 'left'}`);
          
          setTimeout(() => {
            if (slideContentRef.current) {
              slideContentRef.current.classList.remove(`sliding-in-${direction === 'left' ? 'right' : 'left'}`);
              slideContentRef.current.classList.add('active');
            }
            setIsTransitioning(false);
          }, 50);
        }
      }, 200);
    }
  }, [currentSlide, slides.length, isTransitioning]);

  if (!isOpen) {
    return null; // Only show the toolbar button, no duplicate React button
  }

  const currentSlideData = slides[currentSlide];

  return (
    <div className={`presentation-overlay ${isExiting ? 'exiting' : ''}`}>
      <div className="presentation-header">
        <h2 className="presentation-title">{title}</h2>
        <div className="presentation-controls">
          <div className="presentation-progress">
            {currentSlide + 1} de {slides.length}
          </div>
          <button 
            className="presentation-close"
            onClick={closePresentation}
            type="button"
          >
            Cerrar
          </button>
        </div>
      </div>

      <div className="slide-container">
        {currentSlideData ? (
          <div 
            ref={slideContentRef}
            className="slide-content active"
            dangerouslySetInnerHTML={{ __html: currentSlideData.content }}
          />
        ) : (
          <div className="slide-content loading">
            Cargando presentación...
          </div>
        )}

        <div className={`keyboard-hints ${showKeyboardHints ? '' : 'hidden'}`}>
          Usa las flechas del teclado, barra espaciadora o los botones para navegar • ESC para salir
        </div>
      </div>

      <div className="presentation-nav">
        <button 
          className="nav-button"
          onClick={previousSlide}
          disabled={currentSlide === 0 || isTransitioning}
          type="button"
        >
          ← Anterior
        </button>

        <div className="slide-indicator">
          <div className="slide-dots">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`slide-dot ${index === currentSlide ? 'active' : ''}`}
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
        </div>

        <button 
          className="nav-button"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1 || isTransitioning}
          type="button"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}