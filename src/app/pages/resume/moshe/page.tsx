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
        name="Moshe Ojeda Dejo"
        title="Ingeniero Líder en IA Generativa"
        subtitle="IA Generativa ⋅ MLOps ⋅ LLMOps ⋅ Enseñanza"
        email="moshefabricio@gmail.com"
        linkedin="/in/moshe-ojeda"
        location="Lima, Perú"
        photoName="moshe.jpg"
        contentPath="src/app/pages/resume/moshe/cv-content.html"
      />
    </DocsContainer>
  );
}