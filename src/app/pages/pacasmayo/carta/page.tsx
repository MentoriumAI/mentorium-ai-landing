import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/pages/components/DocsContainer';
import HtmlEmbedWithPresentation from '@/app/pages/components/HtmlEmbedWithPresentation';

export const metadata: Metadata = {
  title: 'Carta de Agradecimiento - Cementos Pacasmayo',
  description: 'Carta de Agradecimiento - Mentorium × Pacasmayo',
};

export default function CartaPage() {
  return (
    <DocsContainer>
      <HtmlEmbedWithPresentation 
        relativePath="src/app/pages/pacasmayo/carta/carta.html"
        title="Carta de Agradecimiento - Cementos Pacasmayo S.A.A."
      />
    </DocsContainer>
  );
}