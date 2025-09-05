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
        name="Daniel Mijail Alpiste Sarmiento"
        title="MLOps Engineer"
        subtitle="Data Science ⋅ DevOps ⋅ Machine Learning ⋅ Cloud Solutions"
        email="danielalpiste@gmail.com"
        phone="+51 941-952-278"
        linkedin="Linkedin"
        location="Lima, Perú"
        photoName="daniel.jpg"
        contentPath="src/app/pages/resume/daniel/cv-content.html"
      />
    </DocsContainer>
  );
}