import fs from 'fs';
import path from 'path';
import React from 'react';
import ResumeHeader, { ResumeHeaderProps } from './ResumeHeader';
import PresentationMode from './PresentationMode';
import PrintButton from './PrintButton';

export interface ResumeWithHtmlContentProps extends ResumeHeaderProps {
  contentPath: string;
}

export default function ResumeWithHtmlContent({ contentPath, ...headerProps }: ResumeWithHtmlContentProps) {
  const filePath = path.join(process.cwd(), contentPath);
  let htmlContent = '';
  
  try {
    htmlContent = fs.readFileSync(filePath, 'utf-8');
  } catch {
    htmlContent = `<p>Could not load ${contentPath}. Ensure the file exists.</p>`;
  }

  // Extract styles from the HTML content if they exist
  const stylesMatch = htmlContent.match(/<style[\s\S]*?<\/style>/gi);
  const styles = stylesMatch?.join('\n') ?? '';

  // Remove style tags from content to avoid duplication
  const contentWithoutStyles = htmlContent.replace(/<style[\s\S]*?<\/style>/gi, '');

  // Create simplified HTML for presentation mode (include header info)
  const presentationContent = `
    <div class="hero">
      <div class="kicker">Currículum</div>
      <div class="title">
        <h1>${headerProps.name}</h1>
      </div>
      <p class="byline">${headerProps.title}</p>
      ${headerProps.subtitle ? `<p class="highlight" style="text-align: center; margin: 1rem 0; font-style: italic;">${headerProps.subtitle}</p>` : ''}
    </div>
    ${contentWithoutStyles}
  `;

  return (
    <div>
      <div className="toolbar" aria-hidden="true">
        <PrintButton />
      </div>
      <PresentationMode 
        htmlContent={presentationContent}
        title={headerProps.title}
      />
      <main className="page cv-doc">
        <ResumeHeader {...headerProps} />
        <div dangerouslySetInnerHTML={{ __html: styles + contentWithoutStyles }} />
      </main>
    </div>
  );
}