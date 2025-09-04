'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import './presentation.css';

interface Slide {
  id: string;
  content: string;
  title?: string;
  type?: string;
}

interface ProcessingContext {
  baseTitle?: string;
}

interface PresentationRouteProps {
  initialSlide?: number;
  sourceDocsUrl?: string; // URL to fetch the docs page
  documentPath?: string;  // Legacy: path to HTML file 
  htmlContent?: string;   // Direct HTML content passed from server
  documentTitle: string;
  backUrl: string;
  presentationBasePath?: string;
}

export default function PresentationRoute({ 
  initialSlide = 0, 
  sourceDocsUrl,
  documentPath,
  htmlContent,
  documentTitle,
  backUrl,
  presentationBasePath 
}: PresentationRouteProps) {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showKeyboardHints, setShowKeyboardHints] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const slideContentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Simple slide splitter for slide-break elements
  class SlideSplitter {
    private context: ProcessingContext;
    
    constructor(baseTitle?: string) {
      this.context = {
        baseTitle
      };
    }
    
    processContent(html: string): Slide[] {
      // Simple slide-break based splitting
      let workingHtml = html;
      
      // Extract content between slides-start and slides-end if present
      const startPattern = /<slides-start\s*\/?>/i;
      const endPattern = /<slides-end\s*\/?>/i;
      
      const startMatch = html.match(startPattern);
      const endMatch = html.match(endPattern);
      
      if (startMatch && endMatch) {
        // Use only content between slides-start and slides-end
        const startIndex = html.indexOf(startMatch[0]) + startMatch[0].length;
        const endIndex = html.indexOf(endMatch[0]);
        workingHtml = html.substring(startIndex, endIndex);
      } else if (startMatch) {
        // If only slides-start is found, use content from there to end
        const startIndex = html.indexOf(startMatch[0]) + startMatch[0].length;
        workingHtml = html.substring(startIndex);
      }
      
      // Split by slide-break elements
      const slideContents = workingHtml
        .split(/<slide-break\s*\/?>/gi)
        .map(content => content.trim())
        .filter(content => content);
      
      // If no slide breaks found, treat entire content as one slide
      if (slideContents.length <= 1) {
        return [{
          id: 'slide-0',
          content: workingHtml,
          title: this.context.baseTitle || 'Presentación',
          type: 'standard'
        }];
      }
      
      // Create slides from split content
      return slideContents.map((content, index) => ({
        id: `slide-${index}`,
        content: content.trim(),
        title: this.extractTitle(content) || `${this.context.baseTitle} (${index + 1})`,
        type: 'standard'
      }));
    }
    
    // Extract title from slide content (first heading found)
    private extractTitle(html: string): string | null {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      const heading = tempDiv.querySelector('h1, h2, h3, h4, h5, h6');
      return heading ? heading.textContent : null;
    }
  }

  // Load content and generate slides
  useEffect(() => {
    // Don't run if we don't have any content source
    if (!htmlContent && !sourceDocsUrl && !documentPath) {
      return;
    }
    
    const loadContent = async () => {
      try {
        let mainContent: Element | null = null;
        
        if (htmlContent) {
          // Use HTML content passed as prop (server-side)
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = htmlContent;
          
          // Look for the main.page element within the content
          const innerMain = tempDiv.querySelector('main.page') || tempDiv.querySelector('main');
          if (innerMain) {
            mainContent = innerMain;
          } else {
            // Fallback: create a main element with all content
            mainContent = document.createElement('main');
            mainContent.innerHTML = htmlContent;
          }
        } else if (sourceDocsUrl) {
          // Use API endpoint to fetch HTML content (fallback)
          const apiPath = sourceDocsUrl.replace('/pages/', '/api/pages/');
          const response = await fetch(apiPath);
          if (!response.ok) {
            throw new Error(`Failed to load docs content: ${response.status}`);
          }
          
          const data = await response.json();
          if (!data.success || !data.content) {
            throw new Error('Invalid response from docs API');
          }
          
          // Create a temporary element to hold the content
          mainContent = document.createElement('main');
          mainContent.innerHTML = data.content;
        } else if (documentPath) {
          // Legacy approach: Fetch HTML file directly
          const response = await fetch(documentPath);
          if (!response.ok) {
            throw new Error(`Failed to load document file: ${response.status}`);
          }
          const html = await response.text();
          
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          mainContent = doc.querySelector('main') || doc.querySelector('.page') || doc.body;
        } else {
          throw new Error('No document source provided');
        }
        
        if (mainContent) {
          const splitter = new SlideSplitter(documentTitle);
          
          const generatedSlides = splitter.processContent(mainContent.innerHTML);
          console.log('First slide content preview:', generatedSlides[0]?.content?.substring(0, 200));
          console.log('First slide type:', generatedSlides[0]?.type);
          setSlides(generatedSlides);
          
          // Validate initial slide
          const validatedSlide = Math.max(0, Math.min(initialSlide, generatedSlides.length - 1));
          setCurrentSlide(validatedSlide);
        } else {
          throw new Error('No main content found in document');
        }
      } catch (error) {
        console.error('Error loading document:', error);
        const sourcePath = sourceDocsUrl || documentPath || 'unknown';
        setSlides([{
          id: 'error-slide',
          content: `<h1>Error</h1><p>No se pudo cargar el contenido del documento: ${sourcePath}</p><p>Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>`,
          title: 'Error',
          type: 'title'
        }]);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [htmlContent, sourceDocsUrl, documentPath, documentTitle, initialSlide]);

  // Update URL without page refresh
  const updateURL = useCallback((slideIndex: number) => {
    if (presentationBasePath) {
      // Use search params for the new generalized route
      const newUrl = `${presentationBasePath}?slide=${slideIndex + 1}`;
      router.replace(newUrl, { scroll: false });
    } else {
      // Fallback to the old path-based approach for backward compatibility
      const basePath = pathname.split('/').slice(0, -1).join('/');
      const newUrl = `${basePath}/${slideIndex + 1}`;
      if (pathname !== newUrl) {
        router.replace(newUrl, { scroll: false });
      }
    }
  }, [router, pathname, presentationBasePath]);

  // Navigation functions
  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      
      if (slideContentRef.current) {
        slideContentRef.current.classList.add('sliding-out-up');
      }
      
      setTimeout(() => {
        const newSlide = currentSlide + 1;
        setCurrentSlide(newSlide);
        updateURL(newSlide);
        
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
  }, [currentSlide, slides.length, isTransitioning, updateURL]);

  const previousSlide = useCallback(() => {
    if (currentSlide > 0 && !isTransitioning) {
      setIsTransitioning(true);
      
      if (slideContentRef.current) {
        slideContentRef.current.classList.add('sliding-out-down');
      }
      
      setTimeout(() => {
        const newSlide = currentSlide - 1;
        setCurrentSlide(newSlide);
        updateURL(newSlide);
        
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
  }, [currentSlide, isTransitioning, updateURL]);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length && index !== currentSlide && !isTransitioning) {
      setIsTransitioning(true);
      
      const direction = index > currentSlide ? 'up' : 'down';
      
      if (slideContentRef.current) {
        slideContentRef.current.classList.add(`sliding-out-${direction}`);
      }
      
      setTimeout(() => {
        setCurrentSlide(index);
        updateURL(index);
        
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
  }, [currentSlide, slides.length, isTransitioning, updateURL]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isTransitioning) return;

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
          e.preventDefault();
          if (e.key === 'ArrowRight') nextSlide();
          else previousSlide();
          break;
        case 'Escape':
          e.preventDefault();
          router.push(backUrl);
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

    document.addEventListener('keydown', handleKeyPress);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [isTransitioning, slides.length, showKeyboardHints, nextSlide, previousSlide, goToSlide, router, backUrl]);

  // Hide keyboard hints after 5 seconds
  useEffect(() => {
    if (showKeyboardHints) {
      const timer = setTimeout(() => {
        setShowKeyboardHints(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showKeyboardHints]);

  if (isLoading) {
    return (
      <div className="presentation-mode">
        <div className="presentation-slide">
          <div className="slide-content slide-loading">
            <div className="loading-spinner">Cargando presentación...</div>
          </div>
        </div>
      </div>
    );
  }

  const currentSlideData = slides[currentSlide];

  return (
    <div className="presentation-mode">
      {/* Main slide area - full screen */}
      <div className="presentation-slide">
        {currentSlideData ? (
          <div 
            ref={slideContentRef}
            className={`slide-content ${currentSlideData.type ? `slide-${currentSlideData.type}` : 'slide-standard'}`}
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
        {/* Close button - goes back to document page */}
        <button 
          className="sidebar-close"
          onClick={() => router.push(backUrl)}
          type="button"
          aria-label="Volver al documento"
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