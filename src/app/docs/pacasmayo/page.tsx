import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/docs/components/DocsContainer';

export const metadata: Metadata = {
  title: 'Pacasmayo - Documentos',
  description: 'Documentos del proyecto Pacasmayo - Mentorium AI',
};

export default function PacasmayoIndexPage() {
  return (
    <DocsContainer>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <img 
              src="/logo.svg?v=3" 
              alt="Mentorium AI" 
              className="w-16 h-16 mx-auto mb-4 opacity-90"
            />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Proyecto Pacasmayo
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Programa de Aplicación Práctica de IA en Cementos Pacasmayo. 
              Accede a la documentación completa del proyecto.
            </p>
          </div>

          {/* Document Cards */}
          <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          {/* Propuesta Card */}
          <a 
            href="/docs/pacasmayo/propuesta"
            className="group block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Propuesta del Programa
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Documento completo con objetivos, metodología, equipo facilitador y estructura del programa de IA.
                </p>
                <div className="mt-3 flex items-center text-sm text-blue-600">
                  <span>Ver documento</span>
                  <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </a>

          {/* Roadmap Card */}
          <a 
            href="/docs/pacasmayo/roadmap"
            className="group block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                  Roadmap de 8 Sesiones
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Planificación detallada de las 8 sesiones del programa, con objetivos, contenidos y actividades.
                </p>
                <div className="mt-3 flex items-center text-sm text-green-600">
                  <span>Ver roadmap</span>
                  <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </a>
          </div>
        </div>
        </div>
      </div>
    </DocsContainer>
  );
}