# Integración `credit-facilities` ↔ `categories`

## Dependencias entre módulos

| Módulo              | Depende de        |
|---------------------|-------------------|
| `categories`        | *(ninguno)*       |
| `credit-facilities` | `CategoriesModule`|

`categories` solo conoce `credit_facility_id` como entero (FK); no importa `CreditFacilitiesModule`.

## Flujos

### 1. Solo categorías (CRUD)

- API: `POST/GET/PATCH/DELETE /categories` (ver Swagger `/docs`).
- Listado por línea: `GET /categories/by-credit-facility/:creditFacilityId`.

### 2. Línea + al menos una categoría (orquestado)

Inyectar `CreateCreditFacilityWithCategoriesUseCase` (exportado por `CreditFacilitiesModule`):

```typescript
await this.create_cf_with_categories.run({
  contract_id: null,
  status_id: 1,
  total_limit: "500000.0000",
  categories: [
    {
      name: "Estándar",
      delay_days: 0,
      term_days: 30,
      discount_percentage: "0.0500",
      interest_rate: "0.0200",
      disbursement_fee_percent: "0.0100",
      minimum_disbursement_fee: "5000.0000",
      status_id: 1,
      partner_id: null,
    },
  ],
});
// { facility, categories }
```

### 3. Línea primero, categorías después

```typescript
const facility = await this.create_credit_facility.run({
  contract_id: null,
  status_id: 1,
  total_limit: "100000.0000",
});
await this.create_category.run({
  credit_facility_id: facility.id,
  name: "Premium",
  /* ... */
});
```

## Nota operativa

`CreateCreditFacilityWithCategoriesUseCase` ejecuta: (1) insert línea, (2) transacción bulk de categorías. Si (2) falla tras (1), puede quedar una línea sin categorías; compensar con borrado manual o job de reconciliación si se requiere atomicidad estricta.
