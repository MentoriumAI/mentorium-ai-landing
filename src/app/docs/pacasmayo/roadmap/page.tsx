import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/docs/components/DocsContainer';
import HtmlEmbed from '@/app/docs/components/HtmlEmbed';
import EqualizeRoadmap from '@/app/docs/components/EqualizeRoadmap';

export const metadata: Metadata = {
  title: 'Roadmap',
  description: 'Pacasmayo - Roadmap',
};

export default function RoadmapPage() {
  return (
    <DocsContainer>
      <HtmlEmbed relativePath={
        'src/app/docs/pacasmayo/roadmap/roadmap.html'
      } />
      <EqualizeRoadmap />
    </DocsContainer>
  );
}
