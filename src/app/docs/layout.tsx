import type { Metadata } from 'next';
import React from 'react';
import './components/styles.css';

export const metadata: Metadata = {
  title: {
    default: 'Docs | Mentorium',
    template: '%s | Mentorium Docs',
  },
  description: 'Documentation pages',
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen w-full bg-white text-gray-900">
      {children}
    </main>
  );
}
