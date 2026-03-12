import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddPartnersAlias1762246800000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
