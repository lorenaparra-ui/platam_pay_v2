---
name: aws-microservices
description: Patrones de los microservicios AWS de Platam (platam_microservices): Lambda + SQS + DynamoDB para jobs async, ECS Fargate para scraping con Playwright, y el patrón de API Gateway compartido con JWT Cognito. Usar cuando se trabaja con SARLAFT, RUES, Experian HCP, Rama Judicial o BDME, o al entender cómo deployar o testear estos servicios.
---

# AWS Microservices — platam_microservices

## Servicios y su Stack

| Servicio | Lenguaje | Deployment | Patrón |
|---|---|---|---|
| **SARLAFT** | Python 3.11 | Lambda (API + Worker) | Async job |
| **RUES** | Node.js 18 + Playwright | ECS Fargate | Sync scraping |
| **Experian HCP** | Python 3.8 + zeep | Lambda Container | Sync SOAP |
| **Rama Judicial** | Python 3.11 | Lambda (API + Worker) | Async job |
| **BDME** | Python 3.11 | Lambda API + ECS Worker | Async job híbrido |

## Patrón Async Job (SARLAFT, Rama Judicial, BDME)

```
POST /v1/{servicio}/jobs → Lambda API
  ├─ Validar payload
  ├─ Generar job_id
  ├─ DynamoDB: { job_id, status: "queued", ... }
  └─ SQS: encolar mensaje
       ↓
     Lambda Worker / ECS Task
       ├─ DynamoDB: status → "processing"
       ├─ Ejecutar lógica (scraping, validación, etc.)
       └─ DynamoDB: status → "done" | "failed"

GET /v1/{servicio}/jobs/{job_id} → Lambda API
  └─ Leer DynamoDB → retornar status + output
```

Estados de job: `queued` → `processing` → `done` | `failed`

## API Gateway Compartido

- **Una sola HTTP API v2:** `platam-api-{env}` (e.g., `platam-api-prod`)
- **JWT:** Cognito pool/cliente — mismo que platam_pay_v2
- **Rutas:**
  - `POST /v1/sarlaft/jobs`, `GET /v1/sarlaft/jobs/{id}`
  - `GET /v1/rues/scrape?nit={nit}`
  - `POST /v1/experian-hcp`
  - `POST /v1/rama-judicial/jobs`, `GET /v1/rama-judicial/jobs/{id}`
  - `POST /v1/bdme/jobs`, `GET /v1/bdme/jobs/{id}`
  - `GET /health`

## Patrón Handler Lambda (Python)

```python
# Extracción de método y path (HTTP API v2.0)
def _extract_http(event: Dict[str, Any]) -> Tuple[str, str]:
    rc = event.get("requestContext", {}).get("http", {})
    method = str(rc.get("method", "")).upper()
    path = event.get("rawPath") or event.get("path") or ""
    return method, path

# Parsing de body (con soporte a base64)
def _parse_json_body(event: Dict[str, Any]) -> Dict[str, Any]:
    raw = event.get("body") or "{}"
    if event.get("isBase64Encoded"):
        raw = base64.b64decode(raw).decode("utf-8")
    return json.loads(raw)

# Respuesta para HTTP API v2 vs invocación directa
def _wrap_lambda_response(raw_event: dict, payload: dict) -> dict:
    if raw_event.get("version") == "2.0" and "requestContext" in raw_event:
        return {"statusCode": 200, "body": json.dumps(payload, ensure_ascii=False)}
    return payload  # Invocación directa (sin API Gateway)
```

## Manejo de Batch Failures en SQS (Worker)

```python
def worker_handler(event: Dict[str, Any], _context: Any) -> Dict:
    failures: List[Dict[str, str]] = []
    for record in event.get("Records", []):
        message_id = record.get("messageId", "")
        try:
            _process_record(record)
        except Exception:
            failures.append({"itemIdentifier": message_id})
    return {"batchItemFailures": failures}  # Solo reintenta los fallidos (DLQ)
```

## Dockerfiles Multi-target (Lambda Python)

```dockerfile
# docs/{servicio}/{servicio}-deploy/Dockerfile
FROM public.ecr.aws/lambda/python:3.11 AS base
WORKDIR ${LAMBDA_TASK_ROOT}
RUN yum install -y gcc libxml2-devel libxslt-devel && yum clean all
COPY requirements_backend.txt .
RUN pip install --no-cache-dir -r requirements_backend.txt --target "${LAMBDA_TASK_ROOT}"
COPY . ${LAMBDA_TASK_ROOT}

FROM base AS api
CMD ["sarlaft_backend.api_handler"]

FROM base AS worker
CMD ["sarlaft_backend.worker_handler"]
```

```bash
# Build por target
docker build --target api    -t platam-sarlaft-api:v1.0.0 .
docker build --target worker -t platam-sarlaft-worker:v1.0.0 .
```

## Dockerfile ECS Fargate (RUES — Playwright)

```dockerfile
FROM mcr.microsoft.com/playwright:v1.57.0-jammy
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

## Correlation ID (RUES — Node.js)

```javascript
function getCorrelationId(req) {
    const incoming = req.headers['x-correlation-id'];
    return (incoming && incoming.trim()) ? incoming.trim() : crypto.randomUUID();
}
res.setHeader('x-correlation-id', correlationId);
```

## Variables de Entorno Clave

| Variable | Descripción |
|---|---|
| `AWS_PROFILE` | Perfil SSO para CLI local |
| `AWS_REGION` | `us-east-1` (default) |
| `APP_PREFIX` | `platam` — prefijo de todos los recursos |
| `ENV` | `dev` / `staging` / `prod` |
| `COGNITO_POOL_ID` | Pool de Cognito compartido |
| `SARLAFT_JOBS_TABLE` | Tabla DynamoDB de jobs |
| `SARLAFT_QUEUE_URL` | URL de la cola SQS |
| `POLICIA_2CAPTCHA_KEY` | API key para resolver CAPTCHAs |
| `BDME_USE_MOCK_SCRAPER` | `true` en dev para evitar scraping real |
| `BDME_USE_LOCAL_STORE` | `true` en tests locales (FakeDynamoDB) |

## Tests Locales (Smoke Tests)

Cada servicio tiene su smoke test que usa fakes en lugar de AWS real:

```bash
# Python (SARLAFT, Rama Judicial, BDME)
python smoke_test_async_local.py       # Usa FakeTable, FakeSQS en memoria

# Node.js (RUES)
npm run smoke                          # quick_test.js — scraping real contra RUES
```

## Deploy (AWS CLI — no hay CI/CD automático)

```powershell
# Autenticarse
aws sso login --profile $env:AWS_PROFILE

# Subir imagen a ECR
aws ecr get-login-password | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com
docker push <account>.dkr.ecr.us-east-1.amazonaws.com/platam-sarlaft-api:v1.0.0

# Actualizar Lambda con nueva imagen
aws lambda update-function-code --function-name platam-sarlaft-api-prod --image-uri <uri>
```

Los runbooks completos están en `e:/Platam/platam_microservices/aws/aws-new-account-deployment-runbook.md`.
