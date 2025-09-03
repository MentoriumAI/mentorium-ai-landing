import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/docs/components/DocsContainer';
import HtmlEmbedWithPresentation from '@/app/docs/components/HtmlEmbedWithPresentation';
import EqualizeRoadmap from '@/app/docs/components/EqualizeRoadmap';

export const metadata: Metadata = {
  title: 'Roadmap',
  description: 'Pacasmayo - Roadmap',
};

export default function RoadmapPage() {
  return (
    <DocsContainer>
      <HtmlEmbedWithPresentation 
        relativePath="src/app/docs/pacasmayo/roadmap/roadmap.html"
        title="Roadmap Tentativo (8 Sesiones) – Mentorium × Pacasmayo"
      />
      <EqualizeRoadmap />
    </DocsContainer>
  );
}
