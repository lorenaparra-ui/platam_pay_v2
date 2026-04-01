-- =============================================================================
-- SEED: products_schema
-- Orden de ejecución: 3 de 3
-- Dependencias:
--   01_transversal_schema_seed.sql (statuses, users, persons)
--   02_suppliers_schema_seed.sql   (partners, businesses)
-- Tablas: contract_templates, contracts, credit_facilities,
--         categories, credit_applications
-- =============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- 3.1  contract_templates — plantillas versionadas Zapsign
-- ---------------------------------------------------------------------------
INSERT INTO products_schema.contract_templates (
  template_family_key,
  version,
  effective_from,
  effective_to,
  zapsign_template_ref,
  status_id
)
SELECT
  'bnpl_standard_co',
  1,
  '2024-01-01 00:00:00+00'::timestamptz,
  NULL,
  'zapsign-tpl-ref-bnpl-v1',
  (SELECT id FROM transversal_schema.statuses WHERE entity_type = 'contract_templates' AND code = 'active' LIMIT 1)
ON CONFLICT DO NOTHING;

INSERT INTO products_schema.contract_templates (
  template_family_key,
  version,
  effective_from,
  effective_to,
  zapsign_template_ref,
  status_id
)
SELECT
  'bnpl_pj_co',
  1,
  '2024-06-01 00:00:00+00'::timestamptz,
  NULL,
  'zapsign-tpl-ref-bnpl-pj-v1',
  (SELECT id FROM transversal_schema.statuses WHERE entity_type = 'contract_templates' AND code = 'active' LIMIT 1)
ON CONFLICT DO NOTHING;


-- ---------------------------------------------------------------------------
-- 3.2  contracts — contrato del cliente demo
-- ---------------------------------------------------------------------------
INSERT INTO products_schema.contracts (
  user_id,
  contract_template_id,
  zapsign_token,
  status_id,
  original_file_url
)
SELECT
  (SELECT id FROM transversal_schema.users WHERE email = 'cliente.demo@platampay.test' LIMIT 1),
  (SELECT id FROM products_schema.contract_templates WHERE template_family_key = 'bnpl_standard_co' AND version = 1 LIMIT 1),
  'zapsign-demo-token-001',
  (SELECT id FROM transversal_schema.statuses WHERE entity_type = 'contracts' AND code = 'pending' LIMIT 1),
  'https://demo.test/contracts/demo-001-original.pdf'
ON CONFLICT (zapsign_token) DO NOTHING;


-- ---------------------------------------------------------------------------
-- 3.3  credit_facilities — línea de crédito vinculada al contrato
-- ---------------------------------------------------------------------------
INSERT INTO products_schema.credit_facilities (contract_id, state, total_limit)
SELECT
  (SELECT id FROM products_schema.contracts WHERE zapsign_token = 'zapsign-demo-token-001' LIMIT 1),
  'active',
  20000000.0000
ON CONFLICT DO NOTHING;


-- ---------------------------------------------------------------------------
-- 3.4  categories — condiciones comerciales de la facilidad + partner
-- ---------------------------------------------------------------------------
INSERT INTO products_schema.categories (
  credit_facility_id,
  partner_id,
  name,
  discount_percentage,
  interest_rate,
  disbursement_fee_percent,
  minimum_disbursement_fee,
  delay_days,
  term_days,
  state
)
SELECT
  (SELECT cf.id
   FROM products_schema.credit_facilities cf
   JOIN products_schema.contracts c ON c.id = cf.contract_id
   WHERE c.zapsign_token = 'zapsign-demo-token-001'
   LIMIT 1),
  (SELECT pa.id
   FROM suppliers_schema.partners pa
   WHERE pa.acronym = 'DEMO'
   LIMIT 1),
  'Categoría Electro',
  0.0500,    -- 5% descuento
  0.0300,    -- 3% tasa de interés
  0.0100,    -- 1% comisión de desembolso
  10000.0000, -- comisión mínima: $10.000 COP
  5,          -- días de demora
  30,         -- plazo en días
  'active'
ON CONFLICT DO NOTHING;


-- ---------------------------------------------------------------------------
-- 3.5  credit_applications — solicitud de crédito BNPL
-- NOTA: person_id (NO user_id), business_seniority como VARCHAR (deuda técnica)
-- ---------------------------------------------------------------------------
INSERT INTO products_schema.credit_applications (
  person_id,
  partner_id,
  partner_category_id,
  business_id,
  contract_id,
  number_of_locations,
  number_of_employees,
  business_seniority,
  sector_experience,
  business_flagship_m2,
  business_has_rent,
  business_rent_amount,
  monthly_income,
  monthly_expenses,
  monthly_purchases,
  current_purchases,
  total_assets,
  requested_credit_line,
  is_current_client,
  status_id,
  submission_date,
  privacy_policy_accepted,
  privacy_policy_date
)
SELECT
  (SELECT id FROM transversal_schema.persons WHERE doc_number = '900000001' LIMIT 1),
  (SELECT id FROM suppliers_schema.partners WHERE acronym = 'DEMO' LIMIT 1),
  (SELECT cat.id
   FROM products_schema.categories cat
   WHERE cat.name = 'Categoría Electro'
   LIMIT 1),
  (SELECT b.id
   FROM suppliers_schema.businesses b
   JOIN transversal_schema.persons p ON p.id = b.person_id
   WHERE p.doc_number = '900000001' AND b.entity_type = 'PN'
   LIMIT 1),
  (SELECT id FROM products_schema.contracts WHERE zapsign_token = 'zapsign-demo-token-001' LIMIT 1),
  1,                 -- number_of_locations
  4,                 -- number_of_employees
  '2 a 5 años',      -- business_seniority como VARCHAR (deuda técnica)
  '8 años en retail sector ferretería',
  120,               -- business_flagship_m2
  TRUE,              -- business_has_rent
  2500000,           -- business_rent_amount en centavos ($2.500.000 COP)
  18000000,          -- monthly_income
  9000000,           -- monthly_expenses
  6000000,           -- monthly_purchases (cliente actual)
  NULL,              -- current_purchases (no aplica si is_current_client=true)
  120000000,         -- total_assets
  20000000,          -- requested_credit_line
  TRUE,              -- is_current_client
  (SELECT id FROM transversal_schema.statuses WHERE entity_type = 'credit_applications' AND code = 'in_study' LIMIT 1),
  now(),
  TRUE,
  now()
ON CONFLICT DO NOTHING;

COMMIT;

-- ---------------------------------------------------------------------------
-- Verificación post-seed
-- ---------------------------------------------------------------------------
SELECT 'contract_templates'  AS tabla, COUNT(*) AS filas FROM products_schema.contract_templates
UNION ALL
SELECT 'contracts',                    COUNT(*) FROM products_schema.contracts
UNION ALL
SELECT 'credit_facilities',            COUNT(*) FROM products_schema.credit_facilities
UNION ALL
SELECT 'categories',                   COUNT(*) FROM products_schema.categories
UNION ALL
SELECT 'credit_applications',          COUNT(*) FROM products_schema.credit_applications
ORDER BY tabla;

-- Vista completa del flujo BNPL
SELECT
  ca.id                                                 AS application_id,
  p.first_name || ' ' || p.last_name                   AS solicitante,
  p.doc_number,
  b.business_name                                       AS negocio,
  pa.acronym                                            AS partner,
  cat.name                                              AS categoria,
  cat.interest_rate,
  cat.discount_percentage,
  cf.total_limit,
  cf.state                                              AS facility_state,
  st.display_name                                       AS application_status,
  ca.requested_credit_line,
  ca.submission_date
FROM products_schema.credit_applications ca
JOIN transversal_schema.persons p               ON p.id   = ca.person_id
LEFT JOIN suppliers_schema.businesses b         ON b.id   = ca.business_id
LEFT JOIN suppliers_schema.partners pa          ON pa.id  = ca.partner_id
LEFT JOIN products_schema.categories cat        ON cat.id = ca.partner_category_id
LEFT JOIN products_schema.contracts c           ON c.id   = ca.contract_id
LEFT JOIN products_schema.credit_facilities cf  ON cf.id  IN (
  SELECT id FROM products_schema.credit_facilities WHERE contract_id = c.id LIMIT 1
)
LEFT JOIN transversal_schema.statuses st        ON st.id  = ca.status_id
ORDER BY ca.id DESC
LIMIT 10;
