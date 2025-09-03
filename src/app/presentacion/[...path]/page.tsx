import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import PresentationRoute from '../../docs/components/PresentationRoute';

export const metadata: Metadata = {
  title: 'Modo Presentación - Mentorium AI',
  description: 'Visualización de documentos en modo presentación',
};

interface PageProps {
  params: Promise<{
    path: string[];
  }>;
  searchParams: Promise<{
    slide?: string;
  }>;
}

export default async function PresentationPage({ params, searchParams }: PageProps) {
  const { path: docPath } = await params;
  const { slide } = await searchParams;
  
  // Parse slide number from search params (default to 1)
  const slideNumber = parseInt(slide || '1');
  if (isNaN(slideNumber) || slideNumber < 1) {
    notFound();
  }
  
  // Reconstruct the original docs path
  const docsPath = docPath.join('/');
  const fullDocsPath = `/docs/${docsPath}`;
  
  // Read HTML content server-side (same logic as HtmlEmbedWithPresentation)
  let htmlContent = '';
  let htmlFilePath = '';
  
  if (docsPath.includes('pacasmayo') && docsPath.includes('propuesta')) {
    htmlFilePath = path.join(process.cwd(), 'src/app/docs/pacasmayo/propuesta/propuesta.html');
  } else if (docsPath.includes('pacasmayo') && docsPath.includes('roadmap')) {
    htmlFilePath = path.join(process.cwd(), 'src/app/docs/pacasmayo/roadmap/roadmap.html');
  } else {
    // Fallback: try to construct the path
    const pathStr = docsPath;
    htmlFilePath = path.join(process.cwd(), `src/app/docs/${pathStr}/${docPath[docPath.length - 1]}.html`);
  }
  
  try {
    if (fs.existsSync(htmlFilePath)) {
      const raw = fs.readFileSync(htmlFilePath, 'utf-8');
      
      // Extract body content (same logic as HtmlEmbedWithPresentation)
      let body = raw;
      const bodyMatch = raw.match(/<body[\s\S]*?>([\s\S]*?)<\/body>/i);
      
      if (bodyMatch) {
        body = bodyMatch[1] ?? raw;
      }
      
      // Remove outer html tags and doctype if any remain
      htmlContent = body
        .replace(/<!doctype[^>]*>/gi, '')
        .replace(/<\/?html[^>]*>/gi, '')
        .trim();
    }
  } catch (error) {
    console.error('Error reading HTML file:', error);
  }
  
  // Determine document title and URLs based on the path
  let documentTitle: string;
  let backUrl: string;
  
  if (docsPath.includes('pacasmayo/roadmap')) {
    documentTitle = 'Roadmap de 8 Sesiones - Proyecto Pacasmayo';
    backUrl = '/docs/pacasmayo/roadmap';
  } else if (docsPath.includes('pacasmayo/propuesta')) {
    documentTitle = 'Propuesta del Programa - Proyecto Pacasmayo';
    backUrl = '/docs/pacasmayo/propuesta';
  } else if (docsPath.includes('pacasmayo')) {
    documentTitle = 'Proyecto Pacasmayo';
    backUrl = fullDocsPath;
  } else {
    documentTitle = 'Presentación';
    backUrl = fullDocsPath;
  }

  return (
    <PresentationRoute 
      initialSlide={slideNumber - 1}
      htmlContent={htmlContent}
      documentTitle={documentTitle}
      backUrl={backUrl}
      presentationBasePath={`/presentacion/${docsPath}`}
    />
  );
}