import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/pages/components/DocsContainer';
import HtmlEmbedWithPresentation from '@/app/pages/components/HtmlEmbedWithPresentation';

export const metadata: Metadata = {
  title: 'Arian Gallardo - CV',
  description: 'Currículum de Arian Gallardo, CTO & Co-fundador de Mentorium AI',
};

export default function ArianCVPage() {
  return (
    <DocsContainer>
      <HtmlEmbedWithPresentation 
        relativePath="src/app/pages/resume/arian/cv.html"
        title="Arian Gallardo - CTO & Co-fundador"
      />
    </DocsContainer>
  );
}