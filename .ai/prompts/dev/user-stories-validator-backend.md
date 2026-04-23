Rol y contexto
Eres un arquitecto de software senior actuando como agente de planificación para un 
proyecto full-stack. Tienes acceso completo a dos repositorios:

- Backend: @platam_pay_v2/

Tu objetivo en esta sesión es ANALIZAR y PLANIFICAR, no generar código aún.

FASE 1 — Lectura y modelado del sistema (haz esto primero)

Lee los siguientes archivos EN ESTE ORDEN para construir un modelo mental completo 
antes de emitir cualquier conclusión:

1. Estructura de directorios de ambos proyectos (árbol completo)
2. Archivos de configuración base: package.json / pyproject.toml / .env.example
3. En @platam_pay_v2/.ai/user-stories/ (Especificamente el archivo @HU-06___Procesos_Backend_PN.md)
4. @platam_pay_v2/.ai/prompts/dev/transversal/user-story-execution-plan-backend.md
5. Código fuente existente relevante (modelos, rutas, componentes ya creados)

No resumas mientras lees. Construye primero el modelo completo.

FASE 2 — Análisis de cobertura (gap analysis)

Por cada User Story encontrada, evalúa si los prompts maestros la cubren completamente. Usa esta matriz:

| User Story | Cubierta en prompt BE    | Gap identificado      | Prioridad del gap   |
|------------|-------------------------|-----------------------|---------------------|
| US-XXX     | ✅ / ⚠️ Parcial / ❌   | Descripción           | Alta/Media/Baja     |

Criterios de evaluación por cada US:

- ¿Están definidos los contratos de API (request/response)?
- ¿Están especificadas las reglas de negocio y validaciones?
- ¿Están definidos los estados de error y manejo de excepciones?
- ¿Está especificado el modelo de datos (campos, tipos, relaciones)?
- ¿Están definidos los criterios de aceptación verificables?
- ¿Hay consistencia entre lo que el BE expone y lo que el FE consume?

FASE 3 — Estrategia de ejecución con Claude Code en Cursor

Con base en el análisis anterior, propón una estrategia de ejecución que maximice:

- **Autonomía**: qué puede ejecutar Claude Code sin intervención humana
- **Eficiencia**: orden óptimo de módulos para minimizar bloqueos de dependencias
- **Precisión**: qué requiere revisión humana antes de proceder

La estrategia debe incluir:

3a. Orden de ejecución por módulos
Lista los módulos en el orden en que deben desarrollarse, justificando dependencias.

3b. Gestión de contexto por sesión
Para proyectos grandes, el contexto de Claude Code se satura. Define:

- Qué archivos deben estar SIEMPRE en contexto (reglas de negocio, contratos de API)
- Qué archivos cargar solo cuando se trabaja en un módulo específico
- Qué archivos son ruido y deben excluirse del contexto

### 3c. Convenciones y fuente de verdad

Identifica si falta alguno de estos documentos que debería crearse ANTES de generar código:

- Convenciones de nombrado (variables, endpoints, componentes)
- Mapa de permisos y roles por módulo
- Especificación de contratos de API (OpenAPI/Swagger o equivalente)
- Design tokens o sistema de componentes (FE)
- Estrategia de manejo de errores estandarizada
- Seed data o fixtures para pruebas

FASE 4 — Entregables

Al finalizar el análisis entrega:

1. **Tabla de gaps** completa (Fase 2)
2. **Lista priorizada de documentos faltantes** que bloquean la generación de código precisa
3. **Roadmap de ejecución** con el orden de módulos y sus dependencias
4. **Plantilla de contexto por módulo**: qué cargar en cada sesión de Claude Code
5. **Veredicto**: ¿Se puede iniciar la generación de código ahora, o se requiere
  definir algo primero? Justifica.

---

Restricciones

- No generes código en esta sesión
- Si encuentras ambigüedad en una User Story, documéntala como gap en lugar de asumir
- Si los prompts maestros se contradicen entre sí, señálalo explícitamente
- Trata los prompts maestros como guías, NO como fuente de verdad absoluta; 
las User Stories tienen precedencia

---

FASE 5 — Resultados persistentes

1. **Guarda el análisis completo** en la carpeta `@platam_pay_v2/.ai/user-stories-plan/` siguiendo la convención ya utilizada en `hu-05-authorization-execution-plan.md`, es decir, nombre claro con prefijo `hu-XX-` y descripción del flujo (por ejemplo `hu-06-...`, `hu-07-...`). Usa `-execution-plan.md` o `-analysis.md` según el tipo de contenido, y mantén el formato de Markdown ya establecido (encabezados `##`, listas numeradas, tablas, etc.).
2. El archivo nuevo debe contener:
   - Los resultados de las fases 2 a 5 (tabla de gaps, documentos faltantes, roadmap, plantilla de contexto y veredicto).
   - La metadata mínima: título con referencia a la User Story y fecha de revisión.
3. Cuando termines la sesión, **menciona en tu informe que el archivo fue creado/actualizado** y da su ruta completa para que el equipo lo encuentre (por ejemplo: `@platam_pay_v2/.ai/user-stories-plan/hu-XX-...-execution-plan.md`).

---

FASE 6 — Plantilla reutilizable: Verificación incremental de avances en módulos/documentos

1. Indica el módulo o documento a revisar (ej: `@apps\products-ms\src\modules\credit-applications` ya fue creado).
2. Solicita: "Lee los archivos relevantes y determina qué tan cerca se encuentra [`RUTA/AL/DOCUMENTO.md`] de estar listo de acuerdo a la User Story (HU) correspondiente."
3. Si esta revisión ya se corrió previamente y solo hay cambios o adiciones recientes:
  - Instrucción: "Revisa únicamente lo nuevo o modificado desde la última verificación, y determina si con estos cambios el documento/módulo ya cumple completamente con la HU. Señala explícitamente qué gaps se han resuelto y si queda algún pendiente."
4. Registrar la evolución del cumplimiento respecto a la HU en cada iteración.

  *Ejemplo de uso concreto:*

- El módulo `@apps\products-ms\src\modules\credit-applications` se encuentra creado, lee los archivos y determina qué tan cerca se encuentra `@platam_pay_v2/.ai/context/onboarding-module-prerequisites.md` de estar listo.
- **Si ya corriste este check antes:** Solo revisa lo agregado/cambiado y actualiza el estado de cumplimiento versus la HU correspondiente.

---

## ⚠️ Pendientes Globales del Proyecto (Decisiones Arquitectónicas Abiertas)

Estos ítems afectan múltiples HUs y deben resolverse antes de poder completar los módulos correspondientes. Cuando analices cualquier HU, verifica si alguno de estos pendientes la bloquea.

| ID | Pendiente | HUs afectadas | Estado |
|---|---|---|---|
| **PEND-01** | **Migración del Agente AI de n8n a FastAPI** — n8n ya no es el orquestador. El nuevo servicio es una API FastAPI en etapa de planeación. HU-06 usa un `StubAiAgentAdapter` mientras tanto (ver sección Plan Alterno en `HU-06___Procesos_Backend_PN.md`). El contrato FastAPI (URL, auth, request/response, sync vs async) está pendiente de definición. | HU-06, HU-07 y cualquier HU que dispare análisis AI | ❌ Sin contrato |
| **PEND-02** | **Flujo `interview` del agente AI** — requiere el agente real para conducir entrevistas vía WhatsApp. El stub nunca devuelve `interview`. La plantilla Twilio `platam_entrevista_pn` tampoco está registrada aún. | HU-06 (Paso 7 — resultado interview) | ❌ Requiere agente real |
| **PEND-03** | **Mecanismo de trigger del pipeline HU-06** — no está decidido si el trigger es call async directo desde el use case, evento SQS, o job separado. Afecta el diseño del `RunCreditApplicationPipelineUseCase` y la reanudación post-SARLAFT. | HU-06 (arquitectura del pipeline completo) | ❌ Sin decidir |
| **PEND-04** | **Reanudación post-SARLAFT** — cuando el Analista libera una solicitud bloqueada en `sarlaft_match` desde el backoffice, el pipeline debe continuar desde BDME. El mecanismo de re-trigger no está definido. | HU-06 (Paso 2), HU-B07 | ❌ Sin definir |

> Cuando se resuelva cualquiera de estos pendientes, actualizar este archivo y el plan de ejecución en `.ai/user-stories-plan/hu-06-backend-pipeline-pn-execution-plan.md`.

---


