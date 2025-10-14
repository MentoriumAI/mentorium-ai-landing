import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Mentorium',
  description: 'Política de privacidad de Mentorium S.A.C. - Cómo recopilamos, usamos y protegemos tu información personal.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-brand-isabelline">
      {/* Header */}
      <header className="bg-white border-b border-brand-dark-green/10">
        <div className="container py-6">
          <Link href="/" className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity">
            Mentorium
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container py-12 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-dark-green mb-4">
            Política de Privacidad
          </h1>
          <p className="text-brand-dark-green/60 mb-8">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none text-brand-dark-green/80 space-y-8">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">1. Información General</h2>
              <p className="leading-relaxed mb-4">
                Mentorium S.A.C. (en adelante, &quot;Mentorium&quot;, &quot;nosotros&quot;, &quot;nuestro&quot; o &quot;nos&quot;), con RUC 20614793768 y domicilio legal en Av. Sergio Bernales 381, Lima, Perú, es responsable del tratamiento de sus datos personales de acuerdo con la Ley N° 29733 - Ley de Protección de Datos Personales de Perú y su reglamento.
              </p>
              <p className="leading-relaxed">
                Esta Política de Privacidad describe cómo recopilamos, usamos, almacenamos y protegemos la información personal que usted nos proporciona al utilizar nuestra plataforma educativa Mentorium, disponible en <a href="https://app.mentorium.ai" className="text-brand-brandeis-blue hover:underline" target="_blank" rel="noopener noreferrer">https://app.mentorium.ai</a> y <a href="https://mentorium.ai" className="text-brand-brandeis-blue hover:underline" target="_blank" rel="noopener noreferrer">https://mentorium.ai</a>.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">2. Datos Personales que Recopilamos</h2>
              <p className="leading-relaxed mb-4">
                Recopilamos los siguientes tipos de información personal cuando utiliza nuestros servicios:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Información de identificación:</strong> Nombre completo, dirección de correo electrónico.</li>
                <li><strong>Información institucional:</strong> Nombre de la institución educativa, rol dentro de la institución.</li>
                <li><strong>Información académica:</strong> Datos de estudiantes (nombres, calificaciones), contenidos educativos, evaluaciones, planes de lecciones.</li>
                <li><strong>Información técnica:</strong> Dirección IP, tipo de navegador, sistema operativo, páginas visitadas, tiempo de permanencia en el sitio.</li>
                <li><strong>Cookies y tecnologías similares:</strong> Utilizamos Google Analytics para analizar el uso de nuestra plataforma.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">3. Finalidad del Tratamiento de Datos</h2>
              <p className="leading-relaxed mb-4">
                Utilizamos sus datos personales para las siguientes finalidades:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Proporcionar y administrar los servicios de la plataforma Mentorium.</li>
                <li>Gestionar cuentas de usuario y autenticación.</li>
                <li>Procesar y almacenar información académica (calificaciones, evaluaciones, contenidos).</li>
                <li>Mejorar la funcionalidad y experiencia de usuario de nuestra plataforma.</li>
                <li>Realizar análisis estadísticos y de rendimiento mediante Google Analytics.</li>
                <li>Enviar comunicaciones relacionadas con el servicio, actualizaciones y marketing (con su consentimiento).</li>
                <li>Cumplir con obligaciones legales y regulatorias aplicables.</li>
                <li>Detectar, prevenir y abordar problemas técnicos o de seguridad.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">4. Uso de Inteligencia Artificial</h2>
              <p className="leading-relaxed mb-4">
                Mentorium utiliza servicios de inteligencia artificial proporcionados por terceros (OpenAI y Google) para ofrecer funcionalidades avanzadas en nuestra plataforma. Es importante que sepa lo siguiente:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Enmascaramiento de datos sensibles:</strong> Antes de compartir datos con proveedores de IA, aplicamos técnicas de enmascaramiento para proteger información personal identificable.</li>
                <li><strong>No entrenamiento con sus datos:</strong> Sus datos NO se utilizan para entrenar modelos de inteligencia artificial. Los proveedores de IA solo procesan los datos para generar respuestas específicas a sus solicitudes.</li>
                <li><strong>Precisión no garantizada:</strong> El contenido generado por IA (evaluaciones, recomendaciones, sugerencias) es asistencial y no garantizamos su exactitud. Cada funcionalidad asistida por IA incluye un aviso explícito al respecto.</li>
                <li><strong>Responsabilidad del usuario:</strong> Los usuarios son responsables de revisar y validar cualquier contenido generado por IA antes de su uso final.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">5. Compartir Información con Terceros</h2>
              <p className="leading-relaxed mb-4">
                Mentorium puede compartir sus datos personales con terceros únicamente en las siguientes circunstancias:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Proveedores de servicios de IA:</strong> OpenAI y Google, con datos enmascarados para proteger información sensible.</li>
                <li><strong>Proveedores de servicios técnicos:</strong> Servicios de almacenamiento en la nube (Google Cloud Platform) ubicados en Estados Unidos.</li>
                <li><strong>Herramientas de análisis:</strong> Google Analytics para comprender el uso de la plataforma.</li>
                <li><strong>Requisitos legales:</strong> Cuando sea requerido por ley, orden judicial o autoridad competente.</li>
                <li><strong>Consentimiento:</strong> Con su consentimiento explícito para otros fines específicos.</li>
              </ul>
              <p className="leading-relaxed mt-4">
                <strong>Importante:</strong> No vendemos, alquilamos ni compartimos sus datos personales con terceros para fines de marketing sin su consentimiento explícito.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">6. Transferencia Internacional de Datos</h2>
              <p className="leading-relaxed">
                Sus datos personales se almacenan en servidores de Google Cloud Platform ubicados en Estados Unidos. Al utilizar nuestros servicios, usted consiente la transferencia internacional de sus datos a este país. Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos durante la transferencia y almacenamiento.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">7. Seguridad de los Datos</h2>
              <p className="leading-relaxed mb-4">
                Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger sus datos personales contra acceso no autorizado, alteración, divulgación o destrucción, incluyendo:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cifrado de datos en tránsito y en reposo.</li>
                <li>Controles de acceso basados en roles.</li>
                <li>Auditorías de seguridad periódicas.</li>
                <li>Capacitación del personal en protección de datos.</li>
                <li>Enmascaramiento de datos sensibles antes de compartir con proveedores de IA.</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro. Si bien nos esforzamos por proteger sus datos, no podemos garantizar su seguridad absoluta.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">8. Retención de Datos</h2>
              <p className="leading-relaxed">
                Conservamos sus datos personales durante el tiempo que su cuenta permanezca activa o según sea necesario para proporcionarle nuestros servicios. Después de la cancelación o eliminación de su cuenta, conservaremos sus datos durante un período adicional de <strong>un (1) año</strong> para cumplir con obligaciones legales, resolver disputas y hacer cumplir nuestros acuerdos. Transcurrido este período, sus datos serán eliminados de forma segura.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">9. Cookies y Tecnologías de Seguimiento</h2>
              <p className="leading-relaxed mb-4">
                Utilizamos cookies y tecnologías similares para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mantener su sesión activa cuando accede a la plataforma.</li>
                <li>Recordar sus preferencias y configuraciones.</li>
                <li>Analizar el tráfico y uso del sitio mediante Google Analytics.</li>
                <li>Mejorar la seguridad y funcionalidad de la plataforma.</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Puede configurar su navegador para rechazar todas las cookies o para que le avise cuando se envíe una cookie. Sin embargo, si no acepta cookies, es posible que no pueda utilizar algunas funciones de nuestra plataforma. Para más información sobre cookies, consulte nuestra <Link href="/cookies" className="text-brand-brandeis-blue hover:underline">Política de Cookies</Link>.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">10. Sus Derechos como Titular de Datos</h2>
              <p className="leading-relaxed mb-4">
                De acuerdo con la Ley N° 29733, usted tiene los siguientes derechos respecto a sus datos personales:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Derecho de acceso:</strong> Conocer qué datos personales tenemos sobre usted.</li>
                <li><strong>Derecho de rectificación:</strong> Solicitar la corrección de datos inexactos o incompletos.</li>
                <li><strong>Derecho de cancelación:</strong> Solicitar la eliminación de sus datos personales cuando ya no sean necesarios.</li>
                <li><strong>Derecho de oposición:</strong> Oponerse al tratamiento de sus datos personales para determinados fines.</li>
                <li><strong>Derecho de revocación del consentimiento:</strong> Retirar su consentimiento en cualquier momento sin efecto retroactivo.</li>
                <li><strong>Derecho de portabilidad:</strong> Recibir sus datos en un formato estructurado y de uso común.</li>
                <li><strong>Derecho a opt-out de marketing:</strong> Puede darse de baja de comunicaciones de marketing desde la página de configuración de usuario dentro de la plataforma.</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Para ejercer cualquiera de estos derechos, puede contactarnos en <a href="mailto:hola@mentorium.ai" className="text-brand-brandeis-blue hover:underline">hola@mentorium.ai</a>. Responderemos a su solicitud en un plazo máximo de diez (10) días hábiles según lo establecido por la normativa peruana.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">11. Menores de Edad</h2>
              <p className="leading-relaxed">
                Mentorium está diseñada para ser utilizada por instituciones educativas y sus representantes autorizados. Si bien los estudiantes (que pueden ser menores de edad) utilizan la plataforma, la contratación y gestión de cuentas debe ser realizada por usuarios mayores de 18 años con autoridad legal para actuar en nombre de la institución. Las instituciones educativas son responsables de obtener los consentimientos necesarios de los padres o tutores legales para el tratamiento de datos de menores de edad, según corresponda.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">12. Cambios a esta Política de Privacidad</h2>
              <p className="leading-relaxed">
                Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Cualquier cambio será notificado mediante un aviso destacado en nuestra plataforma o por correo electrónico, con al menos treinta (30) días de anticipación antes de que los cambios entren en vigor. La fecha de &quot;Última actualización&quot; en la parte superior de esta política indica cuándo fue modificada por última vez. Le recomendamos revisar periódicamente esta política para estar informado sobre cómo protegemos su información.
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">13. Contacto</h2>
              <p className="leading-relaxed mb-4">
                Si tiene preguntas, inquietudes o desea ejercer sus derechos relacionados con esta Política de Privacidad, puede contactarnos a través de:
              </p>
              <div className="bg-brand-isabelline p-6 rounded-xl space-y-2">
                <p><strong>Mentorium S.A.C.</strong></p>
                <p>RUC: 20614793768</p>
                <p>Dirección: Av. Sergio Bernales 381, Lima, Perú</p>
                <p>Correo electrónico: <a href="mailto:hola@mentorium.ai" className="text-brand-brandeis-blue hover:underline">hola@mentorium.ai</a></p>
                <p>Teléfono: (+51) 953 719 060</p>
              </div>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">14. Autoridad de Protección de Datos</h2>
              <p className="leading-relaxed">
                Si considera que sus derechos de protección de datos han sido vulnerados, puede presentar una reclamación ante la Autoridad Nacional de Protección de Datos Personales de Perú (Dirección General de Transparencia, Acceso a la Información Pública y Protección de Datos Personales del Ministerio de Justicia y Derechos Humanos).
              </p>
            </section>
          </div>

          {/* Back to home */}
          <div className="mt-12 pt-8 border-t border-brand-dark-green/10">
            <Link
              href="/"
              className="inline-flex items-center text-brand-brandeis-blue hover:text-brand-brunswick-green transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark-green text-white py-8">
        <div className="container text-center text-sm text-white/70">
          <p>© {new Date().getFullYear()} Mentorium S.A.C. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
