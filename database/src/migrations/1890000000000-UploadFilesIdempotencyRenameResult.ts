import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Normaliza la columna de resultado en upload_files_idempotency.
 *
 * Antes: "result_files" jsonb
 * Después: "result"       jsonb
 *
 * Motivación: alinear la convención de la entidad base `BaseSqsIdempotencyEntity`
 * que usa la columna "result" para todos los tipos de idempotencia SQS.
 * El adapter genérico `TypeormSqsIdempotencyBaseAdapter` escribe y lee
 * siempre desde "result", por lo que la columna debe ser uniforme.
 *
 * Impacto: solo afecta el nombre de la columna. El tipo (jsonb), la
 * nullability y el valor siguen siendo idénticos.
 */
export class UploadFilesIdempotencyRenameResult1890000000000
  implements MigrationInterface
{
  name = 'UploadFilesIdempotencyRenameResult1890000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."upload_files_idempotency"
        RENAME COLUMN "result_files" TO "result"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."upload_files_idempotency"
        RENAME COLUMN "result" TO "result_files"
    `);
  }
}
