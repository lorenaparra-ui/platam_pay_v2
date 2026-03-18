import { Column, Entity, OneToMany } from "typeorm";
import { BaseExternalIdEntity } from "./base-external-id.entity";
import { CategoryEntity } from "./product.entity";

/**
 * Entidad TypeORM para credit_facilities.
 * Relaciones: status, categories (1:N). El vínculo opcional con partner pasa por categories.partner_id.
 */
@Entity("credit_facilities")
export class CreditFacilityEntity extends BaseExternalIdEntity {
  @Column({ name: "contract_id", type: "varchar", length: 255, nullable: true })
  contractId: string | null;

  @Column({ name: "status_id", type: "bigint" })
  statusId: number;

  @Column({
    name: "total_limit",
    type: "decimal",
    precision: 18,
    scale: 4,
  })
  totalLimit: string;

  @OneToMany(() => CategoryEntity, (category) => category.creditFacility)
  categories: CategoryEntity[];
}
