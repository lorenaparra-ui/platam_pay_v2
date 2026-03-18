import { MigrationInterface, QueryRunner } from "typeorm";
export declare class DropPartnersTradeName1773600000100 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
