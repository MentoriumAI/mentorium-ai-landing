import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/pages/components/DocsContainer';
import ResumeWithHtmlContent from '@/app/pages/components/ResumeWithHtmlContent';

export const metadata: Metadata = {
  title: 'Moshe Ojeda - CV',
  description: 'Currículum de Moshe Ojeda, Ingeniero Líder en IA Generativa',
};

export default function MosheCVPage() {
  return (
    <DocsContainer>
      <ResumeWithHtmlContent
        name="Moshe Ojeda"
        title="CEO @Mentorium AI"
        title2="Head of Agent Engineering & Co-Founder @Agentman - Docente & Keynote Speaker"
        subtitle="AI Engineering ⋅ MLOps ⋅ LLMOps ⋅ Cloud Infrastucture ⋅ Product Management"
        email="moshe@mentorium.ai"
        phone="(+51) 953-719-060"
        linkedin="<a href='https://www.linkedin.com/in/moshe-ojeda/' target='_blank' rel='noopener noreferrer'>moshe-ojeda</a>"
        location="Lima, Perú"
        photoName="moshe.jpg"
        contentPath="src/app/pages/resume/moshe/cv-content.html"
      />
    </DocsContainer>
  );
}