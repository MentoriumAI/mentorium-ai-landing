import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/docs/components/DocsContainer';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Propuesta',
  description: 'Pacasmayo - Propuesta',
};

export default function PropuestaPage() {
  const filePath = path.join(
    process.cwd(),
    'src',
    'app',
    'docs',
    'pacasmayo',
    'propuesta',
    'propuesta.html'
  );
  let html = '';
  try {
    html = fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    html = '<p>Could not load propuesta.html. Ensure the file exists.</p>';
  }

  return (
    <DocsContainer>
      {/* Trusted static HTML content provided by the team */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocsContainer>
  );
}
