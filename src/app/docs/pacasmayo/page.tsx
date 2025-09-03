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
      <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl mx-auto py-8 sm:py-12">
          <div className="space-y-8 sm:space-y-12">
            {/* Header */}
            <div className="text-center px-4 sm:px-0">
              <img 
                src="/logo.svg?v=3" 
                alt="Mentorium AI" 
                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 opacity-90"
              />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
                Proyecto Pacasmayo
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-2 sm:px-0">
                Programa de Aplicación Práctica de IA en Cementos Pacasmayo. 
                Accede a la documentación completa del proyecto.
              </p>
            </div>

            {/* Document Cards */}
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 max-w-4xl mx-auto px-4 sm:px-0">
              {/* Propuesta Card */}
              <a 
                href="/docs/pacasmayo/propuesta"
                className="group block p-5 sm:p-6 lg:p-8 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                      Propuesta del Programa
                    </h3>
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed">
                      Documento completo con objetivos, metodología, equipo facilitador y estructura del programa de IA.
                    </p>
                    <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm text-blue-600">
                      <span>Ver documento</span>
                      <svg className="ml-1 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>

              {/* Roadmap Card */}
              <a 
                href="/docs/pacasmayo/roadmap"
                className="group block p-5 sm:p-6 lg:p-8 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors leading-tight">
                      Roadmap de 8 Sesiones
                    </h3>
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed">
                      Planificación detallada de las 8 sesiones del programa, con objetivos, contenidos y actividades.
                    </p>
                    <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm text-green-600">
                      <span>Ver roadmap</span>
                      <svg className="ml-1 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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