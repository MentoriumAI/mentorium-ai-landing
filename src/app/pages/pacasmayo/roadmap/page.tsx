import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/pages/components/DocsContainer';
import HtmlEmbedWithPresentation from '@/app/pages/components/HtmlEmbedWithPresentation';
import EqualizeRoadmap from '@/app/pages/components/EqualizeRoadmap';

export const metadata: Metadata = {
  title: 'Roadmap',
  description: 'Pacasmayo - Roadmap',
};

export default function RoadmapPage() {
  return (
    <DocsContainer>
      <HtmlEmbedWithPresentation 
        relativePath="src/app/pages/pacasmayo/roadmap/roadmap.html"
        title="Roadmap Tentativo (8 Sesiones) – Mentorium × Pacasmayo"
      />
      <EqualizeRoadmap />
    </DocsContainer>
  );
}
