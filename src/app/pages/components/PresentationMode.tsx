'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import './presentation.css';

interface Slide {
  id: string;
  content: string;
  title?: string;
  type?: 'title' | 'bullet' | 'visual' | 'quote' | 'summary' | 'standard' | 'continuation';
  lineCount?: number;
  elements?: string[];
  continuationOf?: string;
}

interface ElementInfo {
  element: Element;
  type: 'text' | 'card' | 'image' | 'code' | 'table' | 'list' | 'heading' | 'paragraph';
  estimatedLines: number;
  visualWeight: number;
  isAtomic: boolean;
  content: string;
  headingLevel?: number;
}

interface ProcessingContext {
  baseTitle?: string;
  viewportHeight: number;
  viewportWidth: number;
  targetLinesPerSlide: number;
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

  // Content Measurer for accurate line counting and content analysis
  class ContentMeasurer {
    static analyzeElement(element: Element, _: ProcessingContext): ElementInfo {
      const tagName = element.tagName.toLowerCase();
      const textContent = element.textContent || '';
      const charCount = textContent.length;
      
      let type: ElementInfo['type'] = 'text';
      let estimatedLines = 1;
      let visualWeight = 1; // Visual impact factor
      let isAtomic = false;
      let headingLevel: number | undefined;
      
      switch (tagName) {
        case 'h1':
          type = 'heading';
          headingLevel = 1;
          estimatedLines = 2;
          visualWeight = 3;
          isAtomic = true;
          break;
        case 'h2':
          type = 'heading';
          headingLevel = 2;
          estimatedLines = 1.5;
          visualWeight = 2;
          isAtomic = true;
          break;
        case 'h3':
          type = 'heading';
          headingLevel = 3;
          estimatedLines = 1;
          visualWeight = 1.5;
          isAtomic = true;
          break;
        case 'p':
          type = 'paragraph';
          estimatedLines = Math.max(1, Math.ceil(charCount / 80)); // ~80 chars per line
          visualWeight = 1;
          isAtomic = estimatedLines <= 3; // Small paragraphs are atomic
          break;
        case 'pre':
        case 'code':
          type = 'code';
          const codeLines = Math.max(1, textContent.split('\n').length);
          estimatedLines = codeLines;
          visualWeight = 2; // Code blocks are visually heavier
          isAtomic = true; // Never split code blocks
          break;
        case 'table':
          type = 'table';
          const tableRows = element.querySelectorAll('tr').length;
          estimatedLines = tableRows + 1; // +1 for spacing
          visualWeight = 3; // Tables are visually heavy
          isAtomic = true; // Never split tables
          break;
        case 'ul':
        case 'ol':
          type = 'list';
          const listItems = element.querySelectorAll('li').length;
          estimatedLines = listItems;
          visualWeight = 1.2; // Lists have some visual weight
          isAtomic = listItems <= 5; // Small lists are atomic
          break;
        case 'img':
          type = 'image';
          estimatedLines = 6; // Images take significant space
          visualWeight = 5; // Very high visual impact
          isAtomic = true;
          break;
        default:
          if (element.classList.contains('card')) {
            type = 'card';
            estimatedLines = Math.ceil(charCount / 60);
            visualWeight = 2;
            isAtomic = true;
          } else if (element.classList.contains('callout')) {
            type = 'text';
            estimatedLines = Math.ceil(charCount / 70);
            visualWeight = 2;
            isAtomic = true;
          } else {
            type = 'text';
            estimatedLines = Math.max(1, Math.ceil(charCount / 80));
            visualWeight = 1;
            isAtomic = estimatedLines <= 2;
          }
      }
      
      return {
        element,
        type,
        estimatedLines,
        visualWeight,
        isAtomic,
        content: element.outerHTML,
        headingLevel
      };
    }
    
    static getTotalLines(elements: ElementInfo[]): number {
      return elements.reduce((total, el) => total + el.estimatedLines, 0);
    }

    static getTotalVisualWeight(elements: ElementInfo[]): number {
      return elements.reduce((total, el) => total + (el.estimatedLines * el.visualWeight), 0);
    }

    static determineSlideType(elements: ElementInfo[], content: string): Slide['type'] {
      const elementTypes = elements.map(el => el.type);
      const hasOnlyHeadings = elementTypes.every(type => type === 'heading');
      const hasLists = elementTypes.includes('list');
      const hasImages = elementTypes.includes('image');
      const hasCards = elementTypes.includes('card');
      const textLength = content.replace(/<[^>]*>/g, '').length;
      
      if (hasOnlyHeadings && textLength < 100) return 'title';
      if (hasImages || hasCards) return 'visual';
      if (hasLists) return 'bullet';
      if (content.includes('callout') || content.includes('blockquote')) return 'quote';
      if (textLength < 200 && elements.length <= 2) return 'summary';
      
      return 'standard';
    }

    static findOptimalDivision(totalLines: number, targetLines: number): number {
      const possibleDivisions = [2, 3, 4, 5, 6];
      let bestDivision = 2;
      let bestScore = Infinity;
      
      for (const division of possibleDivisions) {
        const linesPerSlide = totalLines / division;
        const score = Math.abs(linesPerSlide - targetLines);
        if (score < bestScore) {
          bestScore = score;
          bestDivision = division;
        }
      }
      
      return bestDivision;
    }
  }
  
  // Three-stage slide splitter system
  class SlideSplitter {
    private context: ProcessingContext;
    
    constructor(baseTitle?: string, viewportHeight?: number, viewportWidth?: number) {
      this.context = {
        baseTitle,
        viewportHeight: viewportHeight || window.innerHeight,
        viewportWidth: viewportWidth || window.innerWidth,
        targetLinesPerSlide: Math.max(8, Math.min(12, Math.floor((viewportHeight || window.innerHeight) / 80)))
      };
    }
    
    processContent(html: string): Slide[] {
      // Stage 1: Split by sections
      const sections = this.splitBySections(html);
      
      const allSlides: Slide[] = [];
      
      sections.forEach((section, sectionIndex) => {
        if (section.trim()) {
          // Stage 2: Split each section by headings
          const headingBasedSlides = this.splitByHeadings(section, sectionIndex);
          
          // Stage 3: Split by content length if needed
          headingBasedSlides.forEach(slide => {
            const lengthBasedSlides = this.splitByContentLength(slide, allSlides.length);
            allSlides.push(...lengthBasedSlides);
          });
        }
      });
      
      return allSlides.length > 0 ? allSlides : [{
        id: 'slide-0',
        content: html,
        title: this.context.baseTitle || 'Presentación',
        type: 'title'
      }];
    }
    
    // Stage 1: Split by sections (HR tags with class="rule")
    private splitBySections(html: string): string[] {
      return html.split(/<hr[^>]*class="rule"[^>]*\/?>/gi).filter(section => section.trim());
    }
    
    // Stage 2: Split by headings - one heading per slide maximum
    private splitByHeadings(sectionHtml: string, sectionIndex: number): Slide[] {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = sectionHtml;
      const elements = Array.from(tempDiv.children);
      
      if (elements.length === 0) return [];
      
      // Find all headings
      const headingIndices: { index: number; level: number; element: Element }[] = [];
      elements.forEach((element, index) => {
        const level = this.getHeadingLevel(element);
        if (level > 0) {
          headingIndices.push({ index, level, element });
        }
      });
      
      const slides: Slide[] = [];
      
      if (headingIndices.length === 0) {
        // No headings - treat entire section as one slide
        const analyzedElements = elements.map(el => ContentMeasurer.analyzeElement(el, this.context));
        const slideContent = elements.map(el => el.outerHTML).join('\n');
        const slideType = ContentMeasurer.determineSlideType(analyzedElements, slideContent);
        
        slides.push({
          id: `slide-section-${sectionIndex}`,
          content: slideContent,
          title: this.context.baseTitle || 'Contenido',
          type: slideType,
          lineCount: ContentMeasurer.getTotalLines(analyzedElements)
        });
      } else {
        // Handle content before first heading
        if (headingIndices[0].index > 0) {
          const preElements = elements.slice(0, headingIndices[0].index);
          const analyzedElements = preElements.map(el => ContentMeasurer.analyzeElement(el, this.context));
          const slideContent = preElements.map(el => el.outerHTML).join('\n');
          const slideType = ContentMeasurer.determineSlideType(analyzedElements, slideContent);
          
          slides.push({
            id: `slide-section-${sectionIndex}-pre`,
            content: slideContent,
            title: this.context.baseTitle || 'Contenido',
            type: slideType,
            lineCount: ContentMeasurer.getTotalLines(analyzedElements)
          });
        }
        
        // Create slides for each heading and its content
        headingIndices.forEach((heading, headingIndex) => {
          const startIndex = heading.index;
          const endIndex = headingIndices[headingIndex + 1]?.index || elements.length;
          
          const slideElements = elements.slice(startIndex, endIndex);
          const analyzedElements = slideElements.map(el => ContentMeasurer.analyzeElement(el, this.context));
          const slideContent = slideElements.map(el => el.outerHTML).join('\n');
          const slideType = ContentMeasurer.determineSlideType(analyzedElements, slideContent);
          const headingTitle = heading.element.textContent || this.context.baseTitle || 'Contenido';
          
          slides.push({
            id: `slide-section-${sectionIndex}-h${heading.level}-${headingIndex}`,
            content: slideContent,
            title: headingTitle,
            type: slideType,
            lineCount: ContentMeasurer.getTotalLines(analyzedElements)
          });
        });
      }
      
      return slides;
    }
    
    // Stage 3: Split by content length with intelligent division
    private splitByContentLength(slide: Slide, slideIndex: number): Slide[] {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = slide.content;
      const elements = Array.from(tempDiv.children);
      
      if (elements.length === 0) return [slide];
      
      const analyzedElements = elements.map(el => ContentMeasurer.analyzeElement(el, this.context));
      const totalLines = ContentMeasurer.getTotalLines(analyzedElements);
      
      // If content fits in target, return as-is
      if (totalLines <= this.context.targetLinesPerSlide) {
        return [slide];
      }
      
      // Find the heading (if any) to repeat on each slide
      const headingElement = analyzedElements.find(el => el.type === 'heading');
      const nonHeadingElements = analyzedElements.filter(el => el.type !== 'heading');
      
      if (nonHeadingElements.length === 0) {
        return [slide]; // Only headings, can't split further
      }
      
      // Calculate optimal division
      const nonHeadingLines = ContentMeasurer.getTotalLines(nonHeadingElements);
      const availableLinesPerSlide = this.context.targetLinesPerSlide - (headingElement ? headingElement.estimatedLines : 0);
      const optimalDivisions = ContentMeasurer.findOptimalDivision(nonHeadingLines, availableLinesPerSlide);
      
      return this.createContentDivisionSlides(slide, headingElement, nonHeadingElements, optimalDivisions, slideIndex);
    }
    
    private createContentDivisionSlides(
      originalSlide: Slide, 
      heading: ElementInfo | undefined,
      contentElements: ElementInfo[], 
      divisions: number,
      _: number
    ): Slide[] {
      const slides: Slide[] = [];
      const elementsPerSlide = Math.ceil(contentElements.length / divisions);
      
      for (let i = 0; i < divisions; i++) {
        const startIndex = i * elementsPerSlide;
        const endIndex = Math.min(startIndex + elementsPerSlide, contentElements.length);
        const slideElements = contentElements.slice(startIndex, endIndex);
        
        let slideContent = '';
        
        // Add heading to each slide
        if (heading) {
          slideContent += heading.content + '\n';
        }
        
        // Add content elements
        slideContent += slideElements.map(el => el.content).join('\n');
        
        const allElements = heading ? [heading, ...slideElements] : slideElements;
        const slideType = i === 0 ? originalSlide.type : 'continuation';
        const slideTitle = originalSlide.title + (i > 0 ? ` (${i + 1})` : '');
        
        slides.push({
          id: `${originalSlide.id}-part-${i + 1}`,
          content: slideContent,
          title: slideTitle,
          type: slideType,
          lineCount: ContentMeasurer.getTotalLines(allElements),
          continuationOf: i > 0 ? slides[0].id : undefined
        });
      }
      
      return slides;
    }
    
    private getHeadingLevel(element: Element): number {
      const tagName = element.tagName.toLowerCase();
      switch (tagName) {
        case 'h1': return 1;
        case 'h2': return 2;
        case 'h3': return 3;
        default: return 0;
      }
    }
  }
  
  // Parse HTML content using the three-stage splitter
  const parseSlides = useCallback((html: string): Slide[] => {
    const splitter = new SlideSplitter(
      title,
      window.innerHeight,
      window.innerWidth
    );
    
    return splitter.processContent(html);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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