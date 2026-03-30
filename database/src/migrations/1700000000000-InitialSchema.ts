import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Esquema inicial alineado con entidades en libs/* (transversal-data, suppliers-data, products-data).
 * Tablas de productos (credit_facilities, categories, credit_applications) en products_schema; el resto de suppliers en suppliers_schema.
 * Incluye esquemas PostgreSQL, helper get_status_id y filas mínimas en statuses para DEFAULTs de columnas.
 */
export class InitialSchema1700000000000 implements MigrationInterface {
  name = 'InitialSchema1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "transversal_schema"`);
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "suppliers_schema"`);
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "products_schema"`);
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);

    await queryRunner.query(
      `CREATE TABLE "transversal_schema"."statuses" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "entity_type" character varying(100) NOT NULL, "code" character varying(50) NOT NULL, "display_name" character varying(100) NOT NULL, "description" text, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_e42373be7fd52d6c3bca8be8ce7" UNIQUE ("external_id"), CONSTRAINT "PK_2fd3770acdb67736f1a3e3d5399" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_6d0164d6d8c6438ef5940edcf5" ON "transversal_schema"."statuses" ("entity_type", "code") `,
    );

    await queryRunner.query(`
      INSERT INTO "transversal_schema"."statuses" ("external_id", "entity_type", "code", "display_name", "description", "is_active")
      VALUES
        (gen_random_uuid(), 'users', 'active', 'Activo', NULL, true),
        (gen_random_uuid(), 'credit_applications_bnpl', 'business_relation', 'Relación negocio', NULL, true),
        (gen_random_uuid(), 'credit_applications_bnpl', 'authorized', 'Autorizado', NULL, true),
        (gen_random_uuid(), 'partners', 'active', 'Activo', NULL, true)
    `);

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION get_status_id(p_entity_type varchar, p_code varchar)
      RETURNS bigint
      LANGUAGE sql
      STABLE
      AS $$
        SELECT s.id FROM transversal_schema.statuses s
        WHERE s.entity_type = p_entity_type AND s.code = p_code
        LIMIT 1;
      $$
    `);

    await queryRunner.query(
      `CREATE TABLE "transversal_schema"."business_seniority" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "description" character varying(100) NOT NULL, "range_start" integer NOT NULL, "range_end" integer NOT NULL, CONSTRAINT "UQ_b96e701e2794d4bf2d7595c553b" UNIQUE ("external_id"), CONSTRAINT "PK_6502845b96ed71dcc4ed27569f6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transversal_schema"."cities" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "country_name" character varying(120) NOT NULL, "country_code" character varying(2) NOT NULL, "state_name" character varying(120) NOT NULL, "state_code" character varying(3), "city_name" character varying(120) NOT NULL, "currency_id" bigint NOT NULL, CONSTRAINT "UQ_d5f0fb4d859ea004ffe39d7bf3a" UNIQUE ("external_id"), CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_8b4ec8e458f4e0b526f516f43f" ON "transversal_schema"."cities" ("country_code", "state_name", "city_name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "transversal_schema"."contract_signers" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "contract_id" bigint, "person_id" bigint, "zapsign_signer_token" character varying, "status_id" bigint NOT NULL, "sign_url" text, "ip_address" character varying(45), "geo_latitude" character varying(20), "geo_longitude" character varying(20), "signed_at" TIMESTAMP WITH TIME ZONE, "document_photo_url" text, "document_verse_photo_url" text, "selfie_photo_url" text, "signature_image_url" text, CONSTRAINT "UQ_52e0bf76c6c2a4f8ca30ba20254" UNIQUE ("external_id"), CONSTRAINT "PK_a6a182227fae68610072b640257" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transversal_schema"."documents" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "document_type" character varying NOT NULL, CONSTRAINT "UQ_595bd19d741d82ea211bcc4782b" UNIQUE ("external_id"), CONSTRAINT "PK_ac51aa5181ee2036f5ca482857c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transversal_schema"."guarantors" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "credit_application_id" bigint NOT NULL, "person_id" bigint NOT NULL, "contract_signer_id" bigint, "guarantor_type" character varying(20) NOT NULL, "relationship_to_applicant" character varying(100), "is_primary_guarantor" boolean NOT NULL DEFAULT false, "selected_after_credit_check" boolean NOT NULL DEFAULT false, "signature_url" text, "signature_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_9b4d9b7516c63b8be615b403fc3" UNIQUE ("external_id"), CONSTRAINT "PK_5282b468a3bedf77b8dc92b6b60" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transversal_schema"."legal_representatives" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "company_id" bigint NOT NULL, "person_id" bigint NOT NULL, "is_primary" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_635be261d470a3f79379bba55e8" UNIQUE ("external_id"), CONSTRAINT "PK_f33adfbb24667139dec2f9ca5e6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transversal_schema"."permissions" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "code" character varying(120) NOT NULL, "description" text, CONSTRAINT "UQ_5cb371ff943f6bfa4cae3a32f4b" UNIQUE ("external_id"), CONSTRAINT "UQ_8dad765629e83229da6feda1c1d" UNIQUE ("code"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transversal_schema"."persons" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" bigint NOT NULL, "country_code" character varying(2), "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "doc_type" character varying(100) NOT NULL, "doc_number" character varying NOT NULL, "doc_issue_date" date, "birth_date" date, "gender" character varying(20), "phone" character varying, "residential_address" text, "business_address" text, "city_id" bigint, CONSTRAINT "UQ_f32195761b1723751f81bb9d7c5" UNIQUE ("external_id"), CONSTRAINT "UQ_701f5310c87160e3e7ab1375d47" UNIQUE ("doc_number"), CONSTRAINT "PK_74278d8812a049233ce41440ac7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transversal_schema"."role_permissions" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "role_id" bigint NOT NULL, "permission_id" bigint NOT NULL, CONSTRAINT "UQ_a2be42bc8d037b1dc1b43b6e12a" UNIQUE ("external_id"), CONSTRAINT "PK_84059017c90bfcb701b8fa42297" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_25d24010f53bb80b78e412c965" ON "transversal_schema"."role_permissions" ("role_id", "permission_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "transversal_schema"."shareholders" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "company_id" bigint NOT NULL, "person_id" bigint NOT NULL, "ownership_percentage" numeric(5,4), "evaluation_order" integer, "credit_check_required" boolean NOT NULL DEFAULT false, "credit_check_completed" boolean NOT NULL DEFAULT false, "is_legal_representative" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_708fb456fd7a140dfb8e94d88b4" UNIQUE ("external_id"), CONSTRAINT "PK_bbe6cd94b1b69fe6edb73f983a1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transversal_schema"."users" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "cognito_sub" uuid NOT NULL, "email" character varying NOT NULL, "phone" character varying, "role_id" bigint, "status_id" bigint NOT NULL DEFAULT get_status_id('users', 'active'), "last_login_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_11fc776e0ca3573dc195670f636" UNIQUE ("external_id"), CONSTRAINT "UQ_1ac76d6d17ea198c621bdc4e292" UNIQUE ("cognito_sub"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "suppliers_schema"."businesses" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" bigint NOT NULL, "city_id" bigint, "entity_type" character varying(10) NOT NULL, "business_name" character varying(255), "business_address" text, "business_type" character varying(10), "relationship_to_business" character varying(100), "legal_name" character varying(255), "trade_name" character varying(255), "tax_id" character varying(50), "year_of_establishment" integer, CONSTRAINT "UQ_cb4b089c7d03610baed7622382b" UNIQUE ("external_id"), CONSTRAINT "UQ_a171acdfc8131f056afd5a1bbd7" UNIQUE ("tax_id"), CONSTRAINT "PK_bc1bf63498dd2368ce3dc8686e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "suppliers_schema"."credit_applications_bnpl" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" bigint NOT NULL, "user_product_id" bigint, "partner_id" bigint, "partner_category_id" bigint, "sales_rep_id" bigint, "business_name" character varying(255), "business_relation_id" bigint DEFAULT get_status_id('credit_applications_bnpl', 'business_relation'), "business_type_name" character varying(250), "business_type_code" bigint, "business_address" text, "business_city" character varying(120), "business_rent_amount" bigint, "number_of_locations" integer, "number_of_employees" integer, "business_seniority_id" bigint, "sector_experience" character varying, "relationship_to_business" character varying, "monthly_income" bigint, "monthly_expenses" bigint, "monthly_purchases" bigint, "current_purchases" bigint, "total_assets" bigint, "requested_credit_line" bigint, "is_current_client" boolean NOT NULL DEFAULT false, "status_id" bigint NOT NULL DEFAULT get_status_id('credit_applications_bnpl', 'authorized'), "submission_date" TIMESTAMP WITH TIME ZONE, "approval_date" TIMESTAMP WITH TIME ZONE, "rejection_reason" character varying(500), "credit_study_date" TIMESTAMP WITH TIME ZONE, "credit_score" numeric(8,2), "credit_decision" character varying, "approved_credit_line" bigint, "analyst_report" text, "risk_profile" character varying, "privacy_policy_accepted" boolean NOT NULL DEFAULT false, "privacy_policy_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_6db09a08550f1edb13e413201c6" UNIQUE ("external_id"), CONSTRAINT "PK_a094597f2e797055e46a54dae02" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "suppliers_schema"."partners" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "business_id" bigint NOT NULL, "acronym" character varying(10), "logo_url" text, "co_branding_logo_url" text, "primary_color" character varying(20), "secondary_color" character varying(20), "light_color" character varying(20), "sales_rep_role_name" character varying(50) DEFAULT 'Sales Rep', "sales_rep_role_name_plural" character varying(50) DEFAULT 'Sales Reps', "api_key_hash" boolean DEFAULT false, "notification_email" character varying, "webhook_url" text, "send_sales_rep_voucher" boolean DEFAULT false, "disbursement_notification_email" character varying, "default_rep_id" bigint, "status_id" bigint NOT NULL DEFAULT get_status_id('partners', 'active'), CONSTRAINT "UQ_b7d67599740f2954104288ca795" UNIQUE ("external_id"), CONSTRAINT "PK_998645b20820e4ab99aeae03b41" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "suppliers_schema"."purchase_orders" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" character varying(255) NOT NULL, "supplier_id" bigint NOT NULL, "amount" numeric(18,2) NOT NULL, "document_url" text, CONSTRAINT "UQ_889ac1e86fe6073ba4a6250c07a" UNIQUE ("external_id"), CONSTRAINT "PK_05148947415204a897e8beb2553" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "suppliers_schema"."sales_representatives" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "partner_id" bigint NOT NULL, "user_id" bigint, "name" character varying(255) NOT NULL, "role" character varying(100) NOT NULL, "status_id" bigint NOT NULL, CONSTRAINT "UQ_5c8024d2f1d0f569f1b8241cd2f" UNIQUE ("external_id"), CONSTRAINT "PK_00b3435d3816c2f8b96aa321be3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "suppliers_schema"."suppliers" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "business_id" bigint NOT NULL, "bank_account" character varying(500), CONSTRAINT "UQ_dcbcc75461edc264907fb842e9f" UNIQUE ("external_id"), CONSTRAINT "UQ_b03cdb57ba2af2a4d185d8e81f5" UNIQUE ("business_id"), CONSTRAINT "PK_b70ac51766a9e3144f778cfe81e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products_schema"."credit_facilities" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "contract_id" character varying(255), "status_id" bigint NOT NULL, "total_limit" numeric(18,4) NOT NULL, CONSTRAINT "UQ_dc5d3f1860675c1ce9290200eb3" UNIQUE ("external_id"), CONSTRAINT "PK_53ed557c44d7ccab4fbb74c4ce3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products_schema"."credit_applications" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "person_id" bigint, "partner_id" bigint, "partner_category_id" bigint, "business_id" bigint, "number_of_locations" integer, "number_of_employees" integer, "business_seniority" character varying, "sector_experience" character varying, "business_flagship_m2" integer, "business_has_rent" boolean, "business_rent_amount" bigint, "monthly_income" bigint, "monthly_expenses" bigint, "monthly_purchases" bigint, "current_purchases" bigint, "total_assets" bigint, "requested_credit_line" bigint, "is_current_client" boolean NOT NULL DEFAULT false, "status_id" bigint NOT NULL, "submission_date" TIMESTAMP WITH TIME ZONE, "approval_date" TIMESTAMP WITH TIME ZONE, "rejection_reason" character varying(500), "credit_study_date" TIMESTAMP WITH TIME ZONE, "credit_score" numeric(8,2), "credit_decision" character varying, "approved_credit_line" bigint, "analyst_report" text, "risk_profile" character varying, "privacy_policy_accepted" boolean NOT NULL DEFAULT false, "privacy_policy_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_3eff4854ccb96b5f8959ac4066b" UNIQUE ("external_id"), CONSTRAINT "PK_1943980f81286bd5dc733b5119c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products_schema"."categories" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "credit_facility_id" bigint NOT NULL, "partner_id" bigint, "name" character varying(255) NOT NULL, "discount_percentage" numeric(8,4) NOT NULL, "interest_rate" numeric(8,4) NOT NULL, "disbursement_fee_percent" numeric(8,4), "minimum_disbursement_fee" numeric(18,4), "delay_days" integer NOT NULL, "term_days" integer NOT NULL, "status_id" bigint NOT NULL, CONSTRAINT "UQ_f073d4b501a8bd3c75144c21ac3" UNIQUE ("external_id"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_schema"."categories" ADD CONSTRAINT "FK_cf7729ece42f4135b4dddeee8c6" FOREIGN KEY ("credit_facility_id") REFERENCES "products_schema"."credit_facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_schema"."categories" ADD CONSTRAINT "FK_0ae4bf4c26319bfca79589eaf5c" FOREIGN KEY ("partner_id") REFERENCES "suppliers_schema"."partners"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products_schema"."categories" DROP CONSTRAINT "FK_0ae4bf4c26319bfca79589eaf5c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_schema"."categories" DROP CONSTRAINT "FK_cf7729ece42f4135b4dddeee8c6"`,
    );
    await queryRunner.query(`DROP TABLE "products_schema"."categories"`);
    await queryRunner.query(`DROP TABLE "products_schema"."credit_applications"`);
    await queryRunner.query(`DROP TABLE "products_schema"."credit_facilities"`);
    await queryRunner.query(`DROP SCHEMA IF EXISTS "products_schema"`);
    await queryRunner.query(`DROP TABLE "suppliers_schema"."suppliers"`);
    await queryRunner.query(`DROP TABLE "suppliers_schema"."sales_representatives"`);
    await queryRunner.query(`DROP TABLE "suppliers_schema"."purchase_orders"`);
    await queryRunner.query(`DROP TABLE "suppliers_schema"."partners"`);
    await queryRunner.query(`DROP TABLE "suppliers_schema"."credit_applications_bnpl"`);
    await queryRunner.query(`DROP TABLE "suppliers_schema"."businesses"`);
    await queryRunner.query(`DROP TABLE "transversal_schema"."users"`);
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS get_status_id(character varying, character varying)`,
    );
    await queryRunner.query(`DROP INDEX "transversal_schema"."IDX_6d0164d6d8c6438ef5940edcf5"`);
    await queryRunner.query(`DROP TABLE "transversal_schema"."statuses"`);
    await queryRunner.query(`DROP TABLE "transversal_schema"."shareholders"`);
    await queryRunner.query(`DROP INDEX "transversal_schema"."IDX_25d24010f53bb80b78e412c965"`);
    await queryRunner.query(`DROP TABLE "transversal_schema"."role_permissions"`);
    await queryRunner.query(`DROP TABLE "transversal_schema"."persons"`);
    await queryRunner.query(`DROP TABLE "transversal_schema"."permissions"`);
    await queryRunner.query(`DROP TABLE "transversal_schema"."legal_representatives"`);
    await queryRunner.query(`DROP TABLE "transversal_schema"."guarantors"`);
    await queryRunner.query(`DROP TABLE "transversal_schema"."documents"`);
    await queryRunner.query(`DROP TABLE "transversal_schema"."contract_signers"`);
    await queryRunner.query(`DROP INDEX "transversal_schema"."IDX_8b4ec8e458f4e0b526f516f43f"`);
    await queryRunner.query(`DROP TABLE "transversal_schema"."cities"`);
    await queryRunner.query(`DROP TABLE "transversal_schema"."business_seniority"`);
    await queryRunner.query(`DROP SCHEMA IF EXISTS "suppliers_schema"`);
    await queryRunner.query(`DROP SCHEMA IF EXISTS "transversal_schema"`);
  }
}
