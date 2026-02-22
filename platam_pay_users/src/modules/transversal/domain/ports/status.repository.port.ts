import { Status } from '../models/status.model';

export const STATUS_REPOSITORY = 'STATUS_REPOSITORY';

export interface StatusRepositoryPort {
  findAll(): Promise<Status[]>;
  findById(id: number): Promise<Status | null>;
  findByExternalId(externalId: string): Promise<Status | null>;
  findByEntityTypeAndCode(entityType: string, code: string): Promise<Status | null>;
  findByEntityType(entityType: string): Promise<Status[]>;
}
