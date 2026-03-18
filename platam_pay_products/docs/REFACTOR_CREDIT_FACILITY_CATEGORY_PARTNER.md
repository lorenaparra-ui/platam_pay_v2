# Refactor: credit_facility, categories, partners

## Impacto en código (checklist)

### platam_pay_products

| Área | Cambio |
|------|--------|
| `credit-facility.entity.ts` | Sin `partner_id`. |
| `category.entity.ts` | `partner_id` + relación `ManyToOne` → `PartnerReferenceEntity`. |
| `partner-reference.entity.ts` | Nueva entidad mínima para FK a `partners`. |
| Migración `1773600000000` | DDL + backfill. |
| `DESIGN_REFACTOR.md` | Modelo actualizado. |
| Casos de uso / repos | No había lógica que leyera `CreditFacility.partnerId` en src (solo entidad + migración histórica). Validar nuevos flujos que asignen `partner_id` por categoría. |

### platam_pay_suppliers

| Área | Cambio |
|------|--------|
| `partners.entity.ts` | Documentación; columna `trade_name` eliminada en BD. |
| Migración `1773600000100` | DROP `trade_name` + índices. |
| `create-partner-full-request.dto.ts` | `tradeName` sigue en API → mapea a **business**, no a `partners`. |
| `create-partner-event-driven.use-case.ts` | Sin cambio funcional (ya usa `businesses`). |

### Esquema / otros

- `.ai/schemas/database-schema.sql`: alinear manualmente o regenerar desde DBML.
- Rollback de `1773400000000-drop-partners-company-name` **después** de aplicar drop de `trade_name` puede fallar en `down` (usa `partners.trade_name`). Orden de rollback: revertir migraciones en orden inverso cronológico.

## Validación pre-deploy

1. Contar filas con `credit_facilities.partner_id IS NOT NULL` y verificar que tras migración las categorías de esas filas tengan `partner_id` poblado.
2. Partners: confirmar que `businesses.trade_name` / `legal_name` cubren reporting antes de borrar `partners.trade_name`.
