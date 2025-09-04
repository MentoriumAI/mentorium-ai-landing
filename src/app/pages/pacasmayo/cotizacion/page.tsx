import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/pages/components/DocsContainer';
import HtmlEmbedWithPresentation from '@/app/pages/components/HtmlEmbedWithPresentation';

export const metadata: Metadata = {
  title: 'Propuesta',
  description: 'Pacasmayo - Propuesta',
};

export default function PropuestaPage() {
  return (
    <DocsContainer>
      <HtmlEmbedWithPresentation 
        relativePath="src/app/pages/pacasmayo/cotizacion/cotizacion.html"
        title="Cotización de Programa para Cementos Pacasmayo"
      />
    </DocsContainer>
  );
}
