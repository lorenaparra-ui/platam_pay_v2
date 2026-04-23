# Glosario Fintech

<!-- Términos del dominio usados en el proyecto. Fuente canónica: mantener aquí las definiciones; `.cursor/rules/00-context.mdc` solo enlaza a este archivo. -->

| Término | Definición |
|---------|------------|
| **BNPL** | Buy Now Pay Later – compra ahora y paga después (cuotas). |
| **Factoring** | Cesión de facturas/cuentas por cobrar a un factor que anticipa el cobro. |
| **Confirming** | Financiamiento para que el comprador pague a sus proveedores en tiempo y forma. |
| **LOC** | Line of Credit – línea de crédito. |
| **KYC** | Know Your Customer – verificación de identidad y datos del cliente. |
| **KYB** | Know Your Business – verificación de datos de empresa (p. ej. RUES en flujo PJ). |
| **Waterfall** | Orden de aplicación de pagos (intereses, principal, comisiones, etc.). |
| **Partner** | Comercial aliado en modelo multi-partner; define co-branding y categorías por defecto. |
| **Alias partner** | Segmento de URL que resuelve `partner_id` en landings públicas o de SR. |
| **Sales Rep (SR)** | Representante de ventas del partner; en flujos autenticados su `sales_representative_id` se asocia a la solicitud. |
| **Self-service** | Cliente o representante legal completa el formulario sin sesión SR (HU-01, HU-03). |
| **Co-branding** | Identidad visual del partner en landings y formularios según `partners`. |
| **Solicitud de crédito** | Registro principal de intención de LOC; entidad `credit_applications` en modelo de datos. |
| **`external_id`** | UUID público de la solicitud; usado en URL de autorización `/auth/{{external_id}}` (HU-05). |
| **HITL** | Human In The Loop – caso escalado a analista humano tras agente AI. |
| **HCPN** | Historia de crédito persona natural (consulta Experian en flujos documentados). |
| **HCPJ** | Historia de crédito persona jurídica / empresa (Experian por NIT). |
| **SARLAFT** | Listas restrictivas / cumplimiento LA/FT consultadas antes o durante el pipeline. |
| **Accionista clave** | Persona cuyo HCPN representa al grupo en el flujo PJ; selección por RL accionista o mayor participación (HU-07). |
| **Beneficiario final** | Persona natural con participación > umbral dentro de un accionista jurídico (un nivel de anidación). |
| **CIIU** | Clasificación Industrial Internacional Uniforme – tipo de actividad económica del negocio. |
| **DATACRÉDITO / Experian** | Central de riesgo / buró referenciado en textos legales y plantillas (HU-05, HU-06, HU-07). |
| **RUES** | Registro Único Empresarial y Social (validación empresa en flujo PJ, citado en HU-05). |

_Términos añadidos a partir de `.ai/user-stories/hu-products-ms/` (2026). Completar según evolucione el dominio._
