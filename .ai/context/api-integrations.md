# Integraciones API

<!-- Documentación de APIs externas: Payvalida, Twilio, etc. -->

## Payvalida
- **Propósito:** _descripción_
- **Endpoints:** _base URL, recursos_
- **Autenticación:** _tipo y cómo configurarla_
- **Errores y reintentos:** _política_

## Twilio (WhatsApp)

- **Propósito:** notificaciones y acciones de onboarding (HU-05, HU-06).
- **Onboarding / autorización (HU-05):** plantillas aprobadas Meta; botones de respuesta rápida (`Ver Política de Datos`, `Autorizar Consulta`). El botón de autorización dispara **webhook** al backend con `external_id` de la solicitud (sin navegación obligatoria a URL).
- **Entrevista PN (HU-06):** plantilla `platam_entrevista_pn` (número del agente configurable).
- **Nombres de plantillas citados en HU-05:** `platam_autorizacion_pn`, `platam_autorizacion_pj`, `platam_recordatorio_1_pn`, `platam_recordatorio_1_pj`, `platam_recordatorio_2_pn`, `platam_recordatorio_2_pj`.
- **Configuración:** variables de entorno, URLs de webhook, cumplimiento de políticas de plantillas.
- **Límites y buenas prácticas:** respetar políticas de Meta; no exponer PII en logs.

## Resend (correo transaccional)

- **Propósito:** correos de autorización y recordatorios (HU-05).
- **API:** `api.resend.com`
- **Remitente ejemplo en HU:** `Platam <noresponder@mail.platam.co>`, `reply_to`: `info@platam.co`
- **Destinatario:** según modelo de datos vigente (`users.email` en HU-05; alinear con flujo PJ self-service sin `users` — ver nota en `architecture.md`).
- **Autenticación:** API key en variable de entorno (nunca en código).

## Experian (buró de crédito)

- **Propósito:** HCPN (PN y accionista clave PJ), HCPJ (empresa); almacenamiento de respuesta (p. ej. `credit_reports.full_report_json`, `bureau_name` distinguiendo `experian`, `experian_hcpn`, `experian_hcpj` según HU-06/07).
- **Errores:** estados operativos `error_consulta_experian`, `error_consulta_hcpj`; alertas a canal técnico (Google Chat).

## Google Chat

- **Propósito:** alertas operativas (SARLAFT, errores Experian/n8n, solicitudes en estudio para analistas) según HU-06 y HU-07.

## n8n (agente AI)

- **Propósito:** orquestación de análisis crediticio y entrevista; recibe webhook desde backend con payload de solicitud y URLs de reportes en S3; devuelve resultado vía callback a API NestJS.
- **Campos de salida citados:** `agent_recomendation` (`hitl`, `auto_approve`, `auto_reject`, `interview`), `agent_recommended_loc`, URLs/HTML de análisis → persistencia en `ai_agent_analysis`.

## AWS S3

- **Propósito:** almacenamiento de reportes Experian, análisis del agente, documentos PJ (p. ej. carpeta `ppay/pj_client_docs/{{tax_id}}/eeff/` para estados financieros según HU-07).

## ZapSign
- **Propósito:** _contratos / firma electrónica (flujos posteriores a aprobación — detallar cuando exista la HU correspondiente)._

## Otras integraciones
_Listar y documentar cada una._
