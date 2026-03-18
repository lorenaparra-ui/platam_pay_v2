import { Onboarding } from '@onboarding/domain/models/onboarding.model';
import { CreateOnboardingPayload, UpdateOnboardingPayload } from '@onboarding/domain/ports/onboarding.repository.port';
import { OnboardingEntity } from '@libs/database';
export declare class OnboardingMapper {
    static toDomain(entity: OnboardingEntity): Onboarding;
    static toEntity(domain: Onboarding): OnboardingEntity;
    static toCreateEntity(payload: CreateOnboardingPayload): OnboardingEntity;
    static applyUpdate(entity: OnboardingEntity, payload: UpdateOnboardingPayload): OnboardingEntity;
    private static applyMutableFields;
}
