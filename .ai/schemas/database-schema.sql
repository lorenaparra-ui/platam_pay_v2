CREATE EXTENSION IF NOT EXISTS "pgcrypto";

SET timezone = 'America/Bogota';

CREATE TABLE "statuses" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "entity_type" varchar(100) NOT NULL,
  "code" varchar(50) NOT NULL,
  "display_name" varchar(100) NOT NULL,
  "description" text,
  "is_active" boolean NOT NULL DEFAULT true,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now()),
  UNIQUE ("entity_type", "code")
);

INSERT INTO "statuses" ("entity_type", "code", "display_name") VALUES
  ('users', 'active', 'Activo'),
  ('users', 'blocked', 'Bloqueado'),
  ('users', 'suspended', 'Suspendido'),
  ('users', 'pending', 'Pendiente'),
  ('partners', 'active', 'Activo'),
  ('partners', 'inactive', 'Inactivo'),
  ('partners', 'blocked', 'Bloqueado'),
  ('partner_categories', 'active', 'Activo'),
  ('partner_categories', 'inactive', 'Inactivo'),
  ('partner_categories', 'archived', 'Archivado'),
  ('credit_applications_bnpl', 'authorized', 'Autorizado'),
  ('credit_applications_bnpl', 'cancelled', 'Cancelado'),
  ('credit_applications_bnpl', 'delinquent', 'En mora'),
  ('credit_applications_bnpl', 'closed', 'Cerrado'),
  ('credit_applications_bnpl', 'business_relation', 'Único dueño'),
  ('credit_applications_bnpl', 'business_relation_partner', 'Socio'),
  ('credit_applications_bnpl', 'business_relation_employee', 'Empleado'),
  ('credit_applications_bnpl', 'business_relation_owner_family', 'Familiar del dueño'),
  ('sales_representatives', 'active', 'Activo'),
  ('sales_representatives', 'inactive', 'Inactivo'),
  ('sales_representatives', 'blocked', 'Bloqueado'),
  ('contracts', 'pending', 'Pendiente'),
  ('contracts', 'signed', 'Firmado'),
  ('contracts', 'cancelled', 'Cancelado'),
  ('contract_signers', 'pending', 'Pendiente'),
  ('contract_signers', 'signed', 'Firmado'),
  ('contract_signers', 'declined', 'Rechazado'),
  ('product_bnpl', 'active', 'Activo'),
  ('product_bnpl', 'inactive', 'Inactivo'),
  ('product_bnpl', 'blocked', 'Bloqueado'),
  ('documents', 'pending', 'Pendiente'),
  ('documents', 'verified', 'Verificado'),
  ('documents', 'rejected', 'Rechazado');

CREATE OR REPLACE FUNCTION get_status_id(p_entity_type text, p_code text)
RETURNS BIGINT
LANGUAGE sql
STABLE
AS $$
  SELECT s.id
  FROM statuses s
  WHERE s.entity_type = p_entity_type
    AND s.code = p_code
    AND s.is_active = true
  LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION validate_status_entity()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  expected_entity text := TG_ARGV[0];
  status_column text := TG_ARGV[1];
  incoming_status_id BIGINT;
  actual_entity text;
BEGIN
  IF status_column = 'status_id' THEN
    incoming_status_id := NEW.status_id;
  ELSIF status_column = 'verification_status_id' THEN
    incoming_status_id := NEW.verification_status_id;
  ELSE
    RAISE EXCEPTION 'Unsupported status column: %', status_column;
  END IF;

  IF incoming_status_id IS NULL THEN
    RAISE EXCEPTION 'Status id cannot be NULL for %', expected_entity;
  END IF;

  SELECT s.entity_type
    INTO actual_entity
  FROM statuses s
  WHERE s.id = incoming_status_id
    AND s.is_active = true;

  IF actual_entity IS NULL THEN
    RAISE EXCEPTION 'Status id % does not exist or is inactive', incoming_status_id;
  END IF;

  IF actual_entity <> expected_entity THEN
    RAISE EXCEPTION
      'Status id % belongs to entity_type %, expected %',
      incoming_status_id, actual_entity, expected_entity;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TABLE "users" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "cognito_sub" uuid UNIQUE NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "phone" varchar UNIQUE,
  "role_id" BIGINT,
  "status_id" BIGINT NOT NULL DEFAULT get_status_id('users', 'active'),
  "last_login_at" timestamptz,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "roles" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "name" varchar(80) NOT NULL UNIQUE,
  "description" text,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now()) 
);

CREATE TABLE "permissions" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "code" varchar(120) NOT NULL UNIQUE,
  "description" text,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "role_permissions" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "role_id" BIGINT NOT NULL,
  "permission_id" BIGINT NOT NULL,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now()),
  UNIQUE ("role_id", "permission_id")
);

CREATE TABLE "persons" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" BIGINT NOT NULL,
  "country_code" varchar(2),
  "first_name" varchar(255) NOT NULL,
  "last_name" varchar(255) NOT NULL,
  "doc_type" varchar(100) NOT NULL,
  "doc_number" varchar UNIQUE NOT NULL,
  "doc_issue_date" date,
  "birth_date" date,
  "gender" varchar(20),
  "phone" varchar,
  "residential_address" text,
  "business_address" text,
  "city_id" BIGINT,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "companies" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" BIGINT NOT NULL,
  "country_code" varchar(2),
  "city_id" BIGINT,
  "legal_name" varchar (255) NOT NULL,
  "trade_name" varchar (255),
  "tax_id" varchar (50) UNIQUE NOT NULL,
  "year_of_establishment" int,
  "business_activity_code" varchar(10),
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "legal_representatives" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "company_id" BIGINT NOT NULL,
  "person_id" BIGINT NOT NULL,
  "is_primary" boolean DEFAULT true,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "shareholders" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "company_id" BIGINT NOT NULL,
  "person_id" BIGINT NOT NULL,
  "ownership_percentage" decimal(5,4),
  "evaluation_order" int,
  "credit_check_required" boolean DEFAULT false,
  "credit_check_completed" boolean DEFAULT false,
  "is_legal_representative" boolean DEFAULT false,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "guarantors" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "credit_application_id" BIGINT NOT NULL,
  "person_id" BIGINT NOT NULL,
  "contract_signer_id" BIGINT,
  "guarantor_type" varchar(20) NOT NULL CHECK ("guarantor_type" IN ('personal', 'corporate', 'spousal', 'third_party')),
  "relationship_to_applicant" varchar(100),
  "is_primary_guarantor" boolean DEFAULT false,
  "selected_after_credit_check" boolean DEFAULT false,
  "signature_url" text,
  "signature_date" timestamptz,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "partners" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "country_code" varchar(2),
  "company_name" varchar (255) NOT NULL,
  "trade_name" varchar (255),
  "acronym" varchar(10),
  "logo_url" text,
  "co_branding_logo_url" text,
  "primary_color" varchar(20),
  "secondary_color" varchar(20),
  "light_color" varchar(20),
  "sales_rep_role_name" varchar(50) DEFAULT 'Sales Rep',
  "sales_rep_role_name_plural" varchar(50) DEFAULT 'Sales Reps',
  "api_key_hash" varchar,
  "notification_email" varchar,
  "webhook_url" text,
  "send_sales_rep_voucher" boolean DEFAULT false,
  "disbursement_notification_email" varchar,
  "default_rep_id" BIGINT,
  "default_category_id" BIGINT,
  "status_id" BIGINT NOT NULL DEFAULT get_status_id('partners', 'active'),
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "partner_categories" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "partner_id" BIGINT NOT NULL,
  "name" varchar(100) NOT NULL,
  "discount_percentage" decimal(5,4) NOT NULL,
  "interest_rate" decimal(5,4) NOT NULL,
  "disbursement_fee_percent" decimal(5,4),
  "minimum_disbursement_fee" bigint,
  "delay_days" int NOT NULL,
  "term_days" int NOT NULL,
  "status_id" BIGINT NOT NULL DEFAULT get_status_id('partner_categories', 'active'),
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "credit_applications_bnpl" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" BIGINT NOT NULL,
  "user_product_id" BIGINT,
  "partner_id" BIGINT,
  "partner_category_id" BIGINT,
  "sales_rep_id" BIGINT,
  "business_name" varchar(255),
  "business_relation_id" BIGINT DEFAULT get_status_id('credit_applications_bnpl', 'business_relation'),
  "business_type_name" varchar(250),
  "business_type_code" BIGINT,
  "business_address" text,
  "business_city" varchar(120),
  "business_rent_amount" BIGINT,
  "number_of_locations" int,
  "number_of_employees" int,
  "business_seniority_id" BIGINT,
  "sector_experience" varchar,
  "relationship_to_business" varchar,
  "monthly_income" bigint,
  "monthly_expenses" bigint,
  "monthly_purchases" bigint,
  "current_purchases" bigint,
  "total_assets" bigint,
  "requested_credit_line" bigint,
  "is_current_client" boolean DEFAULT false,
  "status_id" BIGINT NOT NULL DEFAULT get_status_id('credit_applications_bnpl', 'authorized'),
  "submission_date" timestamptz,
  "approval_date" timestamptz,
  "rejection_reason" varchar(500),
  "credit_study_date" timestamptz,
  "credit_score" decimal(8,2),
  "credit_decision" varchar,
  "approved_credit_line" bigint,
  "analyst_report" text,
  "risk_profile" varchar,
  "privacy_policy_accepted" boolean DEFAULT false,
  "privacy_policy_date" timestamptz,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);


CREATE TABLE "business_seniority" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "range_start" int NOT NULL CHECK ("range_start" >= 0),
  "range_end" int NOT NULL CHECK ("range_end" >= "range_start"),
  "description" varchar(100) NOT NULL,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now()),
  UNIQUE ("range_start", "range_end"),
  UNIQUE ("description")
);


CREATE TABLE "ai_agent_analysis" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "application_id" BIGINT NOT NULL,
  "html_url_agent_analysis" text,
  "json_agent_analysis" jsonb,
  "agent_analysis_timestamptz" timestamptz,
  "agent_recommended_loc" bigint,
  "agent_recomendation" bigint,
  "created_at" timestamptz DEFAULT (now()),  
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "sales_representatives" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "partner_id" BIGINT NOT NULL,
  "user_id" BIGINT,
  "name" varchar NOT NULL,
  "role" varchar NOT NULL,
  "status_id" BIGINT NOT NULL DEFAULT get_status_id('sales_representatives', 'active'),
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "contracts" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" BIGINT NOT NULL,
  "application_id" BIGINT,
  "zapsign_token" varchar UNIQUE,
  "status_id" BIGINT NOT NULL DEFAULT get_status_id('contracts', 'pending'),
  "original_file_url" text,
  "signed_file_url" text,
  "form_answers_json" jsonb,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "contract_signers" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "contract_id" BIGINT,
  "person_id" BIGINT,
  "zapsign_signer_token" varchar,
  "status_id" BIGINT NOT NULL DEFAULT get_status_id('contract_signers', 'pending'),
  "sign_url" text,
  "ip_address" varchar(45),
  "geo_latitude" varchar(20),
  "geo_longitude" varchar(20),
  "signed_at" timestamptz,
  "document_photo_url" text,
  "document_verse_photo_url" text,
  "selfie_photo_url" text,
  "signature_image_url" text,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "user_products" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" BIGINT NOT NULL,
  "product_type" varchar NOT NULL,
  "activated_at" timestamptz NOT NULL,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "product_bnpl" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_product_id" BIGINT UNIQUE NOT NULL,
  "credit_limit" bigint NOT NULL,
  "available_credit_limit" bigint NOT NULL,
  "status_id" BIGINT NOT NULL DEFAULT get_status_id('product_bnpl', 'active'),
  "has_active_payment_plan" boolean DEFAULT false,
  "notification_channels" text[],
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "bnpl_categories" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "product_bnpl_id" BIGINT,
  "category_id" BIGINT,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "risk_profile" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" BIGINT NOT NULL,
  "user_product_id" BIGINT NOT NULL,
  "risk_profile" varchar,
  "collection_priority_score" decimal(8,4),
  "payment_probability_score" decimal(8,4),
  "internal_score" decimal(8,2),
  "hybrid_score" decimal(8,2),
  "risk_ai_reasoning" text,
  "json_proyections" jsonb,
  "json_weights" jsonb,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "documents" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "person_id" BIGINT,
  "company_id" BIGINT,
  "application_id" BIGINT,
  "document_type" varchar NOT NULL,
  "document_url" text NOT NULL,
  "verification_status_id" BIGINT NOT NULL DEFAULT get_status_id('documents', 'pending'),
  "upload_date" timestamptz DEFAULT (now()),
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "credit_reports" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" BIGINT NOT NULL,
  "person_id" BIGINT,
  "company_id" BIGINT,
  "application_id" BIGINT,
  "report_date" date NOT NULL,
  "bureau_name" varchar,
  "full_report_json" jsonb,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "currencies" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "code" varchar(3) NOT NULL,
  "name" varchar(120) NOT NULL,
  "symbol" varchar(10),
  "decimal_places" int NOT NULL DEFAULT 2 CHECK ("decimal_places" BETWEEN 0 AND 6),
  "thousand_separator" varchar(1),
  "decimal_separator" varchar(1),
  "is_active" boolean NOT NULL DEFAULT true,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now()),
  UNIQUE ("code")
);

CREATE TABLE "cities" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "country_name" varchar(120) NOT NULL,
  "country_code" varchar(2) NOT NULL,
  "state_name" varchar(120) NOT NULL,
  "state_code" varchar(3),
  "city_name" varchar(120) NOT NULL,
  "currency_id" BIGINT NOT NULL,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now()),
  CHECK ("country_code" ~ '^[A-Z]{2}$'),
  CHECK ("state_code" IS NULL OR "state_code" ~ '^[A-Z0-9]{2,3}$'),
  UNIQUE ("country_code", "state_name", "city_name")
);



ALTER TABLE "users" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");
ALTER TABLE "users" ADD FOREIGN KEY ("status_id") REFERENCES "statuses" ("id");
ALTER TABLE "role_permissions" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");
ALTER TABLE "role_permissions" ADD FOREIGN KEY ("permission_id") REFERENCES "permissions" ("id");
ALTER TABLE "persons" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "persons" ADD FOREIGN KEY ("city_id") REFERENCES "cities" ("id");
ALTER TABLE "companies" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "companies" ADD FOREIGN KEY ("city_id") REFERENCES "cities" ("id");
ALTER TABLE "legal_representatives" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id");
ALTER TABLE "legal_representatives" ADD FOREIGN KEY ("person_id") REFERENCES "persons" ("id");
ALTER TABLE "shareholders" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id");
ALTER TABLE "shareholders" ADD FOREIGN KEY ("person_id") REFERENCES "persons" ("id");
ALTER TABLE "guarantors" ADD FOREIGN KEY ("credit_application_id") REFERENCES "credit_applications_bnpl" ("id");
ALTER TABLE "guarantors" ADD FOREIGN KEY ("person_id") REFERENCES "persons" ("id");
ALTER TABLE "guarantors" ADD FOREIGN KEY ("contract_signer_id") REFERENCES "contract_signers" ("id");
ALTER TABLE "partners" ADD FOREIGN KEY ("default_rep_id") REFERENCES "sales_representatives" ("id");
ALTER TABLE "partners" ADD FOREIGN KEY ("default_category_id") REFERENCES "partner_categories" ("id");
ALTER TABLE "partners" ADD FOREIGN KEY ("status_id") REFERENCES "statuses" ("id");
ALTER TABLE "partner_categories" ADD FOREIGN KEY ("partner_id") REFERENCES "partners" ("id");
ALTER TABLE "partner_categories" ADD FOREIGN KEY ("status_id") REFERENCES "statuses" ("id");
ALTER TABLE "credit_applications_bnpl" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "credit_applications_bnpl" ADD FOREIGN KEY ("user_product_id") REFERENCES "user_products" ("id");
ALTER TABLE "credit_applications_bnpl" ADD FOREIGN KEY ("partner_id") REFERENCES "partners" ("id");
ALTER TABLE "credit_applications_bnpl" ADD FOREIGN KEY ("partner_category_id") REFERENCES "partner_categories" ("id");
ALTER TABLE "credit_applications_bnpl" ADD FOREIGN KEY ("sales_rep_id") REFERENCES "sales_representatives" ("id");
ALTER TABLE "credit_applications_bnpl" ADD FOREIGN KEY ("business_seniority_id") REFERENCES "business_seniority" ("id");
ALTER TABLE "credit_applications_bnpl" ADD FOREIGN KEY ("business_relation_id") REFERENCES "statuses" ("id");
ALTER TABLE "credit_applications_bnpl" ADD FOREIGN KEY ("status_id") REFERENCES "statuses" ("id");
ALTER TABLE "ai_agent_analysis" ADD FOREIGN KEY ("application_id") REFERENCES "credit_applications_bnpl" ("id");
ALTER TABLE "sales_representatives" ADD FOREIGN KEY ("partner_id") REFERENCES "partners" ("id");
ALTER TABLE "sales_representatives" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "sales_representatives" ADD FOREIGN KEY ("status_id") REFERENCES "statuses" ("id");
ALTER TABLE "contracts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "contracts" ADD FOREIGN KEY ("application_id") REFERENCES "credit_applications_bnpl" ("id");
ALTER TABLE "contracts" ADD FOREIGN KEY ("status_id") REFERENCES "statuses" ("id");
ALTER TABLE "contract_signers" ADD FOREIGN KEY ("contract_id") REFERENCES "contracts" ("id");
ALTER TABLE "contract_signers" ADD FOREIGN KEY ("person_id") REFERENCES "persons" ("id");
ALTER TABLE "contract_signers" ADD FOREIGN KEY ("status_id") REFERENCES "statuses" ("id");
ALTER TABLE "user_products" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "product_bnpl" ADD FOREIGN KEY ("user_product_id") REFERENCES "user_products" ("id");
ALTER TABLE "product_bnpl" ADD FOREIGN KEY ("status_id") REFERENCES "statuses" ("id");
ALTER TABLE "bnpl_categories" ADD FOREIGN KEY ("product_bnpl_id") REFERENCES "product_bnpl" ("id");
ALTER TABLE "bnpl_categories" ADD FOREIGN KEY ("category_id") REFERENCES "partner_categories" ("id");
ALTER TABLE "risk_profile" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "risk_profile" ADD FOREIGN KEY ("user_product_id") REFERENCES "user_products" ("id");
ALTER TABLE "documents" ADD FOREIGN KEY ("person_id") REFERENCES "persons" ("id");
ALTER TABLE "documents" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id");
ALTER TABLE "documents" ADD FOREIGN KEY ("application_id") REFERENCES "credit_applications_bnpl" ("id");
ALTER TABLE "documents" ADD FOREIGN KEY ("verification_status_id") REFERENCES "statuses" ("id");
ALTER TABLE "credit_reports" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "credit_reports" ADD FOREIGN KEY ("person_id") REFERENCES "persons" ("id");
ALTER TABLE "credit_reports" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id");
ALTER TABLE "credit_reports" ADD FOREIGN KEY ("application_id") REFERENCES "credit_applications_bnpl" ("id");
ALTER TABLE "cities" ADD FOREIGN KEY ("currency_id") REFERENCES "currencies" ("id");

CREATE TRIGGER trg_users_validate_status
BEFORE INSERT OR UPDATE OF status_id ON "users"
FOR EACH ROW
EXECUTE FUNCTION validate_status_entity('users', 'status_id');

CREATE TRIGGER trg_partners_validate_status
BEFORE INSERT OR UPDATE OF status_id ON "partners"
FOR EACH ROW
EXECUTE FUNCTION validate_status_entity('partners', 'status_id');

CREATE TRIGGER trg_partner_categories_validate_status
BEFORE INSERT OR UPDATE OF status_id ON "partner_categories"
FOR EACH ROW
EXECUTE FUNCTION validate_status_entity('partner_categories', 'status_id');

CREATE TRIGGER trg_credit_applications_bnpl_validate_status
BEFORE INSERT OR UPDATE OF status_id ON "credit_applications_bnpl"
FOR EACH ROW
EXECUTE FUNCTION validate_status_entity('credit_applications_bnpl', 'status_id');

CREATE TRIGGER trg_sales_representatives_validate_status
BEFORE INSERT OR UPDATE OF status_id ON "sales_representatives"
FOR EACH ROW
EXECUTE FUNCTION validate_status_entity('sales_representatives', 'status_id');

CREATE TRIGGER trg_contracts_validate_status
BEFORE INSERT OR UPDATE OF status_id ON "contracts"
FOR EACH ROW
EXECUTE FUNCTION validate_status_entity('contracts', 'status_id');

CREATE TRIGGER trg_contract_signers_validate_status
BEFORE INSERT OR UPDATE OF status_id ON "contract_signers"
FOR EACH ROW
EXECUTE FUNCTION validate_status_entity('contract_signers', 'status_id');

CREATE TRIGGER trg_product_bnpl_validate_status
BEFORE INSERT OR UPDATE OF status_id ON "product_bnpl"
FOR EACH ROW
EXECUTE FUNCTION validate_status_entity('product_bnpl', 'status_id');

CREATE TRIGGER trg_documents_validate_verification_status
BEFORE INSERT OR UPDATE OF verification_status_id ON "documents"
FOR EACH ROW
EXECUTE FUNCTION validate_status_entity('documents', 'verification_status_id');

-- =========================================================
-- Unique indexes for secure external references (UUID)
-- =========================================================
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_external_id ON "users" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_roles_external_id ON "roles" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_permissions_external_id ON "permissions" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_role_permissions_external_id ON "role_permissions" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_persons_external_id ON "persons" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_companies_external_id ON "companies" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_legal_representatives_external_id ON "legal_representatives" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_shareholders_external_id ON "shareholders" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_guarantors_external_id ON "guarantors" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_partners_external_id ON "partners" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_partner_categories_external_id ON "partner_categories" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_credit_applications_bnpl_external_id ON "credit_applications_bnpl" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_ai_agent_analysis_external_id ON "ai_agent_analysis" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_sales_representatives_external_id ON "sales_representatives" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_contracts_external_id ON "contracts" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_contract_signers_external_id ON "contract_signers" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_products_external_id ON "user_products" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_product_bnpl_external_id ON "product_bnpl" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_bnpl_categories_external_id ON "bnpl_categories" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_risk_profile_external_id ON "risk_profile" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_documents_external_id ON "documents" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_credit_reports_external_id ON "credit_reports" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_statuses_external_id ON "statuses" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_currencies_external_id ON "currencies" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_cities_external_id ON "cities" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_business_seniority_external_id ON "business_seniority" ("external_id");

-- =========================================================
-- Baseline performance indexes (FKs + frequent join filters)
-- =========================================================
CREATE INDEX IF NOT EXISTS idx_users_role_id ON "users" ("role_id");
CREATE INDEX IF NOT EXISTS idx_users_status_id ON "users" ("status_id");
CREATE INDEX IF NOT EXISTS idx_role_permissions_permission_id ON "role_permissions" ("permission_id");
CREATE INDEX IF NOT EXISTS idx_persons_user_id ON "persons" ("user_id");
CREATE INDEX IF NOT EXISTS idx_persons_city_id ON "persons" ("city_id");
CREATE INDEX IF NOT EXISTS idx_companies_user_id ON "companies" ("user_id");
CREATE INDEX IF NOT EXISTS idx_companies_city_id ON "companies" ("city_id");
CREATE INDEX IF NOT EXISTS idx_legal_representatives_company_id ON "legal_representatives" ("company_id");
CREATE INDEX IF NOT EXISTS idx_legal_representatives_person_id ON "legal_representatives" ("person_id");
CREATE INDEX IF NOT EXISTS idx_shareholders_company_id ON "shareholders" ("company_id");
CREATE INDEX IF NOT EXISTS idx_shareholders_person_id ON "shareholders" ("person_id");
CREATE INDEX IF NOT EXISTS idx_guarantors_credit_application_id ON "guarantors" ("credit_application_id");
CREATE INDEX IF NOT EXISTS idx_guarantors_person_id ON "guarantors" ("person_id");
CREATE INDEX IF NOT EXISTS idx_guarantors_contract_signer_id ON "guarantors" ("contract_signer_id");
CREATE INDEX IF NOT EXISTS idx_partners_default_rep_id ON "partners" ("default_rep_id");
CREATE INDEX IF NOT EXISTS idx_partners_default_category_id ON "partners" ("default_category_id");
CREATE INDEX IF NOT EXISTS idx_partners_status_id ON "partners" ("status_id");
CREATE INDEX IF NOT EXISTS idx_partner_categories_partner_id ON "partner_categories" ("partner_id");
CREATE INDEX IF NOT EXISTS idx_partner_categories_status_id ON "partner_categories" ("status_id");
CREATE INDEX IF NOT EXISTS idx_credit_applications_user_id ON "credit_applications_bnpl" ("user_id");
CREATE INDEX IF NOT EXISTS idx_credit_applications_user_product_id ON "credit_applications_bnpl" ("user_product_id");
CREATE INDEX IF NOT EXISTS idx_credit_applications_partner_id ON "credit_applications_bnpl" ("partner_id");
CREATE INDEX IF NOT EXISTS idx_credit_applications_partner_category_id ON "credit_applications_bnpl" ("partner_category_id");
CREATE INDEX IF NOT EXISTS idx_credit_applications_sales_rep_id ON "credit_applications_bnpl" ("sales_rep_id");
CREATE INDEX IF NOT EXISTS idx_credit_applications_business_seniority_id ON "credit_applications_bnpl" ("business_seniority_id");
CREATE INDEX IF NOT EXISTS idx_credit_applications_business_relation_id ON "credit_applications_bnpl" ("business_relation_id");
CREATE INDEX IF NOT EXISTS idx_credit_applications_status_id ON "credit_applications_bnpl" ("status_id");
CREATE INDEX IF NOT EXISTS idx_ai_agent_analysis_application_id ON "ai_agent_analysis" ("application_id");
CREATE INDEX IF NOT EXISTS idx_sales_representatives_partner_id ON "sales_representatives" ("partner_id");
CREATE INDEX IF NOT EXISTS idx_sales_representatives_user_id ON "sales_representatives" ("user_id");
CREATE INDEX IF NOT EXISTS idx_sales_representatives_status_id ON "sales_representatives" ("status_id");
CREATE INDEX IF NOT EXISTS idx_contracts_user_id ON "contracts" ("user_id");
CREATE INDEX IF NOT EXISTS idx_contracts_application_id ON "contracts" ("application_id");
CREATE INDEX IF NOT EXISTS idx_contracts_status_id ON "contracts" ("status_id");
CREATE INDEX IF NOT EXISTS idx_contract_signers_contract_id ON "contract_signers" ("contract_id");
CREATE INDEX IF NOT EXISTS idx_contract_signers_person_id ON "contract_signers" ("person_id");
CREATE INDEX IF NOT EXISTS idx_contract_signers_status_id ON "contract_signers" ("status_id");
CREATE INDEX IF NOT EXISTS idx_user_products_user_id ON "user_products" ("user_id");
CREATE INDEX IF NOT EXISTS idx_product_bnpl_status_id ON "product_bnpl" ("status_id");
CREATE INDEX IF NOT EXISTS idx_bnpl_categories_product_bnpl_id ON "bnpl_categories" ("product_bnpl_id");
CREATE INDEX IF NOT EXISTS idx_bnpl_categories_category_id ON "bnpl_categories" ("category_id");
CREATE INDEX IF NOT EXISTS idx_risk_profile_user_id ON "risk_profile" ("user_id");
CREATE INDEX IF NOT EXISTS idx_risk_profile_user_product_id ON "risk_profile" ("user_product_id");
CREATE INDEX IF NOT EXISTS idx_documents_person_id ON "documents" ("person_id");
CREATE INDEX IF NOT EXISTS idx_documents_company_id ON "documents" ("company_id");
CREATE INDEX IF NOT EXISTS idx_documents_application_id ON "documents" ("application_id");
CREATE INDEX IF NOT EXISTS idx_documents_verification_status_id ON "documents" ("verification_status_id");
CREATE INDEX IF NOT EXISTS idx_credit_reports_user_id ON "credit_reports" ("user_id");
CREATE INDEX IF NOT EXISTS idx_credit_reports_person_id ON "credit_reports" ("person_id");
CREATE INDEX IF NOT EXISTS idx_credit_reports_company_id ON "credit_reports" ("company_id");
CREATE INDEX IF NOT EXISTS idx_credit_reports_application_id ON "credit_reports" ("application_id");
CREATE INDEX IF NOT EXISTS idx_cities_country_state_name ON "cities" ("country_code", "state_name", "city_name");
CREATE INDEX IF NOT EXISTS idx_cities_currency_id ON "cities" ("currency_id");










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




  -- Seed de ciudades de Colombia generado desde ciudades.txt
-- Fuente: .ai/schemas/ciudades.txt
BEGIN;

INSERT INTO "currencies" ("code", "name", "symbol", "decimal_places", "thousand_separator", "decimal_separator", "is_active")
VALUES ('COP', 'Peso colombiano', '$', 2, '.', ',', true)
ON CONFLICT ("code") DO NOTHING;

INSERT INTO "cities" ("country_name", "country_code", "state_name", "state_code", "city_name", "currency_id")
VALUES
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'ABEJORRAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'ABREGO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'ABRIAQUI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'ACACIAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'ACANDI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'ACAPULCO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'ACEVEDO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'ACHI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'AGRADO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'AGUA DE DIOS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'AGUACHICA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'AGUACLARA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'AGUADA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'AGUADAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'AGUAS BLANCAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'AGUAZUL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'AIPE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'ALBAN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'ALBANIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caqueta', 'CAQ', 'ALBANIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'La Guajira', 'LAG', 'ALBANIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'ALCALA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'ALDANA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'ALEJANDRIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'ALGARROBO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'ALGECIRAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'ALMAGUER', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'ALMEIDA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'ALPUJARRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'ALTAMIRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'ALTAMIRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'ALTAQUER', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'ALTO BAUDO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'ALTO DE TABLAZO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'ALVARADO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'AMAGA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'AMAIME', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'AMALFI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'AMBALEMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'ANAPOIMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'ANCUYA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'ANDAGOYA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'ANDALUCIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'ANDES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'ANGELOPOLIS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'ANGOSTURA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'ANIMAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'ANOLAIMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'ANORI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'ANSERMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'ANSERMA NUEVO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'ANTEQUERA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'ANZA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'ANZOATEGUI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'APARTADO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Risaralda', 'RIS', 'APIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'APIAY', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'APULO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'AQUITANIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'ARACATACA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'ARANZAZU', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'ARATOCA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Arauca', 'ARA', 'ARAUCA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'ARAUCA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Arauca', 'ARA', 'ARAUQUITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'ARBELAEZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'ARBOLEDA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'ARBOLEDAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'ARBOLETES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'ARCABUCO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'ARENAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'ARGELIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'ARGELIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'ARGELIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'ARGENTINA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'ARJONA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'ARJONA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'ARMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Quindio', 'QUI', 'ARMENIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'ARMENIA MANTEQUILLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'ARMERO GUAYABAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'ARROYO DE PIEDRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'ASTREA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'ATACO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'AYACUCHO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'AYAPEL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'AZACRANAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'BAGAZAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'BAHIA SOLANO MUTIS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'BAJO BAUDO PIZARRO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'BAJO DEL LIMON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'BAJO TABLAZO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'BALBOA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Risaralda', 'RIS', 'BALBOA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'BALLESTAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'BARANOA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'BARAYA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'BARBACOAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'BARBOSA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'BARBOSA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Quindio', 'QUI', 'BARCELONA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'BARICHARA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'BARRANCA DE UPIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'BARRANCABERMEJA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'La Guajira', 'LAG', 'BARRANCAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'BARRANCO DE LOBA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'BARRANQUILLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'BARU', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'BAYUNCA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'BECERRIL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'BELALCAZAR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'BELALCAZAR PAEZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'BELEN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'BELEN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'BELEN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'BELEN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'BELEN DE BAJIRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caqueta', 'CAQ', 'BELEN DE LOS ANDAQUIES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Risaralda', 'RIS', 'BELEN DE UMBRIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'BELENCITO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'BELLO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'BELMIRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'BELTRAN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'BERBEO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'BERRUECOS ARBOLEDA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'BETANIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'BETEITIVA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'BETULIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'BETULIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'BITUIMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'BOAVITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'BOCHALEMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'BOGOTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'BOJACA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'BOJAYA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'BOLIVAR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'BOLIVAR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'BOLIVAR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'BOLIVIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'BOLOMBOLO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'BONAFONT', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'BONDA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'BOQUERON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'BOQUERON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'BOSA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'BOSCONIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'BOYACA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'BRICEÑO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'BRICEÑO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'BRICEÑO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Putumayo', 'PUT', 'BRISAS DEL HONG KONG', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'BRUSELAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'BUCARAMANGA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'BUCARASICA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'BUENA SENA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'BUENA VISTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'BUENAVENTURA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'BUENAVISTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'La Guajira', 'LAG', 'BUENAVISTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Quindio', 'QUI', 'BUENAVISTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'BUENOS AIRES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'BUENOS AIRES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'BUESACO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'BUESAQUILLO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'BUGA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'BUGA LA GRANDE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'BURITICA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'BUSBANZA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'CABRERA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'CABRERA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'CABUYA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'CACERES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'CACHIPAY', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'CACHIRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'CACICAZGO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'CACOTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'CAGUAN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'CAICEDO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'CAICEDONIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Sucre', 'SUC', 'CAIMITO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'CAJAMARCA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'CAJAPI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'CAJETE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'CAJIBIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'CAJICA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'CALAMAR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Quindio', 'QUI', 'CALARCA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'CALDAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'CALDAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'CALDAS VIEJO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'CALDONO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'CALI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'CALIBIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'CALOTO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'CAMBAO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'CAMILO C', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'CAMPAMENTO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'CAMPECHE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'CAMPO DE LA CRUZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'CAMPOALEGRE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'CAMPOALEGRE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'CAMPOHERMOSO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'CANALETE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'CAÑASGORDAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'CAÑAVERAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'CAÑAVERAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'CAÑAVERAL VILLANUEVA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'CANDELARIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'CANDELARIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'CANDELILLAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'CANTAGALLO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'CAPARRAPI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'CAPELLANIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'CAPITANEJO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'CAPURGANA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'CAQUEZA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'CARACOLI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'CARACOLICITO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'CARAMANTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'CAREPA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'CARLOSAMA CUASPUD', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'CARMEN DE APICALA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'CARMEN DE CARUPA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'CAROLINA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'CAROLINA DEL PRINCIPE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'CARRILLO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'CARRIZAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'CARTAGENA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'CARTAGENA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caqueta', 'CAQ', 'CARTAGENA DEL CHAIRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'CARTAGO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'CASABIANCA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'CASCAJAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'CASCAJAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'CASTILLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'CASTILLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'CASTILLA LA NUEVA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'CATAMBUCO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'CAUCASIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'CAVASA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'CEBADAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'CERETE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'CERINZA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'CERRITO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Risaralda', 'RIS', 'CERRITOS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'CERRO SAN ANTONIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'CERTEGUI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'CHACHAGUI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'CHAGUANI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'CHAPARRAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'CHARALA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'CHENCHE ASOLEADO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'CHIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'CHICORAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'CHIGORODO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'CHIMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'CHIMICHAGUA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'CHINACOTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'CHINAUTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'CHINAUTA LOS PANCHES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'CHINAVITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'CHINCHINA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'CHINU', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'CHIPAQUE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'CHIPATA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'CHIPUELO ORIENTE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'CHIQUINQUIRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'CHIQUIZA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'CHIRIGUANA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'CHISCAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'CHITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'CHITAGA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'CHITARAQUE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'CHIVATA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'CHIVOLO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'CHIVOR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'CHOACHI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'CHOCONTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'CHUCUNES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'CHUSACA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'CICUCO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'CIENAGA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'CIENAGA DE ORO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'CIENAGA HONDA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'CIENEGA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'CIMITARRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Quindio', 'QUI', 'CIRCASIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'CISNEROS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'CISNEROS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'CIUDAD BOLIVAR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'CLEMENCIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'COCONUCO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'COCORNA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'CODAZZI- AGUSTIN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'COELLO - COCORA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'COELLO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'COGUA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'COLOMBIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'COLOMBIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'COLOMBOY', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Putumayo', 'PUT', 'COLON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'COMBITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'CONCEPCION', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'CONCEPCION', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'CONCORDIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'CONCORDIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'CONDOTO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'CONSACA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'CONTADERO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'CONTRATACION', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'CONVENCION', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'CONVENIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'COPACABANA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'COPER', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'CORDOBA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'CORDOBA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Quindio', 'QUI', 'CORDOBA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'CORINTO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Sucre', 'SUC', 'COROZAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'CORRAL DE SAN LUIS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'CORRALEJAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'CORRALES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'COSCUEZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'COSTA RICA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'COTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'COTORRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'COVARACHIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Sucre', 'SUC', 'COVEÑAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'COYAIMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Arauca', 'ARA', 'CRAVO NORTE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'CRIOLLO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'CRUCERO DE GUALI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'CUATRO ESQUINAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'CUATRO VIENTOS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'CUBARA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'CUBARRAL SAN LUIS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'CUCAITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'CUCUNUBA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'CUCUTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'CUCUTILLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'CUITIVA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'CUMACA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'CUMARAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Vichada', 'VIC', 'CUMARIBO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'CUMBAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'CUMBITARA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'CUNDAY', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'CUPIAGUA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caqueta', 'CAQ', 'CURILLO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'CURITI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'CURRULAO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'CURUMANI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'CUSIANA POZO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'DABEIBA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'DAGUA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'DARIEN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'DAZA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'La Guajira', 'LAG', 'DISTRACCION', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'DOIMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'DOLORES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Sucre', 'SUC', 'DON ALONSO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'DON MATIAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'DORADAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Risaralda', 'RIS', 'DOSQUEBRADAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'DUITAMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'DURANIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'EBEJICO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'EL AGUILA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'EL BAGRE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'EL BANCO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'EL BAURA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'EL BORDO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'EL CAIRO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'EL CARITO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'EL CARMELO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'EL CARMEN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'EL CARMEN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'EL CARMEN DE ATRATO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'EL CARMEN DE BOLIVAR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'EL CARMEN DE CHUCURI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'EL CARMEN DE VIBORAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Quindio', 'QUI', 'EL CASTILLO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'EL CENTRO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'EL CERRITO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'EL CHARCO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'EL CHARQUITO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'EL COCUY', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'EL COLEGIO MESITAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'EL COPEY', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'EL DIFICIL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'EL DIVISO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'EL DOCE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caqueta', 'CAQ', 'EL DONCELLO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'EL DOVIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'EL ENCANO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'EL ERMITAÑO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'EL ESPINO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'EL ESPINO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'EL ESTRECHO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'EL GUAMO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'EL GUASIMO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Quindio', 'QUI', 'EL LAUREL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'EL LIMON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'EL LLANITO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'EL LLANO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'EL MARFIL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'La Guajira', 'LAG', 'EL MOLINO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'EL NARANJAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'EL OLIVO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'EL ORATORIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'EL PALMAR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'EL PALMAR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'EL PASO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'EL PATIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caqueta', 'CAQ', 'EL PAUJIL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'EL PEÑOL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'EL PEÑOL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'EL PEÑÓN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'EL PEÑON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Putumayo', 'PUT', 'EL PEPINO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'EL PIÑAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'EL PIÑON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'EL PITAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'EL PLACER', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'EL PLAYON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'EL PORTAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'EL PORVENIR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'EL QUEREMAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'EL REMOLINO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'EL REPOSO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'EL RETEN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'EL ROSAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'EL ROSARIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'EL SANTUARIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'EL SIETE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'EL SISGA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'EL TABLAZO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'EL TABLON DE GOMEZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'EL TAJO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'EL TAMBO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'EL TAMBO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'EL TARRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'EL TIGRE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Putumayo', 'PUT', 'EL TIGRE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'EL TOTUMO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'EL TREBOL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'EL TRES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'EL TRIQUE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'EL TRIUNFO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'EL VARAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'EL VIAJANO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'EL ZULIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'ENCISO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'ENTRERRIOS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'ENVIGADO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'ESPINAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'ESPRIELLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'FACATATIVA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'FALAN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'FELIDIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'FENICIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'FILADELFIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Quindio', 'QUI', 'FILANDIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'FIRAVITOBA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'FLANDES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caqueta', 'CAQ', 'FLORENCIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'FLORENCIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'FLORENCIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'FLORESTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'FLORIAN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'FLORIDA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'FLORIDABLANCA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'FOMEQUE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'La Guajira', 'LAG', 'FONSECA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'FONTIBON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'FORTALECILLAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Arauca', 'ARA', 'FORTUL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'FOSCA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'FREDONIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'FRESNO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'FRONTINO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'FUENTE DE ORO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'FUNDACION', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'FUNDADORES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'FUNES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'FUNZA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'FUQUENE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'FUSAGASUGA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'GACHALA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'GACHANCIPA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'GACHANTIVA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'GACHETA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'GAIRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'GAITANIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'GALAN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'GALAPA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Sucre', 'SUC', 'GALERAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'GALERAZAMBA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'GALINDEZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'GAMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'GAMARRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'GAMBITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'GAMEZA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'GARAGOA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'GARZON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'GATO NEGRO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'GENOVA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Quindio', 'QUI', 'GENOVA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'GENOY', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'GIGANTE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'GINEBRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'GIRALDO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'GIRARDOT', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'GIRARDOTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'GIRON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'GOMEZ PLATA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'GONZALEZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'GRAMALOTE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'GRANADA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'GRANADA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'GRANADA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'GUACA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'GUACAMAYAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'GUACAMAYAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'GUACARI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'GUACHAVEZ SAN CRUZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'GUACHENE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'GUACHETA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'GUACHIPAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'GUACHUCAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'GUACIRCO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'GUADALUPE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'GUADALUPE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'GUADALUPE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'GUADUAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'GUAIMARO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'GUAITARILLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'GUALANDAY', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'GUALMATAN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'GUAMAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'GUAMAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'GUAMAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'GUAMO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'GUAPI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Sucre', 'SUC', 'GUARANDA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'GUARATO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'GUARINOCITO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'GUARNE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'GUASCA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'GUATACA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'GUATAPE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'GUATAQUI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'GUATAVITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'GUATEQUE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Risaralda', 'RIS', 'GUATICA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'GUAVATA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'GUAYABAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'GUAYABAL DE SIQUIMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'GUAYABETAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'GUAYATA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'GUEPSA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'GUICAN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'GUTIERREZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'HACARI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'HATILLO DE LOBA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'HATO COROZAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'HATO DE IGLESIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'HATO GRANDE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'La Guajira', 'LAG', 'HATO NUEVO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'HELICONIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'HERBEO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'HERRAN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'HERRERA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'HIGUERONCITO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'HISPANIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'HOBO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'HOLGUIN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'HONDA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'IBAGUE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'ICONONZO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'IGUASITOS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'ILES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'IMBILI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'IMUES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Guainia', 'GUA', 'INIRIDA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'INZA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'IPIALES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'IQUIRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Risaralda', 'RIS', 'IRRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'ISABEL LOPEZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'ISTMINA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'ITAGUI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'ITUANGO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'IZA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'JAMBALO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'JAMUNDI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'JARDIN CACERES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'JARDIN SUROESTE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'JENESANO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'JERICO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'JERICO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'JERUSALEN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'JESUS MARIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'JOSE MARIA HERNANDEZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'JUAN ARIAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'JUAN DE ACOSTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'JUAN JOSE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'JUAN MINA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'JUNIN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'JUNIN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'JUNIN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'JUNTAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'JURADO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'KILOMETRO DOS Y MEDIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'KILOMETRO ONCE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'KILOMETRO VENTICINCO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'LA AGUADITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'LA APARTADA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'LA ARADA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'LA AURORA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Quindio', 'QUI', 'LA BELLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'LA BELLEZA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'LA BOQUILLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'LA CABAÑA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'LA CALERA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'LA CAPILLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'LA CEJA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Risaralda', 'RIS', 'LA CELIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'LA CHAMBA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'LA CHAPARRERA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'LA COLORADA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'LA CRUZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'LA CRUZADA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'LA CUMBRE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'LA DORADA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Putumayo', 'PUT', 'LA DORADA SAN MIGUEL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'LA ENEA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Arauca', 'ARA', 'LA ESMERALDA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'LA ESMERALDA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'LA ESPERANZA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'LA ESTRELLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'LA FELISA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'LA FLORESTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'LA FLORIDA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'LA FLORIDA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'LA GLORIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'LA GLORIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'LA GRAN VIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'LA GRAN VIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'LA GRANJA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'LA GUAFILLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'LA GUAYACANA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'LA HABANA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Putumayo', 'PUT', 'LA HORMIGA - VALLE GUAMUEZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'LA JAGUA DE IBIRICO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'La Guajira', 'LAG', 'LA JAGUA DEL PILAR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'LA LLANADA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'LA LOMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'LA MACARENA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'LA MAGDALENA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'LA MAGOLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Risaralda', 'RIS', 'LA MARINA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'LA MERCED', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'LA MESA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caqueta', 'CAQ', 'LA MONTAÑITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'LA NIATA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'LA PAILA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'LA PALMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'LA PALMITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'LA PARADA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'LA PARROQUIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'LA PAZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'LA PAZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'LA PEÑA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'LA PEÑA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Arauca', 'ARA', 'LA PESQUERA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'LA PINTADA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'LA PLATA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'LA PLATA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'LA PLAYA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'LA PLAZUELA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'LA PRADERA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Vichada', 'VIC', 'LA PRIMAVERA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'LA PUERTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'LA PUNTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'LA SALADA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'LA SIERRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'LA SIERRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'LA SIERRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'LA TABLAZA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Quindio', 'QUI', 'LA TEBAIDA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'LA ULLOA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'LA UNION', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'LA UNION', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'LA UNION', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Sucre', 'SUC', 'LA UNION', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'LA UNION', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'LA UVITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'LA VEGA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'LA VEGA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'LA VICTORIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'LA VICTORIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'LA VICTORIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Risaralda', 'RIS', 'LA VIRGINIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'LA YE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'LA YOPALOSA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'LABATECA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'LABRANZAGRANDE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'LANDAZURI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'LAS CASITAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'LAS GUAMAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'LAS ISLAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'LAS LAJAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Sucre', 'SUC', 'LAS PEÑAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'LEBRIJA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'LEIVA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'LEJANIAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'LENGUAZAQUE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'LERIDA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Amazonas', 'AMA', 'LETICIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'LIBANO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'LIBORINA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'LINARES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'LLANADAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'LLANOS DE CUIVA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'LLORENTE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'LLORO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'LOBO GUERRERO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'LOMA DE ARENA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'LOMA DE SIMON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'LOPEZ DE MICAY', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'LORICA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'LOS ANDES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'LOS CORDOBAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'LOS GOMEZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Sucre', 'SUC', 'LOS PALMITOS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'LOS PATIOS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'La Guajira', 'LAG', 'LOS PONDORES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'LOS SANTOS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'LOURDES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'LURUACO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'MACANAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'MACEO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'MACHETA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'MADRID', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'MAGANGUE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'MAHATES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'La Guajira', 'LAG', 'MAICAO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Sucre', 'SUC', 'MAJAGUAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'MAJO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'MALAGA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'MALAMBO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'MANATI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'La Guajira', 'LAG', 'MANAURE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'MANAURE BALCON DEL CESAR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'MANDIGUILLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'MANI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'MANIZALES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'MANTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'MANTAGORDAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'MANZANARES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'MARGARITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'MARIA LA BAJA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'MARIANGOLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'MARINILLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'MARIPI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'MARIQUITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'MARMATO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'MARQUETALIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Risaralda', 'RIS', 'MARSELLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'MARULANDA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'MATANZA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'MAYA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'MEDELLIN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'MEDIA LUNA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'MEDINA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'MELGAR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'MERCADERES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'MINAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'La Guajira', 'LAG', 'MINGUEO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'MIRAFLORES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'MIRANDA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Risaralda', 'RIS', 'MISTRATO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Vaupes', 'VAU', 'MITU', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Putumayo', 'PUT', 'MOCOA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'MOCONDINO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'MOGOTES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'MOJARRAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'MOLAGAVITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'MOLINEROS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'MOMIL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'MOMPOS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'MONDOMO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'MONGUA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'MONGUI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'MONIQUIRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'MOÑITOS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'MONTAÑITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'MONTEBELLO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'MONTEBONITO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'MONTECRISTO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'MONTELIBANO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Quindio', 'QUI', 'MONTENEGRO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'MONTERIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'MONTERRALO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'MONTERREY', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'MONTEZUMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'MORALES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'MORALES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caqueta', 'CAQ', 'MORELIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Sucre', 'SUC', 'MORROA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'MOSQUERA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'MOTAVITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'MURILLO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'MURINDO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'MUTATA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'MUTISCUA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'MUZO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'NARIÑO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'NARIÑO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'NARIÑO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'NARIÑO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'NATAGA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'NATAGAIMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'NECHI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'NECOCLI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'NEIRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'NEIVA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'NEMOCON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'NILO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'NIMAIMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'NOBSA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'NOCAIMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'NORCASIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'NOROSI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'NOVITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'NUEVA COLONIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'NUEVA GRANADA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'NUEVO COLON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'NUNCHIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'NUQUI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'OBANDO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'OBONUCO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'OCAÑA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'OIBA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'OICATA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'OLAYA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'OLAYA HERRERA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'OLIVAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'ONZAGA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'OPORAPA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'ORIHUECA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Putumayo', 'PUT', 'ORITO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'OROCUE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'ORTEGA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'ORTIGAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'OSPINA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'OTANCHE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'OTRAMINA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Sucre', 'SUC', 'OVEJAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'PACHAQUIARO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'PACHAVITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'PACHO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'PACORA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'PADILLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'PADUA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'PAEZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'PAICOL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'PAILITAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'PAIME', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'PAIPA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'PAISPAMBA SOTARA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'PAJARITO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'PALANGUA SEGUNDO SECTOR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'PALERMO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'PALERMO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'PALERMO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'PALESTINA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'PALESTINA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'PALMAR DE VARELA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'PALMIRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'PALMITAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'PALO MOCHO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'PALOCABILDO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'PAMPLONA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'PAMPLONITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'PANDI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'PANQUEBA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'PANTANO DE VARGAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'PARAMO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'PARATEBUENO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'PASACABALLOS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'PASCA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'PASO CUSIANA CASANARE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'PASTALES NUEVO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'PASTALES VIEJO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'PASTO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'PATILLAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'PATIO BONITO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'PAUNA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'PAYANDE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'PAZ DE ARIPORO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'PAZ DE RIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'PEDRAZA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'PELAYA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'PEÑA NEGRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'PEÑALISA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'PENSILVANIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'PEQUE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Risaralda', 'RIS', 'PEREIRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'PESCA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'PESCADERO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'PESCADOR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'PIEDECUESTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'PIEDRAHANCHA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'PIEDRAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'PIEDRASENTADA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'PIENDAMO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Quindio', 'QUI', 'PIJAO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'PIJIÑO DEL CARMEN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'PILCUAN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'PINCHOTE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'PINZON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'PIOJO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'PISBA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'PITAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'PITALITO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'PIVIJAY', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Putumayo', 'PUT', 'PLANADAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'PLANADAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'PLANETA RICA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'PLATO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'PLAYA MENDOZA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'PLAYARRICA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'POLICARPA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'POLONIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'POLONUEVO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'PONEDERA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'PONTEZUELA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'POPAYAN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'PORE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'PORTONES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'POTOSI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'PRADERA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'PRADO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'PRADO SEVILLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'PRESIDENTE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'PROVIDENCIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'San Andres y Providencia', 'SAP', 'PROVIDENCIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'PUEBLO BELLO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'PUEBLO NUEVO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Risaralda', 'RIS', 'PUEBLO RICO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'PUEBLONUEVO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'PUEBLORRICO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'PUEBLOVIEJO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'PUENTE BOYACA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'PUENTE DE BAGAZAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'PUENTE DE PIEDRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'PUENTE NACIONAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'PUENTE QUETAME', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'PUENTE TIERRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'PUERRES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'PUERTO ARAUJO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Putumayo', 'PUT', 'PUERTO ASIS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'PUERTO BELGICA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'PUERTO BERRIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'PUERTO BOGOTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'PUERTO BOYACA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Putumayo', 'PUT', 'PUERTO CAICEDO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Vichada', 'VIC', 'PUERTO CARREÑO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'PUERTO COLOMBIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'PUERTO CONCORDIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'PUERTO ESCONDIDO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'PUERTO GAITAN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'PUERTO GIRALDO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'PUERTO GUTIERREZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Putumayo', 'PUT', 'PUERTO GUZMAN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Putumayo', 'PUT', 'PUERTO LEGUIZAMO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'PUERTO LIBERTADOR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'PUERTO LIBRE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'PUERTO LLERAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'PUERTO LOPEZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'PUERTO NARE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Arauca', 'ARA', 'PUERTO NARIÑO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'PUERTO NUEVO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'PUERTO OLAYA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'PUERTO PARRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caqueta', 'CAQ', 'PUERTO RICO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'PUERTO RICO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'PUERTO RICO TIQUISIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'PUERTO ROMERO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Arauca', 'ARA', 'PUERTO RONDON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'PUERTO SALGAR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'PUERTO SANTANDER', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'PUERTO SERVIEZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'PUERTO TEJADA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'PUERTO TRIUNFO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Putumayo', 'PUT', 'PUERTO UMBRIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'PUERTO VALDIVIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'PUERTO WILCHES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'PULI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'PUPIALES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'PURACE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'PURIFICACION', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'PURISIMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'QUEBRADANEGRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'QUETAME', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'QUIBDO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Quindio', 'QUI', 'QUIMBAYA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'QUINAMAYO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Risaralda', 'RIS', 'QUINCHIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'QUIPAMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'QUIPILE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'QUITURO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'RAGONVALIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'RAMIRIQUI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'RAQUIRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'REGIDOR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'REMEDIO POBRE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'REMEDIOS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'REMOLINO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'REMOLINO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'REPELON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'RESTREPO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'RESTREPO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'RETIRO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'RICAURTE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'RICAURTE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Sucre', 'SUC', 'RICAURTE -COLOSO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'RINCON HONDO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'RINCON SANTO CENTRO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'RIO DE ORO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'RIO FRIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'RIO FRIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'RIO VIEJO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'RIOBLANCO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'RIOFRIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'La Guajira', 'LAG', 'RIOHACHA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'RIONEGRO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caqueta', 'CAQ', 'RIONEGRO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'RIONEGRO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'RIOSUCIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'RIOSUCIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'RISARALDA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'RIVERA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'ROCHA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'ROLDANILLO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'RONCESVALLES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'RONDON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'ROSAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'ROTINET', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'ROVIRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'ROZO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'SABANA DE TORRES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'SABANAGRANDE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SABANALARGA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'SABANALARGA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'SABANALARGA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'SABANAS DE SAN ANGEL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SABANETA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SABOYA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SACHICA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'SAHAGUN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'SALADO BLANCO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'SALAMINA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'SALAMINA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'SALAZAR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'SALDANA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Quindio', 'QUI', 'SALENTO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SALGAR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'SALGAR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'SALONICA LA MARINA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SAMACA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'SAMANA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'SAMANIEGO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'SAMARIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Sucre', 'SUC', 'SAMPUES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'SAMUEL SILVERIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'SAN ADOLFO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'SAN AGUSTIN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'SAN ALBERTO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'SAN ANDRES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SAN ANDRES DE CUERQUIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'SAN ANDRES DE SOTAVENTO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'San Andres y Providencia', 'SAP', 'SAN ANDRES ISLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'SAN ANT DE TEQUEN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'SAN ANTERO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'SAN ANTONIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'SAN ANTONIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'SAN ANTONIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SAN ANTONIO DE PRADO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'SAN BARTOLOME', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'SAN BENITO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Sucre', 'SUC', 'SAN BENITO ABAD', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'SAN BERNARDO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'SAN BERNARDO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'SAN BERNARDO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'SAN BERNARDO DEL VIENTO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'SAN CALIXTO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SAN CARLOS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'SAN CARLOS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'SAN CARLOS DE GUAROA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'SAN CAYETANO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'SAN CAYETANO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Risaralda', 'RIS', 'SAN CLEMENTE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'SAN DANIEL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'SAN DIEGO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'SAN DIEGO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SAN EDUARDO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'SAN ESTANISLAO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'SAN FELIPE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'SAN FELIX', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'SAN FERNANDO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'SAN FERNANDO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SAN FRANCISCO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'SAN FRANCISCO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Putumayo', 'PUT', 'SAN FRANCISCO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'SAN GIL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'SAN JACINTO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SAN JERONIMO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'SAN JOAQUIN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'SAN JOAQUIN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SAN JOSE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'SAN JOSE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'SAN JOSE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'SAN JOSE DE ALBAN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'SAN JOSE DE ARIGUANI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'SAN JOSE DE ISNOS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SAN JOSE DE LA MONTAÑA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'SAN JOSE DE MIRANDA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SAN JOSE DE PARE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'SAN JOSE DE URE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caqueta', 'CAQ', 'SAN JOSE DEL FRAGUA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Guaviare', 'GUV', 'SAN JOSE DEL GUAVIARE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SAN JOSE DEL NUS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'SAN JOSE DEL PALMAR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'SAN JUAN DE ARAMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'SAN JUAN DE RIOSECO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SAN JUAN DE URABA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'La Guajira', 'LAG', 'SAN JUAN DEL CESAR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'SAN JUAN NEPOMUCENO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'SAN LORENZO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'SAN LORENZO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SAN LUIS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'SAN LUIS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SAN LUIS DE GACENO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'SAN LUIS DE PALENQUE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Sucre', 'SUC', 'SAN MARCOS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'SAN MARCOS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'SAN MARTIN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'SAN MARTIN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'SAN MARTIN DE LOBA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SAN MATEO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SAN MIGUEL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Putumayo', 'PUT', 'SAN MIGUEL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'SAN MIGUEL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SAN MIGUEL DE SEMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Sucre', 'SUC', 'SAN ONOFRE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'SAN PABLO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'SAN PABLO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SAN PABLO DE BORBUR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Sucre', 'SUC', 'SAN PEDRO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'SAN PEDRO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'SAN PEDRO DE CARTAGO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SAN PEDRO DE LOS MILAGROS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SAN PEDRO DE URABA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'SAN PELAYO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SAN RAFAEL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'SAN RAFAEL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'SAN RAFAEL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'SAN RAIMUNDO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SAN ROQUE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'SAN ROQUE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'SAN SEBAST DE BUENAVI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'SAN SEBASTIAN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'SAN SEBASTIAN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SAN VICENTE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'SAN VICENTE DE CHUCURI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caqueta', 'CAQ', 'SAN VICENTE DEL CAGUAN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'SAN ZENON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'SANDONA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'SANTA ANA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'SANTA ANA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SANTA BARBARA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SANTA BARBARA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'SANTA BARBARA DE PINTO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'SANTA CATALINA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'San Andres y Providencia', 'SAP', 'SANTA CATALINA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'SANTA CRUZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SANTA ELENA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'SANTA ELENA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SANTA FE DE ANTIOQUIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'SANTA HELENA DEL OPON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'SANTA ISABEL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SANTA ISABELL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'SANTA LUCIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SANTA MARIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'SANTA MARIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'SANTA MARIA DEL DARIEN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'SANTA MARTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'SANTA RITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'SANTA ROSA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Risaralda', 'RIS', 'SANTA ROSA DE CABAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SANTA ROSA DE OSOS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SANTA ROSA DE VITERBO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'SANTA ROSA DEL SUR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Vichada', 'VIC', 'SANTA ROSALIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'SANTA ROSITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SANTA SOFIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'SANTA TERESA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'SANTA VERONICA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SANTANA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Putumayo', 'PUT', 'SANTANA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'SANTANDER DE QUILICHAO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'SANTANDERSITO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SANTIAGO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'SANTIAGO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Putumayo', 'PUT', 'SANTIAGO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'SANTIAGO PEREZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SANTO DOMINGO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'SANTO TOMAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Risaralda', 'RIS', 'SANTUARIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'SAPUYES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Arauca', 'ARA', 'SARAVENA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'SARDINATA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'SASAIMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SATIVANORTE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SATIVASUR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SEGOVIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'SESQUILE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SEVILLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'SEVILLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'SEVILLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SIACHOQUE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'SIBATE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Putumayo', 'PUT', 'SIBUNDOY', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'SILOS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'SILVANIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'SILVIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'SIMACOTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'SIMIJACA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'SIMITI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Sucre', 'SUC', 'SINCE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Sucre', 'SUC', 'SINCELEJO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'SIPI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'SITIO NUEVO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'SOACHA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SOATA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SOCHA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'SOCORRO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SOCOTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SOGAMOSO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'SOLEDAD', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caqueta', 'CAQ', 'SOLITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SOMONDOCO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'SONSO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SONSON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'SOPETRAN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'SOPLAVIENTO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'SOPO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SORA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SORACA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SOTAQUIRÁ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'SOTOMAYOR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'SUAITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'SUAN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'SUAREZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'SUAREZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'SUAZA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'SUBA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'SUBACHOQUE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'SUBIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'SUCRE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Sucre', 'SUC', 'SUCRE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'SUESCA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'SUPATA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'SUPIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'SUSA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SUSACON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SUTAMARCHAN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'SUTATAUSA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'SUTATENZA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'TABIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'TACARIMENA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'TADO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'TAGANGA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'TALAIGUA NUEVO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'TAMALAMEQUE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'TAMARA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Arauca', 'ARA', 'TAME', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'TAMESIS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'TAMINANGO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'TANGAREAL CARRETERA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'TANGAREAL DEL MIRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'TANGUA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'TARAZA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'TARQUI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'TARSO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'TASCO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'TAURAMENA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'TAUSA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'TELLO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'TENA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'TENERIFE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'TENJO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'TENZA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'TEORAMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'TERUEL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'TESALIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'TIBACUY', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'TIBANA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'TIBASOSA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'TIBIRITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'TIBU', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'TIERRA ALTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'TILODIRAN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'TIMANA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'TIMBA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'TIMBIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'TIMBIQUI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'TINJACA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'TIPACOQUE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'TITIRIBI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'TOBIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'TOCA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'TOCAIMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'TOCANCIPA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'TOGUI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'TOLEDO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'TOLEDO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Sucre', 'SUC', 'TOLU', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Sucre', 'SUC', 'TOLU VIEJO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'TOPAGA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'TOPAIPI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'TORIBIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'TORNO ROJO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'TORO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'TOTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'TOTORO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'TRES ESQUINAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'TRES ESQUINAS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'TRINIDAD', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'TRUJILLO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'TUBARA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'TUCHIN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'TUCURINCA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'TUDELA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'TULUA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'TUMACO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'TUNIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'TUNJA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'TUNUNGUA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'TUQUERRES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'TURBACO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'TURBANA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'TURBO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'TURMEQUE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'TUTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'TUTAZA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'TUTUNENDO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'UBALA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'UBAQUE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'UBATE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'ULLOA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'UMBITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'UNE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'UNETE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'UNGUIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'URAMITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'URIBE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'URIBE URIBE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'La Guajira', 'LAG', 'URIBIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'URRAO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'La Guajira', 'LAG', 'URUMITA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Atlantico', 'ATL', 'USIACURI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'UTICA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'VADO REAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'VALDIVIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'VALENCIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'VALENCIA JESUS', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'VALENCIA LA PAZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'VALLE DE SAN JOSE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'VALLE DE SAN JUAN', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cesar', 'CES', 'VALLEDUPAR', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'VALPARAISO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caqueta', 'CAQ', 'VALPARAISO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'VEGACHI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'VEGALARGA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'VELEZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'VELU', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'VENADILLO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'VENECIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'VENECIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'VENTAQUEMADA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'VERGARA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'VERSALLES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'VERSALLES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'VIANI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'VICTORIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'VIJES', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'VILLA CARO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'VILLA COLOMBIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'VILLA DE LEYVA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Norte de Santander', 'NSA', 'VILLA DEL ROSARIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'VILLA DEL SOCORRO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cordoba', 'COR', 'VILLA FATIMA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'VILLA GORGONA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cauca', 'CAU', 'VILLA RICA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'VILLA RICA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'VILLA VIEJA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'VILLACAROLA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Putumayo', 'PUT', 'VILLAGARZON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'VILLAGOMEZ', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'VILLAHERMOSA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'VILLAMARIA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'VILLANUEVA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'VILLANUEVA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'La Guajira', 'LAG', 'VILLANUEVA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'VILLANUEVA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'VILLAPINZON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Tolima', 'TOL', 'VILLARESTREPO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'VILLAVICENCIO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'VILLETA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'VIOTA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'VIRACACHA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Meta', 'MET', 'VISTA HERMOSA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Caldas', 'CAL', 'VITERBO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'YACOPI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Narino', 'NAR', 'YACUANQUER', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'YAGUARA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'YALI', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'YARUMAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'YOLOMBO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'YONDO CASABE', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Casanare', 'CAS', 'YOPAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'YOTOCO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'YUMBO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Choco', 'CHO', 'YUTO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Bolivar', 'BOL', 'ZAMBRANO', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Santander', 'SAN', 'ZAPATOCA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'ZARAGOZA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'ZARAGOZA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Valle del Cauca', 'VAC', 'ZARZAL', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Magdalena', 'MAG', 'ZAWADY', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Boyaca', 'BOY', 'ZETAQUIRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'ZIPACON', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Cundinamarca', 'CUN', 'ZIPAQUIRA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Huila', 'HUI', 'ZULUAGA', (SELECT id FROM "currencies" WHERE "code" = 'COP')),
  ('Colombia', 'CO', 'Antioquia', 'ANT', 'ZUNGO CARRETERA', (SELECT id FROM "currencies" WHERE "code" = 'COP'))
ON CONFLICT ("country_code", "state_name", "city_name") DO NOTHING;

COMMIT;

-- Total ciudades insertables (deduplicadas): 1449