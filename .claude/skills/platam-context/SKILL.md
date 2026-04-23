---
name: platam-context
description: Contexto de dominio de negocio de Platam Pay: glosario de términos, arquitectura general del sistema, integraciones con servicios externos y decisiones arquitectónicas clave. Usar cuando se necesita entender qué hace el sistema, qué significa un término de negocio en el código, o cómo se conectan los tres repositorios del workspace.
---

# Contexto del Proyecto — Platam Pay V2

## ¿Qué es Platam?

Platam es una fintech colombiana que opera como plataforma de crédito. El sistema permite a partners (aliados comerciales) ofrecer productos financieros (créditos/préstamos) a sus clientes bajo un modelo de co-branding.

## Los Tres Repositorios del Workspace

| Repo | Propósito | Stack |
|---|---|---|
| `platam_pay_v2` | Backend principal — NestJS monorepo con 5 microservicios | TypeScript, NestJS, PostgreSQL |
| `platam_pay_v2_frontend` | Frontend de la plataforma — portal web para partners y gestión | Next.js 16, React 19, Tailwind |
| `platam_microservices` | Microservicios de validación y consultas externas — deployados en AWS Lambda/ECS | Python 3.11, Node.js, Lambda, ECS |

## Glosario de Términos de Negocio

| Término | Significado en el código |
|---|---|
| **Partner** | Empresa aliada que integra Platam para ofrecer créditos. En BD: tabla `partners`, entidad `PartnerEntity`. |
| **Supplier** | Sinónimo de Partner en el contexto del microservicio `suppliers-ms`. |
| **HU** | Historia de Usuario — las branches siguen el patrón `feature/HU-{número}-{descripcion}`. |
| **PN** | Persona Natural — segmento de clientes individuales (vs. PJ = Persona Jurídica). |
| **HCP** | Historial Crediticio de Personas — consulta a Datacrédito (Experian) para score crediticio. HCPN = Natural, HCPJ = Jurídica. |
| **SARLAFT** | Sistema de Administración del Riesgo de Lavado de Activos y Financiación del Terrorismo — validación de listas restrictivas obligatoria por regulación colombiana. |
| **RUES** | Registro Único Empresarial y Social — registro oficial de empresas en Colombia. Scrapeado para validar datos de empresas. |
| **BDME** | Base de Datos de Medidas de Embargo — registro judicial colombiano. |
| **Rama Judicial** | Sistema judicial colombiano — se consulta para verificar antecedentes. |
| **ZapSign** | Servicio de firma electrónica integrado en `contracts-ms` para firma de contratos. |
| **Saga** | Patrón de orquestación async usado en `suppliers-ms` para el onboarding de partners (múltiples pasos: validar docs, crear usuario Cognito, subir archivos a S3). |
| **ExternalId** | UUID expuesto en la API. El ID interno (bigint) nunca sale del backend. |
| **Onboarding** | Proceso de registro y validación de un nuevo partner. Involucra: documentos, cuentas bancarias, validación SARLAFT/RUES, firma de contrato. |
| **Co-branding** | Los partners tienen su propio logo y colores en el frontend. Se inyectan como CSS custom properties dinámicamente. |

## Flujo de Onboarding de un Partner

```
1. Partner sube documentos + datos → suppliers-ms (saga async)
   ├─ Valida NIT contra RUES (platam_microservices)
   ├─ Valida contra SARLAFT (platam_microservices)
   └─ Sube archivos a S3 (transversal-ms)
2. Revisión manual (estado en BD)
3. Firma de contrato → contracts-ms + ZapSign
4. Activación del partner → puede ofrecer productos
```

## Flujo de Crédito (Persona Natural)

```
1. Cliente solicita crédito → products-ms
   ├─ Consulta HCP-N en Experian (platam_microservices) → score crediticio
   ├─ Valida SARLAFT (platam_microservices)
   └─ Valida Rama Judicial (platam_microservices)
2. Decisión automática (score ≥ 600 → aprobado, 1-400 → rechazado, else → revisión)
3. Aprobado → contrato → desembolso
4. Notificaciones → notifications-ms (email + WhatsApp)
```

## Arquitectura de Comunicación

- **platam_pay_v2 → platam_microservices:** HTTP via API Gateway AWS con JWT Cognito
- **Entre microservicios NestJS:** SQS para operaciones async (saga pattern)
- **Frontend → Backend:** HTTP directo a los microservicios NestJS vía Axios
- **Autenticación unificada:** AWS Cognito — los tokens JWT son válidos en ambos sistemas

## Decisiones Arquitectónicas Relevantes

**¿Por qué dos sistemas backend separados?**
Los microservicios Python en `platam_microservices` hacen web scraping con Playwright (RUES, BDME) o integran SOAPscomplejos (Experian). Estos tienen requisitos de runtime (Python, browser) incompatibles con el monorepo NestJS.

**¿Por qué externalId + id?**
El `id` bigint es más eficiente para joins en PostgreSQL. El `externalId` UUID previene enumeración de recursos desde la API pública.

**¿Por qué sagas para el onboarding?**
El onboarding involucra múltiples pasos que pueden fallar independientemente (upload a S3, crear usuario en Cognito, notificar). El patrón saga permite compensación y reintento por paso.

**¿Por qué un frontend separado del backend?**
Permite deployar el frontend en CDN/Vercel independientemente, escalar cada capa por separado, y separar equipos de trabajo.

## Integraciones Externas

| Servicio | Propósito | Microservicio |
|---|---|---|
| AWS Cognito | Autenticación y gestión de usuarios | transversal-ms |
| AWS S3 | Almacenamiento de documentos y archivos | transversal-ms |
| AWS SQS | Colas async entre microservicios | todos |
| AWS EventBridge | Schedulers para productos | products-ms |
| Experian / Datacrédito | Score crediticio colombiano (SOAP) | platam_microservices/experian-hcp |
| RUES | Validación de empresas (scraping) | platam_microservices/rues |
| SARLAFT | Listas restrictivas AML | platam_microservices/sarlaft |
| Rama Judicial | Antecedentes judiciales | platam_microservices/rama-judicial |
| ZapSign | Firma electrónica de contratos | contracts-ms |
| Twilio | SMS y WhatsApp | notifications-ms |
| Resend | Emails transaccionales | notifications-ms |
| 2Captcha | Resolver CAPTCHAs en scraping policial | platam_microservices/sarlaft |

## Áreas con Deuda Técnica Conocida

- **Tests de integración:** No existen — solo unit tests con mocks. Las integraciones AWS no tienen cobertura automática.
- **Frontend tests:** No hay test suite configurado en `platam_pay_v2_frontend`.
- **CI/CD:** Los microservicios Python en `platam_microservices` se deployean manualmente via PowerShell + AWS CLI (no hay pipelines automáticos).
- **Inconsistencia en idioma:** La documentación interna (`.ai/`, `.claude/`) mezcla español e inglés. Los mensajes de error de la API están en español.
