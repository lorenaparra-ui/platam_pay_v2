# Lógica de Negocio

<!-- Reglas de negocio detalladas: BNPL, factoring, confirming, flujos de aprobación, cobranza, etc. -->

## Dominios
- **BNPL (Buy Now Pay Later):** línea de crédito (LOC) asociada al partner; solicitud → estudio → decisión (analista o automática vía agente).
- **Factoring:** _reglas_
- **Confirming:** _reglas_

## Flujos
- Aprobación de crédito
- Cobranza y waterfall de pagos
- Onboarding y KYC



## Estados y transiciones
_Definir máquinas de estado por entidad en diagramas bajo `.ai/diagrams/`; alinear códigos con tabla `statuses`._

### Estados adicionales citados en pipelines (HU-06/07)
Incluyen entre otros: `duplicado`, `coincidencia_sarlaft`, `error_consulta_experian`, `error_consulta_hcpj` (PJ), `error_agente_ai`, `en_entrevista` (PN), `en_estudio`, `aprobado_en_firma`, `rechazado`. Verificar existencia en seeds y añadir vía migración incremental si faltan.
