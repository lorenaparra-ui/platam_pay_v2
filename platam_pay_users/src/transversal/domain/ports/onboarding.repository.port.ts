import { Onboarding } from '../models/onboarding.model';

export const ONBOARDING_REPOSITORY = 'ONBOARDING_REPOSITORY';

export interface OnboardingRepositoryPort {
  findAll(): Promise<Onboarding[]>;
  findById(id: number): Promise<Onboarding | null>;
  findByExternalId(externalId: string): Promise<Onboarding | null>;
}
