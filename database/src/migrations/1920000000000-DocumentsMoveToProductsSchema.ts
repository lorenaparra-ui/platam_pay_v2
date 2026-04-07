import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Mueve `documents` al esquema operativo de productos (FK ya apunta a credit_applications).
 * La entidad TypeORM vive en `libs/products-data` con schema `products_schema`.
 */
export class DocumentsMoveToProductsSchema1920000000000
  implements MigrationInterface
{
  name = 'DocumentsMoveToProductsSchema1920000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."documents" SET SCHEMA "products_schema"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "products_schema"."documents" SET SCHEMA "transversal_schema"
    `);
  }
}
