import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/pages/components/DocsContainer';
import ResumeWithHtmlContent from '@/app/pages/components/ResumeWithHtmlContent';

export const metadata: Metadata = {
  title: 'Daniel Alpiste - CV',
  description: 'Currículum de Daniel Alpiste, CMO & Co-fundador de Mentorium AI',
};

export default function DanielCVPage() {
  return (
    <DocsContainer>
      <ResumeWithHtmlContent
        name="Daniel Alpiste"
        title="CMO & Co-fundador de Mentorium AI"
        subtitle="Growth Marketing ⋅ SaaS ⋅ Performance Marketing ⋅ EdTech"
        email="daniel@mentorium.ai"
        linkedin="/in/danielalpiste"
        location="Lima, Perú"
        photoName="daniel.jpg"
        contentPath="src/app/pages/resume/daniel/cv-content.html"
      />
    </DocsContainer>
  );
}