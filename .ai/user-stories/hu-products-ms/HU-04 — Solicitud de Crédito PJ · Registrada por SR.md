# HU-04 — Solicitud de Crédito PJ · Registrada por SR

**Épica:** epic-01-onboarding-underwriting  
**Tipo de cliente:** Persona Jurídica (PJ)  
**Canal:** Sales Rep (el SR llena el formulario en nombre del cliente)  
**Última actualización:** Abril 2026  
**Estado:** En revisión

---

## Contexto — Cómo llega el SR a este formulario

Desde la landing de representantes de ventas del partner:

```
https://platampay.com/partner/{{alias_partner}}
```
El SR hace clic en el botón de solicitud para Empresa. La landing 
y el formulario tienen co-branding del partner (logo, colores 
definidos en la tabla `partners`).

> El `partner_id` y el `sales_rep_id` se resuelven automáticamente 
> desde la sesión autenticada del SR. No son campos visibles en el 
> formulario.

**Dependencia:** Esta historia requiere que el flujo de autenticación 
y portal de Sales Reps esté completo antes de poder desarrollarse.

---

## Historia de Usuario

**Como** Sales Rep autenticado en el portal de mi partner,  
**quiero** registrar la solicitud de crédito de una empresa cliente,  
**para** que Platam inicie el estudio crediticio y contacte al 
representante legal para completar el proceso de autorización.

---

## Formulario — Estructura Wizard (5 pasos)

El formulario PJ por SR es idéntico en campos al HU-03 con tres 
diferencias: los labels están dirigidos al SR, no incluye checkbox 
de autorización al final, y el SR puede seleccionar múltiples 
categorías de negocio.

### Campos no visibles (se resuelven automáticamente)

| Campo | Tabla | Lógica |
|---|---|---|
| `partner_id` | `credit_applications` | Se toma del alias en la URL de la landing |
| `sales_rep_id` | `credit_applications` | Se toma de la sesión autenticada del SR |

---

### Sección 1 — Datos de la Empresa

| Label | Campo DB | Tabla | Tipo | Validaciones |
|---|---|---|---|---|
| Categoría de negocio | `partner_category_id` | `application_categories` | Dropdown multiselect | Trae las categorías activas del partner. El SR puede seleccionar una o más. Si queda vacío se asigna `partners.default_category_id` |
| Razón Social * | `legal_name` | `businesses` | Texto | — |
| NIT * | `tax_id` | `businesses` | Numérico | Sin dígito de verificación |
| Ciudad * | `city_id` | `businesses` | Searchable dropdown | Ciudades y municipios del país del partner |
| Dirección principal de la empresa * | `business_address` | `businesses` | Texto | — |
| Correo electrónico de contacto * | `email` | `users` | Email | Formato válido |
| Año de constitución * | `year_of_establishment` | `businesses` | Numérico | Año válido, no futuro |

---

### Sección 2 — Datos del Representante Legal

| Label | Campo DB | Tabla | Tipo | Validaciones |
|---|---|---|---|---|
| Nombres * | `first_name` | `persons` | Texto | Solo letras |
| Apellidos * | `last_name` | `persons` | Texto | Solo letras |
| Tipo de documento * | `doc_type` | `persons` | Dropdown | Opciones: Cédula de ciudadanía, Cédula de extranjería |
| Número de documento * | `doc_number` | `persons` | Numérico | Min: 6 dígitos, Max: 10 dígitos |
| Número de celular * | `phone` | `users` | Selector país + numérico | Min/Max: 10 dígitos |
| Dirección del representante legal * | `residential_address` | `persons` | Texto | — |

> El representante legal queda registrado en `persons` y vinculado 
> a la empresa en `legal_representatives` con `is_primary = true`.

---

### Sección 3 — Datos del Negocio

> Los campos marcados con [B] se almacenan en `businesses`.  
> Los campos marcados con [A] se almacenan en `credit_applications`.

| Label | Campo DB | Tabla | Tipo | Validaciones |
|---|---|---|---|---|
| Tipo de negocio * | `business_type` | `businesses` [B] | Searchable dropdown | Códigos CIIU |
| Antigüedad del negocio * | `business_seniority` | `credit_applications` [A] | Dropdown | Opciones: Menos de 1 año / 1 a 2 años / 2 a 5 años / 5 a 10 años / Más de 10 años |
| Cantidad de locales * | `number_of_locations` | `credit_applications` [A] | Numérico | Min: 1 |
| Número de empleados * | `number_of_employees` | `credit_applications` [A] | Numérico | Min: 1 |
| ¿Cuál es el tamaño del local principal? * | `business_flagship_m2` | `credit_applications` [A] | Numérico | Min: 1. Unidad: m² |
| ¿El cliente arrienda el(los) local(es) donde opera su negocio? * | `business_has_rent` | `credit_applications` [A] | Radio | Opciones: Sí / No |
| Valor mensual total de arriendos | `business_rent_amount` | `credit_applications` [A] | Numérico (COP) | **Condicional:** solo visible si `business_has_rent = Sí`. Min: $100.000 |

---

### Sección 4 — Información Financiera

| Label | Campo DB | Tabla | Tipo | Validaciones / Notas |
|---|---|---|---|---|
| Total de activos del negocio * | `total_assets` | `credit_applications` | Numérico (COP) | Hint: *"Indica el valor total estimado de los activos del negocio (inventario, maquinaria, equipos, vehículos, locales, bodegas, etc.)"* |
| Ventas mensuales * | `monthly_income` | `credit_applications` | Numérico (COP) | Hint: *"Ingresa el promedio mensual de ventas generadas por el negocio"* |
| Gastos mensuales * | `monthly_expenses` | `credit_applications` | Numérico (COP) | Hint: *"Indica el promedio mensual de gastos en la compra y mantenimiento de inventario del negocio"* |
| ¿Es cliente actual de {{partner_name}}? * | `is_current_client` | `credit_applications` | Radio | Opciones: Sí / No |
| ¿Cuánto suele comprar mensualmente con {{partner_name}}? | `monthly_purchases` | `credit_applications` | Numérico (COP) | **Condicional:** solo visible si `is_current_client = Sí` |
| ¿Cuánto estima que será el valor de la primera compra? | `current_purchases` | `credit_applications` | Numérico (COP) | **Condicional:** solo visible si `is_current_client = No` |
| ¿Qué cupo de línea de crédito necesita el cliente? * | `requested_credit_line` | `credit_applications` | Numérico (COP) | Hint: *"Indica el monto según las necesidades de compra mensuales del cliente"* |
| Estados Financieros | `document_url` | `documents` | Carga múltiple de archivos | **Condicional:** solo visible si `requested_credit_line > $10.000.000`. PDF. Máximo 10MB por archivo. Se pueden subir múltiples archivos. Estados financieros dictaminados de los últimos 3 periodos contables o los disponibles si la empresa tiene menos de 3 años |

---

### Sección 5 — Accionistas

Lista de accionistas o socios con participación directa o indirecta 
mayor al 5% del capital social. El SR puede agregar múltiples 
accionistas con el botón **"Agregar accionista"**.

**Reglas de validación del bloque:**
- Mínimo un accionista requerido
- La suma de participaciones debe ser mínimo el 75% antes de 
  poder enviar el formulario
- El sistema muestra un indicador de progreso del porcentaje 
  acumulado en tiempo real

**Campos por accionista — Persona Natural**
(cuando `doc_type` ≠ NIT):

| Label | Campo DB | Tabla | Tipo | Validaciones |
|---|---|---|---|---|
| Nombres * | `first_name` | `persons` | Texto | Solo letras |
| Apellidos * | `last_name` | `persons` | Texto | Solo letras |
| Tipo de documento * | `doc_type` | `persons` | Dropdown | Cédula de ciudadanía, Cédula de extranjería, Permiso por Protección Temporal, NIT |
| Número de documento * | `doc_number` | `persons` | Texto | — |
| Participación % * | `ownership_percentage` | `shareholders` | Decimal | Min: 5% |

**Campos por accionista — Empresa**
(cuando `doc_type` = NIT):

| Label | Campo DB | Tabla | Tipo | Validaciones |
|---|---|---|---|---|
| Razón Social * | `legal_name` | `businesses` | Texto | Reemplaza Nombres y Apellidos |
| Tipo de documento * | `doc_type` | — | Dropdown | NIT seleccionado |
| NIT * | `tax_id` | `businesses` | Numérico | Sin dígito de verificación |
| Participación % * | `ownership_percentage` | `shareholders` | Decimal | Min: 5% |

> Cuando el accionista es una empresa (NIT), el sistema despliega 
> automáticamente un sub-bloque para capturar los **beneficiarios 
> finales** de esa empresa accionista — las personas naturales con 
> más del 5% de participación en ella. Este sub-bloque usa los 
> mismos campos de Persona Natural y se puede anidar un solo nivel 
> (no se permite empresa dentro de empresa accionista).

**Campos del sub-bloque beneficiarios finales**
(se repite por cada beneficiario):

| Label | Campo DB | Tabla | Tipo | Validaciones |
|---|---|---|---|---|
| Nombres * | `first_name` | `persons` | Texto | Solo letras |
| Apellidos * | `last_name` | `persons` | Texto | Solo letras |
| Tipo de documento * | `doc_type` | `persons` | Dropdown | Cédula de ciudadanía, Cédula de extranjería, Permiso por Protección Temporal |
| Número de documento * | `doc_number` | `persons` | Texto | — |
| Participación % * | `ownership_percentage` | `shareholders` | Decimal | Min: 5% en la empresa accionista |

> ⚠️ Esta sección **no incluye** checkbox de autorización de 
> centrales de riesgo ni aceptación de políticas de privacidad. 
> Esa autorización la gestiona el representante legal directamente 
> por WhatsApp y correo tras el envío del formulario.

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
  business_id               → ID del negocio principal
  shareholder_business_id   → ID del negocio accionista
  ownership_percentage      → del formulario

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
partner_id               → resuelto desde la sesión del SR
partner_category_id      → default_category_id del partner
sales_rep_id             → resuelto desde la sesión del SR
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
privacy_policy_accepted  → false (pendiente autorización del cliente)
submission_date          → timestamp del envío
status_id                → get_status_id('credit_applications', 'pendiente_autorizacion')
```

### 7. Crear registros en `application_categories`
```
application_id           → ID de la solicitud recién creada
category_id              → cada categoría seleccionada por el SR
```
> Si el SR no seleccionó categorías, se crea un registro con 
> `default_category_id` del partner.

### 8. Crear registros en `documents` (si aplica)
```
-- Por cada archivo subido (solo si requested_credit_line > $10.000.000):
application_id         → ID de la solicitud recién creada
document_type          → 'estados_financieros'
document_url           → URL del archivo subido a S3
verification_status_id → get_status_id('documents', 'pending')
```

### 9. Enviar notificaciones al representante legal
Tras crear los registros, el sistema dispara automáticamente:
- **WhatsApp** al número registrado
- **Correo electrónico** a la dirección registrada

Ambos mensajes solicitan al representante legal que autorice la 
consulta en centrales de riesgo y acepte las políticas de 
privacidad. Sin esta autorización el underwriting no puede proceder.

---

## Confirmación al SR

Tras el envío exitoso, se muestra en pantalla:

> **Formulario enviado exitosamente**
>
> Te informamos que el formulario se ha enviado exitosamente y le 
> hemos enviado un mensaje por WhatsApp y correo electrónico al 
> cliente para que autorice la consulta en centrales de riesgo y 
> las políticas de privacidad. Por favor, recuérdale al cliente 
> que revise lo antes posible para completar el proceso.

---

## Criterios de Aceptación

- [ ] El formulario carga con el co-branding correcto del partner
      según el alias en la URL
- [ ] El `partner_id` y `sales_rep_id` se resuelven automáticamente
      desde la sesión autenticada del SR, sin campos visibles
- [ ] El dropdown de categorías muestra únicamente las categorías
      activas del partner y permite selección múltiple
- [ ] Si no se selecciona categoría se asigna `default_category_id`
- [ ] Los campos condicionales `business_rent_amount`,
      `monthly_purchases` y `current_purchases` se muestran u
      ocultan correctamente
- [ ] La sección de estados financieros solo aparece si
      `requested_credit_line > $10.000.000`
- [ ] Se pueden subir múltiples archivos de estados financieros
- [ ] Se puede agregar más de un accionista dinámicamente
- [ ] El sistema muestra el porcentaje acumulado de participación
      en tiempo real
- [ ] No se puede enviar el formulario si la suma de participaciones
      de accionistas es menor al 75%
- [ ] Cuando un accionista selecciona tipo de documento NIT el 
      campo Nombres/Apellidos se reemplaza por Razón Social y 
      se despliega el sub-bloque de beneficiarios finales
- [ ] El sub-bloque de beneficiarios finales solo acepta personas
      naturales (no permite NIT anidado)
- [ ] El formulario no incluye checkbox de políticas de privacidad
- [ ] Al enviar se crean correctamente los registros en `users`,
      `businesses`, `persons`, `legal_representatives`,
      `shareholders`, `credit_applications` y
      `application_categories`
- [ ] Si aplica, se crean los registros en `documents` con los
      archivos subidos a S3
- [ ] El usuario queda con `status_id = pending`
- [ ] `privacy_policy_accepted` queda en `false`
- [ ] El `status_id` de la solicitud queda en `pendiente_autorizacion`
- [ ] Se envían automáticamente WhatsApp y correo al representante
      legal solicitando autorización
- [ ] Se muestra el mensaje de confirmación al SR tras el envío exitoso

---

## Nota de Schema — Cambios Pendientes
> ⚠️ Esta historia comparte los mismos pendientes de schema que 
> HU-03. Ver nota de schema en HU-03.
