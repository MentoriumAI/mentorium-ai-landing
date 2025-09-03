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
  viewportHeight?: number;
  viewportWidth?: number;
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
    static analyzeElement(element: Element, viewportHeight?: number): ElementInfo {
      const tagName = element.tagName.toLowerCase();
      const textContent = element.textContent || '';
      const vh = viewportHeight || window.innerHeight;
      
      // Calculate maximum allowed lines based on viewport height
      // Assuming ~50-60px per line for readability in presentations
      const maxLinesPerSlide = Math.floor(vh / 80); // Conservative estimate
      
      let type: ElementInfo['type'] = 'text';
      let estimatedLines = 1;
      let isAtomic = false;
      
      switch (tagName) {
        case 'h1':
          type = 'heading';
          estimatedLines = 2; // H1 takes more visual space
          isAtomic = true;
          break;
        case 'h2':
          type = 'heading';
          estimatedLines = 1.5; // H2 takes moderate space
          isAtomic = true;
          break;
        case 'h3':
          type = 'heading';
          estimatedLines = 1;
          isAtomic = true;
          break;
        case 'pre':
        case 'code':
          type = 'code';
          const codeLines = Math.max(1, textContent.split('\n').length);
          estimatedLines = Math.min(codeLines, maxLinesPerSlide); // Cap code blocks
          isAtomic = codeLines <= maxLinesPerSlide; // Only atomic if it fits
          break;
        case 'table':
          type = 'table';
          const tableRows = element.querySelectorAll('tr').length;
          estimatedLines = Math.min(tableRows + 1, maxLinesPerSlide); // +1 for header spacing
          isAtomic = tableRows <= maxLinesPerSlide - 2; // Leave room for title
          break;
        case 'ul':
        case 'ol':
          type = 'list';
          const listItems = element.querySelectorAll('li').length;
          estimatedLines = Math.min(listItems, 3); // Max 3 list items per slide
          isAtomic = listItems <= 3;
          break;
        case 'img':
          type = 'image';
          estimatedLines = Math.floor(maxLinesPerSlide * 0.6); // Images take significant space
          isAtomic = true;
          break;
        default:
          if (element.classList.contains('card')) {
            type = 'card';
            const cardLines = Math.ceil(textContent.length / 50); // Shorter line estimate for cards
            estimatedLines = Math.min(cardLines, maxLinesPerSlide - 1);
            isAtomic = cardLines <= maxLinesPerSlide - 1; // Leave room for title
          } else if (element.classList.contains('callout')) {
            type = 'text';
            const calloutLines = Math.ceil(textContent.length / 60);
            estimatedLines = Math.min(calloutLines, maxLinesPerSlide - 1);
            isAtomic = true;
          } else {
            // Regular paragraphs - be very conservative
            const paraLines = Math.ceil(textContent.length / 100); // Longer line estimate
            estimatedLines = Math.min(paraLines, 2); // Max 2 lines of regular text
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

    static determineSlideType(elements: ElementInfo[], content: string): Slide['type'] {
      const elementTypes = elements.map(el => el.type);
      const hasOnlyHeadings = elementTypes.every(type => type === 'heading');
      const hasLists = elementTypes.includes('list');
      const hasImages = elementTypes.includes('image');
      const hasCards = elementTypes.includes('card');
      const textLength = content.replace(/<[^>]*>/g, '').length;
      
      // Title slide: Only headings with minimal text
      if (hasOnlyHeadings && textLength < 100) {
        return 'title';
      }
      
      // Visual slide: Contains images or cards
      if (hasImages || hasCards) {
        return 'visual';
      }
      
      // Bullet slide: Contains lists
      if (hasLists) {
        return 'bullet';
      }
      
      // Quote slide: Contains callouts or blockquotes
      if (content.includes('callout') || content.includes('blockquote')) {
        return 'quote';
      }
      
      // Summary slide: Short content with key points
      if (textLength < 200 && elements.length <= 2) {
        return 'summary';
      }
      
      return 'standard';
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
          const viewportHeight = window.innerHeight;
          const maxAllowedLines = Math.floor(viewportHeight / 80) - 2; // Conservative: leave room for title and spacing
          
          const context: SlideContext = {
            isFirst: partIndex === 0 && slides.length === 0,
            baseTitle,
            slideIndex: slides.length,
            previousSlides: [...slides],
            maxLines: Math.max(2, Math.min(maxAllowedLines, 4)), // Between 2-4 lines max
            viewportHeight,
            viewportWidth: window.innerWidth
          };
          
          const result = this.applyRules(part.trim(), context);
          slides.push(...result.slides);
        }
      });
      
      return slides.length > 0 ? slides : [{
        id: 'slide-0',
        content: html,
        title: baseTitle,
        type: 'title'
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
          type: context.isFirst ? 'title' : 'standard'
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
    engine.addRule(new TitleSlideRule());
    engine.addRule(new HeadingBasedRule());
    engine.addRule(new VisualSlideRule());
    engine.addRule(new LineCountRule());
    engine.addRule(new StandardRule());
    
    return engine.processContent(html, title);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  // Concrete Rule Implementations
  class TitleSlideRule implements SlideRule {
    name = 'TitleSlideRule';
    priority = 1;
    
    apply(content: string, context: SlideContext): SlideResult {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const elements = Array.from(tempDiv.children);
      const analyzedElements = elements.map(el => ContentAnalyzer.analyzeElement(el, context.viewportHeight));
      
      // Check if this should be a title slide (only headings, minimal content)
      const slideType = ContentAnalyzer.determineSlideType(analyzedElements, content);
      
      if (slideType === 'title' || (context.isFirst && analyzedElements.length <= 2)) {
        return {
          slides: [{
            id: `slide-title-${context.slideIndex}`,
            content: this.formatTitleSlide(content, context),
            title: this.extractTitle(content),
            type: 'title',
            lineCount: 1,
            elements: ['title']
          }],
          shouldContinue: false
        };
      }
      
      return { slides: [], shouldContinue: true };
    }
    
    private formatTitleSlide(content: string, context: SlideContext): string {
      // For title slides, center the content and add logo if it's the first slide
      if (context.isFirst) {
        return `<div class="title-slide-content">${content}</div>`;
      }
      return content;
    }
    
    private extractTitle(content: string): string {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const titleElement = tempDiv.querySelector('h1, h2, h3');
      return titleElement?.textContent || 'Título';
    }
  }
  
  class HeadingBasedRule implements SlideRule {
    name = 'HeadingBasedRule';
    priority = 2;
    
    apply(content: string, context: SlideContext): SlideResult {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const elements = Array.from(tempDiv.children);
      
      // Find all headings and their positions
      const headings = elements
        .map((element, index) => ({
          element,
          index,
          level: this.getHeadingLevel(element),
          isHeading: this.isHeading(element)
        }))
        .filter(item => item.isHeading);
      
      // If no headings found, let other rules handle it
      if (headings.length === 0) {
        return { slides: [], shouldContinue: true };
      }
      
      const slides: Slide[] = [];
      
      // Handle content before first heading (if any)
      if (headings.length > 0 && headings[0].index > 0) {
        const preHeadingElements = elements.slice(0, headings[0].index);
        if (preHeadingElements.length > 0) {
          const slideContent = preHeadingElements.map(el => el.outerHTML).join('\\n');
          const analyzedElements = preHeadingElements.map(el => ContentAnalyzer.analyzeElement(el, context.viewportHeight));
          const slideType = ContentAnalyzer.determineSlideType(analyzedElements, slideContent);
          
          slides.push({
            id: `slide-heading-${context.slideIndex}-${slides.length}`,
            content: slideContent,
            title: this.generateTitle(context, slides.length + 1),
            type: slideType,
            lineCount: ContentAnalyzer.getTotalLines(analyzedElements),
            elements: analyzedElements.map(el => el.type)
          });
        }
      }
      
      // Create slides for each heading and its content (non-overlapping)
      for (let i = 0; i < headings.length; i++) {
        const currentHeading = headings[i];
        const nextHeading = headings[i + 1];
        
        const startIndex = currentHeading.index;
        const endIndex = nextHeading ? nextHeading.index : elements.length;
        
        // Get content from current heading up to (but NOT including) next heading
        const slideElements = elements.slice(startIndex, endIndex);
        
        if (slideElements.length > 0) {
          const slideContent = slideElements.map(el => el.outerHTML).join('\\n');
          const analyzedElements = slideElements.map(el => ContentAnalyzer.analyzeElement(el, context.viewportHeight));
          const slideType = ContentAnalyzer.determineSlideType(analyzedElements, slideContent);
          
          // Extract title from the heading element (first element should be the heading)
          const headingTitle = this.extractTitle(slideElements[0]) || this.generateTitle(context, slides.length + 1);
          
          slides.push({
            id: `slide-heading-${context.slideIndex}-${slides.length}`,
            content: slideContent,
            title: headingTitle,
            type: slideType,
            lineCount: ContentAnalyzer.getTotalLines(analyzedElements),
            elements: analyzedElements.map(el => el.type)
          });
        }
      }
      
      return { slides, shouldContinue: false };
    }
    
    private isHeading(element: Element): boolean {
      const tagName = element.tagName.toLowerCase();
      return ['h1', 'h2', 'h3'].includes(tagName);
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
    
    private extractTitle(element: Element): string | undefined {
      if (this.isHeading(element)) {
        return element.textContent || undefined;
      }
      return undefined;
    }
    
    private generateTitle(context: SlideContext, slideNumber: number): string {
      return context.baseTitle ? `${context.baseTitle} (${slideNumber})` : `Slide ${slideNumber}`;
    }
    
    private createSubSlides(sectionElements: Element[], sectionHeadings: any[], context: SlideContext, slides: Slide[]) {
      // Find the lowest level (highest number) headings in this section
      const lowestLevel = Math.max(...sectionHeadings.map(h => h.level));
      const lowestLevelHeadings = sectionHeadings.filter(h => h.level === lowestLevel);
      
      if (lowestLevelHeadings.length === 1) {
        // Only one lowest level heading - use the original section
        const slideContent = sectionElements.map(el => el.outerHTML).join('\\n');
        const analyzedElements = sectionElements.map(el => ContentAnalyzer.analyzeElement(el, context.viewportHeight));
        const slideType = ContentAnalyzer.determineSlideType(analyzedElements, slideContent);
        
        slides.push({
          id: `slide-heading-${context.slideIndex}-${slides.length}`,
          content: slideContent,
          title: this.extractTitle(sectionElements[0]) || this.generateTitle(context, slides.length + 1),
          type: slideType,
          lineCount: ContentAnalyzer.getTotalLines(analyzedElements),
          elements: analyzedElements.map(el => el.type)
        });
      } else {
        // Multiple lowest level headings - split by them
        
        // Handle content before first lowest-level heading
        const firstLowestHeading = lowestLevelHeadings[0];
        const firstLowestRelativeIndex = firstLowestHeading.index - sectionHeadings[0].index;
        
        if (firstLowestRelativeIndex > 0) {
          // There's content before the first lowest-level heading
          const preElements = sectionElements.slice(0, firstLowestRelativeIndex);
          const slideContent = preElements.map(el => el.outerHTML).join('\\n');
          const analyzedElements = preElements.map(el => ContentAnalyzer.analyzeElement(el, context.viewportHeight));
          const slideType = ContentAnalyzer.determineSlideType(analyzedElements, slideContent);
          
          slides.push({
            id: `slide-heading-${context.slideIndex}-${slides.length}`,
            content: slideContent,
            title: this.extractTitle(preElements[0]) || this.generateTitle(context, slides.length + 1),
            type: slideType,
            lineCount: ContentAnalyzer.getTotalLines(analyzedElements),
            elements: analyzedElements.map(el => el.type)
          });
        }
        
        // Create slides for each lowest-level heading
        lowestLevelHeadings.forEach((heading, headingIndex) => {
          const nextLowestHeading = lowestLevelHeadings[headingIndex + 1];
          const relativeStart = heading.index - sectionHeadings[0].index;
          const relativeEnd = nextLowestHeading 
            ? nextLowestHeading.index - sectionHeadings[0].index 
            : sectionElements.length;
          
          const slideElements = sectionElements.slice(relativeStart, relativeEnd);
          if (slideElements.length > 0) {
            const slideContent = slideElements.map(el => el.outerHTML).join('\\n');
            const analyzedElements = slideElements.map(el => ContentAnalyzer.analyzeElement(el, context.viewportHeight));
            const slideType = ContentAnalyzer.determineSlideType(analyzedElements, slideContent);
            
            slides.push({
              id: `slide-heading-${context.slideIndex}-${slides.length}`,
              content: slideContent,
              title: this.extractTitle(slideElements[0]) || this.generateTitle(context, slides.length + 1),
              type: slideType,
              lineCount: ContentAnalyzer.getTotalLines(analyzedElements),
              elements: analyzedElements.map(el => el.type)
            });
          }
        });
      }
    }
  }

  class VisualSlideRule implements SlideRule {
    name = 'VisualSlideRule';
    priority = 3;
    
    apply(content: string, context: SlideContext): SlideResult {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const elements = Array.from(tempDiv.children);
      const analyzedElements = elements.map(el => ContentAnalyzer.analyzeElement(el, context.viewportHeight));
      
      const slideType = ContentAnalyzer.determineSlideType(analyzedElements, content);
      
      if (slideType === 'visual') {
        return {
          slides: [{
            id: `slide-visual-${context.slideIndex}`,
            content: this.formatVisualSlide(content),
            title: this.extractOrCreateTitle(content, context),
            type: 'visual',
            lineCount: ContentAnalyzer.getTotalLines(analyzedElements),
            elements: analyzedElements.map(el => el.type)
          }],
          shouldContinue: false
        };
      }
      
      return { slides: [], shouldContinue: true };
    }
    
    private formatVisualSlide(content: string): string {
      // Ensure visual slides have proper formatting
      return `<div class="visual-slide-content">${content}</div>`;
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
    priority = 4;
    
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
      
      const analyzedElements = elements.map(el => ContentAnalyzer.analyzeElement(el, context.viewportHeight));
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
          const slideType = slideIndex > 1 ? 'continuation' : ContentAnalyzer.determineSlideType(currentElements, slideContent);
          slides.push({
            id: `slide-${context.slideIndex}-${slideIndex++}`,
            content: slideContent,
            title: this.generateTitle(context, slideIndex),
            type: slideType,
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
        const slideType = slideIndex > 0 ? 'continuation' : ContentAnalyzer.determineSlideType(currentElements, slideContent);
        slides.push({
          id: `slide-${context.slideIndex}-${slideIndex}`,
          content: slideContent,
          title: this.generateTitle(context, slideIndex + 1),
          type: slideType,
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
    priority = 5;
    
    apply(content: string, context: SlideContext): SlideResult {
      // Fallback rule - always applies
      const title = this.extractOrCreateTitle(content, context);
      
      return {
        slides: [{
          id: `slide-${context.slideIndex}`,
          content: context.isFirst ? content : this.ensureTitle(content, context),
          title,
          type: context.isFirst ? 'title' : 'standard'
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