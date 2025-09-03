import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/docs/components/DocsContainer';
import HtmlEmbed from '@/app/docs/components/HtmlEmbed';

export const metadata: Metadata = {
  title: 'Propuesta',
  description: 'Pacasmayo - Propuesta',
};

export default function PropuestaPage() {
  return (
    <DocsContainer>
      <HtmlEmbed relativePath={
        'src/app/docs/pacasmayo/propuesta/propuesta.html'
      } />
    </DocsContainer>
  );
}
