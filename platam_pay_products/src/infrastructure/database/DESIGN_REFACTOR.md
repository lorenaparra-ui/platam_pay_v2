# Diseño: Refactorización credit_applications, credit_facilities y categories

## 1. Por qué se separa credit_facility de credit_application

- **credit_application**: representa una **solicitud** de crédito (una vez por persona/negocio, con estados en_study, authorized, rejected, etc.). Es el flujo de aprobación.
- **credit_facility**: representa la **línea de crédito aprobada** (límite, contrato, estado activo/inactivo). Es el “techo” de crédito disponible una vez aprobada la solicitud.

Separarlos permite:

- Varias **solicitudes** a lo largo del tiempo para la misma persona/partner, y una o más **facilidades** vigentes.
- Modelar renovaciones, ampliaciones o múltiples líneas (por producto/categoría) sin mezclar con el ciclo de vida de la solicitud.
- Auditoría clara: solicitud (histórico) vs facilidad (vigente).

## 2. Impacto en escalabilidad

- **Consultas**: listados de solicitudes (backoffice) no cargan facilidades; reportes de uso de línea no dependen del histórico de solicitudes.
- **Índices**: `credit_applications` por `person_id`, `status_id`, `submission_date`; `credit_facilities` por `status_id`; `categories` por `credit_facility_id`, `partner_id` (opcional).
- **Crecimiento**: tablas independientes permiten particionar o archivar por fecha en cada una sin acoplar.

## 3. Impacto en microservicios

- Un servicio puede exponer solo **solicitudes** (flujo de aprobación); otro solo **facilidades y categorías** (límites, condiciones, desembolsos).
- Contratos y límites (`credit_facilities`, `categories`) pueden vivir en un bounded context distinto al de “applications”.
- El vínculo opcional con **partner** está en **`categories.partner_id`**: una línea (`credit_facility`) puede mezclar categorías globales y categorías propias de un partner.

## 4. Validación “al menos una categoría por credit_facility”

- **En base de datos**: no se implementó un CHECK que exija al menos una fila en `categories` (en SQL estándar requeriría triggers o tablas de resumen).
- **En aplicación**: al crear o actualizar una `credit_facility`, validar que se envíe al menos una categoría; al eliminar categorías, validar que quede al menos una (o eliminar la facilidad en cascada según regla de negocio).

## 5. Relaciones implementadas

| Entidad            | Relación              | Tipo   | Tabla/Columna           |
|--------------------|------------------------|--------|--------------------------|
| credit_applications | person                 | N:1    | person_id → persons.id  |
| credit_applications | partner, business, status | N:1  | partner_id, business_id, status_id |
| credit_facilities  | status                 | N:1    | status_id → statuses.id  |
| categories         | credit_facility        | N:1    | credit_facility_id → credit_facilities.id |
| categories         | partner (opcional)     | N:1    | partner_id → partners.id |
| categories         | status                 | N:1    | status_id → statuses.id  |

## 6. Migraciones aplicadas (orden)

1. `1773500000000` – Renombrar `credit_applications_bnpl` → `credit_applications`
2. `1773500001000` – Añadir `person_id`, backfill desde `user_id`, eliminar `user_id`
3. `1773500002000` – Eliminar `user_product_id` y `sales_rep_id` de `credit_applications`
4. `1773500003000` – Eliminar tabla `sales_representatives`
5. `1773500004000` – Crear tabla `credit_facilities` y statuses
6. `1773500005000` – Crear tabla `categories` y statuses
7. `1773600000000` – `categories.partner_id`; quitar `partner_id` de `credit_facilities`

La migración de índices `1773400000000` sigue creando índices sobre `credit_applications_bnpl` (se ejecuta antes del rename); tras el rename, esos índices quedan sobre la tabla `credit_applications`.
