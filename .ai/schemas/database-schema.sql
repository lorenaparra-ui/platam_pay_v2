-- =============================================================================
-- PLATAM PAY v2 — DDL Estado Real (Sincronizado con TypeORM entities)
-- Versión: 2.0 | Fecha: 2026-04-01
-- Motor: PostgreSQL 15+ | Extensión: pgcrypto
--
-- SCHEMAS REALES:
--   transversal_schema  → Identidad, RBAC, catálogos, personas y geografía
--   suppliers_schema    → Negocios, proveedores, partners y operación comercial
--   products_schema     → Solicitudes, contratos y líneas de crédito
--
-- NOTAS DE ARQUITECTURA:
--   1. users.state, partners.state, credit_facilities.state, categories.state
--      usan ENUM (no FK a statuses) — coexiste con status_id FK en otras tablas.
--   2. businesses.person_id → persons (NO user_id → users).
--   3. contracts NO tiene application_id; el vínculo es inverso:
--      credit_applications.contract_id → contracts.id.
--   4. purchase_orders.user_id es VARCHAR (referencia externa, no FK).
--   5. sales_representatives tiene columnas name/role/status_id en BD
--      que aún no están mapeadas en la entidad TypeORM.
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
SET timezone = 'America/Bogota';

-- =============================================================================
-- SCHEMAS
-- =============================================================================
CREATE SCHEMA IF NOT EXISTS transversal_schema;
CREATE SCHEMA IF NOT EXISTS suppliers_schema;
CREATE SCHEMA IF NOT EXISTS products_schema;


-- =============================================================================
-- SCHEMA: transversal_schema
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Catálogo de estados (fuente de verdad para tablas que usan status_id FK)
-- ---------------------------------------------------------------------------
CREATE TABLE transversal_schema.catalog_status_types (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id  UUID         NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  entity_type  VARCHAR(100) NOT NULL,
  code         VARCHAR(50)  NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  description  TEXT,
  is_active    BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ  NOT NULL DEFAULT now(),
  CONSTRAINT uq_catalog_status_types_entity_code UNIQUE (entity_type, code)
);

CREATE INDEX idx_catalog_status_types_entity_type ON transversal_schema.catalog_status_types (entity_type);
COMMENT ON TABLE  transversal_schema.catalog_status_types IS 'Catálogo maestro de estados. Validado por trigger validate_status_entity().';
COMMENT ON COLUMN transversal_schema.catalog_status_types.entity_type IS 'Entidad dueña: contracts, credit_applications, sales_representatives, contract_templates, etc.';


-- ---------------------------------------------------------------------------
-- RBAC
-- ---------------------------------------------------------------------------
CREATE TABLE transversal_schema.roles (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id UUID        NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  name        VARCHAR(80) NOT NULL UNIQUE,
  description TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE transversal_schema.permissions (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id UUID         NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  code        VARCHAR(120) NOT NULL UNIQUE,
  description TEXT,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE TABLE transversal_schema.role_permissions (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id   UUID    NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  role_id       BIGINT  NOT NULL REFERENCES transversal_schema.roles(id) ON DELETE CASCADE,
  permission_id BIGINT  NOT NULL REFERENCES transversal_schema.permissions(id) ON DELETE CASCADE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_role_permission UNIQUE (role_id, permission_id)
);

CREATE INDEX idx_role_permissions_role_id       ON transversal_schema.role_permissions (role_id);
CREATE INDEX idx_role_permissions_permission_id ON transversal_schema.role_permissions (permission_id);


-- ---------------------------------------------------------------------------
-- Geografía y monedas
-- ---------------------------------------------------------------------------
CREATE TABLE transversal_schema.currencies (
  id                 BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id        UUID        NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  code               VARCHAR(3)  NOT NULL UNIQUE,
  name               VARCHAR(120) NOT NULL,
  symbol             VARCHAR(10),
  decimal_places     INT         NOT NULL DEFAULT 2 CHECK (decimal_places BETWEEN 0 AND 6),
  thousand_separator VARCHAR(1),
  decimal_separator  VARCHAR(1),
  is_active          BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE transversal_schema.cities (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id  UUID         NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  country_name VARCHAR(120) NOT NULL,
  country_code VARCHAR(2)   NOT NULL CHECK (country_code ~ '^[A-Z]{2}$'),
  state_name   VARCHAR(120) NOT NULL,
  state_code   VARCHAR(3)   CHECK (state_code IS NULL OR state_code ~ '^[A-Z0-9]{2,3}$'),
  city_name    VARCHAR(120) NOT NULL,
  currency_id  BIGINT       NOT NULL REFERENCES transversal_schema.currencies(id),
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ  NOT NULL DEFAULT now(),
  CONSTRAINT uq_cities_location UNIQUE (country_code, state_name, city_name)
);

CREATE INDEX idx_cities_country_state_name ON transversal_schema.cities (country_code, state_name, city_name);
CREATE INDEX idx_cities_currency_id        ON transversal_schema.cities (currency_id);

-- Catálogo de departamentos/estados (migración incremental 20260330)
CREATE TABLE IF NOT EXISTS transversal_schema.states (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id  UUID        NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  country_code VARCHAR(2)  NOT NULL CHECK (country_code ~ '^[A-Z]{2}$'),
  state_name   VARCHAR(120) NOT NULL,
  state_code   VARCHAR(3)  CHECK (state_code IS NULL OR state_code ~ '^[A-Z0-9]{2,3}$'),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_states_country_state UNIQUE (country_code, state_name)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_states_external_id ON transversal_schema.states (external_id);


-- ---------------------------------------------------------------------------
-- ENUMs de usuarios
-- ---------------------------------------------------------------------------
CREATE TYPE transversal_schema.user_state AS ENUM ('active', 'inactive');

CREATE TABLE transversal_schema.users (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id   UUID    NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  cognito_sub   UUID    NOT NULL UNIQUE,
  email         VARCHAR NOT NULL UNIQUE,
  role_id       BIGINT  REFERENCES transversal_schema.roles(id),
  -- NOTA: state usa ENUM, no FK a statuses. Coexiste con status_id en otras tablas.
  state         transversal_schema.user_state NOT NULL DEFAULT 'active',
  -- NOTA: person_id referencia implícita (FK no declarada en DDL actual)
  person_id     BIGINT,
  parent_id     BIGINT  REFERENCES transversal_schema.users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  last_login_at TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT ck_users_parent_not_self CHECK (parent_id IS NULL OR parent_id <> id)
);

CREATE INDEX idx_users_role_id     ON transversal_schema.users (role_id);
CREATE INDEX idx_users_cognito_sub ON transversal_schema.users (cognito_sub);
CREATE INDEX idx_users_parent_id   ON transversal_schema.users (parent_id);

COMMENT ON COLUMN transversal_schema.users.state     IS 'ENUM: active|inactive. No usa FK a statuses.';
COMMENT ON COLUMN transversal_schema.users.person_id IS 'Referencia a transversal_schema.persons.id. FK no declarada formalmente en DDL actual.';
COMMENT ON COLUMN transversal_schema.users.parent_id IS 'Usuario jerárquico superior (FK a users.id).';


-- ---------------------------------------------------------------------------
-- Personas (PII — requiere cifrado en reposo)
-- ---------------------------------------------------------------------------
CREATE TABLE transversal_schema.persons (
  id                  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id         UUID         NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  country_code        VARCHAR(2),
  first_name          VARCHAR(255) NOT NULL,  -- PII: AES-256
  last_name           VARCHAR(255) NOT NULL,  -- PII: AES-256
  doc_type            VARCHAR(100) NOT NULL,
  doc_number          VARCHAR      NOT NULL UNIQUE,  -- PII: AES-256
  doc_issue_date      DATE,
  birth_date          DATE,                          -- PII
  gender              VARCHAR(20),
  phone               VARCHAR,                       -- PII
  residential_address TEXT,                          -- PII
  business_address    TEXT,
  city_id             BIGINT REFERENCES transversal_schema.cities(id),
  created_at          TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_persons_city_id ON transversal_schema.persons (city_id);
COMMENT ON TABLE transversal_schema.persons IS 'PII sensible. Cifrar: first_name, last_name, doc_number, birth_date, phone, residential_address.';


-- ---------------------------------------------------------------------------
-- Idempotencia SQS
-- ---------------------------------------------------------------------------
CREATE TABLE transversal_schema.upload_files_idempotency (
  id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  idempotency_key VARCHAR(512) NOT NULL UNIQUE,
  correlation_id  UUID         NOT NULL,
  result          JSONB,
  created_at      TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE TABLE transversal_schema.partner_create_user_sqs_idempotency (
  id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  idempotency_key VARCHAR(512) NOT NULL UNIQUE,
  correlation_id  UUID         NOT NULL,
  result          JSONB,
  created_at      TIMESTAMPTZ  NOT NULL DEFAULT now()
);


-- ---------------------------------------------------------------------------
-- Función helper para status_id
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION transversal_schema.get_status_id(p_entity_type TEXT, p_code TEXT)
RETURNS BIGINT
LANGUAGE sql STABLE AS $$
  SELECT id FROM transversal_schema.catalog_status_types
  WHERE entity_type = p_entity_type AND code = p_code AND is_active = TRUE
  LIMIT 1;
$$;

-- ---------------------------------------------------------------------------
-- Trigger: validate_status_entity
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION transversal_schema.validate_status_entity()
RETURNS TRIGGER
LANGUAGE plpgsql AS $$
DECLARE
  expected_entity TEXT := TG_ARGV[0];
  status_column   TEXT := TG_ARGV[1];
  incoming_id     BIGINT;
  actual_entity   TEXT;
BEGIN
  IF status_column = 'status_id' THEN
    incoming_id := NEW.status_id;
  ELSIF status_column = 'verification_status_id' THEN
    incoming_id := NEW.verification_status_id;
  ELSE
    RAISE EXCEPTION 'Unsupported status column: %', status_column;
  END IF;

  IF incoming_id IS NULL THEN
    RAISE EXCEPTION 'status_id cannot be NULL for %', expected_entity;
  END IF;

  SELECT entity_type INTO actual_entity
  FROM transversal_schema.catalog_status_types
  WHERE id = incoming_id AND is_active = TRUE;

  IF actual_entity IS NULL THEN
    RAISE EXCEPTION 'Status id % does not exist or is inactive', incoming_id;
  END IF;

  IF actual_entity <> expected_entity THEN
    RAISE EXCEPTION 'Status id % belongs to entity_type %, expected %',
      incoming_id, actual_entity, expected_entity;
  END IF;

  RETURN NEW;
END;
$$;


-- =============================================================================
-- SCHEMA: suppliers_schema
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Catálogo antigüedad del negocio (reemplaza option_group=business_seniority)
-- ---------------------------------------------------------------------------
CREATE TABLE suppliers_schema.business_seniority (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id UUID         NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  description VARCHAR(100) NOT NULL,
  range_start INT          NOT NULL,
  range_end   INT          NOT NULL,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

COMMENT ON TABLE suppliers_schema.business_seniority IS 'Reemplaza option_group=business_seniority del DDL antiguo.';


-- ---------------------------------------------------------------------------
-- Negocios — person_id FK a persons (diferencia crítica vs DDL antiguo)
-- ---------------------------------------------------------------------------
CREATE TABLE suppliers_schema.businesses (
  id                       BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id              UUID         NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  -- NOTA: person_id, NO user_id. Diferencia crítica vs database-schema.sql v1.
  person_id                BIGINT       NOT NULL REFERENCES transversal_schema.persons(id),
  business_seniority_id    BIGINT       REFERENCES suppliers_schema.business_seniority(id) ON DELETE SET NULL,
  city_id                  BIGINT       REFERENCES transversal_schema.cities(id),
  entity_type              VARCHAR(10)  NOT NULL CHECK (entity_type IN ('PN', 'PJ')),
  business_name            VARCHAR(255),
  business_address         TEXT,
  business_type            VARCHAR(10),
  relationship_to_business VARCHAR(100),
  legal_name               VARCHAR(255),
  trade_name               VARCHAR(255),
  tax_id                   VARCHAR(50)  UNIQUE,  -- PII: NIT/RUT
  year_of_establishment    INT,
  created_at               TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at               TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_businesses_person_id          ON suppliers_schema.businesses (person_id);
CREATE INDEX idx_businesses_city_id            ON suppliers_schema.businesses (city_id);
CREATE INDEX idx_businesses_entity_type        ON suppliers_schema.businesses (entity_type);
CREATE INDEX idx_businesses_business_seniority ON suppliers_schema.businesses (business_seniority_id);

COMMENT ON COLUMN suppliers_schema.businesses.person_id IS '⚠ FK a persons, NO a users. Diferencia crítica vs DDL v1.';
COMMENT ON COLUMN suppliers_schema.businesses.tax_id    IS 'PII — NIT/RUT. Requerido para PJ.';


-- ---------------------------------------------------------------------------
-- Representantes legales — referenciados desde suppliers (sin business_id directo)
-- ---------------------------------------------------------------------------
CREATE TABLE suppliers_schema.legal_representatives (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id UUID    NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  person_id   BIGINT  NOT NULL REFERENCES transversal_schema.persons(id),
  is_primary  BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_legal_reps_person_id ON suppliers_schema.legal_representatives (person_id);
COMMENT ON TABLE suppliers_schema.legal_representatives IS 'Sin business_id directo. Referenciada desde suppliers.legal_representative_id.';


-- ---------------------------------------------------------------------------
-- Cuentas bancarias (PII — cifrado AES-256 vía transformer TypeORM)
-- ---------------------------------------------------------------------------
CREATE TABLE suppliers_schema.bank_accounts (
  id                 BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id        UUID         NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  bank_entity        VARCHAR(255) NOT NULL,
  account_number     VARCHAR(500) NOT NULL,  -- PII: cifrado AES-256 en capa ORM
  bank_certification TEXT,
  created_at         TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ  NOT NULL DEFAULT now()
);

COMMENT ON COLUMN suppliers_schema.bank_accounts.account_number IS 'PII — cifrado con BankAccountEncryptionTransformer en TypeORM. No cifrar a nivel SQL.';


-- ---------------------------------------------------------------------------
-- Suppliers — tabla delgada de identificación (config en partners)
-- ---------------------------------------------------------------------------
CREATE TABLE suppliers_schema.suppliers (
  id                      BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id             UUID   NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  business_id             BIGINT NOT NULL UNIQUE REFERENCES suppliers_schema.businesses(id),
  legal_representative_id BIGINT REFERENCES suppliers_schema.legal_representatives(id),
  bank_account_id         BIGINT UNIQUE REFERENCES suppliers_schema.bank_accounts(id),
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_suppliers_legal_rep_id ON suppliers_schema.suppliers (legal_representative_id);
COMMENT ON TABLE suppliers_schema.suppliers IS 'Tabla delgada de identificación del proveedor. Config visual/operativa en partners (OneToOne).';


-- ---------------------------------------------------------------------------
-- ENUMs de partners
-- ---------------------------------------------------------------------------
CREATE TYPE suppliers_schema.partner_state AS ENUM ('active', 'inactive', 'blocked');

-- ---------------------------------------------------------------------------
-- Partners — configuración visual y operativa (1:1 con suppliers)
-- ---------------------------------------------------------------------------
CREATE TABLE suppliers_schema.partners (
  id                              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id                     UUID    NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  supplier_id                     BIGINT  NOT NULL UNIQUE REFERENCES suppliers_schema.suppliers(id),
  acronym                         VARCHAR(10),
  logo_url                        TEXT,
  co_branding_logo_url            TEXT,
  primary_color                   VARCHAR(20),
  secondary_color                 VARCHAR(20),
  light_color                     VARCHAR(20),
  notification_email              VARCHAR,
  webhook_url                     TEXT,
  send_sales_rep_voucher          BOOLEAN NOT NULL DEFAULT FALSE,
  disbursement_notification_email VARCHAR,
  -- NOTA: state usa ENUM, no FK a statuses
  state                           suppliers_schema.partner_state NOT NULL DEFAULT 'active',
  created_at                      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at                      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_partners_state ON suppliers_schema.partners (state);
COMMENT ON COLUMN suppliers_schema.partners.state IS 'ENUM: active|inactive|blocked. No usa FK a statuses.';


-- ---------------------------------------------------------------------------
-- Representantes de ventas
-- NOTA: name, role, status_id existen en BD pero no están mapeados en TypeORM
-- ---------------------------------------------------------------------------
CREATE TABLE suppliers_schema.sales_representatives (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id UUID   NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  partner_id  BIGINT NOT NULL REFERENCES suppliers_schema.partners(id),
  user_id     BIGINT REFERENCES transversal_schema.users(id),
  -- Columnas en BD no mapeadas en entidad TypeORM (pendiente de mapear):
  name        VARCHAR(255),
  role        VARCHAR(100),
  status_id   BIGINT REFERENCES transversal_schema.catalog_status_types(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sales_reps_partner_id ON suppliers_schema.sales_representatives (partner_id);
CREATE INDEX idx_sales_reps_user_id    ON suppliers_schema.sales_representatives (user_id);
COMMENT ON TABLE suppliers_schema.sales_representatives IS '⚠ name, role, status_id existen en BD pero no están mapeados en la entidad TypeORM actual.';


-- ---------------------------------------------------------------------------
-- Purchase Orders — user_id como VARCHAR externo (no FK)
-- ---------------------------------------------------------------------------
CREATE TABLE suppliers_schema.purchase_orders (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id  UUID          NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  -- NOTA: user_id es VARCHAR externo, NO bigint FK a users
  user_id      VARCHAR(255)  NOT NULL,
  supplier_id  BIGINT        NOT NULL REFERENCES suppliers_schema.suppliers(id),
  amount       NUMERIC(18,2) NOT NULL CHECK (amount > 0),
  document_url TEXT,
  created_at   TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_purchase_orders_supplier_id ON suppliers_schema.purchase_orders (supplier_id);
COMMENT ON COLUMN suppliers_schema.purchase_orders.user_id IS '⚠ VARCHAR externo, NO FK bigint a users.id.';


-- ---------------------------------------------------------------------------
-- Sagas de onboarding de partner (CQRS — vincula por UUID)
-- ---------------------------------------------------------------------------
CREATE TABLE suppliers_schema.partner_onboarding_sagas (
  id                          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id                 UUID        NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  correlation_id              UUID        NOT NULL,
  status                      VARCHAR(32) NOT NULL,
  current_step                SMALLINT    NOT NULL DEFAULT 0,
  credit_facility_external_id UUID,
  user_external_id            UUID,
  person_external_id          UUID,
  business_external_id        UUID,
  bank_account_external_id    UUID,
  partner_external_id         UUID,
  error_message               TEXT,
  created_at                  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at                  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_onboarding_sagas_correlation_id ON suppliers_schema.partner_onboarding_sagas (correlation_id);
CREATE INDEX idx_onboarding_sagas_status         ON suppliers_schema.partner_onboarding_sagas (status);


-- =============================================================================
-- SCHEMA: products_schema
-- =============================================================================

-- ---------------------------------------------------------------------------
-- ENUMs de credit facility
-- ---------------------------------------------------------------------------
CREATE TYPE products_schema.credit_facility_state AS ENUM ('active', 'inactive', 'cancelled', 'expired');

-- ---------------------------------------------------------------------------
-- Plantillas de contrato versionadas
-- ---------------------------------------------------------------------------
CREATE TABLE products_schema.contract_templates (
  id                   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id          UUID         NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  template_family_key  VARCHAR(120) NOT NULL,
  version              INT          NOT NULL,
  effective_from       TIMESTAMPTZ,
  effective_to         TIMESTAMPTZ,
  zapsign_template_ref VARCHAR(255),
  status_id            BIGINT       NOT NULL REFERENCES transversal_schema.catalog_status_types(id),
  created_at           TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_contract_templates_family_key ON products_schema.contract_templates (template_family_key);
CREATE INDEX idx_contract_templates_status_id  ON products_schema.contract_templates (status_id);

CREATE TRIGGER trg_contract_templates_validate_status
BEFORE INSERT OR UPDATE OF status_id ON products_schema.contract_templates
FOR EACH ROW EXECUTE FUNCTION transversal_schema.validate_status_entity('contract_templates', 'status_id');


-- ---------------------------------------------------------------------------
-- Contratos — sin application_id (relación inversa desde credit_applications)
-- ---------------------------------------------------------------------------
CREATE TABLE products_schema.contracts (
  id                   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id          UUID    NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  user_id              BIGINT  REFERENCES transversal_schema.users(id),
  contract_template_id BIGINT  REFERENCES products_schema.contract_templates(id),
  zapsign_token        VARCHAR UNIQUE,
  status_id            BIGINT  NOT NULL REFERENCES transversal_schema.catalog_status_types(id),
  original_file_url    TEXT,
  signed_file_url      TEXT,
  form_answers_json    JSONB,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_contracts_user_id             ON products_schema.contracts (user_id);
CREATE INDEX idx_contracts_contract_template_id ON products_schema.contracts (contract_template_id);
CREATE INDEX idx_contracts_status_id           ON products_schema.contracts (status_id);

CREATE TRIGGER trg_contracts_validate_status
BEFORE INSERT OR UPDATE OF status_id ON products_schema.contracts
FOR EACH ROW EXECUTE FUNCTION transversal_schema.validate_status_entity('contracts', 'status_id');

COMMENT ON TABLE products_schema.contracts IS '⚠ Sin application_id. Vínculo con credit_applications es inverso: credit_applications.contract_id → contracts.id.';


-- ---------------------------------------------------------------------------
-- Credit Facilities — tabla delgada (datos de solicitud en credit_applications)
-- ---------------------------------------------------------------------------
CREATE TABLE products_schema.credit_facilities (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id UUID          NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  contract_id BIGINT        REFERENCES products_schema.contracts(id),
  state       products_schema.credit_facility_state NOT NULL DEFAULT 'active',
  total_limit NUMERIC(18,4) NOT NULL CHECK (total_limit >= 0),
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_credit_facilities_contract_id ON products_schema.credit_facilities (contract_id);
CREATE INDEX idx_credit_facilities_state       ON products_schema.credit_facilities (state);

COMMENT ON TABLE  products_schema.credit_facilities IS '⚠ Tabla delgada. Datos de solicitud en credit_applications. state=ENUM, no FK a statuses.';
COMMENT ON COLUMN products_schema.credit_facilities.total_limit IS 'NUMERIC(18,4) para precisión financiera. Nunca float/double.';


-- ---------------------------------------------------------------------------
-- Categorías (antes: partner_categories); facilidad vía client_category_assignments
-- ---------------------------------------------------------------------------
CREATE TABLE products_schema.categories (
  id                       BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id              UUID          NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  partner_id               BIGINT        REFERENCES suppliers_schema.partners(id) ON DELETE SET NULL ON UPDATE CASCADE,
  name                     VARCHAR(255)  NOT NULL,
  discount_percentage      NUMERIC(8,4)  NOT NULL,
  interest_rate            NUMERIC(8,4)  NOT NULL,
  disbursement_fee_percent NUMERIC(8,4),
  minimum_disbursement_fee NUMERIC(18,4),
  delay_days               INT           NOT NULL,
  term_days                INT           NOT NULL,
  state                    products_schema.credit_facility_state NOT NULL DEFAULT 'active',
  created_at               TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at               TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_categories_partner_id         ON products_schema.categories (partner_id);
CREATE INDEX idx_categories_state              ON products_schema.categories (state);

COMMENT ON TABLE products_schema.categories IS 'Antes: partner_categories en public. discount_percentage e interest_rate en NUMERIC (nunca float).';

-- Puente M:N para TypeORM @ManyToMany + @JoinTable (sin fila surrogate).
CREATE TABLE products_schema.client_category_assignments (
  credit_facility_id BIGINT NOT NULL REFERENCES products_schema.credit_facilities(id) ON DELETE CASCADE ON UPDATE CASCADE,
  category_id        BIGINT NOT NULL REFERENCES products_schema.categories(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (credit_facility_id, category_id),
  UNIQUE (category_id)
);

CREATE INDEX idx_client_category_assignments_credit_facility_id
  ON products_schema.client_category_assignments (credit_facility_id);

COMMENT ON TABLE products_schema.client_category_assignments IS
  'Puente categoría ↔ facilidad (JoinTable). UNIQUE(category_id) conserva 1 categoría → 1 facilidad.';


-- ---------------------------------------------------------------------------
-- Solicitudes de crédito (antes: credit_applications_bnpl en public)
-- ---------------------------------------------------------------------------
CREATE TABLE products_schema.credit_applications (
  id                    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id           UUID    NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  -- NOTA: person_id, NO user_id. Diferencia crítica vs DDL v1.
  person_id             BIGINT  REFERENCES transversal_schema.persons(id),
  partner_id            BIGINT  REFERENCES suppliers_schema.partners(id),
  partner_category_id   BIGINT  REFERENCES products_schema.categories(id),
  business_id           BIGINT  REFERENCES suppliers_schema.businesses(id),
  -- Representante de ventas que registró la solicitud (opcional; suppliers-ms)
  sales_representative_id BIGINT REFERENCES suppliers_schema.sales_representatives(id) ON DELETE SET NULL,
  -- Vínculo inverso con contracts (contracts NO tiene application_id)
  contract_id           BIGINT  REFERENCES products_schema.contracts(id),
  number_of_locations   INT,
  number_of_employees   INT,
  -- DEUDA TÉCNICA: business_seniority como VARCHAR, debería ser FK a business_seniority
  business_seniority    VARCHAR,
  sector_experience     VARCHAR,
  business_flagship_m2  INT,
  business_has_rent     BOOLEAN,
  business_rent_amount  BIGINT,   -- centavos/mínima unidad
  monthly_income        BIGINT,   -- centavos/mínima unidad
  monthly_expenses      BIGINT,   -- centavos/mínima unidad
  monthly_purchases     BIGINT,   -- centavos — si is_current_client=true
  current_purchases     BIGINT,   -- centavos — si is_current_client=false
  total_assets          BIGINT,   -- centavos/mínima unidad
  requested_credit_line BIGINT,   -- centavos/mínima unidad
  is_current_client     BOOLEAN   NOT NULL DEFAULT FALSE,
  status_id             BIGINT    NOT NULL REFERENCES transversal_schema.catalog_status_types(id),
  submission_date       TIMESTAMPTZ,
  approval_date         TIMESTAMPTZ,
  rejection_reason      VARCHAR(500),
  credit_study_date     TIMESTAMPTZ,
  credit_score          DECIMAL(8,2),
  credit_decision       VARCHAR,
  approved_credit_line  BIGINT,   -- centavos/mínima unidad
  analyst_report        TEXT,
  risk_profile          VARCHAR,
  privacy_policy_accepted BOOLEAN NOT NULL DEFAULT FALSE,
  privacy_policy_date   TIMESTAMPTZ,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_credit_apps_person_id           ON products_schema.credit_applications (person_id);
CREATE INDEX idx_credit_apps_partner_id          ON products_schema.credit_applications (partner_id);
CREATE INDEX idx_credit_apps_partner_category_id ON products_schema.credit_applications (partner_category_id);
CREATE INDEX idx_credit_apps_business_id         ON products_schema.credit_applications (business_id);
CREATE INDEX idx_credit_apps_sales_representative_id ON products_schema.credit_applications (sales_representative_id) WHERE sales_representative_id IS NOT NULL;
CREATE INDEX idx_credit_apps_status_id           ON products_schema.credit_applications (status_id);
CREATE INDEX idx_credit_apps_submission_date     ON products_schema.credit_applications (submission_date DESC);

CREATE TRIGGER trg_credit_applications_validate_status
BEFORE INSERT OR UPDATE OF status_id ON products_schema.credit_applications
FOR EACH ROW EXECUTE FUNCTION transversal_schema.validate_status_entity('credit_applications', 'status_id');

COMMENT ON COLUMN products_schema.credit_applications.person_id          IS '⚠ FK a persons, NO a users. Diferencia crítica vs DDL v1.';
COMMENT ON COLUMN products_schema.credit_applications.business_seniority IS '⚠ Deuda técnica: VARCHAR. Debería ser FK a suppliers_schema.business_seniority.';
COMMENT ON COLUMN products_schema.credit_applications.business_rent_amount IS 'En centavos/mínima unidad monetaria. Nunca float.';


-- =============================================================================
-- TRIGGER: updated_at automático (todas las tablas con updated_at)
-- =============================================================================

CREATE OR REPLACE FUNCTION fn_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'transversal_schema.catalog_status_types',
    'transversal_schema.roles',
    'transversal_schema.permissions',
    'transversal_schema.role_permissions',
    'transversal_schema.currencies',
    'transversal_schema.cities',
    'transversal_schema.states',
    'transversal_schema.users',
    'transversal_schema.persons',
    'suppliers_schema.business_seniority',
    'suppliers_schema.businesses',
    'suppliers_schema.legal_representatives',
    'suppliers_schema.bank_accounts',
    'suppliers_schema.suppliers',
    'suppliers_schema.partners',
    'suppliers_schema.sales_representatives',
    'suppliers_schema.purchase_orders',
    'suppliers_schema.partner_onboarding_sagas',
    'products_schema.contract_templates',
    'products_schema.contracts',
    'products_schema.credit_facilities',
    'products_schema.categories',
    'products_schema.client_category_assignments',
    'products_schema.credit_applications'
  ]
  LOOP
    EXECUTE format(
      'CREATE TRIGGER trg_%s_updated_at BEFORE UPDATE ON %s FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();',
      replace(t, '.', '_'), t
    );
  END LOOP;
END;
$$;

-- =============================================================================
-- FIN DEL DDL v2.0
-- =============================================================================
