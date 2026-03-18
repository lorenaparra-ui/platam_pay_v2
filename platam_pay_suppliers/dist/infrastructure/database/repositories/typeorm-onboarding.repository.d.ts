import { Repository } from 'typeorm';
import { Onboarding } from '@onboarding/domain/models/onboarding.model';
import { CreateOnboardingPayload, OnboardingRepositoryPort, UpdateOnboardingPayload } from '@onboarding/domain/ports/onboarding.repository.port';
import { OnboardingEntity } from '@libs/database';
export declare class TypeOrmOnboardingRepository implements OnboardingRepositoryPort {
    private readonly repository;
    constructor(repository: Repository<OnboardingEntity>);
    findAll(): Promise<Onboarding[]>;
    findById(id: number): Promise<Onboarding | null>;
    findByExternalId(externalId: string): Promise<Onboarding | null>;
    create(payload: CreateOnboardingPayload): Promise<Onboarding>;
    updateByExternalId(externalId: string, payload: UpdateOnboardingPayload): Promise<Onboarding | null>;
    deleteByExternalId(externalId: string): Promise<boolean>;
}
