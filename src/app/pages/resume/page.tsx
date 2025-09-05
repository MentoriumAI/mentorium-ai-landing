import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/pages/components/DocsContainer';
import FounderImage from '@/app/pages/components/FounderImage';

export const metadata: Metadata = {
  title: 'Equipo Fundador - Mentorium AI',
  description: 'Currículums y experiencia profesional del equipo fundador de Mentorium AI',
};

export default function ResumeIndexPage() {
  return (
    <DocsContainer>
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8" style={{ background: 'var(--paper)' }}>
        <div className="w-full max-w-5xl mx-auto py-8 sm:py-12">
          <div className="space-y-8 sm:space-y-12">
            {/* Header */}
            <div className="text-center px-4 sm:px-0">
              <img 
                src="/logo-no-bg.svg?v=3" 
                alt="Mentorium AI" 
                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 opacity-90"
              />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight" style={{ color: 'var(--brunswick-green)' }}>
                Equipo Fundador
              </h1>
              <p className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-2 sm:px-0" style={{ color: 'var(--muted)' }}>
                Conoce a los fundadores de Mentorium AI y su experiencia profesional en tecnología, educación e innovación.
              </p>
            </div>

            {/* Founder Cards */}
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 max-w-4xl mx-auto px-4 sm:px-0">
              {/* Moshe Card */}
              <a 
                href="/pages/resume/moshe"
                className="group block p-5 sm:p-6 lg:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'rgba(75, 144, 226, 0.05)', border: '1px solid rgba(75, 144, 226, 0.2)' }}
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden group-hover:opacity-90 transition-all">
                      <FounderImage photoName="moshe.jpg" name="Moshe Ojeda" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold transition-colors leading-tight mt-0 mb-1" style={{ color: 'var(--ink)' }}>
                      Moshe Ojeda
                    </h3>
                    <p className="text-xs sm:text-sm font-medium mb-2" style={{ color: 'var(--celtic-blue)' }}>
                      CEO @Mentorium AI
                    </p>
                    <p className="text-xs sm:text-sm" style={{ color: 'var(--celtic-blue)' }}>
                      Head of Agent Engineering & Co-Founder @Agentman - Docente & Keynote Speaker
                    </p>
                    <p className="text-xs sm:text-sm leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
                      Especialista AI Engineering , MLOps, LLMOps y enseñanza de tecnologías emergentes.<br />Ex-Rappi, Ex-Yape.
                    </p>
                    <div className="flex items-center text-xs sm:text-sm" style={{ color: 'var(--celtic-blue)' }}>
                      <span>Ver CV</span>
                      <svg className="ml-1 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>

              {/* Silvia Card */}
              <a 
                href="/pages/resume/silvia"
                className="group block p-5 sm:p-6 lg:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'rgba(125, 180, 108, 0.05)', border: '1px solid rgba(125, 180, 108, 0.2)' }}
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden group-hover:opacity-90 transition-all">
                      <FounderImage photoName="silvia.jpg" name="Silvia Fernandez" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold transition-colors leading-tight mt-0 mb-1" style={{ color: 'var(--ink)' }}>
                      Silvia Fernandez
                    </h3>
                    <p className="text-xs sm:text-sm font-medium mb-2" style={{ color: 'var(--dark-moss-green)' }}>
                      Learning Experience Leader @Mentorium AI
                    </p>
                    <p className="text-xs sm:text-sm" style={{ color: 'var(--dark-moss-green)' }}>
                      Líder de Programa Educativo (+24k estudiantes) @Cibertec
                    </p>
                    <p className="text-xs sm:text-sm leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
                      Especialista en Diseño Curricular e Instruccional, EdTech, LMS y Evaluación Educativa.
                    </p>
                    <div className="flex items-center text-xs sm:text-sm" style={{ color: 'var(--dark-moss-green)' }}>
                      <span>Ver CV</span>
                      <svg className="ml-1 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>

              {/* Arian Card */}
              <a 
                href="/pages/resume/arian"
                className="group block p-5 sm:p-6 lg:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'rgba(255, 150, 79, 0.05)', border: '1px solid rgba(255, 150, 79, 0.2)' }}
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden group-hover:opacity-90 transition-all">
                      <FounderImage photoName="arian.jpg" name="Arian Gallardo" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold transition-colors leading-tight mt-0 mb-1" style={{ color: 'var(--ink)' }}>
                      Arian Gallardo
                    </h3>
                    <p className="text-xs sm:text-sm font-medium mb-2" style={{ color: 'var(--orange-pantone)' }}>
                      Head of Platform & AI @Mentorium AI
                    </p>
                    <p className="text-xs sm:text-sm" style={{ color: 'var(--orange-pantone)' }}>
                      Ingeniero de Software II @Microsoft - Docente & Keynote Speaker
                    </p>
                    <p className="text-xs sm:text-sm leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
                      Especialista en IA Generativa, React, TypeScript y Microsoft Teams.
                    </p>
                    <div className="flex items-center text-xs sm:text-sm" style={{ color: 'var(--orange-pantone)' }}>
                      <span>Ver CV</span>
                      <svg className="ml-1 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>  
                  </div>
                </div>
              </a>

              {/* Daniel Card */}
              <a 
                href="/pages/resume/daniel"
                className="group block p-5 sm:p-6 lg:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'rgba(255, 204, 102, 0.05)', border: '1px solid rgba(255, 204, 102, 0.2)' }}
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden group-hover:opacity-90 transition-all">
                      <FounderImage photoName="daniel.jpg" name="Daniel Alpiste" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold transition-colors leading-tight mt-0 mb-1" style={{ color: 'var(--ink)' }}>
                      Daniel Alpiste
                    </h3>
                    <p className="text-xs sm:text-sm font-medium mb-2" style={{ color: '#b8900b' }}>
                      Head of Operations @Mentorium AI
                    </p>
                    <p className="text-xs sm:text-sm" style={{ color: '#b8900b' }}>
                      ML Product Owner @BCP - Docente & Keynote Speaker
                    </p>
                    <p className="text-xs sm:text-sm leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
                      Especialista en Machine Learning, DevOps, MLOps e IA Generativa.
                    </p>
                    <div className="flex items-center text-xs sm:text-sm" style={{ color: '#b8900b' }}>
                      <span>Ver CV</span>
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