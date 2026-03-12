import { MigrationInterface, QueryRunner } from "typeorm";
export declare class RollbackPartnersAlias1762252200000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
