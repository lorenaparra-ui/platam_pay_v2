-- 1) Validación general del flujo BNPL (joins críticos)
SELECT
  ca.id AS application_id,
  u.email AS applicant_email,
  b.business_name,
  p.company_name AS partner_name,
  pc.name AS partner_category,
  sr.name AS sales_rep_name,
  st.code AS application_status_code,
  o.code AS business_seniority_code,
  o.display_name AS business_seniority_label
FROM "credit_applications_bnpl" ca
JOIN "users" u ON u.id = ca.user_id
LEFT JOIN "businesses" b ON b.id = ca.business_id
LEFT JOIN "partners" p ON p.id = ca.partner_id
LEFT JOIN "partner_categories" pc ON pc.id = ca.partner_category_id
LEFT JOIN "sales_representatives" sr ON sr.id = ca.sales_rep_id
JOIN "statuses" st ON st.id = ca.status_id
LEFT JOIN "options" o ON o.id = ca.business_seniority_id
ORDER BY ca.id DESC
LIMIT 20;

-- 2) Integridad de FK business_seniority_id -> options.id (huérfanos)
SELECT ca.id, ca.business_seniority_id
FROM "credit_applications_bnpl" ca
LEFT JOIN "options" o ON o.id = ca.business_seniority_id
WHERE ca.business_seniority_id IS NOT NULL
  AND o.id IS NULL;

  -- 3) Integridad semántica: business_seniority_id debe pertenecer al grupo correcto
SELECT
  ca.id AS application_id,
  ca.business_seniority_id,
  o.option_group,
  o.code,
  o.display_name
FROM "credit_applications_bnpl" ca
JOIN "options" o ON o.id = ca.business_seniority_id
WHERE o.option_group <> 'business_seniority';

-- 4) Opciones business_seniority activas y ordenadas (catálogo esperado)
SELECT
  id, code, display_name, sort_order, is_active
FROM "options"
WHERE option_group = 'business_seniority'
ORDER BY sort_order, id;

-- 5) Validación de status en solicitudes BNPL (debe pertenecer a credit_applications_bnpl)
SELECT
  ca.id AS application_id,
  ca.status_id,
  s.entity_type,
  s.code
FROM "credit_applications_bnpl" ca
JOIN "statuses" s ON s.id = ca.status_id
WHERE s.entity_type <> 'credit_applications_bnpl';

-- 6) Regla de negocio básica de montos (ingresos/gastos/solicitud)
SELECT
  ca.id,
  ca.monthly_income,
  ca.monthly_expenses,
  ca.requested_credit_line,
  CASE
    WHEN ca.monthly_income IS NOT NULL
     AND ca.monthly_expenses IS NOT NULL
     AND ca.monthly_income < ca.monthly_expenses
    THEN 'ALERTA_INGRESO_MENOR_GASTO'
    ELSE 'OK'
  END AS income_expense_check
FROM "credit_applications_bnpl" ca
ORDER BY ca.id DESC
LIMIT 50;

-- 7) Coherencia condicional del cliente actual vs compras
-- is_current_client = true => monthly_purchases debe existir
-- is_current_client = false => current_purchases debe existir
SELECT
  ca.id,
  ca.is_current_client,
  ca.monthly_purchases,
  ca.current_purchases,
  CASE
    WHEN ca.is_current_client = true AND ca.monthly_purchases IS NULL THEN 'ERROR_FALTA_MONTHLY_PURCHASES'
    WHEN ca.is_current_client = false AND ca.current_purchases IS NULL THEN 'ERROR_FALTA_CURRENT_PURCHASES'
    ELSE 'OK'
  END AS purchases_consistency
FROM "credit_applications_bnpl" ca
ORDER BY ca.id DESC
LIMIT 50;

-- 8) Validación de privacidad (si acepta, debe tener fecha)
SELECT
  ca.id,
  ca.privacy_policy_accepted,
  ca.privacy_policy_date,
  CASE
    WHEN ca.privacy_policy_accepted = true AND ca.privacy_policy_date IS NULL
      THEN 'ERROR_FALTA_FECHA_PRIVACIDAD'
    ELSE 'OK'
  END AS privacy_check
FROM "credit_applications_bnpl" ca
ORDER BY ca.id DESC
LIMIT 50;

-- 9) Integridad documental y reporte crediticio enlazado a la solicitud
SELECT
  ca.id AS application_id,
  COUNT(DISTINCT d.id) AS documents_count,
  COUNT(DISTINCT cr.id) AS credit_reports_count,
  COUNT(DISTINCT aa.id) AS ai_analysis_count
FROM "credit_applications_bnpl" ca
LEFT JOIN "documents" d ON d.application_id = ca.id
LEFT JOIN "credit_reports" cr ON cr.application_id = ca.id
LEFT JOIN "ai_agent_analysis" aa ON aa.application_id = ca.id
GROUP BY ca.id
ORDER BY ca.id DESC
LIMIT 20;

-- 10) Resumen de completitud del flujo por solicitud
SELECT
  ca.id AS application_id,
  (b.id IS NOT NULL) AS has_business,
  (up.id IS NOT NULL) AS has_user_product,
  (ct.id IS NOT NULL) AS has_contract,
  (cs.id IS NOT NULL) AS has_contract_signer,
  (g.id IS NOT NULL)  AS has_guarantor,
  (pb.id IS NOT NULL) AS has_product_bnpl,
  (bc.id IS NOT NULL) AS has_bnpl_category
FROM "credit_applications_bnpl" ca
LEFT JOIN "businesses" b ON b.id = ca.business_id
LEFT JOIN "user_products" up ON up.id = ca.user_product_id
LEFT JOIN "contracts" ct ON ct.application_id = ca.id
LEFT JOIN "contract_signers" cs ON cs.contract_id = ct.id
LEFT JOIN "guarantors" g ON g.credit_application_id = ca.id
LEFT JOIN "product_bnpl" pb ON pb.user_product_id = up.id
LEFT JOIN "bnpl_categories" bc ON bc.product_bnpl_id = pb.id
ORDER BY ca.id DESC
LIMIT 20;

-- =========================================================
-- DASHBOARD QA #3: DETALLE DE ALERTAS FUNCIONALES (WARN)
-- =========================================================
SELECT
  ca.id AS application_id,
  CONCAT_WS(
    '; ',
    CASE
      WHEN ca.monthly_income IS NOT NULL
       AND ca.monthly_expenses IS NOT NULL
       AND ca.monthly_income < ca.monthly_expenses
      THEN 'income < expenses'
    END,
    CASE
      WHEN ca.is_current_client = true AND ca.monthly_purchases IS NULL
      THEN 'is_current_client=true but monthly_purchases is null'
    END,
    CASE
      WHEN ca.is_current_client = false AND ca.current_purchases IS NULL
      THEN 'is_current_client=false but current_purchases is null'
    END,
    CASE
      WHEN ca.privacy_policy_accepted = true AND ca.privacy_policy_date IS NULL
      THEN 'privacy accepted without privacy date'
    END
  ) AS warning_detail,
  'WARN' AS severity
FROM "credit_applications_bnpl" ca
WHERE
  (ca.monthly_income IS NOT NULL AND ca.monthly_expenses IS NOT NULL AND ca.monthly_income < ca.monthly_expenses)
  OR (ca.is_current_client = true AND ca.monthly_purchases IS NULL)
  OR (ca.is_current_client = false AND ca.current_purchases IS NULL)
  OR (ca.privacy_policy_accepted = true AND ca.privacy_policy_date IS NULL)
ORDER BY ca.id DESC;