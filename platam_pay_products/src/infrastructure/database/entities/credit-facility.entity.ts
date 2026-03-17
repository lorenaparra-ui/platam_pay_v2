import { Column, Entity, OneToMany } from "typeorm";
import { BaseExternalIdEntity } from "./base-external-id.entity";
import { CategoryEntity } from "./category.entity";

/**
 * Entidad TypeORM para credit_facilities.
 * Relaciones: partner (opcional), status, categories (1:N).
 */
@Entity("credit_facilities")
export class CreditFacilityEntity extends BaseExternalIdEntity {
  @Column({ name: "partner_id", type: "bigint", nullable: true })
  partnerId: number | null;

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
