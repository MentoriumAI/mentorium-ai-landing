import React from 'react';

export type DocsContainerProps = {
  title?: string;
  children: React.ReactNode;
};

export default function DocsContainer({ title, children }: DocsContainerProps) {
  return (
    <div className="w-full">
      {title ? <h1 className="mb-6 text-3xl font-semibold leading-tight">{title}</h1> : null}
      {children}
    </div>
  );
}
