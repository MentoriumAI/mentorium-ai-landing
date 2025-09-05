'use client';

import React from 'react';

interface FounderImageProps {
  photoName: string;
  name: string;
}

export default function FounderImage({ photoName, name }: FounderImageProps) {
  return (
    <img 
      src={`/${photoName}`}
      alt={name}
      className="founder-image"
      onError={(e) => {
        // Hide image if not found
        e.currentTarget.style.display = 'none';
      }}
    />
  );
}