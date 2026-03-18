# Impacto del refactoring: Partners → Suppliers

## Resumen

Refactorización del módulo **platam_pay_suppliers** (antes platam_pay_partners) para alinear el dominio a **suppliers** (proveedores), con nuevas tablas `suppliers` y `purchase_orders`, eliminación de `partner_categories` y `credit_applications_bnpl`, y cifrado en reposo para datos sensibles.

---

## 1. Impacto a nivel de dominio

- **Nuevos agregados:** `Supplier` (1:1 con `business`) y `PurchaseOrder` (N:1 con `Supplier`). El dominio de partners se mantiene para registro de partners; el de suppliers se usa para proveedores y órdenes de compra.
- **Eliminación de concepto:** Las categorías de partner (`partner_categories`) y las solicitudes BNPL (`credit_applications_bnpl`) dejan de existir en este servicio. Si otro bounded context las necesita, deberán consumirse vía API o eventos o reimplementarse en el servicio correspondiente.
- **Datos sensibles:** El campo `bank_account` en `suppliers` pertenece al dominio de suppliers y se trata como dato sensible (cifrado en reposo, nunca en texto plano).

---

## 2. Impacto a nivel de base de datos

- **Nuevas tablas:**
  - `suppliers`: id, external_id, business_id (UNIQUE, FK a businesses, NOT NULL), bank_account (cifrado), created_at, updated_at.
  - `purchase_orders`: id, external_id, user_id (referencia lógica), supplier_id (FK a suppliers), amount (numeric), document_url, created_at, updated_at.
- **Eliminaciones (mediante migración con IF EXISTS):**
  - Relación y columna `partners.default_category_id` y FK/índices asociados.
  - Tabla `partner_categories` (CASCADE).
  - Tabla `credit_applications_bnpl` (CASCADE).
- **Integridad:** Se mantienen FKs y constraints; la migración sigue un enfoque expand/contract y evita pérdida de datos de `partners` y `businesses`.

---

## 3. Compatibilidad con microservicios

- **user_id en purchase_orders:** Es referencia lógica al servicio de usuarios (no FK física). Los consumidores deben validar existencia del usuario en su propio contexto o vía API.
- **Partners vs Suppliers:** Este microservicio expone tanto APIs de partners (registro, gestión) como de suppliers (proveedores, órdenes de compra). Los clientes que solo usaban `partner_categories` o `credit_applications_bnpl` deben migrar a los nuevos flujos o a otros servicios que los reemplacen.
- **Variable de entorno:** Para cifrado de `bank_account` es obligatoria `SUPPLIER_BANK_ACCOUNT_ENCRYPTION_KEY` (mínimo 32 caracteres). Sin ella, el arranque del servicio falla al acceder a datos cifrados.

---

## 4. Checklist de validación

- [ ] Ejecutar migraciones en entorno de desarrollo/staging y verificar creación de `suppliers` y `purchase_orders` y eliminación de tablas/columnas indicadas.
- [ ] Configurar `SUPPLIER_BANK_ACCOUNT_ENCRYPTION_KEY` en todos los entornos donde se use el módulo de suppliers.
- [ ] Actualizar clientes/contratos que consumían `partner_categories` o `credit_applications_bnpl`.
- [ ] Revisar logs y métricas tras el despliegue para asegurar que no queden referencias rotas a categorías o solicitudes BNPL.
