import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/pages/components/DocsContainer';
import ResumeWithHtmlContent from '@/app/pages/components/ResumeWithHtmlContent';

export const metadata: Metadata = {
  title: 'Silvia Fernandez - CV',
  description: 'Currículum de Silvia Fernandez, Diseñadora Curricular e Instruccional',
};

export default function SilviaCVPage() {
  return (
    <DocsContainer>
      <ResumeWithHtmlContent
        name="Silvia Fernandez"
        title="Learning Experience Leader @Mentorium AI"
        title2="Líder de Programa Educativo (+24k estudiantes) @Cibertec"
        subtitle="Diseño Curricular ⋅ EdTech ⋅ LMS ⋅ Evaluación Educativa"
        email="silvia@mentorium.ai"
        phone="(+51) 963-841-294"
        linkedin="<a href='https://www.linkedin.com/in/silvia-fernandez-zapata/' target='_blank' rel='noopener noreferrer'>silvia-fernandez-zapata</a>"
        location="Lima, Perú"
        photoName="silvia.jpg"
        contentPath="src/app/pages/resume/silvia/cv-content.html"
      />
    </DocsContainer>
  );
}