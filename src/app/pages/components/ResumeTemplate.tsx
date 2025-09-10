import React from 'react';
import ResumeHeader, { ResumeHeaderProps } from './ResumeHeader';
import PresentationMode from './PresentationMode';
import PrintDropdown from './PrintDropdown';

export interface ResumeTemplateProps extends ResumeHeaderProps {
  children: React.ReactNode;
}

export default function ResumeTemplate({ children, ...headerProps }: ResumeTemplateProps) {
  // Create a simplified HTML version for presentation mode
  const htmlContent = `
    <div class="hero">
      <div class="kicker">Currículum</div>
      <div class="title">
        <h1>${headerProps.name}</h1>
      </div>
      <p class="byline">${headerProps.title}</p>
      ${headerProps.subtitle ? `<p class="highlight" style="text-align: center; margin: 1rem 0; font-style: italic;">${headerProps.subtitle}</p>` : ''}
    </div>
    <div class="presentation-content">
      <!-- Content will be rendered by React -->
    </div>
  `;

  return (
    <div>
      <div className="toolbar" aria-hidden="true">
        <PrintDropdown />
      </div>
      <PresentationMode 
        htmlContent={htmlContent}
        title={headerProps.title}
      />
      <main className="page cv-doc">
        <ResumeHeader {...headerProps} />
        {children}
      </main>
    </div>
  );
}