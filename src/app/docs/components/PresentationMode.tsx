'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import './presentation.css';

interface Slide {
  id: string;
  content: string;
  title?: string;
  type?: 'first' | 'standard' | 'card-focused' | 'section-break' | 'continuation';
  lineCount?: number;
  elements?: string[];
  continuationOf?: string;
}

interface SlideRule {
  name: string;
  priority: number;
  apply(content: string, context: SlideContext): SlideResult;
}

interface SlideContext {
  isFirst: boolean;
  baseTitle?: string;
  slideIndex: number;
  previousSlides: Slide[];
  maxLines: number;
}

interface SlideResult {
  slides: Slide[];
  shouldContinue: boolean;
}

interface ElementInfo {
  element: Element;
  type: 'text' | 'card' | 'image' | 'code' | 'table' | 'list' | 'heading';
  estimatedLines: number;
  isAtomic: boolean;
  content: string;
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

  // Content Analyzer for measuring lines and element types
  class ContentAnalyzer {
    static analyzeElement(element: Element): ElementInfo {
      const tagName = element.tagName.toLowerCase();
      const textContent = element.textContent || '';
      
      let type: ElementInfo['type'] = 'text';
      let estimatedLines = 1;
      let isAtomic = false;
      
      switch (tagName) {
        case 'h1':
        case 'h2':
        case 'h3':
          type = 'heading';
          estimatedLines = 1;
          isAtomic = true;
          break;
        case 'pre':
        case 'code':
          type = 'code';
          estimatedLines = Math.max(1, textContent.split('\n').length);
          isAtomic = true;
          break;
        case 'table':
          type = 'table';
          estimatedLines = Math.max(3, element.querySelectorAll('tr').length);
          isAtomic = true;
          break;
        case 'ul':
        case 'ol':
          type = 'list';
          estimatedLines = element.querySelectorAll('li').length;
          break;
        case 'img':
          type = 'image';
          estimatedLines = 3; // Image takes visual space
          isAtomic = true;
          break;
        default:
          if (element.classList.contains('card')) {
            type = 'card';
            estimatedLines = Math.max(2, Math.ceil(textContent.length / 100));
            isAtomic = textContent.length > 300; // Large cards are atomic
          } else if (element.classList.contains('callout')) {
            type = 'text';
            estimatedLines = Math.max(1, Math.ceil(textContent.length / 80));
            isAtomic = true;
          } else {
            estimatedLines = Math.max(1, Math.ceil(textContent.length / 80));
          }
      }
      
      return {
        element,
        type,
        estimatedLines,
        isAtomic,
        content: element.outerHTML
      };
    }
    
    static getTotalLines(elements: ElementInfo[]): number {
      return elements.reduce((total, el) => total + el.estimatedLines, 0);
    }
  }
  
  // Slide Rule Engine
  class SlideRuleEngine {
    private rules: SlideRule[] = [];
    
    addRule(rule: SlideRule) {
      this.rules.push(rule);
      this.rules.sort((a, b) => a.priority - b.priority);
    }
    
    processContent(html: string, baseTitle?: string): Slide[] {
      const slides: Slide[] = [];
      const parts = html.split(/<hr[^>]*class="rule"[^>]*\/?>/gi);
      
      parts.forEach((part, partIndex) => {
        if (part.trim()) {
          const context: SlideContext = {
            isFirst: partIndex === 0 && slides.length === 0,
            baseTitle,
            slideIndex: slides.length,
            previousSlides: [...slides],
            maxLines: 5
          };
          
          const result = this.applyRules(part.trim(), context);
          slides.push(...result.slides);
        }
      });
      
      return slides.length > 0 ? slides : [{
        id: 'slide-0',
        content: html,
        title: baseTitle,
        type: 'first'
      }];
    }
    
    private applyRules(content: string, context: SlideContext): SlideResult {
      for (const rule of this.rules) {
        const result = rule.apply(content, context);
        if (result.slides.length > 0) {
          return result;
        }
      }
      
      // Fallback: create a single standard slide
      return {
        slides: [{
          id: `slide-${context.slideIndex}`,
          content,
          title: this.extractTitle(content),
          type: context.isFirst ? 'first' : 'standard'
        }],
        shouldContinue: false
      };
    }
    
    private extractTitle(html: string): string | undefined {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      const titleElement = tempDiv.querySelector('h1, h2, h3');
      return titleElement?.textContent || undefined;
    }
  }
  
  // Parse HTML content using the rule-based engine
  const parseSlides = useCallback((html: string): Slide[] => {
    const engine = new SlideRuleEngine();
    
    // Add rules in priority order
    engine.addRule(new FirstSlideRule());
    engine.addRule(new CardFocusedRule());
    engine.addRule(new LineCountRule());
    engine.addRule(new StandardRule());
    
    return engine.processContent(html, title);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  // Concrete Rule Implementations
  class FirstSlideRule implements SlideRule {
    name = 'FirstSlideRule';
    priority = 1;
    
    apply(content: string, context: SlideContext): SlideResult {
      if (!context.isFirst) {
        return { slides: [], shouldContinue: true };
      }
      
      return {
        slides: [{
          id: 'slide-first',
          content,
          title: context.baseTitle,
          type: 'first',
          lineCount: 0, // No line limit for first slide
          elements: ['logo', 'title', 'styling-line']
        }],
        shouldContinue: false
      };
    }
  }
  
  class CardFocusedRule implements SlideRule {
    name = 'CardFocusedRule';
    priority = 2;
    
    apply(content: string, context: SlideContext): SlideResult {
      if (context.isFirst) {
        return { slides: [], shouldContinue: true };
      }
      
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const cards = Array.from(tempDiv.querySelectorAll('.card'));
      
      if (cards.length === 1) {
        const cardInfo = ContentAnalyzer.analyzeElement(cards[0]);
        
        // If card is large enough to warrant its own slide
        if (cardInfo.isAtomic && cardInfo.estimatedLines > 3) {
          return {
            slides: [{
              id: `slide-card-${context.slideIndex}`,
              content,
              title: this.extractOrCreateTitle(content, context),
              type: 'card-focused',
              lineCount: cardInfo.estimatedLines,
              elements: ['card']
            }],
            shouldContinue: false
          };
        }
      }
      
      return { slides: [], shouldContinue: true };
    }
    
    private extractOrCreateTitle(content: string, context: SlideContext): string {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const existingTitle = tempDiv.querySelector('h2, h3');
      return existingTitle?.textContent || `${context.baseTitle || 'Contenido'}`;
    }
  }
  
  class LineCountRule implements SlideRule {
    name = 'LineCountRule';
    priority = 3;
    
    apply(content: string, context: SlideContext): SlideResult {
      if (context.isFirst) {
        return { slides: [], shouldContinue: true };
      }
      
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const elements = Array.from(tempDiv.children);
      
      if (elements.length === 0) {
        return { slides: [], shouldContinue: true };
      }
      
      const analyzedElements = elements.map(el => ContentAnalyzer.analyzeElement(el));
      const totalLines = ContentAnalyzer.getTotalLines(analyzedElements);
      
      if (totalLines <= context.maxLines) {
        // Content fits in one slide
        return {
          slides: [{
            id: `slide-${context.slideIndex}`,
            content: this.ensureTitle(content, context),
            title: this.extractOrCreateTitle(content, context),
            type: 'standard',
            lineCount: totalLines,
            elements: analyzedElements.map(el => el.type)
          }],
          shouldContinue: false
        };
      } else {
        // Content needs to be split
        return this.splitContent(analyzedElements, context);
      }
    }
    
    private splitContent(elements: ElementInfo[], context: SlideContext): SlideResult {
      const slides: Slide[] = [];
      let currentElements: ElementInfo[] = [];
      let currentLines = 0;
      let slideIndex = 0;
      
      // Always start with a title (h2)
      let needsTitle = true;
      
      for (const element of elements) {
        // If this element would exceed the limit and we have content
        if (currentLines + element.estimatedLines > context.maxLines && currentElements.length > 0) {
          // Create slide with current elements
          const slideContent = this.buildSlideContent(currentElements, context, slideIndex, needsTitle);
          slides.push({
            id: `slide-${context.slideIndex}-${slideIndex++}`,
            content: slideContent,
            title: this.generateTitle(context, slideIndex),
            type: slideIndex > 1 ? 'continuation' : 'standard',
            lineCount: currentLines,
            elements: currentElements.map(el => el.type),
            continuationOf: slideIndex > 1 ? slides[slides.length - 1]?.id : undefined
          });
          
          // Start new slide
          currentElements = [element];
          currentLines = element.estimatedLines + (needsTitle ? 1 : 0); // +1 for title
          needsTitle = true;
        } else {
          currentElements.push(element);
          currentLines += element.estimatedLines;
          if (element.type === 'heading') needsTitle = false;
        }
      }
      
      // Add remaining elements
      if (currentElements.length > 0) {
        const slideContent = this.buildSlideContent(currentElements, context, slideIndex, needsTitle);
        slides.push({
          id: `slide-${context.slideIndex}-${slideIndex}`,
          content: slideContent,
          title: this.generateTitle(context, slideIndex + 1),
          type: slideIndex > 0 ? 'continuation' : 'standard',
          lineCount: currentLines,
          elements: currentElements.map(el => el.type),
          continuationOf: slideIndex > 0 ? slides[slides.length - 1]?.id : undefined
        });
      }
      
      return { slides, shouldContinue: false };
    }
    
    private buildSlideContent(elements: ElementInfo[], context: SlideContext, slideIndex: number, needsTitle: boolean): string {
      let content = '';
      
      // Add title if needed
      if (needsTitle && !elements.some(el => el.type === 'heading')) {
        const title = this.generateTitle(context, slideIndex + 1);
        content += `<h2>${title}</h2>\n`;
      }
      
      // Add elements
      content += elements.map(el => el.content).join('\n');
      
      return content;
    }
    
    private generateTitle(context: SlideContext, partNumber: number): string {
      if (partNumber === 1) {
        return context.baseTitle || 'Contenido';
      }
      return `${context.baseTitle || 'Contenido'} (${partNumber})`;
    }
    
    private ensureTitle(content: string, context: SlideContext): string {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const hasTitle = tempDiv.querySelector('h2, h3');
      
      if (!hasTitle) {
        const title = context.baseTitle || 'Contenido';
        return `<h2>${title}</h2>\n${content}`;
      }
      
      return content;
    }
    
    private extractOrCreateTitle(content: string, context: SlideContext): string {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const titleElement = tempDiv.querySelector('h2, h3');
      return titleElement?.textContent || context.baseTitle || 'Contenido';
    }
  }
  
  class StandardRule implements SlideRule {
    name = 'StandardRule';
    priority = 4;
    
    apply(content: string, context: SlideContext): SlideResult {
      // Fallback rule - always applies
      const title = this.extractOrCreateTitle(content, context);
      
      return {
        slides: [{
          id: `slide-${context.slideIndex}`,
          content: context.isFirst ? content : this.ensureTitle(content, context),
          title,
          type: context.isFirst ? 'first' : 'standard'
        }],
        shouldContinue: false
      };
    }
    
    private extractOrCreateTitle(content: string, context: SlideContext): string {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const titleElement = tempDiv.querySelector('h2, h3');
      return titleElement?.textContent || context.baseTitle || 'Contenido';
    }
    
    private ensureTitle(content: string, context: SlideContext): string {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const hasTitle = tempDiv.querySelector('h2');
      
      if (!hasTitle) {
        const title = context.baseTitle || 'Contenido';
        return `<h2>${title}</h2>\n${content}`;
      }
      
      return content;
    }
  }

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
  };

  const closePresentation = () => {
    setIsExiting(true);
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
    <div className={`presentation-overlay ${isExiting ? 'exiting' : ''}`}>
      {currentSlideData?.type !== 'first' && (
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
      )}

      <div className="slide-container">
        {currentSlideData?.type === 'first' && (
          <button 
            className="first-slide-close"
            onClick={closePresentation}
            type="button"
            aria-label="Cerrar presentación"
          >
            ✕
          </button>
        )}
        
        {currentSlideData ? (
          <div 
            ref={slideContentRef}
            className={`slide-content active ${currentSlideData.type ? `slide-${currentSlideData.type}` : ''}`}
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