import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/pages/components/DocsContainer';
import HtmlEmbedWithPresentation from '@/app/pages/components/HtmlEmbedWithPresentation';

export const metadata: Metadata = {
  title: 'Carta de Presentación - Cementos Pacasmayo',
  description: 'Carta de Presentación - Mentorium × Pacasmayo',
};

export default function CartaPage() {
  return (
    <DocsContainer>
      <HtmlEmbedWithPresentation 
        relativePath="src/app/pages/pacasmayo/carta/carta.html"
        title="Carta de Presentación - Cementos Pacasmayo S.A.A."
      />
    </DocsContainer>
  );
}