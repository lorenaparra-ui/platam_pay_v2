"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.businesses1773253143601 = void 0;
class businesses1773253143601 {
    name = 'businesses1773253143601';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "partners" DROP CONSTRAINT "partners_status_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "partners" DROP CONSTRAINT "partners_default_category_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "partners" DROP CONSTRAINT "partners_default_rep_id_fkey"`);
        await queryRunner.query(`DROP INDEX "public"."idx_partners_external_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_partners_default_rep_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_partners_default_category_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_partners_status_id"`);
        await queryRunner.query(`ALTER TABLE "partners" ADD CONSTRAINT "UQ_b7d67599740f2954104288ca795" UNIQUE ("external_id")`);
        await queryRunner.query(`ALTER TABLE "partners" ALTER COLUMN "external_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "partners" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "partners" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "partners" DROP CONSTRAINT "partners_trade_name_unique"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "partners" ADD CONSTRAINT "partners_trade_name_unique" UNIQUE ("trade_name")`);
        await queryRunner.query(`ALTER TABLE "partners" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "partners" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "partners" ALTER COLUMN "external_id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "partners" DROP CONSTRAINT "UQ_b7d67599740f2954104288ca795"`);
        await queryRunner.query(`CREATE INDEX "idx_partners_status_id" ON "partners" ("status_id") `);
        await queryRunner.query(`CREATE INDEX "idx_partners_default_category_id" ON "partners" ("default_category_id") `);
        await queryRunner.query(`CREATE INDEX "idx_partners_default_rep_id" ON "partners" ("default_rep_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_partners_external_id" ON "partners" ("external_id") `);
        await queryRunner.query(`ALTER TABLE "partners" ADD CONSTRAINT "partners_default_rep_id_fkey" FOREIGN KEY ("default_rep_id") REFERENCES "sales_representatives"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "partners" ADD CONSTRAINT "partners_default_category_id_fkey" FOREIGN KEY ("default_category_id") REFERENCES "partner_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "partners" ADD CONSTRAINT "partners_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.businesses1773253143601 = businesses1773253143601;
//# sourceMappingURL=1773253143601-businesses.js.map