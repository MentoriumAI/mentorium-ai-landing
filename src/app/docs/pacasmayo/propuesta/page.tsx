import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/docs/components/DocsContainer';
import HtmlEmbedWithPresentation from '@/app/docs/components/HtmlEmbedWithPresentation';

export const metadata: Metadata = {
  title: 'Propuesta',
  description: 'Pacasmayo - Propuesta',
};

export default function PropuestaPage() {
  return (
    <DocsContainer>
      <HtmlEmbedWithPresentation 
        relativePath="src/app/docs/pacasmayo/propuesta/propuesta.html"
        title="Programa de Aplicación Práctica de IA en Cementos Pacasmayo"
      />
    </DocsContainer>
  );
}
