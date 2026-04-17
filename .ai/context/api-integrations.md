# Integraciones API

<!-- APIs de terceros + microservicios AWS documentados en platam_microservices (RUES, SARLAFT, BDME, Rama Judicial, JWT). -->

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

---

## Microservicios AWS (repo `platam_microservices`)

Consultas y validaciones expuestas detrás de **una HTTP API (API Gateway v2) por ambiente**, compartida entre servicios. La documentación operativa vive en el monorepo hermano **`platam_microservices`** (rutas relativas a la raíz de ese repo).

### Panorama común (contrato HTTP)

- **Base URL (patrón):** `https://{ApiId}.execute-api.{region}.amazonaws.com/{stage}` — el `ApiId` **no** es fijo entre cuentas ni conviene versionarlo; obtenerlo con `aws apigatewayv2 get-apis` (ver runbooks).
- **Stage en la ruta:** las peticiones deben incluir el segmento `/{stage}/` (p. ej. `prod`) antes de `/v1/...`. Sin `/{stage}/` suele devolverse **404** genérico de API Gateway (documentado en RUES).
- **Health único:** existe **una** ruta `GET /v1/health` compartida; qué integración (Lambda / VPC Link) responde depende del despliegue, no del JWT.
- **Separación sync vs async:** **RUES** es **síncrono** (latencia alta, Playwright en ECS). **SARLAFT**, **Rama Judicial** y **BDME** siguen el patrón **async** `POST …/jobs` → **202** + `job_id`, luego `GET …/jobs/{job_id}` hasta `done` / `failed` (estado en DynamoDB vía Lambda API).

### Autenticación JWT (Cognito) en API Gateway

- El control de acceso está en **API Gateway** (`AuthorizationType: JWT` + `AuthorizerId`); las Lambdas y el contenedor RUES **no** reimplementan validación JWT en el código de aplicación (salvo decisiones explícitas futuras).
- **Issuer / Audience:** deben alinearse con el **User Pool** y el **App client** de Cognito usados por Platam Pay. Fórmula de issuer: `https://cognito-idp.{region}.amazonaws.com/{pool_id}`; **Audience** = **Client ID** del app client.
- **Token recomendado en pruebas y en integración típica con HTTP API:** **Id token** de Cognito en `Authorization: Bearer <token>` (el authorizer valida issuer/audience; si un cliente envía por error el **access token** sin `aud` coherente, se obtiene **401** — ver guía JWT §10–11).
- **Guía operativa (reasignar JWT a rutas, inventario, pruebas curl/Postman, OAuth refresh):** `platam_microservices/jwt/jwt-api-gateway-config.md`.
- **Creación inicial del autorizador y Cognito:** `platam_microservices/docs/sarlaft-main/aws-deploy-sarlaft.md` (apartado **6.6**). RUES reutiliza el mismo autorizador en rutas (Parte II **11.2** del runbook RUES).

#### Tabla de rutas estándar (`RouteKey` exactos)

| Servicio | Método | Ruta |
|----------|--------|------|
| SARLAFT | POST | `/v1/sarlaft/jobs` |
| SARLAFT | GET | `/v1/sarlaft/jobs/{job_id}` |
| RUES | GET | `/v1/rues/scrape` |
| Health | GET | `/v1/health` |
| Rama Judicial | POST | `/v1/rama-judicial/jobs` |
| Rama Judicial | GET | `/v1/rama-judicial/jobs/{job_id}` |
| BDME | POST | `/v1/bdme/jobs` |
| BDME | GET | `/v1/bdme/jobs/{job_id}` |

*(Fuente: `jwt-api-gateway-config.md` §4.)*

### Integración con `platam_pay_v2` (NestJS)

1. **Llamadas solo desde backend:** exponer estos `execute-api` al navegador final implica CORS, riesgo de abuso y gestión de tokens en cliente; el patrón alineado al resto del monorepo es un **adaptador HTTP en el microservicio Nest** (p. ej. `products-ms` / dominio que persista `sarlaft_checks`, `web_queries` con tipos `bdme` / `rama_judicial`, etc.) que invoque la HTTP API con credenciales de servicio o token de máquina obtenido de forma segura.
2. **Configuración sugerida (variables de entorno):** definir al menos una **URL base** ya con stage, por ejemplo `PLATAM_MS_API_BASE_URL=https://{ApiId}.execute-api.{region}.amazonaws.com/prod` (sin barra final o con una convención única en el `HttpModule`) y opcionalmente timeouts distintos por tipo de servicio (RUES síncrono vs polling de jobs).
3. **Cabeceras:** `Content-Type: application/json`; `Authorization: Bearer …`; opcional `x-correlation-id` para trazas (ejemplo en smoke BDME).
4. **Jobs asíncronos:** tras `POST` **202**, persistir `job_id` y hacer **polling** con backoff hacia `GET …/{job_id}` hasta estado terminal; manejar **DLQ / failed** según reglas de negocio y alertas (p. ej. Google Chat ya citado arriba para SARLAFT).
5. **Alineación de datos:** el esquema en Pay v2 ya contempla entidades como `sarlaft_checks` y `web_query_type` (`bdme`, `rama_judicial`); al implementar casos de uso, mapear respuestas de estos servicios a esos modelos sin duplicar PII innecesariamente en logs.

### RUES (scraping Registro Único)

- **Runbook:** `platam_microservices/docs/rues-main/aws-deploy-rues.md`.
- **Runtime:** ECS Fargate + Playwright → ALB interno → **VPC Link** → API Gateway (excepción “browser en Fargate” frente a Lambda).
- **Endpoints:** `GET /v1/rues/scrape?nit=<NIT>` (consulta síncrona); `GET /v1/health`; `GET /api/health` (alias útil para health check del target group).
- **Notas operativas:** alta latencia; revisar `API_STAGE_PREFIX` en contenedor si el stage se antepone en la ruta hacia la app; troubleshooting **504** (VPC Link, SG puerto 3000 ALB→ECS), **404** (falta `/{stage}/`), **401** (JWT vacío o token incorrecto).

### SARLAFT (validación asíncrona)

- **Runbook:** `platam_microservices/docs/sarlaft-main/aws-deploy-sarlaft.md`.
- **Flujo:** API Gateway → Lambda **API** → DynamoDB + SQS → Lambda **Worker** → DynamoDB (`queued` → `processing` → `done` | `failed`).
- **Endpoints:** `POST /v1/sarlaft/jobs`, `GET /v1/sarlaft/jobs/{job_id}`.
- **Contrato POST (JSON mínimo documentado):** `nombres`, `documento`, `tipo_documento` (p. ej. `"CC"`), `user_id`, `ip_address`, `force_refresh` (boolean). Respuesta **202** con `job_id` y estado inicial típico `queued`.
- **GET:** incluye `status`; si `done`, `output` y `output_truncated`.

### BDME (consulta BDME async + worker con navegador)

- **Runbook:** `platam_microservices/docs/scraper-bdme-main/aws-deploy-bdme.md`.
- **Runtime:** Lambda **bdme-api** (submit/status) + cola SQS + worker **ECS Fargate** (o VPS con misma imagen) por necesidad de Playwright/CAPTCHA; no debe haber **dos** consumidores concurrentes contra la misma cola.
- **Endpoints:** `POST /v1/bdme/jobs`, `GET /v1/bdme/jobs/{job_id}`, `GET /v1/health`.
- **Ejemplo de cuerpo POST:** `{"numero_id":"…","tipo":"CC","motivo":"contractual","descargar_pdf":false}` (el runbook indica normalización de motivos como `autoconsulta` → `contractual` en pruebas locales).
- **JWT en rutas:** sección **9.8** del runbook BDME, alineada con `jwt-api-gateway-config.md`.

### Rama Judicial (consulta procesos, async)

- **Runbook:** `platam_microservices/docs/scraper-rama-judicial-main/aws-deploy-rama-judicial.md`.
- **Runtime:** dos **Lambdas** desde imagen ECR (`api` / `worker`); scraping por HTTP (`requests`), sin headless en el diseño actual.
- **Endpoints:** `POST /v1/rama-judicial/jobs`, `GET /v1/rama-judicial/jobs/{job_id}`.
- **Ejemplo de cuerpo POST:** `{"tipo_persona":"juridica","razon_social":"…","solo_recientes":true}`.
- **Errores frecuentes integración:** **403** si falta `lambda:AddPermission` o el `SourceArn` de la política no coincide con el `ApiId` real (**8.4–8.4.1** del runbook); JSON del POST en **body raw**, no en query string; evitar barra final extra en `/jobs` vs `/jobs/`.

### Errores y diagnóstico (referencia rápida)

| Síntoma | Causa probable (ver guía JWT §12) |
|---------|-----------------------------------|
| 404 en execute-api | Falta `/{stage}/` en la URL o `API_ID` incorrecto |
| 401 con Bearer | Token expirado, Access vs Id token, ClientId ≠ Audience |
| 403 sin llegar a Lambda | Permisos de invocación Lambda / `SourceArn` desalineado |
| 500 con JWT válido | Error en Lambda/worker o integración; CloudWatch + `get-integration` |

## Otras integraciones
_Listar y documentar cada una no cubierta arriba (p. ej. Payvalida cuando exista contrato definitivo)._
