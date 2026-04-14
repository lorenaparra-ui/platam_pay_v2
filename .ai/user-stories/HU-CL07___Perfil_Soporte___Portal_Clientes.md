# HU-CL07 — Perfil y Soporte · Portal Clientes

**Épica:** epic-05-portal-clientes  
**Actor:** Cliente autenticado  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** cliente autenticado en el portal,  
**quiero** actualizar mis datos de contacto y acceder a soporte,  
**para** mantener mi información al día y resolver dudas sin llamar 
a nadie.

---

## Parte 1 — Mi Perfil

Accesible desde el menú principal: **"Mi perfil"**

### Diseño de la vista

Organizada en secciones. Cada sección tiene un botón **"Editar"** 
que abre un formulario inline o modal.

---

### Sección 1 — Datos de contacto

Aplica igual a PN y PJ.

| Campo | Fuente | Editable | Notas |
|---|---|---|---|
| Número de celular | `users.phone` ⚠️ | **Sí** | Campo pendiente (Lorena ítem 13). Ver flujo especial abajo |
| Correo electrónico | `users.email` | **Sí** | Validación de formato |

**Flujo especial — Cambio de número de celular:**

El número de celular es la llave de autenticación. Cambiarla requiere 
verificación del número nuevo antes de guardar.

```
1. Cliente ingresa el nuevo número
2. Sistema envía OTP al número nuevo por SMS (Cognito)
3. Cliente ingresa el OTP
4. Si válido: se actualiza users.phone y el cognito_sub vinculado
5. La sesión actual sigue activa
6. En el próximo login usará el número nuevo
```

> ⚠️ Si el número nuevo ya está registrado en otro usuario, 
> el sistema muestra error: *"Este número ya está asociado a 
> otra cuenta."*

---

### Sección 2 — Datos personales (solo PN)

| Campo | Fuente | Editable | Notas |
|---|---|---|---|
| Nombres | `persons.first_name` | No | Fijo — dato de identidad |
| Apellidos | `persons.last_name` | No | Fijo — dato de identidad |
| Tipo de documento | `persons.doc_type` | No | Fijo |
| Número de documento | `persons.doc_number` | No | Fijo |
| Dirección residencial | `persons.residential_address` | **Sí** | Libre edición |

---

### Sección 3 — Datos del negocio (PN y PJ)

| Campo | Fuente | Editable | Notas |
|---|---|---|---|
| Nombre del negocio | `businesses.business_name` (PN) / `businesses.legal_name` (PJ) | No | Fijo |
| NIT | `businesses.tax_id` | No | Fijo |
| Ciudad | `businesses.city_id` | **Sí** | Dropdown ciudades |
| Dirección del negocio | `businesses.business_address` | **Sí** | Libre edición |

> Los campos fijos (documento, razón social, NIT) se muestran 
> en solo lectura con un ícono de candado y tooltip: 
> *"Este dato no puede modificarse. Si necesitas actualizarlo, 
> contacta a soporte."*

---

### Sección 4 — Datos del representante legal (solo PJ)

| Campo | Fuente | Editable | Notas |
|---|---|---|---|
| Nombres | `persons.first_name` | No | Fijo |
| Apellidos | `persons.last_name` | No | Fijo |
| Tipo de documento | `persons.doc_type` | No | Fijo |
| Número de documento | `persons.doc_number` | No | Fijo |
| Dirección | `persons.residential_address` | **Sí** | Libre edición |

---

### Comportamiento general de edición

- Campos editables muestran formulario inline al hacer clic en "Editar"
- Validaciones idénticas a las del formulario de onboarding
- Al guardar: persiste directamente en la tabla correspondiente
- No requiere aprobación de Platam para cambios de dirección o correo
- El cambio de celular requiere verificación OTP (flujo especial arriba)
- Cambios se confirman con mensaje: *"Datos actualizados correctamente"*

---

## Criterios de Aceptación — Perfil

```gherkin
Scenario: Ver perfil
  Given un cliente autenticado
  When accede a "Mi perfil"
  Then ve sus datos organizados por sección
  And los campos fijos tienen ícono de candado
  And los campos editables tienen botón de editar

Scenario: Editar dirección
  Given un cliente en su perfil
  When edita su dirección y guarda
  Then el cambio se persiste en businesses.business_address o persons.residential_address
  And ve confirmación en pantalla

Scenario: Cambio de número de celular exitoso
  Given un cliente que ingresa un número nuevo válido
  When completa el OTP enviado al número nuevo
  Then users.phone se actualiza
  And la sesión sigue activa

Scenario: Número ya registrado
  Given un cliente que ingresa un número ya asociado a otra cuenta
  When intenta guardar
  Then ve el error "Este número ya está asociado a otra cuenta"
  And el número no se actualiza

Scenario: Campos fijos
  Given un cliente en su perfil
  When intenta editar su número de documento o NIT
  Then los campos están bloqueados
  And el tooltip indica cómo contactar soporte para cambios críticos
```

---

## Parte 2 — Soporte y FAQs

Accesible desde el menú principal: **"Soporte"** y desde el botón 
de soporte al pie de la vista de información de pago (HU-CL06).

### Diseño de la vista

Dos bloques: FAQs y canales de contacto directo.

---

### Bloque 1 — Preguntas frecuentes (FAQs)

Lista colapsable de preguntas organizadas por categoría.

**Categoría: Mi línea de crédito**
- ¿Cómo se calcula mi cupo disponible?
- ¿Por qué mi cupo está en $0?
- ¿Puedo solicitar un aumento de cupo?

**Categoría: Mis pagos**
- ¿Cómo y dónde puedo pagar?
- ¿Cuánto tiempo tarda en reflejarse mi pago?
- ¿Qué pasa si pago después de la fecha límite?
- ¿Puedo pagar un monto diferente al total?

**Categoría: Mis préstamos**
- ¿Qué significa cada estado de mis préstamos?
- ¿Cómo apruebo un pedido que mi asesor registró?
- ¿Puedo cancelar un préstamo?

**Categoría: Mi cuenta**
- ¿Cómo actualizo mi número de celular?
- ¿Qué datos puedo modificar yo mismo?

> El contenido de las FAQs se gestiona como texto estático en el 
> frontend en v1. En versiones futuras puede moverse a un CMS.

---

### Bloque 2 — Canales de contacto

| Canal | Acción | Disponibilidad |
|---|---|---|
| WhatsApp | Botón que abre chat con número de soporte Platam | Siempre visible |
| Correo | `soporte@platam.co` — clic abre cliente de correo | Siempre visible |

> El número de WhatsApp de soporte se parametriza en `global_params` 
> — no se hardcodea en el frontend.

Mensaje predefinido al abrir WhatsApp:

> *"Hola, soy [nombre del cliente], cliente Platam. Necesito ayuda con..."*

El nombre se inyecta automáticamente desde la sesión.

---

## Criterios de Aceptación — Soporte

```gherkin
Scenario: Navegar FAQs
  Given un cliente en la sección de soporte
  When hace clic en una pregunta
  Then el contenido se expande / colapsa correctamente

Scenario: Abrir WhatsApp de soporte
  Given un cliente en la sección de soporte
  When hace clic en "Contactar por WhatsApp"
  Then se abre WhatsApp (app o web) con el número de soporte
  And el mensaje predefinido incluye el nombre del cliente

Scenario: Acceso desde información de pago
  Given un cliente en la vista de información de pago (HU-CL06)
  When hace clic en el botón de soporte al pie
  Then es llevado a la sección de soporte
```

---

## Impacto en Schema

Sin cambios de schema requeridos para la sección de soporte.

Para perfil, todos los campos se mapean a tablas existentes. 
El único cambio es operativo: el cliente puede escribir 
`persons.residential_address`, `businesses.business_address`, 
`businesses.city_id` y `users.email` directamente — hoy solo 
el backoffice puede hacerlo.

El número de WhatsApp de soporte se añade como parámetro en 
`global_params` (HU-C09).

---

## Dependencias

| Historia | Relación |
|---|---|
| HU-CL01 | Requiere sesión activa |
| HU-CL06 | Enlaza a soporte desde información de pago |
| HU-SR01 | Mismo patrón OTP para cambio de número |
| HU-C09 | Parámetros globales — número de soporte y datos bancarios |
