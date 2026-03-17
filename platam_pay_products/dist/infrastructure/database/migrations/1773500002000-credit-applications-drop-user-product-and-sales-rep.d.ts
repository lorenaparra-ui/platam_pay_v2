import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreditApplicationsDropUserProductAndSalesRep1773500002000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
