import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { BaseExternalIdEntity } from "./base-external-id.entity";
import { CreditFacilityEntity } from "./credit-facility.entity";

/**
 * Entidad TypeORM para categories.
 * Relación N:1 con credit_facility. Una credit_facility debe tener al menos una categoría (validación en aplicación).
 */
@Entity("categories")
export class CategoryEntity extends BaseExternalIdEntity {
  @Column({ name: "credit_facility_id", type: "bigint" })
  creditFacilityId: number;

  @Column({ name: "name", type: "varchar", length: 255 })
  name: string;

  @Column({
    name: "discount_percentage",
    type: "decimal",
    precision: 8,
    scale: 4,
  })
  discountPercentage: string;

  @Column({
    name: "interest_rate",
    type: "decimal",
    precision: 8,
    scale: 4,
  })
  interestRate: string;

  @Column({
    name: "disbursement_fee_percent",
    type: "decimal",
    precision: 8,
    scale: 4,
    nullable: true,
  })
  disbursementFeePercent: string | null;

  @Column({
    name: "minimum_disbursement_fee",
    type: "decimal",
    precision: 18,
    scale: 4,
    nullable: true,
  })
  minimumDisbursementFee: string | null;

  @Column({ name: "delay_days", type: "int" })
  delayDays: number;

  @Column({ name: "term_days", type: "int" })
  termDays: number;

  @Column({ name: "status_id", type: "bigint" })
  statusId: number;

  @ManyToOne(() => CreditFacilityEntity, (cf) => cf.categories, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "credit_facility_id" })
  creditFacility: CreditFacilityEntity;
}
