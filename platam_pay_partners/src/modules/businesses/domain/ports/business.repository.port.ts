import type { Business } from "../models/business.model";

export const BUSINESS_REPOSITORY = "BUSINESS_REPOSITORY";

export interface BusinessRepositoryPort {
  findAll(): Promise<Business[]>;
  findById(id: number): Promise<Business | null>;
  findByExternalId(externalId: string): Promise<Business | null>;
}
