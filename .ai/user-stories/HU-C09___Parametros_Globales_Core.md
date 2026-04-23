# HU-C09 — Parámetros Globales del Core

**Épica:** epic-03-core-financiero  
**Tipo:** Configuración backend + Backoffice admin  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** administrador de Platam,  
**quiero** gestionar los parámetros globales del core financiero 
desde el backoffice,  
**para** poder ajustar reglas de negocio sin necesidad de 
despliegues de código.

---

## Contexto

El core financiero requiere parámetros configurables que aplican 
a todos los préstamos. Siguiendo el modelo del prototipo de Rodrigo, 
estos parámetros tienen historial por `valid_from` — cada cambio 
crea un nuevo registro sin eliminar el anterior, garantizando que 
los cálculos históricos sean reproducibles.

Los parámetros se organizan en dos tablas:

1. **`global_params`** — parámetros operativos generales
2. **`usura_rates`** — tasas de usura por categoría de crédito 
   (fuente: Superintendencia Financiera de Colombia)

---

## Tabla `global_params`

### Parámetros incluidos

| Código | Descripción | Valor inicial | Usado en |
|---|---|---|---|
| `paid_tolerance` | Saldo mínimo en COP por debajo del cual un préstamo se marca como pagado y el residuo se perdona | 2000 | HU-C08, HU-C10 |
| `mora_grace_days` | Días de gracia después del vencimiento antes de empezar a cobrar interés de mora | configurable | HU-C10 |
| `default_days` | Días de mora a partir de los cuales el préstamo pasa a estado `default` | 179 | HU-C10 |
| `iva_rate` | Tasa de IVA aplicada sobre comisiones y fees | 0.19 | HU-C04, HU-C08 |
| `collection_day_of_week` | Día de la semana en que se cobran las comisiones de cobranza (1=Lunes … 7=Domingo) | configurable | HU-C10 |
| `partner_disbursement_days` | Días de la semana en que se procesan desembolsos a partners (array) | [1, 4] (lunes y jueves) | HU-C07 |
| `max_delivery_date_days` | Días máximos de antigüedad permitidos para fecha de entrega en confirmación partner | 20 | HU-C05 |
| `max_invoice_diff_pct` | Porcentaje máximo de diferencia permitido entre valor factura y pedido original | 0.10 | HU-C05 |
| `initial_payment_link_expiry_days` | Días de vigencia del link de pago para cuota inicial | 8 | HU-C02 |

### Estructura de la tabla

| Campo | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | — |
| `external_id` | uuid | insert DB-generated |
| `code` | varchar(100) | código del parámetro, único por `valid_from` |
| `value` | jsonb | valor del parámetro (número, string, array) |
| `description` | text | descripción legible del parámetro |
| `valid_from` | date | fecha desde la que aplica este valor |
| `created_by` | bigint FK | → `users.id` (admin que lo creó) |
| `created_at` | timestamptz | insert DB-generated |

> **Consulta del valor vigente:** para cualquier fecha dada, 
> se toma el registro con `valid_from <= fecha` más reciente.
> ```sql
> SELECT value FROM global_params
> WHERE code = 'paid_tolerance' AND valid_from <= CURRENT_DATE
> ORDER BY valid_from DESC LIMIT 1;
> ```

---

## Tabla `usura_rates`

Tasas máximas de interés certificadas por la SFC por categoría 
de crédito. Se actualizan periódicamente según resoluciones 
oficiales y tienen historial por `valid_from`.

### Categorías

| Código | Descripción |
|---|---|
| `CONSUMO` | Crédito de consumo y ordinario |
| `PRODUCTIVO_URBANO` | Microcrédito productivo urbano |
| `PRODUCTIVO_RURAL` | Microcrédito productivo rural |
| `POPULAR_URBANO` | Crédito popular y de vivienda urbano |
| `POPULAR_RURAL` | Crédito popular y de vivienda rural |
| `MAYOR_MONTO` | Microcrédito mayor monto |

### Estructura de la tabla

| Campo | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | — |
| `external_id` | uuid | insert DB-generated |
| `category` | varchar(50) | código de categoría (ver arriba) |
| `rate_ea` | decimal(8,6) | tasa efectiva anual máxima |
| `valid_from` | date | fecha desde la que aplica |
| `resolution` | varchar(100) nullable | número de resolución SFC |
| `created_by` | bigint FK | → `users.id` |
| `created_at` | timestamptz | insert DB-generated |

> La tasa de mora para préstamos con `mora_rate_type = 'USURA'` 
> se toma de esta tabla según la categoría del préstamo y la 
> fecha de cálculo.

---

## Tabla `collection_fee_rules`

Comisiones de cobranza escalonadas por días de mora, 
también con historial por `valid_from`. Determina qué 
comisión se cobra y en qué día exacto según los días 
de mora de cada cuota vencida.

### Estructura

| Campo | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | — |
| `external_id` | uuid | insert DB-generated |
| `days_overdue` | int | a partir de estos días de mora se dispara la comisión |
| `fee_rate` | decimal(8,6) | tasa sobre capital vencido |
| `valid_from` | date | fecha desde la que aplica esta regla |
| `created_by` | bigint FK | → `users.id` |
| `created_at` | timestamptz | insert DB-generated |

---

## Vista backoffice — Gestión de Parámetros

El admin puede consultar y actualizar parámetros desde el backoffice.

### Parámetros globales

Vista de lista con el valor vigente de cada parámetro y 
su historial de cambios. Al editar un parámetro se crea 
un nuevo registro con `valid_from = hoy` — el valor anterior 
se conserva en el historial.

| Acción | Descripción |
|---|---|
| Ver historial | Muestra todos los valores históricos del parámetro |
| Editar | Crea nuevo registro con `valid_from` configurable |
| Programar cambio | Permite `valid_from` futuro para cambios planificados |

### Tasas de usura

Vista de lista con la tasa vigente por categoría. El admin 
puede cargar nuevas tasas cuando la SFC publica una 
nueva resolución, ingresando `valid_from` y número de resolución.

### Comisiones de cobranza

Tabla editable con los escalones de días de mora y tasas.

---

## Criterios de Aceptación

- [ ] Todos los parámetros de `global_params` tienen al menos 
      un registro inicial con los valores definidos en esta HU
- [ ] La consulta de valor vigente siempre retorna el registro 
      con `valid_from` más reciente ≤ fecha de consulta
- [ ] Editar un parámetro crea un nuevo registro sin modificar 
      el anterior
- [ ] Es posible programar un cambio futuro con `valid_from` > hoy
- [ ] `usura_rates` tiene registros iniciales para todas las 
      categorías definidas
- [ ] `collection_fee_rules` tiene al menos una regla inicial
- [ ] El admin puede cargar nuevas tasas de usura con número 
      de resolución SFC
- [ ] Los módulos del core que usan estos parámetros 
      (HU-C04, C05, C07, C08, C10) los consultan en runtime 
      — ningún valor está hardcodeado en el código
