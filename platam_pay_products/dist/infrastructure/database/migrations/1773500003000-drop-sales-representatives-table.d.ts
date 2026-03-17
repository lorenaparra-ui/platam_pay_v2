import { MigrationInterface, QueryRunner } from "typeorm";
export declare class DropSalesRepresentativesTable1773500003000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
