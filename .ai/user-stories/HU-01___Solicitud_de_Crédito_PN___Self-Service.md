# HU-01 — Solicitud de Crédito PN · Self-Service

**Épica:** epic-01-onboarding-underwriting  
**Tipo de cliente:** Persona Natural (PN)  
**Canal:** Self-service (cliente llena el formulario directamente)  
**Última actualización:** Febrero 2026  
**Estado:** En revisión

---

## Contexto — Cómo llega el cliente a este formulario

Platam es una plataforma multi-partner. Cada vez que se crea un nuevo partner en el sistema, se generan automáticamente dos landings con co-branding del partner (logo, colores primario, secundario y claro definidos en la tabla `partners`):

**Landing de clientes:**

```
https://platampay.com/{{alias_partner}}
```

Contiene únicamente dos botones:

- Solicitud para Persona Natural → abre el formulario de esta historia
- Solicitud para Empresa → abre el formulario HU-03

**Landing de Sales Reps:**

```
https://platampay.com/partner/{{alias_partner}}
```

Contiene accesos a: solicitud PN, solicitud PJ, bot WhatsApp de representantes y creación de pedidos. Se detalla en otras historias.

> El `partner_id` se determina automáticamente por la landing desde la que proviene el formulario. El cliente nunca lo ve ni lo selecciona.

---

## Historia de Usuario

**Como** cliente Persona Natural que llega desde la landing de un partner,  
**quiero** completar un formulario de solicitud de crédito,  
**para** que Platam evalúe mi negocio y me asigne una línea de crédito.

---

## Formulario — Estructura Wizard (3 pasos)

El formulario es un wizard de 3 secciones con co-branding del partner.

### Campos no visibles (se resuelven automáticamente)

|Campo|Tabla|Lógica|
|---|---|---|
|`partner_id`|`credit_applications`|Se toma del alias en la URL de la landing|
|`partner_category_ids`|`credit_applications`|Se asigna automáticamente vía backend como array jsonb con la categoría default del partner: `[partners.default_category_id]`. Se puede actualizar antes de la aprobación. ⚠️ Schema pendiente — ver `SCHEMA_PENDIENTE_LORENA.md` ítems 1 y 2|

---

### Sección 1 — Datos Personales

|Label|Campo DB|Tabla|Tipo|Validaciones|
|---|---|---|---|---|
|Representante de Ventas|`sales_rep_id`|`credit_applications`|Dropdown dinámico|Opcional. Trae únicamente los SRs asociados al partner con estado `activo`. Si queda vacío se asigna `partners.default_rep_id`. Hint: _"Selecciona uno o deja en blanco si no sabes"_|
|Nombres *|`first_name`|`persons`|Texto|Solo letras|
|Apellidos *|`last_name`|`persons`|Texto|Solo letras|
|Tipo de documento *|`doc_type`|`persons`|Dropdown|Opciones: Cédula de ciudadanía, Cédula de extranjería|
|Número de documento *|`doc_number`|`persons`|Numérico|Min: 6 dígitos, Max: 10 dígitos|
|Fecha de nacimiento *|`birth_date`|`persons`|Fecha|Solo mayores de 18 años|
|Correo electrónico *|`email`|`persons`|Email|Formato válido|
|Número de celular *|`phone`|`persons`|Selector país + numérico|Min/Max: 10 dígitos|

---

### Sección 2 — Datos del Negocio

> Los campos marcados con [B] se almacenan en `businesses` — son datos propios del negocio, estables en el tiempo.  
> Los campos marcados con [A] se almacenan en `credit_applications` — son datos del momento de la solicitud, usados para el análisis de crédito y pueden cambiar entre solicitudes.

|Label|Campo DB|Tabla|Tipo|Validaciones|
|---|---|---|---|---|
|Nombre del negocio *|`business_name`|`businesses` [B]|Texto|—|
|¿Cuál es tu relación con el negocio? *|`relationship_to_business`|`businesses` [B]|Dropdown|Opciones: Único dueño, Socio, Empleado, Familiar del dueño|
|Ciudad *|`city_id`|`businesses` [B]|Searchable dropdown|Ciudades y municipios del país del partner|
|Dirección principal del negocio *|`business_address`|`businesses` [B]|Texto|—|
|Tipo de negocio *|`business_type`|`businesses` [B]|Searchable dropdown|Códigos CIIU|
|Antigüedad del negocio *|`business_seniority`|`credit_applications` [A]|Dropdown|Opciones: Menos de 1 año / 1 a 2 años / 2 a 5 años / 5 a 10 años / Más de 10 años. Hint: _"Indica cuánto tiempo lleva funcionando el negocio"_|
|Número de empleados *|`number_of_employees`|`credit_applications` [A]|Numérico|Min: 1|
|Cantidad de locales *|`number_of_locations`|`credit_applications` [A]|Numérico|Min: 1|
|¿Cuál es el tamaño de tu local principal? *|`business_flagship_m2`|`credit_applications` [A]|Numérico|Min: 1. Unidad: m²|
|¿Arrienda el(los) local(es) donde opera su negocio? *|`business_has_rent`|`credit_applications` [A]|Radio|Opciones: Sí / No|
|Valor mensual total de arriendos|`business_rent_amount`|`credit_applications` [A]|Numérico (COP)|**Condicional:** solo visible si `business_has_rent = Sí`. Min: $100.000|

---

### Sección 3 — Información Financiera

|Label|Campo DB|Tabla|Tipo|Validaciones / Notas|
|---|---|---|---|---|
|Total de activos *|`total_assets`|`credit_applications`|Numérico (COP)|Hint: _"Indica el valor total estimado de sus activos personales (vivienda, vehículos, inversiones, ahorros, etc.)"_|
|Ventas mensuales *|`monthly_income`|`credit_applications`|Numérico (COP)|Hint: _"Ingresa el promedio mensual de ventas generadas por el negocio"_|
|Gastos mensuales *|`monthly_expenses`|`credit_applications`|Numérico (COP)|Hint: _"Indica el promedio mensual de gastos en la compra y mantenimiento de inventario del negocio"_|
|¿Eres cliente actual de {{partner_name}}? *|`is_current_client`|`credit_applications`|Radio|Opciones: Sí / No|
|¿Cuánto sueles comprar mensualmente con {{partner_name}}?|`monthly_purchases`|`credit_applications`|Numérico (COP)|**Condicional:** solo visible si `is_current_client = Sí`. Usado en el modelo de crédito para dimensionar la LOC|
|¿Cuánto estimas que será el valor de tu primera compra?|`current_purchases`|`credit_applications`|Numérico (COP)|**Condicional:** solo visible si `is_current_client = No`. Usado en el modelo de crédito para dimensionar la LOC|
|¿Qué cupo de línea de crédito necesitas? *|`requested_credit_line`|`credit_applications`|Numérico (COP)|Hint: _"Indica el monto que necesitas según tus necesidades de compra mensuales. Te recomendamos solicitar un cupo que puedas manejar responsablemente"_|
|Autorización centrales de riesgo y política de privacidad *|`privacy_policy_accepted` + `privacy_policy_date`|`credit_applications`|Checkbox (requerido)|Texto: _"Autorizo a Platam Colombia S.A.S. a consultar mi información en centrales de riesgo como DATACRÉDITO, a validar mis datos para el análisis de crédito y acepto la Política de Privacidad de Platam."_ Solo puede enviar si está marcado. `privacy_policy_date` = timestamp del momento del envío|

---

## Flujo de Envío y Almacenamiento

Al hacer clic en **Enviar**, el sistema debe:

### 1. Crear el registro en `persons`

```
first_name   → del formulario
last_name    → del formulario
doc_type     → del formulario
doc_number   → del formulario
birth_date   → del formulario
email        → del formulario
phone        → del formulario
```

> **Nota:** Los campos `email` y `phone` se almacenan en `persons` (no en `users`). El registro en `users` se crea posteriormente cuando la solicitud es aprobada.

### 2. Crear el registro en `businesses`

```
person_id                → ID de la persona recién creada
business_name            → del formulario
relationship_to_business → del formulario
city_id                  → del formulario
business_address         → del formulario
business_type            → del formulario
```

### 3. Crear el registro en `credit_applications`

```
person_id                → ID de la persona recién creada
business_id              → ID del negocio recién creado
partner_id               → resuelto desde la landing
partner_category_ids     → jsonb array con default_category_id del partner: [partners.default_category_id]
sales_rep_id             → seleccionado en formulario o default_rep_id del partner
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
status                   → CreditApplicationStatus.IN_PROGRESS ('in_progress')
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

- [ ] El formulario carga con el co-branding correcto del partner (logo, colores) según el alias en la URL
- [ ] El dropdown de Sales Reps solo muestra representantes activos asociados al partner correspondiente
- [ ] Si el cliente no selecciona SR, se asigna automáticamente el `default_rep_id` del partner
- [ ] No se permite ingresar fecha de nacimiento de menores de 18 años
- [ ] Los campos condicionales `business_rent_amount`, `monthly_purchases` y `current_purchases` se muestran u ocultan correctamente según las respuestas previas
- [ ] El botón Enviar está deshabilitado si `privacy_policy_accepted` no está marcado
- [ ] Al enviar se crean correctamente los registros en `persons`, `businesses` y `credit_applications`
- [ ] El registro en `users` NO se crea en este paso (se crea al aprobar la solicitud)
- [ ] Los campos `email` y `phone` se guardan en `persons`
- [ ] El campo `status` de la solicitud queda en `in_progress` (`CreditApplicationStatus.IN_PROGRESS`)
- [ ] El campo `partner_category_ids` se crea como jsonb array con `[partners.default_category_id]`
- [ ] `submission_date` y `privacy_policy_date` se registran con el timestamp correcto del envío
- [ ] Se muestra el mensaje de confirmación tras el envío exitoso

---

---