import { Column, Entity } from "typeorm";
import { BaseExternalIdEntity } from "./base-external-id.entity";

@Entity({ name: "partner_categories" })
export class PartnerCategoriesEntity extends BaseExternalIdEntity {
  @Column({ name: "partner_id", type: "bigint" })
  partnerId: number;

  @Column({ name: "name", type: "varchar", length: 100 })
  name: string;

  @Column({
    name: "discount_percentage",
    type: "decimal",
    precision: 5,
    scale: 4,
  })
  discountPercentage: string;

  @Column({ name: "interest_rate", type: "decimal", precision: 5, scale: 4 })
  interestRate: string;

  @Column({
    name: "disbursement_fee_percent",
    type: "decimal",
    precision: 5,
    scale: 4,
    nullable: true,
  })
  disbursementFeePercent: string | null;

  @Column({ name: "minimum_disbursement_fee", type: "bigint", nullable: true })
  minimumDisbursementFee: string | null;

  @Column({ name: "delay_days", type: "int" })
  delayDays: number;

  @Column({ name: "term_days", type: "int" })
  termDays: number;

  @Column({
    name: "status_id",
    type: "bigint",
    nullable: false,
    default: () => "get_status_id('partner_categories', 'active')",
  })
  statusId: number;
}
