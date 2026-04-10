import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Jerarquía usuario↔usuario (`users.parent_id`) y retiro del modelo organizationals /
 * organizational_nodes / user_organizational_node_assignments (no aplicado en migraciones
 * TypeORM previas; puede existir solo en DDL manual o seeds).
 */
export class UsersParentIdDropOrganizationalHierarchy2120000000000
  implements MigrationInterface
{
  name = 'UsersParentIdDropOrganizationalHierarchy2120000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE IF EXISTS "transversal_schema"."organizational_members"`,
    );
    await queryRunner.query(
      `DROP TABLE IF EXISTS "transversal_schema"."user_organizational_node_assignments"`,
    );
    // Grupos (migración 217): FK a organizational_nodes — eliminar antes del árbol de nodos.
    await queryRunner.query(
      `DROP TABLE IF EXISTS "transversal_schema"."organizational_group_members"`,
    );
    await queryRunner.query(
      `DROP TABLE IF EXISTS "transversal_schema"."organizational_groups"`,
    );
    await queryRunner.query(
      `DROP TABLE IF EXISTS "transversal_schema"."organizational_nodes"`,
    );
    await queryRunner.query(
      `DROP TABLE IF EXISTS "transversal_schema"."organizationals"`,
    );
    await queryRunner.query(
      `DROP TYPE IF EXISTS "transversal_schema"."organizational_position_code"`,
    );

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."users"
      ADD COLUMN "parent_id" bigint NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."users"
      ADD CONSTRAINT "FK_users_parent_id"
      FOREIGN KEY ("parent_id")
      REFERENCES "transversal_schema"."users"("id")
      ON DELETE SET NULL ON UPDATE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."users"
      ADD CONSTRAINT "CK_users_parent_not_self"
      CHECK (parent_id IS NULL OR parent_id <> id)
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_users_parent_id"
      ON "transversal_schema"."users" ("parent_id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "transversal_schema"."IDX_users_parent_id"`,
    );
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."users"
      DROP CONSTRAINT IF EXISTS "CK_users_parent_not_self"
    `);
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."users"
      DROP CONSTRAINT IF EXISTS "FK_users_parent_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."users"
      DROP COLUMN IF EXISTS "parent_id"
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        CREATE TYPE "transversal_schema"."organizational_position_code" AS ENUM (
          'gerente_comercial',
          'admin',
          'supervisor',
          'representante'
        );
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END
      $$
    `);

    await queryRunner.query(`
      CREATE TABLE "transversal_schema"."organizationals" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "name" character varying(255) NOT NULL,
        "owner_user_id" bigint NOT NULL,
        "is_active" boolean NOT NULL DEFAULT true,
        CONSTRAINT "PK_organizationals" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_organizationals_external_id" UNIQUE ("external_id"),
        CONSTRAINT "FK_organizationals_owner_user_id"
          FOREIGN KEY ("owner_user_id")
          REFERENCES "transversal_schema"."users"("id")
          ON DELETE RESTRICT ON UPDATE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_organizationals_owner_user_id"
      ON "transversal_schema"."organizationals" ("owner_user_id")
    `);

    await queryRunner.query(`
      CREATE TABLE "transversal_schema"."organizational_nodes" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "organizational_id" bigint NOT NULL,
        "parent_node_id" bigint,
        "name" character varying(255) NOT NULL,
        "code" character varying(100),
        "is_active" boolean NOT NULL DEFAULT true,
        CONSTRAINT "PK_organizational_nodes" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_organizational_nodes_external_id" UNIQUE ("external_id"),
        CONSTRAINT "FK_organizational_nodes_organizational_id"
          FOREIGN KEY ("organizational_id")
          REFERENCES "transversal_schema"."organizationals"("id")
          ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "FK_organizational_nodes_parent_node_id"
          FOREIGN KEY ("parent_node_id")
          REFERENCES "transversal_schema"."organizational_nodes"("id")
          ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT "CK_organizational_nodes_not_self_parent"
          CHECK (parent_node_id IS NULL OR parent_node_id <> id)
      )
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX "UQ_organizational_nodes_org_code"
      ON "transversal_schema"."organizational_nodes" ("organizational_id", "code")
      WHERE code IS NOT NULL
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_organizational_nodes_org_parent"
      ON "transversal_schema"."organizational_nodes" ("organizational_id", "parent_node_id")
    `);

    await queryRunner.query(`
      CREATE TABLE "transversal_schema"."user_organizational_node_assignments" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "user_id" bigint NOT NULL,
        "organizational_node_id" bigint NOT NULL,
        "position_code" "transversal_schema"."organizational_position_code" NOT NULL,
        "is_primary" boolean NOT NULL DEFAULT true,
        CONSTRAINT "PK_user_organizational_node_assignments" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_user_organizational_node_assignments_external_id" UNIQUE ("external_id"),
        CONSTRAINT "UQ_user_org_node_assignments_user_node"
          UNIQUE ("user_id", "organizational_node_id"),
        CONSTRAINT "FK_user_org_assignments_user_id"
          FOREIGN KEY ("user_id")
          REFERENCES "transversal_schema"."users"("id")
          ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "FK_user_org_assignments_node_id"
          FOREIGN KEY ("organizational_node_id")
          REFERENCES "transversal_schema"."organizational_nodes"("id")
          ON DELETE CASCADE ON UPDATE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_user_org_node_assignments_user_id"
      ON "transversal_schema"."user_organizational_node_assignments" ("user_id")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_user_org_node_assignments_node_id"
      ON "transversal_schema"."user_organizational_node_assignments" ("organizational_node_id")
    `);
  }
}
