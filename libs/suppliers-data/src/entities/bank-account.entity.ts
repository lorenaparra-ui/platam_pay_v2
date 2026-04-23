import { Column, Entity } from 'typeorm';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { BankAccountEncryptionTransformer } from '../transformers/aes-256.transformer';
import { AccountTypes } from '@platam/shared';

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

  @Column({
    name: 'account_type',
    type: 'enum',
    enum: AccountTypes,
  })
  accountType: AccountTypes;
}