import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Términos y Condiciones de Servicio | Mentorium',
  description: 'Términos y condiciones de uso de la plataforma educativa Mentorium S.A.C.',
}

export default function TermsOfServicePage() {
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
            Términos y Condiciones de Servicio
          </h1>
          <p className="text-brand-dark-green/60 mb-8">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none text-brand-dark-green/80 space-y-8">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">1. Aceptación de los Términos</h2>
              <p className="leading-relaxed mb-4">
                Bienvenido a Mentorium. Estos Términos y Condiciones de Servicio (en adelante, los &quot;Términos&quot;) constituyen un acuerdo legal vinculante entre usted (el &quot;Usuario&quot; o &quot;usted&quot;) y Mentorium S.A.C. (en adelante, &quot;Mentorium&quot;, &quot;nosotros&quot;, &quot;nuestro&quot; o &quot;nos&quot;), una sociedad peruana con RUC 20614793768 y domicilio legal en Av. Sergio Bernales 381, Lima, Perú.
              </p>
              <p className="leading-relaxed mb-4">
                Al acceder, registrarse o utilizar la plataforma educativa Mentorium, disponible en <a href="https://app.mentorium.ai" className="text-brand-brandeis-blue hover:underline" target="_blank" rel="noopener noreferrer">https://app.mentorium.ai</a> (en adelante, la &quot;Plataforma&quot; o el &quot;Servicio&quot;), usted acepta quedar legalmente obligado por estos Términos.
              </p>
              <p className="leading-relaxed">
                <strong>Si no está de acuerdo con estos Términos, no debe acceder ni utilizar la Plataforma.</strong> El uso continuado de la Plataforma constituye su aceptación de estos Términos y cualquier modificación posterior.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">2. Descripción del Servicio</h2>
              <p className="leading-relaxed mb-4">
                Mentorium es una plataforma educativa inteligente basada en la web que integra pedagogía e inteligencia artificial para transformar la enseñanza y el aprendizaje. Nuestros servicios incluyen, entre otros:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Gestión de alumnos, aulas y matrículas.</li>
                <li>Sistema de calificaciones y evaluaciones inteligentes alineadas con estándares del MINEDU.</li>
                <li>Creación y gestión de materiales educativos y contenidos interactivos con asistencia de IA.</li>
                <li>Seguimiento académico en tiempo real con dashboards y analíticas.</li>
                <li>Generación de reportes y documentación educativa.</li>
                <li>Herramientas de gamificación y personalización del aprendizaje.</li>
                <li>Integración con sistemas LMS existentes.</li>
              </ul>
              <p className="leading-relaxed mt-4">
                La Plataforma está diseñada para instituciones educativas en Perú y está disponible 100% en línea, sin necesidad de instalación de software adicional. Mentorium está en constante evolución y nos reservamos el derecho de agregar, modificar o eliminar funcionalidades con previo aviso.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">3. Elegibilidad y Registro de Cuenta</h2>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">3.1 Requisitos de Edad y Capacidad</h3>
              <p className="leading-relaxed mb-4">
                Para crear una cuenta y celebrar este contrato con Mentorium, usted debe:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tener al menos 18 años de edad.</li>
                <li>Poseer capacidad legal para celebrar contratos vinculantes según las leyes de Perú.</li>
                <li>Actuar en representación de una institución educativa legalmente constituida con autoridad para obligar a dicha institución.</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Los estudiantes menores de 18 años pueden utilizar la Plataforma únicamente bajo la supervisión y responsabilidad de la institución educativa, que debe haber obtenido los consentimientos necesarios de padres o tutores legales.
              </p>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">3.2 Información de Registro</h3>
              <p className="leading-relaxed mb-4">
                Al crear una cuenta, usted se compromete a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Proporcionar información precisa, completa y actualizada.</li>
                <li>Mantener la seguridad de su cuenta y contraseña.</li>
                <li>Notificarnos inmediatamente sobre cualquier uso no autorizado de su cuenta.</li>
                <li>Aceptar la responsabilidad por todas las actividades que ocurran bajo su cuenta.</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Mentorium se reserva el derecho de rechazar, suspender o cancelar cuentas a su sola discreción, especialmente si detectamos información falsa o uso indebido de la Plataforma.
              </p>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">3.3 Disponibilidad Geográfica</h3>
              <p className="leading-relaxed">
                La Plataforma está diseñada principalmente para instituciones educativas ubicadas en Perú. El acceso desde otros países puede estar sujeto a restricciones o limitaciones.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">4. Planes, Precios y Pagos</h2>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">4.1 Modelo de Suscripción</h3>
              <p className="leading-relaxed mb-4">
                Mentorium ofrece acceso a la Plataforma mediante planes de suscripción pagados. Los detalles específicos sobre planes disponibles, funcionalidades incluidas, límites de uso y precios están disponibles en nuestra página de precios (<Link href="/pricing" className="text-brand-brandeis-blue hover:underline">/pricing</Link>), la cual forma parte integral de estos Términos.
              </p>
              <p className="leading-relaxed mb-4">
                Nuestro lema de &quot;sin costo inicial&quot; se refiere a que no cobramos tarifas de implementación o configuración por adelantado. Sin embargo, el uso continuado de la Plataforma requiere una suscripción activa según el plan seleccionado.
              </p>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">4.2 Límites de Uso</h3>
              <p className="leading-relaxed mb-4">
                Cada plan de suscripción incluye límites específicos que pueden incluir (pero no se limitan a):
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Número de estudiantes activos.</li>
                <li>Número de docentes o administradores.</li>
                <li>Espacio de almacenamiento para materiales educativos.</li>
                <li>Cantidad de solicitudes a servicios de inteligencia artificial.</li>
                <li>Número de aulas o cursos activos.</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Si excede los límites de su plan, podemos contactarlo para actualizar a un plan superior. El uso que supere significativamente los límites sin coordinación previa puede resultar en la suspensión temporal del servicio.
              </p>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">4.3 Facturación y Pagos</h3>
              <p className="leading-relaxed mb-4">
                Los pagos se procesarán de acuerdo con el ciclo de facturación establecido en su plan (mensual, trimestral, anual, etc.). Usted acepta:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Proporcionar información de pago válida y actual.</li>
                <li>Autorizar el cobro recurrente automático según su ciclo de facturación.</li>
                <li>Pagar todas las tarifas e impuestos aplicables según la legislación peruana.</li>
                <li>Que podemos actualizar los precios con treinta (30) días de aviso previo.</li>
              </ul>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">4.4 Política de No Reembolso</h3>
              <p className="leading-relaxed">
                <strong>Mentorium NO ofrece reembolsos.</strong> Todas las tarifas de suscripción pagadas son finales y no reembolsables, excepto cuando lo requiera expresamente la ley peruana. Si cancela su suscripción, mantendrá acceso a la Plataforma hasta el final del período de facturación pagado, pero no se realizarán reembolsos prorrateados.
              </p>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">4.5 Suspensión por Falta de Pago</h3>
              <p className="leading-relaxed">
                Si no se procesa un pago dentro del plazo establecido, nos reservamos el derecho de suspender su acceso a la Plataforma hasta que se regularice el pago. Durante la suspensión, sus datos se conservarán de acuerdo con nuestra Política de Privacidad, pero no podrá acceder a funcionalidades de la Plataforma.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">5. Propiedad Intelectual</h2>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">5.1 Propiedad de la Plataforma</h3>
              <p className="leading-relaxed mb-4">
                La Plataforma Mentorium, incluyendo su código fuente, diseño, estructura, gráficos, interfaz de usuario, texto, logotipos, marcas comerciales, y toda la tecnología subyacente, es propiedad exclusiva de Mentorium S.A.C. o de sus licenciantes. Todos los derechos de propiedad intelectual están protegidos por las leyes de Perú y tratados internacionales.
              </p>
              <p className="leading-relaxed">
                Estos Términos le otorgan únicamente una licencia limitada, no exclusiva, no transferible y revocable para acceder y utilizar la Plataforma de acuerdo con estos Términos. Usted NO adquiere ningún derecho de propiedad sobre la Plataforma.
              </p>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">5.2 Contenido del Usuario</h3>
              <p className="leading-relaxed mb-4">
                El contenido que usted y su institución crean, cargan o generan en la Plataforma, incluyendo pero no limitado a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Planes de lecciones y materiales educativos.</li>
                <li>Evaluaciones, cuestionarios y rúbricas.</li>
                <li>Calificaciones y comentarios de estudiantes.</li>
                <li>Contenido generado con asistencia de IA.</li>
              </ul>
              <p className="leading-relaxed mt-4">
                <strong>La propiedad del Contenido del Usuario será acordada entre Mentorium y su institución educativa en el contrato de servicio específico.</strong> Generalmente:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Su institución retiene la propiedad del contenido educativo original que crea.</li>
                <li>Usted nos otorga una licencia mundial, libre de regalías, no exclusiva para usar, almacenar, procesar y mostrar dicho contenido exclusivamente para proporcionarle el Servicio.</li>
                <li>Esta licencia finaliza cuando elimina el contenido o cierra su cuenta, sujeto a nuestro período de retención de datos.</li>
              </ul>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">5.3 Contenido Generado por IA</h3>
              <p className="leading-relaxed">
                Para contenido generado con asistencia de inteligencia artificial en la Plataforma, usted reconoce y acepta que dicho contenido puede no ser único y que servicios similares podrían generar contenido comparable. Mentorium no garantiza la originalidad ni reclama derechos de propiedad sobre contenido generado por IA a su solicitud, pero usted es responsable de revisar y validar todo contenido generado por IA antes de su uso.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">6. Uso de Inteligencia Artificial</h2>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">6.1 Servicios de IA</h3>
              <p className="leading-relaxed mb-4">
                Mentorium utiliza servicios de inteligencia artificial de terceros (incluyendo OpenAI y Google) para proporcionar funcionalidades avanzadas como generación de contenido educativo, sugerencias de evaluación, recomendaciones personalizadas y análisis de datos académicos.
              </p>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">6.2 Avisos y Limitaciones de IA</h3>
              <p className="leading-relaxed mb-4">
                <strong>IMPORTANTE: No Garantizamos la Exactitud del Contenido Generado por IA.</strong> Cada funcionalidad asistida por IA en la Plataforma incluye un aviso explícito al respecto. Usted reconoce y acepta que:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>El contenido generado por IA puede contener inexactitudes, errores o sesgos.</li>
                <li>Las evaluaciones, calificaciones o recomendaciones generadas por IA son sugerencias y deben ser revisadas por educadores calificados.</li>
                <li>Usted es el único responsable de validar, aprobar y utilizar cualquier contenido generado por IA.</li>
                <li>Mentorium no asume responsabilidad por decisiones educativas basadas exclusivamente en contenido generado por IA.</li>
              </ul>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">6.3 Protección de Datos en Servicios de IA</h3>
              <p className="leading-relaxed mb-4">
                Al utilizar funcionalidades de IA:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Aplicamos técnicas de enmascaramiento para proteger datos personales sensibles antes de enviarlos a proveedores de IA.</li>
                <li>Sus datos NO se utilizan para entrenar modelos de IA de terceros.</li>
                <li>Los proveedores de IA procesan datos únicamente para generar respuestas específicas a sus solicitudes.</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Para más detalles, consulte nuestra <Link href="/privacidad" className="text-brand-brandeis-blue hover:underline">Política de Privacidad</Link>.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">7. Conducta del Usuario y Uso Prohibido</h2>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">7.1 Uso Aceptable</h3>
              <p className="leading-relaxed mb-4">
                Usted acepta utilizar la Plataforma únicamente para fines educativos legítimos y de acuerdo con todas las leyes aplicables. Específicamente, usted se compromete a NO:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Violar leyes:</strong> Usar la Plataforma para actividades ilegales o que violen regulaciones educativas peruanas.</li>
                <li><strong>Compartir cuentas:</strong> Compartir sus credenciales de acceso con terceros no autorizados.</li>
                <li><strong>Ingeniería inversa:</strong> Descompilar, realizar ingeniería inversa o intentar extraer el código fuente de la Plataforma.</li>
                <li><strong>Automatización no autorizada:</strong> Utilizar bots, scrapers o herramientas automatizadas para acceder a la Plataforma sin nuestro consentimiento previo por escrito.</li>
                <li><strong>Interferencia:</strong> Interferir con el funcionamiento de la Plataforma, incluyendo intentos de acceso no autorizado, sobrecarga de sistemas o introducción de virus o código malicioso.</li>
                <li><strong>Uso comercial no autorizado:</strong> Revender, sublicenciar o explotar comercialmente el acceso a la Plataforma sin autorización expresa.</li>
                <li><strong>Contenido inapropiado:</strong> Cargar o compartir contenido que sea ilegal, difamatorio, abusivo, discriminatorio, obsceno o que viole derechos de terceros.</li>
                <li><strong>Suplantación:</strong> Hacerse pasar por otra persona o entidad.</li>
              </ul>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">7.2 Consecuencias del Incumplimiento</h3>
              <p className="leading-relaxed">
                El incumplimiento de estas reglas puede resultar en la suspensión o terminación inmediata de su cuenta, sin previo aviso y sin reembolso, además de acciones legales si corresponde.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">8. Disponibilidad del Servicio y Nivel de Servicio</h2>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">8.1 Esfuerzos Razonables</h3>
              <p className="leading-relaxed mb-4">
                Nos esforzamos por mantener la Plataforma disponible de manera continua, pero no podemos garantizar disponibilidad ininterrumpida, acceso sin errores o libre de vulnerabilidades. La Plataforma se proporciona &quot;tal cual&quot; y &quot;según disponibilidad&quot;.
              </p>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">8.2 Acuerdos de Nivel de Servicio (SLA)</h3>
              <p className="leading-relaxed mb-4">
                Los compromisos específicos sobre disponibilidad, tiempo de actividad y soporte técnico se establecerán en Acuerdos de Nivel de Servicio (SLA) separados que pueden negociarse con clientes empresariales. En ausencia de un SLA específico, no garantizamos ningún nivel de disponibilidad particular.
              </p>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">8.3 Mantenimiento y Actualizaciones</h3>
              <p className="leading-relaxed">
                Podemos realizar mantenimiento programado o no programado que resulte en períodos de inactividad. Intentaremos notificar con anticipación sobre mantenimientos programados, pero no estamos obligados a hacerlo. No seremos responsables por interrupciones causadas por mantenimiento necesario o mejoras de la Plataforma.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">9. Limitación de Responsabilidad y Garantías</h2>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">9.1 Exclusión de Garantías</h3>
              <p className="leading-relaxed mb-4">
                <strong>EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY PERUANA:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>LA PLATAFORMA SE PROPORCIONA &quot;TAL CUAL&quot; Y &quot;SEGÚN DISPONIBILIDAD&quot; SIN GARANTÍAS DE NINGÚN TIPO, YA SEAN EXPRESAS O IMPLÍCITAS.</li>
                <li>MENTORIUM NO GARANTIZA QUE LA PLATAFORMA SERÁ ININTERRUMPIDA, SEGURA, LIBRE DE ERRORES O LIBRE DE VIRUS.</li>
                <li>NO GARANTIZAMOS LA EXACTITUD, INTEGRIDAD O UTILIDAD DEL CONTENIDO GENERADO POR IA O CUALQUIER INFORMACIÓN EN LA PLATAFORMA.</li>
                <li>NO GARANTIZAMOS QUE LA PLATAFORMA SATISFARÁ SUS REQUISITOS ESPECÍFICOS O PRODUCIRÁ RESULTADOS EDUCATIVOS PARTICULARES.</li>
              </ul>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">9.2 Limitación de Responsabilidad</h3>
              <p className="leading-relaxed mb-4">
                <strong>EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>MENTORIUM NO SERÁ RESPONSABLE POR DAÑOS INDIRECTOS, INCIDENTALES, ESPECIALES, CONSECUENTES O PUNITIVOS, INCLUYENDO PÉRDIDA DE BENEFICIOS, DATOS, USO, REPUTACIÓN O PÉRDIDAS INTANGIBLES.</li>
                <li>NUESTRA RESPONSABILIDAD TOTAL HACIA USTED POR CUALQUIER RECLAMO RELACIONADO CON LA PLATAFORMA NO EXCEDERÁ EL MONTO PAGADO POR USTED A MENTORIUM EN LOS DOCE (12) MESES ANTERIORES AL EVENTO QUE DIO ORIGEN AL RECLAMO.</li>
                <li>NO SEREMOS RESPONSABLES POR DECISIONES EDUCATIVAS, CALIFICACIONES O EVALUACIONES BASADAS EN CONTENIDO GENERADO POR IA SIN LA DEBIDA REVISIÓN HUMANA.</li>
                <li>NO SEREMOS RESPONSABLES POR PÉRDIDA DE DATOS CAUSADA POR SU INCUMPLIMIENTO DE ESTOS TÉRMINOS O POR FACTORES FUERA DE NUESTRO CONTROL RAZONABLE.</li>
              </ul>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">9.3 Reconocimiento del Usuario</h3>
              <p className="leading-relaxed">
                Usted reconoce que estas limitaciones de responsabilidad son elementos esenciales de este acuerdo y que Mentorium no ofrecería la Plataforma sin estas limitaciones.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">10. Indemnización</h2>
              <p className="leading-relaxed mb-4">
                Usted acepta indemnizar, defender y mantener indemne a Mentorium S.A.C., sus directores, funcionarios, empleados, agentes, licenciantes y proveedores de y contra cualquier reclamo, responsabilidad, daño, pérdida, costo o gasto de terceros (incluyendo honorarios razonables de abogados) que surjan de o estén relacionados con:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Su uso o mal uso de la Plataforma.</li>
                <li>Su violación de estos Términos.</li>
                <li>Su violación de derechos de terceros, incluyendo pero no limitado a derechos de propiedad intelectual, privacidad o confidencialidad.</li>
                <li>Contenido que usted carga o comparte en la Plataforma.</li>
                <li>Cualquier actividad fraudulenta o ilegal realizada a través de su cuenta.</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Mentorium se reserva el derecho de asumir la defensa exclusiva y control de cualquier asunto sujeto a indemnización por usted, en cuyo caso usted cooperará plenamente con Mentorium.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">11. Terminación y Cancelación</h2>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">11.1 Terminación por el Usuario</h3>
              <p className="leading-relaxed mb-4">
                Usted puede cancelar su suscripción en cualquier momento desde la configuración de su cuenta o contactándonos en <a href="mailto:hola@mentorium.ai" className="text-brand-brandeis-blue hover:underline">hola@mentorium.ai</a>. La cancelación será efectiva al final del período de facturación actual. No se realizarán reembolsos prorrateados.
              </p>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">11.2 Terminación por Mentorium</h3>
              <p className="leading-relaxed mb-4">
                Nos reservamos el derecho de suspender o terminar su acceso a la Plataforma, inmediatamente y sin previo aviso, si:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Viola cualquier disposición de estos Términos.</li>
                <li>Su cuenta permanece inactiva durante más de seis (6) meses consecutivos.</li>
                <li>No realiza pagos dentro de los plazos establecidos.</li>
                <li>Detectamos actividad fraudulenta, abusiva o ilegal.</li>
                <li>Es requerido por ley o orden judicial.</li>
                <li>Decidimos discontinuar la Plataforma (con aviso previo razonable).</li>
              </ul>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">11.3 Efectos de la Terminación</h3>
              <p className="leading-relaxed mb-4">
                Al terminar su cuenta:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Su derecho de acceso a la Plataforma cesará inmediatamente.</li>
                <li>Sus datos personales serán retenidos durante un (1) año adicional según nuestra Política de Privacidad, luego serán eliminados de forma segura.</li>
                <li>Puede solicitar una exportación de sus datos antes de la eliminación contactándonos.</li>
                <li>Las disposiciones de estos Términos que por su naturaleza deben sobrevivir (incluyendo limitaciones de responsabilidad, indemnización y resolución de disputas) continuarán vigentes después de la terminación.</li>
              </ul>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">12. Modificaciones a los Términos</h2>
              <p className="leading-relaxed mb-4">
                Mentorium se reserva el derecho de modificar estos Términos en cualquier momento. Cuando realicemos cambios sustanciales, le notificaremos mediante:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Un aviso destacado en la Plataforma.</li>
                <li>Un correo electrónico a la dirección registrada en su cuenta.</li>
                <li>Actualización de la fecha de &quot;Última actualización&quot; al inicio de estos Términos.</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Los cambios sustanciales entrarán en vigor treinta (30) días después de la notificación. Los cambios menores (correcciones tipográficas, aclaraciones que no afectan derechos sustanciales) pueden entrar en vigor inmediatamente. Su uso continuado de la Plataforma después de la fecha de entrada en vigor constituye su aceptación de los Términos modificados.
              </p>
              <p className="leading-relaxed mt-4">
                Si no está de acuerdo con los Términos modificados, debe cancelar su cuenta antes de que entren en vigor. No se realizarán reembolsos debido a modificaciones de los Términos.
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">13. Ley Aplicable y Resolución de Disputas</h2>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">13.1 Ley Aplicable</h3>
              <p className="leading-relaxed mb-4">
                Estos Términos se regirán e interpretarán de acuerdo con las leyes de la República del Perú, sin dar efecto a principios de conflicto de leyes. La Ley N° 29733 - Ley de Protección de Datos Personales y otras regulaciones peruanas aplicables rigen el tratamiento de datos personales.
              </p>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">13.2 Jurisdicción y Competencia</h3>
              <p className="leading-relaxed mb-4">
                Para cualquier disputa, controversia o reclamo que surja de o esté relacionado con estos Términos o la Plataforma, las partes acuerdan someterse a la jurisdicción exclusiva de los tribunales competentes de Lima, Perú, y renuncian a cualquier objeción basada en jurisdicción inconveniente o falta de jurisdicción personal.
              </p>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">13.3 Resolución Amistosa</h3>
              <p className="leading-relaxed">
                Antes de iniciar cualquier procedimiento legal, las partes acuerdan intentar resolver la disputa de buena fe mediante negociaciones directas durante un período de treinta (30) días. Si no se puede resolver, cualquiera de las partes puede iniciar procedimientos legales según lo establecido anteriormente.
              </p>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">14. Disposiciones Generales</h2>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">14.1 Acuerdo Completo</h3>
              <p className="leading-relaxed mb-4">
                Estos Términos, junto con nuestra Política de Privacidad, Política de Cookies y página de Precios, constituyen el acuerdo completo entre usted y Mentorium con respecto a la Plataforma y reemplazan todos los acuerdos, entendimientos y comunicaciones anteriores o contemporáneas, ya sean escritas u orales.
              </p>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">14.2 Divisibilidad</h3>
              <p className="leading-relaxed mb-4">
                Si cualquier disposición de estos Términos se considera inválida, ilegal o inaplicable por un tribunal competente, dicha disposición será modificada para cumplir con la ley o eliminada en la medida necesaria, y las disposiciones restantes continuarán en pleno vigor y efecto.
              </p>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">14.3 Renuncia</h3>
              <p className="leading-relaxed mb-4">
                El hecho de que Mentorium no ejerza o haga cumplir cualquier derecho o disposición de estos Términos no constituirá una renuncia a dicho derecho o disposición. Cualquier renuncia debe ser por escrito y firmada por un representante autorizado de Mentorium.
              </p>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">14.4 Cesión</h3>
              <p className="leading-relaxed mb-4">
                Usted no puede ceder o transferir estos Términos o sus derechos bajo estos Términos sin nuestro consentimiento previo por escrito. Mentorium puede ceder estos Términos en cualquier momento sin su consentimiento, incluyendo en conexión con una fusión, adquisición, reorganización o venta de activos.
              </p>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">14.5 Fuerza Mayor</h3>
              <p className="leading-relaxed mb-4">
                Mentorium no será responsable por ningún retraso o incumplimiento de sus obligaciones bajo estos Términos debido a causas fuera de su control razonable, incluyendo pero no limitado a desastres naturales, guerras, actos terroristas, disturbios, embargos, actos de autoridades civiles o militares, incendios, inundaciones, accidentes, huelgas, escasez de transporte, combustible, energía o materiales, y fallas en servicios de terceros (incluyendo proveedores de infraestructura en la nube).
              </p>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">14.6 Relación de las Partes</h3>
              <p className="leading-relaxed mb-4">
                Nada en estos Términos crea una asociación, empresa conjunta, relación laboral o de agencia entre usted y Mentorium. Usted no tiene autoridad para asumir o crear obligaciones en nombre de Mentorium.
              </p>

              <h3 className="text-xl font-semibold text-brand-dark-green mb-3 mt-6">14.7 Idioma</h3>
              <p className="leading-relaxed">
                Estos Términos han sido redactados en español. En caso de traducción a otros idiomas, la versión en español prevalecerá en caso de conflicto o discrepancia.
              </p>
            </section>

            {/* Section 15 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-4">15. Contacto</h2>
              <p className="leading-relaxed mb-4">
                Si tiene preguntas, comentarios o inquietudes sobre estos Términos y Condiciones, puede contactarnos a través de:
              </p>
              <div className="bg-brand-isabelline p-6 rounded-xl space-y-2">
                <p><strong>Mentorium S.A.C.</strong></p>
                <p>RUC: 20614793768</p>
                <p>Dirección: Av. Sergio Bernales 381, Lima, Perú</p>
                <p>Correo electrónico: <a href="mailto:hola@mentorium.ai" className="text-brand-brandeis-blue hover:underline">hola@mentorium.ai</a></p>
                <p>Teléfono: (+51) 953 719 060</p>
                <p>Horario de atención: Lunes a Viernes, 9:00 AM - 6:00 PM (Hora de Lima)</p>
              </div>
            </section>

            {/* Acceptance */}
            <section className="bg-brand-sunglow/10 p-6 rounded-xl border-2 border-brand-sunglow/30 mt-12">
              <p className="leading-relaxed font-medium text-brand-dark-green">
                <strong>Al utilizar la Plataforma Mentorium, usted reconoce que ha leído, comprendido y acepta estar legalmente obligado por estos Términos y Condiciones de Servicio.</strong>
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
