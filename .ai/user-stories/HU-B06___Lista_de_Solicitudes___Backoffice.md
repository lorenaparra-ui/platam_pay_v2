# HU-B06 — Lista de Solicitudes (Backoffice)

**Épica:** epic-02-backoffice-admin  
**Roles:** Admin, Analista  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** Analista o Admin del backoffice de Platam,  
**quiero** ver la lista de solicitudes de crédito con filtros y búsqueda,  
**para** gestionar mi cola de trabajo y encontrar rápidamente cualquier solicitud.

---

## Contexto

Vista principal de trabajo del Analista. Muestra todas las solicitudes
de `credit_applications` con búsqueda, filtrado y ordenamiento.
Punto de entrada a HU-B07 (detalle) y HU-B08 (decisión).

---

## Layout General

La vista tiene dos zonas:

1. **Header sticky** — permanece fijo al hacer scroll, contiene los
   controles de filtro y las pills de estado.
2. **Lista con infinite scroll** — carga 20 registros iniciales y
   añade más automáticamente al llegar al final de la página.

---

## Header Sticky

### Pills de estado

Fila de chips clickeables en la parte superior del header. Cada pill
muestra el nombre del estado y el conteo de solicitudes en ese estado.
Al hacer clic activa ese estado como filtro. Combinable con otros filtros.

| Pill | Conteo fuente |
|---|---|
| Todas | Total general |
| Pendiente de autorización | `status = 'pending_authorization'` |
| En proceso | `status = 'in_progress'` |
| En estudio | `status = 'under_review'` |
| Aprobado – En Firma | `status = 'approved_pending_signature'` ⚠️ |
| Aprobado – Firmado | `status = 'approved_signed'` ⚠️ |
| Rechazado | `status = 'rejected'` |
| Duplicado | `status = 'duplicate'` |

> ⚠️ Los estados `approved_pending_signature` y `approved_signed` están pendientes de agregar al enum (Lorena ítem 5 y 8).

> Los conteos se actualizan en tiempo real con cada cambio de estado.

### Controles de filtro

| Control | Tipo | Comportamiento |
|---|---|---|
| Buscar | Input texto | Busca en: nombre del cliente, `doc_number`, ID solicitud, nombre del negocio |
| Filtrar por partner | Dropdown | Lista todos los partners activos |
| Ordenar por | Dropdown | Más reciente (default), Más antiguo, Cupo solicitado ↓, Cupo solicitado ↑, Tiempo en cola ↓ |

> Los filtros son acumulables con las pills. El resultado se actualiza en tiempo real.

---

## Lista — Columnas por fila

| Campo visible | Fuente DB | Tabla |
|---|---|---|
| ID solicitud | `id` | `credit_applications` |
| Logo del partner | `logo_url` | `partners` |
| Nombre completo del cliente | `first_name + last_name` / `legal_name` | `persons` / `businesses` |
| Indicador PN / PJ | Tipo inferido del negocio | — |
| Tipo y número de documento | `doc_type + doc_number` | `persons` |
| Teléfono | `phone` | `persons` |
| Email | `email` | `users` |
| Sales Rep | `name` | `sales_representatives` |
| Cupo solicitado | `requested_credit_line` | `credit_applications` |
| Fecha y hora de registro | `submission_date` (formato: DD/MM/AA HH:mm) | `credit_applications` |
| Tiempo en cola | Calculado desde `submission_date` (solo en `under_review`) | — |
| Estado | `status` | `credit_applications` |

Al hacer clic en cualquier parte de la fila se navega al detalle (HU-B07).

---

## Indicador de Tiempo en Cola

Aplica únicamente a solicitudes con `status = 'under_review'`.
Muestra los días transcurridos desde `submission_date`.

| Días en cola | Visualización |
|---|---|
| 0 – 2 días | Texto neutro |
| 3 – 5 días | Texto amarillo / warning |
| > 5 días | Texto rojo + ícono de alerta |

> Umbral ajustable como parámetro operativo. En otros estados el indicador no se muestra.

---

## Infinite Scroll

- Carga inicial: 20 registros.
- Al llegar al 90% del scroll se cargan 20 registros más.
- Spinner visible mientras carga el siguiente bloque.
- Sin más registros: *"Has visto todas las solicitudes."*

---

## Estados y Colores

| Estado (`CreditApplicationStatus`) | Display | Color |
|---|---|---|
| `pending_authorization` | Pendiente de autorización | Amarillo |
| `in_progress` | En proceso | Amarillo oscuro |
| `under_review` | En estudio | Azul claro |
| `approved_pending_signature` ⚠️ | Aprobado – En Firma | Azul |
| `approved_signed` ⚠️ | Aprobado – Firmado | Verde |
| `rejected` | Rechazado | Rojo claro |
| `duplicate` | Duplicado | Rojo |

---

## Estados Vacíos

- Sin resultados por filtro: *"No hay solicitudes que coincidan con los filtros aplicados."*
- Sin solicitudes en el sistema: *"Aún no hay solicitudes registradas."*

---

## Criterios de Aceptación

- [ ] El header con pills y filtros es sticky y permanece visible al hacer scroll
- [ ] Las pills muestran el conteo correcto por estado y se actualizan en tiempo real
- [ ] Al hacer clic en una pill se activa como filtro de estado
- [ ] La búsqueda filtra en nombre, documento, ID y nombre del negocio
- [ ] El filtro de partner solo muestra partners activos
- [ ] Todos los filtros son acumulables entre sí
- [ ] La lista carga 20 registros iniciales y hace infinite scroll al 90% del viewport
- [ ] El spinner aparece mientras carga el siguiente bloque
- [ ] El mensaje de fin de lista aparece cuando no hay más registros
- [ ] La fecha y hora de registro se muestran en formato DD/MM/AA HH:mm
- [ ] El indicador de tiempo en cola solo aparece en solicitudes `under_review`
- [ ] Los colores del indicador cambian según los umbrales definidos
- [ ] El cupo solicitado se muestra formateado en COP
- [ ] El indicador PN/PJ es visible en cada fila
- [ ] Al hacer clic en una fila se navega a HU-B07
- [ ] Analista y Admin ven el mismo listado sin restricciones por rol
