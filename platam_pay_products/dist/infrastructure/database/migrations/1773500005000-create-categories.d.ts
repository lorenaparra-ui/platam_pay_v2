import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateCategories1773500005000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
