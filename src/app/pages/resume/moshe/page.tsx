import type { Metadata } from 'next';
import React from 'react';
import DocsContainer from '@/app/pages/components/DocsContainer';
import ResumeTemplate from '@/app/pages/components/ResumeTemplate';

export const metadata: Metadata = {
  title: 'Moshe Ojeda - CV',
  description: 'Currículum de Moshe Ojeda, Ingeniero Líder en IA Generativa',
};

export default function MosheCVPage() {
  return (
    <DocsContainer>
      <ResumeTemplate
        name="Moshe Ojeda Dejo"
        title="Ingeniero Líder en IA Generativa"
        subtitle="IA Generativa ⋅ MLOps ⋅ LLMOps ⋅ Enseñanza"
        email="moshefabricio@gmail.com"
        linkedin="/in/moshe-ojeda"
        location="Lima, Perú"
        photoName="moshe.jpg"
      >
        {/* Professional Summary */}
        <section className="section">
          <h2>Resumen Profesional</h2>
          <p><span className="highlight">Ingeniero Líder dirigiendo un equipo enfocado en construir soluciones de IA Generativa.</span> Impulso la automatización y el compromiso del usuario mediante la integración estratégica de GenAI en áreas clave de la empresa.</p>
          <p>Aprovecho las asociaciones con proveedores externos de IA para asegurar que nuestros esfuerzos estén estrechamente alineados con los objetivos empresariales. Mi liderazgo se centra en <span className="highlight">mentoría de miembros del equipo, fomentando el pensamiento innovativo y mejorando nuestra expertise técnica</span>. Apoyo a mi equipo confiando en ellos y proporcionando oportunidades para expandir sus responsabilidades, impulsándonos a empujar continuamente los límites de nuestros proyectos de ML/AI.</p>
        </section>

        {/* Experience */}
        <section className="section theme-orange">
          <span className="tag">Trayectoria profesional</span>
          <h2>Experiencia Laboral</h2>
          
          <div className="experience-item">
            <h3>Ingeniero Líder, IA Generativa - Rappi</h3>
            <p className="period">Enero 2024 - Presente</p>
            <ul>
              <li>Lidero un equipo dedicado de cuatro personas, incluyendo Data Scientists y MLEs, estableciendo backlogs de proyecto y proporcionando guía técnica</li>
              <li>Apliqué estrategias avanzadas de automatización impulsadas por IA, llevando a ahorros sustanciales de costos y consolidación financiera en Rappi</li>
              <li>Gestiono relaciones con proveedores de GenAI de primer nivel, asegurando integración y alineación con los objetivos estratégicos de Rappi</li>
              <li>Desarrollé e implementé sistemas avanzados de Retriever-Augmented Generation (RAG)</li>
              <li>Simplifiqué el deployment de cargas de trabajo generativas automatizando la configuración de infraestructura, reduciendo el time-to-production para cadenas de lenguaje</li>
              <li>Diseñé y desarrollé Agentes LLM usando arquitectura tipo grafo, empleando herramientas avanzadas para activar diversas acciones dinámicamente</li>
            </ul>
            <p className="achievement"><strong>Logros clave:</strong> Lideré proyectos transformativos de IA generativa, aumentando la eficiencia e innovación en departamentos. Habilitó el acceso a herramientas avanzadas de IA, impactando la fortaleza financiera de Rappi, con más de 10 proyectos utilizando nuestros servicios.</p>
          </div>

          <div className="experience-item">
            <h3>Profesor - CIBERTEC</h3>
            <p className="period">Diciembre 2023 - Presente</p>
            <ul>
              <li>Instruí un bootcamp sobre IA Generativa e Ingeniería de Prompts, enfocándome en aplicaciones prácticas de Large Language Models (LLMs) en escenarios del mundo real</li>
              <li>Co-creé y enseñé un nuevo curso que guía incrementalmente a los estudiantes desde conceptos fundacionales hasta construir un MVP completo, incorporando LLMs, bases de datos vectoriales y MLOps con proyectos hands-on</li>
              <li>Desarrollé y actualicé continuamente contenido atractivo que combina teoría con práctica, asegurando que los estudiantes adquieran habilidades prácticas mientras se mantienen actualizados con los últimos avances en IA y tecnología</li>
            </ul>
          </div>

          <div className="experience-item">
            <h3>Machine Learning Engineer - Rappi</h3>
            <p className="period">Enero 2022 - Diciembre 2023</p>
            <ul>
              <li>Lideré una iniciativa enfocada en apoyar proyectos basados en LLM mientras también desarrollaba una plataforma de infraestructura para habilitar patrones de diseño y soluciones de vanguardia dentro del campo de LLM</li>
              <li>Desarrollé soluciones que personalizan surtidos de productos para mejorar el engagement y la satisfacción. Aproveché Airflow y Kubernetes para crear automatizaciones que entrenan modelos de machine learning</li>
              <li>Diseñé e implementé APIs de alto tráfico (Go) para entregar recomendaciones en línea. Conduje experimentos A/B y análisis de datos en grupos de usuarios para respaldar la toma de decisiones basada en evidencia</li>
            </ul>
            <p className="achievement"><strong>Logros clave:</strong> Aumenté CTR más del 30% usando sistemas de recomendación. Construí motor en tiempo real para soporte de personalización multi-modelo entre equipos que fue destacado en un Caso de Estudio de AWS.</p>
          </div>

          <div className="experience-item">
            <h3>Experiencia Consolidada en Belcorp</h3>
            <p className="period">Octubre 2019 - Enero 2022</p>
            <p style={{ fontStyle: 'italic', color: 'var(--muted)' }}>Roles: Data Scientist, Consultor de Ingeniería de Datos (Inetum), Practicante de Data Science</p>
            <ul>
              <li>Como Data Scientist, desarrollé un modelo predictivo para pronosticar preferencias de tonos de productos, mejoré sistemas de recomendación con PySpark, y contribuí al diseño de un framework personalizado de data science</li>
              <li>Durante mi tenure en Inetum, automaticé y optimicé pipelines de big data en Apache Spark, desarrollé procesos ETL, y mejoré un workflow de modelo de recomendación</li>
              <li>Como practicante, apoyé segmentación de clientes, conduje EDA, feature engineering, y mantuve modelos de regresión</li>
            </ul>
            <p className="achievement"><strong>Logros clave:</strong> Aumenté la precisión de pronósticos y eficiencia operativa. Optimicé y automaticé procesos, mejorando el rendimiento del sistema y modelos.</p>
          </div>
        </section>

        {/* Education */}
        <section className="section">
          <h2>Formación Académica</h2>
          <div className="education-item">
            <h3>Ingeniería Informática</h3>
            <p className="period">Pontificia Universidad Católica del Perú (PUCP) - 2015 - 2024</p>
            <p>Lima, Perú</p>
          </div>
          
          <div className="education-item">
            <h3>Estudiante de Intercambio, Programa SMILE</h3>
            <p className="period">Czech Technical University - 2019</p>
            <p>Praga, República Checa</p>
          </div>

          <div className="education-item">
            <h3>Micro-master en Estadística y Ciencia de Datos</h3>
            <p className="period">MITx en edX - 2020 - 2022</p>
            <p>Programa en línea</p>
          </div>
        </section>

        {/* Skills */}
        <section className="section theme-orange">
          <span className="tag">Competencias técnicas</span>
          <h2>Habilidades Profesionales y Experiencias</h2>
          
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Programación y Desarrollo</h3>
              <ul>
                <li><strong>Python:</strong> 5+ años, aplicaciones versátiles incluyendo pipelines de datos, modelos ML, APIs, y desarrollo de aplicaciones</li>
                <li><strong>SQL:</strong> 5+ años, clave para exploración de datos, pipelines ETL, optimización de cargas de trabajo</li>
                <li><strong>Shell:</strong> 4+ años, usado para DevOps, automatización, administración de sistemas</li>
                <li><strong>Go:</strong> 2 años, para APIs de alto tráfico, aprovechando concurrencia y módulos</li>
                <li><strong>Otros Lenguajes:</strong> R para análisis de datos y visualización, PHP para desarrollo backend con Laravel</li>
              </ul>
            </div>
            
            <div className="skill-category">
              <h3>Machine Learning y Librerías Python</h3>
              <ul>
                <li>Habilidades extensivas en ML: LLMs, NLP, AutoML, sistemas de recomendación, pronósticos, aprendizaje supervisado y no supervisado, reducción de dimensionalidad</li>
                <li>Competente en librerías Python: NumPy, Pandas, PySpark, Seaborn, FastAPI, Scikit-learn, Keras, FBProphet, NLTK, Spacy, Beautiful Soup, Scrapy, NetworkX</li>
              </ul>
            </div>
            
            <div className="skill-category">
              <h3>MLOps, Data Engineering y Servicios Cloud</h3>
              <ul>
                <li><strong>Integración de Datos:</strong> Airflow para pipelines de datos, certificación Astronomer Academy</li>
                <li><strong>Infraestructura ML:</strong> Google VertexAI, soluciones AWS como Amazon Personalize, Sagemaker, EMR, y Lambda para productos ML</li>
                <li><strong>Gestión de Datos:</strong> Snowflake, Redshift, Redis, Amazon Kinesis, DynamoDB</li>
                <li><strong>Servicios de Cómputo:</strong> Amazon EC2, ECS, Lambda, S3, SNS, SQS, Amplitude</li>
              </ul>
            </div>
            
            <div className="skill-category">
              <h3>Habilidades Interpersonales</h3>
              <ul>
                <li><strong>Trabajo Colaborativo en Equipo:</strong> Fomento una cultura de apoyo mutuo, donde los miembros del equipo se impulsan y colaboran para lograr nuestros objetivos</li>
                <li><strong>Propiedad y Visión a Largo Plazo:</strong> Asumo responsabilidad por los objetivos generales de nuestra organización, alineando mis esfuerzos con una visión a largo plazo</li>
                <li><strong>Liderar con el Ejemplo:</strong> Exhibo liderazgo a través de mis acciones, tomando un enfoque práctico y rodeándome de talento de primera para asegurar el éxito de nuestro equipo</li>
                <li><strong>Comunicación Efectiva:</strong> Competente en facilitar comunicación clara y colaborativa dentro de equipos y estructuras organizacionales</li>
                <li><strong>Ejecución Ágil y Aprendizaje:</strong> Exhibo un sesgo hacia la acción, abrazando la experimentación y buscando continuamente oportunidades de crecimiento y mejora</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="section">
          <h2>Cursos y Certificaciones</h2>
          <ul className="achievements">
            <li><strong>Prompt Engineering for Developers</strong> - DeepLearning.AI (2023)</li>
            <li><strong>Astronomer Certification DAG Authoring for Apache Airflow</strong> - Astronomer Academy (2023)</li>
            <li><strong>Go intermediate: Object-oriented programming and concurrency</strong> - Platzi (2022)</li>
            <li><strong>6.86x: ML with Python - From Linear Models to Deep Learning</strong> - MITx in edX (2021)</li>
            <li><strong>6.431x: Probability - The Science of Uncertainty and Data</strong> - MITx in edX (2021)</li>
            <li><strong>14.310x: Data Analysis for Social Scientists</strong> - MITx en edX (2021)</li>
            <li><strong>Tableau 10 Essential Training</strong> - LinkedIn Learning (2020)</li>
            <li><strong>Tableau 10: Mastering Calculations</strong> - LinkedIn Learning (2020)</li>
            <li><strong>Scrum: The Basics</strong> - LinkedIn Learning (2019)</li>
            <li><strong>Data Visualization: Storytelling</strong> - LinkedIn Learning (2019)</li>
            <li><strong>Data Visualization Tips and Tricks</strong> - LinkedIn Learning (2019)</li>
          </ul>
        </section>

        {/* Languages */}
        <section className="section">
          <h2>Idiomas</h2>
          <div className="languages">
            <p><strong>Español:</strong> Mi idioma nativo</p>
            <p><strong>Inglés:</strong> Competente en comunicación oral y escrita con amplia experiencia, incluyendo un <strong>Certificado de Nivel Avanzado</strong> obtenido del Instituto Cultural Peruano Norteamericano. He perfeccionado mis habilidades a través de entrenamiento adicional, habiendo completado exitosamente un <strong>curso de lectura y escritura en DePaul University en Chicago</strong>, Illinois.</p>
          </div>
        </section>

        {/* Notable Links */}
        <section className="section">
          <h2>Enlaces Destacados</h2>
          <ul>
            <li><a href="https://aws.amazon.com/es/solutions/case-studies/rappi-case-study/" target="_blank">Caso de Estudio AWS - Rappi</a></li>
            <li><a href="https://open.spotify.com/episode/2LiDDpRKCATibOLSJ38WLm" target="_blank">Podcast del Caso de Estudio en Spotify</a></li>
            <li><a href="https://www.credly.com/badges/bd16a8fc-6553-4a83-83dd-4c71ecb2e7eb/linked_in?t=rswxfz" target="_blank">Certificación Astronomer Academy</a></li>
          </ul>
        </section>
      </ResumeTemplate>
    </DocsContainer>
  );
}