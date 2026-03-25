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
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now()),
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
  ('sales_representatives', 'active', 'Activo'),
  ('sales_representatives', 'inactive', 'Inactivo'),
  ('sales_representatives', 'blocked', 'Bloqueado'),
  ('credit_applications', 'authorized', 'Autorizado'),
  ('credit_applications', 'cancelled', 'Cancelado'),
  ('credit_applications', 'in_study', 'En estudio'),
  ('credit_applications', 'delinquent', 'En mora'),
  ('credit_applications', 'closed', 'Cerrado'),
  ('contract_signers', 'pending', 'Pendiente'),
  ('contract_signers', 'signed', 'Firmado'),
  ('contract_signers', 'declined', 'Rechazado'),
  ('credit_facilities', 'active', 'Activo'),
  ('credit_facilities', 'suspended', 'Suspendido'),
  ('credit_facilities', 'closed', 'Cerrado'),
  ('categories', 'active', 'Activo'),
  ('categories', 'inactive', 'Inactivo'),
  ('categories', 'archived', 'Archivado'),
  -- Compatibilidad para migracion 1773072000000
  ('contracts', 'pending', 'Pendiente'),
  ('contracts', 'signed', 'Firmado'),
  ('contracts', 'cancelled', 'Cancelado')
ON CONFLICT ("entity_type", "code") DO NOTHING;

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
  incoming_status_id BIGINT;
  actual_entity text;
BEGIN
  incoming_status_id := NEW.status_id;

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

CREATE TABLE "permissions" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "code" varchar(120) NOT NULL UNIQUE,
  "description" text,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "roles" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "name" varchar(80) NOT NULL UNIQUE,
  "description" text,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "role_permissions" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "role_id" BIGINT NOT NULL,
  "permission_id" BIGINT NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now()),
  UNIQUE ("role_id", "permission_id")
);

CREATE TABLE "users" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "cognito_sub" uuid NOT NULL UNIQUE,
  "email" varchar NOT NULL UNIQUE,
  "phone" varchar UNIQUE,
  "role_id" BIGINT,
  "status_id" BIGINT NOT NULL DEFAULT get_status_id('users', 'active'),
  "last_login_at" timestamptz,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
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
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now()),
  UNIQUE ("country_code", "state_name", "city_name")
);

CREATE TABLE "persons" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" BIGINT NOT NULL,
  "country_code" varchar(2),
  "first_name" varchar(255) NOT NULL,
  "last_name" varchar(255) NOT NULL,
  "doc_type" varchar(100) NOT NULL,
  "doc_number" varchar NOT NULL UNIQUE,
  "doc_issue_date" date,
  "birth_date" date,
  "gender" varchar(20),
  "phone" varchar,
  "residential_address" text,
  "business_address" text,
  "city_id" BIGINT,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "documents" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "document_type" varchar NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "business_seniority" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "description" varchar(100) NOT NULL,
  "range_start" int NOT NULL,
  "range_end" int NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "businesses" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" BIGINT NOT NULL,
  "city_id" BIGINT,
  "entity_type" varchar(10) NOT NULL,
  "business_name" varchar(255),
  "business_address" text,
  "business_type" varchar(10),
  "relationship_to_business" varchar(100),
  "legal_name" varchar(255),
  "trade_name" varchar(255),
  "tax_id" varchar(50) UNIQUE,
  "year_of_establishment" int,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "partners" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "business_id" BIGINT NOT NULL,
  "acronym" varchar(10),
  "logo_url" text,
  "co_branding_logo_url" text,
  "primary_color" varchar(20),
  "secondary_color" varchar(20),
  "light_color" varchar(20),
  "sales_rep_role_name" varchar(50) DEFAULT 'Sales Rep',
  "sales_rep_role_name_plural" varchar(50) DEFAULT 'Sales Reps',
  "api_key_hash" boolean DEFAULT false,
  "notification_email" varchar,
  "webhook_url" text,
  "send_sales_rep_voucher" boolean DEFAULT false,
  "disbursement_notification_email" varchar,
  "default_rep_id" BIGINT,
  "status_id" BIGINT NOT NULL DEFAULT get_status_id('partners', 'active'),
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "bank_accounts" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "bank_entity" varchar(255) NOT NULL,
  "account_number" varchar(500) NOT NULL,
  "bank_certification" text,
  -- Compatibilidad con migracion 1773072000000 (indice idx_bank_accounts_user_id)
  "user_id" BIGINT,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "suppliers" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "business_id" BIGINT NOT NULL UNIQUE,
  "bank_account_id" BIGINT UNIQUE,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "sales_representatives" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "partner_id" BIGINT NOT NULL,
  "user_id" BIGINT,
  "name" varchar(255) NOT NULL,
  "role" varchar(100) NOT NULL,
  "status_id" BIGINT NOT NULL DEFAULT get_status_id('sales_representatives', 'active'),
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "credit_facilities" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "contract_id" varchar(255),
  "status_id" BIGINT NOT NULL DEFAULT get_status_id('credit_facilities', 'active'),
  "total_limit" decimal(18,4) NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "categories" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "credit_facility_id" BIGINT NOT NULL,
  "partner_id" BIGINT,
  "name" varchar(255) NOT NULL,
  "discount_percentage" decimal(8,4) NOT NULL,
  "interest_rate" decimal(8,4) NOT NULL,
  "disbursement_fee_percent" decimal(8,4),
  "minimum_disbursement_fee" decimal(18,4),
  "delay_days" int NOT NULL,
  "term_days" int NOT NULL,
  "status_id" BIGINT NOT NULL DEFAULT get_status_id('categories', 'active'),
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "credit_applications" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "person_id" BIGINT,
  "partner_id" BIGINT,
  "partner_category_id" BIGINT,
  "business_id" BIGINT,
  "number_of_locations" int,
  "number_of_employees" int,
  "business_seniority" varchar,
  "sector_experience" varchar,
  "business_flagship_m2" int,
  "business_has_rent" boolean,
  "business_rent_amount" BIGINT,
  "monthly_income" bigint,
  "monthly_expenses" bigint,
  "monthly_purchases" bigint,
  "current_purchases" bigint,
  "total_assets" bigint,
  "requested_credit_line" bigint,
  "is_current_client" boolean NOT NULL DEFAULT false,
  "status_id" BIGINT NOT NULL DEFAULT get_status_id('credit_applications', 'in_study'),
  "submission_date" timestamptz,
  "approval_date" timestamptz,
  "rejection_reason" varchar(500),
  "credit_study_date" timestamptz,
  "credit_score" decimal(8,2),
  "credit_decision" varchar,
  "approved_credit_line" bigint,
  "analyst_report" text,
  "risk_profile" varchar,
  "privacy_policy_accepted" boolean NOT NULL DEFAULT false,
  "privacy_policy_date" timestamptz,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "shareholders" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "company_id" BIGINT NOT NULL,
  "person_id" BIGINT NOT NULL,
  "ownership_percentage" decimal(5,4),
  "evaluation_order" int,
  "credit_check_required" boolean NOT NULL DEFAULT false,
  "credit_check_completed" boolean NOT NULL DEFAULT false,
  "is_legal_representative" boolean NOT NULL DEFAULT false,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "legal_representatives" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "company_id" BIGINT NOT NULL,
  "person_id" BIGINT NOT NULL,
  "is_primary" boolean NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
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
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "guarantors" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "credit_application_id" BIGINT NOT NULL,
  "person_id" BIGINT NOT NULL,
  "contract_signer_id" BIGINT,
  "guarantor_type" varchar(20) NOT NULL,
  "relationship_to_applicant" varchar(100),
  "is_primary_guarantor" boolean NOT NULL DEFAULT false,
  "selected_after_credit_check" boolean NOT NULL DEFAULT false,
  "signature_url" text,
  "signature_date" timestamptz,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "purchase_orders" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" varchar(255) NOT NULL,
  "supplier_id" BIGINT NOT NULL,
  "amount" decimal(18,2) NOT NULL,
  "document_url" text,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

ALTER TABLE "role_permissions" ADD FOREIGN KEY ("permission_id") REFERENCES "permissions" ("id");
ALTER TABLE "role_permissions" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");
ALTER TABLE "users" ADD FOREIGN KEY ("status_id") REFERENCES "statuses" ("id");
ALTER TABLE "users" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");
ALTER TABLE "persons" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "persons" ADD FOREIGN KEY ("city_id") REFERENCES "cities" ("id");
ALTER TABLE "businesses" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "businesses" ADD FOREIGN KEY ("city_id") REFERENCES "cities" ("id");
ALTER TABLE "partners" ADD FOREIGN KEY ("business_id") REFERENCES "businesses" ("id");
ALTER TABLE "partners" ADD FOREIGN KEY ("default_rep_id") REFERENCES "sales_representatives" ("id");
ALTER TABLE "partners" ADD FOREIGN KEY ("status_id") REFERENCES "statuses" ("id");
ALTER TABLE "bank_accounts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "suppliers" ADD FOREIGN KEY ("business_id") REFERENCES "businesses" ("id");
ALTER TABLE "suppliers" ADD FOREIGN KEY ("bank_account_id") REFERENCES "bank_accounts" ("id");
ALTER TABLE "sales_representatives" ADD FOREIGN KEY ("partner_id") REFERENCES "partners" ("id");
ALTER TABLE "sales_representatives" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "sales_representatives" ADD FOREIGN KEY ("status_id") REFERENCES "statuses" ("id");
ALTER TABLE "credit_facilities" ADD FOREIGN KEY ("status_id") REFERENCES "statuses" ("id");
ALTER TABLE "categories" ADD FOREIGN KEY ("credit_facility_id") REFERENCES "credit_facilities" ("id");
ALTER TABLE "categories" ADD FOREIGN KEY ("partner_id") REFERENCES "partners" ("id");
ALTER TABLE "categories" ADD FOREIGN KEY ("status_id") REFERENCES "statuses" ("id");
ALTER TABLE "credit_applications" ADD FOREIGN KEY ("person_id") REFERENCES "persons" ("id");
ALTER TABLE "credit_applications" ADD FOREIGN KEY ("partner_id") REFERENCES "partners" ("id");
ALTER TABLE "credit_applications" ADD FOREIGN KEY ("business_id") REFERENCES "businesses" ("id");
ALTER TABLE "credit_applications" ADD FOREIGN KEY ("status_id") REFERENCES "statuses" ("id");
ALTER TABLE "shareholders" ADD FOREIGN KEY ("company_id") REFERENCES "businesses" ("id");
ALTER TABLE "shareholders" ADD FOREIGN KEY ("person_id") REFERENCES "persons" ("id");
ALTER TABLE "legal_representatives" ADD FOREIGN KEY ("company_id") REFERENCES "businesses" ("id");
ALTER TABLE "legal_representatives" ADD FOREIGN KEY ("person_id") REFERENCES "persons" ("id");
ALTER TABLE "contract_signers" ADD FOREIGN KEY ("person_id") REFERENCES "persons" ("id");
ALTER TABLE "contract_signers" ADD FOREIGN KEY ("status_id") REFERENCES "statuses" ("id");
ALTER TABLE "guarantors" ADD FOREIGN KEY ("credit_application_id") REFERENCES "credit_applications" ("id");
ALTER TABLE "guarantors" ADD FOREIGN KEY ("person_id") REFERENCES "persons" ("id");
ALTER TABLE "guarantors" ADD FOREIGN KEY ("contract_signer_id") REFERENCES "contract_signers" ("id");
ALTER TABLE "purchase_orders" ADD FOREIGN KEY ("supplier_id") REFERENCES "suppliers" ("id");

CREATE TRIGGER trg_users_validate_status
BEFORE INSERT OR UPDATE OF status_id ON "users"
FOR EACH ROW
EXECUTE FUNCTION validate_status_entity('users', 'status_id');

CREATE TRIGGER trg_partners_validate_status
BEFORE INSERT OR UPDATE OF status_id ON "partners"
FOR EACH ROW
EXECUTE FUNCTION validate_status_entity('partners', 'status_id');

CREATE TRIGGER trg_sales_representatives_validate_status
BEFORE INSERT OR UPDATE OF status_id ON "sales_representatives"
FOR EACH ROW
EXECUTE FUNCTION validate_status_entity('sales_representatives', 'status_id');

CREATE TRIGGER trg_credit_facilities_validate_status
BEFORE INSERT OR UPDATE OF status_id ON "credit_facilities"
FOR EACH ROW
EXECUTE FUNCTION validate_status_entity('credit_facilities', 'status_id');

CREATE TRIGGER trg_categories_validate_status
BEFORE INSERT OR UPDATE OF status_id ON "categories"
FOR EACH ROW
EXECUTE FUNCTION validate_status_entity('categories', 'status_id');

CREATE TRIGGER trg_credit_applications_validate_status
BEFORE INSERT OR UPDATE OF status_id ON "credit_applications"
FOR EACH ROW
EXECUTE FUNCTION validate_status_entity('credit_applications', 'status_id');

CREATE TRIGGER trg_contract_signers_validate_status
BEFORE INSERT OR UPDATE OF status_id ON "contract_signers"
FOR EACH ROW
EXECUTE FUNCTION validate_status_entity('contract_signers', 'status_id');

CREATE UNIQUE INDEX IF NOT EXISTS idx_statuses_external_id ON "statuses" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_permissions_external_id ON "permissions" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_roles_external_id ON "roles" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_role_permissions_external_id ON "role_permissions" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_external_id ON "users" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_cities_external_id ON "cities" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_persons_external_id ON "persons" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_documents_external_id ON "documents" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_business_seniority_external_id ON "business_seniority" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_businesses_external_id ON "businesses" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_partners_external_id ON "partners" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_bank_accounts_external_id ON "bank_accounts" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_suppliers_external_id ON "suppliers" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_sales_representatives_external_id ON "sales_representatives" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_credit_facilities_external_id ON "credit_facilities" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_categories_external_id ON "categories" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_credit_applications_external_id ON "credit_applications" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_shareholders_external_id ON "shareholders" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_legal_representatives_external_id ON "legal_representatives" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_contract_signers_external_id ON "contract_signers" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_guarantors_external_id ON "guarantors" ("external_id");
CREATE UNIQUE INDEX IF NOT EXISTS idx_purchase_orders_external_id ON "purchase_orders" ("external_id");

CREATE INDEX IF NOT EXISTS idx_role_permissions_role_id ON "role_permissions" ("role_id");
CREATE INDEX IF NOT EXISTS idx_role_permissions_permission_id ON "role_permissions" ("permission_id");
CREATE INDEX IF NOT EXISTS idx_users_role_id ON "users" ("role_id");
CREATE INDEX IF NOT EXISTS idx_users_status_id ON "users" ("status_id");
CREATE INDEX IF NOT EXISTS idx_persons_user_id ON "persons" ("user_id");
CREATE INDEX IF NOT EXISTS idx_persons_city_id ON "persons" ("city_id");
CREATE INDEX IF NOT EXISTS idx_businesses_user_id ON "businesses" ("user_id");
CREATE INDEX IF NOT EXISTS idx_businesses_city_id ON "businesses" ("city_id");
CREATE INDEX IF NOT EXISTS idx_partners_business_id ON "partners" ("business_id");
CREATE INDEX IF NOT EXISTS idx_partners_default_rep_id ON "partners" ("default_rep_id");
CREATE INDEX IF NOT EXISTS idx_partners_status_id ON "partners" ("status_id");
CREATE INDEX IF NOT EXISTS idx_bank_accounts_user_id ON "bank_accounts" ("user_id");
CREATE INDEX IF NOT EXISTS idx_suppliers_business_id ON "suppliers" ("business_id");
CREATE INDEX IF NOT EXISTS idx_suppliers_bank_account_id ON "suppliers" ("bank_account_id");
CREATE INDEX IF NOT EXISTS idx_sales_representatives_partner_id ON "sales_representatives" ("partner_id");
CREATE INDEX IF NOT EXISTS idx_sales_representatives_user_id ON "sales_representatives" ("user_id");
CREATE INDEX IF NOT EXISTS idx_sales_representatives_status_id ON "sales_representatives" ("status_id");
CREATE INDEX IF NOT EXISTS idx_credit_facilities_status_id ON "credit_facilities" ("status_id");
CREATE INDEX IF NOT EXISTS idx_categories_credit_facility_id ON "categories" ("credit_facility_id");
CREATE INDEX IF NOT EXISTS idx_categories_partner_id ON "categories" ("partner_id");
CREATE INDEX IF NOT EXISTS idx_categories_status_id ON "categories" ("status_id");
CREATE INDEX IF NOT EXISTS idx_credit_applications_person_id ON "credit_applications" ("person_id");
CREATE INDEX IF NOT EXISTS idx_credit_applications_partner_id ON "credit_applications" ("partner_id");
CREATE INDEX IF NOT EXISTS idx_credit_applications_business_id ON "credit_applications" ("business_id");
CREATE INDEX IF NOT EXISTS idx_credit_applications_status_id ON "credit_applications" ("status_id");
CREATE INDEX IF NOT EXISTS idx_shareholders_company_id ON "shareholders" ("company_id");
CREATE INDEX IF NOT EXISTS idx_shareholders_person_id ON "shareholders" ("person_id");
CREATE INDEX IF NOT EXISTS idx_legal_representatives_company_id ON "legal_representatives" ("company_id");
CREATE INDEX IF NOT EXISTS idx_legal_representatives_person_id ON "legal_representatives" ("person_id");
CREATE INDEX IF NOT EXISTS idx_contract_signers_person_id ON "contract_signers" ("person_id");
CREATE INDEX IF NOT EXISTS idx_contract_signers_status_id ON "contract_signers" ("status_id");
CREATE INDEX IF NOT EXISTS idx_guarantors_credit_application_id ON "guarantors" ("credit_application_id");
CREATE INDEX IF NOT EXISTS idx_guarantors_person_id ON "guarantors" ("person_id");
CREATE INDEX IF NOT EXISTS idx_guarantors_contract_signer_id ON "guarantors" ("contract_signer_id");
CREATE INDEX IF NOT EXISTS idx_purchase_orders_supplier_id ON "purchase_orders" ("supplier_id");
