# HU-03 — Solicitud de Crédito PJ · Self-Service

**Épica:** epic-01-onboarding-underwriting  
**Tipo de cliente:** Persona Jurídica (PJ)  
**Canal:** Self-service (cliente llena el formulario directamente)  
**Última actualización:** Febrero 2026  
**Estado:** En revisión

---

## Contexto — Cómo llega el cliente a este formulario

Desde la landing de clientes del partner:

```
https://platampay.com/{{alias_partner}}
```

El cliente hace clic en el botón de Solicitud para Empresa. La landing y el formulario tienen co-branding del partner (logo, colores definidos en la tabla `partners`).

> El `partner_id` se determina automáticamente por la landing. El cliente nunca lo ve ni lo selecciona.

---

## Historia de Usuario

**Como** representante legal de una empresa que llega desde la landing de un partner,  
**quiero** completar un formulario de solicitud de crédito,  
**para** que Platam evalúe mi empresa y le asigne una línea de crédito.

---

## Formulario — Estructura Wizard (5 pasos)

El formulario PJ es más extenso que el PN. Se divide en 5 secciones con co-branding del partner.

### Campos no visibles (se resuelven automáticamente)

|Campo|Tabla|Lógica|
|---|---|---|
|`partner_id`|`credit_applications`|Se toma del alias en la URL de la landing|
|`partner_category_id`|`credit_applications`|Se asigna la categoría default del partner (`partners.default_category_id`). Se puede actualizar antes de la aprobación|

---

### Sección 1 — Datos de la Empresa

|Label|Campo DB|Tabla|Tipo|Validaciones|
|---|---|---|---|---|
|Representante de Ventas|`sales_rep_id`|`credit_applications`|Dropdown dinámico|Opcional. Trae únicamente los SRs asociados al partner con estado `activo`. Si queda vacío se asigna `partners.default_rep_id`. Hint: _"Selecciona uno o deja en blanco si no sabes"_|
|Razón Social *|`legal_name`|`businesses`|Texto|—|
|NIT *|`tax_id`|`businesses`|Numérico|Sin dígito de verificación|
|Ciudad *|`city_id`|`businesses`|Searchable dropdown|Ciudades y municipios del país del partner|
|Dirección principal de la empresa *|`business_address`|`businesses`|Texto|—|
|Correo electrónico de contacto *|`email`|`users`|Email|Formato válido|
|Año de constitución *|`year_of_establishment`|`businesses`|Numérico|Año válido, no futuro|

---

### Sección 2 — Datos del Representante Legal

|Label|Campo DB|Tabla|Tipo|Validaciones|
|---|---|---|---|---|
|Nombres *|`first_name`|`persons`|Texto|Solo letras|
|Apellidos *|`last_name`|`persons`|Texto|Solo letras|
|Tipo de documento *|`doc_type`|`persons`|Dropdown|Opciones: Cédula de ciudadanía, Cédula de extranjería|
|Número de documento *|`doc_number`|`persons`|Numérico|Min: 6 dígitos, Max: 10 dígitos|
|Número de celular *|`phone`|`users`|Selector país + numérico|Min/Max: 10 dígitos|
|Dirección del representante legal *|`residential_address`|`persons`|Texto|—|

> El representante legal queda registrado en `persons` y vinculado a la empresa en la tabla `legal_representatives` con `is_primary = true`.

---

### Sección 3 — Datos del Negocio

> Los campos marcados con [B] se almacenan en `businesses` — datos propios del negocio, estables en el tiempo.  
> Los campos marcados con [A] se almacenan en `credit_applications` — datos del momento de la solicitud, usados para el análisis de crédito y pueden cambiar entre solicitudes.

|Label|Campo DB|Tabla|Tipo|Validaciones|
|---|---|---|---|---|
|Tipo de negocio *|`business_type`|`businesses` [B]|Searchable dropdown|Códigos CIIU|
|Antigüedad del negocio *|`business_seniority`|`credit_applications` [A]|Dropdown|Opciones: Menos de 1 año / 1 a 2 años / 2 a 5 años / 5 a 10 años / Más de 10 años|
|Cantidad de locales *|`number_of_locations`|`credit_applications` [A]|Numérico|Min: 1|
|Número de empleados *|`number_of_employees`|`credit_applications` [A]|Numérico|Min: 1|
|¿Cuál es el tamaño del local principal? *|`business_flagship_m2`|`credit_applications` [A]|Numérico|Min: 1. Unidad: m²|
|¿Arrienda el(los) local(es) donde opera su negocio? *|`business_has_rent`|`credit_applications` [A]|Radio|Opciones: Sí / No|
|Valor mensual total de arriendos|`business_rent_amount`|`credit_applications` [A]|Numérico (COP)|**Condicional:** solo visible si `business_has_rent = Sí`. Min: $100.000|

---

### Sección 4 — Información Financiera

|Label|Campo DB|Tabla|Tipo|Validaciones / Notas|
|---|---|---|---|---|
|Total de activos del negocio *|`total_assets`|`credit_applications`|Numérico (COP)|Hint: _"Indica el valor total estimado de los activos del negocio (inventario, maquinaria, equipos, vehículos, locales, bodegas, etc.)"_|
|Ventas mensuales *|`monthly_income`|`credit_applications`|Numérico (COP)|Hint: _"Ingresa el promedio mensual de ventas generadas por el negocio"_|
|Gastos mensuales *|`monthly_expenses`|`credit_applications`|Numérico (COP)|Hint: _"Indica el promedio mensual de gastos en la compra y mantenimiento de inventario del negocio"_|
|¿Es cliente actual de {{partner_name}}? *|`is_current_client`|`credit_applications`|Radio|Opciones: Sí / No|
|¿Cuánto suele comprar mensualmente con {{partner_name}}?|`monthly_purchases`|`credit_applications`|Numérico (COP)|**Condicional:** solo visible si `is_current_client = Sí`|
|¿Cuánto estima que será el valor de la primera compra?|`current_purchases`|`credit_applications`|Numérico (COP)|**Condicional:** solo visible si `is_current_client = No`|
|¿Qué cupo de línea de crédito necesita? *|`requested_credit_line`|`credit_applications`|Numérico (COP)|Hint: _"Indica el monto que necesitas según tus necesidades de compra mensuales"_|
|Estados Financieros|`document_url`|`documents`|Carga múltiple de archivos|**Condicional:** solo visible si `requested_credit_line > $10.000.000`. PDF. Máximo 10MB por archivo. Se pueden subir múltiples archivos. Estados financieros dictaminados de los últimos 3 periodos contables o los disponibles si la empresa tiene menos de 3 años. Hint: _"Si aún no los tiene listos puede conseguirlos ahora y regresar para completar su solicitud"_|

---

### Sección 5 — Accionistas y Autorización

#### Accionistas

Lista de accionistas o socios con participación directa o indirecta mayor al 5% del capital social. El cliente puede agregar múltiples accionistas con el botón **"Agregar accionista"**.

**Reglas de validación del bloque:**

- Mínimo un accionista requerido
- La suma de participaciones de todos los accionistas debe ser mínimo el 75% antes de poder enviar el formulario
- El sistema muestra un indicador de progreso del porcentaje acumulado en tiempo real

**Campos por accionista — Persona Natural** (cuando `doc_type` ≠ NIT):

|Label|Campo DB|Tabla|Tipo|Validaciones|
|---|---|---|---|---|
|Nombres *|`first_name`|`persons`|Texto|Solo letras|
|Apellidos *|`last_name`|`persons`|Texto|Solo letras|
|Tipo de documento *|`doc_type`|`persons`|Dropdown|Cédula de ciudadanía, Cédula de extranjería, Permiso por Protección Temporal, NIT|
|Número de documento *|`doc_number`|`persons`|Texto|—|
|Participación % *|`ownership_percentage`|`shareholders`|Decimal|Min: 5%|

**Campos por accionista — Empresa** (cuando `doc_type` = NIT):

|Label|Campo DB|Tabla|Tipo|Validaciones|
|---|---|---|---|---|
|Razón Social *|`legal_name`|`businesses`|Texto|Reemplaza Nombres y Apellidos|
|Tipo de documento *|`doc_type`|—|Dropdown|NIT seleccionado|
|NIT *|`tax_id`|`businesses`|Numérico|Sin dígito de verificación|
|Participación % *|`ownership_percentage`|`shareholders`|Decimal|Min: 5%|

> Cuando el accionista es una empresa (NIT), el sistema despliega automáticamente un sub-bloque para capturar los **beneficiarios finales** de esa empresa accionista — las personas naturales con más del 5% de participación en ella. Este sub-bloque usa los mismos campos de Persona Natural y se puede anidar un solo nivel (no se permite empresa dentro de empresa accionista).

**Campos del sub-bloque beneficiarios finales** (se repite por cada beneficiario):

|Label|Campo DB|Tabla|Tipo|Validaciones|
|---|---|---|---|---|
|Nombres *|`first_name`|`persons`|Texto|Solo letras|
|Apellidos *|`last_name`|`persons`|Texto|Solo letras|
|Tipo de documento *|`doc_type`|`persons`|Dropdown|Cédula de ciudadanía, Cédula de extranjería, Permiso por Protección Temporal|
|Número de documento *|`doc_number`|`persons`|Texto|—|
|Participación % *|`ownership_percentage`|`shareholders`|Decimal|Min: 5% en la empresa accionista|

#### Autorización

|Label|Campo DB|Tabla|Tipo|
|---|---|---|---|
|Autorización centrales de riesgo y política de privacidad *|`privacy_policy_accepted` + `privacy_policy_date`|`credit_applications`|Checkbox (requerido)|

Texto: _"Autorizo a Platam Colombia S.A.S. a consultar a la empresa en centrales de riesgo como DATACRÉDITO, a validar datos para el análisis de crédito y acepto la Política de Privacidad de Platam."_

---

## Flujo de Envío y Almacenamiento

Al hacer clic en **Enviar**, el sistema debe:

### 1. Crear el registro en `users`

```
email        → del formulario (correo de contacto de la empresa)
phone        → del formulario (celular del representante legal)
status_id    → get_status_id('users', 'pending')
```

### 2. Crear el registro en `businesses`

```
user_id                → ID del usuario recién creado
legal_name             → del formulario (Razón Social)
tax_id                 → del formulario (NIT)
city_id                → del formulario
business_address       → del formulario
business_type          → del formulario
year_of_establishment  → del formulario
country_code           → se infiere del país del partner
```

### 3. Crear el registro en `persons` (representante legal)

```
user_id                → ID del usuario recién creado
first_name             → del formulario
last_name              → del formulario
doc_type               → del formulario
doc_number             → del formulario
residential_address    → del formulario
email        → del formulario (correo de contacto de la empresa)
phone        → del formulario (celular del representante legal)
```

### 4. Crear el registro en `legal_representatives`

```
business_id            → ID del negocio recién creado
person_id              → ID de la persona recién creada
is_primary             → true
```

### 5. Crear registros de accionistas

Por cada accionista en el formulario:

**Accionista Persona Natural:**

```
persons:
  first_name           → del formulario
  last_name            → del formulario
  doc_type             → del formulario
  doc_number           → del formulario

shareholders:
  business_id          → ID del negocio recién creado
  person_id            → ID de la persona recién creada
  ownership_percentage → del formulario
```

**Accionista Empresa (NIT):**

```
businesses:
  legal_name           → del formulario (Razón Social)
  tax_id               → del formulario (NIT)

shareholders:
  business_id          → ID del negocio principal
  shareholder_business_id → ID del negocio accionista
  ownership_percentage → del formulario

-- Por cada beneficiario final de la empresa accionista:
persons:
  first_name           → del formulario
  last_name            → del formulario
  doc_type             → del formulario
  doc_number           → del formulario

shareholders:
  business_id          → ID del negocio accionista
  person_id            → ID del beneficiario final
  ownership_percentage → del formulario
```

### 6. Crear el registro en `credit_applications`

```
user_id                  → ID del usuario recién creado
partner_id               → resuelto desde la landing
partner_category_id      → default_category_id del partner
sales_rep_id             → seleccionado en formulario o default_rep_id
business_seniority       → del formulario
number_of_employees      → del formulario
number_of_locations      → del formulario
business_flagship_m2     → del formulario
business_has_rent        → del formulario
business_rent_amount     → del formulario (si aplica)
total_assets             → del formulario
monthly_income           → del formulario
monthly_expenses         → del formulario
is_current_client        → del formulario
monthly_purchases        → del formulario (si aplica)
current_purchases        → del formulario (si aplica)
requested_credit_line    → del formulario
privacy_policy_accepted  → true
privacy_policy_date      → timestamp del envío
submission_date          → timestamp del envío
status                   → enum('en_proceso')
```

### 7. Crear registros en `documents` (si aplica)

```
-- Por cada archivo subido (solo si requested_credit_line > $10.000.000):
application_id         → ID de la solicitud recién creada
document_type          → 'estados_financieros'
document_url           → URL del archivo subido a S3
verification_status_id → get_status_id('documents', 'pending')
```

---

## Confirmación al Cliente

Tras el envío exitoso, se muestra en pantalla:

> **Solicitud de línea de crédito enviada**
> 
> ¡Hemos recibido tu solicitud de línea de crédito con Platam!  
> Nuestro equipo especializado iniciará el estudio crediticio de inmediato. Te mantendremos informado sobre el progreso de tu solicitud y te contactaremos pronto con los resultados.
> 
> Gracias por confiar en nosotros.

---

## Criterios de Aceptación

- [ ] El formulario carga con el co-branding correcto del partner según el alias en la URL
- [ ] El dropdown de Sales Reps solo muestra representantes activos del partner correspondiente
- [ ] Si el cliente no selecciona SR se asigna `default_rep_id`
- [ ] Los campos condicionales `business_rent_amount`, `monthly_purchases` y `current_purchases` se muestran u ocultan correctamente
- [ ] La sección de estados financieros solo aparece si `requested_credit_line > $10.000.000`
- [ ] Se pueden subir múltiples archivos de estados financieros
- [ ] Se puede agregar más de un accionista dinámicamente
- [ ] El sistema muestra el porcentaje acumulado de participación en tiempo real
- [ ] No se puede enviar el formulario si la suma de participaciones de accionistas es menor al 75%
- [ ] Cuando un accionista selecciona tipo de documento NIT el campo Nombres/Apellidos se reemplaza por Razón Social y se despliega el sub-bloque de beneficiarios finales
- [ ] El sub-bloque de beneficiarios finales solo acepta personas naturales (no permite NIT anidado)
- [ ] El botón Enviar está deshabilitado si `privacy_policy_accepted` no está marcado
- [ ] Al enviar se crean correctamente los registros en `businesses`, `persons`, `legal_representatives`, `shareholders` y `credit_applications`
- [ ] Si aplica, se crean los registros en `documents` con los archivos subidos a S3
- [ ] El `status` de la solicitud queda en `en_proceso`
- [ ] `submission_date` y `privacy_policy_date` se registran con el timestamp correcto
- [ ] Se muestra el mensaje de confirmación tras el envío exitoso

---

## Nota de Schema — Cambios Pendientes

> ⚠️ Esta historia depende de los cambios listados en HU-01 más:
> 
> 1. La tabla `shareholders` actualmente solo soporta `person_id`. Se necesita evaluar si debe soportar también `business_id` para accionistas tipo empresa (NIT), o crear una tabla separada `corporate_shareholders`. Pendiente de definición con Freddy antes del desarrollo de esta historia.*