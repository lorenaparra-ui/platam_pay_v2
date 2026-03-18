import { Column, Entity } from "typeorm";
import { BaseExternalIdEntity } from "./base-external-id.entity";
import { BankAccountEncryptionTransformer } from "../transformers/aes-256.transformer";

@Entity({ name: "suppliers" })
export class SupplierEntity extends BaseExternalIdEntity {
  @Column({ name: "business_id", type: "bigint", unique: true })
  businessId: number;

  @Column({
    name: "bank_account",
    type: "varchar",
    length: 500,
    nullable: true,
    transformer: BankAccountEncryptionTransformer,
  })
  bankAccount: string | null;
}
