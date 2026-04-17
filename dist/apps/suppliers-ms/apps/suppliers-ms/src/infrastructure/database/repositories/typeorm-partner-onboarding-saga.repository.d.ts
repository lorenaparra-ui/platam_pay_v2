import { Repository } from 'typeorm';
import { PartnerOnboardingSagaEntity } from '@app/suppliers-data';
import type { PartnerOnboardingSagaPatch, PartnerOnboardingSagaRepository, PartnerOnboardingSagaRecord } from '@modules/partners/application/ports/partner-onboarding-saga.repository.port';
export declare class TypeormPartnerOnboardingSagaRepository implements PartnerOnboardingSagaRepository {
    private readonly repo;
    constructor(repo: Repository<PartnerOnboardingSagaEntity>);
    create_initial(record: Omit<PartnerOnboardingSagaRecord, 'credit_facility_external_id' | 'user_external_id' | 'person_external_id' | 'business_external_id' | 'bank_account_external_id' | 'partner_external_id' | 'error_message'>): Promise<void>;
    update_by_external_id(external_id: string, patch: PartnerOnboardingSagaPatch): Promise<void>;
    find_by_external_id(external_id: string): Promise<PartnerOnboardingSagaRecord | null>;
}
