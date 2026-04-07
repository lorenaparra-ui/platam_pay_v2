
# HU-02 — Solicitud de Crédito PN · Registrada por SR

**Épica:** epic-01-onboarding-underwriting  
**Tipo de cliente:** Persona Natural (PN)  
**Canal:** Sales Rep (el SR llena el formulario en nombre del cliente)  
**Última actualización:** Febrero 2026  
**Estado:** En revisión

---

## Contexto — Cómo llega el SR a este formulario

Desde la landing de representantes de ventas del partner:
```
https://platampay.com/partner/{{alias_partner}}
```
El SR hace clic en el botón de solicitud para Persona Natural y 
accede al formulario. La landing y el formulario tienen co-branding 
del partner (logo, colores definidos en la tabla `partners`).

> El `partner_id` y el valor de **`sales_representative_id`** en `credit_applications` se resuelven automáticamente desde la sesión autenticada del SR: el **`sales_representative_id`** de la sesión es el que se persiste en `credit_applications.sales_representative_id`. No son campos visibles en el formulario.

**Dependencia:** Esta historia requiere que el flujo de autenticación 
y portal de Sales Reps esté completo antes de poder desarrollarse.

---

## Historia de Usuario

**Como** Sales Rep autenticado en el portal de mi partner,  
**quiero** registrar la solicitud de crédito de un cliente 
Persona Natural,  
**para** que Platam inicie el estudio crediticio y contacte 
al cliente para completar el proceso de autorización.

---

## Formulario — Estructura Wizard (3 pasos)

El formulario es un wizard de 3 secciones con co-branding del 
partner. Los labels están dirigidos al SR, no al cliente.

### Campos no visibles (se resuelven automáticamente)

| Campo | Tabla | Lógica |
|---|---|---|
| `partner_id` | `credit_applications` | Se toma del alias en la URL de la landing |
| `sales_representative_id` | `credit_applications` | Se completa con el **`sales_representative_id`** de la sesión autenticada del SR (mismo valor persistido en esta columna) |

---

### Sección 1 — Datos Personales del Cliente

| Label | Campo DB | Tabla | Tipo | Validaciones |
|---|---|---|---|---|
| Categoría de negocio | `partner_category_id` | `application_categories` | Dropdown multiselect | Trae las categorías activas del partner. El SR puede seleccionar una o más. Si queda vacío se asigna `partners.default_category_id` |
| Nombres * | `first_name` | `persons` | Texto | Solo letras |
| Apellidos * | `last_name` | `persons` | Texto | Solo letras |
| Tipo de documento * | `doc_type` | `persons` | Dropdown | Opciones: Cédula de ciudadanía, Cédula de extranjería |
| Número de documento * | `doc_number` | `persons` | Numérico | Min: 6 dígitos, Max: 10 dígitos |
| Fecha de nacimiento * | `birth_date` | `persons` | Fecha | Solo mayores de 18 años |
| Correo electrónico * | `email` | `users` | Email | Formato válido |
| Número de celular * | `phone` | `users` | Selector país + numérico | Min/Max: 10 dígitos |

---

### Sección 2 — Datos del Negocio

> Los campos marcados con [B] se almacenan en `businesses` — son 
> datos propios del negocio, estables en el tiempo.  
> Los campos marcados con [A] se almacenan en `credit_applications` 
> — son datos del momento de la solicitud, usados para el análisis 
> de crédito y pueden cambiar entre solicitudes.

| Label | Campo DB | Tabla | Tipo | Validaciones |
|---|---|---|---|---|
| Nombre del negocio * | `business_name` | `businesses` [B] | Texto | — |
| ¿Cuál es la relación del cliente con el negocio? * | `relationship_to_business` | `businesses` [B] | Dropdown | Opciones: Único dueño, Socio, Empleado, Familiar del dueño |
| Ciudad * | `city_id` | `businesses` [B] | Searchable dropdown | Ciudades y municipios del país del partner |
| Dirección principal del negocio * | `business_address` | `businesses` [B] | Texto | — |
| Tipo de negocio * | `business_type` | `businesses` [B] | Searchable dropdown | Códigos CIIU |
| Antigüedad del negocio * | `business_seniority` | `credit_applications` [A] | Dropdown | Opciones: Menos de 1 año / 1 a 2 años / 2 a 5 años / 5 a 10 años / Más de 10 años. Hint: *"Indica cuánto tiempo lleva funcionando el negocio"* |
| Número de empleados * | `number_of_employees` | `credit_applications` [A] | Numérico | Min: 1 |
| Cantidad de locales * | `number_of_locations` | `credit_applications` [A] | Numérico | Min: 1 |
| ¿Cuál es el tamaño del local principal? * | `business_flagship_m2` | `credit_applications` [A] | Numérico | Min: 1. Unidad: m² |
| ¿El cliente arrienda el(los) local(es) donde opera su negocio? * | `business_has_rent` | `credit_applications` [A] | Radio | Opciones: Sí / No |
| Valor mensual total de arriendos | `business_rent_amount` | `credit_applications` [A] | Numérico (COP) | **Condicional:** solo visible si `business_has_rent = Sí`. Min: $100.000 |

---

### Sección 3 — Información Financiera

| Label | Campo DB | Tabla | Tipo | Validaciones / Notas |
|---|---|---|---|---|
| Total de activos * | `total_assets` | `credit_applications` | Numérico (COP) | Hint: *"Indica el valor total estimado de los activos personales del cliente (vivienda, vehículos, inversiones, ahorros, etc.)"* |
| Ventas mensuales * | `monthly_income` | `credit_applications` | Numérico (COP) | Hint: *"Ingresa el promedio mensual de ventas generadas por el negocio"* |
| Gastos mensuales * | `monthly_expenses` | `credit_applications` | Numérico (COP) | Hint: *"Indica el promedio mensual de gastos en la compra y mantenimiento de inventario del negocio"* |
| ¿Es cliente actual de {{partner_name}}? * | `is_current_client` | `credit_applications` | Radio | Opciones: Sí / No |
| ¿Cuánto suele comprar mensualmente con {{partner_name}}? | `monthly_purchases` | `credit_applications` | Numérico (COP) | **Condicional:** solo visible si `is_current_client = Sí`. Usado en el modelo de crédito para dimensionar la LOC |
| ¿Cuánto estima que será el valor de la primera compra? | `current_purchases` | `credit_applications` | Numérico (COP) | **Condicional:** solo visible si `is_current_client = No`. Usado en el modelo de crédito para dimensionar la LOC |
| ¿Qué cupo de línea de crédito necesita el cliente? * | `requested_credit_line` | `credit_applications` | Numérico (COP) | Hint: *"Indica el monto según las necesidades de compra mensuales del cliente"* |

> ⚠️ Esta sección **no incluye** el checkbox de autorización de 
> centrales de riesgo ni aceptación de políticas de privacidad. 
> Esa autorización la gestiona el cliente directamente por 
> WhatsApp y correo tras el envío del formulario.

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

### 2. Crear el registro en `businesses`
```
person_id                  → ID del usuario recién creado
business_name            → del formulario
relationship_to_business → del formulario
city_id                  → del formulario
business_address         → del formulario
business_type            → del formulario
country_code             → se infiere del país del partner
```

### 4. Crear el registro en `credit_applications`
```
person_id                → ID del usuario recién creado
partner_id               → resuelto desde la sesión del SR
partner_category_id      → default_category_id del partner
sales_representative_id             → `sales_representative_id` de la sesión autenticada del SR
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
status                   → enum('pending_authorization')
```

### 5. Crear registros en `application_categories`
```
application_id           → ID de la solicitud recién creada
category_id              → cada categoría seleccionada por el SR
```
> Si el SR no seleccionó categorías, se crea un registro con 
> `default_category_id` del partner.

### 6. Enviar notificaciones al cliente
Tras crear los registros, el sistema dispara automáticamente:
- **WhatsApp** al número registrado
- **Correo electrónico** a la dirección registrada

Ambos mensajes solicitan al cliente que autorice la consulta en 
centrales de riesgo y acepte las políticas de privacidad. Sin esta 
autorización el underwriting no puede proceder.

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
- [ ] El `partner_id` y `sales_representative_id` se resuelven automáticamente
      desde la sesión autenticada del SR (`sales_representative` = **`sales_representative_id`** de la sesión), sin campos visibles
- [ ] El dropdown de categorías muestra únicamente las categorías
      activas del partner y permite selección múltiple
- [ ] Si no se selecciona categoría se asigna `default_category_id`
      del partner
- [ ] No se permite ingresar fecha de nacimiento de menores de 18 años
- [ ] Los campos condicionales `business_rent_amount`,
      `monthly_purchases` y `current_purchases` se muestran u
      ocultan correctamente según las respuestas previas
- [ ] El formulario no incluye checkbox de políticas de privacidad
- [ ] Al enviar se crean correctamente los registros en `users`,
      `persons`, `businesses`, `credit_applications` y
      `application_categories`
- [ ] `privacy_policy_accepted` queda en `false`
- [ ] El `status_id` de la solicitud queda en `pendiente_autorizacion`
- [ ] Se envían automáticamente WhatsApp y correo al cliente
      solicitando autorización
- [ ] Se muestra el mensaje de confirmación al SR tras el envío exitoso

---
