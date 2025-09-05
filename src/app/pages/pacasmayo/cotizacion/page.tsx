import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/pages/components/DocsContainer';
import HtmlEmbedWithPresentation from '@/app/pages/components/HtmlEmbedWithPresentation';

export const metadata: Metadata = {
  title: 'Cotización - Programa de IA',
  description: 'Cotización del Programa de IA - Mentorium × Pacasmayo',
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
