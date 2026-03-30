import { Column, Entity } from 'typeorm';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { BankAccountEncryptionTransformer } from '../transformers/aes-256.transformer';

@Entity({ name: 'bank_accounts', schema: 'suppliers_schema' })
export class BankAccountEntity extends BaseExternalIdEntity {
  @Column({ name: 'bank_entity', type: 'varchar', length: 255 })
  bankEntity: string;

  @Column({
    name: 'account_number',
    type: 'varchar',
    length: 500,
    transformer: BankAccountEncryptionTransformer,
  })
  accountNumber: string;

  @Column({ name: 'bank_certification', type: 'text', nullable: true })
  bankCertification: string | null;
}
