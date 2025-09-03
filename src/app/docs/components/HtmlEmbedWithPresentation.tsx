import fs from 'fs';
import path from 'path';
import React from 'react';
import PresentationMode from './PresentationMode';

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

  // Keep styles from head if present
  const stylesOnly = head
    .match(/<style[\s\S]*?<\/style>/gi)
    ?.join('\n') ?? '';

  const embeddedHtml = `${stylesOnly}\n${body}`;

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
      <PresentationMode 
        htmlContent={presentationContent}
        title={extractedTitle}
      />
      <div dangerouslySetInnerHTML={{ __html: embeddedHtml }} />
    </div>
  );
}