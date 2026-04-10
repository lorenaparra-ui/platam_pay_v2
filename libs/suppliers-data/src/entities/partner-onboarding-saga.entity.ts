import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PartnerOnboardingSagaStatus } from '@platam/shared';

@Entity({ name: 'partner_onboarding_sagas', schema: 'suppliers_schema' })
export class PartnerOnboardingSagaEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ name: 'external_id', type: 'uuid', unique: true })
  externalId: string;

  @Column({ name: 'correlation_id', type: 'uuid' })
  correlationId: string;

  @Column({ type: 'varchar', length: 32 })
  status: PartnerOnboardingSagaStatus;

  @Column({ name: 'current_step', type: 'smallint', default: 0 })
  currentStep: number;

  @Column({ name: 'credit_facility_external_id', type: 'uuid', nullable: true })
  creditFacilityExternalId: string | null;

  @Column({ name: 'user_external_id', type: 'uuid', nullable: true })
  userExternalId: string | null;

  @Column({ name: 'person_external_id', type: 'uuid', nullable: true })
  personExternalId: string | null;

  @Column({ name: 'business_external_id', type: 'uuid', nullable: true })
  businessExternalId: string | null;

  @Column({ name: 'bank_account_external_id', type: 'uuid', nullable: true })
  bankAccountExternalId: string | null;

  @Column({ name: 'partner_external_id', type: 'uuid', nullable: true })
  partnerExternalId: string | null;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
