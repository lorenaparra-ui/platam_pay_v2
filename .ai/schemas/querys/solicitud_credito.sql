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
