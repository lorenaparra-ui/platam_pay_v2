import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Path materializado en `users.hierarchy_path` (texto `id/id/.../`) para prefijos tipo LIKE,
 * índice `text_pattern_ops` y triggers de mantenimiento al insertar o mover `parent_id`.
 */
export class UsersHierarchyPathMaterialized2180000000000 implements MigrationInterface {
  name = 'UsersHierarchyPathMaterialized2180000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."users"
      ADD COLUMN "hierarchy_path" text NULL
    `);

    await queryRunner.query(`
      WITH RECURSIVE tree AS (
        SELECT u.id, u.parent_id, (u.id::text || '/') AS hierarchy_path
        FROM "transversal_schema"."users" u
        WHERE u.parent_id IS NULL
        UNION ALL
        SELECT c.id, c.parent_id, (t.hierarchy_path || c.id::text || '/')
        FROM "transversal_schema"."users" c
        INNER JOIN tree t ON c.parent_id = t.id
      )
      UPDATE "transversal_schema"."users" u
      SET hierarchy_path = tree.hierarchy_path
      FROM tree
      WHERE u.id = tree.id
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."users"
      ALTER COLUMN "hierarchy_path" SET NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."users"
      ADD CONSTRAINT "CK_users_hierarchy_path_format"
      CHECK (hierarchy_path ~ '^([0-9]+/)+$'::text)
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_users_hierarchy_path_prefix"
      ON "transversal_schema"."users" ("hierarchy_path" text_pattern_ops)
    `);

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION "transversal_schema"."users_biub_set_hierarchy_path"()
      RETURNS trigger
      LANGUAGE plpgsql
      AS $f$
      DECLARE
        ppath text;
      BEGIN
        IF tg_op = 'UPDATE' AND old.parent_id IS NOT DISTINCT FROM new.parent_id THEN
          new.hierarchy_path := old.hierarchy_path;
          RETURN new;
        END IF;

        IF new.parent_id IS NULL THEN
          new.hierarchy_path := new.id::text || '/';
        ELSE
          SELECT u.hierarchy_path INTO ppath
          FROM "transversal_schema"."users" u
          WHERE u.id = new.parent_id;

          IF ppath IS NULL THEN
            RAISE EXCEPTION 'users.hierarchy_path: parent % sin hierarchy_path', new.parent_id;
          END IF;

          new.hierarchy_path := ppath || new.id::text || '/';
        END IF;

        RETURN new;
      END;
      $f$
    `);

    await queryRunner.query(`
      CREATE TRIGGER "TR_users_biub_set_hierarchy_path"
      BEFORE INSERT OR UPDATE OF parent_id
      ON "transversal_schema"."users"
      FOR EACH ROW
      EXECUTE PROCEDURE "transversal_schema"."users_biub_set_hierarchy_path"()
    `);

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION "transversal_schema"."users_au_propagate_hierarchy_path"()
      RETURNS trigger
      LANGUAGE plpgsql
      AS $f$
      BEGIN
        IF tg_op = 'UPDATE' AND old.parent_id IS DISTINCT FROM new.parent_id THEN
          UPDATE "transversal_schema"."users" c
          SET
            hierarchy_path = new.hierarchy_path || substring(c.hierarchy_path FROM length(old.hierarchy_path) + 1),
            updated_at = now()
          WHERE c.id <> new.id
            AND c.hierarchy_path LIKE old.hierarchy_path || '%';
        END IF;
        RETURN new;
      END;
      $f$
    `);

    await queryRunner.query(`
      CREATE TRIGGER "TR_users_au_propagate_hierarchy_path"
      AFTER UPDATE OF parent_id
      ON "transversal_schema"."users"
      FOR EACH ROW
      EXECUTE PROCEDURE "transversal_schema"."users_au_propagate_hierarchy_path"()
    `);

    await queryRunner.query(`
      COMMENT ON COLUMN "transversal_schema"."users"."hierarchy_path" IS
      'Path materializado id/id/.../ para prefijos LIKE; mantenido por triggers.'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS "TR_users_au_propagate_hierarchy_path" ON "transversal_schema"."users"`,
    );
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS "TR_users_biub_set_hierarchy_path" ON "transversal_schema"."users"`,
    );
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS "transversal_schema"."users_au_propagate_hierarchy_path"()`,
    );
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS "transversal_schema"."users_biub_set_hierarchy_path"()`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "transversal_schema"."IDX_users_hierarchy_path_prefix"`,
    );
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."users"
      DROP CONSTRAINT IF EXISTS "CK_users_hierarchy_path_format"
    `);
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."users"
      DROP COLUMN IF EXISTS "hierarchy_path"
    `);
  }
}
