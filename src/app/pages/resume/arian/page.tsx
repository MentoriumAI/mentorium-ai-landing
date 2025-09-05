import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/pages/components/DocsContainer';
import ResumeWithHtmlContent from '@/app/pages/components/ResumeWithHtmlContent';

export const metadata: Metadata = {
  title: 'Arian Gallardo - CV',
  description: 'Currículum de Arian Gallardo, Ingeniero de Software II',
};

export default function ArianCVPage() {
  return (
    <DocsContainer>
      <ResumeWithHtmlContent
        name="Arian Gallardo"
        title="Ingeniero de Software II - Microsoft Teams"
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