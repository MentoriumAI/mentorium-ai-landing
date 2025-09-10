/**
 * Print utility functions for single-page and multi-page exports
 */

export function printSinglePage(): void {
  // Temporarily apply print styles to get accurate measurements
  const tempStyle = document.createElement('style');
  tempStyle.innerHTML = `
    body { font-size: 11px !important; line-height: 1.3 !important; }
    .page { max-width: 600px !important; width: 600px !important; }
    .hero { margin-bottom: 15px !important; }
    .section { margin-bottom: 20px !important; }
    h3 { margin-top: 12px !important; margin-bottom: 6px !important; }
    p { margin-bottom: 10px !important; }
  `;
  document.head.appendChild(tempStyle);
  
  // Calculate content height with print styles applied
  const pageContent = document.querySelector('.page') as HTMLElement;
  if (!pageContent) {
    document.head.removeChild(tempStyle);
    console.error('No .page element found for single-page printing');
    return;
  }
  
  const contentHeight = pageContent.scrollHeight;
  
  // Remove temporary style
  document.head.removeChild(tempStyle);
  
  // Calculate required page height with minimal buffer
  const marginInches = 0.8; // 0.4in top + 0.4in bottom
  const bufferInches = 0.3; // Minimal buffer
  const contentHeightInches = (contentHeight / 96) + marginInches + bufferInches; // 96 DPI
  
  // Create a new style element for single page printing
  const singlePageStyle = document.createElement('style');
  singlePageStyle.innerHTML = `
    @media print {
      @page {
        size: 8.27in ${contentHeightInches}in;
        margin: 0.4in;
      }
      body {
        font-size: 11px !important;
        line-height: 1.3 !important;
        margin: 0 !important;
        padding: 0 !important;
        display: flex !important;
        justify-content: center !important;
        align-items: flex-start !important;
      }
      .page {
        page-break-inside: avoid;
        max-width: 600px !important;
        width: 600px !important;
        margin: 0 auto !important;
        padding: 0 !important;
        transform: none !important;
      }
      .hero, .section {
        max-width: 600px !important;
        width: 600px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
      .hero {
        margin-bottom: 15px !important;
      }
      .section {
        margin-bottom: 20px !important;
      }
      .letter-content {
        max-width: 600px !important;
        width: 600px !important;
        margin: 0 auto !important;
        padding: 0 !important;
      }
      h3 {
        margin-top: 12px !important;
        margin-bottom: 6px !important;
      }
      p {
        margin-bottom: 10px !important;
        text-align: justify !important;
      }
      .signature-section {
        margin-top: 20px !important;
      }
      .signature-block p {
        margin-bottom: 5px !important;
        text-align: left !important;
      }
      .hero-logo {
        max-width: 60px !important;
      }
      .byline, .kicker {
        margin-bottom: 8px !important;
      }
    }
  `;
  document.head.appendChild(singlePageStyle);
  
  // Print
  window.print();
  
  // Remove the style after printing
  setTimeout(() => {
    document.head.removeChild(singlePageStyle);
  }, 1000);
}

export function printMultiplePages(): void {
  // Standard print functionality - uses default CSS @media print styles
  window.print();
}

// Extend Window interface to include our print functions
declare global {
  interface Window {
    printSinglePage?: () => void;
    printMultiplePages?: () => void;
  }
}

// Helper function to check if print utilities are available in global scope
export function makePrintUtilsGlobal(): void {
  if (typeof window !== 'undefined') {
    window.printSinglePage = printSinglePage;
    window.printMultiplePages = printMultiplePages;
  }
}