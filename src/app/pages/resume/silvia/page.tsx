import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/pages/components/DocsContainer';
import HtmlEmbedWithPresentation from '@/app/pages/components/HtmlEmbedWithPresentation';

export const metadata: Metadata = {
  title: 'Silvia Fernandez - CV',
  description: 'Currículum de Silvia Fernandez, CPO & Co-fundadora de Mentorium AI',
};

export default function SilviaCVPage() {
  return (
    <DocsContainer>
      <HtmlEmbedWithPresentation 
        relativePath="src/app/pages/resume/silvia/cv.html"
        title="Silvia Fernandez - CPO & Co-fundadora"
      />
    </DocsContainer>
  );
}