import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/pages/components/DocsContainer';
import HtmlEmbedWithPresentation from '@/app/pages/components/HtmlEmbedWithPresentation';

export const metadata: Metadata = {
  title: 'Propuesta - Programa de IA',
  description: 'Propuesta del Programa de IA - Mentorium × Pacasmayo',
};

export default function PropuestaPage() {
  return (
    <DocsContainer>
      <HtmlEmbedWithPresentation 
        relativePath="src/app/pages/pacasmayo/propuesta/propuesta.html"
        title="Programa de Aplicación Práctica de IA en Cementos Pacasmayo"
      />
    </DocsContainer>
  );
}
