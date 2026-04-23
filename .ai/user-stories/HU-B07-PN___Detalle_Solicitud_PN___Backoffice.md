# HU-B07-PN — Detalle de Solicitud · Persona Natural (Backoffice)

**Épica:** epic-02-backoffice-admin  
**Roles:** Admin, Analista  
**Tipo de cliente:** Persona Natural (PN)  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** Analista o Admin del backoffice de Platam,  
**quiero** ver el detalle completo de una solicitud de crédito PN
y poder corregir datos ingresados incorrectamente,  
**para** revisar toda la información disponible, subsanar errores
que bloquean el pipeline y tomar una decisión crediticia.

---

## Contexto

Se accede desde HU-B06 al hacer clic en una fila. Aplica únicamente
a solicitudes de Persona Natural.

La vista responde a **tres momentos de uso**:

**Momento 1 — Pre-estudio:**
La solicitud aún no completó el pipeline. El analista gestiona
la situación puntual (autorización, duplicado, error, coincidencia
SARLAFT). No hay datos de bureau ni análisis AI disponibles.

| Estados (`CreditApplicationStatus`) | Situación |
|---|---|
| `pending_authorization` | El cliente no ha autorizado aún |
| `in_progress` | Pipeline en ejecución |
| `in_interview` | Agente AI realizando entrevista al cliente |
| `duplicate` | Pipeline detenido — solicitud duplicada detectada |
| `sarlaft_match` | Pipeline detenido — coincidencia en listas restrictivas |
| `experian_query_error` | Pipeline detenido — fallo técnico en Experian |
| `ai_agent_error` | Pipeline detenido — fallo técnico en agente AI |

**Momento 2 — En estudio:**
El pipeline completó. El analista tiene todos los datos disponibles
y debe tomar una decisión. Estado: `under_review`.

**Momento 3 — Post-decisión:**
La solicitud fue resuelta. El analista o admin audita el proceso.
Estados: `approved_pending_signature` ⚠️, `approved_signed` ⚠️, `rejected`.

> ⚠️ Los estados `approved_pending_signature` y `approved_signed` están pendientes de agregar al enum (Lorena ítem 5 y 8).

> La vista debe ser **completamente responsive**. Los analistas
> revisan solicitudes desde móvil fuera de horario de oficina.
> En móvil el header se apila verticalmente y los tabs se
> convierten en un selector desplegable.

---

## Layout General

```
┌──────────────────────────────────────────────────────────┐
│  Título: Nombre completo del cliente                     │
│  HEADER — 3 columnas (se apila en móvil)                 │
│  Col 1: Contexto  │  Col 2: Contacto  │  Col 3: LOC + Estado + Acciones │
├──────────────────────────────────────────────────────────┤
│  TABS (siempre visibles — selector dropdown en móvil)    │
│  Info │ Experian │ Análisis AI │ SARLAFT │ Estudio │ Docs │ Contrato │
├──────────────────────────────────────────────────────────┤
│  CONTENIDO DEL TAB ACTIVO                                │
└──────────────────────────────────────────────────────────┘
```

---

## Header

El header es idéntico para todos los estados.

### Columna 1 — Contexto de la solicitud

| Campo | Fuente DB | Tabla |
|---|---|---|
| ID Solicitud | `id` | `credit_applications` |
| Logo del partner | `logo_url` | `partners` |
| Nombre del partner | `trade_name` | `businesses` (join: `partners.business_id → businesses.id`) |
| Nombre del Sales Rep | `name` | `sales_representatives` |
| Fecha y hora de registro | `submission_date` DD/MM/AA HH:mm | `credit_applications` |

### Columna 2 — Contacto del cliente

| Campo | Fuente DB | Tabla |
|---|---|---|
| Teléfono | `phone` | `persons` |
| Email | `email` | `users` |
| Tipo y número de documento | `doc_type + doc_number` | `persons` |
| Ícono autorización (✓/✗) | `privacy_policy_accepted` | `credit_applications` |
| Ícono WhatsApp (acceso directo) | `phone` | `persons` |

> **Ícono de autorización:** tooltip al hacer hover/tap con
> `privacy_policy_date`. Si no ha autorizado: *"Pendiente de autorización"*.

### Columna 3 — LOC, Estado y Acciones

| Campo | Fuente DB | Tabla | Visibilidad |
|---|---|---|---|
| Cupo solicitado | `requested_credit_line` | `credit_applications` | Siempre |
| LOC recomendada AI | `agent_recommended_loc` | `ai_agent_analysis` ⚠️ campo pendiente (Lorena ítem 3) | Solo cuando existe |
| Badge de estado | `status` | `credit_applications` | Siempre |

**Botón Editar** — visible en todos los estados excepto `approved_signed`.
Abre un modal con todos los campos editables (ver sección Modal de Edición).

**Menú de acciones** (dropdown ⋮ — condicional por estado):

| Estado (`CreditApplicationStatus`) | Opciones del menú |
|---|---|
| `pending_authorization` | Reenviar autorización · Enviar recordatorio |
| `sarlaft_match` | *(se gestiona desde tab SARLAFT)* — no hay menú |
| `experian_query_error` | Reintentar consulta Experian |
| `ai_agent_error` | Reintentar agente AI |
| `duplicate` | Procesar duplicado |
| `under_review` | Acciones de decisión → HU-B08 |
| `approved_signed` ⚠️ | Ir a página de cliente |
| Otros | Sin menú |

---

## Tabs de Detalle

Los 6 tabs son **siempre visibles** independientemente del estado.
Si un tab no tiene contenido muestra un mensaje informativo.

**Tab activo por defecto según momento:**

| Momento | Tab activo por defecto |
|---|---|
| Momento 1 — Pre-estudio | **Info** |
| Momento 2 — En estudio | **Análisis AI** |
| Momento 3 — Post-decisión | **Análisis AI** |

> Excepción en Momento 1: si `status = 'sarlaft_match'`,
> el tab activo por defecto es **SARLAFT** para que el analista
> aterrice directamente en la acción requerida.

**En móvil:** los tabs se reemplazan por un selector dropdown.

**Indicador visual en título del tab SARLAFT:**
- ✅ verde: consulta ejecutada y `has_match = false`
- 🔴 rojo: consulta ejecutada y `has_match = true`
- Sin ícono: consulta no ejecutada aún

---

### Tab 1 — Info

Datos declarados al momento del registro. Solo lectura.

#### Bloque — Datos del negocio

| Label | Campo DB | Tabla |
|---|---|---|
| Nombre del negocio | `business_name` | `businesses` |
| Tipo de negocio (CIIU) | `business_type` | `businesses` |
| Relación con el negocio | `relationship_to_business` | `businesses` |
| Ciudad | `city_id` → nombre | `cities` |
| Dirección del negocio | `business_address` | `businesses` |
| Antigüedad | `business_seniority` | `credit_applications` |
| Número de empleados | `number_of_employees` | `credit_applications` |
| Cantidad de locales | `number_of_locations` | `credit_applications` |
| M² local principal | `business_flagship_m2` | `credit_applications` |
| Arrienda | `business_has_rent` | `credit_applications` |
| Valor arriendo mensual | `business_rent_amount` (condicional) | `credit_applications` |

Al final del bloque, en formato compacto:
- **Autorización:** Sí / No · `privacy_policy_accepted` — Fecha: `privacy_policy_date`

#### Bloque — Información financiera declarada

| Label | Campo DB | Tabla |
|---|---|---|
| Cupo solicitado | `requested_credit_line` | `credit_applications` |
| Cliente actual del partner | `is_current_client` | `credit_applications` |
| Compras mensuales con partner | `monthly_purchases` (condicional) | `credit_applications` |
| Primera compra estimada | `current_purchases` (condicional) | `credit_applications` |
| Total activos | `total_assets` | `credit_applications` |
| Ingresos mensuales | `monthly_income` | `credit_applications` |
| Gastos mensuales en inventario | `monthly_expenses` | `credit_applications` |

---

### Tab 2 — Experian

Estado vacío: *"La consulta Experian aún no ha sido ejecutada."*

Si `status = 'experian_query_error'`: banner de error con el
mensaje almacenado en `experian_queries.error_message` y botón "Reintentar"
(equivalente al menú de acciones del header).

Fuente: tabla `experian_queries` filtrada por `credit_application_id`
y `query_type = 'hcpn'` (`ExperianQueryTypes.HCPN`).

#### Bloque — Score y metadatos

Gauge visual con `credit_score` al centro.  
Badge de recomendación: Aceptar / Condicional / Rechazar.

Los siguientes campos se extraen de `credit_report` (jsonb):

| Label |
|---|
| Tipo de puntaje Experian |
| Puntaje Experian |
| Fecha del puntaje |
| Población Experian |
| Razón (código) |

Botón: **Copiar JSON** — copia `credit_report` al portapapeles.
Solo visible en desktop.

#### Bloque — Comportamiento crediticio

| Label |
|---|
| Comportamiento de crédito (string, ej: NNNNNNN...) |
| Ingreso mensual Experian (COP) |

---

### Tab 3 — Análisis AI

Estado vacío: *"El análisis de IA aún no ha sido generado."*

Si `status = 'ai_agent_error'`: banner de error con detalle y
botón "Reintentar agente AI".

Fuente: `html_url_agent_analysis` de tabla `ai_agent_analysis`.

Renderiza exclusivamente un **iframe** apuntando a
`html_url_agent_analysis`, a ancho y alto completo del panel.

---

### Tab 4 — SARLAFT

Estado vacío: *"La consulta SARLAFT aún no ha sido ejecutada."*

Para PN hay un único registro (la persona natural).
Fuente: tabla `sarlaft_checks` filtrada por `application_id`.

#### Indicador en título del tab: ✅ / 🔴 / sin ícono

#### Bloque — Resultado de la consulta

| Label | Campo DB | Tabla |
|---|---|---|
| Nombre consultado | `first_name + last_name` | `persons` |
| Tiene coincidencia | `has_match` → badge Sí (rojo) / No (verde) | `sarlaft_checks` |
| Resultado | `status` → `clean` / `alert` / `blocked` (`SarlaftCheckStatuses`) ⚠️ | `sarlaft_checks` |
| Fecha de consulta | `consulted_at` | `sarlaft_checks` |
| Fuentes consultadas | `sources` (lista) | `sarlaft_checks` |
| Detalle / observaciones | `detail` | `sarlaft_checks` |

#### Bloque — Revisión de coincidencia

Visible **solo** cuando `has_match = true`.

Cuando hay coincidencia el proceso queda en `sarlaft_match`
bloqueado hasta revisión del analista. Las coincidencias frecuentemente
corresponden a homónimos y requieren criterio humano.

Campos editables (antes de confirmar):
- **Notas del analista** (`analyst_notes`) — textarea obligatorio

Botones disponibles:
- **Confirmar revisión y continuar análisis:**
  registra `reviewed_by`, `reviewed_at`, `analyst_notes` ⚠️ (campos pendientes Lorena ítem 11)
  y reactiva el pipeline desde Experian (status → `in_progress`).
- **Rechazar solicitud:**
  cierra la solicitud con `status = 'rejected'`.

Campos de solo lectura (post-revisión):

| Label | Campo DB |
|---|---|
| Revisado por | `reviewed_by` → nombre del analista |
| Fecha de revisión | `reviewed_at` |
| Notas del analista | `analyst_notes` |

---

### Tab 5 — Estudio

Disponible en **todos los estados** excepto `pending_authorization`.
Es el espacio de trabajo del analista: permite documentar el
dictamen y pre-definir la LOC antes de tomar la decisión final.

Esto permite que un analista complete su análisis, guarde su
recomendación y espere autorización o confirmación de otro
miembro del equipo antes de ejecutar la aprobación o rechazo
desde HU-B08.

#### Bloque — Reporte del analista

| Campo | DB | Tabla | Tipo |
|---|---|---|---|
| Reporte del analista | `analyst_report` | `credit_applications` | Textarea libre — sin límite de caracteres |

Botón: **Guardar reporte** — persiste `analyst_report` sin cambiar
el estado de la solicitud.

#### Bloque — LOC a otorgar

| Campo | DB | Tabla | Tipo |
|---|---|---|---|
| LOC a otorgar | `approved_credit_line` | `credit_applications` | Numérico COP |

> Este campo **no activa la aprobación**. Es un borrador de trabajo
> que el analista puede guardar y modificar. La aprobación formal
> ocurre en HU-B08 donde este valor se pre-carga automáticamente.

Botón: **Guardar LOC** — persiste `approved_credit_line` sin
cambiar el estado de la solicitud.

> Ambos campos son independientes — se pueden guardar por separado
> o juntos con un botón **Guardar todo**.

Estado vacío: *"El analista aún no ha registrado un reporte."*

---

### Tab 6 — Docs

El analista puede subir documentos en **cualquier momento y desde
cualquier estado**. Para PN no hay documentos obligatorios en el
registro, pero el analista puede requerirlos durante el estudio.

Estado vacío: *"No hay documentos adjuntos a esta solicitud."*

Lista desde tabla `documents` filtrada por `application_id`.

| Columna | Campo DB | Tabla |
|---|---|---|
| Tipo de documento | `document_type` | `documents` |
| Subido por | `uploaded_by` → nombre ⚠️ | `documents` + `users` (Lorena ítem 10) |
| Estado de verificación | `verification_status` (`DocumentVerificationStatus`) | `documents` |
| Enlace de descarga | `document_url` (S3) | `documents` |
| Fecha de carga | `created_at` | `documents` |

Botón: **Subir documento** — abre modal con:
- Dropdown: tipo de documento
- Carga de archivo (PDF, JPG, PNG — máx. 10MB)
- Al confirmar: sube a S3, crea registro en `documents` con
  `application_id` y `uploaded_by = id del analista en sesión`

---

### Tab 7 — Contrato

Estado vacío: *"Contrato no generado aún."*

Fuente: tabla `contracts` + `contract_signers` filtrado por
`application_id`.

| Label | Campo DB | Tabla |
|---|---|---|
| URL de firma | `sign_url` | `contract_signers` ⚠️ entidad pendiente (Lorena ítem 9) |
| Estado | `state` (`ContractCatalogStatus`) | `contracts` |
| Fecha de envío | `created_at` | `contracts` |
| Fecha de firma | `signed_at` | `contract_signers` ⚠️ |
| Archivo firmado | `signed_file_url` | `contracts` |

---


## Modal de Edición

El botón **Editar** está disponible en todos los estados excepto
`approved_signed` ⚠️. Se ubica en la columna 3 del header, junto al
menú de acciones.

Al hacer clic abre un modal con todos los campos que el cliente o
SR completaron en el formulario de registro, organizados en las
mismas secciones del tab Info para facilitar la navegación.

### Campos editables — Datos de contacto

| Campo | Tabla | Columna |
|---|---|---|
| Teléfono | `persons` | `phone` |
| Email | `users` | `email` |

### Campos editables — Datos personales / del cliente

| Campo | Tabla | Columna |
|---|---|---|
| Tipo de documento | `persons` | `doc_type` |
| Número de documento | `persons` | `doc_number` |
| Nombres | `persons` | `first_name` |
| Apellidos | `persons` | `last_name` |

### Campos editables — Datos del negocio

| Campo | Tabla | Columna |
|---|---|---|
| Nombre del negocio | `businesses` | `business_name` |
| Tipo de negocio (CIIU) | `businesses` | `business_type` |
| Relación con el negocio | `businesses` | `relationship_to_business` |
| Ciudad | `businesses` | `city_id` |
| Dirección | `businesses` | `business_address` |
| Antigüedad | `credit_applications` | `business_seniority` |
| Número de empleados | `credit_applications` | `number_of_employees` |
| Cantidad de locales | `credit_applications` | `number_of_locations` |
| M² local principal | `credit_applications` | `business_flagship_m2` |
| Arrienda | `credit_applications` | `business_has_rent` |
| Valor arriendo mensual | `credit_applications` | `business_rent_amount` |

### Campos editables — Información financiera

| Campo | Tabla | Columna |
|---|---|---|
| Cupo solicitado | `credit_applications` | `requested_credit_line` |
| Cliente actual del partner | `credit_applications` | `is_current_client` |
| Compras mensuales con partner | `credit_applications` | `monthly_purchases` |
| Primera compra estimada | `credit_applications` | `current_purchases` |
| Total activos | `credit_applications` | `total_assets` |
| Ingresos mensuales | `credit_applications` | `monthly_income` |
| Gastos mensuales en inventario | `credit_applications` | `monthly_expenses` |

### Comportamiento del modal

- Aplica las mismas validaciones del formulario original.
- Al guardar: persiste los cambios directamente en las tablas
  correspondientes. **No re-dispara el pipeline automáticamente.**
- Si se editan campos críticos para Experian (`doc_type`,
  `doc_number`, `first_name`, `last_name`) y Experian ya fue
  ejecutado, se muestra una **advertencia**: *"Has modificado datos
  usados en la consulta Experian. El reporte existente puede no
  corresponder a los datos actuales. Puedes relanzar la consulta
  desde el menú de acciones."*
- El botón Guardar permanece activo — el analista decide si relanzar.

### Log de auditoría

Cada vez que el analista guarda cambios se registra una entrada
en la tabla `application_edit_logs`:

```dbml
-- ⚠️ Tabla pendiente de crear (Lorena ítem 12)
Table application_edit_logs {
  id bigint [pk]
  external_id uuid [not null, unique]
  application_id bigint [not null, ref: > credit_applications.id]
  edited_by bigint [not null, ref: > users.id]
  edited_at timestamptz [not null, default: `now()`]
  changes jsonb [not null,
    note: "Array de {field, table, old_value, new_value}"]
}
```

El log es visible para Admin en una sección futura de auditoría.
Por ahora solo se registra, no se muestra en esta vista.

---

## Responsive (Móvil)

| Elemento | Comportamiento en móvil |
|---|---|
| Header 3 columnas | Se apila: Contexto → Contacto → LOC + Estado + Acciones |
| Menú de acciones | Botón de ancho completo |
| Tabs | Selector dropdown con tab activo visible |
| Tablas de datos | Lista de pares label: valor |
| Gauge Experian | 60% del ancho, centrado |
| Botón Copiar JSON | Se oculta en móvil |
| Iframe Análisis AI | Scroll horizontal habilitado |
| Modal de edición | Ocupa pantalla completa |

---

## Criterios de Aceptación

- [ ] El header muestra las 3 columnas correctamente para todos los estados
- [ ] El badge de estado tiene el color correcto
- [ ] El cupo solicitado es siempre visible en columna 3
- [ ] La LOC recomendada AI solo aparece cuando existe registro en `ai_agent_analysis`
- [ ] El menú de acciones es condicional según estado
- [ ] "Ir a página de cliente" solo aparece en `approved_signed` ⚠️
- [ ] El ícono de autorización muestra tooltip con fecha o "Pendiente"
- [ ] Los 7 tabs son siempre visibles
- [ ] Los tabs sin contenido muestran su mensaje de estado vacío
- [ ] El tab Estudio no aparece en `pending_authorization`
- [ ] Guardar reporte/LOC no cambia el estado de la solicitud
- [ ] El tab Estudio muestra los valores guardados previamente si existen
- [ ] El tab activo por defecto es correcto según el momento de uso
- [ ] Cuando `status = 'sarlaft_match'` el tab activo por defecto es SARLAFT
- [ ] El tab SARLAFT muestra ✅ / 🔴 en el título según `has_match`
- [ ] El bloque de revisión SARLAFT solo aparece cuando `has_match = true`
- [ ] "Confirmar revisión" reactiva el pipeline desde Experian (status → `in_progress`)
- [ ] "Rechazar solicitud" desde SARLAFT cierra la solicitud como rechazada
- [ ] El tab Experian muestra banner de error cuando `status = 'experian_query_error'`
- [ ] El tab Análisis AI muestra banner de error cuando `status = 'ai_agent_error'`
- [ ] El tab Análisis AI renderiza únicamente el iframe de `html_url_agent_analysis`
- [ ] Botón Copiar JSON copia `credit_report` (jsonb, solo desktop)
- [ ] El botón "Subir documento" funciona en cualquier estado
- [ ] Los documentos subidos tienen `application_id` y `uploaded_by` correctos
- [ ] El tab Contrato muestra los datos de ZapSign cuando existen
- [ ] En móvil el header se apila correctamente
- [ ] En móvil los tabs son un selector dropdown
- [ ] Todos los campos monetarios están formateados en COP
- [ ] La vista es de solo lectura excepto: notas SARLAFT, carga de documentos y modal de edición
- [ ] El botón Editar no aparece en `approved_signed` ⚠️
- [ ] El modal de edición muestra todos los campos del formulario original incluyendo teléfono y email
- [ ] Al guardar, los cambios se persisten sin re-disparar el pipeline
- [ ] Los cambios quedan registrados en el log de auditoría con usuario y timestamp
- [ ] Si se edita doc. número o nombre después de Experian corrido, el analista ve una advertencia y decide si relanzar manualmente

---

## Nota de Schema

> Los siguientes cambios necesarios para esta historia están documentados en `SCHEMA_PENDIENTE_LORENA.md`:
>
> - **`sarlaft_checks` ya existe** en el schema. Pendiente: agregar campos `reviewed_by`, `reviewed_at`, `analyst_notes` (ítem 11) y cambiar el enum de `status` a `SarlaftCheckStatuses` (`clean`/`alert`/`blocked`) (ítem 6).
> - **`documents.uploaded_by`** — campo pendiente de agregar (ítem 10).
> - **`application_edit_logs`** — tabla pendiente de crear (ítem 12).
> - **`contract_signers`** — entidad pendiente de crear (ítem 9).
> - **`ai_agent_analysis.agent_recommended_loc`** — campo pendiente de agregar (ítem 3).
>
> **Impacto en backend:** cuando el analista confirma la revisión SARLAFT, el backend debe reactivar el pipeline desde el paso de Experian (status → `in_progress`). Confirmar con Freddy.
