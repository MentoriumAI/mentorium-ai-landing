import fs from 'fs';
import path from 'path';
import React from 'react';
import PresentationMode from './PresentationMode';
import PrintDropdown from './PrintDropdown';

/**
 * Enhanced version of HtmlEmbed that includes presentation mode functionality.
 * - Strips <!doctype>, <html>, <head>, and <body> wrappers for embed display
 * - Keeps inline <style> blocks from <head>
 * - Provides raw HTML content to PresentationMode component
 * - Adds "Ver como Presentación" button above the content
 */
export default function HtmlEmbedWithPresentation({ 
  relativePath, 
  title 
}: { 
  relativePath: string;
  title?: string;
}) {
  const filePath = path.join(process.cwd(), relativePath);
  let raw = '';
  
  try {
    raw = fs.readFileSync(filePath, 'utf-8');
  } catch {
    raw = `<p>Could not load ${relativePath}. Ensure the file exists.</p>`;
  }

  // Extract <head> styles and body content when present
  let head = '';
  let body = raw;

  // Normalize newlines for simple regex
  const headMatch = raw.match(/<head[\s\S]*?>([\s\S]*?)<\/head>/i);
  const bodyMatch = raw.match(/<body[\s\S]*?>([\s\S]*?)<\/body>/i);

  if (headMatch) head = headMatch[1] ?? '';
  if (bodyMatch) body = bodyMatch[1] ?? raw;

  // Remove outer html tags and doctype if any remain
  body = body
    .replace(/<!doctype[^>]*>/gi, '')
    .replace(/<\/?html[^>]*>/gi, '')
    .trim();

  // Remove toolbar elements and scripts from embedded HTML
  body = body
    .replace(/<div[^>]*class="toolbar"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .trim();

  // Keep styles from head if present
  const stylesOnly = head
    .match(/<style[\s\S]*?<\/style>/gi)
    ?.join('\n') ?? '';

  const embeddedHtml = `${stylesOnly}\n${body}`;

  // Add script to make print utilities available globally
  const printUtilsScript = `
    <script>
      // Make print utilities available globally for embedded HTML pages
      if (typeof window !== 'undefined') {
        window.printSinglePage = function() {
          const tempStyle = document.createElement('style');
          tempStyle.innerHTML = \`
            body { font-size: 11px !important; line-height: 1.3 !important; }
            .page { max-width: 600px !important; width: 600px !important; }
            .hero { margin-bottom: 15px !important; }
            .section { margin-bottom: 20px !important; }
            h3 { margin-top: 12px !important; margin-bottom: 6px !important; }
            p { margin-bottom: 10px !important; }
          \`;
          document.head.appendChild(tempStyle);
          
          const pageContent = document.querySelector('.page');
          if (!pageContent) {
            document.head.removeChild(tempStyle);
            console.error('No .page element found for single-page printing');
            return;
          }
          
          const contentHeight = pageContent.scrollHeight;
          document.head.removeChild(tempStyle);
          
          const marginInches = 0.8;
          const bufferInches = 0.3;
          const contentHeightInches = (contentHeight / 96) + marginInches + bufferInches;
          
          const singlePageStyle = document.createElement('style');
          singlePageStyle.innerHTML = \`
            @media print {
              @page { size: 8.27in \${contentHeightInches}in; margin: 0.4in; }
              body { font-size: 11px !important; line-height: 1.3 !important; margin: 0 !important; padding: 0 !important; display: flex !important; justify-content: center !important; align-items: flex-start !important; }
              .page { page-break-inside: avoid; max-width: 600px !important; width: 600px !important; margin: 0 auto !important; padding: 0 !important; transform: none !important; }
              .hero, .section { max-width: 600px !important; width: 600px !important; margin-left: auto !important; margin-right: auto !important; padding-left: 0 !important; padding-right: 0 !important; }
              .hero { margin-bottom: 15px !important; }
              .section { margin-bottom: 20px !important; }
              .letter-content { max-width: 600px !important; width: 600px !important; margin: 0 auto !important; padding: 0 !important; }
              h3 { margin-top: 12px !important; margin-bottom: 6px !important; }
              p { margin-bottom: 10px !important; text-align: justify !important; }
              .signature-section { margin-top: 20px !important; }
              .signature-block p { margin-bottom: 5px !important; text-align: left !important; }
              .hero-logo { max-width: 60px !important; }
              .byline, .kicker { margin-bottom: 8px !important; }
            }
          \`;
          document.head.appendChild(singlePageStyle);
          
          window.print();
          
          setTimeout(() => {
            document.head.removeChild(singlePageStyle);
          }, 1000);
        };
        
        window.printMultiplePages = function() {
          window.print();
        };
      }
    </script>
  `;

  // For presentation mode, we use the processed body content without the extra styles
  // since the presentation mode has its own styling
  const presentationContent = body;

  // Extract title from the HTML content if not provided
  const extractedTitle = title || (() => {
    const titleMatch = raw.match(/<title[^>]*>(.*?)<\/title>/i);
    if (titleMatch) return titleMatch[1];
    
    // Try to get title from first h1 in the body
    const h1Match = body.match(/<h1[^>]*>(.*?)<\/h1>/i);
    if (h1Match) return h1Match[1].replace(/<[^>]*>/g, '');
    
    return 'Documento';
  })();

  return (
    <div>
      <div className="toolbar" aria-hidden="true">
        <PrintDropdown />
        <button id="presentation-btn">Ver como Presentación</button>
      </div>
      <PresentationMode 
        htmlContent={presentationContent}
        title={extractedTitle}
      />
      <div dangerouslySetInnerHTML={{ __html: embeddedHtml + printUtilsScript }} />
    </div>
  );
}