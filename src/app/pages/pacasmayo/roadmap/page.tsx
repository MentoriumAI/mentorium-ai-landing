import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/pages/components/DocsContainer';
import HtmlEmbedWithPresentation from '@/app/pages/components/HtmlEmbedWithPresentation';

export const metadata: Metadata = {
  title: 'Roadmap - Programa de IA',
  description: 'Roadmap del Programa de IA (8 Sesiones) - Mentorium × Pacasmayo',
};

export default function RoadmapPage() {
  return (
    <DocsContainer>
      <HtmlEmbedWithPresentation 
        relativePath="src/app/pages/pacasmayo/roadmap/roadmap.html"
        title="Roadmap Tentativo (8 Sesiones) – Mentorium × Pacasmayo"
      />
    </DocsContainer>
  );
}
