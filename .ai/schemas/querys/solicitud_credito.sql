-- =========================================================
-- Usuario de prueba (FK obligatoria para credit_applications_bnpl)
-- =========================================================
INSERT INTO "users" ("cognito_sub", "email", "phone")
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'test-credit-app@platam.play',
  '+573001234567'
)
ON CONFLICT ("email") DO UPDATE SET "email" = EXCLUDED."email"
RETURNING id, external_id;

-- Guarda el id del usuario (ej. 1) para el siguiente INSERT.
-- Si usas RETURNING, anota el id; si no, usa el que corresponda:

-- =========================================================
-- Solicitud de crédito BNPL de prueba
-- =========================================================
INSERT INTO "credit_applications_bnpl" (
  "user_id",
  "status_id",
  "business_relation_id",
  "business_name",
  "business_type_name",
  "business_address",
  "business_city",
  "number_of_employees",
  "monthly_income",
  "monthly_expenses",
  "requested_credit_line",
  "approved_credit_line",
  "privacy_policy_accepted",
  "privacy_policy_date",
  "submission_date",
  "approval_date",
  "credit_score",
  "credit_decision",
  "risk_profile"
)
VALUES
  -- Solicitud 1: Autorizada, único dueño
  (
    (SELECT id FROM "users" WHERE "email" = 'test-credit-app@platam.play' LIMIT 1),
    get_status_id('credit_applications_bnpl', 'authorized'),
    get_status_id('credit_applications_bnpl', 'business_relation'),
    'Mi Empresa SAS',
    'Comercio al por menor',
    'Calle 100 #15-20',
    'Bogotá',
    5,
    50000000,
    30000000,
    100000000,
    80000000,
    true,
    NOW(),
    NOW() - INTERVAL '7 days',
    NOW() - INTERVAL '5 days',
    75.50,
    'approved',
    'medium'
  ),
  -- Solicitud 2: Cancelada, socio
  (
    (SELECT id FROM "users" WHERE "email" = 'test-credit-app@platam.play' LIMIT 1),
    get_status_id('credit_applications_bnpl', 'cancelled'),
    get_status_id('credit_applications_bnpl', 'business_relation_partner'),
    'Distribuidora Norte Ltda',
    'Comercio al por mayor',
    'Cra 50 #80-10',
    'Medellín',
    12,
    120000000,
    85000000,
    200000000,
    NULL,
    false,
    NOW() - INTERVAL '14 days',
    NOW() - INTERVAL '14 days',
    NOW() - INTERVAL '12 days',
    62.00,
    'cancelled',
    'high'
  ),
  -- Solicitud 3: Cerrada, empleado
  (
    (SELECT id FROM "users" WHERE "email" = 'test-credit-app@platam.play' LIMIT 1),
    get_status_id('credit_applications_bnpl', 'closed'),
    get_status_id('credit_applications_bnpl', 'business_relation_employee'),
    'Ferretería El Martillo',
    'Comercio al por menor',
    'Av 68 #45-30',
    'Cali',
    3,
    28000000,
    18000000,
    50000000,
    45000000,
    true,
    NOW() - INTERVAL '30 days',
    NOW() - INTERVAL '30 days',
    NOW() - INTERVAL '28 days',
    80.25,
    'approved',
    'low'
  ),
  -- Solicitud 4: En mora, familiar del dueño
  (
    (SELECT id FROM "users" WHERE "email" = 'test-credit-app@platam.play' LIMIT 1),
    get_status_id('credit_applications_bnpl', 'delinquent'),
    get_status_id('credit_applications_bnpl', 'business_relation_owner_family'),
    'Panadería La Esquina',
    'Industria manufacturera',
    'Calle 25 #10-05',
    'Barranquilla',
    8,
    45000000,
    32000000,
    60000000,
    60000000,
    true,
    NOW() - INTERVAL '60 days',
    NOW() - INTERVAL '60 days',
    NOW() - INTERVAL '55 days',
    58.00,
    'approved',
    'medium'
  )
RETURNING id, external_id, user_id, status_id, requested_credit_line, approved_credit_line;

-- =========================================================
-- Datos relacionados a la solicitud de credito (FKs)
-- =========================================================

-- Moneda y ciudad base (para persons/companies)
INSERT INTO "currencies" (
  "code",
  "name",
  "symbol",
  "decimal_places",
  "thousand_separator",
  "decimal_separator"
)
VALUES ('COP', 'Peso colombiano', '$', 2, '.', ',')
ON CONFLICT ("code") DO UPDATE
SET
  "name" = EXCLUDED."name",
  "symbol" = EXCLUDED."symbol",
  "decimal_places" = EXCLUDED."decimal_places";

INSERT INTO "cities" (
  "country_name",
  "country_code",
  "state_name",
  "state_code",
  "city_name",
  "currency_id"
)
VALUES (
  'Colombia',
  'CO',
  'Cundinamarca',
  'CUN',
  'Bogota',
  (SELECT id FROM "currencies" WHERE "code" = 'COP' LIMIT 1)
)
ON CONFLICT ("country_code", "state_name", "city_name") DO NOTHING;

-- Catalogo de seniority (usado por credit_applications_bnpl.business_seniority_id)
INSERT INTO "business_seniority" ("range_start", "range_end", "description")
VALUES
  (0, 1, '0 a 1 anos'),
  (2, 5, '2 a 5 anos'),
  (6, 10, '6 a 10 anos')
ON CONFLICT ("description") DO NOTHING;

-- Persona vinculada al usuario
INSERT INTO "persons" (
  "user_id",
  "country_code",
  "first_name",
  "last_name",
  "doc_type",
  "doc_number",
  "doc_issue_date",
  "birth_date",
  "gender",
  "phone",
  "residential_address",
  "business_address",
  "city_id"
)
SELECT
  u.id,
  'CO',
  'Juan',
  'Perez',
  'CC',
  '1032456789',
  DATE '2018-04-20',
  DATE '1990-01-15',
  'male',
  '+573001234567',
  'Calle 100 #15-20',
  'Calle 100 #15-20',
  c.id
FROM "users" u
LEFT JOIN "cities" c
  ON c.country_code = 'CO'
  AND c.state_name = 'Cundinamarca'
  AND c.city_name = 'Bogota'
WHERE u.email = 'test-credit-app@platam.play'
  AND NOT EXISTS (
    SELECT 1
    FROM "persons" p
    WHERE p.doc_number = '1032456789'
  );

-- Empresa vinculada al usuario
INSERT INTO "companies" (
  "user_id",
  "country_code",
  "city_id",
  "legal_name",
  "trade_name",
  "tax_id",
  "year_of_establishment",
  "business_activity_code"
)
SELECT
  u.id,
  'CO',
  c.id,
  'Mi Empresa SAS',
  'Mi Empresa',
  '900123456-7',
  2018,
  '4711'
FROM "users" u
LEFT JOIN "cities" c
  ON c.country_code = 'CO'
  AND c.state_name = 'Cundinamarca'
  AND c.city_name = 'Bogota'
WHERE u.email = 'test-credit-app@platam.play'
  AND NOT EXISTS (
    SELECT 1
    FROM "companies" co
    WHERE co.tax_id = '900123456-7'
  );

-- Relacion legal representante (company <-> person)
INSERT INTO "legal_representatives" ("company_id", "person_id", "is_primary")
SELECT
  co.id,
  p.id,
  true
FROM "companies" co
INNER JOIN "persons" p
  ON p.user_id = co.user_id
WHERE co.tax_id = '900123456-7'
  AND p.doc_number = '1032456789'
  AND NOT EXISTS (
    SELECT 1
    FROM "legal_representatives" lr
    WHERE lr.company_id = co.id
      AND lr.person_id = p.id
  );

-- Producto BNPL del usuario
INSERT INTO "user_products" ("user_id", "product_type", "activated_at")
SELECT
  u.id,
  'BNPL',
  NOW() - INTERVAL '30 days'
FROM "users" u
WHERE u.email = 'test-credit-app@platam.play'
  AND NOT EXISTS (
    SELECT 1
    FROM "user_products" up
    WHERE up.user_id = u.id
      AND up.product_type = 'BNPL'
  );

INSERT INTO "product_bnpl" (
  "user_product_id",
  "credit_limit",
  "available_credit_limit",
  "status_id",
  "has_active_payment_plan",
  "notification_channels"
)
SELECT
  up.id,
  120000000,
  80000000,
  get_status_id('product_bnpl', 'active'),
  false,
  ARRAY['email', 'sms']
FROM "user_products" up
INNER JOIN "users" u ON u.id = up.user_id
WHERE u.email = 'test-credit-app@platam.play'
  AND up.product_type = 'BNPL'
ON CONFLICT ("user_product_id") DO NOTHING;

-- Actualiza una solicitud para dejarla enlazada a user_product y seniority
UPDATE "credit_applications_bnpl" cab
SET
  "user_product_id" = up.id,
  "business_seniority_id" = bs.id
FROM "users" u
INNER JOIN "user_products" up
  ON up.user_id = u.id
  AND up.product_type = 'BNPL'
INNER JOIN "business_seniority" bs
  ON bs.description = '2 a 5 anos'
WHERE cab.user_id = u.id
  AND u.email = 'test-credit-app@platam.play'
  AND cab.business_name = 'Mi Empresa SAS'
  AND (cab.user_product_id IS NULL OR cab.business_seniority_id IS NULL);

-- Perfil de riesgo asociado al producto del usuario
INSERT INTO "risk_profile" (
  "user_id",
  "user_product_id",
  "risk_profile",
  "collection_priority_score",
  "payment_probability_score",
  "internal_score",
  "hybrid_score",
  "risk_ai_reasoning",
  "json_proyections",
  "json_weights"
)
SELECT
  u.id,
  up.id,
  'medium',
  0.5625,
  0.7410,
  72.50,
  74.20,
  'Cliente con comportamiento estable y capacidad de pago media.',
  '{"projection_3m": "estable", "projection_6m": "leve crecimiento"}'::jsonb,
  '{"ingresos": 0.40, "historial": 0.35, "endeudamiento": 0.25}'::jsonb
FROM "users" u
INNER JOIN "user_products" up
  ON up.user_id = u.id
  AND up.product_type = 'BNPL'
WHERE u.email = 'test-credit-app@platam.play'
  AND NOT EXISTS (
    SELECT 1
    FROM "risk_profile" rp
    WHERE rp.user_id = u.id
      AND rp.user_product_id = up.id
  );

-- Documento y reporte de credito vinculados a la solicitud
INSERT INTO "documents" (
  "person_id",
  "company_id",
  "application_id",
  "document_type",
  "document_url",
  "verification_status_id",
  "upload_date"
)
SELECT
  p.id,
  co.id,
  cab.id,
  'RUT',
  'https://storage.example/credit/rut-mi-empresa-sas.pdf',
  get_status_id('documents', 'verified'),
  NOW() - INTERVAL '2 days'
FROM "credit_applications_bnpl" cab
INNER JOIN "users" u
  ON u.id = cab.user_id
INNER JOIN "persons" p
  ON p.user_id = u.id
INNER JOIN "companies" co
  ON co.user_id = u.id
WHERE u.email = 'test-credit-app@platam.play'
  AND cab.business_name = 'Mi Empresa SAS'
  AND NOT EXISTS (
    SELECT 1
    FROM "documents" d
    WHERE d.application_id = cab.id
      AND d.document_type = 'RUT'
  );

INSERT INTO "credit_reports" (
  "user_id",
  "person_id",
  "company_id",
  "application_id",
  "report_date",
  "bureau_name",
  "full_report_json"
)
SELECT
  u.id,
  p.id,
  co.id,
  cab.id,
  CURRENT_DATE - 1,
  'TransUnion',
  '{"score": 742, "delinquency_12m": 0, "open_accounts": 3}'::jsonb
FROM "credit_applications_bnpl" cab
INNER JOIN "users" u
  ON u.id = cab.user_id
INNER JOIN "persons" p
  ON p.user_id = u.id
INNER JOIN "companies" co
  ON co.user_id = u.id
WHERE u.email = 'test-credit-app@platam.play'
  AND cab.business_name = 'Mi Empresa SAS'
  AND NOT EXISTS (
    SELECT 1
    FROM "credit_reports" cr
    WHERE cr.application_id = cab.id
      AND cr.bureau_name = 'TransUnion'
  );

-- =========================================================
-- Flujo BNPL extendido: partner, categoria, vendedor, contrato y garante
-- =========================================================

-- Partner base para el flujo
INSERT INTO "partners" (
  "country_code",
  "company_name",
  "trade_name",
  "acronym",
  "notification_email",
  "status_id"
)
SELECT
  'CO',
  'Comercio Financiado Partner SAS',
  'CF Partner',
  'CFP',
  'notificaciones@cfpartner.co',
  get_status_id('partners', 'active')
WHERE NOT EXISTS (
  SELECT 1
  FROM "partners" p
  WHERE p.company_name = 'Comercio Financiado Partner SAS'
);

-- Categoria BNPL del partner
INSERT INTO "partner_categories" (
  "partner_id",
  "name",
  "discount_percentage",
  "interest_rate",
  "disbursement_fee_percent",
  "minimum_disbursement_fee",
  "delay_days",
  "term_days",
  "status_id"
)
SELECT
  p.id,
  'Categoria Pyme',
  0.0500,
  0.0275,
  0.0150,
  15000,
  5,
  30,
  get_status_id('partner_categories', 'active')
FROM "partners" p
WHERE p.company_name = 'Comercio Financiado Partner SAS'
  AND NOT EXISTS (
    SELECT 1
    FROM "partner_categories" pc
    WHERE pc.partner_id = p.id
      AND pc.name = 'Categoria Pyme'
  );

-- Vendedor (sales representative) del partner
INSERT INTO "sales_representatives" (
  "partner_id",
  "user_id",
  "name",
  "role",
  "status_id"
)
SELECT
  p.id,
  u.id,
  'Ana Rodriguez',
  'Asesor comercial',
  get_status_id('sales_representatives', 'active')
FROM "partners" p
INNER JOIN "users" u
  ON u.email = 'test-credit-app@platam.play'
WHERE p.company_name = 'Comercio Financiado Partner SAS'
  AND NOT EXISTS (
    SELECT 1
    FROM "sales_representatives" sr
    WHERE sr.partner_id = p.id
      AND sr.name = 'Ana Rodriguez'
  );

-- Setea defaults del partner (requiere que categoria y vendedor existan)
UPDATE "partners" p
SET
  "default_rep_id" = sr.id,
  "default_category_id" = pc.id
FROM "sales_representatives" sr
INNER JOIN "partner_categories" pc
  ON pc.partner_id = sr.partner_id
  AND pc.name = 'Categoria Pyme'
WHERE p.id = sr.partner_id
  AND p.company_name = 'Comercio Financiado Partner SAS'
  AND sr.name = 'Ana Rodriguez'
  AND (p.default_rep_id IS DISTINCT FROM sr.id OR p.default_category_id IS DISTINCT FROM pc.id);

-- Enlaza la solicitud principal a partner/categoria/vendedor
UPDATE "credit_applications_bnpl" cab
SET
  "partner_id" = p.id,
  "partner_category_id" = pc.id,
  "sales_rep_id" = sr.id
FROM "partners" p
INNER JOIN "partner_categories" pc
  ON pc.partner_id = p.id
  AND pc.name = 'Categoria Pyme'
INNER JOIN "sales_representatives" sr
  ON sr.partner_id = p.id
  AND sr.name = 'Ana Rodriguez'
, "users" u
WHERE p.company_name = 'Comercio Financiado Partner SAS'
  AND u.id = cab.user_id
  AND u.email = 'test-credit-app@platam.play'
  AND cab.business_name = 'Mi Empresa SAS'
  AND (
    cab.partner_id IS NULL
    OR cab.partner_category_id IS NULL
    OR cab.sales_rep_id IS NULL
  );

-- Relaciona producto BNPL con categoria del partner
INSERT INTO "bnpl_categories" ("product_bnpl_id", "category_id")
SELECT
  pb.id,
  pc.id
FROM "product_bnpl" pb
INNER JOIN "user_products" up
  ON up.id = pb.user_product_id
  AND up.product_type = 'BNPL'
INNER JOIN "users" u
  ON u.id = up.user_id
INNER JOIN "partners" p
  ON p.company_name = 'Comercio Financiado Partner SAS'
INNER JOIN "partner_categories" pc
  ON pc.partner_id = p.id
  AND pc.name = 'Categoria Pyme'
WHERE u.email = 'test-credit-app@platam.play'
  AND NOT EXISTS (
    SELECT 1
    FROM "bnpl_categories" bc
    WHERE bc.product_bnpl_id = pb.id
      AND bc.category_id = pc.id
  );

-- Contrato asociado a la solicitud principal
INSERT INTO "contracts" (
  "user_id",
  "application_id",
  "zapsign_token",
  "status_id",
  "original_file_url",
  "signed_file_url"
)
SELECT
  u.id,
  cab.id,
  'zapsign-token-mi-empresa-sas',
  get_status_id('contracts', 'signed'),
  'https://storage.example/contracts/mi-empresa-original.pdf',
  'https://storage.example/contracts/mi-empresa-signed.pdf'
FROM "credit_applications_bnpl" cab
INNER JOIN "users" u
  ON u.id = cab.user_id
WHERE u.email = 'test-credit-app@platam.play'
  AND cab.business_name = 'Mi Empresa SAS'
  AND NOT EXISTS (
    SELECT 1
    FROM "contracts" c
    WHERE c.zapsign_token = 'zapsign-token-mi-empresa-sas'
  );

-- Firmante del contrato (la persona creada)
INSERT INTO "contract_signers" (
  "contract_id",
  "person_id",
  "zapsign_signer_token",
  "status_id",
  "sign_url",
  "ip_address",
  "geo_latitude",
  "geo_longitude",
  "signed_at"
)
SELECT
  c.id,
  p.id,
  'signer-token-juan-perez',
  get_status_id('contract_signers', 'signed'),
  'https://sign.example/contract/juan-perez',
  '190.10.10.10',
  '4.7110',
  '-74.0721',
  NOW() - INTERVAL '1 day'
FROM "contracts" c
INNER JOIN "credit_applications_bnpl" cab
  ON cab.id = c.application_id
INNER JOIN "users" u
  ON u.id = cab.user_id
INNER JOIN "persons" p
  ON p.user_id = u.id
WHERE c.zapsign_token = 'zapsign-token-mi-empresa-sas'
  AND p.doc_number = '1032456789'
  AND NOT EXISTS (
    SELECT 1
    FROM "contract_signers" cs
    WHERE cs.contract_id = c.id
      AND cs.person_id = p.id
  );

-- Garante asociado a la solicitud y firmante
INSERT INTO "guarantors" (
  "credit_application_id",
  "person_id",
  "contract_signer_id",
  "guarantor_type",
  "relationship_to_applicant",
  "is_primary_guarantor",
  "selected_after_credit_check",
  "signature_url",
  "signature_date"
)
SELECT
  cab.id,
  p.id,
  cs.id,
  'personal',
  'owner',
  true,
  true,
  'https://sign.example/signatures/juan-perez.png',
  NOW() - INTERVAL '1 day'
FROM "credit_applications_bnpl" cab
INNER JOIN "users" u
  ON u.id = cab.user_id
INNER JOIN "persons" p
  ON p.user_id = u.id
INNER JOIN "contracts" c
  ON c.application_id = cab.id
  AND c.zapsign_token = 'zapsign-token-mi-empresa-sas'
INNER JOIN "contract_signers" cs
  ON cs.contract_id = c.id
  AND cs.person_id = p.id
WHERE u.email = 'test-credit-app@platam.play'
  AND cab.business_name = 'Mi Empresa SAS'
  AND NOT EXISTS (
    SELECT 1
    FROM "guarantors" g
    WHERE g.credit_application_id = cab.id
      AND g.person_id = p.id
      AND g.guarantor_type = 'personal'
  );

-- Analisis IA asociado a la solicitud principal
INSERT INTO "ai_agent_analysis" (
  "application_id",
  "html_url_agent_analysis",
  "json_agent_analysis",
  "agent_analysis_timestamptz",
  "agent_recommended_loc",
  "agent_recomendation"
)
SELECT
  cab.id,
  'https://storage.example/ai/analysis-mi-empresa.html',
  '{"summary": "riesgo moderado", "recommendation": "aprobar con seguimiento"}'::jsonb,
  NOW() - INTERVAL '6 hours',
  85000000,
  1
FROM "credit_applications_bnpl" cab
INNER JOIN "users" u
  ON u.id = cab.user_id
WHERE u.email = 'test-credit-app@platam.play'
  AND cab.business_name = 'Mi Empresa SAS'
  AND NOT EXISTS (
    SELECT 1
    FROM "ai_agent_analysis" a
    WHERE a.application_id = cab.id
  );

-- =========================================================
-- Consulta: Estado principal (status_id) + resto de la solicitud
-- =========================================================
SELECT
  cab.id,
  cab.external_id,
  cab.user_id,
  cab.user_product_id,
  cab.partner_id,
  cab.partner_category_id,
  cab.sales_rep_id,
  cab.business_name,
  cab.business_relation_id,
  br.code   AS business_relation_code,
  br.display_name AS business_relation_display_name,
  cab.business_type_name,
  cab.business_type_code,
  cab.business_address,
  cab.business_city,
  cab.business_rent_amount,
  cab.number_of_locations,
  cab.number_of_employees,
  cab.business_seniority_id,
  cab.sector_experience,
  cab.relationship_to_business,
  cab.monthly_income,
  cab.monthly_expenses,
  cab.monthly_purchases,
  cab.current_purchases,
  cab.total_assets,
  cab.requested_credit_line,
  cab.is_current_client,
  cab.status_id,
  st.code   AS status_code,
  st.display_name AS status_display_name,
  cab.submission_date,
  cab.approval_date,
  cab.rejection_reason,
  cab.credit_study_date,
  cab.credit_score,
  cab.credit_decision,
  cab.approved_credit_line,
  cab.analyst_report,
  cab.risk_profile,
  cab.privacy_policy_accepted,
  cab.privacy_policy_date,
  cab.created_at,
  cab.updated_at
FROM credit_applications_bnpl cab
LEFT JOIN statuses st  ON st.id = cab.status_id AND st.entity_type = 'credit_applications_bnpl'
LEFT JOIN statuses br  ON br.id = cab.business_relation_id AND br.entity_type = 'credit_applications_bnpl'
ORDER BY cab.id DESC;

-- =========================================================
-- Consulta extendida del flujo BNPL completo
-- =========================================================
SELECT
  cab.id AS application_id,
  cab.external_id AS application_external_id,
  cab.business_name,
  cab.requested_credit_line,
  cab.approved_credit_line,
  cab.created_at AS application_created_at,

  u.id AS user_id,
  u.external_id AS user_external_id,
  u.email AS user_email,
  su.code AS user_status_code,

  p.id AS person_id,
  p.external_id AS person_external_id,
  p.first_name,
  p.last_name,
  p.doc_type,
  p.doc_number,

  co.id AS company_id,
  co.external_id AS company_external_id,
  co.legal_name,
  co.tax_id,

  up.id AS user_product_id,
  up.external_id AS user_product_external_id,
  up.product_type,
  pb.id AS product_bnpl_id,
  pb.external_id AS product_bnpl_external_id,
  pb.credit_limit,
  pb.available_credit_limit,
  spb.code AS product_bnpl_status_code,

  pr.id AS partner_id,
  pr.external_id AS partner_external_id,
  pr.company_name AS partner_company_name,
  spr.code AS partner_status_code,

  pc.id AS partner_category_id,
  pc.external_id AS partner_category_external_id,
  pc.name AS partner_category_name,
  pc.interest_rate,
  spc.code AS partner_category_status_code,

  sr.id AS sales_rep_id,
  sr.external_id AS sales_rep_external_id,
  sr.name AS sales_rep_name,
  ssr.code AS sales_rep_status_code,

  bnc.id AS bnpl_category_link_id,

  ct.id AS contract_id,
  ct.external_id AS contract_external_id,
  ct.zapsign_token,
  sct.code AS contract_status_code,

  csg.id AS contract_signer_id,
  csg.external_id AS contract_signer_external_id,
  csg.zapsign_signer_token,
  scs.code AS contract_signer_status_code,

  g.id AS guarantor_id,
  g.external_id AS guarantor_external_id,
  g.guarantor_type,
  g.relationship_to_applicant,

  d.id AS document_id,
  d.external_id AS document_external_id,
  d.document_type,
  d.document_url,
  sd.code AS document_verification_status_code,

  cr.id AS credit_report_id,
  cr.external_id AS credit_report_external_id,
  cr.bureau_name,
  cr.report_date,

  rp.id AS risk_profile_id,
  rp.external_id AS risk_profile_external_id,
  rp.risk_profile,
  rp.hybrid_score,

  aia.id AS ai_analysis_id,
  aia.external_id AS ai_analysis_external_id,
  aia.agent_recommended_loc,
  aia.agent_recomendation
FROM "credit_applications_bnpl" cab
INNER JOIN "users" u
  ON u.id = cab.user_id
LEFT JOIN "statuses" su
  ON su.id = u.status_id
 AND su.entity_type = 'users'
LEFT JOIN "persons" p
  ON p.user_id = u.id
LEFT JOIN "companies" co
  ON co.user_id = u.id
LEFT JOIN "user_products" up
  ON up.id = cab.user_product_id
LEFT JOIN "product_bnpl" pb
  ON pb.user_product_id = up.id
LEFT JOIN "statuses" spb
  ON spb.id = pb.status_id
 AND spb.entity_type = 'product_bnpl'
LEFT JOIN "partners" pr
  ON pr.id = cab.partner_id
LEFT JOIN "statuses" spr
  ON spr.id = pr.status_id
 AND spr.entity_type = 'partners'
LEFT JOIN "partner_categories" pc
  ON pc.id = cab.partner_category_id
LEFT JOIN "statuses" spc
  ON spc.id = pc.status_id
 AND spc.entity_type = 'partner_categories'
LEFT JOIN "sales_representatives" sr
  ON sr.id = cab.sales_rep_id
LEFT JOIN "statuses" ssr
  ON ssr.id = sr.status_id
 AND ssr.entity_type = 'sales_representatives'
LEFT JOIN "bnpl_categories" bnc
  ON bnc.product_bnpl_id = pb.id
 AND bnc.category_id = pc.id
LEFT JOIN "contracts" ct
  ON ct.application_id = cab.id
LEFT JOIN "statuses" sct
  ON sct.id = ct.status_id
 AND sct.entity_type = 'contracts'
LEFT JOIN "contract_signers" csg
  ON csg.contract_id = ct.id
LEFT JOIN "statuses" scs
  ON scs.id = csg.status_id
 AND scs.entity_type = 'contract_signers'
LEFT JOIN "guarantors" g
  ON g.credit_application_id = cab.id
 AND g.person_id = p.id
LEFT JOIN "documents" d
  ON d.application_id = cab.id
LEFT JOIN "statuses" sd
  ON sd.id = d.verification_status_id
 AND sd.entity_type = 'documents'
LEFT JOIN "credit_reports" cr
  ON cr.application_id = cab.id
LEFT JOIN "risk_profile" rp
  ON rp.user_id = u.id
 AND rp.user_product_id = up.id
LEFT JOIN "ai_agent_analysis" aia
  ON aia.application_id = cab.id
WHERE u.email = 'test-credit-app@platam.play'
ORDER BY cab.id DESC, ct.id DESC, csg.id DESC;
