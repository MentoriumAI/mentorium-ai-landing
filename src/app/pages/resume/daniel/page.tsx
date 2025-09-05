import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/pages/components/DocsContainer';
import HtmlEmbedWithPresentation from '@/app/pages/components/HtmlEmbedWithPresentation';

export const metadata: Metadata = {
  title: 'Daniel Alpiste - CV',
  description: 'Currículum de Daniel Alpiste, CMO & Co-fundador de Mentorium AI',
};

export default function DanielCVPage() {
  return (
    <DocsContainer>
      <HtmlEmbedWithPresentation 
        relativePath="src/app/pages/resume/daniel/cv.html"
        title="Daniel Alpiste - CMO & Co-fundador"
      />
    </DocsContainer>
  );
}