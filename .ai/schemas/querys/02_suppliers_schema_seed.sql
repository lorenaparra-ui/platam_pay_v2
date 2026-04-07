-- =============================================================================
-- SEED: suppliers_schema
-- Orden de ejecución: 2 de 3
-- Dependencias: 01_transversal_schema_seed.sql (persons, cities)
-- Tablas: business_seniority, businesses, legal_representatives,
--         bank_accounts, suppliers, partners, sales_representatives, shareholders
-- NOTA: sales_representatives solo partner_id + user_id (migración 1870000000000).
-- =============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- 2.1  business_seniority — catálogo de antigüedad del negocio
-- ---------------------------------------------------------------------------
INSERT INTO suppliers_schema.business_seniority (description, range_start, range_end)
VALUES
  ('Menos de 1 año',  0,   11),
  ('1 a 2 años',      12,  23),
  ('2 a 5 años',      24,  59),
  ('5 a 10 años',     60, 119),
  ('Más de 10 años', 120, 9999)
ON CONFLICT DO NOTHING;


-- ---------------------------------------------------------------------------
-- 2.2  businesses
-- NOTA: person_id FK a persons (NO user_id FK a users)
-- ---------------------------------------------------------------------------

-- Negocio PN del cliente demo (dueño del negocio)
INSERT INTO suppliers_schema.businesses (
  person_id,
  business_seniority_id,
  city_id,
  entity_type,
  business_name,
  business_address,
  business_type,
  relationship_to_business
)
SELECT
  (SELECT id FROM transversal_schema.persons WHERE doc_number = '900000001' LIMIT 1),
  (SELECT id FROM suppliers_schema.business_seniority WHERE range_start = 24 LIMIT 1),
  (SELECT id FROM transversal_schema.cities WHERE country_code = 'CO' AND city_name = 'Bogotá' LIMIT 1),
  'PN',
  'Ferretería Demo S.A.S.',
  'Av 68 # 20-30, Bogotá',
  '4752',
  'Único dueño'
ON CONFLICT DO NOTHING;

-- Negocio PJ de prueba (empresa jurídica)
INSERT INTO suppliers_schema.businesses (
  person_id,
  city_id,
  entity_type,
  legal_name,
  trade_name,
  tax_id,
  year_of_establishment
)
SELECT
  (SELECT id FROM transversal_schema.persons WHERE doc_number = '900000001' LIMIT 1),
  (SELECT id FROM transversal_schema.cities WHERE country_code = 'CO' AND city_name = 'Medellín' LIMIT 1),
  'PJ',
  'Distribuciones Demo S.A.S.',
  'Distri Demo',
  '900123456-7',
  2018
ON CONFLICT (tax_id) DO NOTHING;


-- ---------------------------------------------------------------------------
-- 2.3  legal_representatives
-- ---------------------------------------------------------------------------
INSERT INTO suppliers_schema.legal_representatives (person_id, is_primary)
SELECT
  (SELECT id FROM transversal_schema.persons WHERE doc_number = '900000001' LIMIT 1),
  TRUE
ON CONFLICT DO NOTHING;


-- ---------------------------------------------------------------------------
-- 2.4  bank_accounts (account_number se cifra en la capa ORM — aquí va texto plano de prueba)
-- ---------------------------------------------------------------------------
INSERT INTO suppliers_schema.bank_accounts (bank_entity, account_number, bank_certification)
VALUES
  ('Bancolombia', '123456789012', NULL),
  ('Davivienda',  '987654321098', NULL)
ON CONFLICT DO NOTHING;


-- ---------------------------------------------------------------------------
-- 2.5  suppliers — tabla delgada (business 1:1 unique)
-- ---------------------------------------------------------------------------
INSERT INTO suppliers_schema.suppliers (business_id, legal_representative_id, bank_account_id)
SELECT
  (SELECT b.id
   FROM suppliers_schema.businesses b
   JOIN transversal_schema.persons p ON p.id = b.person_id
   WHERE p.doc_number = '900000001'
     AND b.entity_type = 'PN'
   LIMIT 1),
  (SELECT lr.id
   FROM suppliers_schema.legal_representatives lr
   JOIN transversal_schema.persons p ON p.id = lr.person_id
   WHERE p.doc_number = '900000001'
   LIMIT 1),
  (SELECT id FROM suppliers_schema.bank_accounts WHERE bank_entity = 'Bancolombia' LIMIT 1)
ON CONFLICT (business_id) DO NOTHING;


-- ---------------------------------------------------------------------------
-- 2.6  partners — configuración visual y operativa
-- ---------------------------------------------------------------------------
INSERT INTO suppliers_schema.partners (
  supplier_id,
  acronym,
  logo_url,
  primary_color,
  secondary_color,
  notification_email,
  send_sales_rep_voucher,
  state
)
SELECT
  (SELECT s.id
   FROM suppliers_schema.suppliers s
   JOIN suppliers_schema.businesses b ON b.id = s.business_id
   JOIN transversal_schema.persons p ON p.id = b.person_id
   WHERE p.doc_number = '900000001'
   LIMIT 1),
  'DEMO',
  'https://cdn.platampay.test/logos/demo.png',
  '#1E40AF',
  '#3B82F6',
  'notificaciones@demo.test',
  FALSE,
  'active'
ON CONFLICT (supplier_id) DO NOTHING;


-- ---------------------------------------------------------------------------
-- 2.7  sales_representatives (solo columnas vigentes post–1870000000000)
-- ---------------------------------------------------------------------------
INSERT INTO suppliers_schema.sales_representatives (partner_id, user_id)
SELECT t.partner_id, t.user_id
FROM (
  SELECT
    (SELECT pa.id
     FROM suppliers_schema.partners pa
     JOIN suppliers_schema.suppliers s ON s.id = pa.supplier_id
     JOIN suppliers_schema.businesses b ON b.id = s.business_id
     JOIN transversal_schema.persons p ON p.id = b.person_id
     WHERE p.doc_number = '900000001'
     LIMIT 1) AS partner_id,
    (SELECT id FROM transversal_schema.users WHERE email = 'vendedor.demo@platampay.test' LIMIT 1) AS user_id
) t
WHERE t.partner_id IS NOT NULL
  AND t.user_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1
    FROM suppliers_schema.sales_representatives sr
    WHERE sr.partner_id = t.partner_id AND sr.user_id = t.user_id
  );


-- ---------------------------------------------------------------------------
-- 2.8  shareholders — demo: dueño del negocio PN como único accionista
-- ---------------------------------------------------------------------------
INSERT INTO suppliers_schema.shareholders (
  business_id,
  person_id,
  ownership_percentage,
  is_legal_representative,
  credit_check_required,
  credit_check_completed
)
SELECT
  b.id,
  b.person_id,
  1.0000,
  TRUE,
  FALSE,
  FALSE
FROM suppliers_schema.businesses b
JOIN transversal_schema.persons p ON p.id = b.person_id
WHERE p.doc_number = '900000001'
  AND b.entity_type = 'PN'
  AND NOT EXISTS (
    SELECT 1
    FROM suppliers_schema.shareholders sh
    WHERE sh.business_id = b.id AND sh.person_id = b.person_id
  );

COMMIT;

-- ---------------------------------------------------------------------------
-- Verificación post-seed
-- ---------------------------------------------------------------------------
SELECT 'business_seniority'    AS tabla, COUNT(*) AS filas FROM suppliers_schema.business_seniority
UNION ALL
SELECT 'businesses',                     COUNT(*) FROM suppliers_schema.businesses
UNION ALL
SELECT 'legal_representatives',          COUNT(*) FROM suppliers_schema.legal_representatives
UNION ALL
SELECT 'bank_accounts',                  COUNT(*) FROM suppliers_schema.bank_accounts
UNION ALL
SELECT 'suppliers',                      COUNT(*) FROM suppliers_schema.suppliers
UNION ALL
SELECT 'partners',                       COUNT(*) FROM suppliers_schema.partners
UNION ALL
SELECT 'sales_representatives',          COUNT(*) FROM suppliers_schema.sales_representatives
UNION ALL
SELECT 'shareholders',                   COUNT(*) FROM suppliers_schema.shareholders
ORDER BY tabla;

-- Vista rápida de la cadena suppliers
SELECT
  s.id                AS supplier_id,
  b.business_name     AS negocio,
  b.entity_type,
  pa.acronym          AS partner_acronym,
  pa.state            AS partner_state,
  ba.bank_entity,
  lr_p.doc_number     AS rep_doc
FROM suppliers_schema.suppliers s
JOIN suppliers_schema.businesses b        ON b.id  = s.business_id
LEFT JOIN suppliers_schema.partners pa    ON pa.supplier_id = s.id
LEFT JOIN suppliers_schema.bank_accounts ba ON ba.id = s.bank_account_id
LEFT JOIN suppliers_schema.legal_representatives lr ON lr.id = s.legal_representative_id
LEFT JOIN transversal_schema.persons lr_p ON lr_p.id = lr.person_id
ORDER BY s.id;
