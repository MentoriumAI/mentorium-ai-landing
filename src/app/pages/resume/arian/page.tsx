import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/pages/components/DocsContainer';
import ResumeWithHtmlContent from '@/app/pages/components/ResumeWithHtmlContent';

export const metadata: Metadata = {
  title: 'Arian Gallardo - Head of Platform Mentorium AI',
  description: 'CV de Arian Gallardo, Head of Platform & AI & Co-fundador de Mentorium AI',
};

export default function ArianCVPage() {
  return (
    <DocsContainer>
      <ResumeWithHtmlContent
        name="Arian Gallardo"
        title="Head of Platform & AI @Mentorium AI"
        title2="Ingeniero de Software II @Microsoft - Docente & Keynote Speaker"
        subtitle="IA Generativa ⋅ React ⋅ TypeScript ⋅ Microsoft Teams"
        email="arian@mentorium.ai"
        phone="(+1 778) 917-6074"
        linkedin="<a href='https://www.linkedin.com/in/ariangcc/' target='_blank' rel='noopener noreferrer'>ariangcc</a>"
        github="github.com/ariangcc"
        location="Vancouver, Columbia Británica, Canadá"
        photoName="arian.jpg"
        contentPath="src/app/pages/resume/arian/cv-content.html"
      />
    </DocsContainer>
  );
}