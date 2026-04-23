import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartnerOnboardingSagaEntity } from '@app/suppliers-data';
import type {
  PartnerOnboardingSagaPatch,
  PartnerOnboardingSagaRepository,
  PartnerOnboardingSagaRecord,
  PartnerOnboardingSagaStatus,
} from '@modules/partners/application/ports/partner-onboarding-saga.repository.port';

const SAGA_SELECT = {
  externalId: true,
  correlationId: true,
  status: true,
  currentStep: true,
  creditFacilityExternalId: true,
  userExternalId: true,
  personExternalId: true,
  businessExternalId: true,
  bankAccountExternalId: true,
  partnerExternalId: true,
  errorMessage: true,
} as const;

@Injectable()
export class TypeormPartnerOnboardingSagaRepository
  implements PartnerOnboardingSagaRepository
{
  constructor(
    @InjectRepository(PartnerOnboardingSagaEntity)
    private readonly repo: Repository<PartnerOnboardingSagaEntity>,
  ) {}

  async create_initial(
    record: Omit<
      PartnerOnboardingSagaRecord,
      | 'credit_facility_external_id'
      | 'user_external_id'
      | 'person_external_id'
      | 'business_external_id'
      | 'bank_account_external_id'
      | 'partner_external_id'
      | 'error_message'
    >,
  ): Promise<void> {
    const row = this.repo.create({
      externalId: record.external_id,
      correlationId: record.correlation_id,
      status: record.status,
      currentStep: record.current_step,
    });
    await this.repo.save(row);
  }

  async update_by_external_id(
    external_id: string,
    patch: PartnerOnboardingSagaPatch,
  ): Promise<void> {
    const existing = await this.repo.findOne({
      where: { externalId: external_id },
    });
    if (!existing) {
      return;
    }
    if (patch.status !== undefined) {
      existing.status = patch.status;
    }
    if (patch.current_step !== undefined) {
      existing.currentStep = patch.current_step;
    }
    if (patch.credit_facility_external_id !== undefined) {
      existing.creditFacilityExternalId = patch.credit_facility_external_id;
    }
    if (patch.user_external_id !== undefined) {
      existing.userExternalId = patch.user_external_id;
    }
    if (patch.person_external_id !== undefined) {
      existing.personExternalId = patch.person_external_id;
    }
    if (patch.business_external_id !== undefined) {
      existing.businessExternalId = patch.business_external_id;
    }
    if (patch.bank_account_external_id !== undefined) {
      existing.bankAccountExternalId = patch.bank_account_external_id;
    }
    if (patch.partner_external_id !== undefined) {
      existing.partnerExternalId = patch.partner_external_id;
    }
    if (patch.error_message !== undefined) {
      existing.errorMessage = patch.error_message;
    }
    await this.repo.save(existing);
  }

  async find_by_external_id(external_id: string): Promise<PartnerOnboardingSagaRecord | null> {
    const row = await this.repo.findOne({
      where: { externalId: external_id },
      select: SAGA_SELECT,
    });
    if (!row) return null;

    return {
      external_id: row.externalId,
      correlation_id: row.correlationId,
      status: row.status as PartnerOnboardingSagaStatus,
      current_step: row.currentStep,
      credit_facility_external_id: row.creditFacilityExternalId ?? null,
      user_external_id: row.userExternalId ?? null,
      person_external_id: row.personExternalId ?? null,
      business_external_id: row.businessExternalId ?? null,
      bank_account_external_id: row.bankAccountExternalId ?? null,
      partner_external_id: row.partnerExternalId ?? null,
      error_message: row.errorMessage ?? null,
    };
  }
}
