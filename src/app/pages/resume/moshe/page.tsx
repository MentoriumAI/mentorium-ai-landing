import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/pages/components/DocsContainer';
import HtmlEmbedWithPresentation from '@/app/pages/components/HtmlEmbedWithPresentation';

export const metadata: Metadata = {
  title: 'Moshe Ojeda - CV',
  description: 'Currículum de Moshe Ojeda, CEO & Co-fundador de Mentorium AI',
};

export default function MosheCVPage() {
  return (
    <DocsContainer>
      <HtmlEmbedWithPresentation 
        relativePath="src/app/pages/resume/moshe/cv.html"
        title="Moshe Ojeda - CEO & Co-fundador"
      />
    </DocsContainer>
  );
}