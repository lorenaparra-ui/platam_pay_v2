# HU-B07-PJ — Detalle de Solicitud · Persona Jurídica (Backoffice)

**Épica:** epic-02-backoffice-admin  
**Roles:** Admin, Analista  
**Tipo de cliente:** Persona Jurídica (PJ)  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** Analista o Admin del backoffice de Platam,  
**quiero** ver el detalle completo de una solicitud de crédito PJ
y poder corregir datos ingresados incorrectamente,  
**para** revisar toda la información disponible, subsanar errores
que bloquean el pipeline y tomar una decisión crediticia.

---

## Contexto

Se accede desde HU-B06 al hacer clic en una fila con indicador PJ.
La estructura general es idéntica a HU-B07-PN (header + 6 tabs),
con las siguientes diferencias sustanciales:

- El **sujeto de crédito es una empresa**, no una persona natural.
- **SARLAFT** se consulta para múltiples personas: representante
  legal + todos los accionistas + beneficiarios finales.
- **Experian** genera dos reportes: HCPN del accionista clave y
  HCPJ de la empresa — cada uno en su propio sub-tab.
- **Info** incluye datos de la empresa, rep. legal y accionistas.
- El estado `en_entrevista` no existe en el flujo PJ.
- Puede haber documentos adjuntos desde el registro
  (estados financieros si `requested_credit_line > $10M`).

> La vista debe ser **completamente responsive**.

---

## Momentos de Uso

**Momento 1 — Pre-estudio:**

| Estado (`CreditApplicationStatus`) | Situación |
|---|---|
| `pending_authorization` | El rep. legal no ha autorizado aún |
| `in_progress` | Pipeline en ejecución |
| `duplicate` | Pipeline detenido — empresa duplicada |
| `sarlaft_match` | Pipeline detenido — coincidencia en algún involucrado |
| `experian_query_error` | Pipeline detenido — fallo en HCPN del accionista clave |
| `hcpj_query_error` | Pipeline detenido — fallo en HCPJ de la empresa |
| `ai_agent_error` | Pipeline detenido — fallo en agente AI |

**Momento 2 — En estudio:** `under_review`

**Momento 3 — Post-decisión:** `approved_pending_signature` ⚠️, `approved_signed` ⚠️, `rejected`

> ⚠️ Los estados `approved_pending_signature` y `approved_signed` están pendientes de agregar al enum (Lorena ítem 5 y 8).

---

## Layout General

Idéntico a HU-B07-PN:

```
┌──────────────────────────────────────────────────────────┐
│  Título: Razón social de la empresa                      │
│  HEADER — 3 columnas (se apila en móvil)                 │
│  Col 1: Contexto  │  Col 2: Contacto  │  Col 3: LOC + Estado + Acciones │
├──────────────────────────────────────────────────────────┤
│  TABS                                                    │
│  Info │ Experian │ Análisis AI │ SARLAFT │ Estudio │ Docs │ Contrato │
├──────────────────────────────────────────────────────────┤
│  CONTENIDO DEL TAB ACTIVO                                │
└──────────────────────────────────────────────────────────┘
```

---

## Header

### Columna 1 — Contexto de la solicitud

Idéntico a PN. El título de la página es la **razón social** de la
empresa (`businesses.legal_name`).

| Campo | Fuente DB | Tabla |
|---|---|---|
| ID Solicitud | `id` | `credit_applications` |
| Logo del partner | `logo_url` | `partners` |
| Nombre del partner | `trade_name` | `businesses` (join: `partners.business_id → businesses.id`) |
| Nombre del Sales Rep | `name` | `sales_representatives` |
| Fecha y hora de registro | `submission_date` DD/MM/AA HH:mm | `credit_applications` |

### Columna 2 — Contacto

El contacto principal es el **representante legal** de la empresa.

| Campo | Fuente DB | Tabla |
|---|---|---|
| Teléfono | `phone` | `persons` |
| Email | `email` | `users` |
| NIT de la empresa | `tax_id` | `businesses` |
| Nombre rep. legal | `first_name + last_name` | `persons` (via `legal_representatives` where `is_primary = true`) |
| Tipo y doc. rep. legal | `doc_type + doc_number` | `persons` |
| Ícono autorización (✓/✗) | `privacy_policy_accepted` | `credit_applications` |
| Ícono WhatsApp | `phone` | `users` |

> **Ícono de autorización:** tooltip con `privacy_policy_date` o
> *"Pendiente de autorización"* si no ha autorizado.

### Columna 3 — LOC, Estado y Acciones

| Campo | Fuente DB | Tabla | Visibilidad |
|---|---|---|---|
| Cupo solicitado | `requested_credit_line` | `credit_applications` | Siempre |
| LOC recomendada AI | `agent_recommended_loc` | `ai_agent_analysis` ⚠️ campo pendiente (Lorena ítem 3) | Solo cuando existe |
| Badge de estado | `status` | `credit_applications` | Siempre |

**Botón Editar** — visible en todos los estados excepto `approved_signed` ⚠️.
Abre un modal con todos los campos editables (ver sección Modal de Edición).

**Menú de acciones** (dropdown ⋮):

| Estado (`CreditApplicationStatus`) | Opciones del menú |
|---|---|
| `pending_authorization` | Reenviar autorización · Enviar recordatorio |
| `sarlaft_match` | *(se gestiona desde tab SARLAFT)* |
| `experian_query_error` | Reintentar HCPN |
| `hcpj_query_error` | Reintentar HCPJ |
| `ai_agent_error` | Reintentar agente AI |
| `duplicate` | Procesar duplicado |
| `under_review` | Acciones de decisión → HU-B08 |
| `approved_signed` ⚠️ | Ir a página de cliente |
| Otros | Sin menú |

---

## Tabs de Detalle

Los 6 tabs son **siempre visibles**. Los tabs sin contenido muestran
mensaje de estado vacío.

**Tab activo por defecto:**

| Momento | Tab activo |
|---|---|
| Pre-estudio (general) | **Info** |
| Pre-estudio con `sarlaft_match` | **SARLAFT** |
| En estudio | **Análisis AI** |
| Post-decisión | **Análisis AI** |

**Indicador en título del tab SARLAFT:**
- ✅ verde: todas las consultas ejecutadas y sin coincidencias
- 🔴 rojo: alguna consulta tiene `has_match = true`
- Sin ícono: consultas no ejecutadas aún

---

### Tab 1 — Info

Solo lectura.

#### Bloque — Datos de la empresa

| Label | Campo DB | Tabla |
|---|---|---|
| Razón social | `legal_name` | `businesses` |
| NIT | `tax_id` | `businesses` |
| Tipo de negocio (CIIU) | `business_type` | `businesses` |
| Año de constitución | `year_of_establishment` | `businesses` |
| Ciudad | `city_id` → nombre | `cities` |
| Dirección | `business_address` | `businesses` |
| Antigüedad | `business_seniority` | `credit_applications` |
| Número de empleados | `number_of_employees` | `credit_applications` |
| Cantidad de locales | `number_of_locations` | `credit_applications` |
| M² local principal | `business_flagship_m2` | `credit_applications` |
| Arrienda | `business_has_rent` | `credit_applications` |
| Valor arriendo mensual | `business_rent_amount` (condicional) | `credit_applications` |

Al final del bloque, en formato compacto:
- **Autorización:** Sí / No · `privacy_policy_accepted` — Fecha: `privacy_policy_date`

#### Bloque — Representante legal

| Label | Campo DB | Tabla |
|---|---|---|
| Nombres y apellidos | `first_name + last_name` | `persons` |
| Tipo y número de documento | `doc_type + doc_number` | `persons` |
| Dirección | `residential_address` | `persons` |

#### Bloque — Accionistas

Lista de accionistas registrados en `shareholders` para este negocio.

| Columna | Campo DB | Tabla |
|---|---|---|
| Nombre / Razón social | `first_name + last_name` o `business_name` | `persons` / `businesses` |
| Tipo documento | `doc_type` o NIT | `persons` / `businesses` |
| Número documento | `doc_number` o `tax_id` | `persons` / `businesses` |
| % participación | `ownership_percentage` | `shareholders` |
| Accionista clave | Indicador visual si es el seleccionado para HCPN | — |

> El accionista clave (seleccionado por el pipeline para la consulta
> HCPN) se resalta visualmente para que el analista sepa sobre quién
> se corrió el bureau personal.

#### Bloque — Información financiera declarada

| Label | Campo DB | Tabla |
|---|---|---|
| Cupo solicitado | `requested_credit_line` | `credit_applications` |
| Cliente actual del partner | `is_current_client` | `credit_applications` |
| Compras mensuales con partner | `monthly_purchases` (condicional) | `credit_applications` |
| Primera compra estimada | `current_purchases` (condicional) | `credit_applications` |
| Total activos del negocio | `total_assets` | `credit_applications` |
| Ingresos mensuales | `monthly_income` | `credit_applications` |
| Gastos mensuales en inventario | `monthly_expenses` | `credit_applications` |

---

### Tab 2 — Experian

Estado vacío general: *"Las consultas Experian aún no han sido ejecutadas."*

Para PJ hay dos reportes distintos, cada uno en su propio sub-tab.
Fuente: tabla `experian_queries` filtrada por `credit_application_id`.

#### Sub-tab HCPN — Accionistas

Fuente: tabla `experian_queries` filtrada por `credit_application_id`
y `query_type = 'hcpn'` (`ExperianQueryTypes.HCPN`). Puede haber múltiples registros,
uno por accionista consultado.

Si `status = 'experian_query_error'`: banner de error con mensaje de `experian_queries.error_message`
y botón "Reintentar HCPN".

##### Lista de accionistas

Se muestra una fila por cada accionista registrado en `shareholders`.
Las filas están ordenadas: accionista clave primero, resto por
`ownership_percentage` descendente.

| Columna | Descripción |
|---|---|
| Nombre | `first_name + last_name` de `persons` |
| Documento | `doc_type + doc_number` |
| % Participación | `ownership_percentage` |
| Etiqueta | "Accionista clave" si es el seleccionado por el pipeline |
| Estado | Badge: **Reporte disponible** (verde) / **Sin consulta** (gris) / **Error** (rojo) |
| Acción | Botón **Ver reporte** si existe / Botón **Consultar HCPN** si no existe |

##### Comportamiento

- **Accionista clave:** el reporte fue corrido automáticamente por el
  pipeline. Muestra botón **Ver reporte** expandido por defecto.
- **Otros accionistas sin reporte:** muestran botón **Consultar HCPN**.
  Al hacer clic el analista dispara la consulta Experian a demanda.
  Mientras procesa: spinner + estado "Consultando…". Al finalizar:
  reporte disponible en la misma fila.
- **Accionistas con reporte adicional:** muestran botón **Ver reporte**.

##### Panel de reporte (expandible por fila)

Al hacer clic en **Ver reporte** se expande debajo de la fila:
- Nombre del accionista consultado como encabezado
- Gauge visual con score
- Badge de recomendación: Aceptar / Condicional / Rechazar
- Metadatos del score extraídos de `experian_queries.credit_report` (jsonb)
- Bloque comportamiento crediticio (string + ingreso mensual)
- Botón **Copiar JSON** (solo desktop)

Solo un panel puede estar expandido a la vez.

#### Sub-tab HCPJ — Empresa

Fuente: tabla `experian_queries` filtrada por `credit_application_id`
y `query_type = 'hcpj'` (`ExperianQueryTypes.HCPJ`). Un solo registro.

Si `status = 'hcpj_query_error'`: banner de error con mensaje de
`experian_queries.error_message` y botón "Reintentar HCPJ".

Muestra la razón social de la empresa como encabezado.

Contenido extraído de `experian_queries.credit_report` (jsonb) del reporte HCPJ:
- Score empresarial (`credit_score`) (gauge visual)
- Metadatos del reporte HCPJ
- Comportamiento crediticio empresarial
- Botón **Copiar JSON** (solo desktop)

---

### Tab 3 — Análisis AI

Idéntico a HU-B07-PN. Renderiza el iframe de
`html_url_agent_analysis`. Estado vacío o banner de error según
corresponda.

---

### Tab 4 — SARLAFT

Estado vacío: *"Las consultas SARLAFT aún no han sido ejecutadas."*

Para PJ hay múltiples registros en `sarlaft_checks` (uno por persona
consultada). La fuente es la tabla `sarlaft_checks` filtrada por
`application_id`.

#### Indicador en título: ✅ / 🔴 / sin ícono

✅ si todos los registros tienen `has_match = false`.
🔴 si al menos uno tiene `has_match = true`.

#### Lista de personas consultadas

Se muestra una fila por cada persona consultada, con su resultado:

| Columna | Campo DB | Tabla |
|---|---|---|
| Nombre | `first_name + last_name` | `persons` |
| Rol | Rep. Legal / Accionista / Beneficiario final | `legal_representatives` / `shareholders` |
| % participación | `ownership_percentage` (si aplica) | `shareholders` |
| Tiene coincidencia | `has_match` → badge Sí (rojo) / No (verde) | `sarlaft_checks` |
| Resultado | `status` → `clean` / `alert` / `blocked` (`SarlaftCheckStatuses`) | `sarlaft_checks` |
| Fecha de consulta | `consulted_at` | `sarlaft_checks` |

Al hacer clic en una fila se expande el detalle completo:
`sources`, `detail`, y el bloque de revisión si aplica.

#### Bloque — Revisión de coincidencia

Visible **solo** en los registros donde `has_match = true`.
Idéntico a HU-B07-PN: notas del analista (obligatorio) + dos botones:

- **Confirmar revisión y continuar análisis:** registra `reviewed_by` ⚠️,
  `reviewed_at` ⚠️, `analyst_notes` ⚠️ (Lorena ítem 11) y reactiva el
  pipeline desde Experian (status → `CreditApplicationStatus.IN_PROGRESS`
  → `'in_progress'`).
- **Rechazar solicitud:** cierra la solicitud como rechazada.

> Si hay múltiples coincidencias, **todas** deben ser revisadas
> antes de poder continuar el análisis. El botón "Continuar análisis"
> solo se habilita cuando todos los `has_match = true` tienen
> `reviewed_by` registrado.

---

### Tab 5 — Estudio

Idéntico a HU-B07-PN. Disponible en todos los estados excepto
`pending_authorization`.

#### Bloque — Reporte del analista

| Campo | DB | Tabla | Tipo |
|---|---|---|---|
| Reporte del analista | `analyst_report` | `credit_applications` | Textarea libre |

Botón: **Guardar reporte** — persiste sin cambiar el estado.

#### Bloque — LOC a otorgar

| Campo | DB | Tabla | Tipo |
|---|---|---|---|
| LOC a otorgar | `approved_credit_line` | `credit_applications` | Numérico COP |

> Borrador de trabajo. No activa la aprobación. Se pre-carga
> automáticamente en el modal de decisión de HU-B08-PJ.

Botón: **Guardar LOC** — persiste sin cambiar el estado.

Botón combinado: **Guardar todo**

Estado vacío: *"El analista aún no ha registrado un reporte."*

---

### Tab 6 — Docs

Igual que PN, el analista puede subir documentos en cualquier
momento y estado.

Para PJ pueden existir documentos desde el registro si
`requested_credit_line > $10M` (estados financieros migrados
en el paso 6 del pipeline).

Estado vacío: *"No hay documentos adjuntos a esta solicitud."*

Lista desde `documents` filtrada por `application_id`.

| Columna | Campo DB | Tabla |
|---|---|---|
| Tipo de documento | `document_type` | `documents` |
| Subido por | `uploaded_by` → nombre ⚠️ (Lorena ítem 10) | `documents` + `users` |
| Estado de verificación | `verification_status` (`DocumentVerificationStatus`) | `documents` |
| Enlace de descarga | `document_url` (S3) | `documents` |
| Fecha de carga | `created_at` | `documents` |

Botón: **Subir documento** — igual que en HU-B07-PN.

---

### Tab 7 — Contrato

Idéntico a HU-B07-PN.

Estado vacío: *"Contrato no generado aún."*

| Label | Campo DB | Tabla |
|---|---|---|
| URL de firma | `sign_url` | `contract_signers` ⚠️ (Lorena ítem 9) |
| Estado | `state` (`ContractCatalogStatus`: `pending` / `signed` / `cancelled`) | `contracts` |
| Fecha de envío | `created_at` | `contracts` |
| Fecha de firma | `signed_at` | `contract_signers` ⚠️ (Lorena ítem 9) |
| Archivo firmado | `signed_file_url` | `contracts` |

---


## Modal de Edición

El botón **Editar** está disponible en todos los estados excepto
`approved_signed` ⚠️. Se ubica en la columna 3 del header, junto al
menú de acciones.

Al hacer clic abre un modal con todos los campos que el cliente o
SR completaron en el formulario de registro PJ, organizados en las
mismas secciones del tab Info.

### Campos editables — Datos de contacto

| Campo | Tabla | Columna |
|---|---|---|
| Teléfono | `persons` | `phone` |
| Email | `users` | `email` |

### Campos editables — Datos de la empresa

| Campo | Tabla | Columna |
|---|---|---|
| Razón social | `businesses` | `legal_name` |
| NIT | `businesses` | `tax_id` |
| Tipo de negocio (CIIU) | `businesses` | `business_type` |
| Año de constitución | `businesses` | `year_of_establishment` |
| Ciudad | `businesses` | `city_id` |
| Dirección | `businesses` | `business_address` |
| Antigüedad | `credit_applications` | `business_seniority` |
| Número de empleados | `credit_applications` | `number_of_employees` |
| Cantidad de locales | `credit_applications` | `number_of_locations` |
| M² local principal | `credit_applications` | `business_flagship_m2` |
| Arrienda | `credit_applications` | `business_has_rent` |
| Valor arriendo mensual | `credit_applications` | `business_rent_amount` |

### Campos editables — Representante legal

| Campo | Tabla | Columna |
|---|---|---|
| Nombres | `persons` | `first_name` |
| Apellidos | `persons` | `last_name` |
| Tipo de documento | `persons` | `doc_type` |
| Número de documento | `persons` | `doc_number` |
| Dirección | `persons` | `residential_address` |

### Campos editables — Accionistas

La lista de accionistas es editable en línea dentro del modal:
- Editar datos de cada accionista existente (nombres, doc, %)
- Agregar un accionista nuevo
- Eliminar un accionista (requiere confirmación)

> Cambios en accionistas afectan la tabla `shareholders` y
> pueden afectar la selección del accionista clave para HCPN.
> Se muestra advertencia si el accionista clave es modificado
> o eliminado.

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
- Si se editan campos críticos para Experian HCPN (`doc_type`,
  `doc_number`, `first_name`, `last_name` del accionista clave)
  y el reporte ya fue ejecutado, se muestra una **advertencia**:
  *"Has modificado datos usados en la consulta HCPN. El reporte
  existente puede no corresponder a los datos actuales. Puedes
  relanzar la consulta desde el menú de acciones."*
- Si se editan campos críticos para Experian HCPJ (`tax_id`,
  `legal_name`) y el reporte ya fue ejecutado, advertencia análoga.
- El botón Guardar permanece activo — el analista decide si relanzar.

### Log de auditoría

Mismo esquema que PN. Cada guardado genera una entrada en
`application_edit_logs` con `{field, table, old_value, new_value}`
por cada campo modificado.

---

## Responsive (Móvil)

Idéntico a HU-B07-PN. Adicionalmente:
- La lista de accionistas en Info usa formato de tarjetas apiladas.
- La lista de personas SARLAFT usa tarjetas expandibles apiladas.
- Los sub-tabs de Experian (HCPN / HCPJ) se comportan como
  selector secundario bajo el tab principal.
- Modal de edición ocupa pantalla completa en móvil.

---

## Criterios de Aceptación

- [ ] El título de la página es la razón social de la empresa
- [ ] El header col. 2 muestra datos del rep. legal como contacto principal
- [ ] El header col. 3 es idéntico a PN con el menú de acciones correcto
  incluyendo `hcpj_query_error`
- [ ] El tab activo por defecto sigue la lógica de los 3 momentos
- [ ] En `sarlaft_match` el tab activo es SARLAFT
- [ ] Tab Info muestra empresa + rep. legal + accionistas + financieros
- [ ] El accionista clave se resalta visualmente en la lista de accionistas
- [ ] Tab Experian tiene dos sub-tabs: HCPN y HCPJ
- [ ] HCPN muestra lista de todos los accionistas, clave primero y resto por % desc
- [ ] El accionista clave tiene etiqueta visible y su reporte expandido por defecto
- [ ] Accionistas sin reporte muestran botón "Consultar HCPN" que dispara consulta a demanda
- [ ] Mientras procesa una consulta se muestra spinner en la fila correspondiente
- [ ] Solo un panel de reporte puede estar expandido a la vez
- [ ] Banner de error en fila del accionista clave si `status = 'experian_query_error'`
- [ ] HCPJ muestra la razón social como encabezado
- [ ] Banner de error en HCPJ si `status = 'hcpj_query_error'`
- [ ] Tab SARLAFT muestra una fila por cada persona consultada
- [ ] Cada fila SARLAFT es expandible con detalle completo
- [ ] El bloque de revisión aparece solo en registros con `has_match = true`
- [ ] El botón "Continuar análisis" solo se habilita cuando todas las
  coincidencias han sido revisadas
- [ ] Al confirmar todas las revisiones SARLAFT, status → `in_progress`
- [ ] Tab Docs puede recibir documentos en cualquier estado
- [ ] Si existen estados financieros migrados por el pipeline, aparecen en Docs
- [ ] Tab Contrato idéntico a PN
- [ ] En móvil accionistas y personas SARLAFT usan tarjetas apiladas
- [ ] Todos los campos monetarios están formateados en COP
- [ ] Los 7 tabs son siempre visibles
- [ ] El tab Estudio no aparece en `pending_authorization`
- [ ] Guardar reporte/LOC no cambia el estado de la solicitud
- [ ] El tab Estudio muestra los valores guardados previamente si existen
- [ ] Vista de solo lectura excepto: notas SARLAFT, carga de documentos, modal de edición y tab Estudio
- [ ] El botón Editar no aparece en `approved_signed` ⚠️
- [ ] El modal incluye todos los campos del formulario PJ: contacto, empresa, rep. legal, accionistas, financiero
- [ ] Los accionistas son editables en línea dentro del modal (editar, agregar, eliminar)
- [ ] Al guardar no se re-dispara el pipeline
- [ ] Advertencia visible si se editan campos críticos de HCPN o HCPJ después de que los reportes corrieron
- [ ] Cada guardado genera entrada en `application_edit_logs`

---

## Nota de Schema

Ver [SCHEMA_PENDIENTE_LORENA.md](./SCHEMA_PENDIENTE_LORENA.md) para el
detalle completo de cambios pendientes. Los que afectan esta historia:

- **Ítem 5** — `CreditApplicationStatus.APPROVED_PENDING_SIGNATURE`
- **Ítem 8** — `CreditApplicationStatus.APPROVED_SIGNED`
- **Ítem 9** — Entidad `contract_signers` y enum `ContractSignerState`
- **Ítem 10** — `documents.uploaded_by bigint FK → users.id`
- **Ítem 11** — `sarlaft_checks.reviewed_by/reviewed_at/analyst_notes`

> La tabla `sarlaft_checks` existente cubre PJ sin cambios adicionales —
> la FK a `persons` y el `application_id` permiten múltiples registros
> por solicitud.
>
> Pendiente con Freddy: confirmar cómo se almacena qué persona fue
> seleccionada como accionista clave para HCPN. Opciones:
> - Campo `is_key_shareholder boolean` en `shareholders`
> - Campo `key_shareholder_person_id` en `credit_applications`
