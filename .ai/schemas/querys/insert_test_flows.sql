BEGIN;

-- =========================================================
-- 0) Catálogos mínimos para el flujo
-- =========================================================

-- Rol base (si quieres asignarlo al usuario)
INSERT INTO "roles" ("name", "description")
VALUES ('customer', 'Cliente BNPL');

-- Moneda / ciudad
INSERT INTO "currencies" (
  "code", "name", "symbol", "decimal_places",
  "thousand_separator", "decimal_separator", "is_active"
) VALUES (
  'COP', 'Peso colombiano', '$', 2, '.', ',', true
);

INSERT INTO "cities" (
  "country_name", "country_code", "state_name", "state_code",
  "city_name", "currency_id"
)
VALUES (
  'Colombia', 'CO', 'Cundinamarca', 'DC', 'Bogota',
  (SELECT id FROM "currencies" WHERE "code" = 'COP' LIMIT 1)
);

-- =========================================================
-- 1) Usuarios
-- =========================================================

INSERT INTO "users" ("cognito_sub", "email", "phone", "role_id", "status_id")
VALUES (
  gen_random_uuid(),
  'cliente.bnpl.demo@platampay.test',
  '3000000001',
  (SELECT id FROM "roles" WHERE "name" = 'customer' LIMIT 1),
  get_status_id('users', 'pending')
);

INSERT INTO "users" ("cognito_sub", "email", "phone", "status_id")
VALUES (
  gen_random_uuid(),
  'codeudor.demo@platampay.test',
  '3000000002',
  get_status_id('users', 'active')
);

INSERT INTO "users" ("cognito_sub", "email", "phone", "status_id")
VALUES (
  gen_random_uuid(),
  'vendedor.demo@platampay.test',
  '3000000003',
  get_status_id('users', 'active')
);

-- =========================================================
-- 2) Personas
-- =========================================================

INSERT INTO "persons" (
  "user_id", "country_code", "first_name", "last_name",
  "doc_type", "doc_number", "doc_issue_date", "birth_date",
  "gender", "phone", "residential_address", "business_address", "city_id"
)
VALUES (
  (SELECT id FROM "users" WHERE "email" = 'cliente.bnpl.demo@platampay.test' LIMIT 1),
  'CO', 'Juan', 'Perez',
  'CC', '900000001', DATE '2012-01-10', DATE '1990-03-20',
  'M', '3000000001', 'Calle 1 # 10-10', 'Cra 15 # 90-30',
  (SELECT id FROM "cities" WHERE "country_code" = 'CO' AND "city_name" = 'Bogota' LIMIT 1)
);

INSERT INTO "persons" (
  "user_id", "country_code", "first_name", "last_name",
  "doc_type", "doc_number", "doc_issue_date", "birth_date",
  "gender", "phone", "residential_address", "city_id"
)
VALUES (
  (SELECT id FROM "users" WHERE "email" = 'codeudor.demo@platampay.test' LIMIT 1),
  'CO', 'Maria', 'Gomez',
  'CC', '900000002', DATE '2011-06-08', DATE '1989-07-11',
  'F', '3000000002', 'Calle 2 # 20-20',
  (SELECT id FROM "cities" WHERE "country_code" = 'CO' AND "city_name" = 'Bogota' LIMIT 1)
);

-- =========================================================
-- 3) Negocio del solicitante
-- =========================================================

INSERT INTO "businesses" (
  "user_id", "country_code", "city_id", "entity_type",
  "business_name", "business_address", "business_type",
  "relationship_to_business"
)
VALUES (
  (SELECT id FROM "users" WHERE "email" = 'cliente.bnpl.demo@platampay.test' LIMIT 1),
  'CO',
  (SELECT id FROM "cities" WHERE "country_code" = 'CO' AND "city_name" = 'Bogota' LIMIT 1),
  'PN',
  'Ferreteria Demo',
  'Av 68 # 20-30',
  '4752',
  'Único dueño'
);

-- Relación legal/accionaria (validación estructura)
INSERT INTO "legal_representatives" ("business_id", "person_id", "is_primary")
VALUES (
  (SELECT b.id
   FROM "businesses" b
   JOIN "users" u ON u.id = b.user_id
   WHERE u.email = 'cliente.bnpl.demo@platampay.test'
   ORDER BY b.id DESC LIMIT 1),
  (SELECT p.id FROM "persons" p WHERE p.doc_number = '900000001' LIMIT 1),
  true
);

INSERT INTO "shareholders" (
  "business_id", "person_id", "ownership_percentage",
  "evaluation_order", "credit_check_required", "credit_check_completed",
  "is_legal_representative"
)
VALUES (
  (SELECT b.id
   FROM "businesses" b
   JOIN "users" u ON u.id = b.user_id
   WHERE u.email = 'cliente.bnpl.demo@platampay.test'
   ORDER BY b.id DESC LIMIT 1),
  (SELECT p.id FROM "persons" p WHERE p.doc_number = '900000001' LIMIT 1),
  1.0000, 1, true, true, true
);

-- =========================================================
-- 4) Partner + categoría + vendedor
-- =========================================================

INSERT INTO "partners" (
  "country_code", "company_name", "trade_name", "acronym",
  "notification_email", "status_id"
)
VALUES (
  'CO', 'Comercial Demo S.A.S.', 'demo_store', 'DEMO',
  'notificaciones@demo.test',
  get_status_id('partners', 'active')
);

INSERT INTO "partner_categories" (
  "partner_id", "name", "discount_percentage", "interest_rate",
  "disbursement_fee_percent", "minimum_disbursement_fee",
  "delay_days", "term_days", "status_id"
)
VALUES (
  (SELECT id FROM "partners" ORDER BY id DESC LIMIT 1),
  'Electro', 0.0500, 0.0300,
  0.0100, 10000,
  5, 30,
  get_status_id('partner_categories', 'active')
);

INSERT INTO "sales_representatives" (
  "partner_id", "user_id", "name", "role", "status_id"
)
VALUES (
  (SELECT id FROM "partners" ORDER BY id DESC LIMIT 1),
  (SELECT id FROM "users" WHERE "email" = 'vendedor.demo@platampay.test' LIMIT 1),
  'Asesor Demo',
  'Sales Rep',
  get_status_id('sales_representatives', 'active')
);

-- =========================================================
-- 5) Producto usuario + solicitud BNPL
-- =========================================================

INSERT INTO "user_products" ("user_id", "product_type", "activated_at")
VALUES (
  (SELECT id FROM "users" WHERE "email" = 'cliente.bnpl.demo@platampay.test' LIMIT 1),
  'BNPL',
  now()
);

INSERT INTO "credit_applications_bnpl" (
  "user_id", "user_product_id", "partner_id", "partner_category_id", "sales_rep_id",
  "business_id", "number_of_locations", "number_of_employees",
  "business_seniority_id", "sector_experience", "business_flagship_m2",
  "business_has_rent", "business_rent_amount",
  "monthly_income", "monthly_expenses", "monthly_purchases", "current_purchases",
  "total_assets", "requested_credit_line", "is_current_client",
  "status_id", "submission_date", "privacy_policy_accepted", "privacy_policy_date"
)
VALUES (
  (SELECT id FROM "users" WHERE "email" = 'cliente.bnpl.demo@platampay.test' LIMIT 1),
  (SELECT id FROM "user_products"
   WHERE "user_id" = (SELECT id FROM "users" WHERE "email" = 'cliente.bnpl.demo@platampay.test' LIMIT 1)
   ORDER BY id DESC LIMIT 1),
  (SELECT id FROM "partners" ORDER BY id DESC LIMIT 1),
  (SELECT id FROM "partner_categories" ORDER BY id DESC LIMIT 1),
  (SELECT id FROM "sales_representatives" ORDER BY id DESC LIMIT 1),
  (SELECT b.id
   FROM "businesses" b
   JOIN "users" u ON u.id = b.user_id
   WHERE u.email = 'cliente.bnpl.demo@platampay.test'
   ORDER BY b.id DESC LIMIT 1),
  1, 4,
  get_option_id('business_seniority', 'y2_5'),
  '8 años en retail', 120,
  true, 2500000,
  18000000, 9000000, 6000000, NULL,
  120000000, 20000000, true,
  get_status_id('credit_applications_bnpl', 'in_study'),
  now(), true, now()
);

-- =========================================================
-- 6) Artefactos del flujo: análisis, contrato, firmantes, garante, docs, reporte, riesgo
-- =========================================================

INSERT INTO "ai_agent_analysis" (
  "application_id", "html_url_agent_analysis", "json_agent_analysis",
  "agent_analysis_timestamptz", "agent_recommended_loc", "agent_recomendation"
)
VALUES (
  (SELECT id FROM "credit_applications_bnpl" ORDER BY id DESC LIMIT 1),
  'https://demo.test/analysis/1',
  '{"score": 742, "decision": "review"}'::jsonb,
  now(), 22000000, 1
);

INSERT INTO "contracts" ("user_id", "application_id", "zapsign_token", "status_id")
VALUES (
  (SELECT id FROM "users" WHERE "email" = 'cliente.bnpl.demo@platampay.test' LIMIT 1),
  (SELECT id FROM "credit_applications_bnpl" ORDER BY id DESC LIMIT 1),
  'zapsign-demo-token-001',
  get_status_id('contracts', 'pending')
);

INSERT INTO "contract_signers" (
  "contract_id", "person_id", "zapsign_signer_token", "status_id", "sign_url"
)
VALUES (
  (SELECT id FROM "contracts" ORDER BY id DESC LIMIT 1),
  (SELECT id FROM "persons" WHERE "doc_number" = '900000001' LIMIT 1),
  'zapsign-signer-001',
  get_status_id('contract_signers', 'pending'),
  'https://demo.test/sign/1'
);

INSERT INTO "guarantors" (
  "credit_application_id", "person_id", "contract_signer_id",
  "guarantor_type", "relationship_to_applicant", "is_primary_guarantor"
)
VALUES (
  (SELECT id FROM "credit_applications_bnpl" ORDER BY id DESC LIMIT 1),
  (SELECT id FROM "persons" WHERE "doc_number" = '900000002' LIMIT 1),
  (SELECT id FROM "contract_signers" ORDER BY id DESC LIMIT 1),
  'personal', 'familiar', true
);

INSERT INTO "documents" (
  "person_id", "business_id", "application_id",
  "document_type", "document_url", "verification_status_id"
)
VALUES (
  (SELECT id FROM "persons" WHERE "doc_number" = '900000001' LIMIT 1),
  (SELECT b.id
   FROM "businesses" b
   JOIN "users" u ON u.id = b.user_id
   WHERE u.email = 'cliente.bnpl.demo@platampay.test'
   ORDER BY b.id DESC LIMIT 1),
  (SELECT id FROM "credit_applications_bnpl" ORDER BY id DESC LIMIT 1),
  'camara_comercio',
  'https://demo.test/docs/camara-comercio.pdf',
  get_status_id('documents', 'pending')
);

INSERT INTO "credit_reports" (
  "user_id", "person_id", "business_id", "application_id",
  "report_date", "bureau_name", "full_report_json"
)
VALUES (
  (SELECT id FROM "users" WHERE "email" = 'cliente.bnpl.demo@platampay.test' LIMIT 1),
  (SELECT id FROM "persons" WHERE "doc_number" = '900000001' LIMIT 1),
  (SELECT b.id
   FROM "businesses" b
   JOIN "users" u ON u.id = b.user_id
   WHERE u.email = 'cliente.bnpl.demo@platampay.test'
   ORDER BY b.id DESC LIMIT 1),
  (SELECT id FROM "credit_applications_bnpl" ORDER BY id DESC LIMIT 1),
  CURRENT_DATE, 'Demo Bureau',
  '{"risk": "medium", "score": 742}'::jsonb
);

INSERT INTO "risk_profile" (
  "user_id", "user_product_id", "risk_profile",
  "collection_priority_score", "payment_probability_score",
  "internal_score", "hybrid_score", "risk_ai_reasoning"
)
VALUES (
  (SELECT id FROM "users" WHERE "email" = 'cliente.bnpl.demo@platampay.test' LIMIT 1),
  (SELECT id FROM "user_products"
   WHERE "user_id" = (SELECT id FROM "users" WHERE "email" = 'cliente.bnpl.demo@platampay.test' LIMIT 1)
   ORDER BY id DESC LIMIT 1),
  'MEDIUM',
  0.7200, 0.8300, 710.00, 726.50,
  'Flujo y cobertura de gastos estables'
);

INSERT INTO "product_bnpl" (
  "user_product_id", "credit_limit", "available_credit_limit", "status_id"
)
VALUES (
  (SELECT id FROM "user_products"
   WHERE "user_id" = (SELECT id FROM "users" WHERE "email" = 'cliente.bnpl.demo@platampay.test' LIMIT 1)
   ORDER BY id DESC LIMIT 1),
  20000000, 20000000, get_status_id('product_bnpl', 'active')
);

INSERT INTO "bnpl_categories" ("product_bnpl_id", "category_id")
VALUES (
  (SELECT id FROM "product_bnpl" ORDER BY id DESC LIMIT 1),
  (SELECT id FROM "partner_categories" ORDER BY id DESC LIMIT 1)
);

COMMIT;

-- =========================================================
-- 7) Queries de validación del flujo
-- =========================================================

-- Ver solicitud + status + opción de antigüedad
SELECT
  ca.id AS application_id,
  u.email AS applicant_email,
  s.code AS status_code,
  o.option_group,
  o.code AS business_seniority_code,
  o.display_name AS business_seniority_label,
  ca.requested_credit_line
FROM "credit_applications_bnpl" ca
JOIN "users" u ON u.id = ca.user_id
JOIN "statuses" s ON s.id = ca.status_id
JOIN "options" o ON o.id = ca.business_seniority_id
ORDER BY ca.id DESC
LIMIT 1;

-- Ver integridad de relaciones principales del flujo
SELECT
  ca.id AS application_id,
  b.business_name,
  p.company_name AS partner_name,
  pc.name AS partner_category,
  sr.name AS sales_rep_name
FROM "credit_applications_bnpl" ca
LEFT JOIN "businesses" b ON b.id = ca.business_id
LEFT JOIN "partners" p ON p.id = ca.partner_id
LEFT JOIN "partner_categories" pc ON pc.id = ca.partner_category_id
LEFT JOIN "sales_representatives" sr ON sr.id = ca.sales_rep_id
ORDER BY ca.id DESC
LIMIT 1;