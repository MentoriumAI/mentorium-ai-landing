'use client';

import React from 'react';

export default function PrintButton() {
  return (
    <button onClick={() => window.print()}>
      Exportar a PDF
    </button>
  );
}